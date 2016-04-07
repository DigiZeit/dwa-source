// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso
//
// Project: DigiWebApp
// Model: Anwesenheitsliste
// ==========================================================================

DigiWebApp.Anwesenheitsliste = M.Model.create({
    
      __name__: 'Anwesenheitsliste'

      	//"auftragsBezeichnung": "27.08.2012",
    	  	, auftragsBezeichnung: M.Model.attr('String', {})
    	//"auftragsId": "27.08.2012",
    	    , auftragsId: M.Model.attr('String', {})
    	//"bis": "10:37:08",
    	    , bis: M.Model.attr('String', {})
    	//"datum": "27.08.2012",
    	    , datum: M.Model.attr('String', {})
    	    , datumLabel: M.Model.attr('String', {})
    	//"farbeAmpel": "",
    	    , farbeAmpel: M.Model.attr('String', {})
    	//"farbeAnwesenheit": "#00FF00",
    	    , farbeAnwesenheit: M.Model.attr('String', {})
    	//"fehlzeitBezeichnung": "",
    	    , fehlzeitBezeichnung: M.Model.attr('String', {})
    	//"gpsBreite": "0.0",
    	    , gpsBreite: M.Model.attr('String', {})
    	//"gpsBreitePosition": "0.0",
    	    , gpsBreitePosition: M.Model.attr('String', {})
    	//"gpsLaenge": "0.0",
    	    , gpsLaenge: M.Model.attr('String', {})
    	//"gpsLaengePosition": "0.0",
    	    , gpsLaengePosition: M.Model.attr('String', {})
    	//"handauftragsBezeichnung": "",
    	    , handauftragsBezeichnung: M.Model.attr('String', {})
    	//"handauftragsId": "",
    	    , handauftragsId: M.Model.attr('String', {})
    	//"mitarbeiterId": "29",
    	    , mitarbeiterId: M.Model.attr('String', {})
    	//"name": "Maier",
    	    , name: M.Model.attr('String', {})
    	//"nameVorname": "Maier, Peter",
    	    , nameVorname: M.Model.attr('String', {})
    	//"positionsBezeichnung": "1446DEKRA",
    	    , positionsBezeichnung: M.Model.attr('String', {})
    	//"positionsId": "1929",
    	    , positionsId: M.Model.attr('String', {})
    	//"taetigkeit": "05Stromversorger",
    	    , taetigkeit: M.Model.attr('String', {})
    	//"taetigkeitsId": "89",
    	    , taetigkeitsId: M.Model.attr('String', {})
    	//"taetigkeitsart": "0",
    	    , taetigkeitsart: M.Model.attr('String', {})
    	//"uhrzeit": "27-08-2012 11:50:52",
    	    , uhrzeit: M.Model.attr('String', {})
    	//"vorname": "Peter"
    	    , vorname: M.Model.attr('String', {})

}, M.DataConsumer.configure({

      appendRecords: NO

    , responsePath: 'anwesenheitsliste'

    , url: function () {
        var myUrl = 'https://';
        if (DigiWebApp.SettingsController.getSetting('benutzeHttps') === false) {
            myUrl = 'http://';
        }
        myUrl = myUrl + DigiWebApp.JSONDatenuebertragungController.DatabaseServer
            + '/WebAppServices/anwesenheitsliste?modus=0&firmenId=' + DigiWebApp.SettingsController.getSetting('company')
            + '&kennwort=' + DigiWebApp.SettingsController.getSetting('password')
            + '&geraeteId=' + DigiWebApp.SettingsController.getSetting('workerId')
            + '&geraeteTyp=2&softwareVersion=' + DigiWebApp.RequestController.softwareVersion
            + '&requestTimestamp=' + M.Date.now().date.valueOf();
        if (DigiWebApp.ApplicationController.profilingIntervalVar === null) {
        	console.log('Anwesenheitsliste: using ' + myUrl);
        }
		return myUrl;
    }

    /* map needs to return record obj which can be handled by createRecord */
    , map: function(obj) {
    	//console.log(obj);
        var outObj = {
        	//"auftragsBezeichnung":"1234Hermann"
        	  auftragsBezeichnung: obj.auftragsBezeichnung
        	//"auftragsId":"947"
			, auftragsId: obj.auftragsId
			//"bis": "10:37:08",
			, bis: obj.bis
			//"datum": "27.08.2012",
			, datum: obj.datum
			, datumLabel: ''
			//"farbeAmpel": "",
			, farbeAmpel: obj.farbeAmpel
			//"farbeAnwesenheit": "#00FF00",
			, farbeAnwesenheit: obj.farbeAnwesenheit
			//"fehlzeitBezeichnung": "",
			, fehlzeitBezeichnung: obj.fehlzeitBezeichnung 
			//"gpsBreite": "0.0",
			, gpsBreite: obj.gpsBreite
			//"gpsBreitePosition": "0.0",
			, gpsBreitePosition: obj.gpsBreitePosition
			//"gpsLaenge": "0.0",
			, gpsLaenge: obj.gpsLaenge
			//"gpsLaengePosition": "0.0",
			, gpsLaengePosition: obj.gpsLaengePosition
			//"handauftragsBezeichnung": "",
			, handauftragsBezeichnung: obj.handauftragsBezeichnung
			//"handauftragsId": "",
			, handauftragsId: obj.handauftragsId
			//"mitarbeiterId": "29",
			, mitarbeiterId: obj.mitarbeiterId
			//"name": "Maier",
			, name: obj.name
			//"nameVorname": "Maier, Peter",
			, nameVorname: obj.nameVorname
			//"positionsBezeichnung": "1446DEKRA",
			, positionsBezeichnung: obj.positionsBezeichnung
			//"positionsId": "1929",
			, positionsId: obj.positionsId
			//"taetigkeit": "05Stromversorger",
			, taetigkeit: obj.taetigkeit
			//"taetigkeitsId": "89",
			, taetigkeitsId: obj.taetigkeitsId
			//"taetigkeitsart": "0",
			, taetigkeitsart: obj.taetigkeitsart
			//"uhrzeit": "27-08-2012 11:50:52",
			, uhrzeit: obj.uhrzeit
			//"vorname": "Peter"
			, vorname: obj.vorname
        };
		if (outObj.datum !== "-") {
			if (outObj.bis === "-") {
				outObj.datumLabel = M.I18N.l('bookingSince') + ': ';
			} else {
				outObj.datumLabel = M.I18N.l('lastWorkday') + ': ';
				outObj.uhrzeit = '-';
			}
		} else {
			outObj.datumLabel = M.I18N.l('noData');
			outObj.uhrzeit = '-';
			outObj.bis = '-';
		}
		return outObj;
    }

}));