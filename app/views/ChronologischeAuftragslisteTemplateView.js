// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: DigiWebApp
// View: ChronologischeAuftragslisteTemplateView
// ==========================================================================

DigiWebApp.ChronologischeAuftragslisteTemplateView = M.ListItemView.design({

      isSelectable: YES

    , childViews: 'auftragsBezeichnung positionsBezeichnung positionBegin positionEnd'

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
        cssClass: 'normal unselectable'
      , computedValue: {
            valuePattern: '<%= id %>'
          , operation: function(v) {
				var auftragsBezeichnung = "";
				var position = _.find(DigiWebApp.Position.find(), function(el) {
					return parseInt(el.get("id")) === parseInt(v)
				});
				if (position) {
					var auftrag = _.find(DigiWebApp.Order.find(), function(el) {
						return parseInt(el.get("id")) === parseInt(position.get("orderId"))
					});
					if (auftrag) {
						auftragsBezeichnung = auftrag.get("name");
					}
				}
				if (auftragsBezeichnung !== "" && typeof(auftragsBezeichnung) !== "undefined" && auftragsBezeichnung !== "undefined" && auftragsBezeichnung !== "null" && auftragsBezeichnung !== null) {
					return M.I18N.l('order') + ': ' + auftragsBezeichnung;
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
            valuePattern: '<%= name %>'
          , operation: function(v) {
				if (v !== "" && typeof(v) !== "undefined" && v !== "undefined" && v !== "null" && v !== null) {
					return M.I18N.l('position') + ': ' + v;
				} else {
					return '';
				}
          }
      }
	})
      
	, positionBegin: M.LabelView.design({
        cssClass: 'normal unselectable'
      , computedValue: {
            valuePattern: '<%= positionBegin %>'
          , operation: function(v) {
				if (v !== "" && typeof(v) !== "undefined" && v !== "undefined" && v !== "null" && v !== null) {
					return M.I18N.l('positionBegin') + ': ' + v;
				} else {
					return '';
				}
          }
      }
	})

	, positionEnd: M.LabelView.design({
        cssClass: 'normal unselectable'
      , computedValue: {
            valuePattern: '<%= positionEnd %>'
          , operation: function(v) {
				if (v !== "" && typeof(v) !== "undefined" && v !== "undefined" && v !== "null" && v !== null) {
					return M.I18N.l('positionEnd') + ': ' + v;
				} else {
					return '';
				}
          }
      }
	})

});


