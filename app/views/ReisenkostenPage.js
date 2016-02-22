// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: DigiWebApp
// View: ReisekostenPage
// ==========================================================================

// Screen zur Eingabe von Reise- und Übernachtungskosten, vorerst nur für Bohle (TS-15-0073).
// Ist eine Mischung aus RemarkPage und SpesenPage.
DigiWebApp.ReisekostenPage = M.PageView.design({

      events: {
		pagebeforeshow: {
            //target: DigiWebApp.BookingController
            //, action: 'init'
			action: function() {
	
			    var i;
                /*
				if (DigiWebApp.ReisekostenAuswahlOption.find().length === 0) {
					i = 1;
					DigiWebApp.ReisekostenAuswahlOption.createRecord({id: i, beschreibung: "keine Spesenkosten"}).saveSorted(); i++;	// 1
					DigiWebApp.ReisekostenAuswahlOption.createRecord({id: i, beschreibung: "Tagesspesenkosten"}).saveSorted(); i++;		// 2
					DigiWebApp.ReisekostenAuswahlOption.createRecord({id: i, beschreibung: "mehrtägige Spesen"}).saveSorted(); i++;		// 3
				}
                */
				if (DigiWebApp.UebernachtungAuswahlOption.find().length === 0) {
					i = 1;
					DigiWebApp.UebernachtungAuswahlOption.createRecord({ id: i, beschreibung: "Keine Übernachtung" }).saveSorted(); i++;		        // 1
					DigiWebApp.UebernachtungAuswahlOption.createRecord({ id: i, beschreibung: "Übernachtung privat (ohne Beleg)" }).saveSorted(); i++;  // 2
					DigiWebApp.UebernachtungAuswahlOption.createRecord({ id: i, beschreibung: "Zimmer zahlt Firma" }).saveSorted(); i++;	            // 3
					DigiWebApp.UebernachtungAuswahlOption.createRecord({ id: i, beschreibung: "Zimmer zahlt Firma" }).saveSorted(); i++;	            // 4
                }
				/*
		        var reisekostenOptionen = DigiWebApp.ReisekostenAuswahlOption.findSorted();
		        reisekostenOptionen = _.map(ReisekostenOptionen, function(opt) {
		        	if (opt) {
		                var obj = { label: opt.get('beschreibung'), value: opt.get('id') };
		                if(opt.get('id') == 1) {
		                    obj.isSelected = YES;
		                }
		                return obj;
		        	}
		        });
		        reisekostenOptionen = _.compact(reisekostenOptionen);/* remove false values from positions with _.compact() *
		        DigiWebApp.BookingController.set("reisekostenOptionen", reisekostenOptionen);
                */

		        var uebernachtungOptionen = DigiWebApp.UebernachtungAuswahlOption.findSorted();
		        uebernachtungOptionen = _.map(uebernachtungOptionen, function(opt) {
		        	if (opt) {
		                var obj = { label: opt.get('beschreibung'), value: opt.get('id') };
		                if (opt.get('id') === 1) {
		                    obj.isSelected = YES;
		                }
		                return obj;
		        	}
		        });
			    /* remove false values from positions with _.compact() */
		        uebernachtungOptionen = _.compact(uebernachtungOptionen);
		        DigiWebApp.BookingController.set("uebernachtungOptionen", uebernachtungOptionen);
			}
        }
    }
    /*
    , myCallback: function() {
    }
    */  
    , tab_action_timeoutvar: null    
    
    , tab_action: function() {
    	clearTimeout(DigiWebApp.ReisekostenPage.tab_action_timeoutvar);
    		            	
		// Save to currentBooking
        //DigiWebApp.BookingController.currentBooking.set('ReisekostenAuswahl', 
    	//  M.ViewManager.getView('ReisekostenPage', 'reisekostenAuswahl').getSelection(YES).value);
    	DigiWebApp.BookingController.currentBooking.set('uebernachtungAuswahl',
            M.ViewManager.getView('ReisekostenPage', 'uebernachtungAuswahl').getSelection(YES).value);
		DigiWebApp.BookingController.currentBooking.save();

		//DigiWebApp.ReisekostenPage.myCallback();
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
                    , action: function() {
                        try { DigiWebApp.ApplicationController.vibrate(); } catch (e2) { }
                        this.backToBookTimePagePOP();
                      }
                }
            }
        })
        , title: M.LabelView.design({
              value: M.I18N.l('Reisekosten_Ausloese')
            , anchorLocation: M.CENTER
        })
        , anchorLocation: M.TOP
    })

    , content: M.ScrollView.design({
          childViews: 'remark uebernachtungAuswahl spacer grid'

        , spacer: M.LabelView.design({
            value: '&nbsp;<br />'
        })
                    
        , uebernachtungAuswahl: M.SelectionListView.design({
              selectionMode: M.SINGLE_SELECTION_DIALOG
            , label: M.I18N.l('uebernachtungArt')
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
        					DigiWebApp.ReisekostenPage.tab_action_timeoutvar = setTimeout("DigiWebApp.ReisekostenPage.tab_action();", 50);
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

