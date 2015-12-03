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
		
		var myItems = DigiWebApp.BautagebuchNotiz.findSorted(DigiWebApp.BautagebuchBautagesberichtDetailsController.item.get('id'));
		if (myItems.length == 0) {
			$('#' + DigiWebApp.BautagebuchNotizenListePage.uebertragenButton.id).hide();
		} else {
			if (DigiWebApp.BautagebuchBautagesberichtDetailsController.item.get('bautagesberichtTyp') != "<standard>") {
				$('#' + DigiWebApp.BautagebuchNotizenListePage.uebertragenButton.id).show();
			} else {
				$('#' + DigiWebApp.BautagebuchNotizenListePage.uebertragenButton.id).hide();
			}
		}

		that.set("items", myItems);
		
	}

	, neu: function() {
		
		DigiWebApp.BautagebuchNotizenDetailsController.set("item", DigiWebApp.BautagebuchNotiz.createRecord({
			  bautagesberichtId: DigiWebApp.BautagebuchBautagesberichtDetailsController.item.get('id')
		}));
		if (DigiWebApp.BautagebuchBautagesberichtDetailsController.item.get('orderId')) {
			DigiWebApp.BautagebuchNotizenDetailsController.set("auftragId", DigiWebApp.BautagebuchBautagesberichtDetailsController.item.get('orderId'));
			DigiWebApp.BautagebuchNotizenDetailsController.set("auftragName", DigiWebApp.BautagebuchBautagesberichtDetailsController.item.get('orderName'));
		} else {
			DigiWebApp.BautagebuchNotizenDetailsController.set("auftragId", null);
			DigiWebApp.BautagebuchNotizenDetailsController.set("auftragName", null);
		}
		if (DigiWebApp.BautagebuchBautagesberichtDetailsController.item.get('handOrderId')) {
			DigiWebApp.BautagebuchNotizenDetailsController.set("handOrderId", DigiWebApp.BautagebuchBautagesberichtDetailsController.item.get('handOrderId'));
			DigiWebApp.BautagebuchNotizenDetailsController.set("handOrderVaterId", DigiWebApp.BautagebuchBautagesberichtDetailsController.item.get('handOrderVaterId'));
			DigiWebApp.BautagebuchNotizenDetailsController.set("handOrderName", DigiWebApp.BautagebuchBautagesberichtDetailsController.item.get('handOrderName'));
		} else {
			DigiWebApp.BautagebuchNotizenDetailsController.set("handOrderId", null);
			DigiWebApp.BautagebuchNotizenDetailsController.set("handOrderVaterId", null);
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
