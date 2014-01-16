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
	  
	, positionId: null // in model
	, positionName: null // in model
	, positionenList: null // runtime

	, activityId: null // in model
	, activityName: null // in model
	, activityList: null // runtime

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
		that.set("positionId", myItem.get("positionId"));
		that.set("positionName", myItem.get("positionName"));
		that.set("activityId", myItem.get("activityId"));
		that.set("activityName", myItem.get("activityName"));
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

		that.item.set("positionId", that.positionId);
		that.item.set("positionName", that.positionName);
		if (parseInt(that.activityId) !== 0) {
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
	    //var image = document.getElementById(DigiWebApp.EditPicturePage.content.image.id);

	    //that.item.set('fileType', DigiWebApp.ApplicationController.CONSTImageFiletype);

		if (that.item.saveSorted()) {
			var image = document.getElementById(DigiWebApp.BautagebuchMedienDetailsPage.content.image.id);
		    that.item.saveToFile(image.src, function() {
  		        DigiWebApp.ApplicationController.DigiLoaderView.hide();
				DigiWebApp.BautagebuchMedienListeController.set("items", DigiWebApp.BautagebuchMediaFile.findSorted(DigiWebApp.BautagebuchBautageberichtDetailsController.item.m_id));
				DigiWebApp.NavigationController.backToBautagebuchMedienListePageTransition();
		    });
			return true;
		} else {
			return false;
		}
	}
	
	, deleteMedienBuchung: function() {
		var that = this;
		if (that.item.deleteSorted() !== false) {		
			DigiWebApp.BautagebuchMedienListeController.set("items", DigiWebApp.BautagebuchMediaFile.findSorted(DigiWebApp.BautagebuchBautageberichtDetailsController.item.m_id));
			DigiWebApp.NavigationController.backToBautagebuchMedienListePageTransition();
			return true;
		} else {
			return false;
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
		    		//console.log("UNDEFINED activity");
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
