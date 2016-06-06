// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: DigiWebApp
// View: SettingsPasswordPage
// ==========================================================================

DigiWebApp.SettingsPasswordPage = M.PageView.design({

    /* Use the 'events' property to bind events like 'pageshow' */
      events: {
		pagebeforeshow: {
            //target: DigiWebApp.MyController,
            //action: 'init'
			action: function() {
				$('#' + DigiWebApp.SettingsPasswordPage.content.passwordGrid.passwordInput.id).val('');
			}
        }
    }

    , childViews: 'header content'

    , cssClass: 'settingsPasswordPage'

    , header: M.ToolbarView.design({
          childViews: 'backButton title'
        , cssClass: 'header'
        , isFixed: YES
        , backButton: M.ButtonView.design({
              value: M.I18N.l('back')
            , icon: 'arrow-l'
            , anchorLocation: M.LEFT
            , events: {
                tap: {
                    //  target: DigiWebApp.NavigationController
                    //, action: 'backToDashboardPagePOP'
        			action: function() {
        				try{DigiWebApp.ApplicationController.vibrate();}catch(e2){}
						if (DigiWebApp.SettingsController.featureAvailable('404')) {
			        		DigiWebApp.NavigationController.backToButtonDashboardPagePOP();
						} else {
			        		DigiWebApp.NavigationController.backToDashboardPagePOP();
						}
        			}
                }
            }
        })
        , title: M.LabelView.design({
              value: M.I18N.l('password')
            , anchorLocation: M.CENTER
        })
        , anchorLocation: M.TOP
    })

    , content: M.ScrollView.design({
          childViews: 'passwordGrid grid'
        , passwordGrid: M.GridView.design({
              childViews: 'passwordLabel passwordInput'
            , layout: M.TWO_COLUMNS
            , passwordLabel: M.LabelView.design({
                value: M.I18N.l('password')
            })
            , passwordInput: M.TextFieldView.design({
                inputType: M.INPUT_PASSWORD
            })
        })
        , grid: M.GridView.design({
              childViews: 'button icon'
            , layout: {
                  cssClass: 'digiButton'
                , columns: {
                      0: 'button'
                    , 1: 'icon'
                }
            }
            , button: M.ButtonView.design({
                  value: M.I18N.l('assume')
                , cssClass: 'digiButton'
                , anchorLocation: M.RIGHT
                , events: {
                    tap: {
                        //target: DigiWebApp.NavigationController,
                        //action: 'toSettingsPage'
            			action: function() {
//            				if (DigiWebApp.SettingsController.globalDebugMode) {
//            					console.log("\"" + $('#' + DigiWebApp.SettingsPasswordPage.content.passwordGrid.passwordInput.id).val() + "\"");
//            					console.log("\"" + DigiWebApp.SettingsController.getSetting('settingsPassword') + "\"");
//            				}
            				try{DigiWebApp.ApplicationController.vibrate();}catch(e3){}
            				if ($('#' + DigiWebApp.SettingsPasswordPage.content.passwordGrid.passwordInput.id).val() === DigiWebApp.SettingsController.getSetting('settingsPassword')) {
            					DigiWebApp.NavigationController.toSettingsPage();
            				} else {
            		        	DigiWebApp.ApplicationController.nativeAlertDialogView({
            		                  title: M.I18N.l('wrongPasswordTitle')
            		                , message: M.I18N.l('wrongPasswordMsg')
            		            });            					
            				}
            			}
                    }
                }
            })
            , icon: M.ImageView.design({
                value: 'theme/images/icon_bookTime.png'
            })
        })
    })
});

