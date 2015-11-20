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
				// Freischaltung 416 "Tätigkeits-Icons"
				if (DigiWebApp.SettingsController.featureAvailable("416")) {
					DigiWebApp.NavigationController.toBookTimePage(); // zum Scholpp-Custom-BookingScreen
				} else {
					DigiWebApp.BookingController.init();
					// Bugfix 2108: Rename in order to be consistent with DSO
					if (DigiWebApp.SettingsController.getSetting('DTC6aktiv')) {
						DigiWebApp.ApplicationController.dtc6AktivRenameHelper(DigiWebApp.BookingPage.content.order.id, M.I18N.l('dtc6Ordner'));
						DigiWebApp.ApplicationController.dtc6AktivRenameHelper(DigiWebApp.BookingPage.content.position.id, M.I18N.l('dtc6Auftrag'));
						DigiWebApp.ApplicationController.dtc6AktivRenameHelper(DigiWebApp.BookingPage.content.activity.id, M.I18N.l('dtc6Leistung'));
					}
				}	
				// Freischaltung 415 "Feierabend-Icon"
        		if (DigiWebApp.SettingsController.featureAvailable('415')) {
        			$('#' + DigiWebApp.BookingPage.header.feierabendButton.id).show(); 			
        		} else {
        			$('#' + DigiWebApp.BookingPage.header.feierabendButton.id).hide();
        		}
				// Freischaltung 402 "Materialerfasung Only"
        		if (DigiWebApp.SettingsController.featureAvailable('402')) {
        			$('#' + DigiWebApp.BookingPage.header.materialButton.id).show(); 			
        		} else {
        			$('#' + DigiWebApp.BookingPage.header.materialButton.id).hide();
        		}
				// Freischaltung 429 "mehrstufige Auftragsauswahl"
        		DigiWebApp.BookingPage.doHideShowOrderCombobox(true);
        		DigiWebApp.BookingPage.doHideShowPositionCombobox(true);
//				if (DigiWebApp.SettingsController.featureAvailable("429")) {
//					try { $('#' + DigiWebApp.BookingPage.content.order.id + "_container").hide(); } catch (e) {trackError(e);}
//					try { $('#' + DigiWebApp.BookingPage.content.position.id + "_container").hide(); } catch (e) {trackError(e);}
//        			$('#' + DigiWebApp.BookingPage.content.orderButton.id).show(); 			
//        			$('label[for="' + DigiWebApp.BookingPage.content.orderButton.id + '"]').show(); 			
//				} else {
//					try { $('#' + DigiWebApp.BookingPage.content.order.id + "_container").show(); } catch (e) {trackError(e);}
//					try { $('#' + DigiWebApp.BookingPage.content.position.id + "_container").show(); } catch (e) {trackError(e);}
//        			$('#' + DigiWebApp.BookingPage.content.orderButton.id).hide(); 			
//        			$('label[for="' + DigiWebApp.BookingPage.content.orderButton.id + '"]').hide(); 			
//				}
			}
		}
        , pageshow: {
        	action: function() {
        		DigiWebApp.TabBar.setActiveTab(DigiWebApp.TabBar.tabItem1);
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
        					try{DigiWebApp.ApplicationController.vibrate();}catch(e2){}
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
        				try{DigiWebApp.ApplicationController.vibrate();}catch(e2){}
        				DigiWebApp.BookingController.closeDay();
					}
                }
            }
        })
        , anchorLocation: M.TOP
    })

	, content: M.ScrollView.design({
          childViews: 'orderButton order position activity grid currentBookingLabel' //'gridOrder gridPosition gridActivity grid',
        , cssClass: 'unselectable'

		, orderButton: M.ButtonView.design({
			  value: M.I18N.l('selectSomething')
            , label: M.I18N.l('order')
            , cssClass: 'orderButton'
			, events: {
				tap: {
            		  target: DigiWebApp.OrderListController
            		, action: function() {
						try{DigiWebApp.ApplicationController.vibrate();}catch(e2){}
						this.init(
								  NO 
								, function(obj){
									  DigiWebApp.BookingPage.content.orderButton.setValue(obj.get("name"));
								}
								, function(){
									DigiWebApp.NavigationController.backToBookTimePagePOP();
								}
						)
						DigiWebApp.NavigationController.toOrderListPage();
					}
	      		}
			}
		})
		
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
		    				var mySelection = M.ViewManager.getView('bookingPage', 'order').getSelection(YES);
		    				if (mySelection.label == mySelection.value || isGUID(mySelection.value)) {
		    					DigiWebApp.BookingPage.doHideShowPositionCombobox(false);
		    				} else {
		    					DigiWebApp.BookingPage.doHideShowPositionCombobox(true);
		    				}
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
    
    , doHideShowOrderCombobox: function(show) {
		try { $('#' + DigiWebApp.BookingPage.content.order.id + "_container").hide(); } catch (e) {trackError(e);}
		try { $('#' + DigiWebApp.BookingPage.content.orderButton.id).hide(); } catch (e) {trackError(e);}
		try { $('label[for="' + DigiWebApp.BookingPage.content.orderButton.id + '"]').hide(); } catch (e) {trackError(e);}
    	if (show) {
    		// Freischaltung 429 "mehrstufige Auftragsauswahl"
    		if (DigiWebApp.SettingsController.featureAvailable("429")) {
    			try { $('#' + DigiWebApp.BookingPage.content.orderButton.id).show(); } catch (e) {trackError(e);}	
    			try { $('label[for="' + DigiWebApp.BookingPage.content.orderButton.id + '"]').show(); } catch (e) {trackError(e);}
    		} else {
    			try { $('#' + DigiWebApp.BookingPage.content.order.id + "_container").show(); } catch (e) {trackError(e);}
    		}
    	}
    }

    , doHideShowPositionCombobox: function(show) {
		try { $('#' + DigiWebApp.BookingPage.content.position.id + "_container").hide(); } catch (e) {trackError(e);}
    	if (show) {
    		// Freischaltung 429 "mehrstufige Auftragsauswahl"
    		if (DigiWebApp.SettingsController.featureAvailable("429")) {
    			// nothing to do
    		} else {
    			try { $('#' + DigiWebApp.BookingPage.content.position.id + "_container").show(); } catch (e) {trackError(e);}
    		}
    	}
    }

});

