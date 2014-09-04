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
		, alleMitarbeiterVorselektiert: NO
		, alleMitarbeiterVorselektiertItem: [{
	        value: 'alleMitarbeiterVorselektiert'
	      , label: M.I18N.l('alleMitarbeiterVorselektiert')
	      , isSelected: NO
		}]
		, minutenSchritte: 5
		, minutenSchritteItem: [
    	          {
    		        value: '1'
    		      , label: '1'
    		      , isSelected: NO
    			}
      	        , {
    		        value: '5'
    		      , label: '5'
    		      , isSelected: YES
    			}
    	        , {
    		        value: '10'
    		      , label: '10'
    		      , isSelected: NO
    			}
    	        , {
    		        value: '15'
    		      , label: '15'
    		      , isSelected: NO
    			}
    	        , {
    		        value: '20'
    		      , label: '20'
    		      , isSelected: NO
    			}
    	        , {
    		        value: '30'
    		      , label: '30'
    		      , isSelected: NO
    			}
        ]
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
		that.set("settings.alleMitarbeiterVorselektiert", that.settings.alleMitarbeiterVorselektiert);
		that.set("settings.alleMitarbeiterVorselektiertItem", that.settings.alleMitarbeiterVorselektiertItem);
		that.set("settings.minutenSchritte", that.settings.minutenSchritte);
		that.set("settings.minutenSchritteItem", that.settings.minutenSchritteItem);

		if (DigiWebApp.BautagebuchEinstellungen.find().length === 0) {
			// erstelle Record mit Vorgabewerten
			var rec = DigiWebApp.BautagebuchEinstellungen.createRecord({
				  startUhrzeit: that.settings.startUhrzeit
				, inStundenBuchen: that.settings.inStundenBuchen
				, falscheZeitenIgnorieren: that.settings.falscheZeitenIgnorieren
				, positionVorselektieren: that.settings.positionVorselektieren
				, minutenSchritte: that.settings.minutenSchritte
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
			if (typeof(rec.get("alleMitarbeiterVorselektiert")) !== "undefined") {
				that.set("settings.alleMitarbeiterVorselektiert", rec.get("alleMitarbeiterVorselektiert"));
				that.set("settings.alleMitarbeiterVorselektiertItem", [{
			        value: 'alleMitarbeiterVorselektiert'
			      , label: M.I18N.l('alleMitarbeiterVorselektiert')
			      , isSelected: rec.get("alleMitarbeiterVorselektiert")
				}]);
			}
			if (typeof(rec.get("minutenSchritte")) !== "undefined") {
				that.set("settings.minutenSchritte", rec.get("minutenSchritte"));
				var myItems = _.map(that.settings.minutenSchritteItem, function(n) {
					n.isSelected = NO;
					if (n.value = rec.get("minutenSchritte")) {
						n.isSelected = YES;
					}
				});
				that.set("settings.minutenSchritteItem", myItems);
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
		rec.set("alleMitarbeiterVorselektiert", that.settings.alleMitarbeiterVorselektiert);
		rec.set("minutenSchritte", that.settings.minutenSchritte);
		rec.save();
		
		//M.ViewManager.setCurrentPage(that.lastPage)
	}

	, setStartUhrzeit: function() {
  		if (DigiWebApp.BautagebuchEinstellungenController.settings.startUhrzeit) {
  			$('#'+DigiWebApp.BautagebuchEinstellungenPage.content.startUhrzeitContainer.startUhrzeitGrid.stundeFeld.id)[0].value = parseIntRadixTen(DigiWebApp.BautagebuchEinstellungenController.settings.startUhrzeit.split(":")[0],10).padLeft(2,"0");
  			$('#'+DigiWebApp.BautagebuchEinstellungenPage.content.startUhrzeitContainer.startUhrzeitGrid.minuteFeld.id)[0].value = parseIntRadixTen(DigiWebApp.BautagebuchEinstellungenController.settings.startUhrzeit.split(":")[1],10).padLeft(2,"0");
  		}
	}

});
