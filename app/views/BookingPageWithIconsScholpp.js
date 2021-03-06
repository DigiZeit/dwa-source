// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: DigiWebApp
// View: BookingPage
// ==========================================================================

m_require('app/views/TabBar.js');

DigiWebApp.BookingPageWithIconsScholpp = M.PageView.design({

      childViews: 'header content tabBar'

    , events: {
		pagebeforeshow: {
		    action: function () {
		        if (DigiWebApp.SettingsController.getSetting("debug")) {
		            writeToLog("BookingPageWithIconsScholpp.pagebeforeshow()");
		        }

		        if (!DigiWebApp.SettingsController.featureAvailable('424')) {
            		if (DigiWebApp.SettingsController.getSetting("kannReisezeitBuchen")) {
		                $('#' + DigiWebApp.BookingPageWithIconsScholpp.content.fahrzeit_arbeitszeit_spezial_ButtonGrid.fahrzeitButtonGrid.button.id).show();
            		    $('#' + DigiWebApp.BookingPageWithIconsScholpp.content.fahrzeit_arbeitszeit_spezial_ButtonGrid.fahrzeitButtonGrid.icon.id).show();
            		} else {
		                $('#' + DigiWebApp.BookingPageWithIconsScholpp.content.fahrzeit_arbeitszeit_spezial_ButtonGrid.fahrzeitButtonGrid.button.id).hide();
            		    $('#' + DigiWebApp.BookingPageWithIconsScholpp.content.fahrzeit_arbeitszeit_spezial_ButtonGrid.fahrzeitButtonGrid.icon.id).hide();
                    }
		        }
		        DigiWebApp.BookingController.init();

        		// Nur einmal die Auswahl anzeigen. Wenn der User aus dem Buchen-Screen raus und wieder rein geht,
        		// soll die aktuelle Buchung kommen, damit er sich diese wieder anzeigen lassen kann. 
        		DigiWebApp.SelectionController.useSelections = NO;
		    }
        }
        , pageshow: {
        	action: function() {
        		DigiWebApp.TabBar.setActiveTab(DigiWebApp.TabBar.tabItem1);
        		$('#' + DigiWebApp.BookingPageWithIconsScholpp.content.activity.id + "_container").hide();
        		$('#' + DigiWebApp.BookingPageWithIconsScholpp.content.spesenkennzeichen.id).attr('disabled', 'disabled');
        		
        		if (DigiWebApp.SettingsController.featureAvailable('424')) {
        			// für Kunde Stooss
//        			try{$('[id=' + DigiWebApp.BookingPageWithIconsScholpp.header.feierabendButton.id  + ']').each(function() { $(this).show(); });}catch(e){}
//        			try{$('[id=' + DigiWebApp.BookingPageWithIconsScholpp.content.spesenkennzeichen.id  + ']').each(function() { $(this).hide(); });}catch(e){}
//        			try{$('[id=' + DigiWebApp.BookingPageWithIconsScholpp.content.uebernachtungskennzeichen.id  + ']').each(function() { $(this).hide(); });}catch(e){}
        			$('#' + DigiWebApp.BookingPageWithIconsScholpp.header.feierabendButton.id).show();
            		$('#' + DigiWebApp.BookingPageWithIconsScholpp.content.spesenkennzeichen.id + "_container").hide();
            		$('#' + DigiWebApp.BookingPageWithIconsScholpp.content.uebernachtungskennzeichen.id + "_container").hide();
        		} else {
        			// für Kunde Scholpp
        			$('#' + DigiWebApp.BookingPageWithIconsScholpp.header.feierabendButton.id).hide();
            		$('#' + DigiWebApp.BookingPageWithIconsScholpp.content.spesenkennzeichen.id + "_container").show();
            		$('#' + DigiWebApp.BookingPageWithIconsScholpp.content.uebernachtungskennzeichen.id + "_container").show();
        		}
        	}
        }
    }

    , cssClass: 'bookTimePageWithIcons'

    , header: M.ToolbarView.design({
          childViews: 'title feierabendButton'
        , cssClass: 'header unselectable'
        , isFixed: YES
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
	      childViews: 'order position activity uebernachtungskennzeichen spesenkennzeichen '
            + 'fahrzeit_arbeitszeit_spezial_ButtonGrid unterbrechung_pause_arbeitsende_ButtonGrid '
            + 'currentBookingLabel'
        , cssClass: 'unselectable'
        	
        , activityLabel: M.LabelView.design({
        	  value: M.I18N.l('activity')
        	, cssClass: 'whiteLabel16px'
        })

        , unterbrechung_pause_arbeitsende_ButtonGrid: M.GridView.design({
        		childViews: 'unterbrechungButtonGrid pauseButtonGrid arbeitsendeButtonGrid'
              , layout: M.THREE_COLUMNS
              , arbeitsendeButtonGrid: M.GridView.design({
                  childViews: 'button icon'
                , layout: {
                      cssClass: 'scholppButton'
                    , columns: {
                          0: 'button'
                        , 1: 'icon'
                    }
                }
                , button: M.ButtonView.design({
                      value: "Ende"
                    , cssClass: 'scholppButton'
                    , anchorLocation: M.RIGHT
                    , events: {
                        tap: {
                            action: function () {
                                try { DigiWebApp.ApplicationController.vibrate(); } catch (e2) { }
                                M.ViewManager.getView('bookingPageWithIconsScholpp',
                                    'uebernachtungskennzeichen').setSelection("6");
		    					DigiWebApp.ScholppBookingController.bucheArbeitsende();
		        			}
                        }
                    }
                })
                , icon: M.ImageView.design({
                      value: 'theme/images/48x48_plain_home.png'
                    , events: {
		                tap: {
		                    action: function () {
		                        try { DigiWebApp.ApplicationController.vibrate(); } catch (e3) { }
		                        M.ViewManager.getView('bookingPageWithIconsScholpp',
                                    'uebernachtungskennzeichen').setSelection("6");
	          	  				DigiWebApp.ScholppBookingController.bucheArbeitsende();
		          			}
		                }
		            }
                })
            })

            , unterbrechungButtonGrid: M.GridView.design({
                  childViews: 'button icon'
                , layout: {
                      cssClass: 'scholppButton'
                    , columns: {
                          0: 'button'
                        , 1: 'icon'
                    }
                }
                , button: M.ButtonView.design({
                      value: "Unterbrechung"
                    , cssClass: 'scholppButton'
                    , anchorLocation: M.RIGHT
                    , events: {
		                tap: {
		                    action: function () {
                                try {DigiWebApp.ApplicationController.vibrate(); }catch(e4) { }
                                M.ViewManager.getView('bookingPageWithIconsScholpp',
                                    'uebernachtungskennzeichen').setSelection("6");
			    				DigiWebApp.ScholppBookingController.bucheUnterbrechung();
		          			}
		                }
		            }
                })
                , icon: M.ImageView.design({
                      value: 'theme/images/48x48_plain_clock_pause.png'
                    , events: {
		                tap: {
		                    action: function () {
		                        try { DigiWebApp.ApplicationController.vibrate(); } catch (e5) { }
		                        M.ViewManager.getView('bookingPageWithIconsScholpp',
                                    'uebernachtungskennzeichen').setSelection("6");
	          	  				DigiWebApp.ScholppBookingController.bucheUnterbrechung();
		          			}
		                }
		            }
                })
            })

            , pauseButtonGrid: M.GridView.design({
                  childViews: 'button icon'
                , layout: {
                      cssClass: 'scholppButton'
                    , columns: {
                          0: 'button'
                        , 1: 'icon'
                    }
                }
                , button: M.ButtonView.design({
                      value: " "
                    , cssClass: 'scholppButton'
                    , anchorLocation: M.RIGHT
                    , events: {
		                tap: {
		                    action: function () {
		                        try { DigiWebApp.ApplicationController.vibrate(); } catch (e6) { }
		                        //M.ViewManager.getView('bookingPageWithIconsScholpp', 
		                        //  'uebernachtungskennzeichen').setSelection("6");
	          	  				//DigiWebApp.ScholppBookingController.buchePause();
		          			}
		                }
		            }
                })
                , icon: M.ImageView.design({
                      value: ''
                    , events: {
		                tap: {
		                    action: function () {
		                        try { DigiWebApp.ApplicationController.vibrate(); } catch (e7) { }
		                        //M.ViewManager.getView('bookingPageWithIconsScholpp', 
		                        //  'uebernachtungskennzeichen').setSelection("6");
	          	  				//DigiWebApp.ScholppBookingController.buchePause();
		          			}
		                }
		            }
                })
            })
        })
        
        , fahrzeit_arbeitszeit_spezial_ButtonGrid: M.GridView.design({
        	  childViews: 'fahrzeitButtonGrid arbeitszeitButtonGrid spezialButtonGrid'
            , layout: M.THREE_COLUMNS

            , fahrzeitButtonGrid: M.GridView.design({
                childViews: 'button icon'
              , layout: {
                    cssClass: 'scholppButton'
                  , columns: {
                        0: 'button'
                      , 1: 'icon'
                  }
              }
              , button: M.ButtonView.design({
                    value: "Reisezeit"
                  , cssClass: 'scholppButton'
                  , anchorLocation: M.RIGHT
                  , events: {
                        tap: {
                            action: function () {
                                try { DigiWebApp.ApplicationController.vibrate(); } catch (e8) { }
                                if (DigiWebApp.SettingsController.getSetting("kannReisezeitBuchen")) {
                                    DigiWebApp.ScholppBookingController.bucheFahrzeit();
                                }
                            }
                        }
                  }
              })
              , icon: M.ImageView.design({
                    value: 'theme/images/48x48_plain_car_compact_grey.png'
                  , events: {
	                  tap: {
	                        action: function () {
  	                            try { DigiWebApp.ApplicationController.vibrate(); } catch (e9) { }
	                            if (DigiWebApp.SettingsController.getSetting("kannReisezeitBuchen")) {
	                                DigiWebApp.ScholppBookingController.bucheFahrzeit();
	                            }
	                        }
	                  }
	              }
              })
            })
            , arbeitszeitButtonGrid: M.GridView.design({
                  childViews: 'button icon'
                , layout: {
                      cssClass: 'scholppButton'
                    , columns: {
                          0: 'button'
                        , 1: 'icon'
                    }
                }
                , button: M.ButtonView.design({
                      value: "Arbeitszeit"
                    , cssClass: 'scholppButton'
                    , anchorLocation: M.RIGHT
                    , events: {
		                tap: {
		                    action: function () {
		                        try { DigiWebApp.ApplicationController.vibrate(); } catch (e10) { }
		                        M.ViewManager.getView('bookingPageWithIconsScholpp',
                                    'uebernachtungskennzeichen').setSelection("6");
	          	  				DigiWebApp.ScholppBookingController.bucheArbeitszeit();
		          			}
		                }
		            }
                })
                , icon: M.ImageView.design({
                      value: 'theme/images/48x48_plain_wrench.png'
                    , events: {
		                tap: {
		                    action: function () {
		                        try { DigiWebApp.ApplicationController.vibrate(); } catch (e11) { }
		                        M.ViewManager.getView('bookingPageWithIconsScholpp',
                                    'uebernachtungskennzeichen').setSelection("6");
	          	  				DigiWebApp.ScholppBookingController.bucheArbeitszeit();
		          			}
		                }
		            }
                })
            })
            , spezialButtonGrid: M.GridView.design({
                childViews: 'button icon'
              , layout: {
                    cssClass: 'scholppButton'
                  , columns: {
                        0: 'button'
                      , 1: 'icon'
                  }
              }
              , button: M.ButtonView.design({
                    value: "&nbsp;"
                  , cssClass: 'scholppButton'
                  , anchorLocation: M.RIGHT
                  , events: {
		                tap: {
		                    action: function () {
		                        try { DigiWebApp.ApplicationController.vibrate(); } catch (e12) { }
		                        //M.ViewManager.getView('bookingPageWithIconsScholpp', 
		                        //  'uebernachtungskennzeichen').setSelection("6");
	          	  				//DigiWebApp.ScholppBookingController.bucheArbeitszeit();
		          			}
		                }
		            }
              })
              , icon: M.ImageView.design({
                    value: ''
                  , events: {
		                tap: {
		                    action: function () {
		                        try { DigiWebApp.ApplicationController.vibrate(); } catch (e13) { }
		                        //M.ViewManager.getView('bookingPageWithIconsScholpp', 
		                        //  'uebernachtungskennzeichen').setSelection("6");
		    					//DigiWebApp.ScholppBookingController.bucheArbeitszeit();
		          			}
		                }
		            }
              })
          })
        })

        , order: M.SelectionListView.design({
                selectionMode: M.SINGLE_SELECTION_DIALOG
            , initialText: M.I18N.l('order')
            , label: ''
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
            }
        })
            
        , position: M.SelectionListView.design({
              selectionMode: M.SINGLE_SELECTION_DIALOG
            , label: ''
            , initialText: M.I18N.l('position')
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
                        this.setActivities(YES, YES);
                    }
                }
            }
        })

        , activity: M.SelectionListView.design({
              selectionMode: M.SINGLE_SELECTION_DIALOG
            , label: ''
            , initialText: M.I18N.l('activity')
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
            }
        })

        , uebernachtungskennzeichen: M.SelectionListView.design({
              selectionMode: M.SINGLE_SELECTION_DIALOG
            //, cssClass: 'unselectable'
            , applyTheme: NO
            , contentBinding: {
                  target: DigiWebApp.SelectionController
                , property: 'uebernachtungskennzeichenScholpp'
            }
            , events: {
                change: {
                      target: DigiWebApp.SelectionController
                    , action: function() {
                        this.saveSelection();
                    }
                }
            }
        })

        , spesenkennzeichen: M.SelectionListView.design({
              selectionMode: M.SINGLE_SELECTION_DIALOG
            //, cssClass: 'unselectable'
            , applyTheme: NO
            , contentBinding: {
                  target: DigiWebApp.SelectionController
                , property: 'spesenkennzeichenScholpp'
            }
            , events: {
                change: {
                      target: DigiWebApp.SelectionController
                    , action: function() {
                        //this.saveSelection();
                    }
                }
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
                    }
                }
            })
            , icon: M.ImageView.design({
                value: 'theme/images/icon_bookTime.png'
            })
        })

        , currentBookingLabel: M.LabelView.design({
              cssClass: 'marginTop15 whiteLabel unselectable'
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
