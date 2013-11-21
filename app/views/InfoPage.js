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

    //, childViews: 'header content tabBar'
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
                    , action: function() {try{DigiWebApp.ApplicationController.vibrate();}catch(e2){} this.backToDashboardPage();}
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
				    	try { MitarbeiterWebAppID = settings[0].get("workerId"); } catch(e4) { console.error(e4); }
						DigiWebApp.SettingsController.refreshMitarbeiterNameVorname(MitarbeiterWebAppID, DigiWebApp.InfoPage.pagebeforeshowFunction);
					}
                }
            }
        })
        , anchorLocation: M.TOP
    })

    , content: M.ScrollView.design({

          childViews: 'logo languageSelection spacer8 companyIdLabel mitarbeiterNameVornameLabel spacer9 versionLabel cordovaVersionLabel companyLabel streetLabel cityLabel emailLabel1 spacer1 emailLabel2 spacer2 spacer3 TMPVersionLabel spacer4 deviceinfo spacer5 connectioninfo spacer6 environmentinfo spacer7 localStorageUsage'

        , logo: M.ImageView.design({
              value: 'theme/images/NeuesLogo2013.png'
            , cssClass: 'logoInfoPage marginBottom25 unselectable'
        })

        , languageSelection: M.SelectionListView.design({
                  selectionMode: M.SINGLE_SELECTION_DIALOG
                , label: M.I18N.l('applicationLanguage')
                , applyTheme: NO
                //, childViews: "languageDeDe languageEnUs languageEsEs languageFrFr languageNlNl"
                , childViews: "languageDeDe languageEnUs"
				, languageDeDe: M.SelectionListItemView.design({
			          value: 'de_de'
			        , label: M.I18N.l('language_de_de')
			    })
			    , languageEnUs: M.SelectionListItemView.design({
			          value: 'en_us'
			        , label: M.I18N.l('language_en_us')
			    })
			    , languageFrFr: M.SelectionListItemView.design({
			          value: 'fr_fr'
			        , label: M.I18N.l('language_fr_fr')
			    })
			    , languageEsEs: M.SelectionListItemView.design({
			          value: 'es_es'
			        , label: M.I18N.l('language_es_es')
			    })
			    , languageNlNl: M.SelectionListItemView.design({
			          value: 'nl_nl'
			        , label: M.I18N.l('language_nl_nl')
			    })
                , events: {
                    change: {
                        action: function() {
                            var selectedLanguage = M.ViewManager.getView('infoPage', 'languageSelection').getSelection(YES).value;
                            M.I18N.setLanguage(selectedLanguage);
                        }
                    }
			        , tap: {
						action: function() {
			        		try{DigiWebApp.ApplicationController.vibrate();}catch(e5){}
							}
			        }
                }
        })

        , companyIdLabel: M.LabelView.design({
              computedValue: {
                  value: ''
                , operation: function(v) {
                	var myCompanyId = "";
                	try { myCompanyId = DigiWebApp.Settings.find()[0].get("company"); } catch(e6) { /*console.error(e6);*/ }
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
                	try { myWorkerId = DigiWebApp.Settings.find()[0].get("workerId"); } catch(e7) { /*console.error(e7);*/ }
                    var outString = M.I18N.l('configuredUser') + ': ' + myWorkerId;
//                    if (typeof(DigiWebApp.SettingsController.mitarbeiterNameVorname) !== "undefined" && DigiWebApp.SettingsController.mitarbeiterNameVorname !== null && DigiWebApp.SettingsController.mitarbeiterNameVorname !== "") {
//                    	outString = outString + ' (' + DigiWebApp.SettingsController.mitarbeiterNameVorname + ')';
//                    }
                    if (DigiWebApp.SettingsController.getSetting("mitarbeiterVorname") !== "" || DigiWebApp.SettingsController.getSetting("mitarbeiterNachname") !== "") { 
                    	outString = outString + " (" + DigiWebApp.SettingsController.getSetting("mitarbeiterVorname") + " " + DigiWebApp.SettingsController.getSetting("mitarbeiterNachname") + ")";
                    	if (DigiWebApp.SettingsController.getSetting("debug")) {
                    		outString = outString + "<br/>MitarbeiterID: " + DigiWebApp.SettingsController.getSetting("mitarbeiterId");	
                    	}
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
            , cssClass: 'infoLabel unselectable'
        })

        , cordovaVersionLabel: M.LabelView.design({
              computedValue: {
                  value: ''
                , operation: function(v) {
                	var output = '';
                	if (typeof(device) !== "undefined") {
                		if (typeof(device.cordova) !== "undefined") output = output + 'Cordova: ' + device.cordova;
                		if (typeof(device.phonegap) !== "undefined") {
                			if (output !== "") output = output + "<br/>"; 
                			output = output + 'PhoneGap: ' + device.phonegap;
                		}
                    }
                    //console.log("cordovaVersionLabel: " + output);
                    return output;
                }
            }
            , cssClass: 'infoLabel marginBottom25 unselectable'
        })

        , TMPVersionLabel: M.LabelView.design({
              computedValue: {
                  value: ''
                , operation: function(v) {
                	return 'The-M-Project: ' + M.Version;
                }
            }
            , cssClass: 'infoLabel marginBottom25 unselectable'
        })

        , buildLabel: M.LabelView.design({
              value: 'Build: 4567'
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

        , spacer2: M.LabelView.design({
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
            , cssClass: 'infoLabel marginTop25 unselectable'
        })

        , environmentinfo: M.LabelView.design({
              computedValue: {
                  value: ''
                , operation: function(v) {
                	var output = "";
                	if (typeof(M.Environment) !== "undefined") {
                    	output = 'Environment Platform: '     + M.Environment.getPlatform()     + '<br />';
                    }
                    //console.log("environmentinfo: " + output);
                    return output;
                }
            }
            , cssClass: 'infoLabel marginTop25 unselectable'
        })

        , deviceinfo: M.LabelView.design({
              computedValue: {
                  value: ''
                , operation: function(v) {
                	var output = "";
                	if (typeof(device) !== "undefined") {
                    	output = 'Device Name: '     + device.name     + '<br />' + 
                                 'Device Platform: ' + device.platform + '<br />' + 
                                 'Device UUID: '     + device.uuid     + '<br />' + 
                                 'Device Version: '  + device.version  + '<br />';
                    }
                    //console.log("deviceinfo: " + output);
                    return output;
                }
            }
            , cssClass: 'infoLabel marginTop25 unselectable'
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

    })

    , tabBar: DigiWebApp.TabBar

});

