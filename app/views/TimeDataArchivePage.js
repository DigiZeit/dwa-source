// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: DigiWebApp
// View: TimeDataArchivePage
// ==========================================================================

m_require('app/views/TimeDataSentTemplateView');

DigiWebApp.TimeDataArchivePage = M.PageView.design({

      events: {
		pagebeforeshow: {
              target: DigiWebApp.BookingController
            , action: 'setArchivedBookings'
        }
    }

    , childViews: 'header contentSent'

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
                    , action: function() {try{DigiWebApp.ApplicationController.vibrate();}catch(e2){} this.backToTimeDataPage();}
                }
            }
        })
        , title: M.LabelView.design({
              value: M.I18N.l('archivedTimeData')
            , anchorLocation: M.CENTER
        })
        , anchorLocation: M.TOP
    })

    , contentSent: M.ScrollView.design({
          childViews: 'list'
        , cssClass: 'sentBookings'
        , list: M.ListView.design({
              contentBinding: {
                  target: DigiWebApp.BookingController
                , property: 'timeDataSentArchived'
            }
            , listItemTemplateView: DigiWebApp.TimeDataSentTemplateView
        })
    })

});

