// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: DigiWebApp
// Controller: BautagebuchMainController
// ==========================================================================
// manuell var-checked
DigiWebApp.BautagebuchMainController = M.Controller.extend({

	  projektleiter: null
	  
	, mitarbeiter: null
	
	, auftraege: null
	
	, materialien: null
	
	, mengeneinheiten: null

	, buttonPressInterval_var: null
	
	, buttonPressInterval: 200
	
	, wetterDefaults: {
	      temperatur: 10        // -50 bis +50
		, luftfeuchtigkeit: 50  // 0% - 100%
		, bewoelkung: 0         // 0=klar , 1=mäßig , 2=bedeckt, 4=neblig
	    , niederschlag: 0       // 0=kein , 1=Niesel, 2=Regen  , 3=Graupel  , 4=Schnee, 5=Hagel
	    , wind: 0               // 0=still, 1=mäßig , 2=böig   , 3=stürmisch, 4=Orkan
	    , wechselhaft: NO       // Ja/Nein
		, wechselhaftItem: [{
	        value: 'wechselhaft'
	      , label: M.I18N.l('BautagebuchWechselhaft')
	      , isSelected: NO
		}]
	}

	, init: function(isFirstLoad) {
		var that = this;
		
		DigiWebApp.BautagebuchEinstellungenController.load();
		
//		if (DigiWebApp.BautagebuchMengeneinheit.findSorted().length === 0) {
//			var i = 1;
//			DigiWebApp.BautagebuchMengeneinheit.createRecord({id: i, bezeichnung: "Stück", kuerzel: "Stk"}).saveSorted(); i = i + 1;
//			DigiWebApp.BautagebuchMengeneinheit.createRecord({id: i, bezeichnung: "Packung", kuerzel: "Pkg"}).saveSorted(); i = i + 1;
//			DigiWebApp.BautagebuchMengeneinheit.createRecord({id: i, bezeichnung: "Karton", kuerzel: "Ktn"}).saveSorted(); i = i + 1;
//			DigiWebApp.BautagebuchMengeneinheit.createRecord({id: i, bezeichnung: "Palette", kuerzel: "Pal"}).saveSorted(); i = i + 1;
//			DigiWebApp.BautagebuchMengeneinheit.createRecord({id: i, bezeichnung: "Gramm", kuerzel: "g"}).saveSorted(); i = i + 1;
//			DigiWebApp.BautagebuchMengeneinheit.createRecord({id: i, bezeichnung: "Kilogramm", kuerzel: "kg"}).saveSorted(); i = i + 1;
//			DigiWebApp.BautagebuchMengeneinheit.createRecord({id: i, bezeichnung: "Zentner", kuerzel: "Ztr"}).saveSorted(); i = i + 1;
//			DigiWebApp.BautagebuchMengeneinheit.createRecord({id: i, bezeichnung: "Tonne", kuerzel: "t"}).saveSorted(); i = i + 1;
//			DigiWebApp.BautagebuchMengeneinheit.createRecord({id: i, bezeichnung: "Millimeter", kuerzel: "mm"}).saveSorted(); i = i + 1;
//			DigiWebApp.BautagebuchMengeneinheit.createRecord({id: i, bezeichnung: "Zentimeter", kuerzel: "cm"}).saveSorted(); i = i + 1;
//			DigiWebApp.BautagebuchMengeneinheit.createRecord({id: i, bezeichnung: "Meter", kuerzel: "m"}).saveSorted(); i = i + 1;
//			DigiWebApp.BautagebuchMengeneinheit.createRecord({id: i, bezeichnung: "Laufmeter", kuerzel: "lfm"}).saveSorted(); i = i + 1;
//			DigiWebApp.BautagebuchMengeneinheit.createRecord({id: i, bezeichnung: "Kilometer", kuerzel: "km"}).saveSorted(); i = i + 1;
//			DigiWebApp.BautagebuchMengeneinheit.createRecord({id: i, bezeichnung: "Quadratmeter", kuerzel: "qm"}).saveSorted(); i = i + 1;
//			DigiWebApp.BautagebuchMengeneinheit.createRecord({id: i, bezeichnung: "Milliliter", kuerzel: "ml"}).saveSorted(); i = i + 1;
//			DigiWebApp.BautagebuchMengeneinheit.createRecord({id: i, bezeichnung: "Deziliter", kuerzel: "dl"}).saveSorted(); i = i + 1;
//			DigiWebApp.BautagebuchMengeneinheit.createRecord({id: i, bezeichnung: "Liter", kuerzel: "l"}).saveSorted(); i = i + 1;
//			DigiWebApp.BautagebuchMengeneinheit.createRecord({id: i, bezeichnung: "Hektoliter", kuerzel: "hl"}).saveSorted(); i = i + 1;
//			DigiWebApp.BautagebuchMengeneinheit.createRecord({id: i, bezeichnung: "Kubikmeter", kuerzel: "kbm"}).saveSorted(); i = i + 1;
//		}
		
        var itemSelected = NO;
        try {

	        // Projektleiter
			var projektleiter = DigiWebApp.BautagebuchProjektleiter.find();
			if (projektleiter.length !== 0) {
	            itemSelected = NO;
	    		projektleiter = _.sortBy(projektleiter, function(m){
	    			return m.get('nachname') + ", " + m.get('vorname');
				});
	    		var myOrder = -1;
	            var projektleiterArray = _.map(projektleiter, function(o) {
	            	myOrder = myOrder + 1;
	            	if ( typeof(o) === "undefined" ) {
	            		console.log("UNDEFINED PROJEKTLEADER");
	            	} else {   
	            		try {
	            			var obj = { label: o.vollername(), value: o.get('id'), order: myOrder };
	            		} catch(e) { console.log(o); throw e;}
	//            		if(obj.value === that.selections.activity) {
	//            			obj.isSelected = YES;
	//            			itemSelected = YES;
	//            		}
	                    return obj;
	            	}
	            });
	            projektleiterArray = _.compact(projektleiterArray);
	            // push "Bitte wählen Option"
	            projektleiterArray.push({label: M.I18N.l('selectSomething'), value: '0', isSelected:!itemSelected});
	            that.set('projektleiter', projektleiterArray);
			}
			
			// Mitarbeiter
			var mitarbeiter = DigiWebApp.BautagebuchMitarbeiter.find();
			if (mitarbeiter.length !== 0) {
	            itemSelected = NO;
	    		mitarbeiter = _.sortBy(mitarbeiter, function(m){ 
					return m.get('nachname') + ", " + m.get('vorname');
				});
	    		var myOrder = -1;
	            var mitarbeiterArray = _.map(mitarbeiter, function(o) {
	            	myOrder = myOrder + 1;
	            	if ( typeof(o) === "undefined" ) {
	            		console.log("UNDEFINED WORKER");
	            	} else {  
	            		try {
	            			var obj = { label: o.vollername(), value: o.get('id'), order: myOrder};
	            		} catch(e) { console.log(o); throw e;}
	//            		if(obj.value === that.selections.activity) {
	            			obj.isSelected = NO;
	//            			itemSelected = YES;
	//            		}
	                    return obj;
	            	}
	            });
	            mitarbeiterArray = _.compact(mitarbeiterArray);
	            that.set('mitarbeiter', mitarbeiterArray);
			}
			        
			// Aufträge
	        itemSelected = NO;
			var auftraege = DigiWebApp.HandOrder.findSorted().concat(DigiWebApp.Order.findSorted());
	        var auftraegeArray = _.map(_.compact(auftraege), function(o) {
	        	if ( typeof(o) === "undefined" ) {
	        		console.log("UNDEFINED ORDER");
	        	} else {   
	        		try {
	        			var obj = { label: o.get('name'), value: o.get('id') };
            		} catch(e) { console.log(o); throw e;}
	//        		if(obj.value === that.selections.activity) {
	//        			obj.isSelected = YES;
	//        			itemSelected = YES;
	//        		}
	                return obj;
	        	}
	        });
	        auftraegeArray = _.compact(auftraegeArray);
	        // push "Bitte wählen Option"
	        auftraegeArray.push({label: M.I18N.l('selectSomething'), value: '0', isSelected:!itemSelected});
	        that.set('auftraege', auftraegeArray);
	        
			// Positionen
	        itemSelected = NO;
			var positionen = DigiWebApp.Position.findSorted();
	        var positionenArray = _.map(_.compact(positionen), function(o) {
	        	if ( typeof(o) === "undefined" ) {
	        		console.log("UNDEFINED ORDER");
	        	} else {
	        		try {
	        			var obj = { label: o.get('name'), value: o.get('id') };
	        		} catch(e) { console.log(o); throw e;}
	//        		if(obj.value === that.selections.activity) {
	//        			obj.isSelected = YES;
	//        			itemSelected = YES;
	//        		}
	                return obj;
	        	}
	        });
	        positionenArray = _.compact(positionenArray);
	        // push "Bitte wählen Option"
	        positionenArray.push({label: M.I18N.l('selectSomething'), value: '0', isSelected:!itemSelected});
	        that.set('positionen', positionenArray);
	        
			var materialienArray = [];
	        // Materialien
			if (DigiWebApp.BautagebuchMaterial.findSorted().length !== 0) {
	            itemSelected = NO;
	    		var materialien = DigiWebApp.BautagebuchMaterial.findSorted();
	            materialienArray = _.map(materialien, function(o) {
	            	if ( typeof(o) === "undefined" ) {
	            		console.log("UNDEFINED MATERIAL");
	            	} else {
	            		try {
	            			var obj = { label: o.get("bezeichnung"), value: o.get('id') };
	            		} catch(e) { console.log(o); throw e;}
	//            		if(obj.value === that.selections.activity) {
	//            			obj.isSelected = YES;
	//            			itemSelected = YES;
	//            		}
	                    return obj;
	            	}
	            });
	            materialienArray = _.compact(materialienArray);
			}
	        // push "Manuelle Eingabe"
	        materialienArray.push({label: M.I18N.l('BautagebuchManuelleEingabe'), value: '0', isSelected:!itemSelected});
	        that.set('materialien', materialienArray);
	
			var mengeneinheitenArray = [];
			// TODO Materialerfassung: Jedes Material enthält die Mengeneinheiten
	        // Mengeneinheiten
			var mengeneinheiten = DigiWebApp.BautagebuchMengeneinheit.findSorted();
			if (mengeneinheiten.length !== 0) {
	            itemSelected = NO;
	    		mengeneinheitenArray = _.map(mengeneinheiten, function(o) {
	            	if ( typeof(o) === "undefined" ) {
	            		console.log("UNDEFINED MATERIAL");
	            	} else {  
	            		try {
	            			var obj = { label: o.get("kuerzel"), value: o.get('id') };
	            		} catch(e) { console.log(o); throw e;}
	//            		if(obj.value === that.selections.activity) {
	//            			obj.isSelected = YES;
	//            			itemSelected = YES;
	//            		}
	                    return obj;
	            	}
	            });
	    		mengeneinheitenArray = _.compact(mengeneinheitenArray);
			}
	        // push "Manuelle Eingabe"
			//mengeneinheitenArray.push({label: M.I18N.l('BautagebuchManuelleEingabe'), value: '0', isSelected:!itemSelected});
			mengeneinheitenArray.push({label: M.I18N.l('selectSomething'), value: '0', isSelected:!itemSelected});
	        that.set('mengeneinheiten', mengeneinheitenArray);
	        
        } catch (e) {
        	trackError(e);
        }
                
	}

});
