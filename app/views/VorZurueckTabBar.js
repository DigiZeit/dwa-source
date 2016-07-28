// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: DigiWebApp
// View: VorZurueckTabBar
// ==========================================================================

DigiWebApp.VorZurueckTabBar = M.TabBarView.design({

      childViews: 'tabItemZurueck tabItemDayToShow tabItemVor'

    , anchorLocation: M.BOTTOM

    , isFixed: YES // useless as TMP set position fixed hard in code... :-(

    , transition: M.TRANSITION.FADE

    , name: 'vorzuruecktabbar'

    , tabItemZurueck: M.TabBarItemView.design({
          value: M.I18N.l('backward')
        , page: 'zeitbuchungenPage'
        , icon: 'arrow-l'
        , switchPage: function() {
    		try{DigiWebApp.ApplicationController.vibrate();}catch(e2){}
			DigiWebApp.VorZurueckTabBar.backwardHandler();
    	}
    })

    , tabItemDayToShow: M.TabBarItemView.design({
          value: ''
        , page: 'zeitbuchungenPage'
        , icon: ''
    })

    , tabItemVor: M.TabBarItemView.design({
          value: M.I18N.l('forward')
        , page: 'zeitbuchungenPage'
        , icon: 'arrow-r'
        , switchPage: function() {
    		try{DigiWebApp.ApplicationController.vibrate();}catch(e3){}
    		DigiWebApp.VorZurueckTabBar.forwardHandler();
    	}
    })
        
    , backwardHandler: function() {
		DigiWebApp.ZeitbuchungenController.set('items', null);
		DigiWebApp.ZeitbuchungenController.items = null;
		DigiWebApp.ZeitbuchungenController.set('datum', D8.create(DigiWebApp.ZeitbuchungenController.datum).addDays(-1).format("dd.mm.yyyy"));
		DigiWebApp.ZeitbuchungenController.init(YES);
	}

	, forwardHandler: function() {
		DigiWebApp.ZeitbuchungenController.set('items', null);
		DigiWebApp.ZeitbuchungenController.items = null;
		DigiWebApp.ZeitbuchungenController.set('datum', D8.create(DigiWebApp.ZeitbuchungenController.datum).addDays(1).format("dd.mm.yyyy"));
		DigiWebApp.ZeitbuchungenController.init(YES);
	}

});

