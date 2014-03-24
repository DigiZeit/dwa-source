// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: DigiWebApp
// View: ChronologischeAuftragslisteTemplateView
// ==========================================================================

DigiWebApp.ChronologischeAuftragslisteTemplateView = M.ListItemView.design({

      isSelectable: YES

    , childViews: 'auftragsBezeichnung positionsBezeichnung handauftragsBezeichnung taetigkeit gpsBreite gpsLaenge gpsBreitePosition gpsLaengePosition'

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
      
});


