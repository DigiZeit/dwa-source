// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: DigiWebApp
// Controller: BautagebuchEinstellungenController
// ==========================================================================

DigiWebApp.BautagebuchEinstellungenController = M.Controller.extend({

	  settings: {
		// Vorgabewerte (werden zur Laufzeit überschrieben)
		  startUhrzeit: "08:00"
		, inStundenBuchen: YES
		, inStundenBuchenItem: [{
	        value: 'inStundenBuchen'
	      , label: M.I18N.l('BautagebuchInStundenBuchen')
	      , isSelected: YES
		}]
		, falscheZeitenIgnorieren: NO
		, falscheZeitenIgnorierenItem: [{
	        value: 'falscheZeitenIgnorieren'
	      , label: M.I18N.l('falscheZeitenIgnorieren')
	      , isSelected: NO
		}]
	}

	, init: function(isFirstLoad) {
		var that = this;
		that.load();
	}

	, lastPage: null
	
	, load: function() {
		var that = this;

		// set defaults for content-binding
		that.set("settings.startUhrzeit", that.settings.startUhrzeit);
		that.set("settings.inStundenBuchen", that.settings.inStundenBuchen);
		that.set("settings.inStundenBuchenItem", that.settings.inStundenBuchenItem);
		that.set("settings.falscheZeitenIgnorieren", that.settings.falscheZeitenIgnorieren);
		that.set("settings.falscheZeitenIgnorierenItem", that.settings.falscheZeitenIgnorierenItem);

		if (DigiWebApp.BautagebuchEinstellungen.find().length === 0) {
			// erstelle Record mit Vorgabewerten
			var rec = DigiWebApp.BautagebuchEinstellungen.createRecord({
				  startUhrzeit: that.settings.startUhrzeit
				, inStundenBuchen: that.settings.inStundenBuchen
				, falscheZeitenIgnorieren: that.settings.falscheZeitenIgnorieren
			});
			rec.save();
		} else {
			var rec = DigiWebApp.BautagebuchEinstellungen.find()[0];
			that.set("settings.startUhrzeit", rec.get("startUhrzeit"));
			if (typeof(rec.get("inStundenBuchen")) !== "undefined") {
				that.set("settings.inStundenBuchen", rec.get("inStundenBuchen"));
				that.set("settings.inStundenBuchenItem", [{
			        value: 'inStundenBuchen'
			      , label: M.I18N.l('BautagebuchInStundenBuchen')
			      , isSelected: rec.get("inStundenBuchen")
				}]);
			}
			if (typeof(rec.get("falscheZeitenIgnorieren")) !== "undefined") {
				that.set("settings.falscheZeitenIgnorieren", rec.get("falscheZeitenIgnorieren"));
				that.set("settings.falscheZeitenIgnorierenItem", [{
			        value: 'falscheZeitenIgnorieren'
			      , label: M.I18N.l('falscheZeitenIgnorieren')
			      , isSelected: rec.get("falscheZeitenIgnorieren")
				}]);
			}
		}
	}
	
	, save: function() {
		var that = this;
		
		var rec = DigiWebApp.BautagebuchEinstellungen.find()[0];
		rec.set("startUhrzeit", that.settings.startUhrzeit);
		rec.set("inStundenBuchen", that.settings.inStundenBuchen);
		rec.set("falscheZeitenIgnorieren", that.settings.falscheZeitenIgnorieren);
		rec.save();
		
		//M.ViewManager.setCurrentPage(that.lastPage)
	}

});
