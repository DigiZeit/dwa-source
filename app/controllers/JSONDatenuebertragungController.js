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

	, sendData: function(sendObj) {
		if (!sendObj) {
			writeToLog("Daten konnten nicht gesendet werden! Falsche Übergabe an sendData.");
			return;
		}
		if (!DigiWebApp.RequestController.DatabaseServer || (DigiWebApp.RequestController.DatabaseServerTimestamp && (DigiWebApp.RequestController.DatabaseServerTimestamp - new Date().getTime() > 60000))) {
		  	DigiWebApp.RequestController.getDatabaseServer(function(obj) {
		  		DigiWebApp.JSONDatenuebertragungController.sendDataWithServer(sendObj);
		  	}, null);
		} else {
			DigiWebApp.JSONDatenuebertragungController.sendDataWithServer(sendObj);
		}
	}

	, sendDataWithServer: function(sendObj) {
		//var that = this;

		var data = sendObj['data']
		var webservice = sendObj['webservice']
		var loaderText = sendObj['loaderText']
		var successCallback = sendObj['successCallback']
		var errorCallback = sendObj['errorCallback']
		var additionalQueryParameter = sendObj['additionalQueryParameter']
		var timeout = sendObj['timeout'] ? sendObj['timeout'] : 30000;
		var omitLoaderHide = sendObj['omitLoaderHide'] ? sendObj['omitLoaderHide'] : false;
		
		var myURL =  'http://' + DigiWebApp.RequestController.DatabaseServer + '/WebAppServices/' + webservice + '?modus=0&firmenId=' + DigiWebApp.SettingsController.getSetting('company') + '&kennwort=' + DigiWebApp.SettingsController.getSetting('password') + '&geraeteId=' + DigiWebApp.SettingsController.getSetting('workerId') + '&geraeteTyp=2&softwareVersion=' + DigiWebApp.RequestController.softwareVersion + '&requestTimestamp=' + M.Date.now().date.valueOf();
		if (additionalQueryParameter) {
			myURL = myURL + '&' + additionalQueryParameter;
		}
		M.Request.init({
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
                if (!omitLoaderHide) { DigiWebApp.ApplicationController.DigiLoaderView.hide(); }
                successCallback(data, msg, xhr);
            }
            , onError: function(xhr, err) {// error callback of sendData
                DigiWebApp.ApplicationController.DigiLoaderView.hide();
                writeToLog(err);
                errorCallback(xhr, err);
            }
        }).send();
	}

	, recieveData: function(recieveObj) {
		if (!recieveObj) {
			writeToLog("Daten konnten nicht empfangen werden! Falsche Übergabe an recieveData.");
			return;
		}
		if (!DigiWebApp.RequestController.DatabaseServer || (DigiWebApp.RequestController.DatabaseServerTimestamp && (DigiWebApp.RequestController.DatabaseServerTimestamp - new Date().getTime() > 60000))) {
		  	DigiWebApp.RequestController.getDatabaseServer(function(obj) {
		  		DigiWebApp.JSONDatenuebertragungController.recieveDataWithServer(recieveObj);
		  	}, null);
		} else {
			DigiWebApp.JSONDatenuebertragungController.recieveDataWithServer(recieveObj);
		}
	}

	, recieveDataWithServer: function(recieveObj) {
		
		var webservice = recieveObj['webservice']
		var loaderText = recieveObj['loaderText']
		var successCallback = recieveObj['successCallback']
		var errorCallback = recieveObj['errorCallback']
		var additionalQueryParameter = recieveObj['additionalQueryParameter']
		var timeout = recieveObj['timeout'] ? recieveObj['timeout'] : 30000;
		var geraeteIdOverride = recieveObj['geraeteIdOverride'] ? recieveObj['geraeteIdOverride'] : NO;
		var myModus = recieveObj['modus'] ? recieveObj['modus'] : 0;

		// hack um Mitarbeiternamen ziehen zu können
		var myGeraeteId = DigiWebApp.SettingsController.getSetting('workerId');
		var myGeraeteTyp = 2;
		if (geraeteIdOverride) {
			myGeraeteId = 0;
			myGeraeteTyp = 3;
		}
		
		var myURL = 'http://' + DigiWebApp.RequestController.DatabaseServer + '/WebAppServices/' + webservice + '?modus=' + myModus + '&firmenId=' + DigiWebApp.SettingsController.getSetting('company') + '&kennwort=' + DigiWebApp.SettingsController.getSetting('password') + '&geraeteId=' + myGeraeteId + '&geraeteTyp=' + myGeraeteTyp + '&softwareVersion=' + DigiWebApp.RequestController.softwareVersion + '&requestTimestamp=' + M.Date.now().date.valueOf();
		//console.log(myURL);
		if (additionalQueryParameter) {
			myURL = myURL + '&' + additionalQueryParameter;
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
			, onError: function(request, msg) {
				DigiWebApp.ApplicationController.DigiLoaderView.hide();
				errorCallback(request, msg);
			}
		}).send();
	}
	
	, sendeZeitdaten: function(mybuchungen, mysuccessCallback, myerrorCallback, myisClosingDay, mydoSync) {
		//var that = this;
		var absenden = function(buchungen, successCallback, errorCallback, isClosingDay, doSync) {
			//if (DigiWebApp.SettingsController.getSetting("debug"))  console.log("absenden");
			var items = [];
			var relevanteZeitbuchungen = buchungen;
			var relevanteZeitbuchungenSorted = _.sortBy(relevanteZeitbuchungen , function(z) {
	            return parseInt(z.get('_createdAt'));
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
					
					if (parseInt(zeitbuch.get("timeStampEnd")) === 0) {
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
				
				var internalSuccessCallback = function(data2, msg, request) {
					// verarbeite empfangene Daten
					//console.log("sendeZeitbuchungen Status: " + request.status);
					// weiter in der Verarbeitungskette
					successCallback();
					
				};
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
	
	, empfangeTaetigkeiten: function(successCallback, errorCallback) {

		var internalSuccessCallback = function(data, msg, request) {
			// verarbeite empfangene Daten
			
			//if (DigiWebApp.SettingsController.getSetting("debug"))  console.log("empfangeTaetigkeiten Status: " + request.status);
			
			// wurden tätigkeiten empfangen?
			if (typeof(data.leistungen) === "undefined" && data.leistungen !== null && data.leistungen.length > 0) {
				console.error("missing leistungen");
				return errorCallback();
			}
			
			var myLength = null;
			try {
				myLength = data.leistungen.length;
			} catch(e2) {
				console.error(myLength);
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
					console.error(myLength);
					return errorCallback();
				}
			}
			
			// data.leistungen enthält also myLength Elemente

			// alle "alten" Tätigkeiten löschen
			DigiWebApp.Activity.deleteAll();
			
			// die empfangenen Materialien mit Model ablegen
			_.each(data.leistungen, function(el) {
				//console.log(el);
				if (typeof(el.leistungsId) === "undefined") {
					console.error("missing leistungsId");
					return errorCallback();
				} else if (typeof(el.leistungsBezeichnung) === "undefined") {
					console.error("missing leistungsBezeichnung");
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
				}
			});
			
			// weiter in der Verarbeitungskette
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

	, empfangePositionen: function(successCallback, errorCallback) {

		var internalSuccessCallback = function(data, msg, request) {
			// verarbeite empfangene Daten
			
			//if (DigiWebApp.SettingsController.getSetting("debug"))  console.log("empfangePositionen Status: " + request.status);
			
			// wurden Positionen empfangen?
			if (typeof(data.positionen) === "undefined" && data.positionen !== null && data.positionen.length > 0) {
				console.error("missing positionen");
				return errorCallback();
			}

			var myLength = null;
			try {
				myLength = data.positionen.length;
			} catch(e2) {
				console.error(myLength);
				//return errorCallback();
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
					console.error(myLength);
					return errorCallback();
				}
			}
			
			// data.positionen enthält also myLength Elemente

			// alle "alten" Positionen löschen
			DigiWebApp.Position.deleteAll();
			
			// die empfangenen Positionen mit Model ablegen
			var errorHappened = false;
			_.each(data.positionen, function(el) {
				//console.log(el);
				if (typeof(el.positionsId) === "undefined") {
					console.error("missing positionsId");
					errorHappened = true;
					return;
				} else if (typeof(el.positionsBezeichnung) === "undefined") {
					console.error("missing positionsBezeichnung");
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
	                var posdescription = el.auftragsBeschreibung;
	                var posorderId = el.auftragsId;
	                
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
						, positionEnd: positionEnd
	                });
	            	
					// sind Termine in der Position hinterlegt?
					var terminList = [];
					if (typeof(el.mitarbeiterTermine) !== "undefined" && el.mitarbeiterTermine !== null && el.mitarbeiterTermine.length > 0) {
						
						// Termine hinzufügen
						_.each(el.mitarbeiterTermine, function(termin) {
//							var myDateVon = D8.create(termin.von);
//							var myDateBis = D8.create(termin.bis);
//							var myDateVonStr = myDateVon.format("dd.mm.yyyy");
//							var myDateBisStr = myDateBis.format("dd.mm.yyyy");
//							if (myDateVonStr === myDateBisStr) {
//								if (!_.contains(terminList, myDateVonStr)) {
//									terminList.push(myDateVonStr);
//								}
//							} else {
//								var myDateStr = myDateVon.format("dd.mm.yyyy");
//								var myDate = myDateVon;
//								while (myDateBisStr !== myDateStr) {
//									myDateStr = myDate.format("dd.mm.yyyy");
//									if (!_.contains(terminList,myDateStr)) {
//										terminList.push(myDateStr);
//									}
//									myDate = myDate.addDays(1);
//								}
//							}
							if (termin.ganzerTag) {
								// künstliches von und bis setzen, um die Uhrzeit in der Terminliste ausblenden zu können
								var datum = termin.von.split(" ")[0];
								termin.von = datum + " 00:00:00"
								termin.bis = datum + " 23:59:59"
							}
							terminList.push(JSON.stringify(termin));
						});
						
					}
					positionItem.set("appointments",JSON.stringify(terminList));
					
					//Position speichern
					positionItem.saveSorted();
				}
			});
			
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

});
