// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: DigiWebApp
// Model: BautagebuchBautagesbericht
// ==========================================================================

DigiWebApp.BautagebuchBautagesbericht = M.Model.create({
    
    /* Define the name of your model. Do not delete this property! */
    __name__: 'BautagebuchBautagesbericht'

    , id: M.Model.attr('String', {
        isRequired: YES
    })

    , datum: M.Model.attr('String', {
        isRequired: YES
    })

    , startUhrzeit: M.Model.attr('String', {
        isRequired: YES
    })
    
    , bautagesberichtId: M.Model.attr('String', {
        isRequired: NO
    })

    , bautagesberichtTyp: M.Model.attr('String', {
        isRequired: NO
    })

    , transferCompleted: M.Model.attr('Boolean', {
        isRequired: NO
    })

    , projektleiterId: M.Model.attr('String', {
        isRequired: NO
    })
    
    , selektierteMitarbeiter: M.Model.attr('String', {
        isRequired: NO
        // list of ids
    })

    , orderId: M.Model.attr('String',{
        isRequired: NO
    })

    , orderName: M.Model.attr('String',{
        isRequired: NO
    })
	
    , handOrderId: M.Model.attr('String', {
        isRequired: NO
    })

    , handOrderName: M.Model.attr('String',{
        isRequired: NO
    })

    , positionId: M.Model.attr('String',{
        isRequired: NO
    })

    , positionName: M.Model.attr('String',{
        isRequired: NO
    })
	
    , temperatur: M.Model.attr('String',{
        isRequired: NO
    })

    , luftfeuchtigkeit: M.Model.attr('String',{
        isRequired: NO
    })

    , bewoelkung: M.Model.attr('String',{
        isRequired: NO
    })

    , niederschlag: M.Model.attr('String',{
        isRequired: NO
    })

    , wind: M.Model.attr('String',{
        isRequired: NO
    })

    , wechselhaft: M.Model.attr('String',{
        isRequired: NO
    })

    , latitude: M.Model.attr('String', {
    	// wird verwendet, falls Auto-StartUhrzeit gesetzt
        isRequired:NO
    })

    , longitude: M.Model.attr('String', {
    	// wird verwendet, falls Auto-StartUhrzeit gesetzt
        isRequired: NO
    })
    
    , abgeschlossen: M.Model.attr('String', {
        isRequired: NO
    })

    , unterschrift: M.Model.attr('String', {
        isRequired: NO
    })

    , unterschrift_hoehe: M.Model.attr('String', {
        isRequired: NO
    })

    , unterschrift_breite: M.Model.attr('String', {
        isRequired: NO
    })

    , fileName: M.Model.attr('String', {
        isRequired: NO
    })

    , fileType: M.Model.attr('String', {
        isRequired: NO
    })

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
			that.set('fileName', that.__proto__.name + '_Signature_' + D8.now().getTimestamp());
			that.save();
	    }
	
		// check for successCallback is a function
		if (typeof successCallback !== "function") {
			trackError("saveToFileError: successCallback is not a function");
	        return false;
	    }
	
		// check for errorCallback is a function (optional)
		var errorCallback;
	    if (!myErrorCallback || (typeof myErrorCallback !== "function")) {
			//trackError("saveToFileError: errorCallback is not a function");
	    	errorCallback = function(evt) {
	            //console.log("deleteFileError: " + evt.target.error.code);
	    		trackError("saveToFileError");
	    	};
	    } else {
	    	errorCallback = myErrorCallback;
	    }
		
		// check if LocalFileSystem is defined
		if (typeof window.requestFileSystem === "undefined") {
			trackError("saveToFileError: no LocalFileSystem available");
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
					    				trackError("writeError");
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
					  trackError('Error while requesting Quota');
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
				    				trackError("writeError");
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
		
		// check if fileName is set
		//if ((!(that.get('fileName'))) || (that.get('fileName') && (that.get('fileName').length === 0))) {
		if (!that.hasFileName()) {
			trackError("readFromFileError: no fileName given");
	        return false;
	    }
	
		// check for successCallback is a function
		if (typeof successCallback !== "function") {
			trackError("readFromFileError: successCallback is not a function");
	        return false;
	    }
		
		// check for errorCallback is a function (optional)
		var errorCallback;
	    if (!myErrorCallback || (typeof myErrorCallback !== "function")) {
			//trackError("saveToFileError: errorCallback is not a function");
	    	errorCallback = function(evt) {
	            //console.log("deleteFileError: " + evt.target.error.code);
	    		trackError("readFromFileError");
	    	};
	    } else {
	    	errorCallback = myErrorCallback;
	    }
	    
		// check if LocalFileSystem is defined
		if (typeof window.requestFileSystem === "undefined") {
			trackError("readFromFileError: no LocalFileSystem available");
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
					  trackError('Error while requesting Quota');
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
			trackError("deleteFileError: no fileName given");
	        return false;
	    }
	
		// check for successCallback is a function
		if (typeof successCallback !== "function") {
			trackError("deleteFileError: successCallback is not a function");
	        return false;
	    }
		
		// check for errorCallback is a function (optional)
		var errorCallback;
	    if (!myErrorCallback || (typeof myErrorCallback !== "function")) {
			//trackError("saveToFileError: errorCallback is not a function");
	    	errorCallback = function(evt) {
	            //console.log("deleteFileError: " + evt.target.error.code);
	    		trackError("deleteFileError");
	    	};
	    } else {
	    	errorCallback = myErrorCallback;
	    }
	    
		// check if LocalFileSystem is defined
		if (typeof window.requestFileSystem === "undefined") {
			trackError("deleteFileError: no LocalFileSystem available");
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
					  trackError('Error while requesting Quota');
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

	, deleteAll: function() {
        _.each(this.find(), function(el) {
			el.deleteSorted();
        });
    }

	, deleteSorted: function(successCallback,errorCallback) {
	    var that = this;
	    
	    // alle zugehörigen Zeiten löschen
	    _.each(DigiWebApp.BautagebuchZeitbuchung.find({bautagesberichtId: that.get('id')}), function(el) {
	    	el.deleteSorted();
	    });
	    
	    // alle zugehörigen Materialbuchungen löschen
	    _.each(DigiWebApp.BautagebuchMaterialBuchung.find({bautagesberichtId: that.get('id')}), function(el) {
	    	el.deleteSorted();
	    });
	    
	    // alle zugehörigen Notizen löschen
	    _.each(DigiWebApp.BautagebuchNotiz.find({bautagesberichtId: that.get('id')}), function(el) {
	    	el.deleteSorted();
	    });

	    // alle zugehörigen Medien löschen
	    _.each(DigiWebApp.BautagebuchMediaFile.find({bautagesberichtId: that.get('id')}), function(el) {
	    	el.deleteSorted();
	    });

	    // remove m_id from Key-Stringlist
	    var keys = [];
	    var newKeys = [];
	    try {
	    	var keyString = localStorage.getItem(DigiWebApp.ApplicationController.storagePrefix + '_' + that.name.toLowerCase() + 'Keys');
        	if ( keyString !== null) {
        		keys = JSON.parse(keyString);
        	}
	    } catch(e6) {
	    	trackError(e6);
	    }
        if(keys){
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
	    		that.del();
	    		if (typeof(successCallback) === "function") successCallback();
	    	}
        	, function(n){
		    	// delete record from localStorage anyway
	    		that.del();
	    		if (typeof(successCallback) === "function") successCallback();
	    	});
    	} else {
    		// there is no file to delete, so delete the record
    		that.del();
    		if (typeof(successCallback) === "function") successCallback();
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
        	trackError(e7);
        }
        var found = NO;
        _.each(keys, function(k) {
        	if (that.m_id === k) { found = YES; }
        });
        if (found === NO) { keys.push(that.m_id); }
        localStorage.setItem(DigiWebApp.ApplicationController.storagePrefix + '_' + that.name.toLowerCase() + 'Keys', JSON.stringify(keys));
        return true;
	}

    , findSorted: function() {
        var that = this;
        var keys = [];
        try {
	    	var keyString = localStorage.getItem(DigiWebApp.ApplicationController.storagePrefix + '_' + that.name.toLowerCase() + 'Keys');
        	if ( keyString !== null) {
        		keys = JSON.parse(keyString);
        	}
        } catch(e8) {
        	trackError(e8);
        }

        var records = [];

        if(keys){
            _.each(keys, function(k) {
                records.push(that.find({key:DigiWebApp.ApplicationController.storagePrefix + that.name + '_' + k}));
            });
        }
        return records;
    }

}, M.DataProviderLocalStorage);
