// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: DigiWebApp
// Controller: ServiceAppController
// ==========================================================================
// manuell var-checked
DigiWebApp.ServiceAppController = M.Controller.extend({

	ServiceAppCommunication: function(data, callback, timeout) {
	
		if (typeof(timeout) !== "undefined") {
			this.timeout = timeout;
		} else {
			this.timeout = 3000;
		}
		//this._requestInterval = this.timeout / 10; // immer zehnmal innerhalb des gewünschten Timeouts nach Antwort der ServiceApp suchen 
		this._requestInterval = 300; // immer alle 300ms nach Antwort der ServiceApp suchen 
		this.sendData = data;
		this.callback = callback;
		this._requestFileName = "DigiWebAppServiceApp." + new Date().getTime() + ".response.json";
		this.returnData = null;
		this.internalCallback = function(data2) {
			var that = this;
			//DigiWebApp.ApplicationController.DigiLoaderView.hide();
			that.callback(data2);
		};
		
		this.available = null;
		
		this.ermittleGeokoordinate = DigiWebApp.SettingsController.getSetting("ServiceApp_ermittleGeokoordinate");
		this.uebertragen = DigiWebApp.SettingsController.getSetting("ServiceApp_datenUebertragen");
		this.engeKopplung = DigiWebApp.SettingsController.getSetting("ServiceApp_engeKopplung");
		this.debug = DigiWebApp.SettingsController.getSetting("debug");
		this.password = DigiWebApp.SettingsController.getSetting("password");
		this.workerId = DigiWebApp.SettingsController.getSetting("workerId");
		if (this.workerId === "") {
			this.workerId = 0;
		}
		this.company = DigiWebApp.SettingsController.getSetting("company");
		if (this.company === "") {
			this.company = 0;
		}
		this.WebAppVersion = DigiWebApp.app.config.version;
		this.WebAppGPSTimeout = DigiWebApp.SettingsController.getSetting("GPSTimeOut");
	
		this.sendData.parameter = {};
	
		this.send = function() {
			var that = this;
			that.sendData.parameter = {
			        "ermittleGeokoordinate": this.ermittleGeokoordinate
			      , "uebertragen": this.uebertragen
			      , "engeKopplung": this.engeKopplung
			      , "debug": this.debug
			      , "fileName": this._requestFileName
			      , "kennwort": this.password
			      , "GeraeteId": this.workerId
			      , "firmenId": this.company
			      , "WebAppVersion": this.WebAppVersion
			      , "WebAppGPSTimeout": this.WebAppGPSTimeout
				};
		    $.ajax({
		        dataType: "json"
		      , type: "POST"
		             , crossDomain: true
		             , processData: false
		             , async: true
		             , contentType: 'application/json'
		      , url: 'http://127.0.0.1:' + DigiWebApp.SettingsController.getSetting("ServiceApp_PORT") + '/'
		      , data: JSON.stringify(data)
		      , success: function(jqXHR, textStatus, errorThrown) { that.returnHandler(jqXHR, textStatus, errorThrown); }
		      , error: function(jqXHR, textStatus, errorThrown) { that.returnHandler(jqXHR, textStatus, errorThrown); }
		      , timeout: 1000
			});
		};
		
		this.returnHandler = function(jqXHR, textStatus, errorThrown) {
			var that = this;
			this._readFile_Interval_Counter = 0;
			this._readFile_IntervalVar = window.setInterval(function() { that.readFileHandler(); }, this._requestInterval);
		};
		
		this.readFileHandler = function() {
			 var that = this;
	    	 this._readFile_Interval_Counter++;
	         if (this._readFile_Interval_Counter > (this.timeout / this._requestInterval)) { // if ServiceApp-File has not been found --> ServiceApp seems to be unavailable 
	        	 window.clearInterval(this._readFile_IntervalVar);
	        	 this._readFile_Interval_Counter = null;
	        	 this.available = false;
	        	 DigiWebApp.ApplicationController.DigiLoaderView.hide();
	        	 this.callback(null);
	         }
	         this.readFromFile(this._requestFileName, function(data3) {
	             window.clearInterval(that._readFile_IntervalVar);
	             that.returnData = data3;
	             that.available = true;
	             if (false) { // nicht direkt löschen (kann zu Java-Exceptions führen)
		             that.deleteFile(that._requestFileName, function(){
		                 //console.log("erfolgreich gelöscht");
		            	 that.internalCallback(that.returnData);
		             }, function(){
		                 //console.log("nicht gelöscht");
		            	 that.internalCallback(that.returnData);
		             });
	             } else {
	            	 that.internalCallback(that.returnData);
	             }
	         }, function(err) {
	        	 that.available = false;
	         });          
		};
	
		this.readFromFile = function(fileName, successCallback, myErrorCallback) {
		               
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
		        if (!fileName || (fileName) && (fileName.length === 0)) {
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
		                                    dataDirectory.getFile(fileName, null, function(fileEntry) {
		                                          
		                                          // get file from fileEntry
		                                          fileEntry.file(function(file) {
		                                                 
			                                          try {
				                                          // read from file
				                                          var reader = new FileReader();
				                                          reader.onloadend = function(evt) {
				                                        	  // return content via successCallback
				                                              successCallback(evt.target.result);
				                                          };
				                                          reader.readAsText(file);
			                                          } catch(e3) {}
		                                            
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
		                             dataDirectory.getFile(fileName, null, function(fileEntry) {
		                                   
		                                   // get file from fileEntry
		                                   fileEntry.file(function(file) {
		                                	   
		                                          try {
			                                          // read from file
			                                          var reader = new FileReader();
			                                          reader.onloadend = function(evt) {
			                                        	  // return content via successCallback
			                                              successCallback(evt.target.result);
			                                          };
			                                          reader.readAsText(file);
		                                          } catch(e4) {}
		                                     
		                                   }, errorCallback); // fileEntry.file
		                             }, errorCallback);     // dataDirectory.getFile
		                          }, errorCallback);         // fileSystem.root.getDirectory
		                   }, errorCallback);             // window.requestFileSystem
		               }
		        } catch(e5) {
		               errorCallback(e5);
		        }
		};
	
		this.deleteFile = function(fileName, successCallback, myErrorCallback) {
		      
		    // check if fileName is set
		    if (!fileName || (fileName) && (fileName.length === 0)) {
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
		                                  dataDirectory.getFile(fileName, null, function(fileEntry) {
		                                        
		                                        // remove fileEntry
		                                	  	try {
		                                	  		fileEntry.remove(successCallback, errorCallback);
		                                	  	} catch(e6) {}
		                                        
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
		                           dataDirectory.getFile(fileName, null, function(fileEntry) {
		                                 
		                                 // remove fileEntry
	                               	  	try {
	                            	  		fileEntry.remove(successCallback, errorCallback);
	                            	  	} catch(e7) {}
		                                 
		                           }, errorCallback);     // dataDirectory.getFile
		                        }, errorCallback);         // fileSystem.root.getDirectory
		                 }, errorCallback);             // window.requestFileSystem
		             }
		      } catch(e8) {
		             errorCallback(e8);
		      }
		};
		
		this.listDataDirectory = function(successCallback, myErrorCallback) {
			
			// check for errorCallback is a function (optional)
			  var errorCallback;
		      if (!myErrorCallback || (typeof myErrorCallback !== "function")) {
		         errorCallback = function(evt) {
		               console.error("deleteFileError", evt);
		         };
		      } else {
		    	  errorCallback = myErrorCallback;
		      }
			  
			// check for successCallback is a function
			if (typeof successCallback !== "function") {
				console.error("listDataDirectoryError: successCallback is not a function");
				return false;
			}
	
	        // check if LocalFileSystem is defined
	        if (typeof window.requestFileSystem === "undefined") {
	               console.error("listDataDirectoryError: no LocalFileSystem available");
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
	                            	 
//	                            	 var toArray = function(list) {
//	                            		 return Array.prototype.slice.call(list || [], 0);
//	                            	 };

	                            	 var myDirReader = dataDirectory.createReader();
	                            	 //var entries = [];
	                            	 var readEntries = function() {
	                            		 myDirReader.readEntries (function(results) {
//	                            			 if (!results.length) {
	                            				 // alle Verzeichniseinträge geladen
	                            				 var result = [];
//	                            				 _.each(entries.sort(), function(fileEntry) {
	                                		     _.each(results, function(fileEntry) {
	                                		    	 if (DigiWebApp.SettingsController.getSetting("debug")) console.log(fileEntry.fullPath);
	                                		    	 var myArr = fileEntry.fullPath.split("/");
	                            					 result.push(myArr[myArr.length - 1]);
	                            				 });
	                                		     if (DigiWebApp.SettingsController.getSetting("debug")) console.log("listDirectory result", result);
	                            				 successCallback(result);
//	                            			 } else {
//	                            				 if (DigiWebApp.SettingsController.getSetting("debug")) console.log("results", results);
//	                            				 if (DigiWebApp.SettingsController.getSetting("debug")) console.log("entries", entries);
//	                            				 entries = entries.concat(toArray(results));
//	                            				 readEntries();
//	                            			 }
	                            		 }, function(err){console.error("error in readEntries:", err);});
	                            	  };

	                            	  readEntries(); // Start reading dirs.
	                                                 
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
	                    	  
//                         	 var toArray = function(list) {
//                         		if (DigiWebApp.SettingsController.getSetting("debug")) console.log("in toArray");
//                        		 return Array.prototype.slice.call(list || [], 0);
//                        	 }

                         	 //var i = 0;
                        	 var myDirReader = dataDirectory.createReader();
                        	 //var entries = [];
                        	 var readEntries = function() {
                        		 myDirReader.readEntries (function(results) {
//                        			 if (!results.length) {
                        				 // alle Verzeichniseinträge geladen
                        				 var result = [];
//                        				 _.each(entries.sort(), function(fileEntry) {
                            		     _.each(results, function(fileEntry) {
                            		    	 if (DigiWebApp.SettingsController.getSetting("debug")) console.log(fileEntry.fullPath);
                            		    	 var myArr = fileEntry.fullPath.split("/");
                        					 result.push(myArr[myArr.length - 1]);
                        				 });
                            		     if (DigiWebApp.SettingsController.getSetting("debug")) console.log("listDirectory result", result);
                        				 successCallback(result);
//                        			 } else {
//                        				 if (DigiWebApp.SettingsController.getSetting("debug")) console.log("results", results);
//                        				 if (DigiWebApp.SettingsController.getSetting("debug")) console.log("entries", entries);
//                        				 entries = entries.concat(toArray(results));
//                        				 i++;
//                        				 if (i < 10) {
//                        					 readEntries();
//                        				 } else {
//                        					 if (DigiWebApp.SettingsController.getSetting("debug")) console.log(entries);
//                            			 }
//                        			 }
                        		 }, function(err){console.error("error in readEntries:", err);});
                        	  };

                        	  readEntries(); // Start reading dirs.

	                      }, errorCallback);         // fileSystem.root.getDirectory
	                   }, errorCallback);             // window.requestFileSystem
	               }
	        } catch(e9) {
	               errorCallback(e9);
	        }
		};
	}
