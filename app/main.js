"use strict";

// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: DigiWebApp 
// ==========================================================================


if (!window.console) {
	window.console = {
		log: function(a) {}
	};
} else {
	if (window.console.logLevel) {
		window.console.logLevel = 3;
	}
}


window.newAppVersionAvailable = NO;

M.Application.useTransitions = NO;

var DigiWebApp  = DigiWebApp || {};

function writeToLog(myWriteContent, successCallback, errorCallback) {		
	
	if (typeof(successCallback) !== "function") successCallback = function(){};
	if (typeof(errorCallback) !== "function") errorCallback = function(){};

	var now = new Date();
	var writeContent = "";
	if (typeof(myWriteContent) === "string") {
		writeContent = myWriteContent;
	} else {
		writeContent = JSON.stringify(myWriteContent);
	}
	writeContent = new String("\n----------------------------------------------------------\n" + now.getFullYear() + "-" + ("0" + (now.getMonth() + 1)).slice(-2) + "-" + ("0" + now.getDate()).slice(-2) + " " + ("0" + now.getHours()).slice(-2) + ":" + ("0" + now.getMinutes()).slice(-2) + ":" + ("0" + now.getSeconds()).slice(-2) + "." + ("0" + now.getMilliseconds()).slice(-2) + " " + writeContent + "\n");
	
	var fileName = now.getFullYear() + "-" + ("0" + (now.getMonth() + 1)).slice(-2) + "-" + ("0" + now.getDate()).slice(-2) + "_DIGI-WebApp.log.txt";
		
	// check if LocalFileSystem is defined
	if (typeof window.requestFileSystem === "undefined") {
		//console.error("writeToLog: no LocalFileSystem available");
		//alert("writeToLog: no LocalFileSystem available");
		successCallback("");
        return true;
    }

	try {
		var myQuota = DigiWebApp.ApplicationController.CONSTApplicationQuota;
	    // open filesystem
		if (typeof(navigator.webkitPersistentStorage) !== "undefined") {
			navigator.webkitPersistentStorage.requestQuota(myQuota, function(grantedBytes) {
			    window.requestFileSystem(PERSISTENT, grantedBytes, function(fileSystem) {
			    	
			    	// get dataDirectory from filesystem (create if not exists)
			    	fileSystem.root.getDirectory("DIGIWebAppLogs", {create: true, exclusive: false}, function(dataDirectory) {
			
				    	// get fileEntry from filesystem (create if not exists)
				    	dataDirectory.getFile(fileName, {create: true, exclusive: false}, function(fileEntry) {
			
				    		fileEntry.createWriter(function(writer) {
				    				
				    			writer.onerror = function(evt) {
				    				//console.error("writeError", evt);
				    				errorCallback(evt);
				    			};
				    			
				    			writer.onwriteend = function(evt) {
					    			//writer.onwriteend = function(ev) {
				    					successCallback(ev);
					    			//};
				    				//writer.truncate(writeContent.length);
				    	        };
				    	        // Create a new Blob and write it to log.txt.
				    	        var blob = new Blob([writeContent], {type: 'text/plain'});
				    	        
				    	        writer.seek(writer.length);
			    	        	writer.write(blob);
			
				    		}, errorCallback); // fileEntry.createWriter
				   		}, errorCallback);     // dataDirectory.getFile
				   	}, errorCallback);         // fileSystem.root.getDirectory
			    }, errorCallback);             // window.requestFileSystem
			}, function(e) {
				  console.error('Error while requesting Quota', e);
  		            DigiWebApp.ApplicationController.nativeAlertDialogView({
		                title: M.I18N.l('error')
		              , message: M.I18N.l('errorWhileRequestingQuota') + ": " + err
		            });	    		        					
			});

		} else {
	    
		    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem) {
		    	
		    	// get dataDirectory from filesystem (create if not exists)
		    	fileSystem.root.getDirectory("DIGIWebAppLogs", {create: true, exclusive: false}, function(dataDirectory) {
		
			    	// get fileEntry from filesystem (create if not exists)
			    	dataDirectory.getFile(fileName, {create: true, exclusive: false}, function(fileEntry) {
		
			    		fileEntry.createWriter(function(writer) {
			    				
			    			writer.onerror = function(evt) {
			    				//console.error("writeError", evt);
			    				errorCallback(evt);
			    			};
			    			
			    			writer.onwriteend = function(evt) {
				    			//writer.onwriteend = function(ev) {
			    					successCallback(ev);
				    			//};
			    				//writer.truncate(writeContent.length);
			    	        };
			    	        
			    	        writer.seek(writer.length);
		    	        	writer.write(writeContent.toString());
		
			    		}, errorCallback); // fileEntry.createWriter
			   		}, errorCallback);     // dataDirectory.getFile
			   	}, errorCallback);         // fileSystem.root.getDirectory
		    }, errorCallback);             // window.requestFileSystem
		}
	} catch(e) {
		errorCallback(e);
	}

}


 function trackError(ex) {
//	var exceptionAlert = "";
//	//exceptionAlert = "Es trat leider eine unbehandelte Ausnahme auf:" + "\n\n";
//	try {
//		if (ex.indexOf("Line Number: 0") !== -1) {
//			return true;
//		}
//	} catch(e) {
//	}
//	if (typeof(ex.message === "undefined")) {
//		exceptionAlert = exceptionAlert + "'" + ex + "'";
//	} else {
//		exceptionAlert = exceptionAlert + "'" + ex.message + "'";
//	}
//	if (typeof(ex.stack) !== "undefined") {
//		exceptionAlert = exceptionAlert + "\n" + ex.stack.split("\n")[1];
//	} else if (typeof(ex.lineNumber) !== "undefined") {
//		if (ex.lineNumber === "0" || ex.lineNumber === 0) {
//			return true;
//		}
//		exceptionAlert = exceptionAlert + " at " + ex.lineNumber;
//	} else if (typeof(ex.line) !== "undefined") {
//		if (ex.line === "0" || ex.line === 0) {
//			return true;
//		}
//		exceptionAlert = exceptionAlert + " at " + ex.line;
//	}
//	exceptionAlert = exceptionAlert + "\n\n" + "Bitte melden Sie dies bei DIGI-Zeiterfassung GmbH, damit dieser Fehler behoben werden kann." + "\n\n" + "Herzlichen Dank!";
//	alert(exceptionAlert);
	
	try {
		if (typeof(ex) === "string") {
			var logText = "Exception " + ex;
			writeToLog(logText);
		} else {
			var logText = "Exception " + ex.name + ": " + ex.message + "\nStack: " + ex.stack;
			writeToLog(logText);
		}
	 
		console.log(ex);
		if (typeof(ex.stack) !== "undefined") {
			console.log(ex.stack);
		}

	} catch(ex) {}
	
	return true;

}

