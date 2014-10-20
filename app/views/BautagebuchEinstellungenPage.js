// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: DigiWebApp
// View: BautagebuchEinstellungenPage
// ==========================================================================

DigiWebApp.BautagebuchEinstellungenPage = M.PageView.design({

      events: {
		  pagebeforeshow: {
            action: function() {
				DigiWebApp.BautagebuchEinstellungenController.load();
				//DigiWebApp.BautagebuchEinstellungenPage.content.startUhrzeit.startUhrzeitInput.setValue(DigiWebApp.BautagebuchEinstellungenController.settings.startUhrzeit);
				DigiWebApp.BautagebuchEinstellungenController.set('settings', DigiWebApp.BautagebuchEinstellungenController.settings);
		  		DigiWebApp.BautagebuchEinstellungenController.setStartUhrzeit();
		  		
            	$('#' + DigiWebApp.BautagebuchEinstellungenPage.content.startUhrzeitContainer.startUhrzeitGrid.stundeFeld.id).prop('disabled', true)
            	$('#' + DigiWebApp.BautagebuchEinstellungenPage.content.startUhrzeitContainer.startUhrzeitGrid.minuteFeld.id).prop('disabled', true)

			}
        }
        , pagebeforehide: {
            action: function() {
				DigiWebApp.BautagebuchEinstellungenController.save();
        	}
        }
    }

	, controller: DigiWebApp.BautagebuchEinstellungenController
	, navigationController: DigiWebApp.NavigationController

    , cssClass: 'settingsPage'

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
                      target: DigiWebApp.NavigationController
                    , action: function() {try{DigiWebApp.ApplicationController.vibrate();}catch(e2){} this.backToBautagebuchBautagesberichteListePageTransition();}
                }
            }
        })
        , title: M.LabelView.design({
              value: M.I18N.l('BautagebuchBautagesbericht')
            , anchorLocation: M.CENTER
        })
        , anchorLocation: M.TOP
    })

    , content: M.ScrollView.design({

	        childViews: 'startUhrzeitContainer inStundenBuchenCheckbox falscheZeitenIgnorierenCheckbox positionVorselektierenCheckbox minutenSchritteCombobox alleMitarbeiterVorselektiertCheckbox ueberschneidungenPruefenCheckbox'

            , startUhrzeitContainer: M.ContainerView.design({
	      	      label: M.I18N.l('BautagebuchTaeglicheStartUhrzeit')
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
	  									var myStunde = parseIntRadixTen($('#'+DigiWebApp.BautagebuchEinstellungenPage.content.startUhrzeitContainer.startUhrzeitGrid.stundeFeld.id)[0].value);
	  									var myMinute = parseIntRadixTen($('#'+DigiWebApp.BautagebuchEinstellungenPage.content.startUhrzeitContainer.startUhrzeitGrid.minuteFeld.id)[0].value);
	  									myStunde = (myStunde + 1) % 24;
	  									var startUhrzeitStr = myStunde.padLeft(2,"0") + ":"+ myMinute.padLeft(2,"0");
	  									DigiWebApp.BautagebuchEinstellungenController.set('settings.startUhrzeit', startUhrzeitStr);
	  									DigiWebApp.BautagebuchEinstellungenController.setStartUhrzeit();
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
	  									var myStunde = parseIntRadixTen($('#'+DigiWebApp.BautagebuchEinstellungenPage.content.startUhrzeitContainer.startUhrzeitGrid.stundeFeld.id)[0].value);
	  									var myMinute = parseIntRadixTen($('#'+DigiWebApp.BautagebuchEinstellungenPage.content.startUhrzeitContainer.startUhrzeitGrid.minuteFeld.id)[0].value);
										var minuteSteps = parseIntRadixTen(DigiWebApp.BautagebuchEinstellungenController.settings.minutenSchritte);
	  									if ((myMinute + minuteSteps) > 59) {
	  										myStunde = (myStunde + 1) % 24;										
	  									}
	  									myMinute = (myMinute + minuteSteps) % 60;
	  									var startUhrzeitStr = myStunde.padLeft(2,"0") + ":"+ myMinute.padLeft(2,"0");
	  									DigiWebApp.BautagebuchEinstellungenController.set('settings.startUhrzeit', startUhrzeitStr);
	  									DigiWebApp.BautagebuchEinstellungenController.setStartUhrzeit();
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
	  								var myStunde = parseIntRadixTen($('#'+DigiWebApp.BautagebuchEinstellungenPage.content.startUhrzeitContainer.startUhrzeitGrid.stundeFeld.id)[0].value);
	  								var myMinute = parseIntRadixTen($('#'+DigiWebApp.BautagebuchEinstellungenPage.content.startUhrzeitContainer.startUhrzeitGrid.minuteFeld.id)[0].value);
	  								myStunde = myStunde - 1;
	  								if (myStunde < 0) {
	  									myStunde = 23;
	  								}
	  								var startUhrzeitStr = myStunde.padLeft(2,"0") + ":"+ myMinute.padLeft(2,"0");
	  								DigiWebApp.BautagebuchEinstellungenController.set('settings.startUhrzeit', startUhrzeitStr);
	  								DigiWebApp.BautagebuchEinstellungenController.setStartUhrzeit();
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
	  								var myStunde = parseIntRadixTen($('#'+DigiWebApp.BautagebuchEinstellungenPage.content.startUhrzeitContainer.startUhrzeitGrid.stundeFeld.id)[0].value);
	  								var myMinute = parseIntRadixTen($('#'+DigiWebApp.BautagebuchEinstellungenPage.content.startUhrzeitContainer.startUhrzeitGrid.minuteFeld.id)[0].value);
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
	  								DigiWebApp.BautagebuchEinstellungenController.set('settings.startUhrzeit', startUhrzeitStr);
	  								DigiWebApp.BautagebuchEinstellungenController.setStartUhrzeit();
	  	  						}
	  	    	            }
	  	    	          }
	  	    	    })
	  			})
	  		})

