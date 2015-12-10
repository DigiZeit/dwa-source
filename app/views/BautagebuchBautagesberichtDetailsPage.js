// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: DigiWebApp
// View: BautagebuchBautagesberichtDetailsPage
// ==========================================================================

DigiWebApp.BautagebuchBautagesberichtDetailsPage = M.PageView.design({

      events: {
		  pagebeforeshow: {
            action: function() {
					var that = DigiWebApp.BautagebuchBautagesberichtDetailsPage;
					var controller = DigiWebApp.BautagebuchBautagesberichtDetailsController;

					if (controller.datum) {
						var datumArray = controller.datum.split(".");
						controller.set("datumAsDate", datumArray[2] + "-" + datumArray[1] + "-" + datumArray[0]);
					}

					//alert("pagebeforeshow");
					// verfügbare Projektleiter kopieren und ausgewählten selektieren
		            var projektleiterArray = _.map(DigiWebApp.BautagebuchMainController.projektleiter, function(o) {
		            	if ( typeof(o) === "undefined" ) {
		            		console.log("UNDEFINED PROJEKTLEADER");
		            	} else {    
		    				if (controller.projektleiterId) {
		    					o.isSelected = (o.value === controller.projektleiterId);
		    				}
		                    return o;
		            	}
		            });
		            projektleiterArray = _.compact(projektleiterArray);
		            //console.log(projektleiterArray);
					controller.set("projektleiterList", projektleiterArray);

                    M.ViewManager.getView('bautagebuchBautagesberichtDetailsPage', 'orderButton').setValue(M.I18N.l('selectSomething'));

                    // verfügbare Aufträge kopieren und ausgewählten selektieren
		            var auftraegeArray = _.map(DigiWebApp.BautagebuchMainController.auftraege, function(o) {
		            	if ( typeof(o) === "undefined" ) {
		            		console.log("UNDEFINED ORDER");
		            	} else {    
		    				if (controller.auftragsId) {
		    					o.isSelected = (o.value === controller.auftragsId);
		                        if (o.isSelected) {
		                        	M.ViewManager.
		                        		getView('bautagebuchBautagesberichtDetailsPage', 'orderButton').
		                        		setValue(o.label);
		                        }
		    				}
		                    return o;
		            	}
		            });
					auftraegeArray = _.compact(auftraegeArray);
					controller.set("auftraegeList", auftraegeArray);

					// verfügbare Positionen kopieren und ausgewählten selektieren
					if (controller.auftragsId) {
						controller.setPositionen(controller.auftragsId);
    				} else {
			            var positionenArray = _.map(DigiWebApp.BautagebuchMainController.positionen, function(o) {
			            	if ( typeof(o) === "undefined" ) {
			            		console.log("UNDEFINED POSITION");
			            	} else {    
//			    				if (controller.positionId) {
//			    					o.isSelected = (o.value === controller.positionId);
//			    				}
			                    return o;
			            	}
			            });
			            positionenArray = _.compact(positionenArray);
						controller.set("positionenList", positionenArray);
    				}

					// verfügbare Mitarbeiter kopieren und ausgewählte selektieren
                    var mitarbeiterIds = controller.mitarbeiterIds; 
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
					controller.set("mitarbeiterList", mitarbeiterArray);
					
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
					controller.set("mitarbeiterListSelected", mitarbeiterArraySelected);

					
			  		if (DigiWebApp.SettingsController.getSetting('bautagebuchLimit_autoStartUhrzeit')) {
						//$(that.content.startUhrzeit)[0].disable();
						$(that.content.startUhrzeitContainer.plusGrid.stundePlusButton)[0].disable();
						$(that.content.startUhrzeitContainer.plusGrid.minutePlusButton)[0].disable();
						$(that.content.startUhrzeitContainer.minusGrid.stundeMinusButton)[0].disable();
						$(that.content.startUhrzeitContainer.minusGrid.minuteMinusButton)[0].disable();
					} else {
						//$(that.content.startUhrzeit)[0].enable();
						$(that.content.startUhrzeitContainer.plusGrid.stundePlusButton)[0].enable();
						$(that.content.startUhrzeitContainer.plusGrid.minutePlusButton)[0].enable();
						$(that.content.startUhrzeitContainer.minusGrid.stundeMinusButton)[0].enable();
						$(that.content.startUhrzeitContainer.minusGrid.minuteMinusButton)[0].enable();
					}
			  		
			  		$('#' + that.content.mitarbeiter_zeiten_ButtonGrid.mitarbeiterButton.id).addClass("bigButton");
			  		$('#' + that.content.mitarbeiter_zeiten_ButtonGrid.zeitenButton.id).addClass("bigButton");
			  		$('#' + that.content.material_wetter_ButtonGrid.materialienButton.id).addClass("bigButton");
			  		$('#' + that.content.material_wetter_ButtonGrid.wetterButton.id).addClass("bigButton");
			  		$('#' + that.content.medien_notizen_ButtonGrid.medienButton.id).addClass("bigButton");
			  		$('#' + that.content.medien_notizen_ButtonGrid.notizenButton.id).addClass("bigButton");
			  		
			  		// Positionen-ComboBox ausblenden, falls DigiWebApp.BautagebuchEinstellungenController.settings.positionVorselektieren != true
			  		if (DigiWebApp.BautagebuchEinstellungenController.settings.positionVorselektieren 
			  		|| (typeof(controller.item.get("bautagesberichtTyp")) != "undefined" 
			  				&& controller.item.get("bautagesberichtTyp") != "<standard>")
			  		) {
			  			$('#' + that.content.positionComboBox.id).parent().parent().parent().show();
			  		} else {
			  			$('#' + that.content.positionComboBox.id).parent().parent().parent().hide();
			  		}
			  		
			  		// Freischaltung 429
			  		that.doHideShowOrderCombobox(YES);

			  		controller.setStartUhrzeit();
			  		
	            	if (controller.get('handOrderId')) {
	            		$('#' + that.content.positionComboBox.id + "_container").hide();
//	            	} else {
//	            		$('#' + that.content.positionComboBox.id + "_container").show();
	            	}

	            	$('#' + that.content.startUhrzeitContainer.startUhrzeitGrid.stundeFeld.id).prop('disabled', true);
	            	$('#' + that.content.startUhrzeitContainer.startUhrzeitGrid.minuteFeld.id).prop('disabled', true);
	            	
	            	if (DigiWebApp.BautagebuchEinstellungenController.settings.inStundenBuchen 
	            	||  DigiWebApp.SettingsController.getSetting('bautagebuchLimit_autoStartUhrzeit')) {
	            		$("label[for='"+that.content.startUhrzeitContainer.id+"']").show();
	            		$('#' + that.content.startUhrzeitContainer.id).show();
	            	} else {
	            		$("label[for='"+that.content.startUhrzeitContainer.id+"']").hide();
	            		$('#' + that.content.startUhrzeitContainer.id).hide();
	            	}
	            	// Bugfix 2108: Rename in order to be consistent with DSO
	            	if (DigiWebApp.SettingsController.getSetting('DTC6aktiv')) {
	    	          	DigiWebApp.ApplicationController.dtc6AktivRenameHelper(that.content.auftragComboBox.id, M.I18N.l('dtc6Ordner'));
	    	        	DigiWebApp.ApplicationController.dtc6AktivRenameHelper(that.content.positionComboBox.id, M.I18N.l('dtc6Auftrag'));
	    	        }
			}
        }
        , pagehide: {
            action: function() {

        	}
        }
    }

	, doHideShowOrderCombobox: function(show) {
		var that = this;
		try { $('#' + that.content.auftragComboBox.id + "_container").hide(); } catch (e) {trackError(e);}
		try { $('#' + that.content.orderButton.id).hide(); } catch (e) {trackError(e);}
		try { $('label[for="' + that.content.orderButton.id + '"]').hide(); } catch (e) {trackError(e);}
		if (show) {
			// Freischaltung 429 "mehrstufige Auftragsauswahl"
			if (DigiWebApp.SettingsController.featureAvailable("429")) {
				try { $('#' + that.content.orderButton.id).show(); } catch (e) {trackError(e);}	
				try { $('label[for="' + that.content.orderButton.id + '"]').show(); } catch (e) {trackError(e);}
			} else {
				try { $('#' + that.content.auftragComboBox.id + "_container").show(); } catch (e) {trackError(e);}
			}
		}
	}

	, doHideShowPositionCombobox: function(show) {
		var that = this;
		var controller = DigiWebApp.BautagebuchBautagesberichtDetailsController;
		try { $('#' + that.content.positionComboBox.id + "_container").hide(); } catch (e) {trackError(e);}
		if (show && !controller.get('handOrderId')) {
			try { $('#' + that.content.positionComboBox.id + "_container").show(); } catch (e) {trackError(e);}
		}
	}

    , cssClass: 'bautagebuchBautagesberichtDetailsPage'

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
                    	this.backToBautagebuchBautagesberichteListePageTransition();
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
//        		  target: DigiWebApp.BautagebuchBautagesberichtDetailsController
//        		, property: 'datumAsDate'
//        	}
//	        , contentBindingReverse: {
//	    		  target: DigiWebApp.BautagebuchBautagesberichtDetailsController
//	    		, property: 'datumAsDate'
//	    	}
//            , events: {
//            	  blur: {
//            		action: function() {
//            			if (DigiWebApp.BautagebuchBautagesberichtDetailsController.datumAsDate) {
//            				var datumArray = DigiWebApp.BautagebuchBautagesberichtDetailsController.datumAsDate.split("-");
//            				DigiWebApp.BautagebuchBautagesberichtDetailsController.set("datum", datumArray[2] + "." + datumArray[1] + "." + datumArray[0]);
//            			}
//            		}
//            	}
//	            , tap: {
//	                action: function() {
//            			try{DigiWebApp.ApplicationController.vibrate();}catch(e3){}
//				  		if (DigiWebApp.SettingsController.getSetting('bautagebuchLimit_autoStartUhrzeit')) {
//				  				$(DigiWebApp.BautagebuchBautagesberichtDetailsPage.header.title).blur();
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
        		  target: DigiWebApp.BautagebuchBautagesberichtDetailsController
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
			    		      source: M.ViewManager.getView('bautagebuchBautagesberichtDetailsPage', 'title')
			    		    , initialDate: D8.create(DigiWebApp.BautagebuchBautagesberichtDetailsController.datum)
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
			      						DigiWebApp.BautagebuchBautagesberichtDetailsController.set("datum", value);
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
                      //target: DigiWebApp.BautagebuchBautagesberichtDetailsController
                    //, action: 'delete'
        			action: function() {
        				try{DigiWebApp.ApplicationController.vibrate();}catch(e4){}
        				DigiWebApp.BautagebuchBautagesberichtDetailsController.deleteBautagesbericht(DigiWebApp.NavigationController.backToBautagebuchBautagesberichteListePageTransition);
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
                      //target: DigiWebApp.BautagebuchBautagesberichtDetailsController
                    //, action: 'delete'
        			action: function() {
        				try{DigiWebApp.ApplicationController.vibrate();}catch(e4){}
        				DigiWebApp.NavigationController.backToBautagebuchBautagesberichteListePageTransition();
        			}
                }
            }
        })
       , anchorLocation: M.TOP
    })

    , content: M.ScrollView.design({

    	  //childViews: 'projektleiterComboBox auftragComboBox mitarbeiterGroup startUhrzeit spacer2 zeitenButton materialienButton notizenButton medienButton wetterButton spacer1 grid'
    	  childViews: 'orderButton auftragComboBox positionComboBox projektleiterComboBox startUhrzeitContainer spacer2 spacer3 mitarbeiter_zeiten_ButtonGrid material_wetter_ButtonGrid medien_notizen_ButtonGrid spacer1 grid loeschenButton'
    		  
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
									var myStunde = parseIntRadixTen($('#'+DigiWebApp.BautagebuchBautagesberichtDetailsPage.content.startUhrzeitContainer.startUhrzeitGrid.stundeFeld.id)[0].value);
									var myMinute = parseIntRadixTen($('#'+DigiWebApp.BautagebuchBautagesberichtDetailsPage.content.startUhrzeitContainer.startUhrzeitGrid.minuteFeld.id)[0].value);
									myStunde = (myStunde + 1) % 24;
									var startUhrzeitStr = myStunde.padLeft(2,"0") + ":"+ myMinute.padLeft(2,"0");
									DigiWebApp.BautagebuchBautagesberichtDetailsController.set('startUhrzeit', startUhrzeitStr);
									DigiWebApp.BautagebuchBautagesberichtDetailsController.setStartUhrzeit();
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
									var myStunde = parseIntRadixTen($('#'+DigiWebApp.BautagebuchBautagesberichtDetailsPage.content.startUhrzeitContainer.startUhrzeitGrid.stundeFeld.id)[0].value);
									var myMinute = parseIntRadixTen($('#'+DigiWebApp.BautagebuchBautagesberichtDetailsPage.content.startUhrzeitContainer.startUhrzeitGrid.minuteFeld.id)[0].value);
									var minuteSteps = parseIntRadixTen(DigiWebApp.BautagebuchEinstellungenController.settings.minutenSchritte);
									if ((myMinute + minuteSteps) > 59) {
										myStunde = (myStunde + 1) % 24;										
									}
									myMinute = (myMinute + minuteSteps) % 60;
									var startUhrzeitStr = myStunde.padLeft(2,"0") + ":"+ myMinute.padLeft(2,"0");
									DigiWebApp.BautagebuchBautagesberichtDetailsController.set('startUhrzeit', startUhrzeitStr);
									DigiWebApp.BautagebuchBautagesberichtDetailsController.setStartUhrzeit();
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
								var myStunde = parseIntRadixTen($('#'+DigiWebApp.BautagebuchBautagesberichtDetailsPage.content.startUhrzeitContainer.startUhrzeitGrid.stundeFeld.id)[0].value);
								var myMinute = parseIntRadixTen($('#'+DigiWebApp.BautagebuchBautagesberichtDetailsPage.content.startUhrzeitContainer.startUhrzeitGrid.minuteFeld.id)[0].value);
								myStunde = myStunde - 1;
								if (myStunde < 0) {
									myStunde = 23;
								}
								var startUhrzeitStr = myStunde.padLeft(2,"0") + ":"+ myMinute.padLeft(2,"0");
								DigiWebApp.BautagebuchBautagesberichtDetailsController.set('startUhrzeit', startUhrzeitStr);
								DigiWebApp.BautagebuchBautagesberichtDetailsController.setStartUhrzeit();
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
								var myStunde = parseIntRadixTen($('#'+DigiWebApp.BautagebuchBautagesberichtDetailsPage.content.startUhrzeitContainer.startUhrzeitGrid.stundeFeld.id)[0].value);
								var myMinute = parseIntRadixTen($('#'+DigiWebApp.BautagebuchBautagesberichtDetailsPage.content.startUhrzeitContainer.startUhrzeitGrid.minuteFeld.id)[0].value);
								var minuteSteps = parseIntRadixTen(DigiWebApp.BautagebuchEinstellungenController.settings.minutenSchritte);
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
								DigiWebApp.BautagebuchBautagesberichtDetailsController.set('startUhrzeit', startUhrzeitStr);
								DigiWebApp.BautagebuchBautagesberichtDetailsController.setStartUhrzeit();
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
	                target: DigiWebApp.BautagebuchBautagesberichtDetailsController
	              , property: 'startUhrzeit'
	          }
	          , contentBinding: {
	                target: DigiWebApp.BautagebuchBautagesberichtDetailsController
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
	                    target: DigiWebApp.BautagebuchBautagesberichtDetailsController
	                  , property: 'startUhrzeit'
	              }
	              , contentBinding: {
	                    target: DigiWebApp.BautagebuchBautagesberichtDetailsController
	                  , property: 'startUhrzeit'
	              }
	          	  , events: {
	          		  tap: {
		          		  	action: function(id, event) {
					          		if (DigiWebApp.SettingsController.getSetting('bautagebuchLimit_autoStartUhrzeit')) {
	          		  					return;
	          		  				}
	          		  				$(DigiWebApp.BautagebuchBautagesberichtDetailsPage.content.startUhrzeit.startUhrzeitInput).blur();
					          		M.DatePickerView.show({
					          		      source: M.ViewManager.getView('bautagebuchBautagesberichtDetailsPage', 'startUhrzeitInput')
					          		    , initialDate: D8.create("01.01.1993 " + DigiWebApp.BautagebuchBautagesberichtDetailsController.startUhrzeit)
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
						      						DigiWebApp.BautagebuchBautagesberichtDetailsController.set("startUhrzeit", value);
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
                  target: DigiWebApp.BautagebuchBautagesberichtDetailsController
                , property: 'projektleiterList'
            }

            , events: {
                  change: {
                      action: function(itemValues, items) {
            			DigiWebApp.BautagebuchBautagesberichtDetailsController.set("projektleiterId", M.ViewManager.getView('bautagebuchBautagesberichtDetailsPage', 'projektleiterComboBox').getSelection(YES).value);
                    }
                }
            }
        })
        	
		, orderButton: M.ButtonView.design({
			  value: M.I18N.l('selectSomething')
            , label: M.I18N.l('OrdnerHandauftrag')
            , cssClass: 'orderButton'
			, events: {
				tap: {
            		  target: DigiWebApp.OrderListController
            		, action: function() {
						try{DigiWebApp.ApplicationController.vibrate();}catch(e2){}
						var vaterId = null;
						var selectedOrder = DigiWebApp.SelectionController.getSelectedOrderItem();
						if (typeof(selectedOrder) != "undefined" && selectedOrder != null) {
							var potentialOrder = DigiWebApp.Order.getById(selectedOrder);
							if (typeof(potentialOrder) == "undefined" || potentialOrder == null) {
								potentialOrder = DigiWebApp.HandOrder.getById(selectedOrder);
								if (typeof(potentialOrder) != "undefined" && potentialOrder != null)
									vaterId = potentialOrder.get("vaterId");
							} else if (typeof(potentialOrder) != "undefined" && potentialOrder != null) {
								vaterId = potentialOrder.get("id");
							}
						}
						this.init(
								  OrderSelectionMode.MAYBEALL 
								, function(obj) {
									  DigiWebApp.NavigationController.backToBautagebuchBautagesberichtDetailsPageTransition();
									  if (typeof(obj) != "undefined" && obj != null) {
										  var isFolder = (obj.name == DigiWebApp.Order.name);
										  var isHandOrder = (obj.name == DigiWebApp.HandOrder.name);
										  var isPosition = (obj.name == DigiWebApp.Position.name);
										  var orderId = obj.get("id");
										  var positionId = obj.get("id");
										  if (isPosition) {
											  orderId = obj.get("orderId");
										  }
										  M.ViewManager.
										  	getView('bautagebuchBautagesberichtDetailsPage', 'auftragComboBox').
										  	setSelection(orderId);
										  M.ViewManager.getView('bautagebuchBautagesberichtDetailsPage', 'auftragComboBox').events.change.action();
										  if (isPosition) {
											  M.ViewManager.
											  	getView('bautagebuchBautagesberichtDetailsPage', 'positionComboBox').
											  	setSelection(positionId);
											  M.ViewManager.getView('bautagebuchBautagesberichtDetailsPage', 'positionComboBox').events.change.action();
										  }
									  }
								}
								, function(){
									DigiWebApp.NavigationController.backToBautagebuchBautagesberichtDetailsPageTransition();
								}
								, vaterId
								, DigiWebApp.BautagebuchEinstellungenController.settings.positionVorselektieren
						)
						DigiWebApp.NavigationController.toOrderListPage();
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
                  target: DigiWebApp.BautagebuchBautagesberichtDetailsController
                , property: 'auftraegeList'
            }

	        , events: {
		            change: {
		                action: function(itemValues, items) {
	        				var that = DigiWebApp.BautagebuchBautagesberichtDetailsPage;
	        				var controller = DigiWebApp.BautagebuchBautagesberichtDetailsController;
				  			that.doHideShowPositionCombobox(NO);
	        				var mySelection = M.ViewManager.
	        										getView('bautagebuchBautagesberichtDetailsPage', 'auftragComboBox').
	        										getSelection(YES);
	        				if (mySelection.label == mySelection.value || isGUID(mySelection.value)) {
	        					var handOrderObj = _.select(DigiWebApp.HandOrder.findSorted(), function(ord) {
	        					    if (ord) return ord.get('id') == mySelection.value || ord.get('name') == mySelection.label;
	        					})[0];
			      				controller.set("handOrderId", handOrderObj.get("id"));
			      				controller.set("handOrderVaterId", handOrderObj.get("vaterId"));
			      				controller.set("handOrderName", handOrderObj.get("name"));
	        				} else {
			      				controller.set("handOrderId", null);
			      				controller.set("handOrderVaterId", null);
			      				controller.set("handOrderName", null);
						  		if (DigiWebApp.BautagebuchEinstellungenController.settings.positionVorselektieren 
						  		 || controller.item.get("bautagesberichtTyp") != "<standard>")
						  		{
						  			that.doHideShowPositionCombobox(YES);
						  		}
	        				}
		      				controller.set("auftragsId", mySelection.value);
		      				controller.set("auftragsName", mySelection.label);
							M.ViewManager.
								getView('bautagebuchBautagesberichtDetailsPage', 'orderButton').
							  	setValue(mySelection.label);
		      				controller.setPositionen(
		      						M.ViewManager.
		      							getView('bautagebuchBautagesberichtDetailsPage', 'auftragComboBox').
		      							getSelection(YES).value
		      				);

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
                  target: DigiWebApp.BautagebuchBautagesberichtDetailsController
                , property: 'positionenList'
            }

	        , events: {
		            change: {
		                action: function(itemValues, items) {
	        				var controller = DigiWebApp.BautagebuchBautagesberichtDetailsController;
	        				var selObj = M.ViewManager.
		  									getView('bautagebuchBautagesberichtDetailsPage', 'positionComboBox').
		  									getSelection(YES);
		  					if (typeof(selObj) != "undefined" && selObj != null) {
			  				controller.set("positionId", selObj.value);
			  				controller.set("positionName", selObj.label);
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
	      	        	  				//DigiWebApp.BautagebuchBautagesberichtDetailsController.save(DigiWebApp.NavigationController.toBautagebuchMitarbeiterAuswahlPage);
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
	      	        	  				if (DigiWebApp.BautagebuchZeitbuchung.findSorted(DigiWebApp.BautagebuchBautagesberichtDetailsController.item.get('id')).length > 0) {
	      	        	  					DigiWebApp.BautagebuchBautagesberichtDetailsController.save(DigiWebApp.NavigationController.toBautagebuchZeitenListePageTransition);
	      	        	  				} else {
	      	        	  					DigiWebApp.BautagebuchBautagesberichtDetailsController.save(DigiWebApp.BautagebuchZeitenListeController.neu);
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
	      	        	  				//DigiWebApp.BautagebuchBautagesberichtDetailsController.save(DigiWebApp.NavigationController.toBautagebuchNotizenListePageTransition);
	      	        	  				DigiWebApp.BautagebuchNotizenListeController.init();
	      	        	  				DigiWebApp.BautagebuchBautagesberichtDetailsController.save(DigiWebApp.BautagebuchNotizenListeController.neu);
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
		      	        	  				//DigiWebApp.BautagebuchBautagesberichtDetailsController.save(DigiWebApp.NavigationController.toBautagebuchMedienListePageTransition);
		      	        	  				DigiWebApp.BautagebuchMedienListeController.init();
		      	        	  				DigiWebApp.BautagebuchBautagesberichtDetailsController.save(DigiWebApp.BautagebuchMedienListeController.neu);
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
	      	        	  				//DigiWebApp.BautagebuchBautagesberichtDetailsController.save(DigiWebApp.NavigationController.toBautagebuchMaterialienListePageTransition);
					      	        	DigiWebApp.BautagebuchBautagesberichteListeController.init();
					      	        	DigiWebApp.BautagebuchBautagesberichtDetailsController.save(DigiWebApp.BautagebuchMaterialienListeController.neu);
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
//	  						DigiWebApp.BautagebuchBautagesberichtDetailsController.save(DigiWebApp.NavigationController.toBautagebuchMaterialienListePageTransition);
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
	      	        	  				DigiWebApp.BautagebuchBautagesberichtDetailsController.save(DigiWebApp.NavigationController.toBautagebuchWetterPageTransition);
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
//  		    				DigiWebApp.BautagebuchBautagesberichtDetailsController.save(DigiWebApp.NavigationController.toBautagebuchWetterPageTransition);
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
	        	  				DigiWebApp.BautagebuchBautagesberichtDetailsController.save(DigiWebApp.NavigationController.backToBautagebuchBautagesberichteListePageTransition);
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
			    		        	DigiWebApp.BautagebuchBautagesberichtDetailsController.finish();
				    		}
	                  }
	              }
	          })
	          , icon: M.ImageView.design({
	              value: 'theme/images/icon_bookTime.png'
	          })
	      })

      })
      
      , loeschenButton: M.ButtonView.design({
          value: M.I18N.l('BautagebuchDelete')
        , cssClass: 'red_background delButton'
        , events: {
            tap: {
	    			action: function() {
    					try{DigiWebApp.ApplicationController.vibrate();}catch(e2){}
    					DigiWebApp.BautagebuchBautagesberichtDetailsController.deleteBautagesbericht(DigiWebApp.NavigationController.backToBautagebuchBautagesberichteListePageTransition);
		    		}
            }
        }
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
//		                //target: DigiWebApp.BautagebuchBautagesberichtDetailsController,
//		                //action: 'save'
//		    			action: function() {
//		    				//var that = this;
//					    	M.DialogView.actionSheet({
//						          title: M.I18N.l('BautagebuchSaveOrClose')
//						        , cancelButtonValue: M.I18N.l('cancel')
//						        , otherButtonValues: [M.I18N.l('save'), M.I18N.l('BautagebuchBautagesberichtAbschliessen')]
//						        , otherButtonTags: ["save","finish"]
//						        , callbacks: {
//					    			  other: {action: function(buttonTag) {
//					    			    switch(buttonTag) {
//						    		        case 'save':
//						    		        	DigiWebApp.BautagebuchBautagesberichtDetailsController.save(DigiWebApp.NavigationController.backToBautagebuchBautagesberichteListePageTransition);
//						    		            break;
//						    		        case 'finish':
//						    		        	DigiWebApp.BautagebuchBautagesberichtDetailsController.finish();
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

