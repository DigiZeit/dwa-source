// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: DigiWebApp
// View: ZeitbuchungDetailsPage
// ==========================================================================

DigiWebApp.ZeitbuchungDetailsPage = M.PageView.design({

	  updateContent: function() {
		_.each(DigiWebApp.ZeitbuchungDetailsPage.content, function(c) { 
			try {
				if (   c.id !== DigiWebApp.ZeitbuchungDetailsPage.content.infoButton.id
					&& c.id !== DigiWebApp.ZeitbuchungDetailsPage.content.showBookingCoordinatesInMapButton.id
					&& c.id !== DigiWebApp.ZeitbuchungDetailsPage.content.showPositionCoordinatesInMapButton.id
				) {
					c.renderUpdate();
				}
			} catch(e2) { /*trackError(e2);*/ } 
		});							
	}

    , cssClass: 'zeitbuchungDetailsPage'

    , childViews: 'header content'

    , header: M.ToolbarView.design({
          childViews: 'backButton title'
        , cssClass: 'header unselectable'
        , isFixed: YES
        , backButton: M.ButtonView.design({
              value: M.I18N.l('back')
            , icon: 'arrow-l'
            , anchorLocation: M.LEFT
            , events: {
                tap: {
                      target: DigiWebApp.NavigationController
                    , action: 'backToZeitbuchungenPageTransition'
                }
            }
        })
        , title: M.LabelView.design({
              value: M.I18N.l('Zeitbuchung')
            , anchorLocation: M.CENTER
        })
        , anchorLocation: M.TOP
    })

    , content: M.ScrollView.design({

    	  childViews: 'datum von bis spacerNachBis dauer infoButton spacerNachButton order position handApplications activity activityPositionInWorkplan spacerNachActivityPositionInWorkplan remark farbeAmpel gpsBreite gpsLaenge showBookingCoordinatesInMapButton gpsBreitePosition gpsLaengePosition showPositionCoordinatesInMapButton'
        	  
        , cssClass: 'content'

        , datum: M.LabelView.design({
              computedValue: {
                  value: ''
                , operation: function(v) {
        			if (DigiWebApp.ZeitbuchungenController.itemForDetails !== null) {
			            return DigiWebApp.ZeitbuchungenController.itemForDetails.get("datum") + ', ';
			        } else {
			            return '';
			        }
                }
            }
        	, isInline: YES
            , cssClass: 'datum unselectable'
        })

        , von: M.LabelView.design({
            computedValue: {
                value: ''
              , operation: function(v) {
					if (DigiWebApp.ZeitbuchungenController.itemForDetails !== null) {
					    if (DigiWebApp.ZeitbuchungenController.itemForDetails.get("bis") === ""
                            || DigiWebApp.ZeitbuchungenController.itemForDetails.get("bis") === "-"
                        ) {
    						return M.I18N.l('since') + ' ' + DigiWebApp.ZeitbuchungenController.itemForDetails.get("von");
    					} else {
    						return DigiWebApp.ZeitbuchungenController.itemForDetails.get("von");
    					}
					} else {
						return '';
					}
	              }
	          }
	       	  , isInline: YES
	          , cssClass: 'von marginBottom20 unselectable'
	      })

        , bis: M.LabelView.design({
	          computedValue: {
	              value: ''
	            , operation: function(v) {
	    	  			if (DigiWebApp.ZeitbuchungenController.itemForDetails !== null) {
	    	  			    if (DigiWebApp.ZeitbuchungenController.itemForDetails.get("bis") !== ""
                                && DigiWebApp.ZeitbuchungenController.itemForDetails.get("bis") !== "-"
                            ) {
	    						return ' - ' + DigiWebApp.ZeitbuchungenController.itemForDetails.get("bis");
	    					} else {
	    						return '';
	    					}
						} else {
							return '';
						}
	      			}
		        }
		      	, isInline: YES
		        , cssClass: 'bis marginBottom20 unselectable'
      	})

		, spacerNachBis: M.LabelView.design({
		      value: ' '
		})
	
        , dauer: M.LabelView.design({
	          computedValue: {
	              value: ''
	            , operation: function(v) {
	    	  			if (DigiWebApp.ZeitbuchungenController.itemForDetails !== null) {
	    	  			    if ((DigiWebApp.ZeitbuchungenController.itemForDetails.get("dauer") !== ""
                                && DigiWebApp.ZeitbuchungenController.itemForDetails.get("dauer") !== "-"
                                && typeof (DigiWebApp.ZeitbuchungenController.itemForDetails.get("dauer")) !== "undefined")
	    					    && (DigiWebApp.ZeitbuchungenController.itemForDetails.get("bis") !== ""
                                && DigiWebApp.ZeitbuchungenController.itemForDetails.get("bis") !== "-")
	    					) {
	    						return M.I18N.l('dauer') + ': ' + DigiWebApp.ZeitbuchungenController.itemForDetails.get("dauer");
	    					} else {
	    						return '';
	    					}
						} else {
							return '';
						}
	      			}
		        }
		        , cssClass: 'dauer unselectable'
      	})

        , order: M.LabelView.design({
            computedValue: {
                value: ''
              , operation: function(v) {
        			// Bugfix 2108: Rename in order to be consistent with DSO
        			var dtc6Ordner = (DigiWebApp.SettingsController.getSetting('DTC6aktiv') === YES) ? M.I18N.l('dtc6Ordner') : M.I18N.l('order');
      	  			if (DigiWebApp.ZeitbuchungenController.itemForDetails !== null) {
      	  			    if (DigiWebApp.ZeitbuchungenController.itemForDetails.get("auftragsBezeichnung") !== ""
                            && typeof (DigiWebApp.ZeitbuchungenController.itemForDetails.get("auftragsBezeichnung")) !== "undefined"
                            && DigiWebApp.ZeitbuchungenController.itemForDetails.get("auftragsBezeichnung") !== "null"
                            && DigiWebApp.ZeitbuchungenController.itemForDetails.get("auftragsBezeichnung") !== null
                        ) {
      						//$('#' + DigiWebApp.ZeitbuchungDetailsPage.content.infoButton.id).button("enable");
      						return dtc6Ordner + ': ' + DigiWebApp.ZeitbuchungenController.itemForDetails.get("auftragsBezeichnung");
      					} else {
      						//$('#' + DigiWebApp.ZeitbuchungDetailsPage.content.infoButton.id).button("disable");
      						return dtc6Ordner + ': -';
      					}
  					} else {
  						//$('#' + DigiWebApp.ZeitbuchungDetailsPage.content.infoButton.id).button("disable");
  						return dtc6Ordner + ': -';
  					}
    			}
  	        }
  	        , cssClass: 'normalDetail marginLeft35 moveUp38 unselectable'
    	})

        , position: M.LabelView.design({
            computedValue: {
                value: ''
              , operation: function(v) {
        			// Bugfix 2108: Rename in order to be consistent with DSO
        			var dtc6Auftrag = (DigiWebApp.SettingsController.getSetting('DTC6aktiv') === YES) ? M.I18N.l('dtc6Auftrag') : M.I18N.l('position');
      	  			if (DigiWebApp.ZeitbuchungenController.itemForDetails !== null) {
      	  			    if (DigiWebApp.ZeitbuchungenController.itemForDetails.get("positionsBezeichnung") !== ""
                            && typeof (DigiWebApp.ZeitbuchungenController.itemForDetails.get("positionsBezeichnung")) !== "undefined"
                            && DigiWebApp.ZeitbuchungenController.itemForDetails.get("positionsBezeichnung") !== "null"
                            && DigiWebApp.ZeitbuchungenController.itemForDetails.get("positionsBezeichnung") !== null
                        ) {
      						//$('#' + DigiWebApp.ZeitbuchungDetailsPage.content.infoButton.id).button("enable");
      						return dtc6Auftrag + ': ' + DigiWebApp.ZeitbuchungenController.itemForDetails.get("positionsBezeichnung");
      					} else {
      						//$('#' + DigiWebApp.ZeitbuchungDetailsPage.content.infoButton.id).button("disable");
      						return dtc6Auftrag + ': -';
      					}
  					} else {
  						//$('#' + DigiWebApp.ZeitbuchungDetailsPage.content.infoButton.id).button("disable");
  						return dtc6Auftrag + ': -';
  					}
    			}
  	        }
  	        , cssClass: 'normalDetail marginLeft35 marginTop0 marginBottom10 unselectable'
    	})

        , infoButton: M.ButtonView.design({
        	computedValue: {
        		value: ''
        	  , operation: function() {
        			return '?';
        		}
        	}
            , anchorLocation: M.LEFT
  	        , cssClass: 'posInfoButton'
            , events: {
                tap: {
                    target: DigiWebApp.NavigationController,
                    action: 'toOrderDetailsPageTransition'
//            		action: function() {
//            			if (DigiWebApp.ZeitbuchungenController.itemForDetails.get("positionsId") !== 0) {
//            				DigiWebApp.NavigationController.toOrderDetailsPageTransition();
//            			}
//            		}
            	}
        	}
        	, isInline: YES
    	})

		, spacerNachButton: M.LabelView.design({
		      value: ' '
	      	, isInline: YES
		})
	
        , handApplications: M.LabelView.design({
            computedValue: {
                value: ''
              , operation: function(v) {
      	  			if (DigiWebApp.ZeitbuchungenController.itemForDetails !== null) {
      	  			    if (DigiWebApp.ZeitbuchungenController.itemForDetails.get("handauftragsBezeichnung") !== ""
                            && typeof (DigiWebApp.ZeitbuchungenController.itemForDetails.get("handauftragsBezeichnung")) !== "undefined"
                            && DigiWebApp.ZeitbuchungenController.itemForDetails.get("handauftragsBezeichnung") !== "null"
                            && DigiWebApp.ZeitbuchungenController.itemForDetails.get("handauftragsBezeichnung") !== null
                        ) {
      						return M.I18N.l('handApplications') + ': ' + DigiWebApp.ZeitbuchungenController.itemForDetails.get("handauftragsBezeichnung");
      					} else {
      						return '';
      					}
  					} else {
  						return '';
  					}
        			}
  	        }
  	        , cssClass: 'normalDetail unselectable'
    	})

        , activity: M.LabelView.design({
            computedValue: {
                value: ''
              , operation: function(v) {
      	  			if (DigiWebApp.ZeitbuchungenController.itemForDetails !== null) {
      	  			    if (DigiWebApp.ZeitbuchungenController.itemForDetails.get("taetigkeit") !== ""
                            && typeof (DigiWebApp.ZeitbuchungenController.itemForDetails.get("taetigkeit")) !== "undefined"
                            && DigiWebApp.ZeitbuchungenController.itemForDetails.get("taetigkeit") !== "null"
                            && DigiWebApp.ZeitbuchungenController.itemForDetails.get("taetigkeit") !== null
                        ) {
      						// Bugfix 2108: Rename in order to be consistent with DSO
      	  			        return ((DigiWebApp.SettingsController.getSetting('DTC6aktiv') === YES)
                                ? M.I18N.l('dtc6Leistung') : M.I18N.l('activity'))
                                + ': ' + DigiWebApp.ZeitbuchungenController.itemForDetails.get("taetigkeit");
      					} else {
      						return '';
      					}
  					} else {
  						return '';
  					}
        			}
  	        }
        	, isInline: YES
  	        , cssClass: 'normalDetail unselectable'
    	})

        , activityPositionInWorkplan: M.LabelView.design({
            computedValue: {
                value: ''
              , operation: function(v) {
      	  			if (DigiWebApp.ZeitbuchungenController.itemForDetails !== null) {
      	  			    if (DigiWebApp.ZeitbuchungenController.itemForDetails.get("taetigkeitreihenfolge") !== ""
                            && typeof (DigiWebApp.ZeitbuchungenController.itemForDetails.get("taetigkeitreihenfolge")) !== "undefined"
                            && DigiWebApp.ZeitbuchungenController.itemForDetails.get("taetigkeitreihenfolge") !== "null"
                            && DigiWebApp.ZeitbuchungenController.itemForDetails.get("taetigkeitreihenfolge") !== null
                        ) {
      						return ' (' + DigiWebApp.ZeitbuchungenController.itemForDetails.get("taetigkeitreihenfolge") + ')';
      					} else {
      						return '';
      					}
  					} else {
  						return '';
  					}
    			}
  	        }
        	, isInline: YES
  	        , cssClass: 'normalDetail unselectable'
    	})

		, spacerNachActivityPositionInWorkplan: M.LabelView.design({
		      value: ' '
		})
	
        , remark: M.LabelView.design({
            computedValue: {
                value: ''
              , operation: function(v) {
      	  			if (DigiWebApp.ZeitbuchungenController.itemForDetails !== null) {
      	  			    if (DigiWebApp.ZeitbuchungenController.itemForDetails.get("remark") !== ""
                            && typeof (DigiWebApp.ZeitbuchungenController.itemForDetails.get("remark")) !== "undefined"
                            && DigiWebApp.ZeitbuchungenController.itemForDetails.get("remark") !== "null"
                            && DigiWebApp.ZeitbuchungenController.itemForDetails.get("remark") !== null
                        ) {
      						return M.I18N.l('remark') + ': ' + DigiWebApp.ZeitbuchungenController.itemForDetails.get("remark");
      					} else {
      						return '';
      					}
  					} else {
  						return '';
  					}
    			}
  	        }
  	        , cssClass: 'normalDetail unselectable'
    	})

        , gpsBreite: M.LabelView.design({
            computedValue: {
                value: ''
              , operation: function(v) {
      	  			if (DigiWebApp.ZeitbuchungenController.itemForDetails !== null) {
      	  			    if (DigiWebApp.ZeitbuchungenController.itemForDetails.get("gpsBreite") !== ""
                            && typeof (DigiWebApp.ZeitbuchungenController.itemForDetails.get("gpsBreite")) !== "undefined"
                            && DigiWebApp.ZeitbuchungenController.itemForDetails.get("gpsBreite") !== "0.0"
                            && DigiWebApp.ZeitbuchungenController.itemForDetails.get("gpsBreite") !== 0
                            && DigiWebApp.ZeitbuchungenController.itemForDetails.get("gpsBreite") !== null
                        ) {
      						$('#' + DigiWebApp.ZeitbuchungDetailsPage.content.showBookingCoordinatesInMapButton.id).show();
      						var str = new Number(DigiWebApp.ZeitbuchungenController.itemForDetails.get("gpsBreite"));
      						return M.I18N.l('booking') + '-' + M.I18N.l('latitude') + ': ' + str.toFixed(6);
      					} else {
      						$('#' + DigiWebApp.ZeitbuchungDetailsPage.content.showBookingCoordinatesInMapButton.id).hide();
      						return '';
      					}
  					} else {
  						$('#' + DigiWebApp.ZeitbuchungDetailsPage.content.showBookingCoordinatesInMapButton.id).hide();
  						return '';
  					}
    			}
  	        }
  	        , cssClass: 'smallDetail marginTop12 unselectable'
    	})

        , gpsLaenge: M.LabelView.design({
            computedValue: {
                value: ''
              , operation: function(v) {
      	  			if (DigiWebApp.ZeitbuchungenController.itemForDetails !== null) {
      	  			    if (DigiWebApp.ZeitbuchungenController.itemForDetails.get("gpsLaenge") !== ""
                            && typeof (DigiWebApp.ZeitbuchungenController.itemForDetails.get("gpsLaenge")) !== "undefined"
                            && DigiWebApp.ZeitbuchungenController.itemForDetails.get("gpsLaenge") !== "0.0"
                            && DigiWebApp.ZeitbuchungenController.itemForDetails.get("gpsLaenge") !== 0
                            && DigiWebApp.ZeitbuchungenController.itemForDetails.get("gpsLaenge") !== null
                        ) {
      						$('#' + DigiWebApp.ZeitbuchungDetailsPage.content.showBookingCoordinatesInMapButton.id).show();
      						var str = new Number(DigiWebApp.ZeitbuchungenController.itemForDetails.get("gpsLaenge"));
      						return M.I18N.l('booking') + '-' + M.I18N.l('longitude') + ': ' + str.toFixed(6);
      					} else {
      						$('#' + DigiWebApp.ZeitbuchungDetailsPage.content.showBookingCoordinatesInMapButton.id).hide();
      						return '';
      					}
  					} else {
  						$('#' + DigiWebApp.ZeitbuchungDetailsPage.content.showBookingCoordinatesInMapButton.id).hide();
  						return '';
  					}
    			}
  	        }
  	        , cssClass: 'smallDetail unselectable'
    	})

        , gpsBreitePosition: M.LabelView.design({
            computedValue: {
                value: ''
              , operation: function(v) {
      	  			if (DigiWebApp.ZeitbuchungenController.itemForDetails !== null) {
      	  			    if (DigiWebApp.ZeitbuchungenController.itemForDetails.get("gpsBreitePosition") !== ""
                            && typeof (DigiWebApp.ZeitbuchungenController.itemForDetails.get("gpsBreitePosition")) !== "undefined"
                            && DigiWebApp.ZeitbuchungenController.itemForDetails.get("gpsBreitePosition") !== "0.0"
                            && DigiWebApp.ZeitbuchungenController.itemForDetails.get("gpsBreitePosition") !== 0
                            && DigiWebApp.ZeitbuchungenController.itemForDetails.get("gpsBreitePosition") !== null
                        ) {
      						$('#' + DigiWebApp.ZeitbuchungDetailsPage.content.showPositionCoordinatesInMapButton.id).show();
      						var str = new Number(DigiWebApp.ZeitbuchungenController.itemForDetails.get("gpsBreitePosition"));
      						// Bugfix 2108: Rename in order to be consistent with DSO
      						return ((DigiWebApp.SettingsController.getSetting('DTC6aktiv') === YES) ? M.I18N.l('dtc6Ordner') : M.I18N.l('order')) 
      								+ '-' + M.I18N.l('latitude') + ': ' + str.toFixed(6);
      					} else {
      						$('#' + DigiWebApp.ZeitbuchungDetailsPage.content.showPositionCoordinatesInMapButton.id).hide();
      						return '';
      					}
  					} else {
  						$('#' + DigiWebApp.ZeitbuchungDetailsPage.content.showPositionCoordinatesInMapButton.id).hide();
  						return '';
  					}
    			}
  	        }
  	        , cssClass: 'smallDetail marginTop12 unselectable'
    	})

        , gpsLaengePosition: M.LabelView.design({
            computedValue: {
                value: ''
              , operation: function(v) {
      	  			if (DigiWebApp.ZeitbuchungenController.itemForDetails !== null) {
      	  			    if (DigiWebApp.ZeitbuchungenController.itemForDetails.get("gpsLaengePosition") !== ""
                            && typeof (DigiWebApp.ZeitbuchungenController.itemForDetails.get("gpsLaengePosition")) !== "undefined"
                            && DigiWebApp.ZeitbuchungenController.itemForDetails.get("gpsLaengePosition") !== "0.0"
                            && DigiWebApp.ZeitbuchungenController.itemForDetails.get("gpsLaengePosition") !== 0
                            && DigiWebApp.ZeitbuchungenController.itemForDetails.get("gpsLaengePosition") !== null
                        ) {
      						$('#' + DigiWebApp.ZeitbuchungDetailsPage.content.showPositionCoordinatesInMapButton.id).show();
      						var str = new Number(DigiWebApp.ZeitbuchungenController.itemForDetails.get("gpsLaengePosition"));
      						// Bugfix 2108: Rename in order to be consistent with DSO
      						return ((DigiWebApp.SettingsController.getSetting('DTC6aktiv') === YES) ? M.I18N.l('dtc6Ordner') : M.I18N.l('order'))
      								+ '-' + M.I18N.l('longitude') + ': ' + str.toFixed(6);
      					} else {
      						$('#' + DigiWebApp.ZeitbuchungDetailsPage.content.showPositionCoordinatesInMapButton.id).hide();
      						return '';
      					}
  					} else {
  						$('#' + DigiWebApp.ZeitbuchungDetailsPage.content.showPositionCoordinatesInMapButton.id).hide();
  						return '';
  					}
    			}
  	        }
  	        , cssClass: 'smallDetail unselectable'
    	})

        , farbeAmpel: M.LabelView.design({
            computedValue: {
                value: ''
              , operation: function(v) {
      	  			if (DigiWebApp.ZeitbuchungenController.itemForDetails !== null) {
      	  			    if (DigiWebApp.ZeitbuchungenController.itemForDetails.get("farbeAmpel") !== ""
                            && typeof (DigiWebApp.ZeitbuchungenController.itemForDetails.get("farbeAmpel")) !== "undefined"
                        ) {
      						var myColor = DigiWebApp.ZeitbuchungenController.itemForDetails.get("farbeAmpel");
      						return M.I18N.l('geozoneTrafficlight') + ': '
                                + '<span style="box-shadow: 2px 2px 6px rgba(0,0,0,0.6);background:' + myColor 
                                + ';color:' + myColor
                                + ';margin-right: 5px;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>';
      					} else {
      						return '';
      					}
  					} else {
  						return '';
  					}
    			}
  	        }
  	        , cssClass: 'normalDetail unselectable'
    	})

	    , showBookingCoordinatesInMapButton: M.ButtonView.design({
	        //  value: M.I18N.l('showBookingCoordinatesInMap')
	        //, cssClass: 'digiButton'
	        //, anchorLocation: M.CENTER
        	computedValue: {
	    		value: ''
	    	  , operation: function() {
	    			return M.I18N.l('showBookingCoordinatesInMap');
	    		}
	    	}
	        , events: {
	            tap: {
	                action: function() {
						var latitude = DigiWebApp.ZeitbuchungenController.itemForDetails.get("gpsBreite");
						var longitude = DigiWebApp.ZeitbuchungenController.itemForDetails.get("gpsLaenge");
						var zoom = '15';
	                    DigiWebApp.ZeitbuchungDetailsPage.showPosInMap(latitude, longitude, zoom);
	    			}
	            }
	        }
	    })
	    
	    , showPositionCoordinatesInMapButton: M.ButtonView.design({
	        //  value: M.I18N.l('showPositionCoordinatesInMap')
	        //, cssClass: 'digiButton'
	        //, anchorLocation: M.CENTER
        	computedValue: {
        		value: ''
        	  , operation: function() {
        			return M.I18N.l('showPositionCoordinatesInMap');
        		}
        	}
	        , events: {
	            tap: {
	                action: function() {
						var latitude = DigiWebApp.ZeitbuchungenController.itemForDetails.get("gpsBreitePosition");
						var longitude = DigiWebApp.ZeitbuchungenController.itemForDetails.get("gpsLaengePosition");
						var zoom = '15';
	                    DigiWebApp.ZeitbuchungDetailsPage.showPosInMap(latitude, longitude, zoom);
	    			}
	            }
	        }
	    })
    	
    })

    , showPosInMap: function(latitude, longitude, zoom) {
        if ((longitude === '0.0' && latitude === '0.0') || (longitude === 0 && latitude === 0)) {
            return;
        }
        var urlByCoordinates = "https://";
        if (DigiWebApp.SettingsController.getSetting('benutzeHttps') === false) {
            urlByCoordinates = 'http://';
        }
        switch (DigiWebApp.SettingsController.getSetting('mapType')) {
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
                if (typeof(plugins.childBrowser) !== "undefined") {
                    try {
                        plugins.childBrowser.close();
                    } catch (e8) {
                        alert("Error: " + e8.message);
                    }
                    try {
                        plugins.childBrowser.showWebPage(encodeURI(
                            urlByCoordinates), { showNavigationBar: true });
                    } catch (e9) {
                        alert("Error: " + e9.message);
                    }
                } else {
                    DigiWebApp.ApplicationController.inAppBrowser_var = window.open(
                        urlByCoordinates, 'childBrowser',
                        'width=800,height=600,menubar=no,status=no,location=yes,copyhistory=no,directories=no');
                }
            } else {
                DigiWebApp.ApplicationController.inAppBrowser_var = window.open(
                    urlByCoordinates, 'childBrowser',
                    'width=800,height=600,menubar=no,status=no,location=yes,copyhistory=no,directories=no');
            }
        } else {
            alert(M.I18N.l('showInMapDisabled'));
        }
    }

});

