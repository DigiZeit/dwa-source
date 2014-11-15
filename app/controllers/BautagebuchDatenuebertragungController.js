// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: DigiWebApp
// Controller: BautagebuchDatenuebertragungController
// ==========================================================================
// manuell var-checked
DigiWebApp.BautagebuchDatenuebertragungController = M.Controller.extend({

	  successReturnCallback: function() {}
	, errorReturnCallback: function() {}

	, consoleLogOutput: NO
	
	, abgeschlosseneUebertragen: function() {
		var that = DigiWebApp.BautagebuchDatenuebertragungController;
		var abgeschlosseneBautagesberichte = _.filter(DigiWebApp.BautagebuchBautagesbericht.find(), function(item) { return parseBool(item.get("abgeschlossen")); });
		if (abgeschlosseneBautagesberichte.length > 0) {
			var doSenden = function(item, callback) {
				DigiWebApp.BautagebuchDatenuebertragungController.senden(
						  item
						, function(msg) {
//							  DigiWebApp.BautagebuchDatenuebertragungController.abgeschlosseneBautagesberichte = _.filter(DigiWebApp.BautagebuchDatenuebertragungController.abgeschlosseneBautagesberichte, function(el){
//								  return (item.get('id') != el.get('id'));
//							  });
							  DigiWebApp.BautagebuchBautagesberichteListeController.init(); // Liste aktualisieren
							  callback();
						}
						, function(xhr,err) {
							trackError(err);
				            DigiWebApp.ApplicationController.nativeAlertDialogView({
				                title: M.I18N.l('BautagebuchUebertragungsfehler')
				              , message: M.I18N.l('BautagebuchUebertragungsfehlerMsg')
				            });
						}
				);
			};
			var itemToSend = abgeschlosseneBautagesberichte[0];
			doSenden(itemToSend, DigiWebApp.BautagebuchDatenuebertragungController.abgeschlosseneUebertragen);
		} else {
			// nothing to do
		}
	}
	
	, empfangen: function(successReturnCallback, errorReturnCallback) {
		var that = DigiWebApp.BautagebuchDatenuebertragungController;
		
		that.successReturnCallback = successReturnCallback;
		that.errorReturnCallback = function() {
    		DigiWebApp.ApplicationController.DigiProgressView.hide();
			errorReturnCallback();
		}

		//var successCallback = function(data, msg, request) {};
		//var errorCallback = function(request, msg) {};
		
		// Verarbeitungskette definieren und starten
		DigiWebApp.RequestController.getDatabaseServer(function() {
			that.empfangeProjektleiter(function() {
				that.empfangeMitarbeiter(function() {
					that.empfangeMengeneinheiten(function() {
						that.empfangeMaterialien(
							that.successReturnCallback
						  , that.successReturnCallback);
					}, that.errorReturnCallback);
				}, that.errorReturnCallback);
			}, that.errorReturnCallback);
		});
	
		
	}
	
	, empfangeMengeneinheiten: function(successCallback, errorCallback) {
		// wird noch nicht via WebService befüllt
		
		// direkt weiter in der Verarbeitungskette
		successCallback();

		var internalSuccessCallback = function(data, msg, request) {
			// verarbeite empfangene Daten
						
		if (DigiWebApp.BautagebuchDatenuebertragungController.consoleLogOutput) console.log("empfangeMengeneinheiten Status: " + request.status);

			// wurde eine Mengeneinheitenliste erhalten?
			if (typeof(data.mengeneinheiten) === "undefined") {
				trackError("missing mengeneinheiten");
	    		return errorCallback();
			}
			
			// enthält die Mengeneinheitenliste Mengeneinheiten?
			if (data.mengeneinheiten === null) {
				// ohne Mengeneinheiten geht im Bautagebuch nichts
				return errorCallback();
			} else {
				// ist data.mengeneinheiten auch wirklich ein Array?
				var myLength = null;
				try {
					myLength = data.mengeneinheiten.length;
				} catch(e) {
					return errorCallback();
				}
			}
			
			// data.mengeneinheiten enthält also myLength Elemente
    		DigiWebApp.ApplicationController.DigiProgressView.show(M.I18N.l('Save'), M.I18N.l('mengeneinheiten'), myLength, 0);

    		// alle "alten" Mengeneinheiten löschen
			DigiWebApp.BautagebuchMengeneinheit.deleteAll();
			
			// die empfangenen Mengeneinheiten mit Model ablegen
			_.each(data.mengeneinheiten, function(el) {
	    		DigiWebApp.ApplicationController.DigiProgressView.increase();
				if (typeof(el.id) === "undefined") {
					trackError("missing mengeneinheit id");
					return errorCallback();
//				} else if (typeof(el.bezeichnung) === "undefined") {
//					trackError("missing mengeneinheit bezeichnung");
//					return errorCallback();
				} else if (typeof(el.kuerzel) === "undefined") {
					trackError("missing mengeneinheit kuerzel");
					return errorCallback();
				} else {
					
					// mengeneinheit (el) zur Liste hinzufügen
					DigiWebApp.BautagebuchMengeneinheit.createRecord({id: "" + el.id, kuerzel: "" + el.kuerzel}).saveSorted();

				}
			});
			
			// weiter in der Verarbeitungskette
    		DigiWebApp.ApplicationController.DigiProgressView.hide();
			successCallback();
		};
		
		var recieveObj = {
				  webservice: "mengeneinheiten"
				, loaderText: M.I18N.l('BautagebuchLadeMengeneinheiten')
				, successCallback: internalSuccessCallback
				, errorCallback: errorCallback
				//, additionalQueryParameter: 
				//, timeout: 
				//, geraeteIdOverride: 
				//, modus: 
		};
		DigiWebApp.JSONDatenuebertragungController.recieveData(recieveObj);
		
	}
	
	, empfangeMaterialien: function(successCallback, errorCallback) {
		var that = DigiWebApp.BautagebuchDatenuebertragungController;
		var internalSuccessCallback = function(data, msg, request) {
			// verarbeite empfangene Daten
			
			if (that.consoleLogOutput) console.log("empfangeMaterialien Status: " + request.status);

			//var myMaterialliste = [];
			
			// wurde eine materialliste erhalten?
			if (typeof(data.materialliste) === "undefined") {
				trackError("missing materialliste");
				return errorCallback();
			}
			
			// enthält die Materialliste Materialien?
			if (data.materialliste === null) {
				// hier könnte man wenn gewünscht verhindern, dass es im Bautagebuch gar keine Materialien gibt
				//return errorCallback();
			} else {
				// ist data.materialliste auch wirklich ein Array?
				var myLength = null;
				try {
					myLength = data.materialliste.length;
				} catch(e2) {
					trackError("data.materialliste hat Länge " + myLength);
					//return errorCallback();
				}
			}
			
			// data.materialliste enthält also myLength (oder gar keine) Elemente
    		DigiWebApp.ApplicationController.DigiProgressView.show(M.I18N.l('Save'), M.I18N.l('materialien'), myLength, 0);

			// alle "alten" Materialien löschen
			DigiWebApp.BautagebuchMaterial.deleteAll();
			DigiWebApp.BautagebuchLieferant.deleteAll();
			DigiWebApp.BautagebuchHersteller.deleteAll();
			DigiWebApp.BautagebuchMaterialtyp.deleteAll();
			DigiWebApp.BautagebuchMaterialgruppe.deleteAll();
			
			// die empfangenen Materialien mit Model ablegen
			_.each(data.materialliste, function(el) {
	    		DigiWebApp.ApplicationController.DigiProgressView.increase();
				//console.log(el);
				if (typeof(el.bezeichnung) === "undefined") {
					trackError("missing bezeichnung");
					return errorCallback();
				} else {
					
					// Lieferanten
					var lieferantenIds = [];
					_.each(el.lieferanten, function(lieferant) {
						lieferantenIds.push("" + lieferant.id);
						var lief = DigiWebApp.BautagebuchLieferant.find({query:{identifier: 'id', operator: '=', value: "" + lieferant.id}})[0];
						if (!lief) {
							// Lieferant anlegen
							DigiWebApp.BautagebuchLieferant.createRecord({
								  id: "" + lieferant.id
								, bezeichnung: "" + lieferant.bezeichnung
								, nummer: "" + lieferant.nummer
							}).saveSorted();
						}
					});
					
					// Hersteller
					var herst = DigiWebApp.BautagebuchHersteller.find({query:{identifier: 'id', operator: '=', value: "" + el.herstellerId}})[0];
					if (!herst) {
						// Hersteller anlegen
						DigiWebApp.BautagebuchHersteller.createRecord({
							  id: "" + el.herstellerId
							, bezeichnung: "" + el.hersteller
						}).saveSorted();
					}

					// Materialgruppen
					var materialgruppenIds = [];
					_.each(el.materialgruppen, function(materialgruppe) {
						materialgruppenIds.push("" + materialgruppe.id);
						var matgr = DigiWebApp.BautagebuchMaterialgruppe.find({query:{identifier: 'id', operator: '=', value: "" + materialgruppe.id}})[0];
						if (!matgr) {
							// Materialgruppe anlegen
							DigiWebApp.BautagebuchMaterialgruppe.createRecord({
								  id: "" + materialgruppe.id
								, bezeichnung: "" + materialgruppe.bezeichnung
								, vaterId: "" + materialgruppe.vaterId
							}).saveSorted();
						}
					});

					// Materialtypen
					var materialtypId = 0;
					if (el.materialtyp) {
						materialtypId = "" + el.materialtyp.id;
						var matTyp = DigiWebApp.BautagebuchMaterialtyp.find({query:{identifier: 'id', operator: '=', value: "" + el.materialtyp.id}})[0];
						if (!matTyp) {
							// Lieferant anlegen
							DigiWebApp.BautagebuchMaterialtyp.createRecord({
								  id: "" + el.materialtyp.id
								, bezeichnung: "" + el.materialtyp.bezeichnung
							}).saveSorted();
						}
					}
					var myEinheitenIds = [];
					_.each(el.einheitenIds, function(einheitId) {
						myEinheitenIds.push("" + einheitId);
					});
					
					var myNummer = null;
					if (el.nummer) {
						myNummer = "" + el.nummer;
					}
					
					// Material anlegen
					DigiWebApp.BautagebuchMaterial.createRecord({
						  id: "" + el.id
						, bezeichnung: "" + el.bezeichnung
						, nummer: myNummer
						, standardEinheitId: "" + el.standardEinheitId
						, herstellerId: "" + el.herstellerId
						, einheitenIds: JSON.stringify(myEinheitenIds)
						, lieferantenIds: JSON.stringify(lieferantenIds)
						, materialgruppenIds: JSON.stringify(materialgruppenIds)
						, materialtypId: "" + materialtypId
						, einzelpreis: el.einzelpreis
					}).saveSorted();
				}
			});
			
			// weiter in der Verarbeitungskette
    		DigiWebApp.ApplicationController.DigiProgressView.hide();
			successCallback();
		};
		
		var recieveObj = {
			  webservice: "materialliste"
			, loaderText: M.I18N.l('BautagebuchLadeMaterialien')
			, successCallback: internalSuccessCallback
			, errorCallback: errorCallback
			//, additionalQueryParameter: 
			//, timeout: 
			//, geraeteIdOverride: 
			//, modus: 
		};
		DigiWebApp.JSONDatenuebertragungController.recieveData(recieveObj);
		
	}

	, empfangeProjektleiter: function(successCallback, errorCallback) {
		var that = DigiWebApp.BautagebuchDatenuebertragungController;
		var internalSuccessCallback = function(data, msg, request) {
			// verarbeite empfangene Daten
						
			if (that.consoleLogOutput) console.log("empfangeProjektleiter Status: " + request.status);

			// wurde eine Projektleiterliste erhalten?
			if (typeof(data.projektleiter) === "undefined") {
				trackError("missing mitarbeiterliste");
				return errorCallback();
			}
			
			// enthält die Projektleiterliste Projektleiter?
			if (data.projektleiter === null) {
				// ohne Projektleiter geht im Bautagebuch nichts
				return errorCallback();
			} else {
				// ist data.materialliste auch wirklich ein Array?
				var myLength = null;
				try {
					myLength = data.projektleiter.length;
				} catch(e1) {
					// ohne Projektleiter geht im Bautagebuch nichts
					trackError("data.projektleiter hat Länge " + myLength);
					return errorCallback();
				}
			}
			
			// data.projektleiter enthält also myLength Elemente
    		DigiWebApp.ApplicationController.DigiProgressView.show(M.I18N.l('Save'), M.I18N.l('projektleiter'), myLength, 0);

    		// alle "alten" Projektleiter löschen
			DigiWebApp.BautagebuchProjektleiter.deleteAll();
			
			// die empfangenen Projektleiter mit Model ablegen
			_.each(data.projektleiter, function(el) {
	    		DigiWebApp.ApplicationController.DigiProgressView.increase();
				if (typeof(el.id) === "undefined") {
					trackError("missing id");
					return errorCallback();
//				} else if (typeof(el.projektleiterId) === "undefined") {
//					trackError("missing projektleiterId");
//					return errorCallback();
				} else if (typeof(el.vorname) === "undefined") {
					trackError("missing projektleiter vorname");
					return errorCallback();
				} else if (typeof(el.nachname) === "undefined") {
					trackError("missing projektleiter nachname");
					return errorCallback();
				} else {
					
					//if (el.id === el.projektleiterId) {
						// projektleiter (el) zur Liste hinzufügen
						// Mitarbeiter (el) zur Liste hinzufügen wenn dieser nicht schon hinzugefügt wurde
						if (DigiWebApp.BautagebuchProjektleiter.find({query:{identifier: 'id', operator: '=', value: el.id}}).length === 0) {
							DigiWebApp.BautagebuchProjektleiter.createRecord({id: el.id, vorname: el.vorname, nachname: el.nachname}).saveSorted();
						}
					//}

				}
			});
			
			// weiter in der Verarbeitungskette
    		DigiWebApp.ApplicationController.DigiProgressView.hide();
    		successCallback();
		};
		
		var recieveObj = {
			  webservice: "projektleiter"
			, loaderText: M.I18N.l('BautagebuchLadeProjektleiter')
			, successCallback: internalSuccessCallback
			, errorCallback: errorCallback
			//, additionalQueryParameter: 'getAll=true&nurKolonne=false'
			//, timeout: 
			//, geraeteIdOverride: 
			//, modus: 
		};
		DigiWebApp.JSONDatenuebertragungController.recieveData(recieveObj);
		
	}

	, empfangeMitarbeiter: function(successCallback, errorCallback) {
		var that = DigiWebApp.BautagebuchDatenuebertragungController;
		var internalSuccessCallback = function(data, msg, request) {
			// verarbeite empfangene Daten
						
			if (that.consoleLogOutput) console.log("empfangeMitarbeiter Status: " + request.status);
			
			// wurde eine Mitarbeiterliste erhalten?
			if (typeof(data.mitarbeiter) === "undefined") {
				trackError("missing projektleiterliste");
				return errorCallback();
			}
			
			// enthält die Mitarbeiterliste Mitarbeiter?
			if (data.mitarbeiter === null) {
				// ohne Mitarbeiter geht im Bautagebuch nichts
				return errorCallback();
			} else {
				// ist data.materialliste auch wirklich ein Array?
				var myLength = null;
				try {
					myLength = data.mitarbeiter.length;
				} catch(e2) {
					// ohne Mitarbeiter geht im Bautagebuch nichts
					trackError("data.mitarbeiter hat Länge " + myLength);
					return errorCallback();
				}
			}
			
			// data.projektleiter enthält also myLength Elemente
    		DigiWebApp.ApplicationController.DigiProgressView.show(M.I18N.l('Save'), M.I18N.l('employees'), myLength, 0);

			// alle "alten" Mitarbeiter löschen
			DigiWebApp.BautagebuchMitarbeiter.deleteAll();
			
			// die empfangenen Projektleiter im Model ablegen
			_.each(data.mitarbeiter, function(el) {
	    		DigiWebApp.ApplicationController.DigiProgressView.increase();
				if (typeof(el.id) === "undefined") {
					trackError("missing mitarbeiter id");
					return errorCallback();
				} else if (typeof(el.vorname) === "undefined") {
					trackError("missing mitarbeiter vorname");
					return errorCallback();
				} else if (typeof(el.nachname) === "undefined") {
					trackError("missing mitarbeiter nachname");
					return errorCallback();
				} else if (typeof(el.projektleiterId) === "undefined") {
					trackError("missing mitarbeiter projektleiterId");
					return errorCallback();
				} else {
					
					// Mitarbeiter (el) zur Liste hinzufügen wenn dieser nicht schon hinzugefügt wurde
					if (DigiWebApp.BautagebuchMitarbeiter.find({query:{identifier: 'id', operator: '=', value: el.id}}).length === 0) {
						DigiWebApp.BautagebuchMitarbeiter.createRecord({id: el.id, vorname: el.vorname, nachname: el.nachname, projektleiterId: el.projektleiterId, webAppId: el.webAppId, webAppPin: el.webAppPin}).saveSorted();
					}

				}
			});
			
			// weiter in der Verarbeitungskette
    		DigiWebApp.ApplicationController.DigiProgressView.hide();
			successCallback();
		};
		// getAll=true  Alle
		// getAll=false KolonnenMAs
		var recieveObj = {
			  webservice: "mitarbeiter"
			, loaderText: M.I18N.l('BautagebuchLadeProjektleiter')
			, successCallback: internalSuccessCallback
			, errorCallback: errorCallback
			, additionalQueryParameter: 'getAll=true&nurKolonne=true'
			//, timeout: 
			//, geraeteIdOverride: 
			//, modus: 
		};
		DigiWebApp.JSONDatenuebertragungController.recieveData(recieveObj);
		
	}
	
	, senden: function(item, successReturnCallback, errorReturnCallback) {
		// item ist ein Bautagesbericht

		var that = DigiWebApp.BautagebuchDatenuebertragungController;
		
		that.successReturnCallback = successReturnCallback;
		that.errorReturnCallback = function() {
    		DigiWebApp.ApplicationController.DigiProgressView.hide();
			errorReturnCallback();
		}

		//var successCallback = function(data, msg, request) {};
		//var errorCallback = function(request, msg) {};
		
		// Verarbeitungskette definieren und starten
		DigiWebApp.RequestController.getDatabaseServer(function() {
			that.sendeBautagesbericht(item,function() {
				that.sendeZeitbuchungen(item,function() {
					that.sendeMaterialbuchungen(item,function() {
						that.sendeNotizen(item,function() {
							that.sendeMedien(item,function() {
								that.sendeBautagesberichtFertig(
										item
									  , that.successReturnCallback
									  , that.errorReturnCallback);
							}, that.errorReturnCallback);
						}, that.errorReturnCallback);
					}, that.errorReturnCallback);
				}, that.errorReturnCallback);
			}, that.errorReturnCallback);
		});
	}
	
	, sendeBautagesbericht: function(item, successCallback, errorCallback) {
		// item ist ein Bautagesbericht
		var that = DigiWebApp.BautagebuchDatenuebertragungController;
		if (item.get('id')) {
			item.set("bautagesberichtId", item.get('id'));
		}
		item.set("transferCompleted", NO);
		var internalSuccessCallback = function(data, msg, request) {
			// verarbeite empfangene Daten
			if (that.consoleLogOutput) console.log("sendeBautagesbericht Status: " + request.status);
			// weiter in der Verarbeitungskette
			successCallback();
			
		};
		var sendObj = {
				  data: item.record
				, webservice: "bautagesbericht"
				, loaderText: M.I18N.l('BautagebuchSendeBautagesbericht')
				, successCallback: internalSuccessCallback
				, errorCallback: errorCallback
				//, additionalQueryParameter:
				//, timeout: 
		};
		if (item.hasFileName()) {
			item.readFromFile(function(result){
				item.set("unterschrift", JSON.parse(result));
				sendObj.data = item.record;
				DigiWebApp.JSONDatenuebertragungController.sendData(sendObj);
			},function(err){
				item.set("unterschrift", [{"lx":1,"ly":1,"mx":1,"my":1}]);
				sendObj.data = item.record;
				DigiWebApp.JSONDatenuebertragungController.sendData(sendObj);
			});
		} else {
			item.set("unterschrift", [{"lx":1,"ly":1,"mx":1,"my":1}]);
			sendObj.data = item.record;
			DigiWebApp.JSONDatenuebertragungController.sendData(sendObj);
		}
		
	}

	, sendeZeitbuchungen: function(item, successCallback, errorCallback) {
		// item ist ein Bautagesbericht
		
		//var that = DigiWebApp.BautagebuchDatenuebertragungController;
		
		var items = [];
		var relevanteZeitbuchungen = DigiWebApp.BautagebuchZeitbuchung.find({query:{identifier: 'bautagesberichtId', operator: '=', value: item.get('id')}}); 
		var relevanteZeitbuchungenSorted = _.sortBy(relevanteZeitbuchungen , function(z) {
            return parseIntRadixTen(z.get('_createdAt'));
        });
		_.each(relevanteZeitbuchungenSorted, function(el) {
			_.each(JSON.parse(el.get("mitarbeiterIds")), function(maId) {
				var zeitbuch = DigiWebApp.BautagebuchZeitbuchung.createRecord({
					  bautagesberichtId: item.get('id')
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
				zeitbuch.set("mitarbeiterId", maId);
				items.push(zeitbuch.record);
			});
		});
		if (items.length !== 0) {
			var data = {"zeitdaten": items};
			
			var internalSuccessCallback = function(data2, msg, request) {
				// verarbeite empfangene Daten
				console.log("sendeZeitbuchungen Status: " + request.status);
				// weiter in der Verarbeitungskette
				successCallback();
				
			};
			var sendObj = {
					  data: data
					, webservice: "zeitdaten"
					, loaderText: M.I18N.l('BautagebuchSendeZeitbuchungen')
					, successCallback: internalSuccessCallback
					, errorCallback: errorCallback
					//, additionalQueryParameter:
					//, timeout: 
			};
			DigiWebApp.JSONDatenuebertragungController.sendData(sendObj);
		} else {
			successCallback();
		}
	}

	, sendeMaterialbuchungen: function(item, successCallback, errorCallback) {
		// item ist ein Bautagesbericht
		
		//var that = DigiWebApp.BautagebuchDatenuebertragungController;
		var items = [];
		_.each(DigiWebApp.BautagebuchMaterialBuchung.find({query:{identifier: 'bautagesberichtId', operator: '=', value: item.get('id')}}), function(el) {
			var tmp = el.record;
			tmp.menge = parseIntRadixTen(tmp.menge);
			items.push(tmp);
		});
		
		if (items.length !== 0) {
			var data = {"materialbuchungen": items};
			
			var internalSuccessCallback = function(data2, msg, request) {
				// verarbeite empfangene Daten
				if (DigiWebApp.BautagebuchDatenuebertragungController.consoleLogOutput) console.log("sendeMaterialbuchungen Status: " + request.status);
				// weiter in der Verarbeitungskette
				successCallback();
				
			};
			var sendObj = {
					  data: data
					, webservice: "bautagesbericht/materialbuchung"
					, loaderText: M.I18N.l('BautagebuchSendeMaterialbuchungen')
					, successCallback: internalSuccessCallback
					, errorCallback: errorCallback
					//, additionalQueryParameter:
					//, timeout: 
			};
			DigiWebApp.JSONDatenuebertragungController.sendData(sendObj);
		} else {
			successCallback();
		}
	}

	, sendeNotizen: function(item, successCallback, errorCallback) {
		// item ist ein Bautagesbericht
		
		//var that = DigiWebApp.BautagebuchDatenuebertragungController;
		var items = [];
		_.each(DigiWebApp.BautagebuchNotiz.find({query:{identifier: 'bautagesberichtId', operator: '=', value: item.get('id')}}), function(el) {
			items.push(el.record);
		});
		
		if (items.length !== 0) {
			var data = {"notizen": items};
			
			var internalSuccessCallback = function(data2, msg, request) {
				// verarbeite empfangene Daten
				if (DigiWebApp.BautagebuchDatenuebertragungController.consoleLogOutput) console.log("sendeNotizen Status: " + request.status);										
				// weiter in der Verarbeitungskette
				successCallback();
				
			};
			var sendObj = {
					  data: data
					, webservice: "bautagesbericht/notiz"
					, loaderText: M.I18N.l('BautagebuchSendeNotizen')
					, successCallback: internalSuccessCallback
					, errorCallback: errorCallback
					//, additionalQueryParameter:
					//, timeout: 
			};
			DigiWebApp.JSONDatenuebertragungController.sendData(sendObj);
		} else {
			successCallback();
		}
	}

	, sendeMedien: function(item, successCallback, errorCallback) {
		// item ist ein Bautagesbericht
		//var that = DigiWebApp.BautagebuchDatenuebertragungController;

		DigiWebApp.ApplicationController.DigiLoaderView.show(M.I18N.l('loadMediaFiles'));

		var proceed = function(mediaFiles) {
			
			if (mediaFiles.length !== 0) {
				var items = [];
				
				_.each(mediaFiles, function(mf){
					items.push(mf.record);
				});
				
				var data = {"medien": items};
				
				var internalSuccessCallback = function(data2, msg, request) {
					// verarbeite empfangene Daten
					if (DigiWebApp.BautagebuchDatenuebertragungController.consoleLogOutput) console.log("sendeMedien Status: " + request.status);
					// weiter in der Verarbeitungskette
					successCallback();
								
				};
				var sendObj = {
						  data: data
						, webservice: "medien"
						, loaderText: M.I18N.l('BautagebuchSendeMedien')
						, successCallback: internalSuccessCallback
						, errorCallback: errorCallback
						//, additionalQueryParameter:
						//, timeout: 
				};
				DigiWebApp.JSONDatenuebertragungController.sendData(sendObj);
			} else {
				// no files to send

				// weiter in der Verarbeitungskette
				successCallback();
			}
    	};

		var mediaFiles = DigiWebApp.BautagebuchMediaFile.find({query:{identifier: 'bautagesberichtId', operator: '=', value: item.get('id')}});
		var mediaFilesLength = mediaFiles.length;
    	var mediaFilesIndex = 0;
    	var done = false;
    	
    	if (mediaFilesLength !== 0) { 
	    	_.each(mediaFiles, function(el) {
	    		
    			console.log('loading mediaFile for mediaFilesIndex ' + mediaFilesIndex);
    			if (el.hasFileName()) {
	    			console.log("fileName: " + el.get('fileName'));
					// load signature into el
					el.readFromFile(function(fileContent){
						//console.log("fileContent: " + fileContent);
						if (fileContent && (fileContent !== "")) {
					    	_.each(mediaFiles, function(mf) {
					            if (mf.m_id === el.m_id) {
					            	mf.set("data", fileContent);
					            	mediaFilesIndex = mediaFilesIndex + 1;
					            }
					        });
						}
						if ( mediaFilesIndex === mediaFilesLength && done === false) {
							// last mediaFile loaded
				    		console.log('last mediaFile done (with file)');
		    				DigiWebApp.ApplicationController.DigiLoaderView.hide();
		    				done = true;
		    				proceed(mediaFiles);
						}
					}, function() {
						if ( mediaFilesIndex === mediaFilesLength && done === false) {
							// last mediaFile loaded
				    		console.log('last mediaFile done (last file load failed)');
		    				DigiWebApp.ApplicationController.DigiLoaderView.hide();
		    				done = true;
		    				proceed(mediaFiles);
						}
					});
    			} else {
	    			// this mediaFile has no file
					if ( mediaFilesIndex === mediaFilesLength && done === false) {
						// last mediaFile loaded
			    		console.log('last mediaFile done (no file)');
	    				DigiWebApp.ApplicationController.DigiLoaderView.hide();
	    				done = true;
	    				proceed(mediaFiles);
					}
	    		}
	        });
    	} else {
    		//console.log('no mediafiles');
			DigiWebApp.ApplicationController.DigiLoaderView.hide();
			proceed(mediaFiles);
    	}

	}

	, sendeBautagesberichtFertig: function(item, successCallback, errorCallback) {
		// item ist ein Bautagesbericht
		//var that = this;
		item.set("bautagesberichtId", item.get('id'));
		item.set("transferCompleted", YES);
		var internalSuccessCallback = function(data, msg, request) {
			// verarbeite empfangene Daten
			
			if (request.status > 199 && request.status < 300) {
				// scheint alles gut gegangen zu sein
				item.deleteSorted(function() {
					DigiWebApp.BautagebuchBautagesberichteListeController.set("items", DigiWebApp.BautagebuchBautagesbericht.findSorted());
					if (DigiWebApp.BautagebuchDatenuebertragungController.consoleLogOutput) console.log("sendeBautagesberichtFertig Status: " + request.status);
					if (typeof(successCallback) === "function") successCallback(data, msg, request);
				});
			} else {
				trackError("Request ended with status: " + request.status);
			}
						
		};
		var sendObj = {
				  data: item.record
				, webservice: "bautagesbericht"
				, loaderText: M.I18N.l('BautagebuchSendeBautagesbericht')
				, successCallback: internalSuccessCallback
				, errorCallback: errorCallback
				//, additionalQueryParameter:
				//, timeout: 
		};
		DigiWebApp.JSONDatenuebertragungController.sendData(sendObj);
		
	}

 	, sendBautagesberichtFunc: function(callback) {
 		var that = this;
 		if (DigiWebApp.BautagebuchZusammenfassungController.item) {
	  			DigiWebApp.BautagebuchZusammenfassungController.load(DigiWebApp.BautagebuchZusammenfassungController.item);
	  			that.senden(
						DigiWebApp.BautagebuchZusammenfassungController.item
					    , function(msg) {
							//DigiWebApp.BautagebuchBautagesberichtDetailsController.deleteBautagesbericht(callback, callback, YES);
							if (typeof(callback) == "function") callback();
						}
						, function(xhr,err) {
							if (typeof(callback) == "function") callback();
						}
				);
 		} else {
 			if (typeof(callback) == "function") callback();
 		}	     	    				
 	}

 	, ausgekoppelteNotizSenden: function(mainCallback) {
		var that = this;

 		var processNotizenOnly = function(callback) { 

 			// Datenübertragung für Notiz-only und Feierabend           
 			
       		DigiWebApp.BautagebuchBautagesberichteListeController.init();
       		var bautagesberichte = DigiWebApp.BautagebuchBautagesbericht.find();
       		var myBautagesbericht = null;
       		_.each(bautagesberichte, function(bautagesbericht){
       			if (bautagesbericht.get('bautagesberichtTyp') == "<notizen_only>") {
       				myBautagesbericht = bautagesbericht;
       			}
       		});
       		
       		if (myBautagesbericht) {
       			DigiWebApp.BautagebuchBautagesberichtDetailsController.load(myBautagesbericht);
           	  	DigiWebApp.BautagebuchZusammenfassungController.load(DigiWebApp.BautagebuchBautagesberichtDetailsController.item);
           	  	DigiWebApp.BautagebuchZusammenfassungController.finish(callback);
       		} else {
				if (typeof(callback) == "function") callback();
       		}
 		}

		processNotizenOnly(function(){
			that.sendBautagesberichtFunc(mainCallback);
		});
		
	}

	, ausgekoppelteMaterialerfassungSenden: function(mainCallback) {
		var that = this;

 		var processMaterialerfassungOnly = function(callback) { 
     		// Datenübertragung für Materialerfassung-only und Feierabend
         	  	
       		DigiWebApp.BautagebuchBautagesberichteListeController.init();
       		var bautagesberichte = DigiWebApp.BautagebuchBautagesbericht.find();
       		var myBautagesbericht = null;
       		_.each(bautagesberichte, function(bautagesbericht){
       			if (bautagesbericht.get('bautagesberichtTyp') == "<materialerfassung_only>") {
       				myBautagesbericht = bautagesbericht;
       			}
       		});
       		
       		if (myBautagesbericht) {
       			DigiWebApp.BautagebuchBautagesberichtDetailsController.load(myBautagesbericht);
           	  	DigiWebApp.BautagebuchZusammenfassungController.load(DigiWebApp.BautagebuchBautagesberichtDetailsController.item);
           	  	DigiWebApp.BautagebuchZusammenfassungController.finish(callback);
       		} else {
				if (typeof(callback) == "function") callback();
       		}
 		}
 		
 		processMaterialerfassungOnly(function(){
 			that.sendBautagesberichtFunc(mainCallback);
 		});	        		              	  	

	}

	, ausgekoppelteSenden: function(mainCallback) {
		var that = this;
		
		that.ausgekoppelteMaterialerfassungSenden(function() {
			that.ausgekoppelteNotizSenden(mainCallback);
		});
	}
	
});
