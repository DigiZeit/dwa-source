// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: DigiWebApp
// Controller: FestePauseStornierenController
// ==========================================================================

DigiWebApp.FestePauseStornierenController = M.Controller.extend({

	  items: null
	  
	, init: function(isFirstLoad) {
		var that = this;
		if (isFirstLoad) {

		}
		that.initBalken();
		that.initPausenLists();
	}

	, gesternBalken: null
    , heuteBalken: null
    , morgenBalken: null    	
    , initBalken: function() {
		var that = this;
		var wochentage = DigiWebApp.ApplicationController.dayNames;
		
		that.set('gesternBalken', [{
			  "label": wochentage[D8.create().yesterday().date.getDay()] + ", " + D8.create().yesterday().format("dd.mm.yyyy")
			, "items": []
		}]); 
		that.set('heuteBalken', [{
			  "label": wochentage[D8.create().date.getDay()] + ", " + D8.create().format("dd.mm.yyyy")
			, "items": []
		}]); 
		that.set('morgenBalken', [{
			  "label": wochentage[D8.create().tomorrow().date.getDay()] + ", " + D8.create().tomorrow().format("dd.mm.yyyy")
			, "items": []
		}]); 
	}
	
	, gesternPausenList: null
	, heutePausenList: null
	, morgenPausenList: null
	, initPausenLists: function() {
		var that = this;
		
		var allePausen = DigiWebApp.Festepausendefinition.findSorted();
		
		var gesternWochentag = D8.create().yesterday().date.getDay();
		var heuteWochentag = D8.create().date.getDay();
		var morgenWochentag = D8.create().tomorrow().date.getDay();
		
		var gesternPausenList = _.filter(allePausen, function(festepausendefinition) { return (festepausendefinition.get('wochentagId') == gesternWochentag); });
		var heutePausenList   = _.filter(allePausen, function(festepausendefinition) { return (festepausendefinition.get('wochentagId') == heuteWochentag); });
		var morgenPausenList  = _.filter(allePausen, function(festepausendefinition) { return (festepausendefinition.get('wochentagId') == morgenWochentag); });
		
		var alleSonderbuchungen = DigiWebApp.Sonderbuchung.findSorted();
		
		gesternPausenList = _.map(gesternPausenList, function(fp) {
            if (fp) return { label: fp.get('von') + " - " + fp.get('bis'), value: fp.get('id') };
        });
		that.set('gesternPausenList', gesternPausenList);
		
        heutePausenList = _.map(heutePausenList, function(fp) {
            if (fp) {
            	return { label: fp.get('von') + " - " + fp.get('bis'), value: fp.get('id') };
            }
        });
        that.set('heutePausenList', heutePausenList);
        
        morgenPausenList = _.map(morgenPausenList, function(fp) {
            if (fp) return { label: fp.get('von') + " - " + fp.get('bis'), value: fp.get('id') };
        });
        that.set('morgenPausenList', morgenPausenList);

        // bereits stornierte: disable
//        var myList = $('#' + DigiWebApp.FestePauseStornierenPage.content.heutePausenList.id);
//        var myContent = myList.contents()[0];
//        myContent.children[0].setAttribute("disabled", "disabled");
//        myContent.children[1].style.color = "lightgrey";
        
	}
	
	, save: function() {
		var gesternPausenZuStornierenSelection = DigiWebApp.FestePauseStornierenPage.content.gesternPausenList.selection;
		var heutePausenZuStornierenSelection   = DigiWebApp.FestePauseStornierenPage.content.heutePausenList.selection;
		var morgenPausenZuStornierenSelection  = DigiWebApp.FestePauseStornierenPage.content.morgenPausenList.selection;
		
		var mapIdToFestePause = function(fpId) {
			var fpDef = _.find(DigiWebApp.Festepausendefinition.find(),function(n) { return (n.get("id") == fpId); });
			return {
				  "date": D8.create().format("dd.mm.yyyy")
				, "festepausendefinition": fpDef
			}
		};
		
		var pausenZuStornierenGestern = _.map(_.map(DigiWebApp.FestePauseStornierenPage.content.gesternPausenList.selection, function(el) { return el.value; }), mapIdToFestePause);
		var pausenZuStornierenHeute   = _.map(_.map(DigiWebApp.FestePauseStornierenPage.content.heutePausenList.selection, function(el) { return el.value; }), mapIdToFestePause);
		var pausenZuStornierenMorgen  = _.map(_.map(DigiWebApp.FestePauseStornierenPage.content.morgenPausenList.selection, function(el) { return el.value; }), mapIdToFestePause);
		
		var pausenZuStornieren = pausenZuStornierenGestern.concat(pausenZuStornierenHeute.concat(pausenZuStornierenMorgen));
		
		_.each(pausenZuStornieren, function(p) {
			//{"Key": "<FestepausendefinitionId>", "StringValue": "23"}
			var sonderbuchungseigenschaft_festepausendefinitionId = {"Key": "<FestepausendefinitionId>", "StringValue": p.festepausendefinition.get("id")};
	    	//{"Key": "<Datum>", "StringValue": "01.02.2014"}
			var sonderbuchungseigenschaft_datum = {"Key": "<Datum>", "StringValue": p.date};
			var sonderbuchungseigenschaften = [sonderbuchungseigenschaft_festepausendefinitionId, sonderbuchungseigenschaft_datum];
			DigiWebApp.Sonderbuchung.createRecord({
				  sonderbuchungsTyp: "<pausenStorno>"
				, sonderbuchungsEigenschaften: JSON.stringify(sonderbuchungseigenschaften)
				, ressourceId: p.festepausendefinition.get("ressourceId")
				, uebertragen: "false"
			}).save();
		});
		
		
		
	}
	
});
