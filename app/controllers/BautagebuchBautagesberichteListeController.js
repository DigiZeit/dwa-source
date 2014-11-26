// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: DigiWebApp
// Controller: BautagebuchBautagesberichteListeController
// ==========================================================================
// manuell var-checked
DigiWebApp.BautagebuchBautagesberichteListeController = M.Controller.extend({

	  items: null
	
	, init: function(isFirstLoad) {
		var that = this;
		DigiWebApp.BautagebuchMainController.init(isFirstLoad);
		if (isFirstLoad) {
		}
		that.set("items", DigiWebApp.BautagebuchBautagesbericht.findSorted());
		var ChefToolOnly = (DigiWebApp.SettingsController.featureAvailable('409'));
		if (ChefToolOnly) {
			DigiWebApp.BautagebuchBautagesberichteListePage.header.backButton.setValue(M.I18N.l("mainMenu"));
		}
		var abgeschlosseneBautagesberichte = _.filter(DigiWebApp.BautagebuchBautagesbericht.find(), function(item) { return parseBool(item.get("abgeschlossen")); });
		if (abgeschlosseneBautagesberichte.length == 0) {
			$('#' + DigiWebApp.BautagebuchBautagesberichteListePage.uebertragenButton.id).hide();
		} else {
			$('#' + DigiWebApp.BautagebuchBautagesberichteListePage.uebertragenButton.id).show();
		}
	}

	, neu: function(bautagesberichtTyp, skipRedirect) {
		//var that = this;
		
		if (bautagesberichtTyp) {
			DigiWebApp.BautagebuchBautagesberichtDetailsController.set("bautagesberichtTyp", bautagesberichtTyp);
		} else {
			DigiWebApp.BautagebuchBautagesberichtDetailsController.set("bautagesberichtTyp", "<standard>");
		}
		DigiWebApp.BautagebuchBautagesberichtDetailsController.init(YES);
		if (DigiWebApp.SettingsController.getSetting('bautagebuchLimit_autoStartUhrzeit')) {
			DigiWebApp.BautagebuchBautagesberichtDetailsController.set("startUhrzeit", D8.now().format("HH:MM"));
		} else {
			DigiWebApp.BautagebuchBautagesberichtDetailsController.set("startUhrzeit", DigiWebApp.BautagebuchEinstellungenController.settings.startUhrzeit);
		}
		DigiWebApp.BautagebuchBautagesberichtDetailsController.set("datum", D8.now().format("dd.mm.yyyy"));
		DigiWebApp.BautagebuchBautagesberichtDetailsController.set("projektleiterId", null);
		DigiWebApp.BautagebuchBautagesberichtDetailsController.set("auftragsId", null);
		DigiWebApp.BautagebuchBautagesberichtDetailsController.set("auftragsName", null);
		DigiWebApp.BautagebuchBautagesberichtDetailsController.set("handOrderId", null);
		DigiWebApp.BautagebuchBautagesberichtDetailsController.set("handOrderName", null);
		DigiWebApp.BautagebuchBautagesberichtDetailsController.set("positionId", null);
		DigiWebApp.BautagebuchBautagesberichtDetailsController.set("positionName", null);
		if (DigiWebApp.BautagebuchEinstellungenController.settings.alleMitarbeiterVorselektiert) {
			DigiWebApp.BautagebuchBautagesberichtDetailsController.set("mitarbeiterIds", _.map(DigiWebApp.BautagebuchMainController.mitarbeiter,function(obj){return parseIntRadixTen(obj.value);}));
		} else {
			DigiWebApp.BautagebuchBautagesberichtDetailsController.set("mitarbeiterIds", null);
		}
		DigiWebApp.BautagebuchBautagesberichtDetailsController.setWetter(DigiWebApp.BautagebuchMainController.wetterDefaults);
		DigiWebApp.BautagebuchBautagesberichtDetailsController.set("item", DigiWebApp.BautagebuchBautagesbericht.createRecord({
			  id: Math.uuid()
			, datum: DigiWebApp.BautagebuchBautagesberichtDetailsController.datum
			, startUhrzeit: DigiWebApp.BautagebuchBautagesberichtDetailsController.startUhrzeit
		}));
		
		if (!skipRedirect) {
			DigiWebApp.NavigationController.toBautagebuchBautagesberichtDetailsPageTransition();
		}
	}

});
