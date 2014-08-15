// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: DigiWebApp
// View: BautagebuchBautageberichteListePage
// ==========================================================================

m_require('app/views/BautagebuchTabBar.js');
m_require('app/views/BautagebuchBautageberichtTemplateView');

DigiWebApp.BautagebuchBautageberichteListePage = M.PageView.design({

    events: {
		pagebeforeshow: {
              target: DigiWebApp.BautagebuchBautageberichteListeController
            , action: 'init'
        }
    }
	
    , childViews: 'header uebertragenButton content tabBar'

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
                    , action: function() {try{DigiWebApp.ApplicationController.vibrate();}catch(e2){} 
                    	this.backToDashboardPage();
                    }
                }
            }
        })
        , title: M.LabelView.design({
              value: M.I18N.l('BautagebuchBautageberichte')
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
        				DigiWebApp.BautagebuchBautageberichteListeController.neu();
					}
                }
            }
        })
        , anchorLocation: M.TOP
    })

    , uebertragenButton: M.ButtonView.design({
	        value: M.I18N.l('BautagebuchUebertragen')
	      , events: {
	          tap: {
	                action: function() {
    					DigiWebApp.BautagebuchDatenuebertragungController.abgeschlosseneUebertragen();
	    			}
	          }
	      }
     })

     , content: M.ScrollView.design({
          childViews: 'list'
        , list: M.ListView.design({
              contentBinding: {
                  target: DigiWebApp.BautagebuchBautageberichteListeController
                , property: 'items'
            }
            , listItemTemplateView: DigiWebApp.BautagebuchBautageberichtTemplateView
        })
    })
    
    , tabBar: DigiWebApp.BautagebuchTabBar

});

