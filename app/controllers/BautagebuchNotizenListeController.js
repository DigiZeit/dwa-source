// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: DigiWebApp
// Controller: BautagebuchNotizenListeController
// ==========================================================================
// manuell var-checked
DigiWebApp.BautagebuchNotizenListeController = M.Controller.extend({

	  items: null
	
	, init: function(isFirstLoad) {
		var that = this;
		
		that.set("items", DigiWebApp.BautagebuchNotiz.findSorted(DigiWebApp.BautagebuchBautageberichtDetailsController.item.m_id));
		
	}

	, neu: function() {
		
		DigiWebApp.BautagebuchNotizenDetailsController.set("item", DigiWebApp.BautagebuchNotiz.createRecord({
			  bautagesberichtId: DigiWebApp.BautagebuchBautageberichtDetailsController.item.get('id')
		}));
		DigiWebApp.BautagebuchNotizenDetailsController.set("positionId", null);
		DigiWebApp.BautagebuchNotizenDetailsController.set("positionName", null);
		DigiWebApp.BautagebuchNotizenDetailsController.set("activityId", null);
		DigiWebApp.BautagebuchNotizenDetailsController.set("activityName", null);
		DigiWebApp.BautagebuchNotizenDetailsController.set("data", null);

		DigiWebApp.NavigationController.toBautagebuchNotizenDetailsPageTransition();
	
	}
	
});
