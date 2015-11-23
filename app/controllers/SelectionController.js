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
    
	, skipSetSelectionBy: false

    , selections: {
          order: null
        , position: null
        , activity: null
        , uebernachtungskennzeichenScholpp: null
        , spesenkennzeichenScholpp: null
    }

    // use selection that has been made by hand
    , useSelections: NO

    , showHandOrderFirst: NO

    , uebernachtungskennzeichenScholpp: null
    , spesenkennzeichenScholpp: null
    
    /*
    , setSelection: function() {
        var orders = DigiWebApp.HandOrder.findSorted().concat(DigiWebApp.Order.findSorted()); // we need to check handOrders also
        var positions = DigiWebApp.Position.findSorted();
        var activities = DigiWebApp.SelectionController.getActivities();
    }
    */

    , setSelectionByPreviousSelection: function() {
        var that = this;
		
        if (that.skipSetSelectionBy) return;

		var mySelection = JSON.parse(JSON.stringify(that.selections));
        
        this.resetSelection();

        this.setOrders(mySelection.order, mySelection.position, mySelection.activity);

        this.setActivities(YES);
        
        /**
         * ACTIVITIES
         */
        itemSelected = NO;
        var activityArray = _.map(this.get('activities'), function(act) {
        	if ( typeof(act) === "undefined" ) {
        		console.log("UNDEFINED ACTIVITY");
        	} else {        	
        		var obj = { label: act.label, value: act.value };
        		if (obj.value === mySelection.activity) {
        			obj.isSelected = YES;
        			itemSelected = YES;
        		}
                return obj;
        	}
        });
        activityArray = _.compact(activityArray);
//        // push "Bitte wählen Option"
//        if (DigiWebApp.SettingsController.featureAvailable('419')) {
//        	activityArray.push({label: M.I18N.l('activity'), value: '0', isSelected:!itemSelected});
//        } else {
//        	activityArray.push({label: M.I18N.l('selectSomething'), value: '0', isSelected:!itemSelected});
//        }

        // set selection arrays to start content binding process
        this.set('activities', activityArray);

        if (DigiWebApp.SettingsController.featureAvailable('419')) {
	        /**
	         * Scholpp-Spesen: Übernachtungskennzeichen 
	         */
	        itemSelected = NO;
	        var uebernachtungskennzeichenScholppArray = _.map(that.uebernachtungskennzeichenScholpp, function(ueK) {
	        	if ( typeof(ueK) === "undefined" ) {
	        		console.log("UNDEFINED uebernachtungskennzeichenScholpp");
	        	} else {        	
	        		var obj = { label: ueK.label, value: ueK.value };
	        		if (obj.value === mySelection.uebernachtungskennzeichenScholpp) {
	        			obj.isSelected = YES;
	        			itemSelected = YES;
	        		}
	                return obj;
	        	}
	        });
	        uebernachtungskennzeichenScholppArray = _.compact(uebernachtungskennzeichenScholppArray);
	        this.set('uebernachtungskennzeichenScholpp', uebernachtungskennzeichenScholppArray);
			this.saveSelection();
		}
        
    	if (typeof(DigiWebAppOrdinaryDesign.bookingPageWithIconsScholpp) !== "undefined") { DigiWebApp.ScholppBookingController.resetButtons(); }
    	if (typeof(DigiWebAppOrdinaryDesign.bookingPageWithIconsScholpp) !== "undefined") {
    		var activitySelection = that.getSelectedActivityItem(YES);
    		if (!DigiWebApp.BookingController.currentBooking) activitySelection = null;
    		if (typeof(activitySelection) !== "undefined" && activitySelection != null) {
	    		var activitySelected = _.find(DigiWebApp.Activity.find(), function(a) { return (parseIntRadixTen(a.get("id")) === activitySelection.value);});
	    		//var activitySelected = DigiWebApp.Activity.find({query:{identifier: 'id', operator: '=', value: activitySelection.value}})[0];
	    		if (!activitySelected) {
	    			DigiWebApp.ScholppBookingController.selectArbeitsende();
	    		} else {
		    		var activityName = activitySelected.get("name");
		    		if (activityName.indexOf("Reisezeit") >= 0 || activityName.indexOf("Fahrzeit") >= 0) {
		    			DigiWebApp.ScholppBookingController.selectFahrzeit();
		    		} else if (activityName.indexOf("Arbeitszeit") >= 0) {
		    			DigiWebApp.ScholppBookingController.selectArbeitszeit();
		    		} else if (activityName.indexOf("Unterbrechung") >= 0) {
		    			DigiWebApp.ScholppBookingController.selectUnterbrechung();
		    		} else if (activityName.indexOf("Pause") >= 0) {
		    			DigiWebApp.ScholppBookingController.selectPause();
		    		} else {
		    			DigiWebApp.ScholppBookingController.selectArbeitsende();
		    		}
	    		}
    		} else {
    			DigiWebApp.ScholppBookingController.selectArbeitsende();
    		}
    	}

    }

    , setSelectionWithCurrentHandOrderFirst: function() {
        var that = this;

        if (that.skipSetSelectionBy) return;

        var orders = DigiWebApp.HandOrder.findSorted().concat(DigiWebApp.Order.findSorted()); // we need to check handOrders also
        //var positions = DigiWebApp.Position.findSorted();
        var activities = DigiWebApp.SelectionController.getActivities();

        
        /**
         * ORDERS
         */
        var itemSelected = NO;
        var orderArray = _.map(orders, function(order) {
        	if (order) {
	            var obj =  { label: order.get('name'), value: order.get('id') };
	            if(obj.label === DigiWebApp.HandOrderController.currentHandOrderName) {
	                obj.isSelected = YES;
	                itemSelected = YES;
	            } else {
	                obj.isSelected = NO;
	            }
	            return obj;
        	}
        });
        
        orderArray = _.compact(orderArray);
        // push "Bitte wählen Option"
        if (DigiWebApp.SettingsController.featureAvailable('419')) {
        	orderArray.push({label: M.I18N.l('order'), value: '0', isSelected:!itemSelected});
        } else {
        	orderArray.push({label: M.I18N.l('selectSomething'), value: '0', isSelected:!itemSelected});
        }

        /**
         * POSITIONS (none for HandOrder)
         */
        var positionArray = [];
        // push "Bitte wählen Option"
        positionArray.push({label: M.I18N.l('noData'), value: '0', isSelected:YES});

        /**
         * ACTIVITIES
         */
        var i = 0;
        var activityArray = _.map(activities, function(act) {
        	if ( typeof(act) === "undefined" ) {
        		console.log("UNDEFINED ACTIVITY");
        		return null;
        	} else {
        		var obj = null;
        		if (i === 0) {
        			itemSelected = YES;
        			obj = { label: act.get('name'), value: act.get('id'), isSelected:YES };
        		} else {
        			obj = { label: act.get('name'), value: act.get('id') };
        		}
                i++;
                return obj;
            }
        });
        activityArray = _.compact(activityArray);
        if (DigiWebApp.SettingsController.featureAvailable('419')) {
        	activityArray.push({label: M.I18N.l('activity'), value: '0', isSelected:!itemSelected});
        } else {
        	activityArray.push({label: M.I18N.l('selectSomething'), value: '0', isSelected:!itemSelected});
        }
        
        this.resetSelection();

        if (DigiWebApp.SettingsController.featureAvailable('419')) {
	        /**
	         * Scholpp-Spesen: Übrnachtungskennzeichen 
	         */
	        itemSelected = NO;
	        var uebernachtungskennzeichenScholppArray = _.map(that.uebernachtungskennzeichenScholpp, function(ueK) {
	        	if ( typeof(ueK) === "undefined" ) {
	        		console.log("UNDEFINED uebernachtungskennzeichenScholpp");
	        	} else {        	
	        		var obj = { label: ueK.label, value: ueK.value };
	        		if(parseIntRadixTen(obj.value) === 6) { // select "- -"
	        			obj.isSelected = YES;
	        			itemSelected = YES;
	        		}
	                return obj;
	        	}
	        });
	        uebernachtungskennzeichenScholppArray = _.compact(uebernachtungskennzeichenScholppArray);
	        that.set('uebernachtungskennzeichenScholpp', uebernachtungskennzeichenScholppArray);
			that.saveSelection();
		}

        // set selection arrays to start content binding process
        this.set('orders', orderArray);
		var mySelectionObj = that.getSelectedOrderItem(YES);
		if (mySelectionObj.label == mySelectionObj.value || isGUID(mySelectionObj.value)) {
			DigiWebApp.BookingPage.doHideShowPositionCombobox(false);
		} else {
			DigiWebApp.BookingPage.doHideShowPositionCombobox(true);
		}

		this.set('positions', positionArray);
        that.setSelectedPosition(0);
    	
        this.set('activities', activityArray);
        that.setSelectedActivity(0);
    	
    	if (typeof(DigiWebAppOrdinaryDesign.bookingPageWithIconsScholpp) !== "undefined") {
        	DigiWebApp.ScholppBookingController.resetButtons();    		
    	}

    	if (typeof(DigiWebAppOrdinaryDesign.bookingPageWithIconsScholpp) !== "undefined") {
    		var activitySelection = M.ViewManager.getView('bookingPageWithIconsScholpp', 'activity').getSelection(YES);
    		if (!DigiWebApp.BookingController.currentBooking) activitySelection = null;
    		if (typeof(activitySelection) !== "undefined" && activitySelection != null) {
	    		var activitySelected = _.find(DigiWebApp.Activity.find(), function(a) { return (parseIntRadixTen(a.get("id")) === activitySelection.value);});
	    		//DigiWebApp.Activity.find({query:{identifier: 'id', operator: '=', value: activitySelection.value}})[0];
	    		if (typeof(activitySelected) === "undefined") {
	    			DigiWebApp.ScholppBookingController.selectArbeitsende();
	    		} else {
		    		var activityName = activitySelected.get("name");
		    		if (activityName.indexOf("Reisezeit") >= 0 || activityName.indexOf("Fahrzeit") >= 0) {
		    			DigiWebApp.ScholppBookingController.selectFahrzeit();
		    		} else if (activityName.indexOf("Arbeitszeit") >= 0) {
		    			DigiWebApp.ScholppBookingController.selectArbeitszeit();
		    		} else if (activityName.indexOf("Unterbrechung") >= 0) {
		    			DigiWebApp.ScholppBookingController.selectUnterbrechung();
		    		} else if (activityName.indexOf("Pause") >= 0) {
		    			DigiWebApp.ScholppBookingController.selectPause();
		    		} else {
		    			//DigiWebApp.ScholppBookingController.selectArbeitsende();
		    		}
	    		}
    		} else {
    			//DigiWebApp.ScholppBookingController.selectArbeitsende();
    		}
    	}

    }

    , setSelectionByCurrentBooking: function() {
        var that = this;

        if (that.skipSetSelectionBy) return;

        this.resetSelection();

        var booking = DigiWebApp.BookingController.currentBooking;
        
        // get the ids from the current booking
        var orderId = (booking.get('orderId') == "0" ? 0 : booking.get('orderId')) || booking.get('handOrderId'); // we need to check handOrders also
        var positionId = booking.get('positionId');
        var activityId = booking.get('activityId');
        var uebernachtungAuswahl = booking.get('uebernachtungAuswahl');
        
        this.setOrders(orderId, positionId, activityId);
        
    	if (typeof(DigiWebAppOrdinaryDesign.bookingPageWithIconsScholpp) !== "undefined") {
    		var activitySelection = M.ViewManager.getView('bookingPageWithIconsScholpp', 'activity').getSelection(YES);
    		if (!DigiWebApp.BookingController.currentBooking) activitySelection = null;
    		if (typeof(activitySelection) !== "undefined" && activitySelection != null) {
	    		var activitySelected = _.find(DigiWebApp.Activity.find(), function(a) { return (parseIntRadixTen(a.get("id")) === activitySelection.value);});
	    		//DigiWebApp.Activity.find({query:{identifier: 'id', operator: '=', value: activitySelection.value}})[0];
	    		if (typeof(activitySelected) === "undefined") {
	    			uebernachtungAuswahl = "6";
	    			DigiWebApp.ScholppBookingController.selectArbeitsende();
	    		} else {
		    		var activityName = activitySelected.get("name");
		    		if (activityName.indexOf("Reisezeit") >= 0 || activityName.indexOf("Fahrzeit") >= 0) {
		    			DigiWebApp.ScholppBookingController.selectFahrzeit();
		    		} else if (activityName.indexOf("Arbeitszeit") >= 0) {
		    			uebernachtungAuswahl = "6";
		    			DigiWebApp.ScholppBookingController.selectArbeitszeit();
		    		} else if (activityName.indexOf("Unterbrechung") >= 0) {
		    			uebernachtungAuswahl = "6";
		    			DigiWebApp.ScholppBookingController.selectUnterbrechung();
		    		} else if (activityName.indexOf("Pause") >= 0) {
		    			uebernachtungAuswahl = "6";
		    			DigiWebApp.ScholppBookingController.selectPause();
		    		} else {
		    			uebernachtungAuswahl = "6";
		    			DigiWebApp.ScholppBookingController.selectArbeitsende();
		    		}
	    		}
    		} else {
    			uebernachtungAuswahl = "6";
    			DigiWebApp.ScholppBookingController.selectArbeitsende();
    		}
    	}

        if (DigiWebApp.SettingsController.featureAvailable('419')) {
	        /**
	         * Scholpp-Spesen: Übrnachtungskennzeichen 
	         */
	        itemSelected = NO;
	        var uebernachtungskennzeichenScholppArray = _.map(this.uebernachtungskennzeichenScholpp, function(ueK) {
	        	if ( typeof(ueK) === "undefined" ) {
	        		console.log("UNDEFINED uebernachtungskennzeichenScholpp");
	        	} else {        	
	        		var obj = { label: ueK.label, value: ueK.value };
	        		if (obj.value === uebernachtungAuswahl) {
	        			obj.isSelected = YES;
	        			itemSelected = YES;
	        		}
	                return obj;
	        	}
	        });
	        uebernachtungskennzeichenScholppArray = _.compact(uebernachtungskennzeichenScholppArray);
	        this.set('uebernachtungskennzeichenScholpp', uebernachtungskennzeichenScholppArray);
			this.saveSelection();
		}
        
    	//if (typeof(DigiWebAppOrdinaryDesign.bookingPageWithIconsScholpp) !== "undefined") { DigiWebApp.ScholppBookingController.resetButtons(); }
    }
    
    , setOrders: function(orderId, positionId, activityId) {
    	var that = this;
    	
        if (orderId && orderId == that.getSelectedOrderItem()) return that.setPositions(positionId, activityId);
        if (!orderId && orderId != 0) orderId = that.getSelectedOrderItem();
        if (!orderId) orderId = 0;

        var orders = DigiWebApp.HandOrder.findSorted().concat(DigiWebApp.Order.findSorted()); // we need to check handOrders also

        // filter orders: only orders with selectable elements
        orders = _.filter(orders, function(o) { return o.hasPositions(); });
        
        // reset orderId to a selectable value
    	if (!_.contains(_.pluck(_.pluck(orders, 'record'), 'id'), orderId)) {
    		orderId = 0;
    	}

        var orderArray = [];
        if (orders.length < 1) {
        	orderArray.push({label: M.I18N.l('noData'), value: '0'});
        } else {
	        var itemSelected = NO;
	        var orderArray = _.map(orders, function(obj) {
	        	if (obj) {
		            return { label: obj.get('name'), value: obj.get('id') };
	        	}
	        });
	        orderArray = _.compact(orderArray);
	        if (orderArray.length == 1) {
	        	orderId = orderArray[0].value;
	        } else {
		        // push "Bitte wählen Option"
		        if (DigiWebApp.SettingsController.featureAvailable('416')) {
		        	orderArray.push({label: M.I18N.l('order'), value: '0', isSelected: NO});
		        } else {
		        	orderArray.push({label: M.I18N.l('selectSomething'), value: '0', isSelected: NO});
		        }
	        }
	        orderArray = _.map(orderArray, function(item) {
	        	if (item) {
		            item.isSelected = (parseIntRadixTen(item.value) == parseIntRadixTen(orderId));
		            return item;
	        	}
	        });
        }
        
        // set selection arrays to start content binding process
        that.set('orders', orderArray);
		var mySelectionObj = that.getSelectedOrderItem(YES);
		var isHandauftrag = (mySelectionObj.label == mySelectionObj.value || isGUID(mySelectionObj.value))
		DigiWebApp.BookingPage.doHideShowPositionCombobox(!isHandauftrag);
		
		return that.setPositions(positionId, activityId);
		
    }

    , setPositions: function(positionId, activityId) {
    	var that = this;

        if (hasValue(positionId) && positionId == that.getSelectedPositionItem()) {
            // alle "verknüpften Elemente" ebenfalls aktualisieren
            that.setSelectedPosition(that.getSelectedPosition());
        	return that.setActivities(YES, activityId);
        }
        if (!positionId && positionId != 0) positionId = that.getSelectedPositionItem();
        if (!positionId) positionId = 0;

        var orderId = that.getSelectedOrderItem();
        if (!orderId) return;
    	
        if (typeof(DigiWebAppOrdinaryDesign.bookingPageWithIconsScholpp) !== "undefined") {
    		M.ViewManager.getView('bookingPageWithIconsScholpp', 'uebernachtungskennzeichen').resetSelection();
    		M.ViewManager.getView('bookingPageWithIconsScholpp', 'uebernachtungskennzeichen').setSelection('6');
    	}
        
        if (DigiWebApp.SettingsController.featureAvailable('406') && DigiWebApp.SettingsController.getSetting("auftragsDetailsKoppeln")) {
			if (typeof(M.ViewManager.getView('orderInfoPage', 'order').getSelection()) === "undefined") {
				DigiWebApp.OrderInfoController.init();
			}
			M.ViewManager.getView('orderInfoPage', 'order').setSelection(orderId);
			DigiWebApp.OrderInfoController.setPositions();
			DigiWebApp.OrderInfoController.setItem();
		}

        var positions = DigiWebApp.Position.getByVaterId(orderId);

        // reset orderId to a selectable value
    	if (!_.contains(_.pluck(_.pluck(positions, 'record'), 'id'), positionId)) {
    		positionId = 0;
    	}

    	var positionsArray = [];
        if (positions.length < 1) {
        	//positionsArray.push({label: M.I18N.l('noData'), value: '0'});
        	positionsArray.push({label: M.I18N.l('selectSomething'), value: '0'});
        } else {

	        var positionsArray = _.map(positions, function(obj) {
	        	if (obj) {
		            return { label: obj.get('name'), value: obj.get('id') };
	        	}
	        });
	        positionsArray = _.compact(positionsArray);
	        if (positionsArray.length == 1) {
	        	positionId = positionsArray[0].value;
	        } else {
		        // push "Bitte wählen Option"
		        if (DigiWebApp.SettingsController.featureAvailable('416')) {
		        	positionsArray.push({label: M.I18N.l('position'), value: '0', isSelected: NO});
		        } else {
		        	positionsArray.push({label: M.I18N.l('selectSomething'), value: '0', isSelected: NO});
		        }
	        }
	        positionsArray = _.map(positionsArray, function(item) {
	        	if (item) {
		            item.isSelected = (parseIntRadixTen(item.value) == parseIntRadixTen(positionId));
		            return item;
	        	}
	        });
        }

        that.set('positions', positionsArray);
        
        // alle "verknüpften Elemente" ebenfalls aktualisieren
        that.setSelectedPosition(that.getSelectedPosition());

        return that.setActivities(YES, activityId);

    }

    /* only set those activities that are related to the chosen position */
    , setActivities: function(checkForWorkPlan, activityId) {
    	var that = this;
    	
    	if (activityId && activityId == that.getSelectedActivityItem()) return;

    	var posId = that.getSelectedPositionItem();
        if (posId) {
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
	        	if (parseIntRadixTen(wp.get("id")) === parseIntRadixTen(posId)) workPlans.push(wp);
	        });
	        i = 0;
	
	        /* if a workplan exists, only use those activities that are in the workplan */
	        if (workPlans.length === 1) {
	            activities = DigiWebApp.SelectionController.getActivitiesFromWorkplan(workPlans[0]);
	        } else {
	            activities = DigiWebApp.SelectionController.getActivities();
	        }
