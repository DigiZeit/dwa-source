// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: DigiWebApp
// View: BookingPage
// ==========================================================================

m_require('app/views/TabBar.js');

DigiWebApp.BookingPage = M.PageView.design({

      childViews: 'header content tabBar'

    , events: {
		  pagebeforeshow: {
            //  target: DigiWebApp.BookingController
            //, action: 'init'
			action: function() {
				if (DigiWebApp.SettingsController.featureAvailable("416")) {
					DigiWebApp.NavigationController.toBookTimePage(); // zum Scholpp-Custom-BookingScreen
				} else {
					DigiWebApp.BookingController.init();
				}
			}
        }
        , pageshow: {
        	action: function() {
        		DigiWebApp.TabBar.setActiveTab(DigiWebApp.TabBar.tabItem1);
        		if (DigiWebApp.SettingsController.featureAvailable('415')) {
        			$('#' + DigiWebApp.BookingPage.header.feierabendButton.id).show(); 			
        		} else {
        			$('#' + DigiWebApp.BookingPage.header.feierabendButton.id).hide();
        		}
        		if (DigiWebApp.SettingsController.featureAvailable('402')) {
        			$('#' + DigiWebApp.BookingPage.header.materialButton.id).show(); 			
        		} else {
        			$('#' + DigiWebApp.BookingPage.header.materialButton.id).hide();
        		}
        	}
        }
    }

    , cssClass: 'bookTimePage'

    , header: M.ToolbarView.design({
          childViews: 'materialButton title feierabendButton'
        , cssClass: 'header unselectable'
        , isFixed: YES
        , materialButton: M.ButtonView.design({
	            value: M.I18N.l('BautagebuchMaterial')
	          , anchorLocation: M.LEFT
	          , events: {
	              tap: {
		      			action: function() {
	        				DigiWebApp.DashboardController.materialerfassung();
						}
	              }
	          }
	      })
        , pauseButton: M.ButtonView.design({
              value: M.I18N.l('back')
            , icon: 'arrow-l'
            , anchorLocation: M.LEFT
            , events: {
                tap: {
        			action: function() {
        				// TODO: schnelle Pause implementieren
						//DigiWebApp.BookingController.closeDay();
					}
                }
            }
        })
        , title: M.LabelView.design({
              value: M.I18N.l('timeRegistration')
            , anchorLocation: M.CENTER
        })
        , feierabendButton: M.ButtonView.design({
              value: '&nbsp;&nbsp;&nbsp;'
            , icon: 'home'
            , anchorLocation: M.RIGHT
            , events: {
                tap: {
        			action: function() {
        				DigiWebApp.BookingController.closeDay();
					}
                }
            }
        })
        , anchorLocation: M.TOP
    })

	, content: M.ScrollView.design({
          childViews: 'order position activity grid currentBookingLabel' //'gridOrder gridPosition gridActivity grid',
        , cssClass: 'unselectable'

        , order: M.SelectionListView.design({
                  selectionMode: M.SINGLE_SELECTION_DIALOG
                , initialText: M.I18N.l('noData')
                , label: M.I18N.l('order')
                //, cssClass: 'unselectable'
                , applyTheme: NO
                , contentBinding: {
                      target: DigiWebApp.SelectionController
                    , property: 'orders'
                }
                , events: {
                    change: {
                          target: DigiWebApp.SelectionController
                        , action: function() {
                            this.setPositions();
                        }
                    }
//	                , tap: {
//	    				action: function() {
//	                		try{DigiWebApp.ApplicationController.vibrate();}catch(e2){}
//		  				}
//	                }
                }
        })
            
        , position: M.SelectionListView.design({
              selectionMode: M.SINGLE_SELECTION_DIALOG
            , label: M.I18N.l('position')
            , initialText: M.I18N.l('noData')
            //, cssClass: 'unselectable'
            , applyTheme: NO
            , contentBinding: {
                  target: DigiWebApp.SelectionController
                , property: 'positions'
            }
            , events: {
                change: {
                      target: DigiWebApp.SelectionController
                    , action: function() {
                        this.setActivities(YES);
                    }
                }
//	            , tap: {
//					action: function() {
//	            		try{DigiWebApp.ApplicationController.vibrate();}catch(e3){}
//	  				}
//	            }
            }
        })

        , activity: M.SelectionListView.design({
              selectionMode: M.SINGLE_SELECTION_DIALOG
            , label: M.I18N.l('activity')
            , initialText: M.I18N.l('noData')
            //, cssClass: 'unselectable'
            , applyTheme: NO
            , contentBinding: {
                  target: DigiWebApp.SelectionController
                , property: 'activities'
            }
            , events: {
                change: {
                      target: DigiWebApp.SelectionController
                    , action: function() {
                        this.saveSelection();
                    }
                }
//	            , tap: {
//					action: function(id, event) {
//	            		//try{DigiWebApp.ApplicationController.vibrate();}catch(e4){}
//	        			try{event.stopImmediatePropagation();}catch(e4){try{event.stopPropagation();}catch(e4){}}
//	            		return false;
//	  				}
//	            }
            }
        })

        , grid: M.GridView.design({
              childViews: 'button icon'
            , layout: {
                  cssClass: 'marginTop40 digiButton'
                , columns: {
                      0: 'button'
                    , 1: 'icon'
                }
            }
            , button: M.ButtonView.design({
                  value: M.I18N.l('book2')
                , cssClass: 'digiButton'
                , anchorLocation: M.RIGHT
                , events: {
                    tap: {
                          target: DigiWebApp.BookingController
                        , action: 'book'
            			    					
 						/*, action: function() {
				                DigiWebApp.BookingController.book();
						}*/
                    }
                }
            })
            , icon: M.ImageView.design({
                value: 'theme/images/icon_bookTime.png'
            })
        })

        , currentBookingLabel: M.LabelView.design({
              cssClass: 'marginTop25 whiteLabel unselectable'
            , computedValue: {
                  contentBinding: {
                      target: DigiWebApp.BookingController
                    , property: 'currentBookingStr'
                }
                , value: ''
                , operation: function(v) {
                	if (v !== "") {
                    	return M.I18N.l('bookingRunningSince') + ' &nbsp;' + v;
                    } else {
                    	return '';
                    }
                }
            }
        })
    })

    , tabBar: DigiWebApp.TabBar

});

