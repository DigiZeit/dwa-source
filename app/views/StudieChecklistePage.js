// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: DigiWebApp
// View: StudieChecklistePage
// ==========================================================================

m_require('app/views/StudieChecklisteTemplateView');

DigiWebApp.StudieChecklistePage = M.PageView.design({

    /* Use the 'events' property to bind events like 'pageshow' */
      events: {
		pagebeforeshow: {
            target: DigiWebApp.StudieChecklisteController,
            action: 'init'
        }
    }

    , childViews: 'header content'

    , cssClass: 'studieChecklistePage'

    , header: M.ToolbarView.design({
          childViews: 'backButton title'
        , cssClass: 'header'
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
              value: M.I18N.l('settings')
            , anchorLocation: M.CENTER
        })
        , anchorLocation: M.TOP
    })

    , content: M.ScrollView.design({
          childViews: 'list'
        
              , list: M.DigiListView.design({
                  contentBinding: {
                      target: DigiWebApp.StudieChecklisteController
                    , property: 'listData'
                }
                , listItemTemplateView: DigiWebApp.StudieChecklisteTemplateView
            })
    })
    
});

