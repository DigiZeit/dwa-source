// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: DigiWebApp
// View: ZeitbuchungenTemplateView
// ==========================================================================

DigiWebApp.ZeitbuchungenTemplateView = M.ListItemView.design({

      isSelectable: YES

    , childViews: 'datum von bis dauer spacer2 auftragsBezeichnung positionsBezeichnung handauftragsBezeichnung taetigkeit gpsBreite gpsLaenge gpsBreitePosition gpsLaengePosition'

    , events: {
        tap: {
			action: function(id, m_id) {
					if (DigiWebApp.SettingsController.featureAvailable('408')) {
						var doShow = NO;
					    var view = M.ViewManager.getViewById(id);
					    var mitarbeiter_modelId = view.modelId;
						_.each(DigiWebApp.ZeitbuchungenController.items, function(ZeitbuchungenItem) {
							if (ZeitbuchungenItem.m_id === mitarbeiter_modelId) {
									doShow = YES;
									DigiWebApp.ZeitbuchungenController.set('itemForDetails', ZeitbuchungenItem);
									DigiWebApp.ZeitbuchungDetailsPage.updateContent();
							}
						});
						
						if (doShow === YES) {
							DigiWebApp.NavigationController.toZeitbuchungDetailsPageTransition();
						}
					}
			}
		}
	}

	, spacer1: M.LabelView.design({
	    value: ' '
	})

	, spacer2: M.LabelView.design({
	    value: ' '
	})

	//	  auftragsBezeichnung: "6657Heim"
	, auftragsBezeichnung: M.LabelView.design({
        cssClass: 'normal unselectable'
      , computedValue: {
            valuePattern: '<%= auftragsBezeichnung %>'
          , operation: function(v) {
				if (v !== "" && typeof(v) !== "undefined" && v !== "undefined" && v !== "null" && v !== null) {
					return M.I18N.l('order') + ': ' + v;
				} else {
					return '';
				}
              }
      }
	})
	//	  auftragsId: "950"
	, auftragsId: M.LabelView.design({
        cssClass: 'normal unselectable'
      , computedValue: {
            valuePattern: '<%= auftragsId %>'
          , operation: function(v) {
                  return v;
              }
      }
	})
	//	  bis: "10:37:08"
	, bis: M.LabelView.design({
        cssClass: 'bold unselectable'
      , isInline: YES
      , computedValue: {
            valuePattern: '<%= bis %>'
          , operation: function(v) {
					if (v !== '-') {
						return v;
					} else {
						return M.I18N.l('now');
					}
              }
      }
	})
	//	  datum: "14.06.2012"
	, datum: M.LabelView.design({
        cssClass: 'bold unselectable'
      , isInline: YES
      , computedValue: {
            valuePattern: '<%= datum %>'
          , operation: function(v) {
				if (v !== "-") {
			        return v;
				} else {
					return "";
				}
              }
      }
	})
	//	  dauer: "00:00"
	, dauer: M.LabelView.design({
        cssClass: 'normal unselectable'
      , isInline: YES
      , computedValue: {
            valuePattern: '<%= dauer %>'
          , operation: function(v) {
					if (v !== "00:00" && v !== "-" && v !== "null" && v !== null) {
						return ' (' + v + ')';
					} else {
						return '';
					}
              }
      }
	})
	//	  farbeAmpel: ""
	, farbeAmpel: M.LabelView.design({
        cssClass: 'normal unselectable'
      , computedValue: {
            valuePattern: '<%= farbeAmpel %>'
          , operation: function(v) {
                  return v;
              }
      }
	})
	//	  gpsBreite: "0.0"
	, gpsBreite: M.LabelView.design({
        cssClass: 'normal unselectable'
      , computedValue: {
            valuePattern: '<%= gpsBreite %>'
          , operation: function(v) {
			        if (v != "0.0" && v !== "null" && v !== null) { 
			        	var str = new Number(v);
			       		return M.I18N.l('latitude') + ': ' + str.toFixed(6);
			        } else {
			            //return M.I18N.l('latitude') + ': ' + M.I18N.l('GPSnotactive');
			            return '';
			        }
              }
      }
	})
	//	  gpsBreitePosition: "0.0"
	, gpsBreitePosition: M.LabelView.design({
        cssClass: 'normal unselectable'
      , computedValue: {
            valuePattern: '<%= gpsBreitePosition %>'
          , operation: function(v) {
		        if (v != "0.0" && v !== "null" && v !== null) { 
		        	var str = new Number(v);
		       		return M.I18N.l('position') + '-' + M.I18N.l('latitude') + ': ' + str.toFixed(6);
		        } else {
		            //return M.I18N.l('position') + '-' + M.I18N.l('latitude') + ': ' + M.I18N.l('GPSnotactive');
		            return '';
		        }
              }
      }
	})
	//	  gpsLaenge: "0.0"
	, gpsLaenge: M.LabelView.design({
        cssClass: 'normal unselectable'
      , computedValue: {
            valuePattern: '<%= gpsLaenge %>'
          , operation: function(v) {
		        if (v != "0.0" && v !== "null" && v !== null) { 
		        	var str = new Number(v);
		       		return M.I18N.l('longitude') + ': ' + str.toFixed(6);
		        } else {
		            //return M.I18N.l('longitude') + ': ' + M.I18N.l('GPSnotactive');
		            return '';
		        }
              }
      }
	})
	//	  gpsLaengePosition: "0.0"
	, gpsLaengePosition: M.LabelView.design({
        cssClass: 'normal unselectable'
      , computedValue: {
            valuePattern: '<%= gpsLaengePosition %>'
          , operation: function(v) {
			        if (v != "0.0" && v !== "null" && v !== null) { 
			        	var str = new Number(v);
			       		return M.I18N.l('position') + '-' + M.I18N.l('longitude') + ': ' + str.toFixed(6);
			        } else {
			            //return M.I18N.l('position') + '-' + M.I18N.l('longitude') + ': ' + M.I18N.l('GPSnotactive');
			            return '';
			        }
              }
      }
	})
	//	  handauftragsBezeichnung: "6657Heim"
	, handauftragsBezeichnung: M.LabelView.design({
        cssClass: 'normal unselectable'
      , computedValue: {
            valuePattern: '<%= handauftragsBezeichnung %>'
          , operation: function(v) {
				if (v !== "" && typeof(v) !== "undefined" && v !== "undefined" && v !== "null" && v !== null) {
					return M.I18N.l('handApplications') + ': ' + v;
				} else {
					return '';
				}
              }
      }
	})
	//	  handauftragsId: "950"
	, handauftragsId: M.LabelView.design({
        cssClass: 'normal unselectable'
      , computedValue: {
            valuePattern: '<%= handauftragsId %>'
          , operation: function(v) {
                  return v;
              }
      }
	})
	//	  mitarbeiterId: "12"
	, mitarbeiterId: M.LabelView.design({
        cssClass: 'normal unselectable'
      , computedValue: {
            valuePattern: '<%= mitarbeiterId %>'
          , operation: function(v) {
                  return v;
              }
      }
	})
	//	  name: "Alber"
	, name: M.LabelView.design({
        cssClass: 'normal unselectable'
      , computedValue: {
            valuePattern: '<%= name %>'
          , operation: function(v) {
                  return v;
              }
      }
	})
	//	  nameVorname: "Alber, Michael"
	, nameVorname: M.LabelView.design({
        cssClass: 'normal unselectable'
      , computedValue: {
            valuePattern: '<%= nameVorname %>'
          , operation: function(v) {
                  return v;
              }
      }
	})
	//	  positionsBezeichnung: "6657Heim"
	, positionsBezeichnung: M.LabelView.design({
        cssClass: 'normal unselectable'
      , computedValue: {
            valuePattern: '<%= positionsBezeichnung %>'
          , operation: function(v) {
				if (v !== "" && typeof(v) !== "undefined" && v !== "undefined" && v !== "null" && v !== null) {
					return M.I18N.l('position') + ': ' + v;
				} else {
					return '';
				}
              }
      }
	})
	//	  positionsId: "1874"
	, positionsId: M.LabelView.design({
        cssClass: 'normal unselectable'
      , computedValue: {
            valuePattern: '<%= positionsId %>'
          , operation: function(v) {
                  return v;
              }
      }
	})
	//	  taetigkeit: "HolzLackraum"
	, taetigkeit: M.LabelView.design({
        cssClass: 'normal unselectable'
      , computedValue: {
            valuePattern: '<%= taetigkeit %>'
          , operation: function(v) {
				if (v !== "" && typeof(v) !== "undefined" && v !== "undefined" && v !== "null" && v !== null) {
					return M.I18N.l('activity') + ': ' + v;
				} else {
					return '';
				}
              }
      }
	})
	//	  taetigkeitsId: "21"
	, taetigkeitsId: M.LabelView.design({
        cssClass: 'normal unselectable'
      , computedValue: {
            valuePattern: '<%= taetigkeitsId %>'
          , operation: function(v) {
                  return v;
              }
      }
	})
	//	  taetigkeitsart: "0"
	, taetigkeitsart: M.LabelView.design({
        cssClass: 'normal unselectable'
      , computedValue: {
            valuePattern: '<%= taetigkeitsart %>'
          , operation: function(v) {
                  return v;
              }
      }
	})
	//	  von: "10:36:45"
	, von: M.LabelView.design({
        cssClass: 'bold unselectable'
      , isInline: YES
      , computedValue: {
            valuePattern: '<%= von %>'
          , operation: function(v) {
                  return ' ' + v + ' - ';
              }
      }
	})
	//	  vorname: "Michael"
	, vorname: M.LabelView.design({
        cssClass: 'normal unselectable'
      , computedValue: {
            valuePattern: '<%= vorname %>'
          , operation: function(v) {
                  return v;
              }
      }
	})
      
});


