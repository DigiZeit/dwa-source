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
					// verfügbare Positionen kopieren und ausgewählte selektieren
					var itemSelected = NO;
					var myPositionenList = JSON.parse(JSON.stringify(DigiWebApp.BautagebuchBautageberichtDetailsController.positionenList));
					_.each(myPositionenList, function(p) {
						if (parseInt(p.value) !== 0) {
							p.isSelected = NO;
						} else {
							p.isSelected = YES;
						}
					});
				    var positionenArray = _.map(myPositionenList, function(o) {
				    	if ( typeof(o) === "undefined" ) {
				    		console.log("UNDEFINED position");
				    	} else {    
							if (DigiWebApp.BautagebuchMaterialienDetailsController.positionId) {
								o.isSelected = (o.value === DigiWebApp.BautagebuchMaterialienDetailsController.positionId);
								if (o.isSelected) { itemSelected = YES }
							}
				            return o;
				    	}
				    });
				    positionenArray = _.compact(positionenArray);
				    if (positionenArray.length !== 1) {
				    	positionenArray.push({label: M.I18N.l('selectSomething'), value: '0', isSelected: !itemSelected});
				    } else {
				    	DigiWebApp.BautagebuchMaterialienDetailsController.set("positionId", positionenArray[0].value)
				    	DigiWebApp.BautagebuchMaterialienDetailsController.set("positionName", positionenArray[0].label)
				    }
					DigiWebApp.BautagebuchMaterialienDetailsController.set("positionenList", positionenArray)
					
					DigiWebApp.BautagebuchMaterialienDetailsController.setTaetigkeiten(DigiWebApp.BautagebuchMaterialienDetailsController.positionId);

					// verfügbare Materialien kopieren und ausgewähltes selektieren
					var myMaterialienList = JSON.parse(JSON.stringify(DigiWebApp.BautagebuchMainController.materialien))
					_.each(myMaterialienList, function(m) {
						if (parseInt(m.value) !== 0) {
							m.isSelected = NO;
						} else {
							m.isSelected = YES;
						}
					});
				    var materialienArray = _.map(myMaterialienList, function(o) {
				    	if ( typeof(o) === "undefined" ) {
				    		console.log("UNDEFINED material");
				    	} else {    
							if (DigiWebApp.BautagebuchMaterialienDetailsController.materialId && DigiWebApp.BautagebuchMaterialienDetailsController.materialId !== "0" && DigiWebApp.BautagebuchMaterialienDetailsController.materialId !== null && DigiWebApp.BautagebuchMaterialienDetailsController.materialId !== "") {
								o.isSelected = (o.value === DigiWebApp.BautagebuchMaterialienDetailsController.materialId);
	                			$('#' + DigiWebApp.BautagebuchMaterialienDetailsPage.content.materialInput.id).hide();
							} else {
								$('#' + DigiWebApp.BautagebuchMaterialienDetailsPage.content.materialInput.id).show();
	                			M.ViewManager.getView('bautagebuchMaterialienDetailsPage', 'materialInput').setValue(DigiWebApp.BautagebuchMaterialienDetailsController.artikel);
							}
				            return o;
				    	}
				    });
				    materialienArray = _.compact(materialienArray);
					DigiWebApp.BautagebuchMaterialienDetailsController.set("materialienList", materialienArray)

					// verfügbare Mengeneinheiten kopieren und ausgewählte selektieren
					var myMengeneinheitenList = JSON.parse(JSON.stringify(DigiWebApp.BautagebuchMainController.mengeneinheiten))
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
	                			$('#' + DigiWebApp.BautagebuchMaterialienDetailsPage.content.mengeneinheitInput.id).hide();
							} else {
								$('#' + DigiWebApp.BautagebuchMaterialienDetailsPage.content.mengeneinheitInput.id).show();
	                			M.ViewManager.getView('bautagebuchMaterialienDetailsPage', 'mengeneinheitInput').setValue(DigiWebApp.BautagebuchMaterialienDetailsController.einheit);
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
          childViews: 'backButton title delButton'
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
        			action: function() {try{navigator.notification.vibrate(DigiWebApp.ApplicationController.CONSTVibrateDuration);}catch(e){} history.back();}
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
            , events: {
                tap: {
                      target: DigiWebApp.BautagebuchMaterialienDetailsController
                    , action: function() {try{navigator.notification.vibrate(DigiWebApp.ApplicationController.CONSTVibrateDuration);}catch(e){} this.deleteMaterialbuchung();}
                }
            }
        })
        , anchorLocation: M.TOP
    })

    , content: M.ScrollView.design({

    	  childViews: 'positionComboBox activityComboBox materialComboBox materialInput spacer1 mengeneinheitComboBox mengeneinheitInput spacer2 mengenInput spacer3 speichernButton'
        	  
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
                			if (selectedValue === 0 || selectedValue === "0") {
                				$('#' + DigiWebApp.BautagebuchMaterialienDetailsPage.content.materialInput.id).show()
                			} else {
                				$('#' + DigiWebApp.BautagebuchMaterialienDetailsPage.content.materialInput.id).hide()
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

	    , mengeneinheitComboBox: M.SelectionListView.design({
	
	        /* renders a selection view like check boxes */
	          selectionMode: M.SINGLE_SELECTION_DIALOG
	        , initialText: M.I18N.l('noData')
	        , label: M.I18N.l('BautagebuchMengeneinheit')
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
				    			if (selectedValue === 0 || selectedValue === "0") {
	                				$('#' + DigiWebApp.BautagebuchMaterialienDetailsPage.content.mengeneinheitInput.id).show()
	                			} else {
	                				$('#' + DigiWebApp.BautagebuchMaterialienDetailsPage.content.mengeneinheitInput.id).hide()
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
	          label: M.I18N.l('BautagebuchMenge')
	        , events: {
        		keyup: {
                    /* executed in scope of DOMWindow because no target defined */
	            	action: function(selectedValue, selectedItem) {
            				DigiWebApp.BautagebuchMaterialienDetailsController.set("menge", M.ViewManager.getView('bautagebuchMaterialienDetailsPage', 'mengenInput').getValue());
	            	}
                }
        	}
        })

        , speichernButton: M.ButtonView.design({
	      value: M.I18N.l('save')
	    //, cssClass: 'digiButton'
	    //, anchorLocation: M.CENTER
	    , events: {
	        tap: {
	            target: DigiWebApp.BautagebuchMaterialienDetailsController,
	            action: 'save'
	        }
	      }
	    })

    })

});

