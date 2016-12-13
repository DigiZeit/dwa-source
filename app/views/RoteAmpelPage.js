// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: DigiWebApp
// View: RoteAmpelPage
// ==========================================================================

DigiWebApp.RoteAmpelPage = M.PageView.design({

      events: {
		  pagebeforeshow: {
            action: function() {
					DigiWebApp.RoteAmpelPage.backDone = false;
					// verfügbare Positionen kopieren und ausgewählte selektieren
					var itemSelected = NO;
					var relevantDetailsController = DigiWebApp.RoteAmpelController;
					
					if (relevantDetailsController.auftragId) {
						relevantDetailsController.set("auftraegeList", 
                            DigiWebApp.Order.getList({selectedId: relevantDetailsController.auftragId}));
					} else if (DigiWebApp.BookingController.currentBooking) {
						if (DigiWebApp.BookingController.currentBooking.get('handOrderId')) {
							relevantDetailsController.set("auftraegeList", 
                                DigiWebApp.Order.getList({selectedId: DigiWebApp.BookingController.currentBooking.get('handOrderId')}));
							relevantDetailsController.set('handOrderId', 
                                DigiWebApp.BookingController.currentBooking.get('handOrderId'));
							relevantDetailsController.set('handOrderVaterId', 
                                DigiWebApp.BookingController.currentBooking.get('handOrderVaterId'));
							relevantDetailsController.set('handOrderName', 
                                DigiWebApp.BookingController.currentBooking.get('handOrderName'));
						} else {
							relevantDetailsController.set("auftraegeList", 
                                DigiWebApp.Order.getList({selectedId: DigiWebApp.BookingController.currentBooking.get('orderId')}));
							relevantDetailsController.set('auftragId', 
                                DigiWebApp.BookingController.currentBooking.get('orderId'));
							relevantDetailsController.set('auftragName', 
                                DigiWebApp.BookingController.currentBooking.get('orderName'));
						}
					} else {
						relevantDetailsController.set("auftraegeList", DigiWebApp.Order.getList());
					}

					_.each(relevantDetailsController.auftraegeList, function(a) {
						if (a.isSelected == YES && parseIntRadixTen(a.value) != 0) {
							relevantDetailsController.set('auftragId', parseIntRadixTen(a.value));
							relevantDetailsController.set('auftragName', a.label);
						}
					});

					var myPositionenList = JSON.parse(JSON.stringify(DigiWebApp.RoteAmpelController.positionenList));
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
							if (DigiWebApp.RoteAmpelController.positionId) {
								o.isSelected = (o.value === DigiWebApp.RoteAmpelController.positionId);
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
					    					
					_.each(relevantDetailsController.positionenList, function(a) {
						if (a.isSelected == YES && parseIntRadixTen(a.value) != 0) {
							relevantDetailsController.set('positionId', parseIntRadixTen(a.value));
							relevantDetailsController.set('positionName', a.label);
						}
					});
					relevantDetailsController.set('positionenList', relevantDetailsController.positionenList);

					relevantDetailsController.setTaetigkeiten(relevantDetailsController.positionId);
					
					try {
						_.each(relevantDetailsController.activityList, function(a) {
							if (a.isSelected == YES && parseIntRadixTen(a.value) != 0) {
								relevantDetailsController.set('activityId', parseIntRadixTen(a.value));
								relevantDetailsController.set('activityName', a.label);
							}
						});
            		} catch (e) {trackError(e);}
            
					M.ViewManager.getView('roteAmpelPage', 'dataInput').setValue(DigiWebApp.RoteAmpelController.data);

                    // TODO Wahrsch. unnötig weil nie ausgegraut wird
					//$("#" + DigiWebApp.RoteAmpelPage.content.speichernButton.id).show();
					
               		//$('#' + DigiWebApp.RoteAmpelPage.content.auftragComboBox.id + "_container").show();

	            	if (relevantDetailsController.get('handOrderId')) {
	            		$('#' + DigiWebApp.RoteAmpelPage.content.positionComboBox.id + "_container").hide();
	            	} else {
	            		$('#' + DigiWebApp.RoteAmpelPage.content.positionComboBox.id + "_container").show();
	            	}
					DigiWebApp.ApplicationController.DigiLoaderView.hide();
					// Bugfix 2108: Rename in order to be consistent with DSO
					if (DigiWebApp.SettingsController.getSetting('DTC6aktiv')) {
						DigiWebApp.ApplicationController.dtc6AktivRenameHelper(
                            DigiWebApp.RoteAmpelPage.content.auftragComboBox.id, M.I18N.l('dtc6Ordner'));
						DigiWebApp.ApplicationController.dtc6AktivRenameHelper(
                            DigiWebApp.RoteAmpelPage.content.positionComboBox.id, M.I18N.l('dtc6Auftrag'));
						DigiWebApp.ApplicationController.dtc6AktivRenameHelper(
                            DigiWebApp.RoteAmpelPage.content.activityComboBox.id, M.I18N.l('dtc6Leistung'));
					}
			}
        }
		, pageshow: {
		    action: function() {
			}
		}
        , pagehide: {
            action: function() {
        		// reset auto-grow
        		M.ViewManager.getView('roteAmpelPage', 'dataInput').setCssProperty("height", "200px");
        	}
        }
    }

	, backDone: false

    // Gleicher Stil wie Bautagebuch-Notizen
    , cssClass: 'bautagebuchNotizenDetailsPage'

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
					action: function(m_id, event) {
                        DigiWebApp.ApplicationController.vibrate();
						if (DigiWebApp.RoteAmpelPage.backDone) {
						    return;
						}
						DigiWebApp.RoteAmpelPage.backDone = true;
        				history.back();
        			}
                }
            }
        })
        , title: M.LabelView.design({
              value: M.I18N.l('roteAmpel')
            , anchorLocation: M.CENTER
        })
        , anchorLocation: M.TOP
    })

    , content: M.ScrollView.design({

    	  childViews: 'auftragComboBox positionComboBox activityComboBox dataInput speichernButton'
        	  
        , cssClass: 'content'
    	
        , auftragComboBox: M.SelectionListView.design({

            /* renders a selection view like check boxes */
                selectionMode: M.SINGLE_SELECTION_DIALOG
            , initialText: M.I18N.l('noData')
            , label: M.I18N.l('order')
            , applyTheme: NO
            /* this selection view has no static entries, instead it is filled via content binding. */
            , contentBinding: {
                    target: DigiWebApp.RoteAmpelController
                , property: 'auftraegeList'
            }
            , events: {
                change: {
                    /* executed in scope of DOMWindow because no target defined */
                    action: function(selectedValue, selectedItem) {
                		var mySelection = M.ViewManager.getView('roteAmpelPage', 'auftragComboBox').getSelection(YES);
                		if (mySelection.label == mySelection.value || isGUID(mySelection.value)) {
			      			DigiWebApp.RoteAmpelController.set("auftragId", null);
			      			DigiWebApp.RoteAmpelController.set("auftragName", null);
	        				var handOrderObj = _.select(DigiWebApp.HandOrder.findSorted(), function(ord) {
	        					if (ord) return ord.get('id') == mySelection.value || ord.get('name') == mySelection.label;
	        				})[0];
			      			DigiWebApp.RoteAmpelController.set("handOrderId", handOrderObj.get("id"));
			      			DigiWebApp.RoteAmpelController.set("handOrderVaterId", handOrderObj.get("vaterId"));
			      			DigiWebApp.RoteAmpelController.set("handOrderName", handOrderObj.get("name"));
                        	$('#' + DigiWebApp.RoteAmpelPage.content.positionComboBox.id + "_container").hide();
                		} else {
    		      			DigiWebApp.RoteAmpelController.set("auftragId", mySelection.value);
    		      			DigiWebApp.RoteAmpelController.set("auftragName", mySelection.label);
			      			DigiWebApp.RoteAmpelController.set("handOrderId", null);
			      			DigiWebApp.RoteAmpelController.set("handOrderVaterId", null);
			      			DigiWebApp.RoteAmpelController.set("handOrderName", null);
                        	$('#' + DigiWebApp.RoteAmpelPage.content.positionComboBox.id + "_container").show();
                		}
		      			DigiWebApp.RoteAmpelController.setPositionen(
                            M.ViewManager.getView('roteAmpelPage', 'auftragComboBox').getSelection(YES).value);
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
                    target: DigiWebApp.RoteAmpelController
                , property: 'positionenList'
            }
            , events: {
                change: {
                    /* executed in scope of DOMWindow because no target defined */
                    action: function(selectedValue, selectedItem) {
		      			DigiWebApp.RoteAmpelController.set("positionId", 
                            M.ViewManager.getView('roteAmpelPage', 'positionComboBox').getSelection(YES).value);
		      			DigiWebApp.RoteAmpelController.set("positionName", 
                            M.ViewManager.getView('roteAmpelPage', 'positionComboBox').getSelection(YES).label);
		      			DigiWebApp.RoteAmpelController.setTaetigkeiten(
                            M.ViewManager.getView('roteAmpelPage', 'positionComboBox').getSelection(YES).value);
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
                    target: DigiWebApp.RoteAmpelController
                , property: 'activityList'
            }
            , events: {
                change: {
                    /* executed in scope of DOMWindow because no target defined */
                    action: function(selectedValue, selectedItem) {
		      			DigiWebApp.RoteAmpelController.set("activityId", 
                            M.ViewManager.getView('roteAmpelPage', 'activityComboBox').getSelection(YES).value);
		      			DigiWebApp.RoteAmpelController.set("activityName", 
                            M.ViewManager.getView('roteAmpelPage', 'activityComboBox').getSelection(YES).label);
                    }
                }
            }
        })
            	
        , dataInput: M.TextFieldView.design({
                  label: M.I18N.l('roteAmpelNachricht')
                , cssClass: 'dataInput'
                , cssClassOnInit: 'dataInputInitial'
                , hasMultipleLines: YES
                , initialText: "Max. 200 " + M.I18N.l('characters')
                , numberOfChars: 200
	   	        , events: {
	           		keyup: {
	   	                /* executed in scope of DOMWindow because no target defined */
	   	            	action: function(selectedValue, selectedItem) {
        						var myValue = M.ViewManager.getView('roteAmpelPage', 'dataInput').getValue();
        						if (myValue.length <= 200) {
        							DigiWebApp.RoteAmpelController.set("data", 
                                        M.ViewManager.getView('roteAmpelPage', 'dataInput').getValue());
        						} else {
        							M.ViewManager.getView('roteAmpelPage', 'dataInput').setValue(DigiWebApp.RoteAmpelController.data);
        				            DigiWebApp.ApplicationController.nativeAlertDialogView({
        				                title: M.I18N.l('maximaleFeldlaengeErreicht')
        				              , message: M.I18N.l('maximaleFeldlaengeErreichtMsg')
        				            });
        						}
	   	            	}
	   	            }
	   	    	}
        })
            
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
                  value: M.I18N.l('roteAmpelAbschicken')
                , cssClass: 'digiButton green_background'
                , anchorLocation: M.RIGHT
                , events: {
                    tap: {
		                action: function() {
            				DigiWebApp.ApplicationController.vibrate();
            				//DigiWebApp.RoteAmpelController.save();
                		    DigiWebApp.NavigationController.backToDashboardPagePOP();
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
