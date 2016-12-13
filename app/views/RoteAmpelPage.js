// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: DigiWebApp
// View: RoteAmpelPage
// ==========================================================================

DigiWebApp.RoteAmpelPage = M.PageView.design({

      events: {
        pagebeforeshow: {
            target: DigiWebApp.RoteAmpelController,
            action: 'init'
        }
		, pageshow: {
		    action: function() {
			}
		}
        , pagehide: {
            action: function() {
        		// reset auto-grow
        		M.ViewManager.getView('roteAmpelPage', 'dataInput').setCssProperty("height", "100px");
        	}
        }
    }

	, backDone: false

    // Gleicher Stil wie Bautagebuch-Notizen
    , cssClass: 'bautagebuchNotizenDetailsPage'

    , childViews: 'header content'

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
                    target: DigiWebApp.NavigationController,
                    action: 'backIgnoreDuplicateCalls'
                }
            }
        })
        , title: M.LabelView.design({
              value: M.I18N.l('roteAmpel')
            , anchorLocation: M.CENTER
        })
        , anchorLocation: M.TOP
    })

    , content: M.ScrollView.design({

        childViews: 'order position dataInput speichernButton'
        	  
        , cssClass: 'content'
    	
	    , order: M.SelectionListView.design({
	        selectionMode: M.SINGLE_SELECTION_DIALOG
	        , initialText: M.I18N.l('noData')
	        , label: M.I18N.l('order')
	        //, cssClass: 'marginBottom25'
	        , applyTheme: NO
	        , contentBinding: {
	            target: DigiWebApp.RoteAmpelController,
	            property: 'orders'
	        }
	        , events: {
	            change: {
	                target: DigiWebApp.RoteAmpelController,
	                action: function() {
		                var orderId = M.ViewManager.getView('roteAmpelPage', 'order').getSelection(YES).value;
		                if (orderId) {
		                	// we need to check handOrders also
			                var orders = DigiWebApp.HandOrder.findSorted().concat(DigiWebApp.Order.findSorted());
			                _.each(orders, function(order) {
		                    	if (order.get('id') == orderId) {
		                    		DigiWebApp.RoteAmpelController.set('activeOrder', [order]);
		                    		if (DigiWebApp.SettingsController.getSetting("auftragsDetailsKoppeln")) {
		                    			var s = DigiWebApp.SelectionController.selections;
		                    			s.order = M.ViewManager.getView('roteAmpelPage', 'order').getSelection();
		                    			DigiWebApp.SelectionController.set('selections', s);
		                    			M.ViewManager.getView(DigiWebApp.SelectionController.getPageToUse(), 'order')
                                            .setSelection(
                                                M.ViewManager.getView('roteAmpelPage', 'order').getSelection());
		                    			DigiWebApp.SelectionController.setPositions(null, null, YES);
		                    			DigiWebApp.SelectionController.useSelections = YES;
		                    		}
		                    	}
			                });
			                DigiWebApp.RoteAmpelController.setPositions();
		                }
	                }
	            }
	        }
	    })
	    
	    , position: M.SelectionListView.design({
	        selectionMode: M.SINGLE_SELECTION_DIALOG
	        , initialText: M.I18N.l('noData')
	        , label: M.I18N.l('position')
	        //, cssClass: 'marginBottom25'
	        , applyTheme: NO
	        , contentBinding: {
	            target: DigiWebApp.RoteAmpelController,
	            property: 'positions'
	        }
	        , events: {
                change: {
                    target: DigiWebApp.RoteAmpelController,
                    action: function() {
                        var positionId = M.ViewManager.getView('roteAmpelPage', 'position').getSelection(YES).value;
                        if (positionId) {
                            var positions = DigiWebApp.Position.findSorted();
                            _.each(positions,
                                function(position) {
                                    if (position.get('id') == positionId) {
                                        DigiWebApp.RoteAmpelController.set('activePosition', [position]);
                                        if (DigiWebApp.SettingsController.getSetting("auftragsDetailsKoppeln")) {
                                            var s = DigiWebApp.SelectionController.selections;
                                            s.position = M.ViewManager.getView('roteAmpelPage', 'position')
                                                .getSelection();
                                            DigiWebApp.SelectionController.set('selections', s);
                                            M.ViewManager.getView(DigiWebApp.SelectionController.getPageToUse(), 'position')
                                                .setSelection(
                                                    M.ViewManager.getView('roteAmpelPage', 'position').getSelection());
                                            DigiWebApp.SelectionController.setActivities(YES, YES);
                                            DigiWebApp.SelectionController.useSelections = YES;
                                        }
                                    }
                                });
                        }
                    }
                }
            }
        })
            	
        , dataInput: M.TextFieldView.design({
            label: M.I18N.l('roteAmpelNachricht')
            , cssClass: 'dataInput'
            , cssClassOnInit: 'dataInputInitial'
            , hasMultipleLines: YES
            , initialText: "Max. 200 " + M.I18N.l('characters')
            // Nicht 200, sonst sperrt das TextField selbst die Eingabe von mehr als 200 Z.
            , numberOfChars: 220
	   	    , events: {
	           	keyup: {
	   	            /* executed in scope of DOMWindow because no target defined */
	   	            action: function(selectedValue, selectedItem) {
        				var myValue = M.ViewManager.getView('roteAmpelPage', 'dataInput').getValue();
        				if (myValue.length <= 200) {
        					DigiWebApp.RoteAmpelController.set("data", 
                                M.ViewManager.getView('roteAmpelPage', 'dataInput').getValue());
        				} else {
        					M.ViewManager.getView('roteAmpelPage', 'dataInput').setValue(DigiWebApp.RoteAmpelController.data);
        				    DigiWebApp.ApplicationController.nativeAlertDialogView({
        				        title: M.I18N.l('maximaleFeldlaengeErreicht')
        				        , message: M.I18N.l('maximaleFeldlaengeErreichtMsg')
        				    });
        				}
	   	            }
	   	        }
	   	    }
        })
            
        , speichernButton: M.GridView.design({
              childViews: 'button icon'
            , layout: {
                  cssClass: 'digiButton'
                , columns: {
                      0: 'button'
                    , 1: 'icon'
                }
            }
            , button: M.ButtonView.design({
                  value: M.I18N.l('roteAmpelAbschicken')
                , cssClass: 'digiButton green_background'
                , anchorLocation: M.RIGHT
                , events: {
                    tap: {
		                action: function() {
            				DigiWebApp.ApplicationController.vibrate();
		                    DigiWebApp.RoteAmpelController.set("data", "");
            				//DigiWebApp.RoteAmpelController.save();
                		    DigiWebApp.NavigationController.backToDashboardPagePOP();
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
