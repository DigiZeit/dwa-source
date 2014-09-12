// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: DigiWebApp
// Controller: BautagebuchMedienDetailsController
// ==========================================================================
// manuell var-checked
DigiWebApp.BautagebuchMedienDetailsController = M.Controller.extend({

	  item: null
	  
	, handOrderId: null // runtime
	, handOrderName: null // runtime

	, auftragId: null // runtime
	, auftragName: null // runtime
	, auftraegeList: null // runtime

	, positionId: null // in model
	, positionName: null // in model
	, positionenList: null // runtime

	, activityId: null // in model
	, activityName: null // in model
	, activityList: null // runtime

	, mitarbeiterId: null // in model

	, data: null // runtime (base64-string)
	, remark: null // in model
	, fileType: null // in model
	, loadedFileName: null // runtime

	, init: function(isFirstLoad) {
		//var that = this;
	}

	, load: function(myItem) {
		var that = this;
		that.set("item", myItem);
		var myPosition = _.filter(DigiWebApp.Position.findSorted(), function(position) {
			return (position.get('id') == myItem.get("positionId"));
		})[0];
		var myAuftrag = _.filter(DigiWebApp.HandOrder.findSorted().concat(DigiWebApp.Order.findSorted()), function(auftrag) {
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
		that.set("handOrderName", myItem.get("handOrderName"));
		that.set("positionId", myItem.get("positionId"));
		that.set("positionName", myItem.get("positionName"));
		that.set("activityId", myItem.get("activityId"));
		that.set("activityName", myItem.get("activityName"));
		that.set("mitarbeiterId", myItem.get("mitarbeiterId"));
		var image = document.getElementById(DigiWebApp.BautagebuchMedienDetailsPage.content.image.id);
	    image.src = '';
	    myItem.readFromFile(function(fileContent){
	        DigiWebApp.ApplicationController.DigiLoaderView.hide();
			if (fileContent && (fileContent !== "")) {
				  that.set("data", fileContent);
			      var image = document.getElementById(DigiWebApp.BautagebuchMedienDetailsPage.content.image.id);
			      //image.src = 'data:' + DigiWebApp.ApplicationController.CONSTImageFiletype + ',' + fileContent;
			      image.src = fileContent;
			}
		}, function() {
			  that.set("data", null);
		      var image = document.getElementById(DigiWebApp.BautagebuchMedienDetailsPage.content.image.id);
		      image.src = '';
		});
		that.set("remark", myItem.get("remark"));
	}

	, save: function() {
		var that = this;
		
		var positionSelected = (M.ViewManager.getView('bautagebuchMedienDetailsPage', 'positionComboBox').getSelection() !== "0" );
		if (!positionSelected) {
            DigiWebApp.ApplicationController.nativeAlertDialogView({
                title: M.I18N.l('noPosSelected')
              , message: M.I18N.l('noPosSelectedMsg')
            });
			return false;
		}
		
		//var activitySelected = (M.ViewManager.getView('bautagebuchMedienDetailsPage', 'activityComboBox').getSelection() !== "0" );
		//if (!activitySelected) {
        //    DigiWebApp.ApplicationController.nativeAlertDialogView({
        //        title: M.I18N.l('noActSelected')
        //      , message: M.I18N.l('noActSelectedMsg')
        //    });
		//	return false;
		//}

		if (that.handOrderId) {
			that.item.set("handOrderId", that.handOrderId);
			that.item.set("handOrderName", that.handOrderName);
			that.item.set("positionId", null);
			that.item.set("positionName", null);
		} else {
			that.item.set("handOrderId", null);
			that.item.set("handOrderName", null);
			that.item.set("positionId", that.positionId);
			that.item.set("positionName", that.positionName);
		}

		if (parseIntRadixTen(that.activityId) !== 0) {
			that.item.set("activityId", that.activityId);
			that.item.set("activityName", that.activityName);
		} else {
			that.item.set("activityId", null);
			that.item.set("activityName", null);
		}
		if (that.remark !== DigiWebApp.BautagebuchMedienDetailsPage.content.remarkInput.initialText) {
			that.item.set("remark", that.remark);
		} else {
			that.item.set("remark", null);
		}
		
		that.item.set("mitarbeiterId", that.mitarbeiterId);

		//var image = document.getElementById(DigiWebApp.EditPicturePage.content.image.id);

	    //that.item.set('fileType', DigiWebApp.ApplicationController.CONSTImageFiletype);

		var itemWasNew = (that.item.state == M.STATE_NEW);

		if (that.item.saveSorted()) {
			var image = document.getElementById(DigiWebApp.BautagebuchMedienDetailsPage.content.image.id);
		    var saveCallback = function() {
				var backToListFunc = function() {
	  		        DigiWebApp.ApplicationController.DigiLoaderView.hide();
					DigiWebApp.BautagebuchMedienListeController.set("items", DigiWebApp.BautagebuchMediaFile.findSorted(DigiWebApp.BautagebuchBautagesberichtDetailsController.item.get('id')));
					DigiWebApp.NavigationController.backToBautagebuchMedienListePageTransition();
				}
				if (itemWasNew) {
		    		DigiWebApp.ApplicationController.nativeConfirmDialogView({
		          	  title: M.I18N.l('bautagebuchWeiteresFoto')
				        , message: M.I18N.l('bautagebuchWeiteresFotoMsg')
			            , confirmButtonValue: M.I18N.l('yes')
			      		, cancelButtonValue: M.I18N.l('no')
			      		, callbacks: {
			          		  confirm: {
			              		  target: this
			              		, action: function() {
			    					var myOldItem = JSON.parse(JSON.stringify(that.item));
			    					DigiWebApp.BautagebuchMedienListeController.neu(YES);
			    					if (that.handOrderId) {
				    					that.set("handOrderId", myOldItem.record.handOrderId);
				    					that.set("handOrderName", myOldItem.record.handOrderName);
			    						that.set("positionId", null);
			    						that.set("positionName", null);
			    					} else {
				    					that.set("handOrderId", null);
				    					that.set("handOrderName", null);
				    					that.set("positionId", myOldItem.record.positionId);
				    					that.set("positionName", myOldItem.record.positionName);
			    					}
			    					that.set("activityId", myOldItem.record.activityId);
			    					that.set("activityName", myOldItem.record.activityName);
			    					that.set("mitarbeiterId", myOldItem.record.mitarbeiterId);
			    					//that.setTaetigkeiten(myOldItem.record.positionId);
								}
			          		}
			          		, cancel: {
			              		  target: this
			              		, action: function() {
			          				backToListFunc();
				        			return true;
			      				}
			          		}
			      		}
		    		});
				} else {
					// item wurde editiert
					backToListFunc();
					return true;
				}
		    }
		    that.item.saveToFile(image.src, saveCallback);
			return true;
		} else {
			return false;
		}
	}
	
	, deleteMedienBuchung: function() {
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
						if (that.item.deleteSorted() !== false) {		
							DigiWebApp.BautagebuchMedienListeController.set("items", DigiWebApp.BautagebuchMediaFile.findSorted(DigiWebApp.BautagebuchBautagesberichtDetailsController.item.get('id')));
							DigiWebApp.NavigationController.backToBautagebuchMedienListePageTransition();
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
		    taetigkeitenArray.push({label: M.I18N.l('selectSomethingOptional'), value: '0', isSelected: !itemSelected});
			that.set("activityList", taetigkeitenArray);
		}
	}
	
    , takePicture: function() {
    	var that = this;
		navigator.camera.getPicture(
			  that.cameraSuccessBase64
			, that.cameraError
			, { 
				  quality: 40
				//, allowEdit: true
				, destinationType : navigator.camera.DestinationType.DATA_URL
				//, sourceType: navigator.camera.PictureSourceType.CAMERA 
			  }
		);    	
    }
    
    , cameraSuccessBase64: function(imageData) {
    	var that = DigiWebApp.BautagebuchMedienDetailsController;
    	that.set("data", imageData);
    	that.set("fileType", DigiWebApp.ApplicationController.CONSTImageFiletype);
        var image = document.getElementById(DigiWebApp.BautagebuchMedienDetailsPage.content.image.id);
        image.src = 'data:' + DigiWebApp.ApplicationController.CONSTImageFiletype + ',' + imageData;
        DigiWebApp.NavigationController.toBautagebuchMedienDetailsPageTransition();
    }
    
    , cameraError: function(mymessage) {
        DigiWebApp.ApplicationController.nativeAlertDialogView({
              title: 'ERROR'
            , message: mymessage
            , callbacks: {
	            confirm: {
	                  target: this
	                , action: function () {
	    				DigiWebApp.NavigationController.backToBautagebuchMedienListePageTransition();
		              }
		       }
		    }
        });
    }

});
