// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: DigiWebApp
// Model: Booking
// ==========================================================================

DigiWebApp.Booking = M.Model.create({

    /* Define the name of your model. Do not delete this property! */
    __name__: 'Booking'

    , fileName: M.Model.attr('String', {
        isRequired: NO
    })

    , fileType: M.Model.attr('String', {
        isRequired: NO
    })

    , orderId: M.Model.attr('String',{
        isRequired: NO
    })

    , orderName: M.Model.attr('String',{
        isRequired: NO
    })

    , timezoneOffset: M.Model.attr('String', {
        isRequired: NO
    })

    , timezone: M.Model.attr('String', {
        isRequired: NO
    })

    , timeStampStart: M.Model.attr('String', {
        isRequired: NO
    })

    , timeStampEnd: M.Model.attr('String', {
        isRequired: NO
    })

    , date: M.Model.attr('String', { // is aggregated by the two timestamp values above

    })

    , latitude: M.Model.attr('String', {
        isRequired:NO
    })

    , longitude: M.Model.attr('String', {
        isRequired: NO
    })

    , latitude_bis: M.Model.attr('String', {
        isRequired:NO
    })

    , longitude_bis: M.Model.attr('String', {
        isRequired: NO
    })

    , gpsLaengeVon: M.Model.attr('String', {
    	// runtime only (für das senden)
        isRequired: NO
    })

    , gpsBreiteVon: M.Model.attr('String', {
    	// runtime only (für das senden)
        isRequired: NO
    })

    , gpsLaengeBis: M.Model.attr('String', {
    	// runtime only (für das senden)
        isRequired: NO
    })

    , gpsBreiteBis: M.Model.attr('String', {
    	// runtime only (für das senden)
        isRequired: NO
    })

    , handOrderId: M.Model.attr('String', {
        isRequired: NO
    })

    , handOrderName: M.Model.attr('String', {
        isRequired: NO
    })

    , handauftragsId: M.Model.attr('String', {
        isRequired: NO
    })

    , handauftragsBezeichnung: M.Model.attr('String', {
        isRequired: NO
    })

    , positionId: M.Model.attr('String', {
        isRequired: NO
    })

    , positionName: M.Model.attr('String',{
        isRequired: NO
    })

    , activityId: M.Model.attr('String', {
        isRequired: NO
    })

    , activityName: M.Model.attr('String',{
        isRequired: NO
    })

    , isCurrent: M.Model.attr('Boolean', {
        isRequired: NO
    })
    
    , spesenAuswahl: M.Model.attr('String', {
        isRequired: NO
    })

    , uebernachtungAuswahl: M.Model.attr('String', {
        isRequired: NO
    })

    , employees: M.Model.attr('String', {
        isRequired: NO
    })

    , mitarbeiterId: M.Model.attr('String', {
    	// runtime only (für das senden)
        isRequired: NO
    })
    
    , remark: M.Model.attr('String', {
        isRequired: NO
    })

    , unterschrift_hoehe: M.Model.attr('String', {
        isRequired: NO
    })

    , unterschrift_breite: M.Model.attr('String', {
        isRequired: NO
    })
    
    , istFeierabend: M.Model.attr('Boolean', {
    	isRequired: NO
    })
    
    , istKolonnenbuchung: M.Model.attr('Boolean', {
    	isRequired: NO
    })
    
    , genauigkeitVon: M.Model.attr('String', {
    	isRequired: NO
    })

    , gps_zeitstempelVon: M.Model.attr('String', {
    	isRequired: NO
    })

    , ermittlungsverfahrenVon: M.Model.attr('String', {
    	isRequired: NO
    })

    , genauigkeitBis: M.Model.attr('String', {
    	isRequired: NO
    })

    , gps_zeitstempelBis: M.Model.attr('String', {
    	isRequired: NO
    })

    , ermittlungsverfahrenBis: M.Model.attr('String', {
    	isRequired: NO
    })

    , ServiceApp_Status: M.Model.attr('String', {
    	isRequired: NO
    })

    , closeBooking: function(location) {
		try {
			this.set('timeStampEnd', DigiWebApp.BookingController.currentBookingTimesStampBook.getTime());
		} catch (e2) {
			var timeEnd = new Date();
	        this.set('timeStampEnd', timeEnd.getTime());
		}
        if (location) {
        	this.set('latitude_bis',  location.latitude);
        	this.set('longitude_bis', location.longitude);
        }
    }

    , setRemark: function(v) {
        this.set('remark', v);
    }

    , setAsCurrent: function() {
        this.set('isCurrent', YES);
    }

    , removeAsCurrent: function() {
        this.set('isCurrent', NO);
    }

    , deleteAll: function() {
    	try {
			var that = this;
		    _.each(that.find(), function(el) {
				if (el.hasFileName()) {
			    	// delete signature from device
			    	try {
			    		el.deleteFile(function(n){
			    			// delete record from localStorage only if file
			    			// was deleted successfully from device
			    			el.del();	    		
			    		});
			    	} catch(e3) {
		    			el.del();	    		
			    	}
		    	} else {
		    		// there is no file to delete, so delete the record
		    		el.del();
		    	}
		    });
    	} catch(e4) { console.error(e4); }
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
			that.set('fileName', that.__proto__.name + '_Signature_' + D8.now().getTimestamp());
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
		} catch(e5) {
			errorCallback(e5);
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
		} catch(e6) {
			errorCallback(e6);
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
		} catch(e7) {
			errorCallback(e7);
		}
	}

}, M.DataProviderLocalStorage);
