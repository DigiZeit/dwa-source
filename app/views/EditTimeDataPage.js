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
            action: function () {
                // Hinweis: this statt DigiWebApp.EditTimeDataPage funktioniert nicht, auch nicht
                // wenn man target: DigiWebApp.EditTimeDataPage angibt.

			    DigiWebApp.ApplicationController.DigiLoaderView.hide();

			    if (DigiWebApp.EditTimeDataPage.buchungAbschliessen) {
			        DigiWebApp.EditTimeDataPage.bookingToEdit = DigiWebApp.BookingController.currentBooking;
			        DigiWebApp.EditTimeDataPage.header.title.set('value', M.I18N.l('remark'));
			        DigiWebApp.EditTimeDataPage.content.saveGrid.saveButton.set('value',
			            M.I18N.l('closeBooking'));
                } else {
			        DigiWebApp.EditTimeDataPage.header.title.set('value', 
                        M.I18N.l('EditTimeDataPageTitle'));
			        DigiWebApp.EditTimeDataPage.content.saveGrid.saveButton.set('value',
			            M.I18N.l('assume'));
			    }
			    
			    DigiWebApp.BookingController.setTimeDataForEdit();

				var featureBemerkung = DigiWebApp.SettingsController.featureAvailable('403');
                var featureGefahreneKilometer = DigiWebApp.SettingsController.featureAvailable('422');
				var featureFahrtkosten = (DigiWebApp.SettingsController.featureAvailable('431')
				    && DigiWebApp.SettingsController.getSetting('kannFahrtkostenBuchen'));
                // istFeierabend von currentBooking ist zu diesem Zeitpunkt noch nicht 
			    // gesetzt - erst wenn die Buchung tatsächlich gemacht wird. Deshalb Extraflag.
				var featureUebernachtungskosten = (DigiWebApp.SettingsController.featureAvailable('431')
                    && DigiWebApp.SettingsController.getSetting('kannUebernachtungskostenBuchen')
			        && DigiWebApp.EditTimeDataPage.istFeierabendBuchung);
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
        		    if (typeof (DigiWebApp.EditTimeDataPage.bookingToEdit.get('remark')) !== "undefined"
                            && DigiWebApp.EditTimeDataPage.bookingToEdit.get('remark') !== null) {
        		        $('#' + DigiWebApp.EditTimeDataPage.content.remarkInput.id).val(
                            DigiWebApp.EditTimeDataPage.bookingToEdit.get('remark'));
						M.ViewManager.getView('editTimeDataPage', 'remarkInput').value =
                            DigiWebApp.EditTimeDataPage.bookingToEdit.get('remark');
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
        		        $('#' + DigiWebApp.EditTimeDataPage.content.gefahreneKilometerInput.id).val(
                            DigiWebApp.EditTimeDataPage.bookingToEdit.get('gefahreneKilometer'));
        		        M.ViewManager.getView('editTimeDataPage', 'gefahreneKilometerInput').value =
                            DigiWebApp.EditTimeDataPage.bookingToEdit.get('gefahreneKilometer');
					} else {
						$('#' + DigiWebApp.EditTimeDataPage.content.gefahreneKilometerInput.id).val("0");
						M.ViewManager.getView('editTimeDataPage', 'gefahreneKilometerInput').value = "0";
					}
        		    // Reisekosten-Checkboxen laden
        		    if (typeof (DigiWebApp.EditTimeDataPage.bookingToEdit.get('spesenAuswahl')) !== "undefined"
				            && DigiWebApp.EditTimeDataPage.bookingToEdit.get('spesenAuswahl') !== null
				    ) {
        		        var spesen = DigiWebApp.EditTimeDataPage.bookingToEdit.get('spesenAuswahl');
        		        DigiWebApp.EditTimeDataPage.setReisekostenFirmenwagen(spesen == 
                            DigiWebApp.BookingController.constFs431SpesenauswahlFirmenwagen);
        		        DigiWebApp.EditTimeDataPage.setReisekostenBusBahn(spesen == 
                            DigiWebApp.BookingController.constFs431SpesenauswahlBusBahn);
        		    } else {
        		        DigiWebApp.EditTimeDataPage.setReisekostenFirmenwagen(false);
        		        DigiWebApp.EditTimeDataPage.setReisekostenBusBahn(false);
        		    }
                } else {
					$('#' + DigiWebApp.EditTimeDataPage.content.gefahreneKilometerInput.id).val("0");
					M.ViewManager.getView('editTimeDataPage', 'gefahreneKilometerInput').value = "0";
					DigiWebApp.EditTimeDataPage.setReisekostenFirmenwagen(false);
					DigiWebApp.EditTimeDataPage.setReisekostenBusBahn(false);
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
        		
			    // gefahreneKilometer etc nur einblenden falls Vorbedingungen erfüllt sind
        		if (featureGefahreneKilometer || featureFahrtkosten) {
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
		                    // und - bei buchungAbschliessen - Eingabe noch nicht erfolgt
		                    if (featureFahrtkosten) {
		                        DigiWebApp.EditTimeDataPage.showHideGefahreneKilometerLabel(false);
		                        var show = !(DigiWebApp.EditTimeDataPage.buchungAbschliessen
		                            && hasValue(
                                        DigiWebApp.EditTimeDataPage.bookingToEdit.get('gefahreneKilometer')));
		                        DigiWebApp.EditTimeDataPage.showHideFahrtzeitPrivatLabel(show);
		                        DigiWebApp.EditTimeDataPage.showHideGefahreneKilometer(show);
		                        DigiWebApp.EditTimeDataPage.showHideReisekosten(show);
		                    } else if (featureGefahreneKilometer) {
		                        DigiWebApp.EditTimeDataPage.showHideFahrtzeitPrivatLabel(false);
		                        DigiWebApp.EditTimeDataPage.showHideGefahreneKilometerLabel(true);
		                        DigiWebApp.EditTimeDataPage.showHideGefahreneKilometer(true);
		                        DigiWebApp.EditTimeDataPage.showHideReisekosten(false);
		                    } else {
		                        DigiWebApp.EditTimeDataPage.showHideFahrtzeitPrivatLabel(false);
		                        DigiWebApp.EditTimeDataPage.showHideGefahreneKilometerLabel(false);
		                        DigiWebApp.EditTimeDataPage.showHideGefahreneKilometer(false);
		                        DigiWebApp.EditTimeDataPage.showHideReisekosten(false);
		                    }
		                } else {
		                    DigiWebApp.EditTimeDataPage.showHideFahrtzeitPrivatLabel(false);
		                    DigiWebApp.EditTimeDataPage.showHideGefahreneKilometerLabel(false);
		                    DigiWebApp.EditTimeDataPage.showHideGefahreneKilometer(false);
		                    DigiWebApp.EditTimeDataPage.showHideReisekosten(false);
		                }
		            } else {
		                DigiWebApp.EditTimeDataPage.showHideFahrtzeitPrivatLabel(false);
		                DigiWebApp.EditTimeDataPage.showHideGefahreneKilometerLabel(false);
		                DigiWebApp.EditTimeDataPage.showHideGefahreneKilometer(false);
		                DigiWebApp.EditTimeDataPage.showHideReisekosten(false);
		            }
		        } else {
        		    DigiWebApp.EditTimeDataPage.showHideFahrtzeitPrivatLabel(false);
        		    DigiWebApp.EditTimeDataPage.showHideGefahreneKilometerLabel(false);
        		    DigiWebApp.EditTimeDataPage.showHideGefahreneKilometer(false);
        		    DigiWebApp.EditTimeDataPage.showHideReisekosten(false);
        		}

			    // Uebernachtungskosten-Auswahl nur (falls nötig) initialisieren
			    // und einblenden falls Freischaltung vorhanden und Feierabendbuchung.
        		if (featureUebernachtungskosten) {
        		    if (DigiWebApp.UebernachtungAuswahlOption.find().length === 0) {
        		        // Auswahhliste initialisieren
        		        // Die Zahlenwerte müssen mit den entsprechenden VorgabeId in der
        		        // Tabelle [SonderbuchungseigenschaftVorgabe] in der DIGI-DB übereinstimmen!
        		        DigiWebApp.UebernachtungAuswahlOption.createRecord({
        		            id: DigiWebApp.BookingController.constFs431UebernachtungsauswahlKeine,
        		            beschreibung: M.I18N.l('fs431UebernachtungKeine')
        		        }).saveSorted();
        		        DigiWebApp.UebernachtungAuswahlOption.createRecord({
        		            id: DigiWebApp.BookingController.constFs431UebernachtungsauswahlPrivat,
        		            beschreibung: M.I18N.l('fs431UebernachtungPrivat')
        		        }).saveSorted();
        		        DigiWebApp.UebernachtungAuswahlOption.createRecord({
        		            id: DigiWebApp.BookingController.constFs431UebernachtungsauswahlZahltFirma,
        		            beschreibung: M.I18N.l('fs431UebernachtungZahltFirma')
        		        }).saveSorted();
        		        DigiWebApp.UebernachtungAuswahlOption.createRecord({
        		            id: DigiWebApp.BookingController.constFs431UebernachtungsauswahlSelbstBezahlt,
        		            beschreibung: M.I18N.l('fs431UebernachtungSelbstBezahlt')
        		        }).saveSorted();
        		    }

        		    var uebernachtungOptionen = DigiWebApp.UebernachtungAuswahlOption.findSorted();
        		    uebernachtungOptionen = _.map(uebernachtungOptionen, function (opt) {
        		        if (opt) {
        		            var obj = { label: opt.get('beschreibung'), value: opt.get('id') };
        		            if (opt.get('id') === DigiWebApp.BookingController.constFs431UebernachtungsauswahlKeine) {
        		                obj.isSelected = YES;
        		            }
        		            return obj;
        		        }
        		    });
        		    /* remove false values with _.compact() */
        		    uebernachtungOptionen = _.compact(uebernachtungOptionen);
        		    DigiWebApp.BookingController.set("uebernachtungOptionen", uebernachtungOptionen);
        		} // if (featureUebernachtungskosten)

        		DigiWebApp.EditTimeDataPage.showHideUebernachtungskosten(featureUebernachtungskosten);

        		if (featureUnterschrift && !DigiWebApp.EditTimeDataPage.buchungAbschliessen
                        && (typeof window.requestFileSystem !== "undefined")
        		) {
        			// Unterschrift laden
        			this.bookingToEdit.readFromFile(function(fileContent) {
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

	, showHideFahrtzeitPrivatLabel: function(showElement) {
	    $('[id=' + DigiWebApp.EditTimeDataPage.content.fahrtzeitPrivatLabel.id + ']').each(function () {
	        if (showElement) {
	            $(this).show();
	        } else {
	            $(this).hide();
	        }
	    });
	}

    , showHideGefahreneKilometerLabel: function(showElement) {
        $('[id=' + DigiWebApp.EditTimeDataPage.content.gefahreneKilometerLabel.id + ']').each(function () {
            if (showElement) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    }

    , showHideGefahreneKilometer: function (showElement) {
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
            } catch (e2) { trackError(e2); }
        }
    }

    , setReisekostenFirmenwagen: function(isSet) {
        DigiWebApp.BookingController.set('fs431ReisekostenFirmenwagen', [
            {
                value: false 
                , label: M.I18N.l('fs431FahrtzeitFirmenwagen')
                , isSelected: isSet
            }
        ]);
    }

    , setReisekostenBusBahn: function(isSet) {
        DigiWebApp.BookingController.set('fs431ReisekostenBusBahn', [
            {
                value: false 
                , label: M.I18N.l('fs431FahrtzeitBusBahn')
                , isSelected: isSet
            }
        ]);
    }

    // Callback der nach dem Speichern aufgerufen werden muss, wird vom BookingController gesetzt
    , myCallback: function () {
    }
    
    // Flag, ob eine Buchung abgeschlossen wird (früher RemarkPage) oder Zeitdaten editiert werden
    , buchungAbschliessen: false

    // Flag, ob eine Feierabendbuchung bearbeitet wird
    , istFeierabendBuchung: false

    , tab_action_timeoutvar: null
    
    , tab_action: function() {
        clearTimeout(DigiWebApp.EditTimeDataPage.tab_action_timeoutvar);

        if (M.ViewManager.getView('editTimeDataPage', 'remarkInput').value.length > 255) {
            DigiWebApp.ApplicationController.DigiLoaderView.hide();
            DigiWebApp.ApplicationController.nativeAlertDialogView({
                title: M.I18N.l('remarkTooLong'),
                message: M.I18N.l('remarkTooLongMessage')
            });
        } else {
            if ((DigiWebApp.SettingsController.getSetting('remarkIsMandatory'))
                    && (M.ViewManager.getView('editTimeDataPage', 'remarkInput').value === '')
            ) {
                DigiWebApp.ApplicationController.DigiLoaderView.hide();
                DigiWebApp.ApplicationController.nativeAlertDialogView({
                    title: M.I18N.l('remarkIsMandatory'),
                    message: M.I18N.l('remarkIsMandatoryMessage')
                });
            } else {
                //if (/[[^a-zA-Z0-9_-äöüÄÖÜ,. !?;:/\\@€=]]+/.test(
                //M.ViewManager.getView('editTimeDataPage', 'remarkInput').value)) {
                if (DigiWebApp.ApplicationController.sonderzeichenCheck(
                        M.ViewManager.getView('editTimeDataPage', 'remarkInput').value)) {
                    DigiWebApp.ApplicationController.DigiLoaderView.hide();
                    DigiWebApp.ApplicationController.nativeAlertDialogView({
                        title: M.I18N.l('specialCharProblem'),
                        message: M.I18N.l('specialCharProblemMsg')
                    });
                } else {
                    var km = parseIntRadixTen(M.ViewManager.getView('editTimeDataPage',
                        'gefahreneKilometerInput').value);

                    if (km > 99999) {
                        DigiWebApp.ApplicationController.DigiLoaderView.hide();
                        DigiWebApp.ApplicationController.nativeAlertDialogView({
                            title: M.I18N.l('distanceTooFar'),
                            message: M.I18N.l('distanceTooFarMessage')
                        });
                    } else {
                        DigiWebApp.EditTimeDataPage.speichereBuchung();
                    }
                }
            } // if/else remark = ''
        } // if/else remark > 255
    }

    , speichereBuchung: function () {
        var unterschriftString = "";
        // Freischaltung 405: Unterschrift
        if ((DigiWebApp.SettingsController.featureAvailable('405'))
                && (typeof window.requestFileSystem !== "undefined") && DigiWebApp.EditTimeDataPage.signaturePadAPI
        ) {
            unterschriftString = DigiWebApp.EditTimeDataPage.signaturePadAPI.getSignatureString();
        }

        var km = parseIntRadixTen(M.ViewManager.getView('editTimeDataPage',
            'gefahreneKilometerInput').value);

        if (DigiWebApp.EditTimeDataPage.buchungAbschliessen) {
	        // Aktuelle Buchung speichern
	        DigiWebApp.BookingController.currentBooking.set('remark',
                M.ViewManager.getView('editTimeDataPage', 'remarkInput').value);

   	        DigiWebApp.BookingController.currentBooking.set('gefahreneKilometer', km);

	        if (DigiWebApp.SettingsController.featureAvailable('431')) {
	            // Fahrtkostenauswahl als Spesenauswahl speichern
	            if (km !== 0) {
	                // Auch hier muss eine Spesenauswahl gesetzt werden, für den Fall
                    // dass der User hin und her ändert.
	                DigiWebApp.BookingController.currentBooking.set('spesenAuswahl',
                        DigiWebApp.BookingController.constFs431SpesenauswahlPrivatPkw);
	            } else if (DigiWebApp.EditTimeDataPage.getCheckboxValue(
                            'editTimeDataPage', 'reisekostenFirmenwagen') === YES) {
	                DigiWebApp.BookingController.currentBooking.set('spesenAuswahl',
                        DigiWebApp.BookingController.constFs431SpesenauswahlFirmenwagen);
	            } else if (DigiWebApp.EditTimeDataPage.getCheckboxValue(
	                'editTimeDataPage', 'reisekostenBusBahn') === YES) {
	                DigiWebApp.BookingController.currentBooking.set('spesenAuswahl',
	                    DigiWebApp.BookingController.constFs431SpesenauswahlBusBahn);
	            }

	            var sel = M.ViewManager.getView('editTimeDataPage', 
                    'uebernachtungskosten').getSelection(YES);
                if (hasValue(sel)) {
                    DigiWebApp.BookingController.currentBooking.set(
                        'uebernachtungAuswahl', sel.value);
                }
            }

	        DigiWebApp.BookingController.currentBooking.save();

	        DigiWebApp.EditTimeDataPage.myCallback();
	    } else {
	        // Bemerkung, gefahreneKilometer etc in bookingToEdit speichern
	        DigiWebApp.EditTimeDataPage.bookingToEdit.set('remark',
                M.ViewManager.getView('editTimeDataPage', 'remarkInput').value);

	        if (!hasValue(km)) {
                // zweifelsfrei markieren, dass gespeichert wurde
	            km = 0;
	        }

	        DigiWebApp.EditTimeDataPage.bookingToEdit.set('gefahreneKilometer', km);

	        if (DigiWebApp.SettingsController.featureAvailable('431')) {
	            // Reisekostenauswahl als Spesenauswahl speichern
	            if (km !== 0) {
	                // Auch hier muss eine Spesenauswahl gesetzt werden, für den Fall
	                // dass der User hin und her ändert.
	                DigiWebApp.EditTimeDataPage.bookingToEdit.set('spesenAuswahl',
                        DigiWebApp.BookingController.constFs431SpesenauswahlPrivatPkw);
	            } else if (DigiWebApp.EditTimeDataPage.getCheckboxValue(
                            'editTimeDataPage', 'reisekostenFirmenwagen') === YES) {
	                DigiWebApp.EditTimeDataPage.bookingToEdit.set('spesenAuswahl', 
                        DigiWebApp.BookingController.constFs431SpesenauswahlFirmenwagen);
	            } else if (DigiWebApp.EditTimeDataPage.getCheckboxValue(
                            'editTimeDataPage', 'reisekostenBusBahn') === YES) {
	                DigiWebApp.EditTimeDataPage.bookingToEdit.set('spesenAuswahl', 
                        DigiWebApp.BookingController.constFs431SpesenauswahlBusBahn);
	            }
	        }

	        if (unterschriftString !== "") {
	            // save signature
	            DigiWebApp.EditTimeDataPage.bookingToEdit.set('fileType',
                    DigiWebApp.ApplicationController.CONSTTextFiletype);
	            DigiWebApp.EditTimeDataPage.bookingToEdit.set("unterschrift_breite",
                    DigiWebApp.EditTimeDataPage.content.signature.signatureform.signaturecanvas.canvasWidth);
	            DigiWebApp.EditTimeDataPage.bookingToEdit.set("unterschrift_hoehe",
                    DigiWebApp.EditTimeDataPage.content.signature.signatureform.signaturecanvas.canvasHeight);
	            DigiWebApp.EditTimeDataPage.bookingToEdit.save();
	            DigiWebApp.EditTimeDataPage.bookingToEdit.saveToFile(
                    unterschriftString, DigiWebApp.EditTimeDataPage.myCallback);
	        } else {
	            DigiWebApp.EditTimeDataPage.bookingToEdit.save();
	            DigiWebApp.EditTimeDataPage.myCallback();
	        }
	    }
    }

    , getCheckboxValue: function (pageName, viewName) {
        var view = M.ViewManager.getView(pageName, viewName);
        if (hasValue(view)) {
            return $('#' + view.id + ' label.ui-checkbox-on').length > 0 ? YES : NO;
        } else {
            return null;
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
						// Achtung: für den Fall "istKolonnenänderung" wird in diese Page mittels toRemarkPage gesprungen
                        if (DigiWebApp.BookingController.istKolonnenaenderung) {
                            if (DigiWebApp.SettingsController.featureAvailable('404')) {
                                DigiWebApp.NavigationController.backToButtonDashboardPage();
                            } else {
                                DigiWebApp.NavigationController.backToDashboardPage();
                            }
                        } else if (DigiWebApp.EditTimeDataPage.buchungAbschliessen) {
			    		    DigiWebApp.BookingController.set('isBackFromRemarkPage', true);
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
        childViews: 'orderbox remarkInput fahrtzeitPrivatLabel gefahreneKilometerLabel gefahreneKilometerInput reisekostenFirmenwagen reisekostenBusBahn uebernachtungskosten signature saveGrid'
        
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
            , numberOfChars: 600 // Damit die Höhe des Textfelds vergrößert wird
        })

        , fahrtzeitPrivatLabel: M.LabelView.design({
            value: M.I18N.l('fs431FahrtzeitPrivat')
            , anchorLocation: M.LEFT
        })

        , gefahreneKilometerLabel: M.LabelView.design({
            value: M.I18N.l('gefahreneKilometer')
            , anchorLocation: M.LEFT
        })

        , gefahreneKilometerInput: M.TextFieldView.design({
            // Ändern des Label wäre sehr umständlich weil kein eigener LabelView, 
            // deshalb getrennte Labels die in pagebeforeshow passend ein/ausgeblendet werden.
            label: ''
            , cssClass: 'remarkInput'
            , hasMultipleLines: NO
        	, inputType: M.INPUT_NUMBER
            , events: {
                keyup: {
                    /* executed in scope of DOMWindow because no target defined */
                    action: function (selectedValue, selectedItem) {
                        DigiWebApp.EditTimeDataPage.setReisekostenFirmenwagen(false);
                        DigiWebApp.EditTimeDataPage.setReisekostenBusBahn(false);
                    }
                }
            }
        })
            
        , reisekostenFirmenwagen: M.SelectionListView.design({
            selectionMode: M.MULTIPLE_SELECTION
            , contentBinding: {
                target: DigiWebApp.BookingController
                , property: 'fs431ReisekostenFirmenwagen'
            }
            , contentBindingReverse: {
                target: DigiWebApp.BookingController
                , property: 'fs431ReisekostenFirmenwagen'
            }
            , events: {
                change: {
                    action: function () {
                        $('#' + DigiWebApp.EditTimeDataPage.content.gefahreneKilometerInput.id).val('0');
                        M.ViewManager.getView('editTimeDataPage', 'gefahreneKilometerInput').value = '0';
                        DigiWebApp.EditTimeDataPage.setReisekostenBusBahn(false);
                    }
                }
            }
        })

        , reisekostenBusBahn: M.SelectionListView.design({
            selectionMode: M.MULTIPLE_SELECTION
            , contentBinding: {
                target: DigiWebApp.BookingController
                , property: 'fs431ReisekostenBusBahn'
            }
            , contentBindingReverse: {
                target: DigiWebApp.BookingController
                , property: 'fs431ReisekostenBusBahn'
            }
            , events: {
                change: {
                    action: function () {
                        $('#' + DigiWebApp.EditTimeDataPage.content.gefahreneKilometerInput.id).val("0");
                        M.ViewManager.getView('editTimeDataPage', 'gefahreneKilometerInput').value = "0";
                        DigiWebApp.EditTimeDataPage.setReisekostenFirmenwagen(false);
                    }
                }
            }
        })

        , uebernachtungskosten: M.SelectionListView.design({
            selectionMode: M.SINGLE_SELECTION_DIALOG
            , label: M.I18N.l('fs431UebernachtungArt')
            , initialText: M.I18N.l('noData')
            , applyTheme: NO
            , contentBinding: {
                target: DigiWebApp.BookingController
                , property: 'uebernachtungOptionen'
            }
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

                    , render: function () {
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

                , render: function () {
                    this.html += '<form method="post" action="" class="sigPad">';
                    this.renderChildViews();
                    this.html += '</form>';
                    return this.html;
                }
        	})
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

