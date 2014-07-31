"use strict";
// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: DigiWebApp
// Model: BautagebuchMediaFile
// ==========================================================================
DigiWebApp.BautagebuchMediaFile = M.Model.create({

    /* Define the name of your model. Do not delete this property! */
    __name__: 'BautagebuchMediaFile'

    , name: M.Model.attr('String',{
    	isRequired: NO
    })

    , bautagesberichtId: M.Model.attr('String', {
        isRequired: NO
    })

    , positionId: M.Model.attr('String', {
        isRequired: NO
    })

    , positionName: M.Model.attr('String',{
        isRequired: NO
    })

    , handOrderId: M.Model.attr('String', {
        isRequired: NO
    })

    , handOrderName: M.Model.attr('String',{
        isRequired: NO
    })

    , activityId: M.Model.attr('String', {
        isRequired: NO
    })

    , activityName: M.Model.attr('String',{
        isRequired: NO
    })

    , fileName: M.Model.attr('String', {
        isRequired: NO
    })

    , fileType: M.Model.attr('String', {
        isRequired: YES
    })

    , timeStamp: M.Model.attr('String', {
        isRequired: NO
    })

    , date: M.Model.attr('String', { // is aggregated by the timestamp value above

    })

    , icon: M.Model.attr('String',{
        isRequired: NO
    })
    
    , latitude: M.Model.attr('String', {
        isRequired:NO
    })

    , longitude: M.Model.attr('String', {
        isRequired: NO
    })
    
    , mitarbeiterId: M.Model.attr('String', {
        isRequired: NO
    })    

    , remark: M.Model.attr('String', {
        isRequired: NO
    })

    , data: M.Model.attr('String',{
    	isRequired: NO
    })

    , setRemark: function(v) {
        this.set('remark', v);
    }

    , writeError: M.Model.attr('Boolean', {
        isRequired: NO
    })
    
    , deleteAll: function() {
		var that = this;
	    _.each(that.find(), function(el) {
			el.deleteSorted();
	    });
	}
		
	, hasFileName: function() {
    	var that = this;
		if ((!(that.get('fileName'))) || (that.get('fileName') && (that.get('fileName').length === 0))) {
			return NO;
		} else {
			return YES;
		}
    	
    }
    
	, saveToFile: function(myWriteContent, successCallback, myErrorCallback) {		
		var that = this;
		var writeContent = new String(myWriteContent);
		
		// check if fileName is set
		//if ((!(that.get('fileName'))) || (that.get('fileName') && (that.get('fileName').length === 0))) {
		if (!that.hasFileName()) {
			that.set('fileName', that.__proto__.name + '_' + D8.now().getTimestamp());
			that.save();
	    }
	
		// check for successCallback is a function
		if (typeof successCallback !== "function") {
			console.error("saveToFileError: successCallback is not a function");
	        return false;
	    }
	
		// check for errorCallback is a function (optional)
		var errorCallback;
	    if (!myErrorCallback || (typeof myErrorCallback !== "function")) {
	    	errorCallback = function(evt) {
	    		console.error("saveToFileError", evt);
	    	};
	    } else {
	    	errorCallback = myErrorCallback;
	    }
		
		// check if LocalFileSystem is defined
		if (typeof window.requestFileSystem === "undefined") {
			console.error("saveToFileError: no LocalFileSystem available");
			successCallback("");
	        return true;
	    }
	
		try {
			var myQuota = DigiWebApp.ApplicationController.CONSTApplicationQuota;
		    // open filesystem
			if (typeof(navigator.webkitPersistentStorage) !== "undefined") {
				navigator.webkitPersistentStorage.requestQuota(myQuota, function(grantedBytes) {
				    window.requestFileSystem(PERSISTENT, grantedBytes, function(fileSystem) {
				    	
				    	// get dataDirectory from filesystem (create if not exists)
				    	fileSystem.root.getDirectory("DIGIWebAppData", {create: true, exclusive: false}, function(dataDirectory) {
				
					    	// get fileEntry from filesystem (create if not exists)
					    	dataDirectory.getFile(that.get("fileName"), {create: true, exclusive: false}, function(fileEntry) {
				
					    		fileEntry.createWriter(function(writer) {
					    				
					    			writer.onerror = function(evt) {
					    				console.error("writeError", evt);
					    				errorCallback(evt);
					    			};
					    			
					    			writer.onwriteend = function(evt) {
						    			writer.onwriteend = function(ev) {
					    					successCallback(ev);
						    			};
					    				writer.truncate(writeContent.length);
					    	        };
					    	        // Create a new Blob and write it to log.txt.
					    	        var blob = new Blob([writeContent], {type: 'text/plain'});
					    	        
				    	        	writer.write(blob);
				
					    		}, errorCallback); // fileEntry.createWriter
					   		}, errorCallback);     // dataDirectory.getFile
					   	}, errorCallback);         // fileSystem.root.getDirectory
				    }, errorCallback);             // window.requestFileSystem
				}, function(e) {
					  console.error('Error while requesting Quota', e);
	  		            DigiWebApp.ApplicationController.nativeAlertDialogView({
			                title: M.I18N.l('error')
			              , message: M.I18N.l('errorWhileRequestingQuota') + ": " + err
			            });	    		        					
				});
	
			} else {
		    
			    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem) {
			    	
			    	// get dataDirectory from filesystem (create if not exists)
			    	fileSystem.root.getDirectory("DIGIWebAppData", {create: true, exclusive: false}, function(dataDirectory) {
			
				    	// get fileEntry from filesystem (create if not exists)
				    	dataDirectory.getFile(that.get("fileName"), {create: true, exclusive: false}, function(fileEntry) {
			
				    		fileEntry.createWriter(function(writer) {
				    				
				    			writer.onerror = function(evt) {
				    				console.error("writeError", evt);
				    				errorCallback(evt);
				    			};
				    			
				    			writer.onwriteend = function(evt) {
					    			writer.onwriteend = function(ev) {
				    					successCallback(ev);
					    			};
				    				writer.truncate(writeContent.length);
				    	        };
				    	        
			    	        	writer.write(writeContent.toString());
			
				    		}, errorCallback); // fileEntry.createWriter
				   		}, errorCallback);     // dataDirectory.getFile
				   	}, errorCallback);         // fileSystem.root.getDirectory
			    }, errorCallback);             // window.requestFileSystem
			}
		} catch(e3) {
			errorCallback(e3);
		}
	
	}
	
	, readFromFile: function(successCallback, myErrorCallback) {
		var that = this;
		
		// check for errorCallback is a function (optional)
		var errorCallback;
	    if (!myErrorCallback || (typeof myErrorCallback !== "function")) {
	    	errorCallback = function(evt) {
	    		console.error("readFromFileError", evt);
	    	};
	    } else {
	    	errorCallback = myErrorCallback;
	    }
	    
		// check for successCallback is a function
		if (typeof successCallback !== "function") {
			console.error("readFromFileError: successCallback is not a function");
	        return false;
	    }
		
		// check if fileName is set
		//if ((!(that.get('fileName'))) || (that.get('fileName') && (that.get('fileName').length === 0))) {
		if (!that.hasFileName()) {
			console.error("readFromFileError: no fileName given");
			errorCallback();
	        return false;
	    }
	    
		// check if LocalFileSystem is defined
		if (typeof window.requestFileSystem === "undefined") {
			console.error("readFromFileError: no LocalFileSystem available");
			successCallback("");
	        return true;
	    }
		
		try {
			var myQuota = DigiWebApp.ApplicationController.CONSTApplicationQuota;
		    // open filesystem
			if (typeof(navigator.webkitPersistentStorage) !== "undefined") {
				navigator.webkitPersistentStorage.requestQuota(myQuota, function(grantedBytes) {
				    window.requestFileSystem(PERSISTENT, grantedBytes, function(fileSystem) {
				
				    	// get dataDirectory from filesystem (create if not exists)
				    	fileSystem.root.getDirectory("DIGIWebAppData", {create: true, exclusive: false}, function(dataDirectory) {
					    			
					    	// get fileEntry from filesystem
					    	dataDirectory.getFile(that.get("fileName"), null, function(fileEntry) {
					    		
					    		// get file from fileEntry
					    		fileEntry.file(function(file) {
					    			
					    			// read from file
					    			var reader = new FileReader();
					    			reader.onloadend = function(evt) {
					    		    	
					    		    	// return content via successCallback
					    				successCallback(this.result);
					    				
					    	        };
					    			reader.readAsText(file);
					    	        
					        	}, errorCallback); // fileEntry.file
					    	}, errorCallback);     // dataDirectory.getFile
					    }, errorCallback);         // fileSystem.root.getDirectory
				    }, errorCallback);             // window.requestFileSystem
				}, function(e) {
					  console.error('Error while requesting Quota', e);
	  		            DigiWebApp.ApplicationController.nativeAlertDialogView({
			                title: M.I18N.l('error')
			              , message: M.I18N.l('errorWhileRequestingQuota') + ": " + err
			            });	    		        					
				});
			} else {
	
			    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem) {
					
			    	// get dataDirectory from filesystem (create if not exists)
			    	fileSystem.root.getDirectory("DIGIWebAppData", {create: true, exclusive: false}, function(dataDirectory) {
				    			
				    	// get fileEntry from filesystem
				    	dataDirectory.getFile(that.get("fileName"), null, function(fileEntry) {
				    		
				    		// get file from fileEntry
				    		fileEntry.file(function(file) {
				    			
				    			// read from file
				    			var reader = new FileReader();
				    			reader.onloadend = function(evt) {
				    		    	
				    		    	// return content via successCallback
				    				successCallback(evt.target.result);
				    				
				    	        };
				    			reader.readAsText(file);
				    	        
				        	}, errorCallback); // fileEntry.file
				    	}, errorCallback);     // dataDirectory.getFile
				    }, errorCallback);         // fileSystem.root.getDirectory
			    }, errorCallback);             // window.requestFileSystem
			}
		} catch(e4) {
			errorCallback(e4);
		}
	}
	
	, deleteFile: function(successCallback, myErrorCallback) {
		var that = this;
		
		// check if fileName is set
		//if ((!(that.get('fileName'))) || (that.get('fileName') && (that.get('fileName').length === 0))) {
		if (!that.hasFileName()) {
			console.error("deleteFileError: no fileName given");
	        return false;
	    }
	
		// check for successCallback is a function
		if (typeof successCallback !== "function") {
			console.error("deleteFileError: successCallback is not a function");
	        return false;
	    }
		
		// check for errorCallback is a function (optional)
		var errorCallback;
	    if (!myErrorCallback || (typeof myErrorCallback !== "function")) {
	    	errorCallback = function(evt) {
	    		console.error("deleteFileError", evt);
	    	};
	    } else {
	    	errorCallback = myErrorCallback;
	    }
	    
		// check if LocalFileSystem is defined
		if (typeof window.requestFileSystem === "undefined") {
			console.error("deleteFileError: no LocalFileSystem available");
			successCallback("");
	        return true;
	    }
	
		try {
			var myQuota = DigiWebApp.ApplicationController.CONSTApplicationQuota;
		    // open filesystem
			if (typeof(navigator.webkitPersistentStorage) !== "undefined") {
				navigator.webkitPersistentStorage.requestQuota(myQuota, function(grantedBytes) {
					window.requestFileSystem(PERSISTENT, grantedBytes, function(fileSystem) {
						
				    	// get dataDirectory from filesystem (create if not exists)
				    	fileSystem.root.getDirectory("DIGIWebAppData", {create: true, exclusive: false}, function(dataDirectory) {
					    			
					    	// get fileEntry from filesystem
					    	dataDirectory.getFile(that.get("fileName"), null, function(fileEntry) {
					    		
					    		// remove fileEntry
					    		fileEntry.remove(successCallback, errorCallback);
					    		
					    	}, errorCallback);     // dataDirectory.getFile
					    }, errorCallback);         // fileSystem.root.getDirectory
				    }, errorCallback);             // window.requestFileSystem
				}, function(e) {
					  console.error('Error while requesting Quota', e);
	  		            DigiWebApp.ApplicationController.nativeAlertDialogView({
			                title: M.I18N.l('error')
			              , message: M.I18N.l('errorWhileRequestingQuota') + ": " + err
			            });	    		        					
				});
			} else {
				window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem) {
			
			    	// get dataDirectory from filesystem (create if not exists)
			    	fileSystem.root.getDirectory("DIGIWebAppData", {create: true, exclusive: false}, function(dataDirectory) {
				    			
				    	// get fileEntry from filesystem
				    	dataDirectory.getFile(that.get("fileName"), null, function(fileEntry) {
				    		
				    		// remove fileEntry
				    		fileEntry.remove(successCallback, errorCallback);
				    		
				    	}, errorCallback);     // dataDirectory.getFile
				    }, errorCallback);         // fileSystem.root.getDirectory
			    }, errorCallback);             // window.requestFileSystem
			}
		} catch(e5) {
			errorCallback(e5);
		}
	}

	, deleteSorted: function() {
	    var that = this;
	
	    // remove m_id from Key-Stringlist
	    var keys = [];
	    var newKeys = [];
	    try {
	    	var keyString = localStorage.getItem(DigiWebApp.ApplicationController.storagePrefix + '_' + that.name.toLowerCase() + 'Keys');
	    	if ( keyString !== null) {
	    		keys = JSON.parse(keyString);
	    	}
	    } catch(e6) {
	    	console.error("ERROR in " + that.name + ".deleteSorted: " + e6);
	    }
	    if (keys) {
	        _.each(keys, function(k) {
	        	if (k !== that.m_id) {
	        		newKeys.push(k);
	        	}
	        });
		    localStorage.setItem(DigiWebApp.ApplicationController.storagePrefix + '_' + that.name.toLowerCase() + 'Keys', JSON.stringify(newKeys));
	    }
	
        if (that.hasFileName()) {
	    	// delete mediafile from device
        	that.deleteFile(function(n){
		    	// delete record from localStorage only if file
	    		// was deleted successfully from device
	    		return that.del();
	    	});
    	} else {
    		// there is no file to delete, so delete the record
    		return that.del();
    	}	    
	}
	
	, saveSorted: function() {
	    var that = this;
	    if (!that.save()) return false;
	
	    // add m_id to Key-Stringlist
	    var keys = [];
	    try {
	    	var keyString = localStorage.getItem(DigiWebApp.ApplicationController.storagePrefix + '_' + that.name.toLowerCase() + 'Keys');
	    	if ( keyString !== null) {
	    		keys = JSON.parse(keyString);
	    	}
	    } catch(e7) {
	    	console.error("ERROR in " + that.name + ".saveSorted: " + e7);
	    }
        var found = NO;
        _.each(keys, function(k) {
        	if (that.m_id === k) { found = YES; }
        });
        if (found === NO) { keys.push(that.m_id); }
	    localStorage.setItem(DigiWebApp.ApplicationController.storagePrefix + '_' + that.name.toLowerCase() + 'Keys', JSON.stringify(keys));
	    return true;
	}
	
	, findSorted: function(bautagesberichtId) {
	    var that = this;
	    var keys = [];
	    try {
	    	var keyString = localStorage.getItem(DigiWebApp.ApplicationController.storagePrefix + '_' + that.name.toLowerCase() + 'Keys');
	    	if ( keyString !== null) {
	    		keys = JSON.parse(keyString);
	    	}
	    } catch(e8) {
	    	console.error("ERROR in " + that.name + ".findSorted: " + e8);
	    }
	
	    var records = [];
	
	    if (keys) {
	        _.each(keys, function(k) {
	        	var loadedItem = that.find({key:DigiWebApp.ApplicationController.storagePrefix + that.name + '_' + k});
	        	if ( (bautagesberichtId && loadedItem.get("bautagesberichtId") === bautagesberichtId) || (typeof(bautagesberichtId) === "undefined") ) {
		            records.push(loadedItem);
	        	}
	        });
	    }
	    return records;
	}

}, M.DataProviderLocalStorage);
