// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: DigiWebApp
// View: TerminlisteTemplateView
// ==========================================================================

DigiWebApp.TerminlisteTemplateView = M.ListItemView.design({

      isSelectable: YES

    , childViews: 'auftragsBezeichnung positionsBezeichnung positionBegin positionEnd spacer1 von bis'

    , events: {
        tap: {
			action: function(id, m_id) {
//						var doShow = NO;
//					    var view = M.ViewManager.getViewById(id);
//					    var mitarbeiter_modelId = view.modelId;
//						_.each(DigiWebApp.ZeitbuchungenController.items, function(ZeitbuchungenItem) {
//							if (ZeitbuchungenItem.m_id === mitarbeiter_modelId) {
//									doShow = YES;
//									DigiWebApp.ZeitbuchungenController.set('itemForDetails', ZeitbuchungenItem);
//									DigiWebApp.ZeitbuchungDetailsPage.updateContent();
//							}
//						});
//						
//						if (doShow === YES) {
//							DigiWebApp.NavigationController.toZeitbuchungDetailsPageTransition();
//						}
			}
		}
	}

	//	  auftragsBezeichnung: "6657Heim"
	, auftragsBezeichnung: M.LabelView.design({
        cssClass: 'bold unselectable'
      , computedValue: {
            valuePattern: '<%= positionId %>'
          , operation: function(v) {
				var text = "";
				var pos = _.find(DigiWebApp.Position.find(), function(el) {
					return parseInt(el.get("id")) === parseInt(v);
				});
				if (pos) {
					var obj = _.find(DigiWebApp.Order.find(), function(el) {
						return parseInt(el.get("id")) === parseInt(pos.get("orderId"));
					});
					if (obj) {
						text = obj.get("name");
					}
				}
				if (text !== "" && typeof(text) !== "undefined" && text !== "undefined" && text !== "null" && text !== null) {
					return M.I18N.l('order') + ': ' + text;
				} else {
					return '';
				}
          }
      }
	})

	//	  positionsBezeichnung: "6657Heim"
	, positionsBezeichnung: M.LabelView.design({
        cssClass: 'bold unselectable'
      , computedValue: {
            valuePattern: '<%= positionId %>'
          , operation: function(v) {
				var text = "";
				var obj = _.find(DigiWebApp.Position.find(), function(el) {
					return parseInt(el.get("id")) === parseInt(v);
				});
				if (obj) {
					text = obj.get("name");
				}
				if (text !== "" && typeof(text) !== "undefined" && text !== "undefined" && text !== "null" && text !== null) {
					return M.I18N.l('position') + ': ' + text;
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
					return parseInt(el.get("id")) === parseInt(v);
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
					return parseInt(el.get("id")) === parseInt(v);
				});
				if (obj) {
					text = obj.get("positionEnd");
				}
				if (text !== "" && typeof(text) !== "undefined" && text !== "undefined" && text !== "null" && text !== null) {
					return ' - ' + text;
				} else {
					return '';
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
					return;
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
					return;
				}
          }
      }
	})

});


