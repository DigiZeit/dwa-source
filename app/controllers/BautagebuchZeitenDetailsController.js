// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: DigiWebApp
// Controller: BautagebuchZeitenDetailsController
// ==========================================================================
// manuell var-checked
DigiWebApp.BautagebuchZeitenDetailsController = M.Controller.extend({

	  item: null

	, positionId: null // in model
	, positionName: null // in model
	, positionenList: null // runtime

	, activityId: null // in model
	, activityName: null // in model
	, activityList: null // runtime
	
	, mitarbeiterIds: null // in model
	, mitarbeiterList: null // runtime
	
	, von: "00:00" // in model
	, timeStampStart: "" // in model

	, bis: "00:00" // in model
	, timeStampEnd: "" // in model
		
	, dauer: "00:00" // in model
	, remark: ""

	, verbuchen: YES // in model

	, latitude: "" // in model
	, longitude: "" // in model
	, latitude_bis: "" // in model
	, longitude_bis: "" // in model

	, init: function(isFirstLoad) {
		//var that = this;
	}

	, load: function(myItem) {
		var that = this;
		that.set("item", myItem);
		that.set("positionId", myItem.get("positionId"));
		that.set("positionName", myItem.get("positionName"));
		that.set("activityId", myItem.get("activityId"));
		that.set("activityName", myItem.get("activityName"));
		that.set("mitarbeiterIds", JSON.parse(myItem.get("mitarbeiterIds")));
		that.set("verbuchen", myItem.get("verbuchen"));
		that.set("timeStampStart", myItem.get("timeStampStart"));
		that.set("timeStampEnd", myItem.get("timeStampEnd"));
		that.set("von", myItem.get("von"));
		that.set("bis", myItem.get("bis"));
		that.setVonBis();
		that.set("dauer", myItem.get("dauer"));
		that.setDauer();
		that.set("remark", myItem.get("remark"));
	}
	
	, save: function() {
		var that = this;
		
		var positionSelected = (M.ViewManager.getView('bautagebuchZeitenDetailsPage', 'positionComboBox').getSelection() !== "0" );
		var activitySelected = (M.ViewManager.getView('bautagebuchZeitenDetailsPage', 'activityComboBox').getSelection() !== "0" );
		var mitarbeiterSelected = (!(DigiWebApp.BautagebuchZeitenDetailsController.mitarbeiterIds === null || DigiWebApp.BautagebuchZeitenDetailsController.mitarbeiterIds.length === 0));
		
		if (!positionSelected) {
            DigiWebApp.ApplicationController.nativeAlertDialogView({
                title: M.I18N.l('noPosSelected')
              , message: M.I18N.l('noPosSelectedMsg')
            });
			return false;
		}
		if (!activitySelected) {
            DigiWebApp.ApplicationController.nativeAlertDialogView({
                title: M.I18N.l('noActSelected')
              , message: M.I18N.l('noActSelectedMsg')
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
		if (!DigiWebApp.BautagebuchEinstellungen.find()[0].get("inStundenBuchen") && !DigiWebApp.BautagebuchEinstellungen.find()[0].get("falscheZeitenIgnorieren")) {
			var myVon = D8.create("01.01.1993 " + DigiWebApp.BautagebuchZeitenDetailsController.get("von"));
			var myBis = D8.create("01.01.1993 " + DigiWebApp.BautagebuchZeitenDetailsController.get("bis"));
			if (myVon.getTimestamp() > myBis.getTimestamp()) {
				DigiWebApp.ApplicationController.nativeAlertDialogView({
	                title: M.I18N.l('wrongTimes')
	              , message: M.I18N.l('wrongTimesMsg')
	            });
				return false;
			}
		}
		that.item.set("positionId", that.positionId);
		that.item.set("positionName", that.positionName);
		that.item.set("activityId", that.activityId);
		that.item.set("activityName", that.activityName);
		that.item.set("mitarbeiterIds", JSON.stringify(that.mitarbeiterIds));
		that.item.set("verbuchen", that.verbuchen);
		that.item.set("von", that.von);
		that.item.set("timeStampStart", that.timeStampStart);
		that.item.set("bis", that.bis);
		that.item.set("timeStampEnd", that.timeStampEnd);
		that.item.set("dauer", that.dauer);
		that.item.set("remark", that.remark);
		var itemWasNew = (that.item.state == M.STATE_NEW);
		if (that.item.saveSorted()) {
			var backToListFunc = function() {
    			DigiWebApp.BautagebuchZeitenListeController.set("items", DigiWebApp.BautagebuchZeitbuchung.findSorted(DigiWebApp.BautagebuchBautageberichtDetailsController.item.m_id));
    			DigiWebApp.NavigationController.backToBautagebuchZeitenListePageTransition();
			}
			if (itemWasNew) {
	    		DigiWebApp.ApplicationController.nativeConfirmDialogView({
	          	  title: M.I18N.l('bautagebuchWeitereZeitbuchung')
			        , message: M.I18N.l('bautagebuchWeitereZeitbuchungMsg')
		            , confirmButtonValue: M.I18N.l('yes')
		      		, cancelButtonValue: M.I18N.l('no')
		      		, callbacks: {
		          		  confirm: {
		              		  target: this
		              		, action: function() {
		    					var myOldItem = JSON.parse(JSON.stringify(that.item));
		    					DigiWebApp.BautagebuchZeitenListeController.neu();
		    					that.set("positionId", myOldItem.record.positionId);
		    					that.set("positionName", myOldItem.record.positionName);
		    					//that.set("activityId", myOldItem.record.activityId);
		    					//that.set("activityName", myOldItem.record.activityName);
		    					that.setTaetigkeiten(myOldItem.record.positionId);
		    					that.set("mitarbeiterIds", JSON.parse(myOldItem.record.mitarbeiterIds));
		    					that.set("von", myOldItem.record.bis);
		    					that.set("bis", myOldItem.record.bis);
		    					that.setVonBis();
		    					that.set("dauer", "00:00");
		    					that.setDauer();
		    					that.set("remark", "");
		    					$('#' + DigiWebApp.BautagebuchZeitenDetailsPage.content.remarkInput.id)[0].value = "";
							}
		          		}
		          		, cancel: {
		              		  target: this
		              		, action: function() {
		          				backToListFunc();
			        			return true;
		      				}
		          		}
		      		}
	    		});
			} else {
				// item wurde editiert
				backToListFunc();
				return true;
			}
		} else {
			return false;
		}
	}
	
	, deleteZeitbuchung: function() {
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
							DigiWebApp.BautagebuchZeitenListeController.set("items", DigiWebApp.BautagebuchZeitbuchung.findSorted(DigiWebApp.BautagebuchBautageberichtDetailsController.item.m_id));
							DigiWebApp.NavigationController.backToBautagebuchZeitenListePageTransition();
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
	    			if (parseInt(that.activityId) === parseInt(obj.value)) {
	    				obj.isSelected = YES;
	    				itemSelected = YES;
	    			}
	    			return obj;
		    	}
		    });
		    taetigkeitenArray = _.compact(taetigkeitenArray);
		    taetigkeitenArray.push({label: M.I18N.l('selectSomething'), value: '0', isSelected: !itemSelected});
			that.set("activityList", taetigkeitenArray);
		}
	}

	, setDauer: function() {
		var that = this;
  		if (DigiWebApp.BautagebuchZeitenDetailsController.dauer) {
  			$('#'+DigiWebApp.BautagebuchZeitenDetailsPage.content.dauerContainer.dauerGrid.stundeFeld.id)[0].value = parseInt(DigiWebApp.BautagebuchZeitenDetailsController.dauer.split(":")[0]).padLeft(2,"0");
  			$('#'+DigiWebApp.BautagebuchZeitenDetailsPage.content.dauerContainer.dauerGrid.minuteFeld.id)[0].value = parseInt(DigiWebApp.BautagebuchZeitenDetailsController.dauer.split(":")[1]).padLeft(2,"0");
  		}
	}
	
	, setVonBis: function() {
		var that = this;
  		if (DigiWebApp.BautagebuchZeitenDetailsController.von) {
  			$('#'+DigiWebApp.BautagebuchZeitenDetailsPage.content.VonBisContainer.VonBisGrid.stundeVonFeld.id)[0].value = parseInt(DigiWebApp.BautagebuchZeitenDetailsController.von.split(":")[0]).padLeft(2,"0");
  			$('#'+DigiWebApp.BautagebuchZeitenDetailsPage.content.VonBisContainer.VonBisGrid.minuteVonFeld.id)[0].value = parseInt(DigiWebApp.BautagebuchZeitenDetailsController.von.split(":")[1]).padLeft(2,"0");
  		}
  		if (DigiWebApp.BautagebuchZeitenDetailsController.bis) {
  			$('#'+DigiWebApp.BautagebuchZeitenDetailsPage.content.VonBisContainer.VonBisGrid.stundeBisFeld.id)[0].value = parseInt(DigiWebApp.BautagebuchZeitenDetailsController.bis.split(":")[0]).padLeft(2,"0");
  			$('#'+DigiWebApp.BautagebuchZeitenDetailsPage.content.VonBisContainer.VonBisGrid.minuteBisFeld.id)[0].value = parseInt(DigiWebApp.BautagebuchZeitenDetailsController.bis.split(":")[1]).padLeft(2,"0");
  		}
  		if (DigiWebApp.BautagebuchZeitenDetailsController.von && DigiWebApp.BautagebuchZeitenDetailsController.bis && !DigiWebApp.BautagebuchEinstellungenController.settings.inStundenBuchen) {
  			// Dauer aktualisieren
				var myVon = D8.create("01.01.2000 " + DigiWebApp.BautagebuchZeitenDetailsController.von);
				var myBis = D8.create("01.01.2000 " + DigiWebApp.BautagebuchZeitenDetailsController.bis);
				var minutesInBetween = myVon.timeBetween(myBis, "minutes");
				var hoursInBetween = Math.floor(minutesInBetween / 60);
				var remainingMinutes = minutesInBetween % 60;
				DigiWebApp.BautagebuchZeitenDetailsController.set("dauer", hoursInBetween.padLeft(2) + ":" + remainingMinutes.padLeft(2));
				that.setDauer();
  		}
	}

});
