// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: DigiWebApp
// View: OrderInfoPage
// ==========================================================================

m_require('app/views/OrderInfoTemplateView');

DigiWebApp.OrderDetailsPage = M.PageView.design({

    /* Use the 'events' property to bind events like 'pageshow' */
    events: {
		pageshow: {
            target: DigiWebApp.OrderDetailsController,
            action: 'init'
        }
    }

    , childViews: 'header spacer list'

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
                    action: 'backToZeitbuchungDetailsPageTransition'
                }
            }
        })
        , title: M.LabelView.design({
            value: M.I18N.l('orderInfo')
            , anchorLocation: M.CENTER
        })
        , anchorLocation: M.TOP
    })

	, spacer: M.LabelView.design({
	      value: ' '
        , cssClass: 'marginBottom12' 
	})

    , list: M.ListView.design({
          contentBinding: {
              target: DigiWebApp.OrderDetailsController
            , property: 'positionForDetails'
        }
        , listItemTemplateView: DigiWebApp.OrderInfoTemplateView
    })
    
});

