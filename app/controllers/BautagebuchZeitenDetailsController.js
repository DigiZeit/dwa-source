// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: DigiWebApp
// Controller: BautagebuchZeitenDetailsController
// ==========================================================================
// manuell var-checked
DigiWebApp.BautagebuchZeitenDetailsController = M.Controller.extend({

	  item: null

	, positionId: null // in model
	, positionName: null // in model
	, positionenList: null // runtime

	, activityId: null // in model
	, activityName: null // in model
	, activityList: null // runtime
	
	, mitarbeiterIds: null // in model
	, mitarbeiterList: null // runtime
	
	, von: "" // in model
	, timeStampStart: "" // in model

	, bis: "" // in model
	, timeStampEnd: "" // in model
		
	, dauer: "00:00" // in model

	, verbuchen: YES // in model

	, latitude: "" // in model
	, longitude: "" // in model
	, latitude_bis: "" // in model
	, longitude_bis: "" // in model

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
		that.set("mitarbeiterIds", JSON.parse(myItem.get("mitarbeiterIds")));
		that.set("verbuchen", myItem.get("verbuchen"));
		that.set("von", myItem.get("von"));
		that.set("timeStampStart", myItem.get("timeStampStart"));
		that.set("bis", myItem.get("bis"));
		that.set("timeStampEnd", myItem.get("timeStampEnd"));
		that.set("dauer", myItem.get("dauer"));
	}
	
	, save: function() {
		var that = this;
		
		var positionSelected = (M.ViewManager.getView('bautagebuchZeitenDetailsPage', 'positionComboBox').getSelection() !== "0" );
		var activitySelected = (M.ViewManager.getView('bautagebuchZeitenDetailsPage', 'activityComboBox').getSelection() !== "0" );
		var mitarbeiterSelected = (!(DigiWebApp.BautagebuchZeitenDetailsController.mitarbeiterIds === null || DigiWebApp.BautagebuchZeitenDetailsController.mitarbeiterIds.length === 0));
		
		if (!positionSelected) {
            DigiWebApp.ApplicationController.nativeAlertDialogView({
                title: M.I18N.l('noPosSelected')
              , message: M.I18N.l('noPosSelectedMsg')
            });
			return false;
		}
		if (!activitySelected) {
            DigiWebApp.ApplicationController.nativeAlertDialogView({
                title: M.I18N.l('noActSelected')
              , message: M.I18N.l('noActSelectedMsg')
            });
			return false;
		}
		if (!mitarbeiterSelected) {
            DigiWebApp.ApplicationController.nativeAlertDialogView({
                title: M.I18N.l('noMitarbeiterSelected')
              , message: M.I18N.l('noMitarbeiterSelectedMsg')
            });
			return false;
		}
		if (!DigiWebApp.BautagebuchEinstellungen.find()[0].get("inStundenBuchen") && !DigiWebApp.BautagebuchEinstellungen.find()[0].get("falscheZeitenIgnorieren")) {
			var myVon = D8.create("01.01.1993 " + DigiWebApp.BautagebuchZeitenDetailsController.get("von"));
			var myBis = D8.create("01.01.1993 " + DigiWebApp.BautagebuchZeitenDetailsController.get("bis"));
			if (myVon.getTimestamp() > myBis.getTimestamp()) {
				DigiWebApp.ApplicationController.nativeAlertDialogView({
	                title: M.I18N.l('wrongTimes')
	              , message: M.I18N.l('wrongTimesMsg')
	            });
				return false;
			}
		}
		that.item.set("positionId", that.positionId);
		that.item.set("positionName", that.positionName);
		that.item.set("activityId", that.activityId);
		that.item.set("activityName", that.activityName);
		that.item.set("mitarbeiterIds", JSON.stringify(that.mitarbeiterIds));
		that.item.set("verbuchen", that.verbuchen);
		that.item.set("von", that.von);
		that.item.set("timeStampStart", that.timeStampStart);
		that.item.set("bis", that.bis);
		that.item.set("timeStampEnd", that.timeStampEnd);
		that.item.set("dauer", that.dauer);
		if (that.item.saveSorted()) {		
			DigiWebApp.BautagebuchZeitenListeController.set("items", DigiWebApp.BautagebuchZeitbuchung.findSorted(DigiWebApp.BautagebuchBautageberichtDetailsController.item.m_id));
			DigiWebApp.NavigationController.backToBautagebuchZeitenListePageTransition();
			return true;
		} else {
			return false;
		}
	}
	
	, deleteZeitbuchung: function() {
		var that = this;
		if (that.item.deleteSorted()) {		
			DigiWebApp.BautagebuchZeitenListeController.set("items", DigiWebApp.BautagebuchZeitbuchung.findSorted(DigiWebApp.BautagebuchBautageberichtDetailsController.item.m_id));
			DigiWebApp.NavigationController.backToBautagebuchZeitenListePageTransition();
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
	        var activities;
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
		    taetigkeitenArray.push({label: M.I18N.l('selectSomething'), value: '0', isSelected: !itemSelected});
			that.set("activityList", taetigkeitenArray);
		}
	}

});
