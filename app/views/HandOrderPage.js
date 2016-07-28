// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: DigiWebApp
// View: HandOrderPage
// ==========================================================================

m_require('app/views/TabBar.js');

DigiWebApp.HandOrderPage = M.PageView.design({

    //  childViews: 'header content tabBar'
      childViews: 'header content'

    , cssClass: 'handApplicationPage'
    	
    , controller: DigiWebApp.HandOrderController

    , events: {
		pageshow: {
			action: function() {
				//console.log("DigiWebApp.HandOrderPage.pageshow");
				$('#' + DigiWebApp.HandOrderPage.content.orderName.id)[0].focus();
			}
	    }
		, pagebeforeshow: {
	    	action: function() {
				// Freischaltung "Handpositionen"
				if (DigiWebApp.SettingsController.featureAvailable('430')) {
					var vaterId = DigiWebApp.HandOrderPage.controller.get('vaterId');
					if (typeof(vaterId) != "undefined" && vaterId != null) {
						var ordner = DigiWebApp.Order.getById(vaterId);
						M.ViewManager.getView('handOrderPage', 'targetFolderButton').setValue(ordner.get('name'));
					} else {
						M.ViewManager.getView('handOrderPage', 'targetFolderButton').setValue(M.I18N.l('keinOrdnerAusgewaehlt'));
					}
					$('#' + DigiWebApp.HandOrderPage.content.targetFolderButton.id).show();
				} else {
					$('#' + DigiWebApp.HandOrderPage.content.targetFolderButton.id).hide();
				}
			}
	    }
 	}

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
                      target: DigiWebApp.HandOrderController
                    , action: function () {
                        try { DigiWebApp.ApplicationController.vibrate(); } catch (e2) { }
                    	this.back();
                    }
                }
            }
        })
        , title: M.LabelView.design({
              value: M.I18N.l('handApplications')
            , anchorLocation: M.CENTER
        })
        , anchorLocation: M.TOP
    })

    , content: M.ScrollView.design({
          childViews: 'orderName targetFolderButton grid'
        , orderName: M.TextFieldView.design({
              label: M.I18N.l('orderName')
            , numberOfChars: 50
   	        , events: {
        		keyup: {
	                /* executed in scope of DOMWindow because no target defined */
	            	action: function(selectedValue, selectedItem) {
						var myValue = M.ViewManager.getView('handOrderPage', 'orderName').getValue();
						if (myValue.length <= 16) {
							DigiWebApp.HandOrderController.set("orderNameToSave", M.ViewManager.getView('handOrderPage', 'orderName').getValue());
						} else {
							if (!DigiWebApp.SettingsController.getSetting('DTC6aktiv')) {
								M.ViewManager.getView('handOrderPage', 'orderName').setValue(DigiWebApp.HandOrderController.orderNameToSave);
					            DigiWebApp.ApplicationController.nativeAlertDialogView({
					                title: M.I18N.l('handOrderTooLong')
					              , message: M.I18N.l('handOrderTooLongMsg')
					            });
							} else {
								if (myValue.length <= 50) {
									DigiWebApp.HandOrderController.set("orderNameToSave", M.ViewManager.getView('handOrderPage', 'orderName').getValue());
								} else {
									M.ViewManager.getView('handOrderPage', 'orderName').setValue(DigiWebApp.HandOrderController.orderNameToSave);
						            DigiWebApp.ApplicationController.nativeAlertDialogView({
						                title: M.I18N.l('handOrderTooLong')
						              , message: M.I18N.l('handOrderTooLongDTC6Msg')
						            });
								}
							}
						}
	            	}
	            }
	    	}
        })

        , targetFolderButton: M.ButtonView.design({
              value: M.I18N.l('keinOrdnerAusgewaehlt')
            , cssClass: 'orderButton'
            , events: {
                tap: {
                      target: DigiWebApp.OrderListController
                    , action: function() {try{DigiWebApp.ApplicationController.vibrate();}catch(e3){}
						this.init(
								  OrderSelectionMode.FOLDERS 
								, function(obj) {
									  var buttonText = M.I18N.l('keinOrdnerAusgewaehlt');
									  var vaterId = null;
									  if (typeof(obj) != "undefined" && obj != null 
									   && typeof(obj.get) == "function") {
										  buttonText = obj.get("name");
										  vaterId = obj.get("id");
									  }
									  DigiWebApp.HandOrderController.set('vaterId', vaterId);
									  DigiWebApp.NavigationController.backToHandOrderPageTransition();
									  M.ViewManager.getView('handOrderPage', 'targetFolderButton').setValue(buttonText);
								}
								, function() {
									  var buttonText = M.I18N.l('keinOrdnerAusgewaehlt');
									  DigiWebApp.NavigationController.backToHandOrderPageTransition();
									  M.ViewManager.getView('handOrderPage', 'targetFolderButton').setValue(buttonText);
								}
								, DigiWebApp.SelectionController.getSelectedOrderItem()
						)
						DigiWebApp.NavigationController.toOrderListPage();
                    }
                }
            }
        })

        , grid: M.GridView.design({
              childViews: 'button icon'
            , layout: {
                  cssClass: 'digiButton hack'
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
                          target: DigiWebApp.HandOrderController
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

