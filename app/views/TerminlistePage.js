// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: DigiWebApp
// View: TerminlistePage
// ==========================================================================

m_require('app/views/TerminlisteTemplateView');

DigiWebApp.TerminlistePage = M.PageView.design({

    /* Use the 'events' property to bind events like 'pageshow' */
      events: {
		pagebeforeshow: {
            target: DigiWebApp.TerminlisteController,
            action: 'init'
        }
    }

    , childViews: 'header content'

    , cssClass: 'terminlistePage'

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
              value: M.I18N.l('Terminliste')
            , anchorLocation: M.CENTER
        })
        , anchorLocation: M.TOP
    })

    , content: M.ScrollView.design({
            childViews: 'terminliste'
          , terminliste: M.ListView.design({
        	  	  isDividedList: YES
                , contentBinding: {
	                  target: DigiWebApp.TerminlisteController
	                , property: 'items'
	            }
	            , listItemTemplateView: DigiWebApp.TerminlisteTemplateView
	      })
    })
});

