// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: DigiWebApp
// View: FestePauseStornierenPage
// ==========================================================================

DigiWebApp.FestePauseStornierenPage = M.PageView.design({

    /* Use the 'events' property to bind events like 'pageshow' */
      events: {
		pagebeforeshow: {
            target: DigiWebApp.FestePauseStornierenController,
            action: 'init'
        }
    }

    , childViews: 'header content'

    , cssClass: 'festePauseStornierenPage'

    , header: M.ToolbarView.design({
          childViews: 'backButton titleGrid'
        , cssClass: 'header'
        , isFixed: YES
        , backButton: M.ButtonView.design({
              value: M.I18N.l('back')
            , icon: 'arrow-l'
            , anchorLocation: M.LEFT
            , events: {
                tap: {
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
              value: M.I18N.l('FestePauseStornieren')
            , anchorLocation: M.CENTER
        })
        , anchorLocation: M.TOP
    })

    , content: M.ScrollView.design({
            childViews: ''
    })

});

