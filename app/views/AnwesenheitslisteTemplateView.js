// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: DigiWebApp
// View: AnwesenheitslisteTemplateView
// ==========================================================================

DigiWebApp.AnwesenheitslisteTemplateView = M.ListItemView.design({

      isSelectable: YES

    , childViews: 'farbeAnwesenheit nameVorname spacer1 datumLabel datum uhrzeit spacer2 fehlzeitBezeichnung auftragsBezeichnung positionsBezeichnung handauftragsBezeichnung taetigkeit gpsBreite gpsLaenge spacer3 gpsBreitePosition gpsLaengePosition'

    , events: {
        tap: {
			action: function(id, m_id) {
				var doShow = NO;
			    var view = M.ViewManager.getViewById(id);
			    var mitarbeiter_modelId = view.modelId;
			    var doShow = NO;
			    _.each(DigiWebApp.AnwesenheitslisteController.items, function(AnwesenheitslisteItem) {
					if (AnwesenheitslisteItem.m_id === mitarbeiter_modelId) {
						if (AnwesenheitslisteItem.get("datum") !== "-") {
							DigiWebApp.ZeitbuchungenController.set('datum', AnwesenheitslisteItem.get("datum"));
							DigiWebApp.ZeitbuchungenController.set('mitarbeiterID', AnwesenheitslisteItem.get("mitarbeiterId"));
							DigiWebApp.ZeitbuchungenController.set('mitarbeiterNameVorname', AnwesenheitslisteItem.get("nameVorname"));
							doShow = YES;
						}
					}
				});
				if (doShow === YES) DigiWebApp.NavigationController.toZeitbuchungenPageTransition();
			}
        }
    }

	, spacer1: M.LabelView.design({
	      cssClass: 'unselectable marginBottom12'
	    , value: ' '
	})
	
	, spacer2: M.LabelView.design({
	      cssClass: 'unselectable marginBottom12'
	    , value: ' '
	})
	, spacer3: M.LabelView.design({
	      cssClass: 'unselectable'
	    , value: ' '
	})


//"datumLabel": "...",
, datumLabel: M.LabelView.design({
    cssClass: 'normal unselectable'
  , isInline: YES
  , computedValue: {
        valuePattern: '<%= datumLabel %>'
      , operation: function(v) {
				return v;
          }
  }
})

, datum: M.LabelView.design({
    cssClass: 'normal unselectable'
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
//"farbeAmpel": "",
, farbeAmpel: M.LabelView.design({
    cssClass: 'unselectable'
  , computedValue: {
        valuePattern: '<%= farbeAmpel %>'
      , operation: function(v) {
              return v;
          }
  }
})
//"farbeAnwesenheit": "#00FF00",
, farbeAnwesenheit: M.LabelView.design({
    cssClass: 'unselectable'
  , isInline: YES
  , computedValue: {
        valuePattern: '<%= farbeAnwesenheit %>'
      , operation: function(v) {
    			//return '<span style="-moz-border-radius: 3em 0em;-webkit-border-radius: 24px 0;border-radius: 24px 0;box-shadow: 2px 2px 6px rgba(0,0,0,0.6);background:' + v + ';color:' + v + '">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>&nbsp;&nbsp;';
    			return '<span style="box-shadow: 2px 2px 6px rgba(0,0,0,0.6);background:' + v + ';color:' + v + ';margin-right: 5px;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>&nbsp;&nbsp;';
          }
  }
})
//"fehlzeitBezeichnung": "",
, fehlzeitBezeichnung: M.LabelView.design({
    cssClass: 'normal unselectable'
  , computedValue: {
        valuePattern: '<%= fehlzeitBezeichnung %>'
      , operation: function(v) {
			if (v !== "" && typeof(v) !== "undefined" && v !== "undefined" && v !== "-" && v !== "null" && v !== null) {
				return M.I18N.l('fehlzeit') + ': ' + v;
			} else {
				return '';
			}
          }
  }
})
//	  gpsBreite: "0.0"
, gpsBreite: M.LabelView.design({
    cssClass: 'normal unselectable'
  , isInline: YES
  , computedValue: {
        valuePattern: '<%= gpsBreite %>'
      , operation: function(v) {
		        if (v != "0.0" && v !== "null" && v !== null) { 
		        	var str = new Number(v);
		       		return M.I18N.l('buchungskoordinaten') + ': ' + str.toFixed(4);
		        } else {
		            return '';
		        }
          }
  }
})
//	  gpsBreitePosition: "0.0"
, gpsBreitePosition: M.LabelView.design({
    cssClass: 'normal unselectable'
  , isInline: YES
  , computedValue: {
        valuePattern: '<%= gpsBreitePosition %>'
      , operation: function(v) {
	        if (v != "0.0" && v !== "null" && v !== null) { 
	        	var str = new Number(v);
	       		return M.I18N.l('auftragskoordinaten') + ': ' + str.toFixed(4);
	        } else {
	            return '';
	        }
          }
  }
})
//	  gpsLaenge: "0.0"
, gpsLaenge: M.LabelView.design({
    cssClass: 'normal unselectable'
  , isInline: YES
  , computedValue: {
        valuePattern: '<%= gpsLaenge %>'
      , operation: function(v) {
	        if (v != "0.0" && v !== "null" && v !== null) { 
	        	var str = new Number(v);
	       		return ', ' + str.toFixed(4);
	        } else {
	            return '';
	        }
          }
  }
})
//	  gpsLaengePosition: "0.0"
, gpsLaengePosition: M.LabelView.design({
    cssClass: 'normal unselectable'
  , isInline: YES
  , computedValue: {
        valuePattern: '<%= gpsLaengePosition %>'
      , operation: function(v) {
		        if (v != "0.0" && v !== "null" && v !== null) { 
		        	var str = new Number(v);
		       		return ', ' + str.toFixed(4);
		        } else {
		            return '';
		        }
          }
  }
})

//"handauftragsBezeichnung": "",
, handauftragsBezeichnung: M.LabelView.design({
    cssClass: 'normal unselectable'
  , computedValue: {
        valuePattern: '<%= handauftragsBezeichnung %>'
      , operation: function(v) {
			if (v !== "" && typeof(v) !== "undefined" && v !== "undefined" && v !== "-" && v !== "null" && v !== null) {
				return M.I18N.l('handApplications') + ': ' + v;
			} else {
				return '';
			}
          }
  }
})
//"handauftragsId": "",
, handauftragsId: M.LabelView.design({
    cssClass: 'unselectable'
  , computedValue: {
        valuePattern: '<%= handauftragsId %>'
      , operation: function(v) {
              return v;
          }
  }
})
//"mitarbeiterId": "29",
, mitarbeiterId: M.LabelView.design({
    cssClass: 'unselectable'
  , computedValue: {
        valuePattern: '<%= mitarbeiterId %>'
      , operation: function(v) {
              return v;
          }
  }
})
//"name": "Maier",
, name: M.LabelView.design({
    cssClass: 'bold unselectable'
  , computedValue: {
        valuePattern: '<%= name %>'
      , operation: function(v) {
              return v;
          }
  }
})
//"nameVorname": "Maier, Peter",
, nameVorname: M.LabelView.design({
    cssClass: 'bold unselectable'
  , isInline: YES
  , computedValue: {
        valuePattern: '<%= nameVorname %>'
      , operation: function(v) {
              return v;
          }
  }
})

//"auftragsBezeichnung": "1446DEKRA",
, auftragsBezeichnung: M.LabelView.design({
	  cssClass: 'normal unselectable'
	, computedValue: {
	      valuePattern: '<%= auftragsBezeichnung %>'
	    , operation: function(v) {
				if (v !== "" && typeof(v) !== "undefined" && v !== "undefined" && v !== "-" && v !== "null" && v !== null) {
					return M.I18N.l('order') + ': ' + v;
				} else {
					return '';
				}
	        }
	}
})

//"positionsBezeichnung": "1446DEKRA",
, positionsBezeichnung: M.LabelView.design({
    cssClass: 'normal unselectable'
  , computedValue: {
        valuePattern: '<%= positionsBezeichnung %>'
      , operation: function(v) {
			if (v !== "" && typeof(v) !== "undefined" && v !== "undefined" && v !== "-" && v !== "null" && v !== null) {
				return M.I18N.l('position') + ': ' + v;
			} else {
				return '';
			}
          }
  }
})
//"positionsId": "1929",
, positionsId: M.LabelView.design({
    cssClass: 'unselectable'
  , computedValue: {
        valuePattern: '<%= positionsId %>'
      , operation: function(v) {
              return v;
          }
  }
})
//"taetigkeit": "05Stromversorger",
, taetigkeit: M.LabelView.design({
    cssClass: 'normal unselectable'
  , computedValue: {
        valuePattern: '<%= taetigkeit %>'
      , operation: function(v) {
			if (v !== "" && typeof(v) !== "undefined" && v !== "undefined" && v !== "-" && v !== "null" && v !== null) {
				return M.I18N.l('activity') + ': ' + v;
			} else {
				return '';
			}
          }
  }
})
//"taetigkeitsId": "89",
, taetigkeitsId: M.LabelView.design({
    cssClass: 'unselectable'
  , computedValue: {
        valuePattern: '<%= taetigkeitsId %>'
      , operation: function(v) {
              return v;
          }
  }
})
//"taetigkeitsart": "0",
, taetigkeitsart: M.LabelView.design({
    cssClass: 'unselectable'
  , computedValue: {
        valuePattern: '<%= taetigkeitsart %>'
      , operation: function(v) {
              return v;
          }
  }
})
//"uhrzeit": "27-08-2012 11:50:52",
, uhrzeit: M.LabelView.design({
    cssClass: 'normal unselectable'
  , isInline: YES
  , computedValue: {
        valuePattern: '<%= uhrzeit %>'
      , operation: function(v) {
			if (v !== "" && typeof(v) !== "undefined" && v !== "undefined" && v !== "-" && v !== "null" && v !== null) {
		        return ' ' + v;
			} else {
				return "";
			}
          }
  }
})
//"vorname": "Peter"
, vorname: M.LabelView.design({
    cssClass: 'bold unselectable'
  , computedValue: {
        valuePattern: '<%= vorname %>'
      , operation: function(v) {
              return v;
          }
  }
})
    
});


