// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: DigiWebApp
// Controller: AnwesenheitslisteController
// ==========================================================================
//var-checked
DigiWebApp.AnwesenheitslisteController = M.Controller.extend({

	  items: null
	
	, init: function(isFirstLoad) {
		var that = DigiWebApp.AnwesenheitslisteController;
		if (that.items === null) {
			DigiWebApp.RequestController.getDatabaseServer(DigiWebApp.AnwesenheitslisteController.initWithServer, isFirstLoad);
		} else {
			DigiWebApp.AnwesenheitslisteController.initWithServer(isFirstLoad);
		}
	}

    , initWithServer: function(isFirstLoad) {
    	var that = DigiWebApp.AnwesenheitslisteController;
		if (that.items === null) {
			//console.log("Anwesenheitsliste: showing Loader");		
			DigiWebApp.ApplicationController.DigiLoaderView.show(M.I18N.l('AnwesenheitslisteLaden'));

			//console.log("Anwesenheitsliste: find --> request");		
			DigiWebApp.Anwesenheitsliste.find({
	              urlParams: {}
	            , callbacks: {
	                success: {
	                      action: function(records) {
	            			DigiWebApp.ApplicationController.DigiLoaderView.hide();
	                        if(records && records.length === 0) {
	                    		//console.log("Anwesenheitsliste: error length==0");		
	            		        DigiWebApp.ApplicationController.nativeAlertDialogView({
	            		              title: M.I18N.l('error')
	            		            , message: M.I18N.l('AnwesenheitslisteKonnteNichtGeladenWerden')
	            		            , callbacks: {
	            		                confirm: {
	            		                      target: that
	            		                    , action: function () {
				            					if (DigiWebApp.SettingsController.featureAvailable('404')) {
				            						DigiWebApp.NavigationController.backToButtonDashboardPageFlipTransition();
				            					} else {
			        		        				DigiWebApp.NavigationController.backToDashboardPageFlipTransition();
				            					}
	            		                    }
	            		                }
	            		            }
	            		        });
	                        } else {
	                    		//console.log("Anwesenheitsliste: success");		
	                        	DigiWebApp.AnwesenheitslisteController.set('items', records);
	                        }
	                    }
	                }
	                , error: {
	                    action: function(request, error) {
	        				DigiWebApp.ApplicationController.DigiLoaderView.hide();
	                		//console.log("Anwesenheitsliste: error request failed");		
	        		        DigiWebApp.ApplicationController.nativeAlertDialogView({
	        		              title: M.I18N.l('error')
	        		            , message: M.I18N.l('AnwesenheitslisteKonnteNichtGeladenWerden')
	        		            , callbacks: {
	        		                confirm: {
	        		                      target: that
	        		                    , action: function () {
			            					if (DigiWebApp.SettingsController.featureAvailable('404')) {
			            						DigiWebApp.NavigationController.backToButtonDashboardPageFlipTransition();
			            					} else {
			    		        				DigiWebApp.NavigationController.backToDashboardPageFlipTransition();
			            					}
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

});
