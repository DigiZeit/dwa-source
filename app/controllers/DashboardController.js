// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: DigiWebApp
// Controller: DashboardController
// ==========================================================================
// manuell var-checked
DigiWebApp.DashboardController = M.Controller.extend({

      items: null
    
    , itemsButtons: null

    , itemsWithoutUpdate: null

    , latestId: null
    
    , lastTimestampDatatransfer: null
    
    , appCacheUpdateReady: function() {
		if (window.applicationCache) {
			if (window.applicationCache.status == window.applicationCache.UPDATEREADY) {
				return true;
			} else if (DigiWebApp.ApplicationController.timeouthappened && window.applicationCache.status !== window.applicationCache.UNCACHED) {
				try { window.applicationCache.update(); } catch(e2) { console.error(e2); }
				return (window.applicationCache.status == window.applicationCache.UPDATEREADY);
			} else {
				return (window.applicationCache.status == window.applicationCache.UPDATEREADY);
			}
		} else {
			return false;
		}
	}

	, initButtons: function(isFirstLoad) {
		var that = this;
		that.init(isFirstLoad);
		
		// aus that.items that.itemsButtons bauen
		var myButtonItem = {};
		var myitemsButtons = [];
		for (var i=0; i < that.items.length; i++) {
//			myButtonItem["button" + i % 2] = JSON.parse(JSON.stringify(that.items[i]));
//			if (i % 2 === 0 && i === that.items.length - 1) {
//				myButtonItem["button1"] = {};
//			}
//			if (i % 2 === 1 || i === that.items.length - 1) {
//				myitemsButtons.push(JSON.parse(JSON.stringify(myButtonItem)));
//				myButtonItem = {};
//			}
			myButtonItem.label = that.items[i].label;
			myButtonItem.id = that.items[i].id;
			    switch(that.items[i].label) {
			        case M.I18N.l('closingTime'):
			        	myButtonItem.icon = '48x48_plain_home.png';
			            break;
			        case M.I18N.l('dataTransfer'):
			        	myButtonItem.icon = '48x48_plain_refresh.png';
			            break;
			        case M.I18N.l('handApplications'):
			        	myButtonItem.icon = '48x48_plain_handauftrag.png';
			            break;
			        case M.I18N.l('timeData'):
			        	myButtonItem.icon = '48x48_plain_note_view.png';
			            break;
			        case M.I18N.l('orderInfo'):
			        	myButtonItem.icon = '48x48_plain_folder_view.png';
			            break;
			        case M.I18N.l('media'):
			        	myButtonItem.icon = '48x48_plain_index.png';
			            break;
			        case M.I18N.l('materialPickUp'):
			        	myButtonItem.icon = '48x48_plain_shelf.png';
			            break;
			        case M.I18N.l('dailyChecklist'):
			        	myButtonItem.icon = '48x48_plain_pda_write.png';
			            break;
			        case M.I18N.l('Anwesenheitsliste'):
			        	myButtonItem.icon = '48x48_plain_text_code.png';
			            break;
			        case M.I18N.l('Bautagebuch'):
			        	myButtonItem.icon = '48x48_plain_graphics-tablet.png';
			            break;
			        case M.I18N.l('settings'):
			        	myButtonItem.icon = '48x48_plain_gears.png';
			            break;
			        case M.I18N.l('info'):
			        	myButtonItem.icon = '48x48_plain_about.png';
			            break;
			        default:
			        	myButtonItem.icon = 'icon_info.png';
			        	break;
			    }
			myitemsButtons.push(JSON.parse(JSON.stringify(myButtonItem)));
		}
		that.set('itemsButtons', myitemsButtons);		
	}

    , init: function(isFirstLoad) {
    	if(DigiWebApp.DashboardPage.needsUpdate || isFirstLoad || this.appCacheUpdateReady()) {
        	var ChefToolOnly = (DigiWebApp.SettingsController.featureAvailable('409'));
        	var items;
        	if (ChefToolOnly) {
	            items = [
	                          {
	     	                      label: M.I18N.l('dataTransfer')
	     	                    , icon: '48x48_plain_refresh.png'
	     	                    , id: 'dataTransfer'
	     	                }
	            ];
        	} else {
	        	// Standard-Einträge
	            items = [
	                  {
	                      label: M.I18N.l('closingTime')
	                    , icon: '48x48_plain_home.png'
	                    , id: 'closingTime'
	                }
	                , {
	                      label: M.I18N.l('dataTransfer')
	                    , icon: '48x48_plain_refresh.png'
	                    , id: 'dataTransfer'
	                }
	                , {
	                      label: M.I18N.l('handApplications')
	                    , icon: '48x48_plain_handauftrag.png'
	                    , id: 'handOrder'
	                }
	                , {
	                      label: M.I18N.l('timeData')
	                    , icon: '48x48_plain_note_view.png'
	                    , id: 'timeData'
	                }
	            ];
        	}
            
            // spezielle Features, wenn freigeschaltet:

        	// Delete Handauftrag-Menuentry
        	if (DigiWebApp.SettingsController.featureAvailable('410')) {
        		items = _.map(items,function(item){
        			if (item.id !== "handOrder") return item;
        		});
        		items = _.compact(items);
        	}
        	
        	// Delete Feierabend-Menuentry
        	if (DigiWebApp.SettingsController.featureAvailable('420')) {
        		items = _.map(items,function(item){
        			if (item.id !== "closingTime") return item;
        		});
        		items = _.compact(items);
        	}
        	
            // Start::AuftragsInfo
        	var AuftragsInfoAvailable = (DigiWebApp.SettingsController.featureAvailable('406'));

        	if ( ( AuftragsInfoAvailable ) && !ChefToolOnly ) {
            	//if (DigiWebApp.SettingsController.globalDebugMode) console.log("enabling Feature 406 (AuftragsInfo)");
                items.push({
                      label: M.I18N.l('orderInfo')
                    , icon: '48x48_plain_folder_view.png'
                    , id: 'orderInfo'
                });
            }
            // End::AuftragsInfo
            
            // Start::MediaMenu
        	var TakePictureAvailable = (DigiWebApp.SettingsController.featureAvailable('400'));
            var RecordAudioAvailable = (DigiWebApp.SettingsController.featureAvailable('401'));

            if ( ( RecordAudioAvailable ) && !ChefToolOnly ) {
            	//if (DigiWebApp.SettingsController.globalDebugMode) console.log("enabling Feature MediaMenu");
                items.push({
                      label: M.I18N.l('media') + " (DEMO)"
                    , icon: '48x48_plain_camera2.png'
                    , id: 'demomedia'
                });
            }
            if ( TakePictureAvailable ) {
            	//if (DigiWebApp.SettingsController.globalDebugMode) console.log("enabling Feature MediaMenu");
                items.push({
                      label: M.I18N.l('media')
                    , icon: '48x48_plain_camera2.png'
                    , id: 'media'
                });
            }
            // End::MediaMenu
            
            // Start::Materialerfassung (402)
			var MaterialerfassungAvailable = DigiWebApp.SettingsController.featureAvailable('402');
            
//	            // disable this Feature on small devices (except if override active)
//	            if ( ($(window).width()<=480) && (DigiWebApp.SettingsController.getSetting('treatAllAsTablet') === false) ) {
//	            	MaterialerfassungAvailable = false;
//	            }
            
            if ( (MaterialerfassungAvailable) && !ChefToolOnly ) {
            	//if (DigiWebApp.SettingsController.globalDebugMode) console.log("enabling Feature 402 (Materialerfassung)");
                items.push({
                      label: M.I18N.l('materialPickUp')
                    , icon: '48x48_plain_shelf.png'
                    , id: 'materialerfassung'
                });
            }
            // End::Materialerfassung
            
            // Start::Tagescheckliste (407)
			var TageschecklisteAvailable = DigiWebApp.SettingsController.featureAvailable('407');
            
            if ( (TageschecklisteAvailable) && !ChefToolOnly ) {
            	//if (DigiWebApp.SettingsController.globalDebugMode) console.log("enabling Feature 407 (Tagescheckliste)");
                items.push({
                      label: M.I18N.l('dailyChecklist')
                    , icon: '48x48_plain_pda_write.png'
                    , id: 'tagescheckliste'
                });
            }
            // End::Tagescheckliste
            
            // Start::Anwesenheitsliste (408)
            var AnwesenheitslisteAvailable = DigiWebApp.SettingsController.featureAvailable('408');
            
            if (AnwesenheitslisteAvailable) {
            	//if (DigiWebApp.SettingsController.globalDebugMode) console.log("enabling Feature 408 (Anwesenheitsliste)");
                items.push({
                      label: M.I18N.l('Anwesenheitsliste')
                    , icon: '48x48_plain_text_code.png'
                    , id: 'anwesenheitsliste'
                });	
            }
            // End::Anwesenheitsliste

            // Start::Bautagebuch (412)
            var BautagebuchAvailable = DigiWebApp.SettingsController.featureAvailable('412');
            
            if (BautagebuchAvailable) {
            	//if (DigiWebApp.SettingsController.globalDebugMode) console.log("enabling Feature 412 (Bautagebuch)");
                items.push({
                      label: M.I18N.l('Bautagebuch')
                    , icon: '48x48_plain_graphics-tablet.png'
                    , id: 'bautagebuch'
                });	
            }
            // End::Bautagebuch

            // Start::Terminliste (423)
            var TerminlisteAvailable = DigiWebApp.SettingsController.featureAvailable('423');
            if (TerminlisteAvailable) {
                items.push({
                      label: M.I18N.l('TerminlisteLong')
                    , icon: '48x48_plain_book_blue_find.png'
                    , id: 'Terminliste'
                });	
            }
            // End::Terminliste

            // Start::FestePauseStornieren (425)
            var FestePauseStornierenAvailable = DigiWebApp.SettingsController.featureAvailable('425');
            if (FestePauseStornierenAvailable) {
                items.push({
                      label: M.I18N.l('FestePauseStornieren')
                    , icon: '48x48_plain_note_delete.png'
                    , id: 'FestePauseStornieren'
                });	
            }
            // End::FestePauseStornieren
            
            // finish the Dashboard with the Settings-, Update- and the Info-Page
            items.push({
                  label: M.I18N.l('settings')
                , icon: '48x48_plain_gears.png'
                , id: 'settings'
            });
            
            items.push({
                label: M.I18N.l('info'),
                icon: '48x48_plain_about.png',
                id: 'info'
            });
            
            /*items.push({
                label: "ButtonMenu",
                icon: 'icon_info.png',
                id: 'buttonMenu'
            });*/

            this.set('items', items);
            this.set('itemsWithoutUpdate', items);
            DigiWebApp.DashboardPage.needsUpdate = false;
            //DigiWebApp.DashboardPage.content.list.renderUpdate();
        }
    	
    	if (window.newAppVersionAvailable) {
    		var itemsWithUpdate = this.itemsWithoutUpdate;
            // add update-button if timeouthappened (not on a mobile device) and applicationCache-available
    		itemsWithUpdate.push({
                  label: M.I18N.l('updateApplication')
                , icon: '48x48_plain_replace2.png'
                , id: 'updateApplication'
            });
            this.set('items', itemsWithUpdate);
    	} else {
            this.set('items', this.itemsWithoutUpdate);
    	}

        var list = M.ViewManager.getView('dashboard', 'list');
        if (list) {
            $('#' + list.id).find('li').each(function() {
                $(this).removeClass('selected');
            });
        }
    }

    , itemSelected: function(id, m_id) {
    	try{DigiWebApp.ApplicationController.vibrate();}catch(e2){}
    	var that = this;
        if (this.latestId) {
            $('#' + this.latestId).removeClass('selected');
        }
        $('#' + id).addClass('selected');
        
//        try {
//        	var myImgId = new Number(id.substring(2)) + 1;
//	        $('#m_' + myImgId).transition({
//	            perspective: '20px',
//	            rotateX: '+=360deg'
//	        }, 500);
//        } catch(e) { console.error(e); }

        this.latestId = id;

        if (m_id && typeof(this[m_id]) === 'function') {
            this[m_id]();
        } else {
        	try {
            	var myContentBindingList = DigiWebApp.ButtonDashboardPage.content.list.contentBinding.target[DigiWebApp.ButtonDashboardPage.content.list.contentBinding.property];
            	//var myMethod = "";
            	_.each(myContentBindingList, function(item) {
            		var button = $('#' + id);
            	    var buttonHtml = button.html();
            	    var thatFunction = that[item.id];
            		if (item.label === buttonHtml && typeof(thatFunction) === 'function') {
            			thatFunction();
            		}
            	});
        	} catch(e2) {}
        }
    }
    
    , bookTime: function() {
        DigiWebApp.NavigationController.toBookTimePageTransition(YES);
    }

    , closingTime: function() {
		$('#' + DigiWebApp.DashboardPage.content.list.selectedItem.id).removeClass('selected');
		DigiWebApp.ApplicationController.DigiLoaderView.show(M.I18N.l('bucheFeierabend'));
		setTimeout(DigiWebApp.BookingController.closeDay,100);
    }

    , dataTransfer: function(isClosingDay) {
		$('#' + DigiWebApp.DashboardPage.content.list.selectedItem.id).removeClass('selected');
		
    	var startTransfer = NO;
    	if (DigiWebApp.DashboardController.lastTimestampDatatransfer !== null) {
    		var timestampNow = D8.now().getTimestamp();
    		if (timestampNow - DigiWebApp.DashboardController.lastTimestampDatatransfer > parseInt(DigiWebApp.SettingsController.getSetting('datatransfer_min_delay'))) {
    			startTransfer = YES;
    			$('#' + DigiWebApp.DashboardPage.content.list.selectedItem.id).addClass('green');
    			var t = window.setTimeout(function(){ window.clearTimeout(t); $('#' + DigiWebApp.DashboardPage.content.list.selectedItem.id).removeClass('green'); }, 500);
    		} else {
    			// evtl. Fehlermeldung, dass noch eine Datenübertragung läuft bzw. nur alle 30 Sekunden eine Datenübertragung gestartet werden darf
    			$('#' + DigiWebApp.DashboardPage.content.list.selectedItem.id).addClass('red');
    			var t = window.setTimeout(function(){ window.clearTimeout(t); $('#' + DigiWebApp.DashboardPage.content.list.selectedItem.id).removeClass('red'); }, 500);
    		}
    	}
    	if (startTransfer === YES || DigiWebApp.DashboardController.lastTimestampDatatransfer === null) {
    		DigiWebApp.ApplicationController.DigiLoaderView.show(M.I18N.l('starteDatenuebertragung'));
    		DigiWebApp.DashboardController.set("lastTimestampDatatransfer", D8.now().getTimestamp());
	        var bookings = DigiWebApp.Booking.find();
	        if(bookings.length > 0) {
	    	    var finishBooking = function() {
	    	    	DigiWebApp.BookingController.sendBookings(isClosingDay, true);
	    	    };
	        	if (DigiWebApp.SettingsController.featureAvailable('417') && DigiWebApp.SettingsController.getSetting("ServiceApp_ermittleGeokoordinate")) {
					var pollBooking = function() {
						if (DigiWebApp.SettingsController.getSetting("debug"))  console.log("polling for bookinglocations");
						// getBookings mit timeout
						var checkForOK = function(datensaetze) {
							if (DigiWebApp.SettingsController.getSetting("debug"))  console.log(datensaetze.length + " Datensätze empfangen");
							_.each(datensaetze, function(datensatzObj) {
								try {
									if (DigiWebApp.SettingsController.getSetting("debug"))  console.log("speichere gepollten Datensatz " + datensatzObj.m_id);
									var modelBooking = _.find(DigiWebApp.Booking.find(), function(b) { return b.m_id === datensatzObj.m_id; } );
									var datensatz = datensatzObj.record;
									if (DigiWebApp.SettingsController.getSetting("debug"))  console.log("modelBooking: ", modelBooking);
									if (DigiWebApp.SettingsController.getSetting("debug"))  console.log("datensatz: ", datensatz);
									modelBooking.set("latitude", datensatz.latitude);
									modelBooking.set("latitude_bis", datensatz.latitude_bis);
									modelBooking.set("longitude", datensatz.longitude);
									modelBooking.set("longitude_bis", datensatz.longitude_bis);
									modelBooking.set("ermittlungsverfahrenBis", datensatz.ermittlungsverfahren_bis);
									modelBooking.set("ermittlungsverfahrenVon", datensatz.ermittlungsverfahren);
									modelBooking.set("genauigkeitBis", datensatz.genauigkeit_bis);
									modelBooking.set("genauigkeitVon", datensatz.genauigkeit);
									modelBooking.set("gps_zeitstempelBis", datensatz.gps_zeitstempel_bis);
									modelBooking.set("gps_zeitstempelVon", datensatz.gps_zeitstempel);
									modelBooking.set("ServiceApp_Status", datensatz.status);
									modelBooking.save();
									if (DigiWebApp.SettingsController.getSetting("debug"))  console.log("datensatz " + datensatzObj.m_id + " gespeichert");
								} catch(exNotFound) {
									if (DigiWebApp.SettingsController.getSetting("debug"))  console.log("datensatz " + datensatzObj.m_id + " nicht gefunden");
								}
							});
							finishBooking();
						};
						var idsToPoll = [];
						if (DigiWebApp.BookingController.currentBooking !== null
						&& (   typeof(DigiWebApp.BookingController.currentBooking.get("timeStampEnd")) !== "undefined"
						    && parseInt(DigiWebApp.BookingController.currentBooking.get("timeStampEnd")) > 0)
						) { idsToPoll.push(DigiWebApp.BookingController.currentBooking.m_id); }
						if (DigiWebApp.BookingController.currentBookingClosed !== null) { idsToPoll.push(DigiWebApp.BookingController.currentBookingClosed.m_id); }
						//alert(idsToPoll);
						DigiWebApp.ServiceAppController.pollBookings(idsToPoll, checkForOK, finishBooking, DigiWebApp.SettingsController.getSetting('GPSTimeOut'));
					};
					pollBooking();
	        	} else {
	        		finishBooking();
	        	}
	        } else {
	            // calling startsync here
	            DigiWebApp.ApplicationController.startsync(YES);
	        }
    	}
    }

    , settings: function() {
        DigiWebApp.NavigationController.toSettingsPasswordPageTransition();
    }

    , timeData: function() {
        DigiWebApp.NavigationController.toTimeDataPageTransition();
    }

    , handOrder: function() {
        DigiWebApp.NavigationController.toHandOrderPageTransition();
    }

    , info: function() {
        DigiWebApp.NavigationController.toInfoPageTransition();
    }
        
    , demomedia: function() {
        DigiWebApp.NavigationController.toDemoMediaPageTransition();
    }
    
    , media: function() {
        DigiWebApp.NavigationController.toMediaListPageTransition();
    }
    
    , orderInfo: function() {
	    DigiWebApp.NavigationController.toOrderInfoPageTransition();
	}
	
	, updateApplication: function() {
		if (this.appCacheUpdateReady()) {
			window.applicationCache.swapCache();
			if (typeof(localStorage) !== "undefined") {
				localStorage.setItem("reloadAppOneMoreTime", "true");
			}
			if (typeof(navigator.app) !== "undefined") {
				if (typeof(location.origin) !== "undefined") {
					navigator.app.loadUrl(location.origin + location.pathname);					
				} else {
					navigator.app.loadUrl(location.protocol + '//' + location.pathname);
				}
			} else {
				window.location.reload();
			}
		} else {
			DigiWebApp.ApplicationController.nativeAlertDialogView({
    			  title: M.I18N.l('noApplicationUpdateAvailable')
    			, message: M.I18N.l('noApplicationUpdateAvailableMsg')
    		});
		}
	}
	
	, materialerfassung: function() {
		DigiWebApp.BautagebuchBautageberichteListeController.init();
		if (DigiWebApp.BautagebuchBautagesbericht.find().length > 0) {
			DigiWebApp.BautagebuchBautageberichtDetailsController.load(DigiWebApp.BautagebuchBautagesbericht.find()[0]);
		} else {
			// erzeuge dummy-bautagesbericht
			DigiWebApp.BautagebuchBautageberichteListeController.neu("<materialerfassung_only>", YES);
		}
		var myBautagesbericht = DigiWebApp.BautagebuchBautageberichtDetailsController.get("item");

//		// auftrag setzen?
////		, orderId: M.Model.attr('String',{
////	    , orderName: M.Model.attr('String',{
//		myBautagesbericht.set("orderId", );
		myBautagesbericht.set("orderName", M.I18N.l('materialPickUp'));
//		
//		// position setzen?
////	    , positionId: M.Model.attr('String',{
////	    , positionName: M.Model.attr('String',{
//		myBautagesbericht.set("positionId", );
//		myBautagesbericht.set("positionName", );
//		
//		// projektleiter setzen?

		myBautagesbericht.save();
		DigiWebApp.BautagebuchBautageberichtDetailsController.set("item", myBautagesbericht);
		DigiWebApp.BautagebuchBautageberichteListeController.init();
      	DigiWebApp.BautagebuchBautageberichtDetailsController.save(DigiWebApp.BautagebuchMaterialienListeController.neu, function(){}, YES);
	}
	
	, tagescheckliste: function() {
	    DigiWebApp.NavigationController.toStudieChecklistePage();
	}
        
	, anwesenheitsliste: function() {
	    DigiWebApp.NavigationController.toAnwesenheitslistePageTransition();
	}
        
	, bautagebuch: function() {
		var bautagesberichte = DigiWebApp.BautagebuchBautagesbericht.find();
		if (bautagesberichte.length > 0) {
			var einOffenerBautagesbericht = NO;
			var offenerBautagesbericht = null;
			_.each(bautagesberichte, function(bautagesbericht){
				if (!bautagesbericht.get("abgeschlossen")) {
					if (!einOffenerBautagesbericht) {
						einOffenerBautagesbericht = YES;
						offenerBautagesbericht = bautagesbericht;
					} else {
						einOffenerBautagesbericht = NO;
					}
				}
			});
			if (einOffenerBautagesbericht) {
				// es gibt nur einen offenen Bautagesbericht
				DigiWebApp.BautagebuchBautageberichteListeController.init();
				DigiWebApp.BautagebuchBautageberichtDetailsController.load(offenerBautagesbericht);
			} else if (offenerBautagesbericht) {
				// es gibt mehr als einen offenen Bautagesbericht
				DigiWebApp.NavigationController.toBautagebuchBautageberichteListePageTransition();
			} else {
				// es gibt keinen offenen Bautagesbericht
				DigiWebApp.BautagebuchBautageberichteListeController.init();
				DigiWebApp.BautagebuchBautageberichteListeController.neu();
			}
		} else {
			DigiWebApp.BautagebuchBautageberichteListeController.init();
			DigiWebApp.BautagebuchBautageberichteListeController.neu();
		}

	}
	
	, buttonMenu: function() {
		DigiWebApp.NavigationController.toButtonsDashboardPageFlipTransition();
	}
	
	, Terminliste: function() {
		DigiWebApp.TerminlisteController.datum = D8.create().format("dd.mm.yyyy");
		DigiWebApp.NavigationController.toTerminlistePage();
	}
	
	, FestePauseStornieren: function() {
		DigiWebApp.NavigationController.toFestePauseStornierenPage();
	}
});
