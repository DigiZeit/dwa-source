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
						if (DigiWebApp.BautagebuchZeitenDetailsController.positionId) {
							o.isSelected = (o.value === DigiWebApp.BautagebuchZeitenDetailsController.positionId);
							if (o.isSelected) { itemSelected = YES }
						}
			            return o;
			    	}
			    });
			    positionenArray = _.compact(positionenArray);
			    if (positionenArray.length !== 1) {
			    	positionenArray.push({label: M.I18N.l('selectSomething'), value: '0', isSelected: !itemSelected});
			    } else {
			    	DigiWebApp.BautagebuchZeitenDetailsController.set("positionId", positionenArray[0].value)
			    	DigiWebApp.BautagebuchZeitenDetailsController.set("positionName", positionenArray[0].label)
			    }
				DigiWebApp.BautagebuchZeitenDetailsController.set("positionenList", positionenArray)
				
				DigiWebApp.BautagebuchZeitenDetailsController.setTaetigkeiten(DigiWebApp.BautagebuchZeitenDetailsController.positionId);
				
				// im Bautagesbericht verfügbare Mitarbeiter kopieren und ausgewählte selektieren
                var mitarbeiterIds = DigiWebApp.BautagebuchZeitenDetailsController.mitarbeiterIds; 
                var mitarbeiterList = [];
                var mitarbeiterArray = mitarbeiterList;
				mitarbeiterArray = _.map(JSON.parse(JSON.stringify(DigiWebApp.BautagebuchBautageberichtDetailsController.mitarbeiterListSelected)), function(o) {
					var mitarbeiterSelected = NO;
					_.each(mitarbeiterIds, function(m) {
						if (m === o.value) {
							mitarbeiterSelected = YES;
						}
					});
					o.isSelected = (mitarbeiterSelected === YES);
					return o;
    			});
				mitarbeiterArray = _.compact(mitarbeiterArray);
				DigiWebApp.BautagebuchZeitenDetailsController.set("mitarbeiterList", mitarbeiterArray);
				
				if (DigiWebApp.BautagebuchEinstellungen.find()[0].get("inStundenBuchen")) {
					try{$('[id=' + DigiWebApp.BautagebuchZeitenDetailsPage.content.GridVonBis.id  + ']').each(function() { $(this).hide(); });}catch(e){};
					try{$('label[for=' + DigiWebApp.BautagebuchZeitenDetailsPage.content.dauerInput.id  + ']').each(function() { $(this).show(); });}catch(e){};
					try{$('[id=' + DigiWebApp.BautagebuchZeitenDetailsPage.content.dauerInput.id  + ']').each(function() { $(this).show(); });}catch(e){};
				} else {
					try{$('[id=' + DigiWebApp.BautagebuchZeitenDetailsPage.content.GridVonBis.id  + ']').each(function() { $(this).show(); });}catch(e){};
					try{$('label[for=' + DigiWebApp.BautagebuchZeitenDetailsPage.content.dauerInput.id  + ']').each(function() { $(this).hide(); });}catch(e){};
					try{$('[id=' + DigiWebApp.BautagebuchZeitenDetailsPage.content.dauerInput.id  + ']').each(function() { $(this).hide(); });}catch(e){};
				}
				
