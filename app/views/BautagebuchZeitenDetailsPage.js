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
						if (relevantDetailsController.positionId) {
							o.isSelected = (o.value === relevantDetailsController.positionId);
							if (o.isSelected) { itemSelected = YES; }
						}
			            return o;
			    	}
			    });
			    if (!itemSelected && DigiWebApp.BautagebuchEinstellungenController.settings.positionVorselektieren) {
				    positionenArray = _.map(positionenArray, function(o) {
						if (DigiWebApp.BautagebuchBautageberichtDetailsController.positionId) {
							o.isSelected = (o.value === DigiWebApp.BautagebuchBautageberichtDetailsController.positionId);
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
				mitarbeiterArray = _.map(JSON.parse(JSON.stringify(DigiWebApp.BautagebuchBautageberichtDetailsController.mitarbeiterListSelected)), function(o) {
					var mitarbeiterSelected = NO;
					_.each(mitarbeiterIds, function(m) {
						if (parseInt(m) === parseInt(o.value)) {
							mitarbeiterSelected = YES;
						}
					});
					o.isSelected = (mitarbeiterSelected === YES);
					return o;
    			});
				mitarbeiterArray = _.compact(mitarbeiterArray);
				DigiWebApp.BautagebuchZeitenDetailsController.set("mitarbeiterList", mitarbeiterArray);
				
				if (DigiWebApp.BautagebuchEinstellungen.find()[0].get("inStundenBuchen")) {
					try{$('[id=' + DigiWebApp.BautagebuchZeitenDetailsPage.content.GridVonBis.id  + ']').each(function() { $(this).hide(); });}catch(e2){}
					//try{$('label[for=' + DigiWebApp.BautagebuchZeitenDetailsPage.content.dauerInput.id  + ']').each(function() { $(this).show(); $(this).parent().removeClass("transparent");});}catch(e3){}
					try{$('[id=' + DigiWebApp.BautagebuchZeitenDetailsPage.content.dauerInput.id  + ']').each(function() { $(this).show(); $(this).parent().removeClass("transparent");});}catch(e4){}
				} else {
					try{$('[id=' + DigiWebApp.BautagebuchZeitenDetailsPage.content.GridVonBis.id  + ']').each(function() { $(this).show(); });}catch(e5){}
					//try{$('label[for=' + DigiWebApp.BautagebuchZeitenDetailsPage.content.dauerInput.id  + ']').each(function() { $(this).hide(); $(this).parent().addClass("transparent");});}catch(e6){}
					try{$('[id=' + DigiWebApp.BautagebuchZeitenDetailsPage.content.dauerInput.id  + ']').each(function() { $(this).hide(); $(this).parent().addClass("transparent");});}catch(e7){}
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
        			action: function() {try{DigiWebApp.ApplicationController.vibrate();}catch(e8){} history.back();}
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
                    , action: function() {try{DigiWebApp.ApplicationController.vibrate();}catch(e9){} this.deleteZeitbuchung();}
                }
            }
        })
        , anchorLocation: M.TOP
    })

    , content: M.ScrollView.design({

    	  childViews: 'positionComboBox activityComboBox mitarbeiterGroup GridVonBis dauerInput remarkInput grid'
        	  
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
	        	  , inputType: M.INPUT_TIME
	        	  , contentBindingReverse: {
	                    target: DigiWebApp.BautagebuchZeitenDetailsController
	                  , property: 'von'
	              }
	              , contentBinding: {
	                    target: DigiWebApp.BautagebuchZeitenDetailsController
	                  , property: 'von'
	              }
	          	  , events: {
	          		  blur: {
		          		  	action: function(id, event) {
		    		  			try {
		      		  				var myVon = D8.create("01.01.2000 " + DigiWebApp.BautagebuchZeitenDetailsController.von);
		      		  				var myBis = D8.create("01.01.2000 " + DigiWebApp.BautagebuchZeitenDetailsController.bis);
		      		  				var minutesInBetween = myVon.timeBetween(myBis, "minutes");
		      		  				var hoursInBetween = Math.floor(minutesInBetween / 60);
		      		  				var remainingMinutes = minutesInBetween % 60;
		      		  				DigiWebApp.BautagebuchZeitenDetailsController.set("dauer", hoursInBetween.padLeft(2) + ":" + remainingMinutes.padLeft(2));
		      		  			} catch(e) {}
	          		  		}
	          	  	  }
	          	  }
		    })
	
	        , bisInput: M.TextFieldView.design({
	        	    label: M.I18N.l('bookingTo')
	        	  , inputType: M.INPUT_TIME
	        	  , contentBindingReverse: {
	                    target: DigiWebApp.BautagebuchZeitenDetailsController
	                  , property: 'bis'
	              }
	              , contentBinding: {
	                    target: DigiWebApp.BautagebuchZeitenDetailsController
	                  , property: 'bis'
	              }
	          	  , events: {
	          		  blur: {
		          		  	action: function(id, event) {
	          		  			try {
		      		  				var myVon = D8.create("01.01.2000 " + DigiWebApp.BautagebuchZeitenDetailsController.von);
		      		  				var myBis = D8.create("01.01.2000 " + DigiWebApp.BautagebuchZeitenDetailsController.bis);
		      		  				var minutesInBetween = myVon.timeBetween(myBis, "minutes");
		      		  				var hoursInBetween = Math.floor(minutesInBetween / 60);
		      		  				var remainingMinutes = minutesInBetween % 60;
		      		  				DigiWebApp.BautagebuchZeitenDetailsController.set("dauer", hoursInBetween.padLeft(2) + ":" + remainingMinutes.padLeft(2));
	          		  			} catch(e) {}
	          		  		}
	          	  	  }
	          	  }
	        })
        })
                
        , dauerInput: M.TextFieldView.design({
	    	    label: M.I18N.l('bookingDuration')
	    	  , cssClass: 'dauerInput'
    		  , inputType: M.INPUT_TIME
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
	      		  				//$(DigiWebApp.BautagebuchZeitenDetailsPage.content.dauerInput).blur();
	      		  		}
	      	  	  }
	      	  }
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

