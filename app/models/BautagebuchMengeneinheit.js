// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: DigiWebApp
// Model: BautagebuchMengeneinheit
// 
// zu bestücken mittels WebService
// ==========================================================================

DigiWebApp.BautagebuchMengeneinheit = M.Model.create({
    
    /* Define the name of your model. Do not delete this property! */
    __name__: 'BautagebuchMengeneinheit'

    , id: M.Model.attr('String', {
        isRequired: NO
    })
    
    , kuerzel: M.Model.attr('String', {
        isRequired: NO
    })

	, getMaterialien: function() {
		var that = this;
		return _.filter(DigiWebApp.BautagebuchMaterial.findSorted(), function(mat) {
			var foundIndex = _.find(JSON.parse(mat.get('einheitenIds')), function(myId) {
				return (that.get('id') == myId);
			});
			return (foundIndex);
		});
	}

	, getList: function(paramObj) {
		if (!paramObj) paramObj = {};
		var that = this;
		var resultList = [];
		var items = null;
		if (paramObj.items) {
			items = paramObj.items;
		} else {
			items = DigiWebApp[that.name].findSorted();
		}
		var itemSelected = NO;
		_.each(items, function(obj){
			var item = { label: obj.get('kuerzel'), value: obj.get('id') };
			if (paramObj.selectedId && obj.get('id') == paramObj.selectedId) {
				item.isSelected = YES;
				itemSelected = YES;
			}
			resultList.push(item);
		});
		if (!itemSelected) {
			resultList.push({label: M.I18N.l('selectSomething'), value: '0', isSelected:YES});
		}
		return resultList;
	}
	
    , getById: function(selectedId) {
		var that = this;
		return _.find(DigiWebApp[that.name].find(), function(item) {
			return (item.get('id') == selectedId);
		});
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
	    	console.error("ERROR in " + that.name + ".deleteSorted: " + e2);
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
	
	, findSorted: function(idToFind) {
	    var that = this;
	    var keys = [];
	    try {
	    	var keyString = localStorage.getItem(DigiWebApp.ApplicationController.storagePrefix + '_' + that.name.toLowerCase() + 'Keys');
	    	if ( keyString !== null) {
	    		keys = JSON.parse(keyString);
	    	}
	    } catch(e4) {
	    	console.error("ERROR in " + that.name + ".findSorted: " + e4);
	    }
	
	    var records = [];
	
	    if (keys) {
	        _.each(keys, function(k) {
	        	var item = that.find({key:DigiWebApp.ApplicationController.storagePrefix + that.name + '_' + k});
	        	if ( (idToFind && item.get("id") === idToFind) || (typeof(idToFind) === "undefined") ) {
	        		records.push(item);
	        	}
	        });
	    }
	    return records;
	}

}, M.DataProviderLocalStorage);
