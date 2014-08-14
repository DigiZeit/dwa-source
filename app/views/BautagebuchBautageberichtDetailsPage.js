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

					if (DigiWebApp.BautagebuchBautageberichtDetailsController.datum) {
						var datumArray = DigiWebApp.BautagebuchBautageberichtDetailsController.datum.split(".");
						DigiWebApp.BautagebuchBautageberichtDetailsController.set("datumAsDate", datumArray[2] + "-" + datumArray[1] + "-" + datumArray[0]);
					}

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

					// verfügbare Positionen kopieren und ausgewählten selektieren
					if (DigiWebApp.BautagebuchBautageberichtDetailsController.auftragsId) {
						DigiWebApp.BautagebuchBautageberichtDetailsController.setPositionen(DigiWebApp.BautagebuchBautageberichtDetailsController.auftragsId);
    				} else {
			            var positionenArray = _.map(DigiWebApp.BautagebuchMainController.positionen, function(o) {
			            	if ( typeof(o) === "undefined" ) {
			            		console.log("UNDEFINED POSITION");
			            	} else {    
//			    				if (DigiWebApp.BautagebuchBautageberichtDetailsController.positionId) {
//			    					o.isSelected = (o.value === DigiWebApp.BautagebuchBautageberichtDetailsController.positionId);
//			    				}
			                    return o;
			            	}
			            });
			            positionenArray = _.compact(positionenArray);
						DigiWebApp.BautagebuchBautageberichtDetailsController.set("positionenList", positionenArray);
    				}

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
			  		
			  		$('#' + DigiWebApp.BautagebuchBautageberichtDetailsPage.content.mitarbeiter_zeiten_ButtonGrid.mitarbeiterButton.id).addClass("bigButton");
			  		$('#' + DigiWebApp.BautagebuchBautageberichtDetailsPage.content.mitarbeiter_zeiten_ButtonGrid.zeitenButton.id).addClass("bigButton");
			  		$('#' + DigiWebApp.BautagebuchBautageberichtDetailsPage.content.material_wetter_ButtonGrid.materialienButton.id).addClass("bigButton");
			  		$('#' + DigiWebApp.BautagebuchBautageberichtDetailsPage.content.material_wetter_ButtonGrid.wetterButton.id).addClass("bigButton");
			  		$('#' + DigiWebApp.BautagebuchBautageberichtDetailsPage.content.medien_notizen_ButtonGrid.medienButton.id).addClass("bigButton");
			  		$('#' + DigiWebApp.BautagebuchBautageberichtDetailsPage.content.medien_notizen_ButtonGrid.notizenButton.id).addClass("bigButton");
			  		
			  		// Positionen-ComboBox ausblenden, falls DigiWebApp.BautagebuchEinstellungenController.settings.positionVorselektieren != true
			  		if (DigiWebApp.BautagebuchEinstellungenController.settings.positionVorselektieren) {
			  			$('#' + DigiWebApp.BautagebuchBautageberichtDetailsPage.content.positionComboBox.id).parent().parent().parent().show();
			  		} else {
			  			$('#' + DigiWebApp.BautagebuchBautageberichtDetailsPage.content.positionComboBox.id).parent().parent().parent().hide();
			  		}
			  		
			  		DigiWebApp.BautagebuchBautageberichtDetailsController.setStartUhrzeit();
			  		
	            	if (DigiWebApp.BautagebuchBautageberichtDetailsController.get('handOrderId')) {
	            		$('#' + DigiWebApp.BautagebuchBautageberichtDetailsPage.content.positionComboBox.id + "_container").hide();
//	            	} else {
//	            		$('#' + DigiWebApp.BautagebuchBautageberichtDetailsPage.content.positionComboBox.id + "_container").show();
	            	}

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
          childViews: 'backButton title uebersichtButton'
        , cssClass: 'header unselectable'
        , isFixed: YES
        , backButton: M.ButtonView.design({
              value: M.I18N.l('back')
            , icon: 'arrow-l'
            , anchorLocation: M.LEFT
            , events: {
                tap: {
                      target: DigiWebApp.NavigationController
                    , action: function() {try{DigiWebApp.ApplicationController.vibrate();}catch(e2){} 
                    	this.backToBautagebuchBautageberichteListePageTransition();
                    	//history.back();
                    }
                }
            }
        })
