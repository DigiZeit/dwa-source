// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: DigiWebApp
// Model: BautagebuchEinstellungen
// ==========================================================================

DigiWebApp.BautagebuchEinstellungen = M.Model.create({
    
    /* Define the name of your model. Do not delete this property! */
    __name__: 'BautagebuchEinstellungen'

    , startUhrzeit: M.Model.attr('String', {
          isRequired: NO
    })

    , inStundenBuchen: M.Model.attr('String', {
          isRequired: NO
    })
    
    , falscheZeitenIgnorieren: M.Model.attr('String', {
        isRequired: NO
    })

    , positionVorselektieren: M.Model.attr('String', {
        isRequired: NO
    })

    , in15MinutenSchritten: M.Model.attr('String', {
        isRequired: NO
    })

    , alleMitarbeiterVorselektiert: M.Model.attr('String', {
        isRequired: NO
    })

	, deleteAll: function() {
        _.each(this.find(), function(el) {
    		el.deleteSorted();
        });
    }

	, deleteSorted: function() {
	    var that = this;
	
	    // remove m_id from Key-Stringlist
	    var keys = [];
	    var newKeys = [];
	    try {
	    	var keyString = localStorage.getItem(DigiWebApp.ApplicationController.storagePrefix + '_' + that.name.toLowerCase() + 'Keys');
	    	if ( keyString !== null) {
	    		keys = JSON.parse(keyString);
	    	}
	    } catch(e2) {
	    	trackError(e2);
	    }
	    if (keys){
	        _.each(keys, function(k) {
	        	if (k !== that.m_id) {
	        		newKeys.push(k);
	        	}
	        });
		    localStorage.setItem(DigiWebApp.ApplicationController.storagePrefix + '_' + that.name.toLowerCase() + 'Keys', JSON.stringify(newKeys));
	    }
	
	    that.del();
	}
	
	, saveSorted: function() {
	    var that = this;
	    that.save();
	
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
	}
	
	, findSorted: function() {
	    var that = this;
	    var keys = [];
	    try {
	    	var keyString = localStorage.getItem(DigiWebApp.ApplicationController.storagePrefix + '_' + that.name.toLowerCase() + 'Keys');
	    	if ( keyString !== null) {
	    		keys = JSON.parse(keyString);
	    	}
	    } catch(e4) {
	    	trackError(e4);
	    }
	
	    var records = [];
	
	    if (keys) {
	        _.each(keys, function(k) {
	            records.push(that.find({key:DigiWebApp.ApplicationController.storagePrefix + that.name + '_' + k}));
	        });
	    }
	    return records;
	}

}, M.DataProviderLocalStorage);
