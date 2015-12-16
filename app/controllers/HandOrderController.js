// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: DigiWebApp
// Controller: HandOrderController
// ==========================================================================
// manuell var-checked
DigiWebApp.HandOrderController = M.Controller.extend({

      currentHandOrderName: ''
    , orderNameToSave: ''
    , vaterId: null
    
    , resetHandOrderPage: function() {
    	M.ViewManager.getView('handOrderPage', 'orderName').setValue('');
	}

	, defaultSuccessCallback: function(op) {
		var that = this;
	    DigiWebApp.SelectionController.useSelections = NO;
	    DigiWebApp.SelectionController.showHandOrderFirst = YES;
	    that.currentHandOrderName = op.get("name");
	
	    DigiWebApp.NavigationController.toBookTimePage(YES);
	
	    DigiWebApp.SelectionController.setOrders(op.get("id"));
	    
	    // PositionsComboBox ausblenden
	    DigiWebApp.BookingPage.doHideShowPositionCombobox(false);
	}

	, defaultErrorCallback: function() {
		var that = this;
		that.resetHandOrderPage();
		DigiWebApp.NavigationController.backToDashboardPage();
	}

	, successCallback: null
	
	, errorCallback: null
	
	, back: function() {
		var that = this;
    	var errorCallback = that.defaultErrorCallback;
    	if (typeof(that.errorCallback) != "undefined" && that.errorCallback != null)
    		errorCallback = that.errorCallback;
    	errorCallback();
	}

    , save: function() {
		var that = this;
        var orderName = that.orderNameToSave; //M.ViewManager.getView('handOrderPage', 'orderName').value;
        orderName = $.trim(orderName);
        var vaterId = that.vaterId; //M.ViewManager.getView('handOrderPage', 'orderName').value;

        if (orderName) {
            var sameHandOrders = _.select(DigiWebApp.HandOrder.findSorted(), function(ho) {
                if (ho) return ho.get('name') === orderName;
            });

            //if(/[^a-zA-Z0-9_-]+/.test(orderName)) {
            //if (/[[^a-zA-Z0-9_-äöüÄÖÜ,. !?;:/\\@€=]]+/.test(orderName)) {
            if (DigiWebApp.ApplicationController.sonderzeichenCheck(orderName)) {
                //M.DialogView.alert({
                DigiWebApp.ApplicationController.nativeAlertDialogView({
                      title: M.I18N.l('specialCharProblem')
                    , message: M.I18N.l('specialCharProblemMsg')
                });
                return;
            } else if (sameHandOrders.length > 0) {
                //M.DialogView.alert({
                DigiWebApp.ApplicationController.nativeAlertDialogView({
                      title: M.I18N.l('handOrderExists')
                    , message: M.I18N.l('handOrderExistsMsg')
                });
                return;
            } else if (orderName.length > 16 && !DigiWebApp.SettingsController.getSetting('DTC6aktiv')) {
                //M.DialogView.alert({
                DigiWebApp.ApplicationController.nativeAlertDialogView({
                      title: M.I18N.l('handOrderTooLong')
                    , message: M.I18N.l('handOrderTooLongMsg')
                });
                return;
            } else if (orderName.length > 50 && DigiWebApp.SettingsController.getSetting('DTC6aktiv')) {
                DigiWebApp.ApplicationController.nativeAlertDialogView({
                    title: M.I18N.l('handOrderTooLong')
                  , message: M.I18N.l('handOrderTooLongDTC6Msg')
              });
            } else {
                var op = DigiWebApp.HandOrder.createRecord({
                      name: orderName
                    , id: orderName
                    , vaterId: vaterId
                    , isLocalOnly: YES
                });
                
                /* add hand order mid to the previously saved ids in localstorage */
                var k = DigiWebApp.ApplicationController.storagePrefix + '_handorderKeys';

                var myLocalStorageString = localStorage.getItem(k);
                
                var hIds = [];
                if (typeof(myLocalStorageString) === "string") {
                	try {
                		hIds = JSON.parse(myLocalStorageString);
                	} catch(e2) { trackError(e2); }
                } else {
                    // no handorderKeys in localstorage
                }
                
                try {
                    hIds.push(op.m_id);
                } catch(e3) {
                	trackError(e3);
                }

                localStorage.setItem(k, JSON.stringify(hIds));
                
                /* now save it */
                op.save();
                
                if (op) {
                	var successCallback = that.defaultSuccessCallback;
                	if (typeof(that.successCallback) != "undefined" && that.successCallback != null)
                		successCallback = that.successCallback;
            		that.resetHandOrderPage();
                	successCallback(op);
                } else {
                    //M.DialogView.alert({
                    DigiWebApp.ApplicationController.nativeAlertDialogView({
                          title: M.I18N.l('handOrderSaveError')
                        , message: M.I18N.l('handOrderSaveErrorMsg')
                    });
                }
            }

        } else {
            //M.DialogView.alert({
            DigiWebApp.ApplicationController.nativeAlertDialogView({
                  title: M.I18N.l('noHandOrderNameEntered')
                , message: M.I18N.l('noHandOrderNameEnteredMsg')
            });
        }
        
    }
});
