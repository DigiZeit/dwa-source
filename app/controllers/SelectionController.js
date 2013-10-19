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
        var mySelection = JSON.parse(JSON.stringify(that.selections));
        
        this.resetSelection();

        var orders = DigiWebApp.HandOrder.findSorted().concat(DigiWebApp.Order.findSorted()); // we need to check handOrders also
        //var positions = DigiWebApp.Position.findSorted();
        //var activities = DigiWebApp.SelectionController.getActivities();

        /**
         * ORDERS
         */
        var itemSelected = NO;
        var orderArray = _.map(orders, function(order) {
        	if (order) {
	            var obj =  { label: order.get('name'), value: order.get('id') };
	            if (obj.value === mySelection.order) {
	                obj.isSelected = YES;
	                itemSelected = YES;
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

        // set selection arrays to start content binding process
        this.set('orders', orderArray);
        this.setPositions();

        /**
         * POSITIONS
         */
        itemSelected = NO;
        var positionArray = _.map(this.get('positions'), function(pos) {
        	if (pos) {
	            var obj = { label: pos.label, value: pos.value };
	            if (obj.value === mySelection.position) {
	                obj.isSelected = YES;
	                itemSelected = YES;
	            }
	            return obj;
        	}
        });
        positionArray = _.compact(positionArray);
//        // push "Bitte wählen Option"
//        if (DigiWebApp.SettingsController.featureAvailable('419')) {
//            positionArray.push({label: M.I18N.l('position'), value: '0', isSelected:!itemSelected});
//        } else {
//            positionArray.push({label: M.I18N.l('selectSomething'), value: '0', isSelected:!itemSelected});
//        }

        // set selection arrays to start content binding process
        this.set('positions', positionArray);
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
	         * Scholpp-Spesen: Übrnachtungskennzeichen 
	         */
	        itemSelected = NO;
	        var uebernachtungskennzeichenScholppArray = _.map(that.uebernachtungskennzeichenScholpp, function(ueK) {
	        	if ( typeof(ueK) === "undefined" ) {
	        		console.log("UNDEFINED uebernachtungskennzeichenScholpp");
	        	} else {        	
	        		var obj = { label: ueK.label, value: ueK.value };
	        		if (obj.value === that.selections.uebernachtungskennzeichenScholpp) {
	        			obj.isSelected = YES;
	        			itemSelected = YES;
	        		}
	                return obj;
	        	}
	        });
	        uebernachtungskennzeichenScholppArray = _.compact(uebernachtungskennzeichenScholppArray);
	        this.set('uebernachtungskennzeichenScholpp', uebernachtungskennzeichenScholppArray);
		}
        
    	if (typeof(DigiWebAppOrdinaryDesign.bookingPageWithIconsScholpp) !== "undefined") { DigiWebApp.ScholppBookingController.resetButtons(); }
    	if (typeof(DigiWebAppOrdinaryDesign.bookingPageWithIconsScholpp) !== "undefined") {
    		var activitySelection = M.ViewManager.getView('bookingPageWithIconsScholpp', 'activity').getSelection(YES);
    		if (typeof(activitySelection) !== "undefined") {
	    		var activitySelected = DigiWebApp.Activity.find({query:{identifier: 'id', operator: '=', value: activitySelection.value}})[0];
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
        		if (i === 0 ) {
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
	        		if(parseInt(obj.value) === 6) { // select "- -"
	        			obj.isSelected = YES;
	        			itemSelected = YES;
	        		}
	                return obj;
	        	}
	        });
	        uebernachtungskennzeichenScholppArray = _.compact(uebernachtungskennzeichenScholppArray);
	        that.set('uebernachtungskennzeichenScholpp', uebernachtungskennzeichenScholppArray);
		}

        // set selection arrays to start content binding process
        this.set('orders', orderArray);
        this.set('positions', positionArray);
        this.set('activities', activityArray);
    	if (typeof(DigiWebAppOrdinaryDesign.bookingPageWithIconsScholpp) !== "undefined") {
            M.ViewManager.getView('bookingPageWithIconsScholpp', 'position').setSelection('0');
        	DigiWebApp.ScholppBookingController.resetButtons();
    	} else {
            M.ViewManager.getView('bookingPage', 'position').setSelection('0');
    	}
    	
    	if (typeof(DigiWebAppOrdinaryDesign.bookingPageWithIconsScholpp) !== "undefined") {
    		var activitySelection = M.ViewManager.getView('bookingPageWithIconsScholpp', 'activity').getSelection(YES);
    		if (typeof(activitySelection) !== "undefined") {
	    		var activitySelected = DigiWebApp.Activity.find({query:{identifier: 'id', operator: '=', value: activitySelection.value}})[0];
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
		    			DigiWebApp.ScholppBookingController.selectArbeitsende();
		    		}
	    		}
    		} else {
    			DigiWebApp.ScholppBookingController.selectArbeitsende();
    		}
    	}

    }

    , setSelectionByCurrentBooking: function() {

        this.resetSelection();

        var booking = DigiWebApp.BookingController.currentBooking;
        
        // get all items from local storage
        var orders = DigiWebApp.HandOrder.findSorted().concat(DigiWebApp.Order.findSorted()); // we need to check handOrders also
        //var positions = DigiWebApp.Position.findSorted();
        //var activities = DigiWebApp.SelectionController.getActivities();

        // get the ids from the current booking
        var orderId = (booking.get('orderId') == "0" ? 0 : booking.get('orderId')) || booking.get('handOrderId'); // we need to check handOrders also
        var positionId = booking.get('positionId');
        var activityId = booking.get('activityId');
        var uebernachtungAuswahl = booking.get('uebernachtungAuswahl');

        
        /**
         * ORDERS
         */
        var orderArray = _.map(orders, function(order) {
        	if (order) {
	            if(order.get('id') == orderId) {
	                return { label: order.get('name'), value: order.get('id'), isSelected: YES };
	            } else {
	                return { label: order.get('name'), value: order.get('id') };
	            }
        	}
        });
        orderArray = _.compact(orderArray);
        // push "Bitte wählen Option"
        if (DigiWebApp.SettingsController.featureAvailable('419')) {
        	orderArray.push({label: M.I18N.l('order'), value: '0', isSelected:!itemSelected});
        } else {
        	orderArray.push({label: M.I18N.l('selectSomething'), value: '0', isSelected:!itemSelected});
        }

        // set selection arrays to start content binding process
        this.set('orders', orderArray);
        this.setPositions();
        
        /**
         * POSITIONS
         */
        var positionArray = _.map(this.get('positions'), function(pos) {
        	if (pos) {
                if (pos.value === positionId) {
                    return { label: pos.label, value: pos.value, isSelected: YES };
                } else {
                	return { label: pos.label, value: pos.value };
                }
        	}
        });
        positionArray = _.compact(positionArray);
        // push "Bitte wählen Option"
        if (DigiWebApp.SettingsController.featureAvailable('419')) {
        	positionArray.push({label: M.I18N.l('position'), value: '0', isSelected:!itemSelected});
        } else {
        	positionArray.push({label: M.I18N.l('selectSomething'), value: '0', isSelected:!itemSelected});
        }

        // set selection arrays to start content binding process
        this.set('positions', positionArray);
        this.setActivities(YES);

        /**
         * ACTIVITIES
         */
        
//        var workPlans = _.select(DigiWebApp.WorkPlan.find(), function(wp) {
//            if (wp) return wp.get('id') == positionId;
//        });
//
//        /* if a workplan exists, only use those activities that are in the workplan */
//        if(workPlans.length > 0) {
//            activities = DigiWebApp.SelectionController.getActivitiesFromWorkplan(workPlans[0]);
//        } else {
//            activities = DigiWebApp.SelectionController.getActivities();
//        }

        var itemSelected = NO;
        var activityArray = _.map(this.get('activities'), function(act) {
        	if ( typeof(act) === "undefined" ) {
        		console.log("UNDEFINED ACTIVITY");
        		return null;
        	} else {
        		var obj = null;
        		if (act.value == activityId) {
        			obj = { label: act.label, value: act.value, isSelected: YES };
        			//console.log("ACTIVITY " + i + " = " + act.get('name') + " in setSelectionByCurrentBooking isSelected");
        			itemSelected = YES;
        		} else {
        			obj = { label: act.label, value: act.value };
        			//console.log("ACTIVITY " + i + " = " + act.get('name') + " in setSelectionByCurrentBooking");
        		}
        		return obj;
        	}
        });
        activityArray = _.compact(activityArray);
        if (DigiWebApp.SettingsController.featureAvailable('419')) {
        	activityArray.push({label: M.I18N.l('activity'), value: '0', isSelected:!itemSelected});
        } else {
        	activityArray.push({label: M.I18N.l('selectSomething'), value: '0', isSelected:!itemSelected});
        }

        // set selection arrays to start content binding process
        this.set('activities', activityArray);

    	if (typeof(DigiWebAppOrdinaryDesign.bookingPageWithIconsScholpp) !== "undefined") {
    		var activitySelection = M.ViewManager.getView('bookingPageWithIconsScholpp', 'activity').getSelection(YES);
    		if (typeof(activitySelection) !== "undefined") {
	    		var activitySelected = DigiWebApp.Activity.find({query:{identifier: 'id', operator: '=', value: activitySelection.value}})[0];
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
		    			DigiWebApp.ScholppBookingController.selectArbeitsende();
		    		}
	    		}
    		} else {
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
		}
        
    	//if (typeof(DigiWebAppOrdinaryDesign.bookingPageWithIconsScholpp) !== "undefined") { DigiWebApp.ScholppBookingController.resetButtons(); }
    }

    , setPositions: function() {
    	//alert("in setPositions");
    	var orderId;
    	if (typeof(DigiWebAppOrdinaryDesign.bookingPageWithIconsScholpp) !== "undefined") {
        	//alert("bookingPageWithIconsScholpp");
    		orderId = M.ViewManager.getView('bookingPageWithIconsScholpp', 'order').getSelection(YES).value;
    		M.ViewManager.getView('bookingPageWithIconsScholpp', 'uebernachtungskennzeichen').resetSelection();
    		M.ViewManager.getView('bookingPageWithIconsScholpp', 'uebernachtungskennzeichen').setSelection('6');
    		//alert(M.ViewManager.getView('bookingPageWithIconsScholpp', 'uebernachtungskennzeichen').getSelection(YES).value);
    	} else {
    		orderId = M.ViewManager.getView('bookingPage', 'order').getSelection(YES).value;
    	}
        if (!orderId) {
            return;
        }
        
		if (DigiWebApp.SettingsController.featureAvailable('406') && DigiWebApp.SettingsController.getSetting("auftragsDetailsKoppeln")) {
			if (typeof(M.ViewManager.getView('orderInfoPage', 'order').getSelection()) === "undefined") {
				DigiWebApp.OrderInfoController.init();
			}
			M.ViewManager.getView('orderInfoPage', 'order').setSelection(orderId);
			DigiWebApp.OrderInfoController.setPositions();
			DigiWebApp.OrderInfoController.setItem();
		}

//        M.ViewManager.getView('bookingPage', 'position').removeSelection(); /* to avoid bug of not setting selected... */
        var positions = DigiWebApp.Position.findSorted();

        var i = 0;
        positions = _.map(positions, function(pos) {
        	if (pos) {
	            if(pos.get('orderId') === orderId) {
	                var obj = { label: pos.get('name'), value: pos.get('id') };
	                if(i === 0) {
	                    obj.isSelected = YES;
	                }
	                i += 1;
	                return obj;
	            }
	            return null;
        	}
        });
        positions = _.compact(positions);/* remove falsy values from positions with _.compact() */

        if (positions.length < 1) {
            positions.push({label: M.I18N.l('noData'), value: '0'});
        }

    	if (typeof(DigiWebAppOrdinaryDesign.bookingPageWithIconsScholpp) !== "undefined") {
    		M.ViewManager.getView('bookingPageWithIconsScholpp', 'position').resetSelection();
    	} else {
    		M.ViewManager.getView('bookingPage', 'position').resetSelection();
    	}
        this.set('positions', positions);
        this.setActivities(YES);

        this.saveSelection();
    }

    /* only set those activities that are related to the chosen position */
    , setActivities: function(checkForWorkPlan) {
        var posId = null;

        var activities = [];

        var posObj;
		if (checkForWorkPlan) {
        	if (typeof(DigiWebAppOrdinaryDesign.bookingPageWithIconsScholpp) !== "undefined") {
                posObj = M.ViewManager.getView('bookingPageWithIconsScholpp', 'position').getSelection(YES);
        	} else {
                posObj = M.ViewManager.getView('bookingPage', 'position').getSelection(YES);
        	}
            if (posObj) {
                posId = posObj.value;
            }
        }
		if (posId) {
			if (DigiWebApp.SettingsController.featureAvailable('406') && DigiWebApp.SettingsController.getSetting("auftragsDetailsKoppeln")) {
				if (typeof(M.ViewManager.getView('orderInfoPage', 'position').getSelection()) === "undefined") {
					DigiWebApp.OrderInfoController.init();
				}
				M.ViewManager.getView('orderInfoPage', 'position').setSelection(posId);
				DigiWebApp.OrderInfoController.setItem();
			}
	
	        //var workPlans = DigiWebApp.WorkPlan.find({query: 'id=' + posId}); // pre TMP-1.0
			//console.log("posId " + posId);
	        var workPlans = DigiWebApp.WorkPlan.find({ query: { 
	              identifier: 'id' 
	            , operator: '=' 
	            , value: posId 
	        }});
	        var i = 0;
	
	        /* if a workplan exists, only use those activities that are in the workplan */
			//console.log("posId " + posId + ", workPlans.length " + workPlans.length);
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
				if ( act.get('id') === currentBookingActivityId ) { currentBookingActivitySelectable = true; }
			}
		});
		
        activities = _.map(activities, function(act) {
        	if ( typeof(act) === "undefined" ) {
        		console.log("UNDEFINED ACTIVITY");
        		return null;
        	} else {
        		var obj = null;
        		if (currentBookingActivitySelectable) {
        			obj = { label: act.get('name'), value: act.get('id'), isSelected: act.get('id') === currentBookingActivityId ? YES : NO };
        		} else {
        			obj = { label: act.get('name'), value: act.get('id'), isSelected: i === 0 ? YES : NO };
        		}
        		//console.log("ACTIVITY " + i + " = " + act.get('name') + " in setActivities");
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
            M.ViewManager.getView('bookingPage', 'activity').resetSelection();
            this.set('activities', activities);
    	}

        this.saveSelection();
    }

    , initSelection: function() {
       var orders = DigiWebApp.HandOrder.findSorted().concat(DigiWebApp.Order.findSorted()); // we need to check handOrders also
       var positions = DigiWebApp.Position.findSorted();
       var activities = DigiWebApp.SelectionController.getActivities();

       /**
        * ORDERS
        */

       // create order selection
       var orderArray = [];
       if (orders) {
           orderArray = _.map(orders, function(order) {
        	   if (order) return { label: order.get('name'), value: order.get('id') };
           });
       }
       // push "Bitte wählen Option"
       if (DigiWebApp.SettingsController.featureAvailable('419')) {
    	   orderArray.push({label: M.I18N.l('order'), value: '0', isSelected:YES});
       } else {
    	   orderArray.push({label: M.I18N.l('selectSomething'), value: '0', isSelected:YES});
       }

       /**
        * POSITIONS
        */

       // create position selection
       var positionArray = [];
       if (positions) {
           positionArray = _.map(positions, function(pos) {
        	   if (pos) return { label: pos.get('name'), value: pos.get('id') };
           });
       }
       // push "Bitte wählen Option"
       if (DigiWebApp.SettingsController.featureAvailable('419')) {
    	   positionArray.push({label: M.I18N.l('position'), value: '0', isSelected:YES});
       } else {
    	   positionArray.push({label: M.I18N.l('selectSomething'), value: '0', isSelected:YES});
       }

       /**
        * ACTIVITIES
        */
       var activityArray = [];
       if (activities) {
            activityArray = _.map(activities, function(act) {
            	if ( typeof(act) === "undefined" ) {
            		console.log("UNDEFINED ACTIVITY");
            		return null;
            	} else {
            		return { label: act.get('name'), value: act.get('id') };
            	}
           });
       }
       // push "Bitte wählen Option"
       if (DigiWebApp.SettingsController.featureAvailable('419')) {
    	   activityArray.push({label: M.I18N.l('activity'), value: '0', isSelected:YES});
       } else {
    	   activityArray.push({label: M.I18N.l('selectSomething'), value: '0', isSelected:YES});
       }

        this.resetSelection();
        // set selection arrays to start content binding process
        this.set('orders', orderArray);
        this.set('positions', positionArray);
        this.set('activities', activityArray);
        try {
        	if (typeof(DigiWebAppOrdinaryDesign.bookingPageWithIconsScholpp) !== "undefined") {
            	M.ViewManager.getView('bookingPageWithIconsScholpp', 'uebernachtungskennzeichen').setSelection('6');
            	M.ViewManager.getView('bookingPageWithIconsScholpp', 'order').setSelection('0');
            	M.ViewManager.getView('bookingPageWithIconsScholpp', 'position').setSelection('0');
            	M.ViewManager.getView('bookingPageWithIconsScholpp', 'activity').setSelection('0');
            	DigiWebApp.ScholppBookingController.resetButtons();
        	} else {
            	M.ViewManager.getView('bookingPage', 'order').setSelection('0');
            	M.ViewManager.getView('bookingPage', 'position').setSelection('0');
            	M.ViewManager.getView('bookingPage', 'activity').setSelection('0');
        	}
    	} catch(e) { console.error(e); }
    }

    , resetSelection: function() {
    	try {
        	if (typeof(DigiWebAppOrdinaryDesign.bookingPageWithIconsScholpp) !== "undefined") {
        		M.ViewManager.getView('bookingPageWithIconsScholpp', 'uebernachtungskennzeichen').resetSelection();
        		M.ViewManager.getView('bookingPageWithIconsScholpp', 'uebernachtungskennzeichen').setSelection('6');
        		M.ViewManager.getView('bookingPageWithIconsScholpp', 'order').resetSelection();
        		M.ViewManager.getView('bookingPageWithIconsScholpp', 'position').resetSelection();
        		M.ViewManager.getView('bookingPageWithIconsScholpp', 'activity').resetSelection();
        	} else {
        		M.ViewManager.getView('bookingPage', 'order').resetSelection();
        		M.ViewManager.getView('bookingPage', 'position').resetSelection();
        		M.ViewManager.getView('bookingPage', 'activity').resetSelection();
        	}
    	} catch(e) { console.error(e); }
    }

    , isPositionSelected: function() {
        // implemented adjustment to M.SeletionListView to return null if no item is available
    	var posObj;
    	if (typeof(DigiWebAppOrdinaryDesign.bookingPageWithIconsScholpp) !== "undefined") {
            posObj = M.ViewManager.getView('bookingPageWithIconsScholpp', 'position').getSelection(YES);
    	} else {
            posObj = M.ViewManager.getView('bookingPage', 'position').getSelection(YES);
    	}
        if (posObj && posObj.value != "0") { // 'Bitte wählen' is not allowed to be chosen
            return YES;
        } else {
            return NO;
        }
    }

    , isActivitySelected: function() {
    	var actObj;
    	if (typeof(DigiWebAppOrdinaryDesign.bookingPageWithIconsScholpp) !== "undefined") {
            actObj = M.ViewManager.getView('bookingPageWithIconsScholpp', 'activity').getSelection(YES);
    	} else {
            actObj = M.ViewManager.getView('bookingPage', 'activity').getSelection(YES);
    	}
        if (actObj && actObj.value != "0") { // 'Bitte wählen' is not allowed to be chosen
            return YES;
        } else {
            return NO;
        }
    }

    , saveSelection: function() {
    	if (typeof(DigiWebAppOrdinaryDesign.bookingPageWithIconsScholpp) !== "undefined") {
            var orderValue = M.ViewManager.getView('bookingPageWithIconsScholpp', 'order').getSelection();
            var positionValue = M.ViewManager.getView('bookingPageWithIconsScholpp', 'position').getSelection();
            var activityValue = M.ViewManager.getView('bookingPageWithIconsScholpp', 'activity').getSelection();
            var uebernachtungskennzeichenScholppValue = M.ViewManager.getView('bookingPageWithIconsScholpp', 'uebernachtungskennzeichen').getSelection();
            var spesenkennzeichenScholppValue = M.ViewManager.getView('bookingPageWithIconsScholpp', 'spesenkennzeichen').getSelection();
    	} else {
            var orderValue = M.ViewManager.getView('bookingPage', 'order').getSelection();
            var positionValue = M.ViewManager.getView('bookingPage', 'position').getSelection();
            var activityValue = M.ViewManager.getView('bookingPage', 'activity').getSelection();
    	}

        this.selections.order = orderValue;
        this.selections.position = positionValue;
        this.selections.activity = activityValue;
        this.selections.uebernachtungskennzeichenScholpp = uebernachtungskennzeichenScholppValue;
        this.selections.spesenkennzeichenScholpp = spesenkennzeichenScholppValue;

        this.useSelections = YES;
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
		    	if(acti.get("positionId") === "1") {
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
            for (var i = 0; i < actIds.length; i++) {
                activities.push(_.first(DigiWebApp.Activity.find({ query: {
                    identifier: 'id', 
                    operator: '=', 
                    value: actIds[i] 
                }})));
            }

        }
        if (workplan.get("workplanType") === "1") {
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
            			if (act.get("id") === acti.get("id") && acti.get("positionId") === "1") {
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
        };
        activities = _.compact(activities);
        return activities;
    }

});
