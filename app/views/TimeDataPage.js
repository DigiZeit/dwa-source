// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: DigiWebApp
// View: TimeDataPage
// ==========================================================================

m_require('app/views/TimeDataTemplateView');
m_require('app/views/TimeDataSentTemplateView');
m_require('app/views/TimeDataSentDaysTemplateView');

DigiWebApp.TimeDataPage = M.PageView.design({

      events: {
		  pagebeforeshow: {
              target: DigiWebApp.BookingController
            , action: 'setNotBookedBookings'
        }
		, pageshow: {
			action: function() {
				if (DigiWebApp.BookingController.timeData) {
					if (DigiWebApp.BookingController.timeData.length !== 0) {
						$('#' + DigiWebApp.TimeDataPage.contentNotSent.id).show();
					} else {
						$('#' + DigiWebApp.TimeDataPage.contentNotSent.id).hide();
					}
				} else {
					$('#' + DigiWebApp.TimeDataPage.contentNotSent.id).hide();
				}
				if (DigiWebApp.BookingController.timeDataSent) {
					if (DigiWebApp.BookingController.timeDataSent.length !== 0) {
						$('#' + DigiWebApp.TimeDataPage.contentSent.id).show();
					} else {
						$('#' + DigiWebApp.TimeDataPage.contentSent.id).hide();
					}
				} else {
					$('#' + DigiWebApp.TimeDataPage.contentSent.id).hide();
				}
				if (DigiWebApp.BookingController.timeDataSentDays && DigiWebApp.SettingsController.featureAvailable('411')) {
					if (DigiWebApp.BookingController.timeDataSentDays.length !== 0) {
						$('#' + DigiWebApp.TimeDataPage.contentDays.id).show();
					} else {
						$('#' + DigiWebApp.TimeDataPage.contentDays.id).hide();
					}
				} else {
					$('#' + DigiWebApp.TimeDataPage.contentDays.id).hide();
				}
				
    			if (DigiWebApp.SettingsController.featureAvailable('416')) {
    				$('#' + DigiWebApp.TimeDataPage.contentNotSent.list.id).addClass("scholppNotSent");
    				$('#' + DigiWebApp.TimeDataPage.contentSent.list.id).addClass("scholppSent");
    			} else {
    				$('#' + DigiWebApp.TimeDataPage.contentNotSent.list.id).removeClass("scholppNotSent");
    				$('#' + DigiWebApp.TimeDataPage.contentSent.list.id).removeClass("scholppSent");
    			}

    			DigiWebApp.ApplicationController.DigiLoaderView.hide();
	
			}
		}
    }

    , childViews: 'header contentNotSent contentSent contentDays'

    , cssClass: 'timeDataPage unselectable'

    , header: M.ToolbarView.design({
          childViews: 'backButton title'
        , cssClass: 'header unselectable'
        , isFixed: YES
        , backButton: M.ButtonView.design({
              value: M.I18N.l('back')
            , icon: 'arrow-l'
            , anchorLocation: M.LEFT
            , events: {
                tap: {
                      target: DigiWebApp.NavigationController
                    , action: function() {try{DigiWebApp.ApplicationController.vibrate();}catch(e2){} this.backToDashboardPage();}
                }
            }
        })
        , title: M.LabelView.design({
              value: M.I18N.l('timeData')
            , anchorLocation: M.CENTER
        })
        , anchorLocation: M.TOP
    })

    , contentNotSent: M.ScrollView.design({
          childViews: 'list'
        , cssClass: 'notSentBookings'
        , list: M.ListView.design({
              contentBinding: {
                  target: DigiWebApp.BookingController
                , property: 'timeData'
            }
            , listItemTemplateView: DigiWebApp.TimeDataTemplateView
        })
    })

    , contentSent: M.ScrollView.design({
          childViews: 'list'
        , cssClass: 'sentBookings'
        , list: M.ListView.design({
              contentBinding: {
                  target: DigiWebApp.BookingController
                , property: 'timeDataSent'
            }
            , listItemTemplateView: DigiWebApp.TimeDataSentTemplateView
        })
    })


    , contentDays: M.ScrollView.design({
          childViews: 'list'
        , cssClass: 'sentBookings'
        , list: M.ListView.design({
              contentBinding: {
                  target: DigiWebApp.BookingController
                , property: 'timeDataSentDays'
            }
            , listItemTemplateView: DigiWebApp.TimeDataSentDaysTemplateView
        })
    })

});

