// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: DigiWebApp
// View: AnwesenheitslistePage
// ==========================================================================

m_require('app/views/AnwesenheitslisteTemplateView');

DigiWebApp.AnwesenheitslistePage = M.PageView.design({

    events: {
		pageshow: {
              target: DigiWebApp.AnwesenheitslisteController
            , action: 'init'
        }
    }

    , childViews: 'header content'

    , cssClass: 'anwesenheitslistePage unselectable'

    , header: M.ToolbarView.design({
        childViews: 'backButton title refreshButton'
        , cssClass: 'header unselectable'
        , isFixed: YES
        , backButton: M.ButtonView.design({
              value: M.I18N.l('back')
            , icon: 'arrow-l'
            , anchorLocation: M.LEFT
            , events: {
                tap: {
                      target: DigiWebApp.NavigationController
                    , action: function() {try{DigiWebApp.ApplicationController.vibrate();}catch(e3){} this.backToDashboardPage();}
                }
            }
        })
        , title: M.LabelView.design({
              value: M.I18N.l('Anwesenheitsliste')
            , anchorLocation: M.CENTER
        })
        , refreshButton: M.ButtonView.design({
              value: M.I18N.l('refresh')
            , icon: 'refresh'
            , anchorLocation: M.RIGHT
            , events: {
                tap: {
        			action: function() {
        				try{DigiWebApp.ApplicationController.vibrate();}catch(e4){}
			    		DigiWebApp.AnwesenheitslisteController.set('items', {});
			    		DigiWebApp.AnwesenheitslisteController.items = null;
						DigiWebApp.AnwesenheitslisteController.init();
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
                  target: DigiWebApp.AnwesenheitslisteController
                , property: 'items'
            }
            , listItemTemplateView: DigiWebApp.AnwesenheitslisteTemplateView
        })
    })

});