//	  		, startUhrzeit: M.GridView.design({
//	            childViews: 'startUhrzeitLabel startUhrzeitInput'
//	          , layout: M.TWO_COLUMNS
//	          , startUhrzeitLabel: M.LabelView.design({
//	              value: M.I18N.l('BautagebuchTaeglicheStartUhrzeit')
//	          })
//	          , startUhrzeitInput: M.TextFieldView.design({
//	        	    inputType: M.INPUT_TIME
//	        	  , contentBindingReverse: {
//	                    target: DigiWebApp.BautagebuchEinstellungenController
//	                  , property: 'settings.startUhrzeit'
//	              }
//	              , contentBinding: {
//	                    target: DigiWebApp.BautagebuchEinstellungenController
//	                  , property: 'settings.startUhrzeit'
//	              }
//	          	  , events: {
//	          		  tap: {
//		          		  	action: function(id, event) {
//	          		  		}
//	          	  	  }
//	          	  }
//	          })
//	      })
	        	          
	      , inStundenBuchenCheckbox: M.SelectionListView.design({
		          selectionMode: M.MULTIPLE_SELECTION
	            , contentBinding: {
	                  target: DigiWebApp.BautagebuchEinstellungenController
	                , property: 'settings.inStundenBuchenItem'
	            }
			    , events: {
		    		change: {
			    		  target: DigiWebApp.BautagebuchEinstellungenController
		    			, action: function(itemValues, items) {
			    			this.settings.inStundenBuchen = (itemValues.length === 1);
			    			this.settings.inStundenBuchenItem.isSelected = (itemValues.length === 1);
						}
		    		}
				}
	      })
    
	      , falscheZeitenIgnorierenCheckbox: M.SelectionListView.design({
		          selectionMode: M.MULTIPLE_SELECTION
	            , contentBinding: {
	                  target: DigiWebApp.BautagebuchEinstellungenController
	                , property: 'settings.falscheZeitenIgnorierenItem'
	            }
			    , events: {
		    		change: {
			    		  target: DigiWebApp.BautagebuchEinstellungenController
		    			, action: function(itemValues, items) {
			    			this.settings.falscheZeitenIgnorieren = (itemValues.length === 1);
			    			this.settings.falscheZeitenIgnorierenItem.isSelected = (itemValues.length === 1);
						}
		    		}
				}
	      })

	      , positionVorselektierenCheckbox: M.SelectionListView.design({
		          selectionMode: M.MULTIPLE_SELECTION
	            , contentBinding: {
	                  target: DigiWebApp.BautagebuchEinstellungenController
	                , property: 'settings.positionVorselektierenItem'
	            }
			    , events: {
		    		change: {
			    		  target: DigiWebApp.BautagebuchEinstellungenController
		    			, action: function(itemValues, items) {
			    			this.settings.positionVorselektieren = (itemValues.length === 1);
			    			this.settings.positionVorselektierenItem.isSelected = (itemValues.length === 1);
						}
		    		}
				}
	      })

	      , minutenSchritteCombobox: M.SelectionListView.design({
		          selectionMode: M.SINGLE_SELECTION_DIALOG
                , label: M.I18N.l('minutenSchritte')
	            , contentBinding: {
	                  target: DigiWebApp.BautagebuchEinstellungenController
	                , property: 'settings.minutenSchritteItem'
	            }
			    , events: {
		    		change: {
			    		  target: DigiWebApp.BautagebuchEinstellungenController
		    			, action: function(itemValues, items) {
			    			var that = this;
			    			var mySelection = M.ViewManager.getView('bautagebuchEinstellungenPage', 'minutenSchritteCombobox').getSelection(YES);
			    			that.set("settings.minutenSchritte", mySelection.value); 
							var myItems = _.map(that.settings.minutenSchritteItem, function(n) {
								n.isSelected = NO;
								if (parseIntRadixTen(n.value) == parseIntRadixTen(that.settings.minutenSchritte)) {
									n.isSelected = YES;
								}
								return n;
							});
							that.set("settings.minutenSchritteItem", myItems);
						}
		    		}
				}
	      })
	      
	      , alleMitarbeiterVorselektiertCheckbox: M.SelectionListView.design({
		          selectionMode: M.MULTIPLE_SELECTION
	            , contentBinding: {
	                  target: DigiWebApp.BautagebuchEinstellungenController
	                , property: 'settings.alleMitarbeiterVorselektiertItem'
	            }
			    , events: {
		    		change: {
			    		  target: DigiWebApp.BautagebuchEinstellungenController
		    			, action: function(itemValues, items) {
			    			this.settings.alleMitarbeiterVorselektiert = (itemValues.length === 1);
			    			this.settings.alleMitarbeiterVorselektiertItem.isSelected = (itemValues.length === 1);
						}
		    		}
				}
	      })
	      
	      , ueberschneidungenPruefenCheckbox: M.SelectionListView.design({
	          selectionMode: M.MULTIPLE_SELECTION
            , contentBinding: {
                  target: DigiWebApp.BautagebuchEinstellungenController
                , property: 'settings.ueberschneidungenPruefenItem'
            }
		    , events: {
	    		change: {
		    		  target: DigiWebApp.BautagebuchEinstellungenController
	    			, action: function(itemValues, items) {
		    			this.settings.ueberschneidungenPruefen = (itemValues.length === 1);
		    			this.settings.ueberschneidungenPruefenItem.isSelected = (itemValues.length === 1);
					}
	    		}
			}
      })

      //	      , sliderContainer: M.ContainerView.design({
//	    	  		  childViews: 'daysToHoldBookingsOnDeviceSlider'
//			        , slider: M.SliderView.design({
//			        	  label: M.I18N.l('daysToHoldBookingsOnDeviceLabel')
//			        	, min: 1
//			        	, max: 40
//			        	, highlightLeftPart: YES
//			        	, cssClass: 'daysToHoldBookingsOnDeviceSlider'
//			            , contentBinding: {
//			                  target: DigiWebApp.SettingsController
//			                , property: 'settings.daysToHoldBookingsOnDevice'
//			            }
//			        })
//	      })
	    
    })

});

