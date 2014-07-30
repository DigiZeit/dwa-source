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
					//alert("beforeshow");
					// verfügbare Positionen kopieren und ausgewählte selektieren
					var itemSelected = NO;
//					var myPositionenList = JSON.parse(JSON.stringify(DigiWebApp.BautagebuchBautageberichtDetailsController.positionenList));
//					_.each(myPositionenList, function(p) {
//						if (parseInt(p.value) !== 0) {
//							p.isSelected = NO;
//						} else {
//							p.isSelected = YES;
//						}
//					});
//				    var positionenArray = _.map(myPositionenList, function(o) {
//				    	if ( typeof(o) === "undefined" ) {
//				    		console.log("UNDEFINED position");
//				    	} else {    
//							if (DigiWebApp.BautagebuchMaterialienDetailsController.positionId) {
//								o.isSelected = (o.value === DigiWebApp.BautagebuchMaterialienDetailsController.positionId);
//								if (o.isSelected) { itemSelected = YES; }
//							}
//				            return o;
//				    	}
//				    });
//				    positionenArray = _.compact(positionenArray);
//				    if (positionenArray.length !== 1) {
//				    	positionenArray.push({label: M.I18N.l('selectSomething'), value: '0', isSelected: !itemSelected});
//				    } else {
//				    	DigiWebApp.BautagebuchMaterialienDetailsController.set("positionId", positionenArray[0].value);
//				    	DigiWebApp.BautagebuchMaterialienDetailsController.set("positionName", positionenArray[0].label);
//				    }
//				    if (positionenArray.length == 1) {
//				    	positionenArray[0].isSelected = YES;
//				    }
//					DigiWebApp.BautagebuchMaterialienDetailsController.set("positionenList", positionenArray);
//					
//					DigiWebApp.BautagebuchMaterialienDetailsController.setTaetigkeiten(DigiWebApp.BautagebuchMaterialienDetailsController.positionId);
					var relevantDetailsController = DigiWebApp.BautagebuchMaterialienDetailsController;

					var myAuftraegeList = JSON.parse(JSON.stringify(DigiWebApp.BautagebuchBautageberichtDetailsController.auftraegeList));
					_.each(myAuftraegeList, function(p) {
						if (parseInt(p.value) !== 0) {
							p.isSelected = NO;
						} else {
							p.isSelected = YES;
						}
					});
				    var auftraegeArray = _.map(myAuftraegeList, function(o) {
				    	if ( typeof(o) === "undefined" ) {
				    		console.log("UNDEFINED position");
				    	} else {    
							if (relevantDetailsController.auftragId) {
								o.isSelected = (o.value === relevantDetailsController.auftragId);
								if (o.isSelected) { itemSelected = YES; }
							}
				            return o;
				    	}
				    });
				    if (!itemSelected) {
				    	auftraegeArray = _.map(auftraegeArray, function(o) {
							if (DigiWebApp.BautagebuchBautageberichtDetailsController.auftragId) {
								o.isSelected = (o.value === DigiWebApp.BautagebuchBautageberichtDetailsController.auftragId);
								if (o.isSelected) { itemSelected = YES; 
									relevantDetailsController.set("auftragId", o.value);
									relevantDetailsController.set("auftragName", o.label);
								}
							}
				            return o;
					    });
				    }
				    auftraegeArray = _.compact(auftraegeArray);
				    if (auftraegeArray.length > 1 && !DigiWebApp.BookingController.currentBooking) {
				    	auftraegeArray.push({label: M.I18N.l('selectSomething'), value: '0', isSelected: !itemSelected});
				    }
				    relevantDetailsController.set("auftraegeList", auftraegeArray);

				    relevantDetailsController.setPositionen(relevantDetailsController.auftragId);

