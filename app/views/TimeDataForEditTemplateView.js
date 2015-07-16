// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: DigiWebApp
// View: TimeDataForEditTemplateView
// ==========================================================================

DigiWebApp.TimeDataForEditTemplateView = M.ListItemView.design({

      isSelectable: NO

    , childViews: 'date order position activity latitude longitude'

    , events: {
        tap: {
			action: function(id, m_id) {
			}
        }
    }

	, date: M.LabelView.design({
          cssClass: 'date'
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
                    	var dateEnd = new Date(Number(v[1]) + (1000 * 60 * (new Date().getTimezoneOffset() - Number(v[2]))));
                    	date2 = M.Date.create(dateEnd.getTime());
                    }
                }
                if (date2) {
                    // cut minutes down => 12:05:59 is going to be 12:05:00
                    date1 = M.Date.create(date1.format('mm/dd/yyyy HH:MM'));
                    date2 = M.Date.create(date2.format('mm/dd/yyyy HH:MM'));

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
                    return date1.format('dd.mm.yyyy') + ', ' + date1.format('HH:MM') + ' - ' + M.I18N.l('now') + ' (' + M.Date.create().format('HH:MM') + ')';
                }

            }
        }
    })

    , order: M.LabelView.design({
          cssClass: 'application'
        , computedValue: {
              valuePattern: '<%= orderId %>'
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
          cssClass: 'position'
        , computedValue: {
              valuePattern: '<%= positionId %>'
            , operation: function(v) {
    			// Bugfix 2108: Rename in order to be consistent with DSO
    			var dtc6Auftrag = (DigiWebApp.SettingsController.getSetting('DTC6aktiv') === YES) ? M.I18N.l('dtc6Auftrag') : M.I18N.l('position');
                if(v) {
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
          cssClass: 'activity'
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
          cssClass: 'location'
        , computedValue: {
              valuePattern: '<%= latitude %>'
            , operation: function(v) {
                if (v > 0) {
                	var str = new Number(v);
               		return M.I18N.l('latitude') + ': ' + str.toFixed(6);
                } else {
                    //return M.I18N.l('latitude') + ': ' + M.I18N.l('GPSnotactive');
                	return '';
                }
            }
        }
    })

    , longitude: M.LabelView.design({
          cssClass: 'location'
        , computedValue: {
              valuePattern: '<%= longitude %>'
            , operation: function(v) {
                if (v > 0) { 
                	var str = new Number(v);
               		return M.I18N.l('longitude') + ': ' + str.toFixed(6);
                } else {
                    //return M.I18N.l('longitude') + ': ' + M.I18N.l('GPSnotactive');
                    return '';
                }
            }
        }
    })

    , remark: M.LabelView.design({
          cssClass: 'remark'
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


