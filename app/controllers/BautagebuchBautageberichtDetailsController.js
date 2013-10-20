// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: DigiWebApp
// Controller: BautagebuchBautageberichtDetailsController
// ==========================================================================
// manuell var-checked
DigiWebApp.BautagebuchBautageberichtDetailsController = M.Controller.extend({

	  item: null // model itself
	
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
		
	, init: function(isFirstLoad) {
		var that = this;
		if (isFirstLoad) {
			// setting defaults for contentBinding
			that.setWetter(DigiWebApp.BautagebuchMainController.wetterDefaults);
		}
	}
	
	, load: function(myItem) {
		var that = this;
		
		that.set("item", myItem); 
		
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
		console.log("---hier---");
		that.set("wetter.wechselhaftItem", [{
	        value: 'wechselhaft'
	      , label: M.I18N.l('BautagebuchWechselhaft')
	      , isSelected: myItem.get("wechselhaft")
		}]);		
		//console.log("vor setPositionen");
		that.setPositionen(myItem.get("orderId"));
	}

	, save: function(successcallback, errorcallback) {
		var that = this;
		
		var orderSelected = (M.ViewManager.getView('bautagebuchBautageberichtDetailsPage', 'auftragComboBox').getSelection() !== "0" );
		var projektleiterSelected = (M.ViewManager.getView('bautagebuchBautageberichtDetailsPage', 'projektleiterComboBox').getSelection() !== "0" );
		var mitarbeiterSelected = (!(DigiWebApp.BautagebuchBautageberichtDetailsController.mitarbeiterIds === null || DigiWebApp.BautagebuchBautageberichtDetailsController.mitarbeiterIds.length === 0));
		
		if (!projektleiterSelected) {
            DigiWebApp.ApplicationController.nativeAlertDialogView({
                title: M.I18N.l('noProjektleiterSelected')
              , message: M.I18N.l('noProjektleiterSelectedMsg')
            });
			return false;
		}
		if (!orderSelected) {
            DigiWebApp.ApplicationController.nativeAlertDialogView({
                title: M.I18N.l('noOrderSelected')
              , message: M.I18N.l('noOrderSelectedMsg')
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

		that.item.set("datum", that.datum);
		
		that.item.set("startUhrzeit", that.startUhrzeit);

		that.item.set("projektleiterId", that.projektleiterId);
		
		that.item.set("orderId", that.auftragsId);
		that.item.set("orderName", that.auftragsName);
		
		that.item.set("selektierteMitarbeiter", that.mitarbeiterIds);

		that.item.set("temperatur", that.wetter.temperatur);
		that.item.set("luftfeuchtigkeit", that.wetter.luftfeuchtigkeit);
		that.item.set("bewoelkung", that.wetter.bewoelkung);
		that.item.set("niederschlag", that.wetter.niederschlag);
		that.item.set("wind", that.wetter.wind);
		that.item.set("wechselhaft", that.wetter.wechselhaft);
		
		if (that.item.saveSorted()) {		
			DigiWebApp.BautagebuchBautageberichteListeController.set("items", DigiWebApp.BautagebuchBautagesbericht.findSorted());
			if (typeof(successcallback) === "function") successcallback();
			return true;
		} else {
			if (typeof(errorcallback) === "function") errorcallback();
			return false;
		}
	}
	
	, deleteBautagesbericht: function(successCallback, errorCallback) {
		var that = this;
		that.item.deleteSorted(function() {
			DigiWebApp.BautagebuchBautageberichteListeController.set("items", DigiWebApp.BautagebuchBautagesbericht.findSorted());
			if (typeof(successCallback) === "function") successCallback();
		});
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
		    that.set("positionenList", positionenArray);
		}
	}
});
