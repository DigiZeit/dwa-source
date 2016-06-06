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
    
    , vaterId: M.Model.attr('String', {
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
                if(!(el.get('id') == openBooking.get('handOrderId') || el.get('name') == openBooking.get('handOrderName'))) {
                    el.del();
                }
            } else {
                el.del();
            }
        });
    }
    
	, saveSorted: function() {
	    var that = this;
	    if (!that.save()) return false;
	
	    // add m_id to Key-Stringlist
	    var keys = [];
	    try {
	    	var keyString = localStorage.getItem(DigiWebApp.ApplicationController.storagePrefix + '_' + that.name.toLowerCase() + 'Keys');
	    	if ( keyString !== null) {
	    		keys = JSON.parse(keyString);
	    	}
	    } catch(e3) {
	    	trackError(e3);
	    }
	    var found = NO;
	    _.each(keys, function(k) {
	    	if (that.m_id === k) { found = YES; }
	    });
	    if (found === NO) { keys.push(that.m_id); }
	    localStorage.setItem(DigiWebApp.ApplicationController.storagePrefix + '_' + that.name.toLowerCase() + 'Keys', JSON.stringify(keys));
	    return true;
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
        	trackError(e2);
        }

        var records = [];

        if (keys) {
            _.each(keys, function(k) {
	        	var record = that.find({key:DigiWebApp.ApplicationController.storagePrefix + that.name + '_' + k});
	        	if (record) {
	        		records.push(record);
	        	}
            });
        }
        return records;
    }
    
	, getByVaterId: function(vaterId) {
		var that = this;
		var result = [];
		var sortInApp = true;
		var all = [];
		if (sortInApp) {
			all = that.find();
		} else {
			all = that.findSorted();
		}
		if (typeof(vaterId) == "undefined" || vaterId == null || parseIntRadixTen(vaterId) == 0) {
			_.each(all, function(el){
				if (typeof(el.get("vaterId")) == "undefined" || el.get("vaterId") == null ) {
					result.push(el);
				}
			});
		} else {
			//return that.find({query:{identifier: 'vaterId', operator: '=', value: vaterId}}); // funktioniert nicht, wenn vaterId im localStorage undefined...
			_.each(all, function(el){
				if (typeof(el.get("vaterId")) != "undefined" 
						&& el.get("vaterId")  != null 
						&& parseIntRadixTen(el.get("vaterId")) == parseIntRadixTen(vaterId)
				) {
					result.push(el);
				}
			});
		}
		if (sortInApp) {
			return _.sortBy(result, function(el) { return el.get('name'); });
		} else {
			return result;
		}
	}
	
	, hasPositions: function() {
		// noch gibt es keine Hand"ordner"
		return false;
	}

    , getById: function(selectedId) {
		var that = this;
		return _.find(DigiWebApp[that.name].find(), function(item) {
			return (item.get('id') == selectedId);
		});
	}

    , isHandposition: function() {
    	var vaterId = this.get("vaterId"); 
		return (typeof(vaterId) != "undefined" && vaterId != null && parseIntRadixTen(vaterId) != 0);
	}


}, M.DataProviderLocalStorage);
