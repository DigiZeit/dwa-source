// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: DigiWebApp
// Controller: BautagebuchMaterialienDetailsController
// ==========================================================================

DigiWebApp.BautagebuchMaterialienDetailsController = M.Controller.extend({

	  item: null
	 
	, positionId: null // in model
	, positionName: null // in model
	, positionenList: null // runtime

	, activityId: null // in model
	, activityName: null // in model
	, activityList: null // runtime
	
	, materialId: null // in model
	, materialienList: null // runtime
	, artikel: null // in model
	
	, mengeneinheitId: null // in model
	, mengeneinheitenList: null // runtime
	, einheit: null // in model
	
	, menge: null // in model
	  	
	, init: function(isFirstLoad) {
		var that = this;
	}

	, load: function(myItem) {
		var that = this;
		that.set("item", myItem);
		that.set("positionId", myItem.get("positionId"));
		that.set("positionName", myItem.get("positionName"));
		that.set("activityId", myItem.get("activityId"));
		that.set("activityName", myItem.get("activityName"));
		that.set("materialId", myItem.get("materialId"));
		that.set("mengeneinheitId", myItem.get("mengeneinheitId"));
		that.set("artikel", myItem.get("artikel"));
		that.set("menge", myItem.get("menge"));
		that.set("einheit", myItem.get("einheit"));
		that.setTaetigkeiten(myItem.get("positionId"));
	}
	
	, save: function() {
		var that = this;

		var positionSelected = (M.ViewManager.getView('bautagebuchMaterialienDetailsPage', 'positionComboBox').getSelection() !== "0" );
		if (!positionSelected) {
            DigiWebApp.ApplicationController.nativeAlertDialogView({
                title: M.I18N.l('noPosSelected')
              , message: M.I18N.l('noPosSelectedMsg')
            });
			return false;
		}
		
		//var activitySelected = (M.ViewManager.getView('bautagebuchMaterialienDetailsPage', 'activityComboBox').getSelection() !== "0" );
		//if (!activitySelected) {
        //    DigiWebApp.ApplicationController.nativeAlertDialogView({
        //        title: M.I18N.l('noActSelected')
        //      , message: M.I18N.l('noActSelectedMsg')
        //    });
		//	return false;
		//}
		
		if (!that.artikel) {
            DigiWebApp.ApplicationController.nativeAlertDialogView({
                title: M.I18N.l('BautagebuchKeinMaterial')
              , message: M.I18N.l('BautagebuchKeinMaterialMsg')
            });
            return false;
		}
		
		if (!that.einheit) {
            DigiWebApp.ApplicationController.nativeAlertDialogView({
                title: M.I18N.l('BautagebuchKeineEinheit')
              , message: M.I18N.l('BautagebuchKeineEinheitMsg')
            });
            return false;
		}
		
		if (!that.menge) {
            DigiWebApp.ApplicationController.nativeAlertDialogView({
                title: M.I18N.l('BautagebuchKeineMenge')
              , message: M.I18N.l('BautagebuchKeineMengeMsg')
            });
            return false;
		} else if (that.menge.indexOf(".") !== -1 && that.menge.indexOf(",") !== -1) {
            DigiWebApp.ApplicationController.nativeAlertDialogView({
                title: M.I18N.l('ungueltigeZahl')
              , message: M.I18N.l('ungueltigeZahlMsg')
            });
			return false;
		} else if (isNaN(parseFloat(that.menge))) {
            DigiWebApp.ApplicationController.nativeAlertDialogView({
                title: M.I18N.l('BautagebuchUngueltigeMenge')
              , message: M.I18N.l('BautagebuchUngueltigeMengeMsg')
            });
			return false;
		}
		

		if (M.I18N.getLanguage() === "de_de") {
			that.set("menge", that.menge.replace(",","."));
		} else if (M.I18N.getLanguage() === "en_us") {
			that.set("menge", that.menge.replace(",","."));
		} else {
			that.set("menge", that.menge.replace(",","."));
		}
		
		// jetzt noch die menge endgültig als number casten 
		that.set("menge", parseFloat(that.menge));

		that.item.set("positionId", that.positionId);
		that.item.set("positionName", that.positionName);
		if (parseInt(that.activityId) !== 0) {
			that.item.set("activityId", that.activityId);
			that.item.set("activityName", that.activityName);
		} else {
			that.item.set("activityId", null);
			that.item.set("activityName", null);
		}
		that.item.set("materialId", that.materialId);
		that.item.set("mengeneinheitId", that.mengeneinheitId);
		that.item.set("artikel", that.artikel);
		that.item.set("einheit", that.einheit);
		that.item.set("menge", that.menge);
		if (that.item.saveSorted()) {		
			DigiWebApp.BautagebuchMaterialienListeController.set("items", DigiWebApp.BautagebuchMaterialBuchung.findSorted(DigiWebApp.BautagebuchBautageberichtDetailsController.item.m_id));
			DigiWebApp.NavigationController.backToBautagebuchMaterialienListePageTransition();
			return true;
		} else {
			return false;
		}
	}
	
	, deleteMaterialbuchung: function() {
		var that = this;
		if (that.item.deleteSorted()) {		
			DigiWebApp.BautagebuchMaterialienListeController.set("items", DigiWebApp.BautagebuchMaterialBuchung.findSorted(DigiWebApp.BautagebuchBautageberichtDetailsController.item.m_id));
			DigiWebApp.NavigationController.backToBautagebuchMaterialienListePageTransition();
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
	        if(workPlans.length > 0) {
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
			that.set("activityList", taetigkeitenArray)
		}
	}

});
