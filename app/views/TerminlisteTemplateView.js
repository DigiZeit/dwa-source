// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: DigiWebApp
// View: TerminlisteTemplateView
// ==========================================================================

DigiWebApp.TerminlisteTemplateView = M.ListItemView.design({

      isSelectable: YES

    , childViews: 'auftragsBezeichnung positionsBezeichnung positionBegin positionEnd von bis'

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
            valuePattern: '<%= orderId %>'
          , operation: function(v) {
				var bezeichnung = "";
				var obj = _.find(DigiWebApp.Order.find(), function(el) {
					return parseInt(el.get("id")) === parseInt(v);
				});
				if (obj) {
					bezeichnung = obj.get("name");
				}
				if (bezeichnung !== "" && typeof(bezeichnung) !== "undefined" && bezeichnung !== "undefined" && bezeichnung !== "null" && bezeichnung !== null) {
					return M.I18N.l('order') + ': ' + bezeichnung;
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
            valuePattern: '<%= id %>'
          , operation: function(v) {
				var text = "";
				var obj = _.find(DigiWebApp.Order.find(), function(el) {
					return parseInt(el.get("id")) === parseInt(v);
				});
				if (obj) {
					text = obj.get("name");
				}
				if (text !== "" && typeof(text) !== "undefined" && text !== "undefined" && text !== "null" && text !== null) {
					return M.I18N.l('position') + ': ' + bezeichnung;
				} else {
					return '';
				}
          }
      }
	})
      
	, positionBegin: M.LabelView.design({
        cssClass: 'normal unselectable'
      , computedValue: {
            valuePattern: '<%= id %>'
          , operation: function(v) {
				var text = "";
				var obj = _.find(DigiWebApp.Order.find(), function(el) {
					return parseInt(el.get("id")) === parseInt(v);
				});
				if (obj) {
					text = obj.get("positionBegin");
				}
				if (text !== "" && typeof(text) !== "undefined" && text !== "undefined" && text !== "null" && text !== null) {
					return M.I18N.l('positionBegin') + ': ' + bezeichnung;
				} else {
					return '';
				}
          }
      }
	})

	, positionEnd: M.LabelView.design({
        cssClass: 'normal unselectable'
      , computedValue: {
            valuePattern: '<%= id %>'
          , operation: function(v) {
				var text = "";
				var obj = _.find(DigiWebApp.Order.find(), function(el) {
					return parseInt(el.get("id")) === parseInt(v);
				});
				if (obj) {
					text = obj.get("positionEnd");
				}
				if (text !== "" && typeof(text) !== "undefined" && text !== "undefined" && text !== "null" && text !== null) {
					return M.I18N.l('positionEnd') + ': ' + bezeichnung;
				} else {
					return '';
				}
          }
      }
	})

	, von: M.LabelView.design({
        cssClass: 'normal red unselectable'
      , computedValue: {
            valuePattern: '<%= von %>'
          , operation: function(v) {
				if (v) {
					return "von: " + v
				} else {
					return '';
				}
          }
      }
	})

	, bis: M.LabelView.design({
        cssClass: 'normal red unselectable'
      , computedValue: {
            valuePattern: '<%= bis %>'
          , operation: function(v) {
				if (v) {
					return "bis: " + v
				} else {
					return '';
				}
          }
      }
	})

});


