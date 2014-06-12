// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: DigiWebApp
// View: FestePauseStornierenPage
// ==========================================================================

m_require('app/views/DummyTemplateView');

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
          childViews: 'backButton title'
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
          childViews: 'gesternBalken gesternPausenList heuteBalken heutePausenList morgenBalken morgenPausenList stornierenButton'
        	  
        , gesternBalken: M.ListView.design({
	  	  	  isDividedList: YES
	        , contentBinding: {
            	  target: DigiWebApp.FestePauseStornierenController
            	, property: 'gesternBalken'
        	}
	        , listItemTemplateView: DigiWebApp.DummyTemplateView
      	})
      	
        , gesternPausenList: M.SelectionListView.design({
              selectionMode: M.MULTIPLE_SELECTION
            , cssClass: 'festePausen'
            , contentBinding: {
                  target: DigiWebApp.FestePauseStornierenController
                , property: 'gesternPausenList'
            }
        })
        
        , heuteBalken: M.ListView.design({
	  	  	  isDividedList: YES
	        , contentBinding: {
	          	  target: DigiWebApp.FestePauseStornierenController
	          	, property: 'heuteBalken'
	      	}
	        , listItemTemplateView: DigiWebApp.DummyTemplateView
    	})
    	
        , heutePausenList: M.SelectionListView.design({
              selectionMode: M.MULTIPLE_SELECTION
            , cssClass: 'festePausen'
            , contentBinding: {
                  target: DigiWebApp.FestePauseStornierenController
                , property: 'heutePausenList'
            }
        })
        
        , morgenBalken: M.ListView.design({
	  	  	  isDividedList: YES
	        , contentBinding: {
          	  target: DigiWebApp.FestePauseStornierenController
          	, property: 'morgenBalken'
      		}
	        , listItemTemplateView: DigiWebApp.DummyTemplateView
    	})
    	
        , morgenPausenList: M.SelectionListView.design({
            selectionMode: M.MULTIPLE_SELECTION
          , cssClass: 'festePausen'
          , contentBinding: {
                target: DigiWebApp.FestePauseStornierenController
              , property: 'morgenPausenList'
          }
        })

        , stornierenButton: M.GridView.design({
	            childViews: 'button icon'
	          , layout: {
	                cssClass: 'digiButton'
	              , columns: {
	                    0: 'button'
	                  , 1: 'icon'
	              }
	          }
	          , button: M.ButtonView.design({
	                value: M.I18N.l('stornierenSpeichern')
	              , cssClass: 'digiButton'
	              , anchorLocation: M.RIGHT
	              , events: {
	                  tap: {
	                        target: DigiWebApp.FestePauseStornierenController
	                      , action: function() {try{DigiWebApp.ApplicationController.vibrate();}catch(e3){} this.save();}
	                  }
	              }
	          })
	          , icon: M.ImageView.design({
	        	  	value: 'theme/images/icon_bookTime.png'
	          })
	    })

    })

});

