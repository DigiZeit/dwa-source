// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: DigiWebApp
// Controller: RequestController
// ==========================================================================
// manuell var-checked
DigiWebApp.RequestController = M.Controller.extend({

//	  GatewayServer: 'primary.digi-gateway.de'
//	, GatewayPool: 'pool.digi-gateway.de'
//	, DatabaseServer: null
//	, DatabaseServerTimestamp: null
    
      softwareVersion: 7203

    , getDatabaseServer: function(myFunc, obj) {
    	
    	return DigiWebApp.JSONDatenuebertragungController.empfangeUrl(function(){
    		myFunc(obj);
    	});
    	
    }
    
});