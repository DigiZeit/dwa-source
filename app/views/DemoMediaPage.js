// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: DigiWebApp
// View: DemoMediaPage
// ==========================================================================

m_require('app/views/DemoMediaPageTemplateView.js');

DigiWebApp.DemoMediaPage = M.PageView.design({

      childViews: 'header content'

    , cssClass: 'demoMediaPage'

    , events: {
		pagebeforeshow: {
              target: DigiWebApp.DemoMediaPageController
            , action: 'init'
        }
    }
    
    , needsUpdate: true
    
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
                      target: DigiWebApp.NavigationController
                    , action: 'backToDashboardPage'
                }
            }
        })
        , title: M.LabelView.design({
              value: M.I18N.l('info')
            , anchorLocation: M.CENTER
        })
        , anchorLocation: M.TOP
    })

    , content: M.ScrollView.design({

          childViews: 'list'

        , list: M.ListView.design({
              contentBinding: {
                  target: DigiWebApp.DemoMediaPageController
                , property: 'items'
            }
            , listItemTemplateView: DigiWebApp.DemoMediaPageTemplateView
        })
    })

});