//        , title: M.TextFieldView.design({
//              value: ''
//            , anchorLocation: M.CENTER
//            , cssClass: 'dateTitle'
//            , inputType: M.INPUT_DATE
//            , contentBinding: {
//        		  target: DigiWebApp.BautagebuchBautageberichtDetailsController
//        		, property: 'datumAsDate'
//        	}
//	        , contentBindingReverse: {
//	    		  target: DigiWebApp.BautagebuchBautageberichtDetailsController
//	    		, property: 'datumAsDate'
//	    	}
//            , events: {
//            	  blur: {
//            		action: function() {
//            			if (DigiWebApp.BautagebuchBautageberichtDetailsController.datumAsDate) {
//            				var datumArray = DigiWebApp.BautagebuchBautageberichtDetailsController.datumAsDate.split("-");
//            				DigiWebApp.BautagebuchBautageberichtDetailsController.set("datum", datumArray[2] + "." + datumArray[1] + "." + datumArray[0]);
//            			}
//            		}
//            	}
//	            , tap: {
//	                action: function() {
//            			try{DigiWebApp.ApplicationController.vibrate();}catch(e3){}
//				  		if (DigiWebApp.SettingsController.getSetting('bautagebuchLimit_autoStartUhrzeit')) {
//				  				$(DigiWebApp.BautagebuchBautageberichtDetailsPage.header.title).blur();
//								return;
//						}
//        			}
//	            }
//	        }
//        })
        , title: M.LabelView.design({
              value: ''
            , anchorLocation: M.CENTER
            , contentBinding: {
        		  target: DigiWebApp.BautagebuchBautageberichtDetailsController
        		, property: 'datum'
        	}
            , events: {
	            tap: {
	                action: function() {
            			try{DigiWebApp.ApplicationController.vibrate();}catch(e3){}
				  		if (DigiWebApp.SettingsController.getSetting('bautagebuchLimit_autoStartUhrzeit')) {
								return;
						}
			      		M.DatePickerView.show({
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
			    		});
        			}
	            }
	        }
        })
        , delButton: M.ButtonView.design({
              value: M.I18N.l('BautagebuchDelete')
            , icon: 'delete'
            , anchorLocation: M.RIGHT
            , cssClass: 'red_background'
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
        , uebersichtButton: M.ButtonView.design({
              value: M.I18N.l('uebersicht')
            , icon: 'forward'
            , anchorLocation: M.RIGHT
            , events: {
                tap: {
                      //target: DigiWebApp.BautagebuchBautageberichtDetailsController
                    //, action: 'delete'
        			action: function() {
        				try{DigiWebApp.ApplicationController.vibrate();}catch(e4){}
        				DigiWebApp.NavigationController.backToBautagebuchBautageberichteListePageTransition();
        			}
                }
            }
        })
       , anchorLocation: M.TOP
    })

    , content: M.ScrollView.design({

    	  //childViews: 'projektleiterComboBox auftragComboBox mitarbeiterGroup startUhrzeit spacer2 zeitenButton materialienButton notizenButton medienButton wetterButton spacer1 grid'
    	  childViews: 'auftragComboBox positionComboBox projektleiterComboBox startUhrzeitContainer spacer2 spacer3 mitarbeiter_zeiten_ButtonGrid material_wetter_ButtonGrid medien_notizen_ButtonGrid spacer1 grid loeschenButton'
    		  
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
        
        , startUhrzeitContainer: M.ContainerView.design({
    	      label: M.I18N.l('BautagebuchStartUhrzeit')
			, childViews: 'plusGrid startUhrzeitGrid minusGrid' 
			, plusGrid: M.GridView.design({
					  childViews: 'stundePlusButton trennText minutePlusButton'
					, layout: {
				          cssClass: 'timecontainer'
				        , columns: {
				              0: 'column1'
				            , 1: 'column2'
				            , 2: 'column3'
				        }
				    }
					, stundePlusButton: M.ButtonView.design({
		    	          value: "+"
		    	        , cssClass: 'plusMinusButton'
		    	        , events: {
		    	            tap: {
	    		    			action: function() {
							  		if (DigiWebApp.SettingsController.getSetting('bautagebuchLimit_autoStartUhrzeit')) {
											return;
									}
									var myStunde = parseInt($('#'+DigiWebApp.BautagebuchBautageberichtDetailsPage.content.startUhrzeitContainer.startUhrzeitGrid.stundeFeld.id)[0].value);
									var myMinute = parseInt($('#'+DigiWebApp.BautagebuchBautageberichtDetailsPage.content.startUhrzeitContainer.startUhrzeitGrid.minuteFeld.id)[0].value);
									myStunde = (myStunde + 1) % 24;
									var startUhrzeitStr = myStunde.padLeft(2,"0") + ":"+ myMinute.padLeft(2,"0");
									DigiWebApp.BautagebuchBautageberichtDetailsController.set('startUhrzeit', startUhrzeitStr);
									DigiWebApp.BautagebuchBautageberichtDetailsController.setStartUhrzeit();
								}
		    	            }
		    	          }
		    	    })
		    	    , trennText: M.LabelView.design({
		    	    	value: "&nbsp;"
		    	    })
					, minutePlusButton: M.ButtonView.design({
		    	          value: "+"
		    	        , cssClass: 'plusMinusButton'
		    	        , events: {
		    	            tap: {
	    		    			action: function() {
							  		if (DigiWebApp.SettingsController.getSetting('bautagebuchLimit_autoStartUhrzeit')) {
											return;
									}
									var myStunde = parseInt($('#'+DigiWebApp.BautagebuchBautageberichtDetailsPage.content.startUhrzeitContainer.startUhrzeitGrid.stundeFeld.id)[0].value);
									var myMinute = parseInt($('#'+DigiWebApp.BautagebuchBautageberichtDetailsPage.content.startUhrzeitContainer.startUhrzeitGrid.minuteFeld.id)[0].value);
									var minuteSteps = 1;
									if (DigiWebApp.BautagebuchEinstellungenController.settings.in15MinutenSchritten) {
										minuteSteps = 15;
									}
									if ((myMinute + minuteSteps) > 59) {
										myStunde = (myStunde + 1) % 24;										
									}
									myMinute = (myMinute + minuteSteps) % 60;
									var startUhrzeitStr = myStunde.padLeft(2,"0") + ":"+ myMinute.padLeft(2,"0");
									DigiWebApp.BautagebuchBautageberichtDetailsController.set('startUhrzeit', startUhrzeitStr);
									DigiWebApp.BautagebuchBautageberichtDetailsController.setStartUhrzeit();
		  						}
		    	            }
		    	          }
		    	    })
			})
			, startUhrzeitGrid: M.GridView.design({
				  childViews: 'stundeFeld trennText minuteFeld'
				, layout: {
			          cssClass: 'timecontainer'
			        , columns: {
			              0: 'column1'
			            , 1: 'column2'
			            , 2: 'column3'
			        }
			    }
				, stundeFeld: M.TextFieldView.design({
					cssClass: 'startUhrzeit'
		    	  , inputType: M.INPUT_TEXT
		        })
		        , trennText: M.LabelView.design({
		    	    	value: ":"
		    	})
				, minuteFeld: M.TextFieldView.design({
					cssClass: 'startUhrzeit'
		    	  , inputType: M.INPUT_TEXT
		        })
			})
			, minusGrid: M.GridView.design({
				  childViews: 'stundeMinusButton trennText minuteMinusButton'
				, layout: {
			          cssClass: 'timecontainer'
			        , columns: {
			              0: 'column1'
			            , 1: 'column2'
			            , 2: 'column3'
			        }
			    }
				, stundeMinusButton: M.ButtonView.design({
	    	          value: "-"
	    	        , cssClass: 'plusMinusButton'
	    	        , events: {
	    	            tap: {
  		    				action: function() {
						  		if (DigiWebApp.SettingsController.getSetting('bautagebuchLimit_autoStartUhrzeit')) {
										return;
								}
								var myStunde = parseInt($('#'+DigiWebApp.BautagebuchBautageberichtDetailsPage.content.startUhrzeitContainer.startUhrzeitGrid.stundeFeld.id)[0].value);
								var myMinute = parseInt($('#'+DigiWebApp.BautagebuchBautageberichtDetailsPage.content.startUhrzeitContainer.startUhrzeitGrid.minuteFeld.id)[0].value);
								myStunde = myStunde - 1;
								if (myStunde < 0) {
									myStunde = 23;
								}
								var startUhrzeitStr = myStunde.padLeft(2,"0") + ":"+ myMinute.padLeft(2,"0");
								DigiWebApp.BautagebuchBautageberichtDetailsController.set('startUhrzeit', startUhrzeitStr);
								DigiWebApp.BautagebuchBautageberichtDetailsController.setStartUhrzeit();
	  						}
	    	            }
	    	          }
	    	    })
	    	    , trennText: M.LabelView.design({
	    	    	value: "&nbsp;"
	    	    })
	    	    , minuteMinusButton: M.ButtonView.design({
	    	          value: "-"
	    	        , cssClass: 'plusMinusButton'
	    	        , events: {
	    	            tap: {
  		    				action: function() {
						  		if (DigiWebApp.SettingsController.getSetting('bautagebuchLimit_autoStartUhrzeit')) {
										return;
								}
								var myStunde = parseInt($('#'+DigiWebApp.BautagebuchBautageberichtDetailsPage.content.startUhrzeitContainer.startUhrzeitGrid.stundeFeld.id)[0].value);
								var myMinute = parseInt($('#'+DigiWebApp.BautagebuchBautageberichtDetailsPage.content.startUhrzeitContainer.startUhrzeitGrid.minuteFeld.id)[0].value);
								var minuteSteps = 1;
								if (DigiWebApp.BautagebuchEinstellungenController.settings.in15MinutenSchritten) {
									minuteSteps = 15;
								}
								if ((myMinute - minuteSteps) < 0) {
									myStunde = myStunde - 1;
									if (myStunde < 0) {
										myStunde = 23;
									}
									myMinute = 60;
								}
								myMinute = (myMinute - minuteSteps) % 60;
								if (myMinute < 0) {
									myMinute = 60 - minuteSteps;
								}
								var startUhrzeitStr = myStunde.padLeft(2,"0") + ":"+ myMinute.padLeft(2,"0");
								DigiWebApp.BautagebuchBautageberichtDetailsController.set('startUhrzeit', startUhrzeitStr);
								DigiWebApp.BautagebuchBautageberichtDetailsController.setStartUhrzeit();
	  						}
	    	            }
	    	          }
	    	    })
			})
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
				  					return;
					  			}
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
	        				var mySelection = M.ViewManager.getView('bautagebuchBautageberichtDetailsPage', 'auftragComboBox').getSelection(YES);
	        				if (mySelection.label == mySelection.value || isGUID(mySelection.value)) {
			      				DigiWebApp.BautagebuchBautageberichtDetailsController.set("handOrderId", mySelection.value);
			      				DigiWebApp.BautagebuchBautageberichtDetailsController.set("handOrderName", mySelection.label);
			            		$('#' + DigiWebApp.BautagebuchBautageberichtDetailsPage.content.positionComboBox.id + "_container").hide();
	        				} else {
			      				DigiWebApp.BautagebuchBautageberichtDetailsController.set("handOrderId", null);
			      				DigiWebApp.BautagebuchBautageberichtDetailsController.set("handOrderName", null);
			            		$('#' + DigiWebApp.BautagebuchBautageberichtDetailsPage.content.positionComboBox.id + "_container").show();
	        				}
		      				DigiWebApp.BautagebuchBautageberichtDetailsController.set("auftragsId", mySelection.value);
		      				DigiWebApp.BautagebuchBautageberichtDetailsController.set("auftragsName", mySelection.label);
		      				DigiWebApp.BautagebuchBautageberichtDetailsController.setPositionen(M.ViewManager.getView('bautagebuchBautageberichtDetailsPage', 'auftragComboBox').getSelection(YES).value);
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
                  target: DigiWebApp.BautagebuchBautageberichtDetailsController
                , property: 'positionenList'
            }

	        , events: {
		            change: {
		                action: function(itemValues, items) {
			  				DigiWebApp.BautagebuchBautageberichtDetailsController.set("positionId", M.ViewManager.getView('bautagebuchBautageberichtDetailsPage', 'positionComboBox').getSelection(YES).value);
			  				DigiWebApp.BautagebuchBautageberichtDetailsController.set("positionName", M.ViewManager.getView('bautagebuchBautageberichtDetailsPage', 'positionComboBox').getSelection(YES).label);
		              }
		          }
		    }
        })
        
        , mitarbeiter_zeiten_ButtonGrid: M.GridView.design({
        	
        	  childViews: 'mitarbeiterButton zeitenButton'
        		  
            , layout: M.TWO_COLUMNS
      	    , mitarbeiterButton: M.GridView.design({
	            childViews: 'buttongrid'
	                , layout: M.TWO_COLUMNS
	                , buttongrid: M.GridView.design({
	      	            childViews: 'button icon'
	      	          , layout: {
	      	                cssClass: 'bautagebuchButton'
	      	              , columns: {
	      	                    0: 'button'
	      	                  , 1: 'icon'
	      	              }
	      	          }
	      	          , button: M.ButtonView.design({
	      	                value: M.I18N.l('employees')
	      	              , cssClass: 'bautagebuchButton'
	      	              , anchorLocation: M.RIGHT
	      	              , events: {
	      	                  tap: {
	      			    			action: function() {
	      	        	  				try{DigiWebApp.ApplicationController.vibrate();}catch(e2){}
	      	        	  				//DigiWebApp.BautagebuchBautageberichtDetailsController.save(DigiWebApp.NavigationController.toBautagebuchMitarbeiterAuswahlPage);
	      	        	  				DigiWebApp.NavigationController.toBautagebuchMitarbeiterAuswahlPage();
	      				    		}
	      	                  }
	      	              }
	      	          })
	      	          , icon: M.ImageView.design({
	      	              value: 'theme/images/48x48_plain_businessmen.png'
	      	          })
	      	      }) 
	        }) 
    	
	  	    , zeitenButton: M.GridView.design({
	            childViews: 'buttongrid'
	                , layout: M.TWO_COLUMNS
	                , buttongrid: M.GridView.design({
	      	            childViews: 'button icon'
	      	          , layout: {
	      	                cssClass: 'bautagebuchButton'
	      	              , columns: {
	      	                    0: 'button'
	      	                  , 1: 'icon'
	      	              }
	      	          }
	      	          , button: M.ButtonView.design({
	      	                value: M.I18N.l('BautagebuchZeiten')
	      	              , cssClass: 'bautagebuchButton'
	      	              , anchorLocation: M.RIGHT
	      	              , events: {
	      	                  tap: {
	      			    			action: function() {
	      	        	  				try{DigiWebApp.ApplicationController.vibrate();}catch(e2){}
	      	        	  				if (DigiWebApp.BautagebuchZeitbuchung.findSorted(DigiWebApp.BautagebuchBautageberichtDetailsController.item.get('id')).length > 0) {
	      	        	  					DigiWebApp.BautagebuchBautageberichtDetailsController.save(DigiWebApp.NavigationController.toBautagebuchZeitenListePageTransition);
	      	        	  				} else {
	      	        	  					DigiWebApp.BautagebuchBautageberichtDetailsController.save(DigiWebApp.BautagebuchZeitenListeController.neu);
	      	        	  				}
	      				    		}
	      	                  }
	      	              }
	      	          })
	      	          , icon: M.ImageView.design({
	      	              value: 'theme/images/48x48_plain_note_view.png'
	      	          })
	      	      }) 
	        }) 

        })
        	
        , medien_notizen_ButtonGrid: M.GridView.design({
        	  childViews: 'medienButton notizenButton'
            , layout: M.TWO_COLUMNS
    	    , notizenButton: M.GridView.design({
	            childViews: 'buttongrid'
	                , layout: M.TWO_COLUMNS
	                , buttongrid: M.GridView.design({
	      	            childViews: 'button icon'
	      	          , layout: {
	      	                cssClass: 'bautagebuchButton'
	      	              , columns: {
	      	                    0: 'button'
	      	                  , 1: 'icon'
	      	              }
	      	          }
	      	          , button: M.ButtonView.design({
	      	                value: M.I18N.l('BautagebuchNotizen')
	      	              , cssClass: 'bautagebuchButton'
	      	              , anchorLocation: M.RIGHT
	      	              , events: {
	      	                  tap: {
	      			    			action: function() {
	      	        	  				try{DigiWebApp.ApplicationController.vibrate();}catch(e2){}
	      	        	  				//DigiWebApp.BautagebuchBautageberichtDetailsController.save(DigiWebApp.NavigationController.toBautagebuchNotizenListePageTransition);
	      	        	  				DigiWebApp.BautagebuchNotizenListeController.init();
	      	        	  				DigiWebApp.BautagebuchBautageberichtDetailsController.save(DigiWebApp.BautagebuchNotizenListeController.neu);
	      				    		}
	      	                  }
	      	              }
	      	          })
	      	          , icon: M.ImageView.design({
	      	              value: 'theme/images/48x48_plain_clipboard.png'
	      	          })
	      	      }) 
	        }) 
	  	
	  	    , medienButton: M.GridView.design({
		            childViews: 'buttongrid'
		                , layout: M.TWO_COLUMNS
		                , buttongrid: M.GridView.design({
		      	            childViews: 'button icon'
		      	          , layout: {
		      	                cssClass: 'bautagebuchButton'
		      	              , columns: {
		      	                    0: 'button'
		      	                  , 1: 'icon'
		      	              }
		      	          }
		      	          , button: M.ButtonView.design({
		      	                value: M.I18N.l('BautagebuchMedien')
		      	              , cssClass: 'bautagebuchButton'
		      	              , anchorLocation: M.RIGHT
		      	              , events: {
		      	                  tap: {
		      			    			action: function() {
		      	        	  				try{DigiWebApp.ApplicationController.vibrate();}catch(e2){}
		      	        	  				//DigiWebApp.BautagebuchBautageberichtDetailsController.save(DigiWebApp.NavigationController.toBautagebuchMedienListePageTransition);
		      	        	  				DigiWebApp.BautagebuchMedienListeController.init();
		      	        	  				DigiWebApp.BautagebuchBautageberichtDetailsController.save(DigiWebApp.BautagebuchMedienListeController.neu);
		      				    		}
		      	                  }
		      	              }
		      	          })
		      	          , icon: M.ImageView.design({
		      	              value: 'theme/images/48x48_plain_camera2.png'
		      	          })
		      	      }) 
		        })
        })

        , material_wetter_ButtonGrid: M.GridView.design({
        	  childViews: 'materialienButton wetterButton'
            , layout: M.TWO_COLUMNS
      	    , materialienButton: M.GridView.design({
	            childViews: 'buttongrid'
	                , layout: M.TWO_COLUMNS
	                , buttongrid: M.GridView.design({
	      	            childViews: 'button icon'
	      	          , layout: {
	      	                cssClass: 'bautagebuchButton'
	      	              , columns: {
	      	                    0: 'button'
	      	                  , 1: 'icon'
	      	              }
	      	          }
	      	          , button: M.ButtonView.design({
	      	                value: M.I18N.l('BautagebuchMaterialien')
	      	              , cssClass: 'bautagebuchButton'
	      	              , anchorLocation: M.RIGHT
	      	              , events: {
	      	                  tap: {
	      			    			action: function() {
      	        	  					try{DigiWebApp.ApplicationController.vibrate();}catch(e2){}
	      	        	  				//DigiWebApp.BautagebuchBautageberichtDetailsController.save(DigiWebApp.NavigationController.toBautagebuchMaterialienListePageTransition);
					      	        	DigiWebApp.BautagebuchBautageberichteListeController.init();
					      	        	DigiWebApp.BautagebuchBautageberichtDetailsController.save(DigiWebApp.BautagebuchMaterialienListeController.neu);
	      				    		}
	      	                  }
	      	              }
	      	          })
	      	          , icon: M.ImageView.design({
	      	              value: 'theme/images/48x48_plain_shelf.png'
	      	          })
	      	      }) 
	        })
//      	    	M.ButtonView.design({
//	  	          value: M.I18N.l('BautagebuchMaterialien')
//	  	        , cssClass: 'bautagebuchButton'
//	  	        //, anchorLocation: M.CENTER
//	  	        , events: {
//	  	            tap: {
//	  	                //target: DigiWebApp.NavigationController,
//	  	                //action: 'toBautagebuchMaterialienListePageTransition'
//	  		    			action: function() {
//	  						DigiWebApp.BautagebuchBautageberichtDetailsController.save(DigiWebApp.NavigationController.toBautagebuchMaterialienListePageTransition);
//	  					}
//	  	            }
//	  	          }
//	  	    })
	
	  	    , wetterButton: M.GridView.design({
	  	    		  childViews: 'buttongrid'
	                , layout: M.TWO_COLUMNS
	                , buttongrid: M.GridView.design({
	      	            childViews: 'button icon'
	      	          , layout: {
	      	                cssClass: 'bautagebuchButton'
	      	              , columns: {
	      	                    0: 'button'
	      	                  , 1: 'icon'
	      	              }
	      	          }
	      	          , button: M.ButtonView.design({
	      	                value: M.I18N.l('BautagebuchWetter')
	      	              , cssClass: 'bautagebuchButton'
	      	              , anchorLocation: M.RIGHT
	      	              , events: {
	      	                  tap: {
	      			    			action: function() {
	      	        	  				try{DigiWebApp.ApplicationController.vibrate();}catch(e2){}
	      	        	  				DigiWebApp.BautagebuchBautageberichtDetailsController.save(DigiWebApp.NavigationController.toBautagebuchWetterPageTransition);
	      				    		}
	      	                  }
	      	              }
	      	          })
	      	          , icon: M.ImageView.design({
	      	              value: 'theme/images/48x48_plain_cloud_dark.png'
	      	          })
	      	      }) 
	        })
//	  	    	M.ButtonView.design({
//	  	          value: M.I18N.l('BautagebuchWetter')
//	  	        , cssClass: 'bautagebuchButton'
//	  	        , events: {
//	  	            tap: {
//  		    			action: function() {
//  		    				DigiWebApp.BautagebuchBautageberichtDetailsController.save(DigiWebApp.NavigationController.toBautagebuchWetterPageTransition);
//  						}
//	  	            }
//	  	          }
//	  	    })
        })


        , grid: M.GridView.design({
            childViews: 'speichernButton abschliessenButton'
          , layout: M.TWO_COLUMNS
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
	                value: M.I18N.l('BautagebuchSpeichern')
	              , cssClass: 'digiButton green_background'
	              , anchorLocation: M.RIGHT
	              , events: {
	                  tap: {
			    			action: function() {
	        	  				try{DigiWebApp.ApplicationController.vibrate();}catch(e2){}
	        	  				DigiWebApp.BautagebuchBautageberichtDetailsController.save(DigiWebApp.NavigationController.backToBautagebuchBautageberichteListePageTransition);
				    		}
	                  }
	              }
	          })
	          , icon: M.ImageView.design({
	              value: 'theme/images/icon_bookTime.png'
	          })
	      })
          , abschliessenButton: M.GridView.design({
	            childViews: 'button icon'
	          , layout: {
	                cssClass: 'digiButton'
	              , columns: {
	                    0: 'button'
	                  , 1: 'icon'
	              }
	          }
	          , button: M.ButtonView.design({
	                value: M.I18N.l('BautagebuchAbschliessen')
	              , cssClass: 'digiButton'
	              , anchorLocation: M.RIGHT
	              , events: {
	                  tap: {
			    			action: function() {
	        	  					try{DigiWebApp.ApplicationController.vibrate();}catch(e2){}
			    		        	DigiWebApp.BautagebuchBautageberichtDetailsController.finish();
				    		}
	                  }
	              }
	          })
	          , icon: M.ImageView.design({
	              value: 'theme/images/icon_bookTime.png'
	          })
	      })

      })
      , loeschenButton: M.GridView.design({
          childViews: 'button icon'
        , layout: {
              cssClass: 'digiButton'
            , columns: {
                  0: 'button'
                , 1: 'icon'
            }
        }
        , button: M.ButtonView.design({
              value: M.I18N.l('BautagebuchDelete')
            , cssClass: 'red_background'
            , anchorLocation: M.RIGHT
            , events: {
                tap: {
		    			action: function() {
        					try{DigiWebApp.ApplicationController.vibrate();}catch(e2){}
        					DigiWebApp.BautagebuchBautageberichtDetailsController.deleteBautagesbericht(DigiWebApp.NavigationController.backToBautagebuchBautageberichteListePageTransition);
			    		}
                }
            }
        })
        , icon: M.ImageView.design({
            value: ''
        })
    })

