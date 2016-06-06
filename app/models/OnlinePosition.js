// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: DigiWebApp
// Model: OnlinePosition
// ==========================================================================

DigiWebApp.OnlinePosition = M.Model.create({

    __name__: 'OnlinePosition'

    , positionsId: M.Model.attr('String',{
    	isRequired: NO
    })

    , auftragsBezeichnung: M.Model.attr('String', {
        isRequired: NO
    })

    , auftragsBeginn: M.Model.attr('String', {
        isRequired: NO
    })

    , auftragsEnde: M.Model.attr('String', {
        isRequired: NO
    })

    , positionsBezeichnung: M.Model.attr('String', {
        isRequired: NO
    })

    , strasse: M.Model.attr('String', {
        isRequired: NO
    })

    , hausnummer: M.Model.attr('String', {
        isRequired: NO
    })

    , plz: M.Model.attr('String', {
        isRequired: NO
    })

    , ort: M.Model.attr('String', {
        isRequired: NO
    })

    , land: M.Model.attr('String', {
        isRequired: NO
    })

    , countrycode: M.Model.attr('String', {
        isRequired: NO
    })

    , telefon: M.Model.attr('String', {
        isRequired: NO
    })

    , fax: M.Model.attr('String', {
        isRequired: NO
    })

    , email: M.Model.attr('String', {
        isRequired: NO
    })

    , ansprechpartner: M.Model.attr('String', {
        isRequired: NO
    })

    , kundenname: M.Model.attr('String', {
        isRequired: NO
    })

    , longitude: M.Model.attr('String', {
        isRequired: NO
    })

    , latitude: M.Model.attr('String', {
        isRequired: NO
    })

    , positionsBeschreibung: M.Model.attr('String', {
        isRequired: NO
    })

    , orderId: M.Model.attr('String', {
        isRequired: NO
    })

    , arbeitsbeginn: M.Model.attr('String', {
        isRequired: NO
    })
    	
    , arbeitsende: M.Model.attr('String', {
        isRequired: NO
    })
    	
    , deleteAll: function() {
        _.each(this.find(), function(el) {
            el.del();
        });
    }

}, M.DataConsumer.configure({

      appendRecords: NO

    , responsePath: 'positionen'

    , url: function(datum, mitarbeiterID) {
		var positionsId = DigiWebApp.ZeitbuchungenController.itemForDetails.get("positionsId");
        var myUrl = 'https://';
        if (DigiWebApp.SettingsController.getSetting('benutzeHttps') === false) {
            myUrl = 'http://';
        }
        myUrl = myUrl + DigiWebApp.JSONDatenuebertragungController.DatabaseServer
            + '/WebAppServices/positionen?modus=0&firmenId=' + DigiWebApp.SettingsController.getSetting('company')
            + '&kennwort=' + DigiWebApp.SettingsController.getSetting('password')
            + '&geraeteId=' + DigiWebApp.SettingsController.getSetting('workerId')
            + '&geraeteTyp=2&softwareVersion=' + DigiWebApp.RequestController.softwareVersion
            + '&positionsId=' + positionsId
            + '&requestTimestamp=' + M.Date.now().date.valueOf();
        if (DigiWebApp.ApplicationController.profilingIntervalVar === null) {
        	console.log('Positionen: using ' + myUrl);
        }
		return myUrl;
    }

    /* map needs to return record obj which can be handled by createRecord */
    , map: function(obj) {
    	if (obj === null) {
    		return {
            	positionsId: null
	      	  , positionsBezeichnung: null
	      	  , strasse: null
	      	  , hausnummer: null
	      	  , plz: null
	      	  , ort: null
	      	  , land: null
	      	  , countrycode: null
	      	  , telefon: null
	      	  , fax: null
	      	  , email: null
	      	  , ansprechpartner: null
	      	  , kundenname: null
	      	  , longitude: null
	      	  , latitude: null
	      	  , positionsBeschreibung: null
	      	  , orderId: null
	      	  , auftragsBezeichnung: null
	      	  , arbeitsbeginn: null
	      	  , arbeitsende: null
    		};
    	} 
    	//console.log(obj);
        return {
//            , id: M.Model.attr('String',{
        	positionsId: obj.positionsId
//            , name: M.Model.attr('String', {
    	  , positionsBezeichnung: obj.positionsBezeichnung
//            , strasse: M.Model.attr('String', {
    	  , strasse: obj.strasse
//            , hausnummer: M.Model.attr('String', {
    	  , hausnummer: obj.hausnummer
//            , plz: M.Model.attr('String', {
    	  , plz: obj.plz
//            , ort: M.Model.attr('String', {
    	  , ort: obj.ort
//            , land: M.Model.attr('String', {
    	  , land: obj.land
//            , countrycode: M.Model.attr('String', {
    	  , countrycode: obj.countrycode
//            , telefon: M.Model.attr('String', {
    	  , telefon: obj.telefon
//            , fax: M.Model.attr('String', {
    	  , fax: obj.fax
//            , email: M.Model.attr('String', {
    	  , email: obj.email
//            , ansprechpartner: M.Model.attr('String', {
    	  , ansprechpartner: obj.ansprechpartner
//            , kundenname: M.Model.attr('String', {
    	  , kundenname: obj.kundenname
//            , longitude: M.Model.attr('String', {
    	  , longitude: obj.longitude
//            , latitude: M.Model.attr('String', {
    	  , latitude: obj.latitude
//            , description: M.Model.attr('String', {
    	  , positionsBeschreibung: obj.positionsBeschreibung
//            , orderId: M.Model.attr('String', {
    	  , orderId: obj.orderId
    	  
    	  , auftragsBezeichnung: obj.auftragsBezeichnung

    	  , arbeitsbeginn: obj.arbeitsbeginn
    	  , arbeitsende: obj.arbeitsende

        };
    }

}));