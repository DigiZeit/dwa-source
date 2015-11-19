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

    , vaterId: M.Model.attr('String', {
        isRequired: NO
    })

    , name: M.Model.attr('String', {
    	// bezeichnungGeraet
        isRequired: NO
    })

    , nummer: M.Model.attr('String', {
        isRequired: NO
    })

    , beschreibung: M.Model.attr('String', {
        isRequired: NO
    })

    , beginn: M.Model.attr('String', {
        isRequired: NO
    })

    , ende: M.Model.attr('String', {
        isRequired: NO
    })

    , sollzeit: M.Model.attr('String', {
        isRequired: NO
    })

    , istzeit: M.Model.attr('String', {
        isRequired: NO
    })

    , zeitpunktIstzeit: M.Model.attr('String', {
        isRequired: NO
    })

    , zeitpunktLetzteBuchung: M.Model.attr('String', {
        isRequired: NO
    })

    , auftragswert: M.Model.attr('String', {
        isRequired: NO
    })

    , materialgesamtkosten: M.Model.attr('String', {
        isRequired: NO
    })

    , auftragsstatus: M.Model.attr('String', {
        isRequired: NO
    })

    , lieferdatum: M.Model.attr('String', {
        isRequired: NO
    })

    , farbe: M.Model.attr('String', {
        isRequired: NO
    })

    , farbe: M.Model.attr('String', {
        isRequired: NO
    })
    
    , strasse: M.Model.attr('String', {
        isRequired: NO
    })

    , hausnummer: M.Model.attr('String', {
        isRequired: NO
    })

    , plz: M.Model.attr('String', {
        isRequired: NO
    })

    , ort: M.Model.attr('String', {
        isRequired: NO
    })

    , land: M.Model.attr('String', {
        isRequired: NO
    })

    , countrycode: M.Model.attr('String', {
        isRequired: NO
    })

    , longitude: M.Model.attr('String', {
        isRequired: NO
    })

    , latitude: M.Model.attr('String', {
        isRequired: NO
    })

    , telefon: M.Model.attr('String', {
        isRequired: NO
    })

    , fax: M.Model.attr('String', {
        isRequired: NO
    })

    , email: M.Model.attr('String', {
        isRequired: NO
    })

    , kundenname: M.Model.attr('String', {
        isRequired: NO
    })

    , ansprechpartner: M.Model.attr('String', {
        isRequired: NO
    })

    , getById: function(selectedId) {
		var that = this;
		return _.find(DigiWebApp[that.name].find(), function(item) {
			return (item.get('id') == selectedId);
		});
	}

	, getByVaterId: function(vaterId) {
		var that = this;
		var result = [];
		if (typeof(vaterId) == "undefined" || vaterId == null) {
			_.each(that.find(), function(el){
				if (typeof(el.get("vaterId")) == "undefined" || el.get("vaterId") == null ) {
					result.push(el);
				}
			});
		} else {
			//return that.find({query:{identifier: 'vaterId', operator: '=', value: vaterId}}); // funktioniert nicht, wenn vaterId im localStorage undefined...
			_.each(that.find(), function(el){
				if (typeof(el.get("vaterId")) != "undefined" 
						&& el.get("vaterId")  != null 
						&& parseIntRadixTen(el.get("vaterId")) == parseIntRadixTen(vaterId)
				) {
					result.push(el);
				}
			});
		}
		return _.sortBy(result, function(el) { return el.get('name'); });
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
    
    , hasPositions: function() {
		var childOrders = DigiWebApp.Order.getByVaterId(this.get('id'));
		var childHandOrders = DigiWebApp.HandOrder.getByVaterId(this.get('id'));
		var childPositions = DigiWebApp.Position.getByVaterId(this.get('id'));
    	var hasPositions = (childHandOrders.concat(childPositions).length > 0);
    	if (!hasPositions) return false;
    	_.each(childOrders, function(child){
    		if (child.hasPositions()) hasPositions = true;
    	});
    	return hasPositions;
    }

}, M.DataProviderLocalStorage);