//	, directoryServiceAppObj: null
	, listDirectory: function(callback) {
	    var myServiceApp = new DigiWebApp.ServiceAppController.ServiceAppCommunication({}, callback);
//	    this.directoryServiceAppObj = myServiceApp;
	    myServiceApp.listDataDirectory(callback);
	}
	
	, deleteFile: function(fileName, callback) {
	    var myServiceApp = new DigiWebApp.ServiceAppController.ServiceAppCommunication({}, callback);
	    myServiceApp.deleteFile(fileName, callback, callback);
	}
	
	, knockknock: function(successCallback, errorCallback, timeout) {
		//if (DigiWebApp.SettingsController.getSetting("debug")) console.log("in knockknock");
	    var knockknockData = { "GET": { "buchungen": [] , "queryParameter": null } };
	    var callback = function(data) {
			   if (this.available) {
				   successCallback(data);
			   } else {
				   errorCallback();
			   }
	    };
	    var myServiceApp = new DigiWebApp.ServiceAppController.ServiceAppCommunication(knockknockData, callback, timeout);
	    myServiceApp.send();
	}
	
	, getBookings: function(ids, successCallback, errorCallback, timeout, engeKopplungOverride) {
		//DigiWebApp.ApplicationController.DigiLoaderView.show(M.I18N.l('ServiceAppKommunikation'));
		if (DigiWebApp.SettingsController.getSetting("debug")) console.log("in getBookings");
	    var payloadData = { "GET": { "buchungen": [] , "queryParameter": {"ids": ids} } };
	    var callback = function(data) {
			   if (this.available) {
				   if (DigiWebApp.SettingsController.getSetting("debug")) console.log("getBookings Success");
				   successCallback(data);
			   } else {
				   if (DigiWebApp.SettingsController.getSetting("debug")) console.log("getBookings Error");
				   errorCallback();
			   }
	    };
	    var myServiceApp = new DigiWebApp.ServiceAppController.ServiceAppCommunication(payloadData, callback, timeout);
	    myServiceApp.engeKopplung = (typeof(engeKopplungOverride) !== "undefined" && engeKopplungOverride === true);
	    myServiceApp.send();
	}

	, deleteFilesInServiceApp: function(fileNames, successCallback, errorCallback, timeout, engeKopplungOverride) {
		//DigiWebApp.ApplicationController.DigiLoaderView.show(M.I18N.l('ServiceAppKommunikation'));
		if (DigiWebApp.SettingsController.getSetting("debug")) console.log("in deleteFilesInServiceApp");
	    var payloadData = { "DELETEFILES": { "files": [] , "queryParameter": {"fileNames": fileNames} } };
	    var callback = function(data) {
			   if (this.available) {
				   //if (DigiWebApp.SettingsController.getSetting("debug")) console.log("deleteFilesInServiceApp Success");
				   successCallback(data);
			   } else {
				   //if (DigiWebApp.SettingsController.getSetting("debug")) console.log("deleteFilesInServiceApp Error");
				   errorCallback();
			   }
	    };
	    var myServiceApp = new DigiWebApp.ServiceAppController.ServiceAppCommunication(payloadData, callback, timeout);
	    myServiceApp.engeKopplung = (typeof(engeKopplungOverride) !== "undefined" && engeKopplungOverride === true);
	    myServiceApp.send();
	}
	
	, pollBookings: function(ids, successCallback, errorCallback, timeout) {
		DigiWebApp.ApplicationController.DigiLoaderView.show(M.I18N.l('ServiceAppKommunikation'));
		if (DigiWebApp.SettingsController.getSetting("debug")) console.log("in pollBookings");
		var internalSuccessCallback = function(data) {
			try {
				if (DigiWebApp.SettingsController.getSetting("debug")) console.log("pollBookings Success");
				var datensaetze = [];
				_.each(JSON.parse(data).GET.buchungen, function(buchung) {
					if (buchung.status === "OK") {
						datensaetze.push(buchung.datensatz);
					}
				});
				if (DigiWebApp.SettingsController.getSetting("debug")) console.log("pollBookings Success mit " + datensaetze.length + " Datensätzen");
				successCallback(datensaetze);
			} catch(e10) {
				console.error(e10);
				errorCallback(e10.message);
			}
		};
		this.getBookings(ids, internalSuccessCallback, errorCallback, timeout, true);
	}
	
	, putBookings: function(bookings, successCallback, errorCallback, timeout) {
		DigiWebApp.ApplicationController.DigiLoaderView.show(M.I18N.l('ServiceAppKommunikation'));
		if (DigiWebApp.SettingsController.getSetting("debug")) console.log("in putBookings");
		var payloadData = { "PUT": { "buchungen": [] } };
	    _.each(bookings, function(booking) {
	    	payloadData.PUT.buchungen.push({"datensatz": booking, "status": "WAIT"});
	    });
	    var callback = function(data) {
			   if (this.available) {
				   successCallback(data);
			   } else {
				   errorCallback();
			   }
	    };
	    var myServiceApp = new DigiWebApp.ServiceAppController.ServiceAppCommunication(payloadData, callback, timeout);
	    myServiceApp.send();
	}
	
	, postBookings: function(bookings, successCallback, errorCallback, timeout) {
		DigiWebApp.ApplicationController.DigiLoaderView.show(M.I18N.l('ServiceAppKommunikation'));
		if (DigiWebApp.SettingsController.getSetting("debug")) console.log("in postBookings");
		var payloadData = { "POST": { "buchungen": [] } };
	    _.each(bookings, function(booking) {
	    	payloadData.POST.buchungen.push({ "datensatz": booking, "status": "WAIT" });
	    });
	    var callback = function(data) {
			   if (this.available) {
				   successCallback(data);
			   } else {
				   errorCallback();
			   }
	    };
	    var myServiceApp = new DigiWebApp.ServiceAppController.ServiceAppCommunication(payloadData, callback, timeout);
	    myServiceApp.send();
	}

	, deleteBookings: function(ids, successCallback, errorCallback, timeout) {
		DigiWebApp.ApplicationController.DigiLoaderView.show(M.I18N.l('ServiceAppKommunikation'));
		if (DigiWebApp.SettingsController.getSetting("debug")) console.log("in deleteBookings");
	    var payloadData = { "DELETE": { "buchungen": [] , "queryParameter": {"ids": ids} } };
	    var callback = function(data) {
			   if (this.available) {
				   if (DigiWebApp.SettingsController.getSetting("debug")) console.log("deleteBookings Success");
				   successCallback(data);
			   } else {
				   if (DigiWebApp.SettingsController.getSetting("debug")) console.log("deleteBookings Error");
				   errorCallback();
			   }
	    };
	    var myServiceApp = new DigiWebApp.ServiceAppController.ServiceAppCommunication(payloadData, callback, timeout);
	    myServiceApp.engeKopplung = (typeof(engeKopplungOverride) !== "undefined" && engeKopplungOverride === true);
	    myServiceApp.send();
	}

	, refreshWAITBookings: function(successCallback, errorCallback, fileNamesToDelete) {
		var that = this;

		//DigiWebApp.ApplicationController.DigiLoaderView.show(M.I18N.l('ServiceAppKommunikation'));
		if (DigiWebApp.SettingsController.getSetting("debug")) console.log("in refreshWAITBookings");
		var bookings = DigiWebApp.Booking.find();
		var bookingIdsRefresh = [];
		_.each(bookings, function(booking){
			if (typeof(booking.get("ServiceApp_Status")) == "undefined" || booking.get("ServiceApp_Status") === "WAIT") {
				bookingIdsRefresh.push(booking.m_id);
			}
		});
		var iDsOnWAITgefunden = [];
		if (bookingIdsRefresh.length > 0) {
			if (DigiWebApp.SettingsController.getSetting("debug")) console.log("bookingIdsRefresh: " + JSON.stringify(bookingIdsRefresh));
			that.getBookings(bookingIdsRefresh, function(data){
				if (fileNamesToDelete !== [] && fileNamesToDelete !== null && typeof(fileNamesToDelete) !== "undefined") {
					that.deleteFilesInServiceApp(fileNamesToDelete, function(data2){
					}, function(){
					});
				}
				try {
					if (DigiWebApp.SettingsController.getSetting("debug")) console.log("data: ", data);
					var recievedBookings = JSON.parse(data).GET.buchungen;
					_.each(recievedBookings, function(rBooking) {
						var datensatz = rBooking.datensatz;
						var updateModelBooking = function(modelBooking, datensatzObj) {
							if (DigiWebApp.SettingsController.getSetting("ServiceApp_ermittleGeokoordinate")) {
								var datensatz = datensatzObj.record;
								if (DigiWebApp.SettingsController.getSetting("debug")) console.log("veraebeite datensatz ", datensatz);
								if (typeof(datensatz.latitude) !== "undefined") { modelBooking.set("latitude", datensatz.latitude); }
								if (typeof(datensatz.latitude_bis) !== "undefined") { modelBooking.set("latitude_bis", datensatz.latitude_bis); }
								if (typeof(datensatz.longitude) !== "undefined") { modelBooking.set("longitude", datensatz.longitude); }
								if (typeof(datensatz.longitude_bis) !== "undefined") { modelBooking.set("longitude_bis", datensatz.longitude_bis); }
								if (typeof(datensatz.ermittlungsverfahren_bis) !== "undefined") { modelBooking.set("ermittlungsverfahrenBis", datensatz.ermittlungsverfahren_bis); }
								if (typeof(datensatz.ermittlungsverfahren) !== "undefined") { modelBooking.set("ermittlungsverfahrenVon", datensatz.ermittlungsverfahren); }
								if (typeof(datensatz.genauigkeit_bis) !== "undefined") { modelBooking.set("genauigkeitBis", datensatz.genauigkeit_bis); }
								if (typeof(datensatz.genauigkeit) !== "undefined") { modelBooking.set("genauigkeitVon", datensatz.genauigkeit); }
								if (typeof(datensatz.gps_zeitstempel_bis) !== "undefined") { modelBooking.set("gps_zeitstempelBis", datensatz.gps_zeitstempel_bis); }
								if (typeof(datensatz.gps_zeitstempel) !== "undefined") { modelBooking.set("gps_zeitstempelVon", datensatz.gps_zeitstempel); }
								modelBooking.save();
								if (DigiWebApp.SettingsController.getSetting("debug")) console.log("refreshWAITBookings: datensatz " + datensatzObj.m_id + " gespeichert");
							}
						};
						var modelBooking = _.find(DigiWebApp.Booking.find(), function(b) { return b.m_id === datensatz.m_id;});
						modelBooking.set("ServiceApp_Status", rBooking.status);
						modelBooking.save();
						switch(rBooking.status) {
							case "WAIT":
								updateModelBooking(modelBooking, datensatz);
								iDsOnWAITgefunden.push(datensatz.m_id);
								break;
							case "OK":
								updateModelBooking(modelBooking, datensatz);
								break;
							case "SENT":
								// move to SentBookings
								if (DigiWebApp.SettingsController.getSetting("ServiceApp_datenUebertragen")) {
									DigiWebApp.BookingController.sentBooking(modelBooking).save();
									modelBooking.del();
								}
								break;
							case "DELETE":
								modelBooking.del();
								break;
							default:
								errorCallback("getBookings: Unbekannter Status");
						}
					});
					DigiWebApp.ApplicationController.DigiLoaderView.hide();
					if (iDsOnWAITgefunden.length > 0 && typeof(successCallback) === "function") {
						if (DigiWebApp.SettingsController.getSetting("debug")) console.log("pollBookings (enge Kopplung) mit", iDsOnWAITgefunden);
						var checkForOK = function(datensaetze) {
							if (DigiWebApp.SettingsController.getSetting("debug")) console.log(datensaetze.length + " Datensätze empfangen");
							_.each(datensaetze, function(datensatzObj) {
								if (DigiWebApp.SettingsController.getSetting("debug")) console.log("speichere gepollten Datensatz " + datensatzObj.m_id);
								var modelBooking = _.find(DigiWebApp.Booking.find(), function(b) { return b.m_id === datensatzObj.m_id; } );
								var datensatz = datensatzObj.record;
								if (DigiWebApp.SettingsController.getSetting("debug")) console.log("modelBooking: ", modelBooking);
								if (DigiWebApp.SettingsController.getSetting("debug")) console.log("datensatz: ", datensatz);
								modelBooking.set("latitude", datensatz.latitude);
								modelBooking.set("latitude_bis", datensatz.latitude_bis);
								modelBooking.set("longitude", datensatz.longitude);
								modelBooking.set("longitude_bis", datensatz.longitude_bis);
								modelBooking.set("ermittlungsverfahrenBis", datensatz.ermittlungsverfahren_bis);
								modelBooking.set("ermittlungsverfahrenVon", datensatz.ermittlungsverfahren);
								modelBooking.set("genauigkeitBis", datensatz.genauigkeit_bis);
								modelBooking.set("genauigkeitVon", datensatz.genauigkeit);
								modelBooking.set("gps_zeitstempelBis", datensatz.gps_zeitstempel_bis);
								modelBooking.set("gps_zeitstempelVon", datensatz.gps_zeitstempel);
								modelBooking.save();
								if (DigiWebApp.SettingsController.getSetting("debug")) console.log("datensatz " + datensatzObj.m_id + " gespeichert");
							});
							successCallback();
						};
						that.pollBookings(iDsOnWAITgefunden, checkForOK, successCallback, DigiWebApp.SettingsController.getSetting('GPSTimeOut'));
					} else {
						if (typeof(successCallback) === "function") successCallback();	
					}
				} catch(e11) {
					DigiWebApp.ApplicationController.DigiLoaderView.hide();
					errorCallback("ERROR in getBookings: " + e11.message);
				}
			}, function(){
				DigiWebApp.ApplicationController.DigiLoaderView.hide();
				if (fileNamesToDelete !== [] && fileNamesToDelete !== null && typeof(fileNamesToDelete) !== "undefined") {
					that.deleteFilesInServiceApp(fileNamesToDelete, function(data){
					}, function(){
					});
				}
				errorCallback("getBookings: ServiceApp hat nicht geantwortet!");
			});
		} else {
			// es gibt keine Buchungen zu aktialisieren
			if (fileNamesToDelete !== [] && fileNamesToDelete !== null && typeof(fileNamesToDelete) !== "undefined") {
				that.deleteFilesInServiceApp(fileNamesToDelete, function(data){
				}, function(){
				});
			}
			if (typeof(successCallback) === "function") successCallback();
		}
	}
	
});