//		  		if (DigiWebApp.SettingsController.getSetting('bautagebuchLimit_autoStartUhrzeit')) {
//					$(DigiWebApp.BautagebuchBautageberichtDetailsPage.content.startUhrzeit.startUhrzeitInput)[0].disable();
//				} else {
//					$(DigiWebApp.BautagebuchBautageberichtDetailsPage.content.startUhrzeit.startUhrzeitInput)[0].enable();
//				}
				
				if (DigiWebApp.BautagebuchBautageberichtDetailsController.item.get("abgeschlossen")) {
					$("#" + DigiWebApp.BautagebuchZeitenDetailsPage.content.grid.id).hide();
					$("#" + DigiWebApp.BautagebuchZeitenDetailsPage.header.delButton.id).hide();
				} else {
					$("#" + DigiWebApp.BautagebuchZeitenDetailsPage.content.grid.id).show();
					$("#" + DigiWebApp.BautagebuchZeitenDetailsPage.header.delButton.id).show();
				}


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
                    //, action: 'backToBautagebuchZeitenListePageTransition'
        			action: function() {navigator.notification.vibrate(200); history.back();}
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
            , events: {
                tap: {
                      target: DigiWebApp.BautagebuchZeitenDetailsController
                    , action: 'deleteZeitbuchung'
                }
            }
        })
        , anchorLocation: M.TOP
    })

    , content: M.ScrollView.design({

    	  childViews: 'positionComboBox activityComboBox mitarbeiterGroup GridVonBis dauerInput grid'
        	  
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
        
        , GridVonBis: M.GridView.design({
              childViews: 'vonInput bisInput'
            , layout: M.TWO_COLUMNS
            , vonInput: M.TextFieldView.design({
	        	    label: M.I18N.l('bookingFrom')
	        	  , contentBindingReverse: {
	                    target: DigiWebApp.BautagebuchZeitenDetailsController
	                  , property: 'von'
	              }
	              , contentBinding: {
	                    target: DigiWebApp.BautagebuchZeitenDetailsController
	                  , property: 'von'
	              }
	          	  , events: {
	          		  tap: {
		          		  	action: function(id, event) {
	          		  				$(DigiWebApp.BautagebuchZeitenDetailsPage.content.vonInput).blur();
					          		M.DatePickerView.show({
					          		      source: M.ViewManager.getView('bautagebuchZeitenDetailsPage', 'vonInput')
					          		    , initialDate: D8.create(DigiWebApp.BautagebuchBautageberichtDetailsController.item.get("datum") + " " + DigiWebApp.BautagebuchBautageberichtDetailsController.startUhrzeit)
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
						      						DigiWebApp.BautagebuchZeitenDetailsController.set("von", value);
						      						DigiWebApp.BautagebuchZeitenDetailsController.set("timeStampStart", D8.create(DigiWebApp.BautagebuchBautageberichtDetailsController.item.get("datum") + " " + value).getTimestamp());
						      						if (DigiWebApp.BautagebuchZeitenDetailsController.get("von") !== null && DigiWebApp.BautagebuchZeitenDetailsController.get("bis") !== null) {
						      							// dauer kann berechnet werden
						      							try {
						      								var myVon = D8.create(DigiWebApp.BautagebuchBautageberichtDetailsController.item.get("datum") + " " + DigiWebApp.BautagebuchZeitenDetailsController.get("von"));
						      								var myBis = D8.create(DigiWebApp.BautagebuchBautageberichtDetailsController.item.get("datum") + " " + DigiWebApp.BautagebuchZeitenDetailsController.get("bis"));
						      								if (myVon.getTimestamp() <= myBis.getTimestamp() || DigiWebApp.BautagebuchEinstellungen.find()[0].get("falscheZeitenIgnorieren")) {
						      									var myDauerInMinuten = myVon.timeBetween(myBis) / 60000;
						      									var myDauerStunden = parseInt(myDauerInMinuten / 60);
						      									var myDauerMinuten = parseInt(myDauerInMinuten % 60);
						      									var myDauer = D8.create(DigiWebApp.BautagebuchBautageberichtDetailsController.item.get("datum") + " " + myDauerStunden + ":" + myDauerMinuten).format("HH:MM");
						      									DigiWebApp.BautagebuchZeitenDetailsController.set("dauer", myDauer);
						      								}
						      							} catch(e){}
						      						}
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
	
	        , bisInput: M.TextFieldView.design({
	        	    label: M.I18N.l('bookingTo')
	        	  , contentBindingReverse: {
	                    target: DigiWebApp.BautagebuchZeitenDetailsController
	                  , property: 'bis'
	              }
	              , contentBinding: {
	                    target: DigiWebApp.BautagebuchZeitenDetailsController
	                  , property: 'bis'
	              }
	          	  , events: {
	          		  tap: {
		          		  	action: function(id, event) {
	          		  				$(DigiWebApp.BautagebuchZeitenDetailsPage.content.bisInput).blur();
					          		M.DatePickerView.show({
					          		      source: M.ViewManager.getView('bautagebuchZeitenDetailsPage', 'bisInput')
					          		    , initialDate: D8.create(DigiWebApp.BautagebuchBautageberichtDetailsController.item.get("datum") + " " + DigiWebApp.BautagebuchBautageberichtDetailsController.startUhrzeit)
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
						      						DigiWebApp.BautagebuchZeitenDetailsController.set("bis", value);
						      						DigiWebApp.BautagebuchZeitenDetailsController.set("timeStampEnd", D8.create(DigiWebApp.BautagebuchBautageberichtDetailsController.item.get("datum") + " " + value).getTimestamp());
						      						if (DigiWebApp.BautagebuchZeitenDetailsController.get("von") !== null && DigiWebApp.BautagebuchZeitenDetailsController.get("bis") !== null) {
						      							// dauer kann berechnet werden
						      							try {
						      								var myVon = D8.create(DigiWebApp.BautagebuchBautageberichtDetailsController.item.get("datum") + " " + DigiWebApp.BautagebuchZeitenDetailsController.get("von"));
						      								var myBis = D8.create(DigiWebApp.BautagebuchBautageberichtDetailsController.item.get("datum") + " " + DigiWebApp.BautagebuchZeitenDetailsController.get("bis"));
						      								if (myVon.getTimestamp() <= myBis.getTimestamp() || DigiWebApp.BautagebuchEinstellungen.find()[0].get("falscheZeitenIgnorieren")) {
						      									var myDauerInMinuten = myVon.timeBetween(myBis) / 60000;
						      									var myDauerStunden = parseInt(myDauerInMinuten / 60);
						      									var myDauerMinuten = parseInt(myDauerInMinuten % 60);
						      									var myDauer = D8.create(DigiWebApp.BautagebuchBautageberichtDetailsController.item.get("datum") + " " + myDauerStunden + ":" + myDauerMinuten).format("HH:MM");
							      								DigiWebApp.BautagebuchZeitenDetailsController.set("dauer", myDauer);
						      								}
						      							} catch(e){}
						      						}
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
                
        , dauerInput: M.TextFieldView.design({
	    	    label: M.I18N.l('bookingDuration')
	    	  , cssClass: 'dauerInput'
	    	  , contentBindingReverse: {
	                target: DigiWebApp.BautagebuchZeitenDetailsController
	              , property: 'dauer'
	          }
	          , contentBinding: {
	                target: DigiWebApp.BautagebuchZeitenDetailsController
	              , property: 'dauer'
	          }
	      	  , events: {
	      		  tap: {
	          		  	action: function(id, event) {
	      		  				$(DigiWebApp.BautagebuchZeitenDetailsPage.content.dauerInput).blur();
				          		M.DatePickerView.show({
				          		      source: M.ViewManager.getView('bautagebuchZeitenDetailsPage', 'dauerInput')
				          		    , initialDate: D8.create(DigiWebApp.BautagebuchBautageberichtDetailsController.item.get("datum") + " 00:00:00")
				          		    , showTimePicker: YES
				          		    , showDatePicker: NO
				          		    , showAmPm: NO
					    		    , dateOrder: 'ddmmyy'
				          		    , dateFormat: "dd.mm.yy"
				          		    , timeFormat: "HH:ii"
				          		    , minutesLabel: M.I18N.l('minutes')
				          		    , hoursLabel: M.I18N.l('hours')
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
					      						DigiWebApp.BautagebuchZeitenDetailsController.set("dauer", value);
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
                  value: M.I18N.l('assume')
                , cssClass: 'digiButton'
                , anchorLocation: M.RIGHT
                , events: {
                    tap: {
		                target: DigiWebApp.BautagebuchZeitenDetailsController,
		                action: 'save'
                    }
                }
            })
            , icon: M.ImageView.design({
                value: 'theme/images/icon_bookTime.png'
            })
        })

    })

});

