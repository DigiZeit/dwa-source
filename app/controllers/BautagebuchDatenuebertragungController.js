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
	
	, empfangen: function(successReturnCallback, errorReturnCallback) {
		var that = DigiWebApp.BautagebuchDatenuebertragungController;
		
		that.successReturnCallback = successReturnCallback;
		that.errorReturnCallback = errorReturnCallback;

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

//		var internalSuccessCallback = function(data, msg, request) {
//			// verarbeite empfangene Daten
//						
//		if (DigiWebApp.BautagebuchDatenuebertragungController.consoleLogOutput) console.log("empfangeMengeneinheiten Status: " + request.status);
//
//			// wurde eine Mengeneinheitenliste erhalten?
//			if (typeof(data.mengeneinheiten) === "undefined") {
//				console.error("missing mengeneinheiten");
//				return errorCallback();
//			}
//			
//			// enthält die Mengeneinheitenliste Mengeneinheiten?
//			if (data.mengeneinheiten === null) {
//				// ohne Mengeneinheiten geht im Bautagebuch nichts
//				return errorCallback();
//			} else {
//				// ist data.mengeneinheiten auch wirklich ein Array?
//				var myLength = null;
//				try {
//					myLength = data.mengeneinheiten.length;
//				} catch(e) {
//					return errorCallback();
//				}
//			}
//			
//			// data.mengeneinheiten enthält also myLength Elemente
//			// alle "alten" Mengeneinheiten löschen
//			DigiWebApp.BautagebuchMengeneinheiten.deleteAll();
//			
//			// die empfangenen Mengeneinheiten mit Model ablegen
//			_.each(data.mengeneinheiten, function(el) {
//				if (typeof(el.id) === "undefined") {
//					console.error("missing mengeneinheit id");
//					return errorCallback();
//				} else if (typeof(el.bezeichnung) === "undefined") {
//					console.error("missing mengeneinheit bezeichnung");
//					return errorCallback();
//				} else if (typeof(el.kuerzel) === "undefined") {
//					console.error("missing mengeneinheit kuerzel");
//					return errorCallback();
//				} else {
//					
//					// mengeneinheit (el) zur Liste hinzufügen
//					DigiWebApp.BautagebuchMengeneinheit.createRecord({id: el.id, bezeichnung: el.bezeichnung, kuerzel: el.kuerzel}).saveSorted();
//
//				}
//			});
//			
//			// weiter in der Verarbeitungskette
//			successCallback();
//		};
//		
//		DigiWebApp.JSONDatenuebertragungController.recieveData("mengeneinheiten", M.I18N.l('BautagebuchLadeMengeneinheiten'), internalSuccessCallback, errorCallback);
		
	}
	
	, empfangeMaterialien: function(successCallback, errorCallback) {
		var that = DigiWebApp.BautagebuchDatenuebertragungController;
		var internalSuccessCallback = function(data, msg, request) {
			// verarbeite empfangene Daten
			
			if (that.consoleLogOutput) console.log("empfangeMaterialien Status: " + request.status);

			//var myMaterialliste = [];
			
			// wurde eine materialliste erhalten?
			if (typeof(data.materialliste) === "undefined") {
				console.error("missing materialliste");
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
					console.error(myLength);
					//return errorCallback();
				}
			}
			
			// data.materialliste enthält also myLength (oder gar keine) Elemente
			// alle "alten" Materialien löschen
			DigiWebApp.BautagebuchMaterial.deleteAll();
			
			// die empfangenen Materialien mit Model ablegen
			_.each(data.materialliste, function(el) {
				//console.log(el);
				if (typeof(el.materialbezeichnung) === "undefined") {
					console.error("missing materialbezeichnung");
					return errorCallback();
				} else {
					// el.materialbezeichnung zur Liste hinzufügen
					DigiWebApp.BautagebuchMaterial.createRecord({bezeichnung: el.materialbezeichnung, id: el.materialbezeichnung}).saveSorted();
				}
			});
			
			// weiter in der Verarbeitungskette
			successCallback();
		};
		
		DigiWebApp.JSONDatenuebertragungController.recieveData("materialliste", M.I18N.l('BautagebuchLadeMaterialien'), internalSuccessCallback, errorCallback);
		
	}

	, empfangeProjektleiter: function(successCallback, errorCallback) {
		var that = DigiWebApp.BautagebuchDatenuebertragungController;
		var internalSuccessCallback = function(data, msg, request) {
			// verarbeite empfangene Daten
						
			if (that.consoleLogOutput) console.log("empfangeProjektleiter Status: " + request.status);

			// wurde eine Projektleiterliste erhalten?
			if (typeof(data.mitarbeiter) === "undefined") {
				console.error("missing mitarbeiterliste");
				return errorCallback();
			}
			
			// enthält die Projektleiterliste Projektleiter?
			if (data.mitarbeiter === null) {
				// ohne Projektleiter geht im Bautagebuch nichts
				return errorCallback();
			} else {
				// ist data.materialliste auch wirklich ein Array?
				var myLength = null;
				try {
					myLength = data.mitarbeiter.length;
				} catch(e1) {
					// ohne Projektleiter geht im Bautagebuch nichts
					console.error(myLength);
					return errorCallback();
				}
			}
			
			// data.projektleiter enthält also myLength Elemente
			// alle "alten" Projektleiter löschen
			DigiWebApp.BautagebuchProjektleiter.deleteAll();
			
			// die empfangenen Projektleiter mit Model ablegen
			_.each(data.mitarbeiter, function(el) {
				if (typeof(el.id) === "undefined") {
					console.error("missing id");
					return errorCallback();
				} else if (typeof(el.projektleiterId) === "undefined") {
					console.error("missing projektleiterId");
					return errorCallback();
				} else if (typeof(el.vorname) === "undefined") {
					console.error("missing projektleiter vorname");
					return errorCallback();
				} else if (typeof(el.nachname) === "undefined") {
					console.error("missing projektleiter nachname");
					return errorCallback();
				} else {
					
					if (el.id === el.projektleiterId) {
						// projektleiter (el) zur Liste hinzufügen
						// Mitarbeiter (el) zur Liste hinzufügen wenn dieser nicht schon hinzugefügt wurde
						if (DigiWebApp.BautagebuchProjektleiter.find({query:{identifier: 'id', operator: '=', value: el.id}}).length === 0) {
							DigiWebApp.BautagebuchProjektleiter.createRecord({id: el.id, vorname: el.vorname, nachname: el.nachname}).saveSorted();
						}
					}

				}
			});
			
			// weiter in der Verarbeitungskette
			successCallback();
		};
		
		DigiWebApp.JSONDatenuebertragungController.recieveData("mitarbeiter", M.I18N.l('BautagebuchLadeProjektleiter'), internalSuccessCallback, errorCallback, 'getAll=true&nurKolonne=false');
		
	}

	, empfangeMitarbeiter: function(successCallback, errorCallback) {
		var that = DigiWebApp.BautagebuchDatenuebertragungController;
		var internalSuccessCallback = function(data, msg, request) {
			// verarbeite empfangene Daten
						
			if (that.consoleLogOutput) console.log("empfangeMitarbeiter Status: " + request.status);
			
			// wurde eine Mitarbeiterliste erhalten?
			if (typeof(data.mitarbeiter) === "undefined") {
				console.error("missing projektleiterliste");
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
					console.error(myLength);
					return errorCallback();
				}
			}
			
			// data.projektleiter enthält also myLength Elemente
			// alle "alten" Mitarbeiter löschen
			DigiWebApp.BautagebuchMitarbeiter.deleteAll();
			
			// die empfangenen Projektleiter im Model ablegen
			_.each(data.mitarbeiter, function(el) {
				if (typeof(el.id) === "undefined") {
					console.error("missing mitarbeiter id");
					return errorCallback();
				} else if (typeof(el.vorname) === "undefined") {
					console.error("missing mitarbeiter vorname");
					return errorCallback();
				} else if (typeof(el.nachname) === "undefined") {
					console.error("missing mitarbeiter nachname");
					return errorCallback();
				} else if (typeof(el.projektleiterId) === "undefined") {
					console.error("missing mitarbeiter projektleiterId");
					return errorCallback();
				} else {
					
					// Mitarbeiter (el) zur Liste hinzufügen wenn dieser nicht schon hinzugefügt wurde
					if (DigiWebApp.BautagebuchMitarbeiter.find({query:{identifier: 'id', operator: '=', value: el.id}}).length === 0) {
						DigiWebApp.BautagebuchMitarbeiter.createRecord({id: el.id, vorname: el.vorname, nachname: el.nachname, projektleiterId: el.projektleiterId, webAppId: el.webAppId, webAppPin: el.webAppPin}).saveSorted();
					}

				}
			});
			
			// weiter in der Verarbeitungskette
			successCallback();
		};
		// getAll=true  Alle
		// getAll=false KolonnenMAs
		DigiWebApp.JSONDatenuebertragungController.recieveData("mitarbeiter", M.I18N.l('BautagebuchLadeMitarbeiter'), internalSuccessCallback, errorCallback, 'getAll=true&nurKolonne=true');
		
	}
	
	, senden: function(item, successReturnCallback, errorReturnCallback) {
		// item ist ein Bautagesbericht

		var that = DigiWebApp.BautagebuchDatenuebertragungController;
		
		that.successReturnCallback = successReturnCallback;
		that.errorReturnCallback = errorReturnCallback;

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
		item.set("bautagesberichtId", item.m_id);
		item.set("transferCompleted", NO);
		var internalSuccessCallback = function(data, msg, request) {
			// verarbeite empfangene Daten
			if (that.consoleLogOutput) console.log("sendeBautagesbericht Status: " + request.status);
			// weiter in der Verarbeitungskette
			successCallback();
			
		};
		if (item.hasFileName()) {
			item.readFromFile(function(result){
				item.set("unterschrift", JSON.parse(result));
				DigiWebApp.JSONDatenuebertragungController.sendData(item.record, "bautagesbericht", M.I18N.l('BautagebuchSendeBautagesbericht'), internalSuccessCallback, errorCallback);
			},function(err){
				item.set("unterschrift", [{"lx":1,"ly":1,"mx":1,"my":1}]);
				DigiWebApp.JSONDatenuebertragungController.sendData(item.record, "bautagesbericht", M.I18N.l('BautagebuchSendeBautagesbericht'), internalSuccessCallback, errorCallback);
			});
		} else {
			item.set("unterschrift", [{"lx":1,"ly":1,"mx":1,"my":1}]);
			DigiWebApp.JSONDatenuebertragungController.sendData(item.record, "bautagesbericht", M.I18N.l('BautagebuchSendeBautagesbericht'), internalSuccessCallback, errorCallback);
		}
		
	}

	, sendeZeitbuchungen: function(item, successCallback, errorCallback) {
		// item ist ein Bautagesbericht
		
		//var that = DigiWebApp.BautagebuchDatenuebertragungController;
		
		var items = [];
		var relevanteZeitbuchungen = DigiWebApp.BautagebuchZeitbuchung.find({query:{identifier: 'bautagesberichtId', operator: '=', value: item.m_id}}); 
		var relevanteZeitbuchungenSorted = _.sortBy(relevanteZeitbuchungen , function(z) {
            return parseInt(z.get('_createdAt'));
        });
		_.each(relevanteZeitbuchungenSorted, function(el) {
			_.each(JSON.parse(el.get("mitarbeiterIds")), function(maId) {
				var zeitbuch = DigiWebApp.BautagebuchZeitbuchung.createRecord({
					  bautagesberichtId: item.m_id
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
			DigiWebApp.JSONDatenuebertragungController.sendData(data, "zeitdaten", M.I18N.l('BautagebuchSendeZeitbuchungen'), internalSuccessCallback, errorCallback);
		} else {
			successCallback();
		}
	}

	, sendeMaterialbuchungen: function(item, successCallback, errorCallback) {
		// item ist ein Bautagesbericht
		
		//var that = DigiWebApp.BautagebuchDatenuebertragungController;
		var items = [];
		_.each(DigiWebApp.BautagebuchMaterialBuchung.find({query:{identifier: 'bautagesberichtId', operator: '=', value: item.m_id}}), function(el) {
			var tmp = el.record;
			tmp.menge = parseInt(tmp.menge);
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
			DigiWebApp.JSONDatenuebertragungController.sendData(data, "bautagesbericht/materialbuchung", M.I18N.l('BautagebuchSendeMaterialbuchungen'), internalSuccessCallback, errorCallback);
		} else {
			successCallback();
		}
	}

	, sendeNotizen: function(item, successCallback, errorCallback) {
		// item ist ein Bautagesbericht
		
		//var that = DigiWebApp.BautagebuchDatenuebertragungController;
		var items = [];
		_.each(DigiWebApp.BautagebuchNotiz.find({query:{identifier: 'bautagesberichtId', operator: '=', value: item.m_id}}), function(el) {
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
			DigiWebApp.JSONDatenuebertragungController.sendData(data, "bautagesbericht/notiz", M.I18N.l('BautagebuchSendeNotizen'), internalSuccessCallback, errorCallback);
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
				DigiWebApp.JSONDatenuebertragungController.sendData(data, "medien", M.I18N.l('BautagebuchSendeMedien'), internalSuccessCallback, errorCallback);
			} else {
				// no files to send

				// weiter in der Verarbeitungskette
				successCallback();
			}
    	};

		var mediaFiles = DigiWebApp.BautagebuchMediaFile.find({query:{identifier: 'bautagesberichtId', operator: '=', value: item.m_id}});
		var mediaFilesLength = mediaFiles.length;
    	var mediaFilesIndex = 0;
    	var done = false;
    	
    	if (mediaFilesLength !== 0) { 
	    	_.each(mediaFiles, function(el) {
	    		
	    		mediaFilesIndex = mediaFilesIndex + 1;
	    		
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
		item.set("bautagesberichtId", item.m_id);
		item.set("transferCompleted", YES);
		var internalSuccessCallback = function(data, msg, request) {
			// verarbeite empfangene Daten
			
			if (request.status > 199 && request.status < 300) {
				// scheint alles gut gengen zu sein
				item.deleteSorted(function() {
					DigiWebApp.BautagebuchBautageberichteListeController.set("items", DigiWebApp.BautagebuchBautagesbericht.findSorted());
					if (DigiWebApp.BautagebuchDatenuebertragungController.consoleLogOutput) console.log("sendeBautagesberichtFertig Status: " + request.status);
					if (typeof(successCallback) === "function") successCallback(data, msg, request);
				});
			} else {
				console.error("Request ended with status: " + request.status);
			}
						
		};
		DigiWebApp.JSONDatenuebertragungController.sendData(item.record, "bautagesbericht", M.I18N.l('BautagebuchSendeBautagesbericht'), internalSuccessCallback, errorCallback);
		
	}

	
});
