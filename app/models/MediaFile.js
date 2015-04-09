// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: DigiWebApp
// Model: MediaFile
// ==========================================================================

DigiWebApp.MediaFile = M.Model.create({

    /* Define the name of your model. Do not delete this property! */
    __name__: 'MediaFile'

    , name: M.Model.attr('String',{
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

    , date: M.Model.attr('String', { // is aggregated by the two timestamp values above

    })

    , icon: M.Model.attr('String',{
        isRequired: NO
    })

    , orderId: M.Model.attr('String',{
        isRequired: NO
    })

    , orderName: M.Model.attr('String',{
        isRequired: NO
    })

    , positionId: M.Model.attr('String', {
        isRequired: NO
    })

    , positionName: M.Model.attr('String', {
        isRequired: NO
    })

    , activityId: M.Model.attr('String', {
        isRequired: NO
    })

    , activityName: M.Model.attr('String', {
        isRequired: NO
    })

    , mitarbeiterId: M.Model.attr('String', {
        isRequired: NO
    })
    
    , handOrderName: M.Model.attr('String', {
        isRequired: NO
    })

    , handOrderId: M.Model.attr('String', {
        isRequired: NO
    })
    
    , latitude: M.Model.attr('String', {
        isRequired:NO
    })

    , longitude: M.Model.attr('String', {
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
    
    , deleteAll: function(successCallback) {
		var that = this;
		var files = that.find();
		var iMax = files.length;
		var i = 0;
		var internalSuccessCallback = function(el) {
			el.del();
			i = i + 1;
			if (i === iMax && typeof(successCallback) === "function") successCallback(); 
		};
	    _.each(that.find(), function(el) {
			if (el.hasFileName()) {
		    	// delete mediafile from device
		    	el.deleteFile(function(n){
			    	// delete record from localStorage only if file
		    		// was deleted successfully from device
		    		internalSuccessCallback(el);	    		
		    	}, function() {
		    		internalSuccessCallback(el);
		    	});
	    	} else {
	    		// there is no file to delete, so delete the record
	    		internalSuccessCallback(el);
	    	}
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
			//alert("saving with fileName " + that.get("fileName"));
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
	    	errorCallback = function(evt) {
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
				//alert("using navigator.webkitPersistentStorage");
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
				//alert("using window.requestFileSystem");

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
	    	errorCallback = function(evt) {
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
				//alert("using navigator.webkitPersistentStorage");
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
	    	errorCallback = function(evt) {
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

}, M.DataProviderLocalStorage);
