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

    , childViews: 'header stammdatenUebertragenButton uebertragenButton content'

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
                    , action: function () {
                        try { DigiWebApp.ApplicationController.vibrate(); } catch (e2) { }
                    	var myTyp = DigiWebApp.BautagebuchBautagesberichtDetailsController.get("bautagesberichtTyp");
                    	if (myTyp == "<standard>") {
                    		this.backToBautagebuchBautagesberichtDetailsPageTransition();
                    	} else if (myTyp == "<materialerfassung_only>") {
                    		DigiWebApp.NavigationController.backToDashboardPage();
                    	} else {
                    		history.back();
                    	}
                    }
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
            , cssClass: 'green_background'
            , events: {
                tap: {
        			action: function() {
        				try{DigiWebApp.ApplicationController.vibrate();}catch(e3){} 
        				DigiWebApp.BautagebuchMaterialienListeController.neu();
					}
                }
            }
        })
        , anchorLocation: M.TOP
    })

	, stammdatenUebertragenButton: M.ButtonView.design({
	    value: M.I18N.l('materialstammEmpfangen')
	  , cssClass: 'uploadMaterial'
	  , events: {
	      tap: {
	            action: function() {
			    	DigiWebApp.BautagebuchDatenuebertragungController.materialstammEmpfangen(function(){
			    		// materialstamm erfolgreich empfangen
			    		// aktuell gibt es hierfür nichts zu tun
					}, function() {
						// error-handler
				        DigiWebApp.ApplicationController.nativeAlertDialogView({
				              title: M.I18N.l('connectionError')
				            , message: M.I18N.l('connectionErrorMsg')
				        });
					});
				}
	      }
	  }
	})

	, uebertragenButton: M.ButtonView.design({
	        value: M.I18N.l('BautagebuchUebertragen')
	      // Bugfix 2142
	      ,  cssClass: 'uploadMaterial'
	      , events: {
	          tap: {
	                action: function() {
				    	DigiWebApp.BautagebuchDatenuebertragungController.ausgekoppelteMaterialerfassungSenden(function(){
				    		DigiWebApp.BautagebuchMaterialienListeController.init();
						});
	    			}
	          }
	      }
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

