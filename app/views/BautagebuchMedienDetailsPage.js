// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: DigiWebApp
// View: BautagebuchMedienDetailsPage
// ==========================================================================

DigiWebApp.BautagebuchMedienDetailsPage = M.PageView.design({

      events: {
		  pagebeforeshow: {
            action: function() {
				// verfügbare Positionen kopieren und ausgewählte selektieren
				var itemSelected = NO;
//				var myPositionenList = JSON.parse(JSON.stringify(DigiWebApp.BautagebuchBautageberichtDetailsController.positionenList));
//				_.each(myPositionenList, function(p) {
//					if (parseIntRadixTen(p.value) !== 0) {
//						p.isSelected = NO;
//					} else {
//						p.isSelected = YES;
//					}
//				});
//			    var positionenArray = _.map(myPositionenList, function(o) {
//			    	if ( typeof(o) === "undefined" ) {
//			    		console.log("UNDEFINED position");
//			    	} else {    
//						if (DigiWebApp.BautagebuchMedienDetailsController.positionId) {
//							o.isSelected = (o.value === DigiWebApp.BautagebuchMedienDetailsController.positionId);
//							if (o.isSelected) { itemSelected = YES; }
//						}
//			            return o;
//			    	}
//			    });
//			    positionenArray = _.compact(positionenArray);
//			    if (positionenArray.length !== 1) {
//			    	positionenArray.push({label: M.I18N.l('selectSomething'), value: '0', isSelected: !itemSelected});
//			    } else {
//			    	DigiWebApp.BautagebuchMedienDetailsController.set("positionId", positionenArray[0].value);
//			    	DigiWebApp.BautagebuchMedienDetailsController.set("positionName", positionenArray[0].label);
//			    }
//			    if (positionenArray.length == 1) {
//			    	positionenArray[0].isSelected = YES;
//			    }
//				DigiWebApp.BautagebuchMedienDetailsController.set("positionenList", positionenArray);
//				
//				DigiWebApp.BautagebuchMedienDetailsController.setTaetigkeiten(DigiWebApp.BautagebuchMedienDetailsController.positionId);
				var relevantDetailsController = DigiWebApp.BautagebuchMedienDetailsController;
				var myPositionenList = JSON.parse(JSON.stringify(DigiWebApp.BautagebuchBautageberichtDetailsController.positionenList));
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

				M.ViewManager.getView('bautagebuchMedienDetailsPage', 'remarkInput').setValue(DigiWebApp.BautagebuchMedienDetailsController.remark);
				$('#' + DigiWebApp.BautagebuchMedienDetailsPage.content.remarkInput.id)[0].focus();
				$('#' + DigiWebApp.BautagebuchMedienDetailsPage.content.remarkInput.id)[0].blur();

				if (DigiWebApp.BautagebuchBautageberichtDetailsController.item.get("abgeschlossen")) {
					$("#" + DigiWebApp.BautagebuchMedienDetailsPage.content.grid.id).hide();
					$("#" + DigiWebApp.BautagebuchMedienDetailsPage.header.delButton.id).hide();
				} else {
					$("#" + DigiWebApp.BautagebuchMedienDetailsPage.content.grid.id).show();
					$("#" + DigiWebApp.BautagebuchMedienDetailsPage.header.delButton.id).show();
				}
				
				$('#' + DigiWebApp.BautagebuchMedienDetailsPage.content.activityComboBox.id + "_container").hide();

            	if (relevantDetailsController.get('handOrderId')) {
            		$('#' + DigiWebApp.BautagebuchMedienDetailsPage.content.positionComboBox.id + "_container").hide();
            	} else {
            		$('#' + DigiWebApp.BautagebuchMedienDetailsPage.content.positionComboBox.id + "_container").show();
            	}
			}
        }
		, pageshow: {
		    action: function() {
				$('#' + DigiWebApp.BautagebuchMedienDetailsPage.content.remarkInput.id)[0].focus();
				$('#' + DigiWebApp.BautagebuchMedienDetailsPage.content.remarkInput.id)[0].blur();
			}
		}
		, pagehide: {
		    action: function() {
				// reset auto-grow
				M.ViewManager.getView('bautagebuchMedienDetailsPage', 'remarkInput').setCssProperty("height","50px");
			}
		}
    }
	
    , cssClass: 'bautagebuchMedienDetailsPage'

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
                    //, action: 'backToBautagebuchMedienListePageTransition'
        			action: function() {try{DigiWebApp.ApplicationController.vibrate();}catch(e2){} 
        				history.back();
        			}
                }
            }
        })
        , title: M.LabelView.design({
              value: M.I18N.l('BautagebuchMedium')
            , anchorLocation: M.CENTER
        })
        , delButton: M.ButtonView.design({
              value: M.I18N.l('BautagebuchDelete')
            , icon: 'delete'
            , anchorLocation: M.RIGHT
            , cssClass: 'red_background'
            , events: {
                tap: {
                      target: DigiWebApp.BautagebuchMedienDetailsController
                    , action: function() {try{DigiWebApp.ApplicationController.vibrate();}catch(e3){} 
                    	this.deleteMedienBuchung();
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
                      target: DigiWebApp.BautagebuchMedienDetailsController
                    , action: function() {try{DigiWebApp.ApplicationController.vibrate();}catch(e3){} 
                    	//this.deleteMedienBuchung();
                    	DigiWebApp.NavigationController.backToBautagebuchMedienListePageTransition();
                    }
                }
            }
        })
        , anchorLocation: M.TOP
    })

    , content: M.ScrollView.design({

    	  childViews: 'positionComboBox activityComboBox image remarkInput grid loeschenButton'
        	  
        , cssClass: 'content'
    	
        , image: M.ImageView.design({
      		  value: ''
      		, cssClass: 'photo'
        })
        
        , remarkInput: M.TextFieldView.design({
              label: M.I18N.l('remark')
            , cssClass: 'remarkInput'
            , cssClassOnInit: 'remarkInputInitial'
            , initialText: "max. 255 " + M.I18N.l('characters')
            , hasMultipleLines: YES
   	        , events: {
        		keyup: {
	                /* executed in scope of DOMWindow because no target defined */
	            	action: function(selectedValue, selectedItem) {
						var myValue = M.ViewManager.getView('bautagebuchMedienDetailsPage', 'remarkInput').getValue();
						if (myValue.length <= 255) {
							DigiWebApp.BautagebuchMedienDetailsController.set("remark", M.ViewManager.getView('bautagebuchMedienDetailsPage', 'remarkInput').getValue());
						} else {
							M.ViewManager.getView('bautagebuchMedienDetailsPage', 'remarkInput').setValue(DigiWebApp.BautagebuchMedienDetailsController.remark);
				            DigiWebApp.ApplicationController.nativeAlertDialogView({
				                title: M.I18N.l('maximaleFeldlaengeErreicht')
				              , message: M.I18N.l('maximaleFeldlaengeErreichtMsg')
				            });
						}
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
                      target: DigiWebApp.BautagebuchMedienDetailsController
                    , property: 'positionenList'
                }
                , events: {
                    change: {
                    	/* executed in scope of DOMWindow because no target defined */
                    	action: function(selectedValue, selectedItem) {
		      				DigiWebApp.BautagebuchMedienDetailsController.set("positionId", M.ViewManager.getView('bautagebuchMedienDetailsPage', 'positionComboBox').getSelection(YES).value);
		      				DigiWebApp.BautagebuchMedienDetailsController.set("positionName", M.ViewManager.getView('bautagebuchMedienDetailsPage', 'positionComboBox').getSelection(YES).label);
		      				DigiWebApp.BautagebuchMedienDetailsController.setTaetigkeiten(M.ViewManager.getView('bautagebuchMedienDetailsPage', 'positionComboBox').getSelection(YES).value);
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
                      target: DigiWebApp.BautagebuchMedienDetailsController
                    , property: 'activityList'
                }
                , events: {
                    change: {
                    	/* executed in scope of DOMWindow because no target defined */
                    	action: function(selectedValue, selectedItem) {
		      				DigiWebApp.BautagebuchMedienDetailsController.set("activityId", M.ViewManager.getView('bautagebuchMedienDetailsPage', 'activityComboBox').getSelection(YES).value);
		      				DigiWebApp.BautagebuchMedienDetailsController.set("activityName", M.ViewManager.getView('bautagebuchMedienDetailsPage', 'activityComboBox').getSelection(YES).label);
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
			                target: DigiWebApp.BautagebuchMedienDetailsController,
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
	  	            target: DigiWebApp.BautagebuchMedienDetailsController,
	  	            action: function() {
        				try{DigiWebApp.ApplicationController.vibrate();}catch(e2){}
        				this.deleteMedienBuchung();
        			}
	  	        }
	  	      }
	      })

    })

});

