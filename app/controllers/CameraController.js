// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: DigiWebApp
// Controller: CameraController
// ==========================================================================
// manuell var-checked
DigiWebApp.CameraController = M.Controller.extend({

    // arrays for selection lists
      orders: null
    , positions: null
    , activities: null

    , selections: {
          order: null
        , position: null
        , activity: null
    }

	, loadedPicture: null
	, loadedFileName: null
	, fileType: null

    , init: function(isFirstLoad) {
		
        if (isFirstLoad) {
            /* do something here, when page is loaded the first time. */
        }
        /* do something, for any other load. */

        $('#' + DigiWebApp.CameraPage.content.remarkInput.id).val("");
        M.ViewManager.getView('cameraPage', 'remarkInput').value = "";
        
        if (DigiWebApp.CameraController.loadedPicture === null) {
        	var image = document.getElementById(DigiWebApp.CameraPage.content.image.id);
        	image.src = '';
        	DigiWebApp.CameraController.myImageObj = new Image();
        }

        if (     typeof navigator.camera !== 'undefined' 
      		  && typeof navigator.camera.getPicture !== 'undefined'
        	  && DigiWebApp.CameraController.loadedPicture === null
        ) {
        	DigiWebApp.CameraController.takePicture();
        } else {
        	// camera unavailable or loadedPicture is set
        	DigiWebApp.CameraController.useLoadedPicture();
        }

        if (DigiWebApp.BookingController.currentBooking) {
            DigiWebApp.CameraController.setSelectionByCurrentBooking();
        } else {
            DigiWebApp.CameraController.initSelection();
        }
        
        this.saveSelection();
    }

    , setSelectionByCurrentBooking: function() {
        var booking = DigiWebApp.BookingController.currentBooking;
        
        // get all items from local storage
        var orders = DigiWebApp.HandOrder.findSorted().concat(DigiWebApp.Order.findSorted()); // we need to check handOrders also
        var positions = DigiWebApp.Position.findSorted();
        var activities = DigiWebApp.CameraController.getActivities();

        // get the ids from the current booking
        var orderId = (booking.get('orderId') == "0" ? 0 : booking.get('orderId')) || booking.get('handOrderId'); // we need to check handOrders also
        var positionId = booking.get('positionId');
        var activityId = booking.get('activityId');

        
        /**
         * ORDERS
         */
        var orderArray = _.map(orders, function(order) {
            if (order.get('id') == orderId) {
                return { label: order.get('name'), value: order.get('id'), isSelected: YES };
            } else {
                return { label: order.get('name'), value: order.get('id') };
            }
        });
        orderArray = _.compact(orderArray);
        // push "Bitte wählen Option"
        orderArray.push({label: M.I18N.l('selectSomething'), value: '0'});

        
        /**
         * POSITIONS
         */
        var positionArray = _.map(positions, function(pos) {
            if (parseIntRadixTen(pos.get('orderId')) === parseIntRadixTen(orderId)) {
            	var obj = null;
                if (pos.get('id') == positionId) {
                    obj = { label: pos.get('name'), value: pos.get('id'), isSelected: YES };
                } else {
                    obj = { label: pos.get('name'), value: pos.get('id') };
                }
                return obj;
            }
            return null;
        });
        positionArray = _.compact(positionArray);
        // push "Bitte wählen Option"
        positionArray.push({label: M.I18N.l('selectSomething'), value: '0'});


        /**
         * ACTIVITIES
         */
        var workPlans = _.select(DigiWebApp.WorkPlan.find(), function(wp) {
            if (wp) return wp.get('id') == positionId;
        });

        var itemSelected = NO;

        /* if a workplan exists, only use those activities that are in the workplan */
        if (workPlans.length > 0) {
            activities = this.getActivitiesFromWorkplan(workPlans[0]);
        } else {
            activities = DigiWebApp.CameraController.getActivities();
        }

        var activityArray = _.map(activities, function(act) {
        	if ( typeof(act) === "undefined" ) {
        		console.log("UNDEFINED ACTIVITY");
        		return null;
        	} else {
        		var obj = null;
        		if (act.get('id') == activityId) {
        			obj = { label: act.get('name'), value: act.get('id'), isSelected: YES };
        			//console.log("ACTIVITY " + i + " = " + act.get('name') + " in setSelectionByCurrentBooking isSelected");
        			itemSelected = YES;
        		} else {
        			obj = { label: act.get('name'), value: act.get('id') };
        			//console.log("ACTIVITY " + i + " = " + act.get('name') + " in setSelectionByCurrentBooking");
        		}
        		return obj;
        	}
        });
        activityArray = _.compact(activityArray);
        activityArray.push({label: M.I18N.l('selectSomething'), value: '0', isSelected:!itemSelected});

        this.resetSelection();
        // set selection arrays to start content binding process
        this.set('orders', orderArray);
        this.set('positions', positionArray);
        this.set('activities', activityArray);
    }

    , setPositions: function() {
        var orderId = M.ViewManager.getView('cameraPage', 'order').getSelection(YES).value;
        if (!orderId) {
            return;
        }
//        M.ViewManager.getView('cameraPage', 'position').removeSelection(); /* to avoid bug of not setting selected... */
        var positions = DigiWebApp.Position.findSorted();

        var i = 0;
        positions = _.map(positions, function(pos) {
            if (pos.get('orderId') == orderId) {
                var obj = { label: pos.get('name'), value: pos.get('id') };
                if (i === 0) {
                    obj.isSelected = YES;
                }
                i += 1;
                return obj;
            }
            return null;
        });
        positions = _.compact(positions);/* remove falsy values from positions with _.compact() */

        if (positions.length < 1) {
            positions.push({label: M.I18N.l('noData'), value: '0'});
        }


        M.ViewManager.getView('cameraPage', 'position').resetSelection();
        this.set('positions', positions);
        this.setActivities(YES);

        this.saveSelection();
    }

    /* only set those activities that are related to the chosen position */
    , setActivities: function(checkForWorkPlan) {
        var posId = null;

        if (checkForWorkPlan) {
            var posObj = M.ViewManager.getView('cameraPage', 'position').getSelection(YES);
            if (posObj) {
                posId = posObj.value;
            }
        }

        var activities = [];
        //var workPlans = DigiWebApp.WorkPlan.find({query: 'id=' + posId}); // pre TMP-1.0
		//console.log("posId " + posId);
//        var workPlans = DigiWebApp.WorkPlan.find({ query: { 
//              identifier: 'id' 
//            , operator: '=' 
//            , value: posId 
//        }});
        var workPlans = []; 
        _.each(DigiWebApp.WorkPlan.find(),function(wp){
        	if (wp.get("id") == posId) workPlans.push(wp);
        });
        var i = 0;

        /* if a workplan exists, only use those activities that are in the workplan */
		//console.log("posId " + posId + ", workPlans.length " + workPlans.length);
        if (workPlans.length === 1) {
            activities = this.getActivitiesFromWorkplan(workPlans[0]);
        } else {
            activities = DigiWebApp.CameraController.getActivities();
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
				if ( act.get('id') == currentBookingActivityId ) { currentBookingActivitySelectable = true; }
			}
		});
		
        activities = _.map(activities, function(act) {
        	if ( typeof(act) === "undefined" ) {
        		console.log("UNDEFINED ACTIVITY");
        		return null;
        	} else {
        		var obj = null;
        		if (currentBookingActivitySelectable) {
        			obj = { label: act.get('name'), value: act.get('id'), isSelected: act.get('id') == currentBookingActivityId ? YES : NO };
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
            activities.push({label: M.I18N.l('selectSomething'), value: '0', isSelected:NO});
        } else {
            activities.push({label: M.I18N.l('noData'), value: '0'});
        }


        M.ViewManager.getView('cameraPage', 'activity').resetSelection();
        this.set('activities', activities);

        this.saveSelection();
    }

    , initSelection: function() {
       var orders = DigiWebApp.HandOrder.findSorted().concat(DigiWebApp.Order.findSorted()); // we need to check handOrders also
       var positions = DigiWebApp.Position.findSorted();
       var activities = DigiWebApp.CameraController.getActivities();

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
       orderArray.push({label: M.I18N.l('selectSomething'), value: '0', isSelected:YES});

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
       positionArray.push({label: M.I18N.l('selectSomething'), value: '0', isSelected:YES});

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
       activityArray.push({label: M.I18N.l('selectSomething'), value: '0', isSelected: YES});

        this.resetSelection();
        // set selection arrays to start content binding process
        this.set('orders', orderArray);
        this.set('positions', positionArray);
        this.set('activities', activityArray);
        M.ViewManager.getView('cameraPage', 'order').setSelection('0');
        M.ViewManager.getView('cameraPage', 'position').setSelection('0');
        M.ViewManager.getView('cameraPage', 'activity').setSelection('0');
    }
    
    , resetSelection: function() {
        M.ViewManager.getView('cameraPage', 'order').resetSelection();
        M.ViewManager.getView('cameraPage', 'position').resetSelection();
        M.ViewManager.getView('cameraPage', 'activity').resetSelection();
    }

    , isPositionSelected: function() {
        // implemented adjustment to M.SeletionListView to return null if no item is available
        var posObj = M.ViewManager.getView('cameraPage', 'position').getSelection(YES);
        if (posObj && posObj.value != "0") { // 'Bitte wählen' is not allowed to be chosen
            return YES;
        } else {
            return NO;
        }
    }

    , isActivitySelected: function() {
        var actObj = M.ViewManager.getView('cameraPage', 'activity').getSelection(YES);
        if (actObj && actObj.value != "0") { // 'Bitte wählen' is not allowed to be chosen
            return YES;
        } else {
            return NO;
        }
    }

    , saveSelection: function() {
        var orderValue = M.ViewManager.getView('cameraPage', 'order').getSelection();
        var positionValue = M.ViewManager.getView('cameraPage', 'position').getSelection();
        var activityValue = M.ViewManager.getView('cameraPage', 'activity').getSelection();

        this.selections.order = orderValue;
        this.selections.position = positionValue;
        this.selections.activity = activityValue;

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
	    	if(parseIntRadixTen(acti.get("positionId")) === 1) {
	            // normale Tätigkeit
	            return acti;
	         } else {
	            // Tätigkeit nur bei Arbeitsplan
	            return null;
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
            	activities.push(_.find(DigiWebApp.Activity.find(), function(act) {
            		return act.get('id') == actIds[i];
            	}));
//                activities.push(_.first(DigiWebApp.Activity.find({ query: {
//                      identifier: 'id' 
//                    , operator: '=' 
//                    , value: actIds[i] 
//                }})));
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
            			if (parseIntRadixTen(acti.get("positionId")) === 1) {
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

    , takePicture: function() {
    			navigator.camera.getPicture(
	    			  DigiWebApp.CameraController.cameraSuccessBase64
	    			, DigiWebApp.CameraController.cameraError
	    			, { 
    					  quality: 90
 	    				, allowEdit: true
 	    				//, destinationType : navigator.camera.DestinationType.DATA_URL
 	    				, destinationType: navigator.camera.DestinationType.FILE_URI
 	    				, encodingType: navigator.camera.EncodingType.PNG
 	    				, sourceType: navigator.camera.PictureSourceType.CAMERA 
 	    				, mediaType: navigator.camera.MediaType.PICTURE
 	    				, saveToPhotoAlbum: false
	    			  }
    			);    	
    }
    
    , useLoadedPicture: function() {
    	//console.log("useLoadedPicture");
    	//console.log(DigiWebApp.CameraController.loadedPicture);
    	var image = document.getElementById(DigiWebApp.CameraPage.content.image.id);
        image.src = DigiWebApp.CameraController.loadedPicture;
        DigiWebApp.CameraController.myImageObj = new Image();
        DigiWebApp.CameraController.myImageObj.src = DigiWebApp.CameraController.loadedPicture;
    }
    
    , savePicture: function() {
    	var that = this;
    	that.savePictureWithLocation(null);
    }
    
   
    , savePictureWithLocation: function(location) {
    	var that = this;
    	
    	that.saveSelection();
    	
		var orderId = M.ViewManager.getView('cameraPage', 'order').getSelection();
		
		var posObj = M.ViewManager.getView('cameraPage', 'position').getSelection(YES);
		var posId = posObj ? posObj.value : null;
	
		var actObj = M.ViewManager.getView('cameraPage', 'activity').getSelection(YES);
		var actId = actObj ? actObj.value : null;

	    var handOrderId = null;
	    var handOrderName = null;
	    if (DigiWebApp.BookingController.isHandOrder(orderId)) {
			handOrderId = orderId;
			handOrderName = _.select(DigiWebApp.HandOrder.findSorted(), function(ord) {
			    if (ord) return ord.get('id') == orderId || ord.get('name') == orderId;
			})[0].get('name');
			orderId = handOrderId;
	
			// a hand order has no position
			posId = null;
	    }

	    var lat = '0';
	    var lon = '0';
	    if (location) {
			if (location.latitude) {
			    lat = location.latitude;
			}
			if(location.longitude) {
			    lon = location.longitude;
			}
	    }

	    var myMediaFile = that.newMediaFile({
			  oId: orderId
			, hoId: handOrderId
			, hoName: handOrderName
			, lat: lat
			, lon: lon
			, pId: posId
			, aId: actId
			, mId: DigiWebApp.SettingsController.getSetting("mitarbeiterId")
    	});
	    
	    myMediaFile.setRemark(M.ViewManager.getView('cameraPage', 'remarkInput').value);
	    
	    var image = document.getElementById(DigiWebApp.CameraPage.content.image.id);

	    myMediaFile.set('fileType', DigiWebApp.CameraController.get("fileType"));
	    
    	var myOrderName = M.I18N.l('notDefined');
    	var myPositionName = M.I18N.l('notDefined');
    	var myActivityName = M.I18N.l('notDefined');
    	try {
			var myO_id = myMediaFile.get("orderId");
			var myHO_id = myMediaFile.get("handOrderId");
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
    	} catch(e1) { trackError(e1); }
    	try {
    		if (parseIntRadixTen(myMediaFile.get("positionId")) !== 0) {
    			myPositionName = _.find(DigiWebApp.Position.find(), function(p){ return parseIntRadixTen(p.get("id")) === parseIntRadixTen(myMediaFile.get("positionId"))}).get('name');
    		}
    	} catch(e2) { trackError(e2); }
    	try {
    		if (parseIntRadixTen(myMediaFile.get("activityId")) !== 0) {
    			myActivityName = _.find(DigiWebApp.Activity.find(), function(p){ return parseIntRadixTen(p.get("id")) === parseIntRadixTen(myMediaFile.get("activityId"))}).get('name');
    		}
    	} catch(e3) { trackError(e3); }
	    myMediaFile.set('orderName', myOrderName);
	    myMediaFile.set('positionName', myPositionName);
	    myMediaFile.set('activityName', myActivityName);

	    myMediaFile.save();
	    myMediaFile.saveToFile(image.src, DigiWebApp.NavigationController.backToMediaListPageTransition);

    }

    , newMediaFile: function(obj) {
        return DigiWebApp.MediaFile.createRecord({
              orderId: obj.oId ? obj.oId : '0'
            , handOrderId: obj.hoId ? obj.hoId : '0'
            , handOrderName: obj.hoName ? obj.hoName : '0'
            , latitude: obj.lat ? obj.lat : '0'
            , longitude: obj.lon ? obj.lon : '0'
            , positionId: obj.pId ? obj.pId : '0'
            , activityId: obj.aId ? obj.aId : '0'
            , mitarbeiterId: obj.mId ? obj.mId : '0'
            , icon: 'icon_takePicture.png'
            , timeStamp: +new Date()
        });
    }
    
    , myImageData: null
    , myImageObj: null
    , cameraSuccessBase64: function(imageData) {
    	//alert("success");
    	DigiWebApp.CameraController.myImageData = imageData;
        var image = document.getElementById(DigiWebApp.CameraPage.content.image.id);
        image.src = 'data:' + DigiWebApp.ApplicationController.CONSTImageFiletype + ',' + imageData;

        DigiWebApp.CameraController.myImageObj = new Image();
        DigiWebApp.CameraController.myImageObj.src = 'data:' + DigiWebApp.ApplicationController.CONSTImageFiletype + ',' + imageData;
        DigiWebApp.CameraController.set("fileType", DigiWebApp.ApplicationController.CONSTImageFiletype);

    }

    , myImageURI: null
    , cameraSuccessURI: function(imageURI) {
    	DigiWebApp.CameraController.myImageURI = imageURI;
        var image = document.getElementById(DigiWebApp.CameraPage.content.image.id);
        image.src = imageURI;
    }
    
    , cameraError: function(mymessage) {
    	DigiWebApp.NavigationController.backToMediaListPageTransition();
        DigiWebApp.ApplicationController.nativeAlertDialogView({
              title: 'ERROR'
            , message: mymessage
            , callbacks: {
	            confirm: {
	                  target: this
	                , action: function () {
	    				DigiWebApp.NavigationController.backToMediaListPageTransition();
		              }
		       }
		    }
        });
    }

});
