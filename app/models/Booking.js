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

    , modelVersion: M.Model.attr('String', {
        isRequired: NO
    })

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

    , startTimeString: M.Model.attr('String', {
        isRequired: NO
    })

    , endeTimeString: M.Model.attr('String', {
        isRequired: NO
    })

    , startDateString: M.Model.attr('String', {
        isRequired: NO
    })

    , endeDateString: M.Model.attr('String', {
        isRequired: NO
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

    , handOrderVaterId: M.Model.attr('String', {
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

    , gefahreneKilometer: M.Model.attr('Number', {
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
		var that = this;
		var myTimeStampEnd = null;
		try {
			myTimeStampEnd = DigiWebApp.BookingController.currentBookingTimesStampBook.getTime();
		} catch (e2) {
			var timeEnd = new Date();
			myTimeStampEnd = timeEnd.getTime();
		}

		if (
		      (M.Date.create(that.get("timeStampStart")).format('HH:MM') == M.Date.create(myTimeStampEnd).format('HH:MM')) 
		   && ((that.get("timeStampEnd") == null) || (that.get("timeStampEnd") == "") || (parseIntRadixTen(that.get("timeStampEnd")) == 0))
		
		) {

			// innerhalb einer Minute mehrfach umgebucht
	        return false;
	        
		} else if (M.Date.create(that.get("timeStampStart")).format('HH:MM:ss') == M.Date.create(myTimeStampEnd).format('HH:MM:ss')) {
			
        	var thatToLog = this;

        	// bereits abgeschlossene Buchung laden und aktualisieren, um erneut gesendet zu werden (Webservice kann damit umgehen)
        	writeToLog("bereits abgeschlossene Buchung laden und aktualisieren, um erneut gesendet zu werden (" + JSON.stringify(thatToLog));

        	// ---
			var found = _.find(DigiWebApp.Booking.find(), function(booking) {
				  return (M.Date.create(that.get("timeStampEnd")).format('HH:MM:ss') == M.Date.create(myTimeStampEnd).format('HH:MM:ss'));
			});
	        
	        if (found) {
	        	
	        	writeToLog("gefunden in Bookings");

	        	// etwaige Geokoordinaten nachtragen
	            if (found.get("latitude_bis") == null) {
	            	found.set("latitude_bis", location.latitude);
	            }
	            if (found.get("longitude_bis") == null) {
	            	found.set("longitude_bis", location.longitude);
	            }
	            if (found.get("genauigkeitBis") == null) {
	            	found.set("genauigkeitBis", location.accuracy);
	            }
	            if (found.get("gps_zeitstempelBis") == null) {
	            	found.set("gps_zeitstempelBis", location.date.date.getTime());
	            }
	
	        	found.save();
	        	
	        } else {
	        	
	        	// evtl. wurde diese Buchung bereits gesendet (kann erneut gesendet werden - das wird vom Webservice erkannt (dann UPDATE statt INSERT))
	        
	            var found = _.find(DigiWebApp.SentBooking.find(), function(booking) {
					  return (M.Date.create(that.get("timeStampEnd")).format('HH:MM:ss') == M.Date.create(myTimeStampEnd).format('HH:MM:ss'));
	            });
	
	            if (found) {
	            	
		        	writeToLog("gefunden in SentBookings");

		        	// für jede gesendete gibt es (falls Freischaktung aktiv) auch eine archivierte
	                var foundSentArchived = _.find(DigiWebApp.SentBookingArchived.find(), function(booking) {
	                	return (M.Date.create(that.get("timeStampEnd")).format('HH:MM:ss') == M.Date.create(myTimeStampEnd).format('HH:MM:ss'));
	                });
	                if (foundSentArchived) {
	                	foundSentArchived.del(); // archivierte Buchung löschen (wird beim erneuten Senden wieder angelegt)
	                }
	
	                // gesendete Buchung als neue, ungesendete Buchung anlegen
		            var newUnsent = DigiWebApp.Booking.createRecord({}); // neue Buchung erzeugen
		            newUnsent.m_id = found.m_id; // Identität der Buchung kopieren
		            newUnsent.record = JSON.parse(JSON.stringify(found.record)); // Inhalt umkopieren
	
		            // etwaige Geokoordinaten nachtragen
		            if (newUnsent.get("latitude_bis") == null) {
		            	newUnsent.set("latitude_bis", location.latitude);
		            }
		            if (newUnsent.get("longitude_bis") == null) {
		            	newUnsent.set("longitude_bis", location.longitude);
		            }
		            if (newUnsent.get("genauigkeitBis") == null) {
		            	newUnsent.set("genauigkeitBis", location.accuracy);
		            }
		            if (newUnsent.get("gps_zeitstempelBis") == null) {
		            	newUnsent.set("gps_zeitstempelBis", location.date.date.getTime());
		            }

		            newUnsent.save(); // neue Buchung speichern
		            found.del(); // bereits gesendete Buchung löschen
		            
	            } else {
	            	
	            	writeToLog("unexpectedErrorWhileHandlingBooking");
	            	writeToLog("all Bookings: " + JSON.stringify(DigiWebApp.Booking.find()));
	            	writeToLog("all SentBookings: " + JSON.stringify(DigiWebApp.SentBooking.find()));
	                DigiWebApp.ApplicationController.nativeAlertDialogView({
	                    title: M.I18N.l('error')
	                  , message: M.I18N.l('unexpectedErrorWhileHandlingBooking')
	              });
	                
	            }
	        }
        	
        	// ---
			return false;
			
		} else {
			
            // "Normaler" Abschluss einer Buchung
	        if (location) {
	        	that.set('latitude_bis',  location.latitude);
	        	that.set('longitude_bis', location.longitude);
            	that.set("genauigkeitBis", location.accuracy);
            	that.set("gps_zeitstempelBis", location.date.date.getTime());
	        }
	        that.set('timeStampEnd', myTimeStampEnd);
	
			var dateDate = new Date(Number(that.get('timeStampEnd')) + (1000 * 60 * (new Date().getTimezoneOffset() - that.get('timezoneOffset'))));
	        var dateMDate = M.Date.create(dateDate.getTime());
	        var dateString = dateMDate.format('dd.mm.yyyy');
	        var timeString = dateMDate.format('HH:MM');
	        that.set('endeDateString', dateString);
	        that.set('endeTimeString', timeString);
	        			        
	        return true;
	        
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
    	} catch(e4) { trackError(e4); }
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
	    		trackError("readFromFileError");
	    	};
	    } else {
	    	errorCallback = myErrorCallback;
	    }
	    
		// check for successCallback is a function
		if (typeof successCallback !== "function") {
			trackError("readFromFileError: successCallback is not a function");
	        return false;
	    }
		
		// check if fileName is set
		//if ((!(that.get('fileName'))) || (that.get('fileName') && (that.get('fileName').length === 0))) {
		if (!that.hasFileName()) {
			trackError("readFromFileError: no fileName given");
			errorCallback();
	        return false;
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
		} catch(e6) {
			errorCallback(e6);
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
		} catch(e7) {
			errorCallback(e7);
		}
	}

}, M.DataProviderLocalStorage);
