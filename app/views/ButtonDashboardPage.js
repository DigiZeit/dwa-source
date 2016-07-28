// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: DigiWebApp
// View: DashboardPage
// ==========================================================================

m_require('app/views/TabBar.js');
m_require('app/views/ButtonDashboardTemplateView.js');

DigiWebApp.ButtonDashboardPage = M.PageView.design({

    childViews: 'header content tabBar'

    , cssClass: 'buttonDashboardPage unselectable'

    , events: {
		  pagebeforeshow: {
            target: DigiWebApp.DashboardController,
            action: 'initButtons'
        }
        , pageshow: {
        	action: function() {
        		DigiWebApp.TabBar.setActiveTab(DigiWebApp.TabBar.tabItem2);
        	}
        }
    }
    
    , needsUpdate: true

    , header: M.ToolbarView.design({
        value: M.I18N.l('menu')
        , cssClass: 'header unselectable'
        , isFixed: YES
        , anchorLocation: M.TOP
    })

    , content: M.ScrollView.design({

        childViews: 'list'

        , list: M.ListView.design({
            contentBinding: {
                target: DigiWebApp.DashboardController,
                property: 'itemsButtons'
            }
            , listItemTemplateView: DigiWebApp.ButtonDashboardTemplateView
        })
    })

    , tabBar: DigiWebApp.TabBar

});

