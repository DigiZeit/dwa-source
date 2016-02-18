// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: DigiWebApp
// View: BautagebuchMitarbeiterAuswahlPage
// ==========================================================================

DigiWebApp.BautagebuchMitarbeiterAuswahlPage = M.PageView.design({

      events: {
		  pagebeforeshow: {
            action: function() {

					// verfügbare Mitarbeiter kopieren und ausgewählte selektieren
                    var mitarbeiterIds = DigiWebApp.BautagebuchBautagesberichtDetailsController.mitarbeiterIds; 
                    var mitarbeiterList = [];
                    var myMitarbeiterList = JSON.parse(JSON.stringify(DigiWebApp.BautagebuchMainController.mitarbeiter));
                    var mitarbeiterArray = mitarbeiterList;
    				if (mitarbeiterIds && mitarbeiterIds.length !== 0) {
    					mitarbeiterArray = _.map(myMitarbeiterList, function(o) {
    						var mitarbeiterSelected = NO;
    						_.each(mitarbeiterIds, function(m) {
    							if (m === o.value) {
    								mitarbeiterSelected = YES;
    							}
    						});
    						o.isSelected = (mitarbeiterSelected === YES);
							return o;
		    			});
	            	} else {
    					mitarbeiterArray = DigiWebApp.BautagebuchMainController.mitarbeiter;
	            	}
    				mitarbeiterArray = _.compact(mitarbeiterArray);
    				mitarbeiterArray = _.sortBy(mitarbeiterArray, function(m){ 
    					return m.order;
    				});
					DigiWebApp.BautagebuchBautagesberichtDetailsController.set("mitarbeiterList", mitarbeiterArray);
					
					// set mitarbeiterListSelected
                    var mitarbeiterListSelected = [];
                    var mitarbeiterArraySelected = mitarbeiterListSelected;
                    myMitarbeiterList = JSON.parse(JSON.stringify(DigiWebApp.BautagebuchMainController.mitarbeiter));
    				if (mitarbeiterIds && mitarbeiterIds.length !== 0) {
    					mitarbeiterArraySelected = _.map(myMitarbeiterList, function(o) {
    						var mitarbeiterSelected = NO;
    						_.each(mitarbeiterIds, function(m) {
    							if (m === o.value) {
    								mitarbeiterSelected = YES;
    							}
    						});
    						if (mitarbeiterSelected) {
    							o.isSelected = YES;
    							return o;
    						}
		    			});
	            	}
    				mitarbeiterArraySelected = _.compact(mitarbeiterArraySelected);
					DigiWebApp.BautagebuchBautagesberichtDetailsController.set("mitarbeiterListSelected", mitarbeiterArraySelected);

			}
        }
        , pagehide: {
            action: function() {

        	}
        }
    }

    , cssClass: 'bautagebuchMitarbeiterAuswahlPage'

    , childViews: 'header content'

    , header: M.ToolbarView.design({
          childViews: 'backButton title'
        , cssClass: 'header unselectable'
        , isFixed: YES
        , backButton: M.ButtonView.design({
              value: M.I18N.l('back')
            , icon: 'arrow-l'
            , anchorLocation: M.LEFT
            , events: {
                tap: {
                    // target: DigiWebApp.NavigationController
                    action: function() {
                        if (inDebug()) writeToLog('backButton tap in bautagebuchMitarbeiterAuswahlPage');
                        try { DigiWebApp.ApplicationController.vibrate(); } catch (e2) { }
                        history.back();
                      }
                }
            }
        })
        , title: M.LabelView.design({
              value: M.I18N.l('employees')
            , anchorLocation: M.CENTER
        })
        , anchorLocation: M.TOP
    })

    , content: M.ScrollView.design({

    	  //childViews: 'projektleiterComboBox auftragComboBox mitarbeiterGroup startUhrzeit spacer2 zeitenButton materialienButton notizenButton medienButton wetterButton spacer1 grid'
    	  childViews: 'mitarbeiterGroup spacer1 grid'
    		  
        , cssClass: 'content'
    	
        , spacer1: M.LabelView.design({
            value: '&nbsp;<br>'
        })

        	
        , mitarbeiterGroup: M.SelectionListView.design({

            /* renders a selection view like check boxes */
              selectionMode: M.MULTIPLE_SELECTION

            , initialText: M.I18N.l('noData')
            
            //, label: M.I18N.l('employees')

            , applyTheme: NO

            /* this seleciton view has no static entries, instead it is filled via content binding. */
            , contentBinding: {
                  target: DigiWebApp.BautagebuchBautagesberichtDetailsController
                , property: 'mitarbeiterList'
            }

            , events: {
                  change: {
                    /* executed in scope of DOMWindow because no target defined */
                      action: function(itemValues, items) {
	                        /* itemValues is an array because mode of selection is M.MULTIPLE_SELECTION */
	            			var mitarbeiterIds = [];
	                        for(var i = 0; i < itemValues.length; i++) {
	                        	mitarbeiterIds.push(itemValues[i]);
	                        }
	                        DigiWebApp.BautagebuchBautagesberichtDetailsController.set("mitarbeiterIds", mitarbeiterIds);
	                        
	                        var mitarbeiterList = [];
	                        var mitarbeiterArray = mitarbeiterList;
		    				if (mitarbeiterIds && mitarbeiterIds.length !== 0) {
		    					mitarbeiterArray = _.map(DigiWebApp.BautagebuchMainController.mitarbeiter, function(o) {
		    						var mitarbeiterSelected = NO;
		    						_.each(mitarbeiterIds, function(m) {
		    							if (m === o.value) {
		    								mitarbeiterSelected = YES;
		    							}
		    						});
		    						if (mitarbeiterSelected) {
		    							o.isSelected = YES;
		    							return o;
		    						}
	    		    			});
    		            	}
		    				mitarbeiterArray = _.compact(mitarbeiterArray);
	    					DigiWebApp.BautagebuchBautagesberichtDetailsController.set("mitarbeiterListSelected", mitarbeiterArray);
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
                  value: M.I18N.l('save')
                , cssClass: 'digiButton green_background'
                , anchorLocation: M.RIGHT
                , events: {
                    tap: {
		                //target: DigiWebApp.BautagebuchBautagesberichtDetailsController,
		                //action: 'save'
		    			action: function() {
		    			    try { DigiWebApp.ApplicationController.vibrate(); } catch (e2) { }
		    			    history.back();
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

