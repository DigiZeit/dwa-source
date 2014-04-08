// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: DigiWebApp
// View: SettingsPage
// ==========================================================================

m_require('app/views/DummyTemplateView');
m_require('app/views/TabBar.js');

DigiWebApp.SettingsPage = M.PageView.design({

    //  childViews: 'header content tabBar'
      childViews: 'header content'

    , events: {
		pagebeforeshow: {
              target: DigiWebApp.SettingsController
            , action: 'init'
        }
    }

    , cssClass: 'settingsPage'

    , header: M.ToolbarView.design({
          childViews: 'backButton title'
        , cssClass: 'header unselectable'
        , isFixed: YES
        , backButton: M.ButtonView.design({
              value: M.I18N.l('back')
            , icon: 'arrow-l'
            , anchorLocation: M.LEFT
            , events: {
                tap: {
                    //  target: DigiWebApp.NavigationController
                    //, action: 'backToDashboardPage'
        			action: function() {
        				try{DigiWebApp.ApplicationController.vibrate();}catch(e2){}
        				if (!DigiWebApp.SettingsController.showCredentialsAlert) {
        					DigiWebApp.NavigationController.backToDashboardPage();
        				}
        			}
                }
            }
        })
        , title: M.LabelView.design({
              value: M.I18N.l('settings')
            , anchorLocation: M.CENTER
        })
        , anchorLocation: M.TOP
    })

    , content: M.ScrollView.design({
        //  childViews: 'companyGrid passwordGrid connectionCodeGrid workerIdGrid autoTransferAfterBookTimeCheck autoTransferAfterClosingDayCheck autoSyncAfterBookTimeCheck remarkIsMandatory autoSaveGPSData GPSDataIsMandatory useTransitionsSetting grid'
          childViews: 'companyGrid passwordGrid connectionCodeGrid workerIdGrid autoTransferAfterBookTimeCheck autoTransferAfterClosingDayCheck autoSyncAfterBookTimeCheck remarkIsMandatory remarkIsOptional autoSaveGPSData detailierteZeitdaten useTransitionsSetting daysToHoldBookingsOnDeviceSliderContainer bautagebuchLimit_autoStartUhrzeit ServiceApp_ermittleGeokoordinate ServiceApp_datenUebertragen ServiceApp_engeKopplung ServiceApp_PORTGrid ServiceApp_FallBack auftragsDetailsKoppeln vibrationsDauerSliderContainer terminlisteEinstellungen grid'
        , daysToHoldBookingsOnDeviceSliderContainer: M.ContainerView.design({
      	  		  childViews: 'daysToHoldBookingsOnDeviceSlider'
		        , daysToHoldBookingsOnDeviceSlider: M.SliderView.design({
		        	  label: M.I18N.l('daysToHoldBookingsOnDeviceLabel')
		        	, min: 1
		        	, max: 40
		        	, highlightLeftPart: YES
		        	, cssClass: 'daysToHoldBookingsOnDeviceSlider'
		            , contentBinding: {
		                  target: DigiWebApp.SettingsController
		                , property: 'settings.daysToHoldBookingsOnDevice'
		            }
		        })
        })
        , vibrationsDauerSliderContainer: M.ContainerView.design({
      	  		  childViews: 'vibrationsDauerSlider'
		        , vibrationsDauerSlider: M.SliderView.design({
		        	  label: M.I18N.l('vibrationsDauerLabel')
		        	, min: 0
		        	, max: 200
		        	, highlightLeftPart: YES
		        	, cssClass: 'vibrationsDauerSlider'
		            , contentBinding: {
		                  target: DigiWebApp.SettingsController
		                , property: 'settings.vibrationsDauer'
		            }
		        })
        })
        , companyGrid: M.GridView.design({
              childViews: 'companyLabel companyInput'
            , layout: M.TWO_COLUMNS
            , companyLabel: M.LabelView.design({
                value: M.I18N.l('company')
            })
            , companyInput: M.TextFieldView.design({
            	  inputType: M.INPUT_NUMBER
                , contentBinding: {
                      target: DigiWebApp.SettingsController
                    , property: 'settings.company'
                }
            })
        })
        , passwordGrid: M.GridView.design({
              childViews: 'passwordLabel passwordInput'
            , layout: M.TWO_COLUMNS
            , passwordLabel: M.LabelView.design({
                value: M.I18N.l('password')
            })
            , passwordInput: M.TextFieldView.design({
                  inputType: M.INPUT_PASSWORD
                , contentBinding: {
                      target: DigiWebApp.SettingsController
                    , property: 'settings.password'
                }
            })
        })
        , connectionCodeGrid: M.GridView.design({
              childViews: 'connectionCodeLabel connectionCodeInput'
            , layout: M.TWO_COLUMNS
            , connectionCodeLabel: M.LabelView.design({
                value: M.I18N.l('connectionCode')
            })
            , connectionCodeInput: M.TextFieldView.design({
                  inputType: M.INPUT_PASSWORD
                , contentBinding: {
                      target: DigiWebApp.SettingsController
                    , property: 'settings.connectionCode'
                }
            })
        })
        , workerIdGrid: M.GridView.design({
              childViews: 'workerIdLabel workerIdInput'
            , layout: M.TWO_COLUMNS
            , workerIdLabel: M.LabelView.design({
                value: M.I18N.l('workerId')
            })
            , workerIdInput: M.TextFieldView.design({
            	    inputType: M.INPUT_NUMBER
                  , contentBinding: {
                      target: DigiWebApp.SettingsController
                    , property: 'settings.workerId'
                }
            })
        })
        , autoSyncAfterBookTimeCheck: M.SelectionListView.design({
              selectionMode: M.MULTIPLE_SELECTION
            , contentBinding: {
                  target: DigiWebApp.SettingsController
                , property: 'settings.autoSyncAfterBookTime'
            }
        })
        , autoTransferAfterBookTimeCheck: M.SelectionListView.design({
              selectionMode: M.MULTIPLE_SELECTION
            , contentBinding: {
                  target: DigiWebApp.SettingsController
                , property: 'settings.autoTransferAfterBookTime'
            }
        })
        , autoTransferAfterClosingDayCheck: M.SelectionListView.design({
              selectionMode: M.MULTIPLE_SELECTION
            , contentBinding: {
                  target: DigiWebApp.SettingsController
                , property: 'settings.autoTransferAfterClosingDay'
            }
        })
        , remarkIsMandatory: M.SelectionListView.design({
              selectionMode: M.MULTIPLE_SELECTION
            //, cssClass: 'invisibleSetting',
            , contentBinding: {
                  target: DigiWebApp.SettingsController
                , property: 'settings.remarkIsMandatory'
            }
        })
        , remarkIsOptional: M.SelectionListView.design({
              selectionMode: M.MULTIPLE_SELECTION
            //, cssClass: 'invisibleSetting',
            , contentBinding: {
                  target: DigiWebApp.SettingsController
                , property: 'settings.remarkIsOptional'
            }
        })
        , detailierteZeitdaten: M.SelectionListView.design({
            selectionMode: M.MULTIPLE_SELECTION
          //, cssClass: 'invisibleSetting',
          , contentBinding: {
                target: DigiWebApp.SettingsController
              , property: 'settings.detailierteZeitdaten'
          }
        })
        , useTransitionsSetting: M.SelectionListView.design({
              selectionMode: M.MULTIPLE_SELECTION
            , contentBinding: {
                  target: DigiWebApp.SettingsController
                , property: 'settings.useTransitionsSetting'
            }
        })
        , autoSaveGPSData: M.SelectionListView.design({
              selectionMode: M.MULTIPLE_SELECTION
            , contentBinding: {
                  target: DigiWebApp.SettingsController
                , property: 'settings.autoSaveGPSData'
            }
        })
        , bautagebuchLimit_autoStartUhrzeit: M.SelectionListView.design({
              selectionMode: M.MULTIPLE_SELECTION
            , contentBinding: {
                  target: DigiWebApp.SettingsController
                , property: 'settings.bautagebuchLimit_autoStartUhrzeit'
            }
        })
        , GPSDataIsMandatory: M.SelectionListView.design({
              selectionMode: M.MULTIPLE_SELECTION
            , cssClass: 'lastSelectBox'
            , contentBinding: {
                  target: DigiWebApp.SettingsController
                , property: 'settings.GPSDataIsMandatory'
            }
        })
        , ServiceApp_ermittleGeokoordinate: M.SelectionListView.design({
              selectionMode: M.MULTIPLE_SELECTION
            //, cssClass: 'invisibleSetting',
            , contentBinding: {
                  target: DigiWebApp.SettingsController
                , property: 'settings.ServiceApp_ermittleGeokoordinate'
            }
        })
        , ServiceApp_datenUebertragen: M.SelectionListView.design({
              selectionMode: M.MULTIPLE_SELECTION
            //, cssClass: 'invisibleSetting',
            , contentBinding: {
                  target: DigiWebApp.SettingsController
                , property: 'settings.ServiceApp_datenUebertragen'
            }
        })
        , ServiceApp_engeKopplung: M.SelectionListView.design({
              selectionMode: M.MULTIPLE_SELECTION
            //, cssClass: 'invisibleSetting',
            , contentBinding: {
                  target: DigiWebApp.SettingsController
                , property: 'settings.ServiceApp_engeKopplung'
            }
        })
        , ServiceApp_FallBack: M.SelectionListView.design({
              selectionMode: M.MULTIPLE_SELECTION
            //, cssClass: 'invisibleSetting',
            , contentBinding: {
                  target: DigiWebApp.SettingsController
                , property: 'settings.ServiceApp_FallBack'
            }
        })
        , ServiceApp_PORTGrid: M.GridView.design({
              childViews: 'ServiceApp_PORTLabel ServiceApp_PORTInput'
            , layout: M.TWO_COLUMNS
            , ServiceApp_PORTLabel: M.LabelView.design({
                value: M.I18N.l('ServiceApp_PORT')
            })
            , ServiceApp_PORTInput: M.TextFieldView.design({
                  contentBinding: {
                      target: DigiWebApp.SettingsController
                    , property: 'settings.ServiceApp_PORT'
                }
            })
        })
        , auftragsDetailsKoppeln: M.SelectionListView.design({
              selectionMode: M.MULTIPLE_SELECTION
            //, cssClass: 'invisibleSetting',
            , contentBinding: {
                  target: DigiWebApp.SettingsController
                , property: 'settings.auftragsDetailsKoppeln'
            }
        })

        , terminlisteEinstellungen: M.ContainerView.design({
      	  		  childViews: 'terminlisteEinstellungen_titel' // terminliste_keineKuenstlichenTermine terminliste_ignoriereAuftragszeitraum'
      	  		, cssClass: 'terminlisteEinstellungen'
		        , terminlisteEinstellungen_titel: M.ListView.design({
	        	  	  isDividedList: YES
	                , contentBinding: {
		            	  target: DigiWebApp.SettingsController
		            	, property: 'terminlisteEinstellungen_titel terminliste_keineKuenstlichenTermine terminliste_ignoriereAuftragszeitraum'
		        	}
		        	, listItemTemplateView: DigiWebApp.DummyTemplateView
	  	      })
	          , terminliste_keineKuenstlichenTermine: M.SelectionListView.design({
	        	  	  selectionMode: M.MULTIPLE_SELECTION
		            , contentBinding: {
		                  target: DigiWebApp.SettingsController
		                , property: 'settings.terminliste_keineKuenstlichenTermine'
		            }
		        })
		        , terminliste_ignoriereAuftragszeitraum: M.SelectionListView.design({
		              selectionMode: M.MULTIPLE_SELECTION
		            , contentBinding: {
		                  target: DigiWebApp.SettingsController
		                , property: 'settings.terminliste_ignoriereAuftragszeitraum'
		            }
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
                          target: DigiWebApp.SettingsController
                        , action: function() {try{DigiWebApp.ApplicationController.vibrate();}catch(e3){} this.save();}
                    }
                }
            })
            , icon: M.ImageView.design({
                value: 'theme/images/icon_bookTime.png'
            })
        })
    })
    	
    , tabBar: DigiWebApp.TabBar

});

