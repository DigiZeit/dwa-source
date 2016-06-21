
// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: DigiWebApp 
// ==========================================================================

// always log while SettingsControler has not been initialized
var logDelete = true;
var logSave = true;
var logDesign = false;
var staticDebugging = false; // for hotfix debugging without credentials etc.

var staticDebuggingAlertShown = false;
function inDebug() {
	try {
		if (staticDebugging) {
			if (!staticDebuggingAlertShown) {
				staticDebuggingAlertShown = true;
				alert("!!! staticDebugging activated !!! Do not release this Package!");
			}
			return true;
		}
	    for (var i = 0; i < localStorage.length; i++) {
	        var k = localStorage.key(i);
	        var regexResult = new RegExp('^' + M.LOCAL_STORAGE_PREFIX + M.Application.name + M.LOCAL_STORAGE_SUFFIX + 'Settings_').exec(k);
	        if (regexResult) {
	            var record = JSON.parse(localStorage.getItem(k));
	            var myDebug = parseBool(record.debug);
	            if (typeof(DigiWebApp) != "undefined" && typeof(DigiWebApp.SettingsController) != "undefined") {
	            	DigiWebApp.SettingsController.globalDebugMode = myDebug;
	            }
	            return myDebug;
	        }
	    }
	} catch(e) {}
    return false;    
}

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

var newAppVersionAvailable = NO;

M.Application.useTransitions = NO;

var DigiWebApp = DigiWebApp || {app: null};

var logQueue = [];
var logQueueIntervalId = null;
var logQueueInterval = 500;
var logQueueIntervalRefreshInterval = 60000; // einmal pro Minute
function initLogQueueInterval() {
	if (logQueueInterval > 0 && !logQueueIntervalId) {
		// interval == 0 bedeutet nicht loggen
		//console.debug("initLogQueueInterval");
		logQueueIntervalId = window.setInterval(queuedLogWriter, logQueueInterval);
	}
}
function deactivateLogQueueInterval() {
	if (logQueueIntervalId) {
		// Intervall deaktivieren
		//console.debug("deactivateLogQueueInterval");
		try{logQueueIntervalId = window.clearInterval(logQueueIntervalId);}catch(e){}
	}
}
function refreshLogQueueInterval() {
	var newlogQueueInterval = logQueueInterval;
	if (DigiWebApp && DigiWebApp.SettingsController) {
		var s = parseIntRadixTen(DigiWebApp.SettingsController.getSetting("logWriterInterval"));
		if (s) {
			newlogQueueInterval = s;
		}
	} else {
	    for (var i = 0; i < localStorage.length; i++) {
	        var k = localStorage.key(i);
	        var regexResult = new RegExp('^' + M.LOCAL_STORAGE_PREFIX + M.Application.name + M.LOCAL_STORAGE_SUFFIX + 'Settings_').exec(k);
	        if (regexResult) {
	            var record = JSON.parse(localStorage.getItem(k));
	            if (record && record.logWriterInterval) newlogQueueInterval = parseIntRadixTen(record.logWriterInterval);
	        }
	    }
    }
    if (newlogQueueInterval != logQueueInterval) {
    	logQueueInterval = newlogQueueInterval;
    	deactivateLogQueueInterval();
        initLogQueueInterval();
    }
}
var logQueueIntervalRefreshIntervalId = window.setInterval(refreshLogQueueInterval, logQueueIntervalRefreshInterval);

function flushLogQueueAndExit() {
	deactivateLogQueueInterval();
	if (logQueue.length > 0) {
		var myWriteContent = logQueue.shift();
		writeToLogFromQueue(myWriteContent,  function() {
			flushLogQueueAndExit();
		});
	} else {
		// alles geschrieben: exitApp
		if (typeof(navigator) != "undefined" && typeof(navigator.app) != "undefined" && typeof(navigator.app.exitApp) != "undefined") {
			navigator.app.exitApp();
		}
	}
}
function queuedLogWriter() {
	if (logQueue.length > 0) {
		//console.debug("queuedLogWriter has something to do");
		var myWriteContent = logQueue.shift();
		// Intervall aussetzen bis alles geschrieben wurde
		deactivateLogQueueInterval();
		writeToLogFromQueue(myWriteContent,  function() {
	        //initLogQueueInterval();
			queuedLogWriter();
		});
	} else {
		// Intervall fortsetzen
		initLogQueueInterval();
	}
}

initLogQueueInterval();

function writeToLog(myWriteContent, mySuccessCallback, myErrorCallback) {
	
	var now = new Date();
	var writeContent = "";
	if (typeof(myWriteContent) === "string") {
		writeContent = myWriteContent;
	} else {
		writeContent = JSON.stringify(myWriteContent);
	}
	writeContent = "----------------------------------------\n" 
	    + now.getFullYear() + "-" + ("0" + (now.getMonth() + 1)).slice(-2) + "-"
        + ("0" + now.getDate()).slice(-2) + " " + ("0" + now.getHours()).slice(-2) + ":"
        + ("0" + now.getMinutes()).slice(-2) + ":" + ("0" + now.getSeconds()).slice(-2) + "."
        + ("0" + now.getMilliseconds()).slice(-2) + " "
	    + writeContent + "\n";
	
	console.log(writeContent.toString());

	if (logQueueInterval > 0) {
		logQueue.push({"content": writeContent, "timestamp": now});
	}
	
	if (typeof(mySuccessCallback) == "function") mySuccessCallback();
}

