// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: DigiWebApp
// View: SpesenPage
// ==========================================================================

DigiWebApp.SpesenPage = M.PageView.design({

    /* Use the 'events' property to bind events like 'pageshow' */
      events: {
		pagebeforeshow: {
            //target: DigiWebApp.BookingController
            //, action: 'init'
			action: function() {
	
				var i;
				if (DigiWebApp.SpesenAuswahlOption.find().length === 0) {
					i = 1;
					DigiWebApp.SpesenAuswahlOption.createRecord({id: i, beschreibung: "keine Spesen"}).saveSorted(); i = i + 1;						// 1
					DigiWebApp.SpesenAuswahlOption.createRecord({id: i, beschreibung: "Tagesspesen"}).saveSorted(); i = i + 1;						// 2
					DigiWebApp.SpesenAuswahlOption.createRecord({id: i, beschreibung: "mehrtägige Spesen"}).saveSorted(); i = i + 1;				// 3
				}

				if (DigiWebApp.UebernachtungAuswahlOption.find().length === 0) {
					i = 1;
					DigiWebApp.UebernachtungAuswahlOption.createRecord({id: i, beschreibung: "keine Übernachtung"}).saveSorted(); i = i + 1;		// 1
					DigiWebApp.UebernachtungAuswahlOption.createRecord({id: i, beschreibung: "Übernachtung mit Pauschale"}).saveSorted(); i = i + 1;// 2
					DigiWebApp.UebernachtungAuswahlOption.createRecord({id: i, beschreibung: "Übernachtung mit Beleg"}).saveSorted(); i = i + 1;	// 3
				}
				
		        var spesenOptionen = DigiWebApp.SpesenAuswahlOption.findSorted();
		        spesenOptionen = _.map(spesenOptionen, function(opt) {
		        	if (opt) {
		                var obj = { label: opt.get('beschreibung'), value: opt.get('id') };
		                if(opt.get('id') === 1) {
		                    obj.isSelected = YES;
		                }
		                return obj;
		        	}
		        });
		        spesenOptionen = _.compact(spesenOptionen);/* remove falsy values from positions with _.compact() */
		        DigiWebApp.BookingController.set("spesenOptionen", spesenOptionen);


		        var uebernachtungOptionen = DigiWebApp.UebernachtungAuswahlOption.findSorted();
		        uebernachtungOptionen = _.map(uebernachtungOptionen, function(opt) {
		        	if (opt) {
		                var obj = { label: opt.get('beschreibung'), value: opt.get('id') };
		                if(opt.get('id') === 1) {
		                    obj.isSelected = YES;
		                }
		                return obj;
		        	}
		        });
		        uebernachtungOptionen = _.compact(uebernachtungOptionen);/* remove falsy values from positions with _.compact() */
		        DigiWebApp.BookingController.set("uebernachtungOptionen", uebernachtungOptionen);

			}
        }
    }

    , myCallback: function() {

    }
        
    , tab_action_timeoutvar: null    
    
    , tab_action: function() {
    	clearTimeout(DigiWebApp.SpesenPage.tab_action_timeoutvar);
    		            	
		// save to currentBooking
		DigiWebApp.BookingController.currentBooking.set('spesenAuswahl', M.ViewManager.getView('spesenPage', 'spesenAuswahl').getSelection(YES).value);
		DigiWebApp.BookingController.currentBooking.set('uebernachtungAuswahl', M.ViewManager.getView('spesenPage', 'uebernachtungAuswahl').getSelection(YES).value);
		DigiWebApp.BookingController.currentBooking.save();

		DigiWebApp.SpesenPage.myCallback();
    }
    
    , childViews: 'header content'

    , cssClass: 'remarkPage'

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
                      target: DigiWebApp.NavigationController
                    , action: function() {try{navigator.notification.vibrate(200);}catch(e){} this.backToBookTimePagePOP();}
                }
            }
        })
        , title: M.LabelView.design({
              value: M.I18N.l('Spesen_Ausloese')
            , anchorLocation: M.CENTER
        })
        , anchorLocation: M.TOP
    })

    , content: M.ScrollView.design({
          childViews: 'spesenAuswahl uebernachtungAuswahl spacer grid'

        , spacer: M.LabelView.design({
            value: '&nbsp;<br />'
        })
        
        , spesenAuswahl: M.SelectionListView.design({
                  selectionMode: M.SINGLE_SELECTION_DIALOG
                , initialText: M.I18N.l('noData')
                , label: M.I18N.l('Spesen')
                //, cssClass: 'unselectable'
                , applyTheme: NO
                , contentBinding: {
                      target: DigiWebApp.BookingController
                    , property: 'spesenOptionen'
                }
                , events: {
                    change: {
                          target: DigiWebApp.BookingController
                        , action: function() {
                            //this.setPositions();
                        }
                    }
                }
        })
            
        , uebernachtungAuswahl: M.SelectionListView.design({
              selectionMode: M.SINGLE_SELECTION_DIALOG
            , label: M.I18N.l('Uebernachtung')
            , initialText: M.I18N.l('noData')
            //, cssClass: 'unselectable'
            , applyTheme: NO
            , contentBinding: {
                  target: DigiWebApp.BookingController
                , property: 'uebernachtungOptionen'
            }
            , events: {
                change: {
                      target: DigiWebApp.BookingController
                    , action: function() {
                        //this.setActivities(YES);
                    }
                }
            }
        })
        	  
        , grid: M.GridView.design({
        	
              childViews: 'button icon'
            , layout: {
                  cssClass: 'digiButton'
                , columns: {
                      0: 'button'
                    , 1: 'icon'
                }
            }
            
            , button: M.ButtonView.design({
                  value: M.I18N.l('SpeichernUndBuchen')
                , cssClass: 'digiButton'
                , anchorLocation: M.RIGHT
                , events: {
                    tap: {
                        //  target: DigiWebApp.NavigationController
                        //, action: 'toSettingsPage'
            			action: function() {
        					DigiWebApp.ApplicationController.DigiLoaderView.show(M.I18N.l('Save'));
        					DigiWebApp.SpesenPage.tab_action_timeoutvar = setTimeout("DigiWebApp.SpesenPage.tab_action();", 50);
            			}
                    }
                }
            })
            
            , icon: M.ImageView.design({
                value: 'theme/images/icon_bookTime.png'
            })
            
        })
    })
});

