// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: DigiWebApp
// Controller: ApplicationController
// ==========================================================================
// manuell var-checked
DigiWebApp.ApplicationController = M.Controller.extend({
	
	  CONSTImageFiletype: "image/jpeg;base64"
	, CONSTAudioFiletype: "audio/wav;base64"
	, CONSTVideoFiletype: "video/mp4;base64"
	, CONSTTextFiletype: "text/plain"
		
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
	
	, activeFeaturesBeforeTransfer: []
	
	, syncStartTimestamp: null
	
	, syncStopTimestamp: null
	
	, syncLastDuration: null 
	
	, syncRunning: NO
	
	, savedUseTransitions: NO

	, triggerUpdate: NO
	
	, useSplashJustForFade: NO
	
	, makeUnselectable: function(node) {
		return null;
//	    if (node.nodeType == 1) {
//	        node.unselectable = true;
//	    }
//	    var child = node.firstChild;
//	    while (child) {
//	    	DigiWebApp.ApplicationController.makeUnselectable(child);
//	        child = child.nextSibling;
//	    }
	}

	, blackBerryRestart_var: null
	
	, blackBerryRestart: function() {
		//console.log("blackBerryRestart");
		//alert("blackBerryRestart");
		if (DigiWebApp.ApplicationController.blackBerryRestart_var !== null) {clearTimeout(DigiWebApp.ApplicationController.blackBerryRestart_var);}
		DigiWebApp.app = M.Application.design(DigiWebAppOrdinaryDesign);
		/* now lets render all other pages 
        _.each(M.ViewManager.pageList, function(page) {
        	console.log(page);
        	if (page.html === '') {
        		//page.render();
        	}
        });*/
        
		DigiWebApp.app.main();
		DigiWebApp.ApplicationController.regSecEv(YES);
	}
	
	, nativeAlertDialogView: function (obj) {
		
		// etwaigen Loader ausblenden
		DigiWebApp.ApplicationController.DigiLoaderView.hide()
		
		if (M.Environment.getPlatform().substr(0,10) === "BlackBerry") {
			//console.log("falling back to non-native-dialog");
			//return M.DialogView.alert(obj);
		}
		//console.log("using a native-dialog");
		if (typeof(obj.confirmButtonValue) === "undefined") obj.confirmButtonValue = "Ok";
		if (typeof(obj.title) === "undefined") obj.title = "Alert";
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
					//try { $.mobile.fixedToolbars.show(); } catch(e) { trackError(e); }; // this line is for pre TMP 1.1
				} // callback
				, obj.title						// title
				, obj.confirmButtonValue			// buttonLabel
				);
		}
	}    

	, nativeConfirmDialogView: function (obj) {

		// etwaigen Loader ausblenden
		DigiWebApp.ApplicationController.DigiLoaderView.hide()
		
		if (M.Environment.getPlatform().substr(0,10) === "BlackBerry") {
			//console.log("falling back to non-native-dialog");
			//return M.DialogView.confirm(obj);
		}
		//console.log("using a native-dialog");
		if (typeof(obj.confirmButtonValue) === "undefined") obj.confirmButtonValue = "Ok";
		if (typeof(obj.cancelButtonValue) === "undefined") obj.cancelButtonValue = "Cancel";
		if (typeof(obj.title) === "undefined") obj.title = "Confirm";
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
					//try { $.mobile.fixedToolbars.show(); } catch(e) { trackError(e); }; // this line is for pre TMP 1.1
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
			  
		, useNativeActivity: YES
		
		, timeoutId: null

		, isVisible: function() { 
			return M.LoaderView.refCount !== 0;
		} 

		, hide: function() {
			this.loaderMessage = " ";
			this.loaderTitle = "";
			window.clearTimeout(this.timeoutId);
			this.timeoutId = null;
			if (this.useNativeActivity && typeof(navigator) != "undefined" && typeof(navigator.notification) != "undefined" && typeof(navigator.notification.activityStop) != "undefined") {
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
			
			if (this.isVisible()) { 
				this.hide(); 
			}
		
			if (DigiWebApp.SettingsController.getSetting('silentLoader') !== YES) {
				this.loaderMessage = message;
				this.loaderTitle = mytitle;
			} else {
				if (this.useNativeActivity && typeof(navigator) != "undefined" && typeof(navigator.notification) != "undefined" && typeof(navigator.notification.activityStart) != "undefined") {
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
			
			if (this.useNativeActivity && typeof(navigator) != "undefined" && typeof(navigator.notification) != "undefined" && typeof(navigator.notification.activityStart) != "undefined") {
				navigator.notification.activityStart(this.loaderTitle, this.loaderMessage);
			} else {
				return M.LoaderView.show(this.loaderMessage);
			}
		}
		
		, getTitle: function() {
			if (this.useNativeActivity && typeof(navigator) != "undefined" && typeof(navigator.notification) != "undefined" && typeof(navigator.notification.activityStart) != "undefined") {
				return this.loaderTitle;
			} else {
				return this.loaderMessage;
			} 
		}

		, getMessage: function() {
			if (this.useNativeActivity && typeof(navigator) != "undefined" && typeof(navigator.notification) != "undefined" && typeof(navigator.notification.activityStart) != "undefined") {
				return this.loaderMessage;
			} else {
				return this.loaderMessage;
			} 
		}

		, setTitle: function(title) {
			if (this.useNativeActivity && typeof(navigator) != "undefined" && typeof(navigator.notification) != "undefined" && typeof(navigator.notification.activityStart) != "undefined") {
				return this.show(this.loaderMessage, title);
			} else {
				return this.show(title);
			}
		}
		
		, setMessage: function(message) {
			if (this.useNativeActivity && typeof(navigator) != "undefined" && typeof(navigator.notification) != "undefined" && typeof(navigator.notification.activityStart) != "undefined") {
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

	} // End of DigiLoaderView

	, DigiProgressView: {
		
		// usage:
		//DigiWebApp.ApplicationController.DigiProgressView.show(M.I18N.l('Save'), M.I18N.l('positions'), myLength, 0);
		//DigiWebApp.ApplicationController.DigiProgressView.increase();
		//DigiWebApp.ApplicationController.DigiProgressView.hide();
		
		  maxValue: 100
		, currentValue: 0
		
		, increase: function(by) {
			if (!this.nativeProgressAvailable()) return false;
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
			if (this.maxValue < 1) this.maxValue = 1;
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
			navigator.notification.progressStop();
		}
		
		, nativeProgressAvailable: function() {
			if (typeof(navigator) == "undefined" || typeof(navigator.notification) == "undefined" || typeof(navigator.notification.progressStart) == "undefined" || typeof(navigator.notification.progressStop) == "undefined") {
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

//            // hide footer while softkeyboard is showing
//            $('input').focus(function() {
//            	$('[data-role=footer]').hide();
//            });
//            $('input').blur(function() {
//            	$('[data-role=footer]').show();
//            });
                        
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
        	if (typeof(device) === "undefined") { 
	        	// register deviceready-event and wait for it to fire
        		// or start deviceready-handler after a timeout of 10 seconds (we are not on a mobile device)
        		DigiWebApp.ApplicationController.timeoutdeviceready_var = setTimeout("DigiWebApp.ApplicationController.timeoutdevicereadyhandler()", DigiWebApp.SettingsController.getSetting('startTimeout'));
        		//document.addEventListener("deviceready", DigiWebApp.ApplicationController.devicereadyhandler, false);
        		$(document).bind('deviceready', DigiWebApp.ApplicationController.devicereadyhandler);
        		
        	} else {
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
		//alert("Platform: \"" + M.Environment.getPlatform() + "\"");
//    	var myPlattform = M.Environment.getPlatform();
//        if (       ( myPlatform.substr(-2)  === "86" )
//        		|| ( myPlatform.substr(-3)  === "_64" )
//        		|| ( myPlatform.substr(-5)  === "Win32" )
//        		|| ( myPlatform.substr(-5)  === "Win64" )
//        		|| ( myPlatform.substr(0,3) === "Mac" )
//        ) {
//        	this.skipEvents = true;
//        } else {
//        	this.skipEvents = false;
//        }

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
		        _.each(DigiWebApp.app.pages, function(myPage) {
		        	if (
		        			($('#' + myPage.id).get("0").classList && (!$('#' + myPage.id).get("0").classList.contains(DigiWebApp.ApplicationController.sizeMode)))
		        	     || ($('#' + myPage.id).get("0").className.split(" ").indexOf(DigiWebApp.ApplicationController.sizeMode) === -1)
		        	) {
    					if ( typeof(DigiWebApp) != "undefined" ) {
    						if ( typeof(DigiWebApp.SettingsController) != "undefined" ) {
	    						if ( typeof(DigiWebApp.SettingsController.getSetting("branding")) != "undefined" && DigiWebApp.SettingsController.getSetting("branding") != "" ) {
	    							var myBranding = DigiWebApp.SettingsController.getSetting("branding").toUpperCase();
	    							// remove old gloobal branding from body
	    							$('body').classes(function(n) {
	    								if (n.substring(n.length - "branding".length) === "branding") {
	    									$('body').removeClass(n);
	    								}
	    							});
	    							// apply branding
	    							$('body').addClass(myBranding + "branding");
	    	    					$('#' + myPage.id).removeClass("w320").removeClass("w480").removeClass("w640").removeClass("w800").removeClass("w1024").removeClass("w1080").removeClass("w1536").removeClass("w5000");
	    	    					$('#' + myPage.id).removeClass(myBranding + "_w320").removeClass(myBranding + "_w480").removeClass(myBranding + "_w640").removeClass(myBranding + "_w800").removeClass(myBranding + "_w1024").removeClass(myBranding + "_w1080").removeClass(myBranding + "_w1536").removeClass(myBranding + "_w5000");
	    	        				$('#' + myPage.id).addClass(myBranding + "_" + DigiWebApp.ApplicationController.sizeMode);	        					
	    						} else {
	    	    					$('#' + myPage.id).removeClass("w320").removeClass("w480").removeClass("w640").removeClass("w800").removeClass("w1024").removeClass("w1080").removeClass("w1536").removeClass("w5000");
	    	        				$('#' + myPage.id).addClass(DigiWebApp.ApplicationController.sizeMode);	        					
	    						}
    						} else {
    	    					$('#' + myPage.id).removeClass("w320").removeClass("w480").removeClass("w640").removeClass("w800").removeClass("w1024").removeClass("w1080").removeClass("w1536").removeClass("w5000");
    	        				$('#' + myPage.id).addClass(DigiWebApp.ApplicationController.sizeMode);	        					
    						}
    					} else {
	    					$('#' + myPage.id).removeClass("w320").removeClass("w480").removeClass("w640").removeClass("w800").removeClass("w1024").removeClass("w1080").removeClass("w1536").removeClass("w5000");
	        				$('#' + myPage.id).addClass(DigiWebApp.ApplicationController.sizeMode);	        					
    					}
		        	}
		        });
    		}
    	}
	}

	, timeoutdeviceready_var: null
	, timeouthappened: false
	
	, timeoutdevicereadyhandler: function() {
		if (DigiWebApp.ApplicationController.timeoutdeviceready_var !== null) clearTimeout(DigiWebApp.ApplicationController.timeoutdeviceready_var);
		DigiWebApp.ApplicationController.timeouthappened = true;
		var myStartInfo = "DIGI-WebApp hat Plattform \"" + M.Environment.getPlatform() + "\" (" + navigator.userAgent + ") erkannt. Es werden keine Eventhandler registriert! (Version " + M.Application.getConfig('version') + ")";
        console.log(myStartInfo);
        //writeToLog(myStartInfo);
        // if in Chrome: enable FileSystem
        if (typeof(navigator.webkitPersistentStorage) !== "undefined") {
        	window.requestFileSystem  = window.requestFileSystem || window.webkitRequestFileSystem;
        }
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
	
	, notificationID: null
	, notificationMessage: ""
	, startNotification: function() {
		var that = this;

		// notification.local is supposed to reside in "window.plugin"
		var pluginObj = window.plugin;
		if (typeof(pluginObj) == "undefined") {
			pluginObj = window.plugins;
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
	//		    id:         String,  // A unique id of the notifiction
	//		    date:       Date,    // This expects a date object
	//		    message:    String,  // The message that is displayed
	//		    title:      String,  // The title of the message
	//		    repeat:     String,  // Either 'secondly', 'minutely', 'hourly', 'daily', 'weekly', 'monthly' or 'yearly'
	//		    badge:      Number,  // Displays number badge to notification
	//		    sound:      String,  // A sound to be played
	//		    json:       String,  // Data to be passed through the notification
	//		    autoCancel: Boolean, // Setting this flag and the notification is automatically canceled when the user clicks it
	//		    ongoing:    Boolean, // Prevent clearing of notification (Android only)
	//		});
		} catch(e) {}
		try {

			var currentBookingNotificationID = parseIntRadixTen(localStorage.getItem(DigiWebApp.ApplicationController.storagePrefix + '_' + 'currentBookingNotificationID'));
			var currentBookingNotificationTimestamp = parseIntRadixTen(localStorage.getItem(DigiWebApp.ApplicationController.storagePrefix + '_' + 'currentBookingNotificationTimestamp'));
			var nowTimestamp = new Date().getTime();
			if (   (currentBookingNotificationID != null && typeof(currentBookingNotificationID) != "undefined")
				&& (currentBookingNotificationTimestamp != null && typeof(currentBookingNotificationTimestamp) != "undefined")
			) {
				try{window.plugin.notification.local.cancel(currentBookingNotificationID);}catch(e){}
				if (currentBookingNotificationTimestamp > nowTimestamp) {
					alert(currentBookingNotificationTimestamp + ", " + nowTimestamp);
					pluginObj.notification.local.add({
					    id:         currentBookingNotificationID,
					    title:      M.I18N.l('BookingReminderTitle'),  // The title of the message
					    message:    M.I18N.l('BookingReminderMessage') + DigiWebApp.SettingsController.getSetting('BookingReminderHours') + M.I18N.l('BookingReminderMessageTail'),  // The message that is displayed
					    autoCancel: true, // Setting this flag and the notification is automatically canceled when the user clicks it
					    ongoing:    false, // Prevent clearing of notification (Android only)
					});
				} else {
					pluginObj.notification.local.add({
					    id:         currentBookingNotificationID,
						date:       new Date(currentBookingNotificationTimestamp),    // This expects a date object
					    title:      M.I18N.l('BookingReminderTitle'),  // The title of the message
					    message:    M.I18N.l('BookingReminderMessage') + DigiWebApp.SettingsController.getSetting('BookingReminderHours') + M.I18N.l('BookingReminderMessageTail'),  // The message that is displayed
					    autoCancel: true, // Setting this flag and the notification is automatically canceled when the user clicks it
					    ongoing:    false, // Prevent clearing of notification (Android only)
					});
				}
			}

			that.notificationID = localStorage.getItem(DigiWebApp.ApplicationController.storagePrefix + '_' + 'notificationID');
			that.notificationMessage = localStorage.getItem(DigiWebApp.ApplicationController.storagePrefix + '_' + 'notificationMessage');
			if (that.notificationID != null && typeof(that.notificationID) != "undefined") {
				try{pluginObj.notification.local.cancel(that.notificationID);}catch(e){}
				that.notificationID = "" + (parseIntRadixTen(that.notificationID) + 1);
			} else {
				that.notificationID = '1';
			}
			localStorage.setItem(DigiWebApp.ApplicationController.storagePrefix + '_' + 'notificationID', that.notificationID);
			
			pluginObj.notification.local.add({
			    id:         that.notificationID,
			    message:    that.notificationMessage,  // The message that is displayed
			    title:      'DIGI-WebApp',  // The title of the message
				sound:      null,  // A sound to be played
			    autoCancel: false, // Setting this flag and the notification is automatically canceled when the user clicks it
			    ongoing:    true, // Prevent clearing of notification (Android only)
			});
		}catch(e){}
	}

	, startBgGeo: function() {
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

		    //DigiWebApp.SettingsController.init(YES,YES);

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
		        //console.log('[js] BackgroundGeoLocation callback:  ' + location.latitude + ',' + location.longitude);
		        //writeToLog('[js] BackgroundGeoLocation callback:  ' + location.latitude + ',' + location.longitude);
		        yourAjaxCallback.call(this);
		    };

		    var failureFn = function(error) {
		        //console.log('BackgroundGeoLocation error: ' + error);
		        //writeToLog('BackgroundGeoLocation error: ' + error);
		    }
		    
		    //var myLocationTimeout = 10;
			var myLocationTimeout = parseIntRadixTen(DigiWebApp.SettingsController.getSetting('GPSmaximumAgeMinutes') * 60);
		    if (myLocationTimeout == 0) {
		    	myLocationTimeout = 10;
//		    } else {
//		    	myLocationTimeout = myLocationTimeout - 1;
		    }
		    	
		    DigiWebApp.ApplicationController.bgGeo.configure(callbackFn, failureFn, {
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
	
	, devicereadyhandler: function() {
		
		// Your app must execute AT LEAST ONE call for the current position via standard Cordova geolocation,
	    //  in order to prompt the user for Location permission.
	    window.navigator.geolocation.getCurrentPosition(function(location) {
	        //console.log('Location from Phonegap');
	    });

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
        
		DigiWebApp.ApplicationController.startBgGeo();
		DigiWebApp.ApplicationController.startNotification();

		if (DigiWebApp.SettingsController.getSetting('debug')) { 
        	DigiWebApp.SettingsController.globalDebugMode = YES; 
        } else {
        	DigiWebApp.SettingsController.globalDebugMode = NO; 
        }
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
	
	, realDeviceReadyHandler: function() {
		
    	writeToLog("DIGI-WebApp deviceReady " + new Date().toString());

//		try {
		    	
			DigiWebApp.ApplicationController.DigiLoaderView.hide();
			
			try {
				//alert("hiding splash");
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
	
//	    	$(window).resize(function() {
//	    		DigiWebApp.ApplicationController.setImageClass();
//	    	});
	
	    	//console.log("DIGI-WebApp running on platform: " + M.Environment.getPlatform());
	    	//alert("typeof(DigiWebApp.ApplicationController.init)=" + typeof(DigiWebApp.ApplicationController.init));
	    	DigiWebApp.ApplicationController.init(true);
	    	//alert("nach ApplicationController.init");
	        if ((this.skipEvents !== true) || (( M.Environment.getPlatform().substr(0,10) === "BlackBerry") && (DigiWebApp.ApplicationController.timeouthappened !== true))) {
	        	//document.addEventListener("backbutton", DigiWebApp.ApplicationController.backbuttonhandler, false);
	        	$(document).bind('backbutton', DigiWebApp.ApplicationController.backbuttonhandler);
	        	//document.addEventListener("menubutton", DigiWebApp.ApplicationController.menubuttonhandler, false);
	        	$(document).bind('menubutton', DigiWebApp.ApplicationController.menubuttonhandler);
	        	// just in case again in 10 seconds via timeout (just for BlackBerry)
	        	//DigiWebApp.ApplicationController.registerButtonHandlerByTimeoutVar = setTimeout("DigiWebApp.ApplicationController.registerButtonHandlerByTimeout()",10000);
	        } else {
	        	//console.log("skipping eventhandlerregistration for back- and menubutton (" + this.skipEvents + ")");
	        }
	        
			//document.addEventListener("pause", DigiWebApp.ApplicationController.closeChildbrowser, false);

//		} catch(e) {
//			//trackError(e);
//			trackError(e);
//		}
	}
	
	, inAppBrowser_var: null
	
	, closeChildbrowser: function() {
		//alert("pause");
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
		if ((!DigiWebApp.SettingsController.showCredentialsAlert)) {
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
		if (!DigiWebApp.SettingsController.showCredentialsAlert) {
			if (DigiWebApp.SettingsController.featureAvailable('404')) {
				DigiWebApp.NavigationController.backToButtonDashboardPageFlipTransition();
			} else {
				DigiWebApp.NavigationController.backToDashboardPageFlipTransition();
			}
		}
    }
    
    , showConfirmDialog: function() {
    	var that = this;
        //M.DialogView.confirm({
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
	                    		DigiWebApp.SettingsController.init(YES);
								DigiWebApp.SettingsController.setSetting("company", mycompany);
								DigiWebApp.SettingsController.setSetting("password", mypassword);
								DigiWebApp.SettingsController.setSetting("connectionCode", myconnectionCode);
								DigiWebApp.SettingsController.setSetting("workerId", myworkerId);
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
    	//alert("in DigiWebApp.ApplicationController.init");
    	//alert("vor DigiWebApp.TabBar.tabItem1.internalEvents.tap.action = function ()");
    	DigiWebApp.TabBar.tabItem1.internalEvents.tap.action = function () {
    		//console.log("tabItem1");
            if(this.page) {
                M.Controller.switchToTab(this,YES);
            } else {
                this.parentView.setActiveTab(this);
            }
        };
    	//alert("vor DigiWebApp.TabBar.tabItem2.internalEvents.tap.action = function ()");
    	DigiWebApp.TabBar.tabItem2.internalEvents.tap.action = function () {
    		//console.log("tabItem2");
            if(this.page) {
                M.Controller.switchToTab(this,NO);
            } else {
                this.parentView.setActiveTab(this);
            }
        };
        /*
        $('#' + DigiWebApp.app.pages.bookingPage.id).touchwipe({
              wipeLeft: function() { alert("bookingPageleft"); }
            , wipeRight: function() { alert("bookingPageright"); }
            , wipeUp: function() { alert("bookingPageup"); }
            , wipeDown: function() { alert("bookingPagedown"); }
            , min_move_x: 100
            , min_move_y: 100
            , preventDefaultEvents: true
       });
        $('#' + DigiWebApp.app.pages.dashboard.id).touchwipe({
              wipeLeft: function() { alert("dashboardleft"); }
            , wipeRight: function() { alert("dashboardright"); }
            , wipeUp: function() { alert("dashboardup"); }
            , wipeDown: function() { alert("dashboarddown"); }
            , min_move_x: 100
            , min_move_y: 100
            , preventDefaultEvents: true
       });
       */
       //console.warn("ApplicationController.init at timestamp " + M.Date.now().date.valueOf());
       //alert("vor DigiWebApp.ApplicationController.callbackStatus = {");
       
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
        
        //alert("vor SettingsController.init");
        // set settings
        DigiWebApp.SettingsController.init(YES,YES);
        
        if (DigiWebApp.SettingsController.getSetting('debug')) { 
        	DigiWebApp.SettingsController.globalDebugMode = YES; 
        } else {
        	DigiWebApp.SettingsController.globalDebugMode = NO; 
        }
        
        DigiWebApp.ApplicationController.setTransitionsSetting();
        
        var fortfahren = function() {
        	//alert("suche nach offener Buchung");
	        // gibt es eine offene Buchung?
	        var bookings = DigiWebApp.Booking.find();
	        //alert("typeof(bookings)=" + typeof(bookings));
	        //alert("bookings.length=" + bookings.length);
	        if (bookings.length > 0) {
	            var isCurrentBookingAvailable = NO;
	            for (var i = 0; i < bookings.length; i++) {
	            	//alert("in for i=" + i);
	            	//if (DigiWebApp.SettingsController.globalDebugMode) console.log('booking[' + i + '].isCurrent = ' + bookings[i].get('isCurrent'));
	                if (bookings[i].get('isCurrent') === YES) {
	                	//alert("currentBooking found");
	                	//if (DigiWebApp.SettingsController.globalDebugMode) console.log('isCurrentBookingAvailable --> YES');
	                	isCurrentBookingAvailable = YES;
	                    break;
	                }
	            }
	            //if (DigiWebApp.SettingsController.globalDebugMode) console.log('isCurrentBookingAvailable = ' + isCurrentBookingAvailable);
	            if (isCurrentBookingAvailable === YES) {
	            	//alert("go to BookTimePage");
	            	DigiWebApp.NavigationController.toBookTimePage();
	            	if (parseBool(DigiWebApp.SettingsController.getSetting('stammdatenabgleichBeimAppStart'))) {
	    	        	//DigiWebApp.ApplicationController.startsync();
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
        
        var company = DigiWebApp.SettingsController.getSetting('company');
        var password = DigiWebApp.SettingsController.getSetting('password');
		if(!company || !password) {
            DigiWebApp.NavigationController.toBookTimePage(YES);
            DigiWebApp.SettingsController.showCredentialsAlert = YES;
            DigiWebApp.NavigationController.toSettingsPage(YES);
            return;
        } else {
            DigiWebApp.ApplicationController.updateModels(fortfahren);        	
        }
        
        //alert("startsync");
		//this.startsync();
        //DigiWebApp.BookingController.sendBookings(NO, YES);
        
    }
    
    , enforceChefToolOnly: function() {
    	//var debug = DigiWebApp.SettingsController.globalDebugMode;
    	var hideOverride = (DigiWebApp.SettingsController.showCredentialsAlert);
    	//if (debug) console.log("enforcing ChefToolOnly, hideOverride=" + hideOverride);
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
			//if (debug) console.log("enforcing ChefToolOnly, HIDE");
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
			//if (debug) console.log("enforcing ChefToolOnly, SHOW");
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
    	//alert("in startsync");
    	DigiWebApp.ApplicationController.syncStartTimestamp = D8.now().getTimestamp();

        // authentication data
        var company = DigiWebApp.SettingsController.getSetting('company');
        var password = DigiWebApp.SettingsController.getSetting('password');

		if(!company || !password) {
            DigiWebApp.NavigationController.toBookTimePage(YES);
            DigiWebApp.SettingsController.showCredentialsAlert = YES;
            DigiWebApp.NavigationController.toSettingsPage(YES);
            return;
        }

        M.Application.config.useTransitions = NO;

    	DigiWebApp.ApplicationController.syncRunning = YES;

        // nach Upload der Sonderbuchungen mit regulärem Stammdatenabgleich weitermachen
        var contSync = function() {
            DigiWebApp.SettingsController.sendConfiguration();
        }
        
        // lade Sonderbuchungen
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
    , proceedWithLocalData: function(fromwhere) {

		var that = DigiWebApp.ApplicationController;

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
	                , message: fromwhere
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


    /**
     * Routes to authenticate function of the DigiWebApp.RequestController.
     * Success callback calls authenticateSuccess of this controller.
     * Error callback calls proceedWithLocalData to check whether offline work is possible.
     */
    , authenticate: function() {
		
    	DigiWebApp.RequestController.authenticate({
              success: {
                  target: this
                , action: 'authenticateSuccess'
            }
            , error: {
                  target: this
                , action: function() {
            		trackError("authenticate-error");
        			this.proceedWithLocalData("authenticate");
                }
            }
        });

    }
    
    , timestampMitarbeiterZuletztGeladen: null
    
    /**
     *
     * The success callback for authenticate.
     * Dispatches between different return codes inside the server response.
     * 1: successful login
     * 2: invalid device id
     * 3: company id or password invalid
     *
     * when 1 is returned by the server, the order request is started
     * otherwise alert according to the kind of authentication error are shown and the view is switched
     * to the settings page to let the user adjust the credentials.
     *
     * @param data The returned data of the server in JSON, means JS object.
     * @param msg 
     * @param xhr The XMLHTTPRequest object.
     */
    , authenticateSuccess: function(data, msg, xhr) {

    	if ( typeof(data['return']) === "undefined" && typeof(data['ns:return']) !== "undefined" ) data['return'] = data['ns:return'];
        
    	switch(data['return']) {
            case '1':
                // Clear features from storage
	            	DigiWebApp.ApplicationController.activeFeaturesBeforeTransfer = []; 
	            	_.each(DigiWebApp.Features.find(), function(el) { 
	            		if (el.get("isAvailable") === "true") {
	            			DigiWebApp.ApplicationController.activeFeaturesBeforeTransfer.push(el.get("id"));
	            		}
	            	});
	            	DigiWebApp.Features.deleteAll();

	            this.setCallbackStatus('features', 'local', NO);
                DigiWebApp.ApplicationController.triggerUpdate = YES;
                DigiWebApp.DashboardController.init(YES);
            	DigiWebApp.MediaListController.init(YES);
                	
        		var timestampNow = D8.now().getTimestamp();
        		if (DigiWebApp.ApplicationController.timestampMitarbeiterZuletztGeladen === null 
        		|| (timestampNow - DigiWebApp.ApplicationController.timestampMitarbeiterZuletztGeladen > 60000)) {
            		writeToLog("aktualisiere Mitarbeiter des Benutzers nach authenticate");
            		var recieveObj = {
          				  webservice: "mitarbeiter"
          				, loaderText: M.I18N.l('BautagebuchLadeMitarbeiter')
          				, successCallback: function(data){
	        	    		if (data && data.mitarbeiter && data.mitarbeiter.length > 0) {
	        	    			DigiWebApp.SettingsController.setSetting("mitarbeiterVorname", data.mitarbeiter[0].vorname);
	        	    			DigiWebApp.SettingsController.setSetting("mitarbeiterNachname", data.mitarbeiter[0].nachname);
	        	    			DigiWebApp.SettingsController.setSetting("mitarbeiterId", data.mitarbeiter[0].mitarbeiterId);
	        	    		}
	        	    		DigiWebApp.ApplicationController.timestampMitarbeiterZuletztGeladen = D8.now().getTimestamp();
	        	    		DigiWebApp.ApplicationController.getFeaturesFromRemote();        		
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
            		DigiWebApp.JSONDatenuebertragungController.recieveData(recieveObj);
        		} else {
    	    		DigiWebApp.ApplicationController.getFeaturesFromRemote();        		
        		}

                DigiWebApp.ApplicationController.enforceChefToolOnly();
        		break;
            
            case '2':
                //M.DialogView.alert({
                DigiWebApp.ApplicationController.nativeAlertDialogView({
                      title: M.I18N.l('authenticationError2')
                    , message: M.I18N.l('authenticationErrorMsg2')
                });
                DigiWebApp.NavigationController.toSettingsPage(YES);
                break;

            case '3':
                //M.DialogView.alert({
                DigiWebApp.ApplicationController.nativeAlertDialogView({
                      title: M.I18N.l('authenticationError3')
                    , message: M.I18N.l('authenticationErrorMsg3')
                });
                DigiWebApp.NavigationController.toSettingsPage(YES);
                break;

            default:
                //M.DialogView.alert({
                DigiWebApp.ApplicationController.nativeAlertDialogView({
                      title: M.I18N.l('authenticationError')
                    , message: M.I18N.l('authenticationErrorMsg')
                });
                DigiWebApp.NavigationController.toSettingsPage(YES);
                break;
        }
    }

    /**
     * Calls getOrders on DigiWebApp.RequestController.
     * Success callback calls proceeds received orders and afterwards starts retrieving positions.
     * Error callback calls proceedWithLocalData to check whether offline work is possible.
     */
    , getOrdersFromRemote: function() {

        DigiWebApp.RequestController.getOrders({
              success: {
                  target: this
                , action: function(data, msg, xhr) {
                    if (this.getOrdersFromRemoteSuccess(data, msg, xhr) === true) {
                    	// get data sequentially
                    	this.getPositionsFromRemote();
                    } else {
                		//M.DialogView.alert({
                		DigiWebApp.ApplicationController.nativeAlertDialogView({
                			  title: M.I18N.l('noOrdersAvailable')
                			, message: M.I18N.l('noOrdersAvailableMsg')
                		});
                		//DigiWebApp.NavigationController.toSettingsPage(YES);
                    }
                }
            }
            , error: {
                  target: this
                , action: function() {
        			trackError("getOrdersFromRemote-error");
                    this.proceedWithLocalData("getOrdersFromRemote");
                }
            }
        });
    }

    /**
     * The success callback for getOrdersFromRemote.
     * If correct data is in response the following is done:
     * 1) the callback status for 'order' and 'remote' is set (means orders are correctly returned by server)
     * 2) the local available orders are deleted, the corresponding callback status is set
     * 3) orders, received from remote service, are saved in localstorage again and the corresponding status is set to YES
     *
     * @param data The returned data of the server in JSON, means JS object.
     * @param msg
     * @param xhr The XMLHTTPRequest object.
     */
    , getOrdersFromRemoteSuccess: function(data, msg, xhr) {
            	
   		if ( typeof(data['return']) === "undefined" && typeof(data['ns:return']) !== "undefined" ) {
    		data['return'] = data['ns:return'];
    		try {
    			this.myns = data['return'][0]['xsi:type'].split(":")[0];
    			var myns = this.myns;
    			 _.each(data['return'], function(el) {
    				 el.auftragsId = el[myns + ':auftragsId'];
    				 el.auftragsBezeichnung = el[myns + ':auftragsBezeichnung'];
    			 });
    		} catch(e) {
    		}
    	}

    	if(data['return']) {
            this.setCallbackStatus('order', 'remote', YES);

            // Clear orders from storages
            DigiWebApp.Order.deleteAll();
            this.setCallbackStatus('order', 'local', NO);
            var mIdArray = [];
            var rec = null;

            if(_.isObject(data['return']) && !_.isArray(data['return'])) {
                data['return'] = [data['return']];
            }

            // create a record for each order returned from the server and save it
            _.each(data['return'], function(el) {
                rec = DigiWebApp.Order.createRecord({
                      id: el.auftragsId
                    , name: el.auftragsBezeichnung
                });
                try {
                    rec.save();
                    mIdArray.push(rec.m_id);
                } catch(e) {
                    // maybe do something here
                	trackError(e);
                }
            });

            localStorage.setItem(this.storagePrefix + '_orderKeys', JSON.stringify(mIdArray));

            this.setCallbackStatus('order', 'local', YES);

            return true;

        } else {

    		return false;
        }


    }

    /**
     * Calls getPositions on DigiWebApp.RequestController.
     * Success callback calls proceeds received positions and afterwards starts retrieving activities.
     * Error callback calls proceedWithLocalData to check whether offline work is possible.
     */
    , getPositionsFromRemote: function() {
    	var that = this;

    	that.setCallbackStatus('position', 'local', NO);
    	DigiWebApp.JSONDatenuebertragungController.empfangePositionen(
    			  function() {
      				that.setCallbackStatus('position', 'remote', YES);
    		    	that.setCallbackStatus('position', 'local', (DigiWebApp.Position.find().length > 0));
    				that.setCallbackStatus('order', 'remote', YES);
    		    	that.setCallbackStatus('order', 'local', (DigiWebApp.Order.find().length > 0));
    				that.getActivitiesFromRemote();
    			  }
    			, function() {
  				  	that.setCallbackStatus('position', 'remote', NO);
  				  	that.setCallbackStatus('order', 'remote', NO);
    				that.proceedWithLocalData("getPositionsFromRemote");
    			}
    	);

//    	DigiWebApp.RequestController.getPositions({
//              success: {
//                  target: this
//                , action: function(data, msg, xhr) {
//                    this.getPositionsFromRemoteSuccess(data, msg, xhr);
//                    this.getActivitiesFromRemote();
//                }
//            }
//            , error: {
//                  target: this
//                , action: function() {
//            		trackError("getPositionsFromRemote-error");
//            		this.proceedWithLocalData("getPositionsFromRemote");
//                }
//            }
//        });
    }

//    /**
//     * The success callback for getPositionsFromRemote.
//     * If correct data is in response the following is done:
//     * 1) the callback status for 'position' and 'remote' is set (means positions are correctly returned by server)
//     * 2) the local available positions are deleted, the corresponding callback status is set
//     * 3) positions, received from remote service, are saved in localstorage again and the corresponding status is set to YES
//     *
//     * @param data The returned data of the server in JSON, means JS object.
//     * @param msg
//     * @param xhr The XMLHTTPRequest object.
//     */
//    , getPositionsFromRemoteSuccess: function(data, msg, xhr) {
//
//   		if ( typeof(data['return']) === "undefined" && typeof(data['ns:return']) !== "undefined" ) {
//    		data['return'] = data['ns:return'];
//    		try {
//    			//myns = data['return'][0]['xsi:type'].split(":")[0];
//    			var myns = this.myns;
//    			 _.each(data['return'], function(el) {
//
//    				 el.positionsId = el[myns + ':positionsId'];
//    				 el.positionsBezeichnung = el[myns + ':positionsBezeichnung'];
//    				 el.auftragsId = el[myns + ':auftragsId'];
//
//    				 el.positionHausnummer = el[myns + ':positionHausnummer'];
//    				 el.positionPlz = el[myns + ':positionPlz'];
//    				 el.positionOrt = el[myns + ':positionOrt'];
//    				 el.positionLand = el[myns + ':positionZusatz'];
//    				 el.positionLongitude = el[myns + ':positionLongitude'];
//    				 el.positionLatitude = el[myns + ':positionLatitude'];
//    				 el.positionBeschreibung = el[myns + ':positionBeschreibung'];
//    				 el.positionTelefon = el[myns + ':positionTelefon'];
//
//    			 });
//    		} catch(e) {
//    		}
//    	}
//   		 
//    	if(data['return']) {
//            this.setCallbackStatus('position', 'remote', YES);
//
//            // Clear positions from storage
//            DigiWebApp.Position.deleteAll();
//            this.setCallbackStatus('position', 'local', NO);
//
//            var mIdArray = [];
//            var rec = null;
//
//
//            if(_.isObject(data['return']) && !_.isArray(data['return'])) {
//                data['return'] = [data['return']];
//            }
//
//            // create a record for each position returned from the server and save it
//            _.each(data['return'], function(el) {
//            	            	
//            	var posid = el.positionsId;
//                var posname = el.positionsBezeichnung;
//                var posstrasse = el.positionStrasse;
//                var poshausnummer = el.positionHausnummer;
//                var posplz = el.positionPlz;
//                var posort = el.positionOrt;
//                var posland = el.positionZusatz;
//                var poscountrycode = el.positionLand;
//                var posphone = el.positionTelefon;
//                var posfax = el.positionFax;
//                var posemail = el.positionEmail;
//                var posansprechpartner = el.positionAnsprechpartner;
//                var poskundenname = el.positionKundenname;
//                var poslongitude = el.positionLongitude;
//                var poslatitude = el.positionLatitude;
//                var posdescription = el.positionBeschreibung;
//                var posorderId = el.auftragsId;
//                
//            	if (typeof(posid) === "object") { posid = ""; } 
//            	if (typeof(posname) === "object") { posname = ""; } 
//            	if (typeof(posstrasse) === "object") { posstrasse = ""; } 
//            	if (typeof(poshausnummer) === "object") { poshausnummer = ""; } 
//            	if (typeof(posplz) === "object") { posplz = ""; } 
//            	if (typeof(posort) === "object") { posort = ""; } 
//            	if (typeof(posland) === "object") { posland = ""; } 
//            	if (typeof(poscountrycode) === "object") { poscountrycode = ""; } 
//            	if (typeof(posphone) === "object") { posphone = ""; } 
//            	if (typeof(posfax) === "object") { posfax = ""; } 
//            	if (typeof(posemail) === "object") { posemail = ""; } 
//            	if (typeof(posansprechpartner) === "object") { posansprechpartner = ""; } 
//            	if (typeof(poskundenname) === "object") { poskundenname = ""; } 
//            	if (typeof(poslongitude) === "object") { poslongitude = ""; } 
//            	if (typeof(poslatitude) === "object") { poslatitude = ""; } 
//            	if (typeof(posdescription) === "object") { posdescription = ""; } 
//            	if (typeof(posorderId) === "object") { posorderId = ""; } 
//
//        		rec = DigiWebApp.Position.createRecord({
//                      id: posid
//                    , name: posname
//                    , strasse: posstrasse
//                    , hausnummer: poshausnummer
//                    , plz: posplz
//                    , ort: posort
//                    , land: posland
//                    , countrycode: poscountrycode
//                    , telefon: posphone
//                    , fax: posfax
//                    , email: posemail
//                    , ansprechpartner: posansprechpartner
//                    , kundenname: poskundenname
//                    , longitude: poslongitude
//                    , latitude: poslatitude
//                    , description: posdescription
//                    , orderId: posorderId
//                });
//        		
//                try {
//                    rec.save();
//                    mIdArray.push(rec.m_id);
//                } catch(e) {
//                	trackError(e);
//                }
//                
//            });
//
//            localStorage.setItem(this.storagePrefix + '_positionKeys', JSON.stringify(mIdArray));
//
//            this.setCallbackStatus('position', 'local', YES);
//        }
//    }


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
    	
//        DigiWebApp.RequestController.getActivities({
//              success: {
//                  target: this
//                , action: function(data, msg, xhr, getActivities) {
//                    this.getActivitiesFromRemoteSuccess(data, msg, xhr);
//                    this.getWorkPlansFromRemote();
//                }
//            }
//            , error: {
//                  target: this
//                , action: function() {
//        			trackError("getActivitiesFromRemote-error");
//                    this.proceedWithLocalData("getActivitiesFromRemote");
//                }
//            }
//        });
    }

//    /**
//     * The success callback for getActivitiesFromRemote.
//     * If correct data is in response the following is done:
//     * 1) the callback status for 'activity' and 'remote' is set (means activities are correctly returned by server)
//     * 2) the local available activities are deleted, the corresponding callback status is set
//     * 3) activities, received from remote service, are saved in localstorage again and the corresponding status is set to YES
//     *
//     * @param data The returned data of the server in JSON, means JS object.
//     * @param msg
//     * @param xhr The XMLHTTPRequest object.
//     */
//    , getActivitiesFromRemoteSuccess: function(data, msg, xhr) {
//    	
//   		if ( typeof(data['return']) === "undefined" && typeof(data['ns:return']) !== "undefined" ) {
//    		data['return'] = data['ns:return'];
//    		try {
//    			//myns = data['return'][0]['xsi:type'].split(":")[0];
//    			var myns = this.myns;
//    			 _.each(data['return'], function(el) {
//    				 el.taetigkeitsId = el[myns + ':taetigkeitsId'];
//    				 el.taetigkeitsBezeichnung = el[myns + ':taetigkeitsBezeichnung'];
//    				 el.positionsId = el[myns + ':positionsId'];
//    			 });
//    		} catch(e) {
//    		}
//    	}
//   		
//    	if(data['return']) {
//    		
//            this.setCallbackStatus('activity', 'remote', YES);
//
//            // Clear activities from storage
//            DigiWebApp.Activity.deleteAll();
//            this.setCallbackStatus('activity', 'local', NO);
//
//            var mIdArray = [];
//            var rec = null;
//
//            if(_.isObject(data['return']) && !_.isArray(data['return'])) {
//                data['return'] = [data['return']];
//            }
//
//            // create a record for each order returned from the server and save it
//            _.each(data['return'], function(el) {
//            	if (DigiWebApp.Activity.find({query:{identifier: 'id', operator: '=', value: "" + el.taetigkeitsId}}).length === 0) {
//	                rec = DigiWebApp.Activity.createRecord({
//	                    id: el.taetigkeitsId,
//	                    name: el.taetigkeitsBezeichnung,
//	                    positionId: el.positionsId
//	                });
//	
//	                try {
//	                    rec.save();
//	                    mIdArray.push(rec.m_id);
//	                } catch(e) {
//	                	trackError(e);
//	                }
//            	}
//            });
//
//            localStorage.setItem(this.storagePrefix + '_activityKeys', JSON.stringify(mIdArray));
//
//            this.setCallbackStatus('activity', 'local', YES);
//        }
//    }

    /**
     * Calls getWorkPlans on DigiWebApp.RequestController.
     * Success callback proceeds received work plans and afterwards starts retrieving hand orders.
     * Error callback calls proceedWithLocalData to check whether offline work is possible.
     */
    , getWorkPlansFromRemote: function() {
    	var that = DigiWebApp.ApplicationController;
        DigiWebApp.RequestController.getWorkPlans({
              success: {
                  target: that
                , action: function(data, msg, xhr, getWorkplan) {
        			that.getWorkPlansFromRemoteSuccess(data, msg, xhr);
        			that.getHandOrdersFromRemote();
                }
            }
            , error: {
                  target: that
                , action: function() {
            		trackError("getWorkPlansFromRemote-error");
            		that.proceedWithLocalData("getWorkPlansFromRemote");
                }
            }
        });
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
    , getWorkPlansFromRemoteSuccess: function(data, msg, xhr) {

   		if ( typeof(data['return']) === "undefined" && typeof(data['ns:return']) !== "undefined" ) {
    		data['return'] = data['ns:return'];
    		try {
    			//myns = data['return'][0]['xsi:type'].split(":")[0];
    			var myns = this.myns;
    			 _.each(data['return'], function(el) {
    				 el.arbeitsplanId = el[myns + ':arbeitsplanId'];
    				 el.positionen = el[myns + ':positionen'];
    				 el.taetigkeitsIds = el[myns + ':taetigkeitsIds'];
    				 el.arbeitsplanTyp = el[myns + ':arbeitsplanTyp'];
    			 });
    		} catch(e) {
    		}
    	}

    	if (data['return']) {
            
            this.setCallbackStatus('workPlan', 'remote', YES);
            
            // Clear activities from storage
            DigiWebApp.WorkPlan.deleteAll();
            this.setCallbackStatus('workPlan', 'local', NO);
            // create a record for each order returned from the server and save it
    		DigiWebApp.ApplicationController.DigiProgressView.show(M.I18N.l('Save'), M.I18N.l('workplans'), data['return'].length, 0);
            _.each(data['return'], function(el) {
                DigiWebApp.WorkPlan.createRecord({
                      id: el.arbeitsplanId
                    , workplanType: el.arbeitsplanTyp
                    , activityPositions: el.positionen.join(',') // join collects references to positionen in a string
                    , activityIds: el.taetigkeitsIds.join(',')    // join collects references to taetigkeitsIds in a string
                }).save();
        		DigiWebApp.ApplicationController.DigiProgressView.increase();
            });

    		DigiWebApp.ApplicationController.DigiProgressView.hide();
            this.setCallbackStatus('workPlan', 'local', YES);
        }
    }


    /**
     * Calls getHandOrders on DigiWebApp.RequestController.
     * Success callback proceeds received hand orders and afterwards starts retrieving features.
     * Error callback calls proceedWithLocalData to check whether offline work is possible.
     */
    , getHandOrdersFromRemote: function() {
        
        DigiWebApp.RequestController.getHandOrders({
              success: {
                  target: this
                , action: function(data, msg, xhr) {
                    this.getHandOrdersFromRemoteSuccess(data, msg, xhr);
                    this.getKolonneFromRemote();
                }
            }
            , error: {
                  target: this
                , action: function() {
            		trackError("getHandOrdersFromRemote-error");
                    this.proceedWithLocalData("getHandOrdersFromRemote");
                }
            }
        });
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
    , getHandOrdersFromRemoteSuccess: function(data, msg, xhr) {
        
   		if ( typeof(data['return']) === "undefined" && typeof(data['ns:return']) !== "undefined" ) {
    		data['return'] = data['ns:return'];
    		try {
    			//myns = data['return'][0]['xsi:type'].split(":")[0];
    			var myns = this.myns;
    			 _.each(data['return'], function(el) {
    				 el.handauftragsId = el[myns + ':handauftragsId'];
    				 el.handauftragsBezeichnung = el[myns + ':handauftragsBezeichnung'];
    			 });
    		} catch(e) {
    		}
    	}

    	if (data['return']) {
            this.setCallbackStatus('handOrder', 'remote', YES);

            // Clear handorders from storage
            DigiWebApp.HandOrder.deleteAll();
            this.setCallbackStatus('handOrder', 'local', NO);
            
            if(typeof(data['return']) === 'object' && !_.isArray(data['return'])) {
                data['return'] = [data['return']];
            }

            var mIdArray = [];
            var rec = null;

            if (_.isObject(data['return']) && !_.isArray(data['return'])) {
                data['return'] = [data['return']];
            }

            // create a record for each order returned from the server and save it
    		DigiWebApp.ApplicationController.DigiProgressView.show(M.I18N.l('Save'), M.I18N.l('handorders'), data['return'].length, 0);
            _.each(data['return'], function(el) {
            	if (
            			(DigiWebApp.HandOrder.find({query:{identifier: 'id', operator: '=', value: el.handauftragsId}}).length === 0)
            		&&	(DigiWebApp.HandOrder.find({query:{identifier: 'name', operator: '=', value: el.handauftragsBezeichnung}}).length === 0)
            	) {
	                rec = DigiWebApp.HandOrder.createRecord({
	                      id: el.handauftragsId
	                    , name: el.handauftragsBezeichnung
	                    , isLocalOnly: NO
	                });
            	} else if (DigiWebApp.HandOrder.find({query:{identifier: 'id', operator: '=', value: el.handauftragsId}}).length !== 0) {
            		rec = DigiWebApp.HandOrder.find({query:{identifier: 'id', operator: '=', value: el.handauftragsId}})[0];
            		rec.set("id", el.handauftragsId);
            		rec.set("name", el.handauftragsBezeichnung);
            		rec.set("isLocalOnly", NO);
            	} else if (DigiWebApp.HandOrder.find({query:{identifier: 'name', operator: '=', value: el.handauftragsBezeichnung}}).length !== 0) {
            		rec = DigiWebApp.HandOrder.find({query:{identifier: 'name', operator: '=', value: el.handauftragsBezeichnung}})[0];
            		rec.set("id", el.handauftragsId);
            		rec.set("name", el.handauftragsBezeichnung);
            		rec.set("isLocalOnly", NO);
            	}
                try {
                    rec.save();
                    mIdArray.push(rec.m_id);
                    //_.each(DigiWebApp.Booking.find({query:{identifier: 'handOrderId', operator: '=', value: el.handauftragsBezeichnung}}), function(booking) {
                    _.each(DigiWebApp.Booking.find(), function(booking) {
                    	if (booking.get('handOrderId') !== null && booking.get('handOrderId') === el.handauftragsBezeichnung) {
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
            
            localStorage.setItem(this.storagePrefix + '_handorderKeys', JSON.stringify(mIdArray));

    		DigiWebApp.ApplicationController.DigiProgressView.hide();
            this.setCallbackStatus('handOrder', 'local', YES);
        } else {
        	
            this.setCallbackStatus('handOrder', 'remote', NO);

            // Clear handorders from storage
            DigiWebApp.HandOrder.deleteAll();
    		DigiWebApp.ApplicationController.DigiProgressView.hide();
            this.setCallbackStatus('handOrder', 'local', NO);
            
        }
    }

    /**
     * Calls getFeatures on DigiWebApp.RequestController.
     * Success callback proceeds received features data.
     * Error callback calls proceedWithLocalData to check whether offline work is possible.
     */
    , getFeaturesFromRemote: function() {
        
        DigiWebApp.RequestController.getFeatures({
              success: {
                  target: this
                , action: function(data, msg, xhr) {
                    this.getFeaturesFromRemoteSuccess(data, msg, xhr);
                	var ChefToolOnly = (DigiWebApp.SettingsController.featureAvailable('409'));
                	var Bautagebuch = (DigiWebApp.SettingsController.featureAvailable('412'));
                	if (ChefToolOnly && !Bautagebuch) {
                		//TODO: Stammdaten für Bautagebuch laden
                		this.endSession();
                	} else {
                		//this.getOrdersFromRemote();
                		this.getPositionsFromRemote();
                	}
                }
            }
            , error: {
                  target: this
                , action: function() {
        			trackError("getFeaturesFromRemote-error");
                    //this.getOrdersFromRemote();
            		this.getPositionsFromRemote();
        			//this.proceedWithLocalData("getFeaturesFromRemote");
                }
            }
        });
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
	                _.each(DigiWebApp.ApplicationController.activeFeaturesBeforeTransfer, function(activeFeature) {
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
                DigiWebApp.DashboardController.init(YES);
                DigiWebApp.MediaListController.init(YES);
            }
            DigiWebApp.ApplicationController.triggerUpdate = NO;
    		DigiWebApp.ApplicationController.DigiProgressView.hide();
            this.setCallbackStatus('features', 'local', YES);
            
        } else {

        	//if (DigiWebApp.SettingsController.globalDebugMode) console.log("keine Features empfangen");

        	// keine Features empfangen
    		DigiWebApp.ApplicationController.DigiProgressView.hide();
            this.setCallbackStatus('features', 'remote', YES);

            // Clear Features from storage
            DigiWebApp.Features.deleteAll();
            this.setCallbackStatus('features', 'local', NO);
            /*DigiWebApp.Employee.createRecord({
                  id: '0'
                , name: 'Standardmitarbeiter'
                , kolonnenId: ''
                , isSelected: YES
            }).save();*/
            this.setCallbackStatus('features', 'local', YES);
        }

        if (DigiWebApp.SettingsController.getSetting('debug')) { 
        	DigiWebApp.SettingsController.globalDebugMode = YES; 
        } else {
        	DigiWebApp.SettingsController.globalDebugMode = NO; 
        }

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
        	}
    	}

    	// go to next page
    	/*
        if(this.isReadyToProceed()) {
            DigiWebApp.NavigationController.toBookTimePage(YES);
        } else {
            //M.DialogView.alert({
            DigiWebApp.ApplicationController.nativeAlertDialogView({
                  title: M.I18N.l('offlineWorkNotPossible')
                , message: M.I18N.l('offlineWorkNotPossibleMsg')
            });
        }
		*/
    }

    /**
     * Calls getKolonne on DigiWebApp.RequestController.
     * Success callback proceeds received kolonnen data.
     * Error callback calls proceedWithLocalData to check whether offline work is possible.
     */
    , getKolonneFromRemote: function() {
        
        DigiWebApp.RequestController.getKolonne({
              success: {
                  target: this
                , action: function(data, msg, xhr) {
                    this.getKolonneFromRemoteSuccess(data, msg, xhr);
                }
            }
            , error: {
                  target: this
                , action: function() {
        			trackError("getKolonneFromRemote-error");
        			this.proceedWithLocalData("getKolonneFromRemote");
                }
            }
        });
    }


    /**
     * The success callback for getKolonneFromRemote.
     *
     * Distinguishes between two scenarios:
     * 1) A Kolonne is returned
     * 2) No Kolonne is returned
     *
     * Case 1:
     * 1) the callback status for 'kolonne' and 'remote' is set (means a kolonne is correctly returned by server)
     * 2) the local available employees are deleted, the corresponding callback status is set
     * 3) employees, received from remote service, are saved in localstorage again and the corresponding status is set to YES
     *
     * 4) If a switch from a "No Kolonne" state of the app occured, the employee selection LS is cleared
     * 5) If the employee state of the app is different from "Emp Selection done" set to 1 (kolonne loaded but no selection yet)
     *
     *
     * Case 2:
     * 1) the callback status for 'kolonne' and 'remote' is set (means a kolonne is correctly returned by server, even though it's not a kolonnes)
     * 2) the local available employees are deleted, the corresponding callback status is set
     * 3) a standard employee with id=0 and name=Standardmitarbeiter is created and preselected and the corresponding local state set
     *
     *
     * In both cases:
     * 
     * 1) By calling isReadyToProceed() it is checked, whether the app is available to move to the next screen. otherwise an alert is shown.
     *    If the app is ready to proceed toBookTimePage() is called on DigiWebApp.NavigationController
     *
     * 2) endSession is called to close the session on the remote server
     *
     * 
     *
     * @param data The returned data of the server in JSON, means JS object.
     * @param msg
     * @param xhr The XMLHTTPRequest object.
     */
    , getKolonneFromRemoteSuccess: function(data, msg, xhr) {
    	
    	if (data) {
    		if ( typeof(data['return']) === "undefined" ) data['return'] = data['ns:return'];
    	}

        var mIdArray = [];
        var k = null;

        if (data && data['return']) {
            this.setCallbackStatus('kolonne', 'remote', YES);

            // Clear employees from storage
            DigiWebApp.Employee.deleteAll();
            this.setCallbackStatus('kolonne', 'local', NO);

            if ( _.isObject(data['return']) && !_.isArray(data['return']) ) {
                data['return'] = [data['return']];
            }

            // create a record for each order returned from the server and save it
    		DigiWebApp.ApplicationController.DigiProgressView.show(M.I18N.l('Save'), M.I18N.l('employees'), data['return'].length, 0);
            _.each(data['return'], function(el) {
        		DigiWebApp.ApplicationController.DigiProgressView.increase();
                k = DigiWebApp.Employee.createRecord({
                      id: el.id
                    , name: el.name
                    , kolonnenId: el.kolonnenId
                    , isSelected: NO
                });

                try {
                	k.save();
                    mIdArray.push(k.m_id);
                } catch(e) {
                	trackError(e);
                }

            });
            
            localStorage.setItem(this.storagePrefix + '_employeeKeys', JSON.stringify(mIdArray));
            
    		DigiWebApp.ApplicationController.DigiProgressView.hide();
            this.setCallbackStatus('kolonne', 'local', YES);

            // clear local storage when switch from no kolonne
            if(localStorage.getItem(DigiWebApp.EmployeeController.empSelectionKey) == 0) {
                localStorage.removeItem(DigiWebApp.EmployeeController.empSelectionKey);
            }
            if(DigiWebApp.EmployeeController.getEmployeeState() != 2) {
                DigiWebApp.EmployeeController.setEmployeeState(1); // set it to "kolonne loaded but no selection yet"
            }
            
        } else {
            // no kolonne => mitarbeiterId = 0
    		DigiWebApp.ApplicationController.DigiProgressView.hide();
            this.setCallbackStatus('kolonne', 'remote', YES);

            // Clear employees from storage
            DigiWebApp.Employee.deleteAll();
            this.setCallbackStatus('kolonne', 'local', NO);

            k = DigiWebApp.Employee.createRecord({
                  id: '0'
                , name: 'Standardmitarbeiter'
                , kolonnenId: ''
                , isSelected: YES
            }).save();
            mIdArray.push(k.m_id);
            localStorage.setItem(this.storagePrefix + '_employeeKeys', JSON.stringify(mIdArray));
            this.setCallbackStatus('kolonne', 'local', YES);
            DigiWebApp.EmployeeController.setEmployeeState(0);
        }

        // end session on server
        this.endSession();

        var empfangeBautagebuch = function() {
        	var that = DigiWebApp.ApplicationController;
            if (DigiWebApp.SettingsController.featureAvailable('412') || DigiWebApp.SettingsController.featureAvailable('402')) {
    	    	DigiWebApp.BautagebuchDatenuebertragungController.empfangen(that.afterTransfer, that.afterTransfer);
        	} else {
        		that.afterTransfer();
        	}
        }

        var empfangeFestepausendefinitionen = function() {
        	var that = DigiWebApp.ApplicationController;
            if (DigiWebApp.SettingsController.featureAvailable('425')) {
            	DigiWebApp.JSONDatenuebertragungController.empfangeFestepausendefinitionen(empfangeBautagebuch, empfangeBautagebuch); 
        	} else {
        		empfangeBautagebuch();
        	}
        }
    	
        empfangeFestepausendefinitionen();
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
     * Calls endSession on DigiWebApp.RequestController.
     * Both callbacks do nothing.
     */
    , endSession: function() {
		DigiWebApp.ApplicationController.enforceChefToolOnly();
        DigiWebApp.RequestController.endSession({
              success: {
                  target: this
                , action: function(data, msg, xhr) {
        		}
            }
            , error: {
                  target: this
                , action: function() {
    				trackError("endSession-error");
            	}
            }
        });
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

    	//alert(DigiWebApp.SettingsController.getSetting("mitarbeiterId"));
    	// zunächst muss die mitarbeiterId des Benutzers bekannt sein (ab modelVersion 1)
    	if (
    	   (typeof(DigiWebApp.SettingsController.getSetting("mitarbeiterId")) === "undefined") 
    	|| (DigiWebApp.SettingsController.getSetting("mitarbeiterId") === "")
    	|| (parseIntRadixTen(DigiWebApp.SettingsController.getSetting("mitarbeiterId")) === 0)
    	) {
    		//alert("aktualisiere Mitarbeiter des Benutzers in updateModels (" + DigiWebApp.SettingsController.getSetting("mitarbeiterId") + ")");
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
    		DigiWebApp.JSONDatenuebertragungController.recieveData(recieveObj);

    	} else {
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

    , exitApp: function() {
		DigiWebApp.ApplicationController.DigiLoaderView.show(M.I18N.l('exitApp'));
		try{DigiWebApp.ApplicationController.bgGeo.stop()}catch(e){}
		if (DigiWebApp.ApplicationController.notificationID != null) {
			try{window.plugin.notification.local.cancel(DigiWebApp.ApplicationController.notificationID);}catch(e){}
		}
		if (typeof(navigator) != "undefined" && typeof(navigator.app) != "undefined" && typeof(navigator.app.exitApp) != "undefined") {
			navigator.app.exitApp();
		}
		DigiWebApp.ApplicationController.DigiLoaderView.hide(); // just in case
    }
});
