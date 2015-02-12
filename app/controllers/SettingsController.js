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
        , daysToHoldBookingsOnDevice: '40'
        , bautagebuchLimit_autoStartUhrzeit: false
        , datatransfer_min_delay: 10000
        , branding: ''
        , GPSTimeOut: 60000
        , WebserviceTimeOut: 30000
        , LoaderTimeOut: 30000
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
        , terminliste_keineKuenstlichenTermine: false
        , terminliste_ignoriereAuftragszeitraum: true
        , stammdatenabgleichBeimAppStart: false
        , festePauseStornieren_nurAktuellerTag: true
        , startTimeout: 10000
        , GPSenableHighAccuracy: NO
        , GPSenableHighAccuracyFallback: YES
        , GPSmaximumAgeMinutes: 3
        , GPSBackgroundService: NO
        , BookingReminderHours: 11
        , closeAppAfterCloseDay: YES
        , DTC6aktiv: NO
        , useNativeLoader: YES
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

        // Start::Terminliste (423)
        if (DigiWebApp.SettingsController.featureAvailable('423')) {
        	$('#' + DigiWebApp.SettingsPage.content.terminlisteEinstellungen.id).show();
        	DigiWebApp.SettingsController.set('terminlisteEinstellungen_titel', DigiWebApp.SettingsController.terminlisteEinstellungen_titel)
        } else {
        	$('#' + DigiWebApp.SettingsPage.content.terminlisteEinstellungen.id).hide();
        }
        // End::Terminliste
        
        // Start::FestePauseStornieren (425)
        if (DigiWebApp.SettingsController.featureAvailable('425')) {
        	$('#' + DigiWebApp.SettingsPage.content.festePauseStornierenEinstellungen.id).show();
        	DigiWebApp.SettingsController.set('festePauseStornierenEinstellungen_titel', DigiWebApp.SettingsController.festePauseStornierenEinstellungen_titel)
        } else {
        	$('#' + DigiWebApp.SettingsPage.content.festePauseStornierenEinstellungen.id).hide();
        }
        // End::FestePauseStornieren

		if (typeof(navigator) == "undefined" || typeof(navigator.app) == "undefined" || typeof(navigator.app.exitApp) != "function") {
			try{$('[id=' + DigiWebApp.SettingsPage.content.closeAppAfterCloseDay.id  + ']').each(function() { $(this).hide(); });}catch(e){}
		}

		DigiWebApp.ApplicationController.enforceChefToolOnly();
        
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

            var terminliste_keineKuenstlichenTermine = DigiWebApp.SettingsController.defaultsettings.get("terminliste_keineKuenstlichenTermine");
            try {
	            if (typeof(record.record.terminliste_keineKuenstlichenTermine) !== "undefined") {
	            		terminliste_keineKuenstlichenTermine = record.get('terminliste_keineKuenstlichenTermine');
	            }
            } catch (e) {}
            
            var terminliste_ignoriereAuftragszeitraum = DigiWebApp.SettingsController.defaultsettings.get("terminliste_ignoriereAuftragszeitraum");
            try {
	            if (typeof(record.record.terminliste_ignoriereAuftragszeitraum) !== "undefined") {
	            		terminliste_ignoriereAuftragszeitraum = record.get('terminliste_ignoriereAuftragszeitraum');
	            }
            } catch (e) {}

            var festePauseStornieren_nurAktuellerTag = DigiWebApp.SettingsController.defaultsettings.get("festePauseStornieren_nurAktuellerTag");
            try {
	            if (typeof(record.record.festePauseStornieren_nurAktuellerTag) !== "undefined") {
	            	festePauseStornieren_nurAktuellerTag = record.get('festePauseStornieren_nurAktuellerTag');
	            }
            } catch (e) {}

            var GPSenableHighAccuracy = DigiWebApp.SettingsController.defaultsettings.get("GPSenableHighAccuracy");
            try {
	            if (typeof(record.record.GPSenableHighAccuracy) !== "undefined") {
	            	GPSenableHighAccuracy = record.get('GPSenableHighAccuracy');
	            }
            } catch (e) {}

            var GPSenableHighAccuracyFallback = DigiWebApp.SettingsController.defaultsettings.get("GPSenableHighAccuracyFallback");
            try {
	            if (typeof(record.record.GPSenableHighAccuracyFallback) !== "undefined") {
	            	GPSenableHighAccuracyFallback = record.get('GPSenableHighAccuracyFallback');
	            }
            } catch (e) {}

            var GPSmaximumAgeMinutes = DigiWebApp.SettingsController.defaultsettings.get("GPSmaximumAgeMinutes");
            try {
	            if (typeof(record.record.GPSmaximumAgeMinutes) !== "undefined") {
	            	GPSmaximumAgeMinutes = record.get('GPSmaximumAgeMinutes');
	            }
            } catch (e) {}
            var GPSBackgroundService = DigiWebApp.SettingsController.defaultsettings.get("GPSBackgroundService");
            try {
	            if (typeof(record.record.GPSBackgroundService) !== "undefined") {
	            	GPSBackgroundService = record.get('GPSBackgroundService');
	            }
            } catch (e) {}
            
            var BookingReminderHours = DigiWebApp.SettingsController.defaultsettings.get("BookingReminderHours");
            try {
	            if (typeof(record.record.BookingReminderHours) !== "undefined") {
	            	BookingReminderHours = record.get('BookingReminderHours');
	            }
            } catch (e) {}
            
            var closeAppAfterCloseDay = DigiWebApp.SettingsController.defaultsettings.get("closeAppAfterCloseDay");
            try {
	            if (typeof(record.record.closeAppAfterCloseDay) !== "undefined") {
	            	closeAppAfterCloseDay = record.get('closeAppAfterCloseDay');
	            }
            } catch (e) {}
            
            var DTC6aktiv = record.get('DTC6aktiv');
            if (!DTC6aktiv) DTC6aktiv = DigiWebApp.SettingsController.defaultsettings.get("DTC6aktiv");

            var useNativeLoader = DigiWebApp.SettingsController.defaultsettings.get("useNativeLoader");
            try {
	            if (typeof(record.record.useNativeLoader) !== "undefined") {
	            	useNativeLoader = record.get('useNativeLoader');
	            }
            } catch (e) {}

            if (onIOS || onAndroid23) {
    			try{$('[id=' + DigiWebApp.SettingsPage.content.GPSBackgroundService.id  + ']').each(function() { $(this).hide(); });}catch(e){}
    			try{$('[id=' + DigiWebApp.SettingsPage.content.BookingReminderHoursGrid.id  + ']').each(function() { $(this).hide(); });}catch(e){}
    			try{$('[id=' + DigiWebApp.SettingsPage.content.closeAppAfterCloseDay.id  + ']').each(function() { $(this).hide(); });}catch(e){}
    		}
    		
            var autoSaveGPSData = DigiWebApp.SettingsController.defaultsettings.get("autoSaveGPSData");
            try {
	            if (typeof(record.record.autoSaveGPSData) !== "undefined") {
	            	autoSaveGPSData = record.get('autoSaveGPSData');
	        		if (!autoSaveGPSData) {
	    				try{$('[id=' + DigiWebApp.SettingsPage.content.GPSenableHighAccuracy.id  + ']').each(function() { $(this).hide(); });}catch(e){}
	    				try{$('[id=' + DigiWebApp.SettingsPage.content.GPSenableHighAccuracyFallback.id  + ']').each(function() { $(this).hide(); });}catch(e){}
	    				try{$('[id=' + DigiWebApp.SettingsPage.content.GPSmaximumAgeMinutesGrid.id  + ']').each(function() { $(this).hide(); });}catch(e){}
	    				try{$('[id=' + DigiWebApp.SettingsPage.content.GPSBackgroundService.id  + ']').each(function() { $(this).hide(); });}catch(e){}
	        		} else {
	    				try{$('[id=' + DigiWebApp.SettingsPage.content.GPSenableHighAccuracy.id  + ']').each(function() { $(this).show(); });}catch(e){}
		        		if (GPSenableHighAccuracy) {
		        			try{$('[id=' + DigiWebApp.SettingsPage.content.GPSenableHighAccuracyFallback.id  + ']').each(function() { $(this).hide(); });}catch(e){}
		        		} else {
		        			try{$('[id=' + DigiWebApp.SettingsPage.content.GPSenableHighAccuracyFallback.id  + ']').each(function() { $(this).show(); });}catch(e){}
		        		}
	    				try{$('[id=' + DigiWebApp.SettingsPage.content.GPSmaximumAgeMinutesGrid.id  + ']').each(function() { $(this).show(); });}catch(e){}
	    	            if (onIOS || onAndroid23) {
	    	            	try{$('[id=' + DigiWebApp.SettingsPage.content.GPSBackgroundService.id  + ']').each(function() { $(this).show(); });}catch(e){}
	    	            }
	        		}
	            }
            } catch (e) {}

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
                , autoSyncAfterBookTime: [{
                    value: record.get('autoSyncAfterBookTime')
                  , label: M.I18N.l('autoSyncAfterBookTimeCheck')
                  , isSelected: record.get('autoSyncAfterBookTime')
                }]
	            , stammdatenabgleichBeimAppStart: [{
	                  value: record.get('stammdatenabgleichBeimAppStart')
	                , label: M.I18N.l('stammdatenabgleichBeimAppStart')
	                , isSelected: record.get('stammdatenabgleichBeimAppStart')
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
                , WebserviceTimeOut: record.get('WebserviceTimeOut')
                , LoaderTimeOut: record.get('LoaderTimeOut')
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
	           , terminliste_keineKuenstlichenTermine: [{
	                   value: terminliste_keineKuenstlichenTermine
	                 , label: M.I18N.l('terminliste_keineKuenstlichenTermine')
	                 , isSelected: terminliste_keineKuenstlichenTermine
	           }]
    	       , terminliste_ignoriereAuftragszeitraum: [{
	                   value: terminliste_ignoriereAuftragszeitraum
	                 , label: M.I18N.l('terminliste_ignoriereAuftragszeitraum')
	                 , isSelected: terminliste_ignoriereAuftragszeitraum
	           }]
    	       , festePauseStornieren_nurAktuellerTag: [{
	                   value: festePauseStornieren_nurAktuellerTag
	                 , label: M.I18N.l('festePauseStornieren_nurAktuellerTag')
	                 , isSelected: festePauseStornieren_nurAktuellerTag
    	       }]
    	       , startTimeout: record.get('startTimeout')
               , GPSenableHighAccuracy: [{
	                   value: GPSenableHighAccuracy
	                 , label: M.I18N.l('GPSenableHighAccuracy')
	                 , isSelected: GPSenableHighAccuracy
               }]
               , GPSenableHighAccuracyFallback: [{
	                   value: GPSenableHighAccuracyFallback
	                 , label: M.I18N.l('GPSenableHighAccuracyFallback')
	                 , isSelected: GPSenableHighAccuracyFallback
               }]
               , GPSmaximumAgeMinutes: GPSmaximumAgeMinutes
               , GPSBackgroundService: [{
	                   value: GPSBackgroundService
	                 , label: M.I18N.l('GPSBackgroundService')
	                 , isSelected: GPSBackgroundService
	           }]
               , BookingReminderHours: BookingReminderHours
               , closeAppAfterCloseDay: [{
	                   value: closeAppAfterCloseDay
	                 , label: M.I18N.l('closeAppAfterCloseDay')
	                 , isSelected: closeAppAfterCloseDay
	           }]
	           , DTC6aktiv: DTC6aktiv
	           , useNativeLoader: useNativeLoader
               
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
                , autoTransferAfterBookTime: [{
                      value: DigiWebApp.SettingsController.defaultsettings.get("autoTransferAfterBookTime")
                    , label: M.I18N.l('autoTransferAfterBookTimeCheck')
                }]
                , autoTransferAfterClosingDay: [{
                      value: DigiWebApp.SettingsController.defaultsettings.get("autoTransferAfterClosingDay")
                    , label: M.I18N.l('autoTransferAfterClosingDayCheck')
                }]
                , autoSyncAfterBookTime: [{
                    value: DigiWebApp.SettingsController.defaultsettings.get("autoSyncAfterBookTime")
                  , label: M.I18N.l('autoSyncAfterBookTimeCheck')
                }]
                , stammdatenabgleichBeimAppStart: [{
	                  value: DigiWebApp.SettingsController.defaultsettings.get("stammdatenabgleichBeimAppStart")
	                , label: M.I18N.l('stammdatenabgleichBeimAppStart')
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
                , WebserviceTimeOut: DigiWebApp.SettingsController.defaultsettings.get('WebserviceTimeOut')
                , LoaderTimeOut: DigiWebApp.SettingsController.defaultsettings.get('LoaderTimeOut')
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
 	           , terminliste_keineKuenstlichenTermine: [{
	                   value: DigiWebApp.SettingsController.defaultsettings.get('terminliste_keineKuenstlichenTermine')
	                 , label: M.I18N.l('terminliste_keineKuenstlichenTermine')
	           }]
		       , terminliste_ignoriereAuftragszeitraum: [{
	                   value: DigiWebApp.SettingsController.defaultsettings.get('terminliste_ignoriereAuftragszeitraum')
	                 , label: M.I18N.l('terminliste_ignoriereAuftragszeitraum')
	           }]
		       , festePauseStornieren_nurAktuellerTag: [{
	                   value: DigiWebApp.SettingsController.defaultsettings.get('festePauseStornieren_nurAktuellerTag')
	                 , label: M.I18N.l('festePauseStornieren_nurAktuellerTag')
		       }]
    	       , startTimeout: DigiWebApp.SettingsController.defaultsettings.get('startTimeout')
               , GPSenableHighAccuracy: [{
                   value: DigiWebApp.SettingsController.defaultsettings.get('GPSenableHighAccuracy')
                 , label: M.I18N.l('GPSenableHighAccuracy')
               }]
               , GPSenableHighAccuracyFallback: [{
                   value: DigiWebApp.SettingsController.defaultsettings.get('GPSenableHighAccuracyFallback')
                 , label: M.I18N.l('GPSenableHighAccuracyFallback')
               }]
               , GPSmaximumAgeMinutes: DigiWebApp.SettingsController.defaultsettings.get("GPSmaximumAgeMinutes")
               , GPSBackgroundService: [{
                   value: DigiWebApp.SettingsController.defaultsettings.get('GPSBackgroundService')
                 , label: M.I18N.l('GPSBackgroundService')
               }]
               , BookingReminderHours: DigiWebApp.SettingsController.defaultsettings.get("BookingReminderHours")
               , closeAppAfterCloseDay: [{
                   value: DigiWebApp.SettingsController.defaultsettings.get('closeAppAfterCloseDay')
                 , label: M.I18N.l('closeAppAfterCloseDay')
               }]
               , DTC6aktiv: DigiWebApp.SettingsController.defaultsettings.get("DTC6aktiv")
               , useNativeLoader: DigiWebApp.SettingsController.defaultsettings.get("useNativeLoader") 
               
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
				},function(err){trackError(err);}
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
	}
	
	, saveDone: YES 

    , save: function() {
		
		if (DigiWebApp.SettingsController.saveDone !== YES) {
			return;
		}
		
		DigiWebApp.SettingsController.saveDone = NO;
		
        var numberRegex = /^[0-9]+$/;

        var debug                       = DigiWebApp.SettingsController.globalDebugMode;
    	var treatAllAsTablet            = DigiWebApp.SettingsController.getSetting('treatAllAsTablet');
    	var treatAllAsPhone             = DigiWebApp.SettingsController.getSetting('treatAllAsPhone');
    	var settingsPassword            = DigiWebApp.SettingsController.getSetting('settingsPassword');

    	//var company                     = M.ViewManager.getView('settingsPage', 'companyInput').value;
        //var password                    = M.ViewManager.getView('settingsPage', 'passwordInput').value;
        //var connectionCode              = M.ViewManager.getView('settingsPage', 'connectionCodeInput').value;
        //var workerId                    = M.ViewManager.getView('settingsPage', 'workerIdInput').value;

    	var daysToHoldBookingsOnDevice     = $('#' + M.ViewManager.getView('settingsPage', 'daysToHoldBookingsOnDeviceSlider').id).val();
    	var company                        = $('#' + M.ViewManager.getView('settingsPage', 'companyInput').id).val();
        var password                       = $('#' + M.ViewManager.getView('settingsPage', 'passwordInput').id).val();
        var connectionCode                 = $('#' + M.ViewManager.getView('settingsPage', 'connectionCodeInput').id).val();
        var workerId                       = $('#' + M.ViewManager.getView('settingsPage', 'workerIdInput').id).val();
        var timeouthappened                = DigiWebApp.ApplicationController.timeouthappened;
        var skipEvents                     = DigiWebApp.ApplicationController.skipEvents;
        var platform                       = M.Environment.getPlatform();
        var userAgent                      = navigator.userAgent;
    	var mapType                        = DigiWebApp.SettingsController.getSetting('mapType');
        var autoTransferAfterBookTime      = $('#' + M.ViewManager.getView('settingsPage', 'autoTransferAfterBookTimeCheck').id      + ' label.ui-checkbox-on').length > 0 ? YES : NO;
        var autoTransferAfterClosingDay    = $('#' + M.ViewManager.getView('settingsPage', 'autoTransferAfterClosingDayCheck').id    + ' label.ui-checkbox-on').length > 0 ? YES : NO;
        var autoSyncAfterBookTime          = $('#' + M.ViewManager.getView('settingsPage', 'autoSyncAfterBookTimeCheck').id          + ' label.ui-checkbox-on').length > 0 ? YES : NO;
        var stammdatenabgleichBeimAppStart = $('#' + M.ViewManager.getView('settingsPage', 'stammdatenabgleichBeimAppStartCheck').id + ' label.ui-checkbox-on').length > 0 ? YES : NO;
        var autoSaveGPSData                = $('#' + M.ViewManager.getView('settingsPage', 'autoSaveGPSData').id                     + ' label.ui-checkbox-on').length > 0 ? YES : NO;
        var useTransitionsSetting          = $('#' + M.ViewManager.getView('settingsPage', 'useTransitionsSetting').id               + ' label.ui-checkbox-on').length > 0 ? YES : NO;

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
        var WebserviceTimeOut           = DigiWebApp.SettingsController.getSetting('WebserviceTimeOut');
        var LoaderTimeOut               = DigiWebApp.SettingsController.getSetting('LoaderTimeOut');
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
        var terminliste_keineKuenstlichenTermine  = $('#' + M.ViewManager.getView('settingsPage', 'terminliste_keineKuenstlichenTermine').id + ' label.ui-checkbox-on').length > 0 ? YES : NO;
        var terminliste_ignoriereAuftragszeitraum = $('#' + M.ViewManager.getView('settingsPage', 'terminliste_ignoriereAuftragszeitraum').id + ' label.ui-checkbox-on').length > 0 ? YES : NO;

        var festePauseStornieren_nurAktuellerTag = $('#' + M.ViewManager.getView('settingsPage', 'festePauseStornieren_nurAktuellerTag').id + ' label.ui-checkbox-on').length > 0 ? YES : NO;

        var startTimeout					= DigiWebApp.SettingsController.getSetting('startTimeout');

        var GPSenableHighAccuracy = NO;
        if (M.ViewManager.getView('settingsPage', 'GPSenableHighAccuracy') !== null) {
        	GPSenableHighAccuracy = $('#' + M.ViewManager.getView('settingsPage', 'GPSenableHighAccuracy').id + ' label.ui-checkbox-on').length > 0 ? YES : NO;
        }

        var GPSenableHighAccuracyFallback = NO;
        if (M.ViewManager.getView('settingsPage', 'GPSenableHighAccuracyFallback') !== null) {
        	GPSenableHighAccuracyFallback = $('#' + M.ViewManager.getView('settingsPage', 'GPSenableHighAccuracyFallback').id + ' label.ui-checkbox-on').length > 0 ? YES : NO;
        }

        var GPSmaximumAgeMinutes            = $('#' + M.ViewManager.getView('settingsPage', 'GPSmaximumAgeMinutesInput').id).val();
        if (parseIntRadixTen(GPSmaximumAgeMinutes) < 0 || !numberRegex.test(GPSmaximumAgeMinutes)) GPSmaximumAgeMinutes = 0;

        var GPSBackgroundService = NO;
        if (M.ViewManager.getView('settingsPage', 'GPSBackgroundService') !== null) {
        	GPSBackgroundService = $('#' + M.ViewManager.getView('settingsPage', 'GPSBackgroundService').id + ' label.ui-checkbox-on').length > 0 ? YES : NO;
        }

        var BookingReminderHours            = $('#' + M.ViewManager.getView('settingsPage', 'BookingReminderHoursInput').id).val();
        if (parseIntRadixTen(BookingReminderHours) < 0 || !numberRegex.test(BookingReminderHours)) BookingReminderHours = 0;
        
        var closeAppAfterCloseDay = NO;
        if (M.ViewManager.getView('settingsPage', 'closeAppAfterCloseDay') !== null) {
        	closeAppAfterCloseDay = $('#' + M.ViewManager.getView('settingsPage', 'closeAppAfterCloseDay').id + ' label.ui-checkbox-on').length > 0 ? YES : NO;
        }
        
    	var DTC6aktiv                       = DigiWebApp.SettingsController.getSetting('DTC6aktiv');
    	var useNativeLoader					= DigiWebApp.SettingsController.getSetting('useNativeLoader');
    	
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
                                                    record.set('autoTransferAfterBookTime', autoTransferAfterBookTime);
                                                    record.set('autoTransferAfterClosingDay', autoTransferAfterClosingDay);
                                                    record.set('autoSyncAfterBookTime', autoSyncAfterBookTime);
                                                    record.set('stammdatenabgleichBeimAppStart', stammdatenabgleichBeimAppStart);
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
                                                    record.set('WebserviceTimeOut', WebserviceTimeOut);
                                                    record.set('LoaderTimeOut', LoaderTimeOut);
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
                                                    record.set('terminliste_keineKuenstlichenTermine', terminliste_keineKuenstlichenTermine);
                                                    record.set('terminliste_ignoriereAuftragszeitraum', terminliste_ignoriereAuftragszeitraum);
                                                    record.set('festePauseStornieren_nurAktuellerTag', festePauseStornieren_nurAktuellerTag);
                                                    record.set('startTimeout', startTimeout);
                                                    record.set('GPSenableHighAccuracy', GPSenableHighAccuracy);
                                                    record.set('GPSenableHighAccuracyFallback', GPSenableHighAccuracyFallback);
                                                    record.set('GPSmaximumAgeMinutes', GPSmaximumAgeMinutes);
                                                    record.set('GPSBackgroundService', GPSBackgroundService);
                                                    record.set('BookingReminderHours', BookingReminderHours);
                                                    record.set('closeAppAfterCloseDay', closeAppAfterCloseDay);
                                                    record.set('DTC6aktiv', DTC6aktiv);
                                                    record.set('useNativeLoader', useNativeLoader);
                                                    
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
                                    record.set('autoTransferAfterBookTime', autoTransferAfterBookTime);
                                    record.set('autoTransferAfterClosingDay', autoTransferAfterClosingDay);
                                    record.set('autoSyncAfterBookTime', autoSyncAfterBookTime);
                                    record.set('stammdatenabgleichBeimAppStart', stammdatenabgleichBeimAppStart);
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
                                    record.set('WebserviceTimeOut', WebserviceTimeOut);
                                    record.set('LoaderTimeOut', LoaderTimeOut);
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
                                    record.set('terminliste_keineKuenstlichenTermine', terminliste_keineKuenstlichenTermine);
                                    record.set('terminliste_ignoriereAuftragszeitraum', terminliste_ignoriereAuftragszeitraum);
                                    record.set('festePauseStornieren_nurAktuellerTag', festePauseStornieren_nurAktuellerTag);
                                    record.set('startTimeout', startTimeout);
                                    record.set('GPSenableHighAccuracy', GPSenableHighAccuracy);
                                    record.set('GPSenableHighAccuracyFallback', GPSenableHighAccuracyFallback);
                                    record.set('GPSmaximumAgeMinutes', GPSmaximumAgeMinutes);
                                    record.set('GPSBackgroundService', GPSBackgroundService);
                                    record.set('BookingReminderHours', BookingReminderHours);
                                    record.set('closeAppAfterCloseDay', closeAppAfterCloseDay);
                                    record.set('DTC6aktiv', DTC6aktiv);
                                    record.set('useNativeLoader', useNativeLoader);

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
                                record.set('autoTransferAfterBookTime', autoTransferAfterBookTime);
                                record.set('autoTransferAfterClosingDay', autoTransferAfterClosingDay);
                                record.set('autoSyncAfterBookTime', autoSyncAfterBookTime);
                                record.set('stammdatenabgleichBeimAppStart', stammdatenabgleichBeimAppStart);
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
                                record.set('WebserviceTimeOut', WebserviceTimeOut);
                                record.set('LoaderTimeOut', LoaderTimeOut);
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
                                record.set('terminliste_keineKuenstlichenTermine', terminliste_keineKuenstlichenTermine);
                                record.set('terminliste_ignoriereAuftragszeitraum', terminliste_ignoriereAuftragszeitraum);
                                record.set('festePauseStornieren_nurAktuellerTag', festePauseStornieren_nurAktuellerTag);
                                record.set('startTimeout', startTimeout);
                                record.set('GPSenableHighAccuracy', GPSenableHighAccuracy);
                                record.set('GPSenableHighAccuracyFallback', GPSenableHighAccuracyFallback);
                                record.set('GPSmaximumAgeMinutes', GPSmaximumAgeMinutes);
                                record.set('GPSBackgroundService', GPSBackgroundService);
                                record.set('BookingReminderHours', BookingReminderHours);
                                record.set('closeAppAfterCloseDay', closeAppAfterCloseDay);
                                record.set('DTC6aktiv', DTC6aktiv);
                                record.set('useNativeLoader', useNativeLoader);

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
                                record.set('autoTransferAfterBookTime', autoTransferAfterBookTime);
                                record.set('autoTransferAfterClosingDay', autoTransferAfterClosingDay);
                                record.set('autoSyncAfterBookTime', autoSyncAfterBookTime);
                                record.set('stammdatenabgleichBeimAppStart', stammdatenabgleichBeimAppStart);
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
                                record.set('WebserviceTimeOut', WebserviceTimeOut);
                                record.set('LoaderTimeOut', LoaderTimeOut);
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
                                record.set('terminliste_keineKuenstlichenTermine', terminliste_keineKuenstlichenTermine);
                                record.set('terminliste_ignoriereAuftragszeitraum', terminliste_ignoriereAuftragszeitraum);
                                record.set('festePauseStornieren_nurAktuellerTag', festePauseStornieren_nurAktuellerTag);
                                record.set('startTimeout', startTimeout);
                                record.set('GPSenableHighAccuracy', GPSenableHighAccuracy);
                                record.set('GPSenableHighAccuracyFallback', GPSenableHighAccuracyFallback);
                                record.set('GPSmaximumAgeMinutes', GPSmaximumAgeMinutes);
                                record.set('GPSBackgroundService', GPSBackgroundService);
                                record.set('BookingReminderHours', BookingReminderHours);
                                record.set('closeAppAfterCloseDay', closeAppAfterCloseDay);
                                record.set('DTC6aktiv', DTC6aktiv);
                                record.set('useNativeLoader', useNativeLoader);

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
                                , autoTransferAfterBookTime: autoTransferAfterBookTime
                                , autoTransferAfterClosingDay: autoTransferAfterClosingDay
                                , autoSyncAfterBookTime: autoSyncAfterBookTime
                                , stammdatenabgleichBeimAppStart: stammdatenabgleichBeimAppStart
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
                                , WebserviceTimeOut: WebserviceTimeOut
                                , LoaderTimeOut: LoaderTimeOut
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
                                , terminliste_keineKuenstlichenTermine: terminliste_keineKuenstlichenTermine
                                , terminliste_ignoriereAuftragszeitraum: terminliste_ignoriereAuftragszeitraum
                                , festePauseStornieren_nurAktuellerTag: festePauseStornieren_nurAktuellerTag
                                , startTimeout: startTimeout
                                , GPSenableHighAccuracy: GPSenableHighAccuracy
                                , GPSenableHighAccuracyFallback: GPSenableHighAccuracyFallback
                                , GPSmaximumAgeMinutes: GPSmaximumAgeMinutes
                                , GPSBackgroundService: GPSBackgroundService
                                , BookingReminderHours: BookingReminderHours
                                , closeAppAfterCloseDay: closeAppAfterCloseDay
                                , DTC6aktiv: DTC6aktiv
                                , useNativeLoader: useNativeLoader

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

        	DigiWebApp.ApplicationController.startBgGeo();

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
        		} catch(e4) { trackError("ERROR: setting.get for prop=" + prop); }
        	}
            return propvalue;
        }
    }

    , setSetting: function(prop, value) {
        var setting = DigiWebApp.Settings.find()[0];
        if ( typeof(setting) !== "undefined" ) {
        	try {
        		setting.set(prop, value);
    		} catch(e5) { trackError("ERROR: setting.set for prop=" + prop); }
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
		    if (f) return f.get('id') == featureId;
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
        				try { if (record.get("geraeteId") === MitarbeiterWebAppID) DigiWebApp.SettingsController.mitarbeiterNameVorname = record.get("nameVorname");} catch(e6) { trackError(e6); }
        			}); 
        			if (callback) {
        				callback();
        			}
        		} catch(e7) { trackError(e7); }
        	}}, error: { action: function(){}}}});
        } catch(e8) { trackError(e8); }
	}

    , sendConfiguration: function() {
    	//alert("in sendConfiguration");
        var settings = DigiWebApp.Settings.find();    		
    	//alert("typeof(settings)=" + typeof(settings));
    	//var MitarbeiterWebAppID = "0";
    	//try { MitarbeiterWebAppID = settings[0].get("workerId"); } catch(e) { trackError(e); }
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
//	                // empfange den konfigurierten Mitarbeiternamen
//		    		var recieveObj = {
//		    				  webservice: "mitarbeiter"
//		    				, loaderText: M.I18N.l('BautagebuchLadeMitarbeiter')
//		    				, successCallback: function(data){
//					        		if (data && data.mitarbeiter && data.mitarbeiter.length > 0) {
//				        			DigiWebApp.SettingsController.setSetting("mitarbeiterVorname", data.mitarbeiter[0].vorname);
//				        			DigiWebApp.SettingsController.setSetting("mitarbeiterNachname", data.mitarbeiter[0].nachname);
//				        			DigiWebApp.SettingsController.setSetting("mitarbeiterId", data.mitarbeiter[0].mitarbeiterId);
//				        		} else {
//				        			DigiWebApp.SettingsController.setSetting("mitarbeiterVorname", "");
//				        			DigiWebApp.SettingsController.setSetting("mitarbeiterNachname", "");
//				        			DigiWebApp.SettingsController.setSetting("mitarbeiterId", "0");
//				        		}
//				        	}
//		    				, errorCallback: function(error) {
//		    					trackError(error);
//	    		        	}
//		    				, additionalQueryParameter: "getAll=true&webAppId=" + DigiWebApp.SettingsController.getSetting("workerId")
//		    				//, timeout: 
//		    				, geraeteIdOverride: true
//		    				, modus: '1'
//		    			};
//		        	DigiWebApp.JSONDatenuebertragungController.recieveData(recieveObj);
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

    , terminlisteEinstellungen_titel: [{
    	  "label": M.I18N.l('Terminliste')
    	, "items": []
    }]
    		
    , festePauseStornierenEinstellungen_titel: [{
	  	  "label": M.I18N.l('FestePauseStornieren')
	  	, "items": []
    }]

});
