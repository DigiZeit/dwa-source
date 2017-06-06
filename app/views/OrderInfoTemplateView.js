// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: DigiWebApp
// View: OrderInfoTemplateView
// ==========================================================================

DigiWebApp.OrderInfoTemplateView = M.ListItemView.design({

      isSelectable: NO
    
    , hasSingleAction: NO

    //, childViews: 'container'
    	
    //, container: M.ContainerView.design({
    	
	    , childViews: 'orderName positionName spacer1 positionStrasseUndHausnummer '
            + 'positionPLZundORT positionLand positionTelefon positionFax positionEmail '
            + 'tel_email_ButtonGrid spacerNachEmail positionAnsprechpartner positionKundenname spacer3 positionBeschreibung spacer4 positionLongitude positionLatitude spacer5 arbeitsbeginn arbeitsende spacer6 showCoordinatesInMapButton saveAsContactButton showAddressInMapButton'

	    , orderName: M.LabelView.design({
	          cssClass: 'orderName'
	        , computedValue: {
	              valuePattern: '<%= orderName %>'
	            , operation: function(v) {
	    			return v;
	              }
	          }
	    })
	
	    , positionName: M.LabelView.design({
	          cssClass: 'positionName'
	        , computedValue: {
	              valuePattern: '<%= positionName %>'
	            , operation: function(v) {
	    			// Bugfix 2108: Rename in order to be consistent with DSO
	    			var dtc6Auftrag = (DigiWebApp.SettingsController.getSetting('DTC6aktiv') === YES) 
                        ? M.I18N.l('dtc6Auftrag') : M.I18N.l('position');
					if (v === '' || v === null) {
						return dtc6Auftrag + ": " + M.I18N.l('noData');
					} else {
						return dtc6Auftrag + ": " + v;
					}
				  }
	          }
	    })
	    
	    , positionStrasseUndHausnummer: M.LabelView.design({
	          cssClass: 'positionName'
	        , computedValue: {
	        	  valuePattern: '<%= positionStrasseUndHausnummer %>'
	        	, operation: function(v) {
	    			return v;
	        	  }
	    	  }
	    })
	    
	    , positionPLZundORT: M.LabelView.design({
	          cssClass: 'positionName' 
	        , computedValue: {
	        	  valuePattern: '<%= positionPLZundOrt %>'
	        	, operation: function(v) {
	    			return v;
	        	  }
	    	  }
	    })
	    
	    , positionLand: M.LabelView.design({
	          cssClass: 'positionName' 
	        , computedValue: {
	        	  valuePattern: '<%= positionLand %>'
	        	, operation: function(v) {
					return v;
	        	  }
	    	  }
	    })
	    
	    , positionTelefon: M.LabelView.design({
	          cssClass: 'positionName' 
	        , computedValue: {
	        	  valuePattern: '<%= positionTelefon %>'
	        	, operation: function(v) {
	    			if (v === '' || v === null || v === "undefined" || typeof(v) === "undefined") {
	    				return '';
	    			} else {
	    				return M.I18N.l('phone') + ": " + v;
	    			}
	        	  }
	    	  }
	    })
	    
	    , positionFax: M.LabelView.design({
	          cssClass: 'positionName' 
	        , computedValue: {
	        	  valuePattern: '<%= positionFax %>'
	        	, operation: function(v) {
					if (v === '' || v === null || v === "undefined" || typeof(v) === "undefined") {
						return '';
					} else {
						return M.I18N.l('fax') + ": " + v;
					}
				  } 
	    	  }
	    })
	    
        , positionEmail: M.LabelView.design({
	          cssClass: 'positionName' 
	        , computedValue: {
	        	  valuePattern: '<%= positionEmail %>'
	        	, operation: function(v) {
						if (v === '' || v === null || v === "undefined" || typeof(v) === "undefined") {
							return '';
						} else {
							return M.I18N.l('email') + ": " + v;
						}
				  } 
	    	  }
	    })

        , tel_email_ButtonGrid: M.GridView.design({
            childViews: 'telButton emailButton',
            layout: M.TWO_COLUMNS,

            telButton: M.ButtonView.design({
                isIconOnly: YES,
                icon: 'theme/images/48x48_plain_phone_call.png',
                events: {
                    tap: {
                        target: DigiWebApp.OrderInfoController,
                        action: function() {
                            try {
                                DigiWebApp.ApplicationController.vibrate();
                            } catch (e2) {
                            }
                            this.callPhone();
                        }
                    }
                }
            })
            , emailButton: M.ImageView.design({
                value: 'theme/images/48x48_plain_mail.png',
                events: {
                    tap: {
                        target: DigiWebApp.OrderInfoController,
                        action: function() {
                            try { DigiWebApp.ApplicationController.vibrate(); } catch (e2) {}
                            this.sendMail();
                        }
                    }
                }
            })
        })

    	, spacerNachEmail: M.LabelView.design({
    		  value: ' '
  	        , cssClass: 'marginBottom12' 
    	})

	    
	    , positionAnsprechpartner: M.LabelView.design({
	          cssClass: 'positionName' 
	        , computedValue: {
	        	  valuePattern: '<%= positionAnsprechpartner %>'
	        	, operation: function(v) {
					if (v === '' || v === null || v === "undefined" || typeof(v) === "undefined") {
						return '';
					} else {
						return M.I18N.l('ansprechpartner') + ": " + v;
					}
	        	  }
	    	  }
	    })
	    
	    , positionKundenname: M.LabelView.design({
	          cssClass: 'positionName' 
	        , computedValue: {
	        	  valuePattern: '<%= positionKundenname %>'
	        	, operation: function(v) {
					if (v === '' || v === null || v === "undefined" || typeof(v) === "undefined") {
						return '';
					} else {
						return M.I18N.l('kundenname') + ": " + v;
					}
	        	  }
	    	  }
	    })
	    
	    , positionLongitude: M.LabelView.design({
	          cssClass: 'positionName' 
	        , computedValue: {
	    		  valuePattern: '<%= positionLongitude %>'
	        	, operation: function(v) {
    				if (v === '0.0' || v === 0 || v === null || v === "undefined" || typeof(v) === "undefined") {
    					return '';
    				} else {
    					return M.I18N.l('longitude') + ": " + v;
    				}
	        	  }
	    	  }
	    })
	    
	    , positionLatitude: M.LabelView.design({
	          cssClass: 'positionName' 
	        , computedValue: {
		          valuePattern: '<%= positionLatitude %>'
	        	, operation: function(v) {
					if (v === '0.0' || v === 0 || v === null || v === "undefined" || typeof(v) === "undefined") {
						return '';
					} else {
						return M.I18N.l('latitude') + ": " + v;
					}
	        	  }
	    	  }
	    })
	    
	    , positionBeschreibung: M.LabelView.design({
	          cssClass: 'positionName' 
	        , computedValue: {
	        	  valuePattern: '<%= positionBeschreibung %>'
	        	, operation: function(v) {
						if (v === '' || v === null || v === "undefined" || typeof(v) === "undefined") {
							return '';
						} else {
							return M.I18N.l('positionDescription') + ":<br />" + v;
						}
	        	  }
	    	  }
	    })
	    
	    , arbeitsbeginn: M.LabelView.design({
	          cssClass: 'positionName' 
	        , computedValue: {
	        	  valuePattern: '<%= arbeitsbeginn %>'
	        	, operation: function(v) {
						if (v === '' || v === null || v === "undefined" || typeof(v) === "undefined") {
							return '';
						} else {
							return M.I18N.l('arbeitsbeginn') + ": " + v;
						}
	        	  }
	    	  }
	    })

	    , arbeitsende: M.LabelView.design({
	          cssClass: 'positionName' 
	        , computedValue: {
	        	  valuePattern: '<%= arbeitsende %>'
	        	, operation: function(v) {
						if (v === '' || v === null || v === "undefined" || typeof(v) === "undefined") {
							return '';
						} else {
							return M.I18N.l('arbeitsende') + ": " + v;
						}
	        	  }
	    	  }
	    })

	    , spacer1: M.LabelView.design({
	          value: ' '
	        , cssClass: 'marginBottom12'
	    })
	
	    , spacer2: M.LabelView.design({
	          value: ' '
	        , cssClass: 'marginBottom12'
	    })
	
	    , spacer3: M.LabelView.design({
	          value: ' '
	        , cssClass: 'marginBottom12'
	    })
	
	    , spacer4: M.LabelView.design({
	          value: ' '
	        , cssClass: 'marginBottom12'
	    })
	
	    , spacer5: M.LabelView.design({
	          value: ' '
	        , cssClass: 'marginBottom12'
	    })
		
	    , spacer6: M.LabelView.design({
	          value: ' '
	        , cssClass: 'marginBottom12'
	    })

        , saveAsContactButton: M.ButtonView.design({
	          value: M.I18N.l('saveAsContact')
	        //, cssClass: 'digiButton'
	        //, anchorLocation: M.CENTER
	        , events: {
	            tap: {
	                target: DigiWebApp.OrderInfoController,
	                action: function() {
	                    try { DigiWebApp.ApplicationController.vibrate(); } catch (e2) {}
	                    this.saveAsContact();
	                }
	            }
	          }
	    })
	
	    , showAddressInMapButton: M.ButtonView.design({
	          value: M.I18N.l('showAddressInMap')
	        //, cssClass: 'digiButton'
	        //, anchorLocation: M.CENTER
	        , events: {
	            tap: {
	                action: function(buttonid, ev) {
	    				try { DigiWebApp.ApplicationController.vibrate(); } catch(e4) {}
	    				if (DigiWebApp.OrderInfoController.items.length === 0) {
	    					DigiWebApp.OrderInfoController.set('items', DigiWebApp.OrderDetailsController.positionForDetails);
	    				}
	    				try { ev.preventDefault(); } catch(e3) { trackError(e3); }
						var country = DigiWebApp.OrderInfoController.items[0].positionCountryCode;
						var zip = DigiWebApp.OrderInfoController.items[0].positionPLZ;
						var city = DigiWebApp.OrderInfoController.items[0].positionOrt;
						var street = DigiWebApp.OrderInfoController.items[0].positionStrasse;
						var housenumber = DigiWebApp.OrderInfoController.items[0].positionHausnummer;
						var addressdetails = '0';
						var urlByAddress = 'https://';
                        if (DigiWebApp.SettingsController.getSetting('benutzeHttps') === false) {
                            urlByAddress = 'http://';
                        }
						switch ( DigiWebApp.SettingsController.getSetting('mapType') ) {
						case "OSM":
							if (DigiWebApp.SettingsController.featureAvailable('419')) {
								alert(M.I18N.l('showInMapScholpp'));
							} else {
								alert(M.I18N.l('showInMapOSMAlert'));
							}
							urlByAddress = urlByAddress
							    + "nominatim.openstreetmap.org/search/" 
                                + country + "/" + city + "/" + street + "/" + housenumber
                                + "?format=html&polygon=1&addressdetails=" + addressdetails;
							break;
						case "Bing":
							if (DigiWebApp.SettingsController.featureAvailable('419')) {
								alert(M.I18N.l('showInMapScholpp'));
							} else {
								alert(M.I18N.l('showInMapBingAlert'));
							}
							urlByAddress = urlByAddress
							    + "www.bing.com/maps/default.aspx?rtp=~adr."
                                + street + " " + housenumber + " " + zip + " " + city + " " + country;
							break;
						case "Google":
							if (DigiWebApp.SettingsController.featureAvailable('419')) {
								alert(M.I18N.l('showInMapScholpp'));
							} else {
								alert(M.I18N.l('showInMapGoogleAlert'));
							}
							urlByAddress = urlByAddress
							    + "maps.google.com/maps?q="
                                + street + " " + housenumber + " " + zip + " " + city + " " + country
                                + "&hl=de";
							break;
						default:
							urlByAddress = "disabled";
							break;
						}
						if (urlByAddress !== "disabled") {
							if (typeof(plugins) !== "undefined") {
			    				if (typeof(plugins.childBrowser) !== "undefined") {
			    					try {
								        plugins.childBrowser.close();
								    } catch (e5) {
								         alert("Error: " + e5.message);
								    }
			    					try {
								        writeToLog("plugins.childBrowser.showWebPage(), url="
								            + encodeURI(urlByAddress));
			    					    plugins.childBrowser.showWebPage(encodeURI(
                                            urlByAddress), { showNavigationBar: true });
			    					} catch(e6) { alert("Error: " + e6.message); }
			    				} else {
							        writeToLog("window.open(), url=" + encodeURI(urlByAddress));
			    				    DigiWebApp.ApplicationController.inAppBrowser_var = window.open(
                                        urlByAddress,
                                        'childBrowser',
                                        'width=800,height=600,menubar=no,status=no,location=yes,copyhistory=no,directories=no');
			    				}
		    				} else {
    					        writeToLog("window.open(), url=" + encodeURI(urlByAddress));
							    DigiWebApp.ApplicationController.inAppBrowser_var = window.open(
                                    urlByAddress,
                                    'childBrowser',
                                    'width=800,height=600,menubar=no,status=no,location=yes,copyhistory=no,directories=no');
		    				}
						} else {
                            alert(M.I18N.l('showInMapDisabled'));
						}
						return false;
	    			}
	            }
	        }
	    })
	
	    , showCoordinatesInMapButton: M.ButtonView.design({
	          value: M.I18N.l('showCoordinatesInMap')
	        , events: {
	            tap: {
	                action: function() {
	    				try{ DigiWebApp.ApplicationController.vibrate(); } catch(e7) {}
						if (DigiWebApp.OrderInfoController.items.length === 0) {
							DigiWebApp.OrderInfoController.set('items', DigiWebApp.OrderDetailsController.positionForDetails);
						}
						var latitude = DigiWebApp.OrderInfoController.items[0].positionLatitude;
						var longitude = DigiWebApp.OrderInfoController.items[0].positionLongitude;
						var zoom = '15';
						if ((longitude === '0.0' && latitude === '0.0')
                            || (longitude === '0' && latitude === '0')
                            || (longitude === '' && latitude === '')
                            || (longitude === 0 && latitude === 0)) {
                            return;
                        }
						var urlByCoordinates = "https://";
                        if (DigiWebApp.SettingsController.getSetting('benutzeHttps') === false) {
                            urlByCoordinates = 'http://';
                        }
						switch ( DigiWebApp.SettingsController.getSetting('mapType') ) {
							case "OSM":
								if (DigiWebApp.SettingsController.featureAvailable('419')) {
									alert(M.I18N.l('showInMapScholpp'));
								} else {
									alert(M.I18N.l('showInMapOSMAlert'));
								}
								urlByCoordinates = urlByCoordinates
                                    + "www.openstreetmap.org/index.html?mlat="
                                    + latitude + "&mlon=" + longitude + "#map=" + zoom + "&layers=M";
								break;
							case "Bing":
								if (DigiWebApp.SettingsController.featureAvailable('419')) {
									alert(M.I18N.l('showInMapScholpp'));
								} else {
									alert(M.I18N.l('showInMapBingAlert'));
								}
								urlByCoordinates = urlByCoordinates
								    + "www.bing.com/maps/default.aspx?rtp=adr.~pos."
                                    + latitude + "_" + longitude + "_&lvl=" + (zoom + 1);
								break;
							case "Google":
								if (DigiWebApp.SettingsController.featureAvailable('419')) {
									alert(M.I18N.l('showInMapScholpp'));
								} else {
									alert(M.I18N.l('showInMapGoogleAlert'));
								}
								urlByCoordinates = urlByCoordinates
								    + "maps.google.com/maps?q="
                                    + latitude + "+" + longitude + "&hl=de";
								break;
							default:
								urlByCoordinates = "disabled";
								break;
						}
						if (urlByCoordinates !== "disabled") {
		    				if (typeof(plugins) !== "undefined") {
							    var myUrl = encodeURI(urlByCoordinates);
			    				if (typeof(plugins.childBrowser) !== "undefined") {
			    					try {
								        plugins.childBrowser.close();
								    } catch (e8) {
								        alert("Error: " + e8.message);
								    }
			    				    try {
							            writeToLog("plugins.childBrowser.showWebPage(), url=" + myUrl);
							            plugins.childBrowser.showWebPage(myUrl, { showNavigationBar: true });
								    } catch (e9) {
								         alert("Error: " + e9.message);
								    }
			    				} else {
							        writeToLog("window.open(), url=" + urlByCoordinates);
			    				    DigiWebApp.ApplicationController.inAppBrowser_var = window.open(
                                        urlByCoordinates, '_blank',
                                        'width=800,height=600,menubar=no,status=no,location=yes,copyhistory=no,directories=no');
			    				}
		    				} else {
						        writeToLog("window.open(), url=" + urlByCoordinates);
		    				    DigiWebApp.ApplicationController.inAppBrowser_var = window.open(
                                    urlByCoordinates, '_blank',
                                    'width=800,height=600,menubar=no,status=no,location=yes,copyhistory=no,directories=no');
		    				}
						} else {
                            alert(M.I18N.l('showInMapDisabled'));
						}
	    			}
	            }
	        }
	    })

    //})
});


