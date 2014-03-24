// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: DigiWebApp
// Controller: ChronologischeAuftragslisteController
// ==========================================================================

DigiWebApp.ChronologischeAuftragslisteController = M.Controller.extend({

	  items: null
		
	, init: function(isFirstLoad) {
		var that = DigiWebApp.ChronologischeAuftragslisteController;
		if (isFirstLoad) {
			// do something only for the first load
		}
		var itemsToShow = [];
		_.each(DigiWebApp.Position.find(), function(pos) {
			
			var tageZuvor = 2;
			var tageDanach = 2;
			var myDate = D8.create().addDays(0 - tageZuvor);
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
	
				// liegt heute im Zeitraum des Auftrags?
				var positionHeuteRelevant = NO; 
				if (
					   ((posBeginn.getTimestamp() < todayStart.getTimestamp()) && !posEnde)
					|| ((posBeginn.getTimestamp() < todayStart.getTimestamp()) && (todayEnd.getTimestamp() < posEnde.getTimestamp()))
				) {
					positionHeuteRelevant = YES;
				}
				
				// Gibt es Termine?
				var termineList = JSON.parse(pos.get("appointments"));
				if (termineList.length !== 0) {
					var terminHeute = (typeof(_.find(termineList, function(t){ return t == todayStr; })) !== "undefined");
					if (!terminHeute) {
						// Der Auftrag läuft heute, aber der Mitarbeiter hat heute keinen Termin für diesen Auftrag
						positionHeuteRelevant = NO;
					}
				}
				
				if (positionHeuteRelevant) {
					itemsToShow.push(pos);
				}
				
				var myDate = D8.create().addDays(1);

			}
		});
		that.set("items", itemsToShow);
	}

});
