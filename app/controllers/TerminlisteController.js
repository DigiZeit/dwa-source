// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: DigiWebApp
// Controller: TerminlisteController
// ==========================================================================

DigiWebApp.TerminlisteController = M.Controller.extend({

	  items: null
	  
	, datum: null
		
	, init: function(isFirstLoad) {
		var that = DigiWebApp.TerminlisteController;
		if (isFirstLoad) {
			// do something only for the first load
		}
		
		var itemsToShow = [];
		var ganztaegigeItems = [];
		var nachUhrzeitItems = [];
		
		_.each(DigiWebApp.Position.find(), function(pos) {
			
			var tageZuvor = 0;
			var tageDanach = 0;
			var hideOhneTermin = false;
			var beachteAlleTermine = false;
			var myDate = D8.create(DigiWebApp.TerminlisteController.datum).addDays(0 - tageZuvor);
			for (var x=0; x <= tageZuvor + tageDanach; x++) {
				var todayStart = D8.create(myDate.format("dd.mm.yyyy"));
				var todayEnd = todayStart.addDays(1).addMilliseconds(-1);
				var todayStr = todayStart.format("dd.mm.yyyy");
				
				// läuft der Auftrag bereits?
				var posBeginnStr = pos.get("positionBegin");
				var posBeginn = null;
				if (posBeginnStr !== "") {
					posBeginn = D8.create(posBeginnStr);
				}
				// Wurde der Auftrag bereits abgeschlossen?
				var posEndeStr = pos.get("positionEnd");
				var posEnde = null;
				if (posEndeStr !== "") {
					posEnde = D8.create(posEndeStr);
				}
	
				var heuteLiegtImAuftragsZeitraum = NO; 
				var mitarbeiterHatHeuteTermine = NO;
				var auftragHatTermine = NO;

				// liegt heute im Zeitraum des Auftrags?
				if (
					   ((posBeginn.getTimestamp() < todayStart.getTimestamp()) && !posEnde)
					|| ((posBeginn.getTimestamp() < todayStart.getTimestamp()) && (todayEnd.getTimestamp() < posEnde.getTimestamp()))
				) {
					heuteLiegtImAuftragsZeitraum = YES;
				}
				
				// Gibt es Termine?
				var termineList = JSON.parse(pos.get("appointments"));
				auftragHatTermine = (termineList.length !== 0);
				
				// Hat der Mitarbeiter heute (mind.) einen Termin für diesen Auftrag?
				var termineHeute = [];
				if (auftragHatTermine) {
					termineHeute = _.filter(termineList, function(terminStr){
						var termin = JSON.parse(terminStr);
						return D8.create(termin.von).format("dd.mm.yyyy") == todayStr; 
					});
					if ((typeof(terminHeute) !== "undefined")) {
						mitarbeiterHatHeuteTermine = YES;
					}
				}
				
				if (auftragHatTermine) {
					// konkrete Termine
					_.each(termineHeute, function(terminStr) {
						var termin = JSON.parse(terminStr);
						if (termin.ganzerTag) {
							addToListIfNotFoundById(ganztaegigeItems, termin, termin.terminId)
						} else {
							addToListIfNotFoundById(nachUhrzeitItems, termin, termin.terminId)
						}
					});
				} else {
					// künstlicher Termin für diesen Auftrag
					var order = _.find(DigiWebApp.Order.find(), function(o) { return parseInt(o.get("id")) == parseInt(pos.get("id"))});
					var kuenstlicherTermin = {
							  _createdAt: D8.create().getTimestamp()
							, _updatedAt: D8.create().getTimestamp()
							, beschreibung: null
							, betreff: pos.get("name") + ", " + order.get("name")
							, von: todayStr + " 00:00:00"
							, bis: todayStr + " 23:59:59"
							, erinnert: false
							, erinnerung: null
							, erstellerBenutzerId: null
							, ganzerTag: false
							, neueTerminId: null
							, ortId: null
							, positionId: pos.get("id")
							, ressourcen: null
							, serienterminId: null
							, status: null
							, terminId: null
							, terminartId: null
							, timeStampBis: D8.create(todayStr + " 23:59:59").getTimestamp()
							, timeStampErinnerung: null
							, timeStampVon: D8.create(todayStr + " 00:00:00").getTimestamp()
							, zeitstempel: D8.create().getTimestamp()
					}
					addToListIfNotFoundById(ganztaegigeItems, termin, termin.terminId)
				}
				
			}
		});
		
		nachUhrzeitItems = _.sortBy(nachUhrzeitItems, function(el){
			return D8.create(el.timeStampVon).getTimestamp();
		});
		var ganztaegigeItemsObject = {
				  label: M.I18N.l("ganztaegig")
				, items: ganztaegigeItems
		};
		var nachUhrzeitItemsObject = {
				  label: M.I18N.l("nachUhrzeit")
				, items: nachUhrzeitItems
		};
		itemsToShow.push(ganztaegigeItemsObject);
		itemsToShow.push(nachUhrzeitItemsObject);
		that.set("items", itemsToShow);
	}

});
