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

				_.each(DigiWebApp.SentTimeDataDays.find(), function(day) {
					if (day.m_id === m_id) {
						DigiWebApp.BookingController.dayToDisplay = day;
					}
				});
				DigiWebApp.NavigationController.toTimeDataArchivePageTransition();

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


