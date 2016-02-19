// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: DigiWebApp
// View: BautagebuchZeitenListePage
// ==========================================================================

m_require('app/views/BautagebuchZusammenfassungMitarbeiterSummeTemplateView');
m_require('app/views/BautagebuchZeitenTemplateView');

DigiWebApp.BautagebuchZeitenListePage = M.PageView.design({

    events: {
		pagebeforeshow: {
              target: DigiWebApp.BautagebuchZeitenListeController
            , action: 'init'
        }
    }

	, controller: DigiWebApp.BautagebuchZeitenListeController
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
                    , action: function() {
                        try { DigiWebApp.ApplicationController.vibrate(); } catch (e2) { }
                        //this.backToBautagebuchBautagesberichtDetailsPageTransition();
                        this.backIgnoreDuplicateCalls();
                      }
                }
            }
        })
        , title: M.LabelView.design({
              value: M.I18N.l('BautagebuchZeiten')
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
        				DigiWebApp.BautagebuchZeitenListeController.neu();
					}
                }
            }
        })
        , anchorLocation: M.TOP
    })

    , content: M.ScrollView.design({
          childViews: 'leistungsnachweisList'
        , list: M.ListView.design({
              contentBinding: {
                  target: DigiWebApp.BautagebuchZeitenListeController
                , property: 'items'
            }
            , listItemTemplateView: DigiWebApp.BautagebuchZeitenTemplateView
        })
        , leistungsnachweisList: M.ContainerView.design({
	    	  	  childViews: 'list'
	    	  	, cssClass: 'marginBottom20 leistungsnachweisList'
	    	  	, doNotOverlapAtTop: YES
	    	  	, doNotOverlapAtBottom: YES
		        , list: M.ListView.design({
		        	  cssClass: ''
		        	, isDividedList: YES
		            , contentBinding: {
		                  target: DigiWebApp.BautagebuchZusammenfassungController
		                , property: 'ZeitbuchungenPerMitarbeiterList'
		            }
		            , listItemTemplateView: DigiWebApp.BautagebuchZusammenfassungMitarbeiterSummeTemplateView
		        })
	      })
    })

});

