// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: DigiWebApp
// View: OrderInfoPage
// ==========================================================================

m_require('app/views/OrderInfoTemplateView');

DigiWebApp.OrderInfoPage = M.PageView.design({

    /* Use the 'events' property to bind events like 'pageshow' */
    events: {
		pagebeforeshow: {
            target: DigiWebApp.OrderInfoController,
            action: 'init'
        }
      , pageshow: {
    	  action: function() {
      	  }
      }
    }

    , childViews: 'header selectionContent list'

    , cssClass: 'orderInfoPage'

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
                    target: DigiWebApp.NavigationController,
                    action: 'backIgnoreDuplicateCalls'
                }
            }
        })
        , title: M.LabelView.design({
            value: M.I18N.l('orderInfo')
            , anchorLocation: M.CENTER
        })
        , anchorLocation: M.TOP
    })

    , selectionContent: M.ScrollView.design({
        childViews: 'order position'
	    , order: M.SelectionListView.design({
	        selectionMode: M.SINGLE_SELECTION_DIALOG
	        , initialText: M.I18N.l('noData')
	        , label: M.I18N.l('order')
	        //, cssClass: 'marginBottom25'
	        , applyTheme: NO
	        , contentBinding: {
	            target: DigiWebApp.OrderInfoController,
	            property: 'orders'
	        }
	        , events: {
	            change: {
	                target: DigiWebApp.OrderInfoController,
	                action: function() {
		                var orderId = M.ViewManager.getView('orderInfoPage', 'order').getSelection(YES).value;
		                if (orderId) {
		                	// we need to check handOrders also
			                var orders = DigiWebApp.HandOrder.findSorted().concat(DigiWebApp.Order.findSorted());
			                _.each(orders, function(order) {
		                    	if (order.get('id') == orderId) {
		                    		DigiWebApp.OrderInfoController.set('activeOrder', [order]);
		                    		if (DigiWebApp.SettingsController.getSetting("auftragsDetailsKoppeln")) {
		                    			var s = DigiWebApp.SelectionController.selections;
		                    			s.order = M.ViewManager.getView('orderInfoPage', 'order').getSelection();
		                    			DigiWebApp.SelectionController.set('selections', s);
		                    			M.ViewManager.getView('bookingPage', 'order').setSelection(
		                    					M.ViewManager.getView('orderInfoPage', 'order').getSelection());
		                    			DigiWebApp.SelectionController.setPositions();
		                    			DigiWebApp.SelectionController.useSelections = YES;
		                    		}
		                    	}
			                });
			                DigiWebApp.OrderInfoController.setPositions();
		                }
		                DigiWebApp.OrderInfoController.setItem();
	                }
	            }
//		        , tap: {
//					action: function() {
//	            		try{DigiWebApp.ApplicationController.vibrate();}catch(e3){}
//	  				}
//	            }
	        }
	    })
	    
	    , position: M.SelectionListView.design({
	        selectionMode: M.SINGLE_SELECTION_DIALOG
	        , initialText: M.I18N.l('noData')
	        , label: M.I18N.l('position')
	        //, cssClass: 'marginBottom25'
	        , applyTheme: NO
	        , contentBinding: {
	            target: DigiWebApp.OrderInfoController,
	            property: 'positions'
	        }
	        , events: {
	            change: {
	                target: DigiWebApp.OrderInfoController,
	                action: function() {
		                var positionId = M.ViewManager.getView('orderInfoPage', 'position').getSelection(YES).value;
		                if (positionId) {
			                var positions = DigiWebApp.Position.findSorted();
			                _.each(positions, function(position) {
		                    	if (position.get('id') == positionId) {
		                    		DigiWebApp.OrderInfoController.set('activePosition', [position]);
		                    		if (DigiWebApp.SettingsController.getSetting("auftragsDetailsKoppeln")) {
		                    			var s = DigiWebApp.SelectionController.selections;
		                    			s.position = M.ViewManager.getView('orderInfoPage', 'position').getSelection();
		                    			DigiWebApp.SelectionController.set('selections', s);
		                    			M.ViewManager.getView('bookingPage', 'position').setSelection(
		                    					M.ViewManager.getView('orderInfoPage', 'position').getSelection());
		                    			DigiWebApp.SelectionController.setActivities(YES);
		                    			DigiWebApp.SelectionController.useSelections = YES;
		                    		}
		                    	}
			                });
		                }
                		DigiWebApp.OrderInfoController.setItem();
	                }
	            }
//		        , tap: {
//					action: function() {
//	            		try{DigiWebApp.ApplicationController.vibrate();}catch(e4){}
//	  				}
//	            }
	        }
	    })
    })

    , list: M.ListView.design({
          contentBinding: {
              target: DigiWebApp.OrderInfoController
            , property: 'items'
        }
        , listItemTemplateView: DigiWebApp.OrderInfoTemplateView
    })
    
});

