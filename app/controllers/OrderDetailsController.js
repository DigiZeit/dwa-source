// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: DigiWebApp
// Controller: OrderDetailsController
// ==========================================================================
// manuell var-checked
DigiWebApp.OrderDetailsController = M.Controller.extend({

	  positionForDetails: null
	  
	, loadedPosition: null
	
	, init: function(isFirstLoad) {
		var that = DigiWebApp.OrderDetailsController;
		if (that.items === null) {
			DigiWebApp.RequestController.getDatabaseServer(that.initWithServer, isFirstLoad);
		} else {
			that.initWithServer(isFirstLoad);
		}
	}

    , initWithServer: function(isFirstLoad) {
    	var that = DigiWebApp.OrderDetailsController;
		if (that.positionForDetails === null) {
			//console.log("Anwesenheitsliste: showing Loader");		
			DigiWebApp.ApplicationController.DigiLoaderView.show(M.I18N.l('positionLaden'));

			//console.log("Anwesenheitsliste: find --> request");		
			DigiWebApp.OnlinePosition.find({
	              urlParams: {}
	            , callbacks: {
	                  success: {
	                    action: function(records) {
	            			DigiWebApp.ApplicationController.DigiLoaderView.hide();
	                        if ((records && records.length === 0) || (parseInt(DigiWebApp.ZeitbuchungenController.itemForDetails.get("positionsId")) === 0)) {
	                    		//console.log("Anwesenheitsliste: error length==0");		
	            		        DigiWebApp.ApplicationController.nativeAlertDialogView({
	            		              title: M.I18N.l('error')
	            		            , message: M.I18N.l('positionKonnteNichtGeladenWerden')
	            		            , callbacks: {
	            		                confirm: {
	            		                      target: that
	            		                    , action: function () {
	            		        				DigiWebApp.NavigationController.backToZeitbuchungDetailsPageTransition();
	            		                    }
	            		                }
	            		            }
	            		        });
	                        } else {
	                    		//console.log("Anwesenheitsliste: success");		
	                        	that.set('loadedPosition', records);
	                        	that.setItem();
	                        }
	                    }
	                }
	                , error: {
	                    action: function(request, error) {
	        				DigiWebApp.ApplicationController.DigiLoaderView.hide();
	                		//console.log("Anwesenheitsliste: error request failed");		
	        		        DigiWebApp.ApplicationController.nativeAlertDialogView({
	        		              title: M.I18N.l('error')
	        		            , message: M.I18N.l('positionKonnteNichtGeladenWerden')
	        		            , callbacks: {
	        		                confirm: {
	        		                      target: that
	        		                    , action: function () {
		        							DigiWebApp.NavigationController.backToZeitbuchungDetailsPageTransition();
	        		                    }
	        		                }
	        		            }
	        		        });
	                    }
	                }
	            }
	        });    	
        }
		
    }
    
    , setItem: function() {
    	var that = DigiWebApp.OrderDetailsController;
        var item_empty = { 
        		  orderName: ''
        		, positionName: ''
            	, positionStrasse: ''
            	, positionHausnummer: ''
            	, positionPLZ: ''
            	, positionOrt: ''
                , positionLand: ''
            	, positionStrasseUndHausnummer: '' 
            	, positionPLZundOrt: ''
        		, positionCountryCode: ''
        		, positionTelefon: ''
        		, positionFax: ''
        		, positionEmail: ''
        		, positionAnsprechpartner: ''
        		, positionKundenname: ''
        		, positionLongitude: ''
        		, positionLatitude: ''
        		, positionBeschreibung: ''
        	};
        var item = item_empty;
        	item.orderName = that.loadedPosition[0].get('auftragsBezeichnung');
			item.positionName = that.loadedPosition[0].get('positionsBezeichnung');
			item.positionStrasse = that.loadedPosition[0].get('strasse');
			item.positionHausnummer = that.loadedPosition[0].get('hausnummer');
			item.positionPLZ = that.loadedPosition[0].get('plz');
			item.positionOrt = that.loadedPosition[0].get('ort');
			item.positionLand = that.loadedPosition[0].get('land');
			item.positionTelefon = that.loadedPosition[0].get('telefon');
			item.positionFax = that.loadedPosition[0].get('fax');
			item.positionEmail = that.loadedPosition[0].get('email');
			item.positionAnsprechpartner = that.loadedPosition[0].get('ansprechpartner');
			item.positionKundenname = that.loadedPosition[0].get('kundenname');
			item.positionLongitude = that.loadedPosition[0].get('longitude');
			item.positionLatitude = that.loadedPosition[0].get('latitude');
			item.positionBeschreibung = that.loadedPosition[0].get('positionsBeschreibung');
			item.positionCountryCode = that.loadedPosition[0].get('countrycode');
			item.positionPLZundOrt = item.positionPLZ + " " + item.positionOrt;
			item.positionStrasseUndHausnummer = item.positionStrasse + " " + item.positionHausnummer;

		if (item.orderName === '' && item.positionName === '') {
			that.set('positionForDetails', []);
		} else {
			that.set('positionForDetails', [item]);
		}
//		if (   DigiWebApp.OrderDetailsController.positionForDetails[0].positionLongitude === "0.0"
//			&& DigiWebApp.OrderDetailsController.positionForDetails[0].positionLatitude  === "0.0"
//		) {
//			
//		}
    }

});
