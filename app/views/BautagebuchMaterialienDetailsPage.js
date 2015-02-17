// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: DigiWebApp
// View: BautagebuchMaterialienDetailsPage
// ==========================================================================

DigiWebApp.BautagebuchMaterialienDetailsPage = M.PageView.design({

      events: {
		  pagebeforeshow: {
            action: function() {
					var itemSelected = NO;
					var relevantDetailsController = DigiWebApp.BautagebuchMaterialienDetailsController;

					if (relevantDetailsController.auftragId) {
						relevantDetailsController.set("auftraegeList", DigiWebApp.Order.getList({selectedId: relevantDetailsController.auftragId}));
					} else if (DigiWebApp.BookingController.currentBooking) {
						if (DigiWebApp.BookingController.currentBooking.get('handOrderId')) {
							relevantDetailsController.set("auftraegeList", DigiWebApp.Order.getList({selectedId: DigiWebApp.BookingController.currentBooking.get('handOrderId')}));
							relevantDetailsController.set('handOrderId', DigiWebApp.BookingController.currentBooking.get('handOrderId'));
							relevantDetailsController.set('handOrderName', DigiWebApp.BookingController.currentBooking.get('handOrderName'));
						} else {
							relevantDetailsController.set("auftraegeList", DigiWebApp.Order.getList({selectedId: DigiWebApp.BookingController.currentBooking.get('orderId')}));
							relevantDetailsController.set('auftragId', DigiWebApp.BookingController.currentBooking.get('orderId'));
							relevantDetailsController.set('auftragName', DigiWebApp.BookingController.currentBooking.get('orderName'));
						}
					} else {
						relevantDetailsController.set("auftraegeList", DigiWebApp.Order.getList());
					}

					_.each(relevantDetailsController.auftraegeList, function(a) {
						if (a.isSelected == YES && parseIntRadixTen(a.value) != 0) {
							relevantDetailsController.set('auftragId', parseIntRadixTen(a.value));
							relevantDetailsController.set('auftragName', a.label);
						}
					});
					
					if (DigiWebApp.BautagebuchBautagesberichtDetailsController.bautagesberichtTyp == "<standard>") {
						var myPositionenList = JSON.parse(JSON.stringify(DigiWebApp.BautagebuchBautagesberichtDetailsController.positionenList));
						_.each(myPositionenList, function(p) {
							if (parseIntRadixTen(p.value) !== 0) {
								p.isSelected = NO;
							} else {
								p.isSelected = YES;
							}
						});
					    var positionenArray = _.map(myPositionenList, function(o) {
					    	if ( typeof(o) === "undefined" ) {
					    		console.log("UNDEFINED position");
					    	} else {    
								if (relevantDetailsController.positionId) {
									o.isSelected = (o.value === relevantDetailsController.positionId);
									if (o.isSelected) { itemSelected = YES; }
								}
					            return o;
					    	}
					    });
					    if (!itemSelected && DigiWebApp.BautagebuchEinstellungenController.settings.positionVorselektieren) {
						    positionenArray = _.map(positionenArray, function(o) {
								if (DigiWebApp.BautagebuchBautagesberichtDetailsController.positionId) {
									o.isSelected = (o.value === DigiWebApp.BautagebuchBautagesberichtDetailsController.positionId);
									if (o.isSelected) { itemSelected = YES; 
										relevantDetailsController.set("positionId", o.value);
										relevantDetailsController.set("positionName", o.label);
									}
								}
					            return o;
						    });
					    }
					    positionenArray = _.compact(positionenArray);
					    if (positionenArray.length > 1) {
					    	positionenArray.push({label: M.I18N.l('selectSomething'), value: '0', isSelected: !itemSelected});
					    }
					    if (!itemSelected && positionenArray.length == 1) {
					    	positionenArray[0].isSelected = YES;
					    	relevantDetailsController.set("positionId", positionenArray[0].value);
					    	relevantDetailsController.set("positionName", positionenArray[0].label);
					    }
					    relevantDetailsController.set("positionenList", positionenArray);
					    
					} else {
						
						relevantDetailsController.setPositionen(relevantDetailsController.auftragId);
						
					}
					
					_.each(relevantDetailsController.positionenList, function(a) {
						if (a.isSelected == YES && parseIntRadixTen(a.value) != 0) {
							relevantDetailsController.set('positionId', parseIntRadixTen(a.value));
							relevantDetailsController.set('positionName', a.label);
						}
					});

				    relevantDetailsController.setTaetigkeiten(relevantDetailsController.positionId);

				    try {
						_.each(relevantDetailsController.activityList, function(a) {
							if (a.isSelected == YES && parseIntRadixTen(a.value) != 0) {
								relevantDetailsController.set('activityId', parseIntRadixTen(a.value));
								relevantDetailsController.set('activityName', a.label);
							}
						});
				    } catch (e) {trackError(e);}
				    
					relevantDetailsController.setLieferanten(YES);
					relevantDetailsController.setHersteller(YES);
					relevantDetailsController.setMaterialtypen(YES);
					relevantDetailsController.setMaterialgruppen(YES);
				    
					relevantDetailsController.setMaterialien(YES);
					
					relevantDetailsController.setMengeneinheiten(YES);
					
					M.ViewManager.getView('bautagebuchMaterialienDetailsPage', 'mengenInput').setValue(DigiWebApp.BautagebuchMaterialienDetailsController.menge);
					
                	var myTyp = DigiWebApp.BautagebuchBautagesberichtDetailsController.get("bautagesberichtTyp");
					if (DigiWebApp.BautagebuchBautagesberichtDetailsController.item.get("abgeschlossen") && myTyp == "<standard>") {
						$("#" + DigiWebApp.BautagebuchMaterialienDetailsPage.content.speichernButton.id).hide();
						$("#" + DigiWebApp.BautagebuchMaterialienDetailsPage.header.delButton.id).hide();
					} else {
						$("#" + DigiWebApp.BautagebuchMaterialienDetailsPage.content.speichernButton.id).show();
						$("#" + DigiWebApp.BautagebuchMaterialienDetailsPage.header.delButton.id).show();
					}
					
                	if (myTyp == "<materialerfassung_only>") {
                		$('#' + DigiWebApp.BautagebuchMaterialienDetailsPage.content.auftragComboBox.id + "_container").show();
                    	$('#' + DigiWebApp.BautagebuchMaterialienDetailsPage.content.materialgruppeComboBox.id + "_container").show();
                	} else {
                		$('#' + DigiWebApp.BautagebuchMaterialienDetailsPage.content.auftragComboBox.id + "_container").hide();
                    	$('#' + DigiWebApp.BautagebuchMaterialienDetailsPage.content.materialgruppeComboBox.id + "_container").hide();
                	}

                	if (relevantDetailsController.get('handOrderId')) {
                		$('#' + DigiWebApp.BautagebuchMaterialienDetailsPage.content.positionComboBox.id + "_container").hide();
                	} else {
                		$('#' + DigiWebApp.BautagebuchMaterialienDetailsPage.content.positionComboBox.id + "_container").show();
                	}

                	$('#' + DigiWebApp.BautagebuchMaterialienDetailsPage.content.activityComboBox.id + "_container").hide();
                	$('#' + DigiWebApp.BautagebuchMaterialienDetailsPage.content.materialtypComboBox.id + "_container").hide();
                	$('#' + DigiWebApp.BautagebuchMaterialienDetailsPage.content.herstellerComboBox.id + "_container").hide();
                	$('#' + DigiWebApp.BautagebuchMaterialienDetailsPage.content.lieferantComboBox.id + "_container").hide();

            		try{
	                    // BugFix for broken number-inputType on Samsung (Android <= 4)
	                	var mengenInputTextField = $('#' + DigiWebApp.BautagebuchMaterialienDetailsPage.content.mengeGrid.mengenInput.id)[0];
                    	if (
                    		   (onAndroid && onSamsung && (onAndroid23 || onAndroid3 || onAndroid4))
                    		|| (parseBool(DigiWebApp.SettingsController.getSetting('mengeneingabeMitTelKeyboard')))
                    			
                    	) {
                    		mengenInputTextField.type = 'tel';
                    	}
            		}catch(e){}

                    DigiWebApp.ApplicationController.DigiLoaderView.hide();
    				
			}
        }
		, pageshow: {
			action: function() {
			}
		}
        , pagehide: {
            action: function() {

        	}
        }
    }

    , cssClass: 'bautagebuchMaterialienDetailsPage'

    , childViews: 'header content'

    , header: M.ToolbarView.design({
          childViews: 'backButton title uebersichtButton'
        , cssClass: 'header unselectable'
        , isFixed: YES
        , backButton: M.ButtonView.design({
              value: M.I18N.l('back')
            , icon: 'arrow-l'
            , anchorLocation: M.LEFT
            , events: {
                tap: {
                    //  target: DigiWebApp.NavigationController
                    //, action: 'backToBautagebuchMaterialienListePageTransition'
        			action: function() {try{DigiWebApp.ApplicationController.vibrate();}catch(e2){} 
        				history.back();
        			}
                }
            }
        })
        , title: M.LabelView.design({
              value: M.I18N.l('BautagebuchMaterial')
            , anchorLocation: M.CENTER
        })
        , delButton: M.ButtonView.design({
              value: M.I18N.l('BautagebuchDelete')
            , icon: 'delete'
            , anchorLocation: M.RIGHT
            , cssClass: 'red_background'
            , events: {
                tap: {
                      target: DigiWebApp.BautagebuchMaterialienDetailsController
                    , action: function() {try{DigiWebApp.ApplicationController.vibrate();}catch(e3){} 
                    	this.deleteMaterialbuchung();
                    }
                }
            }
        })
        , uebersichtButton: M.ButtonView.design({
              value: M.I18N.l('uebersicht')
            , icon: 'forward'
            , anchorLocation: M.RIGHT
            , events: {
                tap: {
                      target: DigiWebApp.BautagebuchMaterialienDetailsController
                    , action: function() {try{DigiWebApp.ApplicationController.vibrate();}catch(e3){} 
                    	//this.deleteMaterialbuchung();
                    	DigiWebApp.NavigationController.backToBautagebuchMaterialienListePageTransition();
                    }
                }
            }
        })
        , anchorLocation: M.TOP
    })

    , content: M.ScrollView.design({

    	  childViews: 'auftragComboBox positionComboBox activityComboBox materialtypComboBox materialgruppeComboBox herstellerComboBox lieferantComboBox materialComboBox materialInput spacer1 mengeGrid speichernButton loeschenButton'
        	  
        , cssClass: 'content'
    	
        , spacer1: M.LabelView.design({
            value: '&nbsp;<br>'
        })

        , spacer2: M.LabelView.design({
            value: '&nbsp;<br>'
        })

        , spacer3: M.LabelView.design({
            value: '&nbsp;<br>'
        })

        , auftragComboBox: M.SelectionListView.design({

                /* renders a selection view like check boxes */
                  selectionMode: M.SINGLE_SELECTION_DIALOG
                , initialText: M.I18N.l('noData')
                , label: M.I18N.l('order')
                , applyTheme: NO
                /* this seleciton view has no static entries, instead it is filled via content binding. */
                , contentBinding: {
                      target: DigiWebApp.BautagebuchMaterialienDetailsController
                    , property: 'auftraegeList'
                }
                , events: {
                    change: {
                    	/* executed in scope of DOMWindow because no target defined */
                    	action: function(selectedValue, selectedItem) {
                			var mySelection = M.ViewManager.getView('bautagebuchMaterialienDetailsPage', 'auftragComboBox').getSelection(YES);
                			if (mySelection.label == mySelection.value || isGUID(mySelection.value)) {
			      				DigiWebApp.BautagebuchMaterialienDetailsController.set("auftragId", null);
			      				DigiWebApp.BautagebuchMaterialienDetailsController.set("auftragName", null);
			      				DigiWebApp.BautagebuchMaterialienDetailsController.set("handOrderId", mySelection.value);
			      				DigiWebApp.BautagebuchMaterialienDetailsController.set("handOrderName", mySelection.label);
                        		$('#' + DigiWebApp.BautagebuchMaterialienDetailsPage.content.positionComboBox.id + "_container").hide();
                			} else {
    		      				DigiWebApp.BautagebuchMaterialienDetailsController.set("auftragId", mySelection.value);
    		      				DigiWebApp.BautagebuchMaterialienDetailsController.set("auftragName", mySelection.label);
			      				DigiWebApp.BautagebuchMaterialienDetailsController.set("handOrderId", null);
			      				DigiWebApp.BautagebuchMaterialienDetailsController.set("handOrderName", null);
                        		$('#' + DigiWebApp.BautagebuchMaterialienDetailsPage.content.positionComboBox.id + "_container").show();
                			}
		      				DigiWebApp.BautagebuchMaterialienDetailsController.setPositionen(M.ViewManager.getView('bautagebuchMaterialienDetailsPage', 'auftragComboBox').getSelection(YES).value);
                    	}
                	}
                }
        })
            	
        , positionComboBox: M.SelectionListView.design({

                /* renders a selection view like check boxes */
                  selectionMode: M.SINGLE_SELECTION_DIALOG
                , initialText: M.I18N.l('noData')
                , label: M.I18N.l('position')
                , applyTheme: NO
                /* this seleciton view has no static entries, instead it is filled via content binding. */
                , contentBinding: {
                      target: DigiWebApp.BautagebuchMaterialienDetailsController
                    , property: 'positionenList'
                }
                , events: {
                    change: {
                    	/* executed in scope of DOMWindow because no target defined */
                    	action: function(selectedValue, selectedItem) {
		      				DigiWebApp.BautagebuchMaterialienDetailsController.set("positionId", M.ViewManager.getView('bautagebuchMaterialienDetailsPage', 'positionComboBox').getSelection(YES).value);
		      				DigiWebApp.BautagebuchMaterialienDetailsController.set("positionName", M.ViewManager.getView('bautagebuchMaterialienDetailsPage', 'positionComboBox').getSelection(YES).label);
		      				DigiWebApp.BautagebuchMaterialienDetailsController.setTaetigkeiten(M.ViewManager.getView('bautagebuchMaterialienDetailsPage', 'positionComboBox').getSelection(YES).value);
                    	}
                	}
                }
        })
        
        , activityComboBox: M.SelectionListView.design({

                /* renders a selection view like check boxes */
                  selectionMode: M.SINGLE_SELECTION_DIALOG
                , initialText: M.I18N.l('noData')
                , label: M.I18N.l('activity')
                , applyTheme: NO
                /* this seleciton view has no static entries, instead it is filled via content binding. */
                , contentBinding: {
                      target: DigiWebApp.BautagebuchMaterialienDetailsController
                    , property: 'activityList'
                }
                , events: {
                    change: {
                    	/* executed in scope of DOMWindow because no target defined */
                    	action: function(selectedValue, selectedItem) {
		      				DigiWebApp.BautagebuchMaterialienDetailsController.set("activityId", M.ViewManager.getView('bautagebuchMaterialienDetailsPage', 'activityComboBox').getSelection(YES).value);
		      				DigiWebApp.BautagebuchMaterialienDetailsController.set("activityName", M.ViewManager.getView('bautagebuchMaterialienDetailsPage', 'activityComboBox').getSelection(YES).label);
                    	}
                	}
                }
        })
            	
        , materialtypComboBox: M.SelectionListView.design({

                /* renders a selection view like check boxes */
                  selectionMode: M.SINGLE_SELECTION_DIALOG
                , initialText: M.I18N.l('noData')
                , label: M.I18N.l('BautagebuchMaterialtyp')
                , applyTheme: NO
                /* this seleciton view has no static entries, instead it is filled via content binding. */
                , contentBinding: {
                      target: DigiWebApp.BautagebuchMaterialienDetailsController
                    , property: 'materialtypenList'
                }
                , events: {
                    change: {
                    	/* executed in scope of DOMWindow because no target defined */
                    	action: function(selectedValue, selectedItem) {
		      				DigiWebApp.BautagebuchMaterialienDetailsController.set("materialtypId", M.ViewManager.getView('bautagebuchMaterialienDetailsPage', 'materialtypComboBox').getSelection(YES).value);
		      				DigiWebApp.BautagebuchMaterialienDetailsController.set("materialtypBezeichnung", M.ViewManager.getView('bautagebuchMaterialienDetailsPage', 'materialtypComboBox').getSelection(YES).label);
		      				DigiWebApp.BautagebuchMaterialienDetailsController.setMaterialien();
                    	}
                	}
                }
        })

        , materialgruppeComboBox: M.SelectionListView.design({

                /* renders a selection view like check boxes */
                  selectionMode: M.SINGLE_SELECTION_DIALOG
                , initialText: M.I18N.l('noData')
                , label: M.I18N.l('BautagebuchMaterialgruppe')
                , applyTheme: NO
                /* this seleciton view has no static entries, instead it is filled via content binding. */
                , contentBinding: {
                      target: DigiWebApp.BautagebuchMaterialienDetailsController
                    , property: 'materialgruppenList'
                }
                , events: {
                    change: {
                    	/* executed in scope of DOMWindow because no target defined */
                    	action: function(selectedValue, selectedItem) {
		      				DigiWebApp.BautagebuchMaterialienDetailsController.set("materialgruppeId", M.ViewManager.getView('bautagebuchMaterialienDetailsPage', 'materialgruppeComboBox').getSelection(YES).value);
		      				DigiWebApp.BautagebuchMaterialienDetailsController.set("materialgruppeBezeichnung", M.ViewManager.getView('bautagebuchMaterialienDetailsPage', 'materialgruppeComboBox').getSelection(YES).label);
		      				DigiWebApp.BautagebuchMaterialienDetailsController.setMaterialien();
                    	}
                	}
                }
        })

        , herstellerComboBox: M.SelectionListView.design({

                /* renders a selection view like check boxes */
                  selectionMode: M.SINGLE_SELECTION_DIALOG
                , initialText: M.I18N.l('noData')
                , label: M.I18N.l('BautagebuchHersteller')
                , applyTheme: NO
                /* this seleciton view has no static entries, instead it is filled via content binding. */
                , contentBinding: {
                      target: DigiWebApp.BautagebuchMaterialienDetailsController
                    , property: 'herstellerList'
                }
                , events: {
                    change: {
                    	/* executed in scope of DOMWindow because no target defined */
                    	action: function(selectedValue, selectedItem) {
		      				DigiWebApp.BautagebuchMaterialienDetailsController.set("herstellerId", M.ViewManager.getView('bautagebuchMaterialienDetailsPage', 'herstellerComboBox').getSelection(YES).value);
		      				DigiWebApp.BautagebuchMaterialienDetailsController.set("herstellerBezeichnung", M.ViewManager.getView('bautagebuchMaterialienDetailsPage', 'herstellerComboBox').getSelection(YES).label);
		      				DigiWebApp.BautagebuchMaterialienDetailsController.setMaterialien();
                    	}
                	}
                }
        })

        , lieferantComboBox: M.SelectionListView.design({

                /* renders a selection view like check boxes */
                  selectionMode: M.SINGLE_SELECTION_DIALOG
                , initialText: M.I18N.l('noData')
                , label: M.I18N.l('BautagebuchLieferant')
                , applyTheme: NO
                /* this seleciton view has no static entries, instead it is filled via content binding. */
                , contentBinding: {
                      target: DigiWebApp.BautagebuchMaterialienDetailsController
                    , property: 'lieferantenList'
                }
                , events: {
                    change: {
                    	/* executed in scope of DOMWindow because no target defined */
                    	action: function(selectedValue, selectedItem) {
		      				DigiWebApp.BautagebuchMaterialienDetailsController.set("lieferantId", M.ViewManager.getView('bautagebuchMaterialienDetailsPage', 'lieferantComboBox').getSelection(YES).value);
		      				DigiWebApp.BautagebuchMaterialienDetailsController.set("lieferantBezeichnung", M.ViewManager.getView('bautagebuchMaterialienDetailsPage', 'lieferantComboBox').getSelection(YES).label);
		      				DigiWebApp.BautagebuchMaterialienDetailsController.setMaterialien();
                    	}
                	}
                }
        })
        
        , materialComboBox: M.SelectionListView.design({

                /* renders a selection view like check boxes */
                  selectionMode: M.SINGLE_SELECTION_DIALOG
                , initialText: M.I18N.l('noData')
                , label: M.I18N.l('BautagebuchMaterial')
                , applyTheme: NO
                /* this seleciton view has no static entries, instead it is filled via content binding. */
                , contentBinding: {
                      target: DigiWebApp.BautagebuchMaterialienDetailsController
                    , property: 'materialienList'
                }
                , events: {
                    change: {
                    	/* executed in scope of DOMWindow because no target defined */
                    	action: function(selectedValue, selectedItem) {
                			var relevantDetailsController = DigiWebApp.BautagebuchMaterialienDetailsController;
                			relevantDetailsController.set("materialId", M.ViewManager.getView('bautagebuchMaterialienDetailsPage', 'materialComboBox').getSelection(YES).value);
                			if (selectedValue === 0 || parseIntRadixTen(selectedValue) === 0) {
                				$('#' + DigiWebApp.BautagebuchMaterialienDetailsPage.content.materialInput.id).parent().show()
                			} else {
                				$('#' + DigiWebApp.BautagebuchMaterialienDetailsPage.content.materialInput.id).parent().hide()
    		      				relevantDetailsController.set("artikel", M.ViewManager.getView('bautagebuchMaterialienDetailsPage', 'materialComboBox').getSelection(YES).label);
                			}
                			relevantDetailsController.set('mengeneinheitId', null);
        					relevantDetailsController.setMengeneinheiten();
                    	}
                	}
                }
        })
            	
        , materialInput: M.TextFieldView.design({
        	   cssClass: 'materialInput'
	         , events: {
        		keyup: {
	                /* executed in scope of DOMWindow because no target defined */
	            	action: function(selectedValue, selectedItem) {
	        				DigiWebApp.BautagebuchMaterialienDetailsController.set("artikel", M.ViewManager.getView('bautagebuchMaterialienDetailsPage', 'materialInput').getValue());
	            	}
	            }
	    	}
        })

        , mengeGrid: M.GridView.design({
        	
	      	  childViews: 'mengenInput mengeneinheitComboBox'
	        , layout: M.TWO_COLUMNS
	        , label: M.I18N.l('BautagebuchMenge')
		    , mengeneinheitComboBox: M.SelectionListView.design({
		
		        /* renders a selection view like check boxes */
		          selectionMode: M.SINGLE_SELECTION_DIALOG
		        , initialText: M.I18N.l('noData')
		        //, label: M.I18N.l('BautagebuchMengeneinheit')
		        , applyTheme: NO
		        /* this seleciton view has no static entries, instead it is filled via content binding. */
		        , contentBinding: {
		              target: DigiWebApp.BautagebuchMaterialienDetailsController
		            , property: 'mengeneinheitenList'
		        }
		        , events: {
		                    change: {
		                        /* executed in scope of DOMWindow because no target defined */
				            	action: function(selectedValue, selectedItem) {
		        					DigiWebApp.BautagebuchMaterialienDetailsController.set("mengeneinheitId", M.ViewManager.getView('bautagebuchMaterialienDetailsPage', 'mengeneinheitComboBox').getSelection(YES).value);
		                			if (selectedValue === 0 || parseIntRadixTen(selectedValue) === 0) {
//		                				$('#' + DigiWebApp.BautagebuchMaterialienDetailsPage.content.mengeneinheitInput.id).show();
//			                			$('#' + DigiWebApp.BautagebuchMaterialienDetailsPage.content.mengeneinheitInput.id).parent().removeClass("transparent");
		                			} else {
//		                				$('#' + DigiWebApp.BautagebuchMaterialienDetailsPage.content.mengeneinheitInput.id).hide();
//			                			$('#' + DigiWebApp.BautagebuchMaterialienDetailsPage.content.mengeneinheitInput.id).parent().addClass("transparent");
		                				var mengeneinheitId = M.ViewManager.getView('bautagebuchMaterialienDetailsPage', 'mengeneinheitComboBox').getSelection(YES).value;
		                				var mengeneinheitKuerzel = DigiWebApp.BautagebuchMengeneinheit.findSorted(mengeneinheitId)[0].get("kuerzel");
		                				DigiWebApp.BautagebuchMaterialienDetailsController.set("einheit", mengeneinheitKuerzel);
					    			}
				            	}
		                    }
		        }
		    })
	
	        , mengeneinheitInput: M.TextFieldView.design({
		         events: {
	        		keyup: {
	                    /* executed in scope of DOMWindow because no target defined */
		            	action: function(selectedValue, selectedItem) {
	            				DigiWebApp.BautagebuchMaterialienDetailsController.set("einheit", M.ViewManager.getView('bautagebuchMaterialienDetailsPage', 'mengeneinheitInput').getValue());
		            	}
	                }
	        	}
	        })
	
	        , mengenInput: M.TextFieldView.design({
	        	  inputType: M.INPUT_NUMBER
	            //, label: M.I18N.l('BautagebuchMenge')
	        	, cssClass: 'mengeInput'
	        	, inputStep: 'any'
	        	, onlyPositiveValues: YES
		        , events: {
	        		keyup: {
	                    /* executed in scope of DOMWindow because no target defined */
		            	action: function(selectedValue, selectedItem) {
	            				DigiWebApp.BautagebuchMaterialienDetailsController.set("menge", M.ViewManager.getView('bautagebuchMaterialienDetailsPage', 'mengenInput').getValue());
		            	}
	                }
	        	}
	        })
        })

        , speichernButton: M.GridView.design({
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
		                target: DigiWebApp.BautagebuchMaterialienDetailsController,
		                action: function() {
            				try{DigiWebApp.ApplicationController.vibrate();}catch(e2){}
                			var relevantDetailsController = DigiWebApp.BautagebuchMaterialienDetailsController;
                			relevantDetailsController.set("materialId", M.ViewManager.getView('bautagebuchMaterialienDetailsPage', 'materialComboBox').getSelection(YES).value);
                			var selectedValue = M.ViewManager.getView('bautagebuchMaterialienDetailsPage', 'materialComboBox').getSelection(YES).value;
                			if (selectedValue == 0 || parseIntRadixTen(selectedValue) == 0) {
                				$('#' + DigiWebApp.BautagebuchMaterialienDetailsPage.content.materialInput.id).parent().show()
                			} else {
                				$('#' + DigiWebApp.BautagebuchMaterialienDetailsPage.content.materialInput.id).parent().hide()
    		      				relevantDetailsController.set("artikel", M.ViewManager.getView('bautagebuchMaterialienDetailsPage', 'materialComboBox').getSelection(YES).label);
                			}
            				//relevantDetailsController.set("einheit", M.ViewManager.getView('bautagebuchMaterialienDetailsPage', 'mengeneinheitInput').getValue());
                			relevantDetailsController.set("menge", M.ViewManager.getView('bautagebuchMaterialienDetailsPage', 'mengenInput').getValue());
            				this.save();
            			}
                    }
                }
            })
            , icon: M.ImageView.design({
                value: 'theme/images/icon_bookTime.png'
            })
        })
		
	    , loeschenButton: M.ButtonView.design({
		      value: M.I18N.l('BautagebuchDelete')
		    , cssClass: 'red_background'
		    , events: {
		        tap: {
		            target: DigiWebApp.BautagebuchMaterialienDetailsController,
		            action: function() {
        				try{DigiWebApp.ApplicationController.vibrate();}catch(e2){}
        				this.deleteMaterialbuchung();
	    			}
		        }
		      }
	    })

    })

});