//        , grid_old: M.GridView.design({
//              childViews: 'button icon'
//            , layout: {
//                  cssClass: 'digiButton'
//                , columns: {
//                      0: 'button'
//                    , 1: 'icon'
//                }
//            }
//            , button: M.ButtonView.design({
//                  value: M.I18N.l('BautagebuchSpeichernAbschliessen')
//                , cssClass: 'digiButton'
//                , anchorLocation: M.RIGHT
//                , events: {
//                    tap: {
//		                //target: DigiWebApp.BautagebuchBautageberichtDetailsController,
//		                //action: 'save'
//		    			action: function() {
//		    				//var that = this;
//					    	M.DialogView.actionSheet({
//						          title: M.I18N.l('BautagebuchSaveOrClose')
//						        , cancelButtonValue: M.I18N.l('cancel')
//						        , otherButtonValues: [M.I18N.l('save'), M.I18N.l('BautagebuchBautageberichtAbschliessen')]
//						        , otherButtonTags: ["save","finish"]
//						        , callbacks: {
//					    			  other: {action: function(buttonTag) {
//					    			    switch(buttonTag) {
//						    		        case 'save':
//						    		        	DigiWebApp.BautagebuchBautageberichtDetailsController.save(DigiWebApp.NavigationController.backToBautagebuchBautageberichteListePageTransition);
//						    		            break;
//						    		        case 'finish':
//						    		        	DigiWebApp.BautagebuchBautageberichtDetailsController.finish();
//						    		            break;
//						    		        default:
//						    		            console.log("unknonw ButtonTag");
//						    		            break;
//					    			    }
//					    			}}
//					    			, cancel: {action: function() {
//					    				//console.log(M.I18N.l('cancel'));
//					    			}}
//					    		}
//						    });
//			    		}
//                    }
//                }
//            })
//            , icon: M.ImageView.design({
//                value: 'theme/images/icon_bookTime.png'
//            })
//        })

    })

});

