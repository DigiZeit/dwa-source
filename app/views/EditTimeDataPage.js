// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: DigiWebApp
// View: EditTimeDataPage
// ==========================================================================

m_require('app/views/TimeDataForEditTemplateView');

DigiWebApp.EditTimeDataPage = M.PageView.design({

    bookingToEdit: null
    
    , signaturePadAPI: null
	
	/* Use the 'events' property to bind events like 'pageshow' */
    , events: {
		pagebeforeshow: {
			action: function() {
			    DigiWebApp.ApplicationController.DigiLoaderView.hide();

			    if (DigiWebApp.EditTimeDataPage.buchungAbschliessen) {
			        DigiWebApp.EditTimeDataPage.bookingToEdit = DigiWebApp.BookingController.currentBooking;
			        DigiWebApp.EditTimeDataPage.header.title.set("value",
                        M.I18N.l('remark'));
			    } else {
			        DigiWebApp.EditTimeDataPage.header.title.set("value", 
                        M.I18N.l('EditTimeDataPageTitle'));
			    }
			    
				DigiWebApp.BookingController.setTimeDataForEdit();
				
				var featureBemerkung = DigiWebApp.SettingsController.featureAvailable('403');
				var featureGefahreneKilometer = DigiWebApp.SettingsController.featureAvailable('422');
			    //TODO Außerdem nur wenn Feature für MA aktiviert ist (Ressourcenmerkmal KannReisekostenBuchen
			    // bzw. KannUebernachtungskostenBuchen)
				var featureReisekosten = DigiWebApp.SettingsController.featureAvailable('431');
			    var featureUnterschrift = DigiWebApp.SettingsController.featureAvailable('405');

        		// Freischaltung 405: Unterschrift
			    if (featureUnterschrift && !DigiWebApp.EditTimeDataPage.buchungAbschliessen
                        && (typeof window.requestFileSystem !== "undefined")
                ) {
        			$('#' + DigiWebApp.EditTimeDataPage.content.signature.id).show();
					// init canvas
					var sigPadOptions = {
							    bgColour : '#fff'
							  , lineTop: 130
							  , drawOnly : true
							};
					if (DigiWebApp.EditTimeDataPage.signaturePadAPI === null) {
						DigiWebApp.EditTimeDataPage.signaturePadAPI = $('.sigPad').signaturePad(sigPadOptions);
					}
        		} else {
        			$('#' + DigiWebApp.EditTimeDataPage.content.signature.id).hide();
        		}
						
			    // Bemerkung laden
        		if (typeof (DigiWebApp.EditTimeDataPage.bookingToEdit) !== "undefined"
                        && DigiWebApp.EditTimeDataPage.bookingToEdit !== null
                ) {
					if (typeof(DigiWebApp.EditTimeDataPage.bookingToEdit.get('remark')) !== "undefined" && DigiWebApp.EditTimeDataPage.bookingToEdit.get('remark') !== null) {
						$('#' + DigiWebApp.EditTimeDataPage.content.remarkInput.id).val(DigiWebApp.EditTimeDataPage.bookingToEdit.get('remark'));
						M.ViewManager.getView('editTimeDataPage', 'remarkInput').value = DigiWebApp.EditTimeDataPage.bookingToEdit.get('remark');
					} else {
						$('#' + DigiWebApp.EditTimeDataPage.content.remarkInput.id).val("");
						M.ViewManager.getView('editTimeDataPage', 'remarkInput').value = "";
					}
				} else {
					$('#' + DigiWebApp.EditTimeDataPage.content.remarkInput.id).val("");
					M.ViewManager.getView('editTimeDataPage', 'remarkInput').value = "";
				}
        		
        		if (typeof (DigiWebApp.EditTimeDataPage.bookingToEdit) !== "undefined"
                        && DigiWebApp.EditTimeDataPage.bookingToEdit !== null
                ) {
        		    // gefahreneKilometer laden
        		    if (typeof (DigiWebApp.EditTimeDataPage.bookingToEdit.get('gefahreneKilometer')) !== "undefined"
                            && DigiWebApp.EditTimeDataPage.bookingToEdit.get('gefahreneKilometer') !== null) {
						$('#' + DigiWebApp.EditTimeDataPage.content.gefahreneKilometerInput.id).val(DigiWebApp.EditTimeDataPage.bookingToEdit.get('gefahreneKilometer'));
						M.ViewManager.getView('editTimeDataPage', 'gefahreneKilometerInput').value = DigiWebApp.EditTimeDataPage.bookingToEdit.get('gefahreneKilometer');
					} else {
						$('#' + DigiWebApp.EditTimeDataPage.content.gefahreneKilometerInput.id).val("0");
						M.ViewManager.getView('editTimeDataPage', 'gefahreneKilometerInput').value = "0";
					}
        		    // Reisekosten-Checkboxen laden
        		    if (typeof (DigiWebApp.EditTimeDataPage.bookingToEdit.get('spesenAuswahl')) !== "undefined"
				            && DigiWebApp.EditTimeDataPage.bookingToEdit.get('spesenAuswahl') !== null
				    ) {
        		        var spesen = DigiWebApp.EditTimeDataPage.bookingToEdit.get('spesenAuswahl');
        		        DigiWebApp.BookingController.set('propReisekostenFirmenwagen', [{
        		            value: 'fahrtzeitFirmenwagen'
			                , label: M.I18N.l('fahrtzeitFirmenwagen')
			                , isSelected: (spesen === 5) // 5 = Fahrt mit Firmenwagen
        		        }]);
        		        DigiWebApp.BookingController.set('propReisekostenBusBahn', [{
        		            value: 'fahrtzeitBusBahn'
			                , label: M.I18N.l('fahrtzeitBusBahn')
			                , isSelected: (spesen === 6) // 6 = Fahrt mit Bus/Bahn
        		        }]);
        		    } else {
        		        DigiWebApp.BookingController.set('propReisekostenFirmenwagen', [{
        		            value: 'fahrtzeitFirmenwagen'
			                , label: M.I18N.l('fahrtzeitFirmenwagen')
			                , isSelected: false
        		        }]);
        		        DigiWebApp.BookingController.set('propReisekostenBusBahn', [{
        		            value: 'fahrtzeitBusBahn'
			                , label: M.I18N.l('fahrtzeitBusBahn')
			                , isSelected: false
        		        }]);
        		    }
                } else {
					$('#' + DigiWebApp.EditTimeDataPage.content.gefahreneKilometerInput.id).val("0");
					M.ViewManager.getView('editTimeDataPage', 'gefahreneKilometerInput').value = "0";

					DigiWebApp.BookingController.set('propReisekostenFirmenwagen', [{
					    value: 'fahrtzeitFirmenwagen'
                        , label: M.I18N.l('fahrtzeitFirmenwagen')
                        , isSelected: false
					}]);
					DigiWebApp.BookingController.set('propReisekostenBusBahn', [{
					    value: 'fahrtzeitBusBahn'
                        , label: M.I18N.l('fahrtzeitBusBahn')
                        , isSelected: false
					}]);
                }

        		if (featureBemerkung) {
	        		// show label
					$('[for=' + DigiWebApp.EditTimeDataPage.content.remarkInput.id  + ']').each(function() {
	    					$(this).show();
	    			});
					// show textarea
	        		$('[id=' + DigiWebApp.EditTimeDataPage.content.remarkInput.id  + ']').each(function() {
	    					$(this).show();
	    			});
				} else {
					// hide label
	        		$('[for=' + DigiWebApp.EditTimeDataPage.content.remarkInput.id  + ']').each(function() {
	    					$(this).hide();
	    			});
					// hide textarea
					$('[id=' + DigiWebApp.EditTimeDataPage.content.remarkInput.id  + ']').each(function() {
	    					$(this).hide();
	    			});
				}
        		
			    // gefahreneKilometer etc nur einblenden falls Freischaltung vorhanden und Leistung fahrtzeitrelevant
        		if (featureGefahreneKilometer || featureReisekosten) {
		            if (typeof (DigiWebApp.EditTimeDataPage.bookingToEdit) !== "undefined"
		                    && DigiWebApp.EditTimeDataPage.bookingToEdit !== null
		            ) {
		                var currentActivity = null;
		                _.each(DigiWebApp.Activity.find(), function(el) {
		                    if (el.get("id") === parseIntRadixTen(
		                            DigiWebApp.EditTimeDataPage.bookingToEdit.get("activityId"))
		                    ) {
		                        currentActivity = el;
		                    }
		                });
		                if (currentActivity !== null && currentActivity.get("istFahrzeitRelevant")) {
		                    // Reisekosten-Checkboxen nur einblenden falls Freischaltung vorhanden
		                    // und TODO: Eingabe noch nicht erfolgt
		                    if (featureReisekosten) {
		                        M.ViewManager.getView('editTimeDataPage', 'gefahreneKilometerInput').label =
		                            M.I18N.l('fahrtzeitPrivat');
		                        DigiWebApp.EditTimeDataPage.showHideGefahreneKilometer(true);
		                        DigiWebApp.EditTimeDataPage.showHideReisekosten(true);
		                    } else {
		                        M.ViewManager.getView('editTimeDataPage', 'gefahreneKilometerInput').label =
		                            M.I18N.l('gefahreneKilometer');
		                        DigiWebApp.EditTimeDataPage.showHideGefahreneKilometer(true);
		                        DigiWebApp.EditTimeDataPage.showHideReisekosten(false);
		                    }
		                } else {
		                    DigiWebApp.EditTimeDataPage.showHideGefahreneKilometer(false);
		                    DigiWebApp.EditTimeDataPage.showHideReisekosten(false);
		                }
		                // Uebernachtungskosten-Auswahl nur einblenden falls Freischaltung 
		                // vorhanden und Feierabendbuchung.
		                // istFeierabend von currentBooking ist zu diesem Zeitpunkt noch nicht 
		                // gesetzt - erst wenn die Buchung tatsächlich gemacht wird. Deshalb Extraflag.
		                DigiWebApp.EditTimeDataPage.showHideUebernachtungskosten(
		                    featureReisekosten && DigiWebApp.EditTimeDataPage.istFeierabendBuchung);
		            } else {
		                DigiWebApp.EditTimeDataPage.showHideGefahreneKilometer(false);
		                DigiWebApp.EditTimeDataPage.showHideReisekosten(false);
		            }
		        } else {
        		    DigiWebApp.EditTimeDataPage.showHideGefahreneKilometer(false);
        		    DigiWebApp.EditTimeDataPage.showHideReisekosten(false);
        		}

			    // Uebernachtungskosten-Auswahl (falls nötig) initialisieren
			    // falls Freischaltung vorhanden
        		if (featureReisekosten) {
        		    if (DigiWebApp.UebernachtungAuswahlOption.find().length === 0) {
        		        var i = 1;
        		        DigiWebApp.UebernachtungAuswahlOption.createRecord({
        		            id: i,
        		            beschreibung: M.I18N.l('uebernachtungKeine')
        		        }).saveSorted();
        		        i++; // 2
        		        DigiWebApp.UebernachtungAuswahlOption.createRecord({
        		            id: i,
        		            beschreibung: M.I18N.l('uebernachtungPrivat')
        		        }).saveSorted();
        		        i++; // 3
        		        DigiWebApp.UebernachtungAuswahlOption.createRecord({
        		            id: i,
        		            beschreibung: M.I18N.l('uebernachtungZahltFirma')
        		        }).saveSorted();
        		        i++; // 4
        		        DigiWebApp.UebernachtungAuswahlOption.createRecord({
        		            id: i,
        		            beschreibung: M.I18N.l('uebernachtungSelbstBezahlt')
        		        }).saveSorted();
        		    }

        		    var uebernachtungOptionen = DigiWebApp.UebernachtungAuswahlOption.findSorted();
        		    uebernachtungOptionen = _.map(uebernachtungOptionen, function (opt) {
        		        if (opt) {
        		            var obj = { label: opt.get('beschreibung'), value: opt.get('id') };
        		            if (opt.get('id') === 1) {
        		                obj.isSelected = YES;
        		            }
        		            return obj;
        		        }
        		    });
        		    /* remove false values with _.compact() */
        		    uebernachtungOptionen = _.compact(uebernachtungOptionen);
        		    DigiWebApp.BookingController.set("uebernachtungOptionen", uebernachtungOptionen);
        		}

        		if (featureUnterschrift && !DigiWebApp.EditTimeDataPage.buchungAbschliessen
                        && (typeof window.requestFileSystem !== "undefined")
        		) {
        			// Unterschrift laden
        			DigiWebApp.EditTimeDataPage.bookingToEdit.readFromFile(function(fileContent) {
        				if (fileContent && (fileContent !== "")) {
       						DigiWebApp.EditTimeDataPage.signaturePadAPI.regenerate(fileContent);
        				} else {
        					DigiWebApp.EditTimeDataPage.signaturePadAPI.clearCanvas();
        				}
        			}, function() {
        				DigiWebApp.EditTimeDataPage.signaturePadAPI.clearCanvas();
        			});
        		}
				
			}
        }
    }

    , showHideGefahreneKilometer: function(showElement) {
        // show/hide label
        $('[for=' + DigiWebApp.EditTimeDataPage.content.gefahreneKilometerInput.id + ']').each(function () {
            if (showElement) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
        // show/hide textarea
        $('[id=' + DigiWebApp.EditTimeDataPage.content.gefahreneKilometerInput.id + ']').each(function () {
            if (showElement) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    }

    , showHideReisekosten: function(showElement) {
        $('[id=' + DigiWebApp.EditTimeDataPage.content.reisekostenFirmenwagen.id + ']').each(function () {
            if (showElement) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
        $('[id=' + DigiWebApp.EditTimeDataPage.content.reisekostenBusBahn.id + ']').each(function () {
            if (showElement) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    }

    , showHideUebernachtungskosten: function(showElement) {
        if (showElement) {
            try {
                $('#' + DigiWebApp.EditTimeDataPage.content.uebernachtungskosten.id + "_container").show();
            } catch (e) { trackError(e); }
        } else {
            try {
                $('#' + DigiWebApp.EditTimeDataPage.content.uebernachtungskosten.id + "_container").hide();
            } catch (e) { trackError(e); }
        }
    }

    // Callback der nach dem Speichern aufgerufen werden muss, wird vom BookingController gesetzt
    , myCallback: function () {
    }
    
    // Flag, ob eine Buchung abgeschlossen wird (früher RemarkPage) oder Zeitdaten editiert werden
    , buchungAbschliessen: false

    // Flagb ob eine Feierabendbuchung bearbeitet wird
    , istFeierabendBuchung: false

    , tab_action_timeoutvar: null
    
    , tab_action: function() {
    	clearTimeout(DigiWebApp.EditTimeDataPage.tab_action_timeoutvar);
    	
    	var unterschriftString = "";
    	// Freischaltung 405: Unterschrift
    	if ((DigiWebApp.SettingsController.featureAvailable('405'))
                && (typeof window.requestFileSystem !== "undefined") && DigiWebApp.EditTimeDataPage.signaturePadAPI
        ) {
    		unterschriftString = DigiWebApp.EditTimeDataPage.signaturePadAPI.getSignatureString();
		}
    	
    	if (M.ViewManager.getView('editTimeDataPage', 'remarkInput').value.length > 255) {
	        DigiWebApp.ApplicationController.DigiLoaderView.hide();
    		DigiWebApp.ApplicationController.nativeAlertDialogView({
    			  title: M.I18N.l('remarkTooLong')
    			, message: M.I18N.l('remarkTooLongMessage')
    		});
		} else {
			
    	    if ((DigiWebApp.SettingsController.getSetting('remarkIsMandatory'))
                    && (M.ViewManager.getView('editTimeDataPage', 'remarkInput').value === '')
            ) {
		        DigiWebApp.ApplicationController.DigiLoaderView.hide();
	    		DigiWebApp.ApplicationController.nativeAlertDialogView({
	    			  title: M.I18N.l('remarkIsMandatory')
	    			, message: M.I18N.l('remarkIsMandatoryMessage')
	    		});
			} else {
	            //if (/[[^a-zA-Z0-9_-äöüÄÖÜ,. !?;:/\\@€=]]+/.test(M.ViewManager.getView('editTimeDataPage', 'remarkInput').value)) {
	            if (DigiWebApp.ApplicationController.sonderzeichenCheck(M.ViewManager.getView('editTimeDataPage', 'remarkInput').value)) {
	    	        DigiWebApp.ApplicationController.DigiLoaderView.hide();
	                DigiWebApp.ApplicationController.nativeAlertDialogView({
	                      title: M.I18N.l('specialCharProblem')
	                    , message: M.I18N.l('specialCharProblemMsg')
	                });
	            } else {
	                if (DigiWebApp.EditTimeDataPage.buchungAbschliessen) {
	                    // Aktuelle Buchung speichern
	                    DigiWebApp.BookingController.currentBooking.set('remark',
                            M.ViewManager.getView('editTimeDataPage', 'remarkInput').value);

	                    var km = parseIntRadixTen(M.ViewManager.getView('editTimeDataPage', 'gefahreneKilometerInput').value);
	                    DigiWebApp.BookingController.currentBooking.set('gefahreneKilometer', km);

	                    if (DigiWebApp.SettingsController.featureAvailable('431')) {
	                        // Reisekostenauswahl als Spesenauswahl speichern
	                        if (km !== 0) {
	                        // Parallel Spesenauswahl wenn Fahrt mit Privat-Pkw?
	                        //    DigiWebApp.BookingController.currentBooking.set('spesenAuswahl', 1);
	                        } else if (DigiWebApp.BookingController.propReisekostenFirmenwagen.isSelected === 1) {
	                            // 5 = Fahrt mit Firmenwagen
	                            DigiWebApp.BookingController.currentBooking.set('spesenAuswahl', 5);
	                        } else if (DigiWebApp.BookingController.propReisekostenBusBahn.isSelected === 1) {
	                            // 6 = Fahrt mit Bus/Bahn
	                            DigiWebApp.BookingController.currentBooking.set('spesenAuswahl', 6);
	                        }

	                        DigiWebApp.BookingController.currentBooking.set('uebernachtungAuswahl',
                                M.ViewManager.getView('editTimeDataPage', 'uebernachtungskosten').getSelection(YES).value);
	                    }

	                    DigiWebApp.BookingController.currentBooking.save();

	                    DigiWebApp.EditTimeDataPage.myCallback();
	                } else {
	                    // Bemerkung, gefahreneKilometer etc in bookingToEdit speichern
	                    DigiWebApp.EditTimeDataPage.bookingToEdit.set('remark', M.ViewManager.getView('editTimeDataPage', 'remarkInput').value);
	                    DigiWebApp.EditTimeDataPage.bookingToEdit.set('gefahreneKilometer', M.ViewManager.getView('editTimeDataPage', 'gefahreneKilometerInput').value);
	                    DigiWebApp.EditTimeDataPage.bookingToEdit.save();

	                    if (unterschriftString !== "") {
	                        // save signature
	                        DigiWebApp.EditTimeDataPage.bookingToEdit.set('fileType', DigiWebApp.ApplicationController.CONSTTextFiletype);
	                        DigiWebApp.EditTimeDataPage.bookingToEdit.set("unterschrift_breite", DigiWebApp.EditTimeDataPage.content.signature.signatureform.signaturecanvas.canvasWidth);
	                        DigiWebApp.EditTimeDataPage.bookingToEdit.set("unterschrift_hoehe", DigiWebApp.EditTimeDataPage.content.signature.signatureform.signaturecanvas.canvasHeight);
	                        DigiWebApp.EditTimeDataPage.bookingToEdit.save();
	                        DigiWebApp.EditTimeDataPage.bookingToEdit.saveToFile(unterschriftString, DigiWebApp.EditTimeDataPage.myCallback);
	                    } else {
	                        DigiWebApp.EditTimeDataPage.myCallback();
	                    }
	                }
	            }
			}
		}
    }

    , childViews: 'header content'

    , cssClass: 'remarkPage'

    , header: M.ToolbarView.design({
          childViews: 'backButton title'
        , cssClass: 'header'
        , isFixed: YES
        , backButton: M.ButtonView.design({
              value: M.I18N.l('back')
            , icon: 'arrow-l'
            , anchorLocation: M.LEFT
            , events: {
                tap: {
                      target: DigiWebApp.NavigationController
                    , action: function () {
                        try { DigiWebApp.ApplicationController.vibrate(); } catch (e2) { }
                        if (DigiWebApp.EditTimeDataPage.buchungAbschliessen) {
                              this.backToBookTimePagePOP();
                          } else {
                              this.backToTimeDataPage();
                          }
                    }
                }
            }
        })
        , title: M.LabelView.design({
            // Text wird, abhängig davon, was gerade gemacht wird, in pagebeforeshow() gesetzt
            value: M.I18N.l('EditTimeDataPageTitle')
            , anchorLocation: M.CENTER
        })
        , anchorLocation: M.TOP
    })

    , content: M.ScrollView.design({
        childViews: 'orderbox remarkInput gefahreneKilometerInput reisekostenFirmenwagen reisekostenBusBahn uebernachtungskosten signature saveGrid'
        
        , orderbox: M.ListView.design({
        	
            contentBinding: {
            	  target: DigiWebApp.BookingController
            	, property: 'timeDataForEdit'
        	}

        	, listItemTemplateView: DigiWebApp.TimeDataForEditTemplateView
        	
        })
        
        , remarkInput: M.TextFieldView.design({
            label: M.I18N.l('remark')
            , cssClass: 'remarkInput'
            , hasMultipleLines: YES
            , initialText: "Max. 255 " + M.I18N.l('characters')
            , numberOfChars: 255
        })
            
        , gefahreneKilometerInput: M.TextFieldView.design({
            // Labeltext wird in init() abhängig von Freischaltung gesetzt
            label: M.I18N.l('gefahreneKilometer')
            , cssClass: 'remarkInput'
            , hasMultipleLines: NO
        	, inputType: M.INPUT_NUMBER
        })
            
        , signature: M.ContainerView.design({
        	childViews: 'signatureform'
            , cssClass: 'signaturecanvas marginTop20 marginBottom20'

        	, signatureform: M.FormView.design({
            	childViews: 'signaturecanvas'
            	
            	, signaturecanvas: M.CanvasView.design({

            		label: M.I18N.l('signature')

            		, canvasWidth: 300
                    , canvasHeight: 150
                	
                    , render: function() {
                    	if (this.label) {
                    		this.html += '<label for="' + this.id + '" class="signaturecanvaslabel">' + this.label + '</label>';
                    	}
    					this.html += '  <div id="' + this.id + '_container" class="sig sigWrapper">';
        				this.html += '    <canvas id="' + this.id + '_canvas" class="pad" width="' + this.canvasWidth + 'px" height="' + this.canvasHeight + 'px"></canvas>';
        				this.html += '    <input id="' + this.id + '" type="hidden" name="output" class="output">';
        				this.html += '  </div>';
                    	return this.html;
                	}
    	        })
                	
                , render: function() {
            		this.html += '<form method="post" action="" class="sigPad">';
                	this.renderChildViews();
    				this.html += '</form>';
                	return this.html;
            	}
            })
        })
        	        
        , reisekostenFirmenwagen: M.SelectionListView.design({
            selectionMode: M.MULTIPLE_SELECTION
            , contentBinding: {
                target: DigiWebApp.BookingController
                , property: 'propReisekostenFirmenwagen'
            }
        })

        , reisekostenBusBahn: M.SelectionListView.design({
            selectionMode: M.MULTIPLE_SELECTION
            , contentBinding: {
                target: DigiWebApp.BookingController
                , property: 'propReisekostenBusBahn'
            }
        })

        , uebernachtungskosten: M.SelectionListView.design({
            selectionMode: M.SINGLE_SELECTION_DIALOG
            , label: M.I18N.l('uebernachtungArt')
            , initialText: M.I18N.l('noData')
            , applyTheme: NO
            , contentBinding: {
                target: DigiWebApp.BookingController
                , property: 'uebernachtungOptionen'
            }
        })

        , saveGrid: M.GridView.design({
              childViews: 'saveButton icon'
            , layout: {
                  cssClass: 'digiButton marginTop25'
                , columns: {
                      0: 'saveButton'
                    , 1: 'icon'
                }
            }
            
            , saveButton: M.ButtonView.design({
                  value: M.I18N.l('assume')
                , cssClass: 'digiButton'
                , anchorLocation: M.RIGHT
                , events: {
                    tap: {
            			action: function() {
            				try{DigiWebApp.ApplicationController.vibrate();}catch(e3){} 
            				DigiWebApp.ApplicationController.DigiLoaderView.show(M.I18N.l('Save'));
            				DigiWebApp.EditTimeDataPage.tab_action_timeoutvar = setTimeout("DigiWebApp.EditTimeDataPage.tab_action();", 50);
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

