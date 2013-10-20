// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: DigiWebApp
// View: TimeDataTemplateView
// ==========================================================================

DigiWebApp.TimeDataTemplateView = M.ListItemView.design({

      isSelectable: YES

    , childViews: 'date order position activity latitude longitude remark'

    , events: {
        tap: {
			action: function(id, m_id) {
			    // Start::Bemerkungsfeld (403) oder Unterschrift (405)
			    if (DigiWebApp.SettingsController.featureAvailable('403') || ((DigiWebApp.SettingsController.featureAvailable('405')) && (typeof window.requestFileSystem !== "undefined"))) {
					// if remark-feature active: go to remarkpage
					// load booking in EditTimeData.bookingToEdit
			    	//console.log('remark is active');
					_.each(DigiWebApp.Booking.find(), function(booking) {
						if (booking.m_id === m_id) {
							DigiWebApp.EditTimeDataPage.bookingToEdit = booking;
						}
					});
					DigiWebApp.NavigationController.toEditTimeDataPage();
			    } else {
					// else: nothing
			    	//if (DigiWebApp.SettingsController.globalDebugMode) console.log(id);
			    }
			    // End::Bemerkungsfeld oder Unterschrift
			}
        }
    }

	, date: M.LabelView.design({
          cssClass: 'date unselectable'
        , computedValue: {
              valuePattern: '<%= date %>'
            //, value: '01.01.2011, 08:00 - 08:20 Uhr, 0:20 h',
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

//    , order: M.LabelView.design({
//          cssClass: 'application unselectable'
//        , computedValue: {
//              valuePattern: '<%= orderName %>'
//            , operation: function(v) {
//    			if (v !== "") {
//                	return M.I18N.l('order') + ': ' + v;
//                } else {
//                    return M.I18N.l('order') + ': ' + M.I18N.l('notDefined');
//                }
//            }
//        }
//    })
//
//    , position: M.LabelView.design({
//          cssClass: 'position unselectable'
//        , computedValue: {
//              valuePattern: '<%= positionName %>'
//            , operation: function(v) {
//				if (v !== "") {
//		        	return M.I18N.l('position') + ': ' + v;
//		        } else {
//		            return M.I18N.l('position') + ': ' + M.I18N.l('notDefined');
//		        }
//            }
//        }
//    })
//
//    , activity: M.LabelView.design({
//          cssClass: 'activity unselectable'
//        , computedValue: {
//              valuePattern: '<%= activityName %>'
//            , operation: function(v) {
//				if (v !== "") {
//		        	return M.I18N.l('activity') + ': ' + v;
//		        } else {
//		            return M.I18N.l('activity') + ': ' + M.I18N.l('notDefined');
//		        }
//            }
//        }
//    })
//    
//    , order_ID: M.LabelView.design({
//          cssClass: 'application unselectable'
//        , computedValue: {
//              valuePattern: '<%= orderId %>'
//            , operation: function(v) {
//                var order = _.select(DigiWebApp.Order.findSorted().concat(DigiWebApp.HandOrder.findSorted()), function(o) {
//                    return v == o.get('id') || v == o.get('name'); // || get('name') is for checking handOrders also
//                });
//                if(order && order.length > 0) {
//                    order = order[0];
//                    if (DigiWebApp.SettingsController.globalDebugMode) {
//                    	return M.I18N.l('order') + ': ' + order.get('name') + ' (' + order.get('id') + ')';
//                    } else {
//                    	return M.I18N.l('order') + ': ' + order.get('name');
//                    }
//                } else {
//                    return M.I18N.l('order') + ': ' + M.I18N.l('notDefined');
//                }
//            }
//        }
//    })
//
//    , position_ID: M.LabelView.design({
//          cssClass: 'position unselectable'
//        , computedValue: {
//              valuePattern: '<%= positionId %>'
//            , operation: function(v) {
//                if(v) {
//                    var position = _.select(DigiWebApp.Position.findSorted(), function(p) {
//                        return v == p.get('id');
//                    });
//                    if(position && position.length > 0) {
//                        position = position[0];
//                        return M.I18N.l('position') + ': ' + position.get('name');
//                    } else {
//                        return M.I18N.l('position') + ': ' + M.I18N.l('notDefined');
//                    }
//                } else {
//                    return M.I18N.l('position') + ': ' + M.I18N.l('unknown');
//                }
//
//            }
//        }
//    })
//
//    , activity_ID: M.LabelView.design({
//          cssClass: 'activity unselectable'
//        , computedValue: {
//              valuePattern: '<%= activityId %>'
//            , operation: function(v) {
//                if(v) {
//                    var activity = _.select(DigiWebApp.Activity.findSorted(), function(a) {
//                        return v == a.get('id');
//                    });
//                    if(activity && activity.length > 0) {
//                        activity = activity[0];
//                        return M.I18N.l('activity') + ': ' + activity.get('name');
//                    } else {
//                        return M.I18N.l('activity') + ': ' + M.I18N.l('notDefined');
//                    }
//
//                } else {
//                    return M.I18N.l('activity') + ': ' + M.I18N.l('unknown');
//                }
//            }
//        }
//    })
    
    , order: M.LabelView.design({
          cssClass: 'application unselectable'
        , computedValue: {
              valuePattern: '<%= orderName %>'
            , operation: function(v) {
                var order = _.select(DigiWebApp.Order.findSorted().concat(DigiWebApp.HandOrder.findSorted()), function(o) {
                    if (o) return v == o.get('id') || v == o.get('name'); // || get('name') is for checking handOrders also
                });
                if (order && order.length > 0) {
                    order = order[0];
                    if (DigiWebApp.SettingsController.globalDebugMode) {
                    	return M.I18N.l('order') + ': ' + order.get('name') + ' (' + order.get('id') + ')';
                    } else {
                    	return M.I18N.l('order') + ': ' + order.get('name');
                    }
                } else {
                    return M.I18N.l('order') + ': ' + M.I18N.l('notDefined');
                }
            }
        }
    })

    , position: M.LabelView.design({
          cssClass: 'position unselectable'
        , computedValue: {
              valuePattern: '<%= positionId %>'
            , operation: function(v) {
                if (v) {
                    var position = _.select(DigiWebApp.Position.findSorted(), function(p) {
                        if (p) return v == p.get('id');
                    });
                    if (position && position.length > 0) {
                        position = position[0];
                        return M.I18N.l('position') + ': ' + position.get('name');
                    } else {
                        return M.I18N.l('position') + ': ' + M.I18N.l('notDefined');
                    }
                } else {
                    return M.I18N.l('position') + ': ' + M.I18N.l('unknown');
                }

            }
        }
    })

    , activity: M.LabelView.design({
          cssClass: 'activity unselectable'
        , computedValue: {
              valuePattern: '<%= activityId %>'
            , operation: function(v) {
                if (v) {
                    var activity = _.select(DigiWebApp.Activity.findSorted(), function(a) {
                        if (a) return v == a.get('id');
                    });
                    if (activity && activity.length > 0) {
                        activity = activity[0];
                        return M.I18N.l('activity') + ': ' + activity.get('name');
                    } else {
                        return M.I18N.l('activity') + ': ' + M.I18N.l('notDefined');
                    }

                } else {
                    return M.I18N.l('activity') + ': ' + M.I18N.l('unknown');
                }
            }
        }
    })

    , latitude: M.LabelView.design({
          cssClass: 'location unselectable'
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
          cssClass: 'location unselectable'
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


