// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: DigiWebApp
// Controller: BautagebuchZusammenfassungController
// ==========================================================================
// manuell var-checked
DigiWebApp.BautagebuchZusammenfassungController = M.Controller.extend({

	  item: null // model itself

	, lastTimestampDatatransfer: null
	  
	, bautagesberichtId: null
	
	, projektleiterId: null // in model
	, projektleiterList: null // runtime
	  
	, mitarbeiterIds: null // in model
	, mitarbeiterList: null // runtime
	, mitarbeiterListSelected: null // runtime
	
	, datum: null // in model
	
	, auftragsId: null // in model
	, auftragsName: null // in model
	, auftraegeList: null // runtime
	
	, positionenList: null // runtime (auftraegeComboBox-change)
	
	, latitude: null
	, longitude: null
	
	, wetter: null // in model
	, setWetter: function(wetterObject) {
		var that = this;
		if (typeof(wetterObject) === "undefined") {
			return NO;
		} else {
			that.set("wetter", JSON.parse(JSON.stringify(wetterObject)));
			return YES;
		}
	}
	
	, startUhrzeit: null
		
	, ZeitbuchungenPerMitarbeiterList: []
				
	, init: function(isFirstLoad) {
		//var that = this;
		if (isFirstLoad) {
		}
		
		// geladene dauer-zeitbuchungen in von/bis-zeitbuchungen umrechnen:
		
	}
	
	, load: function(myItem, readOnly) {
		var that = this;
		
		that.set("item", myItem); 
		
		that.set("bautagesberichtId", myItem.m_id);
		
		that.set("datum", myItem.get("datum"));
		that.set("projektleiterId", myItem.get("projektleiterId"));
		that.set("auftragsId", myItem.get("orderId"));
		that.set("auftragsName", myItem.get("orderName"));
		that.set("mitarbeiterIds", myItem.get("selektierteMitarbeiter"));
		that.set("startUhrzeit", myItem.get("startUhrzeit"));

		that.setWetter(DigiWebApp.BautagebuchMainController.wetterDefaults);
		that.set("wetter.temperatur", myItem.get("temperatur"));
		that.set("wetter.luftfeuchtigkeit", myItem.get("luftfeuchtigkeit"));
		that.set("wetter.bewoelkung", myItem.get("bewoelkung"));
		that.set("wetter.niederschlag", myItem.get("niederschlag"));
		that.set("wetter.wind", myItem.get("wind"));
		that.set("wetter.wechselhaft", myItem.get("wechselhaft"));
		that.set("wetter.wechselhaftItem", [{
	        value: 'wechselhaft'
	      , label: M.I18N.l('BautagebuchWechselhaft')
	      , isSelected: myItem.get("wechselhaft")
		}]);		
		that.setPositionen(myItem.get("orderId"));
		
		that.set("ZeitbuchungenPerMitarbeiterList", that.getZeitbuchungenPerMitarbeiterList());
		
	}

	, save: function(successcallback, errorcallback) {
		var that = this;
			
		if (that.item.saveSorted()) {		
			DigiWebApp.BautagebuchBautageberichteListeController.set("items", DigiWebApp.BautagebuchBautagesbericht.findSorted());
			if (typeof(successcallback) === "function") successcallback();
			return true;
		} else {
			if (typeof(errorcallback) === "function") errorcallback();
			return false;
		}
	}
	
	, deleteBautagesbericht: function(successcallback, errorcallback) {
		var that = this;
		if (that.item.deleteSorted()) {
			DigiWebApp.BautagebuchBautageberichteListeController.set("items", DigiWebApp.BautagebuchBautagesbericht.findSorted());
			if (typeof(successcallback) === "function") successcallback();
			return true;
		} else {
			if (typeof(errorcallback) === "function") errorcallback();
			return false;
		}
	}

	, finish: function(successcallback, errorcallback) {
		var that = this;

		that.item.set("abgeschlossen", YES);
		that.berechneVonBis(YES);

		var unterschriftString = "";
    	// Feature 405 (Unterschrift)
		if ((DigiWebApp.SettingsController.featureAvailable('405')) && (typeof window.requestFileSystem !== "undefined")) {
			//unterschriftImageString = DigiWebApp.BautagebuchZusammenfassungPage.signaturePadAPI.getSignatureImage();
    		unterschriftString = DigiWebApp.BautagebuchZusammenfassungPage.signaturePadAPI.getSignatureString();
			//var unterschriftRawValue = $('#' + DigiWebApp.BautagebuchZusammenfassungPage.content.signature.signatureform.signaturecanvas.id).val();
    	
			//console.log(DigiWebApp.BautagebuchZusammenfassungPage.signaturePadAPI);
			//console.log(unterschriftImageString);
    		that.item.set('fileType', DigiWebApp.ApplicationController.CONSTTextFiletype);
    		that.item.saveToFile(unterschriftString, function(){
    			
    		    that.item.set("unterschrift_breite", DigiWebApp.BautagebuchZusammenfassungPage.content.container.signature.signatureform.signaturecanvas.canvasWidth);
    		    that.item.set("unterschrift_hoehe", DigiWebApp.BautagebuchZusammenfassungPage.content.container.signature.signatureform.signaturecanvas.canvasHeight);

    			if (that.save()) {
    				DigiWebApp.BautagebuchBautageberichteListeController.set("items", DigiWebApp.BautagebuchBautagesbericht.findSorted());
    				if (typeof(successcallback) === "function") successcallback();
    				return true;
    			} else {
    				if (typeof(errorcallback) === "function") errorcallback();
    				return false;
    			}
    		});
		} else {
			if (that.save()) {
				DigiWebApp.BautagebuchBautageberichteListeController.set("items", DigiWebApp.BautagebuchBautagesbericht.findSorted());
				if (typeof(successcallback) === "function") successcallback();
				return true;
			} else {
				if (typeof(errorcallback) === "function") errorcallback();
				return false;
			}
		}
	}

	, setPositionen: function(auftragsId) {
		//var that = this;
		if (typeof(auftragsId) === "undefined") {
			return false;
		} else {
			// verfügbare Positionen kopieren und ausgewähltes selektieren
		    var positionenArray = _.map(DigiWebApp.Position.find(), function(pos) {
		    	if ( typeof(pos) === "undefined" ) {
		    		console.log("UNDEFINED Position");
		    	} else {
		    		if (pos.get('orderId') === auftragsId) {
		    			var obj = { label: pos.get('name'), value: pos.get('id'), isSelected: NO };
		    			return obj;
		    		}
		    	}
		    });
		    positionenArray = _.compact(positionenArray);
			DigiWebApp.BautagebuchBautageberichtDetailsController.set("positionenList", positionenArray);
		}
	}
	
	, berechneVonBis: function(saveit) {
		var that = this;
		var result = [];
		var letztesBis = D8.create(DigiWebApp.BautagebuchBautageberichtDetailsController.item.get("datum") + " " + DigiWebApp.BautagebuchBautageberichtDetailsController.startUhrzeit);
		var relevanteZeitbuchungen = DigiWebApp.BautagebuchZeitbuchung.find({query:{identifier: 'bautagesberichtId', operator: '=', value: that.bautagesberichtId}}); 
		var relevanteZeitbuchungenSorted = _.sortBy(relevanteZeitbuchungen , function(z) {
            return parseInt(z.get('_createdAt'));
        });
		_.each(relevanteZeitbuchungenSorted, function(m) {
			//console.log("von", letztesBis.format("HH:MM"));
			m.set("von", letztesBis.format("HH:MM"));
			m.set("timeStampStart", letztesBis.getTimestamp());
			var dauer = m.get("dauer");
			var naechstesBis = letztesBis.addHours(parseInt(dauer.split(":")[0])).addMinutes(parseInt(dauer.split(":")[1]));
			letztesBis = naechstesBis;
			//console.log("bis", letztesBis.format("HH:MM"));
			m.set("bis", letztesBis.format("HH:MM"));
			m.set("timeStampEnd", letztesBis.getTimestamp());
			if (typeof saveit !== "undefined" && parseBool(saveit)) {
				m.saveSorted();
			}
			result.push(m);
		});
		var resultSorted = _.sortBy(result , function(z) {
            return parseInt(z.get('von'));
        });
		return resultSorted;
	}
	
	, getZeitbuchungenPerMitarbeiterList: function() {
		var that = this;
		var MAList = [];
		var zeitbuchungenList = [];
		if (parseBool(that.item.get("abgeschlossen")) || !DigiWebApp.BautagebuchEinstellungen.find()[0].get("inStundenBuchen")) {
			// Zeitbuchungen wurden bereits berechnet oder es wird nicht in Stunden gebucht (sondern mit Von/Bis)
			var relevanteZeitbuchungen = DigiWebApp.BautagebuchZeitbuchung.find({query:{identifier: 'bautagesberichtId', operator: '=', value: that.bautagesberichtId}}); 
			zeitbuchungenList = _.sortBy(relevanteZeitbuchungen , function(z) {
	            return parseInt(z.get('von'));
	        });
		} else {
			zeitbuchungenList = that.berechneVonBis();
		}
		_.each(zeitbuchungenList, function(m) {
			  var zeitbuchungMAIds = JSON.parse(m.get("mitarbeiterIds"));
			  _.each(zeitbuchungMAIds, function(el) {
	        		var myMitarbeiter = DigiWebApp.BautagebuchMitarbeiter.find({query:{identifier: 'id', operator: '=', value: el}})[0];
	        		if (typeof myMitarbeiter !== "undefined") {
		        		var found = NO;
	        			_.each(MAList, function(MAListEntry) {
	        				if (MAListEntry.get("id") === myMitarbeiter.get("id")) {
	        					found = YES;
	        				}
	        			});
	        			if (found === NO) {
	        				MAList.push(myMitarbeiter);
	        			}
		        	}
			  });
		});
		var result = [];
		_.each(MAList, function(el) {
			var items = [];
			var mySumme = D8.create(DigiWebApp.BautagebuchBautageberichtDetailsController.item.get("datum") + " 00:00");
			_.each(zeitbuchungenList,function(zeitbuch) {
				   var maIds = JSON.parse(zeitbuch.get("mitarbeiterIds"));
				   _.each(maIds, function(maId) {
					   	if (maId === el.get("id")) {
				    	  // benutze diese Zeitbuchung
					   		mySumme = mySumme.addHours(zeitbuch.get("dauer").split(":")[0]).addMinutes(zeitbuch.get("dauer").split(":")[1]);
					   				var zeitbuchItem = {
					   					  vonbisdauer : zeitbuch.get("von") + " - " + zeitbuch.get("bis") + " (" + zeitbuch.get("dauer") + "h)"
					   					, positionName: zeitbuch.get("positionName")
					   					, activityName: zeitbuch.get("activityName")
					   					, mitarbeiterId: maId
					   				};
					   				items.push(zeitbuchItem);
				      	}
				   });
			});
			var maItem = {"label": el.vollername() + ": " + mySumme.format("HH:MM") + "h", "items":items};
			result.push(maItem);
		});
		return result;
	}
});
