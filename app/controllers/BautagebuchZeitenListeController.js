// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: DigiWebApp
// Controller: BautagebuchZeitenListeController
// ==========================================================================
// manuell var-checked
DigiWebApp.BautagebuchZeitenListeController = M.Controller.extend({

	  items: null
	
	, init: function(isFirstLoad) {
		var that = this;
		
		that.set("items", DigiWebApp.BautagebuchZeitbuchung.findSorted(DigiWebApp.BautagebuchBautageberichtDetailsController.item.get('id')));
		DigiWebApp.BautagebuchZusammenfassungController.load(DigiWebApp.BautagebuchBautageberichtDetailsController.item);
		DigiWebApp.BautagebuchZusammenfassungController.set("ZeitbuchungenPerMitarbeiterList", DigiWebApp.BautagebuchZusammenfassungController.getZeitbuchungenPerMitarbeiterList());
		M.ViewManager.setCurrentPage(DigiWebApp.BautagebuchZeitenListePage);

	}

	, neu: function(vorselektierterMitarbeiter) {
		//var that = this;
		
		DigiWebApp.BautagebuchZeitenDetailsController.set("item", DigiWebApp.BautagebuchZeitbuchung.createRecord({
			  bautagesberichtId: DigiWebApp.BautagebuchBautageberichtDetailsController.item.get('id')
		}));
		if (DigiWebApp.BautagebuchBautageberichtDetailsController.item.get('orderId')) {
			DigiWebApp.BautagebuchZeitenDetailsController.set("auftragId", DigiWebApp.BautagebuchBautageberichtDetailsController.item.get('orderId'));
			DigiWebApp.BautagebuchZeitenDetailsController.set("auftragName", DigiWebApp.BautagebuchBautageberichtDetailsController.item.get('orderName'));
		} else {
			DigiWebApp.BautagebuchZeitenDetailsController.set("auftragId", null);
			DigiWebApp.BautagebuchZeitenDetailsController.set("auftragName", null);
		}
		if (DigiWebApp.BautagebuchBautageberichtDetailsController.item.get('handOrderId')) {
			DigiWebApp.BautagebuchZeitenDetailsController.set("handOrderId", DigiWebApp.BautagebuchBautageberichtDetailsController.item.get('handOrderId'));
			DigiWebApp.BautagebuchZeitenDetailsController.set("handOrderName", DigiWebApp.BautagebuchBautageberichtDetailsController.item.get('handOrderName'));
		} else {
			DigiWebApp.BautagebuchZeitenDetailsController.set("handOrderId", null);
			DigiWebApp.BautagebuchZeitenDetailsController.set("handOrderName", null);
		}
		DigiWebApp.BautagebuchZeitenDetailsController.set("positionId", null);
		DigiWebApp.BautagebuchZeitenDetailsController.set("positionName", null);
		DigiWebApp.BautagebuchZeitenDetailsController.set("activityId", null);
		DigiWebApp.BautagebuchZeitenDetailsController.set("activityName", null);
		if (vorselektierterMitarbeiter) {
			DigiWebApp.BautagebuchZeitenDetailsController.set("mitarbeiterIds", [vorselektierterMitarbeiter]);
		} else {
			DigiWebApp.BautagebuchZeitenDetailsController.set("mitarbeiterIds", null);
		}
		DigiWebApp.BautagebuchZeitenDetailsController.set("von", DigiWebApp.BautagebuchBautageberichtDetailsController.startUhrzeit);
		DigiWebApp.BautagebuchZeitenDetailsController.set("bis", DigiWebApp.BautagebuchBautageberichtDetailsController.startUhrzeit);
		DigiWebApp.BautagebuchZeitenDetailsController.set("dauer", "00:00");
		DigiWebApp.BautagebuchZeitenDetailsController.set("remark", "");
		
		DigiWebApp.NavigationController.toBautagebuchZeitenDetailsPageTransition();
		$('#' + DigiWebApp.BautagebuchZeitenDetailsPage.header.delButton.id).hide();

	}

});
