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

    , save: function() {
        var orderName = M.ViewManager.getView('handOrderPage', 'orderName').value;
        orderName = $.trim(orderName);

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
                    M.ViewManager.getView('handOrderPage', 'orderName').setValue('');
                    DigiWebApp.SelectionController.useSelections = NO;
                    DigiWebApp.SelectionController.showHandOrderFirst = YES;
                    this.currentHandOrderName = orderName;

                    // PositionsComboBox ausblenden
                    try { $('#' + DigiWebApp.BookingPage.content.position.id + "_container").hide(); } catch (e) {trackError(e);}

                    DigiWebApp.NavigationController.toBookTimePage(YES);
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