//        } else {
//            activities = DigiWebApp.SelectionController.getActivities();
        }
        
        if ( typeof(DigiWebApp.BookingController.currentBooking) !== "undefined" 
		         && DigiWebApp.BookingController.currentBooking  !== null
		     && !activityId 
		     && activityId != 0
		) { 
        	activityId = DigiWebApp.BookingController.currentBooking.get('activityId');
    	}
        if (!activityId && activityId != 0) activityId = that.getSelectedActivityItem();

        // reset activityId to a selectable value
    	if (!activityId 
    	 || !_.contains(_.pluck(_.pluck(activities, 'record'), 'id'), activityId)) {
    		activityId = 0;
    	}

        var activitiesArray = [];
        if (activities.length < 1) {
        	//activitiesArray.push({label: M.I18N.l('noData'), value: '0'});
        	activitiesArray.push({label: M.I18N.l('selectSomething'), value: '0'});
        } else {
	        var itemSelected = NO;
	        var activitiesArray = _.map(activities, function(obj) {
	        	if (obj) {
		            return { label: obj.get('name'), value: obj.get('id') };
	        	}
	        });
	        activitiesArray = _.compact(activitiesArray);
	        if (activityId == 0 && orderId != 0) {
	        	activityId = activitiesArray[0].value;
	        } else {
	        	activities.push({label: M.I18N.l('selectSomething'), value: '0'});
	        }
	        activitiesArray = _.map(activitiesArray, function(item) {
	        	if (item) {
		            item.isSelected = (parseIntRadixTen(item.value) == parseIntRadixTen(activityId));
		            return item;
	        	}
	        });
        }
        
        // set selection arrays to start content binding process
    	if (typeof(DigiWebAppOrdinaryDesign.bookingPageWithIconsScholpp) !== "undefined") {
            M.ViewManager.getView('bookingPageWithIconsScholpp', 'activity').resetSelection();
            that.set('activities', activitiesArray);
            DigiWebApp.ScholppBookingController.resetButtons();
    	} else {
            that.set('activities', activitiesArray);
    	}
		
        return; // that.saveSelection();

        // alt-code
        var orderId = that.getSelectedOrderItem();
        var posId = that.getSelectedPositionItem();

        var activities = [];
        var i = 0;

        var selectedId = i;
        if (typeof(activityId) != "undefined") selectedId = activityId;

		if (posId) {
			if (DigiWebApp.SettingsController.featureAvailable('406') && DigiWebApp.SettingsController.getSetting("auftragsDetailsKoppeln")) {
				if (typeof(M.ViewManager.getView('orderInfoPage', 'position').getSelection()) === "undefined") {
					DigiWebApp.OrderInfoController.init();
				}
				M.ViewManager.getView('orderInfoPage', 'position').setSelection(posId);
				DigiWebApp.OrderInfoController.setItem();
			}
	
	        var workPlans = []; 
	        _.each(DigiWebApp.WorkPlan.find(),function(wp){
	        	if (parseIntRadixTen(wp.get("id")) === parseIntRadixTen(posId)) workPlans.push(wp);
	        });
	        i = 0;
	
	        /* if a workplan exists, only use those activities that are in the workplan */
	        if (workPlans.length === 1) {
	            activities = DigiWebApp.SelectionController.getActivitiesFromWorkplan(workPlans[0]);
	        } else {
	            activities = DigiWebApp.SelectionController.getActivities();
	        }
        } else {
            activities = DigiWebApp.SelectionController.getActivities();
        }

        var currentBookingActivityId = -1;
        if ( typeof(DigiWebApp.BookingController.currentBooking) !== "undefined" && DigiWebApp.BookingController.currentBooking !== null ) { 
        	currentBookingActivityId = DigiWebApp.BookingController.currentBooking.get('activityId');
        }
		var currentBookingActivitySelectable = false;
		_.each(activities, function(act) {
        	if ( typeof(act) === "undefined" ) {
        		console.log("UNDEFINED ACTIVITY");
        		return null;
        	} else {
				if ( parseIntRadixTen(act.get('id')) === parseIntRadixTen(currentBookingActivityId) ) { 
					currentBookingActivitySelectable = true; 
				}
			}
		});
		
        activities = _.map(activities, function(act) {
        	if ( typeof(act) === "undefined" ) {
        		console.log("UNDEFINED ACTIVITY");
        		return null;
        	} else {
        		var obj = null;
        		if (currentBookingActivitySelectable) {
        			obj = { label: act.get('name')
        				  , value: act.get('id')
        				  , isSelected: act.get('id') == currentBookingActivityId 
        				  		? YES : NO };
        		} else {
	                if (typeof(positionId) != "undefined") {
	        			obj = { label: act.get('name')
	        				  , value: act.get('id')
	        				  , isSelected: parseIntRadixTen(pos.get("id")) == parseIntRadixTen(selectedId) 
	        				  		? YES : NO };
	                } else {
	        			obj = { label: act.get('name')
	        				  , value: act.get('id')
	        				  , isSelected: i === 0 
	        				  		? YES : NO };
	                }
        		}
                i += 1;
                return obj;
        	}
        });

        activities = _.compact(activities);

        // new to show this when closing day is pressed (corresponds to a reset)
        if (activities.length > 0) {
            if (DigiWebApp.SettingsController.featureAvailable('419')) {
            	activities.push({label: M.I18N.l('activity'), value: '0', isSelected:NO});
            } else {
            	activities.push({label: M.I18N.l('selectSomething'), value: '0', isSelected:NO});
            }
        } else {
            activities.push({label: M.I18N.l('noData'), value: '0'});
        }


    	if (typeof(DigiWebAppOrdinaryDesign.bookingPageWithIconsScholpp) !== "undefined") {
            M.ViewManager.getView('bookingPageWithIconsScholpp', 'activity').resetSelection();
            this.set('activities', activities);
            DigiWebApp.ScholppBookingController.resetButtons();
    	} else {
            //M.ViewManager.getView('bookingPage', 'activity').resetSelection();
            this.set('activities', activities);
            if (!orderId || parseIntRadixTen(orderId) == 0) M.ViewManager.getView('bookingPage', 'activity').setSelection('0');
    	}

    }

    , initSelection: function() {
       var that = this;
       
       that.set('orders', []);
       that.set('positions', []);
       that.set('activities', []);
       return that.setOrders(0,0,0);
       
    }

    , resetSelection: function() {
    	var that = this;
    	try {
        	if (typeof(DigiWebAppOrdinaryDesign.bookingPageWithIconsScholpp) !== "undefined") {
        		M.ViewManager.getView('bookingPageWithIconsScholpp', 'uebernachtungskennzeichen').resetSelection();
        		M.ViewManager.getView('bookingPageWithIconsScholpp', 'uebernachtungskennzeichen').setSelection('6');
        	}
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

        if (!DigiWebApp.SelectionController.showHandOrderFirst) that.useSelections = YES;
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
            	var taet = _.find(alleTaetigkeiten, function(t){ return parseIntRadixTen(t.get("id")) === parseIntRadixTen(actIds[i])});
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
    	var orderObj, orderId;
    	var results = [];
        orderObj = that.getSelectedOrderItem(YES);
        if (orderObj) {
        	orderId = orderObj.value;
        	var results = _.filter(DigiWebApp.Order.find(), function(o) {
        		return (o.get("id") == orderId);
        	});
        }
    	return results.length > 0 ? results[0] : null; 
    }
    , getSelectedOrderItem: function(returnObject) {
    	var that = this;
        return M.ViewManager.getView(that.getPageToUse(), 'order').getSelection(returnObject);
    }
    , setSelectedOrder: function(order) {
    	var that = this;
    	var orderId = 0;
    	if (order && typeof(order) == "object") {
    		orderId = order.get("id");
    	}
		that.skipSetSelectionBy = true;
		if (order && that.getSelectedOrderItem() != orderId) {
			return that.setOrders(orderId);
		}
    }
    
    , getSelectedPosition: function() {
    	var that = this;
    	var posObj, posId;
    	var results = [];
        posObj = that.getSelectedPositionItem(YES);
        if (posObj) {
        	posId = posObj.value;
        	var results = _.filter(DigiWebApp.Position.find(), function(o) {
        		return (o.get("id") == posId);
        	});
        }
    	return results.length > 0 ? results[0] : null; 
    }
    , getSelectedPositionItem: function(returnObject) {
    	var that = this;
        return M.ViewManager.getView(that.getPageToUse(), 'position').getSelection(returnObject);
    }
    , setSelectedPosition: function(pos) {
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

		that.skipSetSelectionBy = true;

		if (that.getSelectedOrderItem() != orderId) {
			return that.setOrders(orderId, posId);
		}
		if (pos && that.getSelectedPositionItem() != posId) {
			return that.setPositions(posId);
		}
    }
    
    , getSelectedActivity: function() {
    	var that = this;
    	var actObj, actId;
    	var results = [];
    	actObj = that.getSelectedActivityItem(YES);
        if (actObj) {
        	actId = actObj.value;
        	var results = _.filter(DigiWebApp.Activity.find(), function(o) {
        		return (o.get("id") == actId);
        	});
        }
    	return results.length > 0 ? results[0] : null; 
    }
    , getSelectedActivityItem: function(returnObject) {
    	var that = this;
        return M.ViewManager.getView(that.getPageToUse(), 'activity').getSelection(returnObject);
    }
    , setSelectedActivity: function(act) {
    	var that = this;

    	var actId = 0;
    	var posId = that.getSelectedPositionItem();
    	var orderId = that.getSelectedOrderItem();
    	if (act && typeof(act) == "object") {
    		actId = act.get("id");
    	}
		
		that.skipSetSelectionBy = true;

		if (that.getSelectedOrderItem() != orderId) {
			return that.setOrders(orderId, posId, actId);
		}
		if (that.getSelectedPositionItem() != posId) {
			return that.setPositions(posId, actId);
		}
		if (act && that.getSelectedActivityItem() != actId) {
			return that.setActivities(YES, actId);
		}
    }
    
    , getPageToUse: function() {
    	var pageToUse = 'bookingPage';
    	if (typeof(DigiWebAppOrdinaryDesign.bookingPageWithIconsScholpp) !== "undefined") {
    		pageToUse = 'bookingPageWithIconsScholpp';
    	}
    	return pageToUse;
    }

});
