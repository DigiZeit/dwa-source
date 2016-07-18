// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: DigiWebApp
// View: DashboardPage
// ==========================================================================

m_require('app/views/TabBar.js');
m_require('app/views/DashboardTemplateView.js');

DigiWebApp.DashboardPage = M.PageView.design({

    childViews: 'header content tabBar'

    , cssClass: 'dashboardPage unselectable'

    , events: {
		  pagebeforeshow: {
		    action: function () {
                // Freischaltung 404: Button-Menü
				if (DigiWebApp.SettingsController.featureAvailable('404')) {
					DigiWebApp.NavigationController.toButtonDashboardPage();
				} else {
					DigiWebApp.DashboardController.init(false);
				}
			}
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
                property: 'items'
            }
            , listItemTemplateView: DigiWebApp.DashboardTemplateView
        })
    })

    , tabBar: DigiWebApp.TabBar

});

