// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: DigiWebApp
// View: InfoPage
// ==========================================================================

m_require('app/views/TabBar.js');

DigiWebApp.InfoPage = M.PageView.design({

      lastTimePageWasLoaded: null
     
    , events: {
		  pagebeforeshow: {
            action: function() {
            	DigiWebApp.InfoPage.pagebeforeshowFunction();
            }
        }
        , pagehide: {
            action: function() {
                // reset click counter to reset settings
                DigiWebApp.ApplicationController.clickCounter = 0;
            }
        }
    }
    
    , pagebeforeshowFunction: function() {
            // reset click counter to reset settings
            DigiWebApp.ApplicationController.clickCounter = 0;
            M.ViewManager.getView('infoPage', 'languageSelection').setSelection(M.I18N.getLanguage());
            DigiWebApp.InfoPage.lastTimePageWasLoaded = +new Date();
			DigiWebApp.InfoPage.content.cordovaVersionLabel.renderUpdate();
			DigiWebApp.InfoPage.content.deviceinfo.renderUpdate();
			DigiWebApp.InfoPage.content.connectioninfo.renderUpdate();
			DigiWebApp.InfoPage.content.localStorageUsage.renderUpdate();
			DigiWebApp.InfoPage.content.mitarbeiterNameVornameLabel.renderUpdate();
    }

    , cssClass: 'infoPage'

    , childViews: 'header content'

    , header: M.ToolbarView.design({
          childViews: 'backButton title refreshButton'
        , cssClass: 'header unselectable'
        , isFixed: YES
        , backButton: M.ButtonView.design({
              value: M.I18N.l('back')
            , icon: 'arrow-l'
            , anchorLocation: M.LEFT
            , events: {
                tap: {
                      target: DigiWebApp.NavigationController
                    , action: function() {
                    	try{DigiWebApp.ApplicationController.vibrate();}catch(e2){}
	        			try{event.stopImmediatePropagation();}catch(e4){try{event.stopPropagation();}catch(e4){}}
                    	this.backToDashboardPage();
	            		return false;
                    }
                }
            }
        })
        , title: M.LabelView.design({
              value: M.I18N.l('info')
            , anchorLocation: M.CENTER
        })
        , refreshButton: M.ButtonView.design({
              value: M.I18N.l('refresh')
            , icon: 'refresh'
            , anchorLocation: M.RIGHT
            , events: {
                tap: {
        			action: function() {
        				try{DigiWebApp.ApplicationController.vibrate();}catch(e3){} 
			        	DigiWebApp.SettingsController.mitarbeiterNameVorname = "";
				        var settings = DigiWebApp.Settings.find();    		
				    	var MitarbeiterWebAppID = "0";
				    	try { MitarbeiterWebAppID = settings[0].get("workerId"); } catch(e4) { trackError(e4); }
						DigiWebApp.SettingsController.refreshMitarbeiterNameVorname(MitarbeiterWebAppID, DigiWebApp.InfoPage.pagebeforeshowFunction);
					}
                }
            }
        })
        , anchorLocation: M.TOP
    })

    , content: M.ScrollView.design({

          childViews: 'logo languageSelection spacer8 companyIdLabel mitarbeiterNameVornameLabel'
			+ ' spacer9 versionLabel spacer2 companyLabel streetLabel cityLabel phoneLabel'
			+ ' emailLabel1 spacer1 emailLabel2 spacer3 datenschutzButton spacer4 deviceinfo spacer5'
			+ ' connectioninfo spacer6 cordovaVersionLabel environmentinfo spacer7'
			+ ' localStorageUsage spacer10 toggleWeinreButton'

        , logo: M.ImageView.design({
        	// Bugfix 2142: Restyling in order to be consistent with DSO
        	computedValue: {
                value: ''
                , operation: function() {
	                var myBranding = DigiWebApp.SettingsController.getSetting("branding");
                	if (typeof(myBranding) != "undefined" && myBranding != "") {
                		if (myBranding.toLowerCase() === 'scholpp')
                			return 'theme/images/DigiLogo2013_scholpp.png';
                		else
                			return 'theme/images/DigiLogo2013_DSO.png';
                	}
                	else
                		return 'theme/images/DigiLogo2013_DSO.png';
                	
                }	
        	}
            , cssClass: 'logoInfoPage marginBottom25 unselectable'
        })

        , languageSelection: M.SelectionListView.design({
                  selectionMode: M.SINGLE_SELECTION_DIALOG
                , label: M.I18N.l('applicationLanguage')
                , applyTheme: NO
                , childViews: "languageDeDe languageEnUs"
				, languageDeDe: M.SelectionListItemView.design({
			          value: 'de_de'
			        , label: M.I18N.l('language_de_de')
			    })
			    , languageEnUs: M.SelectionListItemView.design({
			          value: 'en_us'
			        , label: M.I18N.l('language_en_us')
			    })
                , events: {
                    change: {
                        action: function() {
                            var selectedLanguage = M.ViewManager.getView('infoPage', 'languageSelection').getSelection(YES).value;
                            M.I18N.setLanguage(selectedLanguage);
                        }
                    }
                }
        })

        , companyIdLabel: M.LabelView.design({
              computedValue: {
                  value: ''
                , operation: function(v) {
                	var myCompanyId = "";
                	try { myCompanyId = DigiWebApp.Settings.find()[0].get("company"); } catch(e6) { /*trackError(e6);*/ }
                    return M.I18N.l('company') + ': ' + myCompanyId;
                }
            }
            , cssClass: 'infoLabel unselectable'
        })

        , mitarbeiterNameVornameLabel: M.LabelView.design({
              computedValue: {
                  value: ''
                , operation: function(v) {
                	var myWorkerId = "";
                	try { myWorkerId = DigiWebApp.Settings.find()[0].get("workerId"); } catch(e7) { /*trackError(e7);*/ }
                    var outString = M.I18N.l('configuredUser') + ': ' + myWorkerId;
//                    if (typeof(DigiWebApp.SettingsController.mitarbeiterNameVorname) !== "undefined" && DigiWebApp.SettingsController.mitarbeiterNameVorname !== null && DigiWebApp.SettingsController.mitarbeiterNameVorname !== "") {
//                    	outString = outString + ' (' + DigiWebApp.SettingsController.mitarbeiterNameVorname + ')';
//                    }
                    if (DigiWebApp.SettingsController.getSetting("mitarbeiterVorname") !== "" || DigiWebApp.SettingsController.getSetting("mitarbeiterNachname") !== "") { 
                    	outString = outString + " (" + DigiWebApp.SettingsController.getSetting("mitarbeiterVorname") + " " + DigiWebApp.SettingsController.getSetting("mitarbeiterNachname") + ")";
//                    	if (DigiWebApp.SettingsController.getSetting("debug"))  {
//                    		outString = outString + "<br/>MitarbeiterID: " + DigiWebApp.SettingsController.getSetting("mitarbeiterId");	
//                    	}
                    }
                    return outString;
                }
            }
            , cssClass: 'infoLabel unselectable'
        })

        , versionLabel: M.LabelView.design({
              computedValue: {
                  value: ''
                , operation: function(v) {
                    return 'Version: ' + M.Application.getConfig('version');
                }
            }
            , cssClass: 'infoLabel marginBottom25 unselectable'
        })

        , spacer2: M.LabelView.design({
            value: ' '
        })

        , cordovaVersionLabel: M.LabelView.design({
              computedValue: {
                  value: ''
                , operation: function(v) {
                	var output = '';
                	if (typeof(device) !== "undefined") {
                		if (typeof(device.cordova) !== "undefined") {
							output = output + 'Cordova: ' + device.cordova;
						}
                		if (typeof(device.phonegap) !== "undefined") {
                			if (output !== "") output = output + "<br/>"; 
                			output = output + 'PhoneGap: ' + device.phonegap;
                		}
                    }
                    return output;
                }
            }
            , cssClass: 'infoLabel unselectable'
        })

        , buildLabel: M.LabelView.design({
              value: 'Build: 7335'
            , cssClass: 'infoLabel marginBottom25 unselectable'
        })

        , companyLabel: M.LabelView.design({
              value: 'DIGI-Zeiterfassung GmbH'
            , cssClass: 'infoLabel unselectable'
        })

        , streetLabel: M.LabelView.design({
              value: 'Raiffeisenstr. 30'
            , cssClass: 'infoLabel unselectable'
        })

        , cityLabel: M.LabelView.design({
              value: 'D-70794 Filderstadt'
            , cssClass: 'infoLabel unselectable'
        })

        , phoneLabel: M.LabelView.design({
              value: '<a href="tel:+49711709600">+49-711-70960-0</a>'
            , cssClass: 'infoLabel marginBottom25 unselectable'
        })

        , emailLabel1: M.LabelView.design({
              value: 'eMail: '
            , cssClass: 'infoLabel unselectable'
            , isInline: YES
        })

        , emailLabel2: M.LabelView.design({
              value: 'support@digi-zeiterfassung.de'
            , hyperlinkTarget: 'support@digi-zeiterfassung.de" onclick="return DigiWebApp.InfoPage.lastTimePageWasLoaded < (+new Date() - 1000);"'
            , hyperlinkType: M.HYPERLINK_EMAIL
            , cssClass: 'infoLabel unselectable'
            , isInline: YES
        })

        , spacer1: M.LabelView.design({
            value: ' '
        })

        , spacer3: M.LabelView.design({
            value: '&nbsp;'
        })

        , spacer4: M.LabelView.design({
            value: ' '
        })

        , spacer5: M.LabelView.design({
            value: ' '
        })

        , spacer6: M.LabelView.design({
            value: ' '
        })

        , spacer7: M.LabelView.design({
            value: ' '
        })

        , spacer8: M.LabelView.design({
              value: '<br /><br />'
            , cssClass: 'infoLabel unselectable'
        })

        , spacer9: M.LabelView.design({
              value: '<br />'
            , cssClass: 'infoLabel unselectable'
        })

        , spacer10: M.LabelView.design({
              value: '<br />'
            , cssClass: 'infoLabel unselectable'
        })

        , webLabel1: M.LabelView.design({
              value: 'Web: '
            , cssClass: 'infoLabel unselectable'
            , isInline: YES
        })

        , webLabel2: M.LabelView.design({
              value: 'www.digi-zeiterfassung.de'
            , hyperlinkTarget: 'http://www.digi-zeiterfassung.de" onclick="return DigiWebApp.InfoPage.lastTimePageWasLoaded < (+new Date() - 1000);"'
            , hyperlinkType: M.HYPERLINK_WEBSITE
            , cssClass: 'infoLabel unselectable'
            , isInline: YES
        })
	
        , localStorageUsage: M.LabelView.design({
              computedValue: {
                  value: ''
                , operation: function(v) {
                	var output = "";
                	var LSsize = new Number(JSON.stringify(localStorage).length / 1048576).toFixed(2); 
                	if (typeof(localStorage) !== "undefined") {
                    	output = 'LocalStorage-Usage: ' + LSsize + ' MB<br />';
                    }
                    return output;
                }
            }
            , cssClass: 'infoLabel unselectable'
        })

        , environmentinfo: M.LabelView.design({
              computedValue: {
                  value: ''
                , operation: function(v) {
                	var output = "";
                	if (typeof(M.Environment) !== "undefined") {
                    	output = 'Environment Platform: '     + M.Environment.getPlatform()     + '<br />';
                    }
                    return output;
                }
            }
            , cssClass: 'infoLabel unselectable'
        })

        , deviceinfo: M.LabelView.design({
              computedValue: {
                  value: ''
                , operation: function(v) {
                	var output = "";
                	if (typeof(device) !== "undefined") {
                    	output = 'Device Model: ' + device.model + '<br />' + 
			                     'Device Platform: ' + device.platform + '<br />' + 
                                 'Device Version: '  + device.version  + '<br />' +
								 'Device UUID: '     + device.uuid     + '<br />'; 
                    }
                    return output;
                }
            }
            , cssClass: 'infoLabel unselectable'
        })

        , connectioninfo: M.LabelView.design({
              computedValue: {
                  value: ''
                , operation: function(v) {
					if (typeof(navigator.connection) !== "undefined" && typeof(Connection) !== "undefined") {
					
						var networkState = navigator.connection.type;
				
				        var states = {};
				        states[Connection.UNKNOWN]  = 'Unknown connection';
				        states[Connection.ETHERNET] = 'Ethernet connection';
				        states[Connection.WIFI]     = 'WiFi connection';
				        states[Connection.CELL_2G]  = 'Cell 2G connection';
				        states[Connection.CELL_3G]  = 'Cell 3G connection';
				        states[Connection.CELL_4G]  = 'Cell 4G connection';
				        states[Connection.CELL]     = 'Cellular connection';
				        states[Connection.NONE]     = 'No network connection';
				
				        return 'Connection type: ' + states[networkState];
				        
				    } else {
                    	return '';
				    }
                }
            }
            , cssClass: 'infoLabel marginBottom25 unselectable'
        })
        
        , toggleWeinreButton: M.ButtonView.design({
	          value: M.I18N.l('fernwartung')
	        , events: {
	            tap: {
	                action: function() {
	                    DigiWebApp.ApplicationController.DigiLoaderView.show('Ermittle IP-Adresse - Bitte Warten...');
                    	try{DigiWebApp.ApplicationController.vibrate();}catch(e2){}
	                	$.ajax({
	                        url: 'http://freegeoip.net/json/',
	                        type: 'POST',
	                        dataType: 'jsonp',
	                        success: function(location) {
    		                    DigiWebApp.ApplicationController.DigiLoaderView.hide();
	                            var weinreUserIP = location.ip;
	    	                	if (!toggleWeinre(weinreUserIP)) {
	    	                		alert(M.I18N.l("fernwartungKonnteNichtGestartetWerden"));
	    	                	} else {
	    	                    	try{DigiWebApp.ApplicationController.vibrate();}catch(e2){}
	    	                	}
	                        }
	                		, error: function() {
		                    	DigiWebApp.ApplicationController.DigiLoaderView.hide();
	        	        		DigiWebApp.ApplicationController.nativeConfirmDialogView({
	      		            	  title: M.I18N.l("fernwartungKonnteNichtGestartetWerden")
	      	    		        , message: "Möchten Sie trotzdem fortfahren?"
	      			            , confirmButtonValue: M.I18N.l('yes')
	      	            		, cancelButtonValue: M.I18N.l('no')
	      	            		, callbacks: {
	      	                		  confirm: {
	      	                    		  target: this
	      	                    		, action: function() {
			      		    	                	if (!toggleWeinre("nichtErmittelbar")) {
			      		    	                		alert(M.I18N.l("fernwartungKonnteNichtGestartetWerden"));
			      		    	                	} else {
			      		    	                    	try{DigiWebApp.ApplicationController.vibrate();}catch(e2){}
			      		    	                	}
	      	                    				}
	      	                			}
	      	            		}
	      	        		});
	                		} 
	                    });
	            	}
	            }
	        }
        })

		, datenschutzButton: M.ButtonView.design({
			value: M.I18N.l('datenschutzerklaerung')
	        , events: {
	            tap: {
	                action: function() {
						var url = "Datenschutzerklaerung_DIGI-Apps.html";
						writeToLog("window.open(), url=" + url);
			    		DigiWebApp.ApplicationController.inAppBrowser_var = window.open(
                            url,
                            'childBrowser',
                            'menubar=no,status=no,location=no,copyhistory=no,directories=no');
					}
				}
			}
		})
    })

    , tabBar: DigiWebApp.TabBar

});

