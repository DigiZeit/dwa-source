
// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: DigiWebApp 
// ==========================================================================

function parseBool(val) {
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
	} else if (val > 0) {
		return YES;
	} else {
		return NO;
	}
}

function parseIntRadixTen(myString) {
	return parseInt(myString, 10);
}

function isGUID(guidString) {
	return /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(guidString);
}

// Extend Number with padLeft-Member
Number.prototype.padLeft = function (n,str) {
    return (this < 0 ? '-' : '') + 
            Array(n-String(Math.abs(this)).length+1)
             .join(str||'0') + 
           (Math.abs(this));
}

function bulkClearInterval(maxIntervalId) {
	for (var i=0; i<=maxIntervalId; i++) {
		clearInterval(i);
	}
}

window.timeoutList = new Array();
window.intervalList = new Array();

window.oldSetTimeout = window.setTimeout;
window.oldSetInterval = window.setInterval;
window.oldClearTimeout = window.clearTimeout;
window.oldClearInterval = window.clearInterval;

window.setTimeout = function(code, delay) {
    var retval = window.oldSetTimeout(code, delay);
    window.timeoutList.push(retval);
    return retval;
};
window.clearTimeout = function(id) {
    var ind = window.timeoutList.indexOf(id);
    if(ind >= 0) {
        window.timeoutList.splice(ind, 1);
    }
    var retval = window.oldClearTimeout(id);
    return retval;
};
window.setInterval = function(code, delay) {
    var retval = window.oldSetInterval(code, delay);
    window.intervalList.push(retval);
    return retval;
};
window.clearInterval = function(id) {
    var ind = window.intervalList.indexOf(id);
    if(ind >= 0) {
        window.intervalList.splice(ind, 1);
    }
    var retval = window.oldClearInterval(id);
    return retval;
};
window.clearAllTimeouts = function() {
    for(var i in window.timeoutList) {
        window.oldClearTimeout(window.timeoutList[i]);
    }
    window.timeoutList = new Array();
};
window.clearAllIntervals = function() {
    for(var i in window.intervalList) {
        window.oldClearInterval(window.intervalList[i]);
    }
    window.intervalList = new Array();
};
function addToListIfNotFoundById(list, element, id) {
	var found = _.find(list, function(el) {
		if (typeof(el.get) === "function") {
			return parseIntRadixTen(el.get("id")) === parseIntRadixTen(id);
		} else {
			return parseIntRadixTen(el.id) === parseIntRadixTen(id)
		}
	});
	if (!found) {
		list.push(element);
	}
	return list;
}

if (!window.console) {
	window.console = {
		log: function(a) {}
	};
} else {
	if (window.console.logLevel) {
		window.console.logLevel = 3;
	}
}

function toIntArray(myArray) {
	var result = [];
	if (typeof(myArray) == "object" && myArray.length > 0) {
		result = _.map(myArray, function(n) {
			var r = parseIntRadixTen(n);
			if (isNaN(r)) {
				return;
			} else {
				return r;
			}
		});
	}
	return _.compact(result);
}

function setTestLogin() {
	$('#' + DigiWebApp.SettingsPage.content.companyGrid.companyInput.id).val("312");
	$('#' + DigiWebApp.SettingsPage.content.passwordGrid.passwordInput.id).val("stuttgart11");
	$('#' + DigiWebApp.SettingsPage.content.connectionCodeGrid.connectionCodeInput.id).val("digi$");
	$('#' + DigiWebApp.SettingsPage.content.workerIdGrid.workerIdInput.id).val("1");
	DigiWebApp.SettingsController.save();
}

var newAppVersionAvailable = NO;

M.Application.useTransitions = NO;

var DigiWebApp = DigiWebApp || {app: null};

var logQueue = [];
var queueIntervalId = null;
function queuedLogWriter() {
	queueIntervalId = window.clearInterval(queueIntervalId);
	if (logQueue.length > 0) {
		var myWriteContent = logQueue.shift();
		writeToLogFromQueue(myWriteContent,  function() {
			queuedLogWriter();
		});
	} else {
		// queue is empty: check again in 500ms
		queueIntervalId = window.setInterval(queuedLogWriter, 500);
	}
}
queueIntervalId = window.setInterval(queuedLogWriter, 500);

