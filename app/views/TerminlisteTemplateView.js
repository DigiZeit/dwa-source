// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: DigiWebApp
// View: TerminlisteTemplateView
// ==========================================================================

DigiWebApp.TerminlisteTemplateView = M.ListItemView.design({

      isSelectable: YES

    , childViews: 'betreff beschreibung auftragsBezeichnung positionsBezeichnung positionBegin positionEnd spacer1 von bis'

    , events: {
        tap: {
			action: function(id, m_id, a, b) {
						var doShow = NO;
					    var view = M.ViewManager.getViewById(id);
					    var positionId = view.positionId;
					    var position = null;
						_.each(DigiWebApp.Position.find(), function(item) {
							if (item.get("id") === positionId) {
								position = item;
							}
						});
						
						if (position !== null) {
							var auftrag = _.find(DigiWebApp.Order.find(), function(el) { 
								return parseIntRadixTen(position.get("orderId")) === parseIntRadixTen(el.get("id"));
							});
							if (DigiWebApp.SettingsController.featureAvailable("406")) {
								// Auftragsinfo
								if (typeof(M.ViewManager.getView('orderInfoPage', 'order').getSelection()) === "undefined") {
									DigiWebApp.OrderInfoController.init();
								}
								DigiWebApp.NavigationController.toOrderInfoPageTransition();
								M.ViewManager.getView('orderInfoPage', 'order').setSelection(position.get("orderId"));
								DigiWebApp.OrderInfoController.activeOrder = [auftrag];
								DigiWebApp.OrderInfoController.setPositions();
								M.ViewManager.getView('orderInfoPage', 'position').setSelection(position.get("id"));
								DigiWebApp.OrderInfoController.activePosition = [position];
								DigiWebApp.OrderInfoController.setItem();
							} else {
							    // vorausgewählte Buchungsliste
							    // TODO Mehrere Punkte:
							    // 1) Falls init() aufgerufen wird, muss nicht noch setPositions() und setActivites()
							    // aufgerufen werden, das macht init() schon
							    // 2) setPositions() ruft setActivities auf, das ist also auch doppelt
							    // 3) Es ist nicht immer die bookingPage, es sollte SelectionController.getPageToUse() 
							    // verwendet werden
								if (typeof(M.ViewManager.getView('bookingPage', 'order').getSelection()) === "undefined") {
									DigiWebApp.BookingController.init();
								}
								DigiWebApp.NavigationController.toBookTimePageTransition();
								M.ViewManager.getView('bookingPage', 'order').setSelection(position.get("orderId"));
								DigiWebApp.SelectionController.setPositions(null, null, YES);
								M.ViewManager.getView('bookingPage', 'position').setSelection(position.get("id"));
								DigiWebApp.SelectionController.setActivities(YES, YES);
							}
						}
			}
		}
	}


	, betreff: M.LabelView.design({
	    cssClass: 'bold unselectable'
	  , computedValue: {
	        valuePattern: '<%= betreff %>'
	      , operation: function(v) {
				var text = v;
				if (text !== "" && typeof(text) !== "undefined" && text !== "undefined" && text !== "null" && text !== null) {
					return M.I18N.l('betreff') + ': ' + text;
				} else {
					return '';
				}
	      }
	  }
	})
	
	, beschreibung: M.LabelView.design({
	    cssClass: 'normal unselectable'
	  , computedValue: {
	        valuePattern: '<%= beschreibung %>'
	      , operation: function(v) {
				var text = v;
				if (text !== "" && typeof(text) !== "undefined" && text !== "undefined" && text !== "null" && text !== null) {
					return M.I18N.l('beschreibung') + ': ' + text + "<br/><br/>";
				} else {
					return '';
				}
	      }
	  }
	})

	//	  auftragsBezeichnung: "6657Heim"
	, auftragsBezeichnung: M.LabelView.design({
        cssClass: 'normal unselectable'
      , computedValue: {
            valuePattern: '<%= positionId %>'
          , operation: function(v) {
				var text = "";
				var pos = _.find(DigiWebApp.Position.find(), function(el) {
					return parseIntRadixTen(el.get("id")) === parseIntRadixTen(v);
				});
				if (pos) {
					var obj = _.find(DigiWebApp.Order.find(), function(el) {
						return parseIntRadixTen(el.get("id")) === parseIntRadixTen(pos.get("orderId"));
					});
					if (obj) {
						text = obj.get("name");
					}
				}
				if (text !== "" && typeof(text) !== "undefined" && text !== "undefined" && text !== "null" && text !== null) {
					// Bugfix 2108: Rename in order to be consistent with DSO
					return ((DigiWebApp.SettingsController.getSetting('DTC6aktiv') === YES) ? M.I18N.l('dtc6Ordner') : M.I18N.l('order')) + ': ' + text;
				} else {
					return '';
				}
          }
      }
	})

	//	  positionsBezeichnung: "6657Heim"
	, positionsBezeichnung: M.LabelView.design({
        cssClass: 'normal unselectable'
      , computedValue: {
            valuePattern: '<%= positionId %>'
          , operation: function(v) {
				var text = "";
				var obj = _.find(DigiWebApp.Position.find(), function(el) {
					return parseIntRadixTen(el.get("id")) === parseIntRadixTen(v);
				});
				if (obj) {
					text = obj.get("name");
				}
				if (text !== "" && typeof(text) !== "undefined" && text !== "undefined" && text !== "null" && text !== null) {
					// Bugfix 2108: Rename in order to be consistent with DSO
					return ((DigiWebApp.SettingsController.getSetting('DTC6aktiv') === YES) ? M.I18N.l('dtc6Auftrag') : M.I18N.l('position')) + ': ' + text;
				} else {
					return '';
				}
          }
      }
	})
      
	, positionBegin: M.LabelView.design({
        cssClass: 'normal unselectable'
      , isInline: YES
      , computedValue: {
            valuePattern: '<%= positionId %>'
          , operation: function(v) {
				var text = "";
				var obj = _.find(DigiWebApp.Position.find(), function(el) {
					return parseIntRadixTen(el.get("id")) === parseIntRadixTen(v);
				});
				if (obj) {
					text = obj.get("positionBegin");
				}
				if (text !== "" && typeof(text) !== "undefined" && text !== "undefined" && text !== "null" && text !== null) {
					return M.I18N.l('positionZeitraum') + ": " + text;
				} else {
					return '';
				}
          }
      }
	})

	, positionEnd: M.LabelView.design({
        cssClass: 'normalInline unselectable'
      , isInline: YES
      , computedValue: {
            valuePattern: '<%= positionId %>'
          , operation: function(v) {
				var text = "";
				var obj = _.find(DigiWebApp.Position.find(), function(el) {
					return parseIntRadixTen(el.get("id")) === parseIntRadixTen(v);
				});
				if (obj) {
					text = obj.get("positionEnd");
				}
				if (text !== "" && typeof(text) !== "undefined" && text !== "undefined" && text !== "null" && text !== null) {
					return ' - ' + text;
				} else {
					return ' - ' + M.I18N.l('open');
				}
          }
      }
	})

	, spacer1: M.LabelView.design({
	    value: ' '
	})

	, von: M.LabelView.design({
        cssClass: 'bold unselectable'
      , isInline: YES
      , computedValue: {
            valuePattern: '<%= von %>'
          , operation: function(v) {
				if (v && v.indexOf("00:00:00") === -1) {
					var uhrzeit = v.split(" ")[1];
					return uhrzeit.split(":")[0] + ":" + uhrzeit.split(":")[1]
				} else {
					return '';
				}
          }
      }
	})

	, bis: M.LabelView.design({
        cssClass: 'boldInline unselectable'
      , isInline: YES
      , computedValue: {
            valuePattern: '<%= bis %>'
          , operation: function(v) {
				if (v && v.indexOf("23:59:59") === -1) {
					var uhrzeit = v.split(" ")[1];
					return " - " + uhrzeit.split(":")[0] + ":" + uhrzeit.split(":")[1]
				} else {
					return '';
				}
          }
      }
	})

});


