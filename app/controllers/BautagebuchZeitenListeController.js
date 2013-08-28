// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: DigiWebApp
// Controller: BautagebuchZeitenListeController
// ==========================================================================

DigiWebApp.BautagebuchZeitenListeController = M.Controller.extend({

	  items: null
	
	, init: function(isFirstLoad) {
		var that = this;
		
		that.set("items", DigiWebApp.BautagebuchZeitbuchung.findSorted(DigiWebApp.BautagebuchBautageberichtDetailsController.item.m_id));
		
	}

	, neu: function(vorselektierterMitarbeiter) {
		var that = this;
		
		DigiWebApp.BautagebuchZeitenDetailsController.set("item", DigiWebApp.BautagebuchZeitbuchung.createRecord({
			  bautagesberichtId: DigiWebApp.BautagebuchBautageberichtDetailsController.item.m_id
		}));
		DigiWebApp.BautagebuchZeitenDetailsController.set("positionId", null);
		DigiWebApp.BautagebuchZeitenDetailsController.set("positionName", null);
		DigiWebApp.BautagebuchZeitenDetailsController.set("activityId", null);
		DigiWebApp.BautagebuchZeitenDetailsController.set("activityName", null);
		if (vorselektierterMitarbeiter) {
			DigiWebApp.BautagebuchZeitenDetailsController.set("mitarbeiterIds", [vorselektierterMitarbeiter]);
		} else {
			DigiWebApp.BautagebuchZeitenDetailsController.set("mitarbeiterIds", null);
		}
		DigiWebApp.BautagebuchZeitenDetailsController.set("von", "");
		DigiWebApp.BautagebuchZeitenDetailsController.set("bis", "");
		DigiWebApp.BautagebuchZeitenDetailsController.set("dauer", "00:00");
		
		DigiWebApp.NavigationController.toBautagebuchZeitenDetailsPageTransition();
		$('#' + DigiWebApp.BautagebuchZeitenDetailsPage.header.delButton.id).hide();

	}

});