//					var myPositionenList = JSON.parse(JSON.stringify(DigiWebApp.BautagebuchBautageberichtDetailsController.positionenList));
//					_.each(myPositionenList, function(p) {
//						if (parseInt(p.value) !== 0) {
//							p.isSelected = NO;
//						} else {
//							p.isSelected = YES;
//						}
//					});
//				    var positionenArray = _.map(myPositionenList, function(o) {
//				    	if ( typeof(o) === "undefined" ) {
//				    		console.log("UNDEFINED position");
//				    	} else {    
//							if (relevantDetailsController.positionId) {
//								o.isSelected = (o.value === relevantDetailsController.positionId);
//								if (o.isSelected) { itemSelected = YES; }
//							}
//				            return o;
//				    	}
//				    });
//				    if (!itemSelected && DigiWebApp.BautagebuchEinstellungenController.settings.positionVorselektieren) {
//					    positionenArray = _.map(positionenArray, function(o) {
//							if (DigiWebApp.BautagebuchBautageberichtDetailsController.positionId) {
//								o.isSelected = (o.value === DigiWebApp.BautagebuchBautageberichtDetailsController.positionId);
//								if (o.isSelected) { itemSelected = YES; 
//									relevantDetailsController.set("positionId", o.value);
//									relevantDetailsController.set("positionName", o.label);
//								}
//							}
//				            return o;
//					    });
//				    }
//				    positionenArray = _.compact(positionenArray);
//				    if (positionenArray.length > 1) {
//				    	positionenArray.push({label: M.I18N.l('selectSomething'), value: '0', isSelected: !itemSelected});
//				    }
//				    if (!itemSelected && positionenArray.length == 1) {
//				    	positionenArray[0].isSelected = YES;
//				    	relevantDetailsController.set("positionId", positionenArray[0].value);
//				    	relevantDetailsController.set("positionName", positionenArray[0].label);
//				    }
//				    relevantDetailsController.set("positionenList", positionenArray);
					
				    relevantDetailsController.setTaetigkeiten(relevantDetailsController.positionId);

					// verfügbare Materialien kopieren und ausgewähltes selektieren
					var myMaterialienList = JSON.parse(JSON.stringify(DigiWebApp.BautagebuchMainController.materialien));
							
					_.each(myMaterialienList, function(m) {
						if (parseInt(m.value) !== 0) {
							m.isSelected = NO;
						} else {
							m.isSelected = YES;
						}
					});
		    		//console.log(DigiWebApp.BautagebuchMaterialienDetailsController.materialId);
				    var materialienArray = _.map(myMaterialienList, function(o) {
				    	if ( typeof(o) === "undefined" ) {
				    		console.log("UNDEFINED material");
				    	} else {
							if (DigiWebApp.BautagebuchMaterialienDetailsController.materialId && DigiWebApp.BautagebuchMaterialienDetailsController.materialId !== "0" && DigiWebApp.BautagebuchMaterialienDetailsController.materialId !== null && DigiWebApp.BautagebuchMaterialienDetailsController.materialId !== "") {
								o.isSelected = (o.value === DigiWebApp.BautagebuchMaterialienDetailsController.materialId);
	                			$('#' + DigiWebApp.BautagebuchMaterialienDetailsPage.content.materialInput.id).hide();
	                			$('#' + DigiWebApp.BautagebuchMaterialienDetailsPage.content.materialInput.id).parent().addClass("transparent");
							} else {
								$('#' + DigiWebApp.BautagebuchMaterialienDetailsPage.content.materialInput.id).show();
	                			$('#' + DigiWebApp.BautagebuchMaterialienDetailsPage.content.materialInput.id).parent().removeClass("transparent");
	                			M.ViewManager.getView('bautagebuchMaterialienDetailsPage', 'materialInput').setValue(DigiWebApp.BautagebuchMaterialienDetailsController.artikel);
							}
				            return o;
				    	}
				    });
				    materialienArray = _.compact(materialienArray);
					DigiWebApp.BautagebuchMaterialienDetailsController.set("materialienList", materialienArray);

					// verfügbare Mengeneinheiten kopieren und ausgewählte selektieren
					var myMengeneinheitenList = JSON.parse(JSON.stringify(DigiWebApp.BautagebuchMainController.mengeneinheiten));
					_.each(myMengeneinheitenList, function(m) {
						if (parseInt(m.value) !== 0) {
							m.isSelected = NO;
						} else {
							m.isSelected = YES;
						}
					});
				    var mengeneinheitenArray = _.map(myMengeneinheitenList, function(o) {
				    	if ( typeof(o) === "undefined" ) {
				    		console.log("UNDEFINED mengeneinheit");
				    	} else {    
							if (DigiWebApp.BautagebuchMaterialienDetailsController.mengeneinheitId && DigiWebApp.BautagebuchMaterialienDetailsController.mengeneinheitId !== "0" && DigiWebApp.BautagebuchMaterialienDetailsController.mengeneinheitId !== null) {
								o.isSelected = (o.value === DigiWebApp.BautagebuchMaterialienDetailsController.mengeneinheitId);				    			
//	                			$('#' + DigiWebApp.BautagebuchMaterialienDetailsPage.content.mengeneinheitInput.id).hide();
//	                			$('#' + DigiWebApp.BautagebuchMaterialienDetailsPage.content.mengeneinheitInput.id).parent().addClass("transparent");
//							} else {
//								$('#' + DigiWebApp.BautagebuchMaterialienDetailsPage.content.mengeneinheitInput.id).show();
//	                			$('#' + DigiWebApp.BautagebuchMaterialienDetailsPage.content.mengeneinheitInput.id).parent().removeClass("transparent");
//	                			M.ViewManager.getView('bautagebuchMaterialienDetailsPage', 'mengeneinheitInput').setValue(DigiWebApp.BautagebuchMaterialienDetailsController.einheit);
							}
				            return o;
				    	}
				    });
					mengeneinheitenArray = _.compact(mengeneinheitenArray);
					DigiWebApp.BautagebuchMaterialienDetailsController.set("mengeneinheitenList", mengeneinheitenArray);
					
					M.ViewManager.getView('bautagebuchMaterialienDetailsPage', 'mengenInput').setValue(DigiWebApp.BautagebuchMaterialienDetailsController.menge);
					
					if (DigiWebApp.BautagebuchBautageberichtDetailsController.item.get("abgeschlossen")) {
						$("#" + DigiWebApp.BautagebuchMaterialienDetailsPage.content.speichernButton.id).hide();
						$("#" + DigiWebApp.BautagebuchMaterialienDetailsPage.header.delButton.id).hide();
					} else {
						$("#" + DigiWebApp.BautagebuchMaterialienDetailsPage.content.speichernButton.id).show();
						$("#" + DigiWebApp.BautagebuchMaterialienDetailsPage.header.delButton.id).show();
					}
					
                	var myTyp = DigiWebApp.BautagebuchBautageberichtDetailsController.get("bautagesberichtTyp");
                	if (myTyp == "<materialerfassung_only>") {
                		$('#' + DigiWebApp.BautagebuchMaterialienDetailsPage.content.auftragComboBox.id + "_container").show();
                    	$('#' + DigiWebApp.BautagebuchMaterialienDetailsPage.content.materialgruppeComboBox.id + "_container").show();
                	} else {
                		$('#' + DigiWebApp.BautagebuchMaterialienDetailsPage.content.auftragComboBox.id + "_container").hide();
                    	$('#' + DigiWebApp.BautagebuchMaterialienDetailsPage.content.materialgruppeComboBox.id + "_container").hide();
                	}

                	$('#' + DigiWebApp.BautagebuchMaterialienDetailsPage.content.activityComboBox.id + "_container").hide();
                	$('#' + DigiWebApp.BautagebuchMaterialienDetailsPage.content.materialtypComboBox.id + "_container").hide();
                	$('#' + DigiWebApp.BautagebuchMaterialienDetailsPage.content.herstellerComboBox.id + "_container").hide();
                	$('#' + DigiWebApp.BautagebuchMaterialienDetailsPage.content.lieferantComboBox.id + "_container").hide();

      				DigiWebApp.BautagebuchMaterialienDetailsController.setMaterialien();

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
		      				DigiWebApp.BautagebuchMaterialienDetailsController.set("orderId", M.ViewManager.getView('bautagebuchMaterialienDetailsPage', 'auftragComboBox').getSelection(YES).value);
		      				DigiWebApp.BautagebuchMaterialienDetailsController.set("orderName", M.ViewManager.getView('bautagebuchMaterialienDetailsPage', 'auftragComboBox').getSelection(YES).label);
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
                    , property: 'materialtypList'
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
                    , property: 'materialgruppeList'
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
                    , property: 'lieferantList'
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
                			DigiWebApp.BautagebuchMaterialienDetailsController.set("materialId", M.ViewManager.getView('bautagebuchMaterialienDetailsPage', 'materialComboBox').getSelection(YES).value);
                			if (selectedValue === 0 || parseInt(selectedValue) === 0) {
                				$('#' + DigiWebApp.BautagebuchMaterialienDetailsPage.content.materialInput.id).parent().show()
                			} else {
                				$('#' + DigiWebApp.BautagebuchMaterialienDetailsPage.content.materialInput.id).parent().hide()
    		      				DigiWebApp.BautagebuchMaterialienDetailsController.set("artikel", M.ViewManager.getView('bautagebuchMaterialienDetailsPage', 'materialComboBox').getSelection(YES).label);
                			}
                    	}
                	}
                }
        })
            	
        , materialInput: M.TextFieldView.design({
	         events: {
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
		                			if (selectedValue === 0 || parseInt(selectedValue) === 0) {
		                				$('#' + DigiWebApp.BautagebuchMaterialienDetailsPage.content.mengeneinheitInput.id).show();
			                			$('#' + DigiWebApp.BautagebuchMaterialienDetailsPage.content.mengeneinheitInput.id).parent().removeClass("transparent");
		                			} else {
		                				$('#' + DigiWebApp.BautagebuchMaterialienDetailsPage.content.mengeneinheitInput.id).hide();
			                			$('#' + DigiWebApp.BautagebuchMaterialienDetailsPage.content.mengeneinheitInput.id).parent().addClass("transparent");
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
		    //, anchorLocation: M.CENTER
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

