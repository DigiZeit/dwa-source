// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: DigiWebApp
// View: TabBar
// ==========================================================================

DigiWebApp.TabBar = M.TabBarView.design({

      childViews: 'tabItem1 tabItem2'

    , anchorLocation: M.BOTTOM

    , isFixed: YES // useless as TMP set position fixed hard in code... :-(

    , transition: M.TRANSITION.FADE

    , name: 'tabbar1'

    , tabItem1: M.TabBarItemView.design({
          value: M.I18N.l('book')
        , page: 'bookingPage'
        , icon: 'book'
    })

    , tabItem2: M.TabBarItemView.design({
          value: M.I18N.l('menu')
        , page: 'dashboard'
        , icon: 'menu'
    })

});

