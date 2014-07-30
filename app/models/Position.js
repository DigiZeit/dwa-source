// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: DigiWebApp
// Model: Position
// ==========================================================================

DigiWebApp.Position = M.Model.create({

    /* Define the name of your model. Do not delete this property! */
    __name__: 'Position'

    , id: M.Model.attr('String',{
    	isRequired: NO
    })

    , name: M.Model.attr('String', {
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

    , telefon: M.Model.attr('String', {
        isRequired: NO
    })

    , fax: M.Model.attr('String', {
        isRequired: NO
    })

    , email: M.Model.attr('String', {
        isRequired: NO
    })

    , ansprechpartner: M.Model.attr('String', {
        isRequired: NO
    })

    , kundenname: M.Model.attr('String', {
        isRequired: NO
    })

    , longitude: M.Model.attr('String', {
        isRequired: NO
    })

    , latitude: M.Model.attr('String', {
        isRequired: NO
    })

    , description: M.Model.attr('String', {
        isRequired: NO
    })

    , orderId: M.Model.attr('String', {
        isRequired: NO
    })
    
    , positionBegin: M.Model.attr('String', {
        isRequired: NO
    })
    
    , positionEnd: M.Model.attr('String', {
        isRequired: NO
    })
    
    , appointments: M.Model.attr('String', {
        isRequired: NO
    })

    , arbeitsbeginn: M.Model.attr('String', {
        isRequired: NO
    })
    	
    , arbeitsende: M.Model.attr('String', {
        isRequired: NO
    })
    	
    , getById: function(selectedId) {
		var that = this;
		return _.find(DigiWebApp[that.name].find(), function(item) {
			return (item.get('id') == selectedId);
		});
	}

    , getAuftrag: function() {
		return DigiWebApp.Order.getById(this.get('orderId'));
	}

	, getTaetigkeiten: function() {
		var that = this;
		var workPlans = _.select(DigiWebApp.WorkPlan.find(), function(wp) {
            if (wp) return wp.get('id') == that.get('id');
        });
        var activities;
        if (workPlans.length > 0) {
            activities = that.getActivitiesFromWorkplan(workPlans[0]);
        } else {
            activities = _.filter(DigiWebApp.Activity.findSorted(), function(act){ return (act.get('positionId') == 1)});
        }
        return _.compact(activities);
	}

    , getActivitiesFromWorkplan: function(workplan) {
        var actIds = workplan.get('activityIds').split(',');
        var activities = [];
        if (actIds && actIds.length > 0) {
        	var alleTaetigkeiten = DigiWebApp.Activity.find(); 
            for (var i = 0; i < actIds.length; i++) {
            	var taet = _.find(alleTaetigkeiten, function(t){ return parseInt(t.get("id")) === parseInt(actIds[i])});
            	if (taet) activities.push(taet);
            }

        }
        if (parseInt(workplan.get("workplanType")) === 1) {
        	// only those activities which are bound to employee
            activities = _.map(activities, function(act) {
            	if ( typeof(act) === "undefined" ) {
            		console.log("UNDEFINED ACTIVITY");
            		return null;
            	} else {
        			var zugeordnet = NO;
            		var allActivities = DigiWebApp.Activity.findSorted();
            		_.each(allActivities, function(acti) {
            			// herausfinden, ob diese Tätigkeit dem Mitarbeiter zugeordnet ist.
            			if (act.get("id") === acti.get("id") && parseInt(acti.get("positionId")) === 1) {
            				zugeordnet = YES;
            			}
            		});
        			if (zugeordnet) {
        				return act;
        			} else {
        				return null;	
        			}
            	}
            });
        }
        activities = _.compact(activities);
        return activities;
    }

    , getList: function(parentId, selectedId) {
		var resultList = [];
		var items = DigiWebApp.Position.findSorted();
		items = _.filter(items, function(item){
			return (item.get('orderId') == parentId);
		});
		var itemSelected = NO;
		_.each(items, function(obj){
    		var item = { label: obj.get('name'), value: obj.get('id') };
    		if (selectedId && obj.get('id') == selectedId) {
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
        	console.error("ERROR in findSorted: " + e2);
        }

        var records = [];

        if (keys) {
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