// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: DigiWebApp
// View: TimeDataTemplateView
// ==========================================================================

DigiWebApp.TimeDataTemplateView = M.ListItemView.design({

      isSelectable: YES

      , childViews: 'date order position activity latitude longitude genauigkeit_von eolVon erfassungsverfahren_von gpszeitstempel_von latitude_bis longitude_bis genauigkeit_bis eolBis erfassungsverfahren_bis gpszeitstempel_bis ServiceApp_Status remark gefahreneKilometer'

    , events: {
        tap: {
            action: function (id, m_id) {
                // Freischaltung 403 "Bemerkungsfeld"
                // Freischaltung 405 "Unterschrift"
                // Freischaltung 431 "Bohle-Reisekostenabwicklung"
                if (DigiWebApp.SettingsController.featureAvailable('403')
                    || ((DigiWebApp.SettingsController.featureAvailable('405')) && (typeof window.requestFileSystem !== "undefined"))
                    || DigiWebApp.SettingsController.featureAvailable('431')
                ) {
                    // Ausgewählte Buchung in EditTimeData.bookingToEdit schreiben
                    //console.log('remark is active');
                    _.each(DigiWebApp.Booking.find(), function(booking) {
                        if (booking.m_id === m_id) {
                            DigiWebApp.EditTimeDataPage.bookingToEdit = booking;
                        }
                    });
                    DigiWebApp.NavigationController.toEditTimeDataPage();
                }
            }
        }
    }

	, date: M.LabelView.design({
          cssClass: 'date unselectable'
        , computedValue: {
              valuePattern: '<%= date %>'
            //, value: '01.01.2011, 08:00 - 08:20 Uhr, 0:20 h',
            // 0: timeStampStart, 1: timeStampEnd, 2: timeZoneOffset, 3: DateStart, 4: TimeStart, 5: DateEnd, 6: TimeEnd
            , operation: function(myV) {
				//console.log(v);
                var v = myV.split(',');
                //var date1 = M.Date.create(Number(v[0]));
                //var date2 = v[1] !== "0" ? M.Date.create(Number(v[1])) : null;
                var date1;
                var date2;
                var dateStart;
                var dateEnd;
                if (typeof(v[2]) === "undefined" ) {
                	dateStart = new Date(Number(v[0]));
                    date1 = M.Date.create(dateStart.getTime());
                    date2 = null;
                    if (v[1] !== "0") {
                    	dateEnd = new Date(Number(v[1]));
                    	date2 = M.Date.create(dateEnd.getTime());
                    }
                } else {
                	dateStart = new Date(Number(v[0]) + (1000 * 60 * (new Date().getTimezoneOffset() - Number(v[2]))));
                    date1 = M.Date.create(dateStart.getTime());
                    date2 = null;
                    if (v[1] !== "0") {
                    	dateEnd = new Date(Number(v[1]) + (1000 * 60 * (new Date().getTimezoneOffset() - Number(v[2]))));
                    	date2 = M.Date.create(dateEnd.getTime());
                    }
                }
                if (date2) {
                    // cut minutes down => 12:05:59 is going to be 12:05:00
                    date1 = M.Date.create(date1.format('mm/dd/yyyy HH:MM'));
                    date2 = M.Date.create(date2.format('mm/dd/yyyy HH:MM'));

                    if (date1.format('mm/dd/yyyy HH:MM') === date2.format('mm/dd/yyyy HH:MM')) { // if booking is closed in the same minute
                        //return date1.format('dd.mm.yyyy') + ', ' + date1.format('HH:MM') + ' - ' + date2.format('HH:MM') + ' ' + M.I18N.l('oclock') + ', 00:01 h';
                    	return v[3] + ', ' + v[4] + ' - ' + v[6] + ' ' + M.I18N.l('oclock') + ', 00:01 h';
                    } else {
                        var timeBetween = date1.timeBetween(date2, M.MINUTES);
                        if (timeBetween < 1) {
                            timeBetween = M.Math.round(timeBetween, M.CEIL);
                        } else {
                            timeBetween = M.Math.round(date1.timeBetween(date2, M.MINUTES), M.FLOOR);
                        }
                        if (timeBetween > 59) {
                            var hours = M.Math.round(timeBetween / 60, M.FLOOR);
                            hours = hours < 10 ? '0' + hours : hours;
                            var minutes = timeBetween % 60;
                            minutes = minutes < 10 ? '0' + minutes : minutes;
                            timeBetween = hours + ':' + minutes;
                        } else {
                            timeBetween = '00:' + (timeBetween < 10 ? '0' : '') + timeBetween;
                        }
                        //return date1.format('dd.mm.yyyy') + ', ' + date1.format('HH:MM') + ' - ' + date2.format('HH:MM') + ' ' + M.I18N.l('oclock') + ', ' + timeBetween + ' h';
                        return v[3] + ', ' + v[4] + ' - ' + v[6] + ' ' + M.I18N.l('oclock') + ', ' + timeBetween + ' h';
                    }


                } else {
                    //return date1.format('dd.mm.yyyy') + ', ' + date1.format('HH:MM') + ' - ' + M.I18N.l('open');
                	return v[3] + ', ' + v[4] + ' - ' + M.I18N.l('open');
                }

            }
        }
    })
    
    , order: M.LabelView.design({
          cssClass: 'application unselectable'
        , computedValue: {
              valuePattern: '<%= orderName %>'
            , operation: function(v) {
                var order = _.select(DigiWebApp.Order.findSorted().concat(DigiWebApp.HandOrder.findSorted()), function(o) {
                    if (o) return v == o.get('id') || v == o.get('name'); // || get('name') is for checking handOrders also
                });
                // Bugfix 2108: Rename in order to be consistent with DSO
                var dtc6Ordner = (DigiWebApp.SettingsController.getSetting('DTC6aktiv') === YES) ? M.I18N.l('dtc6Ordner') : M.I18N.l('order');
                if (order && order.length > 0) {
                    order = order[0];
                    if (DigiWebApp.SettingsController.globalDebugMode) {
                    	return dtc6Ordner + ': ' + order.get('name') + ' (' + order.get('id') + ')';
                    } else {
                    	return dtc6Ordner + ': ' + order.get('name');
                    }
                } else {
                    return dtc6Ordner + ': ' + M.I18N.l('notDefined');
                }
            }
        }
    })

    , position: M.LabelView.design({
          cssClass: 'position unselectable'
        , computedValue: {
              valuePattern: '<%= positionId %>'
            , operation: function(v) {
    			// Bugfix 2108: Rename in order to be consistent with DSO
    			var dtc6Auftrag = (DigiWebApp.SettingsController.getSetting('DTC6aktiv') === YES) ? M.I18N.l('dtc6Auftrag') : M.I18N.l('position');
                if (v) {
                    var position = _.select(DigiWebApp.Position.findSorted(), function(p) {
                        if (p) return v == p.get('id');
                    });
                    if (position && position.length > 0) {
                        position = position[0];
                        return dtc6Auftrag + ': ' + position.get('name');
                    } else {
                        return dtc6Auftrag + ': ' + M.I18N.l('notDefined');
                    }
                } else {
                    return dtc6Auftrag + ': ' + M.I18N.l('unknown');
                }

            }
        }
    })

    , activity: M.LabelView.design({
          cssClass: 'activity unselectable'
        , computedValue: {
              valuePattern: '<%= activityId %>'
            , operation: function(v) {
    			// Bugfix 2108: Rename in order to be consistent with DSO
    			var dtc6Leistung = (DigiWebApp.SettingsController.getSetting('DTC6aktiv') === YES) ? M.I18N.l('dtc6Leistung') : M.I18N.l('activity');
                if (v) {
                	var activity = null;
                	if (parseIntRadixTen(v) !== 0) {
                        activity = _.select(DigiWebApp.Activity.findSorted(), function(a) {
                        	if (a) return v == a.get('id');
                        });
                	}
                    if (activity && activity.length > 0) {
                        activity = activity[0];
                        return dtc6Leistung + ': ' + activity.get('name');
                    } else {
                        return dtc6Leistung + ': ' + M.I18N.l('notDefined');
                    }

                } else {
                    return dtc6Leistung + ': ' + M.I18N.l('unknown');
                }
            }
        }
    })

    , latitude: M.LabelView.design({
        cssClass: 'location unselectable'
      , isInline: YES
      , computedValue: {
            valuePattern: '<%= latitude %>'
          , operation: function(v) {
              if (v > 0 && DigiWebApp.SettingsController.getSetting("detailierteZeitdaten")) {
              	var str = new Number(v);
             		return M.I18N.l('vonKoordinate') + ': ' + str.toFixed(4);
             		//return M.I18N.l('latitude_von') + ': ' + str.toFixed(6);
              } else {
                  //return M.I18N.l('latitude_von') + ': ' + M.I18N.l('GPSnotactive');
              	return '';
              }
          }
      }
  })

  , longitude: M.LabelView.design({
        cssClass: 'location unselectable'
      , isInline: YES
      , computedValue: {
            valuePattern: '<%= longitude %>'
          , operation: function(v) {
              if (v > 0 && DigiWebApp.SettingsController.getSetting("detailierteZeitdaten")) { 
              	var str = new Number(v);
             		return ', ' + str.toFixed(4);
             		//return M.I18N.l('longitude_von') + ': ' + str.toFixed(6);
              } else {
                  //return M.I18N.l('longitude_von') + ': ' + M.I18N.l('GPSnotactive');
                  return '';
              }
          }
      }
  })

  , genauigkeit_von: M.LabelView.design({
        cssClass: 'location unselectable'
      , isInline: YES
      , computedValue: {
            valuePattern: '<%= genauigkeitVon %>'
          , operation: function(v) {
              if (v > 0 && DigiWebApp.SettingsController.getSetting("detailierteZeitdaten")) { 
             		return ' (' + M.I18N.l('genauigkeit') + ': ' + v + ' m)';
             		//return M.I18N.l('longitude_bis') + ': ' + str.toFixed(6);
              } else {
                  //return M.I18N.l('longitude_bis') + ': ' + M.I18N.l('GPSnotactive');
                  return '';
              }
          }
      }
  })

  , eolVon: M.LabelView.design({
	        cssClass: 'location unselectable'
	      , value: ''
	  })
      
  , latitude_bis: M.LabelView.design({
        cssClass: 'location unselectable'
      , isInline: YES
      , computedValue: {
            valuePattern: '<%= latitude_bis %>'
          , operation: function(v) {
              if (v > 0 && DigiWebApp.SettingsController.getSetting("detailierteZeitdaten")) {
              	var str = new Number(v);
             		return M.I18N.l('bisKoordinate') + ': ' + str.toFixed(4);
             		//return M.I18N.l('latitude_bis') + ': ' + str.toFixed(6);
              } else {
                  //return M.I18N.l('latitude_bis') + ': ' + M.I18N.l('GPSnotactive');
              	return '';
              }
          }
      }
  })

  , longitude_bis: M.LabelView.design({
        cssClass: 'location unselectable'
      , isInline: YES
      , computedValue: {
            valuePattern: '<%= longitude_bis %>'
          , operation: function(v) {
              if (v > 0 && DigiWebApp.SettingsController.getSetting("detailierteZeitdaten")) { 
              	var str = new Number(v);
             		return ', ' + str.toFixed(4);
             		//return M.I18N.l('longitude_bis') + ': ' + str.toFixed(6);
              } else {
                  //return M.I18N.l('longitude_bis') + ': ' + M.I18N.l('GPSnotactive');
                  return '';
              }
          }
      }
  })

  , genauigkeit_bis: M.LabelView.design({
        cssClass: 'location unselectable'
      , isInline: YES
      , computedValue: {
            valuePattern: '<%= genauigkeitBis %>'
          , operation: function(v) {
              if (v > 0 && DigiWebApp.SettingsController.getSetting("detailierteZeitdaten")) { 
             		return ' (' + M.I18N.l('genauigkeit') + ': ' + v + ' m)';
             		//return M.I18N.l('longitude_bis') + ': ' + str.toFixed(6);
              } else {
                  //return M.I18N.l('longitude_bis') + ': ' + M.I18N.l('GPSnotactive');
                  return '';
              }
          }
      }
  })

  , eolBis: M.LabelView.design({
	        cssClass: 'location unselectable'
	      , value: ''
	  })
  
  , erfassungsverfahren_von: M.LabelView.design({
        cssClass: 'location unselectable'
      , computedValue: {
            valuePattern: '<%= ermittlungsverfahrenVon %>'
          , operation: function(v) {
              if (v !== null && typeof(v) !== "undefined"  && v !== "undefined"  && DigiWebApp.SettingsController.getSetting("detailierteZeitdaten")) {
             		return M.I18N.l('erfassungsverfahren_von') + ': ' + v.substring(0,16) + "...";
              } else {
                  //return M.I18N.l('erfassungsverfahren_von') + ': ' + M.I18N.l('GPSnotactive');
              	return '';
              }
          }
      }
  })

  , erfassungsverfahren_bis: M.LabelView.design({
        cssClass: 'location unselectable'
      , computedValue: {
            valuePattern: '<%= ermittlungsverfahrenBis %>'
          , operation: function(v) {
              if (v !== null && typeof(v) !== "undefined"  && v !== "undefined"  && DigiWebApp.SettingsController.getSetting("detailierteZeitdaten")) {
             		return M.I18N.l('erfassungsverfahren_bis') + ': ' + v.substring(0,16) + "...";
              } else {
                  //return M.I18N.l('erfassungsverfahren_bis') + ': ' + M.I18N.l('GPSnotactive');
              	return '';
              }
          }
      }
  })

  , gpszeitstempel_von: M.LabelView.design({
        cssClass: 'location unselectable'
      , computedValue: {
            valuePattern: '<%= gps_zeitstempelVon %>'
          , operation: function(v) {
              if (v > 0 && DigiWebApp.SettingsController.getSetting("detailierteZeitdaten")) {
              	try {
	                	var a = M.Date.create(parseIntRadixTen(v));
	               		return M.I18N.l('gpszeitstempel_von') + ': ' + a.format('dd.mm.yyyy HH:MM');
              	} catch (eDate1) {
              		return '';
              	}
              } else {
                  //return M.I18N.l('gpszeitstempel_von') + ': ' + M.I18N.l('GPSnotactive');
              	return '';
              }
          }
      }
  })

  , gpszeitstempel_bis: M.LabelView.design({
        cssClass: 'location unselectable'
      , computedValue: {
            valuePattern: '<%= gps_zeitstempelBis %>'
          , operation: function(v) {
              if (v > 0 && DigiWebApp.SettingsController.getSetting("detailierteZeitdaten")) {
              	try {
	                	var a = M.Date.create(parseIntRadixTen(v));
	               		return M.I18N.l('gpszeitstempel_bis') + ': ' + a.format('dd.mm.yyyy HH:MM');
              	} catch (eDate2) {
              		return '';
              	}
              } else {
                  //return M.I18N.l('gpszeitstempel_bis') + ': ' + M.I18N.l('GPSnotactive');
              	return '';
              }
          }
      }
  })

  , ServiceApp_Status: M.LabelView.design({
        cssClass: 'location unselectable'
      , computedValue: {
            valuePattern: '<%= ServiceApp_Status %>'
          , operation: function(v) {
              if (v !== null && DigiWebApp.SettingsController.getSetting("detailierteZeitdaten") && DigiWebApp.SettingsController.getSetting("debug")) {
             		return 'Status: ' + v;
              } else {
                  //return M.I18N.l('erfassungsverfahren_bis') + ': ' + M.I18N.l('GPSnotactive');
              	return '';
              }
          }
      }
  })

  , remark: M.LabelView.design({
        cssClass: 'remark unselectable'
      , computedValue: {
            valuePattern: '<%= remark %>'
          , operation: function(v) {
              if (v) { 
             		return M.I18N.l('remark') + ': ' + v;
              } else {
                  return '';
              }
          }
      }
  })


  , gefahreneKilometer: M.LabelView.design({
      cssClass: 'remark'
    , computedValue: {
          valuePattern: '<%= gefahreneKilometer %>'
        , operation: function(v) {
            if (v && v > 0) { 
           		return M.I18N.l('gefahreneKilometer') + ': ' + v;
            } else {
                return '';
            }
        }
    }
  })

});


