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
    	
	    , childViews: 'orderName positionName spacer1 positionStrasseUndHausnummer positionPLZundORT positionLand positionTelefon positionFax positionEmail spacerNachEmail positionAnsprechpartner positionKundenname spacer3 positionBeschreibung spacer4 positionLongitude positionLatitude spacer5 showCoordinatesInMapButton saveAsContactButton showAddressInMapButton'

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
					if (v === '' || v === null) {
						return M.I18N.l('position') + ": " + M.I18N.l('noData');
					} else {
						return M.I18N.l('position') + ": " + v;
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
		
	    , saveAsContactButton: M.ButtonView.design({
	          value: M.I18N.l('saveAsContact')
	        //, cssClass: 'digiButton'
	        //, anchorLocation: M.CENTER
	        , events: {
	            tap: {
	                target: DigiWebApp.OrderInfoController,
	                action: function() {try{navigator.notification.vibrate(DigiWebApp.ApplicationController.CONSTVibrateDuration);}catch(e2){} this.saveAsContact();}
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
	    				try{navigator.notification.vibrate(DigiWebApp.ApplicationController.CONSTVibrateDuration);}catch(e4){}
	    				if (DigiWebApp.OrderInfoController.items.length === 0) {
	    					DigiWebApp.OrderInfoController.set('items', DigiWebApp.OrderDetailsController.positionForDetails);
	    				}
	    				try { ev.preventDefault(); } catch(e3) { console.error(e3); }
						var country = DigiWebApp.OrderInfoController.items[0].positionCountryCode;
						var zip = DigiWebApp.OrderInfoController.items[0].positionPLZ;
						var city = DigiWebApp.OrderInfoController.items[0].positionOrt;
						var street = DigiWebApp.OrderInfoController.items[0].positionStrasse;
						var housenumber = DigiWebApp.OrderInfoController.items[0].positionHausnummer;
						var addressdetails = '0';
						var url_byAddress = '';
						switch ( DigiWebApp.SettingsController.getSetting('mapType') ) {
						case "OSM":
							if (DigiWebApp.SettingsController.featureAvailable('419')) {
								alert(M.I18N.l('showInMapScholpp'));
							} else {
								alert(M.I18N.l('showInMapOSMAlert'));
							}
							url_byAddress = "http://nominatim.openstreetmap.org/search/" + country + "/" + city + "/" + street + "/" + housenumber + "?format=html&polygon=1&addressdetails=" + addressdetails;
							break;
						case "Bing":
							if (DigiWebApp.SettingsController.featureAvailable('419')) {
								alert(M.I18N.l('showInMapScholpp'));
							} else {
								alert(M.I18N.l('showInMapBingAlert'));
							}
							url_byAddress = "http://www.bing.com/maps/default.aspx?rtp=~adr." + street + " " + housenumber + " " + zip + " " + city + " " + country;
							break;
						case "Google":
							if (DigiWebApp.SettingsController.featureAvailable('419')) {
								alert(M.I18N.l('showInMapScholpp'));
							} else {
								alert(M.I18N.l('showInMapGoogleAlert'));
							}
							url_byAddress = "http://maps.google.com/maps?q=" + street + " " + housenumber + " " + zip + " " + city + " " + country + "&hl=de";
							break;
						default:
							url_byAddress = "disabled";
							break;
						}
						if (url_byAddress !== "disabled") {
							if (typeof(plugins) !== "undefined") {
			    				if (typeof(plugins.childBrowser) !== "undefined") {
			    					try { plugins.childBrowser.close(); } catch(e5) { alert("Error: " + e5.message); }
			    					try { 
			    						plugins.childBrowser.showWebPage(encodeURI(url_byAddress), { showNavigationBar: true });
			    					} catch(e6) { alert("Error: " + e6.message); }
			    				} else {
			    					DigiWebApp.ApplicationController.inAppBrowser_var = window.open(url_byAddress,'childBrowser','width=800,height=600,menubar=no,status=no,location=yes,copyhistory=no,directories=no');
			    				}
		    				} else {
		    					DigiWebApp.ApplicationController.inAppBrowser_var = window.open(url_byAddress,'childBrowser','width=800,height=600,menubar=no,status=no,location=yes,copyhistory=no,directories=no');
		    				}
						} else {
							// TODO: Error-Message for disabled Map-Services
						}
						return false;
	    			}
	            }
	        }
	    })
	
	    , showCoordinatesInMapButton: M.ButtonView.design({
	          value: M.I18N.l('showCoordinatesInMap')
	        //, cssClass: 'digiButton'
	        //, anchorLocation: M.CENTER
	        , events: {
	            tap: {
	                action: function() {
	    				try{navigator.notification.vibrate(DigiWebApp.ApplicationController.CONSTVibrateDuration);}catch(e7){}
						if (DigiWebApp.OrderInfoController.items.length === 0) {
							DigiWebApp.OrderInfoController.set('items', DigiWebApp.OrderDetailsController.positionForDetails);
						}
						var longitude = DigiWebApp.OrderInfoController.items[0].positionLongitude;
						var latitude = DigiWebApp.OrderInfoController.items[0].positionLatitude;
						var zoom = '15';
						var url_byCoordinates = "";
						switch ( DigiWebApp.SettingsController.getSetting('mapType') ) {
							case "OSM":
								if (DigiWebApp.SettingsController.featureAvailable('419')) {
									alert(M.I18N.l('showInMapScholpp'));
								} else {
									alert(M.I18N.l('showInMapOSMAlert'));
								}
								url_byCoordinates = "http://www.openstreetmap.org/index.html?mlat=" + latitude + "&mlon=" + longitude + "&zoom=" + zoom + "&layers=M";
								break;
							case "Bing":
								if (DigiWebApp.SettingsController.featureAvailable('419')) {
									alert(M.I18N.l('showInMapScholpp'));
								} else {
									alert(M.I18N.l('showInMapBingAlert'));
								}
								url_byCoordinates = "http://www.bing.com/maps/default.aspx?rtp=adr.~pos." + latitude + "_" + longitude + "_&lvl=" + (zoom + 1);
								break;
							case "Google":
								if (DigiWebApp.SettingsController.featureAvailable('419')) {
									alert(M.I18N.l('showInMapScholpp'));
								} else {
									alert(M.I18N.l('showInMapGoogleAlert'));
								}
								url_byCoordinates = "http://maps.google.com/maps?q=" + latitude + "+" + longitude + "&hl=de";
								break;
							default:
								url_byCoordinates = "disabled";
								break;
						}
						if (url_byCoordinates !== "disabled") {
		    				if (typeof(plugins) !== "undefined") {
			    				if (typeof(plugins.childBrowser) !== "undefined") {
			    					try { plugins.childBrowser.close(); } catch(e8) { alert("Error: " + e8.message); }
			    					try { 
				    					plugins.childBrowser.showWebPage(encodeURI(url_byCoordinates), { showNavigationBar: true });
			    					} catch(e9) { alert("Error: " + e9.message); }
			    				} else {
			    					DigiWebApp.ApplicationController.inAppBrowser_var = window.open(url_byCoordinates,'childBrowser','width=800,height=600,menubar=no,status=no,location=yes,copyhistory=no,directories=no');
			    				}
		    				} else {
		    					DigiWebApp.ApplicationController.inAppBrowser_var = window.open(url_byCoordinates,'childBrowser','width=800,height=600,menubar=no,status=no,location=yes,copyhistory=no,directories=no');
		    				}
						} else {
							// TODO: Error-Message for disabled Map-Services
						}
	    			}
	            }
	        }
	    })

    //})
});


