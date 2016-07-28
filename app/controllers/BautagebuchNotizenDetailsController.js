// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: DigiWebApp
// Controller: BautagebuchNotizenDetailsController
// ==========================================================================
// manuell var-checked
DigiWebApp.BautagebuchNotizenDetailsController = M.Controller.extend({

	  item: null
	
	, auftragId: null // runtime
	, auftragName: null // runtime
	, auftraegeList: null // runtime

	, handOrderId: null // runtime
	, handOrderVaterId: null // runtime
	, handOrderName: null // runtime

	, positionId: null // in model
	, positionName: null // in model
	, positionenList: null // runtime

	, activityId: null // in model
	, activityName: null // in model
	, activityList: null // runtime

	, data: null // in model

	, init: function(isFirstLoad) {
		//var that = this;
	}

	, load: function(myItem) {
		var that = this;
		that.set("item", myItem);
		var myPosition = _.filter(DigiWebApp.Position.findSorted(), function(position) {
			return (position.get('id') == myItem.get("positionId"));
		})[0];
		var myAuftrag = _.filter(DigiWebApp.HandOrder.findSorted().concat(
                DigiWebApp.Order.findSorted()), function (auftrag) {
			if (myItem.get("handOrderId") && myItem.get("handOrderId").length > 0) {
				return (auftrag.get('id') == myItem.get('handOrderId'));
			} else {
				return (auftrag.get('id') == myPosition.get('orderId'));
			}
		})[0];
		var myAuftragId = myAuftrag.get('id');
		var myAuftragName = myAuftrag.get('name');
		that.set("auftragId", myAuftragId);
		that.set("auftragName", myAuftragName);
		that.set("handOrderId", myItem.get("handOrderId"));
		that.set("handOrderVaterId", myItem.get("handOrderVaterId"));
		that.set("handOrderName", myItem.get("handOrderName"));
		that.set("positionId", myItem.get("positionId"));
		that.set("positionName", myItem.get("positionName"));
		that.set("activityId", myItem.get("activityId"));
		that.set("activityName", myItem.get("activityName"));
		that.set("data", myItem.get("data"));
		that.setTaetigkeiten(myItem.get("positionId"));
	}
	
	, save: function() {
		var that = this;
		
		var myTyp = DigiWebApp.BautagebuchBautagesberichtDetailsController.item.get("bautagesberichtTyp");
    	if (myTyp == "<notizen_only>") {
    	    var orderSelected = (M.ViewManager.getView(
                'bautagebuchNotizenDetailsPage', 'auftragComboBox').getSelection() !== "0");
			if (!orderSelected) {
	            DigiWebApp.ApplicationController.nativeAlertDialogView({
	                title: M.I18N.l('noOrderSelected')
	              , message: M.I18N.l('noOrderSelectedMsg')
	            });
				return false;
			}
		}

    	var posSelection = M.ViewManager.getView(
            'bautagebuchNotizenDetailsPage', 'positionComboBox').getSelection();
		var positionSelected = (typeof(posSelection) != "undefined" && posSelection != "0" );
		if (!positionSelected && !that.handOrderId) {
            DigiWebApp.ApplicationController.nativeAlertDialogView({
                title: M.I18N.l('noPosSelected')
              , message: M.I18N.l('noPosSelectedMsg')
            });
			return false;
		}
		
		if (that.handOrderId) {
			that.item.set("handOrderId", that.handOrderId);
			that.item.set("handOrderVaterId", that.handOrderVaterId);
			that.item.set("handOrderName", that.handOrderName);
			that.item.set("positionId", null);
			that.item.set("positionName", null);
			that.item.set("orderId", null);
			that.item.set("orderName", null);
		} else {
			that.item.set("handOrderId", null);
			that.item.set("handOrderVaterId", null);
			that.item.set("handOrderName", null);
			that.item.set("positionId", that.positionId);
			that.item.set("positionName", that.positionName);
			that.item.set("orderId", that.auftragId);
			that.item.set("orderName", that.auftragName);
		}

		that.item.set("activityId", that.activityId);
		that.item.set("activityName", that.activityName);
		if (that.data !== DigiWebApp.BautagebuchNotizenDetailsPage.content.dataInput.initialText) {
			that.item.set("data", that.data);
		} else {
			that.item.set("data", null);
		}
		if (that.item.saveSorted()) {		
		    DigiWebApp.BautagebuchNotizenListeController.set("items",
                DigiWebApp.BautagebuchNotiz.findSorted(
                    DigiWebApp.BautagebuchBautagesberichtDetailsController.item.get('id')));
			DigiWebApp.NavigationController.backToBautagebuchNotizenListePageTransition();
			return true;
		} else {
			return false;
		}
	}
	
	, deleteNotiz: function() {
		var that = this;
		DigiWebApp.ApplicationController.nativeConfirmDialogView({
      	  title: M.I18N.l('deleteLabel')
	        , message: M.I18N.l('wirklichLoeschenMsg')
          , confirmButtonValue: M.I18N.l('yes')
    		, cancelButtonValue: M.I18N.l('no')
    		, callbacks: {
        		  confirm: {
            		  target: this
            		, action: function() {
						if (that.item.deleteSorted()) {		
						    DigiWebApp.BautagebuchNotizenListeController.set("items",
                                DigiWebApp.BautagebuchNotiz.findSorted(
                                    DigiWebApp.BautagebuchBautagesberichtDetailsController.item.get('id')));
							DigiWebApp.NavigationController.backToBautagebuchNotizenListePageTransition();
							return true;
						} else {
							return false;
						}
					}
        		}
        		, cancel: {
            		  target: this
            		, action: function() {
	        			return true;
    				}
        		}
    		}
		});
	}
	
	, setPositionen: function(auftragsId) {
		var that = this;
		if (typeof(auftragsId) === "undefined") {
			return false;
		} else {
			// verfügbare Positionen kopieren und ausgewähltes selektieren
			var itemSelected = NO;
		    var positionenArray = _.map(DigiWebApp.Position.findSorted(), function(pos) {
		    	if ( typeof(pos) === "undefined" ) {
		    		console.log("UNDEFINED Position");
		    	} else {
		    		if (parseIntRadixTen(pos.get('orderId')) == parseIntRadixTen(auftragsId)) {
		    			var obj = { label: pos.get('name'), value: pos.get('id'), isSelected: NO };
		    			if (parseIntRadixTen(pos.get('id')) == parseIntRadixTen(
                            that.item.get("positionId"))) {
			    			obj.isSelected = YES;
			    			itemSelected = YES;
			    			that.set('positionId', pos.get('id'));
			    			that.set('positionName', pos.get('name'));
			    		}
		    			return obj;
		    		}
		    	}
		    });
		    positionenArray = _.compact(positionenArray);
		    if (!itemSelected && auftragsId && positionenArray.length > 0) {
		    	positionenArray[0].isSelected = YES;
    			that.set('positionId', positionenArray[0].value);
    			that.set('positionName', positionenArray[0].label);
		    }
		    that.set("positionenList", positionenArray);
		}
	}

	, setTaetigkeiten: function(positionId) {
		var that = this;
		if (typeof(positionId) !== "undefined") {

			var workPlans = _.select(DigiWebApp.WorkPlan.find(), function(wp) {
	            if (wp) return wp.get('id') == positionId;
	        });

	        var itemSelected = NO;

	        /* if a workplan exists, only use those activities that are in the workplan */
	        var activities = null;
	        if (workPlans.length > 0) {
	            activities = DigiWebApp.SelectionController.getActivitiesFromWorkplan(workPlans[0]);
	        } else {
	            activities = DigiWebApp.SelectionController.getActivities();
	        }

			// verfügbare Tätigkeiten kopieren und ausgewähltes selektieren
		    var taetigkeitenArray = _.map(activities, function(act) {
		    	if ( typeof(act) === "undefined" ) {
		    		console.log("UNDEFINED activity");
		    	} else {
	    			var obj = { label: act.get('name'), value: act.get('id'), isSelected: NO };
	    			if (that.activityId === obj.value) {
	    				obj.isSelected = YES;
	    				itemSelected = YES;
	    			}
	    			return obj;
		    	}
		    });
		    taetigkeitenArray = _.compact(taetigkeitenArray);
		    taetigkeitenArray.push(
                {
                    label: M.I18N.l('selectSomethingOptional'),
                    value: '0',
                    isSelected: !itemSelected
                });
			that.set("activityList", taetigkeitenArray);
		}
	}

});
