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
		
		var myItems = DigiWebApp.BautagebuchMaterialBuchung.findSorted(DigiWebApp.BautagebuchBautagesberichtDetailsController.item.get('id'));
		if (myItems.length == 0) {
			$('#' + DigiWebApp.BautagebuchMaterialienListePage.uebertragenButton.id).hide();
		} else {
			if (DigiWebApp.BautagebuchBautagesberichtDetailsController.item.get('bautagesberichtTyp') != "<standard>") {
				$('#' + DigiWebApp.BautagebuchMaterialienListePage.uebertragenButton.id).show();
			} else {
				$('#' + DigiWebApp.BautagebuchMaterialienListePage.uebertragenButton.id).hide();
			}
		}

		if (DigiWebApp.SettingsController.featureAvailable('428')) {
			$('#' + DigiWebApp.BautagebuchMaterialienListePage.stammdatenUebertragenButton.id).show();
		} else {
			$('#' + DigiWebApp.BautagebuchMaterialienListePage.stammdatenUebertragenButton.id).hide();
		}
		
		that.set("items", myItems);
	}

	, neu: function() {
		//var that = this;
		
		DigiWebApp.BautagebuchMaterialienDetailsController.set("item", DigiWebApp.BautagebuchMaterialBuchung.createRecord({
			  bautagesberichtId: DigiWebApp.BautagebuchBautagesberichtDetailsController.item.get('id')
		}));
		if (DigiWebApp.BautagebuchBautagesberichtDetailsController.item.get('orderId')) {
			DigiWebApp.BautagebuchMaterialienDetailsController.set("auftragId", DigiWebApp.BautagebuchBautagesberichtDetailsController.item.get('orderId'));
			DigiWebApp.BautagebuchMaterialienDetailsController.set("auftragName", DigiWebApp.BautagebuchBautagesberichtDetailsController.item.get('orderName'));
		} else {
			DigiWebApp.BautagebuchMaterialienDetailsController.set("auftragId", null);
			DigiWebApp.BautagebuchMaterialienDetailsController.set("auftragName", null);
		}
		if (DigiWebApp.BautagebuchBautagesberichtDetailsController.item.get('handOrderId')) {
			DigiWebApp.BautagebuchMaterialienDetailsController.set("handOrderId", DigiWebApp.BautagebuchBautagesberichtDetailsController.item.get('handOrderId'));
			DigiWebApp.BautagebuchMaterialienDetailsController.set("handOrderVaterId", DigiWebApp.BautagebuchBautagesberichtDetailsController.item.get('handOrderVaterId'));
			DigiWebApp.BautagebuchMaterialienDetailsController.set("handOrderName", DigiWebApp.BautagebuchBautagesberichtDetailsController.item.get('handOrderName'));
		} else {
			DigiWebApp.BautagebuchMaterialienDetailsController.set("handOrderId", null);
			DigiWebApp.BautagebuchMaterialienDetailsController.set("handOrderVaterId", null);
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
