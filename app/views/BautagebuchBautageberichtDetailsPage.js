// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: DigiWebApp
// View: BautagebuchBautageberichtDetailsPage
// ==========================================================================

DigiWebApp.BautagebuchBautageberichtDetailsPage = M.PageView.design({

      events: {
		  pagebeforeshow: {
            action: function() {
					
					var datumArray = DigiWebApp.BautagebuchBautageberichtDetailsController.datum.split(".");
					DigiWebApp.BautagebuchBautageberichtDetailsController.set("datumAsDate", datumArray[2] + "-" + datumArray[1] + "-" + datumArray[0]);
					
					//alert("pagebeforeshow");
					// verfügbare Projektleiter kopieren und ausgewählten selektieren
		            var projektleiterArray = _.map(DigiWebApp.BautagebuchMainController.projektleiter, function(o) {
		            	if ( typeof(o) === "undefined" ) {
		            		console.log("UNDEFINED PROJEKTLEADER");
		            	} else {    
		    				if (DigiWebApp.BautagebuchBautageberichtDetailsController.projektleiterId) {
		    					o.isSelected = (o.value === DigiWebApp.BautagebuchBautageberichtDetailsController.projektleiterId);
		    				}
		                    return o;
		            	}
		            });
		            projektleiterArray = _.compact(projektleiterArray);
		            //console.log(projektleiterArray);
					DigiWebApp.BautagebuchBautageberichtDetailsController.set("projektleiterList", projektleiterArray);

					// verfügbare Aufträge kopieren und ausgewählten selektieren
		            var auftraegeArray = _.map(DigiWebApp.BautagebuchMainController.auftraege, function(o) {
		            	if ( typeof(o) === "undefined" ) {
		            		console.log("UNDEFINED ORDER");
		            	} else {    
		    				if (DigiWebApp.BautagebuchBautageberichtDetailsController.auftragsId) {
		    					o.isSelected = (o.value === DigiWebApp.BautagebuchBautageberichtDetailsController.auftragsId);
		    				}
		                    return o;
		            	}
		            });
					auftraegeArray = _.compact(auftraegeArray);
					DigiWebApp.BautagebuchBautageberichtDetailsController.set("auftraegeList", auftraegeArray);

					// verfügbare Mitarbeiter kopieren und ausgewählte selektieren
                    var mitarbeiterIds = DigiWebApp.BautagebuchBautageberichtDetailsController.mitarbeiterIds; 
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
					DigiWebApp.BautagebuchBautageberichtDetailsController.set("mitarbeiterList", mitarbeiterArray);
					
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
					DigiWebApp.BautagebuchBautageberichtDetailsController.set("mitarbeiterListSelected", mitarbeiterArraySelected);

					
			  		if (DigiWebApp.SettingsController.getSetting('bautagebuchLimit_autoStartUhrzeit')) {
						$(DigiWebApp.BautagebuchBautageberichtDetailsPage.content.startUhrzeit)[0].disable();
					} else {
						$(DigiWebApp.BautagebuchBautageberichtDetailsPage.content.startUhrzeit)[0].enable();
					}
			  		
			  		$('#' + DigiWebApp.BautagebuchBautageberichtDetailsPage.content.zeiten_material_ButtonGrid.zeitenButton.id).addClass("bigButton");
			  		$('#' + DigiWebApp.BautagebuchBautageberichtDetailsPage.content.zeiten_material_ButtonGrid.materialienButton.id).addClass("bigButton");
			  		$('#' + DigiWebApp.BautagebuchBautageberichtDetailsPage.content.notizen_medien_ButtonGrid.notizenButton.id).addClass("bigButton");
			  		$('#' + DigiWebApp.BautagebuchBautageberichtDetailsPage.content.notizen_medien_ButtonGrid.medienButton.id).addClass("bigButton");
			  		$('#' + DigiWebApp.BautagebuchBautageberichtDetailsPage.content.wetterButton.id).addClass("bigButton");
			  		
			}
        }
        , pagehide: {
            action: function() {

        	}
        }
    }

    , cssClass: 'bautagebuchBautageberichtDetailsPage'

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
                      target: DigiWebApp.NavigationController
                    , action: function() {try{DigiWebApp.ApplicationController.vibrate();}catch(e2){} this.backToBautagebuchBautageberichteListePageTransition();}
                }
            }
        })
        , title: M.TextFieldView.design({
              value: ''
            , anchorLocation: M.CENTER
            , cssClass: 'dateTitle'
            , inputType: M.INPUT_DATE
            , contentBinding: {
        		  target: DigiWebApp.BautagebuchBautageberichtDetailsController
        		, property: 'datumAsDate'
        	}
	        , contentBindingReverse: {
	    		  target: DigiWebApp.BautagebuchBautageberichtDetailsController
	    		, property: 'datumAsDate'
	    	}
            , events: {
            	  blur: {
            		action: function() {
		            	var datumArray = DigiWebApp.BautagebuchBautageberichtDetailsController.datumAsDate.split("-");
						DigiWebApp.BautagebuchBautageberichtDetailsController.set("datum", datumArray[2] + "." + datumArray[1] + "." + datumArray[0]);
            		}
            	}
	            , tap: {
	                action: function() {
            			try{DigiWebApp.ApplicationController.vibrate();}catch(e3){}
				  		if (DigiWebApp.SettingsController.getSetting('bautagebuchLimit_autoStartUhrzeit')) {
				  				$(DigiWebApp.BautagebuchBautageberichtDetailsPage.header.title).blur();
								return;
						}
/*			      		M.DatePickerView.show({
			    		      source: M.ViewManager.getView('bautagebuchBautageberichtDetailsPage', 'title')
			    		    , initialDate: D8.create(DigiWebApp.BautagebuchBautageberichtDetailsController.datum)
			    		    , showTimePicker: NO
			    		    , showDatePicker: YES
			    		    , dateOrder: 'ddMMyy'
		          		    , dateFormat: "dd.mm.yy"
		          		    , timeFormat: "HH:ii"
		          		    , minutesLabel: M.I18N.l('minute')
		          		    , hoursLabel: M.I18N.l('hour')
		          		    , dayLabel: M.I18N.l('day')
		          		    , monthLabel: M.I18N.l('month')
		          		    , yearLabel: M.I18N.l('year')
		          		    , dayNamesShort: DigiWebApp.ApplicationController.dayNamesShort
		          		    , dayNames: DigiWebApp.ApplicationController.dayNames
		          		    , monthNamesShort: DigiWebApp.ApplicationController.monthNamesShort
		          		    , monthNames: DigiWebApp.ApplicationController.monthNames
		          		    , callbacks: {
			      				confirm: {
			      					  target: this
			      					, action: function(value, date) {
			      						DigiWebApp.BautagebuchBautageberichtDetailsController.set("datum", value);
			      					}
			      				}
			      				, before: {
			      					action: function(value, date) {
			      					
			      					}
			      				}
			      				, cancel: {
			      					action: function() {
			      					
			      					}
			      				}
			      			}
			    		});*/
        			}
	            }
	        }
        })
        , delButton: M.ButtonView.design({
              value: M.I18N.l('BautagebuchDelete')
            , icon: 'delete'
            , anchorLocation: M.RIGHT
            , events: {
                tap: {
                      //target: DigiWebApp.BautagebuchBautageberichtDetailsController
                    //, action: 'delete'
        			action: function() {
        				try{DigiWebApp.ApplicationController.vibrate();}catch(e4){}
        				DigiWebApp.BautagebuchBautageberichtDetailsController.deleteBautagesbericht(DigiWebApp.NavigationController.backToBautagebuchBautageberichteListePageTransition);
        			}
                }
            }
        })
        , anchorLocation: M.TOP
    })

    , content: M.ScrollView.design({

    	  //childViews: 'projektleiterComboBox auftragComboBox mitarbeiterGroup startUhrzeit spacer2 zeitenButton materialienButton notizenButton medienButton wetterButton spacer1 grid'
    	  childViews: 'auftragComboBox projektleiterComboBox mitarbeiterGroup startUhrzeit spacer2 zeiten_material_ButtonGrid notizen_medien_ButtonGrid wetterButton spacer1 grid'
    		  
        , cssClass: 'content'
    	
        , spacer1: M.LabelView.design({
            value: '&nbsp;<br>'
        })

        , spacer2: M.LabelView.design({
            value: '&nbsp;<br>'
        })

        , startUhrzeit: M.TextFieldView.design({
	    	    label: M.I18N.l('BautagebuchStartUhrzeit')
	    	  , cssClass: 'startUhrzeit'
	    	  , inputType: M.INPUT_TIME
	    	  , contentBindingReverse: {
	                target: DigiWebApp.BautagebuchBautageberichtDetailsController
	              , property: 'startUhrzeit'
	          }
	          , contentBinding: {
	                target: DigiWebApp.BautagebuchBautageberichtDetailsController
	              , property: 'startUhrzeit'
	          }
	      	  , events: {
	      		  	tap: {
	          		  	action: function(id, event) {
				          		if (DigiWebApp.SettingsController.getSetting('bautagebuchLimit_autoStartUhrzeit')) {
					  				$(DigiWebApp.BautagebuchBautageberichtDetailsPage.content.startUhrzeit).blur();
				  					return;
					  			}
/*				          		$(DigiWebApp.BautagebuchBautageberichtDetailsPage.content.startUhrzeit).blur();
				          		M.DatePickerView.show({
				          		      source: M.ViewManager.getView('bautagebuchBautageberichtDetailsPage', 'startUhrzeit')
				          		    , initialDate: D8.create("01.01.1993 " + DigiWebApp.BautagebuchBautageberichtDetailsController.startUhrzeit)
				          		    , showTimePicker: YES
				          		    , showDatePicker: NO
				          		    , showAmPm: NO
					    		    , dateOrder: 'ddmmyy'
				          		    , dateFormat: "dd.mm.yy"
				          		    , timeFormat: "HH:ii"
				          		    , minutesLabel: M.I18N.l('minute')
				          		    , hoursLabel: M.I18N.l('hour')
				          		    , dayLabel: M.I18N.l('day')
				          		    , monthLabel: M.I18N.l('month')
				          		    , yearLabel: M.I18N.l('year')
				          		    , dayNamesShort: DigiWebApp.ApplicationController.dayNamesShort
				          		    , dayNames: DigiWebApp.ApplicationController.dayNames
				          		    , monthNamesShort: DigiWebApp.ApplicationController.monthNamesShort
				          		    , monthNames: DigiWebApp.ApplicationController.monthNames
				          		    , callbacks: {
						      				confirm: {
						      					  target: this
						      					, action: function(value, date) {
						      						DigiWebApp.BautagebuchBautageberichtDetailsController.set("startUhrzeit", value);
						      					}
						      				}
						      				, before: {
						      					action: function(value, date) {
						      					
						      					}
						      				}
						      				, cancel: {
						      					action: function() {
						      					
						      					}
						      				}
			      		  			}
			          		});*/
	      	  			}
	      	  		}
	      	 }
        })

        , startUhrzeitOld: M.GridView.design({
	            childViews: 'startUhrzeitLabel startUhrzeitInput'
	          , layout: M.TWO_COLUMNS
	          , startUhrzeitLabel: M.LabelView.design({
		    	    cssClass: 'whiteText'
	              , value: M.I18N.l('BautagebuchStartUhrzeit')
	          })
	          , startUhrzeitInput: M.TextFieldView.design({
	        	    contentBindingReverse: {
	                    target: DigiWebApp.BautagebuchBautageberichtDetailsController
	                  , property: 'startUhrzeit'
	              }
	              , contentBinding: {
	                    target: DigiWebApp.BautagebuchBautageberichtDetailsController
	                  , property: 'startUhrzeit'
	              }
	          	  , events: {
	          		  tap: {
		          		  	action: function(id, event) {
					          		if (DigiWebApp.SettingsController.getSetting('bautagebuchLimit_autoStartUhrzeit')) {
	          		  					return;
	          		  				}
	          		  				$(DigiWebApp.BautagebuchBautageberichtDetailsPage.content.startUhrzeit.startUhrzeitInput).blur();
					          		M.DatePickerView.show({
					          		      source: M.ViewManager.getView('bautagebuchBautageberichtDetailsPage', 'startUhrzeitInput')
					          		    , initialDate: D8.create("01.01.1993 " + DigiWebApp.BautagebuchBautageberichtDetailsController.startUhrzeit)
					          		    , showTimePicker: YES
					          		    , showDatePicker: NO
					          		    , showAmPm: NO
						    		    , dateOrder: 'ddmmyy'
					          		    , dateFormat: "dd.mm.yy"
					          		    , timeFormat: "HH:ii"
					          		    , minutesLabel: M.I18N.l('minute')
					          		    , hoursLabel: M.I18N.l('hour')
					          		    , dayLabel: M.I18N.l('day')
					          		    , monthLabel: M.I18N.l('month')
					          		    , yearLabel: M.I18N.l('year')
					          		    , dayNamesShort: DigiWebApp.ApplicationController.dayNamesShort
					          		    , dayNames: DigiWebApp.ApplicationController.dayNames
					          		    , monthNamesShort: DigiWebApp.ApplicationController.monthNamesShort
					          		    , monthNames: DigiWebApp.ApplicationController.monthNames
					          		    , callbacks: {
					      				confirm: {
					      					  target: this
					      					, action: function(value, date) {
					      						DigiWebApp.BautagebuchBautageberichtDetailsController.set("startUhrzeit", value);
					      					}
					      				}
					      				, before: {
					      					action: function(value, date) {
					      					
					      					}
					      				}
					      				, cancel: {
					      					action: function() {
					      					
					      					}
					      				}
					      			}
					          		});
	          		  		}
	          	  	  }
	          	  }
	          })
	    })

	    , projektleiterComboBox: M.SelectionListView.design({

            /* renders a selection view like check boxes */
              selectionMode: M.SINGLE_SELECTION_DIALOG

            , initialText: M.I18N.l('noData')
            
            , label: M.I18N.l('BautagebuchProjektleiter')

            , applyTheme: NO

            /* this seleciton view has no static entries, instead it is filled via content binding. */
            , contentBinding: {
                  target: DigiWebApp.BautagebuchBautageberichtDetailsController
                , property: 'projektleiterList'
            }

            , events: {
                  change: {
                      action: function(itemValues, items) {
            			DigiWebApp.BautagebuchBautageberichtDetailsController.set("projektleiterId", M.ViewManager.getView('bautagebuchBautageberichtDetailsPage', 'projektleiterComboBox').getSelection(YES).value);
                    }
                }
            }
        })
        	
        , auftragComboBox: M.SelectionListView.design({

            /* renders a selection view like check boxes */
              selectionMode: M.SINGLE_SELECTION_DIALOG

            , initialText: M.I18N.l('noData')
          
            , label: M.I18N.l('order')

            , applyTheme: NO

            /* this seleciton view has no static entries, instead it is filled via content binding. */
            , contentBinding: {
                  target: DigiWebApp.BautagebuchBautageberichtDetailsController
                , property: 'auftraegeList'
            }

	        , events: {
		            change: {
		                action: function(itemValues, items) {
		      				DigiWebApp.BautagebuchBautageberichtDetailsController.set("auftragsId", M.ViewManager.getView('bautagebuchBautageberichtDetailsPage', 'auftragComboBox').getSelection(YES).value);
		      				DigiWebApp.BautagebuchBautageberichtDetailsController.set("auftragsName", M.ViewManager.getView('bautagebuchBautageberichtDetailsPage', 'auftragComboBox').getSelection(YES).label);
		      				DigiWebApp.BautagebuchBautageberichtDetailsController.setPositionen(M.ViewManager.getView('bautagebuchBautageberichtDetailsPage', 'auftragComboBox').getSelection(YES).value);
		              }
		          }
		    }
        })
        	
        , mitarbeiterGroup: M.SelectionListView.design({

            /* renders a selection view like check boxes */
              selectionMode: M.MULTIPLE_SELECTION

            , initialText: M.I18N.l('noData')
            
            , label: M.I18N.l('employees')

            , applyTheme: NO

            /* this seleciton view has no static entries, instead it is filled via content binding. */
            , contentBinding: {
                  target: DigiWebApp.BautagebuchBautageberichtDetailsController
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
	                        DigiWebApp.BautagebuchBautageberichtDetailsController.set("mitarbeiterIds", mitarbeiterIds);
	                        
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
	    					DigiWebApp.BautagebuchBautageberichtDetailsController.set("mitarbeiterListSelected", mitarbeiterArray);
            		}
                }
            }
        })
        
        , zeiten_material_ButtonGrid: M.GridView.design({
        	  childViews: 'materialienButton zeitenButton'
            , layout: M.TWO_COLUMNS
      	    , materialienButton: M.ButtonView.design({
    	          value: M.I18N.l('BautagebuchMaterialien')
    	        //, cssClass: 'digiButton'
    	        //, anchorLocation: M.CENTER
    	        , events: {
    	            tap: {
    	                //target: DigiWebApp.NavigationController,
    	                //action: 'toBautagebuchMaterialienListePageTransition'
    		    			action: function() {
  							DigiWebApp.BautagebuchBautageberichtDetailsController.save(DigiWebApp.NavigationController.toBautagebuchMaterialienListePageTransition);
  						}
    	            }
    	          }
    	    })
    	
	  	    , zeitenButton: M.ButtonView.design({
	  	          value: M.I18N.l('BautagebuchZeiten')
	  	        //, cssClass: 'marginTop12'
	  	        //, anchorLocation: M.CENTER
	  	        , events: {
	  	            tap: {
	  	                //target: DigiWebApp.NavigationController,
	  	                //action: 'toBautagebuchZeitenListePageTransition'
	  	    			action: function() {
	  	    				DigiWebApp.BautagebuchBautageberichtDetailsController.save(DigiWebApp.NavigationController.toBautagebuchZeitenListePageTransition);
	  	    			}
	  	            }
	  	          }
	  	    })

        })
        
	    , materialienButton: M.ButtonView.design({
  	          value: M.I18N.l('BautagebuchMaterialien')
  	        //, cssClass: 'digiButton'
  	        //, anchorLocation: M.CENTER
  	        , events: {
  	            tap: {
  	                //target: DigiWebApp.NavigationController,
  	                //action: 'toBautagebuchMaterialienListePageTransition'
  		    			action: function() {
							DigiWebApp.BautagebuchBautageberichtDetailsController.save(DigiWebApp.NavigationController.toBautagebuchMaterialienListePageTransition);
						}
  	            }
  	          }
  	    })
  	
	    , zeitenButton: M.ButtonView.design({
	          value: M.I18N.l('BautagebuchZeiten')
	        //, cssClass: 'marginTop12'
	        //, anchorLocation: M.CENTER
	        , events: {
	            tap: {
	                //target: DigiWebApp.NavigationController,
	                //action: 'toBautagebuchZeitenListePageTransition'
	    			action: function() {
	    				DigiWebApp.BautagebuchBautageberichtDetailsController.save(DigiWebApp.NavigationController.toBautagebuchZeitenListePageTransition);
	    			}
	            }
	          }
	    })
	
        , notizen_medien_ButtonGrid: M.GridView.design({
        	  childViews: 'notizenButton medienButton'
            , layout: M.TWO_COLUMNS
    	    , notizenButton: M.ButtonView.design({
	  	          value: M.I18N.l('BautagebuchNotizen')
	  	        //, cssClass: 'digiButton'
	  	        //, anchorLocation: M.CENTER
	  	        , events: {
	  	            tap: {
	  	                //target: DigiWebApp.NavigationController,
	  	                //action: 'toBautagebuchNotizenListePageTransition'
	  	    			action: function() {
	  	    				DigiWebApp.BautagebuchBautageberichtDetailsController.save(DigiWebApp.NavigationController.toBautagebuchNotizenListePageTransition);
	  					}
	  	            }
	  	          }
	  	    })
	  	
	  	    , medienButton: M.ButtonView.design({
	  	          value: M.I18N.l('BautagebuchMedien')
	  	        //, cssClass: 'digiButton'
	  	        //, anchorLocation: M.CENTER
	  	        , events: {
	  	            tap: {
	  	                //target: DigiWebApp.NavigationController,
	  	                //action: 'toBautagebuchMedienListePageTransition'
	  		    			action: function() {
	  		    				DigiWebApp.BautagebuchBautageberichtDetailsController.save(DigiWebApp.NavigationController.toBautagebuchMedienListePageTransition);
	  						}
	  	            }
	  	          }
	  	    })
        })
        
	    , notizenButton: M.ButtonView.design({
	          value: M.I18N.l('BautagebuchNotizen')
	        //, cssClass: 'digiButton'
	        //, anchorLocation: M.CENTER
	        , events: {
	            tap: {
	                //target: DigiWebApp.NavigationController,
	                //action: 'toBautagebuchNotizenListePageTransition'
	    			action: function() {
	    				DigiWebApp.BautagebuchBautageberichtDetailsController.save(DigiWebApp.NavigationController.toBautagebuchNotizenListePageTransition);
					}
	            }
	          }
	    })
	
	    , medienButton: M.ButtonView.design({
	          value: M.I18N.l('BautagebuchMedien')
	        //, cssClass: 'digiButton'
	        //, anchorLocation: M.CENTER
	        , events: {
	            tap: {
	                //target: DigiWebApp.NavigationController,
	                //action: 'toBautagebuchMedienListePageTransition'
		    			action: function() {
		    				DigiWebApp.BautagebuchBautageberichtDetailsController.save(DigiWebApp.NavigationController.toBautagebuchMedienListePageTransition);
						}
	            }
	          }
	    })
	    
	    , wetterButton: M.ButtonView.design({
	          value: M.I18N.l('BautagebuchWetter')
	        //, cssClass: 'digiButton'
	        //, anchorLocation: M.CENTER
	        , events: {
	            tap: {
	                //target: DigiWebApp.NavigationController,
	                //action: 'toBautagebuchWetterPageTransition'
		    			action: function() {
		    				DigiWebApp.BautagebuchBautageberichtDetailsController.save(DigiWebApp.NavigationController.toBautagebuchWetterPageTransition);
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
                  value: M.I18N.l('BautagebuchSpeichernAbschliessen')
                , cssClass: 'digiButton'
                , anchorLocation: M.RIGHT
                , events: {
                    tap: {
		                //target: DigiWebApp.BautagebuchBautageberichtDetailsController,
		                //action: 'save'
		    			action: function() {
		    				//var that = this;
					    	M.DialogView.actionSheet({
						          title: M.I18N.l('BautagebuchSaveOrClose')
						        , cancelButtonValue: M.I18N.l('cancel')
						        , otherButtonValues: [M.I18N.l('save'), M.I18N.l('BautagebuchBautageberichtAbschliessen')]
						        , otherButtonTags: ["save","finish"]
						        , callbacks: {
					    			  other: {action: function(buttonTag) {
					    			    switch(buttonTag) {
						    		        case 'save':
						    		        	DigiWebApp.BautagebuchBautageberichtDetailsController.save(DigiWebApp.NavigationController.backToBautagebuchBautageberichteListePageTransition);
						    		            break;
						    		        case 'finish':
						    		        	DigiWebApp.BautagebuchBautageberichtDetailsController.finish();
						    		            break;
						    		        default:
						    		            console.log("unknonw ButtonTag");
						    		            break;
					    			    }
					    			}}
					    			, cancel: {action: function() {
					    				//console.log(M.I18N.l('cancel'));
					    			}}
					    		}
						    });
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

