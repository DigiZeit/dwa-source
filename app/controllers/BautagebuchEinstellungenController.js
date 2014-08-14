// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: DigiWebApp
// Controller: BautagebuchEinstellungenController
// ==========================================================================
// manuell var-checked
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
		, positionVorselektieren: NO
		, positionVorselektierenItem: [{
	        value: 'positionVorselektieren'
	      , label: M.I18N.l('positionVorselektieren')
	      , isSelected: NO
		}]
		, in15MinutenSchritten: YES
		, in15MinutenSchrittenItem: [{
	        value: 'in15MinutenSchritten'
	      , label: M.I18N.l('in15MinutenSchritten')
	      , isSelected: YES
		}]
		, alleMitarbeiterVorselektiert: NO
		, alleMitarbeiterVorselektiertItem: [{
	        value: 'alleMitarbeiterVorselektiert'
	      , label: M.I18N.l('alleMitarbeiterVorselektiert')
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
		that.set("settings.positionVorselektieren", that.settings.positionVorselektieren);
		that.set("settings.positionVorselektierenItem", that.settings.positionVorselektierenItem);
		that.set("settings.in15MinutenSchritten", that.settings.in15MinutenSchritten);
		that.set("settings.in15MinutenSchrittenItem", that.settings.in15MinutenSchrittenItem);
		that.set("settings.alleMitarbeiterVorselektiert", that.settings.alleMitarbeiterVorselektiert);
		that.set("settings.alleMitarbeiterVorselektiertItem", that.settings.alleMitarbeiterVorselektiertItem);

		if (DigiWebApp.BautagebuchEinstellungen.find().length === 0) {
			// erstelle Record mit Vorgabewerten
			var rec = DigiWebApp.BautagebuchEinstellungen.createRecord({
				  startUhrzeit: that.settings.startUhrzeit
				, inStundenBuchen: that.settings.inStundenBuchen
				, falscheZeitenIgnorieren: that.settings.falscheZeitenIgnorieren
				, positionVorselektieren: that.settings.positionVorselektieren
				, in15MinutenSchritten: that.settings.in15MinutenSchritten
				, alleMitarbeiterVorselektiert: that.settings.alleMitarbeiterVorselektiert
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
			if (typeof(rec.get("positionVorselektieren")) !== "undefined") {
				that.set("settings.positionVorselektieren", rec.get("positionVorselektieren"));
				that.set("settings.positionVorselektierenItem", [{
			        value: 'positionVorselektieren'
			      , label: M.I18N.l('positionVorselektieren')
			      , isSelected: rec.get("positionVorselektieren")
				}]);
			}
			if (typeof(rec.get("in15MinutenSchritten")) !== "undefined") {
				that.set("settings.in15MinutenSchritten", rec.get("in15MinutenSchritten"));
				that.set("settings.in15MinutenSchrittenItem", [{
			        value: 'in15MinutenSchritten'
			      , label: M.I18N.l('in15MinutenSchritten')
			      , isSelected: rec.get("in15MinutenSchritten")
				}]);
			}
			if (typeof(rec.get("alleMitarbeiterVorselektiert")) !== "undefined") {
				that.set("settings.alleMitarbeiterVorselektiert", rec.get("alleMitarbeiterVorselektiert"));
				that.set("settings.alleMitarbeiterVorselektiertItem", [{
			        value: 'alleMitarbeiterVorselektiert'
			      , label: M.I18N.l('alleMitarbeiterVorselektiert')
			      , isSelected: rec.get("alleMitarbeiterVorselektiert")
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
		rec.set("positionVorselektieren", that.settings.positionVorselektieren);
		rec.set("in15MinutenSchritten", that.settings.in15MinutenSchritten);
		rec.set("alleMitarbeiterVorselektiert", that.settings.alleMitarbeiterVorselektiert);
		rec.save();
		
		//M.ViewManager.setCurrentPage(that.lastPage)
	}

	, setStartUhrzeit: function() {
  		if (DigiWebApp.BautagebuchEinstellungenController.settings.startUhrzeit) {
  			$('#'+DigiWebApp.BautagebuchEinstellungenPage.content.startUhrzeitContainer.startUhrzeitGrid.stundeFeld.id)[0].value = parseInt(DigiWebApp.BautagebuchEinstellungenController.settings.startUhrzeit.split(":")[0]).padLeft(2,"0");
  			$('#'+DigiWebApp.BautagebuchEinstellungenPage.content.startUhrzeitContainer.startUhrzeitGrid.minuteFeld.id)[0].value = parseInt(DigiWebApp.BautagebuchEinstellungenController.settings.startUhrzeit.split(":")[1]).padLeft(2,"0");
  		}
	}

});
