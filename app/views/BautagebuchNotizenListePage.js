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
	
    , childViews: 'header uebertragenButton content'

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
//                    	this.backToBautagebuchBautagesberichtDetailsPageTransition();
	                	var myTyp = DigiWebApp.BautagebuchBautagesberichtDetailsController.get("bautagesberichtTyp");
	                	if (myTyp == "<standard>") {
	                		this.backToBautagebuchBautagesberichtDetailsPageTransition();
	                	} else if (myTyp == "<notizen_only>") {
	                		DigiWebApp.NavigationController.backToDashboardPage();
	                	} else {
	                		history.back();
	                	}
                    }
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
            , cssClass: 'green_background'
            , events: {
                tap: {
        			action: function() {
        				try{DigiWebApp.ApplicationController.vibrate();}catch(e3){} 
						DigiWebApp.BautagebuchNotizenListeController.neu();
					}
                }
            }
        })
        , anchorLocation: M.TOP
    })

    , uebertragenButton: M.ButtonView.design({
	        value: M.I18N.l('BautagebuchUebertragen')
	      // Bugfix 2142
	      ,  cssClass: 'uploadNotizen'  
	      , events: {
	          tap: {
	                action: function() {
				    	DigiWebApp.BautagebuchDatenuebertragungController.ausgekoppelteNotizSenden(function(){
				    		DigiWebApp.BautagebuchNotizenListeController.init();
						});
	    			}
	          }
	      }
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

