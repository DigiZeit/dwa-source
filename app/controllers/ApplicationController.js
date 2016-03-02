// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: DigiWebApp
// Controller: ApplicationController
// ==========================================================================
// manuell var-checked
DigiWebApp.ApplicationController = M.Controller.extend({
	
	  //CONSTImageFiletype: "image/jpeg;base64"
	  CONSTAudioFiletype: "audio/wav;base64"
	, CONSTVideoFiletype: "video/mp4;base64"
	, CONSTTextFiletype: "text/plain"
	, CONSTDefaultBranding: "DIGI-WEBAPP-DSO"
		
	, getImageFiletype: function() {
		var filetypeString = "image/" + DigiWebApp.SettingsController.getSetting('pictureEncodingType').toLowerCase() + ";base64"
		return filetypeString;
	}
	, CONSTApplicationQuota: 20*1024*1024
	
	, CONSTVibrateDuration: 100
	
	// Namespace for XML-Results in IE
	// gets reset in getOrdersFromRemoteSuccess
	, myns: "ax21"

    , dayNamesShort: [
          M.I18N.l('Sunday').substr(0,3)
        , M.I18N.l('Monday').substr(0,3)
        , M.I18N.l('Tuesday').substr(0,3)
        , M.I18N.l('Wednesday').substr(0,3)
        , M.I18N.l('Thursday').substr(0,3)
        , M.I18N.l('Friday').substr(0,3)
        , M.I18N.l('Saturday').substr(0,3)
    ]
    		
    , dayNames: [
          M.I18N.l('Sunday')
        , M.I18N.l('Monday')
        , M.I18N.l('Tuesday')
        , M.I18N.l('Wednesday')
        , M.I18N.l('Thursday')
        , M.I18N.l('Friday')
        , M.I18N.l('Saturday')
    ]

    , monthNamesShort: [
          M.I18N.l('january').substr(0,3)
        , M.I18N.l('february').substr(0,3)
        , M.I18N.l('march').substr(0,3)
        , M.I18N.l('april').substr(0,3)
        , M.I18N.l('may').substr(0,3)
        , M.I18N.l('june').substr(0,3)
        , M.I18N.l('july').substr(0,3)
        , M.I18N.l('august').substr(0,3)
        , M.I18N.l('september').substr(0,3)
        , M.I18N.l('october').substr(0,3)
        , M.I18N.l('november').substr(0,3)
        , M.I18N.l('december').substr(0,3)
    ]
    , monthNames: [
          M.I18N.l('january')
        , M.I18N.l('february')
        , M.I18N.l('march')
        , M.I18N.l('april')
        , M.I18N.l('may')
        , M.I18N.l('june')
        , M.I18N.l('july')
        , M.I18N.l('august')
        , M.I18N.l('september')
        , M.I18N.l('october')
        , M.I18N.l('november')
        , M.I18N.l('december')
    ]
    		
    , closeAppAfterCloseDay: NO
    		
    , bgGeo: null

	, restartApp: NO
		
	, syncStartTimestamp: null
	
	, syncStopTimestamp: null
	
	, syncLastDuration: null 
	
	, syncRunning: NO
	
	, savedUseTransitions: NO

	, triggerUpdate: NO
	
	, useSplashJustForFade: NO
	
	, makeUnselectable: function(node) {
		return null;
	}

	, blackBerryRestart_var: null
	
	, blackBerryRestart: function() {
		if (DigiWebApp.ApplicationController.blackBerryRestart_var !== null) {clearTimeout(DigiWebApp.ApplicationController.blackBerryRestart_var);}
		DigiWebApp.app = M.Application.design(DigiWebAppOrdinaryDesign);
		DigiWebApp.app.main();
		DigiWebApp.ApplicationController.regSecEv(YES);
	}
	
	, nativeAlertDialogView: function (obj) {
		
		// etwaigen Loader ausblenden
		DigiWebApp.ApplicationController.DigiLoaderView.hide()
		
		if (typeof(obj.confirmButtonValue) === "undefined") obj.confirmButtonValue = M.I18N.l('ok');
		if (typeof(obj.title) === "undefined") obj.title = M.I18N.l('warnungDialog');
		if (typeof(obj.message) === "undefined") obj.message = "";
		var mycallback = function() { return; };
		if (typeof(obj.callbacks) !== "undefined") {
			// we have callbacks
			if(typeof(obj.callbacks.confirm.target) === undefined) {
				// without target
				if (typeof(obj.callbacks.confirm.action) === "function") {
					mycallback = obj.callbacks.confirm.action;
				} else {
					trackError("ERROR: callback without target given but action is not a function!");
				}
			} else if (typeof(obj.callbacks.confirm.target) === "function") {
				// with function-target
				mycallback = obj.callbacks.confirm.target;
			} else {
				// with other target
				if (typeof(obj.callbacks.confirm.action) === "string") {
					mycallback = obj.callbacks.confirm.target[obj.callbacks.confirm.action];
				} else if (typeof(obj.callbacks.confirm.action) === "function") {
					mycallback = obj.callbacks.confirm.action;
				} else {
					trackError("ERROR: action is neither a string nor a function!");
				}
			}
		};
		if (typeof(navigator.notification) === "undefined") {
			M.DialogView.alert(obj);
		} else {
			navigator.notification.alert(
				  obj.message					// message
				, function (button) {
					switch(button) {
					case 0:
						mycallback();
						break;
					case '0':
						mycallback();
						break;
					case 1:
						mycallback();
						break;
					case '1':
						mycallback();
						break;
					case 2:
						mycallback();
						break;
					case '2':
						mycallback();
						break;
					case obj.confirmButtonValue:
						mycallback();
						break;
					case 'OK':
						mycallback();
						break;
					default:
						alert("ERROR: yet unknown button \"" + button + "\" pressed.");
						return;
					}
				} // callback
				, obj.title						// title
				, obj.confirmButtonValue			// buttonLabel
				);
		}
	}    

	, nativeConfirmDialogView: function (obj) {

		// etwaigen Loader ausblenden
		DigiWebApp.ApplicationController.DigiLoaderView.hide()
		
		if (typeof(obj.confirmButtonValue) === "undefined") obj.confirmButtonValue = M.I18N.l('ok');
		if (typeof(obj.cancelButtonValue) === "undefined") obj.cancelButtonValue = M.I18N.l('cancel');
		if (typeof(obj.title) === "undefined") obj.title = M.I18N.l('bestaetigenDialog');
		if (typeof(obj.message) === "undefined") obj.message = "";
		if (typeof(navigator.notification) === "undefined") {
			M.DialogView.confirm(obj);
		} else {
			navigator.notification.confirm(
				  obj.message  // message
				, function (button) {
					switch(button) {
						case 0:
							obj.callbacks.confirm.action();
							break;
						case 1:
							obj.callbacks.confirm.action();
							break;
						case 2:
							obj.callbacks.cancel.action();
							break;
						case '0':
							obj.callbacks.confirm.action();
							break;
						case '1':
							obj.callbacks.confirm.action();
							break;
						case '2':
							obj.callbacks.cancel.action();
							break;
						case obj.confirmButtonValue:
							obj.callbacks.confirm.action();
							break;
						case obj.cancelButtonValue:
							obj.callbacks.cancel.action();
							break;
						case 'OK':
							obj.callbacks.confirm.action();
							break;
						case 'CANCEL':
							obj.callbacks.cancel.action();
							break;
						default:
							alert("ERROR: yet unknown button \"" + button + "\" pressed.");
							return;
					}
				}  // callback to invoke with index of button pressed
				, obj.title // title
				, [obj.confirmButtonValue, obj.cancelButtonValue]          // buttonLabels
				);
		}
	}
	
	/*
	 * part of ApplicationController
	 */
	, DigiLoaderView: { 
		
		/*
		 *  DigiLoaderView wrapps M.LoaderView to allow only one Loader at a time.
		 *
		 *  It also allows to query if it is visible.
		 *
		 */

		  loaderMessage: " "
		, loaderTitle: ""
			  		
		, timeoutId: null

		, isVisible: function() { 
			return M.LoaderView.refCount !== 0;
		} 

		, hide: function() {
			this.loaderMessage = " ";
			this.loaderTitle = "";
			window.clearTimeout(this.timeoutId);
			this.timeoutId = null;
			if (this.nativeLoaderAvailable()) {
				navigator.notification.activityStop();
				return true;
			} else {
				return M.LoaderView.hide(true);
			}
		}

		, show: function(message, timeout, title) {
			var that = this;

			var mytitle = '';
			if (typeof(title) != "undefined") {
				mytitle = title;
			}
			
			this.hide(); 
		
			if (DigiWebApp.SettingsController.getSetting('silentLoader') !== YES) {
				this.loaderMessage = message;
				this.loaderTitle = mytitle;
			} else {
				if (this.nativeLoaderAvailable()) {
					if (this.loaderMessage == " ") {
						this.loaderMessage = "";	
					}
				}
			}

			// Loader nach definiertem TimeOut automatisch verstecken
			var myTimeout = timeout;
			if (!myTimeout) myTimeout = DigiWebApp.SettingsController.getSetting('LoaderTimeOut');
			window.clearTimeout(this.timeoutId);
			this.timeoutId = window.setTimeout(myTimeout, this.hide);
			
			if (this.nativeLoaderAvailable()) {
				navigator.notification.activityStart(this.loaderTitle, this.loaderMessage);
			} else {
				return M.LoaderView.show(this.loaderMessage);
			}
		}
		
		, getTitle: function() {
			if (this.nativeLoaderAvailable()) {
				return this.loaderTitle;
			} else {
				return this.loaderMessage;
			} 
		}

		, getMessage: function() {
			if (this.nativeLoaderAvailable()) {
				return this.loaderMessage;
			} else {
				return this.loaderMessage;
			} 
		}

		, setTitle: function(title) {
			if (this.nativeLoaderAvailable()) {
				return this.show(this.loaderMessage, title);
			} else {
				return this.show(title);
			}
		}
		
		, setMessage: function(message) {
			if (this.nativeLoaderAvailable()) {
				return this.show(message, this.loaderTitle);
			} else {
				return this.show(message);
			}
		}
		
		, changeTitle: function(title) {
			return this.setTitle(title);
		}

		, changeMessage: function(message) {
			return this.setMessage(message);
		}
		
		, nativeLoaderAvailable: function() {
			if (DigiWebApp.SettingsController.getSetting('useNativeLoader') == NO) return false;
			if (typeof(navigator) == "undefined" 
					|| typeof(navigator.notification) == "undefined" 
					|| typeof(navigator.notification.activityStart) == "undefined" 
					|| typeof(navigator.notification.activityStop) == "undefined") {
				return false;
			} else {
				return true;
			}
		}

	} // End of DigiLoaderView

	, DigiProgressView: {
		
		// usage:
		//DigiWebApp.ApplicationController.DigiProgressView.show(M.I18N.l('Save'), M.I18N.l('positions'), myLength, 0);
		//DigiWebApp.ApplicationController.DigiProgressView.increase();
		//DigiWebApp.ApplicationController.DigiProgressView.hide();
		
		  maxValue: 100
		, currentValue: 0
		
		, shown: NO
		
		, minMaxVal: 300
		
		, increase: function(by) {
			if (!this.nativeProgressAvailable()) return false;
			if (!this.shown) return false;
			if (typeof(by) != "undefined") {
				this.currentValue = this.currentValue + parseIntRadixTen(by);
			} else {
				this.currentValue += 1;
			}
			if (this.currentValue > this.maxValue) this.currentValue = this.maxValue;
			var value = this.currentValue / this.maxValue * 100;
			navigator.notification.progressValue(value);
		}

		, decrease: function(by) {
			if (!this.nativeProgressAvailable()) return false;
			if (!this.shown) return false;
			if (typeof(by) != "undefined") {
				this.currentValue = this.currentValue - parseIntRadixTen(by);
			} else {
				this.currentValue -= 1;
			}
			if (this.currentValue < 0) this.currentValue = 0;
			var value = this.currentValue / this.maxValue * 100;
			navigator.notification.progressValue(value);
		}
		
		, show: function(title, message, maxV, currentV) {
			if (!this.nativeProgressAvailable()) return false;
			if (typeof(maxV) != "undefined") this.maxValue = parseIntRadixTen(maxV);
			this.minMaxVal = parseIntRadixTen(DigiWebApp.SettingsController.getSetting('progressViewVerwendenAb'));
			if (maxV < this.minMaxVal) return true;
			if (this.maxValue < 1) this.maxValue = 1;
			this.shown = YES;
			navigator.notification.progressStart(title, message);
			if (typeof(currentV) != "undefined") {
				this.currentValue = parseIntRadixTen(currentV);
				if (this.currentValue < 0) this.currentValue = 0;
				if (this.currentValue > this.maxValue) this.currentValue = this.maxValue;
				var value = this.currentValue / this.maxValue * 100;
				navigator.notification.progressValue(value);
			}
		}
		
		, hide: function() {
			if (!this.nativeProgressAvailable()) return false;
			this.maxV = 100;
			this.currentV = 0;
			this.shown = NO;
			navigator.notification.progressStop();
		}
		
		, nativeProgressAvailable: function() {
			if (DigiWebApp.SettingsController.getSetting('silentLoader') == YES) return false;
			if (DigiWebApp.SettingsController.getSetting('useNativeLoader') == NO) return false;
			if (typeof(navigator) == "undefined" 
					|| typeof(navigator.notification) == "undefined" 
					|| typeof(navigator.notification.progressStart) == "undefined" 
					|| typeof(navigator.notification.progressStop) == "undefined") {
				return false;
			} else {
				return true;
			}
		}
		
	} // End of DigiProgressView

    , infoMsg: ''
    
	//, shallTransferBookings: NO

    /*
     * callbackStatus object contains the state of the model
     * useful for checking if application is able to run,
     * used in isReadyToProceed() in this controller.
    */
    , callbackStatus: null

    , storagePrefix: M.LOCAL_STORAGE_PREFIX + M.Application.name + M.LOCAL_STORAGE_SUFFIX
    
    , clickCounter: 0
    , clickLimit: 9
    
    , skipEvents: false
    
    , regSecEv: function(isFirstLoad) {
		DigiWebApp.ApplicationController.DigiLoaderView.show(M.I18N.l('waitingForDevice'));
    	console.log(DigiWebApp.app.config.version);
    	var that = this;
    	setTimeout(function() {
    		that.realregSecEv(isFirstLoad);
    	}, 100);
    }
    
	, realregSecEv: function(isFirstLoad) {
    	//console.log("in regSecEv");
    	
        DigiWebApp.ApplicationController.setImageClass();
        
        M.I18N.defaultLanguage = "de_de";

		if (isFirstLoad) {
			
			var that = this;

            var img2 = M.ViewManager.getView('infoPage', 'logo');    // info page logo

            that.clickCounter = 0;
            $('#'+ img2.id).bind('touchstart', function(ev) {
                if (DigiWebApp.InfoPage.lastTimePageWasLoaded < (+new Date() - 1000)) {
                	that.clickCounter++;
                	if (that.clickCounter > that.clickLimit) {
                		that.clickCounter = 0;
                		that.showConfirmDialog();
                	}
                }
            });

            $('#'+ img2.id).bind('mousedown', function(ev) {
            	if (DigiWebApp.InfoPage.lastTimePageWasLoaded < (+new Date() - 1000)) {
            		that.clickCounter++;
                	if (that.clickCounter > that.clickLimit) {
                		that.clickCounter = 0;
                		that.showConfirmDialog();
                	}
            	}
            });

        	if ( M.Environment.getPlatform().substr(0,10) === "BlackBerry" ) {
        		console.log("registering emergencyhandler");
        		$(document).bind('keydown', DigiWebApp.ApplicationController.keydownHandler);
        	}

        }
				
		// no fade-effects on header
		_.each(DigiWebApp.app.pages, function(myPage) {
			if ( typeof(myPage.header) !== "undefined" ) {
				$('#' + myPage.header.id ).removeClass("fade");
			}
		});
		// no fade-effects on footer
		$('[id=' + DigiWebApp.TabBar.id  + ']').each(function() {
			$(this).removeClass("fade");
		});
		
		this.setSkipEvents();

		if (this.skipEvents) {
        	// i guess we are not on a mobile device --> no deviceready-event
        	this.devicereadyhandler();
        } else {
        	if (typeof(device) == "undefined" || navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry)/)) { 
			    //if (inDebug() && staticDebugging) alert(navigator.platform + ", realregSecEv " + " device undefined --> setTimeout and register deviceready");
	        	// register deviceready-event and wait for it to fire
        		// or start deviceready-handler after a timeout of 10 seconds (we are not on a mobile device)
			    var startTimeout = parseIntRadixTen(DigiWebApp.SettingsController.getSetting('startTimeout'));
			    if (onMobile && typeof(device) == "undefined") startTimeout = DigiWebApp.SettingsController.defaultsettings_object.startTimeout;
        		DigiWebApp.ApplicationController.timeoutdeviceready_var = setTimeout("DigiWebApp.ApplicationController.timeoutdevicereadyhandler()", startTimeout);
        		//document.addEventListener("deviceready", DigiWebApp.ApplicationController.devicereadyhandler, false);
        		$(document).bind('deviceready', DigiWebApp.ApplicationController.devicereadyhandler);
        		
        	} else {
			    //if (inDebug() && staticDebugging) alert(navigator.platform + ", realregSecEv " + " device defined --> devicereadyhandler");
        		DigiWebApp.ApplicationController.devicereadyhandler();
        	}
        }

    }

    , setSkipEvents: function() {
        /*
         * Platfroms in the wild:
         * 		"BlackBerry"
         * 		"iPad"
         * 		"Linux armv5tejl" (Android 2.3.3 Emulator)
         * 		"Linux armv7l" (Samsung Galaxy Xcover, Probleme mit GPS (POSITION_UNAVAILABLE trotz aktiviertem GPS-Sensor))
         * 		"Linux armv7l" (Samsung Galaxy S2)
         * 		"Linux armv7l" (HTC Desire)
         */

        // using timeout-detection
        this.skipEvents = false;
    }
	
    , sizeMode: null
    
    , checkSizeModeChange: function() {
    	if (this.sizeMode === null || this.timeouthappened) {
			switch(true) {
				case(                          $(window).width()<320):
					if (this.sizeMode !== "w320") {
						this.sizeMode = "w320";
						return true;
					} else {
						return false;
					}
					break;
				case($(window).width()>=320  && $(window).width()<480):
					if (this.sizeMode !== "w480") {
						this.sizeMode = "w480";
						return true;
					} else {
						return false;
					}
					break;
				case($(window).width()>=480  && $(window).width()<640):
					if (this.sizeMode !== "w640") {
						this.sizeMode = "w640";
						return true;
					} else {
						return false;
					}
					break;
				case($(window).width()>=640  && $(window).width()<800):
					if (this.sizeMode !== "w800") {
						this.sizeMode = "w800";
						return true;
					} else {
						return false;
					}
					break;
				case($(window).width()>=800  && $(window).width()<1024):
					if (this.sizeMode !== "w1024") {
						this.sizeMode = "w1024";
						return true;
					} else {
						return false;
					}
					break;
				case($(window).width()>=1024  && $(window).width()<1080):
					if (this.sizeMode !== "w1080") {
						this.sizeMode = "w1080";
						return true;
					} else {
						return false;
					}
					break;
				case($(window).width()>=1080 && $(window).width()<1536):
					if (this.sizeMode !== "w1536") {
						this.sizeMode = "w1536";
						return true;
					} else {
						return false;
					}
					break;
				default:
					if (this.sizeMode !== "w5000") {
						this.sizeMode = "w5000";
						return true;
					} else {
						return false;
					}
					break;
			}
    	} else {
    		return false;
    	}
    }
    
    , setImageClass: function () {
    	var disableOnBlackBerry = true;
    	if ((M.Environment.getPlatform().substr(0,10) === "BlackBerry") && (disableOnBlackBerry)) {
    		console.log("We are on BlackBerry, so we skip dynamic Background!");
    	} else {
    		if (this.checkSizeModeChange()) {
    			
    			// get (new) branding
    			var myBranding = DigiWebApp.ApplicationController.CONSTDefaultBranding;
				if ( typeof(DigiWebApp.SettingsController) != "undefined" ) {
					var myBranding = DigiWebApp.SettingsController.getSetting("branding");
					if ( typeof(myBranding) == "undefined" || myBranding == "" ) {
						myBranding = DigiWebApp.ApplicationController.CONSTDefaultBranding;
					} else {
						myBranding = myBranding.toUpperCase();
					}
				}
				
				// remove old global branding from body
				removeClassFromElementByClassending('body', 'branding');
				
				// apply branding to body
				$('body').addClass(myBranding + "branding");
				
				// apply branding to each page
		        _.each(DigiWebApp.app.pages, function(myPage) {
		        	var firstTag = $('#' + myPage.id)[0];
		        	var mySizeMode = DigiWebApp.ApplicationController.sizeMode;
		        	if (    (firstTag.classList 
		        			 && (!firstTag.classList.contains(mySizeMode)))
		        	     || (firstTag.className.split(" ").indexOf(mySizeMode) === -1)
		        	) {
		        		// Bugfix 2142: Restyling in order to be consistent with DSO
		        		removeClassFromPageByClassending(myPage.Id, "_w320");
		        		removeClassFromPageByClassending(myPage.Id, "_w480");
		        		removeClassFromPageByClassending(myPage.Id, "_w640");
		        		removeClassFromPageByClassending(myPage.Id, "_w800");
		        		removeClassFromPageByClassending(myPage.Id, "_w1024");
		        		removeClassFromPageByClassending(myPage.Id, "_w1080");
		        		removeClassFromPageByClassending(myPage.Id, "_w1536");
		        		removeClassFromPageByClassending(myPage.Id, "_w5000");
		    	        $('#' + myPage.id).addClass(myBranding + "_" + mySizeMode);	
		        	}
		        });
    		}
    	}
	}

	, timeoutdeviceready_var: null
	, timeouthappened: false
	
	, timeoutdevicereadyhandler: function() {
		var that = this;
		if (DigiWebApp.ApplicationController.timeoutdeviceready_var !== null) clearTimeout(DigiWebApp.ApplicationController.timeoutdeviceready_var);
		if (that.devicereadyhandlerDone || that.realdevicereadyhandlerDone) return;
		DigiWebApp.ApplicationController.timeouthappened = true;
		var myStartInfo = "DIGI-WebApp hat Plattform \"" + M.Environment.getPlatform() + "\" (" + navigator.userAgent + ") erkannt. Es werden keine Eventhandler registriert! (Version " + M.Application.getConfig('version') + ")";
        console.log(myStartInfo);
        // if in Chrome: enable FileSystem
        if (typeof(navigator.webkitPersistentStorage) !== "undefined") {
        	window.requestFileSystem  = window.requestFileSystem || window.webkitRequestFileSystem;
        }
        writeToLog(myStartInfo);
        //this.skipEvents = true;
		this.devicereadyhandler();
	}
	
	, emergencyCode: "007RESET007"
	, emergencyStartedTimestamp: null
	, emergencyStringEntered: ''
	
	, keydownHandler: function(event) {
		if (event.timeStamp - DigiWebApp.ApplicationController.emergencyStartedTimestamp > 20000) {
			console.log("timeout: reset emergency-mechanism");
			DigiWebApp.ApplicationController.emergencyStartedTimestamp = event.timeStamp;
			DigiWebApp.ApplicationController.emergencyStringEntered = "";
		}
		var pos = DigiWebApp.ApplicationController.emergencyStringEntered.length;
		var whichKey = String.fromCharCode(event.which).toUpperCase();
		if (whichKey === DigiWebApp.ApplicationController.emergencyCode.substr(pos,1)) {
			DigiWebApp.ApplicationController.emergencyStringEntered = DigiWebApp.ApplicationController.emergencyStringEntered + whichKey;
		} else {
			DigiWebApp.ApplicationController.emergencyStartedTimestamp = event.timeStamp;
			DigiWebApp.ApplicationController.emergencyStringEntered = "";
			return true;
		}
		if (DigiWebApp.ApplicationController.emergencyStringEntered === DigiWebApp.ApplicationController.emergencyCode) {
			DigiWebApp.ApplicationController.emergencyStartedTimestamp = event.timeStamp;
			DigiWebApp.ApplicationController.emergencyStringEntered = "";
			DigiWebApp.ApplicationController.showConfirmDialog();
		}
		return true;
	}
	
	, fixToobarsIntervalVar: null
	
	, notificationMessage: M.I18N.l('abwesend')
	, notificationInitiated: NO
	, startNotification: function() {
		var that = this;

		if (!onIOS && !onAndroid23) {
			that.notificationMessage = localStorage.getItem(DigiWebApp.ApplicationController.storagePrefix + '_' + 'notificationMessage');
			if (that.notificationMessage == null) {
				that.notificationMessage = M.I18N.l('abwesend');
			}
			// notification.local is supposed to reside in "window.plugin"
			var pluginObj = window.plugin;
			if (typeof(pluginObj) == "undefined") {
				pluginObj = window.plugins;
			}
			if (!that.notificationInitiated && that.notificationMessage != M.I18N.l('abwesend')) {
				that.notificationInitiated = YES;
				try{pluginObj.notification.local.cancel('4711');}catch(e){}
				try{pluginObj.notification.local.cancel('4712');}catch(e){}
				//try{pluginObj.notification.local.cancelAll();}catch(e){}
				DigiWebApp.BookingController.startBookingNotification();
			}
	
			if (typeof(pluginObj) == 'undefined' || typeof(pluginObj.notification) == "undefined" || typeof(pluginObj.notification.local) == "undefined") {
				return false;
			}
			
			try {
				pluginObj.notification.local.hasPermission(function (granted) {
				    // console.log('Permission has been granted: ' + granted);
				});
				pluginObj.notification.local.promptForPermission();
		//		window.plugin.notification.local.add({
		//		      id:         String  // A unique id of the notifiction
		//		    , date:       Date    // This expects a date object
		//		    , message:    String  // The message that is displayed
		//		    , title:      String  // The title of the message
		//		    , repeat:     String  // Either 'secondly', 'minutely', 'hourly', 'daily', 'weekly', 'monthly' or 'yearly'
		//		    , badge:      Number  // Displays number badge to notification
		//		    , sound:      String  // A sound to be played
		//		    , json:       String  // Data to be passed through the notification
		//		    , autoCancel: Boolean // Setting this flag and the notification is automatically canceled when the user clicks it
		//		    , ongoing:    Boolean // Prevent clearing of notification (Android only)
		//		});
			} catch(e) {}
			try {
							
				try{window.plugin.notification.local.cancel('4711');}catch(e){}
				pluginObj.notification.local.add({
				      id:         '4711'
				    , message:    that.notificationMessage  // The message that is displayed
				    , title:      'DIGI-WebApp'  // The title of the message
				    , sound:      null  // A sound to be played
					, autoCancel: false // Setting this flag and the notification is automatically canceled when the user clicks it
				    , ongoing:    true // Prevent clearing of notification (Android only)
				});
				//alert("added notification '" + that.notificationMessage + "'");
			}catch(e){trackError(e);}
		}
	}

	, startBgGeo: function() {
		if (!onIOS && !onAndroid23) {
			try {
				
				// backgroundGeoLocation is supposed to reside in "window.plugins"
				var pluginObj = window.plugins;
				if (typeof(pluginObj) == "undefined") {
					pluginObj = window.plugin;
				}
				if (typeof(pluginObj) == 'undefined' || typeof(pluginObj.backgroundGeoLocation) == "undefined") {
					return false;
				}
				
				try {
					if (DigiWebApp.ApplicationController.bgGeo != null) {
						DigiWebApp.ApplicationController.bgGeo.stop();
					}
				} catch(e) {}
				
				DigiWebApp.ApplicationController.bgGeo = pluginObj.backgroundGeoLocation;
		
			    if (!DigiWebApp.SettingsController.getSetting('GPSBackgroundService')) {
			    	return false;
			    }
			    
				var yourAjaxCallback = function(response) {
			        bgGeo.finish();
			    };
	
			    /**
			    * This callback will be executed every time a geolocation is recorded in the background.
			    */
			    var callbackFn = function(location) {
			        yourAjaxCallback.call(this);
			    };
	
			    var failureFn = function(error) {
			    }
			    
				var myLocationTimeout = parseIntRadixTen(DigiWebApp.SettingsController.getSetting('GPSmaximumAgeMinutes') * 60);
			    if (myLocationTimeout == 0) {
			    	myLocationTimeout = 10;
			    }
			    	
			    DigiWebApp.ApplicationController.bgGeo.configure(callbackFn, failureFn, {
			    	url: 'http://localhost/',
			        desiredAccuracy: 100,
			        stationaryRadius: 20,
			        distanceFilter: 30,
			        locationTimeout: myLocationTimeout,
			        notificationTitle: M.I18N.l('GPSBackgroundServiceNotificationTitle'), // <-- android only, customize the title of the notification
			        notificationText: M.I18N.l('GPSBackgroundServiceNotificationMessage'), // <-- android only, customize the text of the notification
			        activityType: 'AutomotiveNavigation',
			        debug: false // <-- enable this hear sounds for background-geolocation life-cycle.
			    });
	
			    // Turn ON the background-geolocation system.  The user will be tracked whenever they suspend the app.
			    DigiWebApp.ApplicationController.bgGeo.start();
	
			    // If you wish to turn OFF background-tracking, call the #stop method.
			    // DigiWebApp.ApplicationController.bgGeo.stop()
	
			} catch(e) {
				console.log("unable to enable backgroundGeoLocation");
			}
		}
	}
	
	, devicereadyhandlerDone: false
	, devicereadyhandler: function() {
		var that = this;
		
		if (DigiWebApp.ApplicationController.timeoutdeviceready_var !== null) clearTimeout(DigiWebApp.ApplicationController.timeoutdeviceready_var);

		if (!that.devicereadyhandlerDone) that.devicereadyhandlerDone = true;
		
		// Your app must execute AT LEAST ONE call for the current position via standard Cordova geolocation,
	    //  in order to prompt the user for Location permission.
		try {
			if (typeof(window) != "undefined" && typeof(window.navigator) != "undefined" && typeof(window.navigator.geolocation) != "undefined" && typeof(window.navigator.geolocation.getCurrentPosition) != "undefined") {
				window.navigator.geolocation.getCurrentPosition(function(location) {
			    }, function(error) {
			    });
			}
		} catch(e) {
			
		}

	    $(window).bind('resize', function() {
            DigiWebApp.ApplicationController.setImageClass();
        });
        
		try {
			navigator.splashscreen.hide();
		} catch(e) {
			console.log("unable to hide splashscreen");
		}
		
		try {
			StatusBar.show();
			StatusBar.overlaysWebView(false);
			StatusBar.styleLightContent();
		} catch(e) {
			console.log("unable to modify StatusBar");
		}
		
		DigiWebApp.SettingsController.init(YES,YES);
        
		if (onIOS) {
			try{$('[id=' + DigiWebApp.SettingsPage.content.closeAppAfterCloseDay.id  + ']').each(function() { $(this).hide(); });}catch(e){}
			DigiWebApp.SettingsController.setSetting('closeAppAfterCloseDay', NO);
		}

		if (onIOS || onAndroid23) {
			try{$('[id=' + DigiWebApp.SettingsPage.content.GPSBackgroundService.id  + ']').each(function() { $(this).hide(); });}catch(e){}
			DigiWebApp.SettingsController.setSetting('GPSBackgroundService', NO);
			try{$('[id=' + DigiWebApp.SettingsPage.content.BookingReminderHoursGrid.id  + ']').each(function() { $(this).hide(); });}catch(e){}
			DigiWebApp.SettingsController.setSetting('BookingReminderHours', 0);
			//DigiWebApp.ApplicationController.startNotification();
		} else {
			DigiWebApp.ApplicationController.startBgGeo();
			DigiWebApp.ApplicationController.startNotification();
		}

		inDebug();
		
		try {
			if (DigiWebApp.SettingsController.featureAvailable('417')) {
				var fileNamesToDelete = [];
				DigiWebApp.ServiceAppController.listDirectory(function(results) {
					fileNamesToDelete = [];
					_.each(results, function(fileName) {
						if (fileName.search("DigiWebAppServiceApp.*.response.json") === 0) {
							if (DigiWebApp.SettingsController.getSetting("debug"))  console.log("delete " + fileName);
							fileNamesToDelete.push(fileName);
						}
					});
					DigiWebApp.ServiceAppController.deleteFilesInServiceApp(fileNamesToDelete, function(data){
						DigiWebApp.ApplicationController.realDeviceReadyHandler();
					}, function(){
						DigiWebApp.ApplicationController.realDeviceReadyHandler();
					});
				});
			} else {
				DigiWebApp.ApplicationController.realDeviceReadyHandler();
			}
		} catch (exDeleteFiles) {
			DigiWebApp.ApplicationController.realDeviceReadyHandler();
		}
	}
	
	, realdevicereadyhandlerDone: false
	, realDeviceReadyHandler: function() {
		var that = this;
		
		if (DigiWebApp.ApplicationController.timeoutdeviceready_var !== null) clearTimeout(DigiWebApp.ApplicationController.timeoutdeviceready_var);
		if (!that.realdevicereadyhandlerDone) that.realdevicereadyhandlerDone = true;

    	writeToLog("DIGI-WebApp deviceReady " + new Date().toString());

		DigiWebApp.ApplicationController.DigiLoaderView.hide();
		
		try {
			navigator.splashscreen.hide();
		} catch(e) {
			console.log("unable to hide splashscreen");
		}
		
		if ( M.Environment.getPlatform().substr(0,10) === "BlackBerry" ) {
    		// unfix header
			_.each(DigiWebApp.app.pages, function(myPage) {
				if ( typeof(myPage.header) !== "undefined" ) {
					$('#' + myPage.header.id ).removeClass("ui-header-fixed");
				}
			});
    		// unfix footer
    		$('[id=' + DigiWebApp.TabBar.id  + ']').each(function() {
				$(this).removeClass("ui-footer-fixed");
			});
    		//$(document).keydown(DigiWebApp.ApplicationController.keypressedHandler);
		} else {
			// refresh fixed toolbars every second
			//DigiWebApp.ApplicationController.fixToobarsIntervalVar = setInterval(function() {try { $.mobile.fixedToolbars.show(); } catch(e) { trackError(e); };}, 1000);
		}
    	
    	if (DigiWebApp.ApplicationController.timeoutdeviceready_var !== null) clearTimeout(DigiWebApp.ApplicationController.timeoutdeviceready_var);
		
    	DigiWebApp.ApplicationController.setImageClass();
	
    	DigiWebApp.ApplicationController.init(true);

        if ((this.skipEvents !== true) || (( M.Environment.getPlatform().substr(0,10) === "BlackBerry") && (DigiWebApp.ApplicationController.timeouthappened !== true))) {
        	$(document).bind('backbutton', DigiWebApp.ApplicationController.backbuttonhandler);
        	$(document).bind('menubutton', DigiWebApp.ApplicationController.menubuttonhandler);
        }
	        
	}
	
	, inAppBrowser_var: null
	
	, closeChildbrowser: function() {
		try {
			plugins.childBrowser.close();
		} catch(e) {
		}
		try {
			DigiWebApp.ApplicationController.inAppBrowser_var.close();
		} catch(e) {
		}
	}
       
    , backButtonTimeoutVar: null
    
    , backbuttonhandler: function() {
    	var ChefToolOnly = (DigiWebApp.SettingsController.featureAvailable('409'));
		if (DigiWebApp.SettingsController.HasCredentials()) {
	    	if (
	    	   (DigiWebApp.TabBar.tabItem1.isActive) 
	    	|| (ChefToolOnly && (M.ViewManager.getCurrentPage().get("id") === DigiWebApp.DashboardPage.get("id")))
	    	) {
	   
	    		if ( typeof(navigator.app) !== "undefined" ) {
	        		DigiWebApp.ApplicationController.nativeConfirmDialogView({
		            	  title: M.I18N.l('quitQuestion')
	    		        , message: M.I18N.l('quitQuestionMsg')
			            , confirmButtonValue: M.I18N.l('yes')
	            		, cancelButtonValue: M.I18N.l('no')
	            		, callbacks: {
	                		  confirm: {
	                    		  target: this
	                    		, action: function() {
	        								DigiWebApp.ApplicationController.exitApp();
	                    				}
	                			}
	                		, cancel: {
	                    		  target: this
	                    		, action: function() {
	                        				return;
	                    				}
	                		}
	            		}
	        		});
	
	    		}
	    		
	    	} else {
	    		// catch double-fire of backbutton-event via timeout
	    		DigiWebApp.ApplicationController.backButtonTimeoutVar = setTimeout("DigiWebApp.ApplicationController.backButtonToBookTimePage()",500);
	    		//DigiWebApp.NavigationController.toBookTimePage();
			}
		} else {
			DigiWebApp.SettingsController.EnforceCredentials();
		}
    }
    
    , registerButtonHandlerByTimeoutVar: null
    
    , registerButtonHandlerByTimeout: function() {
    	if (( M.Environment.getPlatform().substr(0,10) === "BlackBerry") && (DigiWebApp.ApplicationController.timeouthappened !== true)) {
    		console.log("registering buttonhandler again on blackberry");
        	$(document).bind('backbutton', DigiWebApp.ApplicationController.backbuttonhandler);
        	$(document).bind('menubutton', DigiWebApp.ApplicationController.menubuttonhandler);
    	}
    	clearTimeout(DigiWebApp.ApplicationController.registerButtonHandlerByTimeoutVar);
    }
    
    , backButtonToBookTimePage: function() {
    	clearTimeout(DigiWebApp.ApplicationController.backButtonTimeoutVar);
    	var ChefToolOnly = (DigiWebApp.SettingsController.featureAvailable('409'));
    	if (ChefToolOnly) {
			if (DigiWebApp.SettingsController.featureAvailable('404')) {
	    		DigiWebApp.NavigationController.toButtonDashboardPageFlipTransition();
			} else {
	    		DigiWebApp.NavigationController.toDashboardPageFlipTransition();
			}
    	} else {
    		DigiWebApp.NavigationController.toBookTimePageFlipTransition();
    	}
    }

    , menubuttonhandler: function() {
		if (DigiWebApp.SettingsController.HasCredentials()) {
			if (DigiWebApp.SettingsController.featureAvailable('404')) {
				DigiWebApp.NavigationController.backToButtonDashboardPageFlipTransition();
			} else {
				DigiWebApp.NavigationController.backToDashboardPageFlipTransition();
			}
		} else {
			DigiWebApp.SettingsController.EnforceCredentials();
		}
    }
    
    , showConfirmDialog: function() {
    	var that = this;
        DigiWebApp.ApplicationController.nativeConfirmDialogView({
              title: M.I18N.l('secretQuestion')
            , message: M.I18N.l('secretQuestionMsg')
            , confirmButtonValue: M.I18N.l('yes')
            , cancelButtonValue: M.I18N.l('no')
            , callbacks: {
                confirm: {
                      target: this
                    , action: function() {
                        // only clears entries of the app
                        // (with prefix: M.LOCAL_STORAGE_PREFIX + M.Application.name + M.LOCAL_STORAGE_SUFFIX)            
        				var zuruecksetzen = function(mycompany, mypassword, myconnectionCode, myworkerId) {
        					writeToLog("DIGI-WebApp wird zurückgesetzt");
        					DigiWebApp.SettingsController.credentialsAlertShown = false;
	    					DigiWebApp.ApplicationController.deleteAllData(); 
	                    	DigiWebApp.BookingController.currentBooking = null;
	                    	if (typeof(DigiWebAppOrdinaryDesign.bookingPageWithIconsScholpp) !== "undefined") {
	                        	$('#' + DigiWebApp.BookingPageWithIconsScholpp.content.currentBookingLabel.id).html("");
	                    	} else {
	                        	$('#' + DigiWebApp.BookingPage.content.currentBookingLabel.id).html("");
	                    	}
	                        // reset app by setting location new => like web page reload
	                        //location.href = location.protocol + '//' + location.host + location.pathname;
	                    	DigiWebApp.SettingsController.showIOSMessage = false;
	                    	//console.log(mycompany, mypassword, myconnectionCode, myworkerId);
	                    	if (mycompany !== null && mypassword !== null && myconnectionCode !== null && myworkerId !== null) {
	        					writeToLog("Zugangsdaten blieben erhalten");
	                    		DigiWebApp.SettingsController.init(YES,YES,YES);
								DigiWebApp.SettingsController.setSetting("company", mycompany, YES);
								DigiWebApp.SettingsController.setSetting("password", mypassword, YES);
								DigiWebApp.SettingsController.setSetting("connectionCode", myconnectionCode, YES);
								DigiWebApp.SettingsController.setSetting("workerId", myworkerId, YES);
								DigiWebApp.ApplicationController.doRestartApp();
	                    	}
	                        DigiWebApp.ApplicationController.init(true);
        				};
        	            DigiWebApp.ApplicationController.nativeConfirmDialogView({
	        	                title: M.I18N.l('keepCredentials')
	        	              , message: M.I18N.l('keepCredentialsMsg')
	        	              , confirmButtonValue: M.I18N.l('yes')
	        	              , cancelButtonValue: M.I18N.l('no')
	        	              , callbacks: {
		        	                  confirm: {
			    	                        target: this
			    	                      , action: function() {
			    								var Scompany = DigiWebApp.SettingsController.getSetting("company");
			    								var Spassword = DigiWebApp.SettingsController.getSetting("password");
			    								var SconnectionCode = DigiWebApp.SettingsController.getSetting("connectionCode");
			    								var SworkerId = DigiWebApp.SettingsController.getSetting("workerId");
			    								zuruecksetzen(Scompany, Spassword, SconnectionCode, SworkerId);
			    	            		  }
		        	            	}
			                        , cancel: {
				                            target: this
				                          , action: function() {
				                        		zuruecksetzen(null, null, null, null);
				                          }
				                    }
	        	              }
        	            });
                    }
                }
                , cancel: {
                      target: this
                    , action: function() {
                    	that.clickCounter = 0;
                    }
                }
            }
        });
    }

    , setTransitionsSetting: function() {
        /*
         * Platfroms in the wild:
         * 		"BlackBerry"
         * 		"iPad"
         * 		"Linux armv5tejl" (Android 2.3.3 Emulator)
         * 		"Linux armv7l" (Samsung Galaxy Xcover, Probleme mit GPS (POSITION_UNAVAILABLE trotz aktiviertem GPS-Sensor))
         * 		"Linux armv7l" (Samsung Galaxy S2)
         * 		"Linux armv7l" (HTC Desire)
         */
    	var deviceversion = "0";
    	if (typeof(device) !== "undefined") deviceversion = new String(device.version);

    	var deviceplatform = "";
    	if (typeof(device) !== "undefined") deviceplatform = new String(device.platform);

    	var myPlatform = M.Environment.getPlatform();
        if (       ( myPlatform.substr(-2)  === "86" )
        		|| ( myPlatform.substr(-3)  === "_64" )
        		|| ( myPlatform.substr(-5)  === "Win32" )
        		|| ( myPlatform.substr(-5)  === "Win64" )
        		|| ( myPlatform.substr(0,3) === "Mac" )
        		|| ( myPlatform.substr(0,6) === "iPhone")
        		|| ( myPlatform.substr(0,4) === "iPad")
        		|| ( ( deviceversion.substr(0,1) >= 4 ) && ( deviceplatform.substr(0,7) >= "Android" ) )
        	) {
        	// enable Transitions (if not ButtonMenu is enabled (404 yet breaks Transitions))
            M.Application.config.useTransitions = (DigiWebApp.SettingsController.getSetting('useTransitionsSetting') && !DigiWebApp.SettingsController.featureAvailable('404'));
            //M.Application.config.useTransitions = NO; // transitions are ugly in jquery 1.1.0
        } else {
            M.Application.config.useTransitions = NO;
        }
    }
    
    /**
     * init is called by the pageshow event defined in DigiWebApp.SplashViewPage.
     * It initializes the callbackStatus object and the application's settings.
     * After that it reads the company and password setting. If they are not defined, an alert appears, indicating that
     * no credentials are entered and the app redirects to the settings page.
     * If credentials are entered, the data receiving process is started by calling
     * authenticate of this controller.
     *
     *
     * @param isFirstLoad is passed if this function is used in a page event like pageshow => determines that the page is loaded for the very
     * first time during this application life cycle
     */
    , init: function(isFirstLoad) {

    	DigiWebApp.TabBar.tabItem1.internalEvents.tap.action = function () {
            if(this.page) {
                M.Controller.switchToTab(this,YES);
            } else {
                this.parentView.setActiveTab(this);
            }
        };
    	DigiWebApp.TabBar.tabItem2.internalEvents.tap.action = function () {
            if(this.page) {
                M.Controller.switchToTab(this,NO);
            } else {
                this.parentView.setActiveTab(this);
            }
        };
       
       DigiWebApp.ApplicationController.callbackStatus = {
            position: {
                  remote: NO
                , local: NO
            }
            , activity: {
                  remote: NO
                , local: NO
            }
            , order: {
                  remote: NO
                , local: NO
            }
            , workPlan: {
                  remote: NO
                , local: NO
            }
            , handOrder: {
                  remote: NO
                , local: NO
            }
            , kolonne: {
                  remote: NO
                , local: NO
            }
            , features: {
                  remote: NO
                , local: NO
            }
        };
        
        // set settings
        DigiWebApp.SettingsController.init(YES,YES);
        
//		if (inDebug() && onIOS) {
//			DigiWebApp.SettingsController.setSetting("debugDatabaseServer", "vespasian.digi-zeiterver.de");
//		}
		
        DigiWebApp.ApplicationController.setTransitionsSetting();
        
        var fortfahren = function() {
	        // gibt es eine offene Buchung?
	        var bookings = DigiWebApp.Booking.find();

	        if (bookings.length > 0) {
	            var isCurrentBookingAvailable = NO;
	            for (var i = 0; i < bookings.length; i++) {
	                if (bookings[i].get('isCurrent') === YES) {
	                	isCurrentBookingAvailable = YES;
	                    break;
	                }
	            }
	            if (isCurrentBookingAvailable === YES) {
	            	DigiWebApp.NavigationController.toBookTimePage();
	            	if (parseBool(DigiWebApp.SettingsController.getSetting('stammdatenabgleichBeimAppStart'))) {
		                DigiWebApp.BookingController.sendBookings(NO, YES);
	            	}
	                return;
	            } else {
	            	DigiWebApp.NavigationController.toBookTimePage();
	                DigiWebApp.BookingController.sendBookings(NO, YES);
	            }
	        } else if (
	           (DigiWebApp.SettingsController.featureAvailable("402") && !DigiWebApp.BookingController.currentBooking) 
		    || (DigiWebApp.SettingsController.featureAvailable("426") && !DigiWebApp.BookingController.currentBooking) 
	        ){
            	        	
	        	DigiWebApp.BautagebuchDatenuebertragungController.ausgekoppelteSenden(function(){
					DigiWebApp.NavigationController.toBookTimePage();
					DigiWebApp.ApplicationController.startsync();
    			});
            		
            } else {

            	DigiWebApp.NavigationController.toBookTimePage();
	        	DigiWebApp.ApplicationController.startsync();
	        	
	        }
        };
        
        if (DigiWebApp.SettingsController.EnforceCredentials()) {
        	DigiWebApp.ApplicationController.updateModels(fortfahren);
        }
                
    }
    
    , enforceChefToolOnly: function(hideOverrideOverride) {
    	var hideOverride = (DigiWebApp.SettingsController.showCredentialsAlert || !DigiWebApp.SettingsController.HasCredentials() || hideOverrideOverride);
    	var ChefToolOnly = (DigiWebApp.SettingsController.featureAvailable('409'));
		if (DigiWebApp.SettingsController.featureAvailable('417')) { 
			try{$('[id=' + DigiWebApp.SettingsPage.content.ServiceApp_ermittleGeokoordinate.id  + ']').each(function() { $(this).show(); });}catch(e){}
			try{$('[id=' + DigiWebApp.SettingsPage.content.ServiceApp_datenUebertragen.id  + ']').each(function() { $(this).show(); });}catch(e){}
			try{$('[id=' + DigiWebApp.SettingsPage.content.ServiceApp_engeKopplung.id  + ']').each(function() { $(this).show(); });}catch(e){}
			try{$('[id=' + DigiWebApp.SettingsPage.content.ServiceApp_PORTGrid.id  + ']').each(function() { $(this).show(); });}catch(e){}
			try{$('[id=' + DigiWebApp.SettingsPage.content.ServiceApp_FallBack.id  + ']').each(function() { $(this).show(); });}catch(e){}
		} else {
			try{$('[id=' + DigiWebApp.SettingsPage.content.ServiceApp_ermittleGeokoordinate.id  + ']').each(function() { $(this).hide(); });}catch(e){}
			try{$('[id=' + DigiWebApp.SettingsPage.content.ServiceApp_datenUebertragen.id  + ']').each(function() { $(this).hide(); });}catch(e){}
			try{$('[id=' + DigiWebApp.SettingsPage.content.ServiceApp_engeKopplung.id  + ']').each(function() { $(this).hide(); });}catch(e){}
			try{$('[id=' + DigiWebApp.SettingsPage.content.ServiceApp_PORTGrid.id  + ']').each(function() { $(this).hide(); });}catch(e){}
			try{$('[id=' + DigiWebApp.SettingsPage.content.ServiceApp_FallBack.id  + ']').each(function() { $(this).hide(); });}catch(e){}
		}
		if (ChefToolOnly || hideOverride) {
	    	// hide tabbar
			try{$('[id=' + DigiWebApp.TabBar.id  + ']').each(function() { $(this).hide(); });}catch(e){}
			// hide checkboxes in settings
			try{$('[id=' + DigiWebApp.SettingsPage.content.autoTransferAfterBookTimeCheck.id  + ']').each(function() { $(this).hide(); });}catch(e){}
			try{$('[id=' + DigiWebApp.SettingsPage.content.autoTransferAfterClosingDayCheck.id  + ']').each(function() { $(this).hide(); });}catch(e){}
			try{$('[id=' + DigiWebApp.SettingsPage.content.autoSyncAfterBookTimeCheck.id  + ']').each(function() { $(this).hide(); });}catch(e){}
			try{$('[id=' + DigiWebApp.SettingsPage.content.stammdatenabgleichBeimAppStartCheck.id  + ']').each(function() { $(this).hide(); });}catch(e){}
			try{$('[id=' + DigiWebApp.SettingsPage.content.remarkIsMandatory.id  + ']').each(function() { $(this).hide(); });}catch(e){}
			try{$('[id=' + DigiWebApp.SettingsPage.content.autoSaveGPSData.id  + ']').each(function() { $(this).hide(); });}catch(e){}
			try{$('[id=' + DigiWebApp.SettingsPage.content.daysToHoldBookingsOnDeviceSliderContainer.id  + ']').each(function() { $(this).hide(); });}catch(e){}
			try{$('[id=' + DigiWebApp.SettingsPage.content.auftragsDetailsKoppeln.id  + ']').each(function() { $(this).hide(); });}catch(e){}
			try{$('[id=' + DigiWebApp.SettingsPage.content.detailierteZeitdaten.id  + ']').each(function() { $(this).hide(); });}catch(e){}
			try{$('[id=' + DigiWebApp.SettingsPage.content.vibrationsDauerSliderContainer.id  + ']').each(function() { $(this).hide(); });}catch(e){}
			try{$('[id=' + DigiWebApp.SettingsPage.content.GPSenableHighAccuracy.id  + ']').each(function() { $(this).hide(); });}catch(e){}
			try{$('[id=' + DigiWebApp.SettingsPage.content.GPSenableHighAccuracyFallback.id  + ']').each(function() { $(this).hide(); });}catch(e){}
			try{$('[id=' + DigiWebApp.SettingsPage.content.GPSmaximumAgeMinutesGrid.id  + ']').each(function() { $(this).hide(); });}catch(e){}
			try{$('[id=' + DigiWebApp.SettingsPage.content.GPSBackgroundService.id  + ']').each(function() { $(this).hide(); });}catch(e){}
			try{$('[id=' + DigiWebApp.SettingsPage.content.BookingReminderHoursGrid.id  + ']').each(function() { $(this).hide(); });}catch(e){}
			try{$('[id=' + DigiWebApp.SettingsPage.content.closeAppAfterCloseDay.id  + ']').each(function() { $(this).hide(); });}catch(e){}
		} else {
	    	// show tabbar
			try{$('[id=' + DigiWebApp.TabBar.id  + ']').each(function() { $(this).show(); });}catch(e){}
			try{$('[id=' + DigiWebApp.SettingsPage.content.detailierteZeitdaten.id  + ']').each(function() { $(this).show(); });}catch(e){}
			// show checkboxes in settings
			try{$('[id=' + DigiWebApp.SettingsPage.content.autoTransferAfterBookTimeCheck.id  + ']').each(function() { $(this).show(); });}catch(e){}
			try{$('[id=' + DigiWebApp.SettingsPage.content.autoTransferAfterClosingDayCheck.id  + ']').each(function() { $(this).show(); });}catch(e){}
			try{$('[id=' + DigiWebApp.SettingsPage.content.autoSyncAfterBookTimeCheck.id  + ']').each(function() { $(this).show(); });}catch(e){}
			try{$('[id=' + DigiWebApp.SettingsPage.content.stammdatenabgleichBeimAppStartCheck.id  + ']').each(function() { $(this).show(); });}catch(e){}
			if (DigiWebApp.SettingsController.featureAvailable('403')) { 
				try{$('[id=' + DigiWebApp.SettingsPage.content.remarkIsMandatory.id  + ']').each(function() { $(this).show(); });}catch(e){}
			}
			try{$('[id=' + DigiWebApp.SettingsPage.content.autoSaveGPSData.id  + ']').each(function() { $(this).show(); });}catch(e){}
			if (DigiWebApp.SettingsController.featureAvailable('411')) { 
				try{$('[id=' + DigiWebApp.SettingsPage.content.daysToHoldBookingsOnDeviceSliderContainer.id  + ']').each(function() { $(this).show(); });}catch(e){}
			}
			if (DigiWebApp.SettingsController.featureAvailable('406')) { 
				try{$('[id=' + DigiWebApp.SettingsPage.content.auftragsDetailsKoppeln.id  + ']').each(function() { $(this).show(); });}catch(e){}
			}
			try{$('[id=' + DigiWebApp.SettingsPage.content.vibrationsDauerSliderContainer.id  + ']').each(function() { $(this).show(); });}catch(e){}
			try{$('[id=' + DigiWebApp.SettingsPage.content.GPSenableHighAccuracy.id  + ']').each(function() { $(this).show(); });}catch(e){}
			try{$('[id=' + DigiWebApp.SettingsPage.content.GPSenableHighAccuracyFallback.id  + ']').each(function() { $(this).show(); });}catch(e){}
			try{$('[id=' + DigiWebApp.SettingsPage.content.GPSmaximumAgeMinutesGrid.id  + ']').each(function() { $(this).show(); });}catch(e){}
			try{$('[id=' + DigiWebApp.SettingsPage.content.GPSBackgroundService.id  + ']').each(function() { $(this).show(); });}catch(e){}
			try{$('[id=' + DigiWebApp.SettingsPage.content.BookingReminderHoursGrid.id  + ']').each(function() { $(this).show(); });}catch(e){}
			try{$('[id=' + DigiWebApp.SettingsPage.content.closeAppAfterCloseDay.id  + ']').each(function() { $(this).show(); });}catch(e){}
		}
		

    }

    , startsync: function(isFirstLoad) {
    	var that = this;
    	DigiWebApp.JSONDatenuebertragungController.authentifizieren(function() {
    		that.startsyncAuthenticated(isFirstLoad);
    	})
    }
    
    , startsyncAuthenticated: function(isFirstLoad) {
    	var that = this;

    	writeToLog("startsync");

    	DigiWebApp.ApplicationController.syncStartTimestamp = D8.now().getTimestamp();

        M.Application.config.useTransitions = NO;

    	DigiWebApp.ApplicationController.syncRunning = YES;

        // nach Upload der Sonderbuchungen mit regulärem Stammdatenabgleich weitermachen
        var contSync = function() {
        	DigiWebApp.JSONDatenuebertragungController.sendeKonfiguration(
        		  that.getFeaturesFromRemote        		
        		, that.getFeaturesFromRemote
        	);
        }
        
        // Sende Sonderbuchungen
        var isClosingDay = (!DigiWebApp.BookingController.currentBooking);
        var mySonderbuchungen = _.filter(DigiWebApp.Sonderbuchung.find(), function(n) { return !parseBool(n.get("uebertragen")) });
        DigiWebApp.JSONDatenuebertragungController.sendeSonderbuchungen(mySonderbuchungen, contSync, contSync, isClosingDay);
            	
    }
    
    /**
     * Simply displays an alert dialog indicating an connection error.
     * The button of the dialog is linked to the proceedWithLocalData function of this controller.
     * That means, when a connection error during data retrieval appears, the app proceeds with local data (if possible).
     */
    , connectionError: function() {
    	//DialogView.alert with action
        //M.DialogView.alert({
        DigiWebApp.ApplicationController.nativeAlertDialogView({
              title: M.I18N.l('connectionError')
            , message: M.I18N.l('connectionErrorMsg')
            , callbacks: {
                confirm: {
                      target: this
                    , action: 'proceedWithLocalData'
                }
            }
        });
    }

    /**
     * Checks whether it is possible to work with local data.
     * Possible if Orders, Positions and Activities are available locally.
     *
     * Navigates to booking page if it is possible and displays an alert dialog showing the user
     * that the app is working with offline data.
     *
     * Otherwise it displays an alert dialog showing that offline work is not possible
     */
    , proceedWithLocalData: function(fromwhere, exceptionMessage) {

		var that = DigiWebApp.ApplicationController;
		
		// TODO: Exception vom Zeitserver auswerten
		var reason = "";
		if (typeof(exceptionMessage) == "string" && exceptionMessage.length > 0) {
			reason = ": " + exceptionMessage;
		}

		that.enforceChefToolOnly();
    	var ChefToolOnly = (DigiWebApp.SettingsController.featureAvailable('409'));    	
    	if (!ChefToolOnly) {

	        // check order
	        if(DigiWebApp.Order.findSorted().length > 0) {
	            that.setCallbackStatus('order', 'local', YES);
	        }
	        
	        // check positions
	        if(DigiWebApp.Position.findSorted().length > 0) {
	            that.setCallbackStatus('position', 'local', YES);
	        }
	        
	        // check activities
	        if(DigiWebApp.Activity.findSorted().length > 0) {
	            that.setCallbackStatus('activity', 'local', YES);
	        }
	        
	        // check features
	        if(DigiWebApp.Features.find().length > 0) {
	            that.setCallbackStatus('features', 'local', YES);
	        }
	
	        if (DigiWebApp.SettingsController.globalDebugMode) {
	            DigiWebApp.ApplicationController.nativeAlertDialogView({
	                  title: M.I18N.l('offlineWork')
	                , message: fromwhere + reason
	            });
	        }
	        
	        if(that.isReadyToProceed()) {
	            DigiWebApp.NavigationController.toBookTimePage(YES);
	
	            //M.DialogView.alert({
	            DigiWebApp.ApplicationController.nativeAlertDialogView({
	                  title: M.I18N.l('offlineWork')
	                , message: M.I18N.l('offlineWorkMsg')
	            });
	        } else {
	        	var Bautagebuch = (DigiWebApp.SettingsController.featureAvailable('412'));
	        	var ChefToolOnly = (DigiWebApp.SettingsController.featureAvailable('409'));
	    		if (ChefToolOnly && Bautagebuch) {
	        		DigiWebApp.NavigationController.startBautagebuch();    			
	    		} else {
					if (DigiWebApp.SettingsController.featureAvailable('404')) {
			            DigiWebApp.NavigationController.toButtonDashboardPage();
					} else {
			            DigiWebApp.NavigationController.toDashboardPage();
					}
	    		}
	            //M.DialogView.alert({
	            DigiWebApp.ApplicationController.nativeAlertDialogView({
	                  title: M.I18N.l('offlineWorkNotPossible')
	                , message: M.I18N.l('offlineWorkNotPossibleMsg')
	            });
	        }
    	} else {
        	var Bautagebuch = (DigiWebApp.SettingsController.featureAvailable('412'));
        	var ChefToolOnly = (DigiWebApp.SettingsController.featureAvailable('409'));
    		if (ChefToolOnly && Bautagebuch) {
        		DigiWebApp.NavigationController.startBautagebuch();    			
    		} else {
				if (DigiWebApp.SettingsController.featureAvailable('404')) {
		            DigiWebApp.NavigationController.toButtonDashboardPage();
				} else {
		            DigiWebApp.NavigationController.toDashboardPage();
				}
    		}
    	}
    }
    
    , timestampMitarbeiterZuletztGeladen: null
    
    , getPositionsFromRemote: function() {
    	var that = this;

    	that.setCallbackStatus('position', 'local', NO);
    	DigiWebApp.JSONDatenuebertragungController.empfangePositionen(
    			  function() {
      				that.setCallbackStatus('position', 'remote', YES);
    		    	that.setCallbackStatus('position', 'local', (DigiWebApp.Position.find().length > 0));
    				that.setCallbackStatus('order', 'remote', YES);
    		    	that.setCallbackStatus('order', 'local', (DigiWebApp.Order.find().length > 0));
    				that.getOrdersFromRemote();
    			  }
    			, function() {
  				  	that.setCallbackStatus('position', 'remote', NO);
  				  	that.setCallbackStatus('order', 'remote', NO);
    				that.proceedWithLocalData("getPositionsFromRemote");
    			}
    	);
    }

    , getOrdersFromRemote: function() {
    	var that = this;
    	// Freischaltung 429 "mehrstufige Auftragsauswahl"
    	// Freischaltung 430 "Handpositionen"
		if (
			   !DigiWebApp.SettingsController.featureAvailable("429")
			&& !DigiWebApp.SettingsController.featureAvailable("430")
		) {
			return that.getActivitiesFromRemote();
		}
    	that.setCallbackStatus('order', 'local', NO);
    	DigiWebApp.JSONDatenuebertragungController.empfangeAuftraege(
    			  function() {
    				that.setCallbackStatus('order', 'remote', YES);
    		    	that.setCallbackStatus('order', 'local', (DigiWebApp.Order.find().length > 0));
    				that.getActivitiesFromRemote();
    			  }
    			, function() {
  				  	that.setCallbackStatus('order', 'remote', NO);
    				that.proceedWithLocalData("getOrdersFromRemote");
    			}
    	);
    }

    /**
     * Calls getActivities on DigiWebApp.RequestController.
     * Success callback proceeds received activities and afterwards starts retrieving workplans.
     * Error callback calls proceedWithLocalData to check whether offline work is possible.
     */
    , getActivitiesFromRemote: function() {
    	var that = this;

    	that.setCallbackStatus('activity', 'local', NO);
    	DigiWebApp.JSONDatenuebertragungController.empfangeTaetigkeiten(
    			  function() {
    				that.setCallbackStatus('activity', 'remote', YES);
    		    	that.setCallbackStatus('activity', 'local', (DigiWebApp.Activity.find().length > 0));
    				that.getWorkPlansFromRemote();
    			  }
    			, function() {
  				  	that.setCallbackStatus('activity', 'remote', NO);
    				that.proceedWithLocalData("getActivitiesFromRemote");
    			}
    	);
    	
    }


    /**
     * Calls getWorkPlans on DigiWebApp.RequestController.
     * Success callback proceeds received work plans and afterwards starts retrieving hand orders.
     * Error callback calls proceedWithLocalData to check whether offline work is possible.
     */
    // Bugfix: 3265 XML-WebService -> RESTful
    // empfangeArbeitplanNeu -> arbeitplaene
    , getWorkPlansFromRemote: function() {
    	var successFunc = function(data, msg, xhr) {
    		DigiWebApp.ApplicationController.getWorkPlansFromRemoteSuccessRestful(data, msg, xhr);
    		DigiWebApp.ApplicationController.getHandOrdersFromRemote();
    	 };
    	var errorFunc = function() {
    		trackError("getWorkPlansFromRemote-error");
    		DigiWebApp.ApplicationController.proceedWithLocalData("getWorkPlansFromRemote");
    	};
    	var receiveObj = {
    		  webservice: 'arbeitsplaene'
    		, loaderText: M.I18N.l('getWorkPlansLoader')
    		, successCallback: successFunc
    		, errorCallback: errorFunc
    		, additionalQueryParameter : ''
    		, geraeteIdOverride: false
    		, modus: '0'
        };
    	DigiWebApp.JSONDatenuebertragungController.recieveData(receiveObj);
    }

    /**
     * The success callback for getWorkPlansFromRemote.
     * If correct data is in response the following is done:
     * 1) the callback status for 'workplan' and 'remote' is set (means work plans are correctly returned by server)
     * 2) the local available work plans are deleted, the corresponding callback status is set
     * 3) work plans, received from remote service, are saved in localstorage again and the corresponding status is set to YES
     *
     * @param data The returned data of the server in JSON, means JS object.
     * @param msg
     * @param xhr The XMLHTTPRequest object.
     */
    , getWorkPlansFromRemoteSuccessRestful: function(data, msg, xhr) {
    	var that = DigiWebApp.ApplicationController;
    	// data is object
    	if (data !== null || data !== '') {
    		var receivedWorkPlans;
    		if(typeof(data) === 'object')
    		  receivedWorkPlans = data['arbeitsplaene'];
    		else {
    			var workPlansObject = JSON.parse(data);
    			receivedWorkPlans = workPlansObject['arbeitsplaene']
    		}	
    		that.setCallbackStatus('workPlan', 'remote', YES);
    		// Clear activities from storage
    		DigiWebApp.WorkPlan.deleteAll();
    		that.setCallbackStatus('workPlan', 'local', NO);
    		// create a record for each order returned from the server and save it
    		DigiWebApp.ApplicationController.DigiProgressView.show(
    			M.I18N.l('Save'), 
    			M.I18N.l('workplans'), 
    			receivedWorkPlans.length, 
    			0);
    		_.each(receivedWorkPlans, function(el) {
    			var myPositions = '';
    			if(el.leistungsIds !== '') {
    				var myArray = [];
    				var length = el.leistungsIds.split(',').length;
    				for(var i = 1; i <= length; i++)
    					myArray.push(i.toString());
    				if(myArray.length > 0)
    					myPositions = myArray.join(',');
    			}
    			DigiWebApp.WorkPlan.createRecord({
    				  id: el.positionsId.toString()
    				, workplanType: el.nurZugeordneteLeistungen ? '1' : '0'
    				, activityPositions: myPositions
    				, activityIds: el.leistungsIds
    			}).save();
    			DigiWebApp.ApplicationController.DigiProgressView.increase();
    		});
    		DigiWebApp.ApplicationController.DigiProgressView.hide();
    		that.setCallbackStatus('workPlan', 'local', YES);
    	}
    }
    
    /**
     * Calls getHandOrders on DigiWebApp.RequestController.
     * Success callback proceeds received hand orders and afterwards starts retrieving features.
     * Error callback calls proceedWithLocalData to check whether offline work is possible.
     */
    // Bugfix: 3265 XML-WebService -> RESTful
    // empfangeHandauftraege -> handauftraege
    , getHandOrdersFromRemote: function() {
    	var successFunc = function(data, msg, xhr) {
    		DigiWebApp.ApplicationController.getHandOrdersFromRemoteSuccessRestful(
    			data, 
    			msg, 
    			xhr);
    		DigiWebApp.ApplicationController.getKolonneFromRemote();
    	};
    	var errorFunc =  function() {
    		trackError("getHandOrdersFromRemote-error");
    		DigiWebApp.ApplicationController.proceedWithLocalData("getHandOrdersFromRemote");
    	};
    	var receiveObj = {
    		  webservice: 'handauftraege'
    		, loaderText: M.I18N.l('getHandOrdersLoader')
    		, successCallback: successFunc
    		, errorCallback: errorFunc
    		, additionalQueryParameter : ''
    		, geraeteIdOverride: false
    		, modus: '0'
    	};
    	DigiWebApp.JSONDatenuebertragungController.recieveData(receiveObj);
    }
    
    /**
     * The success callback for getHandOrdersFromRemote.
     * If correct data is in response the following is done:
     * 1) the callback status for 'handOrder' and 'remote' is set (means hand orders are correctly returned by server)
     * 2) the local available hand orders are deleted, the corresponding callback status is set
     * 3) hand orders, received from remote service, are saved in localstorage again and the corresponding status is set to YES
     *
     * @param data The returned data of the server in JSON, means JS object.
     * @param msg
     * @param xhr The XMLHTTPRequest object.
     */
    , getHandOrdersFromRemoteSuccessRestful: function(data, msg, xhr) {
    	var that = DigiWebApp.ApplicationController;
    	if (data !== null || data !== '') {
    		var receivedHandOrders;
    		if(typeof(data) === 'object')
    			receivedHandOrders = data['handauftraege'];
    		else {
    			var handOrdersObject = JSON.parse(data);
    			receivedHandOrders = handOrdersObject['handauftraege'];
    		}
    		
    		that.setCallbackStatus('handOrder', 'remote', YES);
    		// Clear handorders from storage
    		DigiWebApp.HandOrder.deleteAll();
    		that.setCallbackStatus('handOrder', 'local', NO);
    		
    		var mIdArray = [];
    		var rec = null;
    		// create a record for each order returned from the server and save it
    		DigiWebApp.ApplicationController.DigiProgressView.show(
    			M.I18N.l('Save'), 
    			M.I18N.l('handorders'), 
    			receivedHandOrders.length, 
    			0);
    		_.each(receivedHandOrders, function(el) {
    			if (
    				(DigiWebApp.HandOrder.find(
    					{query:{identifier: 'id', operator: '=', value: el.handauftragsId}}).length === 0)
    				&& (DigiWebApp.HandOrder.find(
    					{query:{identifier: 'name', operator: '=', value: el.handauftragsBezeichnung}}).length === 0)
    			) {
    				rec = DigiWebApp.HandOrder.createRecord({
    					  id: el.handauftragsId
      					, name: el.handauftragsBezeichnung
    					, vaterId: el.auftragsId
    					, isLocalOnly: NO
    				});
    			} else if (
    					DigiWebApp.HandOrder.find(
    						{query:{identifier: 'id', operator: '=', value: el.handauftragsId}}).length !== 0) {
    				rec = DigiWebApp.HandOrder.find(
    					{query:{identifier: 'id', operator: '=', value: el.handauftragsId}})[0];
    				rec.set("id", el.handauftragsId);
    				rec.set("vaterId", el.auftragsId);
    				rec.set("name", el.handauftragsBezeichnung);
    				rec.set("isLocalOnly", NO);
    			} else if (
    				DigiWebApp.HandOrder.find(
    					{query:{identifier: 'name', operator: '=', value: el.handauftragsBezeichnung}}).length !== 0) {
    				rec = DigiWebApp.HandOrder.find(
    					{query:{identifier: 'name', operator: '=', value: el.handauftragsBezeichnung}})[0];
    				rec.set("id", el.handauftragsId);
    				rec.set("vaterId", el.auftragsId);
    				rec.set("name", el.handauftragsBezeichnung);
    				rec.set("isLocalOnly", NO);
    			}
    			try {
    				rec.save();
    				mIdArray.push(rec.m_id);
    				_.each(DigiWebApp.Booking.find(), function(booking) {
    					if (booking.get('handOrderId') !== null && 
    						booking.get('handOrderId') === el.handauftragsBezeichnung) {
    						booking.set("handOrderVaterId", el.auftragsId);
    						booking.set("handOrderId", el.handauftragsId);
    						booking.save();
    					}
    				});
    			} catch(e) {
    				trackError(e);
    			}
    			DigiWebApp.ApplicationController.DigiProgressView.increase();
    		});

    		// get locally saved hand orders and push them into mId array
    		var locals = _.select(DigiWebApp.HandOrder.findSorted(), function(ho) {
    			if (ho) return ho.get('isLocalOnly') === YES;
    		});
    		
    		_.each(locals, function(el) {
    			mIdArray.push(el.m_id);
    		});
    		localStorage.setItem(that.storagePrefix + '_handorderKeys', JSON.stringify(mIdArray));
    		DigiWebApp.ApplicationController.DigiProgressView.hide();
			if (DigiWebApp.BookingController.currentBooking == null) {
				DigiWebApp.SelectionController.setSelectionWithCurrentHandOrderFirst();
			} else {
				DigiWebApp.SelectionController.setSelectionByCurrentBooking();
			}
    		that.setCallbackStatus('handOrder', 'local', YES);
    	} else {
    		that.setCallbackStatus('handOrder', 'remote', NO);
    		// Clear handorders from storage
    		DigiWebApp.HandOrder.deleteAll();
    		DigiWebApp.ApplicationController.DigiProgressView.hide();
    		that.setCallbackStatus('handOrder', 'local', NO);
    	}
    }

    /**
     * Calls getFeatures on DigiWebApp.RequestController.
     * Success callback proceeds received features data.
     * Error callback calls proceedWithLocalData to check whether offline work is possible.
     */
    // Bugfix: 3265 XML-WebService -> RESTful
    // DatenTransferHttpSoap11Endpoint -> konfigurationen
    , getFeaturesFromRemote: function() {
		var that = DigiWebApp.ApplicationController;
    	that.setCallbackStatus('features', 'remote', NO);
    	var successFunc = function(data, msg, xhr) {
    		DigiWebApp.ApplicationController.getFeaturesFromRemoteSuccessRestful(data, msg, xhr);
			var ChefToolOnly = (DigiWebApp.SettingsController.featureAvailable('409'));
			var Bautagebuch = (DigiWebApp.SettingsController.featureAvailable('412'));
			if (ChefToolOnly && !Bautagebuch) {
				//TODO: Stammdaten für Bautagebuch laden
				//DigiWebApp.ApplicationController.endSession();
			} else {
				//DigiWebApp.ApplicationController.getOrdersFromRemote();
				DigiWebApp.ApplicationController.getPositionsFromRemote();
			}
    	};
		var errorFunc =  function() {
			trackError("getFeaturesFromRemote-error");
			DigiWebApp.ApplicationController.getPositionsFromRemote();
		};
		var receiveObj = {
    		  webservice: 'konfigurationen'
    		, loaderText: M.I18N.l('getFeaturesLoader')
    		, successCallback: successFunc
    		, errorCallback: errorFunc
    		, additionalQueryParameter : ''
    		, geraeteIdOverride: false
    		, modus: '0'
		};
		DigiWebApp.JSONDatenuebertragungController.recieveData(receiveObj);
    }
    
    , getFeaturesFromRemoteSuccessRestful: function(data, msg, xhr) {
    	var that = this;
    	if (data !== null || data !== '') {
    		var configurations;
    		var doReturn = false;
    		try {
	    		if (typeof(data) === 'object')
	    			configurations = data['konfigurationen'];
	    		else {
	    			var configurationsObject = JSON.parse(data);
	    			if (typeof(configurationsObject) === 'object') {
	    				configurations = configurationsObject['konfigurationen'];
	    			} else {
		    			// die Rückgabe entspricht nicht dem erwarteten JSON --> Antwort kommt nicht von unserem Zeitserver
	        			doReturn = true;
	    			}
	    		}
	    		if (typeof(configurations) != 'object' && configurations.length > 0) {
	    			// mindestens das Setting DTC6_aktiv kommt immer mit --> Array mit mindestens einem Eintrag
	    			// dies ist hier nicht der Fall --> Antwort kommt nicht von unserem Zeitserver
	    			doReturn = true;
	    		}
    		} catch(e) {
    			// --> Antwort kommt nicht von unserem Zeitserver
    			doReturn = true;
    		}
    		
    		if (!doReturn) {
	    		that.setCallbackStatus('features', 'remote', YES);
	    		var activeFeaturesBeforeTransfer = [];
	    		_.each(DigiWebApp.Features.find(), function(feature) {
	    			if (parseBool(feature.get('isAvailable')) == YES) {
	    				var keyId = feature.get('id');
	    				activeFeaturesBeforeTransfer.push(keyId);
	    			}
	    		});
	    		
	    		// Clear Features from storage
	    		DigiWebApp.Features.deleteAll();
	    		
	    		that.setCallbackStatus('features', 'local', NO);
	    		DigiWebApp.ApplicationController.DigiProgressView.show(
	    			M.I18N.l('Save'), 
	    			M.I18N.l('features'), 
	    			configurations.length, 
	    			0);
	    		// reset settings without gui-elements
	    		DigiWebApp.SettingsController.setSetting(
	    			'treatAllAsTablet', 
	    			DigiWebApp.SettingsController.defaultsettings.get('treatAllAsTablet'));
	    		DigiWebApp.SettingsController.setSetting(
	    			'treatAllAsPhone', 
	    			DigiWebApp.SettingsController.defaultsettings.get('treatAllAsPhone'));
	    		DigiWebApp.SettingsController.setSetting(
	    			'settingsPassword', 
	    			DigiWebApp.SettingsController.defaultsettings.get('settingsPassword'));
	    		var oldBranding = DigiWebApp.SettingsController.getSetting('branding');
	    		DigiWebApp.SettingsController.setSetting(
	    			'branding', 
	    			DigiWebApp.SettingsController.defaultsettings.get('branding'));
	    		DigiWebApp.SettingsController.setSetting(
	    			'silentLoader', 
	    			DigiWebApp.SettingsController.defaultsettings.get('silentLoader'));
	    		DigiWebApp.SettingsController.setSetting(
	    			'mapType', 
	    			DigiWebApp.SettingsController.defaultsettings.get('mapType'));
	    		DigiWebApp.SettingsController.setSetting(
	    			'datatransfer_min_delay', 
	    			DigiWebApp.SettingsController.defaultsettings.get('datatransfer_min_delay'));
	    		DigiWebApp.SettingsController.setSetting(
	    			'GPSTimeOut', 
	    			DigiWebApp.SettingsController.defaultsettings.get('GPSTimeOut'));
	    		DigiWebApp.SettingsController.setSetting(
	    			'WebserviceTimeOut', 
	    			DigiWebApp.SettingsController.defaultsettings.get('WebserviceTimeOut'));
	    		DigiWebApp.SettingsController.setSetting(
	    			'LoaderTimeOut', 
	    			DigiWebApp.SettingsController.defaultsettings.get('LoaderTimeOut'));
	    		DigiWebApp.SettingsController.setSetting(
	    			'debugDatabaseServer', 
	    			DigiWebApp.SettingsController.defaultsettings.get('debugDatabaseServer'));
	    		DigiWebApp.ApplicationController.triggerUpdate = NO;
	
	    		// create a record for each feature returned from the server and save it
	    		_.each(configurations, function(el) {
	    			DigiWebApp.ApplicationController.DigiProgressView.increase();
	    			if (el.valueType === "Setting_WebApp") {
	    				var prop_setting = el.value;
	    				if (prop_setting === "false" || prop_setting === "true" ) { 
	    					prop_setting = ( prop_setting === "true" ); 
	    				}
	    				DigiWebApp.SettingsController.setSetting(el.keyId, prop_setting);
	    				// auch bei geändertem branding neu starten
	    				if ((el.keyId === "branding") && (el.value !== oldBranding)) 
	    					DigiWebApp.ApplicationController.restartApp = YES;
	    			} else if (el.valueType === "Feature") {
	    				DigiWebApp.Features.createRecord({
	    					  id: el.keyId
	    					, name: el.keyId
	    					, isAvailable: el.value
	    				}).save();
	    				// muss die App wegen des neu empfangenen Features neu gestartet werden?
	    				var activeFeatureFound = NO;
	    				_.each(activeFeaturesBeforeTransfer, function(activeFeature) {
	    					// ist die empfangene Feature-ID schon vor dem Abgelich aktiv gewesen?
	    					if (el.keyId === activeFeature) activeFeatureFound = YES;
	    				});
	    				// die App neu starten, wenn:
	    				// - das Feature vorher aktiv war und jetzt inaktiv gesetzt wird
	    				// - das Feature vorher inaktiv war und jetzt aktiv gesetzt wird
	    				if ((el.value === "true" && !activeFeatureFound) || 
	    					(el.value === "false" && activeFeatureFound)) {
	    					if (el.keyId === "400") DigiWebApp.ApplicationController.restartApp = YES;		// Foto
	    					if (el.keyId === "401") DigiWebApp.ApplicationController.restartApp = YES;		// Sprachaufzeichnung
	    					if (el.keyId === "402") DigiWebApp.ApplicationController.restartApp = YES;	    // Materialerfassung only
	    					if (el.keyId === "403") DigiWebApp.ApplicationController.restartApp = YES;		// Bemerkungsfeld
	    					if (el.keyId === "404") DigiWebApp.ApplicationController.restartApp = YES;		// Button-Menü
	    					if (el.keyId === "405") DigiWebApp.ApplicationController.restartApp = YES;		// Unterschrift
	    					if (el.keyId === "406") DigiWebApp.ApplicationController.restartApp = YES;		// Auftragsinfo
	    					//if (el.keyId === "407") DigiWebApp.ApplicationController.restartApp = YES;	// Tagescheckliste
	    					if (el.keyId === "408") DigiWebApp.ApplicationController.restartApp = YES;		// Anwesenheitsliste
	    					if (el.keyId === "409") DigiWebApp.ApplicationController.restartApp = YES;		// ChefTool-Only
	    					if (el.keyId === "410") DigiWebApp.ApplicationController.restartApp = YES;		// "Handauftrag" ausblenden
	    					if (el.keyId === "411") DigiWebApp.ApplicationController.restartApp = YES;		// Zeitbuchungen X Tage auf Gerät behalten
	    					if (el.keyId === "412") DigiWebApp.ApplicationController.restartApp = YES;		// Bautagebuch
	    					if (el.keyId === "413") DigiWebApp.ApplicationController.restartApp = YES;		// GPS-Funktion ausblenden
	    					if (el.keyId === "414") DigiWebApp.ApplicationController.restartApp = YES;		// Kommen/Gehen-Only
	    					//if (el.keyId === "415") DigiWebApp.ApplicationController.restartApp = YES;	// Feierabend-Icon oben rechts
	    					if (el.keyId === "416") DigiWebApp.ApplicationController.restartApp = YES;		// Tätigkeitsicons auf Buchungs-Screen
	    					if (el.keyId === "417") DigiWebApp.ApplicationController.restartApp = YES;		// DIGI-ServiceApp
	    					if (el.keyId === "418") DigiWebApp.ApplicationController.restartApp = YES;		// Spesen/Auslöse
	    					if (el.keyId === "419") DigiWebApp.ApplicationController.restartApp = YES;		// Scholpp-Spesen
	    					//if (el.keyId === "420") DigiWebApp.ApplicationController.restartApp = YES;	// Menüpunkt Feierabend ausblenden
	    					if (el.keyId === "421") DigiWebApp.ApplicationController.restartApp = YES;		// WebApp mit PIN-Anmeldung
	    					if (el.keyId === "422") DigiWebApp.ApplicationController.restartApp = YES;		// gefahreneKilometer
	    					if (el.keyId === "423") DigiWebApp.ApplicationController.restartApp = YES;		// Terminliste
	    					if (el.keyId === "424") DigiWebApp.ApplicationController.restartApp = YES;		// Buchen mit Tätigkeitsbuttons für Kunde Stooss
	    					if (el.keyId === "425") DigiWebApp.ApplicationController.restartApp = YES;		// feste Pause stornieren
	    					if (el.keyId === "426") DigiWebApp.ApplicationController.restartApp = YES;		// Notizen only
	    					if (el.keyId === "427") DigiWebApp.ApplicationController.restartApp = YES;		// Bautagebuch: TätigkeitslistenPage in Zeitbuchungs-Details
	    					//if (el.keyId === "428") DigiWebApp.ApplicationController.restartApp = YES;	// manuelle Materialstammdatenübertragung
	    					if (el.keyId === "429") DigiWebApp.ApplicationController.restartApp = YES;		// mehrstufige Auftragsauswahl
	    					if (el.keyId === "430") DigiWebApp.ApplicationController.restartApp = YES;		// Handpositionen
	    					if (el.keyId === "431") DigiWebApp.ApplicationController.restartApp = YES;		// Bohle-Reisekostenabwicklung
                        }
	    			}
	    			DigiWebApp.ApplicationController.triggerUpdate = YES;
	    		}); // configurations
	    		// zueinander inkompatible Einstellungen korrigieren
	    		if (DigiWebApp.SettingsController.getSetting('remarkIsOptional')) {
	    			DigiWebApp.SettingsController.setSetting('remarkIsMandatory', false);
	    		}
	    		if (DigiWebApp.ApplicationController.triggerUpdate) {
	    			DigiWebApp.DashboardPage.needsUpdate = true;
	    			DigiWebApp.MediaListPage.needsUpdate = true;
	    		}
	    		DigiWebApp.DashboardController.init(YES);
	    		DigiWebApp.MediaListController.init(YES);
	    		DigiWebApp.ApplicationController.triggerUpdate = NO;
	    		DigiWebApp.ApplicationController.DigiProgressView.hide();
	    		that.setCallbackStatus('features', 'local', YES);
    		}
    	} else {
			doReturn = true;
    	}

    	if (doReturn) {
    		DigiWebApp.ApplicationController.DigiProgressView.hide();
    		that.setCallbackStatus('features', 'local', YES);
    	}

		inDebug();

    	if ((DigiWebApp.SettingsController.featureAvailable('409')) 
    		&& (DigiWebApp.ApplicationController.profilingIntervalVar === null)) {
    		if (DigiWebApp.SettingsController.featureAvailable('412')) {
    			//DigiWebApp.NavigationController.toBautagebuchBautagesberichteListePageTransition(YES);
    			DigiWebApp.NavigationController.startBautagebuch();
    		} else {
    			if (DigiWebApp.SettingsController.featureAvailable('404')) {
    				DigiWebApp.NavigationController.toButtonDashboardPage(YES);
    			} else {
    				DigiWebApp.NavigationController.toDashboardPage(YES);
    			}
    		}
    	}
		// Falls neue Features aktiviert wurden, muss sich die WebApp ggfs. neu starten
		if (DigiWebApp.ApplicationController.restartApp === YES) {
			DigiWebApp.ApplicationController.nativeAlertDialogView({
				title: M.I18N.l('newFeatureActive')
			  , message: M.I18N.l('newFeatureActiveMsg')
			  , callbacks: {
					confirm: {
						action: function() {
							DigiWebApp.ApplicationController.doRestartApp();
						}
					}
			  }
			});
		}
    }
    
    /**
     * The success callback for getFeaturesFromRemote.
     *
     * @param data The returned data of the server in JSON, means JS object.
     * @param msg
     * @param xhr The XMLHTTPRequest object.
     */
    
    , getFeaturesFromRemoteSuccess: function(data, msg, xhr) {
    	        
        if (data) {
	   		if ( typeof(data['return']) === "undefined" && typeof(data['ns:return']) !== "undefined" ) {
	    		data['return'] = data['ns:return'];
	    		try {
	    			//myns = data['return'][0]['xsi:type'].split(":")[0];
	    			var myns = this.myns;
	    			 _.each(data['return'], function(el) {
	    				 el.keyId = el[myns + ':keyId'];
	    				 el.value = el[myns + ':value'];
	    			 });
	    		} catch(e) {
	    		}
	    	}
    	}

    	if (data && data['return']) {
        	
        	//if (DigiWebApp.SettingsController.globalDebugMode) console.log("Features empfangen");
        	
            this.setCallbackStatus('features', 'remote', YES);
            
            var activeFeaturesBeforeTransfer = [];
            _.each(DigiWebApp.Features.find(), function(feature) {
            	if (parseBool(feature.get('isAvailable')) == YES) {
            		var keyId = feature.get('id');
            		activeFeaturesBeforeTransfer.push(keyId);
            	}
            });

            // Clear Features from storage
            DigiWebApp.Features.deleteAll();

            this.setCallbackStatus('features', 'local', NO);

            var k = null;

            if(_.isObject(data['return']) && !_.isArray(data['return'])) {
            	//console.log("data['return'] = [data['return']];");
                data['return'] = [data['return']];
            }

    		DigiWebApp.ApplicationController.DigiProgressView.show(M.I18N.l('Save'), M.I18N.l('features'), data['return'].length, 0);
            // reset settings without gui-elements
            //DigiWebApp.SettingsController.setSetting('debug', false);
            DigiWebApp.SettingsController.setSetting('treatAllAsTablet', DigiWebApp.SettingsController.defaultsettings.get('treatAllAsTablet'));
            DigiWebApp.SettingsController.setSetting('treatAllAsPhone', DigiWebApp.SettingsController.defaultsettings.get('treatAllAsPhone'));
            DigiWebApp.SettingsController.setSetting('settingsPassword', DigiWebApp.SettingsController.defaultsettings.get('settingsPassword'));
            var oldBranding = DigiWebApp.SettingsController.getSetting('branding');
            DigiWebApp.SettingsController.setSetting('branding', DigiWebApp.SettingsController.defaultsettings.get('branding'));
            DigiWebApp.SettingsController.setSetting('silentLoader', DigiWebApp.SettingsController.defaultsettings.get('silentLoader'));
            DigiWebApp.SettingsController.setSetting('mapType', DigiWebApp.SettingsController.defaultsettings.get('mapType'));
            //DigiWebApp.SettingsController.setSetting('useTransitionsSetting', DigiWebApp.SettingsController.defaultsettings.get('useTransitionsSetting'));
            DigiWebApp.SettingsController.setSetting('datatransfer_min_delay', DigiWebApp.SettingsController.defaultsettings.get('datatransfer_min_delay'));
            DigiWebApp.SettingsController.setSetting('GPSTimeOut', DigiWebApp.SettingsController.defaultsettings.get('GPSTimeOut'));
            DigiWebApp.SettingsController.setSetting('WebserviceTimeOut', DigiWebApp.SettingsController.defaultsettings.get('WebserviceTimeOut'));
            DigiWebApp.SettingsController.setSetting('LoaderTimeOut', DigiWebApp.SettingsController.defaultsettings.get('LoaderTimeOut'));
            DigiWebApp.SettingsController.setSetting('debugDatabaseServer', DigiWebApp.SettingsController.defaultsettings.get('debugDatabaseServer'));

            DigiWebApp.ApplicationController.triggerUpdate = NO;
            
            // Wir gehen zunächst davon aus, dass es im Folgenden keine neuen Features gibt:
            //DigiWebApp.ApplicationController.restartApp = NO; // es kann auch vor dem Speichern der Settings gesetzt worden sein.
            
            // create a record for each feature returned from the server and save it
            _.each(data['return'], function(el, i) {
        		DigiWebApp.ApplicationController.DigiProgressView.increase();
            	var prefix = "";
            	if ( typeof(el.valueType) === "undefined" ) {
            		// we are probably in InternetExplorer
            		prefix = DigiWebApp.ApplicationController.myns + ":";
            	}
            	//console.log("el['" + prefix + "valueType'] = " + el[prefix + 'valueType']);
            	if (el[prefix + 'valueType'] === "Setting_WebApp") {
            		//if (DigiWebApp.SettingsController.globalDebugMode) console.log("Setting: " + el[prefix + 'keyId'] + "=" + el[prefix + 'value']);
            		var prop_setting = el[prefix + 'value'];
            		if (prop_setting === "false" || prop_setting === "true" ) { prop_setting = ( prop_setting === "true" ); }
            		DigiWebApp.SettingsController.setSetting(el[prefix + 'keyId'], prop_setting);
            	} else if (el[prefix + 'valueType'] === "Feature") {
            		//if (DigiWebApp.SettingsController.globalDebugMode) console.log("Feature: " + el[prefix + 'keyId'] + "=" + el[prefix + 'value']);
	                k = DigiWebApp.Features.createRecord({
	                      id: el[prefix + 'keyId']
	                    , name: el[prefix + 'keyId']
	                    , isAvailable: el[prefix + 'value']
	                }).save();
	                
	                // muss die App wegen des neu empfangenen Features neu gestartet werden?
	                var activeFeatureFound = NO;
	                _.each(activeFeaturesBeforeTransfer, function(activeFeature) {
	                	// ist die empfangene Feature-ID schon vor dem Abgelich aktiv gewesen?
	                	if (el[prefix + 'keyId'] === activeFeature) activeFeatureFound = YES;
	                });
	                // die App neu starten, wenn:
	                //		- das Feature vorher aktiv war und jetzt inaktiv gesetzt wird
	                //		- das Feature vorher inaktiv war und jetzt aktiv gesetzt wird
	                if ((el[prefix + 'value'] === "true" && !activeFeatureFound) || (el[prefix + 'value'] === "false" && activeFeatureFound)) {
	                	if (el[prefix + 'keyId'] === "400") DigiWebApp.ApplicationController.restartApp = YES;		// Foto
	                	if (el[prefix + 'keyId'] === "401") DigiWebApp.ApplicationController.restartApp = YES;		// Sprachaufzeichnung
	                	if (el[prefix + 'keyId'] === "402") DigiWebApp.ApplicationController.restartApp = YES;	    // Materialerfassung only
	                	if (el[prefix + 'keyId'] === "403") DigiWebApp.ApplicationController.restartApp = YES;		// Bemerkungsfeld
	                	if (el[prefix + 'keyId'] === "404") DigiWebApp.ApplicationController.restartApp = YES;		// Button-Menü
	                	if (el[prefix + 'keyId'] === "405") DigiWebApp.ApplicationController.restartApp = YES;		// Unterschrift
	                	if (el[prefix + 'keyId'] === "406") DigiWebApp.ApplicationController.restartApp = YES;		// Auftragsinfo
	                	//if (el[prefix + 'keyId'] === "407") DigiWebApp.ApplicationController.restartApp = YES;	// Tagescheckliste
	                	if (el[prefix + 'keyId'] === "408") DigiWebApp.ApplicationController.restartApp = YES;		// Anwesenheitsliste
	                	if (el[prefix + 'keyId'] === "409") DigiWebApp.ApplicationController.restartApp = YES;		// ChefTool-Only
	                	if (el[prefix + 'keyId'] === "410") DigiWebApp.ApplicationController.restartApp = YES;		// "Handauftrag" ausblenden
	                	if (el[prefix + 'keyId'] === "411") DigiWebApp.ApplicationController.restartApp = YES;		// Zeitbuchungen X Tage auf Gerät behalten
	                	if (el[prefix + 'keyId'] === "412") DigiWebApp.ApplicationController.restartApp = YES;		// Bautagebuch
	                	if (el[prefix + 'keyId'] === "413") DigiWebApp.ApplicationController.restartApp = YES;		// GPS-Funktion ausblenden
	                	if (el[prefix + 'keyId'] === "414") DigiWebApp.ApplicationController.restartApp = YES;		// Kommen/Gehen-Only
	                	//if (el[prefix + 'keyId'] === "415") DigiWebApp.ApplicationController.restartApp = YES;	// Feierabend-Icon oben rechts
	                	if (el[prefix + 'keyId'] === "416") DigiWebApp.ApplicationController.restartApp = YES;		// Tätigkeitsicons auf Buchungs-Screen
	                	if (el[prefix + 'keyId'] === "417") DigiWebApp.ApplicationController.restartApp = YES;		// DIGI-ServiceApp
	                	if (el[prefix + 'keyId'] === "418") DigiWebApp.ApplicationController.restartApp = YES;		// Spesen/Auslöse
	                	if (el[prefix + 'keyId'] === "419") DigiWebApp.ApplicationController.restartApp = YES;		// Scholpp-Spesen
	                	if (el[prefix + 'keyId'] === "422") DigiWebApp.ApplicationController.restartApp = YES;		// gefahreneKilometer
	                	if (el[prefix + 'keyId'] === "423") DigiWebApp.ApplicationController.restartApp = YES;		// Terminliste
	                	if (el[prefix + 'keyId'] === "424") DigiWebApp.ApplicationController.restartApp = YES;		// Buchen mit Tätigkeitsbuttons für Kunde Stooss
	                	if (el[prefix + 'keyId'] === "425") DigiWebApp.ApplicationController.restartApp = YES;		// feste Pause stornieren
	                	if (el[prefix + 'keyId'] === "426") DigiWebApp.ApplicationController.restartApp = YES;		// Notizen only
	                	if (el[prefix + 'keyId'] === "427") DigiWebApp.ApplicationController.restartApp = YES;		// Bautagebuch: TätigkeitslistenPage in Zeitbuchungs-Details
	                    //if (el[prefix + 'keyId'] === "428") DigiWebApp.ApplicationController.restartApp = YES;		// manuelle Materialstammdatenübertragung
	                	if (el[prefix + 'keyId'] === "429") DigiWebApp.ApplicationController.restartApp = YES;		// mehrstufige Auftragsauswahl
	                	if (el[prefix + 'keyId'] === "430") DigiWebApp.ApplicationController.restartApp = YES;		// Handpositionen 
	                	if (el[prefix + 'keyId'] === "431") DigiWebApp.ApplicationController.restartApp = YES;		// Bohle-Reisekostenabwicklung
                    }
	                
	                // auch bei geändertem branding neu starten
	                if ((el[prefix + 'keyId'] === "branding") && (el[prefix + 'value'] !== oldBranding)) DigiWebApp.ApplicationController.restartApp = YES;
	                
	            }
                DigiWebApp.ApplicationController.triggerUpdate = YES;
            });
            // zueinander inkompatible Einstellungen korrigieren
            if (DigiWebApp.SettingsController.getSetting('remarkIsOptional')) {
            	DigiWebApp.SettingsController.setSetting('remarkIsMandatory', false);
            }
            if (DigiWebApp.ApplicationController.triggerUpdate) {
            	DigiWebApp.DashboardPage.needsUpdate = true;
                DigiWebApp.MediaListPage.needsUpdate = true;
            }
            DigiWebApp.DashboardController.init(YES);
            DigiWebApp.MediaListController.init(YES);
            DigiWebApp.ApplicationController.triggerUpdate = NO;
    		DigiWebApp.ApplicationController.DigiProgressView.hide();
            this.setCallbackStatus('features', 'local', YES);
            
        } else {

        	//if (DigiWebApp.SettingsController.globalDebugMode) console.log("keine Features empfangen");

        	// keine Features empfangen
    		DigiWebApp.ApplicationController.DigiProgressView.hide();
            this.setCallbackStatus('features', 'local', YES);
        }

		inDebug();

    	if ((DigiWebApp.SettingsController.featureAvailable('409')) && (DigiWebApp.ApplicationController.profilingIntervalVar === null)) {
			if (DigiWebApp.SettingsController.featureAvailable('412')) {
	            //DigiWebApp.NavigationController.toBautagebuchBautagesberichteListePageTransition(YES);
				DigiWebApp.NavigationController.startBautagebuch();
			} else {
				if (DigiWebApp.SettingsController.featureAvailable('404')) {
		            DigiWebApp.NavigationController.toButtonDashboardPage(YES);
				} else {
		            DigiWebApp.NavigationController.toDashboardPage(YES);
				}
			}
    	}

    	// Falls neue Features aktiviert wurden, muss sich die WebApp ggfs. neu starten
    	if (DigiWebApp.ApplicationController.restartApp === YES) {
			DigiWebApp.ApplicationController.nativeAlertDialogView({
  			  	title: M.I18N.l('newFeatureActive')
  			  , message: M.I18N.l('newFeatureActiveMsg')
              , callbacks: {
                	confirm: {
                    	//  target: this
                    	//, action: 'proceedWithLocalData'
						action: function() {
							DigiWebApp.ApplicationController.doRestartApp();
						}
                	}
              }
			});
    	}
    }

    /**
     * Calls getKolonne on DigiWebApp.RequestController.
     * Success callback proceeds received kolonnen data.
     * Error callback calls proceedWithLocalData to check whether offline work is possible.
     */
    , getKolonneFromRemote: function() {
    	// Bugfix 2631: Sorting Mitarbeiter by Nachname first
    	// In case of same Nachname then Firstname
    	DigiWebApp.JSONDatenuebertragungController.empfangeKolonne(
    		function() {
    			var that = DigiWebApp.ApplicationController;
    			var empfangeBautagebuch = function() {
    	            if (DigiWebApp.SettingsController.featureAvailable('412') || DigiWebApp.SettingsController.featureAvailable('402')) {
    	    	    	DigiWebApp.BautagebuchDatenuebertragungController.empfangen(that.afterTransfer, that.afterTransfer);
    	        	} else {
    	        		that.afterTransfer();
    	        	}
    	        }

    	        var empfangeFestepausendefinitionen = function() {
    	            if (DigiWebApp.SettingsController.featureAvailable('425')) {
    	            	DigiWebApp.JSONDatenuebertragungController.empfangeFestepausendefinitionen(empfangeBautagebuch, empfangeBautagebuch); 
    	        	} else {
    	        		empfangeBautagebuch();
    	        	}
    	        }
    	    	
    	        empfangeFestepausendefinitionen();
    	        
    		}
    	   , function() {
    		   this.setCallbackStatus('kolonne', 'remote', NO);
    		   this.proceedWithLocalData("getKolonneFromRemote");
    	   }
    	);
    }
    
    , afterTransfer: function() {
		DigiWebApp.ApplicationController.DigiProgressView.hide(); // just in case
		var that = DigiWebApp.ApplicationController;
    	that.syncStopTimestamp = D8.now().getTimestamp();
    	that.syncLastDuration = that.syncStopTimestamp - that.syncStartTimestamp;
        if (that.profilingIntervalVar !== null) {
        	console.log('DIGI-WebApp-Profiling ' + D8.now().format("yyyymmdd-HHMMss") + ' ' + that.syncLastDuration + 'ms');
        }
    	if (that.profilingShowAlert) {
    		alert('DIGI-WebApp-Profiling: ' + M.I18N.l('profilingTook') + ' ' + that.syncLastDuration + 'ms');
    	}
    	
    	DigiWebApp.ApplicationController.syncRunning = NO;
    	
        // go to next page
        if(that.isReadyToProceed()) {
            if (DigiWebApp.ApplicationController.profilingIntervalVar === null) {
            	if (DigiWebApp.SettingsController.featureAvailable('409')) {
    	        	var Bautagebuch = (DigiWebApp.SettingsController.featureAvailable('412'));
    	    		if (Bautagebuch) {
    	    			DigiWebApp.NavigationController.startBautagebuch();    			
    	    		} else {
	    				if (DigiWebApp.SettingsController.featureAvailable('404')) {
	    		            DigiWebApp.NavigationController.toButtonDashboardPage(YES);
	    				} else {
	    		            DigiWebApp.NavigationController.toDashboardPage(YES);
	    				}
    	    		}
            	} else {
            		DigiWebApp.NavigationController.toBookTimePage(YES);
                	DigiWebApp.BookingController.init();
            	}
            	
            	// Falls neue Features aktiviert wurden, muss sich die WebApp ggfs. neu starten
            	if (DigiWebApp.ApplicationController.restartApp === YES) {
        			DigiWebApp.ApplicationController.nativeAlertDialogView({
          			  	title: M.I18N.l('newFeatureActive')
          			  , message: M.I18N.l('newFeatureActiveMsg')
                      , callbacks: {
                        	confirm: {
                            	//  target: this
                            	//, action: 'proceedWithLocalData'
        						action: function() {
									DigiWebApp.ApplicationController.doRestartApp();
        						}
                        	}
                      }
        			});
            	}
            	
            }
            DigiWebApp.ApplicationController.setTransitionsSetting();
        } else {
            DigiWebApp.ApplicationController.setTransitionsSetting();
            DigiWebApp.ApplicationController.nativeAlertDialogView({
                  title: M.I18N.l('offlineWorkNotPossible')
                , message: M.I18N.l('offlineWorkNotPossibleMsg')
            });
        }

        if (that.profilingSingleRun) {
        	that.profilingIntervalVar = null;
    	}

    }

    /**
     * Sets the callback status of the callback status object (that is a controller property),,,,,,,,,,,,,,,,,,,,,,
     * @param {String} modelName The name of the model
     * @param {String} type Either 'local' or 'remote'
     * @param {Boolean} isSuccess Boolean determing the state
     */
    , setCallbackStatus: function(modelName, type, isSuccess) {
        this.callbackStatus[modelName][type] = isSuccess;
    }

    /**
     * by disjunction of local and remote value conjuncted with each other
     * it is calculated, whether the state of the app allows a proceed step
     */
    , isReadyToProceed: function() {

        var pos = this.callbackStatus['position'];
        var act = this.callbackStatus['activity'];
        var ord = this.callbackStatus['order'];
        var wpl = this.callbackStatus['workPlan'];

        return (pos.remote || pos.local) && (act.remote || act.local) && (ord.remote || ord.local); // && (wpl.remote || wpl.local);
    }
        
    , profilingIntervalVar: null
    , profilingSingleRun: NO
    , profilingShowAlert: NO
    
    , startProfiling: function(interval) {
    	if (DigiWebApp.ApplicationController.profilingIntervalVar === null) {
	    	if (typeof(interval) === "undefined") {
	    		DigiWebApp.ApplicationController.profilingIntervalVar = null;
	    	} else {
	    		if (interval !== 0) {
	    			if (interval > 10000) {
	    				DigiWebApp.ApplicationController.profilingSingleRun = NO;
	    				DigiWebApp.ApplicationController.profilingIntervalVar = setInterval(function() { DigiWebApp.ApplicationController.startsync(); }, interval);
	    			} else {
	    				trackError("Profiling-Interval too low!");
	    			}
	    		} else {
    				DigiWebApp.ApplicationController.profilingSingleRun = YES;
	    			DigiWebApp.ApplicationController.profilingIntervalVar = setTimeout(function() { clearTimeout(DigiWebApp.ApplicationController.profilingIntervalVar); DigiWebApp.ApplicationController.startsync(); }, 10);
	    		}
	    	}
    	} else {
			trackError("Profiling already running!");
    	}
    }

    , stopProfiling: function() {
    	clearInterval(DigiWebApp.ApplicationController.profilingIntervalVar);
    	DigiWebApp.ApplicationController.profilingIntervalVar = null;
    }
    
    , deleteAllData: function() {
		try {
			DigiWebApp.Booking.deleteAll();
		} catch(e) { trackError(e); }
		try {
			DigiWebApp.MediaFile.deleteAll();
		} catch(e) { trackError(e); }
		try {
			localStorage.clear('f');
		} catch(e) { trackError(e); }
    }

    , updateModels: function(callback) {
    	
		// aktuelle Zeitzone und Verschiebung merken
    	if (
    			(typeof(DigiWebApp.SettingsController.getSetting("currentTimezone")) === "undefined" || DigiWebApp.SettingsController.getSetting("currentTimezone") === "") 
    		||	(typeof(DigiWebApp.SettingsController.getSetting("currentTimezoneOffset")) === "undefined" || DigiWebApp.SettingsController.getSetting("currentTimezoneOffset") === "") 
    	){
	    	DigiWebApp.SettingsController.setSetting("currentTimezoneOffset", new Date().getTimezoneOffset());
	    	DigiWebApp.SettingsController.setSetting("currentTimezone", jstz.determine().name());
    	}

    	var doUpdate = function() {
    		    		
        	var allBookings_version0 = _.filter(DigiWebApp.Booking.find(), function(obj){return typeof(obj.get("modelVersion")) === "undefined";});
    		//var allBookings = DigiWebApp.Booking.find();
    		
    		if (allBookings_version0.length > 0) {

		    	// ganz alte Bookings aktualisieren (vor modelVersion 1)
	        	_.each(allBookings_version0, function(booking) {
	    			
	    	    	// booking.mitarbeiterId setzen (DigiWebApp.SettingsController.getSetting("mitarbeiterId"))
	    			booking.set("mitarbeiterId", DigiWebApp.SettingsController.getSetting("mitarbeiterId"));
		        		
	            	// Zeitzone setzen (wir wissen nicht welche es war, also wird die aktuelle verwendet)
	            	if (
	            			(typeof(booking.get("timezoneOffset")) === "undefined" || booking.get("timezoneOffset") === "") 
	            		||	(typeof(booking.get("timezone")) === "undefined" || booking.get("timezone") === "") 
	            	){
            			booking.set("timezoneOffset", new Date(Number(booking.get('timeStampStart'))).getTimezoneOffset());
	            		booking.set("timezone", jstz.determine().name());
	            	}

	            	var startDate = booking.get('startDateString');
	            	var startTime = booking.get('startTimeString');
	            	if ((typeof(startDate) === "undefined" || !startDate || startDate === "")
	            	||  (typeof(startTime) === "undefined" || !startTime || startTime === "")
	            	) {
	            		// Buchung aus alter WebApp-Version
	            		var d8start = D8.create(new Date(Number(booking.get('timeStampStart')) + (1000 * 60 * (new Date(Number(booking.get('timeStampStart'))).getTimezoneOffset() - booking.get('timezoneOffset')))));
	                    startDate = d8start.format('dd.mm.yyyy');
	                    startTime = d8start.format('HH:MM');
	                    booking.set('startDateString', startDate);
	                    booking.set('startTimeString', startTime);
	            	}
	            	
	            	var endeDate = booking.get('endeDateString');
	            	var endeTime = booking.get('endeTimeString');
	            	if ((typeof(endeDate) === "undefined" || !endeDate || endeDate === "")
	            	||  (typeof(endeTime) === "undefined" || !endeTime || endeTime === "")
	            	) {
	            		// Buchung aus alter WebApp-Version
	            		var d8ende = D8.create(new Date(Number(booking.get('timeStampEnd')) + (1000 * 60 * (new Date(Number(booking.get('timeStampEnd'))).getTimezoneOffset() - booking.get('timezoneOffset')))));
	                    endeDate = d8ende.format('dd.mm.yyyy');
	                    endeTime = d8ende.format('HH:MM');
	                    booking.set('endeDateString', endeDate);
	                    booking.set('endeTimeString', endeTime);
	            	}
	    				         
	            	booking.set("modelVersion", "1");
	    			booking.save();
	            	writeToLog("Buchung auf modelVersion 1 aktualisiert: " + JSON.stringify(booking));
		    			
	        	});
	        }
	        	
        	// von modelVersion 1 auf 2
//        	var allBookings_version1 = _.filter(DigiWebApp.Booking.find(), function(obj){return obj.get("modelVersion") === "1";});
//        	if (allBookings_version1.length > 0) {
//		    	_.each(allBookings_version1, function(booking) {
//		    		
//		    		// TODO: modelVersion 1 auf 2
//					
//		        	//booking.set("modelVersion", "2");
//					//booking.save();
//		        	//writeToLog("Buchung auf modelVersion 2 aktualisiert: " + JSON.stringify(booking));
//				});
//        	}
	    	
        	// von modelVersion 2 auf 3
//        	var allBookings_version1 = _.filter(DigiWebApp.Booking.find(), function(obj){return obj.get("modelVersion") === "1";});
//        	if (allBookings_version1.length > 0) {
//		    	_.each(allBookings_version1, function(booking) {
//		    		
//		    		// TODO: modelVersion 1 auf 2
//					
//		        	//booking.set("modelVersion", "2");
//					//booking.save();
//		        	//writeToLog("Buchung auf modelVersion 2 aktualisiert: " + JSON.stringify(booking));
//				});
//        	}

        	// mit dem übergebenen callback weitermachen
	    	callback();
	    	
    	}

    	// zunächst muss die mitarbeiterId des Benutzers bekannt sein (ab modelVersion 1)
    	if (
    	   (typeof(DigiWebApp.SettingsController.getSetting("mitarbeiterId")) == "undefined") 
    	|| (DigiWebApp.SettingsController.getSetting("mitarbeiterId") == "")
    	|| (parseIntRadixTen(DigiWebApp.SettingsController.getSetting("mitarbeiterId")) == 0)
    	) {
    		writeToLog("aktualisiere Mitarbeiter des Benutzers in updateModels (" + DigiWebApp.SettingsController.getSetting("mitarbeiterId") + ")");
    		var recieveObj = {
    				  webservice: "mitarbeiter"
    				, loaderText: M.I18N.l('BautagebuchLadeMitarbeiter')
    				, successCallback: function(data){
			    		DigiWebApp.ApplicationController.DigiLoaderView.hide();
			    		if (data && data.mitarbeiter && data.mitarbeiter.length > 0) {
			    			//alert(data.mitarbeiter.length);
			    			DigiWebApp.SettingsController.setSetting("mitarbeiterVorname", data.mitarbeiter[0].vorname);
			    			DigiWebApp.SettingsController.setSetting("mitarbeiterNachname", data.mitarbeiter[0].nachname);
			    			DigiWebApp.SettingsController.setSetting("mitarbeiterId", data.mitarbeiter[0].mitarbeiterId);
			    			DigiWebApp.ApplicationController.syncRunning = NO;
			    			doUpdate();
			    		} else {
			    			// Fehlermeldung
			    			DigiWebApp.ApplicationController.nativeAlertDialogView({
			                    title: M.I18N.l('offlineWorkNotPossible')
			                  , message: M.I18N.l('offlineWorkNotPossibleMsg')
			              });
			    		}
			    	}
    				, errorCallback: function(error) {
    		    		DigiWebApp.ApplicationController.DigiLoaderView.hide();
    	    			// Fehlermeldung
    	    			DigiWebApp.ApplicationController.nativeAlertDialogView({
    	                    title: M.I18N.l('offlineWorkNotPossible')
    	                  , message: M.I18N.l('offlineWorkNotPossibleMsg')
    	    			});
    		    	}
    				, additionalQueryParameter: "getAll=true&webAppId=" + DigiWebApp.SettingsController.getSetting("workerId")
    				//, timeout: 
    				, geraeteIdOverride: true
    				//, modus: 
      		};
    		DigiWebApp.ApplicationController.syncRunning = YES;
    		DigiWebApp.JSONDatenuebertragungController.recieveData(recieveObj);
    	} else {
    		//if (inDebug() && staticDebugging) alert(navigator.platform + ", ApplicationController.updateModels " + "mitarbeiterId vorhanden --> doUpdate");
    		doUpdate();
    	}
    	
    }
    
    , sonderzeichenCheck: function(str) {
        return ( /[^\w\säöüÄÖÜß \x40(){}*%\$§€=/\\!?.,;:+-]+/.test(str) );
    }
    
    , vibrate: function() {
    	
        var vibrationsDauer = 100;
    	try {
	    	vibrationsDauer = DigiWebApp.ApplicationController.CONSTVibrateDuration;
    	} catch (vibrateError) {}
	    try {                      
	    	if (typeof(DigiWebApp.SettingsController.getSetting("vibrationsDauer")) !== "undefined") {
	    		vibrationsDauer = parseIntRadixTen(DigiWebApp.SettingsController.getSetting("vibrationsDauer"));
	    	}
    	} catch (vibrateError) {}
		if (typeof(navigator.vibrate) != 'undefined') {
		    try {
		    	if (vibrationsDauer > 0) {
		            //DigiWebApp.ApplicationController.DigiLoaderView.show(' ', vibrationsDauer);
		    		navigator.vibrate(vibrationsDauer);
		        	//window.setTimeout(vibrationsDauer, DigiWebApp.ApplicationController.afterVibrate);
		    	}
	    	} catch (vibrateError) {}
		}
    }
    
    , afterVibrate: function() {
    	DigiWebApp.ApplicationController.DigiLoaderView.hide();
    }

    , exitApp: function(autoExit) {
    	var contFunc = function() {
    		if (!onIOS) {
	    		if (autoExit) {
	    			DigiWebApp.ApplicationController.DigiLoaderView.show(M.I18N.l('autoExitApp'));
	    		} else {
	    			DigiWebApp.ApplicationController.DigiLoaderView.show(M.I18N.l('exitApp'));
	    		}
				try{DigiWebApp.ApplicationController.bgGeo.stop()}catch(e){}
				try{window.plugin.notification.local.cancel('4711');}catch(e){}
				//try{window.plugin.notification.local.cancel('4712');}catch(e){}
				if (typeof(navigator) != "undefined" && typeof(navigator.app) != "undefined" && typeof(navigator.app.exitApp) != "undefined") {
		    		if (autoExit) {
		    			DigiWebApp.ApplicationController.DigiLoaderView.show(M.I18N.l('autoExitApp'));
		    			//window.setTimeout(navigator.app.exitApp, 2000);
		    			window.setTimeout(flushLogQueueAndExit, 2000);
		    		} else {
		    			//navigator.app.exitApp();
		    			flushLogQueueAndExit();
		    		}
				}
	    	}
    		DigiWebApp.ApplicationController.DigiLoaderView.hide(); // just in case
    	}
    	autoCleanLogs(contFunc); // in main.js
    }
    
    // Bugfix 2108: Rename in order to be consistent with DSO
    , dtc6AktivRenameHelper: function(id, textValue) {
    	if (typeof(id) !== 'undefined') {
    		$('#' + id).parent().parent().parent()[0].firstChild.textContent = textValue;
    	}
    }
    
    , doRestartApp: function() {
//		if (typeof(navigator.app) !== "undefined") {
//			if (typeof(location.origin) !== "undefined") {
//				navigator.app.loadUrl(location.origin + location.pathname);					
//			} else {
//				navigator.app.loadUrl(location.protocol + '//' + location.pathname);
//			}
//		} else {
//			window.location.reload();
//		}

    	try{
	    	if (typeof(navigator.app) !== "undefined") {
//				var newUrl = location.protocol + '//' + location.pathname;
//				if (typeof(location.origin) !== "undefined") {
//					newUrl = location.origin + location.pathname;					
//				}
//				writeToLog("restarting app with url " + newUrl);
//				navigator.app.loadUrl(newUrl);
				window.location.reload();
			} else {
				window.location.reload();
			}
	    }catch(e){
			alert(M.I18N.l('bitteManuellNeuStarten'));
			flushLogQueueAndExit();
		}
    }
    
});
