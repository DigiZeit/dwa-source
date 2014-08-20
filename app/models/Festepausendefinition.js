// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: DigiWebApp
// Model: Festepausendefinition
// ==========================================================================

DigiWebApp.Festepausendefinition = M.Model.create({

    /* Define the name of your model. Do not delete this property! */
    __name__: 'Festepausendefinition'

    , id: M.Model.attr('String', {
        isRequired: YES
    })

    , ressourceId: M.Model.attr('String', {
    	isRequired: NO
    })

    , wochentagId: M.Model.attr('String', {
    	// 0 = Sonntag, 1 = Montag, ...
        isRequired: YES
    })
    
    , von: M.Model.attr('String', {
    	// "23:00"
        isRequired: NO
    })
    
    , bis: M.Model.attr('String', {
    	// "00:15"
        isRequired: NO
    })

    , deleteAll: function() {
    	var that = this;
        _.each(this.find(), function(el) {
            el.del();
        });
        localStorage.removeItem(DigiWebApp.ApplicationController.storagePrefix + '_' + that.name.toLowerCase() + 'Keys');
    }

	, findById: function(queryId) {
		var foundElement = null;
		var that = this;
		$.each(that.find(),function(key, el){
			if (parseIntRadixTen(queryId) === parseIntRadixTen(el.get("id"))) {
				foundElement = el;
				return false; // break
			}
			return true;
		});
		return foundElement;
	}
	
    , findSorted: function() {
        var that = this;
        var keys = [];
        try {
            keys = JSON.parse(localStorage.getItem(DigiWebApp.ApplicationController.storagePrefix + '_' + this.name.toLowerCase() + 'Keys'));
        } catch(e2) {
        	trackError(e2);
        }

        var records = [];

        if (keys){
            _.each(keys, function(k) {
                records.push(that.find({key:M.LOCAL_STORAGE_PREFIX + M.Application.name + M.LOCAL_STORAGE_SUFFIX + that.name + '_' + k}));
            });
        }
        return records;
    }

    , saveSorted: function() {
	    var that = this;
	    if (!that.save()) return false;
	
	    // add m_id to Key-Stringlist
	    var keys = [];
	    try {
	    	var keyString = localStorage.getItem(DigiWebApp.ApplicationController.storagePrefix + '_' + that.name.toLowerCase() + 'Keys');
	    	if ( keyString !== null ) {
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
	

}, M.DataProviderLocalStorage);
