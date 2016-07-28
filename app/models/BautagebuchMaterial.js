// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: DigiWebApp
// Model: BautagebuchMaterial
// 
// zu bestücken mittels WebService
// ==========================================================================

DigiWebApp.BautagebuchMaterial = M.Model.create({
    
    /* Define the name of your model. Do not delete this property! */
    __name__: 'BautagebuchMaterial'

    , id: M.Model.attr('String', {
        isRequired: NO
    })
    
    , bezeichnung: M.Model.attr('String', {
        isRequired: NO
    })

    , nummer: M.Model.attr('String', {
        isRequired: NO
    })

    , standardEinheitId: M.Model.attr('String', {
        isRequired: NO
    })

    , einheitenIds: M.Model.attr('String', {
        isRequired: NO
    })

    , lieferantenIds: M.Model.attr('String', {
        isRequired: NO
    })

    , herstellerId: M.Model.attr('String', {
        isRequired: NO
    })

    , materialgruppenIds: M.Model.attr('String', {
        isRequired: NO
    })

    , einzelpreis: M.Model.attr('String', {
        isRequired: NO
    })

    , materialtypId: M.Model.attr('String', {
        isRequired: NO
    })

    , getHersteller: function() {
		return DigiWebApp.BautagebuchHersteller.find({query:{identifier: 'id', operator: '=', value: "" + this.get('herstellerId')}})[0];
	}
    
	, getMaterialtyp: function() {
		return DigiWebApp.BautagebuchMaterialtyp.find({query:{identifier: 'id', operator: '=', value: "" + this.get('materialtypId')}})[0];
	}
	
	, getLieferanten: function() {
		var result = [];
		_.each(JSON.parse(this.get('lieferantenIds')), function(myId){
			var item = DigiWebApp.BautagebuchLieferant.find({query:{identifier: 'id', operator: '=', value: "" + myId}})[0];
			if (item) {
				result.push(item);
			}
		});
		return result;
	}

	, getMaterialgruppen: function() {
		var result = [];
		_.each(JSON.parse(this.get('materialgruppenIds')), function(myId){
			var item = DigiWebApp.BautagebuchMaterialgruppe.find({query:{identifier: 'id', operator: '=', value: "" + myId}})[0];
			if (item) {
				result.push(item);
			}
		});
		return result;
	}

	, getMaterialbuchungen: function() {
		return DigiWebApp.BautagebuchMaterialbuchung.find({query:{identifier: 'materialId', operator: '=', value: "" + this.get('id')}});
	}

	, getStandardEinheit: function() {
		return DigiWebApp.BautagebuchMengeneinheit.find({query:{identifier: 'standardEinheitId', operator: '=', value: "" + this.get('id')}});
	}

	, getMengeneinheiten: function() {
		var result = [];
		_.each(JSON.parse(this.get('einheitenIds')), function(myId){
			var item = DigiWebApp.BautagebuchMengeneinheit.find({query:{identifier: 'id', operator: '=', value: "" + myId}})[0];
			if (item) {
				result.push(item);
			}
		});
		return result;
	}

    , getList: function(paramObj) {
		if (!paramObj) paramObj = {};
    	var that = this;
		var resultList = [];
		var items = DigiWebApp[that.name].findSorted();
		var itemSelected = NO;
		if (paramObj.lieferantId && parseIntRadixTen(paramObj.lieferantId) != 0) {
			items = _.filter(items, function(mat) {
				return _.contains(JSON.parse(mat.get('lieferantenIds')), "" + paramObj.lieferantId);
			});
		}
		if (paramObj.herstellerId && parseIntRadixTen(paramObj.herstellerId) != 0) {
			items = _.filter(items, function(mat) {
				return _.contains([mat.get('herstellerId')], "" + paramObj.herstellerId);
			});
		}
		if (paramObj.materialgruppeId && parseIntRadixTen(paramObj.materialgruppeId) != 0) {
			items = _.filter(items, function(mat) {
				return _.contains(JSON.parse(mat.get('materialgruppenIds')), "" + paramObj.materialgruppeId);
			});
		}
		if (paramObj.materialtypId && parseIntRadixTen(paramObj.materialtypId) != 0) {
			items = _.filter(items, function(mat) {
				return _.contains([mat.get('materialtypId')], "" + paramObj.materialtypId);
			});
		}
		_.each(items, function(obj){
    		var item = { label: obj.get('bezeichnung'), value: obj.get('id') };
    		if ((paramObj.selectedId && obj.get('id') == paramObj.selectedId) || items.length == 1) {
    			item.isSelected = YES;
    			itemSelected = YES;
    		}
    		resultList.push(item);
		});
		if (!itemSelected) {
			resultList.push({label: M.I18N.l('BautagebuchManuelleEingabe'), value: '0', isSelected:YES});
		} else {
			resultList.push({label: M.I18N.l('BautagebuchManuelleEingabe'), value: '0'});
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
	    return records;
	}

}, M.DataProviderLocalStorage);
