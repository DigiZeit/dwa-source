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
		that.set("positionId", myItem.get("positionId"));
		that.set("positionName", myItem.get("positionName"));
		that.set("activityId", myItem.get("activityId"));
		that.set("activityName", myItem.get("activityName"));
		that.set("data", myItem.get("data"));
		that.setTaetigkeiten(myItem.get("positionId"));
	}
	
	, save: function() {
		var that = this;
		
		var positionSelected = (M.ViewManager.getView('bautagebuchNotizenDetailsPage', 'positionComboBox').getSelection() !== "0" );
		if (!positionSelected) {
            DigiWebApp.ApplicationController.nativeAlertDialogView({
                title: M.I18N.l('noPosSelected')
              , message: M.I18N.l('noPosSelectedMsg')
            });
			return false;
		}
		
		//var activitySelected = (M.ViewManager.getView('bautagebuchNotizenDetailsPage', 'activityComboBox').getSelection() !== "0" );
		//if (!activitySelected) {
        //    DigiWebApp.ApplicationController.nativeAlertDialogView({
        //        title: M.I18N.l('noActSelected')
        //      , message: M.I18N.l('noActSelectedMsg')
        //    });
		//	return false;
		//}
		
		that.item.set("positionId", that.positionId);
		that.item.set("positionName", that.positionName);
		that.item.set("activityId", that.activityId);
		that.item.set("activityName", that.activityName);
		if (that.data !== DigiWebApp.BautagebuchNotizenDetailsPage.content.dataInput.initialText) {
			that.item.set("data", that.data);
		} else {
			that.item.set("data", null);
		}
		if (that.item.saveSorted()) {		
			DigiWebApp.BautagebuchNotizenListeController.set("items", DigiWebApp.BautagebuchNotiz.findSorted(DigiWebApp.BautagebuchBautageberichtDetailsController.item.m_id));
			DigiWebApp.NavigationController.backToBautagebuchNotizenListePageTransition();
			return true;
		} else {
			return false;
		}
	}
	
	, deleteNotiz: function() {
		var that = this;
		if (that.item.deleteSorted()) {		
			DigiWebApp.BautagebuchNotizenListeController.set("items", DigiWebApp.BautagebuchNotiz.findSorted(DigiWebApp.BautagebuchBautageberichtDetailsController.item.m_id));
			DigiWebApp.NavigationController.backToBautagebuchNotizenListePageTransition();
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

});
