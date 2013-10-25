// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: DigiWebApp
// Controller: BautagebuchMaterialienListeController
// ==========================================================================
// manuell var-checked
DigiWebApp.BautagebuchMaterialienListeController = M.Controller.extend({

	  items: null
	
	, init: function(isFirstLoad) {
		var that = this;
		
		that.set("items", DigiWebApp.BautagebuchMaterialBuchung.findSorted(DigiWebApp.BautagebuchBautageberichtDetailsController.item.m_id));
		
	}

	, neu: function() {
		//var that = this;
		
		DigiWebApp.BautagebuchMaterialienDetailsController.set("item", DigiWebApp.BautagebuchMaterialBuchung.createRecord({
			  bautagesberichtId: DigiWebApp.BautagebuchBautageberichtDetailsController.item.m_id
		}));
		DigiWebApp.BautagebuchMaterialienDetailsController.set("positionId", null);
		DigiWebApp.BautagebuchMaterialienDetailsController.set("positionName", null);
		DigiWebApp.BautagebuchMaterialienDetailsController.set("activityId", null);
		DigiWebApp.BautagebuchMaterialienDetailsController.set("activityName", null);
		DigiWebApp.BautagebuchMaterialienDetailsController.set("artikel", null);
		DigiWebApp.BautagebuchMaterialienDetailsController.set("einheit", null);
		DigiWebApp.BautagebuchMaterialienDetailsController.set("menge", null);
		DigiWebApp.BautagebuchMaterialienDetailsController.set("materialId", null);
		DigiWebApp.BautagebuchMaterialienDetailsController.set("mengeneinheitId", null);
		DigiWebApp.NavigationController.toBautagebuchMaterialienDetailsPageTransition();
	
	}

});
