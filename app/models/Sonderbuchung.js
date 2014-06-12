// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: DigiWebApp
// Model: Sonderbuchung
// ==========================================================================

DigiWebApp.Sonderbuchung = M.Model.create({

    /* Define the name of your model. Do not delete this property! */
    __name__: 'Sonderbuchung'

    , id: M.Model.attr('String', {
        isRequired: NO // wird erst benötigt, wenn Sonderbuchungen vom WebService geholt werden müssten
    })

    , ressourceId: M.Model.attr('String', {
    	isRequired: NO
    })

    , sonderbuchungsTyp: M.Model.attr('String', {
//	    1	<pausenStorno>
//	    2	<audio>
//	    3	<spesen>
//	    4	<uebernachtung>
//	    5	<gefahreneKilometer>
//	    6	<image>
        isRequired: NO
    })

    , sonderbuchungsEigenschaften: M.Model.attr('String', {
    	// z.B.:
    	// [   {"SonderbuchungId": "123", "Key": "<FestepausendefinitionId>", "StringValue": "23"}
    	//   , {"SonderbuchungId": "123", "Key": "<Datum>", "StringValue": "01.02.2014"}
    	// ]
        isRequired: NO
    })
    
    , uebertragen: M.Model.attr('String', {
    	isRequired: NO
    })

    , festepausendefinitionId: M.Model.attr('String', {
    	isRequired: NO
    })
    
    , datum: M.Model.attr('String', {
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
			if (parseInt(queryId) === parseInt(el.get("id"))) {
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
        	console.error("ERROR in findSorted: " + e2);
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
	    	console.error("ERROR in " + that.name + ".saveSorted: " + e3);
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
