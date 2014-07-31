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
		
		that.set("items", DigiWebApp.BautagebuchMaterialBuchung.findSorted(DigiWebApp.BautagebuchBautageberichtDetailsController.item.get('id')));
		
	}

	, neu: function() {
		//var that = this;
		
		DigiWebApp.BautagebuchMaterialienDetailsController.set("item", DigiWebApp.BautagebuchMaterialBuchung.createRecord({
			  bautagesberichtId: DigiWebApp.BautagebuchBautageberichtDetailsController.item.get('id')
		}));
		if (DigiWebApp.BautagebuchBautageberichtDetailsController.item.get('orderId')) {
			DigiWebApp.BautagebuchMaterialienDetailsController.set("auftragId", DigiWebApp.BautagebuchBautageberichtDetailsController.item.get('orderId'));
			DigiWebApp.BautagebuchMaterialienDetailsController.set("auftragName", DigiWebApp.BautagebuchBautageberichtDetailsController.item.get('orderName'));
		} else {
			DigiWebApp.BautagebuchMaterialienDetailsController.set("auftragId", null);
			DigiWebApp.BautagebuchMaterialienDetailsController.set("auftragName", null);
		}
		if (DigiWebApp.BautagebuchBautageberichtDetailsController.item.get('handOrderId')) {
			DigiWebApp.BautagebuchMaterialienDetailsController.set("handOrderId", DigiWebApp.BautagebuchBautageberichtDetailsController.item.get('handOrderId'));
			DigiWebApp.BautagebuchMaterialienDetailsController.set("handOrderName", DigiWebApp.BautagebuchBautageberichtDetailsController.item.get('handOrderName'));
		} else {
			DigiWebApp.BautagebuchMaterialienDetailsController.set("handOrderId", null);
			DigiWebApp.BautagebuchMaterialienDetailsController.set("handOrderName", null);
		}
		DigiWebApp.BautagebuchMaterialienDetailsController.set("positionId", null);
		DigiWebApp.BautagebuchMaterialienDetailsController.set("positionName", null);
		DigiWebApp.BautagebuchMaterialienDetailsController.set("activityId", null);
		DigiWebApp.BautagebuchMaterialienDetailsController.set("activityName", null);

		DigiWebApp.BautagebuchMaterialienDetailsController.set("menge", null);

		DigiWebApp.BautagebuchMaterialienDetailsController.set("mengeneinheitId", null);
		DigiWebApp.BautagebuchMaterialienDetailsController.set("einheit", null);
		
		DigiWebApp.BautagebuchMaterialienDetailsController.set("materialId", null);
		DigiWebApp.BautagebuchMaterialienDetailsController.set("artikel", null);

		DigiWebApp.BautagebuchMaterialienDetailsController.set("materialtypId", null);
		DigiWebApp.BautagebuchMaterialienDetailsController.set("materialgruppeId", null);
		DigiWebApp.BautagebuchMaterialienDetailsController.set("herstellerId", null);
		DigiWebApp.BautagebuchMaterialienDetailsController.set("lieferantId", null);

		DigiWebApp.NavigationController.toBautagebuchMaterialienDetailsPageTransition();
	
	}

});
