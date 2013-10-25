// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: DigiWebApp
// View: TimeDataSentTemplateView
// ==========================================================================

DigiWebApp.TimeDataSentTemplateView = M.ListItemView.design({

      isSelectable: NO

    , childViews: 'date order position activity latitude longitude genauigkeit_von eolVon erfassungsverfahren_von gpszeitstempel_von latitude_bis longitude_bis genauigkeit_bis eolBis erfassungsverfahren_bis gpszeitstempel_bis ServiceApp_Status remark'

    , events: {
        tap: {
			action: function(id, m_id) {

			}
        }
    }

	, date: M.LabelView.design({
          cssClass: 'date unselectable'
        , computedValue: {
              valuePattern: '<%= date %>'
            //  value: '01.01.2011, 08:00 - 08:20 Uhr, 0:20 h'
            , operation: function(myV) {
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
                //console.log(v, dateStart, date1, date2);
                if (date2) {
                    // cut minutes down => 12:05:59 is going to be 12:05:00
                    date1 = M.Date.create(date1.format('mm/dd/yyyy HH:MM'));
                    date2 = M.Date.create(date2.format('mm/dd/yyyy HH:MM'));
                    //console.log(date1, date2);

                    if (date1.format('mm/dd/yyyy HH:MM') === date2.format('mm/dd/yyyy HH:MM')) { // if booking is closed in the same minute
                        return date1.format('dd.mm.yyyy') + ', ' + date1.format('HH:MM') + ' - ' + date2.format('HH:MM') + ' ' + M.I18N.l('oclock') + ', 00:01 h';
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
                        return date1.format('dd.mm.yyyy') + ', ' + date1.format('HH:MM') + ' - ' + date2.format('HH:MM') + ' ' + M.I18N.l('oclock') + ', ' + timeBetween + ' h';
                    }


                } else {
                    return date1.format('dd.mm.yyyy') + ', ' + date1.format('HH:MM') + ' - ' + M.I18N.l('open');
                }

            }
        }
    })

    , order: M.LabelView.design({
          cssClass: 'application unselectable'
        , computedValue: {
              valuePattern: '<%= orderName %>'
            , operation: function(v) {
    			if (v !== "") {
                	return M.I18N.l('order') + ': ' + v;
                } else {
                    return M.I18N.l('order') + ': ' + M.I18N.l('notDefined');
                }
            }
        }
    })

    , position: M.LabelView.design({
          cssClass: 'position unselectable'
        , computedValue: {
              valuePattern: '<%= positionName %>'
            , operation: function(v) {
				if (v !== "") {
		        	return M.I18N.l('position') + ': ' + v;
		        } else {
		            return M.I18N.l('position') + ': ' + M.I18N.l('notDefined');
		        }
            }
        }
    })

    , activity: M.LabelView.design({
          cssClass: 'activity unselectable'
        , computedValue: {
              valuePattern: '<%= activityName %>'
            , operation: function(v) {
				if (v !== "") {
		        	return M.I18N.l('activity') + ': ' + v;
		        } else {
		            return M.I18N.l('activity') + ': ' + M.I18N.l('notDefined');
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
                if (v !== null && DigiWebApp.SettingsController.getSetting("detailierteZeitdaten")) {
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
                if (v !== null && DigiWebApp.SettingsController.getSetting("detailierteZeitdaten")) {
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
	                	var a = M.Date.create(parseInt(v));
	               		return M.I18N.l('gpszeitstempel_von') + ': ' + a.format('mm.dd.yyyy HH:MM');
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
	                	var a = M.Date.create(parseInt(v));
	               		return M.I18N.l('gpszeitstempel_bis') + ': ' + a.format('mm.dd.yyyy HH:MM');
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

});


