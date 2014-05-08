// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: DigiWebApp
// Controller: BookingController
// ==========================================================================
// manuell var-checked

/*
* The controller that handles everything booking related.
* Is also the endpoint for action triggered on the BookingPage
* */
DigiWebApp.BookingController = M.Controller.extend({


    /**
     * The current open booking
     */
      currentBooking: null

    /**
     * The before opened booking closed and saved temporarily for 
     */
    , currentBookingClosed: null

    /**
     * The string representing the data of the current open booking.
     *
     * The currentBookingLabel of the BookingPage has a content binding on it, that means
     * setting a new value to this property will change the label's value
     */
    , currentBookingStr: ''
    	
    /**
     * Der Zeitstempel zum Zeitpunkt des Buchens durch den Benutzer
     */
    , currentBookingTimesStampBook: null

    /**
     * Flag indicating whether a switch to the bookingPage is back from employee selection page
     *
     * Important for determing whether to re-set selection lists or not
     */
    , isBackFromEmployeePage: NO

    , isBackFromRemarkPage: NO

    /**
     * Arrays of booking objects (model records).
     * Data for listview on time data page (open bookings)
     *
     * => list on timeDataPage has content binding on it
     */
    , timeData: null
    , timeDataSent: null
    , timeDataForEdit: null
    , timeDataSentDays: null
    , timeDataSentArchived: null
    
    , dayToDisplay: null

    /**
     *
     * On first load does:
     *
     * 1) searches for an open booking and sets it if available
     * 2) Builds the current booking string and sets it to property currentBookingStr
     * 3) Presets the selection lists to show the data of the current open booking
     *
     * On first and every other load:
     * If back from employee selection apge
     * 1) sets isBackFromEmployeePage to NO and nothing more
     *
     * Else
     * Sets the selection list according to different flags in SelectionController:
     * showHandOrders or useSelection (selection made before)
     * if they are false, set selection to current open booking
     * if no open booking reset selection
     *
     * @param {Boolean} isFirstLoad is passed if this function is used in a page event like pageshow => determines that the page is loaded for the very
     * first time during this application life cycle
     */
    , init: function(isFirstLoad) {
	
		if (isFirstLoad) {
			DigiWebApp.SelectionController.set("uebernachtungskennzeichenScholpp", JSON.parse('[{"label":"Keine Übernachtung","value":"1","isSelected":true},{"label":"Pauschal","value":"2"},{"label":"Beleg (Hotel)","value":"3"},{"label":"Heimreise","value":"4"},{"label":"Baustellenwechsel","value":"5"},{"label":"- -","value":"6"}]'));
			DigiWebApp.SelectionController.set("spesenkennzeichenScholpp", JSON.parse('[{"label":" ","value":"1","isSelected":true}]'));
		}
		
		var p = M.Environment.getPlatform();
        if (    (p.substr(0,10) !== "BlackBerry")
        	 && (p.substr(0,12) !== "Linux armv7l")
    		//&& (navigator.userAgent.toLowerCase().indexOf("android") === -1)
    	) {
        	// enable Transitions on iOS and Android
            DigiWebApp.ApplicationController.setTransitionsSetting();
		}
	
		if (this.isBackFromRemarkPage || this.isBackFromEmployeePage) {
			this.refreshCurrentBooking(false);
		} else {
			this.refreshCurrentBooking(true);
		}

        if (this.isBackFromEmployeePage) {
            DigiWebApp.BookingController.set('isBackFromEmployeePage', NO);
        } else if (this.isBackFromRemarkPage) {
            DigiWebApp.BookingController.set('isBackFromRemarkPage', NO);
            //console.log("isBackFromRemarkPage");
        } else {
			//this.refreshCurrentBooking(true);
            if (DigiWebApp.SelectionController.useSelections) {
            	//if (DigiWebApp.SettingsController.globalDebugMode) console.log('useSelections');
                DigiWebApp.SelectionController.setSelectionByPreviousSelection();
            } else if (DigiWebApp.SelectionController.showHandOrderFirst) {
                //if (DigiWebApp.SettingsController.globalDebugMode) console.log('showHandOrderFirst');
                DigiWebApp.SelectionController.showHandOrderFirst = NO;
                DigiWebApp.SelectionController.setSelectionWithCurrentHandOrderFirst();
            } else {
                if (this.currentBooking) {
                    //if (DigiWebApp.SettingsController.globalDebugMode) console.log('useCurrentBooking');
                    DigiWebApp.SelectionController.setSelectionByCurrentBooking();
                } else {
                    DigiWebApp.SelectionController.initSelection();
                }

            }
        }
    }

    /**
     * Called by init and book to handle changes in localStorage
     * 
     * @param {Boolean} reset Selection?
     */
    , refreshCurrentBooking: function (setSelection) {
    	
        var bookings = DigiWebApp.Booking.find();
        var openBookings = null;

        if (bookings.length > 0) {
            openBookings = _.select(bookings, function(b) {
                if (b) return b.get('isCurrent') === true;
            });
        }

        if (openBookings && openBookings.length > 0) {

            //if (DigiWebApp.SettingsController.globalDebugMode) console.log('currentBookingStr was ' + this.get('currentBookingStr'));

            this.set('currentBooking', openBookings[0]);
            this.set('currentBookingStr', this.buildBookingStr(this.currentBooking));

            //if (DigiWebApp.SettingsController.globalDebugMode) console.log('currentBookingStr is now ' + this.get('currentBookingStr'));

            if (setSelection) {
            	DigiWebApp.SelectionController.setSelectionByCurrentBooking();
            }
        }
    }

    , book: function() {
    	var that = DigiWebApp.BookingController;
    	try{DigiWebApp.ApplicationController.vibrate();}catch(e2){}
    	if (DigiWebApp.SettingsController.getSetting("debug"))  console.log("in book");
		if (this.checkBooking()) { // checkBooking checks for all booking-problems
			if (this.currentBooking) {
				// Start::Bemerkungsfeld (403)
				if (
						   (DigiWebApp.SettingsController.featureAvailable('403') && !DigiWebApp.SettingsController.getSetting('remarkIsOptional'))
						|| (DigiWebApp.SettingsController.featureAvailable('422') && DigiWebApp.Activity.findById(DigiWebApp.BookingController.currentBooking.get('activityId')).get('istFahrzeitRelevant'))
				){
						// if remark-feature active and not optional: go to remarkpage
						// or if gefahreneKilometer-Freischaltung is enabled: go to RemarkPage
						this.refreshCurrentBooking(false);
						DigiWebApp.NavigationController.toRemarkPage(function() {
		    		        DigiWebApp.BookingController.set('isBackFromRemarkPage', YES);
		    		        DigiWebApp.NavigationController.backToBookTimePagePOP();
		    				DigiWebApp.ApplicationController.DigiLoaderView.hide();
		    				DigiWebApp.ApplicationController.DigiLoaderView.show(M.I18N.l('Save'));
		    				DigiWebApp.BookingController.bookWithRemark();            					
						});
				} else {
					// else: bookWithRemark
    				DigiWebApp.ApplicationController.DigiLoaderView.hide();
    				DigiWebApp.ApplicationController.DigiLoaderView.show(M.I18N.l('Save'));
					DigiWebApp.BookingController.bookWithRemark();
				}
				// End::Bemerkungsfeld
			} else {
				DigiWebApp.ApplicationController.DigiLoaderView.hide();
				DigiWebApp.ApplicationController.DigiLoaderView.show(M.I18N.l('Save'));
				DigiWebApp.BookingController.bookWithRemark();
			}
		} // if (checkBooking())
    }

    /**
     * Called by clicking the button on bookingPage.
     *
     * Does the "preprocessing of a booking"
     *
     * 1) If kolonne is available and no employee selected yet, show employees page
     * 2) If autoSaveGPSData is active, fetch position first and then proceed booking, otherwise proceed booking immediately
     */
    , bookWithRemark: function() {
    	if (DigiWebApp.SettingsController.getSetting("debug"))  console.log("in bookWithRemark");

        // refresh bookings from localStorage
    	this.setNotBookedBookings(); // this also calls this.setBookedBookings() and this.setArchivedDays()
    	
    	// refresh currentBooking from localStorage
    	//if (DigiWebApp.SettingsController.globalDebugMode) console.log('refresh currentBooking');
		this.refreshCurrentBooking(false);
    	
    	// EmployeeSelection (Kolonne)
		if(DigiWebApp.EmployeeController.getEmployeeState() == 1) {
            DigiWebApp.ApplicationController.DigiLoaderView.hide();
            var employeeString = localStorage.getItem(DigiWebApp.EmployeeController.empSelectionKey);
            if(!employeeString && (DigiWebApp.Booking.find().length === 0)) {
                DigiWebApp.NavigationController.toEmployeePage();
            } else {
            	DigiWebApp.ApplicationController.nativeAlertDialogView({
                    title: M.I18N.l('transmitFirst')
                  , message: M.I18N.l('transmitFirstMsg')
                });
            }
            return;
        }
        
		this.currentBookingTimesStampBook = new Date();
		this.getBookingLocation(this.proceedBooking);
		
    }
    
    , getBookingLocation: function(mysuccessCallback) {
    	if (DigiWebApp.SettingsController.getSetting("debug"))  console.log("in getBookingLocation");

    	var that = DigiWebApp.BookingController;
    	
		// Get GPS-Position if set in Settings
    	var getLocationNow = function(successCallback) {
	            DigiWebApp.ApplicationController.DigiLoaderView.show(M.I18N.l('getGPSPositionMsg'));
	
	            /*var getLocationOptions =  { 
	            		enableHighAccuracy: YES, 
	            		maximumAge: 0, 
	            		timeout: 240000 
	            	};*/
	            var getLocationOptions =  { enableHighAccuracy: NO, timeout: DigiWebApp.SettingsController.getSetting('GPSTimeOut') };
	
	            M.LocationManager.getLocation(that, successCallback, function(error) {
	            	
		            var getLocationOptions =  { enableHighAccuracy: YES, timeout: DigiWebApp.SettingsController.getSetting('GPSTimeOut') };
		        	
		            M.LocationManager.getLocation(that, successCallback, function(error) {
		            	//if (DigiWebApp.SettingsController.globalDebugMode) console.error("error=" + error + ", error.code="+error.code + ", error.message=" + error.message);
		
		            	//M.LocationManager.getLocation(that, successCallback, function(error) {
		                	//if (DigiWebApp.SettingsController.globalDebugMode) console.error("error=" + error + ", error.code="+error.code + ", error.message=" + error.message);
		                	/*
		                	 * error = "PERMISSION_DENIED" || "POSITION_UNAVAILABLE" || "TIMEOUT"
		                    */
		                	if ( error === "POSITION_UNAVAILABLE" ) {
		                		DigiWebApp.ApplicationController.nativeAlertDialogView({
		                			  title: M.I18N.l('GPSError')
		                			, message: M.I18N.l('GPSunavailable')
		                		});
		                	} else if ( error === "TIMEOUT" ) {
		                		DigiWebApp.ApplicationController.nativeAlertDialogView({
		                			  title: M.I18N.l('GPSError')
		                			, message: M.I18N.l('GPStimeout')
		                		});
		                	} else if ( error === "PERMISSION_DENIED" ) {
		                		DigiWebApp.ApplicationController.nativeAlertDialogView({
		                			  title: M.I18N.l('GPSError')
		                			, message: M.I18N.l('GPSmissingPermission')
		                		});
		                	} else {
		                		DigiWebApp.ApplicationController.nativeAlertDialogView({
		                			  title: M.I18N.l('GPSError')
		                			, message: M.I18N.l('GPSunknownError') + error
		                		});
		                	}
		                    //M.LocationManager.getLocation(that, successCallback, successCallback);
		                	successCallback();
		            }, getLocationOptions);
	            }, getLocationOptions);
        	};
    	
			if (DigiWebApp.SettingsController.featureAvailable('417') && DigiWebApp.SettingsController.getSetting("ServiceApp_ermittleGeokoordinate") && DigiWebApp.SettingsController.getSetting('autoSaveGPSData')) {
				if (DigiWebApp.SettingsController.getSetting("ServiceApp_FallBack")) {
		            DigiWebApp.ServiceAppController.knockknock(function(data) {
		            	if (DigiWebApp.SettingsController.getSetting("debug"))  console.log("ServiceApp is available");
		            	mysuccessCallback();
		            }, function() {
		            	if (DigiWebApp.SettingsController.getSetting("debug"))  console.log("ServiceApp is NOT available");
		            	getLocationNow(mysuccessCallback);
		            });
				} else {
					mysuccessCallback();
				}
			} else if (DigiWebApp.SettingsController.getSetting('autoSaveGPSData')) {
				getLocationNow(mysuccessCallback);
			} else {
				mysuccessCallback();
			}

   	}
    
    , checkBooking: function(skipSelection) {
    	if (DigiWebApp.SettingsController.getSetting("debug"))  console.log("in checkBooking");
		
        //var booking = null;

        // check if order chosen
    	var orderId;
    	if (typeof(DigiWebAppOrdinaryDesign.bookingPageWithIconsScholpp) !== "undefined") {
            orderId = M.ViewManager.getView('bookingPageWithIconsScholpp', 'order').getSelection();
    	} else {
            orderId = M.ViewManager.getView('bookingPage', 'order').getSelection();
    	}
        if (!orderId || (orderId && parseInt(orderId) === 0)) {
            //M.DialogView.alert({
            DigiWebApp.ApplicationController.nativeAlertDialogView({
                  title: M.I18N.l('noOrderSelected')
                , message: M.I18N.l('noOrderSelectedMsg')
            });
            return false;
        } else {
            // check if hand order
            if (!this.isHandOrder(orderId)) {// if it is not a hand order position and activity must be selected
                // check if position is set
                if (!DigiWebApp.SelectionController.isPositionSelected()) {
                    //M.DialogView.alert({
                    DigiWebApp.ApplicationController.nativeAlertDialogView({
                          title: M.I18N.l('noPosSelected')
                        , message: M.I18N.l('noPosSelectedMsg')
                    });
                    return false;
                } else {
                    // check if activity is set
                    if(!DigiWebApp.SelectionController.isActivitySelected()) {
                        //M.DialogView.alert({
                        DigiWebApp.ApplicationController.nativeAlertDialogView({
                              title: M.I18N.l('noActSelected')
                            , message: M.I18N.l('noActSelectedMsg')
                        });
                        return false;
                    }
                }
            } else {
                // check if activity is set
                if(!DigiWebApp.SelectionController.isActivitySelected()) {
                    //M.DialogView.alert({
                    DigiWebApp.ApplicationController.nativeAlertDialogView({
                          title: M.I18N.l('noActSelected')
                        , message: M.I18N.l('noActSelectedMsg')
                    });
                    return false;
                }
            } // else of: if(!this.isHandOrder(orderId))
            
            var posObj;
            var actObj;
            if (typeof(skipSelection) === "undefined") {
	        	if (typeof(DigiWebAppOrdinaryDesign.bookingPageWithIconsScholpp) !== "undefined") {
	                posObj = M.ViewManager.getView('bookingPageWithIconsScholpp', 'position').getSelection(YES);
	        	} else {
	                posObj = M.ViewManager.getView('bookingPage', 'position').getSelection(YES);
	        	}
	            var posId = posObj ? posObj.value : null;
	
	        	if (typeof(DigiWebAppOrdinaryDesign.bookingPageWithIconsScholpp) !== "undefined") {
	                actObj = M.ViewManager.getView('bookingPageWithIconsScholpp', 'activity').getSelection(YES);
	        	} else {
	                actObj = M.ViewManager.getView('bookingPage', 'activity').getSelection(YES);
	        	}
	            var actId = actObj ? actObj.value : null;
	
	            // check if open booking
	            if (this.currentBooking) {
	                var curBookingOrderId = this.currentBooking.get('orderId');
	                var curBookingHandOrderId = this.currentBooking.get('handOrderId');
	                var curBookingPosId = this.currentBooking.get('positionId');
	                var curBookingActId = this.currentBooking.get('activityId');
	
	                if (curBookingOrderId === orderId || curBookingHandOrderId === orderId) {
	
	                    if ((!this.isHandOrder(orderId)) && (curBookingPosId === posId) && (curBookingActId === actId)) {
	                        //M.DialogView.alert({
	                        DigiWebApp.ApplicationController.nativeAlertDialogView({
	                              title: M.I18N.l('doubleBooking')
	                            , message: M.I18N.l('doubleBookingMsg')
	                        });
	                        return false;
	                    }
	
	                    if (this.isHandOrder(orderId) && (curBookingActId === actId)) {
	                        //M.DialogView.alert({
	                        DigiWebApp.ApplicationController.nativeAlertDialogView({
	                              title: M.I18N.l('doubleBooking')
	                            , message: M.I18N.l('doubleBookingMsg')
	                        });
	                        return false;
	                    }
	
	                } // if(curBookingOrderId === orderId || curBookingHandOrderId === orderId)
	
	                return true;
	
	            } // if(this.currentBooking)
            }

	    return true;
		
        } // end of else of: if(!orderId || (orderId && parseInt(orderId) === 0))
    }

    
    /**
     * Callback of location retrival
     *
     * Checks if a selection is set.
     * Distinguishes between an open booking is available or not
     * and distinguishes also, whether a hand order or a regular order is selected
     *
     * Triggers a send operation if autoTransferAfterBookTime is activated in the settings, otherwise just saves the booking.
     *
     * @param {Object} location The location object with the coordinates (latitude, longitude) if a location could be retrieved
     */
    , proceedBooking: function(location) {
    	if (DigiWebApp.SettingsController.getSetting("debug"))  console.log("in proceedBooking");

    	var that = DigiWebApp.BookingController;
    	
        //DigiWebApp.ApplicationController.DigiLoaderView.hide();
        //var booking = null;

    	var orderId;
    	if (typeof(DigiWebAppOrdinaryDesign.bookingPageWithIconsScholpp) !== "undefined") {
    		orderId = M.ViewManager.getView('bookingPageWithIconsScholpp', 'order').getSelection();
    	} else {
    		orderId = M.ViewManager.getView('bookingPage', 'order').getSelection();
    	}
	
    	var posObj;
    	if (typeof(DigiWebAppOrdinaryDesign.bookingPageWithIconsScholpp) !== "undefined") {
    		posObj = M.ViewManager.getView('bookingPageWithIconsScholpp', 'position').getSelection(YES);
    	} else {
    		posObj = M.ViewManager.getView('bookingPage', 'position').getSelection(YES);
    	}
		var posId = posObj ? posObj.value : null;
	
		var actObj;
    	if (typeof(DigiWebAppOrdinaryDesign.bookingPageWithIconsScholpp) !== "undefined") {
    		actObj = M.ViewManager.getView('bookingPageWithIconsScholpp', 'activity').getSelection(YES);
    	} else {
    		actObj = M.ViewManager.getView('bookingPage', 'activity').getSelection(YES);
    	}
		var actId = actObj ? actObj.value : null;

		var bookingWasClosed = true;
	    // close open booking 
	    if (that.currentBooking) {

	    	bookingWasClosed = that.currentBooking.closeBooking(location)

	    	if (bookingWasClosed) {
				that.currentBooking.removeAsCurrent();
			}
	    	
			that.currentBooking.save();
			
			if (bookingWasClosed) {
				that.currentBookingClosed = that.currentBooking;
			}
			
	    } else {
	    	// no currentBooking: remember TimezoneOffset
	    	DigiWebApp.SettingsController.setSetting("currentTimezoneOffset", new Date().getTimezoneOffset());
	    	DigiWebApp.SettingsController.setSetting("currentTimezone", jstz.determine().name());
	    }

	    if (bookingWasClosed) {
		    // setup new booking
		    var handOrderId = null;
		    var handOrderName = null;
		    if (that.isHandOrder(orderId)) {
				handOrderId = orderId;
				handOrderName = _.select(DigiWebApp.HandOrder.findSorted(), function(ord) {
					if (ord) return ord.get('id') == orderId || ord.get('name') == orderId;
				})[0].get('name');
				orderId = null;
		
				// a hand order has no position
				posId = null;
		    }
		    
		    var lat = null;
		    var lon = null;
		    if (location) {
				if (location.latitude) {
				    lat = location.latitude;
				}
				if (location.longitude) {
				    lon = location.longitude;
				}
		    }
		    
		    // reset remark
		    try {
		    	M.ViewManager.getView('remarkPage', 'remarkInput').value = '';
		    } catch(e2) { }
		    var remarkStr = '';
	
		    var newOpenBooking = that.openBooking({
				  oId: orderId
				, hoId: handOrderId
				, hoName: handOrderName
				, lat: lat
				, lon: lon
				, pId: posId
				, aId: actId
				, remark: remarkStr
		    });
		    
		    var employeeIds = localStorage.getItem(DigiWebApp.EmployeeController.empSelectionKey) || localStorage.getItem(DigiWebApp.EmployeeController.empSelectionKeyTmp);
			var employeeIdsArray = [];
			if ((employeeIds) && employeeIds !== "0") {
				// Kolonne aktiv
				newOpenBooking.set('istKolonnenbuchung', true);
				employeeIdsArray = employeeIds.split(",");
			} else {
				newOpenBooking.set('istKolonnenbuchung', false);
				employeeIdsArray = [DigiWebApp.SettingsController.getSetting("mitarbeiterId")];
			}
			
			newOpenBooking.set('employees', employeeIdsArray.join());
			
			if (DigiWebApp.SettingsController.featureAvailable('419')) { // Scholpp-Spesen: Übrnachtungskennzeichen setzen
				if ((newOpenBooking.get("activityName") === "Reisezeit" || newOpenBooking.get("activityName") === "Fahrzeit")) {
					var uebernachtungAuswahlObj = M.ViewManager.getView('bookingPageWithIconsScholpp', 'uebernachtungskennzeichen').getSelection(YES);
					var uebernachtungAuswahl = uebernachtungAuswahlObj ? uebernachtungAuswahlObj.value : 6;
					newOpenBooking.set("uebernachtungAuswahl", uebernachtungAuswahl);						
				} else {
					newOpenBooking.set("uebernachtungAuswahl", 0);
				}
			} else {
				newOpenBooking.set("uebernachtungAuswahl", 0);
			}
		    that.set('currentBooking', newOpenBooking);
	
		    that.currentBooking.setAsCurrent();
		    //if (DigiWebApp.SettingsController.globalDebugMode) console.log('saving new ' + that.currentBooking.get('orderId'));
		    that.currentBooking.save();
		    
		    that.set('currentBookingStr', that.buildBookingStr(that.currentBooking));
    	}
	    
	    // don't use selections anymore, use the current booking (till selection is changed again)
	    DigiWebApp.SelectionController.useSelections = NO;

	    var finishBooking = function() {
	    	DigiWebApp.ApplicationController.DigiLoaderView.hide();
	    	if (DigiWebApp.SettingsController.getSetting("debug"))  console.log("Kommunikation mit ServiceApp beendet");
		    if (that.autoSend()) {
		    	that.sendCurrentBookings();
		    } else {
				//M.DialogView.alert({
//		    	if (!DigiWebApp.SettingsController.featureAvailable("416")) {
//					DigiWebApp.ApplicationController.nativeAlertDialogView({
//					      title: M.I18N.l('bookingSaved')
//					    , message: M.I18N.l('bookingSavedMsg')
//					    , callbacks: {
//			                confirm: {
//			                      target: DigiWebApp.NavigationController
//			                    , action: 'backToBookTimePagePOP'
//			                }
//			            }
//					});
//		    	}
				//try { $.mobile.fixedToolbars.show(); } catch(e) { console.error(e); }; // this line is for pre TMP 1.1
		    }
	    };
	    
	    if (DigiWebApp.SettingsController.featureAvailable('417') && DigiWebApp.SettingsController.getSetting("ServiceApp_ermittleGeokoordinate")) {
			if (DigiWebApp.SettingsController.getSetting("ServiceApp_engeKopplung") || DigiWebApp.SettingsController.getSetting('autoTransferAfterBookTime')) {
				// put, dann solange GET bis !=WAIT oder GPS-TIMEOUT erreicht
				var pollBooking = function() {
					if (DigiWebApp.SettingsController.getSetting("debug"))  console.log("polling for bookinglocations");
					// getBookings mit timeout
					var checkForOK = function(datensaetze) {
						if (DigiWebApp.SettingsController.getSetting("debug"))  console.log(datensaetze.length + " Datensätze empfangen");
						_.each(datensaetze, function(datensatzObj) {
							try {
								if (DigiWebApp.SettingsController.getSetting("debug"))  console.log("speichere gepollten Datensatz " + datensatzObj.m_id);
								var modelBooking = _.find(DigiWebApp.Booking.find(), function(b) { return b.m_id === datensatzObj.m_id; } );
								var datensatz = datensatzObj.record;
								if (DigiWebApp.SettingsController.getSetting("debug"))  console.log("modelBooking: ", modelBooking);
								if (DigiWebApp.SettingsController.getSetting("debug"))  console.log("datensatz: ", datensatz);
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
								modelBooking.set("ServiceApp_Status", datensatz.status);
								modelBooking.save();
								if (DigiWebApp.SettingsController.getSetting("debug"))  console.log("datensatz " + datensatzObj.m_id + " gespeichert");
							} catch(exNotFound) {
								if (DigiWebApp.SettingsController.getSetting("debug"))  console.log("datensatz " + datensatzObj.m_id + " nicht gefunden");
							}
						});
						finishBooking();
					};
					var idsToPoll = [];
					if (DigiWebApp.BookingController.currentBooking !== null) { idsToPoll.push(DigiWebApp.BookingController.currentBooking.m_id); }
					if (DigiWebApp.BookingController.currentBookingClosed !== null) { idsToPoll.push(DigiWebApp.BookingController.currentBookingClosed.m_id); }
					DigiWebApp.ServiceAppController.pollBookings(idsToPoll, checkForOK, finishBooking, DigiWebApp.SettingsController.getSetting('GPSTimeOut'));
				};
				var continueFunc = function() {
					if (DigiWebApp.SettingsController.getSetting("debug"))  console.log("put currentBooking");
					DigiWebApp.ServiceAppController.putBookings([that.currentBooking], pollBooking, finishBooking);
				};
				
				if (bookingWasClosed) {
					if (that.currentBookingClosed !== null) {
						if (DigiWebApp.SettingsController.getSetting("debug"))  console.log("post currentBookingClosed");
						DigiWebApp.ServiceAppController.postBookings([that.currentBookingClosed], continueFunc, continueFunc);
					} else {
						if (DigiWebApp.SettingsController.getSetting("debug"))  console.log("put currentBooking");
						DigiWebApp.ServiceAppController.putBookings([that.currentBooking], pollBooking, continueFunc);	
					}
				} else {
					if (DigiWebApp.SettingsController.getSetting("debug"))  console.log("post currentBookingClosed");
					DigiWebApp.ServiceAppController.postBookings([that.currentBookingClosed], continueFunc, continueFunc);
				}
				
			} else {
				if (bookingWasClosed) {
					if (that.currentBookingClosed !== null) {
						var continueFunc = function() {
							var getWAITFunc = function() {
								if (DigiWebApp.SettingsController.getSetting("debug"))  console.log("refreshWAIT");
								DigiWebApp.ServiceAppController.refreshWAITBookings(function(){
									if (DigiWebApp.SettingsController.getSetting("debug"))  console.log("refreshWAIT done");
									finishBooking();
								},function(err){
									DigiWebApp.ApplicationController.DigiLoaderView.hide();
									console.error(err);
								});
							};
							if (DigiWebApp.SettingsController.getSetting("debug"))  console.log("put currentBooking");
							DigiWebApp.ServiceAppController.putBookings([that.currentBooking], getWAITFunc, getWAITFunc);
						};
						if (DigiWebApp.SettingsController.getSetting("debug"))  console.log("post currentBookingClosed");
						DigiWebApp.ServiceAppController.postBookings([that.currentBookingClosed], continueFunc, continueFunc);
					} else {
						if (DigiWebApp.SettingsController.getSetting("debug"))  console.log("put currentBooking");
						DigiWebApp.ServiceAppController.putBookings([that.currentBooking], finishBooking, finishBooking);	
					}
				} else {
					if (DigiWebApp.SettingsController.getSetting("debug"))  console.log("post currentBookingClosed");
					DigiWebApp.ServiceAppController.postBookings([that.currentBookingClosed], continueFunc, continueFunc);
				}
			}
		} else {
			finishBooking();
		}
    }

    /**
     * called when automatic send after booking is activated in settings
     */
    , sendCurrentBookings: function() {
    	// was: DigiWebApp.DashboardController.dataTransfer();
    	DigiWebApp.BookingController.sendBookings();
    }

    /**
     * Determines whether a passed ID represents a hand order or not.
     *
     * @param orderId The id of the order or hand order on which the check should be performed
     */
    , isHandOrder: function(orderId) {
        var handOrder = _.select(DigiWebApp.HandOrder.findSorted(), function(ho) {
        	if (ho) return ho.get('id') == orderId || ho.get('name') == orderId;
        });
        return handOrder.length > 0 ? YES : NO;
    }

    /**
     * Returns the state of the autoTransferAfterBookTime flag in settings
     */
    , autoSend: function() {
        return DigiWebApp.SettingsController.getSetting('autoTransferAfterBookTime');
    }

    /**
     * Returns a new open booking record with the data passed in a parameter object
     * @param obj The parameter object with the data for the booking
     */
    , openBooking: function(obj) {
    	// speichere die Namen von Auftrag, Position und Tätigkeit,
    	// falls beim nächsten Stammdatenabgleich eines davon vom Gerät entfernt werden
    	var myOrderName = M.I18N.l('notDefined');
    	var myPositionName = M.I18N.l('notDefined');
    	var myActivityName = M.I18N.l('notDefined');
    	try {
			var myO_id = obj.oId;
			var myHO_id = obj.hoId;
    		if (myO_id !== null || myHO_id != null) {
        		var order = _.select(DigiWebApp.Order.findSorted().concat(DigiWebApp.HandOrder.findSorted()), function(o) {
        			if (o) {
                		//var myOID = obj.oId;
                		//var myHOID = obj.hoId;
        				var myGetO_id = o.get('id');
        				return myO_id == myGetO_id || myHO_id == myGetO_id; // || get('name') is for checking handOrders also
        			}
                });
                if (order && order.length > 0) {
                    order = order[0];
                    myOrderName = order.get('name');
                }
    		}
    	} catch(e3) { console.error(e3); }
    	try {
    		if (obj.pId != null) {
    			var myPositionLoad = _.find(DigiWebApp.Position.find(), function(a) { return (parseInt(a.get("id")) === parseInt(obj.pId));});
    			//DigiWebApp.Position.find({query:{identifier: 'id', operator: '=', value: obj.pId.toString()}})[0];
    			if (myPositionLoad && obj.pId !== 0) myPositionName = myPositionLoad.get('name');
    		}
    	} catch(e4) { console.error(e4); }
    	try {
    		if (obj.aId != null) {
    			//var myActivityLoad = DigiWebApp.Activity.find({query:{identifier: 'id', operator: '=', value: obj.aId.toString()}})[0];
    			var myActivityLoad = _.find(DigiWebApp.Activity.find(), function(a) { return (parseInt(a.get("id")) === parseInt(obj.aId));});
    			//DigiWebApp.Activity.findById(obj.aId);
    			if (myActivityLoad && obj.aId !== 0) myActivityName = myActivityLoad.get('name');
    		}
    	} catch(e5) { console.error(e5); }
    	
    	var timeStart;
		try {
			if (DigiWebApp.BookingController.currentBookingTimesStampBook != null) {
				timeStart = DigiWebApp.BookingController.currentBookingTimesStampBook;
			} else {
				timeStart = new Date();
			}
		} catch (e6) {
	    	timeStart = new Date();
		}

		var timeStartTimestamp = timeStart.getTime();
				
		var dateDate = new Date(timeStart.getTime() + (1000 * 60 * (new Date().getTimezoneOffset() - Number(DigiWebApp.SettingsController.getSetting("currentTimezoneOffset")))));
        var dateMDate = M.Date.create(dateDate.getTime());
        var dateString = dateMDate.format('dd.mm.yyyy');
        var timeString = dateMDate.format('HH:MM');

        return DigiWebApp.Booking.createRecord({
              orderId: obj.oId ? obj.oId : null
            , orderName: myOrderName
            , handOrderId: obj.hoId ? obj.hoId : null
            , handOrderName: obj.hoName ? obj.hoName : null
            , latitude: obj.lat ? obj.lat : null
            , longitude: obj.lon ? obj.lon : null
            , latitude_bis: null
    		, longitude_bis: null
            , positionId: obj.pId ? obj.pId : null
            , positionName: myPositionName
            , activityId: obj.aId ? obj.aId : null
            , activityName: myActivityName
            , remark: obj.remark ? obj.remark : ''
            , istFeierabend: false
            , istKolonnenbuchung: false
            , mitarbeiterId: DigiWebApp.SettingsController.getSetting("mitarbeiterId")
            , genauigkeitVon: null
            , gps_zeitstempelVon: null
            , ermittlungsverfahrenVon: null
            , genauigkeitBis: null
            , gps_zeitstempelBis: null
            , ermittlungsverfahrenBis: null
            , ServiceApp_Status: "WAIT"
            , timezoneOffset: DigiWebApp.SettingsController.getSetting("currentTimezoneOffset")
            , timezone: DigiWebApp.SettingsController.getSetting("currentTimezone")
            , timeStampStart: timeStart.getTime()
            , timeStampEnd: '0'
            , startDateString: dateString
            , endeDateString: ""
            , startTimeString: timeString
            , endeTimeString: ""
            , modelVersion: "1"
            , gefahreneKilometer: 0
        });
    }

    /**
     * Returns a new open booking record with the data passed in a parameter object
     * @param obj The parameter object with the data for the booking
     */
    , sentBooking: function(obj) {

    	if (obj.get("startDateString") == obj.get("endeDateString") && obj.get("startTimeString") == obj.get("endeTimeString")) {
    		return null;
    	};

    	// speichere die Namen von Auftrag, Position und Tätigkeit,
    	// falls beim nächsten Stammdatenabgleich eines davon vom Gerät entfernt werden
    	var myOrderName = M.I18N.l('notDefined');
    	var myPositionName = M.I18N.l('notDefined');
    	var myActivityName = M.I18N.l('notDefined');

		if (typeof(obj.get('orderName')) !== "undefined") {
    		myOrderName = obj.get('orderName');
    	} else {
        	try {
    			var myO_id = obj.get('orderId');
    			var myHO_id = obj.get('handOrderId');
        		if (myO_id !== 0 || myHO_id !== 0) {
            		var order = _.select(DigiWebApp.Order.findSorted().concat(DigiWebApp.HandOrder.findSorted()), function(o) {
            			if (o) {
            				var myGetO_id = o.get('id');
            				return myO_id == myGetO_id || myHO_id == myGetO_id;
            			}
                    });
                    if (order && order.length > 0) {
                        order = order[0];
                        myOrderName = order.get('name');
                    }
        		}
        		//if (obj.get('orderId') !== 0) myOrderName = DigiWebApp.Order.find({query:{identifier: 'id', operator: '=', value: obj.get('orderId')}})[0].get('name');    		
        	} catch(e7) { console.error(e7); }
    	}
    	if (typeof(obj.get('positionName')) !== "undefined") {
    		myPositionName = obj.get('positionName');
    	} else {
        	try {
	    		if (obj.get('positionId') !== 0) myPositionName = _.find(DigiWebApp.Position.find(), function(a) { return (parseInt(a.get("id")) === parseInt(obj.get('positionId')));}).get('name');
	    		//DigiWebApp.Position.find({query:{identifier: 'id', operator: '=', value: obj.get('positionId')}})[0].get('name');
    		} catch(e8) { console.error(e8); }
    	}
    	if (typeof(obj.get('activityName')) !== "undefined") {
    		myActivityName = obj.get('activityName');
    	} else {
        	try {
	    		if (obj.get('activityId') !== 0) myActivityName = _.find(DigiWebApp.Activity.find(), function(a) { return (parseInt(a.get("id")) === parseInt(obj.get('activityId')));}).get('name');
	    		//DigiWebApp.Activity.find({query:{identifier: 'id', operator: '=', value: obj.get('activityId')}})[0].get('name');
    		} catch(e9) { console.error(e9); }
    	}
    	
        return DigiWebApp.SentBooking.createRecord({
              orderId: obj.get('orderId')
            , orderName: myOrderName
            , handOrderId: obj.get('handOrderId')
            , handOrderName: obj.get('handOrderName')
            , latitude: obj.get('latitude')
            , longitude: obj.get('longitude')
            , latitude_bis: obj.get('latitude_bis')
            , longitude_bis: obj.get('longitude_bis')
            , positionId: obj.get('positionId')
            , positionName: myPositionName
            , activityId: obj.get('activityId')
            , activityName: myActivityName
            , remark: obj.get('remark')
            , istFeierabend: obj.get('istFeierabend')
            , istKolonnenbuchung: obj.get('istKolonnenbuchung')
            , genauigkeitVon: obj.get('genauigkeitVon')
            , gps_zeitstempelVon: obj.get('gps_zeitstempelVon')
            , ermittlungsverfahrenVon: obj.get('ermittlungsverfahrenVon')
            , genauigkeitBis: obj.get('genauigkeitBis')
            , gps_zeitstempelBis: obj.get('gps_zeitstempelBis')
            , ermittlungsverfahrenBis: obj.get('ermittlungsverfahrenBis')
            , ServiceApp_Status: obj.get('ServiceApp_Status')
            , timezoneOffset: obj.get('timezoneOffset')
            , timeStampStart: obj.get('timeStampStart')
            , timeStampEnd: obj.get('timeStampEnd')
            , startDateString: obj.get('startDateString')
            , endeDateString: obj.get('endeDateString')
            , startTimeString: obj.get('startTimeString')
            , endeTimeString: obj.get('endeTimeString')
            , employees: obj.get('employees')
            , isCurrent: false
            , gefahreneKilometer: obj.get('gefahreneKilometer')
        });
    }

    /**
     * Returns a new open booking record with the data passed in a parameter object
     * @param obj The parameter object with the data for the booking
     */
    , sentBookingArchived: function(obj) {
    	
    	if (obj.get("startDateString") == obj.get("endeDateString") && obj.get("startTimeString") == obj.get("endeTimeString")) {
    		return null;
    	};

    	// speichere das Datum der Buchung für einfacheren Archivzugriff
    	var myTagLabel = D8.create(obj.get('timeStampStart')).format("dd.mm.yyyy");
    	
    	// speichere die Namen von Auftrag, Position und Tätigkeit,
    	// falls beim nächsten Stammdatenabgleich eines davon vom Gerät entfernt werden 
    	var myOrderName = M.I18N.l('notDefined');
    	var myPositionName = M.I18N.l('notDefined');
    	var myActivityName = M.I18N.l('notDefined');

		if (typeof(obj.get('orderName')) !== "undefined") {
    		myOrderName = obj.get('orderName');
    	} else {
        	try {
    			var myO_id = obj.get('orderId');
    			var myHO_id = obj.get('handOrderId');
        		if (myO_id !== 0 || myHO_id !== 0) {
            		var order = _.select(DigiWebApp.Order.findSorted().concat(DigiWebApp.HandOrder.findSorted()), function(o) {
            			if (o) {
            				var myGetO_id = o.get('id');
            				return myO_id == myGetO_id || myHO_id == myGetO_id;
            			}
            		});
                    if (order && order.length > 0) {
                        order = order[0];
                        myOrderName = order.get('name');
                    }
        		}
        		//if (obj.get('orderId') !== 0) myOrderName = DigiWebApp.Order.find({query:{identifier: 'id', operator: '=', value: obj.get('orderId')}})[0].get('name');    		
        	} catch(e10) { console.error(e10); }
    	}

		if (typeof(obj.get('positionName')) !== "undefined") {
			myPositionName = obj.get('positionName');
    	} else {
        	try {
	    		if (obj.get('positionId') !== 0) myPositionName = _.find(DigiWebApp.Position.find(), function(a) { return (parseInt(a.get("id")) === parseInt(obj.get('positionId')));}).get('name');
	    		//DigiWebApp.Position.find({query:{identifier: 'id', operator: '=', value: obj.get('positionId')}})[0].get('name');
    		} catch(e11) { console.error(e11); }
    	}

		if (typeof(obj.get('activityName')) !== "undefined") {
			myActivityName = obj.get('activityName');
    	} else {
        	try {
	    		if (obj.get('activityId') !== 0) myActivityName = _.find(DigiWebApp.Activity.find(), function(a) { return (parseInt(a.get("id")) === parseInt(obj.get('activityId')));}).get('name');
	    		//DigiWebApp.Activity.find({query:{identifier: 'id', operator: '=', value: obj.get('activityId')}})[0].get('name');
    		} catch(e12) { console.error(e12); }
    	}
    	
    	return DigiWebApp.SentBookingArchived.createRecord({
              orderId: obj.get('orderId')
            , orderName: myOrderName
            , handOrderId: obj.get('handOrderId')
            , handOrderName: obj.get('handOrderName')
            , latitude: obj.get('latitude')
            , longitude: obj.get('longitude')
            , latitude_bis: obj.get('latitude_bis')
            , longitude_bis: obj.get('longitude_bis')
            , positionId: obj.get('positionId')
            , positionName: myPositionName
            , activityId: obj.get('activityId')
            , activityName: myActivityName
            , remark: obj.get('remark')
            , istFeierabend: obj.get('istFeierabend')
            , istKolonnenbuchung: obj.get('istKolonnenbuchung')
            , genauigkeitVon: obj.get('genauigkeitVon')
            , gps_zeitstempelVon: obj.get('gps_zeitstempelVon')
            , ermittlungsverfahrenVon: obj.get('ermittlungsverfahrenVon')
            , genauigkeitBis: obj.get('genauigkeitBis')
            , gps_zeitstempelBis: obj.get('gps_zeitstempelBis')
            , ermittlungsverfahrenBis: obj.get('ermittlungsverfahrenBis')
            , ServiceApp_Status: obj.get('ServiceApp_Status')
            , timezoneOffset: obj.get('timezoneOffset')
            , timeStampStart: obj.get('timeStampStart')
            , timeStampEnd: obj.get('timeStampEnd')
            , startDateString: obj.get('startDateString')
            , endeDateString: obj.get('endeDateString')
            , startTimeString: obj.get('startTimeString')
            , endeTimeString: obj.get('endeTimeString')
            , employees: obj.get('employees')
            , tagLabel: myTagLabel
            , isCurrent: false
            , gefahreneKilometer: obj.get('gefahreneKilometer')
        });
    }

    /*
    * Prepares an array of not booked bookings for the list view (showing the not send bookings)
    * 
    * Sets the timeData property of this controller, where the list has a content binding on
    *
    */
    , setNotBookedBookings: function() {
    	try {
	        var bookings = DigiWebApp.Booking.find();
	        if (bookings.length > 0) {
	            _.each(bookings, function(booking) {
	            	
	            	var startDate = booking.get('startDateString');
	            	var startTime = booking.get('startTimeString');
	            	if (((typeof(startDate) === "undefined" || !startDate || startDate === "")
	            	|| (typeof(startTime) === "undefined" || !startTime || startTime === "")
	            	) && (booking.get('timeStampStart') !== "0")) {
	            		// Buchung aus alter WebAppVersion
	            		var d8start = D8.create(new Date(Number(booking.get('timeStampStart')) + (1000 * 60 * (new Date(Number(booking.get('timeStampStart'))).getTimezoneOffset() - booking.get('timezoneOffset')))));
	                    startDate = d8start.format('dd.mm.yyyy');
	                    startTime = d8start.format('HH:MM');
	            	}
	            	
	            	var endeDate = booking.get('endeDateString');
	            	var endeTime = booking.get('endeTimeString');
	            	if (((typeof(endeDate) === "undefined" || !endeDate || endeDate === "")
	            	|| (typeof(endeTime) === "undefined" || !endeTime || endeTime === "")
	            	) && (booking.get('timeStampEnd') !== "0")) {
	            		// Buchung aus alter WebAppVersion
	            		var d8ende = D8.create(new Date(Number(booking.get('timeStampEnd')) + (1000 * 60 * (new Date(Number(booking.get('timeStampEnd'))).getTimezoneOffset() - booking.get('timezoneOffset')))));
	                    endeDate = d8ende.format('dd.mm.yyyy');
	                    endeTime = d8ende.format('HH:MM');
	            	}
	            	
	            	if (typeof(booking.get('timezoneOffset')) === "undefined") {
	            		booking.set('date', booking.get('timeStampStart') + ',' + booking.get('timeStampEnd') + ',-120' + ',' + startDate + ',' + startTime + ',' + endeDate + ',' + endeTime);
	            	} else {
	            		booking.set('date', booking.get('timeStampStart') + ',' + booking.get('timeStampEnd') + ',' + booking.get('timezoneOffset') + ',' + startDate + ',' + startTime + ',' + endeDate + ',' + endeTime);
	            	}
	
	                // set the handOrderId as orderId for correct display in list item view
	                if (parseInt(booking.get('orderId')) === 0 && parseInt(booking.get('handOrderId')) !== 0) {
	                    booking.set('orderId', booking.get('handOrderId'));
	                }
	
	            });
	            
	            // newest booking at the top => first sort than reverse order
	            bookings = _.sortBy(bookings, function(booking) {
	                return parseInt(booking.get('timeStampStart'));
	            });
	            this.set('timeData', bookings.reverse());
	            
	        } else {
	            this.set('timeData', []);
	        }
    	} catch(e13) {
            this.set('timeData', []);
    	}

        DigiWebApp.BookingController.setBookedBookings();
        DigiWebApp.BookingController.setArchivedDays();

    }

    /*
    * Prepares an array of booked bookings for the list view (showing the sent bookings)
    * 
    * Sets the timeDataSent property of this controller, where the list has a content binding on
    *
    */
    , setBookedBookings: function() {
    	try {
	        var bookings = DigiWebApp.SentBooking.find();
	        if (bookings.length > 0) {
	        	var tagDerWinterzeit = D8.create("11/01/" + new Date().getFullYear() + " 02:00:00").addDays(-D8.create("11/01/" + new Date().getFullYear() + " 02:00:00").date.getDay());
	        	var tagDerSommerzeit = D8.create("04/01/" + new Date().getFullYear() + " 02:00:00").addDays(-D8.create("04/01/" + new Date().getFullYear() + " 02:00:00").date.getDay());
        		var d8Now = new D8();
        		var inSommerzeit = (tagDerSommerzeit.timeBetween(d8Now) >= 0 && tagDerWinterzeit.timeBetween(d8Now) <= 0);
        		//var inWinterzeit = ((tagDerWinterzeit.timeBetween(d8Now) >= 0 && tagDerSommerzeit.timeBetween(d8Now) >= 0) || (tagDerWinterzeit.timeBetween(d8Now) <= 0 && tagDerSommerzeit.timeBetween(d8Now) <= 0));
        		var inWinterzeit = !inSommerzeit;
	            _.each(bookings, function(booking) {
	            	var startDate = booking.get('startDateString');
	            	var startTime = booking.get('startTimeString');
	            	if ((typeof(startDate) === "undefined" || !startDate || startDate === "")
	            	|| (typeof(startTime) === "undefined" || !startTime || startTime === "")
	            	) {
	            		// Buchung aus alter WebAppVersion
	            		var d8start = D8.create(new Date(Number(booking.get('timeStampStart')) + (1000 * 60 * (new Date(Number(booking.get('timeStampStart'))).getTimezoneOffset() - booking.get('timezoneOffset')))));
	                    startDate = d8start.format('dd.mm.yyyy');
	                    startTime = d8start.format('HH:MM');
	            	}
	            	var endeDate = booking.get('endeDateString');
	            	var endeTime = booking.get('endeTimeString');
	            	if ((typeof(endeDate) === "undefined" || !endeDate || endeDate === "")
	            	|| (typeof(endeTime) === "undefined" || !endeTime || endeTime === "")
	            	) {
	            		// Buchung aus alter WebAppVersion
	            		var d8ende = D8.create(new Date(Number(booking.get('timeStampEnd')) + (1000 * 60 * (new Date(Number(booking.get('timeStampEnd'))).getTimezoneOffset() - booking.get('timezoneOffset')))));
	                    endeDate = d8ende.format('dd.mm.yyyy');
	                    endeTime = d8ende.format('HH:MM');
	            	}
	            	if (typeof(booking.get('timezoneOffset')) === "undefined") {
	            		booking.set('date', booking.get('timeStampStart') + ',' + booking.get('timeStampEnd') + ',-120' + ',' + startDate + ',' + startTime + ',' + endeDate + ',' + endeTime);
	            	} else {
	            		booking.set('date', booking.get('timeStampStart') + ',' + booking.get('timeStampEnd') + ',' + booking.get('timezoneOffset') + ',' + startDate + ',' + startTime + ',' + endeDate + ',' + endeTime);
	            	}
	
	                // set the handOrderId as orderId for correct display in list item view
	                if (parseInt(booking.get('orderId')) === 0 && parseInt(booking.get('handOrderId')) !== 0) {
	                    booking.set('orderId', booking.get('handOrderId'));
	                }
	
	            });
	            // newest booking at the top => first sort than reverse order
	            bookings = _.sortBy(bookings, function(booking) {
	                return parseInt(booking.get('timeStampStart'));
	            });
	            this.set('timeDataSent', bookings.reverse());
	        } else {
	            this.set('timeDataSent', []);
	        }
    	} catch(e14) {
            this.set('timeDataSent', []);
    	}
    }

    , setArchivedDays: function() {
    	try {
	        var days = DigiWebApp.SentTimeDataDays.find();
	        if (days.length > 0) {
	            // newest day at the top => first sort than reverse order
	        	days = _.sortBy(days, function(day) {
	                return parseInt(D8.create(day.get('tagLabel')).getTimestamp());
	            });
	            this.set('timeDataSentDays', days.reverse());
	        } else {
	            this.set('timeDataSentDays', []);
	        }
    	} catch(e15) {
            this.set('timeDataSentDays', []);    		
    	}
    }

    , setArchivedBookings: function() {
    	try {
	    	if (DigiWebApp.BookingController.dayToDisplay !== null) {
		        var bookings = DigiWebApp.SentBookingArchived.find({
		        	query:{
		        		  identifier: 'tagLabel'
		        		, operator: '='
		        		, value: DigiWebApp.BookingController.dayToDisplay.get("tagLabel")
		        	}
		        });
		        if (bookings.length > 0) {
		        	var tagDerWinterzeit = D8.create("11/01/" + new Date().getFullYear() + " 02:00:00").addDays(-D8.create("11/01/" + new Date().getFullYear() + " 02:00:00").date.getDay());
		        	var tagDerSommerzeit = D8.create("04/01/" + new Date().getFullYear() + " 02:00:00").addDays(-D8.create("04/01/" + new Date().getFullYear() + " 02:00:00").date.getDay());
	        		var d8Now = new D8();
	        		var inSommerzeit = (tagDerSommerzeit.timeBetween(d8Now) >= 0 && tagDerWinterzeit.timeBetween(d8Now) <= 0);
	        		//var inWinterzeit = ((tagDerWinterzeit.timeBetween(d8Now) >= 0 && tagDerSommerzeit.timeBetween(d8Now) >= 0) || (tagDerWinterzeit.timeBetween(d8Now) <= 0 && tagDerSommerzeit.timeBetween(d8Now) <= 0));
	        		var inWinterzeit = !inSommerzeit;
		            _.each(bookings, function(booking) {
		            	var startDate = booking.get('startDateString');
		            	var startTime = booking.get('startTimeString');
		            	if ((typeof(startDate) === "undefined" || !startDate || startDate === "")
		            	|| (typeof(startTime) === "undefined" || !startTime || startTime === "")
		            	) {
		            		// Buchung aus alter WebAppVersion
		            		var d8start = D8.create(new Date(Number(booking.get('timeStampStart')) + (1000 * 60 * (new Date(Number(booking.get('timeStampStart'))).getTimezoneOffset() - booking.get('timezoneOffset')))));
		                    startDate = d8start.format('dd.mm.yyyy');
		                    startTime = d8start.format('HH:MM');
		            	}
		            	var endeDate = booking.get('endeDateString');
		            	var endeTime = booking.get('endeTimeString');
		            	if ((typeof(endeDate) === "undefined" || !endeDate || endeDate === "")
		            	|| (typeof(endeTime) === "undefined" || !endeTime || endeTime === "")
		            	) {
		            		// Buchung aus alter WebAppVersion
		            		var d8ende = D8.create(new Date(Number(booking.get('timeStampEnd')) + (1000 * 60 * (new Date(Number(booking.get('timeStampEnd'))).getTimezoneOffset() - booking.get('timezoneOffset')))));
		                    endeDate = d8ende.format('dd.mm.yyyy');
		                    endeTime = d8ende.format('HH:MM');
		            	}
		            	if (typeof(booking.get('timezoneOffset')) === "undefined") {
		            		booking.set('date', booking.get('timeStampStart') + ',' + booking.get('timeStampEnd') + ',-120' + ',' + startDate + ',' + startTime + ',' + endeDate + ',' + endeTime);
		            	} else {
		            		booking.set('date', booking.get('timeStampStart') + ',' + booking.get('timeStampEnd') + ',' + booking.get('timezoneOffset') + ',' + startDate + ',' + startTime + ',' + endeDate + ',' + endeTime);
		            	}
		
		                // set the handOrderId as orderId for correct display in list item view
		                if (parseInt(booking.get('orderId')) === 0 && parseInt(booking.get('handOrderId')) !== 0) {
		                    booking.set('orderId', booking.get('handOrderId'));
		                }
		
		            });
		            // newest booking at the top => first sort than reverse order
		            bookings = _.sortBy(bookings, function(booking) {
		                return parseInt(booking.get('timeStampStart'));
		            });
		            this.set('timeDataSentArchived', bookings.reverse());
		        } else {
		            this.set('timeDataSentArchived', []);
		        }
	    	} else {
	            this.set('timeDataSentArchived', []);
	    	}
    	} catch(e16) {
            this.set('timeDataSentArchived', []);
    	}
    }

    , setTimeDataForRemark: function() {
    	try {
	    	if ( DigiWebApp.BookingController.currentBooking === null ) { return; }
	        var bookings = [DigiWebApp.BookingController.currentBooking];
	        if (bookings.length > 0) {
	        	var tagDerWinterzeit = D8.create("11/01/" + new Date().getFullYear() + " 02:00:00").addDays(-D8.create("11/01/" + new Date().getFullYear() + " 02:00:00").date.getDay());
	        	var tagDerSommerzeit = D8.create("04/01/" + new Date().getFullYear() + " 02:00:00").addDays(-D8.create("04/01/" + new Date().getFullYear() + " 02:00:00").date.getDay());
        		var d8Now = new D8();
        		var inSommerzeit = (tagDerSommerzeit.timeBetween(d8Now) >= 0 && tagDerWinterzeit.timeBetween(d8Now) <= 0);
        		//var inWinterzeit = ((tagDerWinterzeit.timeBetween(d8Now) >= 0 && tagDerSommerzeit.timeBetween(d8Now) >= 0) || (tagDerWinterzeit.timeBetween(d8Now) <= 0 && tagDerSommerzeit.timeBetween(d8Now) <= 0));
        		var inWinterzeit = !inSommerzeit;
	            _.each(bookings, function(booking) {
	            	var startDate = booking.get('startDateString');
	            	var startTime = booking.get('startTimeString');
	            	if ((typeof(startDate) === "undefined" || !startDate || startDate === "")
	            	|| (typeof(startTime) === "undefined" || !startTime || startTime === "")
	            	) {
	            		// Buchung aus alter WebAppVersion
	            		var d8start = D8.create(new Date(Number(booking.get('timeStampStart')) + (1000 * 60 * (new Date(Number(booking.get('timeStampStart'))).getTimezoneOffset() - booking.get('timezoneOffset')))));
	                    startDate = d8start.format('dd.mm.yyyy');
	                    startTime = d8start.format('HH:MM');
	            	}
	            	var endeDate = booking.get('endeDateString');
	            	var endeTime = booking.get('endeTimeString');
	            	if ((typeof(endeDate) === "undefined" || !endeDate || endeDate === "")
	            	|| (typeof(endeTime) === "undefined" || !endeTime || endeTime === "")
	            	) {
	            		// Buchung aus alter WebAppVersion
	            		var d8ende = D8.create(new Date(Number(booking.get('timeStampEnd')) + (1000 * 60 * (new Date(Number(booking.get('timeStampEnd'))).getTimezoneOffset() - booking.get('timezoneOffset')))));
	                    endeDate = d8ende.format('dd.mm.yyyy');
	                    endeTime = d8ende.format('HH:MM');
	            	}
	            	if (typeof(booking.get('timezoneOffset')) === "undefined") {
	            		booking.set('date', booking.get('timeStampStart') + ',' + booking.get('timeStampEnd') + ',-120' + ',' + startDate + ',' + startTime + ',' + endeDate + ',' + endeTime);
	            	} else {
	            		booking.set('date', booking.get('timeStampStart') + ',' + booking.get('timeStampEnd') + ',' + booking.get('timezoneOffset') + ',' + startDate + ',' + startTime + ',' + endeDate + ',' + endeTime);
	            	}
	                
	                // set the handOrderId as orderId for correct display in list item view
	                if (parseInt(booking.get('orderId')) === 0 && parseInt(booking.get('handOrderId')) !== 0) {
	                    booking.set('orderId', booking.get('handOrderId'));
	                }
	
	            });
	            // newest booking at the top => first sort than reverse order
	            bookings = _.sortBy(bookings, function(booking) {
	                return parseInt(booking.get('timeStampStart'));
	            });
	            this.set('timeDataForEdit', bookings.reverse());
	        } else {
	            this.set('timeDataForEdit', []);
	        }
    	} catch(e17) {
            this.set('timeDataForEdit', []);
    	}
    }

    , setTimeDataForEdit: function() {
    	try {
	    	if ( DigiWebApp.EditTimeDataPage.bookingToEdit === null ) { return; }
	        var bookings = [DigiWebApp.EditTimeDataPage.bookingToEdit];
	        if (bookings.length > 0) {
	        	var tagDerWinterzeit = D8.create("11/01/" + new Date().getFullYear() + " 02:00:00").addDays(-D8.create("11/01/" + new Date().getFullYear() + " 02:00:00").date.getDay());
	        	var tagDerSommerzeit = D8.create("04/01/" + new Date().getFullYear() + " 02:00:00").addDays(-D8.create("04/01/" + new Date().getFullYear() + " 02:00:00").date.getDay());
        		var d8Now = new D8();
        		var inSommerzeit = (tagDerSommerzeit.timeBetween(d8Now) >= 0 && tagDerWinterzeit.timeBetween(d8Now) <= 0);
        		//var inWinterzeit = ((tagDerWinterzeit.timeBetween(d8Now) >= 0 && tagDerSommerzeit.timeBetween(d8Now) >= 0) || (tagDerWinterzeit.timeBetween(d8Now) <= 0 && tagDerSommerzeit.timeBetween(d8Now) <= 0));
        		var inWinterzeit = !inSommerzeit;
	            _.each(bookings, function(booking) {
	            	var startDate = booking.get('startDateString');
	            	var startTime = booking.get('startTimeString');
	            	if ((typeof(startDate) === "undefined" || !startDate || startDate === "")
	            	|| (typeof(startTime) === "undefined" || !startTime || startTime === "")
	            	) {
	            		// Buchung aus alter WebAppVersion
	            		var d8start = D8.create(new Date(Number(booking.get('timeStampStart')) + (1000 * 60 * (new Date(Number(booking.get('timeStampStart'))).getTimezoneOffset() - booking.get('timezoneOffset')))));
	                    startDate = d8start.format('dd.mm.yyyy');
	                    startTime = d8start.format('HH:MM');
	            	}
	            	var endeDate = booking.get('endeDateString');
	            	var endeTime = booking.get('endeTimeString');
	            	if ((typeof(endeDate) === "undefined" || !endeDate || endeDate === "")
	            	|| (typeof(endeTime) === "undefined" || !endeTime || endeTime === "")
	            	) {
	            		// Buchung aus alter WebAppVersion
	            		var d8ende = D8.create(new Date(Number(booking.get('timeStampEnd')) + (1000 * 60 * (new Date(Number(booking.get('timeStampEnd'))).getTimezoneOffset() - booking.get('timezoneOffset')))));
	                    endeDate = d8ende.format('dd.mm.yyyy');
	                    endeTime = d8ende.format('HH:MM');
	            	}
	            	if (typeof(booking.get('timezoneOffset')) === "undefined") {
	            		booking.set('date', booking.get('timeStampStart') + ',' + booking.get('timeStampEnd') + ',-120' + ',' + startDate + ',' + startTime + ',' + endeDate + ',' + endeTime);
	            	} else {
	            		booking.set('date', booking.get('timeStampStart') + ',' + booking.get('timeStampEnd') + ',' + booking.get('timezoneOffset') + ',' + startDate + ',' + startTime + ',' + endeDate + ',' + endeTime);
	            	}
	                
	                // set the handOrderId as orderId for correct display in list item view
	                if (parseInt(booking.get('orderId')) === 0 && parseInt(booking.get('handOrderId')) !== 0) {
	                    booking.set('orderId', booking.get('handOrderId'));
	                }
	
	            });
	            // newest booking at the top => first sort than reverse order
	            bookings = _.sortBy(bookings, function(booking) {
	                return parseInt(booking.get('timeStampStart'));
	            });
	            this.set('timeDataForEdit', bookings.reverse());
	        } else {
	            this.set('timeDataForEdit', []);
	        }
    	} catch(e18) {
            this.set('timeDataForEdit', []);
    	}
    }

    /**
     *  Closes a day ("Feierabend")
     *
     *  1) If an open Booking exists it is closed and not set as current anymore.
     *  2) if no open booking exists, an alert is shown and nothing more is done.
     *
     *  3) The string showing the data of the currentBooking is cleared
     *  4) The selection lists are reset.
     *
     *  5) If autoTransferAfterClosingDay is selected, a data transfer is triggered
     *  6) If not, the employee selection is cleared
     */
    , closeDay: function() {
    	var that = DigiWebApp.BookingController;
    	try{DigiWebApp.ApplicationController.vibrate();}catch(e19){}
        if (that.currentBooking) {
        	
        	var spesencallback = function() {
		        // Start::Bemerkungsfeld (403)
				if (
				   (DigiWebApp.SettingsController.featureAvailable('403') && !DigiWebApp.SettingsController.getSetting('remarkIsOptional'))
				|| (DigiWebApp.SettingsController.featureAvailable('422') && DigiWebApp.Activity.findById(DigiWebApp.BookingController.currentBooking.get('activityId')).get('istFahrzeitRelevant'))
				){
					// if remark-feature active: go to remarkpage
					that.refreshCurrentBooking(false);
		        	DigiWebApp.NavigationController.toRemarkPage(function() {
		    			if (DigiWebApp.SettingsController.featureAvailable('404')) {
			        		DigiWebApp.NavigationController.backToButtonDashboardPagePOP();
		    			} else {
			        		DigiWebApp.NavigationController.backToDashboardPagePOP();
		    			}
		    			that.closeDayWithRemark();           					
		            });
		        } else {
					// else: bookWithRemark
		        	that.closeDayWithRemark();           					
		        }
		        // End::Bemerkungsfeld
        	};

        	if (DigiWebApp.SettingsController.featureAvailable('418')) {
        		DigiWebApp.NavigationController.toSpesenPage(function() {
	    			if (DigiWebApp.SettingsController.featureAvailable('404')) {
		        		DigiWebApp.NavigationController.backToButtonDashboardPagePOP();
	    			} else {
		        		DigiWebApp.NavigationController.backToDashboardPagePOP();
	    			}
        			spesencallback();
        		});
        	} else {
        		spesencallback();
        	}
        
        } else {
        	that.closeDayWithRemark();           					
        }
    }
    
    , closeDayWithRemark: function() {
    	var that = this;
    	that.currentBookingTimesStampBook = new Date();
    	that.getBookingLocation(that.closeDayWithRemarkWithPosition);
    }
            
    , closeDayWithRemarkWithPosition: function(location) {
    	var that = DigiWebApp.BookingController;
		var bookingWasClosed = true;
        // close current booking
        if (that.currentBooking) {
        	that.currentBooking.set("istFeierabend", true);

        	bookingWasClosed = that.currentBooking.closeBooking(location)

	    	if (bookingWasClosed) {
	    		
				that.currentBooking.removeAsCurrent();
				
			} else {
				
		    	var orderId;
		    	if (typeof(DigiWebAppOrdinaryDesign.bookingPageWithIconsScholpp) !== "undefined") {
		    		orderId = M.ViewManager.getView('bookingPageWithIconsScholpp', 'order').getSelection();
		    	} else {
		    		orderId = M.ViewManager.getView('bookingPage', 'order').getSelection();
		    	}
		    	
		    	var handOrderId;
		    	if (typeof(DigiWebAppOrdinaryDesign.bookingPageWithIconsScholpp) !== "undefined") {
		    		handOrderId = M.ViewManager.getView('bookingPageWithIconsScholpp', 'order').getSelection();
		    	} else {
		    		handOrderId = M.ViewManager.getView('bookingPage', 'order').getSelection();
		    	}
			
		    	var posObj;
		    	if (typeof(DigiWebAppOrdinaryDesign.bookingPageWithIconsScholpp) !== "undefined") {
		    		posObj = M.ViewManager.getView('bookingPageWithIconsScholpp', 'position').getSelection(YES);
		    	} else {
		    		posObj = M.ViewManager.getView('bookingPage', 'position').getSelection(YES);
		    	}
				var posId = posObj ? posObj.value : null;
			
				var actObj;
		    	if (typeof(DigiWebAppOrdinaryDesign.bookingPageWithIconsScholpp) !== "undefined") {
		    		actObj = M.ViewManager.getView('bookingPageWithIconsScholpp', 'activity').getSelection(YES);
		    	} else {
		    		actObj = M.ViewManager.getView('bookingPage', 'activity').getSelection(YES);
		    	}
				var actId = actObj ? actObj.value : null;
				
		    	var myOrderName = M.I18N.l('notDefined');
		    	var myHandOrderName = M.I18N.l('notDefined');
		    	var myPositionName = M.I18N.l('notDefined');
		    	var myActivityName = M.I18N.l('notDefined');
		    	try {
					var myO_id = orderId;
					var myHO_id = handOrderId;
		    		if (myO_id !== null || myHO_id != null) {
		        		var order = _.select(DigiWebApp.Order.findSorted()), function(o) {
		        			if (o) {
		        				var myGetO_id = o.get('id');
		        				return myO_id == myGetO_id; // || get('name') is for checking handOrders also
		        			}
		                });
		                if (order && order.length > 0) {
		                    order = order[0];
		                    myOrderName = order.get('name');
		                }
		        		var handOrder = _.select(DigiWebApp.Order.findSorted().concat(DigiWebApp.HandOrder.findSorted()), function(o) {
		        			if (o) {
		        				var myGetO_id = o.get('id');
		        				return myHO_id == myGetO_id; // || get('name') is for checking handOrders also
		        			}
		                });
		                if (handOrder && handOrder.length > 0) {
		                	handOrder = handOrder[0];
		                    myHandOrderName = handOrder.get('name');
		                }
		    		}
		    	} catch(e3) { console.error(e3); }
		    	try {
		    		if (posId != null) {
		    			var myPositionLoad = _.find(DigiWebApp.Position.find(), function(a) { return (parseInt(a.get("id")) === parseInt(posId));});
		    			//DigiWebApp.Position.find({query:{identifier: 'id', operator: '=', value: obj.pId.toString()}})[0];
		    			if (myPositionLoad && posId !== 0) myPositionName = myPositionLoad.get('name');
		    		}
		    	} catch(e4) { console.error(e4); }
		    	try {
		    		if (actId != null) {
		    			//var myActivityLoad = DigiWebApp.Activity.find({query:{identifier: 'id', operator: '=', value: obj.aId.toString()}})[0];
		    			var myActivityLoad = _.find(DigiWebApp.Activity.find(), function(a) { return (parseInt(a.get("id")) === parseInt(actId));});
		    			//DigiWebApp.Activity.findById(obj.aId);
		    			if (myActivityLoad && actId !== 0) myActivityName = myActivityLoad.get('name');
		    		}
		    	} catch(e5) { console.error(e5); }

  				that.currentBooking.set("orderId", orderId);
  				that.currentBooking.set("orderName", myOrderName);
				that.currentBooking.set("handOrderId", handOrderId);
				that.currentBooking.set("handOrderName", myHandOrderName);
				that.currentBooking.set("positionId", posId);
				that.currentBooking.set("positionName", myPositionName);
				that.currentBooking.set("activityId", actId);
				that.currentBooking.set("activityName", myActivityName);
				if (location) {
					that.currentBooking.set("latitude_bis", location.latitude);
					that.currentBooking.set("longitude_bis", location.longitude);
				}
				
			}
	    	
			that.currentBooking.save();
			
			if (bookingWasClosed) {
				that.currentBookingClosed = that.currentBooking;
	        	that.currentBooking = null;
			}
        	DigiWebApp.SettingsController.setSetting("currentTimezoneOffset", null);
	    	DigiWebApp.SettingsController.setSetting("currentTimezone", null);
        } else {
            //M.DialogView.alert({
    		DigiWebApp.ApplicationController.DigiLoaderView.hide();
            DigiWebApp.ApplicationController.nativeAlertDialogView({
                  title: M.I18N.l('hint')
                , message: M.I18N.l('noOpenBookings')
            });
            return;
        }

		if (bookingWasClosed) {
			
	        that.set('currentBookingStr', '');
	
	        // reset selections to show "Bitte wählen: "
	        DigiWebApp.SelectionController.resetSelection();
	        DigiWebApp.SelectionController.initSelection();
	        DigiWebApp.SelectionController.useSelections = NO;
		
		}
		
        var finishBooking = function() {
        	DigiWebApp.ApplicationController.DigiLoaderView.hide();
        	if (DigiWebApp.SettingsController.getSetting('autoTransferAfterClosingDay')) {
	            DigiWebApp.DashboardController.dataTransfer(YES); // yes means: is closing day
	        } else {
	            // clear employee selection, but only if not auto data transfer and save it before to have it while sending the data
	            localStorage.setItem(DigiWebApp.EmployeeController.empSelectionKeyTmp, localStorage.getItem(DigiWebApp.EmployeeController.empSelectionKey));
	            localStorage.removeItem(DigiWebApp.EmployeeController.empSelectionKey);
	            // set employee state back
	            if(DigiWebApp.EmployeeController.getEmployeeState() == 2) {
	                DigiWebApp.EmployeeController.setEmployeeState(1);
	            }
	            //M.DialogView.alert({
	    		DigiWebApp.ApplicationController.DigiLoaderView.hide();
	            DigiWebApp.ApplicationController.nativeAlertDialogView({
	                  title: M.I18N.l('closingDaySuccess')
	                , message: M.I18N.l('closingDaySuccessWithoutMsg')
	            });
	        }
        };
        
	    if (DigiWebApp.SettingsController.featureAvailable('417') && DigiWebApp.SettingsController.getSetting("ServiceApp_ermittleGeokoordinate")) {
			if (DigiWebApp.SettingsController.getSetting("ServiceApp_engeKopplung") || DigiWebApp.SettingsController.getSetting('autoTransferAfterClosingDay')) {
				// put, dann solange GET bis !=WAIT oder GPS-TIMEOUT erreicht
				var pollBooking = function() {
					if (DigiWebApp.SettingsController.getSetting("debug"))  console.log("polling for bookinglocations");
					// getBookings mit timeout
					var checkForOK = function(datensaetze) {
						if (DigiWebApp.SettingsController.getSetting("debug"))  console.log(datensaetze.length + " Datensätze empfangen");
						_.each(datensaetze, function(datensatzObj) {
							try {
								if (DigiWebApp.SettingsController.getSetting("debug"))  console.log("speichere gepullten Datensatz " + datensatzObj.m_id);
								var modelBooking = _.find(DigiWebApp.Booking.find(), function(b) { return (b.m_id === datensatzObj.m_id);});
								var datensatz = datensatzObj.record;
								if (DigiWebApp.SettingsController.getSetting("debug"))  console.log("modelBooking: ", modelBooking);
								if (DigiWebApp.SettingsController.getSetting("debug"))  console.log("datensatz: ", datensatz);
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
								modelBooking.set("ServiceApp_Status", datensatz.status);
								modelBooking.save();
								if (DigiWebApp.SettingsController.getSetting("debug"))  console.log("datensatz " + datensatzObj.m_id + " gespeichert");
							} catch(exNotFound) {
								if (DigiWebApp.SettingsController.getSetting("debug"))  console.log("datensatz " + datensatzObj.m_id + " nicht gefunden");
							}
						});
						that.currentBookingClosed = null;
						finishBooking();
					};
					var idsToPoll = [];
					if (that.currentBooking !== null) { idsToPoll.push(that.currentBooking.m_id); }
					if (that.currentBookingClosed !== null) { idsToPoll.push(that.currentBookingClosed.m_id); }
					DigiWebApp.ServiceAppController.pollBookings(idsToPoll, checkForOK, finishBooking, DigiWebApp.SettingsController.getSetting('GPSTimeOut'));
				};
				
				if (bookingWasClosed) {
					if (DigiWebApp.SettingsController.getSetting("debug"))  console.log("post currentBookingClosed");
					DigiWebApp.ServiceAppController.postBookings([that.currentBookingClosed], pollBooking, finishBooking);
				} else {
					if (DigiWebApp.SettingsController.getSetting("debug"))  console.log("post currentBooking");
					DigiWebApp.ServiceAppController.postBookings([that.currentBooking], function(){}, function(){});
				}
			} else {
				if (bookingWasClosed) {
					if (that.currentBookingClosed !== null) {
						var getWAITFunc = function() {
							if (DigiWebApp.SettingsController.getSetting("debug"))  console.log("refreshWAIT");
							DigiWebApp.ServiceAppController.refreshWAITBookings(function(){
								if (DigiWebApp.SettingsController.getSetting("debug"))  console.log("refreshWAIT done");
								finishBooking();
							},function(err){console.error(err);finishBooking();});
						};
						if (DigiWebApp.SettingsController.getSetting("debug"))  console.log("post currentBookingClosed");
						DigiWebApp.ServiceAppController.postBookings([that.currentBookingClosed], getWAITFunc, getWAITFunc);
					} else {
						finishBooking();	
					}
				}
			}
		} else {
			if (bookingWasClosed) {
				finishBooking();
			}
		}

    }
    
    , loadSignatures: function(bookings, successCallback) {
    	
		// check for successCallback is a function
		if (typeof successCallback !== "function") {
			console.error("loadSignaturesError: successCallback is not a function");
	        return;
	    }
		
		DigiWebApp.ApplicationController.DigiLoaderView.show(M.I18N.l('loadSignatures'));

		var bookingsLength = bookings.length;
    	var bookingsIndex = 0;
    	
    	if (bookingsLength !== 0) { 
	    	_.each(bookings, function(el) {
	    		bookingsIndex = bookingsIndex + 1;
    			//console.log('loading signature for booking No. ' + bookingsIndex);
    			if (el.hasFileName()) {
	    			//console.log(el.get('fileName'));
					// load signature into el
					el.readFromFile(function(fileContent){
						//console.log("fileContent: " + fileContent);
						if (fileContent && (fileContent !== "")) {
							DigiWebApp.BookingController.propagateBookingWithSignature(bookings, el.m_id, fileContent);
						}
						if ( bookingsIndex === bookingsLength ) {
							// last signature loaded
				    		//console.log('last booking done (with file)');
		    				//DigiWebApp.ApplicationController.DigiLoaderView.hide();
							successCallback();
						}
					}, function() {
						if ( bookingsIndex === bookingsLength ) {
							// last signature loaded
				    		//console.log('last booking done (with file)');
		    				//DigiWebApp.ApplicationController.DigiLoaderView.hide();
							successCallback();
						}
					});
    			} else {
	    			// this booking has no signature
					if ( bookingsIndex === bookingsLength ) {
						// last signature loaded
			    		//console.log('last booking done (no file)');
	    				//DigiWebApp.ApplicationController.DigiLoaderView.hide();
						successCallback();
					}
	    		}
	        });
    	} else {
    		//console.log('no bookings');
			//DigiWebApp.ApplicationController.DigiLoaderView.hide();
			successCallback();
    	}
    }
    
    , propagateBookingWithSignature: function(bookings, id, signature) {
    	_.each(bookings, function(el) {
            if (el.m_id === id) {
            	el.signature = signature;
            }
        });
    }

    /**
     * Calls sendData of DigiWebApp.RequestController.
     * Passes all local available bookings.
     *
     * Success Callback:
     * 1) deletes all bookings, except the current
     * 2) resets the selection lists and sets them to show the current booking data
     * 3) If the method is called in closingDay context, the currentBookingStr is cleared and the employeeSelection cleared
     *
     * Error Callback
     * 1) If it is called in closingDay context, the employeeSelection is cleared.
     * 2) Shows an error alert.
     *
     * @param {Boolean} isClosingDay Flag that determines whether this function is called directly after closing day
     */
    , sendBookings: function(isClosingDay, doSync) {
    	var bookings = DigiWebApp.Booking.find();
    	DigiWebApp.BookingController.loadSignatures(bookings, function() {
    		DigiWebApp.BookingController.sendSignatures(bookings, isClosingDay, doSync);
    	});
    }
    
    , sendSignatures: function(bookings, isClosingDay, doSync) {

    	// sende vorhandene unterschriften
    	var that = this;
		var items = [];
		_.each(bookings, function(el) {
			if (el.signature) {
				var mySig = el.record;
				mySig.unterschrift = JSON.parse(el.signature);
				items.push(mySig);
			}
		});
		
		if (items.length !== 0) {
			
			var data = {"unterschriften": items};
			
			var internalSuccessCallback = function(data2, msg, request) {
				// verarbeite empfangene Daten
				//console.log("sendSignatures Status: " + request.status);										
				// weiter in der Verarbeitungskette
				that.sendBookingsWithoutSignatures(DigiWebApp.Booking.find(), isClosingDay, doSync);
			};

			var sendObj = {
					  data: data
					, webservice: "medien/unterschrift"
					, loaderText: M.I18N.l('sendSignatures')
					, successCallback: internalSuccessCallback
					, errorCallback: internalSuccessCallback
					//, additionalQueryParameter:
					//, timeout: 
			};
			DigiWebApp.JSONDatenuebertragungController.sendData(sendObj);
			
		} else {
			that.sendBookingsWithoutSignatures(DigiWebApp.Booking.find(), isClosingDay, doSync);
		}
		
    }
    
    , sendBookingsWithoutSignatures: function(bookings, isClosingDay, myDoSync) {

    	var doSync = false;
        if (typeof(myDoSync) !== "undefined") doSync = myDoSync;

        if (bookings.length > 0) {
        	
        	DigiWebApp.JSONDatenuebertragungController.sendeZeitdaten(
        		  bookings
        		, function() {
        			  var that = DigiWebApp.BookingController;
        			  var CurrentAvailable = false;
        			  _.each(DigiWebApp.Booking.find(), function(el) {
        				  if (el.get('isCurrent')) {
        					  CurrentAvailable = true;
        				  }
    				  });
        			  if (DigiWebApp.SettingsController.getSetting("debug"))  console.log("CurrentAvailable: ", CurrentAvailable);
        			  // no current booking: after closing-time
        			  if (!CurrentAvailable) {
        				  DigiWebApp.SentBooking.deleteAll();
        			  }
      			
						// Feature 411 : Zeitbuchungen für X Tage auf Gerät belassen
						if (DigiWebApp.SettingsController.featureAvailable('411')) {
							try {
								// move Bookings to SentBookingArchived
							      _.each(DigiWebApp.Booking.find(), function(el) {
							          if (!el.get('isCurrent')) {
							      		  var sentBookingArchivedEl = that.sentBookingArchived(el);
							      		  if (sentBookingArchivedEl != null) {
								      		  sentBookingArchivedEl.save();
								      		  // check if that day is already in archive
								      		  var dayFound = NO;
								      		  var dayToFind = D8.create(el.get('timeStampStart')).format("dd.mm.yyyy");
								      		  _.each(DigiWebApp.SentTimeDataDays.find(), function(day){
								      			  if (day.get('tagLabel') === dayToFind) {
								      				  dayFound = YES;
								      			  }
								      		  });
								      		  if (dayFound === NO) {
								      			  var dayRecord = DigiWebApp.SentTimeDataDays.createRecord({
								      				  tagLabel: dayToFind
								      			  });
								      			  dayRecord.save();
								      		  }
							      		  }
							          }
							      });
							  
							      // veraltete Buchungen aus Archiv entfernen
							      DigiWebApp.SentBookingArchived.deleteOld();
							      DigiWebApp.SentTimeDataDays.deleteOld();
							
							} catch(e20) {
							    DigiWebApp.ApplicationController.nativeAlertDialogView({
							          title: M.I18N.l('error')
							        , message: M.I18N.l('errorWhileArchivingBookings')
							        });
							}
							
						}
						// Feature 411 : End

						// Buchungen aufräumen
						var deleteBuchungsIds = [];
		  				_.each(DigiWebApp.Booking.find(), function(el) {
		                    if (!el.get('isCurrent')) {
		                  	  if (CurrentAvailable) {
			                  		  try {
			                      		  // save booking as sentBooking for later view in sentBookingsListView
			                      		  var sentBookingEl = that.sentBooking(el);
			                      		  if (sentBookingEl != null) { sentBookingEl.save(); }
			                  		  } catch(e21) {
			        			            DigiWebApp.ApplicationController.nativeAlertDialogView({
			        			                  title: M.I18N.l('error')
			        			                , message: M.I18N.l('errorWhileBackingUpBookings')
			        			            });
			                  		  }
			                  }
		                  	  deleteBuchungsIds.push(el.m_id);
		                      el.del();
		                    }
		                  });
		  				
		  				if (DigiWebApp.SettingsController.featureAvailable('417')) {
							DigiWebApp.ServiceAppController.deleteBookings(
								    deleteBuchungsIds
								  , function() {
								    	if (DigiWebApp.SettingsController.getSetting("debug"))  console.log("Buchungen wurden in der ServiceApp gelöscht.");
								  }
								  , function() {
									  	if (DigiWebApp.SettingsController.getSetting("debug"))  console.log("Buchungen konnten nicht in der ServiceApp gelöscht werden.");
									  }
							);
		  				}

		  				  // Buchungsselektion erneuern
		                  DigiWebApp.SelectionController.resetSelection();
		                  if (CurrentAvailable) {
		                      DigiWebApp.SelectionController.setSelectionByCurrentBooking();
		                  } else {
		                      DigiWebApp.SelectionController.initSelection();
		                  }

		                  // falls Feierabend gebucht wurde: aufräumen
		                  if (isClosingDay) {
		                	  that.set('currentBookingStr', '');
		
		                      if (DigiWebApp.EmployeeController.getEmployeeState() == 2) {
		                          DigiWebApp.EmployeeController.setEmployeeState(1);
		                      }
		                      // clear employee selection
		                      localStorage.removeItem(DigiWebApp.EmployeeController.empSelectionKey);
		                      localStorage.removeItem(DigiWebApp.EmployeeController.empSelectionKeyTmp);
		                  }
                          DigiWebApp.ApplicationController.DigiLoaderView.hide();

                          // now call startsync again
                          if (DigiWebApp.SettingsController.getSetting('autoSyncAfterBookTime') || doSync === true) {
                          		DigiWebApp.ApplicationController.startsync(YES);
                          }
                  
        		  }
        		  , function() {
                      DigiWebApp.ApplicationController.DigiLoaderView.hide();
	              		// die Buchung(en) konnte(n) nicht gesendet werden
	                    DigiWebApp.ApplicationController.nativeAlertDialogView({
	                        title: M.I18N.l('sendDataFail'),
	                        message: M.I18N.l('sendDataFailMsg')
	                    });
	              }
        		  , isClosingDay
        		  , doSync
        	);

//		Alte XML-Übertragungsvariante:        	
//            DigiWebApp.RequestController.sendData({
//                  bookings: bookings
//                , success: {
//                    target: this,
//                    action: function() {
//            			var CurrentAvailable = false
//                        _.each(DigiWebApp.Booking.find(), function(el) {
//                            if(el.get('isCurrent')) {
//                            	CurrentAvailable = true;
//                            }
//                        });
//            			
//            			// no current booking: after closing-time
//            			if (!CurrentAvailable) {
//            				DigiWebApp.SentBooking.deleteAll();
//            			}
//            			
//        				// Feature 411 : Zeitbuchungen für X Tage auf Gerät belassen
//        				if (DigiWebApp.SettingsController.featureAvailable('411')) {
//        					try {
//	            				// move Bookings to SentBookingArchived
//	                            _.each(DigiWebApp.Booking.find(), function(el) {
//	                                if(!el.get('isCurrent')) {
//	                            		  var sentBookingArchivedEl = DigiWebApp.BookingController.sentBookingArchived(el);
//	                            		  sentBookingArchivedEl.save();
//	                            		  // check if that day is already in archive
//	                            		  var dayFound = NO;
//	                            		  var dayToFind = D8.create(el.get('timeStampStart')).format("dd.mm.yyyy");
//	                            		  _.each(DigiWebApp.SentTimeDataDays.find(), function(day){
//	                            			  if (day.get('tagLabel') === dayToFind) {
//	                            				  dayFound = YES;
//	                            			  }
//	                            		  });
//	                            		  if (dayFound === NO) {
//	                            			  var dayRecord = DigiWebApp.SentTimeDataDays.createRecord({
//	                            				  tagLabel: dayToFind
//	                            			  });
//	                            			  dayRecord.save();
//	                            		  }
//	                                }
//	                            });
//                            
//	                            // veraltete Buchungen aus Archiv entfernen
//	                            DigiWebApp.SentBookingArchived.deleteOld();
//	                            DigiWebApp.SentTimeDataDays.deleteOld();
//
//        					} catch(e) {
//        			            DigiWebApp.ApplicationController.nativeAlertDialogView({
//        			                  title: M.I18N.l('error')
//        			                , message: M.I18N.l('errorWhileArchivingBookings')
//        			            });
//        					}
//
//        				}
//        				// Feature 411 : End
//
//        				_.each(DigiWebApp.Booking.find(), function(el) {
//                          if(!el.get('isCurrent')) {
//                        	  if (CurrentAvailable) {
//                        		  try {
//	                        		  // save booking as sentBooking for later view in sentBookingsListView
//	                        		  var sentBookingEl = DigiWebApp.BookingController.sentBooking(el);
//	                            	  sentBookingEl.save();
//                        		  } catch(e) {
//              			            DigiWebApp.ApplicationController.nativeAlertDialogView({
//	          			                  title: M.I18N.l('error')
//	          			                , message: M.I18N.l('errorWhileBackingUpBookings')
//	          			            });
//                        		  }
//                        	  }
//                              el.del();
//                          }
//                        });
//                        
//                        DigiWebApp.SelectionController.resetSelection();
//                        if(this.currentBooking) {
//                            DigiWebApp.SelectionController.setSelectionByCurrentBooking();
//                        } else {
//                            DigiWebApp.SelectionController.initSelection();
//                        }
//
//                        if(isClosingDay) {
//                            this.set('currentBookingStr', '');
//
//                            if(DigiWebApp.EmployeeController.getEmployeeState() == 2) {
//                                DigiWebApp.EmployeeController.setEmployeeState(1);
//                            }
//                            // clear employee selection
//                            localStorage.removeItem(DigiWebApp.EmployeeController.empSelectionKey);
//                            localStorage.removeItem(DigiWebApp.EmployeeController.empSelectionKeyTmp);
//                        }
//                        
//                    }
//                }
//                , error: {
//                      target: this
//                    , action: function() {
//                		// die Buchung(en) konnte(n) nicht gesendet werden
//                        DigiWebApp.ApplicationController.nativeAlertDialogView({
//                            title: M.I18N.l('sendDataFail'),
//                            message: M.I18N.l('sendDataFailMsg')
//                        });
//                    }
//                }
//            }, isClosingDay, doSync); // is closingDay is passed to request controller.sendData to check whether local Storage remove of emp selection tmp shall be proceed

        }
    }

    /**
     * Constructs a string containing the data according to the passed booking object
     * @param {Object} booking The booking for which the string should be created
     */
    , buildBookingStr: function(booking) {
        var bookingStr = '';
        var myDisplayTimestamp;
        if (typeof(this.currentBooking.get("timezoneOffset")) === "undefined") {
        	myDisplayTimestamp = new Date(this.currentBooking.get('timeStampStart')).getTime();
        } else {
        	myDisplayTimestamp = new Date(this.currentBooking.get('timeStampStart') - (1000 * 60 * (this.currentBooking.get("timezoneOffset") - new Date().getTimezoneOffset()))).getTime();
        }
        //bookingStr = M.Date.create(this.currentBooking.get('timeStampStart')).format('dd.mm.yy HH:MM');
        bookingStr = M.Date.create(myDisplayTimestamp).format('dd.mm.yy HH:MM');
        return bookingStr;
    }
    
    , spesenOptionen: null
    
    , uebernachtungOptionen: null
    

});