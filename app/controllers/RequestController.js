// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: DigiWebApp
// Controller: RequestController
// ==========================================================================
// manuell var-checked
DigiWebApp.RequestController = M.Controller.extend({

	  //GatewayServer: 'www.digi-gps.de'
	  GatewayServer: 'primary.digi-gateway.de'
	, GatewayPool: 'pool.digi-gateway.de'
	, DatabaseServer: null
	, DatabaseServerTimestamp: null
	// Bugfix: 3265 XML-WebService -> RESTful	
	, AuthentifizierenCode: ''
    /**
     * Object containing the success callback for the several calls
     */
    , successCallback: {}

    /**
     * Object containing the success callback for the several calls
     */
    , errorCallback: {}
    
    , softwareVersion: 6493

    , getDatabaseServer: function(myFunc, obj) {
    	
    	return DigiWebApp.JSONDatenuebertragungController(function(){
    		myFunc(obj);
    	});
    	
    	// debug-ausnahme
    	if (location.host === "localhost:8080" || DigiWebApp.SettingsController.getSetting("debugDatabaseServer")) {
    		if (location.host === "localhost:8080") {
    			DigiWebApp.RequestController.DatabaseServer = "localhost:8080";
    		} else {
    			DigiWebApp.RequestController.DatabaseServer = DigiWebApp.SettingsController.getSetting("debugDatabaseServer");
    		}
    		if (inDebug() && staticDebugging) alert(navigator.platform + ", using debugDatabaseServer " + DigiWebApp.RequestController.DatabaseServer);
    		return myFunc(obj);
    	}
    	
		if (!DigiWebApp.RequestController.DatabaseServer || (DigiWebApp.RequestController.DatabaseServerTimestamp && (DigiWebApp.RequestController.DatabaseServerTimestamp - new Date().getTime() > 60000))) {
		  	// get it ...
	    	console.log("getDatabaseServer");
		} else {
			// use previously fetched DatabaseServer
			return myFunc(obj);
		}
		
		// for debugging:
    	//DigiWebApp.RequestController.DatabaseServer = "vespasian.digi-zeitserver.de";
    	DigiWebApp.RequestController.DatabaseServer = "";
    	
    	var myGatewayServer = DigiWebApp.RequestController.GatewayServer;
    	    	
    	if (typeof(device) === "undefined") {
    		myGatewayServer = location.host;
    	}

    	var successFunc = function(data, msg, xhr) {
    		//console.log(data);
			DigiWebApp.ApplicationController.DigiLoaderView.hide();
	    	if (data !== null) {
	    		var objEmpfangeUrl = data.empfangeUrl;
	    		DigiWebApp.RequestController.DatabaseServer = objEmpfangeUrl.url;
	    	} else {
	    		console.log("FALLBACK: empty DatabaseServer --> falling back to GatewayServer"); 
	    		DigiWebApp.RequestController.DatabaseServer = DigiWebApp.RequestController.GatewayServer;
	    	}
	    	DigiWebApp.RequestController.DatabaseServerTimestamp = new Date().getTime();
	    	if (typeof(device) === "undefined") {
	    		if ((location.host !== DigiWebApp.RequestController.DatabaseServer)) {
		        		DigiWebApp.ApplicationController.nativeConfirmDialogView({
			            	  title: M.I18N.l('wrongServer')
		    		        , message: M.I18N.l('wrongServerMessage')
				            , confirmButtonValue: M.I18N.l('yes')
		            		, cancelButtonValue: M.I18N.l('appZuruecksetzen')
		            		, callbacks: {
		                		  confirm: {
		                    		  target: this
		                    		, action: function() {
								    			location.href = 'http://' + DigiWebApp.RequestController.DatabaseServer + location.pathname;
		                    				}
		                			}
		                		, cancel: {
		                    		  target: this
		                    		, action: function() {
	                        					DigiWebApp.ApplicationController.deleteAllData(); 
				    							if (typeof(navigator.app) !== "undefined") {
													if (typeof(location.origin) !== "undefined") {
														navigator.app.loadUrl(location.origin + location.pathname);					
													} else {
														navigator.app.loadUrl(location.protocol + '//' + location.pathname);
													}
				    							} else {
				    								window.location.reload();
				    							}
		                    				}
		                		}
		            		}
		        		});
        		        
	    		} else {
	    			//console.log(myFunc);
					myFunc(obj);
	    		}
	    	} else {
    			//console.log(myFunc);
				myFunc(obj);
			}
        };
        
        var errorFunc = function(xhr, err) {
        	// asking primary-gateway failed --> ask gateway-pool
            DigiWebApp.RequestController.DatabaseServer = DigiWebApp.RequestController.GatewayPool;
        	var secondErrorFunc = function(xhr, err) {
            	// asking the gateway-pool also failed!
        		DigiWebApp.ApplicationController.DigiLoaderView.hide();
        		writeToLog('## getDatabaseServer ' + err);
        		DigiWebApp.ApplicationController.proceedWithLocalData("getDatabaseServer");
            };
        	var secondReceiveObj = {
        		  webservice: 'allgemein/empfangeUrl'
        		, loaderText: M.I18N.l('empfangeUrlLoader')
        		, successCallback: successFunc
        		, errorCallback: secondErrorFunc
        		, additionalQueryParameter : ''
        		, geraeteIdOverride: false
        		, modus: '0' 
        	};
        	DigiWebApp.JSONDatenuebertragungController.recieveDataWithServer(secondReceiveObj);
        };
        
    	// ask primary-gateway (or localhost if not on device)
        DigiWebApp.RequestController.DatabaseServer = myGatewayServer;
        var receiveObj = {
        		  webservice: 'allgemein/empfangeUrl'
        		, loaderText: M.I18N.l('empfangeUrlLoader')
        		, successCallback: successFunc
        		, errorCallback: errorFunc
        		, additionalQueryParameter : ''
        		, geraeteIdOverride: false
        };
		if (inDebug() && staticDebugging) alert(navigator.platform + ", RequestController.getDatabaseServer " + "vor recieveDataWithServer (primary)" + myGatewayServer);
        DigiWebApp.JSONDatenuebertragungController.recieveDataWithServer(receiveObj);
    }
    
    , myRequest: null

    /**
     * Displays a connection error alert.
     */
    , connectionError: function() {
        //M.DialogView.alert({
        DigiWebApp.ApplicationController.nativeAlertDialogView({
              title: M.I18N.l('connectionError')
            , message: M.I18N.l('connectionErrorMsg')
        });
    }
});