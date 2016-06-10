// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: DigiWebApp
// Model: Settings
// ==========================================================================

DigiWebApp.Settings = M.Model.create({

    __name__: 'Settings'

    , debug: M.Model.attr('Boolean')
    
    , settingsPassword: M.Model.attr('String')

    , treatAllAsTablet: M.Model.attr('Boolean')

    , treatAllAsPhone: M.Model.attr('Boolean')

    , company: M.Model.attr('String')

    , password: M.Model.attr('String')

    , connectionCode: M.Model.attr('String')

    , workerId: M.Model.attr('String')

    , timeouthappened: M.Model.attr('String')

    , skipEvents: M.Model.attr('String')

    , platform: M.Model.attr('String')

    , userAgent: M.Model.attr('String')

    , mapType: M.Model.attr('String')

    , autoTransferAfterBookTime: M.Model.attr('Boolean')

    , autoTransferAfterClosingDay: M.Model.attr('Boolean')

    , autoSyncAfterBookTime: M.Model.attr('Boolean')

    , stammdatenabgleichBeimAppStart: M.Model.attr('Boolean')
    
    , autoSaveGPSData: M.Model.attr('Boolean')

    , GPSDataIsMandatory: M.Model.attr('Boolean')
    
    , remarkIsMandatory: M.Model.attr('Boolean')

    , remarkIsOptional: M.Model.attr('Boolean')

    , useTransitionsSetting: M.Model.attr('Boolean')
    
    , daysToHoldBookingsOnDevice: M.Model.attr('String')

    , bautagebuchLimit_autoStartUhrzeit: M.Model.attr('Boolean')
    
    , datatransfer_min_delay: M.Model.attr('String')

    , branding: M.Model.attr('String')

    , GPSTimeOut: M.Model.attr('Integer')
    
    , WebserviceTimeOut: M.Model.attr('Integer')
    
    , LoaderTimeOut: M.Model.attr('Integer')
    
    , silentLoader: M.Model.attr('Boolean')
    
    , ServiceApp_ermittleGeokoordinate: M.Model.attr('Boolean')

    , ServiceApp_datenUebertragen: M.Model.attr('Boolean')

    , ServiceApp_engeKopplung: M.Model.attr('Boolean')
    
    , ServiceApp_PORT: M.Model.attr('String')

    , ServiceApp_FallBack: M.Model.attr('Boolean')

    , currentTimezoneOffset: M.Model.attr('String')
    
    , currentTimezone: M.Model.attr('String')
    
    , debugDatabaseServer: M.Model.attr('String')
    
    , mitarbeiterVorname: M.Model.attr('String')
    
    , mitarbeiterNachname: M.Model.attr('String')
    
    , mitarbeiterId: M.Model.attr('String')
    
    , auftragsDetailsKoppeln: M.Model.attr('Boolean')

    , detailierteZeitdaten: M.Model.attr('Boolean')
    
    , vibrationsDauer: M.Model.attr('String')
    
    , terminliste_keineKuenstlichenTermine: M.Model.attr('Boolean') 
    
    , terminliste_ignoriereAuftragszeitraum: M.Model.attr('Boolean')

    , festePauseStornieren_nurAktuellerTag: M.Model.attr('Boolean')

    , startTimeout: M.Model.attr('String')

    , GPSenableHighAccuracy: M.Model.attr('Boolean')
    
    , GPSenableHighAccuracyFallback: M.Model.attr('Boolean')
    
    , GPSmaximumAgeMinutes: M.Model.attr('Integer')

    , GPSBackgroundService: M.Model.attr('Boolean')
    
    , BookingReminderHours: M.Model.attr('Integer')
    
    , closeAppAfterCloseDay: M.Model.attr('Boolean')
    
    , DTC6aktiv: M.Model.attr('Boolean')
    
    , useNativeLoader: M.Model.attr('Boolean')

    , pictureEncodingType: M.Model.attr('String')

    , pictureEncodingQuality: M.Model.attr('Integer')

    , pictureAllowEdit: M.Model.attr('Boolean')
    
    , mengeneingabeMitTelKeyboard: M.Model.attr('Boolean')
    
    , scrId: M.Model.attr('String')
    
    , overrideApplicationQuota: M.Model.attr('String') 

    , logWriterInterval: M.Model.attr('Integer') 

    , progressViewVerwendenAb: M.Model.attr('Integer') 

    , logDelete: M.Model.attr('Boolean')
    
    , logSave: M.Model.attr('Boolean')

    , kannFahrtkostenBuchen: M.Model.attr('Boolean')

    , kannUebernachtungskostenBuchen: M.Model.attr('Boolean')

    , kannReisezeitBuchen: M.Model.attr('Boolean')

    , benutzeHttps: M.Model.attr('Boolean')
    
}, M.DataProviderLocalStorage);
