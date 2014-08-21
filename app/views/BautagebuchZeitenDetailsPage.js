// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: DigiWebApp
// View: BautagebuchZeitenDetailsPage
// ==========================================================================

DigiWebApp.BautagebuchZeitenDetailsPage = M.PageView.design({

      events: {
		  pagebeforeshow: {
            action: function() {
				// verfügbare Positionen kopieren und ausgewählte selektieren
				var itemSelected = NO;
				var relevantDetailsController = DigiWebApp.BautagebuchZeitenDetailsController;
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
				
			    relevantDetailsController.setTaetigkeiten(relevantDetailsController.positionId);
				
				// im Bautagesbericht verfügbare Mitarbeiter kopieren und ausgewählte selektieren
                var mitarbeiterIds = DigiWebApp.BautagebuchZeitenDetailsController.mitarbeiterIds; 
                var mitarbeiterList = [];
                var mitarbeiterArray = mitarbeiterList;
				mitarbeiterArray = _.map(JSON.parse(JSON.stringify(DigiWebApp.BautagebuchBautagesberichtDetailsController.mitarbeiterListSelected)), function(o) {
					var mitarbeiterSelected = NO;
					_.each(mitarbeiterIds, function(m) {
						if (parseIntRadixTen(m) === parseIntRadixTen(o.value)) {
							mitarbeiterSelected = YES;
						}
					});
					o.isSelected = (mitarbeiterSelected === YES);
					return o;
    			});
				mitarbeiterArray = _.compact(mitarbeiterArray);
				DigiWebApp.BautagebuchZeitenDetailsController.set("mitarbeiterList", mitarbeiterArray);
				
				if (DigiWebApp.BautagebuchEinstellungen.find()[0].get("inStundenBuchen")) {
					try{$('[id=' + DigiWebApp.BautagebuchZeitenDetailsPage.content.VonBisContainer.id  + ']').each(function() { $(this).hide(); });}catch(e2){}
					try{$("label[for='" + DigiWebApp.BautagebuchZeitenDetailsPage.content.VonBisContainer.id  + "']").each(function() { $(this).hide(); });}catch(e2){}
					try{$('[id=' + DigiWebApp.BautagebuchZeitenDetailsPage.content.dauerContainer.id  + ']').each(function() { $(this).show();});}catch(e4){}
					try{$("label[for='" + DigiWebApp.BautagebuchZeitenDetailsPage.content.dauerContainer.id  + "']").each(function() { $(this).show();});}catch(e4){}
				} else {
					try{$('[id=' + DigiWebApp.BautagebuchZeitenDetailsPage.content.VonBisContainer.id  + ']').each(function() { $(this).show(); });}catch(e5){}
					try{$("label[for='" + DigiWebApp.BautagebuchZeitenDetailsPage.content.VonBisContainer.id  + "']").each(function() { $(this).show(); });}catch(e5){}
					try{$('[id=' + DigiWebApp.BautagebuchZeitenDetailsPage.content.dauerContainer.id  + ']').each(function() { $(this).hide();});}catch(e7){}
					try{$("label[for='" + DigiWebApp.BautagebuchZeitenDetailsPage.content.dauerContainer.id  + "']").each(function() { $(this).hide();});}catch(e7){}
				}
				
//		  		if (DigiWebApp.SettingsController.getSetting('bautagebuchLimit_autoStartUhrzeit')) {
//					$(DigiWebApp.BautagebuchBautagesberichtDetailsPage.content.startUhrzeit.startUhrzeitInput)[0].disable();
//				} else {
//					$(DigiWebApp.BautagebuchBautagesberichtDetailsPage.content.startUhrzeit.startUhrzeitInput)[0].enable();
//				}
				
				if (DigiWebApp.BautagebuchBautagesberichtDetailsController.item.get("abgeschlossen")) {
					$("#" + DigiWebApp.BautagebuchZeitenDetailsPage.content.grid.id).hide();
					$("#" + DigiWebApp.BautagebuchZeitenDetailsPage.header.delButton.id).hide();
				} else {
					$("#" + DigiWebApp.BautagebuchZeitenDetailsPage.content.grid.id).show();
					$("#" + DigiWebApp.BautagebuchZeitenDetailsPage.header.delButton.id).show();
				}

				M.ViewManager.getView('bautagebuchZeitenDetailsPage', 'remarkInput').setValue(DigiWebApp.BautagebuchZeitenDetailsController.remark);

				DigiWebApp.BautagebuchZeitenDetailsController.setDauer();		  		
				DigiWebApp.BautagebuchZeitenDetailsController.setVonBis();		  		

            	if (relevantDetailsController.get('handOrderId')) {
            		$('#' + DigiWebApp.BautagebuchZeitenDetailsPage.content.positionComboBox.id + "_container").hide();
            	} else {
            		$('#' + DigiWebApp.BautagebuchZeitenDetailsPage.content.positionComboBox.id + "_container").show();
            	}

            	$('#' + DigiWebApp.BautagebuchZeitenDetailsPage.content.dauerContainer.dauerGrid.stundeFeld.id).prop('disabled', true)
            	$('#' + DigiWebApp.BautagebuchZeitenDetailsPage.content.dauerContainer.dauerGrid.minuteFeld.id).prop('disabled', true)
            	$('#' + DigiWebApp.BautagebuchZeitenDetailsPage.content.VonBisContainer.VonBisGrid.stundeVonFeld.id).prop('disabled', true)
            	$('#' + DigiWebApp.BautagebuchZeitenDetailsPage.content.VonBisContainer.VonBisGrid.minuteVonFeld.id).prop('disabled', true)
            	$('#' + DigiWebApp.BautagebuchZeitenDetailsPage.content.VonBisContainer.VonBisGrid.stundeBisFeld.id).prop('disabled', true)
            	$('#' + DigiWebApp.BautagebuchZeitenDetailsPage.content.VonBisContainer.VonBisGrid.minuteBisFeld.id).prop('disabled', true)
            	
			}
        }
        , pagehide: {
            action: function() {

        	}
        }
    }
	
    , cssClass: 'bautagebuchZeitenDetailsPage'

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
                    //, action: 'backToBautagebuchZeitenListePageTransition'
        			action: function() {try{DigiWebApp.ApplicationController.vibrate();}catch(e8){} 
        				history.back();
        			}
                }
            }
        })
        , title: M.LabelView.design({
              value: M.I18N.l('Zeitbuchung')
            , anchorLocation: M.CENTER
        })
        , delButton: M.ButtonView.design({
              value: M.I18N.l('BautagebuchDelete')
            , icon: 'delete'
            , anchorLocation: M.RIGHT
            , cssClass: 'red_background'
            , events: {
                tap: {
                      target: DigiWebApp.BautagebuchZeitenDetailsController
                    , action: function() {try{DigiWebApp.ApplicationController.vibrate();}catch(e9){} this.deleteZeitbuchung();}
                }
            }
        })
        , uebersichtButton: M.ButtonView.design({
              value: M.I18N.l('uebersicht')
            , icon: 'forward'
            , anchorLocation: M.RIGHT
            , events: {
                tap: {
                      target: DigiWebApp.BautagebuchZeitenDetailsController
                    , action: function() {try{DigiWebApp.ApplicationController.vibrate();}catch(e9){} 
                    	//this.deleteZeitbuchung();
                    	DigiWebApp.NavigationController.backToBautagebuchZeitenListePageTransition();
                    }
                }
            }
        })
        , anchorLocation: M.TOP
    })

    , content: M.ScrollView.design({

    	  childViews: 'positionComboBox activityComboBox mitarbeiterGroup VonBisContainer dauerContainer remarkInput grid loeschenButton'
        	  
        , cssClass: 'content'
    	
        , positionComboBox: M.SelectionListView.design({

                /* renders a selection view like check boxes */
                  selectionMode: M.SINGLE_SELECTION_DIALOG
                , initialText: M.I18N.l('noData')
                , label: M.I18N.l('position')
                , applyTheme: NO
                /* this seleciton view has no static entries, instead it is filled via content binding. */
                , contentBinding: {
                      target: DigiWebApp.BautagebuchZeitenDetailsController
                    , property: 'positionenList'
                }
                , events: {
                    change: {
                    	/* executed in scope of DOMWindow because no target defined */
                    	action: function(selectedValue, selectedItem) {
		      				DigiWebApp.BautagebuchZeitenDetailsController.set("positionId", M.ViewManager.getView('bautagebuchZeitenDetailsPage', 'positionComboBox').getSelection(YES).value);
		      				DigiWebApp.BautagebuchZeitenDetailsController.set("positionName", M.ViewManager.getView('bautagebuchZeitenDetailsPage', 'positionComboBox').getSelection(YES).label);
		      				DigiWebApp.BautagebuchZeitenDetailsController.setTaetigkeiten(M.ViewManager.getView('bautagebuchZeitenDetailsPage', 'positionComboBox').getSelection(YES).value);
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
                      target: DigiWebApp.BautagebuchZeitenDetailsController
                    , property: 'activityList'
                }
                , events: {
                    change: {
                    	/* executed in scope of DOMWindow because no target defined */
                    	action: function(selectedValue, selectedItem) {
		      				DigiWebApp.BautagebuchZeitenDetailsController.set("activityId", M.ViewManager.getView('bautagebuchZeitenDetailsPage', 'activityComboBox').getSelection(YES).value);
		      				DigiWebApp.BautagebuchZeitenDetailsController.set("activityName", M.ViewManager.getView('bautagebuchZeitenDetailsPage', 'activityComboBox').getSelection(YES).label);
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
                  target: DigiWebApp.BautagebuchZeitenDetailsController
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
	                        DigiWebApp.BautagebuchZeitenDetailsController.set("mitarbeiterIds", mitarbeiterIds);
	                        
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
	    					DigiWebApp.BautagebuchZeitenDetailsController.set("mitarbeiterListSelected", mitarbeiterArray);
            		}
                }
            }
        })
        
//        , GridVonBis: M.GridView.design({
//              childViews: 'vonInput bisInput'
//            , layout: M.TWO_COLUMNS
//            , vonInput: M.TextFieldView.design({
//	        	    label: M.I18N.l('bookingFrom')
//	        	  , inputType: M.INPUT_TIME
//	        	  , contentBindingReverse: {
//	                    target: DigiWebApp.BautagebuchZeitenDetailsController
//	                  , property: 'von'
//	              }
//	              , contentBinding: {
//	                    target: DigiWebApp.BautagebuchZeitenDetailsController
//	                  , property: 'von'
//	              }
//	          	  , events: {
//	          		  blur: {
//		          		  	action: function(id, event) {
//		    		  			try {
//		      		  				var myVon = D8.create("01.01.2000 " + DigiWebApp.BautagebuchZeitenDetailsController.von);
//		      		  				var myBis = D8.create("01.01.2000 " + DigiWebApp.BautagebuchZeitenDetailsController.bis);
//		      		  				var minutesInBetween = myVon.timeBetween(myBis, "minutes");
//		      		  				var hoursInBetween = Math.floor(minutesInBetween / 60);
//		      		  				var remainingMinutes = minutesInBetween % 60;
//		      		  				DigiWebApp.BautagebuchZeitenDetailsController.set("dauer", hoursInBetween.padLeft(2) + ":" + remainingMinutes.padLeft(2));
//		      		  			} catch(e) {}
//	          		  		}
//	          	  	  }
//	          	  }
//		    })
//	
//	        , bisInput: M.TextFieldView.design({
//	        	    label: M.I18N.l('bookingTo')
//	        	  , inputType: M.INPUT_TIME
//	        	  , contentBindingReverse: {
//	                    target: DigiWebApp.BautagebuchZeitenDetailsController
//	                  , property: 'bis'
//	              }
//	              , contentBinding: {
//	                    target: DigiWebApp.BautagebuchZeitenDetailsController
//	                  , property: 'bis'
//	              }
//	          	  , events: {
//	          		  blur: {
//		          		  	action: function(id, event) {
//	          		  			try {
//		      		  				var myVon = D8.create("01.01.2000 " + DigiWebApp.BautagebuchZeitenDetailsController.von);
//		      		  				var myBis = D8.create("01.01.2000 " + DigiWebApp.BautagebuchZeitenDetailsController.bis);
//		      		  				var minutesInBetween = myVon.timeBetween(myBis, "minutes");
//		      		  				var hoursInBetween = Math.floor(minutesInBetween / 60);
//		      		  				var remainingMinutes = minutesInBetween % 60;
//		      		  				DigiWebApp.BautagebuchZeitenDetailsController.set("dauer", hoursInBetween.padLeft(2) + ":" + remainingMinutes.padLeft(2));
//	          		  			} catch(e) {}
//	          		  		}
//	          	  	  }
//	          	  }
//	        })
//        })
                
//        , dauerInput: M.TextFieldView.design({
//	    	    label: M.I18N.l('bookingDuration')
//	    	  , cssClass: 'dauerInput'
//    		  , inputType: M.INPUT_TIME
//	    	  , contentBindingReverse: {
//	                target: DigiWebApp.BautagebuchZeitenDetailsController
//	              , property: 'dauer'
//	          }
//	          , contentBinding: {
//	                target: DigiWebApp.BautagebuchZeitenDetailsController
//	              , property: 'dauer'
//	          }
//	      	  , events: {
//	      		  tap: {
//	          		  	action: function(id, event) {
//	      		  				//$(DigiWebApp.BautagebuchZeitenDetailsPage.content.dauerInput).blur();
//	      		  		}
//	      	  	  }
//	      	  }
//      })
        
        , VonBisContainer: M.ContainerView.design({
    	      label: M.I18N.l('bookingFrom') + "/" + M.I18N.l('bookingTo')
			, childViews: 'plusGrid VonBisGrid minusGrid' 
			, plusGrid: M.GridView.design({
					  childViews: 'stundeVonPlusButton minuteVonPlusButton trennText stundeBisPlusButton minuteBisPlusButton'
					, layout: {
				          cssClass: 'vonbiscontainer'
				        , columns: {
				              0: 'column1'
				            , 1: 'column2'
				            , 2: 'column3'
				            , 3: 'column4'
				            , 4: 'column5'
				        }
				    }
					, stundeVonPlusButton: M.ButtonView.design({
		    	          value: "+"
		    	        , cssClass: 'plusMinusButton'
		    	        , events: {
		    	            tap: {
	    		    			action: function() {
									var myStunde = parseIntRadixTen($('#'+DigiWebApp.BautagebuchZeitenDetailsPage.content.VonBisContainer.VonBisGrid.stundeVonFeld.id)[0].value);
									var myMinute = parseIntRadixTen($('#'+DigiWebApp.BautagebuchZeitenDetailsPage.content.VonBisContainer.VonBisGrid.minuteVonFeld.id)[0].value);
  									myStunde = (myStunde + 1) % 24;
									var myStr = myStunde.padLeft(2,"0") + ":"+ myMinute.padLeft(2,"0");
									DigiWebApp.BautagebuchZeitenDetailsController.set('von', myStr);
									DigiWebApp.BautagebuchZeitenDetailsController.setVonBis();
								}
		    	            }
		    	          }
		    	    })
					, minuteVonPlusButton: M.ButtonView.design({
		    	          value: "+"
		    	        , cssClass: 'plusMinusButton'
		    	        , events: {
		    	            tap: {
	    		    			action: function() {
									var myStunde = parseIntRadixTen($('#'+DigiWebApp.BautagebuchZeitenDetailsPage.content.VonBisContainer.VonBisGrid.stundeVonFeld.id)[0].value);
									var myMinute = parseIntRadixTen($('#'+DigiWebApp.BautagebuchZeitenDetailsPage.content.VonBisContainer.VonBisGrid.minuteVonFeld.id)[0].value);
									var minuteSteps = 1;
									if (DigiWebApp.BautagebuchEinstellungenController.settings.in15MinutenSchritten) {
										minuteSteps = 15;
									}
									if ((myMinute + minuteSteps) > 59) {
  										myStunde = (myStunde + 1) % 24;										
									}
									myMinute = (myMinute + minuteSteps) % 60;
									var myStr = myStunde.padLeft(2,"0") + ":"+ myMinute.padLeft(2,"0");
									DigiWebApp.BautagebuchZeitenDetailsController.set('von', myStr);
									DigiWebApp.BautagebuchZeitenDetailsController.setVonBis();
		  						}
		    	            }
		    	          }
		    	    })
		    	    , trennText: M.LabelView.design({
		    	    	value: "&nbsp;"
		    	    })
					, stundeBisPlusButton: M.ButtonView.design({
		    	          value: "+"
		    	        , cssClass: 'plusMinusButton'
		    	        , events: {
		    	            tap: {
	    		    			action: function() {
									var myStunde = parseIntRadixTen($('#'+DigiWebApp.BautagebuchZeitenDetailsPage.content.VonBisContainer.VonBisGrid.stundeBisFeld.id)[0].value);
									var myMinute = parseIntRadixTen($('#'+DigiWebApp.BautagebuchZeitenDetailsPage.content.VonBisContainer.VonBisGrid.minuteBisFeld.id)[0].value);
  									myStunde = (myStunde + 1) % 24;
									var myStr = myStunde.padLeft(2,"0") + ":"+ myMinute.padLeft(2,"0");
									DigiWebApp.BautagebuchZeitenDetailsController.set('bis', myStr);
									DigiWebApp.BautagebuchZeitenDetailsController.setVonBis();
								}
		    	            }
		    	          }
		    	    })
					, minuteBisPlusButton: M.ButtonView.design({
		    	          value: "+"
		    	        , cssClass: 'plusMinusButton'
		    	        , events: {
		    	            tap: {
	    		    			action: function() {
									var myStunde = parseIntRadixTen($('#'+DigiWebApp.BautagebuchZeitenDetailsPage.content.VonBisContainer.VonBisGrid.stundeBisFeld.id)[0].value);
									var myMinute = parseIntRadixTen($('#'+DigiWebApp.BautagebuchZeitenDetailsPage.content.VonBisContainer.VonBisGrid.minuteBisFeld.id)[0].value);
									var minuteSteps = 1;
									if (DigiWebApp.BautagebuchEinstellungenController.settings.in15MinutenSchritten) {
										minuteSteps = 15;
									}
									if ((myMinute + minuteSteps) > 59) {
	  									myStunde = (myStunde + 1) % 24;
									}
									myMinute = (myMinute + minuteSteps) % 60;
									var myStr = myStunde.padLeft(2,"0") + ":"+ myMinute.padLeft(2,"0");
									DigiWebApp.BautagebuchZeitenDetailsController.set('bis', myStr);
									DigiWebApp.BautagebuchZeitenDetailsController.setVonBis();
		  						}
		    	            }
		    	          }
		    	    })
			})
			, VonBisGrid: M.GridView.design({
				  childViews: 'stundeVonFeld minuteVonFeld trennText stundeBisFeld minuteBisFeld'
				, layout: {
			          cssClass: 'vonbiscontainer'
			        , columns: {
			              0: 'column1'
			            , 1: 'column2'
			            , 2: 'column3'
			            , 3: 'column4'
			            , 4: 'column5'
			        }
			    }
				, stundeVonFeld: M.TextFieldView.design({
					cssClass: 'startUhrzeit'
		    	  , inputType: M.INPUT_TEXT
		        })
				, minuteVonFeld: M.TextFieldView.design({
					cssClass: 'startUhrzeit'
		    	  , inputType: M.INPUT_TEXT
		        })
		        , trennText: M.LabelView.design({
		    	    	value: "-"
		    	})
				, stundeBisFeld: M.TextFieldView.design({
					cssClass: 'startUhrzeit'
		    	  , inputType: M.INPUT_TEXT
		        })
				, minuteBisFeld: M.TextFieldView.design({
					cssClass: 'startUhrzeit'
		    	  , inputType: M.INPUT_TEXT
		        })
			})
			, minusGrid: M.GridView.design({
				  childViews: 'stundeVonMinusButton minuteVonMinusButton trennText stundeBisMinusButton minuteBisMinusButton'
				, layout: {
			          cssClass: 'vonbiscontainer'
			        , columns: {
			              0: 'column1'
			            , 1: 'column2'
			            , 2: 'column3'
			            , 3: 'column4'
			            , 4: 'column5'
			        }
			    }
				, stundeVonMinusButton: M.ButtonView.design({
	    	          value: "-"
	    	        , cssClass: 'plusMinusButton'
	    	        , events: {
	    	            tap: {
  		    				action: function() {
								var myStunde = parseIntRadixTen($('#'+DigiWebApp.BautagebuchZeitenDetailsPage.content.VonBisContainer.VonBisGrid.stundeVonFeld.id)[0].value);
								var myMinute = parseIntRadixTen($('#'+DigiWebApp.BautagebuchZeitenDetailsPage.content.VonBisContainer.VonBisGrid.minuteVonFeld.id)[0].value);
								myStunde = myStunde - 1;
								if (myStunde < 0) {
									myStunde = 23;
								}
								var myStr = myStunde.padLeft(2,"0") + ":"+ myMinute.padLeft(2,"0");
								DigiWebApp.BautagebuchZeitenDetailsController.set('von', myStr);
								DigiWebApp.BautagebuchZeitenDetailsController.setVonBis();
	  						}
	    	            }
	    	          }
	    	    })
	    	    , minuteVonMinusButton: M.ButtonView.design({
	    	          value: "-"
	    	        , cssClass: 'plusMinusButton'
	    	        , events: {
	    	            tap: {
  		    				action: function() {
								var myStunde = parseIntRadixTen($('#'+DigiWebApp.BautagebuchZeitenDetailsPage.content.VonBisContainer.VonBisGrid.stundeVonFeld.id)[0].value);
								var myMinute = parseIntRadixTen($('#'+DigiWebApp.BautagebuchZeitenDetailsPage.content.VonBisContainer.VonBisGrid.minuteVonFeld.id)[0].value);
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
								var myStr = myStunde.padLeft(2,"0") + ":"+ myMinute.padLeft(2,"0");
								DigiWebApp.BautagebuchZeitenDetailsController.set('von', myStr);
								DigiWebApp.BautagebuchZeitenDetailsController.setVonBis();
	  						}
	    	            }
	    	          }
	    	    })
	    	    , trennText: M.LabelView.design({
	    	    	value: "&nbsp;"
	    	    })
				, stundeBisMinusButton: M.ButtonView.design({
	    	          value: "-"
	    	        , cssClass: 'plusMinusButton'
	    	        , events: {
	    	            tap: {
		    				action: function() {
								var myStunde = parseIntRadixTen($('#'+DigiWebApp.BautagebuchZeitenDetailsPage.content.VonBisContainer.VonBisGrid.stundeBisFeld.id)[0].value);
								var myMinute = parseIntRadixTen($('#'+DigiWebApp.BautagebuchZeitenDetailsPage.content.VonBisContainer.VonBisGrid.minuteBisFeld.id)[0].value);
								myStunde = myStunde - 1;
								if (myStunde < 0) {
									myStunde = 23;
								}
								var myStr = myStunde.padLeft(2,"0") + ":"+ myMinute.padLeft(2,"0");
								DigiWebApp.BautagebuchZeitenDetailsController.set('bis', myStr);
								DigiWebApp.BautagebuchZeitenDetailsController.setVonBis();
	  						}
	    	            }
	    	          }
	    	    })
	    	    , minuteBisMinusButton: M.ButtonView.design({
	    	          value: "-"
	    	        , cssClass: 'plusMinusButton'
	    	        , events: {
	    	            tap: {
		    				action: function() {
								var myStunde = parseIntRadixTen($('#'+DigiWebApp.BautagebuchZeitenDetailsPage.content.VonBisContainer.VonBisGrid.stundeBisFeld.id)[0].value);
								var myMinute = parseIntRadixTen($('#'+DigiWebApp.BautagebuchZeitenDetailsPage.content.VonBisContainer.VonBisGrid.minuteBisFeld.id)[0].value);
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
								var myStr = myStunde.padLeft(2,"0") + ":"+ myMinute.padLeft(2,"0");
								DigiWebApp.BautagebuchZeitenDetailsController.set('bis', myStr);
								DigiWebApp.BautagebuchZeitenDetailsController.setVonBis();
	  						}
	    	            }
	    	          }
	    	    })
			})
		})
        
        , dauerContainer: M.ContainerView.design({
    	      label: M.I18N.l('bookingDuration')
			, childViews: 'plusGrid dauerGrid minusGrid' 
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
									var myStunde = parseIntRadixTen($('#'+DigiWebApp.BautagebuchZeitenDetailsPage.content.dauerContainer.dauerGrid.stundeFeld.id)[0].value);
									var myMinute = parseIntRadixTen($('#'+DigiWebApp.BautagebuchZeitenDetailsPage.content.dauerContainer.dauerGrid.minuteFeld.id)[0].value);
									myStunde = myStunde + 1;
									var dauerStr = myStunde.padLeft(2,"0") + ":"+ myMinute.padLeft(2,"0");
									DigiWebApp.BautagebuchZeitenDetailsController.set('dauer', dauerStr);
									DigiWebApp.BautagebuchZeitenDetailsController.setDauer();
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
									var myStunde = parseIntRadixTen($('#'+DigiWebApp.BautagebuchZeitenDetailsPage.content.dauerContainer.dauerGrid.stundeFeld.id)[0].value);
									var myMinute = parseIntRadixTen($('#'+DigiWebApp.BautagebuchZeitenDetailsPage.content.dauerContainer.dauerGrid.minuteFeld.id)[0].value);
									var minuteSteps = 1;
									if (DigiWebApp.BautagebuchEinstellungenController.settings.in15MinutenSchritten) {
										minuteSteps = 15;
									}
									if ((myMinute + minuteSteps) > 59) {
										myStunde = myStunde + 1;										
									}
									myMinute = (myMinute + minuteSteps) % 60;
									var dauerStr = myStunde.padLeft(2,"0") + ":"+ myMinute.padLeft(2,"0");
									DigiWebApp.BautagebuchZeitenDetailsController.set('dauer', dauerStr);
									DigiWebApp.BautagebuchZeitenDetailsController.setDauer();
		  						}
		    	            }
		    	          }
		    	    })
			})
			, dauerGrid: M.GridView.design({
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
								var myStunde = parseIntRadixTen($('#'+DigiWebApp.BautagebuchZeitenDetailsPage.content.dauerContainer.dauerGrid.stundeFeld.id)[0].value);
								var myMinute = parseIntRadixTen($('#'+DigiWebApp.BautagebuchZeitenDetailsPage.content.dauerContainer.dauerGrid.minuteFeld.id)[0].value);
								myStunde = myStunde - 1;
								if (myStunde < 0) {
									myStunde = 0;
								}
								var dauerStr = myStunde.padLeft(2,"0") + ":"+ myMinute.padLeft(2,"0");
								DigiWebApp.BautagebuchZeitenDetailsController.set('dauer', dauerStr);
								DigiWebApp.BautagebuchZeitenDetailsController.setDauer();
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
								var myStunde = parseIntRadixTen($('#'+DigiWebApp.BautagebuchZeitenDetailsPage.content.dauerContainer.dauerGrid.stundeFeld.id)[0].value);
								var myMinute = parseIntRadixTen($('#'+DigiWebApp.BautagebuchZeitenDetailsPage.content.dauerContainer.dauerGrid.minuteFeld.id)[0].value);
								var minuteSteps = 1;
								if (DigiWebApp.BautagebuchEinstellungenController.settings.in15MinutenSchritten) {
									minuteSteps = 15;
								}
								if ((myMinute - minuteSteps) < 0 && myStunde > 0) {
									myStunde = myStunde - 1;
									myMinute = 60;
								}
								myMinute = (myMinute - minuteSteps) % 60;
								if (myMinute < 0) {
									myMinute = 0;
								}
								var dauerStr = myStunde.padLeft(2,"0") + ":"+ myMinute.padLeft(2,"0");
								DigiWebApp.BautagebuchZeitenDetailsController.set('dauer', dauerStr);
								DigiWebApp.BautagebuchZeitenDetailsController.setDauer();
	  						}
	    	            }
	    	          }
	    	    })
			})
		})

		, remarkInput: M.TextFieldView.design({
              label: M.I18N.l('remark')
            , cssClass: 'remarkInput'
            , cssClassOnInit: 'remarkInputInitial'
            , initialText: "max. 255 " + M.I18N.l('characters')
            , hasMultipleLines: YES
//            , contentBinding: {
//		            target: DigiWebApp.BautagebuchZeitenDetailsController
//		          , property: 'remark'
//		    }
   	        , events: {
        		keyup: {
	                /* executed in scope of DOMWindow because no target defined */
	            	action: function(selectedValue, selectedItem) {
						var myValue = M.ViewManager.getView('bautagebuchZeitenDetailsPage', 'remarkInput').getValue();
						if (myValue.length <= 255) {
							DigiWebApp.BautagebuchZeitenDetailsController.set("remark", M.ViewManager.getView('bautagebuchZeitenDetailsPage', 'remarkInput').getValue());
						} else {
							M.ViewManager.getView('bautagebuchZeitenDetailsPage', 'remarkInput').setValue(DigiWebApp.BautagebuchZeitenDetailsController.remark);
				            DigiWebApp.ApplicationController.nativeAlertDialogView({
				                title: M.I18N.l('maximaleFeldlaengeErreicht')
				              , message: M.I18N.l('maximaleFeldlaengeErreichtMsg')
				            });
						}
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
		                target: DigiWebApp.BautagebuchZeitenDetailsController,
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
          , events: {
              tap: {
	                target: DigiWebApp.BautagebuchZeitenDetailsController,
	                action: function() {
        				try{DigiWebApp.ApplicationController.vibrate();}catch(e2){}
        				this.deleteZeitbuchung();
        			}
              }
          }
      })

    })

});

