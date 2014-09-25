// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: DigiWebApp
// Controller: ZeitbuchungenController
// ==========================================================================

DigiWebApp.ZeitbuchungenController = M.Controller.extend({

	  items: null
	 
	, itemForDetails: null
		
	, datum: null
	
	, mitarbeiterID: null
	
	, mitarbeiterNameVorname: null
	
	, backFunction: DigiWebApp.NavigationController.backToAnwesenheitslistePageTransition
	
	, init: function(isFirstLoad) {
		DigiWebApp.VorZurueckTabBar.setActiveTab(DigiWebApp.VorZurueckTabBar.tabItemDayToShow);
		var that = DigiWebApp.ZeitbuchungenController;
		if(that.items === null) {
			DigiWebApp.RequestController.getDatabaseServer(DigiWebApp.ZeitbuchungenController.initWithServer, isFirstLoad);
		} else {
			DigiWebApp.ZeitbuchungenController.initWithServer(isFirstLoad);
		}
	}

    , initWithServer: function(isFirstLoad) {
		var that = DigiWebApp.ZeitbuchungenController;
		if(that.items === null) {
			//console.log("Zeitbuchungen: showing Loader");		
			DigiWebApp.ApplicationController.DigiLoaderView.show(M.I18N.l('ZeitbuchungenLaden'));

			//console.log("Zeitbuchungen: find --> request");		
			DigiWebApp.Zeitbuchungen.find({
	              urlParams: {
					  datum: DigiWebApp.ZeitbuchungenController.datum
					, mitarbeiterID: DigiWebApp.ZeitbuchungenController.mitarbeiterID
				}
	            , callbacks: {
	                  success: {
	                    action: function(records) {
							//console.log(records);
	            			DigiWebApp.ApplicationController.DigiLoaderView.hide();
	            			try {
		                        if ((!records) || (records && records.length === 0) || (records && records.length === 1 && (typeof(records[0].get('mitarbeiterId')) === "undefined" || records[0].get('mitarbeiterId') == null))) {
		                        	DigiWebApp.ZeitbuchungenController.set('items', []);
		                        } else {
		                        	DigiWebApp.ZeitbuchungenController.set('items', records);
		                        }
	            			} catch(e2) {
	            		        DigiWebApp.ApplicationController.nativeAlertDialogView({
	            		              title: M.I18N.l('error')
	            		            , message: M.I18N.l('ZeitbuchungenKonntenNichtGeladenWerden')
	            		            , callbacks: {
	            		                confirm: {
	            		                    target: this,
	            		                    action: function () {
	            		        				//DigiWebApp.NavigationController.backToAnwesenheitslistePageTransition();
	            		        				//history.back();
	            		        				this.backFunction();
	            		                    }
	            		                }
	            		            }
	            		        });
	            			}
	                    }
	                }
	                , error: {
	                    action: function(request, error) {
	        				DigiWebApp.ApplicationController.DigiLoaderView.hide();
	                		//console.log("Zeitbuchungen: error request failed");		
	        		        DigiWebApp.ApplicationController.nativeAlertDialogView({
	        		              title: M.I18N.l('error')
	        		            , message: M.I18N.l('ZeitbuchungenKonntenNichtGeladenWerden')
	        		            , callbacks: {
	        		                confirm: {
	        		                      target: this
	        		                    , action: function () {
		        							//DigiWebApp.NavigationController.backToAnwesenheitslistePageTransition();
					        				//history.back();
					        				this.backFunction();
	        		                    }
	        		                }
	        		            }
	        		        });
	                    }
	                }
	            }
	        });    	
        }

		if (DigiWebApp.ZeitbuchungenController.mitarbeiterNameVorname !== null) { 
			//DigiWebApp.ZeitbuchungenPage.header.title.set("value", M.I18N.l('Zeitbuchungen') + ": " + DigiWebApp.ZeitbuchungenController.mitarbeiterNameVorname);
			var wochentag = "";
			try {
				wochentag = M.I18N.l(D8.create(DigiWebApp.ZeitbuchungenController.datum).format("dddd")).substring(0,2) + ', ';
			} catch(e2) {
				wochentag = "";
			}
			DigiWebApp.ZeitbuchungenPage.header.title.set("value", DigiWebApp.ZeitbuchungenController.mitarbeiterNameVorname + '<br />' + wochentag + DigiWebApp.ZeitbuchungenController.datum);
			DigiWebApp.ZeitbuchungenPage.header.title.renderUpdate();
		}
		
    }

});
