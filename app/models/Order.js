// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: DigiWebApp
// Model: Order
// ==========================================================================

DigiWebApp.Order = M.Model.create({

    /* Define the name of your model. Do not delete this property! */
    __name__: 'Order'

    , id: M.Model.attr('String', {
        isRequired: NO
    })

    , name: M.Model.attr('String', {
        isRequired: NO
    })

    , getById: function(selectedId) {
		var that = this;
		return _.find(DigiWebApp[that.name].find(), function(item) {
			return (item.get('id') == selectedId);
		});
	}

    , getList: function(paramObj) {
		if (!paramObj) paramObj = {};
		var that = this;
		var resultList = [];
		var auftraege = DigiWebApp.Order.findSorted();
		var handauftraege = DigiWebApp.HandOrder.findSorted();
		var alleAuftraege = handauftraege.concat(auftraege);
		var itemSelected = NO;
		_.each(alleAuftraege, function(obj){
    		var item = { label: obj.get('name'), value: obj.get('id') };
    		if ((paramObj.selectedId && obj.get('id') == paramObj.selectedId) || alleAuftraege.length == 1) {
    			item.isSelected = YES;
    			itemSelected = YES;
    		}
    		resultList.push(item);
		});
		if (!itemSelected && resultList.length > 0) {
			resultList.push({label: M.I18N.l('selectSomething'), value: '0', isSelected:YES});
		} else if (resultList.length == 0) {
			resultList.push({label: M.I18N.l('noData'), value: '0', isSelected:YES});
		}
		return resultList;
	}

	, getPositionen: function() {
		var that = this;
		return _.compact(_.filter(DigiWebApp.Position.findSorted(), function(item) {
			var foundIndex = _.find([item.get('orderId')], function(myId) {
				return (that.get('id') == myId);
			});
			return (foundIndex);
		}));
	}
	
    , deleteAll: function() {
		var that = this;
        _.each(this.find(), function(el) {
            el.del();
        });
	    localStorage.removeItem(DigiWebApp.ApplicationController.storagePrefix + '_' + that.name.toLowerCase() + 'Keys');
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

}, M.DataProviderLocalStorage);
