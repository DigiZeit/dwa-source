// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: DigiWebApp
// Controller: BautagebuchBautageberichteListeController
// ==========================================================================
// manuell var-checked
DigiWebApp.BautagebuchBautageberichteListeController = M.Controller.extend({

	  items: null
	
	, init: function(isFirstLoad) {
		var that = this;
		DigiWebApp.BautagebuchMainController.init(isFirstLoad);
		if (isFirstLoad) {
		}
		that.set("items", DigiWebApp.BautagebuchBautagesbericht.findSorted());
		var ChefToolOnly = (DigiWebApp.SettingsController.featureAvailable('409'));
		if (ChefToolOnly) {
			DigiWebApp.BautagebuchBautageberichteListePage.header.backButton.setValue(M.I18N.l("mainMenu"));
		}
	}

	, neu: function(bautagesberichtTyp, skipRedirect) {
		//var that = this;
		
		if (bautagesberichtTyp) {
			DigiWebApp.BautagebuchBautageberichtDetailsController.set("bautagesberichtTyp", bautagesberichtTyp);
		} else {
			DigiWebApp.BautagebuchBautageberichtDetailsController.set("bautagesberichtTyp", "<standard>");
		}
		DigiWebApp.BautagebuchBautageberichtDetailsController.init(YES);
		if (DigiWebApp.SettingsController.getSetting('bautagebuchLimit_autoStartUhrzeit')) {
			DigiWebApp.BautagebuchBautageberichtDetailsController.set("startUhrzeit", D8.now().format("HH:MM"));
		} else {
			DigiWebApp.BautagebuchBautageberichtDetailsController.set("startUhrzeit", DigiWebApp.BautagebuchEinstellungenController.settings.startUhrzeit);
		}
		DigiWebApp.BautagebuchBautageberichtDetailsController.set("datum", D8.now().format("dd.mm.yyyy"));
		DigiWebApp.BautagebuchBautageberichtDetailsController.set("projektleiterId", null);
		DigiWebApp.BautagebuchBautageberichtDetailsController.set("auftragsId", null);
		DigiWebApp.BautagebuchBautageberichtDetailsController.set("auftragsName", null);
		DigiWebApp.BautagebuchBautageberichtDetailsController.set("handOrderId", null);
		DigiWebApp.BautagebuchBautageberichtDetailsController.set("handOrderName", null);
		DigiWebApp.BautagebuchBautageberichtDetailsController.set("positionId", null);
		DigiWebApp.BautagebuchBautageberichtDetailsController.set("positionName", null);
		//DigiWebApp.BautagebuchBautageberichtDetailsController.set("mitarbeiterIds", _.map(DigiWebApp.BautagebuchMainController.mitarbeiter,function(obj){return obj.value;}));
		DigiWebApp.BautagebuchBautageberichtDetailsController.setWetter(DigiWebApp.BautagebuchMainController.wetterDefaults);
		DigiWebApp.BautagebuchBautageberichtDetailsController.set("item", DigiWebApp.BautagebuchBautagesbericht.createRecord({
			  id: Math.uuid()
			, datum: DigiWebApp.BautagebuchBautageberichtDetailsController.datum
			, startUhrzeit: DigiWebApp.BautagebuchBautageberichtDetailsController.startUhrzeit
		}));
		
		if (!skipRedirect) {
			DigiWebApp.NavigationController.toBautagebuchBautageberichtDetailsPageTransition();
		}
	}

});
