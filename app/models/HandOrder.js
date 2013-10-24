// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: DigiWebApp
// Model: HandOrder
// ==========================================================================

DigiWebApp.HandOrder = M.Model.create({

    /* Define the name of your model. Do not delete this property! */
    __name__: 'HandOrder'

    , id: M.Model.attr('String', {
        isRequired: NO
    })

    , name: M.Model.attr('String', {
        isRequired: NO
    })

    , isLocalOnly: M.Model.attr('Boolean', {
        isRequired: NO
    })

    , deleteAll: function() {
        var bookings = DigiWebApp.Booking.find();
        var openBooking = _.detect(bookings, function(b) {
            return b.get('isCurrent') === true;
        });

        _.each(this.find(), function(el) {
            if(openBooking) {
                if(!(el.get('id') === openBooking.get('handOrderId') || el.get('name') === openBooking.get('handOrderName'))) {
                    el.del();
                }
            } else {
                el.del();
            }
        });
    }
    
    , findSorted: function() {
        var that = this;

        // Die handorderKeys stimmen nicht, daher normales find benutzen
        //TODO: handorderKeys richtig setzen, bzw. im Code suchen wo die (falsch) gesetzt werden
    	return that.find();
    	
        var keys = [];
        try {
            keys = JSON.parse(localStorage.getItem(DigiWebApp.ApplicationController.storagePrefix + '_' + this.name.toLowerCase() + 'Keys'));
        } catch(e2) {
        	console.error("ERROR in " + this.name + ".findSorted: " + e2);
        }

        var records = [];

        if (keys) {
            _.each(keys, function(k) {
            	var myKey = M.LOCAL_STORAGE_PREFIX + M.Application.name + M.LOCAL_STORAGE_SUFFIX + that.name + '_' + k;
               	//console.log(myKey);
            	var r = that.find({key:myKey});
            	//console.log(r);
                records.push(r);
            });
        }
        return records;
    }

}, M.DataProviderLocalStorage);
