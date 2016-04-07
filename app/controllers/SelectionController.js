// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: DigiWebApp
// Controller: SelectionController
// ==========================================================================
// manuell var-checked
DigiWebApp.SelectionController = M.Controller.extend({

    // arrays for selection lists
      orders: null
    , positions: null
    , activities: null
    
    , selections: {
          order: null
        , position: null
        , activity: null
        , uebernachtungskennzeichenScholpp: null
        , spesenkennzeichenScholpp: null
    }

    // use selection that has been made by hand
    , useSelections: NO

    // show hand order at first position, only set to YES by HandOrderController
    , showHandOrderFirst: NO

    , uebernachtungskennzeichenScholpp: null
    
    , spesenkennzeichenScholpp: null
    
    , setSelectionByPreviousSelection: function() {
        var that = this;
		
        if (inDebug()) writeToLog('setSelectionByPreviousSelection entry');

        var mySelection = JSON.parse(JSON.stringify(that.selections));
        
		this.setOrders(mySelection.order, mySelection.position, mySelection.activity, NO);
        
        // Freischaltung 419 "Scholpp-Spesen und Scholpp-Kartendienst-Message"
		if (DigiWebApp.SettingsController.featureAvailable('419')) {
		    // TODO: Fehler in der folgenden Codezeile wenn die FS 419 aktiv ist:
            // Exception TypeError: Object #<Object> has no method 'get'
            var uebernachtungAuswahl = mySelection.get('uebernachtungAuswahl');
            uebernachtungAuswahl = that.setScholppButtons(uebernachtungAuswahl, YES);
            that.setUebernachtungskennzeichenScholpp(uebernachtungAuswahl);
		}
    }

    , setSelectionWithCurrentHandOrderFirst: function() {
        var that = this;

        if (inDebug()) writeToLog('setSelectionWithCurrentHandOrderFirst entry');

        this.setOrders(0, 0, 0, YES);

        // Freischaltung 419 "Scholpp-Spesen und Scholpp-Kartendienst-Message"
        if (DigiWebApp.SettingsController.featureAvailable('419')) {
            var uebernachtungAuswahl = that.setScholppButtons(null, NO);
            that.setUebernachtungskennzeichenScholpp(uebernachtungAuswahl);
		}
    	
    	if (typeof(DigiWebAppOrdinaryDesign.bookingPageWithIconsScholpp) !== "undefined") {
        	DigiWebApp.ScholppBookingController.resetButtons();    		
    	}
    }
    
    , setSelectionByCurrentBooking: function() {
        var that = this;

        if (inDebug()) writeToLog('setSelectionByCurrentBooking entry');

        var booking = DigiWebApp.BookingController.currentBooking;
        
        // get the ids from the current booking
        var orderId = (booking.get('orderId') == "0" ? 0 : booking.get('orderId')) || booking.get('handOrderId'); // we need to check handOrders also
        var positionId = booking.get('positionId');
        var activityId = booking.get('activityId');
        
        that.setOrders(orderId, positionId, activityId, YES);

        // Freischaltung 419 "Scholpp-Spesen und Scholpp-Kartendienst-Message"
        if (DigiWebApp.SettingsController.featureAvailable('419')) {
            var uebernachtungAuswahl = booking.get('uebernachtungAuswahl');
            uebernachtungAuswahl = that.setScholppButtons(uebernachtungAuswahl, YES, YES);
            that.setUebernachtungskennzeichenScholpp(uebernachtungAuswahl);
		}
    }
    
    , setUebernachtungskennzeichenScholpp: function(uebernachtungAuswahl) {
        var that = this;
        // Siehe DB-Tabelle SonderbuchungseigenschaftVorgabe: 6 = "- -"
    	if (typeof(uebernachtungAuswahl) == "undefined") uebernachtungAuswahl = 6;
        /**
         * Scholpp-Spesen: Übernachtungskennzeichen 
         */
        var itemSelected = NO;
        var uebernachtungskennzeichenScholppArray = _.map(that.uebernachtungskennzeichenScholpp, function(ueK) {
        	if (typeof(ueK) === "undefined") {
        		console.log("UNDEFINED uebernachtungskennzeichenScholpp");
        	} else {        	
        		var obj = { label: ueK.label, value: ueK.value };
        		if (parseIntRadixTen(obj.value) == uebernachtungAuswahl) {
        			obj.isSelected = YES;
        			itemSelected = YES;
        		}
                return obj;
        	}
        });
        uebernachtungskennzeichenScholppArray = _.compact(uebernachtungskennzeichenScholppArray);
        that.set('uebernachtungskennzeichenScholpp', uebernachtungskennzeichenScholppArray);
        //TODO: Würde man den Aufruf dieser Methode vor setOrders() machen, dann wäre das folgende
        // saveSelection() überflüssig, denn es wird auch in setActivities() aufgerufen:
        that.saveSelection();
    }
    
    , setScholppButtons: function (uebernachtungAuswahl, withSetArbeitsende, withSetToSix) {
    	var that = this;

    	if (typeof(withSetArbeitsende) == "undefined") withSetArbeitsende = true;
    	if (typeof(withSetToSix) == "undefined") withSetToSix = true;
    	
    	if (typeof(DigiWebAppOrdinaryDesign.bookingPageWithIconsScholpp) !== "undefined") {
    	    DigiWebApp.ScholppBookingController.resetButtons();

    		var activitySelection = that.getSelectedActivityItem(YES);
    		if (!DigiWebApp.BookingController.currentBooking) activitySelection = null;
    		if (typeof(activitySelection) !== "undefined" && activitySelection != null) {
	    		var activitySelected = _.find(DigiWebApp.Activity.find(), function(a) {
			         return (parseIntRadixTen(a.get("id")) === activitySelection.value);
			    });
    		    //var activitySelected = DigiWebApp.Activity.find(
	    		//{query:{identifier: 'id', operator: '=', value: activitySelection.value}})[0];
	    		if (!activitySelected) {
	    			DigiWebApp.ScholppBookingController.selectArbeitsende();
	    		} else {
		    		var activityName = activitySelected.get("name");
		    		if (activityName.indexOf("Reisezeit") >= 0 || activityName.indexOf("Fahrzeit") >= 0) {
		    			DigiWebApp.ScholppBookingController.selectFahrzeit();
		    		} else if (activityName.indexOf("Arbeitszeit") >= 0) {
		    			if (withSetToSix) uebernachtungAuswahl = "6";
		    			DigiWebApp.ScholppBookingController.selectArbeitszeit();
		    		} else if (activityName.indexOf("Unterbrechung") >= 0) {
		    			if (withSetToSix) uebernachtungAuswahl = "6";
		    			DigiWebApp.ScholppBookingController.selectUnterbrechung();
		    		} else if (activityName.indexOf("Pause") >= 0) {
		    			if (withSetToSix) uebernachtungAuswahl = "6";
		    			DigiWebApp.ScholppBookingController.selectPause();
		    		} else {
		    			if (withSetToSix) uebernachtungAuswahl = "6";
		    			if (withSetArbeitsende) DigiWebApp.ScholppBookingController.selectArbeitsende();
		    		}
	    		}
    		} else {
    			if (withSetToSix) uebernachtungAuswahl = "6";
    			if (withSetArbeitsende) DigiWebApp.ScholppBookingController.selectArbeitsende();
    		}
    	}
        return uebernachtungAuswahl;
    }

    , setOrders: function(orderId, positionId, activityId, canUseCurrentBooking) {
    	var that = this;

    	if (inDebug()) writeToLog('setOrders(orderId=' + orderId + ', positionId=' + positionId
            + ', activityId=' + activityId + ", canUseCurrentBooking=" + canUseCurrentBooking);

    	if (orderId && orderId == that.getSelectedOrderItem()) {
	        return that.updatePositions(positionId, activityId, canUseCurrentBooking);
	    }
        if (!orderId && orderId != 0) orderId = that.getSelectedOrderItem();
        if (!orderId) orderId = 0;

        var orders = DigiWebApp.HandOrder.findSorted().concat(DigiWebApp.Order.findSorted()); // we need to check handOrders also

        // Ohne diese Freischaltungen wird nur der Positionen-Webservice benutzt, der keine
        // Ordner ohne Aufträge liefert - in dem Fall können wir uns die langsame Filterung
        // sparen.
        // Freischaltung 429: mehrstufige Auftragsauswahl
        // Freischaltung 430: Handpositionen
        if (DigiWebApp.SettingsController.featureAvailable("429")
			|| DigiWebApp.SettingsController.featureAvailable("430")
        ) {
            // Ordner filtern: nur solche mit auswählbaren Elementen
            orders = _.filter(orders, function(o) {
                return o.hasPositions(YES, NO) || o.name == DigiWebApp.HandOrder.name;
            });
        }

          // orderId auf einen auswählbaren Wert zurücksetzen
    	if (!_.contains(_.pluck(_.pluck(orders, 'record'), 'id'), orderId)) {
    		orderId = 0;
    	}

        var orderArray = [];
        if (orders.length == 0) {
        	orderArray.push( { label: M.I18N.l('noData'), value: '0' } );
        } else {
	        var itemSelected = NO;
	        orderArray = _.map(orders, function(obj) {
	        	if (obj) {
		            return { label: obj.get('name'), value: obj.get('id') };
	        	}
	        });
	        orderArray = _.compact(orderArray);
	        if (orderArray.length == 1) {
		        // Wenn es nur einen Ordner gibt, dann diesen automatisch auswählen
	        	orderId = orderArray[0].value;
	        } else {
	        	// Freischaltung 416 "Tätigkeits-Icons auf dem Buchen-Screen (Scholpp only)"
		        if (DigiWebApp.SettingsController.featureAvailable('416')) {
		        	// Scholpp-spezifisch: Eintrag "Auftrag" hinzufügen
		        	orderArray.push( { label: M.I18N.l('order'), value: '0', isSelected: NO } );
		        } else {
			        // Eintrag "Bitte wählen" hinzufügen
		        	orderArray.push( { label: M.I18N.l('selectSomething'), value: '0', isSelected: NO } );
		        }
	        }
	        orderArray = _.map(orderArray, function(item) {
	        	if (item) {
		            item.isSelected = (item.value == orderId);
		            return item;
	        	}
	        });
        }
        
        if (inDebug()) writeToLog('setOrders, orderArray.length=' + orderArray.length);
        
        // set selection arrays to start content binding process
        that.set('orders', orderArray);
        
        return that.updatePositions(positionId, activityId, canUseCurrentBooking);
    }

    , updatePositions: function(positionId, activityId, canUseCurrentBooking) {
    	var that = this;
    	
    	var mySelectionObj = that.getSelectedOrderItem(YES);
        var isHandauftrag = NO;
    	if (hasValue(mySelectionObj)) {
    	    isHandauftrag = (mySelectionObj.label == mySelectionObj.value || isGUID(mySelectionObj.value));
    	}

        DigiWebApp.BookingPage.doHideShowPositionCombobox(!isHandauftrag);
		
		if (!isHandauftrag) {
		    return that.setPositions(positionId, activityId, canUseCurrentBooking);
		} else {
			// Sicherstellen dass beim Handauftrag nicht parallel ein Auftrag gesetzt ist
		    that.setSelectedPosition(0, canUseCurrentBooking);
			
			M.ViewManager.getView('bookingPage', 'orderButton').setValue(mySelectionObj.label);
			return that.setActivities(YES, canUseCurrentBooking, activityId);
		}
    }

    , setPositions: function(positionId, activityId, canUseCurrentBooking) {
    	var that = this;

    	if (inDebug()) writeToLog('setPositions(positionId=' + positionId
            + ', activityId=' + activityId + ", canUseCurrentBooking=" + canUseCurrentBooking);

        if (hasValue(positionId) && positionId == that.getSelectedPositionItem()) {
            // alle "verknüpften Elemente" ebenfalls aktualisieren
            that.setSelectedPosition(that.getSelectedPosition(), canUseCurrentBooking);
            return that.setActivities(YES, canUseCurrentBooking, activityId);
        }
        if (!positionId && positionId != 0) positionId = that.getSelectedPositionItem();
        if (!positionId) positionId = 0;

        var orderId = that.getSelectedOrderItem();
        if (!orderId) return;
    	
        if (typeof(DigiWebAppOrdinaryDesign.bookingPageWithIconsScholpp) !== "undefined") {
    		M.ViewManager.getView('bookingPageWithIconsScholpp', 'uebernachtungskennzeichen').resetSelection();
    		M.ViewManager.getView('bookingPageWithIconsScholpp', 'uebernachtungskennzeichen').setSelection('6');
    	}
        
    	// Freischaltung 406 "Auftragsinfo"
        if (DigiWebApp.SettingsController.featureAvailable('406') && DigiWebApp.SettingsController.getSetting("auftragsDetailsKoppeln")) {
            // TODO: Fehler in der folgenden Zeile auf iPhone oder xCover 3: 
            // window.onerror: Uncaught TypeError: Cannot call method 'getSelection' of null
            // Kann es sein, dass die orderInfoPage noch nicht geladen ist?
			if (typeof(M.ViewManager.getView('orderInfoPage', 'order').getSelection()) === "undefined") {
				DigiWebApp.OrderInfoController.init();
			}
			M.ViewManager.getView('orderInfoPage', 'order').setSelection(orderId);
			DigiWebApp.OrderInfoController.setPositions();
			DigiWebApp.OrderInfoController.setItem();
		}

        if (typeof(DigiWebApp.HandOrder.getById(orderId)) != "undefined") {
            return that.setActivities(YES, canUseCurrentBooking, activityId);
        }
        var positions = DigiWebApp.Position.getByVaterId(orderId);

        // positionId auf einen auswählbaren Wert zurücksetzen
    	if (!_.contains(_.pluck(_.pluck(positions, 'record'), 'id'), positionId)) {
    		positionId = 0;
    	}

    	var positionsArray = [];
        if (positions.length == 0) {
        	positionsArray.push( { label: M.I18N.l('selectSomething'), value: '0' } );
        } else {
	        positionsArray = _.map(positions, function(obj) {
	        	if (obj) {
		            return { label: obj.get('name'), value: obj.get('id') };
	        	}
	        });
	        positionsArray = _.compact(positionsArray);
	        
	        // Falls nichts gesetzt dann ersten Auftrag in der Liste automatisch auswählen
	        if (!hasValue(positionId) || positionId == 0) {
	        	positionId = positionsArray[0].value;
	        }
        }
        
    	positionsArray = _.map(positionsArray, function(item) {
        	if (item) {
	            item.isSelected = (parseIntRadixTen(item.value) == parseIntRadixTen(positionId));
	            return item;
        	}
        });
        
        if (inDebug()) writeToLog('setPositions, positionsArray.length=' + positionsArray.length);

        that.set('positions', positionsArray);
        
        // alle "verknüpften Elemente" ebenfalls aktualisieren
        that.setSelectedPosition(that.getSelectedPosition(), canUseCurrentBooking);

        return that.setActivities(YES, canUseCurrentBooking, activityId);
    }

    , setActivities: function(checkForWorkPlan, canUseCurrentBooking, activityId) {
    	var that = this;
    	
    	if (activityId && activityId == that.getSelectedActivityItem()) return;

    	if (inDebug()) writeToLog('setActivities(checkForWorkPlan=' + checkForWorkPlan
            + ', canUseCurrentBooking=' + canUseCurrentBooking + ', activityId=' + activityId);

    	var posId = that.getSelectedPositionItem();
    	var orderId = that.getSelectedOrderItem();
    	var activities = [];
    	if (posId) {

    	    // Freischaltung 406 "Auftragsinfo"
			if (DigiWebApp.SettingsController.featureAvailable('406') 
			 && DigiWebApp.SettingsController.getSetting("auftragsDetailsKoppeln")) {
				if (typeof(M.ViewManager.getView('orderInfoPage', 'position').getSelection()) === "undefined") {
					DigiWebApp.OrderInfoController.init();
				}
				M.ViewManager.getView('orderInfoPage', 'position').setSelection(posId);
				DigiWebApp.OrderInfoController.setItem();
			}
	
	        var workPlans = []; 
	        _.each(DigiWebApp.WorkPlan.find(),function(wp){
	        	if (wp.get("id") == posId) workPlans.push(wp);
	        });
	
	        // Wenn ein Arbeitsplan exisitiert dann nur die Leistungen verwenden die im Arbeitsplan sind.
	        if (workPlans.length === 1) {
	            activities = DigiWebApp.SelectionController.getActivitiesFromWorkplan(workPlans[0]);
	        } else {
	            activities = DigiWebApp.SelectionController.getActivities();
	        }
        } else {
            activities = DigiWebApp.SelectionController.getActivities();
        }
        // Bei Änderungen in der Buchungs-Selektion wird versucht die aktuell gebuchte Leistung 
        // ausgewählt zu lassen, es sei denn diese Leistung ist in der aktuellen Selektion nicht 
        // enthalten. Bei erneuter Selektionsänderung wird erneut versucht die aktuell gebuchte 
    	// Leistung zu setzen.
        if (canUseCurrentBooking
            && typeof(DigiWebApp.BookingController.currentBooking) !== "undefined" 
		    && DigiWebApp.BookingController.currentBooking  !== null
		    && !activityId 
		    && activityId != 0
		) { 
        	activityId = DigiWebApp.BookingController.currentBooking.get('activityId');
    	}
        
        // Vorher ausgewählte Leistung übernehmen sofern keine explizit gesetzt werden soll.
        if (!activityId && activityId != 0) activityId = that.getSelectedActivityItem();
        
        // activityId auf einen auswählbaren Wert zurücksetzen
    	if (!activityId || !_.contains(_.pluck(_.pluck(activities, 'record'), 'id'), activityId)) {
    		activityId = 0;
    	}

        var activitiesArray = [];
        if (activities.length == 0) {
        	activitiesArray.push( { label: M.I18N.l('selectSomething'), value: '0', isSelected: YES } );
        } else {
	        var itemSelected = NO;
	        activitiesArray = _.map(activities, function(obj) {
	        	if (obj) {
		            return { label: obj.get('name'), value: obj.get('id') };
	        	}
	        });
	        activitiesArray = _.compact(activitiesArray);
	        // Erste Leistung auswählen wenn ein Ordner/Auftrag und keine Leistung gesetzt ist, 
	        // sonst "Bitte wählen" durch activityId = 0
	        if (orderId != "0" && (!hasValue(activityId) || activityId == 0)) {
	        	activityId = activitiesArray[0].value;
	        }
	        itemSelected = NO;
	        activitiesArray = _.map(activitiesArray, function(item) {
	        	if (item) {
		            item.isSelected = (parseIntRadixTen(item.value) == parseIntRadixTen(activityId));
		            if (item.isSelected) itemSelected = YES;
		            return item;
	        	}
	        });
	        if (!itemSelected) {
	        	activitiesArray.push( { label: M.I18N.l('selectSomething'), value: '0', isSelected: YES } );
	        }
        }
        
        if (inDebug()) writeToLog('setActivities, activitiesArray.length=' + activitiesArray.length);
        
        // set selection arrays to start content binding process
        if (typeof (DigiWebAppOrdinaryDesign.bookingPageWithIconsScholpp) !== "undefined") {
            //TODO Beim folgenden Aufruf gibt es den Fehler
            //window.onerror: Uncaught TypeError: Cannot set property 'selectedIndex' of null 
            //M.ViewManager.getView('bookingPageWithIconsScholpp', 'activity').resetSelection();
            that.set('activities', activitiesArray);
            DigiWebApp.ScholppBookingController.resetButtons();
    	} else {
            that.set('activities', activitiesArray);
    	}
    	that.saveSelection();
		
        return;
    }

    // Auswahl initialisieren. Falls es keine frühere Auswahl gibt, "Bitte wählen" anzeigen, 
    // ansonsten den Buchen-Screen unangetastet lassen.
    , initSelection: function() {
       var that = this;

       if (that.getSelectedOrder() == null)
       {
           if (typeof(DigiWebAppOrdinaryDesign.bookingPageWithIconsScholpp) !== "undefined") {
               M.ViewManager.getView('bookingPageWithIconsScholpp', 'uebernachtungskennzeichen').resetSelection();
               M.ViewManager.getView('bookingPageWithIconsScholpp', 'uebernachtungskennzeichen').setSelection('6');
               //TODO Ordner/Auftrag/Leistung auch zurücksetzen
           } else {
               that.set('orders', []);
               that.set('positions', []);
               that.set('activities', []);
               return that.setOrders(0, 0, 0, YES);
           }
       }
    }

    , resetSelection: function() {
    	var that = this;
    	try {
        	if (typeof(DigiWebAppOrdinaryDesign.bookingPageWithIconsScholpp) !== "undefined") {
        		M.ViewManager.getView('bookingPageWithIconsScholpp', 'uebernachtungskennzeichen').resetSelection();
        		M.ViewManager.getView('bookingPageWithIconsScholpp', 'uebernachtungskennzeichen').setSelection('6');
        	}
            // TODO: fix resetSelection (die folgende Zeile kam vermutlich nur beim testen bzgl. des nicht funktionierenden resetSelections hier rein)
        	return that.initSelection();
    		M.ViewManager.getView(that.getPageToUse(), 'order').resetSelection();
    		M.ViewManager.getView(that.getPageToUse(), 'position').resetSelection();
    		M.ViewManager.getView(that.getPageToUse(), 'activity').resetSelection();
    		M.ViewManager.getView('bookingPage', 'orderButton').setValue(M.I18N.l('selectSomething'));
    	} catch(e4) { 
    		//trackError(e4);
    	}
    }

    , isOrderSelected: function() {
    	var that = this;
    	var orderObj = that.getSelectedOrderItem(YES);
        if (orderObj && orderObj.value != "0") { // 'Bitte wählen' is not allowed to be chosen
            return YES;
        } else {
            return NO;
        }
    }

    , isPositionSelected: function() {
    	var that = this;
    	var posObj = that.getSelectedPositionItem(YES);
        if (posObj && posObj.value != "0") { // 'Bitte wählen' is not allowed to be chosen
            return YES;
        } else {
            return NO;
        }
    }

    , isActivitySelected: function() {
    	var that = this;
    	var actObj = that.getSelectedActivityItem(YES);
        if (actObj && actObj.value != "0") { // 'Bitte wählen' is not allowed to be chosen
            return YES;
        } else {
            return NO;
        }
    }

    , saveSelection: function() {
    	var that = this;
    	
    	var uebernachtungskennzeichenScholppValue = null;
    	var spesenkennzeichenScholppValue = null;
    	if (typeof(DigiWebAppOrdinaryDesign.bookingPageWithIconsScholpp) !== "undefined") {
            uebernachtungskennzeichenScholppValue = M.ViewManager.getView('bookingPageWithIconsScholpp', 'uebernachtungskennzeichen').getSelection();
            spesenkennzeichenScholppValue = M.ViewManager.getView('bookingPageWithIconsScholpp', 'spesenkennzeichen').getSelection();
    	}
    	that.selections.uebernachtungskennzeichenScholpp = uebernachtungskennzeichenScholppValue;
    	that.selections.spesenkennzeichenScholpp = spesenkennzeichenScholppValue;

    	that.selections.order = that.getSelectedOrderItem();
    	that.selections.position = that.getSelectedPositionItem();
    	that.selections.activity = that.getSelectedActivityItem();

        //if (!DigiWebApp.SelectionController.showHandOrderFirst) that.useSelections = YES;
    }
    
    , getActivities: function(queryobj) {
    	var activities;
    	if (queryobj) {
    		activities = DigiWebApp.Activity.find(queryobj);
    	} else {
    		activities = DigiWebApp.Activity.findSorted();
    	}
    	activities = _.map(activities, function(acti) {
    		if (acti) { 
		    	if(parseIntRadixTen(acti.get("positionId")) === 1) {
		            // normale Tätigkeit
		            return acti;
		         } else {
		            // Tätigkeit nur bei Arbeitsplan
		            return null;
		         }
    		}
    	});
    	activities = _.compact(activities);
    	return activities;
    }

    , getActivitiesFromWorkplan: function(workplan) {
        var actIds = workplan.get('activityIds').split(',');
        var activities = [];
        if (actIds && actIds.length > 0) {
        	var alleTaetigkeiten = DigiWebApp.Activity.find(); 
            for (var i = 0; i < actIds.length; i++) {
//                activities.push(_.first(DigiWebApp.Activity.find({ query: {
//                    identifier: 'id', 
//                    operator: '=', 
//                    value: actIds[i] 
//                }})));
            	var taet = _.find(alleTaetigkeiten, function(t) {
	                 return parseIntRadixTen(t.get("id")) === parseIntRadixTen(actIds[i])
	            });
            	if (taet) activities.push(taet);
            }
        }
        if (parseIntRadixTen(workplan.get("workplanType")) === 1) {
        	// only those activities which are bound to employee
            activities = _.map(activities, function(act) {
            	if ( typeof(act) === "undefined" ) {
            		console.log("UNDEFINED ACTIVITY");
            		return null;
            	} else {
        			var zugeordnet = NO;
            		var allActivities = DigiWebApp.Activity.findSorted();
            		_.each(allActivities, function(acti) {
            			// herausfinden, ob diese Tätigkeit dem Mitarbeiter zugeordnet ist.
            			if (act.get("id") === acti.get("id") && parseIntRadixTen(acti.get("positionId")) === 1) {
            				zugeordnet = YES;
            			}
            		});
        			if (zugeordnet) {
        				return act;
        			} else {
        				return null;	
        			}
            	}
            });
        }
        activities = _.compact(activities);
        return activities;
    }
    
    , getSelectedOrder: function() {
    	var that = this;
    	var orderId;
    	var results = [];
        var orderObj = that.getSelectedOrderItem(YES);
        if (orderObj) {
        	orderId = orderObj.value;
        	results = _.filter(DigiWebApp.Order.find(), function(o) {
        		return (o.get("id") == orderId);
        	});
        }
    	return results.length > 0 ? results[0] : null; 
    }
    
    , getSelectedOrderItem: function(returnObject) {
    	var that = this;
        return M.ViewManager.getView(that.getPageToUse(), 'order').getSelection(returnObject);
    }
    
    , setSelectedOrder: function (order, canUseCurrentBooking) {
    	var that = this;
    	var orderId = 0;
    	if (order && typeof(order) == "object") {
    		orderId = order.get("id");
    	}
		if (order && that.getSelectedOrderItem() != orderId) {
		    return that.setOrders(orderId, null, null, canUseCurrentBooking);
		}
    }
    
    , getSelectedPosition: function() {
    	var that = this;
    	var posId;
    	var results = [];
        var posObj = that.getSelectedPositionItem(YES);
        if (posObj) {
        	posId = posObj.value;
        	results = _.filter(DigiWebApp.Position.find(), function(o) {
        		return (o.get("id") == posId);
        	});
        }
    	return results.length > 0 ? results[0] : null; 
    }
    
    , getSelectedPositionItem: function(returnObject) {
    	var that = this;
        return M.ViewManager.getView(that.getPageToUse(), 'position').getSelection(returnObject);
    }
    
    , setSelectedPosition: function(pos, canUseCurrentBooking) {
    	var that = this;

    	var posId = 0;
    	var orderId = that.getSelectedOrderItem();
    	var buttonLabel = M.I18N.l('selectSomething');
    	if (pos && typeof(pos) == "object") {
    		posId = pos.get("id");
    		orderId = pos.get("orderId");
    		if (posId != 0) buttonLabel = pos.get("name");
    	}
		
		M.ViewManager.getView('bookingPage', 'orderButton').setValue(buttonLabel);

		if (that.getSelectedOrderItem() != orderId) {
			return that.setOrders(orderId, posId, null, canUseCurrentBooking);
		}
		if (pos && that.getSelectedPositionItem() != posId) {
		    return that.setPositions(posId, canUseCurrentBooking);
		}
    }
    
    , getSelectedActivity: function() {
    	var that = this;
    	var actId;
    	var results = [];
    	var actObj = that.getSelectedActivityItem(YES);
        if (actObj) {
        	actId = actObj.value;
        	results = _.filter(DigiWebApp.Activity.find(), function(o) {
        		return (o.get("id") == actId);
        	});
        }
    	return results.length > 0 ? results[0] : null; 
    }
    
    , getSelectedActivityItem: function(returnObject) {
    	var that = this;
        return M.ViewManager.getView(that.getPageToUse(), 'activity').getSelection(returnObject);
    }
    
    // Wird nirgends benutzt
    //, setSelectedActivity: function(act) {
    //	var that = this;

    //	var actId = 0;
    //	var posId = that.getSelectedPositionItem();
    //	var orderId = that.getSelectedOrderItem();
    //	if (act && typeof(act) == "object") {
    //		actId = act.get("id");
    //	}

	//	if (that.getSelectedOrderItem() != orderId) {
	//		return that.setOrders(orderId, posId, actId);
	//	}
	//	if (that.getSelectedPositionItem() != posId) {
	//		return that.setPositions(posId, actId);
	//	}
	//	if (act && that.getSelectedActivityItem() != actId) {
	//		return that.setActivities(YES, actId);
	//	}
    //}
    
    , getPageToUse: function() {
    	var pageToUse = 'bookingPage';
    	if (typeof(DigiWebAppOrdinaryDesign.bookingPageWithIconsScholpp) !== "undefined") {
    		pageToUse = 'bookingPageWithIconsScholpp';
    	}
    	return pageToUse;
    }

});
