// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: DigiWebApp
// View: TerminlisteVorZurueckTabBar
// ==========================================================================

DigiWebApp.TerminlisteVorZurueckTabBar = M.TabBarView.design({

      childViews: 'tabItemZurueck tabItemDayToShow tabItemVor'

    , anchorLocation: M.BOTTOM

    , isFixed: YES 

    , transition: M.TRANSITION.FADE

    , name: 'terminlistevorzuruecktabbar'

    , tabItemZurueck: M.TabBarItemView.design({
          value: M.I18N.l('backward')
        , page: 'terminlistePage'
        , icon: 'arrow-l'
        , switchPage: function() {
    		try{DigiWebApp.ApplicationController.vibrate();}catch(e2){}
			DigiWebApp.TerminlisteVorZurueckTabBar.backwardHandler();
    	}
    })

    , tabItemDayToShow: M.TabBarItemView.design({
          value: ''
        , page: 'terminlistePage'
        , icon: ''
    })

    , tabItemVor: M.TabBarItemView.design({
          value: M.I18N.l('forward')
        , page: 'terminlistePage'
        , icon: 'arrow-r'
        , switchPage: function() {
    		try{DigiWebApp.ApplicationController.vibrate();}catch(e3){}
    		DigiWebApp.TerminlisteVorZurueckTabBar.forwardHandler();
    	}
    })
        
    , backwardHandler: function() {
		//DigiWebApp.TerminlisteController.set('items', null);
		DigiWebApp.TerminlisteController.items = null;
		var today = D8.create(DigiWebApp.TerminlisteController.datum);
		var yesterday = today.yesterday();
		DigiWebApp.TerminlisteController.set('datum', today.addMinutes(-today.date.getTimezoneOffset() + yesterday.date.getTimezoneOffset()).addDays(-1).format("dd.mm.yyyy"));
		DigiWebApp.TerminlisteController.init(YES);
	}

	, forwardHandler: function() {
		//DigiWebApp.TerminlisteController.set('items', null);
		DigiWebApp.TerminlisteController.items = null;
		var today = D8.create(DigiWebApp.TerminlisteController.datum);
		var tomorrow = today.tomorrow();
		//if (tomorrow.format(""))
		DigiWebApp.TerminlisteController.set('datum', today.addMinutes(-today.date.getTimezoneOffset() + tomorrow.date.getTimezoneOffset()).addDays(1).format("dd.mm.yyyy"));
		DigiWebApp.TerminlisteController.init(YES);
	}

});

