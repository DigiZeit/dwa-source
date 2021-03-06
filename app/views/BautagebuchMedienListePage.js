// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: DigiWebApp
// View: BautagebuchMedienListePage
// ==========================================================================

m_require('app/views/BautagebuchMedienTemplateView');

DigiWebApp.BautagebuchMedienListePage = M.PageView.design({

    events: {
		pagebeforeshow: {
              target: DigiWebApp.BautagebuchMedienListeController
            , action: 'init'
        }
    }

	, controller: DigiWebApp.BautagebuchMedienListeController
	, navigationController: DigiWebApp.NavigationController
	
    , childViews: 'header content'

    , cssClass: 'bautagebuchListePage unselectable'

    , header: M.ToolbarView.design({
        childViews: 'backButton title newButton'
        , cssClass: 'header unselectable'
        , isFixed: YES
        , backButton: M.ButtonView.design({
              value: M.I18N.l('back')
            , icon: 'arrow-l'
            , anchorLocation: M.LEFT
            , events: {
                tap: {
                      target: DigiWebApp.NavigationController
                    , action: function() {try{DigiWebApp.ApplicationController.vibrate();}catch(e2){} this.backToBautagebuchBautagesberichtDetailsPageTransition();}
                }
            }
        })
        , title: M.LabelView.design({
              value: M.I18N.l('BautagebuchMedien')
            , anchorLocation: M.CENTER
        })
        , newButton: M.ButtonView.design({
              value: M.I18N.l('BautagebuchAdd')
            , icon: 'new'
            , anchorLocation: M.RIGHT
            , cssClass: 'green_background'
            , events: {
                tap: {
        			action: function() {
        				try{DigiWebApp.ApplicationController.vibrate();}catch(e3){} 
						DigiWebApp.BautagebuchMedienListeController.neu();
					}
                }
            }
        })
        , anchorLocation: M.TOP
    })

    , content: M.ScrollView.design({
          childViews: 'list'
        , list: M.ListView.design({
              contentBinding: {
                  target: DigiWebApp.BautagebuchMedienListeController
                , property: 'items'
            }
            , listItemTemplateView: DigiWebApp.BautagebuchMedienTemplateView
        })
    })

});

