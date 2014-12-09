// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: DigiWebApp
// Model: Employee
// ==========================================================================

DigiWebApp.Employee = M.Model.create({
    
    /* Define the name of your model. Do not delete this property! */
    __name__: 'Employee'

    , id: M.Model.attr('String', {
        isRequired: NO
    })

    , name: M.Model.attr('String', {
        isRequired: NO
    })

    , kolonnenId: M.Model.attr('String', {
        isRequired: NO
    })

    , isSelected: M.Model.attr('Boolean', {
        isRequired: NO
    })

    , deleteAll: function() {
        _.each(this.find(), function(el) {
            el.del();
        });
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

}, M.DataProviderLocalStorage);
