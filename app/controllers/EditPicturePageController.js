// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: DigiWebApp
// Controller: EditPicturePageController
// ==========================================================================
// manuell var-checked
DigiWebApp.EditPicturePageController = M.Controller.extend({

  // MediaFile das bearbeitet werden soll
	myMediaFile: null 
	
  // arrays for selection lists
  , orders: null
  , positions: null
  , activities: null

  , selections: {
        order: null
      , position: null
      , activity: null
  }

  , deleteMediaFileFromLocalStorage: function() {
	  var that = this;
	  var myMediaFile = that.myMediaFile;
	  //console.log(myMediaFile);
	  try {
		  myMediaFile.del();
	  } catch(e2) { console.error(e2); }
	  DigiWebApp.ApplicationController.DigiLoaderView.hide();
	  DigiWebApp.NavigationController.backToMediaListPageTransition();
  }

  , init: function(isFirstLoad) {
	  var that = this;
		
      if (isFirstLoad) {
          /* do something here, when page is loaded the first time. */
      }

	  $('#' + DigiWebApp.EditPicturePage.content.remarkInput.id).val("");
	  M.ViewManager.getView('editPicturePage', 'remarkInput').value = "";
	  $('#' + DigiWebApp.EditPicturePage.content.remarkInput.id).val(that.myMediaFile.get('remark'));
	  M.ViewManager.getView('editPicturePage', 'remarkInput').value = that.myMediaFile.get('remark');

      var image = document.getElementById(DigiWebApp.EditPicturePage.content.image.id);
      image.src = '';
      DigiWebApp.EditPicturePageController.myImageObj = new Image();
      that.myMediaFile.readFromFile(function(fileContent){
			if (fileContent && (fileContent !== "")) {
			      var image = document.getElementById(DigiWebApp.EditPicturePage.content.image.id);
			      image.src = fileContent;
			}
	  }, function() {
	      var image = document.getElementById(DigiWebApp.EditPicturePage.content.image.id);
	      image.src = '';
	  });

      /* do something, for any other load. */
      
      $('#' + DigiWebApp.EditPicturePage.content.savePictureGrid.id).show();
      DigiWebApp.EditPicturePageController.setSelectionByMediaFile();
	  DigiWebApp.ApplicationController.DigiLoaderView.hide();
}

  , setSelectionByMediaFile: function() {
	  var that = this;
      
      // get all items from local storage
      var orders = DigiWebApp.HandOrder.findSorted().concat(DigiWebApp.Order.findSorted()); // we need to check handOrders also
      var positions = DigiWebApp.Position.findSorted();
      var activities = DigiWebApp.EditPicturePageController.getActivities();

      // get the ids from the current MediaFile
      var orderId    = that.myMediaFile.get('orderId');
      var positionId = that.myMediaFile.get('positionId');
      var activityId = that.myMediaFile.get('activityId');
      
      /**
       * ORDERS
       */
      var orderFound = NO;
      var orderArray = null;
      var orderTempArray = _.map(orders, function(order) {
   		  var obj = null;
       	  if (order) {
	          if(order.get('id') == orderId) {
	              obj = { label: order.get('name'), value: order.get('id'), isSelected: YES };
	              orderFound = YES;
	          } else {
	        	  obj = { label: order.get('name'), value: order.get('id') };
	          }
       	  }
          return obj;
      });
      orderTempArray = _.compact(orderTempArray);
      // push "Bitte wählen Option"
      orderTempArray.push({label: M.I18N.l('selectSomething'), value: '0'});

      if (orderFound === NO) {
	      var orderTemp2Array = _.map(orderTempArray, function(order) {
	       	  var obj = null;
	       	  if (order) {
		          if(order.value == orderId) {
		              obj = { label: order.label, value: order.value, isSelected: YES };
		          } else {
		        	  obj = { label: order.label, value: order.value };
		          }
	       	  }
	          return obj;
	      });
	      orderArray = orderTemp2Array;
      } else {
    	  orderArray = orderTempArray;
      }
      orderArray = _.compact(orderArray);

      
      /**
       * POSITIONS
       */
      var positionArray = _.map(positions, function(pos) {
    	if (pos) {
          if (pos.get('orderId') === orderId) {
          	var obj = null;
              if (pos.get('id') === positionId) {
                  obj = { label: pos.get('name'), value: pos.get('id'), isSelected: YES };
              } else {
                  obj = { label: pos.get('name'), value: pos.get('id') };
              }
              return obj;
            }
          return null;
        }
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
          activities = DigiWebApp.EditPicturePageController.getActivities();
      }

      var activityArray = _.map(activities, function(act) {
      	if ( typeof(act) === "undefined" ) {
      		console.log("UNDEFINED ACTIVITY");
      		return null;
      	} else {
      		var obj = null;
      		if(act.get('id') == activityId) {
      			obj = { label: act.get('name'), value: act.get('id'), isSelected: YES };
      			//console.log("ACTIVITY " + i + " = " + act.get('name') + " in setSelectionByMediaFile isSelected");
      			itemSelected = YES;
      		} else {
      			obj = { label: act.get('name'), value: act.get('id') };
      			//console.log("ACTIVITY " + i + " = " + act.get('name') + " in setSelectionByMediaFile");
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
      var orderId = M.ViewManager.getView('editPicturePage', 'order').getSelection(YES).value;
      if (!orderId) {
          return;
      }
//      M.ViewManager.getView('editPicturePage', 'position').removeSelection(); /* to avoid bug of not setting selected... */
      var positions = DigiWebApp.Position.findSorted();

      var i = 0;
      positions = _.map(positions, function(pos) {
    	  if (pos) {
	          if (pos.get('orderId') === orderId) {
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

      M.ViewManager.getView('editPicturePage', 'position').resetSelection();
      this.set('positions', positions);
      this.setActivities(YES);

      this.saveSelection();
  }

  /* only set those activities that are related to the chosen position */
  , setActivities: function(checkForWorkPlan) {
      var posId = null;

      if (checkForWorkPlan) {
          var posObj = M.ViewManager.getView('editPicturePage', 'position').getSelection(YES);
          if(posObj) {
              posId = posObj.value;
          }
      }

      var activities = [];
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
          activities = this.getActivitiesFromWorkplan(workPlans[0]);
      } else {
          activities = DigiWebApp.EditPicturePageController.getActivities();
      }

      var currentBookingActivityId = -1;
//      if ( typeof(DigiWebApp.BookingController.currentBooking) !== "undefined" && DigiWebApp.BookingController.currentBooking !== null ) { 
//      	currentBookingActivityId = DigiWebApp.BookingController.currentBooking.get('activityId');
//      }
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
          activities.push({label: M.I18N.l('selectSomething'), value: '0', isSelected:NO});
      } else {
          activities.push({label: M.I18N.l('noData'), value: '0'});
      }


      M.ViewManager.getView('editPicturePage', 'activity').resetSelection();
      this.set('activities', activities);

      this.saveSelection();
  }

  , initSelection: function() {
     var orders = DigiWebApp.HandOrder.findSorted().concat(DigiWebApp.Order.findSorted()); // we need to check handOrders also
     var positions = DigiWebApp.Position.findSorted();
     var activities = DigiWebApp.EditPicturePageController.getActivities();

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
          		return obj = { label: act.get('name'), value: act.get('id') };
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
      M.ViewManager.getView('editPicturePage', 'order').setSelection('0');
      M.ViewManager.getView('editPicturePage', 'position').setSelection('0');
      M.ViewManager.getView('editPicturePage', 'activity').setSelection('0');
  }
  
  , resetSelection: function() {
      M.ViewManager.getView('editPicturePage', 'order').resetSelection();
      M.ViewManager.getView('editPicturePage', 'position').resetSelection();
      M.ViewManager.getView('editPicturePage', 'activity').resetSelection();
  }

  , isPositionSelected: function() {
      // implemented adjustment to M.SeletionListView to return null if no item is available
      var posObj = M.ViewManager.getView('editPicturePage', 'position').getSelection(YES);
      if (posObj && posObj.value != "0") { // 'Bitte wählen' is not allowed to be chosen
          return YES;
      } else {
          return NO;
      }
  }

  , isActivitySelected: function() {
      var actObj = M.ViewManager.getView('editPicturePage', 'activity').getSelection(YES);
      if (actObj && actObj.value != "0") { // 'Bitte wählen' is not allowed to be chosen
          return YES;
      } else {
          return NO;
      }
  }

  , saveSelection: function() {
      var orderValue = M.ViewManager.getView('editPicturePage', 'order').getSelection();
      var positionValue = M.ViewManager.getView('editPicturePage', 'position').getSelection();
      var activityValue = M.ViewManager.getView('editPicturePage', 'activity').getSelection();

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
	    	if(parseInt(acti.get("positionId")) === 1) {
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
              activities.push(_.first(DigiWebApp.Activity.find({ query: {
                    identifier: 'id' 
                  , operator: '=' 
                  , value: actIds[i] 
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
          			if (acti.get("positionId") === "1") {
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

  , savePicture: function() {
  	var that = this;
  	
  	that.saveSelection();
  	
		var orderId = M.ViewManager.getView('editPicturePage', 'order').getSelection();
		
		var posObj = M.ViewManager.getView('editPicturePage', 'position').getSelection(YES);
		var posId = posObj ? posObj.value : null;
	
		var actObj = M.ViewManager.getView('editPicturePage', 'activity').getSelection(YES);
		var actId = actObj ? actObj.value : null;

	    var handOrderId = null;
	    var handOrderName = null;
	    if (DigiWebApp.BookingController.isHandOrder(orderId)) {
			handOrderId = orderId;
			handOrderName = _.select(DigiWebApp.HandOrder.findSorted(), function(ord) {
			    if (ord) return ord.get('id') === orderId || ord.get('name') === orderId;
			})[0].get('name');
			orderId = handOrderId;
	
			// a hand order has no position
			posId = null;
	    }

	    var myMediaFile = that.myMediaFile;
		myMediaFile.set('orderId', orderId);
		myMediaFile.set('handOrderId', handOrderId);
		myMediaFile.set('handOrderName', handOrderName);
		myMediaFile.set('positionId', posId);
		myMediaFile.set('activityId', actId);
		myMediaFile.set('remark', M.ViewManager.getView('editPicturePage', 'remarkInput').value);
	    
	    var image = document.getElementById(DigiWebApp.EditPicturePage.content.image.id);

	    myMediaFile.set('fileType', DigiWebApp.ApplicationController.CONSTImageFiletype);
	    myMediaFile.save();
	    myMediaFile.saveToFile(image.src, function() {
		      DigiWebApp.ApplicationController.DigiLoaderView.hide();
		      DigiWebApp.NavigationController.backToMediaListPageTransition();
	    });

  }

//  , paintMoveEvent: null
//  
//  , paintOnCanvasStopPaint: function(ev) {
//  	//console.log("paintOnCanvasStopPaint");    	
//  	ev.preventDefault();
//  	
//  	//context = document.getElementById(DigiWebApp.EditPicturePage.content.imageContainer.imageCanvas.id).getContext("2d");
//  	//context.stroke();
//
//		$('#' + DigiWebApp.EditPicturePage.content.imageContainer.imageCanvas.id).unbind('touchmove', DigiWebApp.EditPicturePageController.paintOnCanvasPaint);    	
//		$('#' + DigiWebApp.EditPicturePage.content.imageContainer.imageCanvas.id).unbind('mousemove', DigiWebApp.EditPicturePageController.paintOnCanvasPaint);    	
//		$('#' + DigiWebApp.EditPicturePage.content.imageContainer.imageCanvas.id).unbind('touchstop', DigiWebApp.EditPicturePageController.paintOnCanvasStopPaint);
//		$('#' + DigiWebApp.EditPicturePage.content.imageContainer.imageCanvas.id).unbind('mouseup',   DigiWebApp.EditPicturePageController.paintOnCanvasStopPaint);
//  }
//  
//  , paintOnCanvasStartMove: function(ev) {
//  	console.log("paintOnCanvasStartMove");
//  	ev.preventDefault();
//  	//ev.stopPropagation();
//  	
//  	var canvas = document.getElementById(DigiWebApp.EditPicturePage.content.imageContainer.imageCanvas.id);
//
//  	if (canvas.getContext) {
//  		DigiWebApp.EditPicturePageController.myImageTouchPos = DigiWebApp.EditPicturePageController.getCoordinates(ev);
//	
//  		$('#' + DigiWebApp.EditPicturePage.content.imageContainer.imageCanvas.id).unbind('touchmove', DigiWebApp.EditPicturePageController.paintOnCanvasMove);    	
//  		$('#' + DigiWebApp.EditPicturePage.content.imageContainer.imageCanvas.id).unbind('mousemove', DigiWebApp.EditPicturePageController.paintOnCanvasMove);    	
//  		$('#' + DigiWebApp.EditPicturePage.content.imageContainer.imageCanvas.id).unbind('touchstop', DigiWebApp.EditPicturePageController.paintOnCanvasStopMove);
//  		$('#' + DigiWebApp.EditPicturePage.content.imageContainer.imageCanvas.id).unbind('mouseup',   DigiWebApp.EditPicturePageController.paintOnCanvasStopMove);
//	    	$('#' + DigiWebApp.EditPicturePage.content.imageContainer.imageCanvas.id).bind('touchmove', DigiWebApp.EditPicturePageController.paintOnCanvasMove);
//			$('#' + DigiWebApp.EditPicturePage.content.imageContainer.imageCanvas.id).bind('mousemove', DigiWebApp.EditPicturePageController.paintOnCanvasMove);
//			$('#' + DigiWebApp.EditPicturePage.content.imageContainer.imageCanvas.id).bind('touchstop', DigiWebApp.EditPicturePageController.paintOnCanvasStopMove);
//			$('#' + DigiWebApp.EditPicturePage.content.imageContainer.imageCanvas.id).bind('mouseup',   DigiWebApp.EditPicturePageController.paintOnCanvasStopMove);
//  	}
//  }
//  
//  , paintOnCanvasStopMove: function(ev) {
//  	console.log("paintOnCanvasStopMove");    	
//  	ev.preventDefault();
//  	//ev.stopPropagation();
//		DigiWebApp.EditPicturePageController.myImageTouchPos = [0, 0];
//		$('#' + DigiWebApp.EditPicturePage.content.imageContainer.imageCanvas.id).unbind('touchmove', DigiWebApp.EditPicturePageController.paintOnCanvasMove);    	
//		$('#' + DigiWebApp.EditPicturePage.content.imageContainer.imageCanvas.id).unbind('mousemove', DigiWebApp.EditPicturePageController.paintOnCanvasMove);    	
//		$('#' + DigiWebApp.EditPicturePage.content.imageContainer.imageCanvas.id).unbind('touchstop', DigiWebApp.EditPicturePageController.paintOnCanvasStopMove);
//		$('#' + DigiWebApp.EditPicturePage.content.imageContainer.imageCanvas.id).unbind('mouseup',   DigiWebApp.EditPicturePageController.paintOnCanvasStopMove);
//  }
//  
//  , myImageTouchPos: [0, 0]
//  , myImageTopLeft: [0, 0]
//  , myImageBottomRight: [0, 0]
//  , myImageScaleFactor: 2
//  , paintOnCanvasMove: function(ev) {
//  	console.log("paintOnCanvasMove");    	
//  	ev.preventDefault();
//  	//ev.stopPropagation();
//
//  	var image = document.getElementById(DigiWebApp.EditPicturePage.content.image.id);
//      var canvas = document.getElementById(DigiWebApp.EditPicturePage.content.imageContainer.imageCanvas.id);
//
//  	if (canvas.getContext) {
//  		var coord = DigiWebApp.EditPicturePageController.getCoordinates(ev);
//			var x = coord[0];
//			var y = coord[1];
//			var dx = DigiWebApp.EditPicturePageController.myImageTouchPos[0] - coord[0];
//			var dy = DigiWebApp.EditPicturePageController.myImageTouchPos[1] - coord[1];
//			//console.log(dx + ", " + dy);
//			DigiWebApp.EditPicturePageController.myImageTouchPos[0] = coord[0];
//			DigiWebApp.EditPicturePageController.myImageTouchPos[1] = coord[1];
//			//console.log("DigiWebApp.EditPicturePageController.myImageTouchPos " + DigiWebApp.EditPicturePageController.myImageTouchPos[0] + ", " + DigiWebApp.EditPicturePageController.myImageTouchPos[1]);
//			var context = canvas.getContext("2d");
//			if ((DigiWebApp.EditPicturePageController.myImageTopLeft[0] + dx) > 0 && (DigiWebApp.EditPicturePageController.myImageTopLeft[0] + dx) < image.width) {
//	    		DigiWebApp.EditPicturePageController.myImageTopLeft[0] = DigiWebApp.EditPicturePageController.myImageTopLeft[0] + dx;
//	    		//DigiWebApp.EditPicturePageController.myImageBottomRight[0] = DigiWebApp.EditPicturePageController.myImageBottomRight[0] + dx;
//			}
//			if ((DigiWebApp.EditPicturePageController.myImageTopLeft[1] + dy) > 0 && (DigiWebApp.EditPicturePageController.myImageTopLeft[1] + dy) < image.height) {
//	    		DigiWebApp.EditPicturePageController.myImageTopLeft[1] = DigiWebApp.EditPicturePageController.myImageTopLeft[1] + dy;
//	    		//DigiWebApp.EditPicturePageController.myImageBottomRight[1] = DigiWebApp.EditPicturePageController.myImageBottomRight[1] + dy;
//			}
//  				
//  		context.drawImage(image,DigiWebApp.EditPicturePageController.myImageTopLeft[0],DigiWebApp.EditPicturePageController.myImageTopLeft[1],canvas.width * DigiWebApp.EditPicturePageController.myImageScaleFactor,canvas.height * DigiWebApp.EditPicturePageController.myImageScaleFactor,0,0,canvas.width,canvas.height);
//  	}
//  }
//  
//  , paintOnCanvasStartPaint: function(ev) {
//  	//console.log("paintOnCanvasStartPaint");    	
//  	ev.preventDefault();
//  	//ev.stopPropagation();
//  	
//  	var canvas = document.getElementById(DigiWebApp.EditPicturePage.content.imageContainer.imageCanvas.id);
//
//  	if (canvas.getContext) {
//  		var coord = DigiWebApp.EditPicturePageController.getCoordinates(ev);
//			var x = coord[0];
//			var y = coord[1];
//	
//	    	var context = canvas.getContext("2d");
//			context.beginPath();
//			context.strokeStyle = "#f00";
//			context.lineWidth = 5;
//			context.lineCap = "round";
//			context.lineJoin = "round";
//			context.moveTo(x, y);
//	
//	    	$('#' + DigiWebApp.EditPicturePage.content.imageContainer.imageCanvas.id).unbind('touchmove', DigiWebApp.EditPicturePageController.paintOnCanvasPaint);
//			$('#' + DigiWebApp.EditPicturePage.content.imageContainer.imageCanvas.id).unbind('mousemove', DigiWebApp.EditPicturePageController.paintOnCanvasPaint);
//			$('#' + DigiWebApp.EditPicturePage.content.imageContainer.imageCanvas.id).unbind('touchstop', DigiWebApp.EditPicturePageController.paintOnCanvasStopPaint);
//			$('#' + DigiWebApp.EditPicturePage.content.imageContainer.imageCanvas.id).unbind('mouseup',   DigiWebApp.EditPicturePageController.paintOnCanvasStopPaint);
//	    	$('#' + DigiWebApp.EditPicturePage.content.imageContainer.imageCanvas.id).bind('touchmove', DigiWebApp.EditPicturePageController.paintOnCanvasPaint);
//			$('#' + DigiWebApp.EditPicturePage.content.imageContainer.imageCanvas.id).bind('mousemove', DigiWebApp.EditPicturePageController.paintOnCanvasPaint);
//			$('#' + DigiWebApp.EditPicturePage.content.imageContainer.imageCanvas.id).bind('touchstop', DigiWebApp.EditPicturePageController.paintOnCanvasStopPaint);
//			$('#' + DigiWebApp.EditPicturePage.content.imageContainer.imageCanvas.id).bind('mouseup',   DigiWebApp.EditPicturePageController.paintOnCanvasStopPaint);
//  	}
//  }
//  
//  , getCoordinates: function(ev) {
//  	var x = 0;
//  	var y = 0;
//		// Get the mouse position relative to the canvas element.
//      if (typeof(ev.touches) !== "undefined") {
//      	//console.log("touchstart: using ev.touches[0]");
//      	x = ev.touches[0].pageX - ev.touches[0].target.offsetLeft;
//      	y = ev.touches[0].pageY - ev.touches[0].target.offsetTop;
//      } else if (typeof(ev.originalEvent) !== "undefined") {
//  		if (typeof(ev.originalEvent.touches) !== "undefined") {
//      		x = ev.originalEvent.touches[0].pageX - ev.originalEvent.touches[0].target.offsetLeft;
//      		y = ev.originalEvent.touches[0].pageY - ev.originalEvent.touches[0].target.offsetTop;
//      		//console.log(x + ", " + y);
//  		}
//  	} else {
//  		x = ev.offsetX;
//  		y = ev.offsetY;
//  	}
//      return [x, y];
//  }
//  
//  , paintOnCanvasPaint: function(ev) {
//  	//console.log("paintOnCanvasPaint");
//  	ev.preventDefault();
//  	//ev.stopPropagation();
//  	
//  	// save event for easier debugging
//  	DigiWebApp.EditPicturePageController.paintMoveEvent = ev;
//
//  	var coord = DigiWebApp.EditPicturePageController.getCoordinates(ev);
//		var x = coord[0];
//		var y = coord[1];
//
//  	var context = document.getElementById(DigiWebApp.EditPicturePage.content.imageContainer.imageCanvas.id).getContext("2d");
//		
//		// The event handler works like a drawing pencil which tracks the mouse 
//		// movements. We start drawing a path made up of lines.
//		context.lineTo(x, y);
//		//context.stroke();
//  }
//  
//  , paintOnCanvasTouchMove: function(ev) {
//  	//console.log("paintOnCanvasTouchMove");
//  }
//  
//  , fillCanvasFromImage_var: null
//  , fillCanvasFromImage: function() {
//  	console.log("fillCanvasFromImage");
//		if (DigiWebApp.EditPicturePageController.fillCanvasFromImage_var !== null) clearTimeout(DigiWebApp.EditPicturePageController.fillCanvasFromImage_var);
//		$('#' + DigiWebApp.EditPicturePage.content.image.id).hide();
//      var canvas = document.getElementById(DigiWebApp.EditPicturePage.content.imageContainer.imageCanvas.id);
//      var image = document.getElementById(DigiWebApp.EditPicturePage.content.image.id);
//      DigiWebApp.EditPicturePageController.myImageScaleFactor = image.width / canvas.width;
//		var context = canvas.getContext("2d");
//		console.log("drawing image to canvas with file");
//		context.drawImage(image,0,0,canvas.width * DigiWebApp.EditPicturePageController.myImageScaleFactor,canvas.height * DigiWebApp.EditPicturePageController.myImageScaleFactor,0,0,canvas.width,canvas.height);
//		DigiWebApp.EditPicturePageController.myImageTopLeft = [0, 0];
//  }

});
