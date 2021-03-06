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
					DigiWebApp.BautagebuchNotizenDetailsPage.backDone = false;
					// verfügbare Positionen kopieren und ausgewählte selektieren
					var itemSelected = NO;
					var relevantDetailsController = DigiWebApp.BautagebuchNotizenDetailsController;
					
					if (relevantDetailsController.auftragId) {
						relevantDetailsController.set("auftraegeList", DigiWebApp.Order.getList({selectedId: relevantDetailsController.auftragId}));
					} else if (DigiWebApp.BookingController.currentBooking) {
						if (DigiWebApp.BookingController.currentBooking.get('handOrderId')) {
							relevantDetailsController.set("auftraegeList", DigiWebApp.Order.getList({selectedId: DigiWebApp.BookingController.currentBooking.get('handOrderId')}));
							relevantDetailsController.set('handOrderId', DigiWebApp.BookingController.currentBooking.get('handOrderId'));
							relevantDetailsController.set('handOrderVaterId', DigiWebApp.BookingController.currentBooking.get('handOrderVaterId'));
							relevantDetailsController.set('handOrderName', DigiWebApp.BookingController.currentBooking.get('handOrderName'));
						} else {
							relevantDetailsController.set("auftraegeList", DigiWebApp.Order.getList({selectedId: DigiWebApp.BookingController.currentBooking.get('orderId')}));
							relevantDetailsController.set('auftragId', DigiWebApp.BookingController.currentBooking.get('orderId'));
							relevantDetailsController.set('auftragName', DigiWebApp.BookingController.currentBooking.get('orderName'));
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

					if (DigiWebApp.BautagebuchBautagesberichtDetailsController.bautagesberichtTyp == "<standard>") {
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
					    
					} else {
						
						relevantDetailsController.setPositionen(relevantDetailsController.auftragId);
						
						// Position gemäß laufende Buchung
						if (DigiWebApp.BookingController.currentBooking) {
							relevantDetailsController.set('positionId', DigiWebApp.BookingController.currentBooking.get('positionId'));
							relevantDetailsController.set('positionName', DigiWebApp.BookingController.currentBooking.get('positionName'));
							_.each(relevantDetailsController.positionenList, function(p) {
								if (p.value == relevantDetailsController.get('positionId')) {
									p.isSelected = YES;
								} else {
									p.isSelected = NO;
								}
							});
						}

					}
					
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
            
					M.ViewManager.getView('bautagebuchNotizenDetailsPage', 'dataInput').setValue(DigiWebApp.BautagebuchNotizenDetailsController.data);
					//$('#' + DigiWebApp.BautagebuchNotizenDetailsPage.content.dataInput.id)[0].focus();
					//$('#' + DigiWebApp.BautagebuchNotizenDetailsPage.content.dataInput.id)[0].blur();
					

                	var myTyp = DigiWebApp.BautagebuchBautagesberichtDetailsController.get("bautagesberichtTyp");
					if (DigiWebApp.BautagebuchBautagesberichtDetailsController.item.get("abgeschlossen") && myTyp == "<standard>") {
						$("#" + DigiWebApp.BautagebuchNotizenDetailsPage.content.speichernButton.id).hide();
						$("#" + DigiWebApp.BautagebuchNotizenDetailsPage.header.delButton.id).hide();
					} else {
						$("#" + DigiWebApp.BautagebuchNotizenDetailsPage.content.speichernButton.id).show();
						$("#" + DigiWebApp.BautagebuchNotizenDetailsPage.header.delButton.id).show();
					}
					
                	if (myTyp == "<notizen_only>") {
                		$('#' + DigiWebApp.BautagebuchNotizenDetailsPage.content.auftragComboBox.id + "_container").show();
                	} else {
                		$('#' + DigiWebApp.BautagebuchNotizenDetailsPage.content.auftragComboBox.id + "_container").hide();
                	}

	            	if (relevantDetailsController.get('handOrderId')) {
	            		$('#' + DigiWebApp.BautagebuchNotizenDetailsPage.content.positionComboBox.id + "_container").hide();
	            	} else {
	            		$('#' + DigiWebApp.BautagebuchNotizenDetailsPage.content.positionComboBox.id + "_container").show();
	            	}
					DigiWebApp.ApplicationController.DigiLoaderView.hide();
					// Bugfix 2108: Rename in order to be consistent with DSO
					if (DigiWebApp.SettingsController.getSetting('DTC6aktiv')) {
						DigiWebApp.ApplicationController.dtc6AktivRenameHelper(DigiWebApp.BautagebuchNotizenDetailsPage.content.auftragComboBox.id, M.I18N.l('dtc6Ordner'));
						DigiWebApp.ApplicationController.dtc6AktivRenameHelper(DigiWebApp.BautagebuchNotizenDetailsPage.content.positionComboBox.id, M.I18N.l('dtc6Auftrag'));
						DigiWebApp.ApplicationController.dtc6AktivRenameHelper(DigiWebApp.BautagebuchNotizenDetailsPage.content.activityComboBox.id, M.I18N.l('dtc6Leistung'));
					}
			}
        }
		, pageshow: {
		    action: function() {
				//$('#' + DigiWebApp.BautagebuchNotizenDetailsPage.content.dataInput.id)[0].focus();
				//$('#' + DigiWebApp.BautagebuchNotizenDetailsPage.content.dataInput.id)[0].blur();
			}
		}
        , pagehide: {
            action: function() {
        		// reset auto-grow
        		M.ViewManager.getView('bautagebuchNotizenDetailsPage', 'dataInput').setCssProperty("height","400px");
        	}
        }
    }

	, backDone: false

    , cssClass: 'bautagebuchNotizenDetailsPage'

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
                    //, action: 'backToBautagebuchNotizenListePageTransition'
					action: function(m_id, event) {try{DigiWebApp.ApplicationController.vibrate();}catch(e8){}
						if (DigiWebApp.BautagebuchNotizenDetailsPage.backDone) return;
						DigiWebApp.BautagebuchNotizenDetailsPage.backDone = true;
        				history.back();
        			}
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
            , cssClass: 'red_background'
            , events: {
                tap: {
                      target: DigiWebApp.BautagebuchNotizenDetailsController
                    , action: function() {try{DigiWebApp.ApplicationController.vibrate();}catch(e3){} this.deleteNotiz();}
                }
            }
        })
        , uebersichtButton: M.ButtonView.design({
              value: M.I18N.l('uebersicht')
            , icon: 'forward'
            , anchorLocation: M.RIGHT
            , events: {
                tap: {
                      target: DigiWebApp.BautagebuchNotizenDetailsController
                    , action: function() {try{DigiWebApp.ApplicationController.vibrate();}catch(e3){} 
                    	//this.deleteNotiz();
                    	DigiWebApp.NavigationController.backToBautagebuchNotizenListePageTransition();
                    }
                }
            }
        })
        , anchorLocation: M.TOP
    })

    , content: M.ScrollView.design({

    	  childViews: 'auftragComboBox positionComboBox activityComboBox dataInput speichernButton loeschenButton'
        	  
        , cssClass: 'content'
    	
            , auftragComboBox: M.SelectionListView.design({

                /* renders a selection view like check boxes */
                  selectionMode: M.SINGLE_SELECTION_DIALOG
                , initialText: M.I18N.l('noData')
                , label: M.I18N.l('order')
                , applyTheme: NO
                /* this seleciton view has no static entries, instead it is filled via content binding. */
                , contentBinding: {
                      target: DigiWebApp.BautagebuchNotizenDetailsController
                    , property: 'auftraegeList'
                }
                , events: {
                    change: {
                    	/* executed in scope of DOMWindow because no target defined */
                    	action: function(selectedValue, selectedItem) {
                			var mySelection = M.ViewManager.getView('bautagebuchNotizenDetailsPage', 'auftragComboBox').getSelection(YES);
                			if (mySelection.label == mySelection.value || isGUID(mySelection.value)) {
			      				DigiWebApp.BautagebuchNotizenDetailsController.set("auftragId", null);
			      				DigiWebApp.BautagebuchNotizenDetailsController.set("auftragName", null);
	        					var handOrderObj = _.select(DigiWebApp.HandOrder.findSorted(), function(ord) {
	        					    if (ord) return ord.get('id') == mySelection.value || ord.get('name') == mySelection.label;
	        					})[0];
			      				DigiWebApp.BautagebuchNotizenDetailsController.set("handOrderId", handOrderObj.get("id"));
			      				DigiWebApp.BautagebuchNotizenDetailsController.set("handOrderVaterId", handOrderObj.get("vaterId"));
			      				DigiWebApp.BautagebuchNotizenDetailsController.set("handOrderName", handOrderObj.get("name"));
                        		$('#' + DigiWebApp.BautagebuchNotizenDetailsPage.content.positionComboBox.id + "_container").hide();
                			} else {
    		      				DigiWebApp.BautagebuchNotizenDetailsController.set("auftragId", mySelection.value);
    		      				DigiWebApp.BautagebuchNotizenDetailsController.set("auftragName", mySelection.label);
			      				DigiWebApp.BautagebuchNotizenDetailsController.set("handOrderId", null);
			      				DigiWebApp.BautagebuchNotizenDetailsController.set("handOrderVaterId", null);
			      				DigiWebApp.BautagebuchNotizenDetailsController.set("handOrderName", null);
                        		$('#' + DigiWebApp.BautagebuchNotizenDetailsPage.content.positionComboBox.id + "_container").show();
                			}
		      				DigiWebApp.BautagebuchNotizenDetailsController.setPositionen(M.ViewManager.getView('bautagebuchNotizenDetailsPage', 'auftragComboBox').getSelection(YES).value);
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
                  value: M.I18N.l('save')
                , cssClass: 'digiButton green_background'
                , anchorLocation: M.RIGHT
                , events: {
                    tap: {
		                target: DigiWebApp.BautagebuchNotizenDetailsController,
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
	  	    , cssClass: 'red_background delButton'
	  	    , events: {
	  	        tap: {
	  	            target: DigiWebApp.BautagebuchNotizenDetailsController,
	  	            action: function() {
        				try{DigiWebApp.ApplicationController.vibrate();}catch(e2){}
        				this.deleteNotiz();
        			}
	  	        }
	  	      }
	      })

    })

});

