// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: DigiWebApp
// Controller: JSONDatenuebertragungController
// ==========================================================================
// manuell var-checked
DigiWebApp.JSONDatenuebertragungController = M.Controller.extend({

	  consoleLogOutput: YES

	, GatewayServer: 'primary.digi-gateway.de'
	, GatewayPool: 'pool.digi-gateway.de'
	, TestServer: "vespasian.digi-zeitserver.de"
	, DatabaseServer: null
	, DatabaseServerTimestamp: null
	, AuthentifizierenCode: null
	
	, sendData: function(sendObj) {
		var that = this;
    	writeToLog("sendData");
		if (!sendObj) {
			writeToLog("Daten konnten nicht gesendet werden! Falsche Übergabe an sendData.");
			return;
		}
		if (!that.DatabaseServer 
		|| (that.DatabaseServerTimestamp && (that.DatabaseServerTimestamp - new Date().getTime() > 60000))) 
		{
		  	that.empfangeUrl(function(obj) {
		  		that.sendDataWithServer(sendObj);
		  	});
		} else {
			that.sendDataWithServer(sendObj);
		}
	}

	
	, sendDataWithServer: function(sendObj) {
		var that = this;
    	writeToLog("sendDataWithServer");
		if (!sendObj) {
			writeToLog("Daten konnten nicht gesendet werden! Falsche Übergabe an sendData.");
			return;
		}
		if (!that.AuthentifizierenCode 
		|| parseIntRadixTen(that.AuthentifizierenCode) != 1) 
		{
		  	that.empfangeUrl(function() {
		  		that.sendDataWithServerAuthenticated(sendObj);
		  	});
		} else {
			that.sendDataWithServerAuthenticated(sendObj);
		}
	}
	, sendDataWithServerAuthenticated: function(sendObj) {
		var that = this;
    	writeToLog("sendDataWithServerAuthenticated");
		var data = sendObj['data'];
		var webservice = sendObj['webservice'];
		var loaderText = sendObj['loaderText'];
		var successCallback = sendObj['successCallback'];
		var errorCallback = sendObj['errorCallback'];
		var additionalQueryParameter = sendObj['additionalQueryParameter'];
		var timeoutSetting = DigiWebApp.SettingsController.getSetting("WebserviceTimeOut") ? DigiWebApp.SettingsController.getSetting("WebserviceTimeOut") : DigiWebApp.SettingsController.defaultsettings.get('WebserviceTimeOut');
		var timeout = sendObj['timeout'] ? sendObj['timeout'] : timeoutSetting;
		var omitLoaderHide = sendObj['omitLoaderHide'] ? sendObj['omitLoaderHide'] : false;
		
		var myURL =  'http://' + DigiWebApp.RequestController.DatabaseServer + '/WebAppServices/' + webservice + '?modus=0&firmenId=' + DigiWebApp.SettingsController.getSetting('company') + '&kennwort=' + DigiWebApp.SettingsController.getSetting('password') + '&geraeteId=' + DigiWebApp.SettingsController.getSetting('workerId') + '&geraeteTyp=2&softwareVersion=' + DigiWebApp.RequestController.softwareVersion + '&requestTimestamp=' + M.Date.now().date.valueOf();
		if (additionalQueryParameter) {
			myURL = myURL + '&' + additionalQueryParameter;
		}
		var req = M.Request.init({
					  url: myURL
					, method: 'POST'
		            , data: JSON.stringify(data)
		            , timeout: timeout
		            , contentType: 'text/plain'
		            , dataType: 'text' // oder 'json'
		            , beforeSend: function(xhr) {
		                DigiWebApp.ApplicationController.DigiLoaderView.show(loaderText);
		                xhr.setRequestHeader(
		                    "Content-Type",
		                    "text/plain"
		                );
		            }
		            , onSuccess: function(data2, msg, xhr) { // success callback of sendData
		                console.log(xhr);
		                if (!omitLoaderHide) { DigiWebApp.ApplicationController.DigiLoaderView.hide(); }
						try{writeToLog("Rückgabe des Webservices: " + xhr.responseText);}catch(e){};
		                successCallback(data, msg, xhr);
		            }
		            , onError: function(xhr, err) {// error callback of sendData
		                DigiWebApp.ApplicationController.DigiLoaderView.hide();
		                DigiWebApp.RequestController.DatabaseServer = null;
		                console.error(err);
		                console.error(xhr);
						try{trackError(err,function(){
							try{writeToLog("fehlerhafte Rückgabe des Webservices: " + xhr.responseText);}catch(e){};
							errorCallback(xhr, err);
						});}catch(e){};
		            }
	    });
		
    	writeToLog("JSON-WebService '" + webservice + "' wird aufgerufen", function(){
    		req.send();
    	});
    }

	, recieveData: function(recieveObj) {
		var that = this;
    	writeToLog("recieveData");
		if (!recieveObj) {
			writeToLog("Daten konnten nicht empfangen werden! Falsche Übergabe an recieveData.");
			return;
		}
		if (!that.DatabaseServer 
		|| ( that.DatabaseServerTimestamp && (that.DatabaseServerTimestamp - new Date().getTime() > 60000))) 
		{
			that.empfangeUrl(function() {
		  		that.recieveDataWithServer(recieveObj);
		  	});
		} else {
			that.recieveDataWithServer(recieveObj);
		}
	}

	, recieveDataWithServer: function(recieveObj) {
		var that = this;
    	writeToLog("recieveDataWithServer");
		if (!recieveObj) {
			writeToLog("Daten konnten nicht empfangen werden! Falsche Übergabe an recieveData.");
			return;
		}
		if (!that.AuthentifizierenCode 
		|| parseIntRadixTen(that.AuthentifizierenCode) != 1) 
		{
			that.authentifizieren(function() {
				that.recieveDataWithServerAuthenticated(recieveObj);
		  	});
		} else {
			that.recieveDataWithServerAuthenticated(recieveObj);
		}
	}
	
	, recieveDataWithServerAuthenticated: function(recieveObj) {
		var that = this;
    	writeToLog("recieveDataWithServerAuthenticated");
		if (!recieveObj) {
			writeToLog("Daten konnten nicht empfangen werden! Falsche Übergabe an recieveData.");
			return;
		}
		var webservice = recieveObj['webservice']
		var loaderText = recieveObj['loaderText']
		var successCallback = recieveObj['successCallback']
		var errorCallback = recieveObj['errorCallback']
		var additionalQueryParameter = recieveObj['additionalQueryParameter']
		var timeoutSetting = DigiWebApp.SettingsController.getSetting("WebserviceTimeOut") ? DigiWebApp.SettingsController.getSetting("WebserviceTimeOut") : DigiWebApp.SettingsController.defaultsettings.get('WebserviceTimeOut');
		var timeout = recieveObj['timeout'] ? recieveObj['timeout'] : timeoutSetting;
		var geraeteIdOverride = recieveObj['geraeteIdOverride'] ? recieveObj['geraeteIdOverride'] : NO;
		var myModus = recieveObj['modus'] ? recieveObj['modus'] : 0;
		var databaseServer = DigiWebApp.RequestController.DatabaseServer;
		// hack um Mitarbeiternamen ziehen zu können
		var myGeraeteId = DigiWebApp.SettingsController.getSetting('workerId');
		var myGeraeteTyp = 2;
		if (geraeteIdOverride) {
			myGeraeteId = 0;
			myGeraeteTyp = 3;
		}
		
		if (webservice == 'allgemein/empfangeUrl') {
			if(databaseServer == null || databaseServer == '')
				databaseServer = that.GatewayServer;
		}
			
		var myURL = 'http://' + databaseServer + '/WebAppServices/' + webservice + '?modus=' + myModus + '&firmenId=' + DigiWebApp.SettingsController.getSetting('company') + '&kennwort=' + DigiWebApp.SettingsController.getSetting('password') + '&geraeteId=' + myGeraeteId + '&geraeteTyp=' + myGeraeteTyp + '&softwareVersion=' + DigiWebApp.RequestController.softwareVersion + '&requestTimestamp=' + M.Date.now().date.valueOf();
		//console.log(myURL);
		if (additionalQueryParameter) {
			myURL = myURL + '&' + additionalQueryParameter;
		}
    	writeToLog("JSON-WebService '" + webservice + "' wird aufgerufen");
    	if (DigiWebApp.SettingsController.getSetting('debug')) {
    		writeToLog("myURL '" + myURL + "'");
    	}
		M.Request.init({
			  url: myURL
			, beforeSend: function(xhr) {
                DigiWebApp.ApplicationController.DigiLoaderView.show(loaderText);
            }
			, method: 'GET'
			, sendNoCacheHeader: YES
			, sendTimestamp: YES
			, timeout: timeout
			, isJSON: YES
			, onSuccess: function(data, msg, request) {
				DigiWebApp.ApplicationController.DigiLoaderView.hide();
				successCallback(data, msg, request);
			}
            , onError: function(xhr, err) {// error callback
				DigiWebApp.ApplicationController.DigiLoaderView.hide();
                DigiWebApp.RequestController.DatabaseServer = null;
                that.DatabaseServer = null;
                //console.error(err);
                //console.error(xhr);
                writeToLog('## recieveDataWithServer ' + err);
                writeToLog('## recieveDataWithServer ' + xhr.status + ' ' + xhr.responseType
                		+ ' ' + xhr.response + ' ' + xhr.getAllResponseHeaders());
				try{trackError(err,function(){
					try{writeToLog("fehlerhafte Rückgabe des Webservices: " + xhr.responseText);}catch(e){};
					errorCallback(xhr, err);
				});}catch(e){};
			}
		}).send();
	}
	
	, setDatabaseServer: function(server) {
		var that = this;
		that.DatabaseServer = server;
		DigiWebApp.RequestController.DatabaseServer = that.DatabaseServer;
	}
	
	, setGatewayServer: function(server) {
		var that = this;
		that.GatewayServer = server;
		DigiWebApp.RequestController.GatewayServer = that.GatewayServer;
	}
	
	, setDatabaseServerTimestamp: function(timestamp) {
		var that = this;
		that.DatabaseServerTimestamp = timestamp;
		DigiWebApp.RequestController.DatabaseServerTimestamp = that.DatabaseServerTimestamp;
	}
	
	, setAuthentifizierenCode: function(code) {
		var that = this;		
		that.AuthentifizierenCode = code;
		DigiWebApp.RequestController.AuthentifizierenCode = that.AuthentifizierenCode;
	}

	, empfangeUrl: function(callback) {
		var that = this;
    	writeToLog("empfangeUrl");
		if (typeof(callback) != "function") callback = function(){};
		
    	var myGatewayServer = that.GatewayServer;

    	if (inDebug()) {
    		that.setDatabaseServer(that.TestServer);
			that.DatabaseServer = that.TestServer;
			myGatewayServer = that.DatabaseServer;
		}
    	    	
    	if (typeof(device) === "undefined") {
    		myGatewayServer = location.host;
    	}

    	var successFunc = function(data, msg, xhr) {
    		//console.log(data);
			DigiWebApp.ApplicationController.DigiLoaderView.hide();
	    	if (data !== null) {
	    		var objEmpfangeUrl = data.empfangeUrl;
	    		that.setDatabaseServer(objEmpfangeUrl.url);
	    	} else {
	    		console.log("FALLBACK: empty DatabaseServer --> falling back to GatewayServer"); 
	    		that.setDatabaseServer(that.GatewayServer);
	    	}
	    	that.setDatabaseServerTimestamp(new Date().getTime());
	    	if (typeof(device) === "undefined") {
	    		if ((location.host !== that.DatabaseServer)) {
	        		DigiWebApp.ApplicationController.nativeConfirmDialogView({
		            	  title: M.I18N.l('wrongServer')
	    		        , message: M.I18N.l('wrongServerMessage')
			            , confirmButtonValue: M.I18N.l('yes')
	            		, cancelButtonValue: M.I18N.l('appZuruecksetzen')
	            		, callbacks: {
	                		  confirm: {
	                    		  target: this
	                    		, action: function() {
						    			location.href = 'http://' + that.DatabaseServer + location.pathname;
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
	    		}
			}
	    	callback();
        };
    	var errorFunc = function(xhr, err) {
        	// asking primary-gateway failed --> ask gateway-pool
            that.setDatabaseServer(that.GatewayPool);
        	var secondErrorFunc = function(xhr, err) {
            	// asking the gateway-pool also failed!
        		DigiWebApp.ApplicationController.DigiLoaderView.hide();
        		writeToLog('## getDatabaseServer ' + err);
        		DigiWebApp.ApplicationController.proceedWithLocalData("getDatabaseServer");
            };
        	var secondReceiveObj = {
        		  webservice: 'allgemein/empfangeUrl'
        		, loaderText: M.I18N.l('empfangeUrlLoader')
        		, successCallback: successFunc
        		, errorCallback: secondErrorFunc
        		, additionalQueryParameter : ''
        		, geraeteIdOverride: false
        		, modus: '0' 
        	};
        	that.recieveDataWithServerAuthenticated(secondReceiveObj);
        };
        
    	// ask primary-gateway (or localhost if not on device)
        that.setDatabaseServer(myGatewayServer);
        var receiveObj = {
        		  webservice: 'allgemein/empfangeUrl'
        		, loaderText: M.I18N.l('empfangeUrlLoader')
        		, successCallback: successFunc
        		, errorCallback: errorFunc
        		, additionalQueryParameter : ''
        		, geraeteIdOverride: false
        };
		if (inDebug() && staticDebugging) alert(navigator.platform + ", JSONDatenuebertragungController.empfangeUrl " + "vor recieveDataWithServer (primary)" + myGatewayServer);
		that.recieveDataWithServerAuthenticated(receiveObj);
	}
	
	, authentifizieren: function(callback) {
		var that = this;
    	writeToLog("authentifizieren");
		if (!DigiWebApp.SettingsController.EnforceCredentials()) {
			return;
		}
		if (!that.DatabaseServer 
		|| ( that.DatabaseServerTimestamp && (that.DatabaseServerTimestamp - new Date().getTime() > 60000))) 
		{
			that.empfangeUrl(function() {
		  		that.authentifizierenWithServer(callback);
		  	});
		} else {
			that.authentifizierenWithServer(callback);
		}
	}
	
	, authentifizierenWithServer: function(callback) {
		var that = this;
    	writeToLog("authentifizierenWithServer");
		if (typeof(callback) != "function") callback = function(){};
		var evalCode = function(code) {
				switch(parseIntRadixTen(code)) {
	            case 1:
	        		var timestampNow = D8.now().getTimestamp();
	        		if (DigiWebApp.ApplicationController.timestampMitarbeiterZuletztGeladen === null 
	        		|| (timestampNow - DigiWebApp.ApplicationController.timestampMitarbeiterZuletztGeladen > 60000)) {
	            		writeToLog("aktualisiere Mitarbeiter des Benutzers nach authenticate", function(){
		            		var maRecieveObj = {
		          				  webservice: "mitarbeiter"
		          				, loaderText: M.I18N.l('BautagebuchLadeMitarbeiter')
		          				, successCallback: function(data){
			        	    		if (data && data.mitarbeiter && data.mitarbeiter.length > 0) {
			        	    			DigiWebApp.SettingsController.setSetting("mitarbeiterVorname", data.mitarbeiter[0].vorname);
			        	    			DigiWebApp.SettingsController.setSetting("mitarbeiterNachname", data.mitarbeiter[0].nachname);
			        	    			DigiWebApp.SettingsController.setSetting("mitarbeiterId", data.mitarbeiter[0].mitarbeiterId);
			        	    		}
			        	    		DigiWebApp.ApplicationController.timestampMitarbeiterZuletztGeladen = D8.now().getTimestamp();
			        	    		callback();        		
			        	    	}
		          				, errorCallback: function(error) {
		            	    		DigiWebApp.ApplicationController.DigiLoaderView.hide();
		                			// Fehlermeldung
		                			DigiWebApp.ApplicationController.nativeAlertDialogView({
		                                title: M.I18N.l('offlineWorkNotPossible')
		                              , message: M.I18N.l('offlineWorkNotPossibleMsg')
		                			});
		            	    	}
		          				, additionalQueryParameter: "getAll=true&webAppId=" + DigiWebApp.SettingsController.getSetting("workerId")
		          				//, timeout: 
		          				, geraeteIdOverride: true
		          				//, modus: 
		            		};
		            		DigiWebApp.JSONDatenuebertragungController.recieveDataWithServerAuthenticated(maRecieveObj);
	            		});
	        		} else {
	    	    		callback();        		
	        		}
	
	                DigiWebApp.ApplicationController.enforceChefToolOnly();
	        		break;
	            
	            case 2:
	                //M.DialogView.alert({
	                DigiWebApp.ApplicationController.nativeAlertDialogView({
	                      title: M.I18N.l('authenticationError2')
	                    , message: M.I18N.l('authenticationErrorMsg2')
	                });
	                DigiWebApp.NavigationController.toSettingsPage(YES);
	                break;
	
	            case 3:
	                //M.DialogView.alert({
	                DigiWebApp.ApplicationController.nativeAlertDialogView({
	                      title: M.I18N.l('authenticationError3')
	                    , message: M.I18N.l('authenticationErrorMsg3')
	                });
	                DigiWebApp.NavigationController.toSettingsPage(YES);
	                break;
	
	            default:
	                //M.DialogView.alert({
	                DigiWebApp.ApplicationController.nativeAlertDialogView({
	                      title: M.I18N.l('authenticationError')
	                    , message: code
	                });
	                DigiWebApp.NavigationController.toSettingsPage(YES);
	                break;
	        }
		}
		
    	var successFunc = function(data, msg, xhr) {
			DigiWebApp.ApplicationController.DigiLoaderView.hide();
	    	if (data !== null) {
	    		var objAuthentifizieren = data.authentifizieren;
	    		that.setAuthentifizierenCode(objAuthentifizieren.code);
	    		evalCode(objAuthentifizieren.code);
	    	}
	    };
        var errorFunc = function(xhr, err) {
			DigiWebApp.ApplicationController.DigiLoaderView.hide();
    		that.setAuthentifizierenCode(null);
    		evalCode(err);
        };
        
        var receiveObj = {
        		  webservice: 'allgemein/authentifizieren'
        		, loaderText: M.I18N.l('authenticateLoader')
        		, successCallback: successFunc
        		, errorCallback: errorFunc
        		, additionalQueryParameter : ''
        		, geraeteIdOverride: false
        };
		//if (inDebug() && staticDebugging) alert(navigator.platform + ", JSONDatenuebertragungController.empfangeUrl " + "vor recieveData ");
		that.recieveDataWithServerAuthenticated(receiveObj);
	}

	, sendeZeitdaten: function(mybuchungen, mysuccessCallback, myerrorCallback, myisClosingDay, mydoSync) {
		//var that = this;
		var absenden = function(buchungen, successCallback, errorCallback, isClosingDay, doSync) {
			//if (DigiWebApp.SettingsController.getSetting("debug"))  console.log("absenden");
			var items = [];
			var relevanteZeitbuchungen = buchungen;
			var relevanteZeitbuchungenSorted = _.sortBy(relevanteZeitbuchungen , function(z) {
	            return parseIntRadixTen(z.get('_createdAt'));
	        });
			
			var employeeIds = localStorage.getItem(DigiWebApp.EmployeeController.empSelectionKey) || localStorage.getItem(DigiWebApp.EmployeeController.empSelectionKeyTmp);
			var employeeIdsArray = [];
			if ((employeeIds) && employeeIds !== "0") {
				// Kolonne aktiv
				employeeIdsArray = employeeIds.split(",");
			} else {
				employeeIdsArray = [DigiWebApp.SettingsController.getSetting("mitarbeiterId")];
			}
					
			_.each(relevanteZeitbuchungenSorted, function(el) {
				
				_.each(employeeIdsArray, function(maId) {
					var zeitbuch = DigiWebApp.Booking.createRecord({
						m_id: el.m_id
					});
					for (var prop in el.record) {
						try {
							if (typeof(JSON.parse(el.get(prop)).length) !== "undefined") {
								zeitbuch.set(prop, JSON.parse(el.get(prop)));
							} else {
								zeitbuch.set(prop, el.get(prop));
							}
						} catch(e2) {
							zeitbuch.set(prop, el.get(prop));
						}
					}
					
					if (parseIntRadixTen(zeitbuch.get("timeStampEnd")) === 0) {
						zeitbuch.set("timeStampEnd", null);
						
						// compability
						zeitbuch.set("longitude_bis", "0");
						zeitbuch.set("latitude_bis", "0");
						
						if (!zeitbuch.get("longitude")) {
							zeitbuch.set("longitude", "0");
						}
						if (!zeitbuch.get("latitude")) {
							zeitbuch.set("latitude", "0");
						}
						
					}
					
					zeitbuch.set("gpsLaengeVon",zeitbuch.get("longitude"));
					zeitbuch.set("gpsBreiteVon",zeitbuch.get("latitude"));
					zeitbuch.set("gpsLaengeBis",zeitbuch.get("longitude_bis"));
					zeitbuch.set("gpsBreiteBis",zeitbuch.get("latitude_bis"));
	
					zeitbuch.set("handauftragsId",zeitbuch.get("handOrderId"));
					zeitbuch.set("handauftragsBezeichnung",zeitbuch.get("handOrderName"));
	
					zeitbuch.set("mitarbeiterId", maId);
					items.push(zeitbuch.record);
				});
			});
			if (items.length !== 0) {
				var data = {"zeitdaten": items};
				
				var internalErrorCallback = function() {
					if (isClosingDay) {
	                    if(DigiWebApp.EmployeeController.getEmployeeState() == 2) {
	                        DigiWebApp.EmployeeController.setEmployeeState(1);
	                    }
	                    // clear employee selection
	                    localStorage.removeItem(DigiWebApp.EmployeeController.empSelectionKey);
	                    localStorage.removeItem(DigiWebApp.EmployeeController.empSelectionKeyTmp);
	                }
//			        DigiWebApp.ApplicationController.nativeAlertDialogView({
//			              title: M.I18N.l('connectionError')
//			            , message: M.I18N.l('connectionErrorMsg')
//			        });
					errorCallback();
				};
				var internalSuccessCallback = function(data2, msg, request) {
					// verarbeite empfangene Daten
					if (parseIntRadixTen(request.responseText) != items.length) {
						writeToLog("Fehler: Falsche Rückgabe des Zeitservers (" + request.responseText + ")", function(){
							writeToLog("items.length: " + items.length, function(){
								internalErrorCallback();
							});
						});
					} else {
						// weiter in der Verarbeitungskette
						successCallback();
					}
					
				};
				
				// aktuelle scrId protokollieren
				var scrId = DigiWebApp.SettingsController.getSetting("scrId");
				writeToLog(scrId, function(){
					// zeitdaten-array protokollieren
					writeToLog(escape(scrStr(JSON.stringify(data), scrId)), function() {
						var itemsLengthLogStr = "Sende " + items.length + " Zeitbuchung";
						if (items.length > 1) { itemsLengthLogStr += "en"; }
						writeToLog(itemsLengthLogStr, function() {
							var sendObj = {
								  data: data
								, webservice: "zeitdaten"
								, loaderText: M.I18N.l('sendDataMsg')
								, successCallback: internalSuccessCallback
								, errorCallback: internalErrorCallback
								//, additionalQueryParameter:
								//, timeout: 60000
							};
							DigiWebApp.JSONDatenuebertragungController.sendData(sendObj);
						});
					});
				});

			} else {
				successCallback();
			}
		};
		if (DigiWebApp.SettingsController.featureAvailable('417') && (DigiWebApp.SettingsController.getSetting("ServiceApp_ermittleGeokoordinate") || DigiWebApp.SettingsController.getSetting("ServiceApp_datenUebertragen"))) {
			DigiWebApp.ApplicationController.DigiLoaderView.show(M.I18N.l('ServiceAppKommunikation'));
			//if (DigiWebApp.SettingsController.getSetting("debug"))  console.log("refreshWAIT");
			DigiWebApp.ServiceAppController.refreshWAITBookings(function(){
				//if (DigiWebApp.SettingsController.getSetting("debug"))  console.log("refreshWAIT done success");
				DigiWebApp.ApplicationController.DigiLoaderView.hide();
				absenden(mybuchungen, mysuccessCallback, myerrorCallback, myisClosingDay, mydoSync);
			},function(err){
				//if (DigiWebApp.SettingsController.getSetting("debug"))  console.log("refreshWAIT done error: " + err);
				DigiWebApp.ApplicationController.DigiLoaderView.hide();
				absenden(mybuchungen, mysuccessCallback, myerrorCallback, myisClosingDay, mydoSync);
			}
			, []
			, true);
		} else {
			absenden(mybuchungen, mysuccessCallback, myerrorCallback, myisClosingDay, mydoSync);
		}
	}
	
	, sendeSonderbuchungen: function(mybuchungen, mysuccessCallback, myerrorCallback, myisClosingDay) {
		
    	writeToLog("sendeSonderbuchungen");
		if (!myisClosingDay || !mybuchungen || mybuchungen.length == 0) {
		
			mysuccessCallback();
			
		} else {

			var absenden = function(buchungen, successCallback, errorCallback) {

				var items = [];
				var relevanteBuchungen = buchungen;
				var relevanteBuchungenSorted = _.sortBy(relevanteBuchungen , function(z) {
		            return parseIntRadixTen(z.get('_createdAt'));
		        });
									
				_.each(relevanteBuchungenSorted, function(el) {
					items.push(el.record);
				});
	
				if (items.length !== 0) {
					var data = {"sonderbuchungen": items};
					
					var internalSuccessCallback = function(data2, msg, request) {
						
						// verarbeite gesendete Daten
						_.each(relevanteBuchungen, function(n) {
							n.set("uebertragen", YES);
							n.save();
						});
						
						// alte übertragene Sonderbuchungen löschen (älter als gestern)
						_.each(_.filter(DigiWebApp.Sonderbuchung.find(), function(n) { return parseBool(n.get("uebertragen")) }), function(sb){
							var yesterday = D8.create(D8.create().format("dd.mm.yyyy")).yesterday();
							var sbdate = D8.create(sb.get('datum'));
							if (sbdate.date.getTime() < yesterday.date.getTime()) {
								sb.del();
							}
						});
						
						// weiter in der Verarbeitungskette
						successCallback();
						
					};
	
					var internalErrorCallback = function() {
						errorCallback();
					};
	
					var sendObj = {
						  data: data
						, webservice: "sonderbuchung"
						, loaderText: M.I18N.l('sendDataMsg')
						, successCallback: internalSuccessCallback
						, errorCallback: internalErrorCallback
						//, additionalQueryParameter:
						//, timeout: 60000
					};
					DigiWebApp.JSONDatenuebertragungController.sendData(sendObj);
				} else {
					successCallback();
				}
			};
	
			absenden(mybuchungen, mysuccessCallback, myerrorCallback);
			
		}
	}

	, sendeKonfiguration: function(mysuccessCallback, myerrorCallback) {
		var that = this;
		
    	writeToLog("sendeKonfiguration");

		var data = that.buildConfigurationJson(DigiWebApp.Settings.find());
		
		var internalSuccessCallback = function(data2, msg, request) {
			// weiter in der Verarbeitungskette
			mysuccessCallback();
		};

		var internalErrorCallback = function() {
			myerrorCallback();
		};

		var sendObj = {
			  data: JSON.parse(data)
			, webservice: "konfigurationen"
			, loaderText: M.I18N.l('sendDataMsg')
			, successCallback: internalSuccessCallback
			, errorCallback: internalErrorCallback
			//, additionalQueryParameter:
			//, timeout: 60000
		};
		DigiWebApp.JSONDatenuebertragungController.sendData(sendObj);
		
	}

    , buildConfigurationJson: function(mysettings) {
    	var mitarbeiterId = DigiWebApp.SettingsController.getSetting('mitarbeiterId');
    	var configArray = [];    
    	var settings;
    	if (typeof(mysettings) === 'object' && !_.isArray(mysettings)) {
    		// if an object was passed, push it into an array, to have one behaviour
    		settings = [mysettings];  
    	} else {
    		settings = mysettings;
    	}
    	if (_.isArray(settings)) {
    		for (var i in settings) {
    			var setting = settings[i];
    			for (var prop in setting.record) {
    				if(prop === '_createdAt' || prop === '_updatedAt') { continue; }
    				configArray.push({
    					  keyId: prop
    					, value: setting.get(prop)
    					, valueType: 'SettingRemote_WebApp'
    					, mitarbeiterId: mitarbeiterId
    				});
    			}
    		}
    	}
    	var configurations = {konfigurationen: configArray};
    	return JSON.stringify(configurations);
    }

	, empfangeTaetigkeiten: function(successCallback, errorCallback) {

		var internalSuccessCallback = function(data, msg, request) {
			// verarbeite empfangene Daten
			
			//if (DigiWebApp.SettingsController.getSetting("debug"))  console.log("empfangeTaetigkeiten Status: " + request.status);
			
			// wurden tätigkeiten empfangen?
			if (typeof(data.leistungen) === "undefined" && data.leistungen !== null && data.leistungen.length > 0) {
				trackError("missing leistungen");
				return errorCallback();
			}
			
			var myLength = null;
			try {
				myLength = data.leistungen.length;
			} catch(e2) {
				trackError("data.leistungen hat Länge " + myLength);
				//return errorCallback();
			}

			if (data.leistungen === null) {
				// hier könnte man - wenn gewünscht - verhindern, dass es gar keine Tätigkeiten gibt
				return errorCallback();
			} else {
				// ist data.leistungen auch wirklich ein Array?
				var myLength = null;
				try {
					myLength = data.leistungen.length;
				} catch(e2) {
					trackError("data.leistungen hat Länge " + myLength);
					return errorCallback();
				}
			}
			
			// data.leistungen enthält also myLength Elemente
			DigiWebApp.ApplicationController.DigiProgressView.show(M.I18N.l('Save'), M.I18N.l('activities'), myLength, 0);

			// alle "alten" Tätigkeiten löschen
			DigiWebApp.Activity.deleteAll();
			
			// die empfangenen Materialien mit Model ablegen
			_.each(data.leistungen, function(el) {
				//console.log(el);
				if (typeof(el.leistungsId) === "undefined") {
					trackError("missing leistungsId");
					return errorCallback();
				} else if (typeof(el.leistungsBezeichnung) === "undefined") {
					trackError("missing leistungsBezeichnung");
					return errorCallback();
				} else {
					var istMitarbeiterZugeordnet = 0; // 0: nicht MA-zugeordnet, 1: MA-zugeordnet
					if (el.istMitarbeiterZugeordnet) {
						istMitarbeiterZugeordnet = 1;
					}
					// el zur Liste hinzufügen
					DigiWebApp.Activity.createRecord({
						  id: el.leistungsId
						, name: el.leistungsBezeichnung
						, positionId: istMitarbeiterZugeordnet // 0: nicht MA-zugeordnet, 1: MA-zugeordnet
						, istStandardPause: el.istStandardPause
						, istUnterschriftsAbnahme: el.istUnterschriftsAbnahme
						, istFahrzeitRelevant: el.istFahrzeitRelevant
					}).saveSorted();
					DigiWebApp.ApplicationController.DigiProgressView.increase();
				}
			});
			
			// weiter in der Verarbeitungskette
			DigiWebApp.ApplicationController.DigiProgressView.hide();
			successCallback();
		};
		//webservice, loaderText, successCallback, errorCallback, additionalQueryParameter, geraeteIdOverride, modus
		var recieveObj = {
			  webservice: "leistungen"
			, loaderText: M.I18N.l('getActivitiesLoader')
			, successCallback: internalSuccessCallback
			, errorCallback: errorCallback
			, additionalQueryParameter: ''
			//, timeout: 
			, geraeteIdOverride: false
			, modus: '1'
		};
		DigiWebApp.JSONDatenuebertragungController.recieveData(recieveObj);
		
	}
	
	// Bugfix 2631: Sorting Mitarbeiter by Nachname first
	// In case of same Nachname then Firstname
	, empfangeKolonne: function(successCallback, errorCallback) {
			var internalSuccessCallback = function(data, msg, request) {
				// wurden mitarbeiter emfangen?
				if (typeof(data.mitarbeiter) === "undefined" || data.mitarbeiter === null || data.mitarbeiter.length === 0) {
					// keine Mitarbeiter empfangen
					return successCallback();
				}
				DigiWebApp.ApplicationController.setCallbackStatus('kolonne', 'remote', YES);
				// data.mitarbeiter enthält also myLength Elemente
				DigiWebApp.ApplicationController.DigiProgressView.show(M.I18N.l('Save'), M.I18N.l('employees'), data.mitarbeiter.length, 0);
				// Sort first by nachname then by firstname
				var sortedKolonne = _.sortBy(data.mitarbeiter, function(m) { 
					return [m.nachname, m.vorname]; });
				// alle "alten" mitarbeiter löschen
				DigiWebApp.Employee.deleteAll();
				DigiWebApp.ApplicationController.setCallbackStatus('kolonne', 'local', NO);
				// die empfangenen Mitarbeiter mit Model ablegen
				_.each(sortedKolonne, function(el) {
					DigiWebApp.ApplicationController.DigiProgressView.increase();
					DigiWebApp.Employee.createRecord({
						  id: el.mitarbeiterId
						, name: el.vorname + ' ' + el.nachname
						, kolonnenId: ''
						, isSelected: NO
					}).saveSorted();	
				});
				DigiWebApp.ApplicationController.setCallbackStatus('kolonne', 'local', YES);
				// clear local storage when switch from no kolonne
				if(localStorage.getItem(DigiWebApp.EmployeeController.empSelectionKey) == 0) {
					localStorage.removeItem(DigiWebApp.EmployeeController.empSelectionKey);
				}
				if(DigiWebApp.EmployeeController.getEmployeeState() != 2) {
					DigiWebApp.EmployeeController.setEmployeeState(1); // set it to "kolonne loaded but no selection yet"
				}
				/*
				else {
					// no kolonne => (mitarbeiterId = 0)
					DigiWebApp.ApplicationController.DigiProgressView.hide();
					DigiWebApp.ApplicationController.setCallbackStatus('kolonne', 'remote', YES);
					// Clear employees from storage
					DigiWebApp.Employee.deleteAll();
					DigiWebApp.ApplicationController.setCallbackStatus('kolonne', 'local', NO);
					DigiWebApp.Employee.createRecord({
						  id: '0'
						, name: 'Standardmitarbeiter'
						, kolonnenId: ''
						, isSelected: YES
					}).saveSorted();
					DigiWebApp.ApplicationController.setCallbackStatus('kolonne', 'local', YES);
					DigiWebApp.EmployeeController.setEmployeeState(0);
				}
				*/
				// weiter in der Verarbeitungskette
				DigiWebApp.ApplicationController.DigiProgressView.hide();
				successCallback();
			};
			var recieveObj = {
				webservice: 'mitarbeiter'
			  , loaderText: M.I18N.l('getKolonne')
			  , successCallback: internalSuccessCallback
			  , errorCallback: errorCallback
			  , additionalQueryParameter: 'getAll=false&nurKolonne=true'
			  , geraeteIdOverride: false
			  , modus: '0'
			};
			DigiWebApp.JSONDatenuebertragungController.recieveData(recieveObj);
	}

	, empfangePositionen: function(successCallback, errorCallback) {

		var internalSuccessCallback = function(data, msg, request) {
			// verarbeite empfangene Daten
			
			//if (DigiWebApp.SettingsController.getSetting("debug"))  console.log("empfangePositionen Status: " + request.status);
			
			// wurden Positionen empfangen?
			if (typeof(data.positionen) === "undefined" && data.positionen !== null && data.positionen.length > 0) {
				return trackError("missing positionen", errorCallback);
			}

			var myLength = null;
			try {
				myLength = data.positionen.length;
			} catch(e2) {
				return trackError("data.positionen hat Länge " + myLength, errorCallback);
			}

			if (data.positionen === null) {
				// hier könnte man - wenn gewünscht - verhindern, dass es gar keine Positionen gibt
				return errorCallback();
			} else {
				// ist data.positionen auch wirklich ein Array?
				var myLength = null;
				try {
					myLength = data.positionen.length;
				} catch(e2) {
					return trackError("data.positionen hat Länge " + myLength, errorCallback);
				}
			}
			
			// data.positionen enthält also myLength Elemente
			DigiWebApp.ApplicationController.DigiProgressView.show(M.I18N.l('Save'), M.I18N.l('positions'), myLength, 0);

			// alle "alten" Positionen und Aufträge löschen
			DigiWebApp.Position.deleteAll();
			DigiWebApp.Order.deleteAll();
			
			// die empfangenen Positionen mit Model ablegen
			var errorHappened = false;
			_.each(data.positionen, function(el) {
				//console.log(el);
				if (typeof(el.positionsId) === "undefined") {
					trackError("missing positionsId");
					errorHappened = true;
					return;
				} else if (typeof(el.positionsBezeichnung) === "undefined") {
					trackError("missing positionsBezeichnung");
					errorHappened = true;
					return;
				} else {
					// el zur Liste hinzufügen
	            	var posid = el.positionsId;
	                var posname = el.positionsBezeichnung;
	                var posstrasse = el.strasse;
	                var poshausnummer = el.hausnummer;
	                var posplz = el.plz;
	                var posort = el.ort;
	                var posland = el.land;
	                var poscountrycode = el.countrycode;
	                var posphone = el.telefon;
	                var posfax = el.fax;
	                var posemail = el.email;
	                var posansprechpartner = el.ansprechpartner;
	                var poskundenname = el.kundenname;
	                var poslongitude = el.longitude;
	                var poslatitude = el.latitude;
	                var posdescription = el.positionsBeschreibung;
	                var posorderId = el.auftragsId;
	                
	                var arbeitsbeginn = el.arbeitsbeginn;
	                var arbeitsende = el.arbeitsende;

	                var positionBegin = "";
					if (el.beginn) { positionBegin = el.beginn; }
					var positionEnd = "";
					if (el.ende && el.ende !== "01.01.1900") { positionEnd = el.ende; }

	            	if (typeof(posid) === "object") { posid = ""; } 
	            	if (typeof(posname) === "object") { posname = ""; } 
	            	if (typeof(posstrasse) === "object") { posstrasse = ""; } 
	            	if (typeof(poshausnummer) === "object") { poshausnummer = ""; } 
	            	if (typeof(posplz) === "object") { posplz = ""; } 
	            	if (typeof(posort) === "object") { posort = ""; } 
	            	if (typeof(posland) === "object") { posland = ""; } 
	            	if (typeof(poscountrycode) === "object") { poscountrycode = ""; } 
	            	if (typeof(posphone) === "object") { posphone = ""; } 
	            	if (typeof(posfax) === "object") { posfax = ""; } 
	            	if (typeof(posemail) === "object") { posemail = ""; } 
	            	if (typeof(posansprechpartner) === "object") { posansprechpartner = ""; } 
	            	if (typeof(poskundenname) === "object") { poskundenname = ""; } 
	            	if (typeof(poslongitude) === "object") { poslongitude = ""; } 
	            	if (typeof(poslatitude) === "object") { poslatitude = ""; } 
	            	if (typeof(posdescription) === "object") { posdescription = ""; } 
	            	if (typeof(posorderId) === "object") { posorderId = ""; } 
	            	if (typeof(arbeitsbeginn) === "object") { arbeitsbeginn = ""; } 
	            	if (typeof(arbeitsende) === "object") { arbeitsende = ""; } 

	            	var positionItem = DigiWebApp.Position.createRecord({
	                      id: posid
	                    , name: posname
	                    , strasse: posstrasse
	                    , hausnummer: poshausnummer
	                    , plz: posplz
	                    , ort: posort
	                    , land: posland
	                    , countrycode: poscountrycode
	                    , telefon: posphone
	                    , fax: posfax
	                    , email: posemail
	                    , ansprechpartner: posansprechpartner
	                    , kundenname: poskundenname
	                    , longitude: poslongitude
	                    , latitude: poslatitude
	                    , description: posdescription
	                    , orderId: posorderId
						, positionBegin: positionBegin
						, arbeitsbeginn: arbeitsbeginn
						, arbeitsende: arbeitsende
	                });

	            	// gibt es den zugehörigen Auftrag schon?
	            	var loadedOrder = _.find(DigiWebApp.Order.find(), function(order) {
	            		return order.get("id") == posorderId;
	            	});
	            	if (!loadedOrder) {
	            		// zugehörigen Auftrag anlegen
                        var rec = DigiWebApp.Order.createRecord({
                              id: el.auftragsId
                            , name: el.auftragsBezeichnung
                        });
                        rec.saveSorted();
	            	}
	            	
					// sind Termine in der Position hinterlegt?
					var terminList = [];
					if (typeof(el.mitarbeiterTermine) !== "undefined" && el.mitarbeiterTermine !== null && el.mitarbeiterTermine.length > 0) {
						
						// Termine hinzufügen
						_.each(el.mitarbeiterTermine, function(termin) {
							if (termin.ganzerTag) {
								// künstliches von und bis setzen, um die Uhrzeit in der Terminliste ausblenden zu können
								var datum = termin.von.split(" ")[0];
								termin.von = datum + " 00:00:00"
								termin.bis = datum + " 23:59:59"
							}
							terminList.push(JSON.stringify(termin));
						});
						
					}
					positionItem.set("appointments", JSON.stringify(terminList));
					
					//Position speichern
					positionItem.saveSorted();
					DigiWebApp.ApplicationController.DigiProgressView.increase();
				}
			});
			
			DigiWebApp.ApplicationController.DigiProgressView.hide();

			if (errorHappened) {
				return errorCallback();
			} else {
				// weiter in der Verarbeitungskette
				return successCallback();
			}
			
		};

		//webservice, loaderText, successCallback, errorCallback, additionalQueryParameter, geraeteIdOverride, modus
		var recieveObj = {
			  webservice: "positionen"
			, loaderText: M.I18N.l('getPositionsLoader')
			, successCallback: internalSuccessCallback
			, errorCallback: errorCallback
			, additionalQueryParameter: ''
			//, timeout: 
			, geraeteIdOverride: false
			, modus: '1'
		};
		DigiWebApp.JSONDatenuebertragungController.recieveData(recieveObj);
		
	}
	
	, empfangeFestepausendefinitionen: function(successCallback, errorCallback) {

		var internalSuccessCallback = function(data, msg, request) {
			// verarbeite empfangene Daten
			
			//if (DigiWebApp.SettingsController.getSetting("debug"))  console.log("empfangeFestepausendefinitionen Status: " + request.status);
			
			// wurden Festepausendefinitionen empfangen?
			if (typeof(data.festepausendefinitionen) === "undefined" && data.festepausendefinitionen !== null && data.festepausendefinitionen.length > 0) {
				trackError("missing festepausendefinitionen");
				return errorCallback();
			}
			
			var myLength = null;
			try {
				myLength = data.festepausendefinitionen.length;
			} catch(e2) {
				trackError("data.festepausendefinitionen hat Länge " + myLength);
				//return errorCallback();
			}

			if (data.festepausendefinitionen === null) {
				// hier könnte man - wenn gewünscht - verhindern, dass es gar keine festepausendefinitionen gibt
				//return errorCallback();
			} else {
				// ist data.festepausendefinitionen auch wirklich ein Array?
				var myLength = null;
				try {
					myLength = data.festepausendefinitionen.length;
				} catch(e2) {
					trackError("data.festepausendefinitionen hat Länge " + myLength);
					return errorCallback();
				}
			}
			
			// data.festepausendefinitionen enthält also myLength Elemente
			DigiWebApp.ApplicationController.DigiProgressView.show(M.I18N.l('Save'), M.I18N.l('festepausendefinitionen'), myLength, 0);

			// alle "alten" festepausendefinitionen löschen
			DigiWebApp.Festepausendefinition.deleteAll();
			
			// die empfangenen festepausendefinitionen mit Model ablegen
			_.each(data.festepausendefinitionen, function(el) {
				if (typeof(el) == "undefined" || el == null) {
					trackError("empty element");
					//return errorCallback();
				} else if (typeof(el.id) === "undefined") {
					trackError("missing id");
					return errorCallback();
				} else if (typeof(el.wochentagId) === "undefined") {
					trackError("missing wochentagId");
					return errorCallback();
				} else if (typeof(el.von) === "undefined") {
					trackError("missing von");
					return errorCallback();
				} else if (typeof(el.bis) === "undefined") {
					trackError("missing bis");
					return errorCallback();
				} else {
					// el zur Liste hinzufügen
					DigiWebApp.Festepausendefinition.createRecord({
						  id: el.id
						, ressourceId: el.ressourceId
						, wochentagId: el.wochentagId // 0 = Sonntag, 1 = Montag, ...
						, von: el.von
						, bis: el.bis
					}).saveSorted();
					DigiWebApp.ApplicationController.DigiProgressView.increase();
				}
			});
			
			// weiter in der Verarbeitungskette
			DigiWebApp.ApplicationController.DigiProgressView.hide();
			successCallback();
		};
		// webservice, loaderText, successCallback, errorCallback, additionalQueryParameter, geraeteIdOverride, modus
		var recieveObj = {
			  webservice: "festepausendefinitionen"
			, loaderText: M.I18N.l('getFestepausendefinitionenLoader')
			, successCallback: internalSuccessCallback
			, errorCallback: errorCallback
			, additionalQueryParameter: ''
			//, timeout: 
			, geraeteIdOverride: false
			, modus: '1'
		};
		DigiWebApp.JSONDatenuebertragungController.recieveData(recieveObj);
		
	}
});
