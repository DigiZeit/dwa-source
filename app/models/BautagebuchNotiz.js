// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: DigiWebApp
// Model: BautagebuchNotiz
// ==========================================================================

DigiWebApp.BautagebuchNotiz = M.Model.create({
    
    /* Define the name of your model. Do not delete this property! */
    __name__: 'BautagebuchNotiz'

    , bautagesberichtId: M.Model.attr('String', {
        isRequired: NO
    })

    , data: M.Model.attr('String', {
        isRequired: NO
    })

    , orderId: M.Model.attr('String', {
        isRequired: NO
    })

    , orderName: M.Model.attr('String',{
        isRequired: NO
    })

    , positionId: M.Model.attr('String', {
        isRequired: NO
    })

    , positionName: M.Model.attr('String',{
        isRequired: NO
    })

    , activityId: M.Model.attr('String', {
        isRequired: NO
    })

    , activityName: M.Model.attr('String',{
        isRequired: NO
    })

    , handOrderId: M.Model.attr('String', {
        isRequired: NO
    })

    , handOrderName: M.Model.attr('String',{
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
	    if (keys) {
	        _.each(keys, function(k) {
	        	if (k !== that.m_id) {
	        		newKeys.push(k);
	        	}
	        });
		    localStorage.setItem(DigiWebApp.ApplicationController.storagePrefix + '_' + that.name.toLowerCase() + 'Keys', JSON.stringify(newKeys));
	    }
	
	    return that.del();
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
	
	, findSorted: function(bautagesberichtId) {
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
	        	var loadedItem = that.find({key:DigiWebApp.ApplicationController.storagePrefix + that.name + '_' + k});
	        	if ( (bautagesberichtId && loadedItem.get("bautagesberichtId") === bautagesberichtId) || (typeof(bautagesberichtId) === "undefined") ) {
		            records.push(loadedItem);
	        	}
	        });
	    }
	    return records;
	}

}, M.DataProviderLocalStorage);
