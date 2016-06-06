// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: DigiWebApp
// Model: SentBooking
// ==========================================================================

DigiWebApp.SentBooking = M.Model.create({

    /* Define the name of your model. Do not delete this property! */
    __name__: 'SentBooking'

    , fileName: M.Model.attr('String', {
        isRequired: NO
    })

    , fileType: M.Model.attr('String', {
        isRequired: NO
    })

    , orderId: M.Model.attr('String',{
        isRequired: NO
    })

    , orderName: M.Model.attr('String',{
        isRequired: NO
    })

    , timezoneOffset: M.Model.attr('String', {
        isRequired: NO
    })

    , timezone: M.Model.attr('String', {
        isRequired: NO
    })

    , timeStampStart: M.Model.attr('String', {
        isRequired: NO
    })

    , timeStampEnd: M.Model.attr('String', {
        isRequired: NO
    })

    , date: M.Model.attr('String', { // is aggregated by the two timestamp values above

    })

    , startTimeString: M.Model.attr('String', {
        isRequired: NO
    })

    , endeTimeString: M.Model.attr('String', {
        isRequired: NO
    })

    , startDateString: M.Model.attr('String', {
        isRequired: NO
    })

    , endeDateString: M.Model.attr('String', {
        isRequired: NO
    })

    , latitude: M.Model.attr('String', {
        isRequired:NO
    })

    , longitude: M.Model.attr('String', {
        isRequired: NO
    })

    , latitude_bis: M.Model.attr('String', {
        isRequired:NO
    })

    , longitude_bis: M.Model.attr('String', {
        isRequired: NO
    })

    , gpsLaengeVon: M.Model.attr('String', {
    	// runtime only (für das senden)
        isRequired: NO
    })

    , gpsBreiteVon: M.Model.attr('String', {
    	// runtime only (für das senden)
        isRequired: NO
    })

    , gpsLaengeBis: M.Model.attr('String', {
    	// runtime only (für das senden)
        isRequired: NO
    })

    , gpsBreiteBis: M.Model.attr('String', {
    	// runtime only (für das senden)
        isRequired: NO
    })

    , handOrderName: M.Model.attr('String', {
        isRequired: NO
    })

    , handOrderId: M.Model.attr('String', {
        isRequired: NO
    })

    , handOrderVaterId: M.Model.attr('String', {
        isRequired: NO
    })

    , positionId: M.Model.attr('String', {
        isRequired: NO
    })

    , positionName: M.Model.attr('String', {
        isRequired: NO
    })

    , activityId: M.Model.attr('String', {
        isRequired: NO
    })

    , activityName: M.Model.attr('String', {
        isRequired: NO
    })

    , isCurrent: M.Model.attr('Boolean', {
        isRequired: NO
    })

    , spesenAuswahl: M.Model.attr('String', {
        isRequired: NO
    })

    , uebernachtungAuswahl: M.Model.attr('String', {
        isRequired: NO
    })

    , gefahreneKilometer: M.Model.attr('Number', {
        isRequired: NO
    })

    , employees: M.Model.attr('String', {
        isRequired: NO
    })

    , mitarbeiterId: M.Model.attr('String', {
    	// runtime only (für das senden)
        isRequired: NO
    })
    
    , remark: M.Model.attr('String', {
        isRequired: NO
    })

    , istFeierabend: M.Model.attr('Boolean', {
    	isRequired: NO
    })
    
    , istKolonnenbuchung: M.Model.attr('Boolean', {
    	isRequired: NO
    })
    
    , genauigkeitVon: M.Model.attr('String', {
    	isRequired: NO
    })

    , gps_zeitstempelVon: M.Model.attr('String', {
    	isRequired: NO
    })

    , ermittlungsverfahrenVon: M.Model.attr('String', {
    	isRequired: NO
    })

    , genauigkeitBis: M.Model.attr('String', {
    	isRequired: NO
    })

    , gps_zeitstempelBis: M.Model.attr('String', {
    	isRequired: NO
    })

    , ermittlungsverfahrenBis: M.Model.attr('String', {
    	isRequired: NO
    })

    , ServiceApp_Status: M.Model.attr('String', {
    	isRequired: NO
    })

    , closeBooking: function() {
        this.set('timeStampEnd', +new Date());
    }

    , setRemark: function(v) {
        this.set('remark', v);
    }

    , setAsCurrent: function() {
        this.set('isCurrent', YES);
    }

    , removeAsCurrent: function() {
        this.set('isCurrent', NO);
    }

    , deleteAll: function() {
        _.each(this.find(), function(el) {
            el.del();
        });
    }

}, M.DataProviderLocalStorage);
