// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: DigiWebApp
// View: ZeitbuchungenPage
// ==========================================================================

m_require('app/views/ZeitbuchungenTemplateView');
m_require('app/views/VorZurueckTabBar.js');

DigiWebApp.ZeitbuchungenPage = M.PageView.design({

      events: {
		pageshow: {
            target: DigiWebApp.ZeitbuchungenController,
            action: 'init'
        }
    }

    , childViews: 'header content tabBar'

    , cssClass: 'zeitbuchungenPage unselectable'

    , header: M.ToolbarView.design({
        childViews: 'backButton title'
        , cssClass: 'header unselectable'
        , isFixed: YES
        , backButton: M.ButtonView.design({
              value: M.I18N.l('back')
            , icon: 'arrow-l'
            , anchorLocation: M.LEFT
            , events: {
                tap: {
                      target: DigiWebApp.NavigationController
                    , action: function() {try{navigator.notification.vibrate(DigiWebApp.ApplicationController.CONSTVibrateDuration);}catch(e){} this.backToAnwesenheitslistePageTransition();}
                }
            }
        })
        , title: M.LabelView.design({
              value: M.I18N.l('Zeitbuchungen')
            , anchorLocation: M.CENTER
        })
        , anchorLocation: M.TOP
    })

    , content: M.ScrollView.design({
          childViews: 'list'
        , list: M.ListView.design({
              contentBinding: {
                  target: DigiWebApp.ZeitbuchungenController
                , property: 'items'
            }
            , listItemTemplateView: DigiWebApp.ZeitbuchungenTemplateView
        })
    })

    , tabBar: DigiWebApp.VorZurueckTabBar

});

