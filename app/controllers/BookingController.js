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
     * Namen der Kolonnenmitglieder zur Anzeige auf der BookingPage.
     * Leer, falls die Anzeige nicht aktiviert wurde oder aktive Buchung != Kolonnenbuchung
     */
    , kolonneStr: ''

    /**
     * Der Zeitstempel zum Zeitpunkt des Buchens durch den Benutzer
     */
    , currentBookingTimesStampBook: null

    , startGetLocationTimestamp: null

    /**
     * Flag indicating whether a switch to the bookingPage is back from employee selection page.
     * Is needed to determine whether to re-set selection lists or not.
     */
    , isBackFromEmployeePage: false

    /**
     * Flag indicating whether a switch to the bookingPage is back from remark page.
     * Is needed to determine whether to re-set selection lists or not.
     */
    , isBackFromRemarkPage: false

    /** Flag, ob die Kolonne geändert wird.
     */
    , istKolonnenaenderung: false

    /** Flag, ob aktuell eine Feierabendbuchung in Bearbeitung ist.
     * Dient zum Verhindern doppelter Buchungsvorgänge.
     */
    , feierabendbuchungInBearbeitung: false

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
    
    // Bugfix 2515: Objekt, um die Selektion beim Tippen
    // des Buchen-Buttons zu speichern
    , checkedCurrentBooking: null

    // Konstanten für die Buchungs-Property "spesenAuswahl".
    // Die Zahlenwerte müssen mit den entsprechenden VorgabeId in der
    // Tabelle [SonderbuchungseigenschaftVorgabe] in der DIGI-DB übereinstimmen!
    // Noch unklar: Explizite Buchung "4 = Fahrt mit Privat-Pkw" erwünscht oder soll diese
    // nicht angezeigt werden weil es eine gefahreneKilometer-Buchung gibt?
    , constFs431SpesenauswahlPrivatPkw: '4'
    , constFs431SpesenauswahlFirmenwagen: '5'
    , constFs431SpesenauswahlBusBahn: '6'

    // Konstanten für die Buchungs-Property "uebernachtungsAuswahl".
    // Die Zahlenwerte müssen mit den entsprechenden VorgabeId in der
    // Tabelle [SonderbuchungseigenschaftVorgabe] in der DIGI-DB übereinstimmen!
    , constFs431UebernachtungsauswahlKeine: '7'
    , constFs431UebernachtungsauswahlPrivat: '8'
    , constFs431UebernachtungsauswahlZahltFirma: '9'
    , constFs431UebernachtungsauswahlSelbstBezahlt: '10'

    // Wird nicht als Bool-Property gespeichert, sondern landet in spesenAuswahl.
    , fs431ReisekostenFirmenwagen: null

    // Wird nicht als Bool-Property gespeichert, sondern landet in spesenAuswahl.
    , fs431ReisekostenBusBahn: null

    /**
     *
     * On first load does:
     *
     * 1) searches for an open booking and sets it if available
     * 2) Builds the current booking string and sets it to property currentBookingStr
     * 3) Presets the selection lists to show the data of the current open booking
     *
     * On first and every other load:
     * If back from employee selection page
     * sets isBackFromEmployeePage to false and nothing more
     *
     * Else
     * sets the selection list according to different flags in SelectionController:
     * showHandOrders or useSelection (selection made before)
     * if they are false, set selection to current open booking
     * if no open booking reset selection
     *
     * @param {Boolean} isFirstLoad is passed if this function is used in a page event like pageshow 
     * => determines that the page is loaded for the very first time during this application life cycle
     */
    , init: function(isFirstLoad) {
	
		if (isFirstLoad) {
		    DigiWebApp.SelectionController.set("uebernachtungskennzeichenScholpp",
                JSON.parse('[{"label":"Keine Übernachtung","value":"1","isSelected":true},{"label":"Pauschal","value":"2"},{"label":"Beleg (Hotel)","value":"3"},{"label":"Heimreise","value":"4"},{"label":"Baustellenwechsel","value":"5"},{"label":"- -","value":"6"}]'));
		    DigiWebApp.SelectionController.set("spesenkennzeichenScholpp",
                JSON.parse('[{"label":" ","value":"1","isSelected":true}]'));
		}
		
		var p = M.Environment.getPlatform();
        if (    (p.substr(0,10) !== "BlackBerry")
        	 && (p.substr(0,12) !== "Linux armv7l")
    		//&& (navigator.userAgent.toLowerCase().indexOf("android") === -1)
    	) {
        	// enable Transitions on iOS and Android
            DigiWebApp.ApplicationController.setTransitionsSetting();
		}
	
        if (this.isBackFromEmployeePage) {
			this.refreshCurrentBooking(false);
            DigiWebApp.BookingController.set('isBackFromEmployeePage', false);
        } else if (this.isBackFromRemarkPage) {
			this.refreshCurrentBooking(false);
            DigiWebApp.BookingController.set('isBackFromRemarkPage', false);
        } else {
            // Optimierung: Parameter setSelection = true ist unnötig, weil die Auswahllisten im 
            // folgenden if/else-Block in jedem Fall gefüllt werden.
            this.refreshCurrentBooking(false);

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
     * Aktualisiert die laufende Buchung (currentBooking) sowie die im Buchungsscreen
     * angezeigten Meldungen (currentBookingStr und kolonneStr).
     * Dafür wird die neueste offene Buchung verwendet.
     * Wird von init() und book() aufgerufen, um Änderungen im LocalStorage zu berücksichtigen.
     */
    , refreshCurrentBooking: function (setSelection) {
    	
    	var bookingsSorted = _.sortBy(DigiWebApp.Booking.find(), function (booking) {
	        	return booking.get("timeStampStart");
	    });
        var openBookings = null;

        if (bookingsSorted.length > 0) {
            openBookings = _.select(bookingsSorted, function(b) {
                if (b) return b.get('isCurrent') === true;
            });
        }

        if (openBookings && openBookings.length > 0) {

            //if (DigiWebApp.SettingsController.globalDebugMode) console.log('currentBookingStr was ' + this.get('currentBookingStr'));

            this.set('currentBooking', openBookings[openBookings.length - 1]);
            this.set('currentBookingStr', this.buildBookingStr(this.currentBooking));
            this.set('kolonneStr', this.buildKolonneStr(this.currentBooking));

            //if (DigiWebApp.SettingsController.globalDebugMode) console.log('currentBookingStr is now ' + this.get('currentBookingStr'));

        	// Performance Weyer: folgendes setSelection führt zu einem unnötigen neu-rendern
            if (setSelection) {
            	DigiWebApp.SelectionController.setSelectionByCurrentBooking();
            }
        }
    }

    /** Aktualisiert die letzte abgeschlossene Buchung (currentBookingClosed).
     * Wird von checkBooking() aufgerufen, um Änderungen im LocalStorage zu berücksichtigen.
     */
    , refreshCurrentBookingClosed: function () {
    	try {
    	    var allBookingsSorted = _.sortBy(DigiWebApp.Booking.find().concat(
                DigiWebApp.SentBooking.find()), function (booking) {
	        		return booking.get("timeStampStart");
	        });
	        var allClosedBookingsSorted = _.select(allBookingsSorted, function(b) {
	            if (b) return b.get('isCurrent') === false;
	        });
	        DigiWebApp.BookingController.currentBookingClosed =
                allClosedBookingsSorted[allClosedBookingsSorted.length - 1];
    	} catch(e) {}
    }

    // Event-Handler für das Drücken des Buchen-Buttons, 
    // wird auch von EmployeeController.callbackEmployeesSave() nochmal aufgerufen.
    , book: function() {
        var myDate = new Date();
        writeToLog('## book ' + M.Date.create(myDate).format('HH:MM:ss.l'));

        DigiWebApp.ApplicationController.closeAppAfterCloseDay = NO;
    	var that = DigiWebApp.BookingController;
    	try { DigiWebApp.ApplicationController.vibrate(); } catch(e2) {}
    	
    	// checkBooking checks for all booking-problems
		if (this.checkBooking()) {
			$('#' + DigiWebApp.BookingPage.content.grid.id).addClass('green');
			var t1 = window.setTimeout(function() { window.clearTimeout(t1); 
					$('#' + DigiWebApp.BookingPage.content.grid.id).removeClass('green'); }, 500);

			var timeEnd = new Date();
			var myTimeStampEnd = timeEnd.getTime();

    		if (that.currentBooking && (M.Date.create(that.currentBooking.get("timeStampStart")).format('HH:MM') == 
    				M.Date.create(myTimeStampEnd).format('HH:MM'))) {

				// Noch keine Minute vergangen -> Buchung gemäß geänderter Auswahl aktualisieren
    	    	var orderId;
    		    var handOrderId = null;
    		    var handOrderVaterId = null;
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

		    	var myOrderName = M.I18N.l('unknown');
		    	var myHandOrderName = M.I18N.l('unknown');
		    	var myPositionName = M.I18N.l('unknown');
		    	var myActivityName = M.I18N.l('unknown');

			    if (that.isHandOrder(orderId)) {
					handOrderId = orderId;
					var myHandOrderObj = _.select(DigiWebApp.HandOrder.findSorted(), function(ord) {
						if (ord) return ord.get('id') == orderId || ord.get('name') == orderId;
					})[0]
					myHandOrderName = myHandOrderObj.get('name');
					handOrderVaterId = myHandOrderObj.get('vaterId');
					myOrderName = myHandOrderName;
					orderId = null;
			
					// Ein Handauftrag hat keine posId
					posId = null;
			    } else {
			    	try {
			    		if (orderId != null) {
			    			var myOrderLoad = _.find(DigiWebApp.Order.find(), function(a) 
			    					{ return (parseIntRadixTen(a.get("id")) == parseIntRadixTen(orderId));});
			    			if (myOrderLoad && orderId != 0) myOrderName = myOrderLoad.get('name');
			    		}
			    	} catch(e4) { trackError(e4); }
			    }

		    	try {
		    		if (posId != null) {
		    			var myPositionLoad = _.find(DigiWebApp.Position.find(), function(a) 
		    					{ return (parseIntRadixTen(a.get("id")) == parseIntRadixTen(posId));});
		    			if (myPositionLoad && posId != 0) myPositionName = myPositionLoad.get('name');
		    		}
		    	} catch(e4) { trackError(e4); }
		    	
		    	try {
		    		if (actId != null) {
		    			var myActivityLoad = _.find(DigiWebApp.Activity.find(), function(a) 
		    					{ return (parseIntRadixTen(a.get("id")) == parseIntRadixTen(actId));});
		    			if (myActivityLoad && actId != 0) myActivityName = myActivityLoad.get('name');
		    		}
		    	} catch(e5) { trackError(e5); }

		    	that.currentBooking.set("orderId", orderId);
		    	that.currentBooking.set("orderName", myOrderName);
				that.currentBooking.set("handOrderId", handOrderId);
				that.currentBooking.set("handOrderVaterId", handOrderVaterId);
				that.currentBooking.set("handOrderName", myHandOrderName);
				that.currentBooking.set("positionId", posId);
				that.currentBooking.set("positionName", myPositionName);
				that.currentBooking.set("activityId", actId);
				that.currentBooking.set("activityName", myActivityName);
				that.currentBooking.save();

				try {
				    that.startBookingNotification();
				} catch(e) {}
				
			    if (that.autoSend()) {
			    	that.sendCurrentBookings();
			    }
    		} else {
    		    if (this.currentBooking) {
                    // Aktuelle Buchung abschließen
                    if (this.istEditTimeDataNoetig()) {
							this.refreshCurrentBooking(false);
							DigiWebApp.NavigationController.toRemarkPage(function() {
			    		        DigiWebApp.BookingController.set('isBackFromRemarkPage', true);
			    		        DigiWebApp.NavigationController.backToBookTimePagePOP();
			    				DigiWebApp.BookingController.bookWithRemark();            					
							}, /* istFeierabendBuchung */ false);
					} else {
						DigiWebApp.BookingController.bookWithRemark();
					}
				} else {
                    // Keine aktuelle Buchung -> einfach die neue Buchung speichern.
					DigiWebApp.BookingController.bookWithRemark();
				}
    		}
		} else { // if (checkBooking())
			$('#' + DigiWebApp.BookingPage.content.grid.id).addClass('red');
			var t2 = window.setTimeout(function() {
			        window.clearTimeout(t2);
			        $('#' + DigiWebApp.BookingPage.content.grid.id).removeClass('red');
			    }, 500);
		}
    }

    /**
     * Does the "preprocessing of a booking"
     *
     * 1) If kolonne is available and no employee selected yet, show employees page
     * 2) If autoSaveGPSData is active, fetch position first and then proceed booking, otherwise proceed booking immediately
     */
    , bookWithRemark: function() {
        if (DigiWebApp.SettingsController.getSetting("debug")) console.log("in bookWithRemark");

		DigiWebApp.ApplicationController.DigiLoaderView.hide();

        // refresh bookings from localStorage
        // this also calls this.setBookedBookings() and this.setArchivedDays()
        this.setNotBookedBookings();
        this.refreshCurrentBooking(false);

        if (DigiWebApp.EmployeeController.getEmployeeState() == 1) {
            // Kolonnenfunktion, aber Mitarbeiter noch nicht ausgewählt
            DigiWebApp.NavigationController.toEmployeePage();
            return;
        }

   		DigiWebApp.ApplicationController.DigiLoaderView.show(M.I18N.l('Save'));

        // Bugfix 2515: Save checked input booking information
		var orderId;
		var handOrderId = null;
		var handOrderVaterId = null;
		if (typeof (DigiWebAppOrdinaryDesign.bookingPageWithIconsScholpp) !== "undefined") {
		    orderId = M.ViewManager.getView('bookingPageWithIconsScholpp', 'order').getSelection();
		} else {
		    orderId = M.ViewManager.getView('bookingPage', 'order').getSelection();
		}

		var posObj;
		if (typeof (DigiWebAppOrdinaryDesign.bookingPageWithIconsScholpp) !== "undefined") {
		    posObj = M.ViewManager.getView('bookingPageWithIconsScholpp', 'position').getSelection(YES);
		} else {
		    posObj = M.ViewManager.getView('bookingPage', 'position').getSelection(YES);
		}
		var posId = posObj ? posObj.value : null;

		var actObj;
		if (typeof (DigiWebAppOrdinaryDesign.bookingPageWithIconsScholpp) !== "undefined") {
		    actObj = M.ViewManager.getView('bookingPageWithIconsScholpp', 'activity').getSelection(YES);
		} else {
		    actObj = M.ViewManager.getView('bookingPage', 'activity').getSelection(YES);
		}
		var actId = actObj ? actObj.value : null;

        // checkedCurrentBooking anhand der aktuellen Auswahl erzeugen
		var myOrderName = M.I18N.l('unknown');
		var myHandOrderName = M.I18N.l('unknown');
		var myPositionName = M.I18N.l('unknown');
		var myActivityName = M.I18N.l('unknown');

		if (this.isHandOrder(orderId)) {
		    handOrderId = orderId;
            var myHandOrderObj = _.select(DigiWebApp.HandOrder.findSorted(), function(ord) {
		        if (ord) return ord.get('id') == orderId || ord.get('name') == orderId;
		    })[0];
		    myHandOrderName = myHandOrderObj.get('name');
			handOrderVaterId = myHandOrderObj.get('vaterId');
		    myOrderName = myHandOrderName;
		    orderId = null;
		    // a handorder has no position
		    posId = null;
		} else {
		    try {
		        if (orderId != null) {
                    var myOrderLoad = _.find(DigiWebApp.Order.find(), function(a) { return (parseIntRadixTen(a.get("id")) == parseIntRadixTen(orderId)); });
		            if (myOrderLoad && orderId != 0) myOrderName = myOrderLoad.get('name');
		        }
            } catch (e4) {
                trackError(e4);
		    }
        }

        try {
            if (posId != null) {
                var myPositionLoad = _.find(DigiWebApp.Position.find(), function(a) { return (parseIntRadixTen(a.get("id")) == parseIntRadixTen(posId)); });
                if (myPositionLoad && posId != 0) myPositionName = myPositionLoad.get('name');
            }
        } catch (e4) {
            trackError(e4);
        }

        try {
            if (actId != null) {
                var myActivityLoad = _.find(DigiWebApp.Activity.find(), function(a) { return (parseIntRadixTen(a.get("id")) == parseIntRadixTen(actId)); });
                if (myActivityLoad && actId != 0) myActivityName = myActivityLoad.get('name');
            }
        } catch (e5) {
            trackError(e5);
        }
        var myCheckedCurrentBooking = {
            orderId: orderId,
            orderName: myOrderName,
            handOrderId: handOrderId,
            handOrderVaterId: handOrderVaterId,
            handOrderName: myHandOrderName,
            positionId: posId,
            positionName: myPositionName,
            activityId: actId,
            activityName: myActivityName
        };
        this.set('checkedCurrentBooking', myCheckedCurrentBooking);
        this.startBooking();
    }

    /** Kolonne ändern: Laufende Buchung kopieren, weiter mit startBooking().
     *  Die Mitarbeiterauswahl wird immer in proceedBooking() aus der empSelection
     *  im LocalStorage kopiert.
     */
    , bucheKolonnenaenderung: function () {
        if (DigiWebApp.SettingsController.getSetting("debug")) console.log("in bucheKolonnenaenderung");

        // refresh current booking from localStorage
        this.refreshCurrentBooking(false);

        if (this.currentBooking) {
            var timeEnd = new Date();
			var myTimeStampEnd = timeEnd.getTime();

            if (M.Date.create(this.currentBooking.get("timeStampStart")).format('HH:MM') ==
                M.Date.create(myTimeStampEnd).format('HH:MM')) {

                // Noch keine Minute vergangen -> offene Buchung umschreiben
		        var employeeIds = localStorage.getItem(DigiWebApp.EmployeeController.empSelectionKey)
                    || localStorage.getItem(DigiWebApp.EmployeeController.empSelectionKeyTmp);
			    var employeeIdsArray = [];
			    if ((employeeIds) && employeeIds !== "0") {
				    this.currentBooking.set('istKolonnenbuchung', true);
				    employeeIdsArray = employeeIds.split(",");
			    } else {
				    this.currentBooking.set('istKolonnenbuchung', false);
				    employeeIdsArray = [DigiWebApp.SettingsController.getSetting("mitarbeiterId")];
			    }
                // Prüfen, ob Mitarbeiter abgemeldet werden müssen, weil sie in der
                // ersten Auswahl drin sind, in der zweiten aber nicht mehr.
                var oldEmployeeIdsArray = this.currentBooking.get("employees").split(",");
                oldEmployeeIdsArray = _.difference(oldEmployeeIdsArray, employeeIdsArray);

                // Offene Buchung aktualisieren
			    this.currentBooking.set('employees', employeeIdsArray.join());
                this.currentBooking.save();
			
                // Benutzer informieren dass nur die Kolonnenauswahl für die 
                // offene Buchung geändert wird.
                DigiWebApp.ApplicationController.nativeAlertDialogView({
                      title: M.I18N.l("hint")
                    , message: M.I18N.l("kolonneAktuelleBuchungGeaendert")
                });
   			    if (this.autoSend()) {
                    // Offene Buchung versenden weil Kolonnenauswahl geändert
   			        this.sendCurrentBookings();
   			        // Mitarbeiter falls nötig abmelden. Nur bei autoSend nötig weil die Buchung
   			        // sonst gar nicht rausgegangen ist.
   			        // Dauert die Buchung länger als 1 Minute, dann greift das normale Abschließen
   			        // der offenen Buchung für alle Mitarbeiter, die in ihrem Property "employees" 
   			        // gelistetet sind.
   			        if (oldEmployeeIdsArray.length > 0) {
   			            var timestamp = new Date().getTime();

			            var mySuccessCallback = function(data, msg, request) {};
			            var myErrorCallback = function(xhr, err) {
			                writeToLog("BookingController.bucheKolonnenaenderung(): "
                                + "WebService zeitdaten/setzeFeierabend meldet Fehler!");
			            };

   			            _.each(oldEmployeeIdsArray, function (maId) {
                            var receiveObj = {
					              webservice: "zeitdaten/setzeFeierabend"
					            , loaderText: M.I18N.l('kolonneAbmeldung')
               					, successCallback: mySuccessCallback
            					, errorCallback: myErrorCallback
					            , additionalQueryParameter: 
                                    "mitarbeiterId=" + maId + "&bisTimestamp=" + timestamp
			                };
                            DigiWebApp.JSONDatenuebertragungController.recieveData(receiveObj);			                       
			            });
                    }
			    }
            } else {
	            var myCheckedCurrentBooking = {
	                orderId: this.currentBooking.get("orderId"),
	                orderName: this.currentBooking.get("orderName"),
	                handOrderId: this.currentBooking.get("handOrderId"),
	                handOrderVaterId: this.currentBooking.get("handOrderVaterId"),
	                handOrderName: this.currentBooking.get("handOrderName"),
	                positionId: this.currentBooking.get("positionId"),
	                positionName: this.currentBooking.get("positionName"),
	                activityId: this.currentBooking.get("activityId"),
	                activityName: this.currentBooking.get("activityName")
	            };
	            this.set('checkedCurrentBooking', myCheckedCurrentBooking);
	            this.startBooking();
            }
        } else {
            writeToLog("BookingController.bucheKolonnenaenderung() wurde aufgerufen trotz currentBooking == null!");
        }
      }

    /** Buchung starten: Zeitstempel merken, weiter mit getBookingLocation()
     */
    , startBooking: function() {
        this.currentBookingTimesStampBook = new Date();
        writeToLog('## currentBookingTimesStampBook ' 
            + M.Date.create(this.currentBookingTimesStampBook.getTime()).format('HH:MM:ss.l'));
		this.getBookingLocation(this.proceedBooking);
    }
    
    /** Ermittelt die Geokoordinate für die Zeitbuchung
     */
    , getBookingLocation: function(outerSuccessCallback) {
    	
    	var successHandlerCalled = false;
    	var mysuccessCallback = function(location) {
    		if (!successHandlerCalled) {
    			successHandlerCalled = true;
    			outerSuccessCallback(location);
    		} else {
    			var logStr = "[getBookingLocation] successHandler wäre ein zusätzliches mal gefeuert worden";
    			//alert(logStr);
    			writeToLog(logStr);
    		}
    	}
    	
    	if (DigiWebApp.SettingsController.getSetting("debug"))  console.log("in getBookingLocation");

    	var that = DigiWebApp.BookingController;
    	
    	that.startGetLocationTimestamp = new Date().getTime();

    	// Get GPS-Position if set in Settings
    	var getLocationNow = function(successCallback, nextOptions, nextFunction) {
    		
    		DigiWebApp.ApplicationController.DigiLoaderView.show(
                M.I18N.l('getGPSPositionMsg'), 
                DigiWebApp.SettingsController.getSetting('GPSTimeOut'));
	
            var getLocationOptions =  { 
            		enableHighAccuracy: parseBool(DigiWebApp.SettingsController.getSetting("GPSenableHighAccuracy"))
            	  , maximumAge: parseIntRadixTen(DigiWebApp.SettingsController.getSetting('GPSmaximumAgeMinutes')) * 60000
            	  , timeout: parseIntRadixTen(DigiWebApp.SettingsController.getSetting('GPSTimeOut'))
            };
            if (nextOptions && !nextFunction) {
            	getLocationOptions.enableHighAccuracy = nextOptions.enableHighAccuracy;
            	getLocationOptions.maximumAge = nextOptions.maximumAge;
            	getLocationOptions.timeout = nextOptions.timeout;
            }
    		
    		M.LocationManager.getLocation(that, successCallback, function(error) {
                	if ( error === M.LOCATION_POSITION_UNAVAILABLE ) {
	                	if (nextFunction) {
		                    writeToLog("GPS-ERROR: POSITION_UNAVAILABLE, trying again in 100ms");
	                		window.setTimeout(function() { nextFunction(successCallback, nextOptions); }, 100);
	                		DigiWebApp.ApplicationController.DigiLoaderView.hide();
	                	} else {
		                    writeToLog("GPS-ERROR: POSITION_UNAVAILABLE, giving up");
	                		DigiWebApp.ApplicationController.nativeAlertDialogView({
	                			  title: M.I18N.l('GPSError')
	                			, message: M.I18N.l('GPSunavailable')
	            	    		, callbacks: {
			      	        		confirm: {
			      	            		  target: this
			      	            		, action: function() {
	                						//successCallback();
			      						}
			      	        		}
			      	    		}
	                		});
	                		successCallback();
	                	}
                	} else if ( error === M.LOCATION_TIMEOUT ) {
	                	if (nextFunction) {
		                    writeToLog("GPS-ERROR: TIMEOUT, trying again in 100ms");
	                		window.setTimeout(function() { nextFunction(successCallback, nextOptions); }, 100);
	                		DigiWebApp.ApplicationController.DigiLoaderView.hide();
	                	} else {
		                    writeToLog("GPS-ERROR: TIMEOUT, giving up");
	                		DigiWebApp.ApplicationController.nativeAlertDialogView({
	                			  title: M.I18N.l('GPSError')
	                			, message: M.I18N.l('GPStimeout')
	            	    		, callbacks: {
			      	        		confirm: {
			      	            		  target: this
			      	            		, action: function() {
	              							//successCallback();
			      						}
			      	        		}
			      	    		}
		              		});
	                		successCallback();
	                	}
                	} else if ( error === M.LOCATION_PERMISSION_DENIED ) {
	                	if (nextFunction) {
		                    writeToLog("GPS-ERROR: PERMISSION_DENIED, trying again in 100ms");
	                		window.setTimeout(function() { nextFunction(successCallback, nextOptions); }, 100);
	                		DigiWebApp.ApplicationController.DigiLoaderView.hide();
	                	} else {
		                    writeToLog("GPS-ERROR: PERMISSION_DENIED, giving up");
	                		DigiWebApp.ApplicationController.nativeAlertDialogView({
	                			  title: M.I18N.l('GPSError')
	                			, message: M.I18N.l('GPSmissingPermission')
	            	    		, callbacks: {
			      	        		confirm: {
			      	            		  target: this
			      	            		, action: function() {
	              							//successCallback();
			      						}
			      	        		}
				      	    	}
		              		});
	                		successCallback();
	                	}
                	} else if ( error === M.LOCATION_ALREADY_RECEIVING ) {
	                	if (nextFunction) {
		                    writeToLog("GPS-ERROR: ALREADY_RECEIVING, trying again in 1000ms");
	                		window.setTimeout(function() { nextFunction(successCallback, nextOptions); }, 1000);
	                		DigiWebApp.ApplicationController.DigiLoaderView.hide();
	                	} else {
	                	    // Der Fehler tritt praktisch nur auf, wenn schon eine Buchung läuft.
                            // In dem Fall soll die zweite Buchung eh nicht ausgeführt werden.
		                    writeToLog("GPS-ERROR: ALREADY_RECEIVING, giving up");
	                		DigiWebApp.ApplicationController.nativeAlertDialogView({
	                			  title: M.I18N.l('GPSError')
	                			, message: M.I18N.l('GPSalreadyRecieving')
	            	    		, callbacks: {
				      	        		  confirm: {
				      	            		  target: this
				      	            		, action: function() {
				      						}
				      	        		}
				      	    		}
		              		});
	                	}
                	} else {
	                	if (nextFunction) {
		                    writeToLog("GPS-ERROR: unknown GPS-error, trying again in 100ms");
	                		window.setTimeout(function() { nextFunction(successCallback, nextOptions); }, 100);
	                		DigiWebApp.ApplicationController.DigiLoaderView.hide();
	                	} else {
		                    writeToLog("GPS-ERROR: unknown GPS-error, giving up");
	                		DigiWebApp.ApplicationController.nativeAlertDialogView({
	                			  title: M.I18N.l('GPSError')
	                			, message: M.I18N.l('GPSunknownError') + error
	            	    		, callbacks: {
			      	        		confirm: {
			      	            		  target: this
			      	            		, action: function() {
	            							//successCallback();
			      						}
			      	        		}
	                			}
		            		});
	                		successCallback();
	                	}
                	}
	            }, getLocationOptions); // getLocation() call
        	}; // getLocationNow()
    	
            // Freischaltung 417: Unterstützung für die DIGI-ServiceApp
			if (DigiWebApp.SettingsController.featureAvailable('417') 
			&& DigiWebApp.SettingsController.getSetting("ServiceApp_ermittleGeokoordinate") 
			&& DigiWebApp.SettingsController.getSetting('autoSaveGPSData')) {
				if (DigiWebApp.SettingsController.getSetting("ServiceApp_FallBack")) {
		            DigiWebApp.ServiceAppController.knockknock(function(data) {
		            	if (DigiWebApp.SettingsController.getSetting("debug")) {
			                writeToLog("ServiceApp ist erreichbar.");
			            }
		            	mysuccessCallback();
		            }, function() {
		            	if (DigiWebApp.SettingsController.getSetting("debug")) {
			                writeToLog("ServiceApp ist NICHT erreichbar!");
			            }
		            	if (!parseBool(DigiWebApp.SettingsController.getSetting("GPSenableHighAccuracy")) 
		            	&& parseBool(DigiWebApp.SettingsController.getSetting("GPSenableHighAccuracyFallback"))) {
		                    if (DigiWebApp.SettingsController.getSetting("debug")) {
			                    writeToLog("Positionsermittlung mit GPSenableHighAccuracyFallback");
			                }
		    	            var nextLocationOptions =  { 
		    	            		enableHighAccuracy: YES
		    	            	  , maximumAge: parseIntRadixTen(DigiWebApp.SettingsController.getSetting('GPSmaximumAgeMinutes')) * 60000
		    	            	  , timeout: parseIntRadixTen(DigiWebApp.SettingsController.getSetting('GPSTimeOut'))
		    	            };
		            		getLocationNow(mysuccessCallback, nextLocationOptions, getLocationNow);
		            	} else {
		                    if (DigiWebApp.SettingsController.getSetting("debug")) {
			                    writeToLog("Positionsermittlung ohne GPSenableHighAccuracyFallback");
			                }
		            		getLocationNow(mysuccessCallback);
		            	}
		            });
				} else {
					mysuccessCallback();
				}
			} else if (DigiWebApp.SettingsController.getSetting('autoSaveGPSData')) {
            	if (!parseBool(DigiWebApp.SettingsController.getSetting("GPSenableHighAccuracy")) 
            	&& parseBool(DigiWebApp.SettingsController.getSetting("GPSenableHighAccuracyFallback"))) {
		            if (DigiWebApp.SettingsController.getSetting("debug")) {
			            writeToLog("Positionsermittlung mit GPSenableHighAccuracyFallback");
			        }
    	            var nextLocationOptions =  { 
    	            		enableHighAccuracy: YES
    	            	  , maximumAge: parseIntRadixTen(DigiWebApp.SettingsController.getSetting('GPSmaximumAgeMinutes')) * 60000
    	            	  , timeout: parseIntRadixTen(DigiWebApp.SettingsController.getSetting('GPSTimeOut'))
    	            };
            		getLocationNow(mysuccessCallback, nextLocationOptions, getLocationNow);
            	} else {
		            if (DigiWebApp.SettingsController.getSetting("debug")) {
			            writeToLog("Positionsermittlung ohne GPSenableHighAccuracyFallback");
			        }
            		getLocationNow(mysuccessCallback);
            	}
			} else {
				mysuccessCallback();
			}
   	}

    // Prüft, ob alle Voraussetzungen für eine Zeitbuchung erfüllt sind
    , checkBooking: function(skipSelection) {
        if (DigiWebApp.SettingsController.getSetting("debug")) {
            console.log("in checkBooking");
        }

        // Prüfen, ob order (Ordner/Auftrag), position (Auftrag/Position)
        // und activity (Leistung/Tätigkeit) ausgewählt wurden.
        var orderId;
        if (typeof(DigiWebAppOrdinaryDesign.bookingPageWithIconsScholpp) !== "undefined") {
            orderId = M.ViewManager.getView('bookingPageWithIconsScholpp', 'order').getSelection();
        } else {
            orderId = M.ViewManager.getView('bookingPage', 'order').getSelection();
        }
        var istHandauftrag = this.isHandOrder(orderId);
        if (!istHandauftrag
            && (!orderId || (orderId && parseIntRadixTen(orderId) === 0))) {
            DigiWebApp.ApplicationController.nativeAlertDialogView({
                  title: M.I18N.l('noOrderSelected')
                , message: M.I18N.l('noOrderSelectedMsg')
            });
            return false;
        } else {
            // if it is not a hand order, position and activity must be selected
            if (!istHandauftrag) {
                // check if position is set
                if (!DigiWebApp.SelectionController.isPositionSelected()) {
                    DigiWebApp.ApplicationController.nativeAlertDialogView({
                          title: M.I18N.l('noPosSelected')
                        , message: M.I18N.l('noPosSelectedMsg')
                    });
                    return false;
                } else {
                    // check if activity is set
                    if(!DigiWebApp.SelectionController.isActivitySelected()) {
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
	
                // Prüfen, ob Ordner, Auftrag und Leistung gegenüber der laufenden Buchung
	            // nicht verändert wurden.
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
	            } // if(this.currentBooking)
	            
	            this.refreshCurrentBookingClosed();
	            this.refreshCurrentBooking(false);

                // Prüfen, ob Ordner, Auftrag und Leistung der gerade begonnenen Buchung
	            // denen der abgeschlossenen Buchung entsprechen.
    			var timeEnd = new Date();
    			var myTimeStampEnd = timeEnd.getTime();

	            if (this.currentBookingClosed && this.currentBooking) {
	    			var startStr = M.Date.create(this.currentBooking.get("timeStampStart")).format('HH:MM');
	    			var endStr = M.Date.create(myTimeStampEnd).format('HH:MM');
	            	if (startStr == endStr) {
		                var curBookingOrderId = this.currentBookingClosed.get('orderId');
		                var curBookingHandOrderId = this.currentBookingClosed.get('handOrderId');
		                var curBookingPosId = this.currentBookingClosed.get('positionId');
		                var curBookingActId = this.currentBookingClosed.get('activityId');
		
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
			
		            } else { // if(this.currentBookingClosed)
	
		            }
	            }
            }

	    return true;
		
        } // end of else of: if(!orderId || (orderId && parseIntRadixTen(orderId) === 0))
    }

    /**
     * Ermittelt, ob zur EditTimeData-Page gegangen werden muss.
     * Dafür muss mindestens einer der folgenden Punkte zutreffen:
	 * -Bemerkungen sind freigeschaltet und nicht optional
	 * -gefahreneKilometer-Freischaltung 422 ist aktiv und Buchung ist fahrzeitrelevant
     * -Bohle-Reisekostenabwicklung ist aktiv, Buchung ist fahrzeitrelevant und es wurde
     *  noch keine Eingabe gemacht.
     * Die Bohle-Uebernachtungskostenerfassung wird getrennt geprüft.
     */
    , istEditTimeDataNoetig: function() {
    	var fahrzeitrelevant = DigiWebApp.Activity.findById(
		    this.currentBooking.get('activityId')).get('istFahrzeitRelevant');
		var km = this.currentBooking.get('gefahreneKilometer');
    	// Freischaltung 431: Bohle-Reisekostenabwicklung
		var featureFahrtkosten = (DigiWebApp.SettingsController.featureAvailable('431')
            && DigiWebApp.SettingsController.getSetting('kannFahrtkostenBuchen')
		    && fahrzeitrelevant && !hasValue(km));

    	// Freischaltung 403: Bemerkungsfeld
        return ((DigiWebApp.SettingsController.featureAvailable('403')
                && !DigiWebApp.SettingsController.getSetting('remarkIsOptional'))
            // Freischaltung 422: Eingabe von gefahrenen Kilometern (aktuell nur KTG)
            || (DigiWebApp.SettingsController.featureAvailable('422') && fahrzeitrelevant)
            || featureFahrtkosten);
    }
    
    /**
     * Callback of location retrieval
     *
     * Checks if a selection is set.
     * Distinguishes whether an open booking is available or not
     * and distinguishes also, whether a hand order or a regular order is selected.
     *
     * Triggers a send operation if autoTransferAfterBookTime is activated in the settings, otherwise just saves the booking.
     *
     * @param {Object} location The location object with the coordinates (latitude, longitude) if a location could be retrieved
     */
    , proceedBooking: function(location) {
        // Bugfix 2515: Log
        var myDate = new Date();
        writeToLog('## proceedBooking ' + M.Date.create(myDate).format('HH:MM:ss.l'));

    	var that = DigiWebApp.BookingController;
    	
		var bookingWasClosed = true;
	    // close open booking 
	    if (that.currentBooking) {

	        bookingWasClosed = that.currentBooking.closeBooking(location);

	    	if (bookingWasClosed) {
	    		
				that.currentBooking.removeAsCurrent();
				
			} else {
				// Bugfix 2515: Use correctly checked booking information
	    	    if (that.checkedCurrentBooking) {
	    	        that.currentBooking.set("orderId", that.checkedCurrentBooking.orderId);
	    	        that.currentBooking.set("orderName", that.checkedCurrentBooking.orderName);
	    	        that.currentBooking.set("handOrderId", that.checkedCurrentBooking.handOrderId);
	    	        that.currentBooking.set("handOrderVaterId", that.checkedCurrentBooking.handOrderVaterId);
	    	        that.currentBooking.set("handOrderName", that.checkedCurrentBooking.handOrderName);
	    	        that.currentBooking.set("positionId", that.checkedCurrentBooking.positionId);
	    	        that.currentBooking.set("positionName", that.checkedCurrentBooking.positionName);
	    	        that.currentBooking.set("activityId", that.checkedCurrentBooking.activityId);
	    	        that.currentBooking.set("activityName", that.checkedCurrentBooking.activityName);
	    	    }				
			}
	    	
			that.currentBooking.save();

			if (bookingWasClosed) {
				that.currentBookingClosed = that.currentBooking;
			} else {
			    if (that.autoSend()) {
			    	that.sendCurrentBookings();
			    }
			}
			
	    } else {
	    	// no currentBooking: remember TimezoneOffset
	    	DigiWebApp.SettingsController.setSetting("currentTimezoneOffset", new Date().getTimezoneOffset());
	    	DigiWebApp.SettingsController.setSetting("currentTimezone", jstz.determine().name());
	    }

	    if (bookingWasClosed) {
	        // setup new booking
		    var lat = null;
		    var lon = null;
		    var genauigkeitVon = null;
		    var gps_zeitstempelVon = null;
		    if (location) {
				if (location.latitude) {
				    lat = location.latitude;
				}
				if (location.longitude) {
				    lon = location.longitude;
				}
				if (location.accuracy) {
					genauigkeitVon = location.accuracy;
				}
				if (location.date) {
					gps_zeitstempelVon = location.date.date.getTime();
				}
		    }
		    
		    // reset remark
	        try {
                //TODO: Dieser Aufruf gibt manchmal eine Exception auf der Konsole
	            M.ViewManager.getView('editTimeDataPage', 'remarkInput').value = '';
		    } catch(e2) { }
		    var remarkStr = '';
	        // Bugfix 2515: Use correctly checked booking information
		    var newOpenBooking = that.openBooking({
		          oId: that.checkedCurrentBooking.orderId
                , oName: that.checkedCurrentBooking.orderName
				, hoId: that.checkedCurrentBooking.handOrderId
				, hoVaterId: that.checkedCurrentBooking.handOrderVaterId
				, hoName: that.checkedCurrentBooking.handOrderName
				, lat: lat
				, lon: lon
				, pId: that.checkedCurrentBooking.positionId
                , pName: that.checkedCurrentBooking.positionName
				, aId: that.checkedCurrentBooking.activityId
                , aName: that.checkedCurrentBooking.activityName
				, remark: remarkStr
				, genauigkeitVon: genauigkeitVon
				, gps_zeitstempelVon: gps_zeitstempelVon
		    });
		    
		    var employeeIds = localStorage.getItem(DigiWebApp.EmployeeController.empSelectionKey)
                || localStorage.getItem(DigiWebApp.EmployeeController.empSelectionKeyTmp);
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
			
	        // Freischaltung 419: Scholpp-Spesen und Scholpp-Kartendienst-Message
			if (DigiWebApp.SettingsController.featureAvailable('419')) {
			    // Scholpp-Spesen: Übernachtungskennzeichen setzen
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
            that.set('kolonneStr', that.buildKolonneStr(that.currentBooking));

		    DigiWebApp.ApplicationController.startNotification();

			try { that.startBookingNotification(); } catch(e) {}
	    } // if (bookingWasClosed)
	    
	    // don't use selections anymore, use the current booking (till selection is changed again)
	    DigiWebApp.SelectionController.useSelections = NO;

	    var finishBooking = function() {
            // Nur die neueste offene Buchung ist korrekt, evtl. vorhandene ältere löschen.
	        that.loescheOffeneBuchungen(true);

	    	DigiWebApp.ApplicationController.DigiLoaderView.hide();
	    	if (DigiWebApp.SettingsController.getSetting("debug"))  console.log("BookingController finishBooking");
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
				//try { $.mobile.fixedToolbars.show(); } catch(e) { trackError(e); }; // this line is for pre TMP 1.1
		    }
	    };
	    
        // Freischaltung 417: Unterstützung für die DIGI-ServiceApp
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
					if (DigiWebApp.BookingController.currentBooking !== null) {
					    idsToPoll.push(DigiWebApp.BookingController.currentBooking.m_id);
					}
					if (DigiWebApp.BookingController.currentBookingClosed !== null) {
					    idsToPoll.push(DigiWebApp.BookingController.currentBookingClosed.m_id);
					}
					DigiWebApp.ServiceAppController.pollBookings(
                        idsToPoll, checkForOK, finishBooking, DigiWebApp.SettingsController.getSetting('GPSTimeOut'));
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
								DigiWebApp.ServiceAppController.refreshWAITBookings(function() {
									if (DigiWebApp.SettingsController.getSetting("debug"))  console.log("refreshWAIT done");
									finishBooking();
								}, function(err) {
									DigiWebApp.ApplicationController.DigiLoaderView.hide();
									trackError(err);
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
            , orderName: obj.oName ? obj.oName : null
            , handOrderId: obj.hoId ? obj.hoId : null
            , handOrderVaterId: obj.hoVaterId ? obj.hoVaterId : null
            , handOrderName: obj.hoName ? obj.hoName : null
            , latitude: obj.lat ? obj.lat : null
            , longitude: obj.lon ? obj.lon : null
            , latitude_bis: null
    		, longitude_bis: null
            , positionId: obj.pId ? obj.pId : null
            , positionName: obj.pName ? obj.pName : null
            , activityId: obj.aId ? obj.aId : null
            , activityName: obj.aName ? obj.aName : null
            , remark: obj.remark ? obj.remark : ''
            , istFeierabend: false
            , istKolonnenbuchung: false
            , mitarbeiterId: DigiWebApp.SettingsController.getSetting("mitarbeiterId")
            , genauigkeitVon: obj.genauigkeitVon ? obj.genauigkeitVon : null
            , gps_zeitstempelVon: obj.gps_zeitstempelVon ? obj.gps_zeitstempelVon : null
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
        });
    }

    /**
     * Returns a new open booking record with the data passed in a parameter object
     * @param obj The parameter object with the data for the booking
     */
    , sentBooking: function(obj) {

    	if (obj.get("startDateString") == obj.get("endeDateString") && obj.get("startTimeString") == obj.get("endeTimeString")) {
    		trackError("skip Zeitbuchung (sent) start==ende: " + obj.get("startDateString") + ", " + obj.get("startTimeString") + " - " + obj.get("endeDateString") + ", " + obj.get("endeTimeString"));
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
        	} catch(e7) { trackError(e7); }
    	}
    	if (typeof(obj.get('positionName')) !== "undefined") {
    		myPositionName = obj.get('positionName');
    	} else {
        	try {
	    		if (obj.get('positionId') !== 0) myPositionName = _.find(DigiWebApp.Position.find(), function(a) { return (parseIntRadixTen(a.get("id")) === parseIntRadixTen(obj.get('positionId')));}).get('name');
	    		//DigiWebApp.Position.find({query:{identifier: 'id', operator: '=', value: obj.get('positionId')}})[0].get('name');
    		} catch(e8) { trackError(e8); }
    	}
    	if (typeof(obj.get('activityName')) !== "undefined") {
    		myActivityName = obj.get('activityName');
    	} else {
        	try {
	    		if (obj.get('activityId') !== 0) myActivityName = _.find(DigiWebApp.Activity.find(), function(a) { return (parseIntRadixTen(a.get("id")) === parseIntRadixTen(obj.get('activityId')));}).get('name');
	    		//DigiWebApp.Activity.find({query:{identifier: 'id', operator: '=', value: obj.get('activityId')}})[0].get('name');
    		} catch(e9) { trackError(e9); }
    	}
    	
        return DigiWebApp.SentBooking.createRecord({
              orderId: obj.get('orderId')
            , orderName: myOrderName
            , handOrderId: obj.get('handOrderId')
            , handOrderVaterId: obj.get('handOrderVaterId')
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
    	
    	// funktionalität deaktiviert
    	return null;
    	
    	//if (obj.get("startDateString") == obj.get("endeDateString") && obj.get("startTimeString") == obj.get("endeTimeString")) {
    	//	trackError("skip Zeitbuchung (sentArchived) start==ende: " + obj.get("startDateString") + ", " + obj.get("startTimeString") + " - " + obj.get("endeDateString") + ", " + obj.get("endeTimeString"));
    	//	return null;
    	//};

    	//// speichere das Datum der Buchung für einfacheren Archivzugriff
    	//var myTagLabel = D8.create(obj.get('timeStampStart')).format("dd.mm.yyyy");
    	
    	//// speichere die Namen von Auftrag, Position und Tätigkeit,
    	//// falls beim nächsten Stammdatenabgleich eines davon vom Gerät entfernt werden 
    	//var myOrderId = M.I18N.l('notDefined');

    	//var myHandOrderId = M.I18N.l('notDefined');
    	//var myHandOrderName = M.I18N.l('notDefined');

    	//var myOrderName = M.I18N.l('notDefined');
    	//var myPositionName = M.I18N.l('notDefined');
    	//var myActivityName = M.I18N.l('notDefined');

		//if (typeof(obj.get('orderName')) !== "undefined") {
    	//	myOrderName = obj.get('orderName');
    	//} else {
        //	try {
    	//		var myO_id = obj.get('orderId');
    	//		var myHO_id = obj.get('handOrderId');
        //		if (myO_id !== 0 || myHO_id !== 0) {
        //    		var order = _.select(DigiWebApp.Order.findSorted().concat(DigiWebApp.HandOrder.findSorted()), function(o) {
        //    			if (o) {
        //    				var myGetO_id = o.get('id');
        //    				return myO_id == myGetO_id || myHO_id == myGetO_id;
        //    			}
        //    		});
        //            if (order && order.length > 0) {
        //                order = order[0];
        //                myOrderName = order.get('name');
        //            }
        //		}
        //		//if (obj.get('orderId') !== 0) myOrderName = DigiWebApp.Order.find({query:{identifier: 'id', operator: '=', value: obj.get('orderId')}})[0].get('name');    		
        //	} catch(e10) { trackError(e10); }
    	//}

		//if (typeof(obj.get('positionName')) !== "undefined") {
		//	myPositionName = obj.get('positionName');
    	//} else {
        //	try {
	    //		if (obj.get('positionId') !== 0) myPositionName = _.find(DigiWebApp.Position.find(), function(a) { return (parseIntRadixTen(a.get("id")) === parseIntRadixTen(obj.get('positionId')));}).get('name');
	    //		//DigiWebApp.Position.find({query:{identifier: 'id', operator: '=', value: obj.get('positionId')}})[0].get('name');
    	//	} catch(e11) { trackError(e11); }
    	//}

		//if (typeof(obj.get('activityName')) !== "undefined") {
		//	myActivityName = obj.get('activityName');
    	//} else {
        //	try {
	    //		if (obj.get('activityId') !== 0) myActivityName = _.find(DigiWebApp.Activity.find(), function(a) { return (parseIntRadixTen(a.get("id")) === parseIntRadixTen(obj.get('activityId')));}).get('name');
	    //		//DigiWebApp.Activity.find({query:{identifier: 'id', operator: '=', value: obj.get('activityId')}})[0].get('name');
    	//	} catch(e12) { trackError(e12); }
    	//}
    	
    	//return DigiWebApp.SentBookingArchived.createRecord({
        //      orderId: obj.get('orderId')
        //    , orderName: myOrderName
        //    , handOrderId: obj.get('handOrderId')
        //    , handOrderVaterId: obj.get('handOrderVaterId')
        //    , handOrderName: obj.get('handOrderName')
        //    , latitude: obj.get('latitude')
        //    , longitude: obj.get('longitude')
        //    , latitude_bis: obj.get('latitude_bis')
        //    , longitude_bis: obj.get('longitude_bis')
        //    , positionId: obj.get('positionId')
        //    , positionName: myPositionName
        //    , activityId: obj.get('activityId')
        //    , activityName: myActivityName
        //    , remark: obj.get('remark')
        //    , istFeierabend: obj.get('istFeierabend')
        //    , istKolonnenbuchung: obj.get('istKolonnenbuchung')
        //    , genauigkeitVon: obj.get('genauigkeitVon')
        //    , gps_zeitstempelVon: obj.get('gps_zeitstempelVon')
        //    , ermittlungsverfahrenVon: obj.get('ermittlungsverfahrenVon')
        //    , genauigkeitBis: obj.get('genauigkeitBis')
        //    , gps_zeitstempelBis: obj.get('gps_zeitstempelBis')
        //    , ermittlungsverfahrenBis: obj.get('ermittlungsverfahrenBis')
        //    , ServiceApp_Status: obj.get('ServiceApp_Status')
        //    , timezoneOffset: obj.get('timezoneOffset')
        //    , timeStampStart: obj.get('timeStampStart')
        //    , timeStampEnd: obj.get('timeStampEnd')
        //    , startDateString: obj.get('startDateString')
        //    , endeDateString: obj.get('endeDateString')
        //    , startTimeString: obj.get('startTimeString')
        //    , endeTimeString: obj.get('endeTimeString')
        //    , employees: obj.get('employees')
        //    , tagLabel: myTagLabel
        //    , isCurrent: false
        //    , gefahreneKilometer: obj.get('gefahreneKilometer')
        //});
    }

    /*
    * Prepares an array of not booked bookings for the list view (showing the unsent bookings)
    * 
    * Sets the timeData property of this controller, on which the list has a content binding.
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
	            	    var d8start = D8.create(
                            new Date(Number(booking.get('timeStampStart'))
                            + (1000 * 60 * (new Date(Number(
                                booking.get('timeStampStart'))).getTimezoneOffset()
                                - booking.get('timezoneOffset')))));
	                    startDate = d8start.format('dd.mm.yyyy');
	                    startTime = d8start.format('HH:MM');
	            	}
	            	
	            	var endeDate = booking.get('endeDateString');
	            	var endeTime = booking.get('endeTimeString');
	            	if (((typeof(endeDate) === "undefined" || !endeDate || endeDate === "")
	            	|| (typeof(endeTime) === "undefined" || !endeTime || endeTime === "")
	            	) && (booking.get('timeStampEnd') !== "0")) {
	            		// Buchung aus alter WebAppVersion
	            	    var d8ende = D8.create(
                            new Date(Number(booking.get('timeStampEnd'))
                            + (1000 * 60 * (new Date(Number(
                                booking.get('timeStampEnd'))).getTimezoneOffset()
                                - booking.get('timezoneOffset')))));
	                    endeDate = d8ende.format('dd.mm.yyyy');
	                    endeTime = d8ende.format('HH:MM');
	            	}
	            	
	            	if (typeof(booking.get('timezoneOffset')) === "undefined") {
	            	    booking.set('date',
                            booking.get('timeStampStart') + ','
                            + booking.get('timeStampEnd')
                            + ',-120,'
                            + startDate + ','
                            + startTime + ','
                            + endeDate + ','
                            + endeTime);
	            	} else {
	            	    booking.set('date',
                            booking.get('timeStampStart') + ','
                            + booking.get('timeStampEnd') + ','
                            + booking.get('timezoneOffset') + ','
                            + startDate + ','
                            + startTime + ','
                            + endeDate + ','
                            + endeTime);
	            	}
	
	                // set the handOrderId as orderId for correct display in list item view
	            	if (parseIntRadixTen(booking.get('orderId')) === 0
                            && parseIntRadixTen(booking.get('handOrderId')) !== 0) {
	                    booking.set('orderId', booking.get('handOrderId'));
	                }
	            });
	            
	            // newest booking at the top => first sort, then reverse order
	            bookings = _.sortBy(bookings, function(booking) {
	                return parseIntRadixTen(booking.get('timeStampStart'));
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
	                if (parseIntRadixTen(booking.get('orderId')) === 0 && parseIntRadixTen(booking.get('handOrderId')) !== 0) {
	                    booking.set('orderId', booking.get('handOrderId'));
	                }
	
	            });
	            // newest booking at the top => first sort than reverse order
	            bookings = _.sortBy(bookings, function(booking) {
	                return parseIntRadixTen(booking.get('timeStampStart'));
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
    		// alte archivierte Daten löschen
	        var days = DigiWebApp.SentTimeDataDays.find();
	        if (typeof(days) != "undefined" && days.length > 0) {
	        	DigiWebApp.SentTimeDataDays.deleteAll();
	        	var ba = DigiWebApp.SentBookingArchived.find();
	        	if (typeof(ba) != "undefined" && ba.length > 0) {
	        		DigiWebApp.SentBookingArchived.deleteAll();
	        	}
	        }
    	    // Freischaltung 411: Zeitbuchungen X Tage auf Gerät vorhalten
	        if (DigiWebApp.SettingsController.featureAvailable('411')) {
				var daysToHoldBookingsOnDevice = 0;
				try {
					daysToHoldBookingsOnDevice = 0 + new Number(DigiWebApp.SettingsController.getSetting('daysToHoldBookingsOnDevice'));
				} catch(e2) {
					daysToHoldBookingsOnDevice = DigiWebApp.SettingsController.defaultsettings.get('daysToHoldBookingsOnDevice');
				}
				days = [];
				var today = D8.create();
				for (var i=0; i<daysToHoldBookingsOnDevice; i++) {
					var day = today.addDays(0 - i);
					var dayString = M.I18N.l(day.format("dddd")).substring(0,2) + ", " + day.format("dd.mm.yyyy");
					var dayRecord = DigiWebApp.SentTimeDataDays.createRecord({
						tagLabel: dayString
					});
					days.push(dayRecord);
	    		}
	        	this.set('timeDataSentDays', days);
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
		                if (parseIntRadixTen(booking.get('orderId')) === 0 && parseIntRadixTen(booking.get('handOrderId')) !== 0) {
		                    booking.set('orderId', booking.get('handOrderId'));
		                }
		
		            });
		            // newest booking at the top => first sort than reverse order
		            bookings = _.sortBy(bookings, function(booking) {
		                return parseIntRadixTen(booking.get('timeStampStart'));
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

    , setTimeDataForEdit: function() {
        try {
            if ( DigiWebApp.EditTimeDataPage.bookingToEdit === null ) { return; }
            var bookings = [DigiWebApp.EditTimeDataPage.bookingToEdit];
            if (bookings.length > 0) {
	        	//var tagDerWinterzeit = D8.create("11/01/" + new Date().getFullYear() + " 02:00:00").addDays(-D8.create("11/01/" + new Date().getFullYear() + " 02:00:00").date.getDay());
	        	//var tagDerSommerzeit = D8.create("04/01/" + new Date().getFullYear() + " 02:00:00").addDays(-D8.create("04/01/" + new Date().getFullYear() + " 02:00:00").date.getDay());
        		//var d8Now = new D8();
        		//var inSommerzeit = (tagDerSommerzeit.timeBetween(d8Now) >= 0 && tagDerWinterzeit.timeBetween(d8Now) <= 0);
        		//var inWinterzeit = ((tagDerWinterzeit.timeBetween(d8Now) >= 0 && tagDerSommerzeit.timeBetween(d8Now) >= 0) || (tagDerWinterzeit.timeBetween(d8Now) <= 0 && tagDerSommerzeit.timeBetween(d8Now) <= 0));
        		//var inWinterzeit = !inSommerzeit;
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
	                if (parseIntRadixTen(booking.get('orderId')) === 0 && parseIntRadixTen(booking.get('handOrderId')) !== 0) {
	                    booking.set('orderId', booking.get('handOrderId'));
	                }
	
	            });
	            // newest booking at the top => first sort than reverse order
	            bookings = _.sortBy(bookings, function(booking) {
	                return parseIntRadixTen(booking.get('timeStampStart'));
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
    	try { DigiWebApp.ApplicationController.vibrate(); } catch(e19) {}
        if (that.currentBooking) {

    		var timeEnd = new Date();
  			var myTimeStampEnd = timeEnd.getTime();

    		if (  (M.Date.create(that.currentBooking.get("timeStampStart")).format('HH:MM') == M.Date.create(myTimeStampEnd).format('HH:MM')) 
    		   && ((that.currentBooking.get("timeStampEnd") == null) 
                    || (that.currentBooking.get("timeStampEnd") == "") 
                    || (parseIntRadixTen(that.currentBooking.get("timeStampEnd")) == 0))
    		) {
    			$('#' + DigiWebApp.BookingPage.content.grid.id).addClass('red');
    			var t1 = window.setTimeout(function() {
    			    window.clearTimeout(t1);
    			    $('#' + DigiWebApp.BookingPage.content.grid.id).removeClass('red');
			    }, 500);
    			if (DigiWebApp.DashboardPage.content.list.selectedItem) {
                    $('#' + DigiWebApp.DashboardPage.content.list.selectedItem.id).removeClass('selected');
                }
                writeToLog("BookingController.closeDay(): Feierabendbuchung zu kurz");
    			DigiWebApp.ApplicationController.nativeAlertDialogView({
		              title: M.I18N.l('bookingTooShort')
		            , message: M.I18N.l('bookingTooShortMsg')
		        });
		        return;
	        } else {
                if (that.feierabendbuchungInBearbeitung === true) {
                    writeToLog("BookingController.closeDay() Feierabendbuchung schon in Bearbeitung!");
                    return;
                }

    			$('#' + DigiWebApp.BookingPage.content.grid.id).addClass('green');
    			var t2 = window.setTimeout(function() {
    			    window.clearTimeout(t2);
    			    $('#' + DigiWebApp.BookingPage.content.grid.id).removeClass('green');
			    }, 500);

    			var buchenCallback = function () {
    			    // Bei Feierabendbuchung aus den normalen Gründen (siehe istEditTimeDataNoetig())
    			    // auf die EditTimeDataPage gehen, und zusätzlich wenn Bohle-Reisekostenabwicklung 
    			    // aktiv ist und Übernachtungskosten abgefragt werden sollen.
    			    var featureUebernachtungskosten = (DigiWebApp.SettingsController.featureAvailable('431')
                        && DigiWebApp.SettingsController.getSetting('kannUebernachtungskostenBuchen'));

					if (that.istEditTimeDataNoetig() || featureUebernachtungskosten) {
						// if remark or related feature active: go to remark page
						that.refreshCurrentBooking(false);
						DigiWebApp.NavigationController.toRemarkPage(function () {
                            // Freischaltung 404: Button-Menü
			    			if (DigiWebApp.SettingsController.featureAvailable('404')) {
				        		DigiWebApp.NavigationController.backToButtonDashboardPagePOP();
			    			} else {
				        		DigiWebApp.NavigationController.backToDashboardPagePOP();
			    			}
			    			that.closeDayWithRemark();
						}, /* istFeierabendBuchung */ true);
			        } else {
			        	that.closeDayWithRemark();
			        }
	        	};

    		    // Freischaltung 418: Spesen/Auslöse
	        	if (DigiWebApp.SettingsController.featureAvailable('418')) {
		            DigiWebApp.NavigationController.toSpesenPage(function() {
		                // Freischaltung 404: Button-Menü
		                if (DigiWebApp.SettingsController.featureAvailable('404')) {
		                    DigiWebApp.NavigationController.backToButtonDashboardPagePOP();
		                } else {
		                    DigiWebApp.NavigationController.backToDashboardPagePOP();
		                }
		                buchenCallback();
		            });
	        	} else {
	        	    buchenCallback();
	        	}
	        }	        
        } else {
            writeToLog("BookingController: Keine Buchung offen für Feierabendbuchung");

    		DigiWebApp.ApplicationController.DigiLoaderView.hide();
            DigiWebApp.ApplicationController.nativeAlertDialogView({
                  title: M.I18N.l('hint')
                , message: M.I18N.l('noOpenBookings')
            });
        }
    }
    
    , closeDayWithRemark: function() {
    	var that = this;
    	that.currentBookingTimesStampBook = new Date();
        that.feierabendbuchungInBearbeitung = true;

    	that.getBookingLocation(that.closeDayWithRemarkWithPosition);
    }
            
    , closeDayWithRemarkWithPosition: function(location) {
    	var that = DigiWebApp.BookingController;
		var bookingWasClosed = true;
        // close current booking
        if (that.currentBooking) {
        	that.currentBooking.set("istFeierabend", true);

            bookingWasClosed = that.currentBooking.closeBooking(location);

	    	if (bookingWasClosed) {
		        that.currentBooking.removeAsCurrent();
		    } else {
                writeToLog("BookingController.closeDayWithRemarkWithPosition(): Feierabendbuchung zu kurz");
				
		        DigiWebApp.ApplicationController.nativeAlertDialogView({
		              title: M.I18N.l('bookingTooShort')
		            , message: M.I18N.l('bookingTooShortMsg')
		        });
			}
	    	
			that.currentBooking.save();

            // Evtl. noch vorhandene Buchungen mit "isCurrent = true" löschen 
            // - nach Feierabend darf es diese nicht geben.
            that.loescheOffeneBuchungen(false);
			
        	try { that.clearBookingNotification(); } catch(e) {}

			if (bookingWasClosed) {
				that.currentBookingClosed = that.currentBooking;
	        	that.currentBooking = null;
			}
        	DigiWebApp.SettingsController.setSetting("currentTimezoneOffset", null);
	    	DigiWebApp.SettingsController.setSetting("currentTimezone", null);
        } else {
            return;
        }

		if (bookingWasClosed) {
            that.set('currentBookingStr', '');
            that.set('kolonneStr', '');
	
	        // reset selections to show "Bitte wählen: "
	        DigiWebApp.SelectionController.resetSelection();
	        DigiWebApp.SelectionController.initSelection();
	        DigiWebApp.SelectionController.useSelections = NO;
		}
		
        var finishBooking = function() {
        	DigiWebApp.ApplicationController.DigiLoaderView.hide();

            that.feierabendbuchungInBearbeitung = false;

            var notificationMessage = M.I18N.l('abwesend');
    		localStorage.setItem(DigiWebApp.ApplicationController.storagePrefix + '_' + 'notificationMessage', notificationMessage);
			localStorage.setItem(DigiWebApp.ApplicationController.storagePrefix + '_' + 'currentBookingNotificationTimestamp', null);
    		DigiWebApp.ApplicationController.startNotification();
        	var autoSyncAfterCD = DigiWebApp.SettingsController.getSetting('autoTransferAfterClosingDay');
        	var closeAppAfterCD = DigiWebApp.SettingsController.getSetting('closeAppAfterCloseDay');
        	if (closeAppAfterCD) {
    	    	if (autoSyncAfterCD) {
    	        	DigiWebApp.ApplicationController.closeAppAfterCloseDay = YES;
//    	    	} else {
//    				DigiWebApp.ApplicationController.exitApp();
    	    	}
        	}
        	
        	if (DigiWebApp.SettingsController.getSetting('autoTransferAfterClosingDay')) {
    			DigiWebApp.DashboardController.dataTransfer(YES); // yes means: is closing day
	        } else {
	            // clear employee selection, but only if not auto data transfer and save it, to have it while sending the data.
        	    localStorage.setItem(DigiWebApp.EmployeeController.empSelectionKeyTmp,
                    localStorage.getItem(DigiWebApp.EmployeeController.empSelectionKey));
	            localStorage.removeItem(DigiWebApp.EmployeeController.empSelectionKey);
	            // set employee state back
	            if (DigiWebApp.EmployeeController.getEmployeeState() == 2) {
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
        
        // Freischaltung 417: Unterstützung für die DIGI-ServiceApp
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
								if (DigiWebApp.SettingsController.getSetting("debug"))  console.log("speichere gepollten Datensatz " + datensatzObj.m_id);
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
							},function(err){trackError(err);finishBooking();});
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

    , loescheOffeneBuchungen: function(nichtNeueste) {
    	var bookingsSorted = _.sortBy(DigiWebApp.Booking.find(), function (booking) {
	        	return booking.get("timeStampStart");
	    });
        var openBookings = null;

        if (bookingsSorted.length > 0) {
            openBookings = _.select(bookingsSorted, function(b) {
                if (b != null) {
                    return b.get('isCurrent') === true;
                } else {
                    return false;
                }
            });
        }

        if (openBookings && openBookings.length > 0) {
            var doScr = DigiWebApp.SettingsController.getSetting("doScr");
			var scrId = DigiWebApp.SettingsController.getSetting("scrId");
            var ende = openBookings.length;
            if (nichtNeueste === true) {
                ende -= 1;
            }
            for (var i = 0; i < ende; i++) {
                writeToLog("BookingController.loescheOffeneBuchungen(" + nichtNeueste + ") Loesche Buchung: ");
				var logStr = JSON.stringify(openBookings[i]);
				if (doScr) {
				    logStr = escape(scrStr(logStr, scrId));
				}
                writeToLog(logStr);

                openBookings[i].del();
            }
        }
    }
    
    , loadSignatures: function(bookings, successCallback) {
		if (typeof successCallback !== "function") {
			trackError("loadSignaturesError: successCallback is not a function");
	        return;
	    }
		
		//Bugfix: Dieser Loader bleibt manchmal stehen und man braucht diesen eigentlich nicht
		//DigiWebApp.ApplicationController.DigiLoaderView.show(M.I18N.l('loadSignatures'));

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
    
    /** Sende vorhandene Unterschriften
     */
    , sendSignatures: function(bookings, isClosingDay, doSync) {
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
        			  _.each(bookings, function(el) {
        				  if (el.get('isCurrent')) {
        					  CurrentAvailable = true;
        				  }
    				  });
        			  if (DigiWebApp.SettingsController.getSetting("debug"))  console.log("CurrentAvailable: ", CurrentAvailable);
        			  // no current booking: after closing-time
        			  if (!CurrentAvailable) {
        				  DigiWebApp.SentBooking.deleteAll();
        			  }

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
		  				
        		        // Freischaltung 417: Unterstützung für die DIGI-ServiceApp
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
		                  //DigiWebApp.SelectionController.resetSelection();
		                  if (CurrentAvailable) {
		                      DigiWebApp.SelectionController.setSelectionByCurrentBooking();
		                  } else {
		                      DigiWebApp.SelectionController.initSelection();
		                  }

		                  // falls Feierabend gebucht wurde: aufräumen
		                  if (isClosingDay) {
                              that.set('currentBookingStr', '');
		                      that.set('kolonneStr', '');
		
		                      if (DigiWebApp.EmployeeController.getEmployeeState() == 2) {
		                          DigiWebApp.EmployeeController.setEmployeeState(1);
		                      }
		                      // clear employee selection
		                      localStorage.removeItem(DigiWebApp.EmployeeController.empSelectionKey);
		                      localStorage.removeItem(DigiWebApp.EmployeeController.empSelectionKeyTmp);
		                  }
                          DigiWebApp.ApplicationController.DigiLoaderView.hide();


                          var startSyncFunc = function() {
	                          // now call startsync again
	                          if (DigiWebApp.SettingsController.getSetting('autoSyncAfterBookTime') || doSync === true) {
	                        	  	if (DigiWebApp.ApplicationController.closeAppAfterCloseDay) {
										if (typeof(navigator) != "undefined" && typeof(navigator.app) != "undefined" && typeof(navigator.app.exitApp) != "undefined") {
	        								DigiWebApp.ApplicationController.exitApp(true);
										} else {
											autoCleanLogs(function(){
												DigiWebApp.ApplicationController.startsync(YES);
											});
										}
	                        	  	} else {
										autoCleanLogs(function(){
											DigiWebApp.ApplicationController.startsync(YES);
										});
	                        	  	}
	                          }
                          }
                          
        		          // Freischaltung 402: Materialerfassung only
        		          // Freischaltung 426: Notizen only
                          if (
                   	           (DigiWebApp.SettingsController.featureAvailable("402") && !DigiWebApp.BookingController.currentBooking) 
                   		    || (DigiWebApp.SettingsController.featureAvailable("426") && !DigiWebApp.BookingController.currentBooking) 
                   	        ){
	              	        	DigiWebApp.BautagebuchDatenuebertragungController.ausgekoppelteSenden(function(){
	              	        		startSyncFunc();
	                			});

                           } else {
                        	   startSyncFunc();
                           }
        		  }
        		  , function() {
                      DigiWebApp.ApplicationController.DigiLoaderView.hide();
                        // Bugfix: Fehlermeldung nicht zeigen, wenn danach kein Stammdatenabgleich gemacht werden soll
                      	if (doSync) {
		              		// die Buchung(en) konnte(n) nicht gesendet werden
		                    DigiWebApp.ApplicationController.nativeAlertDialogView({
		                        title: M.I18N.l('sendDataFail'),
		                        message: M.I18N.l('sendDataFailMsg')
		                    });
                      	}
	              }
        		  , isClosingDay
        		  , doSync
        	);

        } else {
        	// Keine Buchungen zum Verarbeiten vorhanden --> Es gibt nichts weiter zu tun
        	DigiWebApp.ApplicationController.DigiLoaderView.hide();
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
        
        var notificationMessage = M.I18N.l('bookingNotificationSince') + " " + bookingStr;
		localStorage.setItem(DigiWebApp.ApplicationController.storagePrefix + '_' + 'notificationMessage', notificationMessage);
		//DigiWebApp.ApplicationController.startNotification();
        
        return bookingStr;
    }

    , buildKolonneStr: function (booking) {
          // Kolonnen-Mitarbeiter nur anzeigen, wenn Freischaltung 433 aktiv ist
          if (!DigiWebApp.SettingsController.featureAvailable('433')) {
              return '';
          }

          var namen = '';
          var employees = DigiWebApp.Employee.findSorted();
          if (employees.length > 0) {
              _.each(employees,
                  function(emp) {
                      if (emp.get('isSelected') === true) {
                          if (namen !== '') {
                              namen += " / ";
                          }
                          namen += emp.get('name');
                      }
                  });
          }
          return namen;
      }

    , spesenOptionen: null
    
    , uebernachtungOptionen: null
    
    , startBrowserBookingNotificationTimeout: null
    , startBrowserBookingNotificationObject: null
    , startBrowserBookingNotification: function(myDate) {
    	var that = this;
    		
		if (!onAndroid23) {
	    	if (that.startBrowserBookingNotificationTimeout != null) {
	    		window.clearTimeout(that.startBrowserBookingNotificationTimeout);
	    		that.startBrowserBookingNotificationTimeout = null;
	    	}
	
	    	try { that.startBrowserBookingNotificationObject.close(); } catch(e) {}
			
			var nowTimestamp = new Date().getTime();
			var showInMilliseconds = myDate.getTime() - nowTimestamp;
			
			var showNotificationFunc = function() {
	    		var hourSetting = parseIntRadixTen(DigiWebApp.SettingsController.getSetting('BookingReminderHours'));
				var myReminderMessage = M.I18N.l('BookingReminderMessage') + hourSetting;
				if (hourSetting == 1) {
					myReminderMessage += M.I18N.l('BookingReminderMessageTailSingle');
				} else {
					myReminderMessage += M.I18N.l('BookingReminderMessageTail');
				}
		    	try { // WebNotification-Spec is not stable
			    	Notification.requestPermission( function(status) {
			    		if (Notification.permission !== status) {
			    			Notification.permission = status;
			    		}
			    		if (status === "granted") {
							that.startBrowserBookingNotificationObject = new Notification(M.I18N.l('BookingReminderTitle'), {
									  body: myReminderMessage
									, icon: "res://icon"
									, tag: '2'
								}
							);
							//n.onshow = function () { 
							//	setTimeout(n.close.bind(n), 5000); 
							//}
							var myFuncClose = function() {
								// show another notification in one hour
								//try{pluginObj.notification.local.cancelAll();}catch(e){}
								try{pluginObj.notification.local.cancel('4711');}catch(e){}
								try{pluginObj.notification.local.cancel('4712');}catch(e){}
								var myNewDate = D8.create(myDate.getTime()).addHours(1).date;
								that.startBrowserBookingNotification(myNewDate);
							}
							var myFuncClick = function() {
								DigiWebApp.NavigationController.toBookTimePage();
								myFuncClose();
							}
							that.startBrowserBookingNotificationObject.onclose = myFuncClose;
							that.startBrowserBookingNotificationObject.onclick = myFuncClick;
			    		} else {
			    			alert(myReminderMessage);
			    		}
			    	});
		    	} catch(e){
		    		alert(myReminderMessage);
		    	}
			}
			
			if (showInMilliseconds > 0) {
				that.startBrowserBookingNotificationTimeout = window.setTimeout(showNotificationFunc, showInMilliseconds);
			} else {
				showNotificationFunc();
			}
		}
    }

	, startBookingNotification: function(myDate) {	
		if (!onAndroid23) {
			try { // keinesfalls den regulären Betrieb stören
				
				var hourSetting = parseIntRadixTen(DigiWebApp.SettingsController.getSetting('BookingReminderHours'));
		    	if (hourSetting == 0) {
		    		return false;
		    	}
		    	
				var that = this;
				
				that.clearBookingNotification();
				
				// notification.local is supposed to reside in "window.plugin"
				var pluginObj = window.plugin;
				if (typeof(pluginObj) == "undefined") {
					pluginObj = window.plugins;
				}
		
				var alleBookings = DigiWebApp.Booking.find().concat(DigiWebApp.SentBooking.find());
				var feierabendBookings = [];
				if (alleBookings.length > 0) feierabendBookings = _.filter(alleBookings, function(booking) { return booking.get('istFeierabend'); });
				var lastFeierabend = null;
				var startBooking;
				if (feierabendBookings.length > 0) {
					lastFeierabend = _.sortBy(feierabendBookings, function(booking) { return booking.get('timeStampStart'); })[feierabendBookings.length - 1];
					var bookingsAfterLastFeierabend = [];
					if (lastFeierabend != null) bookingsAfterLastFeierabend = _.filter(alleBookings, function(booking) { return booking.get('timeStampStart') > lastFeierabend.get('timeStampStart'); });
					if (bookingsAfterLastFeierabend.length > 0) startBooking = _.sortBy(bookingsAfterLastFeierabend, function(booking) { return booking.get('timeStampStart'); })[0]; 
				} else {
					startBooking = _.sortBy(alleBookings, function(booking) { return booking.get('timeStampStart'); })[0]; 
				}
		
				if (typeof(myDate) == "undefined") {
					if (typeof(startBooking) != "undefined") {
						myDate = D8.create(startBooking.get('timeStampStart'));
					} else {
						return false;
					}
					myDate = myDate.addHours(parseIntRadixTen(DigiWebApp.SettingsController.getSetting('BookingReminderHours')));
					//myDate = myDate.addMinutes(parseIntRadixTen(DigiWebApp.SettingsController.getSetting('BookingReminderHours'))); // debug
					myDate = myDate.date;
				}
				
				if (typeof(pluginObj) == 'undefined' || typeof(pluginObj.notification) == "undefined" || typeof(pluginObj.notification.local) == "undefined") {
					return that.startBrowserBookingNotification(myDate);
				}
		
				try {
					pluginObj.notification.local.hasPermission(function (granted) {
					    // console.log('Permission has been granted: ' + granted);
					});
					pluginObj.notification.local.promptForPermission();
				} catch(e) {}
				
				var myReminderMessage = M.I18N.l('BookingReminderMessage') + hourSetting;
				if (hourSetting == 1) {
					myReminderMessage += M.I18N.l('BookingReminderMessageTailSingle');
				} else {
					myReminderMessage += M.I18N.l('BookingReminderMessageTail');
				}
				try {
					localStorage.setItem(DigiWebApp.ApplicationController.storagePrefix + '_' + 'currentBookingNotificationTimestamp', myDate.getTime());
					var notificationOptions = {
					      id:         '4712'
					    , title:      M.I18N.l('BookingReminderTitle')  // The title of the message
					    , message:    myReminderMessage  // The message that is displayed
					    , repeat:     'hourly' // Either 'secondly', 'minutely', 'hourly', 'daily', 'weekly', 'monthly' or 'yearly'
					    , autoCancel: true  // Setting this flag and the notification is automatically canceled when the user clicks it
					    , ongoing:    false // Prevent clearing of notification (Android only)
					}
					var nowTimestamp = new Date().getTime();
					if (myDate.getTime() > nowTimestamp) {
						notificationOptions.date = myDate
					}
					pluginObj.notification.local.add(notificationOptions);
				}catch(e){trackError(e);}
			}catch(e){trackError(e);}
		}
	}
	
	, clearBookingNotification: function() {
		var that = this;

		if (!onAndroid23) {
			// notification.local is supposed to reside in "window.plugin"
			var pluginObj = window.plugin;
			if (typeof(pluginObj) == "undefined") {
				pluginObj = window.plugins;
			}
	    	if (that.startBrowserBookingNotificationTimeout != null) {
	    		window.clearTimeout(that.startBrowserBookingNotificationTimeout);
	    		that.startBrowserBookingNotificationTimeout = null;
	    	}
			try{that.startBrowserBookingNotificationObject.close();}catch(e){}
			try{pluginObj.notification.local.cancel('4712');}catch(e){}
		}
	}
});
