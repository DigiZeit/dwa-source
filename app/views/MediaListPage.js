// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: DigiWebApp
// View: MediaListPage
// ==========================================================================

m_require('app/views/MediaListTemplateView.js');
m_require('app/views/MediaActionTemplateView.js');

DigiWebApp.MediaListPage = M.PageView.design({

    /* Use the 'events' property to bind events like 'pageshow' */
      events: {
		pagebeforeshow: {
              target: DigiWebApp.MediaListController
            , action: 'init'
        }
    }

    , needsUpdate: true

    , childViews: 'header actions mediafiles'

    , cssClass: 'mediaListPage unselectable'

    , header: M.ToolbarView.design({
          childViews: 'backButton title newButton'
        , cssClass: 'header'
        , isFixed: YES
        , backButton: M.ButtonView.design({
              value: M.I18N.l('back')
            , icon: 'arrow-l'
            , anchorLocation: M.LEFT
            , events: {
                tap: {
                      target: DigiWebApp.NavigationController
                    , action: function() {try{navigator.notification.vibrate(DigiWebApp.ApplicationController.CONSTVibrateDuration);}catch(e){} this.backToDashboardPage();}
                }
            }
        })
        , title: M.LabelView.design({
              value: M.I18N.l('mediaList')
            , anchorLocation: M.CENTER
        })
                , newButton: M.ButtonView.design({
              value: M.I18N.l('BautagebuchAdd')
            , icon: 'new'
            , anchorLocation: M.RIGHT
            , events: {
                tap: {
        			action: function() {
						DigiWebApp.MediaListController.neu();
					}
                }
            }
        })
        , anchorLocation: M.TOP
    })

    , mediafiles: M.ScrollView.design({

          childViews: 'mediafileslist'

        , cssClass: 'mediafilesList'
        	
        , mediafileslist: M.ListView.design({
              contentBinding: {
                  target: DigiWebApp.MediaListController
                , property: 'items'
              }
            , listItemTemplateView: DigiWebApp.MediaListTemplateView
        })
    })
    
    , actions: M.ScrollView.design({

          childViews: 'actionslist'
        	  
        , cssClass: 'actionsList'

        , actionslist: M.ListView.design({
              contentBinding: {
                  target: DigiWebApp.MediaListController
                , property: 'actions'
              }
            , listItemTemplateView: DigiWebApp.MediaActionTemplateView
        })
    })
    
});

