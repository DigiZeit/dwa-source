// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: DigiWebApp
// View: BautagebuchTabBar
// ==========================================================================

DigiWebApp.BautagebuchTabBar = M.TabBarView.design({

      childViews: 'tabItemMitte'

    , anchorLocation: M.BOTTOM

    , isFixed: YES // useless as TMP set position fixed hard in code... :-(

    , transition: M.TRANSITION.FADE

    , name: 'bautagebuchtabbar'
    	
    , tabItemLinks: M.TabBarItemView.design({
          value: M.I18N.l('backward')
        , page: 'zeitbuchungenPage'
        , icon: 'arrow-l'
        , switchPage: function() {
    		try{navigator.notification.vibrate(DigiWebApp.ApplicationController.CONSTVibrateDuration);}catch(e2){} 
			that.backwardHandler();
    	}
    })

    , tabItemMitte: M.TabBarItemView.design({
          value: M.I18N.l('Bautagebuch') + " " + M.I18N.l('settings')
        , page: 'bautagebuchEinstellungenPage'
        , icon: 'gear'
        , switchPage: function() {
			DigiWebApp.BautagebuchEinstellungenController.lastPage = M.ViewManager.getCurrentPage();
			DigiWebApp.NavigationController.toBautagebuchEinstellungenPageTransition();
    	}
    })

    , tabItemRechts: M.TabBarItemView.design({
          value: M.I18N.l('forward')
        , page: 'zeitbuchungenPage'
        , icon: 'arrow-r'
        , switchPage: function() {
			try{navigator.notification.vibrate(DigiWebApp.ApplicationController.CONSTVibrateDuration);}catch(e3){} 
    		that.forwardHandler();
    	}
    })
        
    , backwardHandler: function() {
//		DigiWebApp.ZeitbuchungenController.set('items', null);
//		DigiWebApp.ZeitbuchungenController.items = null;
//		DigiWebApp.ZeitbuchungenController.set('datum', D8.create(DigiWebApp.ZeitbuchungenController.datum).addDays(-1).format("dd.mm.yyyy"));
//		DigiWebApp.ZeitbuchungenController.init(YES);
	}

	, forwardHandler: function() {
//		DigiWebApp.ZeitbuchungenController.set('items', null);
//		DigiWebApp.ZeitbuchungenController.items = null;
//		DigiWebApp.ZeitbuchungenController.set('datum', D8.create(DigiWebApp.ZeitbuchungenController.datum).addHours(25).format("dd.mm.yyyy"));
//		DigiWebApp.ZeitbuchungenController.init(YES);
	}

});

