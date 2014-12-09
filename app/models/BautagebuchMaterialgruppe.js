// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: DigiWebApp
// Model: BautagebuchMaterialgruppe
// 
// zu bestücken mittels WebService
// ==========================================================================

DigiWebApp.BautagebuchMaterialgruppe = M.Model.create({
    
    /* Define the name of your model. Do not delete this property! */
    __name__: 'BautagebuchMaterialgruppe'

    , id: M.Model.attr('String', {
        isRequired: NO
    })
    
    , vaterId: M.Model.attr('String', {
        isRequired: NO
    })
    
    , bezeichnung: M.Model.attr('String', {
        isRequired: NO
    })

	, getMaterialien: function() {
		var that = this;
		return _.filter(DigiWebApp.BautagebuchMaterial.findSorted(), function(mat) {
			var foundIndex = _.find(JSON.parse(mat.get('materialgruppenIds')), function(myId) {
				return (that.get('id') == myId);
			});
			return (foundIndex);
		});
	}

	, getList: function(paramObj) {
		if (!paramObj) paramObj = {};
		var that = this;
		var resultList = [];
		var items = DigiWebApp[that.name].findSorted();
		var itemSelected = NO;
		_.each(items, function(obj){
			var item = { label: obj.get('bezeichnung'), value: obj.get('id') };
//			if ((paramObj.selectedId && obj.get('id') == paramObj.selectedId) || items.length == 1) {
//				item.isSelected = YES;
//				itemSelected = YES;
//			}
			resultList.push(item);
		});
		resultList.push({label: M.I18N.l('alle'), value: '0', isSelected:!itemSelected});
		return resultList;
	}

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
	        	var record = that.find({key:DigiWebApp.ApplicationController.storagePrefix + that.name + '_' + k});
	        	if (record) {
	        		records.push(record);
	        	}
	        });
	    }
	    records = _.sortBy(records, function(n) { return n.get("bezeichnung");})
	    return records;
	}

}, M.DataProviderLocalStorage);
