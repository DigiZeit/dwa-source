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
		
		that.set("items", DigiWebApp.BautagebuchNotiz.findSorted(DigiWebApp.BautagebuchBautageberichtDetailsController.item.get('id')));
		
	}

	, neu: function() {
		
		DigiWebApp.BautagebuchNotizenDetailsController.set("item", DigiWebApp.BautagebuchNotiz.createRecord({
			  bautagesberichtId: DigiWebApp.BautagebuchBautageberichtDetailsController.item.get('id')
		}));
		if (DigiWebApp.BautagebuchBautageberichtDetailsController.item.get('orderId')) {
			DigiWebApp.BautagebuchNotizenDetailsController.set("auftragId", DigiWebApp.BautagebuchBautageberichtDetailsController.item.get('orderId'));
			DigiWebApp.BautagebuchNotizenDetailsController.set("auftragName", DigiWebApp.BautagebuchBautageberichtDetailsController.item.get('orderName'));
		} else {
			DigiWebApp.BautagebuchNotizenDetailsController.set("auftragId", null);
			DigiWebApp.BautagebuchNotizenDetailsController.set("auftragName", null);
		}
		if (DigiWebApp.BautagebuchBautageberichtDetailsController.item.get('handOrderId')) {
			DigiWebApp.BautagebuchNotizenDetailsController.set("handOrderId", DigiWebApp.BautagebuchBautageberichtDetailsController.item.get('handOrderId'));
			DigiWebApp.BautagebuchNotizenDetailsController.set("handOrderName", DigiWebApp.BautagebuchBautageberichtDetailsController.item.get('handOrderName'));
		} else {
			DigiWebApp.BautagebuchNotizenDetailsController.set("handOrderId", null);
			DigiWebApp.BautagebuchNotizenDetailsController.set("handOrderName", null);
		}
		DigiWebApp.BautagebuchNotizenDetailsController.set("positionId", null);
		DigiWebApp.BautagebuchNotizenDetailsController.set("positionName", null);
		DigiWebApp.BautagebuchNotizenDetailsController.set("activityId", null);
		DigiWebApp.BautagebuchNotizenDetailsController.set("activityName", null);
		DigiWebApp.BautagebuchNotizenDetailsController.set("data", null);

		DigiWebApp.NavigationController.toBautagebuchNotizenDetailsPageTransition();
	
	}
	
});
