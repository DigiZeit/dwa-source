// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: DigiWebApp
// View: TimeDataSentDaysTemplateView
// ==========================================================================

DigiWebApp.TimeDataSentDaysTemplateView = M.ListItemView.design({

      isSelectable: YES

    , childViews: 'tagLabel'

    , events: {
        tap: {
			action: function(id, m_id) {

//			    var view = M.ViewManager.getViewById(id);
//			    var mitarbeiter_modelId = view.modelId;
//			    var doShow = NO;
//			    _.each(DigiWebApp.BookingController.timeDataSentDays, function(timeDataSentDay) {
//					if (timeDataSentDay.m_id === mitarbeiter_modelId) {
//						if (AnwesenheitslisteItem.get("datum") !== "-") {
//							DigiWebApp.ZeitbuchungenController.set('datum', AnwesenheitslisteItem.get("datum"));
//							DigiWebApp.ZeitbuchungenController.set('mitarbeiterID', AnwesenheitslisteItem.get("mitarbeiterId"));
//							DigiWebApp.ZeitbuchungenController.set('mitarbeiterNameVorname', AnwesenheitslisteItem.get("nameVorname"));
//							doShow = YES;
//						}
//					}
//				});
//				if (doShow === YES) DigiWebApp.NavigationController.toZeitbuchungenPageTransition();

				var doShow = NO;
				_.each(DigiWebApp.BookingController.timeDataSentDays, function(day) {
					if (day.m_id === m_id) {
//						DigiWebApp.BookingController.dayToDisplay = day;
						DigiWebApp.ZeitbuchungenController.set('datum', day.get('tagLabel'));
						var settings = DigiWebApp.Settings.find()[0];
						DigiWebApp.ZeitbuchungenController.set('mitarbeiterID', settings.get("mitarbeiterId"));
						DigiWebApp.ZeitbuchungenController.set('mitarbeiterNameVorname', settings.get("mitarbeiterNachname") + ", " + settings.get("mitarbeiterVorname"));
						DigiWebApp.ZeitbuchungenController.set('backFunction', DigiWebApp.NavigationController.backToTimeDataPage);
						doShow = YES;
					}
				});
				if (doShow === YES) DigiWebApp.NavigationController.toZeitbuchungenPageTransition();
//				DigiWebApp.NavigationController.toTimeDataArchivePageTransition();

			}
        }
    }

    , tagLabel: M.LabelView.design({
          cssClass: 'tagLabel unselectable'
        , computedValue: {
              valuePattern: '<%= tagLabel %>'
            , operation: function(v) {
                	return M.I18N.l('archivedTimeDataOf') + ' ' +v;
            }
        }
    })

});


