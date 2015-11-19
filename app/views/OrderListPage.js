// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: DigiWebApp
// View: OrderListPage
// ==========================================================================

m_require('app/views/OrderListTemplateView.js');

DigiWebApp.OrderListPage = M.PageView.design({

    childViews: 'header content'

    , cssClass: 'orderListPage unselectable'

    , events: {
		  pagebeforeshow: {
            //target: DigiWebApp.DashboardController,
            //action: 'init'
			action: function() {
			}
        }
        , pageshow: {
        	action: function() {
        	}
        }
    }
    
    , header: M.ToolbarView.design({
          childViews: 'backButton title'
        , cssClass: 'header unselectable'
        , isFixed: YES
        , title: M.LabelView.design({
              value: M.I18N.l('activity')
            , anchorLocation: M.CENTER
        })
        , backButton: M.ButtonView.design({
            value: M.I18N.l('back')
          , icon: 'arrow-l'
          , anchorLocation: M.LEFT
          , events: {
              tap: {
                  //  target: DigiWebApp.NavigationController
                  //, action: 'backToBautagebuchZeitenListePageTransition'
      			action: function() {try{DigiWebApp.ApplicationController.vibrate();}catch(e8){} 
      				history.back();
      			}
              }
          }
      })
    })

    , content: M.ScrollView.design({

        childViews: 'list'

        , list: M.ListView.design({
            contentBinding: {
                target: DigiWebApp.OrderListController,
                property: 'items'
            }
            , listItemTemplateView: DigiWebApp.OrderListTemplateView
        })
    })

});

