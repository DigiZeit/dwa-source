// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: DigiWebApp
// View: TerminlistePage
// ==========================================================================

m_require('app/views/TerminlisteTemplateView');
m_require('app/views/TerminlisteVorZurueckTabBar.js');

DigiWebApp.TerminlistePage = M.PageView.design({

    /* Use the 'events' property to bind events like 'pageshow' */
      events: {
		pagebeforeshow: {
            target: DigiWebApp.TerminlisteController,
            action: 'init'
        }
    }

    , childViews: 'header content tabBar'

    , cssClass: 'terminlistePage'

    , header: M.ToolbarView.design({
          childViews: 'backButton titleGrid'
        , cssClass: 'header'
        , isFixed: YES
        , backButton: M.ButtonView.design({
              value: M.I18N.l('back')
            , icon: 'arrow-l'
            , anchorLocation: M.LEFT
            , events: {
                tap: {
                    //  target: DigiWebApp.NavigationController
                    //, action: 'backToDashboardPagePOP'
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
        , titleGrid: M.GridView.design({
        	  childViews: 'titleDay titleTextFieldView'
            , anchorLocation: M.CENTER
            , layout: { 
        		cssClass: 'dateTitleGrid' 
	    		, columns: { 
	    		      0: 'dateTitleGridColumn1' 
	    		    , 1: 'dateTitleGridColumn2' 
	    		}
	        }
	        , titleDay: M.LabelView.design({
	        	computedValue: {
		            contentBinding: {
		                target: DigiWebApp.TerminlisteController,
		                property: 'datumAsDate'
		            },
		            value: 0,
		            operation: function(v) {
		                return DigiWebApp.ApplicationController.dayNamesShort[D8.create(v).date.getDay()].substring(0,2);
		            }
		        }
	        	, cssClass: 'dateTitleDay'
	        })
	        , titleTextFieldView: M.TextFieldView.design({
	              value: ''
	            , cssClass: 'dateTitle'
	            , anchorLocation: M.CENTER
	            , inputType: M.INPUT_DATE
	            , contentBinding: {
	        		  target: DigiWebApp.TerminlisteController
	        		, property: 'datumAsDate'
	        	}
		        , contentBindingReverse: {
		    		  target: DigiWebApp.TerminlisteController
		    		, property: 'datumAsDate'
		    	}
	            , events: {
	            	  blur: {
	            		action: function() {
			            	var datumArray = DigiWebApp.TerminlisteController.datumAsDate.split("-");
							DigiWebApp.TerminlisteController.set("datum", datumArray[2] + "." + datumArray[1] + "." + datumArray[0]);
	            		}
	            	}
		            , tap: {
		                action: function() {
	            			try{DigiWebApp.ApplicationController.vibrate();}catch(e3){}
	        			}
		            }
		        }
	        })
        })
        , titleLabel: M.LabelView.design({
              value: M.I18N.l('Terminliste')
            , anchorLocation: M.CENTER
        })
        , anchorLocation: M.TOP
    })

    , content: M.ScrollView.design({
            childViews: 'terminliste'
          , terminliste: M.ListView.design({
        	  	  isDividedList: YES
                , contentBinding: {
	                  target: DigiWebApp.TerminlisteController
	                , property: 'items'
	            }
	            , listItemTemplateView: DigiWebApp.TerminlisteTemplateView
	      })
    })

    , tabBar: DigiWebApp.TerminlisteVorZurueckTabBar

});

