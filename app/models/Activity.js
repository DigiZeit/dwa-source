// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: DigiWebApp
// Model: Activity
// ==========================================================================

DigiWebApp.Activity = M.Model.create({

    /* Define the name of your model. Do not delete this property! */
    __name__: 'Activity'

    , id: M.Model.attr('String', {
        isRequired: NO
    })

    , name: M.Model.attr('String', {
        isRequired: NO
    })
    
    , istStandardPause: M.Model.attr('Boolean', {
        isRequired: NO
    })
    
    , istUnterschriftsAbnahme: M.Model.attr('Boolean', {
        isRequired: NO
    })
    
    , istFahrzeitRelevant: M.Model.attr('Boolean', {
        isRequired: NO
    })
    
    , positionId: M.Model.attr('String',{
            isRequired: NO // 0: nicht MA-zugeordnet, 1: MA-zugeordnet
    })

    , deleteAll: function() {
    	var that = this;
        _.each(this.find(), function(el) {
            el.del();
        });
        localStorage.removeItem(DigiWebApp.ApplicationController.storagePrefix + '_' + that.name.toLowerCase() + 'Keys');
    }

	, findById: function(queryId) {
		_.each(this.find(),function(el){
			if (parseInt(queryId) === parseInt(el.get("id"))) {
				return el;
			}
		});
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
	    	if ( keyString !== null) {
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
