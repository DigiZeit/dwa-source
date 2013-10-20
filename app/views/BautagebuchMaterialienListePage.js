// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: DigiWebApp
// View: BautagebuchMaterialienListePage
// ==========================================================================

m_require('app/views/BautagebuchMaterialienTemplateView');

DigiWebApp.BautagebuchMaterialienListePage = M.PageView.design({

    events: {
		pagebeforeshow: {
              target: DigiWebApp.BautagebuchMaterialienListeController
            , action: 'init'
        }
    }

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
                    , action: function() {try{navigator.notification.vibrate(DigiWebApp.ApplicationController.CONSTVibrateDuration);}catch(e2){} this.backToBautagebuchBautageberichtDetailsPageTransition();}
                }
            }
        })
        , title: M.LabelView.design({
              value: M.I18N.l('BautagebuchMaterialien')
            , anchorLocation: M.CENTER
        })
        , newButton: M.ButtonView.design({
              value: M.I18N.l('BautagebuchAdd')
            , icon: 'new'
            , anchorLocation: M.RIGHT
            , events: {
                tap: {
        			action: function() {
        				try{navigator.notification.vibrate(DigiWebApp.ApplicationController.CONSTVibrateDuration);}catch(e3){} 
        				DigiWebApp.BautagebuchMaterialienListeController.neu();
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
                  target: DigiWebApp.BautagebuchMaterialienListeController
                , property: 'items'
            }
            , listItemTemplateView: DigiWebApp.BautagebuchMaterialienTemplateView
        })
    })

});

