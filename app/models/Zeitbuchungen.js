// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso
//
// Project: DigiWebApp
// Model: Zeitbuchungen
// ==========================================================================

DigiWebApp.Zeitbuchungen = M.Model.create({
    
      __name__: 'Zeitbuchungen'

//    	  	  auftragsBezeichnung: "6657Heim"
    	  , auftragsBezeichnung: M.Model.attr('String', {})
//    		  auftragsId: "950"
    	  , auftragsId: M.Model.attr('String', {})
//    		  bis: "10:37:08"
    	  , bis: M.Model.attr('String', {})
//    		  datum: "14.06.2012"
    	  , datum: M.Model.attr('String', {})
//    		  dauer: "00:00"
    	  , dauer: M.Model.attr('String', {})
//    		  farbeAmpel: ""
    	  , farbeAmpel: M.Model.attr('String', {})
//    		  gpsBreite: "0.0"
    	  , gpsBreite: M.Model.attr('String', {})
//    		  gpsBreitePosition: "0.0"
    	  , gpsBreitePosition: M.Model.attr('String', {})
//    		  gpsLaenge: "0.0"
    	  , gpsLaenge: M.Model.attr('String', {})
//    		  gpsLaengePosition: "0.0"
    	  , gpsLaengePosition: M.Model.attr('String', {})
//			  handauftragsBezeichnung: "",
    	  , handauftragsBezeichnung: M.Model.attr('String', {})
//			  handauftragsId: "",
    	  , handauftragsId: M.Model.attr('String', {})
//    		  mitarbeiterId: "12"
    	  , mitarbeiterId: M.Model.attr('String', {})
//    		  name: "Alber"
    	  , name: M.Model.attr('String', {})
//    		  nameVorname: "Alber, Michael"
    	  , nameVorname: M.Model.attr('String', {})
//    		  positionsBezeichnung: "6657Heim"
    	  , positionsBezeichnung: M.Model.attr('String', {})
//    		  positionsId: "1874"
    	  , positionsId: M.Model.attr('String', {})
//    		  taetigkeit: "HolzLackraum"
    	  , taetigkeit: M.Model.attr('String', {})
//    		  taetigkeitsId: "21"
    	  , taetigkeitsId: M.Model.attr('String', {})
//    		  taetigkeitsart: "0"
    	  , taetigkeitsart: M.Model.attr('String', {})
//    		  von: "10:36:45"
    	  , von: M.Model.attr('String', {})
//    		  vorname: "Michael"
    	  , vorname: M.Model.attr('String', {})

    	  , remark: M.Model.attr('String', {})

}, M.DataConsumer.configure({

      appendRecords: NO

    , responsePath: 'zeitbuchungen'

    , url: function (datum, mitarbeiterID) {
        var myUrl = 'https://';
        if (DigiWebApp.SettingsController.getSetting('benutzeHttps') === false) {
            myUrl = 'http://';
        }
        myUrl = myUrl + DigiWebApp.JSONDatenuebertragungController.DatabaseServer
            + '/WebAppServices/zeitdaten?modus=0&firmenId=' + DigiWebApp.SettingsController.getSetting('company')
            + '&kennwort=' + DigiWebApp.SettingsController.getSetting('password')
            + '&geraeteId=' + DigiWebApp.SettingsController.getSetting('workerId')
            + '&geraeteTyp=2&softwareVersion=' + DigiWebApp.RequestController.softwareVersion
            + '&mitarbeiterId=' + mitarbeiterID
            + '&datum=' + datum
            + '&requestTimestamp=' + M.Date.now().date.valueOf();
        if (DigiWebApp.ApplicationController.profilingIntervalVar === null) {
        	console.log('Zeitbuchungen: using ' + myUrl);
        }
		return myUrl;
    }

    /* map needs to return record obj which can be handled by createRecord */
    , map: function(obj) {
    	if (obj === null) {
    		return {
        	    auftragsBezeichnung: null
	      	  , auftragsId: null
	      	  , bis: null
	      	  , datum: null
	      	  , dauer: null
	      	  , farbeAmpel: null
	      	  , gpsBreite: null
	      	  , gpsBreitePosition: null
	      	  , gpsLaenge: null
	      	  , gpsLaengePosition: null
		      , handauftragsBezeichnung: null
		      , handauftragsId: null
	      	  , mitarbeiterId: null
	      	  , name: null
	      	  , nameVorname: null
	      	  , positionsBezeichnung: null
	      	  , positionsId: null
	      	  , taetigkeit: null
	      	  , taetigkeitsId: null
	      	  , taetigkeitsart: null
	      	  , von: null
	      	  , vorname: null
	      	  , remark: null
    		};
    	} 
    	//console.log(obj);
        return {
//    	  	  auftragsBezeichnung: "6657Heim"
    	    auftragsBezeichnung: obj.auftragsBezeichnung
//    		  auftragsId: "950"
    	  , auftragsId: obj.auftragsId
//    		  bis: "10:37:08"
    	  , bis: obj.bis
//    		  datum: "14.06.2012"
    	  , datum: obj.datum
//    		  dauer: "00:00"
    	  , dauer: obj.dauer
//    		  farbeAmpel: ""
    	  , farbeAmpel: obj.farbeAmpel
//    		  gpsBreite: "0.0"
    	  , gpsBreite: obj.gpsBreite
//    		  gpsBreitePosition: "0.0"
    	  , gpsBreitePosition: obj.gpsBreitePosition
//    		  gpsLaenge: "0.0"
    	  , gpsLaenge: obj.gpsLaenge
//    		  gpsLaengePosition: "0.0"
    	  , gpsLaengePosition: obj.gpsLaengePosition
//            handauftragsBezeichnung: "",
  	      , handauftragsBezeichnung: obj.handauftragsBezeichnung
//			  handauftragsId: "",
  	      , handauftragsId: obj.handauftragsId
//    		  mitarbeiterId: "12"
    	  , mitarbeiterId: obj.mitarbeiterId
//    		  name: "Alber"
    	  , name: obj.name
//    		  nameVorname: "Alber, Michael"
    	  , nameVorname: obj.nameVorname
//    		  positionsBezeichnung: "6657Heim"
    	  , positionsBezeichnung: obj.positionsBezeichnung
//    		  positionsId: "1874"
    	  , positionsId: obj.positionsId
//    		  taetigkeit: "HolzLackraum"
    	  , taetigkeit: obj.taetigkeit
//    		  taetigkeitsId: "21"
    	  , taetigkeitsId: obj.taetigkeitsId
//    		  taetigkeitsart: "0"
    	  , taetigkeitsart: obj.taetigkeitsart
//    		  von: "10:36:45"
    	  , von: obj.von
//    		  vorname: "Michael"
    	  , vorname: obj.vorname

    	  , remark: obj.bemerkung

        };
    }

}));