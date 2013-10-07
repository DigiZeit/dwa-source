// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: DigiWebApp
// View: BautagebuchNotizenDetailsPage
// ==========================================================================

DigiWebApp.BautagebuchNotizenDetailsPage = M.PageView.design({

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
						if (DigiWebApp.BautagebuchNotizenDetailsController.positionId) {
							o.isSelected = (o.value === DigiWebApp.BautagebuchNotizenDetailsController.positionId);
							if (o.isSelected) { itemSelected = YES }
						}
			            return o;
			    	}
			    });
			    positionenArray = _.compact(positionenArray);
			    if (myPositionenList.length !== 1) {
			    	positionenArray.push({label: M.I18N.l('selectSomething'), value: '0', isSelected: !itemSelected});
			    } else {
			    	DigiWebApp.BautagebuchNotizenDetailsController.set("positionId", positionenArray[0].value)
			    	DigiWebApp.BautagebuchNotizenDetailsController.set("positionName", positionenArray[0].label)
			    }
				DigiWebApp.BautagebuchNotizenDetailsController.set("positionenList", positionenArray)
				
				DigiWebApp.BautagebuchNotizenDetailsController.setTaetigkeiten(DigiWebApp.BautagebuchNotizenDetailsController.positionId);
				
				M.ViewManager.getView('bautagebuchNotizenDetailsPage', 'dataInput').setValue(DigiWebApp.BautagebuchNotizenDetailsController.data);
				$('#' + DigiWebApp.BautagebuchNotizenDetailsPage.content.dataInput.id)[0].focus();
				$('#' + DigiWebApp.BautagebuchNotizenDetailsPage.content.dataInput.id)[0].blur();
				
				if (DigiWebApp.BautagebuchBautageberichtDetailsController.item.get("abgeschlossen")) {
					$("#" + DigiWebApp.BautagebuchNotizenDetailsPage.content.grid.id).hide();
					$("#" + DigiWebApp.BautagebuchNotizenDetailsPage.header.delButton.id).hide();
				} else {
					$("#" + DigiWebApp.BautagebuchNotizenDetailsPage.content.grid.id).show();
					$("#" + DigiWebApp.BautagebuchNotizenDetailsPage.header.delButton.id).show();
				}

			}
        }
		, pageshow: {
		    action: function() {
				$('#' + DigiWebApp.BautagebuchNotizenDetailsPage.content.dataInput.id)[0].focus();
				$('#' + DigiWebApp.BautagebuchNotizenDetailsPage.content.dataInput.id)[0].blur();
			}
		}
        , pagehide: {
            action: function() {
        		// reset auto-grow
        		M.ViewManager.getView('bautagebuchNotizenDetailsPage', 'dataInput').setCssProperty("height","400px");
        	}
        }
    }

    , cssClass: 'bautagebuchNotizenDetailsPage'

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
                    //, action: 'backToBautagebuchNotizenListePageTransition'
        			action: function() {try{navigator.notification.vibrate(200);}catch(e){} history.back();}
                }
            }
        })
        , title: M.LabelView.design({
              value: M.I18N.l('BautagebuchNotiz')
            , anchorLocation: M.CENTER
        })
        , delButton: M.ButtonView.design({
              value: M.I18N.l('BautagebuchDelete')
            , icon: 'delete'
            , anchorLocation: M.RIGHT
            , events: {
                tap: {
                      target: DigiWebApp.BautagebuchNotizenDetailsController
                    , action: function() {try{navigator.notification.vibrate(200);}catch(e){} this.deleteNotiz();}
                }
            }
        })
        , anchorLocation: M.TOP
    })

    , content: M.ScrollView.design({

    	  childViews: 'positionComboBox activityComboBox dataInput grid'
        	  
        , cssClass: 'content'
    	
        , positionComboBox: M.SelectionListView.design({

                /* renders a selection view like check boxes */
                  selectionMode: M.SINGLE_SELECTION_DIALOG
                , initialText: M.I18N.l('noData')
                , label: M.I18N.l('position')
                , applyTheme: NO
                /* this seleciton view has no static entries, instead it is filled via content binding. */
                , contentBinding: {
                      target: DigiWebApp.BautagebuchNotizenDetailsController
                    , property: 'positionenList'
                }
                , events: {
                    change: {
                    	/* executed in scope of DOMWindow because no target defined */
                    	action: function(selectedValue, selectedItem) {
		      				DigiWebApp.BautagebuchNotizenDetailsController.set("positionId", M.ViewManager.getView('bautagebuchNotizenDetailsPage', 'positionComboBox').getSelection(YES).value);
		      				DigiWebApp.BautagebuchNotizenDetailsController.set("positionName", M.ViewManager.getView('bautagebuchNotizenDetailsPage', 'positionComboBox').getSelection(YES).label);
		      				DigiWebApp.BautagebuchNotizenDetailsController.setTaetigkeiten(M.ViewManager.getView('bautagebuchNotizenDetailsPage', 'positionComboBox').getSelection(YES).value);
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
                      target: DigiWebApp.BautagebuchNotizenDetailsController
                    , property: 'activityList'
                }
                , events: {
                    change: {
                    	/* executed in scope of DOMWindow because no target defined */
                    	action: function(selectedValue, selectedItem) {
		      				DigiWebApp.BautagebuchNotizenDetailsController.set("activityId", M.ViewManager.getView('bautagebuchNotizenDetailsPage', 'activityComboBox').getSelection(YES).value);
		      				DigiWebApp.BautagebuchNotizenDetailsController.set("activityName", M.ViewManager.getView('bautagebuchNotizenDetailsPage', 'activityComboBox').getSelection(YES).label);
                    	}
                	}
                }
        })
            	
        , dataInput: M.TextFieldView.design({
                  label: M.I18N.l('BautagebuchNotiz')
                , cssClass: 'dataInput'
                , cssClassOnInit: 'dataInputInitial'
                , hasMultipleLines: YES
                , initialText: "max. 4000 " + M.I18N.l('characters')
                , numberOfChars: 4000
	   	        , events: {
	           		keyup: {
	   	                /* executed in scope of DOMWindow because no target defined */
	   	            	action: function(selectedValue, selectedItem) {
        						var myValue = M.ViewManager.getView('bautagebuchNotizenDetailsPage', 'dataInput').getValue();
        						if (myValue.length <= 4000) {
        							DigiWebApp.BautagebuchNotizenDetailsController.set("data", M.ViewManager.getView('bautagebuchNotizenDetailsPage', 'dataInput').getValue());
        						} else {
        							M.ViewManager.getView('bautagebuchNotizenDetailsPage', 'dataInput').setValue(DigiWebApp.BautagebuchNotizenDetailsController.data);
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
		                target: DigiWebApp.BautagebuchNotizenDetailsController,
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

