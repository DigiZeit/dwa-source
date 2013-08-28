// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: DigiWebApp
// View: BautagebuchNotizenListePage
// ==========================================================================

m_require('app/views/BautagebuchNotizenTemplateView');

DigiWebApp.BautagebuchNotizenListePage = M.PageView.design({

    events: {
		pagebeforeshow: {
              target: DigiWebApp.BautagebuchNotizenListeController
            , action: 'init'
        }
    }

	, controller: DigiWebApp.BautagebuchNotizenListeController
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
                    , action: 'backToBautagebuchBautageberichtDetailsPageTransition'
                }
            }
        })
        , title: M.LabelView.design({
              value: M.I18N.l('BautagebuchNotizen')
            , anchorLocation: M.CENTER
        })
        , newButton: M.ButtonView.design({
              value: M.I18N.l('BautagebuchAdd')
            , icon: 'new'
            , anchorLocation: M.RIGHT
            , events: {
                tap: {
        			action: function() {
						DigiWebApp.BautagebuchNotizenListeController.neu();
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
                  target: DigiWebApp.BautagebuchNotizenListeController
                , property: 'items'
            }
            , listItemTemplateView: DigiWebApp.BautagebuchNotizenTemplateView
        })
    })

});