function writeToLog(myWriteContent, mySuccessCallback, myErrorCallback) {
	
	var now = new Date();
	var writeContent = "";
	if (typeof(myWriteContent) === "string") {
		writeContent = myWriteContent;
	} else {
		writeContent = JSON.stringify(myWriteContent);
	}
	writeContent = "\n----------------------------------------------------------\n" 
	+ now.getFullYear() + "-" + ("0" + (now.getMonth() + 1)).slice(-2) + "-" + ("0" + now.getDate()).slice(-2) + " " + ("0" + now.getHours()).slice(-2) + ":" + ("0" + now.getMinutes()).slice(-2) + ":" + ("0" + now.getSeconds()).slice(-2) + "." + ("0" + now.getMilliseconds()).slice(-2) + " " 
	+ writeContent + "\n";
	
	logQueue.push(writeContent);
	
	if (typeof(mySuccessCallback) == "function") mySuccessCallback();
}

function writeToLogFromQueue(writeContent, mySuccessCallback, myErrorCallback) {	
		
	var successCallback;
	if (typeof(mySuccessCallback) !== "function") {
		successCallback = function(){};
	} else {
		successCallback = mySuccessCallback;
	}
	var errorCallback;
	if (typeof(myErrorCallback) !== "function") {
		errorCallback = successCallback; // falls kein errorHandler übergeben wurde mit successHandler fortfahren
	} else {
		errorCallback = myErrorCallback;
	}
	
	console.log(writeContent.toString());

	var fileName = now.getFullYear() + "-" + ("0" + (now.getMonth() + 1)).slice(-2) + "-" + ("0" + now.getDate()).slice(-2) + "_DIGI-WebApp.log.txt";
		
	// check if LocalFileSystem is defined
	if (typeof(window.requestFileSystem) == "undefined" && typeof(navigator.webkitPersistentStorage) == "undefined") {
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
				    				console.error("[writeToLog]: writeError", evt);
				    				errorCallback(evt);
				    			};
				    			
				    			writer.onwriteend = function(evt) {
				    	        	console.log("[writeToLog]: successfully written to file");
				    				successCallback(evt);
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
				  console.error('[writeToLog]: Error while requesting Quota', e);
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
			    				console.error("[writeToLog]: writeError", evt);
			    				errorCallback(evt);
			    			};
			    			
			    			writer.onwriteend = function(evt) {
			    	        	console.log("[writeToLog]: successfully written to file");
			    					successCallback(evt);
			    	        };
			    	        
			    	        writer.seek(writer.length);
		    	        	writer.write(writeContent.toString());
		
			    		}, errorCallback); // fileEntry.createWriter
			   		}, errorCallback);     // dataDirectory.getFile
			   	}, errorCallback);         // fileSystem.root.getDirectory
		    }, errorCallback);             // window.requestFileSystem
		}
	} catch(e2) {
		errorCallback(e2);
	}

}


 function trackError(ex, callback) {
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
		
		console.error(ex);
		if (typeof(ex.stack) !== "undefined") {
			console.log(ex.stack);
		}

		if (typeof(ex) === "string") {
			var logText = "Exception " + ex;
			writeToLog(logText, callback);
		} else {
			var logText = "Exception " + ex.name + ": " + ex.message + "\nStack: " + ex.stack;
			writeToLog(logText, callback);
		}
	 
	} catch(ex2) {}
	
	return true;

}

window.onerror = function (msg, url, line) {
	writeToLog('window.onerror: ' + msg + '\nURL: ' + url + '\nLine Number: ' + line);
	return true;
};


