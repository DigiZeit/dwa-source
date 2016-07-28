// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: DigiWebApp
// Model: SentTimeDataDays
// ==========================================================================

DigiWebApp.SentTimeDataDays = M.Model.create({

    /* Define the name of your model. Do not delete this property! */
    __name__: 'SentTimeDataDays'

    , tagLabel: M.Model.attr('String', {
        isRequired: NO
    })

    , deleteAll: function() {
        _.each(this.find(), function(el) {
            el.del();
        });
    }

	, deleteOld: function() {
		var daysToHoldBookingsOnDevice = 0;
		try {
			daysToHoldBookingsOnDevice = 0 + new Number(DigiWebApp.SettingsController.getSetting('daysToHoldBookingsOnDevice'));
		} catch(e2) {
//            DigiWebApp.ApplicationController.nativeAlertDialogView({
//                title: M.I18N.l('error')
//              , message: M.I18N.l('daysToHoldBookingsOnDeviceNaN')
//	        });
			daysToHoldBookingsOnDevice = DigiWebApp.SettingsController.defaultsettings.get('daysToHoldBookingsOnDevice');
		}
		var oldestDayTimestamp = D8.create(D8.now().format("dd.mm.yyyy")).addDays(-daysToHoldBookingsOnDevice).getTimestamp();
        _.each(this.find(), function(el) {
    		var elTimestamp = D8.create(el.get("tagLabel")).getTimestamp();
    		if (elTimestamp < oldestDayTimestamp) {
    			el.del();
    		}
        });
	}

}, M.DataProviderLocalStorage);
