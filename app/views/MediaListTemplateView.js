// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: DigiWebApp
// View: MediaListTemplateView
// ==========================================================================

DigiWebApp.MediaListTemplateView = M.ListItemView.design({

      isSelectable: YES

    , childViews: 'icon timeStamp order position activity latitude longitude remark'

    , events: {
        tap: {
			action: function(id, m_id) {
					DigiWebApp.ApplicationController.DigiLoaderView.show(M.I18N.l('loadMediaFile'));
					var doShow = NO;
				    var view = M.ViewManager.getViewById(id);
				    var mediaFile_modelId = view.modelId;
				    _.each(DigiWebApp.MediaListController.items, function(MediaListItem) {
						if (MediaListItem.m_id === mediaFile_modelId) {
							//if (MediaListItem.get("datum") !== "-") {
								DigiWebApp.EditPicturePageController.set('myMediaFile', MediaListItem);
								doShow = YES;
							//}
						}
					});
					if (doShow === YES) {
						DigiWebApp.NavigationController.toEditPicturePageTransition();
					} else {
						DigiWebApp.ApplicationController.DigiLoaderView.hide();
					}
			}
        }
    }

    , icon: M.ImageView.design({
          cssClass: 'icon'
        , computedValue: {
              valuePattern: '<%= icon %>'
            , operation: function(v) {
			        if (v) {
			        	return 'theme/images/' + v;
			        } else {
			        	return '';
			        }
            }
        }
    })

	, timeStamp: M.LabelView.design({
          cssClass: 'date'
        , computedValue: {
              valuePattern: '<%= timeStamp %>'
            //, value: '01.01.2011, 08:01:02
            , operation: function(v) {
                var date1 = M.Date.create(Number(v));
                return date1.format('dd.mm.yyyy') + ', ' + date1.format('HH:MM:ss');

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
                if(order && order.length > 0) {
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
          cssClass: 'position'
        , computedValue: {
              valuePattern: '<%= positionId %>'
            , operation: function(v) {
                if(v) {
                    var position = _.select(DigiWebApp.Position.findSorted(), function(p) {
                    	if (p) return v == p.get('id');
                    });
                    if(position && position.length > 0) {
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
          cssClass: 'activity'
        , computedValue: {
              valuePattern: '<%= activityId %>'
            , operation: function(v) {
                if(v) {
                	var activity = null;
                	if (parseIntRadixTen(v) !== 0) {
                        activity = _.select(DigiWebApp.Activity.findSorted(), function(a) {
                        	if (a) return v == a.get('id');
                        });
                	}
                    if(activity && activity.length > 0) {
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
          cssClass: 'location'
        , computedValue: {
              valuePattern: '<%= latitude %>'
            , operation: function(v) {
                if(v > 0) {
                	var str = v;
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
                	var str = v;
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