function writeToLogFromQueue(writeContentObj, mySuccessCallback, myErrorCallback) {	
		
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
	
	try {

		var writeContent = writeContentObj.content;
		var now = writeContentObj.timestamp;
			
		var fileName = now.getFullYear() + "-" + ("0" + (now.getMonth() + 1)).slice(-2) + "-" + ("0" + now.getDate()).slice(-2) + "_DIGI-WebApp.log.txt";
			
		// check if LocalFileSystem is defined
		if (typeof(window.requestFileSystem) == "undefined" && typeof(navigator.webkitPersistentStorage) == "undefined") {
			// ohne filesystem kein logging möglich: logging-anfragen ohne Fehler ignorieren
			successCallback("no filesystem available");
	        return true;
	    }

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
				    	        	//console.debug("[writeToLog]: successfully written to file");
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
			}, function(err) {
				  console.error('[writeToLog]: Error while requesting Quota', err);
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
			    	        	//console.debug("[writeToLog]: successfully written to file");
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
		if (typeof(errorCallback) != "function") {
			alert("Die Protokollierung ist defekt! Bitte starten Sie die App neu und informieren DIGI-ZEITERFASSUNG GmbH!")
		} else {
			errorCallback(e2);
		}
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
	console.log("window onload event");
	if (window.applicationCache) {
		$(window.applicationCache).bind('updateready', function(e2) {
			if (window.applicationCache.status == window.applicationCache.UPDATEREADY) {
				writeToLog("Browser downloaded a new app cache");
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
                    //TODO Warum auch toDashboardPage()???
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
	M.I18N.defaultLanguage = "de_de";
	language = localStorage.getItem(M.LOCAL_STORAGE_PREFIX + M.Application.name + M.LOCAL_STORAGE_SUFFIX + 'lang');
	if (language === null) {
		localStorage.setItem(M.LOCAL_STORAGE_PREFIX + M.Application.name + M.LOCAL_STORAGE_SUFFIX + 'lang', 'de_de');
		try{location.reload()}catch(e){}
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
	DigiWebAppOrdinaryDesign.editTimeDataPage = DigiWebApp.EditTimeDataPage;
}

if (searchForFeature(404)) { // Button-Menü (mit Icons alá DTC6) (aktuell nur bei Scholpp; diese Freischaltung deaktiviert auch die Animationen)
	DigiWebAppOrdinaryDesign.buttonsDashboard = DigiWebApp.ButtonDashboardPage;
}

if (searchForFeature(405) && !(searchForFeature(409))) { // Unterschrift
	DigiWebAppOrdinaryDesign.editTimeDataPage = DigiWebApp.EditTimeDataPage;
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

if (( !(searchForFeature(410)) && !(searchForFeature(409)) ) // Menüeintrag "Handauftrag" ausblenden
|| searchForFeature(430)
){ 
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
	DigiWebAppOrdinaryDesign.editTimeDataPage = DigiWebApp.EditTimeDataPage;
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

if (searchForFeature(429) // mehrstufige Auftragsauswahl
 || searchForFeature(430) // Handpositionen
) { 
	DigiWebAppOrdinaryDesign.orderListPage = DigiWebApp.OrderListPage;
}

if (searchForFeature(431)) { // Bohle-Reisekostenabwicklung
    DigiWebAppOrdinaryDesign.editTimeDataPage = DigiWebApp.EditTimeDataPage;
}

var restartOnBlackBerry = true;
if (navigator.platform === "BlackBerry" && restartOnBlackBerry) {
	if (navigator.appVersion.indexOf("Version/") !== -1) {
		// disable restartOnBlackBerry if version > 6
		var bb_version = Number(navigator.appVersion.substr(navigator.appVersion.indexOf("Version/") + 8,1));
		if (bb_version > 6) restartOnBlackBerry = false; //disable restart on newer BlackBerries
	}
}

function scrStr(toEnc, scrId) {
	var result = "";
	for (var i = 0; i < toEnc.length; ++i) {
		result += String.fromCharCode(scrId ^ toEnc.charCodeAt(i));
	}
	return result;
}

function unScrStr(toDec, scrId) {
	var result = "";
	for (var i = 0; i < toDec.length; i++) {
		result += String.fromCharCode(scrId ^ toDec.charCodeAt(i));
	}
	return result;
}

var ua = navigator.userAgent;
var onMobile = /Android|webOS|PlayBook|Kindle|Kindle Fire|Opera Mobi|Windows Phone|iPhone|iPad|iPod|BlackBerry/i.test(ua);
var onIOS = /iPhone|iPad|iPod/i.test(ua);
var onAndroid = /Android/i.test(ua);
var onWindowsPhone = /Windows Phone/i.test(ua);
var onSamsung = /Samsung|GT\-|SM\-/i.test(ua);
var onAndroid23 = false;
var onAndroid3 = false;
var onAndroid4 = false;
var onAndroid5 = false;

if (onAndroid) {
  var androidversion = parseFloat(ua.slice(ua.indexOf("Android") + 8)); 
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
	if (logDesign) {
		var designStr = "";
		for (var property in DigiWebAppOrdinaryDesign) {
		    if (DigiWebAppOrdinaryDesign.hasOwnProperty(property)) {
		        designStr += property + "\n";
		    }
		}
		writeToLog("Design:\n" + designStr);
	}
	DigiWebApp.app = M.Application.design(DigiWebAppOrdinaryDesign);	
}

if (!onIOS && !onAndroid23 && typeof(Notification) != "undefined") { 
	//if (inDebug() && staticDebugging) alert(navigator.platform + ", Start Notification ");
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

var weinreState = 0;
function injectWeinre(weinreUserIP) {
	if (!weinreUserIP) weinreUserIP = "unbekannt";
	//var weinreScriptElement = $("<script src=\"http://weinre.digi-zeiterfassung.de:8081/target/target-script-min.js#userid" + weinreUserId + "\"></script>");
	var weinreScriptElement = $("<script src=\"http://weinre.digi-zeiterfassung.de:8081/target/target-script-min.js#anonymous\"></script>");
	$('head').append(weinreScriptElement);
	weinreState = 1;
	localStorage.setItem("startWeinre", "false"); // beim nächsten reload automatisch wieder ohne weinre
	console.log("IP: " + weinreUserIP);
	try { if (window.plugins && window.plugins.insomnia) window.plugins.insomnia.keepAwake(); } catch(e) { };
	alert("Die Fernwartung wird nun für diese Sitzung bis zum nächsten App-Start aktiviert.\n\nTeilen Sie vor dem Fortsetzen dem DIGI-Mitarbeiter bitte IP-Adresse mit: " + weinreUserIP);
}
function runWeinre() {
	var doIt = false;
	var weinreUserIP = "";
	if (typeof(localStorage) !== "undefined") {
		doIt = parseBool(localStorage.getItem("startWeinre"));
		weinreUserIP = localStorage.getItem("weinreUserIP");
	}
	if (doIt) {
		injectWeinre(weinreUserIP);
	} else {
		try { if (window.plugins && window.plugins.insomnia) window.plugins.insomnia.allowSleepAgain(); } catch(e) { };
	}
}
function getWeinreState() {
	if (typeof(localStorage) !== "undefined") {
		return weinreState;
	} else {
		weinreState = -1;
	}
	return weinreState;
}
function toggleWeinre(weinreUserIP) {
//	getWeinreState();
//	if (weinreState == -1) { return false; }
//	if (weinreState == 1) {
//		stopWeinre();
//	} else {
		startWeinre(weinreUserIP);
//	}
	return true;
}
function startWeinre(weinreUserIP) {
	if (typeof(localStorage) !== "undefined") {
		localStorage.setItem("startWeinre", "true");
		localStorage.setItem("weinreUserIP", weinreUserIP);
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
function stopWeinre() {
	if (typeof(localStorage) !== "undefined") {
		localStorage.setItem("startWeinre", "false");
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
runWeinre();

function removeClassFromElementByClassending(elementId, classNameTail) {
	if ( typeof(elementId) == "undefined" ) { return; }
	if ( typeof(classNameTail) == "undefined" ) { return; }
	try {
		$(elementId).classes(function(n) {
			if (n.substring(n.length - classNameTail.length) === classNameTail) {
				$(elementId).removeClass(n);
			}
		});
	} catch(e) {
		writeToLog("Error while removing class from Element " + elementId + ":\n" + e);
	}
}
	
function removeClassFromPageByClassending(pageId, classNameTail) {
	return removeClassFromElementByClassending('#' + pageId, classNameTail);
}

var QueryString = function () {
	// This function is anonymous, is executed immediately and 
	// the return value is assigned to QueryString!
	var query_string = {};
	var query = window.location.search.substring(1);
	var vars = query.split("&");
	for (var i=0;i<vars.length;i++) {
		var pair = vars[i].split("=");
		// If first entry with this name
		if (typeof query_string[pair[0]] === "undefined") {
			query_string[pair[0]] = decodeURIComponent(pair[1]);
		// If second entry with this name
		} else if (typeof query_string[pair[0]] === "string") {
			var arr = [ query_string[pair[0]],decodeURIComponent(pair[1]) ];
			query_string[pair[0]] = arr;
		// If third or later entry with this name
		} else {
			query_string[pair[0]].push(decodeURIComponent(pair[1]));
		}
	} 
	return query_string;
}();
	
function htmlDecode(value) { 
	return $('<div/>').html(value).text(); 
}

function hasValue(val) {
    return (typeof(val) != "undefined" && val != null);
}
