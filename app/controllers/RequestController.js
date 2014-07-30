// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: DigiWebApp
// Controller: RequestController
// ==========================================================================
// manuell var-checked
DigiWebApp.RequestController = M.Controller.extend({

	  GatewayServer: 'www.digi-gps.de'
	, DatabaseServer: null
	, DatabaseServerTimestamp: null
	, handy2WebServicesUrl: '/Handy2WebServices/services/DatenTransfer'
	
    /**
     * Object containing the success callback for the several calls
     */
    , successCallback: {}

    /**
     * Object containing the success callback for the several calls
     */
    , errorCallback: {}
    
    , softwareVersion: 5362


    /**
     * Method that performs the GET requests to the server.
     *
     * Shows a loader if flag is set in parameter object.
     *
     * Success callback:
     * 1) Hiding the loader
     * 2) Passing to handleSuccessCallback() with the return data of the request and flag for isWorkplan, isKolonne and the source (function that triggered the request) as string
     *
     * Error callback
     * 1) Hiding the loader
     * 2) Passing to handleErrorCallback with return data of the request and the source (function that triggered the request) as string
     *
     * @param {Object} obj The parameter object
     */
    , makeRequest: function(obj) {
    
        var that = this;
        
        var timeoutSetting = DigiWebApp.SettingsController.getSetting("WebserviceTimeOut") ? DigiWebApp.SettingsController.getSetting("WebserviceTimeOut") : DigiWebApp.SettingsController.defaultsettings.get('WebserviceTimeOut');
		var timeout = obj['timeout'] ? obj['timeout'] : timeoutSetting;

		var req = M.Request.init({

              url: 'http://' + DigiWebApp.RequestController.DatabaseServer + DigiWebApp.RequestController.handy2WebServicesUrl + '/' + obj.url + (obj.urlParams ? '?' + obj.urlParams : '')

            /* alternative way by asking if in native container or not => in getUrl() */
            //  url: this.getUrl() + obj.url + (obj.urlParams ? '?' + obj.urlParams : '')

            , timeout: timeout
            , method: 'GET'
            , beforeSend: function(xhr) {
                if(obj.loaderText) {
                    DigiWebApp.ApplicationController.DigiLoaderView.show(obj.loaderText);
                } else {
                    DigiWebApp.ApplicationController.DigiLoaderView.show('Lade Daten');
                }

                xhr.setRequestHeader('Cache-Control', 'no-cache');
            }
            , onSuccess: function(data, msg, xhr) {
            	var leaveLoaderOpen = NO;
            	if (typeof(obj.leaveLoaderOpen) !== "undefined") leaveLoaderOpen = obj.leaveLoaderOpen;
                if (!leaveLoaderOpen) DigiWebApp.ApplicationController.DigiLoaderView.hide();
                var source = obj.source;
                var workPlan = obj.isWorkPlanRequest;
                var kolonne = obj.isKolonnenRequest;
                this.bindToCaller(that, that.handleSuccessCallback, [data, msg, xhr, workPlan, kolonne, source])();
            }
            , onError: function(xhr, err) {
            	console.error("Error in makeRequest: " + err);
                DigiWebApp.ApplicationController.DigiLoaderView.hide();
                DigiWebApp.RequestController.DatabaseServer = null;
                this.bindToCaller(that, that.handleErrorCallback, [xhr, err, obj.source])();
            }
        });

        req.send();
    }

    , getUrl: function() {
        try {
            if(device && device.uuid) {
            	////if (DigiWebApp.SettingsController.globalDebugMode) console.log(device.uuid);
                return 'http://' + DigiWebApp.RequestController.DatabaseServer + DigiWebApp.RequestController.handy2WebServicesUrl + '/' ;
            }
        } catch(e1) {
            return '/Handy2WebServices/services/DatenTransfer/';
        }

    }

    , getDatabaseServer: function(myFunc, obj) {
    	
    	// debug-ausnahme
    	if (location.host === "localhost:8080" || DigiWebApp.SettingsController.getSetting("debugDatabaseServer")) {
    		if (location.host === "localhost:8080") {
    			DigiWebApp.RequestController.DatabaseServer = "localhost:8080";
    		} else {
    			DigiWebApp.RequestController.DatabaseServer = DigiWebApp.SettingsController.getSetting("debugDatabaseServer");
    		}
    		return myFunc(obj);
    	}
    	
		if (!DigiWebApp.RequestController.DatabaseServer || (DigiWebApp.RequestController.DatabaseServerTimestamp && (DigiWebApp.RequestController.DatabaseServerTimestamp - new Date().getTime() > 60000))) {
		  	// get it ...
	    	console.log("getDatabaseServer");
		} else {
			// use previously fetched DatabaseServer
			return myFunc(obj);
		}
    
    	DigiWebApp.RequestController.DatabaseServer = "";
    	
        var firmenId = DigiWebApp.SettingsController.getSetting('company');

    	var myGatewayServer = DigiWebApp.RequestController.GatewayServer;
    	
    	if (typeof(device) === "undefined") {
    		myGatewayServer = location.host;
    	}

        //if (DigiWebApp.ApplicationController.profilingIntervalVar === null) {
		//	console.log('using: http://' + myGatewayServer + DigiWebApp.RequestController.handy2WebServicesUrl + '/empfangeUrl?firmenId=' + firmenId + '&modus=0&requestTimestamp=' + M.Date.now().date.valueOf());
		//}

		//alert('http://' + myGatewayServer + DigiWebApp.RequestController.handy2WebServicesUrl + '/empfangeUrl?firmenId=' + firmenId + '&modus=0&requestTimestamp=' + M.Date.now().date.valueOf());
		
        var req = M.Request.init({
        
              url: 'http://' + myGatewayServer + DigiWebApp.RequestController.handy2WebServicesUrl + '/empfangeUrl?firmenId=' + firmenId + '&modus=0&requestTimestamp=' + M.Date.now().date.valueOf()

            , method: 'GET'
            , beforeSend: function(xhr) {
                DigiWebApp.ApplicationController.DigiLoaderView.show(M.I18N.l('empfangeUrlLoader'));
                xhr.setRequestHeader('Cache-Control', 'no-cache');
            }
            , onSuccess: function(xmldata, msg, xhr) {
            	//alert("xmldata: " + xmldata);
            	//alert("msg: " + msg);
            	//alert("xhr.status: " + xhr.status);
				DigiWebApp.ApplicationController.DigiLoaderView.hide();
            	var data = DigiWebApp.RequestController.transformResultToJson(xmldata);
		    	if ( typeof(data['return']) === "undefined" && typeof(data['ns:return']) !== "undefined" ) data['return'] = data['ns:return'];
		    	if (data['return'] !== "") {
		    		DigiWebApp.RequestController.DatabaseServer = data['return'];
		    	} else {
		    		console.log("FALLBACK: empty DatabaseServer --> falling back to GatewayServer"); 
		    		DigiWebApp.RequestController.DatabaseServer = DigiWebApp.RequestController.GatewayServer;
		    	}
		    	DigiWebApp.RequestController.DatabaseServerTimestamp = new Date().getTime();
		    	if (typeof(device) === "undefined") {
		    		if ((location.host !== DigiWebApp.RequestController.DatabaseServer)) {
	        		        /*DigiWebApp.ApplicationController.nativeAlertDialogView({
	        		            title: M.I18N.l('wrongServer'),
	        		            message: M.I18N.l('wrongServerMessage'),
	        		            callbacks: {
	        		                confirm: {
	        		                      target: this
	        		                    , action: function () {
	        		                    	//alert(location.host);
	        		                    	//alert('http://' + DigiWebApp.RequestController.DatabaseServer + location.pathname);
							    			location.href = 'http://' + DigiWebApp.RequestController.DatabaseServer + location.pathname;
	        		                    }
	        		                }
	        		            }
	        		        });*/
			        		DigiWebApp.ApplicationController.nativeConfirmDialogView({
				            	  title: M.I18N.l('wrongServer')
			    		        , message: M.I18N.l('wrongServerMessage')
					            , confirmButtonValue: M.I18N.l('yes')
			            		, cancelButtonValue: M.I18N.l('appZuruecksetzen')
			            		, callbacks: {
			                		  confirm: {
			                    		  target: this
			                    		, action: function() {
									    			location.href = 'http://' + DigiWebApp.RequestController.DatabaseServer + location.pathname;
			                    				}
			                			}
			                		, cancel: {
			                    		  target: this
			                    		, action: function() {
		                        					DigiWebApp.ApplicationController.deleteAllData(); 
					    							if (typeof(navigator.app) !== "undefined") {
														if (typeof(location.origin) !== "undefined") {
															navigator.app.loadUrl(location.origin + location.pathname);					
														} else {
															navigator.app.loadUrl(location.protocol + '//' + location.pathname);
														}
					    							} else {
					    								window.location.reload();
					    							}
			                    				}
			                		}
			            		}
			        		});
	        		        
		    		} else {
		    			//console.log(myFunc);
						myFunc(obj);
		    		}
		    	} else {
	    			//console.log(myFunc);
					myFunc(obj);
				}
            }
            , onError: function(xhr, err) {
            	//writeToLog(xhr, function(){trackError(err);}, function(){trackError(err);});
            	//writeToLog(xhr);
            	trackError("Error in getDatabaseServer: " + err + "\nXHR: " + JSON.stringify(xhr));
            	//alert("Error in getDatabaseServer: " + err.message);
            	//console.error("Error in getDatabaseServer: " + err);
                DigiWebApp.ApplicationController.DigiLoaderView.hide();
				DigiWebApp.ApplicationController.proceedWithLocalData("getDatabaseServer");
			}
        });

        req.send();
		
    }
    , myRequest: null
    
    /**
     * Prepares the authenticate call and calls makeRequest with the corresponding params.
     *
     * Saves callbacks first.
     *
     * @param obj
     */
    , authenticate: function(obj) {
    	
//        // empfange den konfigurierten Mitarbeiternamen
//    	var myFunc = function(obj) {
//    		writeToLog("aktualisiere Mitarbeiter des Benutzers in authenticate");
//    		var recieveObj = {
//				  webservice: "mitarbeiter"
//				, loaderText: M.I18N.l('BautagebuchLadeMitarbeiter')
//				, successCallback: function(data){
//					if (data && data.mitarbeiter && data.mitarbeiter.length > 0) {
//						DigiWebApp.SettingsController.setSetting("mitarbeiterVorname", data.mitarbeiter[0].vorname);
//						DigiWebApp.SettingsController.setSetting("mitarbeiterNachname", data.mitarbeiter[0].nachname);
//						DigiWebApp.SettingsController.setSetting("mitarbeiterId", data.mitarbeiter[0].mitarbeiterId);
//					}
//					DigiWebApp.RequestController.getDatabaseServer(DigiWebApp.RequestController.authenticateWithDatabaseServer, obj);
//				}
//				, errorCallback: function(error) {
//					DigiWebApp.ApplicationController.DigiLoaderView.hide();
//					// Fehlermeldung
//					DigiWebApp.ApplicationController.nativeAlertDialogView({
//				        title: M.I18N.l('offlineWorkNotPossible')
//				      , message: M.I18N.l('offlineWorkNotPossibleMsg')
//					});
//				}
//				, additionalQueryParameter: "getAll=true&webAppId=" + DigiWebApp.SettingsController.getSetting("workerId")
//				//, timeout: 
//				, geraeteIdOverride: true
//				//, modus: 
//			};
//    		DigiWebApp.JSONDatenuebertragungController.recieveData(recieveObj);
//    	};
//
//    	//DigiWebApp.RequestController.getDatabaseServer(myFunc, obj);
//    	//myFunc(obj);
    	DigiWebApp.RequestController.getDatabaseServer(DigiWebApp.RequestController.authenticateWithDatabaseServer, obj);

    }

    , authenticateWithDatabaseServer: function(obj) {
		//writeToLog("in authenticateWithDatabaseServer");

        DigiWebApp.RequestController.saveCallbacks(obj.success, obj.error, 'authenticate');

        var firmenId = DigiWebApp.SettingsController.getSetting('company');
        var kennwort = DigiWebApp.SettingsController.getSetting('password');
        var geraeteId = DigiWebApp.SettingsController.getSetting('workerId'); //1; // 1: ein einzelner mitarbeiter, 2: kolonne
        var geraeteTyp = 2; // fixed => 2 stands for app
        //var softwareVersion = M.Application.getConfig('version');
        
		//alert('firmenId=' + firmenId + '&kennwort=' + kennwort + '&geraeteId=' + geraeteId + '' + '&geraeteTyp=' + geraeteTyp + '&softwareVersion=' + DigiWebApp.RequestController.softwareVersion + '&requestTimestamp=' + M.Date.now().date.valueOf());
		
        var params = {
              url: 'authentifizieren'
            , urlParams: 'firmenId=' + firmenId + '&kennwort=' + kennwort + '&geraeteId=' + geraeteId + '' +
                '&geraeteTyp=' + geraeteTyp + '&softwareVersion=' + DigiWebApp.RequestController.softwareVersion + '&requestTimestamp=' + M.Date.now().date.valueOf()
            , loaderText: M.I18N.l('authenticateLoader')
            , source: 'authenticate'
        };

        DigiWebApp.RequestController.makeRequest(_.extend(obj, params));
    }

    /**
     * Prepares the endSession call and calls makeRequest with the corresponding params.
     *
     * Saves callbacks first.
     *
     * @param {Object} obj The parameter object
     */
    , endSession: function(obj) {
        this.saveCallbacks(obj.success, obj.error, 'endSession');

        var modus = '0';

        this.makeRequest(_.extend(obj, {
              url: 'beendeSession'
            , urlParams: 'modus=' + modus + '&requestTimestamp=' + M.Date.now().date.valueOf()
            , loaderText: M.I18N.l('logout')
            , source: 'endSession'
        }));
    }

    /**
     * Prepares the getActivities call and calls makeRequest with the corresponding params.
     *
     * Saves callbacks first.
     *
     * @param {Object} obj The parameter object
     */
    , getActivities: function(obj) {
        this.saveCallbacks(obj.success, obj.error, 'getActivities');

        var modus = '1';

        this.makeRequest(_.extend(obj, {
              url: 'empfangeTaetigkeiten'
            , urlParams: 'modus=' + modus + '&requestTimestamp=' + M.Date.now().date.valueOf()
            , loaderText: M.I18N.l('getActivitiesLoader')
            , source: 'getActivities'
            , leaveLoaderOpen: YES
        }));
    }

    /**
     * Prepares the getOrders call and calls makeRequest with the corresponding params.
     *
     * Saves callbacks first.
     *
     * @param {Object} obj The parameter object
     */
    , getOrders: function(obj) {

        this.saveCallbacks(obj.success, obj.error, 'getOrders');

        var modus = '0';

        this.makeRequest(_.extend(obj, {
              url: 'empfangeAuftraege'
            , urlParams: 'modus=' + modus + '&requestTimestamp=' + M.Date.now().date.valueOf()
            , loaderText: M.I18N.l('getOrdersLoader')
            , source: 'getOrders'
            , leaveLoaderOpen: YES
        }));
    }

    /**
     * Prepares the getFeatures call and calls makeRequest with the corresponding params.
     *
     * Saves callbacks first.
     *
     * @param {Object} obj The parameter object
     */
    , getFeatures: function(obj) {

        this.saveCallbacks(obj.success, obj.error, 'getFeatures');

        var modus = '0';

        this.makeRequest(_.extend(obj, {
              url: 'empfangeKonfiguration'
            , urlParams: 'modus=' + modus + '&requestTimestamp=' + M.Date.now().date.valueOf()
            , loaderText: M.I18N.l('getFeaturesLoader')
            , source: 'getFeatures'
            , leaveLoaderOpen: YES
        }));
    }

    /**
     * Prepares the getPositions call and calls makeRequest with the corresponding params.
     *
     * Saves callbacks first.
     *
     * @param {Object} obj The parameter object
     */
    , getPositions: function(obj) {

        this.saveCallbacks(obj.success, obj.error, 'getPositions');

        var modus = '0';

        this.makeRequest(_.extend(obj, {
              url: 'empfangePositionenInfo'
            , urlParams: 'modus=' + modus + '&requestTimestamp=' + M.Date.now().date.valueOf()
            , loaderText: M.I18N.l('getPositionsLoader')
            , source: 'getPositions'
            , leaveLoaderOpen: YES
        }));
    }


    /**
     * Prepares the getWorkPlans call and calls makeRequest with the corresponding params.
     *
     * Saves callbacks first.
     *
     * @param {Object} obj The parameter object
     */
    , getWorkPlans: function(obj) {
        this.saveCallbacks(obj.success, obj.error, 'getWorkPlans');

        var modus = '0';

        this.makeRequest(_.extend(obj, {
              isWorkPlanRequest: YES
            , url: 'empfangeArbeitsplanNeu'
            , urlParams: 'modus=' + modus + '&requestTimestamp=' + M.Date.now().date.valueOf()
            , loaderText: M.I18N.l('getWorkPlansLoader')
            , source: 'getWorkPlans'
            , leaveLoaderOpen: YES
        }));
    }

    /**
     * Prepares the getHandOrders call and calls makeRequest with the corresponding params.
     *
     * Saves callbacks first.
     *
     * @param {Object} obj The parameter object
     */
    , getHandOrders: function(obj) {
        this.saveCallbacks(obj.success, obj.error, 'getHandOrders');

        var modus = '0';

        this.makeRequest(_.extend(obj, {
              url: 'empfangeHandauftraege'
            , urlParams: 'modus=' + modus + '&requestTimestamp=' + M.Date.now().date.valueOf()
            , loaderText: M.I18N.l('getHandOrdersLoader')
            , source: 'getHandOrders'
            , leaveLoaderOpen: YES
        }));
    }

    /**
     * Prepares the getKolonne call and calls makeRequest with the corresponding params.
     *
     * Saves callbacks first.
     *
     * @param {Object} obj The parameter object
     */
    , getKolonne: function(obj) {
        this.saveCallbacks(obj.success, obj.error, 'getKolonne');

        var modus = '0';

        this.makeRequest(_.extend(obj, {
              isKolonnenRequest: YES
            , url: 'empfangeKolonne'
            , urlParams: 'modus=' + modus + '&requestTimestamp=' + M.Date.now().date.valueOf()
            , loaderText: M.I18N.l('getKolonne')
            , source: 'getKolonne'
            , leaveLoaderOpen: YES
        }));
    }

    /**
     * Constructs the SOAP data body for the settings.
     * 
     * as of 12.03.2012 --> working
     *
     * Replaces the placeholder with their values of the actual settings
     *
     * @param {Array|Object} settings: The settings to be sent
     */
    , buildDataBodyConfiguration: function(mysettings) {
        var dataStr = '';
        var soapData = '   <tran:konfigurationHandy>\n' +
            '       <xsd:keyId><keyId></xsd:keyId>\n' +
            '       <xsd:value><value></xsd:value>\n' +
            '       <xsd:valueType><valueType></xsd:valueType>\n' +
            '       <xsd:mitarbeiter><mitarbeiter></xsd:mitarbeiter>\n' +
            '       <xsd:timestamp><timestamp></xsd:timestamp>\n' +
            '   </tran:konfigurationHandy>\n';
    
        var settings;
        if (typeof(mysettings) === 'object' && !_.isArray(mysettings)) {
            settings = [mysettings];  // if an object was passed, push it into an array, to have one behaviour
        } else {
        	settings = mysettings;
        }

        var now_as_timestamp = +new Date();
        if (_.isArray(settings)) {
            for (var i in settings) {
                var setting = settings[i];
                for (var prop in setting.record) {
	                var s = soapData;
                    if(prop === '_createdAt' || prop === '_updatedAt') { continue; }
                    s = s.replace(new RegExp('<keyId>'), prop);
                    s = s.replace(new RegExp('<value>'), setting.get(prop));
                    s = s.replace(new RegExp('<valueType>'), 'SettingRemote_WebApp');
                    s = s.replace(new RegExp('<mitarbeiter>'), DigiWebApp.SettingsController.getSetting('workerId'));
                    s = s.replace(new RegExp('<timestamp>'), now_as_timestamp);
	                dataStr += s;
                }
            }
        }

        // handle left-over properties (just in case)
        while (dataStr.match(new RegExp('><.*</xsd:')) !== null ) {
                dataStr = dataStr.replace(new RegExp('><.*</xsd:'), '></xsd:');
        }
        
        //dataStr += '\n';
        ////if (DigiWebApp.SettingsController.globalDebugMode) console.log('soapDataBooking: ' + dataStr);
        return dataStr;
    }

    , sendConfiguration: function(obj) {
    	// all callbacks lead to DigiWebApp.ApplicationController.authenticate()
    	//alert("in RequestController.sendConfiguration");
        // call authenticate
        this.authenticate({
              success: {  // send configuration in success callback
                  target: this
                , action: function() {
                    var that = this;
                    this.saveCallbacks(obj.success, obj.error, 'sendConfiguration');

                    var soapHeader= '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" ' +
                        'xmlns:tran="http://transfer.webservice.handy2.digi.de" xmlns:xsd="http://transferClasses.data.handy2.digi.de/xsd">' +
                        '<soapenv:Header/>' +
                        '<soapenv:Body>' +
                        '<tran:sendeKonfiguration>';
                    var soapFooter = '   <tran:modus>0</tran:modus>' +
                        '</tran:sendeKonfiguration>' +
                        '</soapenv:Body>' +
                        '</soapenv:Envelope>';

                    var data = soapHeader;
                    data += this.buildDataBodyConfiguration(obj.settings);
                    data += soapFooter;

                    // send configuration has its own request functionality, not by calling makeRequest()
                    M.Request.init({
                          url: 'http://' + DigiWebApp.RequestController.DatabaseServer + DigiWebApp.RequestController.handy2WebServicesUrl + '.DatenTransferHttpSoap11Endpoint/'
                        , method: 'POST'
                        , data: data
                        , timeout: 15000
                        , contentType: 'text/xml; charset=UTF-8'
                        , dataType: 'xml'
                        , beforeSend: function(xhr) {
                            if (obj.loaderText) {
                                DigiWebApp.ApplicationController.DigiLoaderView.show(obj.loaderText);
                            } else {
                                DigiWebApp.ApplicationController.DigiLoaderView.show(M.I18N.l('sendConfigurationMsg'));
                            }
                            xhr.setRequestHeader(
                                "SOAPAction",
                                "urn:sendeKonfiguration"
                            );
                            xhr.setRequestHeader(
                                "Content-Type",
                                "text/xml;charset=UTF-8"
                            );
                        }
                        , onSuccess: function(data2, msg, xhr) { // success callback of sendConfiguration
                        	////if (DigiWebApp.SettingsController.globalDebugMode) console.log("@@@ onSuccess of sendConfiguration");
                            that.endSession({
                                  success: {// success callback of endSession
                                      target: that
                                    , action: function() {
			                        	////if (DigiWebApp.SettingsController.globalDebugMode) console.log("@@@ onSuccess of endSession");
                                        DigiWebApp.ApplicationController.DigiLoaderView.hide();
                                        this.bindToCaller(this, this.handleSuccessCallback, [data2, msg, xhr, null, null, 'sendConfiguration'])();
                                        DigiWebApp.ApplicationController.authenticate();
                                    }
                                }
                                , error: { // error callback of endSession
                                      target: that
                                    , action: function() {
			                        	////if (DigiWebApp.SettingsController.globalDebugMode) console.log("@@@ onError of endSession " + err);
                                        DigiWebApp.ApplicationController.DigiLoaderView.hide();
                                        this.bindToCaller(this, this.handleSuccessCallback, [data2, msg, xhr, null, null, 'sendConfiguration'])();
                                        DigiWebApp.ApplicationController.authenticate();
                                    }
                                }
                            });
                        }
                        , onError: function(xhr, err) {// error callback of sendConfiguration
                        	////if (DigiWebApp.SettingsController.globalDebugMode) console.log("@@@ onError of sendConfiguration " + err);
                            that.endSession({
                                  success: {// success callback of endSession
                                      target: that
                                    , action: function() { // call errorcallback of sendConfiguration
			                        	////if (DigiWebApp.SettingsController.globalDebugMode) console.log("@@@ onSuccess of endSession");
                                        DigiWebApp.ApplicationController.DigiLoaderView.hide();
                                        that.bindToCaller(that, that.handleErrorCallback, [xhr, err, 'sendConfiguration'])();
                                        DigiWebApp.ApplicationController.authenticate();
                                    }
                                }
                                , error: { // error callback of endSession
                                      target: that
                                    , action: function() {
			                        	////if (DigiWebApp.SettingsController.globalDebugMode) console.log("@@@ onError of endSession " + err);
                                        DigiWebApp.ApplicationController.DigiLoaderView.hide();
                                        that.bindToCaller(that, that.handleErrorCallback, [xhr, err, 'sendConfiguration'])();
                                        DigiWebApp.ApplicationController.authenticate();
                                    }
                                }
                            });

                        }
                    }).send();
                }
            }
            , error: {
                  target: this
                , action: function() {
                    //this.connectionError();
                    DigiWebApp.ApplicationController.authenticate();
                    console.error("ConnectionError while sendConfiguration");
                }
            }
        });
    }

//    /**
//     * Sends the data.
//     *
//     * Process:
//     * -----------------------------------------------------
//     * (1) Authenticate => (2) Send Data => (3) End Session 
//     * -----------------------------------------------------
//     * (1) Calls authenticate
//     *
//     * Success Callback of (1):
//     * 1) saves callbacks for sendData
//     * 2) prepares SOAP XML (Envelope, Header, Data, Footer)
//     * 3) Makes SOAP POST Request to SOAP 1.1 Endpoint with data (SOAP XML) in POST body => (2) Send Data
//     * Error Callback of (2):
//     * 1) If it is called in closingDay context, reset employee selection
//     *
//     * Success Callback of (2):
//     * 1) Calls endSession() of this controller
//     * Error Callback of (2):
//     * 1) calls endSession => (3) End Session
//     *
//     * Success Callback of (3)
//     * 1.1) if endSession after sendData success: the success callback passed at the very beginning to sendData (in BookingController.sendData) is called because the call chain completes
//     * 1.2) call DigiWebApp.ApplicationController.init() with parameter true to load all data again
//     *
//     * 2.1) if endSession after sendData error: the error callback passed at the very beginning to sendData (in BookingController.sendData)
//     * is called because the sendData call didn't succeed, even though endSession did
//     *
//     * Error Callback of (3)
//     * 1.1) if endSession after sendData success: the success callback passed at the very beginning to sendData (in BookingController.sendData) is called because the call chain completes
//     * 1.2) call DigiWebApp.ApplicationController.init() with parameter true to load all data again
//     *
//     * 2.1) if endSession after sendData error: the error callback passed at the very beginning to sendData (in BookingController.sendData)
//     * is called because the sendData call didn't succeed, as well as the endSession did not
//     *
//     *
//     * @param obj
//     * @param isClosingDay
//     */
//    , sendData: function(obj, isClosingDay, doSync) {
//        // call authenticate
//        this.authenticate({
//              success: {  // send data in success callback
//                  target: this
//                , action: function() {
//                    var that = this;
//                    this.saveCallbacks(obj.success, obj.error, 'sendData');
//
//                    var soapHeader= '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" ' +
//                        'xmlns:tran="http://transfer.webservice.handy2.digi.de" xmlns:xsd="http://transferClasses.data.handy2.digi.de/xsd">' +
//                        '<soapenv:Header/>' +
//                        '<soapenv:Body>' +
//                        '<tran:sendeDaten>';
//                    var soapFooter = '   <tran:modus>0</tran:modus>' +
//                        '</tran:sendeDaten>' +
//                        '</soapenv:Body>' +
//                        '</soapenv:Envelope>';
//
//                    var data = soapHeader;
//                    data += this.buildDataBodyBookings(obj.bookings);
//                    var eb = this.buildEmployeeBody();
//                    data += eb;
//                    data += soapFooter;
//
//                    // send data has its own request functionality, not by calling makeRequest()
//                    M.Request.init({
//                          url: 'http://' + DigiWebApp.RequestController.DatabaseServer + DigiWebApp.RequestController.handy2WebServicesUrl + '.DatenTransferHttpSoap11Endpoint/'
//                        , method: 'POST'
//                        , data: data
//                        , timeout: 15000
//                        , contentType: 'text/xml; charset=UTF-8'
//                        , dataType: 'xml'
//                        , beforeSend: function(xhr) {
//                            if(obj.loaderText) {
//                                DigiWebApp.ApplicationController.DigiLoaderView.show(obj.loaderText);
//                            } else {
//                                DigiWebApp.ApplicationController.DigiLoaderView.show(M.I18N.l('sendDataMsg'));
//                            }
//                            xhr.setRequestHeader(
//                                "SOAPAction",
//                                "urn:sendeDaten"
//                            );
//                            xhr.setRequestHeader(
//                                "Content-Type",
//                                "text/xml;charset=UTF-8"
//                            );
//                        }
//                        , onSuccess: function(data, msg, xhr) { // success callback of sendData
//                            that.endSession({
//                                  success: {// success callback of endSession
//                                      target: that
//                                    , action: function() {
//                                        DigiWebApp.ApplicationController.DigiLoaderView.hide();
//                                        this.bindToCaller(this, this.handleSuccessCallback, [data, msg, xhr, null, null, 'sendData'])();
//
//                                        // now call startsync again
//                                        if (DigiWebApp.SettingsController.getSetting('autoSyncAfterBookTime') || doSync === true) {
//                                        	DigiWebApp.ApplicationController.startsync(YES);
//                                        }
//                                    }
//                                }
//                                , error: { // error callback of endSession
//                                      target: that
//                                    , action: function() {
//                                        DigiWebApp.ApplicationController.DigiLoaderView.hide();
//                                        this.bindToCaller(this, this.handleSuccessCallback, [data, msg, xhr, null, null, 'sendData'])();
//
//                                        // now call init again
//                                        DigiWebApp.ApplicationController.init(YES);
//                                    }
//                                }
//                            });
//                        }
//                        , onError: function(xhr, err) {// error callback of sendData
//                            that.endSession({
//                                success: {// success callback of endSession
//                                      target: that
//                                    , action: function() { // call errorcallback of sendData
//                                        DigiWebApp.ApplicationController.DigiLoaderView.hide();
//                                        that.bindToCaller(that, that.handleErrorCallback, [xhr, err, 'sendData'])();
//                                    }
//                                }
//                                , error: { // error callback of endSession
//                                      target: that
//                                    , action: function() {
//                                        DigiWebApp.ApplicationController.DigiLoaderView.hide();
//                                        that.bindToCaller(that, that.handleErrorCallback, [xhr, err, 'sendData'])();
//                                    }
//                                }
//                            });
//
//                        }
//                    }).send();
//                }
//            }
//            , error: {
//                  target: this
//                , action: function() {
//                    if(isClosingDay) {
//                        if(DigiWebApp.EmployeeController.getEmployeeState() == 2) {
//                            DigiWebApp.EmployeeController.setEmployeeState(1);
//                        }
//                        // clear employee selection
//                        localStorage.removeItem(DigiWebApp.EmployeeController.empSelectionKey);
//                        localStorage.removeItem(DigiWebApp.EmployeeController.empSelectionKeyTmp);
//                    }
//                    this.connectionError();
//                }
//            }
//        });
//
//
//    }
//
//
//    /**
//     * Constructs the SOAP data body for the bookings.
//     *
//     * Replaces the placeholder with their values of the actual booking
//     *
//     * @param {Array|Object} bookings The booking object(s) to be sent
//     */
//    , buildDataBodyBookings: function(bookings) {
//        var dataStr = '';
//        var soapDataBooking = '';
//        soapDataBooking = soapDataBooking + '   <tran:zeitdatenHandy>\n';
//		soapDataBooking = soapDataBooking + '       <xsd:auftragsId><orderId></xsd:auftragsId>\n';
//        soapDataBooking = soapDataBooking + '       <xsd:von><timeStampStart></xsd:von>\n';
//        soapDataBooking = soapDataBooking + '       <xsd:bis><timeStampEnd></xsd:bis>\n';
//        soapDataBooking = soapDataBooking + '       <xsd:gpsBreite><latitude></xsd:gpsBreite>\n';
//        soapDataBooking = soapDataBooking + '       <xsd:gpsLaenge><longitude></xsd:gpsLaenge>\n';
//        //soapDataBooking = soapDataBooking + '       <xsd:gpsBreite_bis><latitude_bis></xsd:gpsBreite_bis>\n';
//        //soapDataBooking = soapDataBooking + '       <xsd:gpsLaenge_bis><longitude_bis></xsd:gpsLaenge_bis>\n';
//        //soapDataBooking = soapDataBooking + '       <xsd:signature><signature></xsd:signature>\n';
//        soapDataBooking = soapDataBooking + '       <xsd:handauftrag><handOrderName></xsd:handauftrag>\n';
//        soapDataBooking = soapDataBooking + '       <xsd:handauftragsId><handOrderId></xsd:handauftragsId>\n';
//        soapDataBooking = soapDataBooking + '       <xsd:positonsId><positionId></xsd:positonsId>\n';
//        soapDataBooking = soapDataBooking + '       <xsd:taetigkeitsId><activityId></xsd:taetigkeitsId>\n';
//        soapDataBooking = soapDataBooking + '       <xsd:bemerkungsfeld><remark></xsd:bemerkungsfeld>\n';
//        soapDataBooking = soapDataBooking + '   </tran:zeitdatenHandy>\n';
//
//        if(typeof(bookings) === 'object' && !_.isArray(bookings)) {
//            bookings = [bookings];  // if an object was passed, push it into an array, to have one behaviour
//        }
//
//        if(_.isArray(bookings)) {
//        
//            for(var i in bookings) {
//                var booking = bookings[i];
//                var s = soapDataBooking;
//                for(var prop in booking.record) {
//                    if(prop === '_createdAt' || prop === '_updatedAt') { continue; }
//                    if(prop === 'handOrderName') {
//                        s = s.replace(new RegExp('<' + prop + '>'), booking.get(prop) === '0' ? '' : booking.get(prop));
//                    } else if(prop === 'orderId') {
//                        s = s.replace(new RegExp('<' + prop + '>'), (booking.get(prop) === booking.get('handOrderName') || booking.get('handOrderName') !== '') ? '0' : booking.get(prop));
//                    } else if(prop === 'handOrderId') {
//                        s = s.replace(new RegExp('<' + prop + '>'), (booking.get(prop) === booking.get('handOrderName')) ? '' : booking.get(prop));
//                    } else if(prop === 'fileName') {
//                        s = s.replace(new RegExp('<signature>'), typeof(booking.signature) === 'undefined' ? '' : booking.signature);
//                    } else {
//                        s = s.replace(new RegExp('<' + prop + '>'), booking.get(prop));
//                    }
//                }
//                
//                dataStr += s;
//                
//            }
//        }
//
//        // handle left-over properties (maybe the webapp has been updated while there were old bookings in localstorage?)
//        while (dataStr.match(new RegExp('><.*</xsd:')) !== null ) {
//                dataStr = dataStr.replace(new RegExp('><.*</xsd:'), '></xsd:');
//        }
//        
//        //dataStr += '\n';
//        ////if (DigiWebApp.SettingsController.globalDebugMode) console.log('soapDataBooking: ' + dataStr);
//        return dataStr;
//    }
//
//    /**
//     * Constructs the SOAP data body for the employees.
//     *
//     * Replaces the placeholder with the values of the employee selection.
//     */
//    , buildEmployeeBody: function() {
//        var empStr = '';
//        var soapDataEmployees = '   <tran:mitarbeiterIds><mitarbeiterIds></tran:mitarbeiterIds>\n';
//        var employeeIds = localStorage.getItem(DigiWebApp.EmployeeController.empSelectionKey) || localStorage.getItem(DigiWebApp.EmployeeController.empSelectionKeyTmp);
//        if(employeeIds) {
//            employeeIds = employeeIds.split(',');
//        }
//        if(employeeIds && employeeIds != 'null' && _.isArray(employeeIds) && employeeIds.length > 0) {
//            _.each(employeeIds, function(em) {
//                empStr += soapDataEmployees.replace(/<mitarbeiterIds>/, em);
//            });
//            return empStr;
//        } else {
//            return '<tran:mitarbeiterIds>0</tran:mitarbeiterIds>\n';
//        }
//    }


    /**
     *
     * Is a proxy for the success callback and prepares the data returned from the server.
     *
     * Transforms it from XML to JSON, either through transformResultToJson() or special functions
     * for work plans and kolonne, because they cannot be transformed automatically.
     *
     * Calls the success callback of the source call afterwards.
     *
     * @param {Document|Object} data The returned data of the server as a jQuery Document
     * @param {Object} msg
     * @param {Object} xhr The XMLHTTPRequest object.
     * @param {Boolean} workPlanTransform F
     * @param {Boolean} kolonneTransform
     * @param {String} source The name of the method to identify the source of the call
     */
    , handleSuccessCallback: function(data, msg, xhr, workPlanTransform, kolonneTransform, source) {
        var d = null;
        if (!workPlanTransform && !kolonneTransform) {
            d = this.transformResultToJson(data);
        } else {
            if(workPlanTransform) {
                d = this.transformWorkPlanXmlToJson(data);
            } else if(kolonneTransform) {
                d = this.transformKolonneXmlToJson(data);
            }
        }
        M.EventDispatcher.checkHandler(this.successCallback[source]);
        this.successCallback[source].target = this.successCallback[source].target || this;
        this.bindToCaller(this.successCallback[source].target, this.successCallback[source].action, [d, msg, xhr])();
    }


    /**
     *
     * Calls the error callback of the source call
     *
     * @param {Object} xhr The XMLHTTPRequest object.
     * @param {String} err The text status, e.g. "parseerror" or "timeout"
     * @param {String} source The name of the method to identify the source of the call
     */
    , handleErrorCallback: function(xhr, err, source) {
        M.EventDispatcher.checkHandler(this.errorCallback[source]);
        this.errorCallback[source].target = this.errorCallback[source].target || this;
        this.bindToCaller(this.errorCallback[source].target, this.errorCallback[source].action, [xhr, err])();
    }

    /**
     * Saves the callback objects in the corresponding controller properties:
     * - successCallback
     * - errorCallback
     * with their source as key.
     *
     * @param {Object} success The success callback object.
     * @param {Object} error The error callback object.
     * @param source
     */
    , saveCallbacks: function(success, error, source) {
        if (success) {
            this.successCallback[source] = success;
        }
        if (error) {
            this.errorCallback[source] = error;
        }
    }

    /**
     * Automatically transforms the returned XML to JSON.
     * Uses Xml2Json lib/plugin for jQuery.
     *
     * @param {Document|Object} data The returned data of the server, prepared by jQuery
     * @return {Object} The data in JSON format (=> JavaScript object).
     */
    , transformResultToJson: function(data) {
    	////if (DigiWebApp.SettingsController.globalDebugMode) console.log("transformResultToJson: " + data);
        return $.xml2json(data);
    }


    /**
     *
     * Transforms the work plan xml manually to a JavaScript object.
     *
     * Traverses the documented with jQuery function find.
     *
     * @param {Document|Object} data The returned data of the server, prepared by jQuery
     * @return {Object} The data as a JavaScript object underneath a "return" property as an array.
     */
    , transformWorkPlanXmlToJson: function(data) {
    	////if (DigiWebApp.SettingsController.globalDebugMode) console.log("transformWorkPlanXmlToJson: " + data);

        var response = {}; 
        response['return'] = [];        
        var xmlDoc = $.parseXML(data);
        ////if (DigiWebApp.SettingsController.globalDebugMode) console.log(xmlDoc);
        
        if ((YES) || ( $(xmlDoc).find('return').length !== xmlDoc.documentElement.childNodes.length )) {

        	_.forEach(xmlDoc.documentElement.childNodes,function(el, i){
        	
				var obj = {};
        		obj.positionen = [];
        		obj.taetigkeitsIds = [];

        		var anzahlPositionen = (el.childNodes.length - 2) / 2;
        		var arbeitsplanId = el.childNodes[0].childNodes[0].nodeValue;
        		var arbeitsplanTyp = el.childNodes[1].childNodes[0].nodeValue;

        		for (var j=2; j<anzahlPositionen + 2; j++) {
        			//console.log(el.childNodes[j].childNodes[0].nodeValue + " = " + el.childNodes[j+anzahlPositionen].childNodes[0].nodeValue);	
        			var positionTaetigkeit = el.childNodes[j].childNodes[0].nodeValue;
        			var tateigkeitId = el.childNodes[j+anzahlPositionen].childNodes[0].nodeValue;
        			obj.arbeitsplanId = arbeitsplanId;
                    obj.arbeitsplanTyp = arbeitsplanTyp;
        			obj.positionen.push(positionTaetigkeit);
        			obj.taetigkeitsIds.push(tateigkeitId);
        		}

        		response['return'].push(obj);

        	});

		} else {
		// old variant (pre TMP-1.1)
	        $(xmlDoc).find('return').each( // for every result
	            function(i, el) {
	                var obj = {};
	                $(el).find('[localName$="arbeitsplanId"]').each(
	                    function(r, el2) {
	                        obj.arbeitsplanId = $(el2).text();
	                    }
	                );
	                $(el).find('[localName$="arbeitsplanTyp"]').each(
	                    function(r, el2) {
	                        obj.arbeitsplanTyp = $(el2).text();
	                    }
	                );
	                obj.positionen = [];
	                $(el).find('[localName$="positionTaetigkeit"]').each(
	                    function(r, el2) {
	                        obj.positionen.push($(el2).text());
	                    }
	                );
	                obj.taetigkeitsIds = [];
	                $(el).find('[localName$="tateigkeitId"]').each(
	                    function(r, el2) {
	                        obj.taetigkeitsIds.push($(el2).text());
	                    }
	                );
	                response['return'].push(obj);
	            }
	        );
	    }

        return response;
    }

    /**
     * Transforms the work plan xml manually to a JavaScript object.
     *
     * Traverses the documented with jQuery function find.
     *
     * @param {Document|Object} data The returned data of the server, prepared by jQuery.
     * @return {Object|Null} The data (employees) as a JavaScript object underneath a "return" property as an array or null if no employees where sent.
     */
    , transformKolonneXmlToJson: function(data) {
    	////if (DigiWebApp.SettingsController.globalDebugMode) console.log("transformKolonneXmlToJson: " + data);
        
        var response = {};
        response['return'] = [];        
        var xmlDoc = $.parseXML(data);
        ////if (DigiWebApp.SettingsController.globalDebugMode) console.log(xmlDoc);
        
        if ((YES) || ( $(xmlDoc).find('return').length !== xmlDoc.documentElement.childNodes.length )) {

        	_.forEach(xmlDoc.documentElement.childNodes,function(el, i){
        	
				var obj = {};
        		obj.mitarbeiterIds = [];
        		obj.mitarbeiterName = [];

        		var anzahlMitarbeiter = (el.childNodes.length -1) / 2;
        		var kolonnenId = el.childNodes[0].childNodes[0].nodeValue;

        		for (var j=1;j<=anzahlMitarbeiter;j++) {
        			//console.log(el.childNodes[j].childNodes[0].nodeValue + " = " + el.childNodes[j+anzahlMitarbeiter].childNodes[0].nodeValue);	
        			var mitarbeiterId = el.childNodes[j].childNodes[0].nodeValue;
        			var mitarbeiterName = el.childNodes[j+anzahlMitarbeiter].childNodes[0].nodeValue;
        			obj.kolonnenId = kolonnenId;
        			obj.mitarbeiterIds.push(mitarbeiterId);
        			obj.mitarbeiterName.push(mitarbeiterName);
        		}

        		response['return'] = obj;

        	});

		} else {
		// old variant (pre TMP-1.1)
	        $(xmlDoc).find('return').each( // for every result
	            function(i, el) {
	                var obj = {};
	                $(el).find('[nodeName$="kolonnenId"]').each(
	                    function(r, el2) {
	                        obj.kolonnenId = $(el2).text();
	                    }
	                );
	                obj.mitarbeiterIds = [];
	                $(el).find('[nodeName$="mitarbeiterId"]').each(
	                    function(r, el2) {
	                        obj.mitarbeiterIds.push($(el2).text());
	                    }
	                );
	                obj.mitarbeiterName = [];
	                $(el).find('[nodeName$="mitarbeiterName"]').each(
	                    function(r, el2) {
	                        obj.mitarbeiterName.push($(el2).text());
	                    }
	                );
	                response['return'] = obj;
	            }
	        );
	    }  

        if(response['return'] && response['return'].mitarbeiterIds) {
            var employees = [];

            for(var i in response['return'].mitarbeiterIds) {
                var id = response['return'].mitarbeiterIds[i];
                employees.push({
                      kolonnenId: response['return'].kolonnenId
                    , id: id
                    , name: response['return'].mitarbeiterName[i]
                });
            }

            response['return'] = employees;
            return response;
        } else {
            return null;
        }
    }

    /**
     * Displays a connection error alert.
     */
    , connectionError: function() {
        //M.DialogView.alert({
        DigiWebApp.ApplicationController.nativeAlertDialogView({
              title: M.I18N.l('connectionError')
            , message: M.I18N.l('connectionErrorMsg')
        });
    }
});