//override jQuery.fn.bind to wrap every provided function in try/catch
var jQueryBind = jQuery.fn.bind;
jQuery.fn.bind = function( type, myData, myFn ) {
	var fn = myFn;
	var data = myData;
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

;!(function ($) {
    $.fn.classes = function (callback) {
        var classes = [];
        $.each(this, function (i, v) {
            var splitClassName = v.className.split(/\s+/);
            for (var j in splitClassName) {
                var className = splitClassName[j];
                if (-1 === classes.indexOf(className)) {
                    classes.push(className);
                }
            }
        });
        if ('function' === typeof callback) {
            for (var i in classes) {
                callback(classes[i]);
            }
        }
        return classes;
    };
})(jQuery);


var globalFileSystem = null;
function getFS(mySuccessCallback, myErrorCallback) {
	
	var successCallback;
	if (typeof(mySuccessCallback) !== "function") {
		successCallback = function(){};
	} else {
		successCallback = mySuccessCallback;
	}
	var errorCallback;
	if (typeof(myErrorCallback) !== "function") {
		errorCallback = function(){};
	} else {
		errorCallback = myErrorCallback;
	}

	if (globalFileSystem != null)  {
		mySuccessCallback(globalFileSystem);
		return true;
	}

	// check if LocalFileSystem is defined
	if (typeof(window.requestFileSystem) == "undefined" && typeof(navigator.webkitPersistentStorage) == "undefined") {
		errorCallback();
        return false;
    }

	try {
		
		var myQuota = DigiWebApp.ApplicationController.CONSTApplicationQuota;
	    // open filesystem
		if (typeof(navigator.webkitPersistentStorage) !== "undefined") {
			navigator.webkitPersistentStorage.requestQuota(myQuota, function(grantedBytes) {
			    window.requestFileSystem(PERSISTENT, grantedBytes, function(fileSystem) {
			    	
		    		successCallback(fileSystem);

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
		    	
	    		successCallback(fileSystem);

		    }, errorCallback);             // window.requestFileSystem
		}
	} catch(e2) {
		errorCallback(e2);
	}

}

function getDir(dirName, mySuccessCallback, myErrorCallback) {
	
	var successCallback;
	if (typeof(mySuccessCallback) !== "function") {
		successCallback = function(){};
	} else {
		successCallback = mySuccessCallback;
	}
	var errorCallback;
	if (typeof(myErrorCallback) !== "function") {
		errorCallback = function(){};
	} else {
		errorCallback = myErrorCallback;
	}

	// check if LocalFileSystem is defined
	if (typeof(window.requestFileSystem) == "undefined" && typeof(navigator.webkitPersistentStorage) == "undefined") {
		errorCallback();
        return false;
    }

	try {
		
		var operation = function(fileSystem) {
	    	// get directory from filesystem (create if not exists)
	    	fileSystem.root.getDirectory(dirName, {create: true, exclusive: false}, function(dir) {
	    		
	    		successCallback(dir);
	
		   	}, errorCallback);         // fileSystem.root.getDirectory
		}
		getFS(operation);

	} catch(e2) {
		errorCallback(e2);
	}

}

var globalDataDir = null;
function getDataDir(mySuccessCallback, myErrorCallback) {
	if (globalDataDir != null && typeof(mySuccessCallback) == "function") {
		mySuccessCallback(globalDataDir);
		return true;
	}
	var operation = function(dir) {
		globalDataDir = dir;
		mySuccessCallback(dir);
	}
	getDir("DIGIWebAppData", operation, myErrorCallback);
}

var globalLogDir = null;
function getLogDir(mySuccessCallback, myErrorCallback) {
	if (globalLogDir != null && typeof(mySuccessCallback) == "function") {
		mySuccessCallback(globalLogDir);
		return true;
	}
	var operation = function(dir) {
		globalLogDir = dir;
		mySuccessCallback(dir);
	}
	getDir("DIGIWebAppLogs", operation, myErrorCallback);
}


function autoCleanLogs(mySuccessCallback, myErrorCallback) {
	
	var successCallback;
	if (typeof(mySuccessCallback) !== "function") {
		successCallback = function(){};
	} else {
		successCallback = mySuccessCallback;
	}
	var errorCallback;
	if (typeof(myErrorCallback) !== "function") {
		errorCallback = function(){};
	} else {
		errorCallback = myErrorCallback;
	}

	// check if LocalFileSystem is defined
	if (typeof(window.requestFileSystem) == "undefined" && typeof(navigator.webkitPersistentStorage) == "undefined") {
		successCallback();
        return true;
    }
	var operationInLogDir = function(logDir) {
		autoCleanLogFilesFromDirectory(logDir, mySuccessCallback, myErrorCallback);
	}
	getLogDir(operationInLogDir);
}

function autoCleanLogFilesFromDirectory(logDirectory, mySuccessCallback, myErrorCallback) {
	
	var successCallback;
	if (typeof(mySuccessCallback) !== "function") {
		successCallback = function(){};
	} else {
		successCallback = mySuccessCallback;
	}
	var errorCallback;
	if (typeof(myErrorCallback) !== "function") {
		errorCallback = function(){};
	} else {
		errorCallback = myErrorCallback;
	}
	
	if (typeof(logDirectory) != "object" || typeof(logDirectory.createReader) != "function") return errorCallback();
	
	logDirectory.createReader().readEntries(function(entries){
		var filesToDeleteArray = [];
		var fileNamesToDeleteArray = [];
		var daysToHoldBookingsOnDevice = parseIntRadixTen(DigiWebApp.SettingsController.getSetting("daysToHoldBookingsOnDevice"));
        var minDateInt = parseIntRadixTen(D8.create().addDays(-daysToHoldBookingsOnDevice).format("yyyymmdd"));
        writeToLog("removing logfiles older than " + minDateInt + " (older than " + daysToHoldBookingsOnDevice + " days)", function(){
			_.each(entries, function(entry) {
				if (entry.name.substr(10) == "_DIGI-WebApp.log.txt") {
					// is file too old?
					var tooOld = false;
					var year = entry.name.substr(0,4);
					var month = entry.name.substr(5,2);
					var day = entry.name.substr(8,2);
		            var myInt = parseIntRadixTen(year+month+day);
		            tooOld = (myInt < minDateInt);
					if (tooOld) {
						filesToDeleteArray.push(entry);
						fileNamesToDeleteArray.push(entry.name);
					}
				}
			});
	        var filesDeleted = 0;
	        var filesToDelete = filesToDeleteArray.length;
	        if (filesToDelete > 0) {
	        	var plural = "";
	        	if (filesToDelete > 1) plural = "s";
	            writeToLog("removing " + filesToDelete + " logfile" + plural + ":\n" + fileNamesToDeleteArray.join("\n"), function(){
		        	var checkIfDoneFunc = function() {
		        		if (++filesDeleted >= filesToDelete) {
		        			successCallback();
		        		}
		        	}
		        	var errorWhileRemoveHandler = function(err) {
		        		console.error("[autoCleanLogFilesFromDirectory error] ", err);
		        		checkIfDoneFunc();
		        	}
		    		_.each(filesToDeleteArray, function(entry) {
		                entry.remove(checkIfDoneFunc, errorWhileRemoveHandler);
		    		});
	    		});
	        } else {
				successCallback();
	        }
        });
     });

}

function createFile(dirname, filename) {
	var errorHandler = function(err){console.error(err);};
	var operation = function(fs) {
    	// get dataDirectory from filesystem (create if not exists)
		fs.root.getDirectory(dirname, {create: true, exclusive: false}, function(dir) {
	    	// get fileEntry from filesystem (create if not exists)
			dir.getFile(filename, {create: true, exclusive: false}, function(fileEntry) {
	    		console.log("file " + dirname + "/" + filename + " created");
		    }, errorHandler);
		}, errorHandler);
	}
	getFS(operation);
}

function cat(filename) {
	var errorHandler = function(err){console.error(err);};
	var operation = function(fs) {
		fs.root.getFile(filename, {}, function(fileEntry) {

		    fileEntry.file(function(file) {
		       var reader = new FileReader();

		       reader.onloadend = function(e) {
		         console.log(this.result);
		       };

		       reader.readAsText(file);
		    }, errorHandler);

		  }, errorHandler);
	}
	getFS(operation);
}

function appendFile(filename, content) {
	var errorHandler = function(err){console.error(err);};
	var operation = function(fs) {
		fs.root.getFile(filename, {}, function(fileEntry) {

    		fileEntry.createWriter(function(writer) {
				
    			writer.onerror = function(evt) {
    				console.error(evt);
    			};
    			
    			writer.onwriteend = function(evt) {
    	        	console.log("successfully written to file");
    				successCallback(evt);
    	        };
    	        
    	        writer.seek(writer.length);

	        	writer.write(writeContent.toString());

    		}, errorCallback); // fileEntry.createWriter

		  }, errorHandler);
	}
	getFS(operation);
}
function rm(filename) {
	var errorHandler = function(err){console.error(err);};
	var operation = function(fs) {
		fs.root.getFile(filename, {}, function(fileEntry) {

		    fileEntry.remove(function(){ console.log(filename + " removed"); }, errorHandler);

		  }, errorHandler);
	}
	getFS(operation);
}

function ls(dirName) {
	var errorHandler = function(err){console.error(err);};
	var operation = function(dir) {
		dir.createReader().readEntries(function(entries){
			_.each(entries, function(entry) {
				console.log(entry.name);
			});
		}, errorHandler);
	}
	getDir(dirName, operation);
}

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
		$(window.applicationCache).bind('updateready', function(e2) {
			if (window.applicationCache.status == window.applicationCache.UPDATEREADY) {
				console.log("Browser downloaded a new app cache");
				window.newAppVersionAvailable = YES;
				if (confirm(M.I18N.l('applicationUpdateAvailableMsg') + "\n\n" + DigiWebApp.app.config.version)) { 
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

var gefundeneFreischaltungen = [];
function searchForFeature(featureId) {
	if (gefundeneFreischaltungen.length === 0) {
		// alle Freischaltungen in Array laden
	    for (var i = 0; i < localStorage.length; i++) {
	        var k = localStorage.key(i);
	        var regexResult = new RegExp('^' + M.LOCAL_STORAGE_PREFIX + M.Application.name + M.LOCAL_STORAGE_SUFFIX + 'Features_').exec(k);
	        if (regexResult) {
	            var record = JSON.parse(localStorage.getItem(k));
	            gefundeneFreischaltungen.push(record);
	        }
	    }
	}
	
	var featureInArray = _.filter(gefundeneFreischaltungen,function(record){return record.id == featureId;});
	if (featureInArray.length != 0) {
		return (featureInArray[0].isAvailable == "true");
	}
	
// alte, direkte Variante
//    for (var i = 0; i < localStorage.length; i++) {
//        var k = localStorage.key(i);
//        var regexResult = new RegExp('^' + M.LOCAL_STORAGE_PREFIX + M.Application.name + M.LOCAL_STORAGE_SUFFIX + 'Features_').exec(k);
//        if (regexResult) {
//            var record = JSON.parse(localStorage.getItem(k));
//        	if (featureId.toString() === record.id.toString()) {
//        		return (record.isAvailable.toString() === "true");
//        	}
//        }
//    }
	
    return false;    
}

if(localStorage) {
	var language = null;
	language = localStorage.getItem(M.LOCAL_STORAGE_PREFIX + M.Application.name + M.LOCAL_STORAGE_SUFFIX + 'lang');
	if (language === null) {
		localStorage.setItem(M.LOCAL_STORAGE_PREFIX + M.Application.name + M.LOCAL_STORAGE_SUFFIX + 'lang', 'de_de');
		//M.I18N.setLanguage('de_de');
	}
}

// reduce pre-rendering on BlackBerry to reduce time spent on native-splash
var DigiWebAppBlackBerryDesign = {

    entryPage : 'splashView',

    splashView: DigiWebApp.SplashViewPage

};

var DigiWebAppOrdinaryDesign = {

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
	// --> benutzt weiter unten die Views des Bautagebuches
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
	//try{delete DigiWebAppOrdinaryDesign.bookingPage;}catch(e2){}
	try{delete DigiWebAppOrdinaryDesign.timeDataPage;}catch(e3){}
	try{delete DigiWebAppOrdinaryDesign.employeePage;}catch(e4){}
	try{delete DigiWebAppOrdinaryDesign.handOrderPage;}catch(e5){}
}

if ( !(searchForFeature(410)) && !(searchForFeature(409)) ) { // Menüeintrag "Handauftrag" ausblenden
	// soll heißen, füge den View nur hinzu, wenn dieses Feature NICHT gesetzt ist.
	DigiWebAppOrdinaryDesign.handOrderPage = DigiWebApp.HandOrderPage;
}

if ( (searchForFeature(411)) && !(searchForFeature(409)) ) { // Buchungen X Tage vorhalten
	DigiWebAppOrdinaryDesign.timeDataArchivePage = DigiWebApp.TimeDataArchivePage;
	DigiWebAppOrdinaryDesign.zeitbuchungenPage = DigiWebApp.ZeitbuchungenPage;
}
	
if (searchForFeature(412) || searchForFeature(402) || searchForFeature(426)) { // Bautagebuch, Materialerfassung & Notizen 
	DigiWebAppOrdinaryDesign.bautagebuchBautagesberichteListePage = DigiWebApp.BautagebuchBautagesberichteListePage;
	DigiWebAppOrdinaryDesign.bautagebuchBautagesberichtDetailsPage = DigiWebApp.BautagebuchBautagesberichtDetailsPage;
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
	DigiWebAppOrdinaryDesign.bautagebuchMitarbeiterAuswahlPage = DigiWebApp.BautagebuchMitarbeiterAuswahlPage;
}

if ( (searchForFeature(416) || searchForFeature(424)) && !(searchForFeature(409)) ) { // Buchungsscreen mit Tätigkeitsicons und ButtonMenü
	DigiWebAppOrdinaryDesign.bookingPageWithIconsScholpp = DigiWebApp.BookingPageWithIconsScholpp;
}

if (searchForFeature(418)) { // Spesen/Auslöse (wird bei Feierabend abgefragt)
	DigiWebAppOrdinaryDesign.spesenPage = DigiWebApp.SpesenPage;
}

if (searchForFeature(422)) { // gefahrene Kilometer
	DigiWebAppOrdinaryDesign.editTimeDataPage = DigiWebApp.EditTimeDataPage; // für 405 & 403
	DigiWebAppOrdinaryDesign.remarkPage = DigiWebApp.RemarkPage;
}

if (searchForFeature(423)) { // Terminliste
	DigiWebAppOrdinaryDesign.terminlistePage = DigiWebApp.TerminlistePage;
}

if (searchForFeature(425)) { // FestePauseStornieren
	DigiWebAppOrdinaryDesign.festePauseStornierenPage = DigiWebApp.FestePauseStornierenPage;
}

if (searchForFeature(426)) { // Notizen-Only
	// hat (noch) keine eigenen Views
	// --> benutzt weiter unten die Views des Bautagebuches
}

if (searchForFeature(427)) { // Bautagebuch: TätigkeitslistenPage in Zeitbuchungs-Details
	DigiWebAppOrdinaryDesign.activityListPage = DigiWebApp.ActivityListPage;
}


var restartOnBlackBerry = true;
if (navigator.platform === "BlackBerry" && restartOnBlackBerry) {
	if (navigator.appVersion.indexOf("Version/") !== -1) {
		// disable restartOnBlackBerry if version > 6
		var bb_version = Number(navigator.appVersion.substr(navigator.appVersion.indexOf("Version/") + 8,1));
		if (bb_version > 6) restartOnBlackBerry = false; //disable restart on newer BlackBerries
	}
}

function scrStr(to_enc, scrId) {
	var result="";
	for (var i=0; i < to_enc.length; ++i) {
		result+=String.fromCharCode(scrId^to_enc.charCodeAt(i));
	}
	return result;
}

function unScrStr(to_dec, scrId) {
	var result="";
	for(var i=0; i<to_dec.length; i++) {
		result+=String.fromCharCode(scrId^to_dec.charCodeAt(i));
	}
	return result;
}

var ua = navigator.userAgent;
var onMobile = /Android|webOS|PlayBook|Kindle|Kindle Fire|Opera Mobi|Windows Phone|iPhone|iPad|iPod|BlackBerry/i.test(ua)
var onIOS = /iPhone|iPad|iPod/i.test(ua)
var onAndroid = /Android/i.test(ua)
var onSamsung = /Samsung|GT\-|SM\-/i.test(ua);
var onAndroid23 = false;
var onAndroid3 = false;
var onAndroid4 = false;
var onAndroid5 = false;
if ( onAndroid ) {
  var androidversion = parseFloat(ua.slice(ua.indexOf("Android")+8)); 
    if (androidversion < 3) {
      onAndroid23 = true;
  } else if (androidversion < 4) {
	  onAndroid3 = true;
  } else if (androidversion < 5) {
	  onAndroid4 = true;
  } else if (androidversion < 6) {
	  onAndroid5 = true;
  }
}

if (navigator.platform === "BlackBerry" && restartOnBlackBerry) {
	// we will reset the design to DigiWebAppOrdinaryDesign later on in SplashViewPage.onPageshow
	DigiWebApp.app = M.Application.design(DigiWebAppBlackBerryDesign);
} else {
	DigiWebApp.app = M.Application.design(DigiWebAppOrdinaryDesign);	
}

if (!onIOS && !onAndroid23 && typeof(Notification) != "undefined") { 
	try {
		window.addEventListener('load', function () {
		  Notification.requestPermission(function (status) {
		    // This allows to use Notification.permission with Chrome/Safari
		    if (Notification.permission !== status) {
		      Notification.permission = status;
		    }
		  });
	});
	} catch(e) {}
	try {
		  Notification.requestPermission(function (status) {
			    // This allows to use Notification.permission with Chrome/Safari
			    if (Notification.permission !== status) {
			      Notification.permission = status;
			    }
		  });
	} catch(e) {}
}