window.onerror = function (msg, url, line) {
	writeToLog('window.onerror: ' + msg + '\nURL: ' + url + '\nLine Number: ' + line);
	return true;
}


//override jQuery.fn.bind to wrap every provided function in try/catch
var jQueryBind = jQuery.fn.bind;
jQuery.fn.bind = function( type, data, fn ) {
	if ( !fn && data && typeof data == 'function' ) {
		fn = data;
		data = null;
	}
	if ( fn ) {
		var origFn = fn;
		var wrappedFn = function() { 
			try {
				//console.log("jQuery.fn.bind: applying function for type '" + type + "'");
				origFn.apply( this, arguments );
			} catch ( ex ) {
				trackError( ex );
				// re-throw ex iff error should propogate
				//throw ex;
			}
		};
		fn = wrappedFn;
	}
	return jQueryBind.call( this, type, data, fn );
};



// reloading app one more time
if (typeof(localStorage) !== "undefined") {
	var reloadAppOneMoreTime = localStorage.getItem("reloadAppOneMoreTime");
	if (reloadAppOneMoreTime !== null) {
		localStorage.removeItem("reloadAppOneMoreTime");
		if (window.applicationCache) {
			if (window.applicationCache.status == window.applicationCache.UPDATEREADY) {
				window.applicationCache.swapCache();
			}
		}
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

$(window).bind('load', function(e) {
	//console.log("window onload event");
	if (window.applicationCache) {
		$(window.applicationCache).bind('updateready', function(e) {
			if (window.applicationCache.status == window.applicationCache.UPDATEREADY) {
				console.log("Browser downloaded a new app cache");
				window.newAppVersionAvailable = YES;
				if (confirm(M.I18N.l('applicationUpdateAvailableMsg'))) { 
					// Swap it in and reload the page to get the new hotness.
					try {
						window.applicationCache.swapCache();
						if (typeof(localStorage) !== "undefined") {
							localStorage.setItem("reloadAppOneMoreTime", "true");
						}
						if (typeof(navigator.app) !== "undefined") {
							if (typeof(location.origin) !== "undefined") {
								navigator.app.loadUrl(location.origin + location.pathname);					
							} else {
								navigator.app.loadUrl(location.protocol + '//' + location.pathname);
							}
						} else {
							window.location.reload();
						}
					} catch(ex) {
						console.log(ex);
					}
				} else {
					DigiWebApp.NavigationController.toSplashViewPageTransition();
					DigiWebApp.NavigationController.toDashboardPage();
				}
			} else {
				// Manifest didn't changed. Nothing new to server.
			}
		});
	} else {
		//console.log("!!!!!! no window.applicationCache !!!!!!")
	}
});

function searchForFeature(featureId) {
    for (var i = 0; i < localStorage.length; i++) {
        var k = localStorage.key(i);
        regexResult = new RegExp('^' + M.LOCAL_STORAGE_PREFIX + M.Application.name + M.LOCAL_STORAGE_SUFFIX + 'Features_').exec(k);
        if (regexResult) {
            var record = JSON.parse(localStorage.getItem(k));
        	if (featureId.toString() === record.id.toString()) {
        		return (record.isAvailable.toString() === "true");
        	}
        }
    }
    return false;    
}

// reduce pre-rendering on BlackBerry to reduce time spent on native-splash
DigiWebAppBlackBerryDesign = {

    entryPage : 'splashView',

    splashView: DigiWebApp.SplashViewPage

};

DigiWebAppOrdinaryDesign = {

      entryPage : 'splashView'

    , splashView: DigiWebApp.SplashViewPage

    , dashboard: DigiWebApp.DashboardPage

    , bookingPage: DigiWebApp.BookingPage

    , settingsPage: DigiWebApp.SettingsPage

    , settingsPasswordPage: DigiWebApp.SettingsPasswordPage

    , timeDataPage: DigiWebApp.TimeDataPage

    , employeePage: DigiWebApp.EmployeePage

    , infoPage: DigiWebApp.InfoPage
            
};

if (searchForFeature(400)) { // Camera
	DigiWebAppOrdinaryDesign.mediaListPage = DigiWebApp.MediaListPage; // für 400 & 401
	DigiWebAppOrdinaryDesign.cameraPage = DigiWebApp.CameraPage;
	DigiWebAppOrdinaryDesign.editPicturePage = DigiWebApp.EditPicturePage;
	DigiWebAppOrdinaryDesign.fileChooserPage = DigiWebApp.FileChooserPage;
}

if (searchForFeature(401)) { // Audio
	DigiWebAppOrdinaryDesign.mediaListPage = DigiWebApp.MediaListPage; // für 400 & 401
	DigiWebAppOrdinaryDesign.audioPage = DigiWebApp.AudioPage;
	DigiWebAppOrdinaryDesign.demoaudioPage = DigiWebApp.DemoAudioPage;
	DigiWebAppOrdinaryDesign.demomediaPage = DigiWebApp.DemoMediaPage;
	DigiWebAppOrdinaryDesign.fileChooserPage = DigiWebApp.FileChooserPage;
}

if (searchForFeature(402)) { // Materialerfassung
	// hat (noch) keine eigenen Views
}

if (searchForFeature(403) && !(searchForFeature(409))) { // Bemerkungsfeld
	DigiWebAppOrdinaryDesign.editTimeDataPage = DigiWebApp.EditTimeDataPage; // für 405 & 403
	DigiWebAppOrdinaryDesign.remarkPage = DigiWebApp.RemarkPage;
}

if (searchForFeature(404)) { // Button-Menü (mit Icons alá DTC6) (aktuell nur bei Scholpp; diese Freischaltung deaktiviert auch die Animationen)
	DigiWebAppOrdinaryDesign.buttonsDashboard = DigiWebApp.ButtonDashboardPage;
}

if (searchForFeature(405) && !(searchForFeature(409))) { // Unterschrift
	DigiWebAppOrdinaryDesign.editTimeDataPage = DigiWebApp.EditTimeDataPage; // für 405 & 403
}

if (searchForFeature(406) && !(searchForFeature(409))) { // Auftragsinfo
	DigiWebAppOrdinaryDesign.orderInfoPage = DigiWebApp.OrderInfoPage;
}

if (searchForFeature(407)) { // Tagescheckliste
	DigiWebAppOrdinaryDesign.studieChecklistePage = DigiWebApp.StudieChecklistePage;
}

if (searchForFeature(408)) { // Anwesenheitsliste
	DigiWebAppOrdinaryDesign.anwesenheitslistePage = DigiWebApp.AnwesenheitslistePage;
	DigiWebAppOrdinaryDesign.zeitbuchungenPage = DigiWebApp.ZeitbuchungenPage;
	DigiWebAppOrdinaryDesign.zeitbuchungDetailsPage = DigiWebApp.ZeitbuchungDetailsPage;
	DigiWebAppOrdinaryDesign.orderDetailsPage = DigiWebApp.OrderDetailsPage;
}

if (searchForFeature(409)) { // ChefTool-Only
	// hat keine eigenen Views, Buchungs-Views ausblenden
	try{delete DigiWebAppOrdinaryDesign.bookingPage;}catch(e){};
	try{delete DigiWebAppOrdinaryDesign.timeDataPage;}catch(e){};
	try{delete DigiWebAppOrdinaryDesign.employeePage;}catch(e){};
	try{delete DigiWebAppOrdinaryDesign.handOrderPage;}catch(e){};
}

if ( !(searchForFeature(410)) && !(searchForFeature(409)) ) { // Menüeintrag "Handauftrag" ausblenden
	// soll heißen, füge den View nur hinzu, wenn dieses Feature NICHT gesetzt ist.
	DigiWebAppOrdinaryDesign.handOrderPage = DigiWebApp.HandOrderPage;
}

if ( (searchForFeature(411)) && !(searchForFeature(409)) ) { // Buchungen X Tage vorhalten
	DigiWebAppOrdinaryDesign.timeDataArchivePage = DigiWebApp.TimeDataArchivePage;
}
	
if ( (searchForFeature(412)) && !(searchForFeature(409)) ) { // Bautagebuch
	DigiWebAppOrdinaryDesign.bautagebuchBautageberichteListePage = DigiWebApp.BautagebuchBautageberichteListePage;
	DigiWebAppOrdinaryDesign.bautagebuchBautageberichtDetailsPage = DigiWebApp.BautagebuchBautageberichtDetailsPage;
	DigiWebAppOrdinaryDesign.bautagebuchMaterialienListePage = DigiWebApp.BautagebuchMaterialienListePage;
	DigiWebAppOrdinaryDesign.bautagebuchMaterialienDetailsPage = DigiWebApp.BautagebuchMaterialienDetailsPage;
	DigiWebAppOrdinaryDesign.bautagebuchMedienListePage = DigiWebApp.BautagebuchMedienListePage;
	DigiWebAppOrdinaryDesign.bautagebuchMedienDetailsPage = DigiWebApp.BautagebuchMedienDetailsPage;
	DigiWebAppOrdinaryDesign.bautagebuchNotizenListePage = DigiWebApp.BautagebuchNotizenListePage;
	DigiWebAppOrdinaryDesign.bautagebuchNotizenDetailsPage = DigiWebApp.BautagebuchNotizenDetailsPage;
	DigiWebAppOrdinaryDesign.bautagebuchZeitenListePage = DigiWebApp.BautagebuchZeitenListePage;
	DigiWebAppOrdinaryDesign.bautagebuchZeitenDetailsPage = DigiWebApp.BautagebuchZeitenDetailsPage;
	DigiWebAppOrdinaryDesign.bautagebuchEinstellungenPage = DigiWebApp.BautagebuchEinstellungenPage;
	DigiWebAppOrdinaryDesign.bautagebuchWetterPage = DigiWebApp.BautagebuchWetterPage;
	DigiWebAppOrdinaryDesign.bautagebuchZusammenfassungPage = DigiWebApp.BautagebuchZusammenfassungPage;
	DigiWebAppOrdinaryDesign.fileChooserPage = DigiWebApp.FileChooserPage;
}

if ( (searchForFeature(416)) && !(searchForFeature(409)) ) { // Buchungsscreen mit Tätigkeitsicons und ButtonMenü
	DigiWebAppOrdinaryDesign.bookingPageWithIconsScholpp = DigiWebApp.BookingPageWithIconsScholpp;
}

if (searchForFeature(418)) { // Spesen/Auslöse (wird bei Feierabend abgefragt)
	DigiWebAppOrdinaryDesign.spesenPage = DigiWebApp.SpesenPage;
}

var restartOnBlackBerry = true;

if (navigator.platform === "BlackBerry" && restartOnBlackBerry) {
	if (navigator.appVersion.indexOf("Version/") !== -1) {
		// disable restartOnBlackBerry if version > 6
		var bb_version = Number(navigator.appVersion.substr(navigator.appVersion.indexOf("Version/") + 8,1));
		if (bb_version > 6) restartOnBlackBerry = false; //disable restart on newer BlackBerries
	}
}

if (navigator.platform === "BlackBerry" && restartOnBlackBerry) {
	// we will reset the design to DigiWebAppOrdinaryDesign later on in SplashViewPage.onPageshow
	DigiWebApp.app = M.Application.design(DigiWebAppBlackBerryDesign);
} else {
	DigiWebApp.app = M.Application.design(DigiWebAppOrdinaryDesign);	
};

parseBool = function(val) {
	       if (val === "YES") {
		return YES;
	} else if (val === YES) {
		return YES;
	} else if (val === "true") {
		return YES;
	} else if (val === true) {
		return YES;
	} else if (val === "NO") {
		return NO;
	} else if (val === NO) {
		return NO;
	} else if (val === "false") {
		return NO;
	} else if (val === false) {
		return NO;
	}
};