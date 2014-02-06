// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: DigiWebApp
// Controller: SettingsController
// ==========================================================================
// manuell var-checked
DigiWebApp.SettingsController = M.Controller.extend({

      showCredentialsAlert: NO
    , credentialsAlertShown: false
    , showIOSMessage: true

    , settings: null
    
    , mitarbeiterNameVorname: ""
    
    , globalDebugMode: NO
    
    , defaultsettings_object: {
    	  debug: false
    	, treatAllAsTablet: false
    	, treatAllAsPhone: false
        , company: ''
        , password: ''
        , connectionCode: ''
        , settingsPassword: 'digi$'
        , workerId: ''
        , platform: ''
        , userAgent: ''
        , skipEvents: ''
        , timeouthappened: ''
        , mapType: 'Google' // or OSM for OpenStreetMap
        , autoSyncAfterBookTime: false
        , autoTransferAfterBookTime: true
        , autoTransferAfterClosingDay: true
        , autoSaveGPSData: false
        , GPSDataIsMandatory: false
        , remarkIsMandatory: false
        , remarkIsOptional: false
        , useTransitionsSetting: true
        , daysToHoldBookingsOnDevice: '10'
        , bautagebuchLimit_autoStartUhrzeit: false
        , datatransfer_min_delay: 30000
        , branding: ''
        , GPSTimeOut: 240000
        , silentLoader: false
        , currentTimezoneOffset: null
        , currentTimezone: null
        , ServiceApp_ermittleGeokoordinate: false
        , ServiceApp_datenUebertragen: false
        , ServiceApp_engeKopplung: false
        , ServiceApp_PORT: '60000'
        , ServiceApp_FallBack: true
        , debugDatabaseServer: null
        , mitarbeiterVorname: ""
        , mitarbeiterNachname: ""
        , mitarbeiterId: "0"
        , auftragsDetailsKoppeln: false
        , detailierteZeitdaten: true
        , vibrationsDauer: 100
    }

    , defaultsettings: null
    
    , init: function(isFirstLoad, myinteractWithServiceApp) {
    	
    	var that = DigiWebApp.SettingsController;
    	
    	var interactWithServiceApp = (myinteractWithServiceApp && DigiWebApp.SettingsController.featureAvailable('417'));

    	M.I18N.defaultLanguage = "de_de";
    	
    	DigiWebApp.TabBar.setActiveTab(DigiWebApp.TabBar.tabItem2);
    	
        if (that.showCredentialsAlert && !that.credentialsAlertShown) {
            if (
            	  (    ( M.Environment.getPlatform().substr(0,4) === "iPad"   )
            	    || ( M.Environment.getPlatform().substr(0,6) === "iPhone" )
                  )
                  && ( typeof(device) !== "undefined" ) 
            ) {
            	// we are on iOS inside a native container
//            	if ((device.version >= "5.1" && DigiWebApp.SettingsController.showIOSMessage) && (false)) {
//            		DigiWebApp.NavigationController.toNoSettingsiOSPage();
//            	} else {
            		DigiWebApp.ApplicationController.enforceChefToolOnly();
            		console.log("device.version: " + device.version);
    	        	DigiWebApp.ApplicationController.nativeAlertDialogView({
    	                  title: M.I18N.l('noCredentials')
    	                , message: M.I18N.l('noCredentialsMsg')
    	            });
//            	}
            } else {
	            // any other platform
        		DigiWebApp.ApplicationController.enforceChefToolOnly();
	        	DigiWebApp.ApplicationController.nativeAlertDialogView({
	                  title: M.I18N.l('noCredentials')
	                , message: M.I18N.l('noCredentialsMsg')
	            });
            }
            that.credentialsAlertShown = true;
        }
    	
        that.defaultsettings = DigiWebApp.Settings.createRecord(DigiWebApp.SettingsController.defaultsettings_object);

        DigiWebApp.Settings.find();        
        
        // Start::Bemerkungsfeld (403)
        if (DigiWebApp.SettingsController.featureAvailable('403')) {
        	$('#' + DigiWebApp.SettingsPage.content.remarkIsMandatory.id).show();
        	$('#' + DigiWebApp.SettingsPage.content.remarkIsOptional.id).show();
        } else {
        	$('#' + DigiWebApp.SettingsPage.content.remarkIsMandatory.id).hide();
        	$('#' + DigiWebApp.SettingsPage.content.remarkIsOptional.id).hide();
        }
        // End::Bemerkungsfeld
        
        // Start::Auftragsinfo (406)
        if (DigiWebApp.SettingsController.featureAvailable('406')) {
        	$('#' + DigiWebApp.SettingsPage.content.auftragsDetailsKoppeln.id).show();
        } else {
        	$('#' + DigiWebApp.SettingsPage.content.auftragsDetailsKoppeln.id).hide();
        }
        // End::Auftragsinfo
        
        // Start::Zeitbuchungen für X Tage vorhalten (411)
        if (DigiWebApp.SettingsController.featureAvailable('411')) {
        	$('#' + DigiWebApp.SettingsPage.content.daysToHoldBookingsOnDeviceSliderContainer.id).show();
        } else {
        	$('#' + DigiWebApp.SettingsPage.content.daysToHoldBookingsOnDeviceSliderContainer.id).hide();
        }
        // End::Zeitbuchungen für X Tage vorhalten

        // Start::Bautagebuch (412)
        if (DigiWebApp.SettingsController.featureAvailable('412')) {
        	$('#' + DigiWebApp.SettingsPage.content.bautagebuchLimit_autoStartUhrzeit.id).show();
        } else {
        	$('#' + DigiWebApp.SettingsPage.content.bautagebuchLimit_autoStartUhrzeit.id).hide();
        }
        // End::Bautagebuch

        //console.log("vor enforceChefToolOnly");
        DigiWebApp.ApplicationController.enforceChefToolOnly();
        //console.log("nach enforceChefToolOnly");
        
        $('#' + DigiWebApp.SettingsPage.content.useTransitionsSetting.id).hide();
        // Start::TransitionsAvailable
        /*var p = M.Environment.getPlatform();
        if (   (p.substr(0,10) !== "BlackBerry") 
            && (navigator.userAgent.toLowerCase().indexOf("android") === -1)
        ) {
        	$('#' + DigiWebApp.SettingsPage.content.useTransitionsSetting.id).show();
        } else {
        	console.log("hiding useTransitionsSetting");
        	$('#' + DigiWebApp.SettingsPage.content.useTransitionsSetting.id).hide();
        }*/
        // End::TransitionsAvailable
        
        var settings = null;

        /* values from local storage */
        if (DigiWebApp.Settings.records().length > 0) {
        	        	
        	//console.log("loading settings from local storage");
            var record = DigiWebApp.Settings.records()[0];
        	
            var daysToHoldBookingsOnDevice = record.get('daysToHoldBookingsOnDevice');
            if (!daysToHoldBookingsOnDevice) daysToHoldBookingsOnDevice = DigiWebApp.SettingsController.defaultsettings.get("daysToHoldBookingsOnDevice");

            var vibrationsDauer = record.get('vibrationsDauer');
            if (!vibrationsDauer) {
            	var plat = "";
            	try {
            		plat = device.platform.substr(0,3);
            	} catch(e) {}
            	if (plat === "iOS") {
            		// disable vibration on iOS by default
            		vibrationsDauer = 0;
            	} else {
            		vibrationsDauer = DigiWebApp.SettingsController.defaultsettings.get("vibrationsDauer");
            	}
            }

            var GPSDataIsMandatory = record.get('GPSDataIsMandatory');
            if (!GPSDataIsMandatory) GPSDataIsMandatory = DigiWebApp.SettingsController.defaultsettings.get("GPSDataIsMandatory");
            
            var bautagebuchLimit_autoStartUhrzeit = record.get('bautagebuchLimit_autoStartUhrzeit');
            if (!bautagebuchLimit_autoStartUhrzeit) bautagebuchLimit_autoStartUhrzeit = DigiWebApp.SettingsController.defaultsettings.get("bautagebuchLimit_autoStartUhrzeit");

            settings = {
            	  debug: [{
                      value: record.get('debug')
                    , label: 'debug'
                    , isSelected: record.get('debug')
                }]
                , treatAllAsTablet: [{
                      value: record.get('treatAllAsTablet')
                    , label: 'treatAllAsTablet'
                    , isSelected: record.get('treatAllAsTablet')
                }]
                , treatAllAsPhone: [{
                      value: record.get('treatAllAsPhone')
                    , label: 'treatAllAsPhone'
                    , isSelected: record.get('treatAllAsPhone')
                }]
                , daysToHoldBookingsOnDevice: daysToHoldBookingsOnDevice
                , company: record.get('company')
                , password: record.get('password')
                , connectionCode: record.get('connectionCode')
                , settingsPassword: record.get('settingsPassword')
                , workerId: record.get('workerId')
                , timeouthappened: DigiWebApp.ApplicationController.timeouthappened
        		, skipEvents: DigiWebApp.ApplicationController.skipEvents
                , platform: M.Environment.getPlatform()
                , userAgent: navigator.userAgent
                , mapType: record.get('mapType')
                , autoSyncAfterBookTime: [{
                      value: record.get('autoSyncAfterBookTime')
                    , label: M.I18N.l('autoSyncAfterBookTimeCheck')
                    , isSelected: record.get('autoSyncAfterBookTime')
                }]
                , autoTransferAfterBookTime: [{
                      value: record.get('autoTransferAfterBookTime')
                    , label: M.I18N.l('autoTransferAfterBookTimeCheck')
                    , isSelected: record.get('autoTransferAfterBookTime')
                }]
                , autoTransferAfterClosingDay: [{
                      value: record.get('autoTransferAfterClosingDay')
                    , label: M.I18N.l('autoTransferAfterClosingDayCheck')
                    , isSelected: record.get('autoTransferAfterClosingDay')
                }]
                , autoSaveGPSData: [{
                      value: record.get('autoSaveGPSData')
                    , label: M.I18N.l('autoSaveGPSData')
                    , isSelected: record.get('autoSaveGPSData')
                }]
                , bautagebuchLimit_autoStartUhrzeit: [{
	                    value: bautagebuchLimit_autoStartUhrzeit
	                  , label: M.I18N.l('bautagebuchLimit_autoStartUhrzeit')
	                  , isSelected: bautagebuchLimit_autoStartUhrzeit
	              }]
                , GPSDataIsMandatory: [{
                      value: GPSDataIsMandatory
                    , label: M.I18N.l('GPSDataIsMandatory')
                    , isSelected: GPSDataIsMandatory
                }]
                , remarkIsMandatory: [{
                      value: record.get('remarkIsMandatory')
                    , label: M.I18N.l('remarkIsMandatory')
                    , isSelected: record.get('remarkIsMandatory')
                }]
                , remarkIsOptional: [{
	                   value: record.get('remarkIsOptional')
	                 , label: M.I18N.l('remarkIsOptional')
	                 , isSelected: record.get('remarkIsOptional')
	            }]
                , detailierteZeitdaten: [{
 	                   value: record.get('detailierteZeitdaten')
 	                 , label: M.I18N.l('detailierteZeitdaten')
 	                 , isSelected: record.get('detailierteZeitdaten')
 	            }]
                , useTransitionsSetting: [{
                      value: record.get('useTransitionsSetting')
                    , label: M.I18N.l('useTransitionsSetting')
                    , isSelected: record.get('useTransitionsSetting')
                }]
                , datatransfer_min_delay: record.get('datatransfer_min_delay')
                , branding: record.get('branding')
                , GPSTimeOut: record.get('GPSTimeOut')
                , silentLoader: record.get('silentLoader')
                , currentTimezoneOffset: record.get('currentTimezoneOffset')
                , currentTimezone: record.get('currentTimezone')
                , ServiceApp_ermittleGeokoordinate: [{
	                   value: record.get('ServiceApp_ermittleGeokoordinate')
	                 , label: M.I18N.l('ServiceApp_ermittleGeokoordinate')
	                 , isSelected: record.get('ServiceApp_ermittleGeokoordinate')
	            }]
                , ServiceApp_datenUebertragen: [{
 	                   value: record.get('ServiceApp_datenUebertragen')
 	                 , label: M.I18N.l('ServiceApp_datenUebertragen')
 	                 , isSelected: record.get('ServiceApp_datenUebertragen')
 	            }]
               , ServiceApp_engeKopplung: [{
	                   value: record.get('ServiceApp_engeKopplung')
	                 , label: M.I18N.l('ServiceApp_engeKopplung')
	                 , isSelected: record.get('ServiceApp_engeKopplung')
	            }]
               , ServiceApp_FallBack: [{
	                   value: record.get('ServiceApp_FallBack')
	                 , label: M.I18N.l('ServiceApp_FallBack')
	                 , isSelected: record.get('ServiceApp_FallBack')
	            }]
               , ServiceApp_PORT: record.get('ServiceApp_PORT')
               , debugDatabaseServer: record.get('debugDatabaseServer')
               , mitarbeiterVorname: record.get('mitarbeiterVorname')
               , mitarbeiterNachname: record.get('mitarbeiterNachname')
               , mitarbeiterId: record.get('mitarbeiterId')
	           , auftragsDetailsKoppeln: [{
	                   value: record.get('auftragsDetailsKoppeln')
	                 , label: M.I18N.l('auftragsDetailsKoppeln')
	                 , isSelected: record.get('auftragsDetailsKoppeln')
	           }]
               , vibrationsDauer: vibrationsDauer

            };
        /* default values */
        } else {
        	//console.log("using default settings");
            settings = {
                  debug: [{
                      value: DigiWebApp.SettingsController.defaultsettings.get("debug")
                    , label: 'debug'
                }]
                , treatAllAsTablet: [{
                      value: DigiWebApp.SettingsController.defaultsettings.get("treatAllAsTablet")
                    , label: 'treatAllAsTablet'
                }]
                , treatAllAsPhone: [{
                      value: DigiWebApp.SettingsController.defaultsettings.get("treatAllAsPhone")
                    , label: 'treatAllAsPhone'
                }]
                , daysToHoldBookingsOnDevice: DigiWebApp.SettingsController.defaultsettings.get("daysToHoldBookingsOnDevice")
                , company: DigiWebApp.SettingsController.defaultsettings.get("company")
                , password: DigiWebApp.SettingsController.defaultsettings.get("password")
                , connectionCode: DigiWebApp.SettingsController.defaultsettings.get("connectionCode")
                , settingsPassword: DigiWebApp.SettingsController.defaultsettings.get("settingsPassword")
                , workerId: DigiWebApp.SettingsController.defaultsettings.get("workerId")
                , timeouthappened: DigiWebApp.ApplicationController.timeouthappened
            	, skipEvents: DigiWebApp.ApplicationController.skipEvents
                , platform: M.Environment.getPlatform()
                , userAgent: navigator.userAgent
                , mapType: DigiWebApp.SettingsController.defaultsettings.get("mapType")
                , autoSyncAfterBookTime: [{
                      value: DigiWebApp.SettingsController.defaultsettings.get("autoSyncAfterBookTime")
                    , label: M.I18N.l('autoSyncAfterBookTimeCheck')
                }]
                , autoTransferAfterBookTime: [{
                      value: DigiWebApp.SettingsController.defaultsettings.get("autoTransferAfterBookTime")
                    , label: M.I18N.l('autoTransferAfterBookTimeCheck')
                }]
                , autoTransferAfterClosingDay: [{
                      value: DigiWebApp.SettingsController.defaultsettings.get("autoTransferAfterClosingDay")
                    , label: M.I18N.l('autoTransferAfterClosingDayCheck')
                }]
                , autoSaveGPSData: [{
                      value: DigiWebApp.SettingsController.defaultsettings.get("autoSaveGPSData")
                    , label: M.I18N.l('autoSaveGPSData')
                }]
                , bautagebuchLimit_autoStartUhrzeit: [{
                      value: DigiWebApp.SettingsController.defaultsettings.get("bautagebuchLimit_autoStartUhrzeit")
                    , label: M.I18N.l('bautagebuchLimit_autoStartUhrzeit')
                }]
                , GPSDataIsMandatory: [{
                      value: DigiWebApp.SettingsController.defaultsettings.get("GPSDataIsMandatory")
                    , label: M.I18N.l('GPSDataIsMandatory')
                }]
                , remarkIsMandatory: [{
                      value: DigiWebApp.SettingsController.defaultsettings.get("remarkIsMandatory")
                    , label: M.I18N.l('remarkIsMandatory')
                }]
	            , remarkIsOptional: [{
	                  value: DigiWebApp.SettingsController.defaultsettings.get("remarkIsOptional")
	                , label: M.I18N.l('remarkIsOptional')
	            }]
	            , detailierteZeitdaten: [{
  	                  value: DigiWebApp.SettingsController.defaultsettings.get("detailierteZeitdaten")
  	                , label: M.I18N.l('detailierteZeitdaten')
  	            }]
                , useTransitionsSetting: [{
                      value: DigiWebApp.SettingsController.defaultsettings.get("useTransitionsSetting")
                    , label: M.I18N.l('useTransitionsSetting')
                }]
                , datatransfer_min_delay: DigiWebApp.SettingsController.defaultsettings.get('datatransfer_min_delay')
                , branding: DigiWebApp.SettingsController.defaultsettings.get('branding')
                , GPSTimeOut: DigiWebApp.SettingsController.defaultsettings.get('GPSTimeOut')
                , silentLoader: DigiWebApp.SettingsController.defaultsettings.get('silentLoader')
                , currentTimezoneOffset: DigiWebApp.SettingsController.defaultsettings.get('currentTimezoneOffset')
                , currentTimezone: DigiWebApp.SettingsController.defaultsettings.get('currentTimezone')
	            , ServiceApp_ermittleGeokoordinate: [{
	                  value: DigiWebApp.SettingsController.defaultsettings.get("ServiceApp_ermittleGeokoordinate")
	                , label: M.I18N.l('ServiceApp_ermittleGeokoordinate')
	            }]
	            , ServiceApp_datenUebertragen: [{
	                  value: DigiWebApp.SettingsController.defaultsettings.get("ServiceApp_datenUebertragen")
	                , label: M.I18N.l('ServiceApp_datenUebertragen')
	            }]
	            , ServiceApp_engeKopplung: [{
	                  value: DigiWebApp.SettingsController.defaultsettings.get("ServiceApp_engeKopplung")
	                , label: M.I18N.l('ServiceApp_engeKopplung')
	            }]
	            , ServiceApp_FallBack: [{
  	                  value: DigiWebApp.SettingsController.defaultsettings.get("ServiceApp_FallBack")
  	                , label: M.I18N.l('ServiceApp_FallBack')
  	            }]
	            , ServiceApp_PORT: DigiWebApp.SettingsController.defaultsettings.get('ServiceApp_PORT')
	            , debugDatabaseServer: DigiWebApp.SettingsController.defaultsettings.get('debugDatabaseServer')
	            , mitarbeiterVorname: DigiWebApp.SettingsController.defaultsettings.get('mitarbeiterVorname')
	            , mitarbeiterNachname: DigiWebApp.SettingsController.defaultsettings.get('mitarbeiterNachname')
	            , mitarbeiterId: DigiWebApp.SettingsController.defaultsettings.get('mitarbeiterId')
	            , auftragsDetailsKoppeln: [{
	                  value: DigiWebApp.SettingsController.defaultsettings.get("auftragsDetailsKoppeln")
	                , label: M.I18N.l('auftragsDetailsKoppeln')
	            }]
                , vibrationsDauer: DigiWebApp.SettingsController.defaultsettings.get("vibrationsDauer")

            };
            
            record = DigiWebApp.Settings.createRecord(DigiWebApp.SettingsController.defaultsettings_object).save();
        }
                
        that.set('settings', settings);

        var fileNamesToDelete = [];
		var cleanDataDirectory = function() {
			var refreshWAIT = function() {
//				if (DigiWebApp.SettingsController.getSetting("debug"))  console.log("refreshWAIT");
				DigiWebApp.ServiceAppController.refreshWAITBookings(function(){
//					if (DigiWebApp.SettingsController.getSetting("debug"))  console.log("refreshWAIT done");
					DigiWebApp.BookingController.init(YES);
				},function(err){console.error(err);}
				, fileNamesToDelete);
			};
			if (false) {
//				if (DigiWebApp.SettingsController.getSetting("debug"))  console.log("clean DataDirectory");
				DigiWebApp.ServiceAppController.listDirectory(function(results) {
					fileNamesToDelete = [];
					_.each(results, function(fileName) {
						if (fileName.search("DigiWebAppServiceApp.*.response.json") === 0) {
							//if (DigiWebApp.SettingsController.getSetting("debug"))  console.log("delete " + fileName);
							fileNamesToDelete.push(fileName);
							//DigiWebApp.ServiceAppController.deleteFile(fileName, function(){}, function(){});
						}
					});
					refreshWAIT();
				});
			} else {
				refreshWAIT();
			}
		};

		var hideShowSettingsServiceApp = function () {
         	$('#' + DigiWebApp.SettingsPage.content.ServiceApp_datenUebertragen.id).hide();
//         	$('#' + DigiWebApp.SettingsPage.content.ServiceApp_ermittleGeokoordinate.id).hide();
//         	$('#' + DigiWebApp.SettingsPage.content.ServiceApp_engeKopplung.id).hide();
//         	$('#' + DigiWebApp.SettingsPage.content.ServiceApp_PORTGrid.id).hide();
//         	$('#' + DigiWebApp.SettingsPage.content.ServiceApp_FallBack.id).hide();
        	if (DigiWebApp.SettingsController.featureAvailable('417')) {
           	 	$('#' + DigiWebApp.SettingsPage.content.ServiceApp_PORTGrid.id).show();
	         	//$('#' + DigiWebApp.SettingsPage.content.ServiceApp_datenUebertragen.id).show();
	         	$('#' + DigiWebApp.SettingsPage.content.ServiceApp_datenUebertragen.id).hide();
	         	$('#' + DigiWebApp.SettingsPage.content.ServiceApp_ermittleGeokoordinate.id).show();
	         	$('#' + DigiWebApp.SettingsPage.content.ServiceApp_engeKopplung.id).show();
	         	$('#' + DigiWebApp.SettingsPage.content.ServiceApp_FallBack.id).show();
	             DigiWebApp.ServiceAppController.knockknock(function(data) {
	            	 				if (DigiWebApp.SettingsController.getSetting("debug"))  console.log("ServiceApp is available");
	            		         	if (JSON.parse(data) !== null) {
	            		         		try {
			            		         	var deleteBookingsInServiceappIDs = [];
			            		         	var allBookings = DigiWebApp.Booking.find();
			            		         	_.each(JSON.parse(data).GET.buchungen, function(buchung){
			            		         		var found = false;
			            		         		var datensatzObj = buchung.datensatz;
			            		         		_.each(allBookings, function(modelBooking){
			            		         			if (modelBooking.m_id === datensatzObj.m_id) {
			            		         				found = true;
			            		         			}
			            		         		});
			            		         		if (!found) {
			            		         			deleteBookingsInServiceappIDs.push(datensatzObj.m_id);
			            		         		}
			            		         	});
//			            		         	if (DigiWebApp.SettingsController.getSetting("debug"))  console.log("deleteBookingsInServiceappIDs:",deleteBookingsInServiceappIDs);
			      		  				    DigiWebApp.ServiceAppController.deleteBookings(deleteBookingsInServiceappIDs, cleanDataDirectory, cleanDataDirectory);
	            		         		} catch(e3) {
	            		         			if (interactWithServiceApp) cleanDataDirectory();
	            		         		}
	            		         	} else {
	            		         		if (interactWithServiceApp) cleanDataDirectory();
	            		         	}
	            			   }, function() {
	            				   if (DigiWebApp.SettingsController.getSetting("debug"))  console.log("ServiceApp is NOT available");
//	            		         	$('#' + DigiWebApp.SettingsPage.content.ServiceApp_datenUebertragen.id).hide();
//	            		         	$('#' + DigiWebApp.SettingsPage.content.ServiceApp_ermittleGeokoordinate.id).hide();
//	            		         	$('#' + DigiWebApp.SettingsPage.content.ServiceApp_engeKopplung.id).hide();
//	            		         	$('#' + DigiWebApp.SettingsPage.content.ServiceApp_FallBack.id).hide();
	            		         	if (interactWithServiceApp) cleanDataDirectory();
	            			   }
	            );
	        } else {
//	         	$('#' + DigiWebApp.SettingsPage.content.ServiceApp_datenUebertragen.id).hide();
//	         	$('#' + DigiWebApp.SettingsPage.content.ServiceApp_ermittleGeokoordinate.id).hide();
//	         	$('#' + DigiWebApp.SettingsPage.content.ServiceApp_engeKopplung.id).hide();
//	         	$('#' + DigiWebApp.SettingsPage.content.ServiceApp_PORTGrid.id).hide();
//	         	$('#' + DigiWebApp.SettingsPage.content.ServiceApp_FallBack.id).hide();
	         	//if (interactWithServiceApp) cleanDataDirectory();
	        }
	    };
        
        if (interactWithServiceApp && DigiWebApp.SettingsController.featureAvailable('417')) {
	        // check for ServiceApp
        	cleanDataDirectory();
        }
        hideShowSettingsServiceApp();
		DigiWebApp.ApplicationController.DigiLoaderView.hide();
	}
	
	, saveDone: YES 

    , save: function() {
		
		if (DigiWebApp.SettingsController.saveDone !== YES) {
			return;
		}
		
		DigiWebApp.SettingsController.saveDone = NO;
		
    	var debug                       = DigiWebApp.SettingsController.globalDebugMode;
    	var treatAllAsTablet            = DigiWebApp.SettingsController.getSetting('treatAllAsTablet');
    	var treatAllAsPhone             = DigiWebApp.SettingsController.getSetting('treatAllAsPhone');
    	var settingsPassword            = DigiWebApp.SettingsController.getSetting('settingsPassword');

    	//var company                     = M.ViewManager.getView('settingsPage', 'companyInput').value;
        //var password                    = M.ViewManager.getView('settingsPage', 'passwordInput').value;
        //var connectionCode              = M.ViewManager.getView('settingsPage', 'connectionCodeInput').value;
        //var workerId                    = M.ViewManager.getView('settingsPage', 'workerIdInput').value;

    	var daysToHoldBookingsOnDevice  = $('#' + M.ViewManager.getView('settingsPage', 'daysToHoldBookingsOnDeviceSlider').id).val();
    	var company                     = $('#' + M.ViewManager.getView('settingsPage', 'companyInput').id).val();
        var password                    = $('#' + M.ViewManager.getView('settingsPage', 'passwordInput').id).val();
        var connectionCode              = $('#' + M.ViewManager.getView('settingsPage', 'connectionCodeInput').id).val();
        var workerId                    = $('#' + M.ViewManager.getView('settingsPage', 'workerIdInput').id).val();
        var timeouthappened             = DigiWebApp.ApplicationController.timeouthappened;
        var skipEvents                  = DigiWebApp.ApplicationController.skipEvents;
        var platform                    = M.Environment.getPlatform();
        var userAgent                   = navigator.userAgent;
    	var mapType                     = DigiWebApp.SettingsController.getSetting('mapType');
        var autoSyncAfterBookTime       = $('#' + M.ViewManager.getView('settingsPage', 'autoSyncAfterBookTimeCheck').id       + ' label.ui-checkbox-on').length > 0 ? YES : NO;
        var autoTransferAfterBookTime   = $('#' + M.ViewManager.getView('settingsPage', 'autoTransferAfterBookTimeCheck').id   + ' label.ui-checkbox-on').length > 0 ? YES : NO;
        var autoTransferAfterClosingDay = $('#' + M.ViewManager.getView('settingsPage', 'autoTransferAfterClosingDayCheck').id + ' label.ui-checkbox-on').length > 0 ? YES : NO;
        var autoSaveGPSData             = $('#' + M.ViewManager.getView('settingsPage', 'autoSaveGPSData').id                  + ' label.ui-checkbox-on').length > 0 ? YES : NO;
        var useTransitionsSetting       = $('#' + M.ViewManager.getView('settingsPage', 'useTransitionsSetting').id + ' label.ui-checkbox-on').length > 0 ? YES : NO;

        var remarkIsMandatory = NO;
        if (M.ViewManager.getView('settingsPage', 'remarkIsMandatory') !== null) {
        	remarkIsMandatory = $('#' + M.ViewManager.getView('settingsPage', 'remarkIsMandatory').id + ' label.ui-checkbox-on').length > 0 ? YES : NO;
        }

        var remarkIsOptional = NO;
        if (M.ViewManager.getView('settingsPage', 'remarkIsOptional') !== null) {
        	remarkIsOptional = $('#' + M.ViewManager.getView('settingsPage', 'remarkIsOptional').id + ' label.ui-checkbox-on').length > 0 ? YES : NO;
        	if (remarkIsOptional === YES) {
        		remarkIsMandatory = NO;
        	}
        }

        var detailierteZeitdaten         = $('#' + M.ViewManager.getView('settingsPage', 'detailierteZeitdaten').id            + ' label.ui-checkbox-on').length > 0 ? YES : NO;

        var GPSDataIsMandatory = NO;
        if (M.ViewManager.getView('settingsPage', 'GPSDataIsMandatory') !== null) {
        	GPSDataIsMandatory = $('#' + M.ViewManager.getView('settingsPage', 'GPSDataIsMandatory').id + ' label.ui-checkbox-on').length > 0 ? YES : NO;
        }

        var bautagebuchLimit_autoStartUhrzeit = NO;
        if (M.ViewManager.getView('settingsPage', 'bautagebuchLimit_autoStartUhrzeit') !== null) {
        	bautagebuchLimit_autoStartUhrzeit = $('#' + M.ViewManager.getView('settingsPage', 'bautagebuchLimit_autoStartUhrzeit').id + ' label.ui-checkbox-on').length > 0 ? YES : NO;
        }
        
        var datatransfer_min_delay      = DigiWebApp.SettingsController.getSetting('datatransfer_min_delay');
        var branding                    = DigiWebApp.SettingsController.getSetting('branding');
        var GPSTimeOut                  = DigiWebApp.SettingsController.getSetting('GPSTimeOut');
        var silentLoader                = DigiWebApp.SettingsController.getSetting('silentLoader');
    	var currentTimezoneOffset       = DigiWebApp.SettingsController.getSetting('currentTimezoneOffset');
    	var currentTimezone             = DigiWebApp.SettingsController.getSetting('currentTimezone');

        var ServiceApp_ermittleGeokoordinate = DigiWebApp.SettingsController.getSetting('ServiceApp_ermittleGeokoordinate');
        if (M.ViewManager.getView('settingsPage', 'ServiceApp_ermittleGeokoordinate') !== null) {
        	ServiceApp_ermittleGeokoordinate = $('#' + M.ViewManager.getView('settingsPage', 'ServiceApp_ermittleGeokoordinate').id + ' label.ui-checkbox-on').length > 0 ? YES : NO;
        }
        var ServiceApp_datenUebertragen      = DigiWebApp.SettingsController.getSetting('ServiceApp_datenUebertragen');
        if (M.ViewManager.getView('settingsPage', 'ServiceApp_datenUebertragen') !== null) {
        	ServiceApp_datenUebertragen = $('#' + M.ViewManager.getView('settingsPage', 'ServiceApp_datenUebertragen').id + ' label.ui-checkbox-on').length > 0 ? YES : NO;
        }
        var ServiceApp_engeKopplung          = DigiWebApp.SettingsController.getSetting('ServiceApp_engeKopplung');
        if (M.ViewManager.getView('settingsPage', 'ServiceApp_engeKopplung') !== null) {
        	ServiceApp_engeKopplung = $('#' + M.ViewManager.getView('settingsPage', 'ServiceApp_engeKopplung').id + ' label.ui-checkbox-on').length > 0 ? YES : NO;
        }
        var ServiceApp_FallBack          	 = DigiWebApp.SettingsController.getSetting('ServiceApp_FallBack');
        if (M.ViewManager.getView('settingsPage', 'ServiceApp_FallBack') !== null) {
        	ServiceApp_FallBack = $('#' + M.ViewManager.getView('settingsPage', 'ServiceApp_FallBack').id + ' label.ui-checkbox-on').length > 0 ? YES : NO;
        }
        var ServiceApp_PORT                  = DigiWebApp.SettingsController.getSetting('ServiceApp_PORT');
        if (M.ViewManager.getView('settingsPage', 'ServiceApp_PORTInput') !== null) {
        	ServiceApp_PORT = $('#' + M.ViewManager.getView('settingsPage', 'ServiceApp_PORTInput').id).val();
        }

        var debugDatabaseServer              = DigiWebApp.SettingsController.getSetting('debugDatabaseServer');
        var mitarbeiterVorname               = DigiWebApp.SettingsController.getSetting('mitarbeiterVorname');
        var mitarbeiterNachname              = DigiWebApp.SettingsController.getSetting('mitarbeiterNachname');
        var mitarbeiterId                    = DigiWebApp.SettingsController.getSetting('mitarbeiterId');
        var auftragsDetailsKoppeln			 = $('#' + M.ViewManager.getView('settingsPage', 'auftragsDetailsKoppeln').id + ' label.ui-checkbox-on').length > 0 ? YES : NO;
    	var vibrationsDauer                  = $('#' + M.ViewManager.getView('settingsPage', 'vibrationsDauerSlider').id).val();

        var numberRegex = /^[0-9]+$/;
        if (company) {
            if(!numberRegex.test(company)) {
                DigiWebApp.ApplicationController.nativeAlertDialogView({
                      title: M.I18N.l('inputError')
                    , message: M.I18N.l('inputErrorOnlyNumbers') + ':<br />' + M.I18N.l('company')
                });
                DigiWebApp.SettingsController.saveDone = YES;
                return;
            }
        }
        if (workerId) {
            if(!numberRegex.test(workerId)) {
                DigiWebApp.ApplicationController.nativeAlertDialogView({
                      title: M.I18N.l('inputError')
                    , message: M.I18N.l('inputErrorOnlyNumbers') + ':<br />' + M.I18N.l('workerId')
                });
                DigiWebApp.SettingsController.saveDone = YES;
                return;
            }
        }
        if (daysToHoldBookingsOnDevice) {
            if(!numberRegex.test(daysToHoldBookingsOnDevice)) {
                DigiWebApp.ApplicationController.nativeAlertDialogView({
                      title: M.I18N.l('inputError')
                    , message: M.I18N.l('inputErrorOnlyNumbers') + ':<br />' + M.I18N.l('daysToHoldBookingsOnDeviceLabel')
                });
                DigiWebApp.SettingsController.saveDone = YES;
                return;
            }
        }


        //M.DialogView.confirm({
        DigiWebApp.ApplicationController.nativeConfirmDialogView({
              title: M.I18N.l('hint')
            , message: M.I18N.l('confirmSaveOfSettings')
            , callbacks: {
                  confirm: {
                    action: function() {
                        var record = DigiWebApp.Settings.find()[0];
                        /* if there already is a record, update it */
                        if(record) {

                            /* if some of the hard stuff changed, check for open and not-transfered bookings */
                            var isNew = record.get('company') == '' && record.get('password') == '' && record.get('connectionCode') == '' && record.get('workerId') == '';
                            if (!isNew && (    record.get('company')        != company
                            				|| record.get('password')       != password
                            				|| record.get('connectionCode') != connectionCode
                            				|| record.get('workerId')       != workerId
                            				)
                            	) {

                            	DigiWebApp.RequestController.DatabaseServer = null;
                            	
                                /* check for open bookings */
                                var bookings = DigiWebApp.Booking.find();
                                if(bookings.length > 0) {
                                    //M.DialogView.confirm({
                                    DigiWebApp.ApplicationController.nativeConfirmDialogView({
                                          title: M.I18N.l('hint')
                                        , message: M.I18N.l('openBookingsOverwriteBySettingsUpdate')
                                        , callbacks: {
                                              confirm: {
                                                action: function() {
                                                    /* reset the app */
                                    				DigiWebApp.ApplicationController.restartApp = YES;
                                    				record.set('debug', debug);
                            						record.set('treatAllAsTablet', treatAllAsTablet);
                                                	record.set('treatAllAsPhone', treatAllAsPhone);
                                        			record.set('daysToHoldBookingsOnDevice', daysToHoldBookingsOnDevice);
                                        			record.set('company', company);
                                                    record.set('password', password);
                                                    record.set('connectionCode', connectionCode);
                                                    record.set('settingsPassword', settingsPassword);
                                                    record.set('workerId', workerId);
                                                    record.set('timeouthappened', timeouthappened);
                                                    record.set('skipEvents', skipEvents);
                                                    record.set('platform', platform);
                                                    record.set('userAgent', userAgent);
                                                    record.set('mapType', mapType);
                                                    record.set('autoSyncAfterBookTime', autoSyncAfterBookTime);
                                                    record.set('autoTransferAfterBookTime', autoTransferAfterBookTime);
                                                    record.set('autoTransferAfterClosingDay', autoTransferAfterClosingDay);
                                                    record.set('autoSaveGPSData', autoSaveGPSData);
                                                    record.set('bautagebuchLimit_autoStartUhrzeit', bautagebuchLimit_autoStartUhrzeit);
                                                    record.set('GPSDataIsMandatory', GPSDataIsMandatory);
                                                    record.set('remarkIsMandatory', remarkIsMandatory);
                                                    record.set('remarkIsOptional', remarkIsOptional);
                                                    record.set('detailierteZeitdaten', detailierteZeitdaten);
                                                    record.set('useTransitionsSetting', useTransitionsSetting);
                                                    record.set('datatransfer_min_delay', datatransfer_min_delay);
                                                    record.set('branding', branding);
                                                    record.set('GPSTimeOut', GPSTimeOut);
                                                    record.set('silentLoader', silentLoader);
                                                    record.set('currentTimezoneOffset', currentTimezoneOffset);
                                                    record.set('currentTimezone', currentTimezone);
                                                    record.set('ServiceApp_ermittleGeokoordinate', ServiceApp_ermittleGeokoordinate);
                                                    record.set('ServiceApp_datenUebertragen', ServiceApp_datenUebertragen);
                                                    record.set('ServiceApp_engeKopplung', ServiceApp_engeKopplung);
                                                    record.set('ServiceApp_PORT', ServiceApp_PORT);
                                                    record.set('ServiceApp_FallBack', ServiceApp_FallBack);
                                                    record.set('debugDatabaseServer', debugDatabaseServer);
                                                    record.set('mitarbeiterVorname', mitarbeiterVorname);
                                                    record.set('mitarbeiterNachname', mitarbeiterNachname);
                                                    record.set('mitarbeiterId', mitarbeiterId);
                                                    record.set('auftragsDetailsKoppeln', auftragsDetailsKoppeln);
                                                    record.set('vibrationsDauer', vibrationsDauer);

                                                    /* now save */
                                                    //alert("saveSettings (if(record) == true)");
                                                    DigiWebApp.SettingsController.saveSettings(record, YES);
                                            		DigiWebApp.SettingsController.saveDone = YES;
                                                }
                                            }
                                            , cancel: {
                                                action: function() {
                                                	//DialogView.alert with action
                                                	//M.DialogView.alert({
													DigiWebApp.ApplicationController.nativeAlertDialogView({
                                                          title: M.I18N.l('hint')
                                                        , message: M.I18N.l('settingsUpdateCanceled')
                                                        , callbacks: {
                                                            confirm: {
                                                                action: function() {
																	if (DigiWebApp.SettingsController.featureAvailable('404')) {
	                                                                    DigiWebApp.NavigationController.backToButtonDashboardPage();
																	} else {
	                                                                    DigiWebApp.NavigationController.backToDashboardPage();
																	}
                                                            		DigiWebApp.SettingsController.saveDone = YES;
                                                                }
                                                            }
                                                        }
                                                    });
                                                }
                                            }
                                        }
                                    });
                                } else {
                    				DigiWebApp.ApplicationController.restartApp = YES;
                                	record.set('debug', debug);
                                	record.set('treatAllAsTablet', treatAllAsTablet);
                                	record.set('treatAllAsPhone', treatAllAsPhone);
                        			record.set('daysToHoldBookingsOnDevice', daysToHoldBookingsOnDevice);
                                	record.set('company', company);
                                    record.set('password', password);
                                    record.set('connectionCode', connectionCode);
                                    record.set('settingsPassword', settingsPassword);
                                    record.set('workerId', workerId);
                                    record.set('timeouthappened', timeouthappened);
                                    record.set('skipEvents', skipEvents);
                                    record.set('platform', platform);
                                    record.set('userAgent', userAgent);
                                    record.set('mapType', mapType);
                                    record.set('autoSyncAfterBookTime', autoSyncAfterBookTime);
                                    record.set('autoTransferAfterBookTime', autoTransferAfterBookTime);
                                    record.set('autoTransferAfterClosingDay', autoTransferAfterClosingDay);
                                    record.set('autoSaveGPSData', autoSaveGPSData);
                                    record.set('bautagebuchLimit_autoStartUhrzeit', bautagebuchLimit_autoStartUhrzeit);
                                    record.set('GPSDataIsMandatory', GPSDataIsMandatory);
                                    record.set('remarkIsMandatory', remarkIsMandatory);
                                    record.set('remarkIsOptional', remarkIsOptional);
                                    record.set('detailierteZeitdaten', detailierteZeitdaten);
                                    record.set('useTransitionsSetting', useTransitionsSetting);
                                    record.set('datatransfer_min_delay', datatransfer_min_delay);
                                    record.set('branding', branding);
                                    record.set('GPSTimeOut', GPSTimeOut);
                                    record.set('silentLoader', silentLoader);
                                    record.set('currentTimezoneOffset', currentTimezoneOffset);
                                    record.set('currentTimezone', currentTimezone);
                                    record.set('ServiceApp_ermittleGeokoordinate', ServiceApp_ermittleGeokoordinate);
                                    record.set('ServiceApp_datenUebertragen', ServiceApp_datenUebertragen);
                                    record.set('ServiceApp_engeKopplung', ServiceApp_engeKopplung);
                                    record.set('ServiceApp_PORT', ServiceApp_PORT);
                                    record.set('ServiceApp_FallBack', ServiceApp_FallBack);
                                    record.set('debugDatabaseServer', debugDatabaseServer);
                                    record.set('mitarbeiterVorname', mitarbeiterVorname);
                                    record.set('mitarbeiterNachname', mitarbeiterNachname);
                                    record.set('mitarbeiterId', mitarbeiterId);
                                    record.set('auftragsDetailsKoppeln', auftragsDetailsKoppeln);
                                    record.set('vibrationsDauer', vibrationsDauer);

                                    /* now save */
                                    //alert("saveSettings (if(record) == false)");
                                    DigiWebApp.SettingsController.saveSettings(record, YES);
                            		DigiWebApp.SettingsController.saveDone = YES;
                                }
                            } else if (isNew) {
                            	record.set('debug', debug);
                            	record.set('treatAllAsTablet', treatAllAsTablet);
                            	record.set('treatAllAsPhone', treatAllAsPhone);
                    			record.set('daysToHoldBookingsOnDevice', daysToHoldBookingsOnDevice);
                            	record.set('company', company);
                                record.set('password', password);
                                record.set('connectionCode', connectionCode);
                                record.set('settingsPassword', settingsPassword);
                                record.set('workerId', workerId);
                                record.set('timeouthappened', timeouthappened);
                                record.set('skipEvents', skipEvents);
                                record.set('platform', platform);
                                record.set('userAgent', userAgent);
                                record.set('mapType', mapType);
                                record.set('autoSyncAfterBookTime', autoSyncAfterBookTime);
                                record.set('autoTransferAfterBookTime', autoTransferAfterBookTime);
                                record.set('autoTransferAfterClosingDay', autoTransferAfterClosingDay);
                                record.set('autoSaveGPSData', autoSaveGPSData);
                                record.set('bautagebuchLimit_autoStartUhrzeit', bautagebuchLimit_autoStartUhrzeit);
                                record.set('GPSDataIsMandatory', GPSDataIsMandatory);
                                record.set('remarkIsMandatory', remarkIsMandatory);
                                record.set('remarkIsOptional', remarkIsOptional);
                                record.set('detailierteZeitdaten', detailierteZeitdaten);
                                record.set('useTransitionsSetting', useTransitionsSetting);
                                record.set('datatransfer_min_delay', datatransfer_min_delay);
                                record.set('branding', branding);
                                record.set('GPSTimeOut', GPSTimeOut);
                                record.set('silentLoader', silentLoader);
                                record.set('currentTimezoneOffset', currentTimezoneOffset);
                                record.set('currentTimezone', currentTimezone);
                                record.set('ServiceApp_ermittleGeokoordinate', ServiceApp_ermittleGeokoordinate);
                                record.set('ServiceApp_datenUebertragen', ServiceApp_datenUebertragen);
                                record.set('ServiceApp_engeKopplung', ServiceApp_engeKopplung);
                                record.set('ServiceApp_PORT', ServiceApp_PORT);
                                record.set('ServiceApp_FallBack', ServiceApp_FallBack);
                                record.set('debugDatabaseServer', debugDatabaseServer);
                                record.set('mitarbeiterVorname', mitarbeiterVorname);
                                record.set('mitarbeiterNachname', mitarbeiterNachname);
                                record.set('mitarbeiterId', mitarbeiterId);
                                record.set('auftragsDetailsKoppeln', auftragsDetailsKoppeln);
                                record.set('vibrationsDauer', vibrationsDauer);

                                /* now save */
                                //alert("saveSettings (isNew)");
                                //console.log(record)
                                DigiWebApp.SettingsController.saveSettings(record, YES);
                        		DigiWebApp.SettingsController.saveDone = YES;
                            } else {
                            	record.set('debug', debug);
                            	record.set('treatAllAsTablet', treatAllAsTablet);
                            	record.set('treatAllAsPhone', treatAllAsPhone);
                    			record.set('daysToHoldBookingsOnDevice', daysToHoldBookingsOnDevice);
                            	record.set('company', company);
                                record.set('password', password);
                                record.set('connectionCode', connectionCode);
                                record.set('settingsPassword', settingsPassword);
                                record.set('workerId', workerId);
                                record.set('timeouthappened', timeouthappened);
                                record.set('skipEvents', skipEvents);
                                record.set('platform', platform);
                                record.set('userAgent', userAgent);
                                record.set('mapType', mapType);
                                record.set('autoSyncAfterBookTime', autoSyncAfterBookTime);
                                record.set('autoTransferAfterBookTime', autoTransferAfterBookTime);
                                record.set('autoTransferAfterClosingDay', autoTransferAfterClosingDay);
                                record.set('autoSaveGPSData', autoSaveGPSData);
                                record.set('bautagebuchLimit_autoStartUhrzeit', bautagebuchLimit_autoStartUhrzeit);
                                record.set('GPSDataIsMandatory', GPSDataIsMandatory);
                                record.set('remarkIsMandatory', remarkIsMandatory);
                                record.set('remarkIsOptional', remarkIsOptional);
                                record.set('detailierteZeitdaten', detailierteZeitdaten);
                                record.set('useTransitionsSetting', useTransitionsSetting);
                                record.set('datatransfer_min_delay', datatransfer_min_delay);
                                record.set('branding', branding);
                                record.set('GPSTimeOut', GPSTimeOut);
                                record.set('silentLoader', silentLoader);
                                record.set('currentTimezoneOffset', currentTimezoneOffset);
                                record.set('currentTimezone', currentTimezone);
                                record.set('ServiceApp_ermittleGeokoordinate', ServiceApp_ermittleGeokoordinate);
                                record.set('ServiceApp_datenUebertragen', ServiceApp_datenUebertragen);
                                record.set('ServiceApp_engeKopplung', ServiceApp_engeKopplung);
                                record.set('ServiceApp_PORT', ServiceApp_PORT);
                                record.set('ServiceApp_FallBack', ServiceApp_FallBack);
                                record.set('debugDatabaseServer', debugDatabaseServer);
                                record.set('mitarbeiterVorname', mitarbeiterVorname);
                                record.set('mitarbeiterNachname', mitarbeiterNachname);
                                record.set('mitarbeiterId', mitarbeiterId);
                                record.set('auftragsDetailsKoppeln', auftragsDetailsKoppeln);
                                record.set('vibrationsDauer', vibrationsDauer);

                                /* now save */
                                //alert("saveSettings (not isNew)");
                                DigiWebApp.SettingsController.saveSettings(record);
                        		DigiWebApp.SettingsController.saveDone = YES;
                            }
                        /* otherwise create a new one */
                        } else {
                            record = DigiWebApp.Settings.createRecord({
                            	  debug: debug
                            	, treatAllAsTablet: treatAllAsTablet
                            	, treatAllAsPhone: treatAllAsPhone
                            	, daysToHoldBookingsOnDevice: daysToHoldBookingsOnDevice
                            	, company: company
                                , password: password
                                , connectionCode: connectionCode
                                , settingsPassword: settingsPassword
                                , workerId: workerId
                                , timeouthappened: timeouthappened
                            	, skipEvents: skipEvents
                                , platform: platform
                                , userAgent: userAgent
                                , mapType: mapType
                                , autoSyncAfterBookTime: autoSyncAfterBookTime
                                , autoTransferAfterBookTime: autoTransferAfterBookTime
                                , autoTransferAfterClosingDay: autoTransferAfterClosingDay
                                , autoSaveGPSData: autoSaveGPSData
                                , GPSDataIsMandatory: GPSDataIsMandatory
                                , bautagebuchLimit_autoStartUhrzeit: bautagebuchLimit_autoStartUhrzeit
                                , remarkIsMandatory: remarkIsMandatory
                                , remarkIsOptional: remarkIsOptional
                                , detailierteZeitdaten: detailierteZeitdaten
                                , useTransitionsSetting: useTransitionsSetting
                                , datatransfer_min_delay: datatransfer_min_delay
                                , branding: branding
                                , GPSTimeOut: GPSTimeOut
                                , silentLoader: silentLoader
                                , currentTimezoneOffset: currentTimezoneOffset
                                , currentTimezone: currentTimezone
                                , ServiceApp_ermittleGeokoordinate: ServiceApp_ermittleGeokoordinate
                                , ServiceApp_datenUebertragen: ServiceApp_datenUebertragen
                                , ServiceApp_engeKopplung: ServiceApp_engeKopplung
                                , ServiceApp_PORT: ServiceApp_PORT
                                , ServiceApp_FallBack: ServiceApp_FallBack
                                , debugDatabaseServer: debugDatabaseServer
                                , mitarbeiterVorname: mitarbeiterVorname
                                , mitarbeiterNachname: mitarbeiterNachname
                                , mitarbeiterId: mitarbeiterId
                                , auftragsDetailsKoppeln: auftragsDetailsKoppeln
                                , vibrationsDauer: vibrationsDauer

                          });

                            /* now save */
                            //alert("saveSettings (createNewOne)");
                            DigiWebApp.SettingsController.saveSettings(record);
                    		DigiWebApp.SettingsController.saveDone = YES;
                        }
                    }
                }
                , cancel: {
                    action: function() {
            			DigiWebApp.SettingsController.saveDone = YES;
                        return;
                    }
                }
            }
        });
    }

    , saveSettings: function(record, reloadApplication, silent, superSilent) {

        /* clear the LS if its a reload */
        if (reloadApplication) {
			DigiWebApp.ApplicationController.deleteAllData(); 
        	DigiWebApp.BookingController.currentBooking = null;
        	if (typeof(DigiWebAppOrdinaryDesign.bookingPageWithIconsScholpp) !== "undefined") {
            	$('#' + DigiWebApp.BookingPageWithIconsScholpp.content.currentBookingLabel.id).html("");
        	} else {
            	$('#' + DigiWebApp.BookingPage.content.currentBookingLabel.id).html("");
        	}
        }

        if (record.save()) {
        	DigiWebApp.SettingsController.mitarbeiterNameVorname = "";
        	//console.log("record saved");
        	//console.log(record);
        	if (!superSilent) {
	            if (!reloadApplication) {
	                // switch back to dashboard
	            	if (silent) {
	                    if (DigiWebApp.ApplicationController.profilingIntervalVar === null) {
	                    	if (DigiWebApp.ApplicationController.syncRunning !== YES) {
								if (DigiWebApp.SettingsController.featureAvailable('404')) {
	                                DigiWebApp.NavigationController.backToButtonDashboardPage();
								} else {
	                                DigiWebApp.NavigationController.backToDashboardPage();
								}
	                    	}
	                    }
	            	} else {
		                //DialogView.alert with action
		                //M.DialogView.alert({
		                DigiWebApp.ApplicationController.nativeAlertDialogView({
		                      title: M.I18N.l('hint')
		                    , message: M.I18N.l('settingsSaveDone')
		                    , callbacks: {
		                        confirm: {
		                            action: function() {
										if (DigiWebApp.SettingsController.featureAvailable('404')) {
				                            DigiWebApp.NavigationController.backToButtonDashboardPage();
										} else {
				                            DigiWebApp.NavigationController.backToDashboardPage();
										}
		                            }
		                        }
		                    }
		                });
	            	}
	            } else {
	            	//DialogView.alert with action
	                //M.DialogView.alert({
	                DigiWebApp.ApplicationController.nativeAlertDialogView({
	                      title: M.I18N.l('hint')
	                    , message: M.I18N.l('settingsSaveDoneReloadApp')
	                    , callbacks: {
	                        confirm: {
	                            action: function() {
	                                //location.href = location.protocol + '//' + location.host + location.pathname;
	                				DigiWebApp.SettingsController.showCredentialsAlert = NO;
	                				DigiWebApp.ApplicationController.init(true);
	                			}
	                        }
	                    }
	                });
	            }
        	}
        } else {
            //M.DialogView.alert({
            DigiWebApp.ApplicationController.nativeAlertDialogView({
                  title: M.I18N.l('error')
                , message: M.I18N.l('settingsSaveError')
            });
        }
    }

    , getSetting: function(prop) {
        var setting = DigiWebApp.Settings.find()[0];
        if ( typeof(setting) !== "undefined" ) {
        	var propvalue = setting.get(prop); 
        	if ( typeof(propvalue) === "undefined" || (propvalue !== null && typeof(propvalue["xsi:nil"]) !== "undefined" && (propvalue["xsi:nil"] === "true" || propvalue["xsi:nil"] === true))) { 
        		try {
        			propvalue = DigiWebApp.SettingsController.defaultsettings_object[prop];
        			setting.set(prop, propvalue);
        		} catch(e4) { console.error("ERROR: setting.get for prop=" + prop); }
        	}
            return propvalue;
        }
    }

    , setSetting: function(prop, value) {
        var setting = DigiWebApp.Settings.find()[0];
        if ( typeof(setting) !== "undefined" ) {
        	try {
        		setting.set(prop, value);
    		} catch(e5) { console.error("ERROR: setting.set for prop=" + prop); }
        	if ((prop === "currentTimezoneOffset") || (prop === "currentTimezone")) {
        		// be superSilent
        		DigiWebApp.SettingsController.saveSettings(setting, NO, YES, YES);
        	} else {
        		DigiWebApp.SettingsController.saveSettings(setting, NO, YES);
        	}
        }
    }
      
	, featureAvailable: function(featureId) {
			
		if ( typeof(featureId) !== "string" ) {
			return false;
		}
	
		if ( featureId.length === 0) {
			return false;
		}
	
		var FeatureSetting = _.select(DigiWebApp.Features.find(), function(f) {
		    if (f) return f.get('id') === featureId;
		})[0];
	
		if (typeof(FeatureSetting) === "undefined") {
			return false;
		} else {
			return (FeatureSetting.get('isAvailable') === "true");
		}
	
	}
	
	, refreshMitarbeiterNameVorname: function(MitarbeiterWebAppID, callback) {
        try {
        	DigiWebApp.Anwesenheitsliste.find({urlParams:{},callbacks: {success: { action: function(records) {
        		try { 
        			_.each(records, function(record) {
        				try { if (record.get("geraeteId") === MitarbeiterWebAppID) DigiWebApp.SettingsController.mitarbeiterNameVorname = record.get("nameVorname");} catch(e6) { console.error(e6); }
        			}); 
        			if (callback) {
        				callback();
        			}
        		} catch(e7) { console.error(e7); }
        	}}, error: { action: function(){}}}});
        } catch(e8) { console.error(e8); }
	}

    , sendConfiguration: function() {
    	//alert("in sendConfiguration");
        var settings = DigiWebApp.Settings.find();    		
    	//alert("typeof(settings)=" + typeof(settings));
    	//var MitarbeiterWebAppID = "0";
    	//try { MitarbeiterWebAppID = settings[0].get("workerId"); } catch(e) { console.error(e); }
    	//alert("typeof(DigiWebApp.RequestController.sendConfiguration)=" + typeof(DigiWebApp.RequestController.sendConfiguration));
        DigiWebApp.RequestController.sendConfiguration({
              settings: settings
            , success: {
                  target: this
                , action: function() {
        			// Konfiguration erfolgreich übertragen
		        	if (DigiWebApp.ApplicationController.profilingIntervalVar === null) {
		            	DigiWebApp.NavigationController.toBookTimePageTransition();
		            	//DigiWebApp.NavigationController.toDashboardPageFlipTransition(YES);
		        	}
	                // empfange den konfigurierten Mitarbeiternamen
//		        	DigiWebApp.JSONDatenuebertragungController.recieveData("mitarbeiter",M.I18N.l('BautagebuchLadeMitarbeiter'),function(data){
//		        		if (data && data.mitarbeiter && data.mitarbeiter.length > 0) {
//		        			DigiWebApp.SettingsController.setSetting("mitarbeiterVorname", data.mitarbeiter[0].vorname);
//		        			DigiWebApp.SettingsController.setSetting("mitarbeiterNachname", data.mitarbeiter[0].nachname);
//		        			DigiWebApp.SettingsController.setSetting("mitarbeiterId", data.mitarbeiter[0].mitarbeiterId);
//		        		} else {
//		        			DigiWebApp.SettingsController.setSetting("mitarbeiterVorname", "");
//		        			DigiWebApp.SettingsController.setSetting("mitarbeiterNachname", "");
//		        			DigiWebApp.SettingsController.setSetting("mitarbeiterId", "0");
//		        		}
//		        	}, function(error) {
//		        		console.error(error);
//		        	}, "getAll=true&webAppId=" + DigiWebApp.SettingsController.getSetting("workerId"), true);
        		}
            }
            , error: {
                  target: this
                , action: function() {
            		// Konfiguration nicht übertragen
            		//console.log("sendConfiguration failed");
                    //DigiWebApp.ApplicationController.nativeAlertDialogView({
                    //      title: M.I18N.l('sendConfigurationFail')
                    //    , message: M.I18N.l('sendConfigurationFailMsg')
                    //});
                }
            }
        });
    }

});
