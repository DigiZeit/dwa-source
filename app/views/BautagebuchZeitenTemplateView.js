// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: DigiWebApp
// View: BautagebuchZeitenTemplateView
// ==========================================================================

DigiWebApp.BautagebuchZeitenTemplateView = M.ListItemView.design({

      isSelectable: YES

    , childViews: 'positionName handOrderName activityName spacer von bis dauer latitude longitude latitude_bis longitude_bis mitarbeiterIds'

    , events: {
        tap: {
			action: function(id, m_id) {
			    var view = M.ViewManager.getViewById(id);
			    var view_modelId = view.modelId;
			    _.each(DigiWebApp.BautagebuchZeitenListeController.items, function(selectedItem) {
					if (selectedItem.m_id === view_modelId) {
						DigiWebApp.BautagebuchZeitenDetailsController.load(selectedItem);
					}
				});
			    DigiWebApp.NavigationController.toBautagebuchZeitenDetailsPageTransition();
			}
        }
	}
	
	, spacer: M.LabelView.design({
	    value: ''
	})

	, mitarbeiterIds: M.LabelView.design({
	      cssClass: 'small unselectable'
		, computedValue: {
		      valuePattern: '<%= mitarbeiterIds %>'
		    , operation: function(v) {
						if (v !== "" && v !== null) {
							var outString = "";
							// v ist eine (json-striginfied) Liste mit (DTC-)mitarbeiterIds
							var vAsArray = JSON.parse(v);
							var mitarbeiterList = DigiWebApp.BautagebuchMitarbeiter.findSorted();
							_.each(mitarbeiterList, function(el){
								if (vAsArray.indexOf(el.get("id")) !== -1) {
									if (outString !== "") {
										outString += ", ";
									}
									outString += "<nobr>" + el.vollername() + "</nobr>";
								}
							});
							return outString;
						} else {
							return "";
						}
		        }
		}
	})

	, positionName: M.LabelView.design({
	    cssClass: 'normal unselectable'
  	  , isInline: YES
	  , computedValue: {
	        valuePattern: '<%= positionName %>'
	      , operation: function(v) {
					if (v !== "" && v !== null) {
						return v;
					} else {
						return "";
					}
	          }
	  }
	})
	
	, handOrderName: M.LabelView.design({
	    cssClass: 'normal unselectable'
  	  , isInline: YES
	  , computedValue: {
	        valuePattern: '<%= handOrderName %>'
	      , operation: function(v) {
					if (v !== "" && v !== null) {
						return v;
					} else {
						return "";
					}
	          }
	  }
	})

	, activityName: M.LabelView.design({
	      cssClass: 'normal unselectable'
	    , isInline: YES
		, computedValue: {
		      valuePattern: '<%= activityName %>'
		    , operation: function(v) {
						if (v !== "" && v !== null) {
							return ", " + v + ":";
						} else {
							return ":";
						}
		        }
		}
	})

	, von: M.LabelView.design({
	      cssClass: 'normal unselectable'
		, isInline: YES
		, computedValue: {
		      valuePattern: '<%= von %>'
		    , operation: function(v) {
						if (v !== "" && v !== null && (!DigiWebApp.BautagebuchEinstellungen.find()[0].get("inStundenBuchen")) ) {
							return v;
						} else {
							return "";
						}
		        }
		}
	})
	
	, bis: M.LabelView.design({
	      cssClass: 'normal unselectable'
	    , isInline: YES
		, computedValue: {
		      valuePattern: '<%= bis %>'
		    , operation: function(v) {
						if (v !== "" && v !== null && (!DigiWebApp.BautagebuchEinstellungen.find()[0].get("inStundenBuchen")) ) {
							return " - " + v;
						} else {
							return "";
						}
		        }
		}
	})

	, dauer: M.LabelView.design({
	      cssClass: 'normal unselectable'
	    , isInline: YES
		, computedValue: {
		      valuePattern: '<%= dauer %>'
		    , operation: function(v) {
						if (v !== "" && v !== null && (DigiWebApp.BautagebuchEinstellungen.find()[0].get("inStundenBuchen")) ) {
							return M.I18N.l('bookingDuration') + ": " + v + " h";
						} else {
							return "";
						}
		        }
		}
	})

	, latitude: M.LabelView.design({
        cssClass: 'location unselectable'
      , computedValue: {
            valuePattern: '<%= latitude %>'
          , operation: function(v) {
              if(v > 0) {
              	var str = new Number(v);
             		return M.I18N.l('latitude') + ' Von: ' + str.toFixed(6);
              } else {
                  //return M.I18N.l('latitude') + ' Von: ' + M.I18N.l('GPSnotactive');
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
             		return M.I18N.l('longitude') + ' Von: ' + str.toFixed(6);
              } else {
                  //return M.I18N.l('longitude') + ' Von: ' + M.I18N.l('GPSnotactive');
                  return '';
              }
          }
      }
  })

	, latitude_bis: M.LabelView.design({
        cssClass: 'location unselectable'
      , computedValue: {
            valuePattern: '<%= latitude_bis %>'
          , operation: function(v) {
              if(v > 0) {
              	var str = new Number(v);
             		return M.I18N.l('latitude') + ' Bis: ' + str.toFixed(6);
              } else {
                  //return M.I18N.l('latitude') + ' Bis: ' + M.I18N.l('GPSnotactive');
              	return '';
              }
          }
      }
  })

  , longitude_bis: M.LabelView.design({
        cssClass: 'location unselectable'
      , computedValue: {
            valuePattern: '<%= longitude_bis %>'
          , operation: function(v) {
              if (v > 0) { 
              	var str = new Number(v);
             		return M.I18N.l('longitude') + ' Bis: ' + str.toFixed(6);
              } else {
                  //return M.I18N.l('longitude') + ' Bis: ' + M.I18N.l('GPSnotactive');
                  return '';
              }
          }
      }
  })

});


