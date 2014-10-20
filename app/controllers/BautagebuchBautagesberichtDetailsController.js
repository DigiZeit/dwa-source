// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: DigiWebApp
// Controller: BautagebuchBautagesberichtDetailsController
// ==========================================================================
// manuell var-checked
DigiWebApp.BautagebuchBautagesberichtDetailsController = M.Controller.extend({

	  item: null // model itself
	
	, projektleiterId: null // in model
	, projektleiterList: [{label:"",value:0}] // runtime
	  
	, mitarbeiterIds: null // in model
	, mitarbeiterList: [{label:"",value:0}] // runtime
	, mitarbeiterListSelected: null // runtime
	
	, datum: null // in model
	, datumAsDate: null // runtime to feed date-textinput
	
	, handOrderId: null // in model
	, handOrderName: null // in model

	, auftragsId: null // in model
	, auftragsName: null // in model
	, auftraegeList: [{label:"",value:0}] // runtime
	
	, positionId: null // in model
	, positionName: null // in model
	, positionenList: null // runtime
	
	, latitude: null
	, longitude: null
	
	, bautagesberichtTyp: null
		
	, wetter: null // in model
	, wetterBackup: null // als Zwischenspeicher für Wetter-Zurück-Button
	
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
		
	, init: function(isFirstLoad) {
		var that = this;
		if (isFirstLoad) {
			// setting defaults for contentBinding
			that.setWetter(DigiWebApp.BautagebuchMainController.wetterDefaults);
			DigiWebApp.BautagebuchBautagesberichtDetailsController.set("mitarbeiterIds", _.map(DigiWebApp.BautagebuchMainController.mitarbeiter,function(obj){return obj.value;}));
		}
	}
	
	, load: function(myItem) {
		
		var that = this;
		
		that.set("item", myItem); 
		
		that.set("datum", myItem.get("datum"));
		that.set("projektleiterId", myItem.get("projektleiterId"));
		that.set("auftragsId", myItem.get("orderId"));
		that.set("auftragsName", myItem.get("orderName"));
		that.set("handOrderId", myItem.get("handOrderId"));
		that.set("handOrderName", myItem.get("handOrderName"));
		that.set("positionId", myItem.get("positionId"));
		that.set("positionName", myItem.get("positionName"));
		that.set("mitarbeiterIds", myItem.get("selektierteMitarbeiter"));
		that.set("startUhrzeit", myItem.get("startUhrzeit"));
		that.set("bautagesberichtTyp", myItem.get('bautagesberichtTyp'));

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
	}

	, save: function(successcallback, errorcallback, skipChecks) {
		var that = this;
		
		if (!skipChecks) {
			var orderSelected = (M.ViewManager.getView('bautagebuchBautagesberichtDetailsPage', 'auftragComboBox').getSelection() !== "0" );
			var projektleiterSelected = (M.ViewManager.getView('bautagebuchBautagesberichtDetailsPage', 'projektleiterComboBox').getSelection() !== "0" );
			var mitarbeiterSelected = (!(DigiWebApp.BautagebuchBautagesberichtDetailsController.mitarbeiterIds === null || DigiWebApp.BautagebuchBautagesberichtDetailsController.mitarbeiterIds.length === 0));
			
			if (!orderSelected) {
	            DigiWebApp.ApplicationController.nativeAlertDialogView({
	                title: M.I18N.l('noOrderSelected')
	              , message: M.I18N.l('noOrderSelectedMsg')
	            });
				return false;
			}
			if (!projektleiterSelected) {
	            DigiWebApp.ApplicationController.nativeAlertDialogView({
	                title: M.I18N.l('noProjektleiterSelected')
	              , message: M.I18N.l('noProjektleiterSelectedMsg')
	            });
				return false;
			}
			if (!mitarbeiterSelected) {
	            DigiWebApp.ApplicationController.nativeAlertDialogView({
	                title: M.I18N.l('noMitarbeiterSelected')
	              , message: M.I18N.l('noMitarbeiterSelectedMsg')
	            });
				return false;
			}
		}
	
		that.item.set("datum", that.datum);
		
		that.item.set("bautagesberichtTyp", that.bautagesberichtTyp);
				
		if (!DigiWebApp.BautagebuchEinstellungenController.settings.inStundenBuchen) {
			// startUhrzeit anhand der frühesten Zeitbuchung ermitteln
			var myZeitbuchungen = DigiWebApp.BautagebuchZeitbuchung.find({query:{
				  identifier: 'bautagesberichtId'
				, operator: '='
				, value: that.tem.get("id")
			}});
			var earliestTimestamp = null;
			_.each(myZeitbuchungen, function(z) {
				var zVonTimestamp = D8.create(DigiWebApp.BautagebuchBautagesberichtDetailsController.datum + " " + z.get("von")).getTimestamp();
				if (!earliestTimestamp || earliestTimestamp > zVonTimestamp) {
					earliestTimestamp = zVonTimestamp;
				}
			});
			that.set("startUhrzeit", D8.create(earliestTimestamp).format("HH:mm"));
		}
		that.item.set("startUhrzeit", that.startUhrzeit);

		that.item.set("projektleiterId", that.projektleiterId);
		
		that.item.set("orderId", that.auftragsId);
		that.item.set("orderName", that.auftragsName);
		
		that.item.set("handOrderId", that.handOrderId);
		that.item.set("handOrderName", that.handOrderName);

		if (M.ViewManager.getView('bautagebuchBautagesberichtDetailsPage', 'positionComboBox').getSelection() !== "0" ) {
			that.item.set("positionId", that.positionId);
			that.item.set("positionName", that.positionName);
		}
		
		that.item.set("selektierteMitarbeiter", that.mitarbeiterIds);

		that.item.set("temperatur", that.wetter.temperatur);
		that.item.set("luftfeuchtigkeit", that.wetter.luftfeuchtigkeit);
		that.item.set("bewoelkung", that.wetter.bewoelkung);
		that.item.set("niederschlag", that.wetter.niederschlag);
		that.item.set("wind", that.wetter.wind);
		that.item.set("wechselhaft", that.wetter.wechselhaft);
		
		if (that.item.saveSorted()) {		
			DigiWebApp.BautagebuchBautagesberichteListeController.set("items", DigiWebApp.BautagebuchBautagesbericht.findSorted());
			if (typeof(successcallback) === "function") successcallback();
			return true;
		} else {
			if (typeof(errorcallback) === "function") errorcallback();
			return false;
		}
	}
	
	, deleteBautagesbericht: function(successCallback, errorCallback, skipQuestion) {
		var that = this;
		if (skipQuestion) {
			that.item.deleteSorted(function() {
				DigiWebApp.BautagebuchBautagesberichteListeController.set("items", DigiWebApp.BautagebuchBautagesbericht.findSorted());
				if (typeof(successCallback) === "function") successCallback();
			});
		} else {
			DigiWebApp.ApplicationController.nativeConfirmDialogView({
	      	  title: M.I18N.l('deleteLabel')
		        , message: M.I18N.l('wirklichLoeschenMsg')
	            , confirmButtonValue: M.I18N.l('yes')
	    		, cancelButtonValue: M.I18N.l('no')
	    		, callbacks: {
	        		  confirm: {
	            		  target: this
	            		, action: function() {
	            			that.item.deleteSorted(function() {
	            				DigiWebApp.BautagebuchBautagesberichteListeController.set("items", DigiWebApp.BautagebuchBautagesbericht.findSorted());
	            				if (typeof(successCallback) === "function") successCallback();
	            			});
						}
	        		}
	        		, cancel: {
	            		  target: this
	            		, action: function() {
		        			return true;
	    				}
	        		}
	    		}
			});
		}
	}

	, finish: function(successcallback, errorcallback) {
		var that = this;
		if (that.save()) {
			DigiWebApp.BautagebuchZusammenfassungController.load(that.item);
			DigiWebApp.NavigationController.toBautagebuchZusammenfassungPageTransition();
			if (typeof(successcallback) === "function") successcallback();
			return true;
		} else {
			if (typeof(errorcallback) === "function") errorcallback();
			return false;
		}
	}

	, setPositionen: function(auftragsId) {
		var that = this;
		if (typeof(auftragsId) === "undefined") {
			return false;
		} else {
			// verfügbare Positionen kopieren und ausgewähltes selektieren
			var itemSelected = NO;
		    var positionenArray = _.map(DigiWebApp.Position.find(), function(pos) {
		    	if ( typeof(pos) === "undefined" ) {
		    		console.log("UNDEFINED Position");
		    	} else {
		    		if (parseIntRadixTen(pos.get('orderId')) == parseIntRadixTen(auftragsId)) {
		    			var obj = { label: pos.get('name'), value: pos.get('id'), isSelected: NO };
			    		if (parseIntRadixTen(pos.get('id')) == parseIntRadixTen(that.item.get("positionId"))) {
			    			obj.isSelected = YES;
			    			itemSelected = YES;
			    			that.set('positionId', pos.get('id'));
			    			that.set('positionName', pos.get('name'));
			    		}
		    			return obj;
		    		}
		    	}
		    });
		    positionenArray = _.compact(positionenArray);
		    if (!itemSelected && auftragsId && positionenArray.length > 0) {
		    	positionenArray[0].isSelected = YES;
    			that.set('positionId', positionenArray[0].value);
    			that.set('positionName', positionenArray[0].label);
		    }
		    that.set("positionenList", positionenArray);
		}
	}
	
	, setStartUhrzeit: function() {
  		if (DigiWebApp.BautagebuchBautagesberichtDetailsController.startUhrzeit) {
  			$('#'+DigiWebApp.BautagebuchBautagesberichtDetailsPage.content.startUhrzeitContainer.startUhrzeitGrid.stundeFeld.id)[0].value = parseIntRadixTen(DigiWebApp.BautagebuchBautagesberichtDetailsController.startUhrzeit.split(":")[0]).padLeft(2,"0");
  			$('#'+DigiWebApp.BautagebuchBautagesberichtDetailsPage.content.startUhrzeitContainer.startUhrzeitGrid.minuteFeld.id)[0].value = parseIntRadixTen(DigiWebApp.BautagebuchBautagesberichtDetailsController.startUhrzeit.split(":")[1]).padLeft(2,"0");
  		}
	}
});
