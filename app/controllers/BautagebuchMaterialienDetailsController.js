// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: DigiWebApp
// Controller: BautagebuchMaterialienDetailsController
// ==========================================================================
// manuell var-checked
DigiWebApp.BautagebuchMaterialienDetailsController = M.Controller.extend({

	  item: null
	 
	, auftragId: null // runtime
	, auftragName: null // runtime
	, auftraegeList: null // runtime

	, positionId: null // in model
	, positionName: null // in model
	, positionenList: null // runtime

	, activityId: null // in model
	, activityName: null // in model
	, activityList: null // runtime
	
	, materialId: null // in model
	, materialienList: null // runtime
	, artikel: null // in model
	
	, mengeneinheitId: null // in model
	, mengeneinheitenList: null // runtime
	, einheit: null // in model
	
	, materialgruppeId: null // in model
	, materialgruppeBezeichnung: null // runtime
	, materialgruppenList: null // runtime

	, materialtypId: null // in model
	, materialtypBezeichnung: null // runtime
	, materialtypenList: null // runtime

	, herstellerId: null // in model
	, herstellerBezeichnung: null // runtime
	, herstellerList: null // runtime

	, lieferantId: null // in model
	, lieferantBezeichnung: null // runtime
	, lieferantenList: null // runtime

	, menge: null // in model
	  	
	, getMaterialFilterObj: function() {
		var that = this;
		return {
			  lieferantId: that.lieferantId
			, herstellerId: that.herstellerId
			, materialgruppeId: that.materialgruppeId
			, materialtypId: that.materialtypId
		}
	}

	, init: function(isFirstLoad) {
		//var that = this;
	}

	, load: function(myItem) {
		var that = this;
		that.set("item", myItem);
		//console.log(myItem);
		var myPosition = _.filter(DigiWebApp.Position.findSorted(), function(position) {
			return (position.get('id') == myItem.get("positionId"));
		})[0];
		var myAuftrag = _.filter(DigiWebApp.HandOrder.findSorted().concat(DigiWebApp.Order.findSorted()), function(auftrag) {
			if (myItem.get("handOrderId") && myItem.get("handOrderId").length > 0) {
				return (auftrag.get('id') == myItem.get('handOrderId'));
			} else {
				return (auftrag.get('id') == myPosition.get('orderId'));
			}
		})[0];
		var myAuftragId = myAuftrag.get('id');
		var myAuftragName = myAuftrag.get('name');
		that.set("auftragId", myAuftragId);
		that.set("auftragName", myAuftragName);
		that.set("handOrderId", myItem.get("handOrderId"));
		that.set("handOrderName", myItem.get("handOrderName"));
		that.set("positionId", myItem.get("positionId"));
		that.set("positionName", myItem.get("positionName"));
		that.set("activityId", myItem.get("activityId"));
		that.set("activityName", myItem.get("activityName"));
		that.set("materialId", myItem.get("materialId"));
		that.set("materialgruppeId", myItem.get("materialgruppeId"));
		that.set("materialtypId", myItem.get("materialtypId"));
		that.set("lieferantId", myItem.get("lieferantId"));
		that.set("herstellerId", myItem.get("herstellerId"));
		that.set("artikel", myItem.get("artikel"));
		that.set("menge", myItem.get("menge"));
		that.setTaetigkeiten(myItem.get("positionId"));
	}
	
	, save: function() {
		var that = this;

		var positionSelected = (M.ViewManager.getView('bautagebuchMaterialienDetailsPage', 'positionComboBox').getSelection() !== "0" );
		if (!positionSelected) {
            DigiWebApp.ApplicationController.nativeAlertDialogView({
                title: M.I18N.l('noPosSelected')
              , message: M.I18N.l('noPosSelectedMsg')
            });
			return false;
		}
		
		//var activitySelected = (M.ViewManager.getView('bautagebuchMaterialienDetailsPage', 'activityComboBox').getSelection() !== "0" );
		//if (!activitySelected) {
        //    DigiWebApp.ApplicationController.nativeAlertDialogView({
        //        title: M.I18N.l('noActSelected')
        //      , message: M.I18N.l('noActSelectedMsg')
        //    });
		//	return false;
		//}
		
		if (!that.artikel) {
            DigiWebApp.ApplicationController.nativeAlertDialogView({
                title: M.I18N.l('BautagebuchKeinMaterial')
              , message: M.I18N.l('BautagebuchKeinMaterialMsg')
            });
            return false;
		}
		
		if (!that.mengeneinheitId) {
            DigiWebApp.ApplicationController.nativeAlertDialogView({
                title: M.I18N.l('BautagebuchKeineEinheit')
              , message: M.I18N.l('BautagebuchKeineEinheitMsg')
            });
            return false;
		}
		
		if (!that.menge) {
            DigiWebApp.ApplicationController.nativeAlertDialogView({
                title: M.I18N.l('BautagebuchKeineMenge')
              , message: M.I18N.l('BautagebuchKeineMengeMsg')
            });
            return false;
		} else if (that.menge.indexOf(".") !== -1 && that.menge.indexOf(",") !== -1) {
            DigiWebApp.ApplicationController.nativeAlertDialogView({
                title: M.I18N.l('ungueltigeZahl')
              , message: M.I18N.l('ungueltigeZahlMsg')
            });
			return false;
		} else if (isNaN(parseFloat(that.menge))) {
            DigiWebApp.ApplicationController.nativeAlertDialogView({
                title: M.I18N.l('BautagebuchUngueltigeMenge')
              , message: M.I18N.l('BautagebuchUngueltigeMengeMsg')
            });
			return false;
		}
		

		if (M.I18N.getLanguage() === "de_de") {
			that.set("menge", that.menge.replace(",","."));
		} else if (M.I18N.getLanguage() === "en_us") {
			that.set("menge", that.menge.replace(",","."));
		} else {
			that.set("menge", that.menge.replace(",","."));
		}
		
		// jetzt noch die menge endgültig als number casten 
		that.set("menge", parseFloat(that.menge));

		if (that.handOrderId) {
			that.item.set("handOrderId", that.handOrderId);
			that.item.set("handOrderName", that.handOrderName);
			that.item.set("positionId", null);
			that.item.set("positionName", null);
		} else {
			that.item.set("handOrderId", null);
			that.item.set("handOrderName", null);
			that.item.set("positionId", that.positionId);
			that.item.set("positionName", that.positionName);
		}
		if (parseInt(that.activityId) !== 0) {
			that.item.set("activityId", that.activityId);
			that.item.set("activityName", that.activityName);
		} else {
			that.item.set("activityId", null);
			that.item.set("activityName", null);
		}
		//console.log(that.materialId);
		that.item.set("materialId", that.materialId);
		that.item.set("mengeneinheitId", that.mengeneinheitId);
		that.item.set("materialgruppeId", that.materialgruppeId);
		that.item.set("materialtypId", that.materialtypId);
		that.item.set("lieferantId", that.lieferantId);
		that.item.set("herstellerId", that.herstellerId);
		that.item.set("artikel", that.artikel);
		that.item.set("einheit", that.einheit);
		that.item.set("menge", that.menge);
		if (that.item.saveSorted()) {		
			DigiWebApp.BautagebuchMaterialienListeController.set("items", DigiWebApp.BautagebuchMaterialBuchung.findSorted(DigiWebApp.BautagebuchBautageberichtDetailsController.item.get('id')));
			DigiWebApp.NavigationController.backToBautagebuchMaterialienListePageTransition();
			return true;
		} else {
			return false;
		}
	}
	
	, deleteMaterialbuchung: function() {
		var that = this;
		DigiWebApp.ApplicationController.nativeConfirmDialogView({
      	  title: M.I18N.l('deleteLabel')
	        , message: M.I18N.l('wirklichLoeschenMsg')
          , confirmButtonValue: M.I18N.l('yes')
    		, cancelButtonValue: M.I18N.l('no')
    		, callbacks: {
        		  confirm: {
            		  target: this
            		, action: function() {
						if (that.item.deleteSorted()) {		
							DigiWebApp.BautagebuchMaterialienListeController.set("items", DigiWebApp.BautagebuchMaterialBuchung.findSorted(DigiWebApp.BautagebuchBautageberichtDetailsController.item.get('id')));
							DigiWebApp.NavigationController.backToBautagebuchMaterialienListePageTransition();
							return true;
						} else {
							return false;
						}
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
		    		if (parseInt(pos.get('orderId')) == parseInt(auftragsId)) {
		    			var obj = { label: pos.get('name'), value: pos.get('id'), isSelected: NO };
			    		if (parseInt(pos.get('id')) == parseInt(that.item.get("positionId"))) {
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

	, setTaetigkeiten: function(positionId) {
		var that = this;
		if (typeof(positionId) !== "undefined") {

			var workPlans = _.select(DigiWebApp.WorkPlan.find(), function(wp) {
	            if (wp) return wp.get('id') == positionId;
	        });

	        var itemSelected = NO;

	        /* if a workplan exists, only use those activities that are in the workplan */
	        var activities;
	        if (workPlans.length > 0) {
	            activities = DigiWebApp.SelectionController.getActivitiesFromWorkplan(workPlans[0]);
	        } else {
	            activities = DigiWebApp.SelectionController.getActivities();
	        }

			// verfügbare Tätigkeiten kopieren und ausgewähltes selektieren
		    var taetigkeitenArray = _.map(activities, function(act) {
		    	if ( typeof(act) === "undefined" ) {
		    		console.log("UNDEFINED activity");
		    	} else {
	    			var obj = { label: act.get('name'), value: act.get('id'), isSelected: NO };
	    			if (that.activityId === obj.value) {
	    				obj.isSelected = YES;
	    				itemSelected = YES;
	    			}
	    			return obj;
		    	}
		    });
		    taetigkeitenArray = _.compact(taetigkeitenArray);
		    taetigkeitenArray.push({label: M.I18N.l('selectSomethingOptional'), value: '0', isSelected: !itemSelected});
			that.set("activityList", taetigkeitenArray);
		}
	}
	
	, setLieferanten: function() {
		var relevantDetailsController = DigiWebApp.BautagebuchMaterialienDetailsController;
		var paramObj = relevantDetailsController.getMaterialFilterObj();
		paramObj.selectedId = relevantDetailsController.lieferantId;
		relevantDetailsController.set("lieferantenList", DigiWebApp.BautagebuchLieferant.getList(paramObj));
		var selectedId = _.find(relevantDetailsController.lieferantenList, function(item) { return item.isSelected; }).value;
		if (selectedId && selectedId > 0) { relevantDetailsController.set('lieferantId', selectedId); }
		//relevantDetailsController.setMaterialgruppen();
	}

	, setHersteller: function() {
		var relevantDetailsController = DigiWebApp.BautagebuchMaterialienDetailsController;
		var paramObj = relevantDetailsController.getMaterialFilterObj();
		paramObj.selectedId = relevantDetailsController.herstellerId;
		relevantDetailsController.set("herstellerList", DigiWebApp.BautagebuchHersteller.getList(paramObj));
		var selectedId = _.find(relevantDetailsController.herstellerList, function(item) { return item.isSelected; }).value;
		if (selectedId && selectedId > 0) { relevantDetailsController.set('herstellerId', selectedId); }
		//relevantDetailsController.setMaterialgruppen();
	}

	, setMaterialtypen: function() {
		var relevantDetailsController = DigiWebApp.BautagebuchMaterialienDetailsController;
		var paramObj = relevantDetailsController.getMaterialFilterObj();
		paramObj.selectedId = relevantDetailsController.materialtypId;
		relevantDetailsController.set("materialtypenList", DigiWebApp.BautagebuchMaterialtyp.getList(paramObj));
		var selectedId = _.find(relevantDetailsController.materialtypenList, function(item) { return item.isSelected; }).value;
		if (selectedId && selectedId > 0) { relevantDetailsController.set('materialtypId', selectedId); }
		relevantDetailsController.setMaterialgruppen();
	}

	, setMaterialgruppen: function() {
		var relevantDetailsController = DigiWebApp.BautagebuchMaterialienDetailsController;
		var paramObj = relevantDetailsController.getMaterialFilterObj();
		paramObj.selectedId = relevantDetailsController.materialgruppeId;
		relevantDetailsController.set("materialgruppenList", DigiWebApp.BautagebuchMaterialgruppe.getList(paramObj));
		var selectedId = _.find(relevantDetailsController.materialgruppenList, function(item) { return item.isSelected; }).value;
		if (selectedId && selectedId > 0) { relevantDetailsController.set('materialgruppeId', selectedId); }
		relevantDetailsController.setMaterialien();
	}

	, setMaterialien: function() {
		var relevantDetailsController = DigiWebApp.BautagebuchMaterialienDetailsController;
		var paramObj = relevantDetailsController.getMaterialFilterObj();
		paramObj.selectedId = relevantDetailsController.materialId;
		relevantDetailsController.set("materialienList", DigiWebApp.BautagebuchMaterial.getList(paramObj));
		var selectedId = _.find(relevantDetailsController.materialienList, function(item) { return item.isSelected; }).value;
		if (selectedId && selectedId > 0) { relevantDetailsController.set('materialId', selectedId); }
		relevantDetailsController.setMengeneinheiten();
	}

	, setMengeneinheiten: function() {
		var relevantDetailsController = DigiWebApp.BautagebuchMaterialienDetailsController;
		var MEs = null
		if (relevantDetailsController.materialId) {
			MEs = DigiWebApp.BautagebuchMaterial.getById(relevantDetailsController.materialId).getMengeneinheiten();
		} else {
			MEs = DigiWebApp.BautagebuchMengeneinheit.findSorted();
		}
		var paramObj = {items: MEs};
		if (relevantDetailsController.mengeneinheitId) {
			paramObj.selectedId = relevantDetailsController.mengeneinheitId;	
		} else if (relevantDetailsController.materialId) {
			paramObj.selectedId = DigiWebApp.BautagebuchMaterial.getById(relevantDetailsController.materialId).get('standardEinheitId');
		}
		relevantDetailsController.set("mengeneinheitenList", DigiWebApp.BautagebuchMengeneinheit.getList(paramObj));
		var selectedId = _.find(relevantDetailsController.mengeneinheitenList, function(item) { return item.isSelected; }).value;
		if (selectedId && selectedId > 0) { relevantDetailsController.set('mengeneinheitId', selectedId); }
	}
});
