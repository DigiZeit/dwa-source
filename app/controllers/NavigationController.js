// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: DigiWebApp
// Controller: NavigationController
// ==========================================================================
// manuell var-checked
DigiWebApp.NavigationController = M.Controller.extend({

	  toSplashViewPage: function() {
		DigiWebApp.NavigationController.switchToPage('splashView', M.TRANSITION.NONE, NO);
  	}

	, toSplashViewPageTransition: function() {
		DigiWebApp.NavigationController.switchToPage('splashView', M.TRANSITION.FADE, NO);
	}

    , toInfoPage: function() {
    	DigiWebApp.NavigationController.switchToPage('infoPage', M.TRANSITION.NONE, NO);
    }

    , toInfoPageTransition: function() {
    	DigiWebApp.NavigationController.switchToPage('infoPage', M.TRANSITION.SLIDEUP, NO);
    }

    , backToBookTimePage: function() {
    	var that = this;
    	if (!DigiWebApp.SettingsController.HasCredentials()) {
    		return that.toSettingsPage();
    	}
    	DigiWebApp.TabBar.setActiveTab(DigiWebApp.TabBar.tabItem1);
    	var ChefToolOnly = (DigiWebApp.SettingsController.featureAvailable('409'));
    	if (ChefToolOnly) {
        	var Bautagebuch = (DigiWebApp.SettingsController.featureAvailable('412'));
    		if (Bautagebuch) {
    			DigiWebApp.NavigationController.startBautagebuch();
    		} else {
        		//var o = DigiWebApp.ApplicationController.useSplashJustForFade;
        		DigiWebApp.ApplicationController.useSplashJustForFade = YES;
        		DigiWebApp.NavigationController.toSplashViewPage();
        		DigiWebApp.ApplicationController.useSplashJustForFade = 0;
        		DigiWebApp.NavigationController.backToDashboardPage();
    		}
    	} else {
    		try {
    			if (DigiWebApp.SettingsController.featureAvailable('416')) {
    				DigiWebApp.NavigationController.switchToPage('bookingPageWithIconsScholpp', M.TRANSITION.SLIDEUP, YES);
    			} else {
    				DigiWebApp.NavigationController.switchToPage('bookingPage', M.TRANSITION.SLIDEUP, YES);
    			}
    		} catch(e2) { trackError(e2); }
    	}
    }

    , backToBookTimePagePOP: function() {
    	var that = this;
    	if (!DigiWebApp.SettingsController.HasCredentials()) {
    		return that.toSettingsPage();
    	}
    	DigiWebApp.TabBar.setActiveTab(DigiWebApp.TabBar.tabItem1);
    	var ChefToolOnly = (DigiWebApp.SettingsController.featureAvailable('409'));
    	if (ChefToolOnly) {
        	var Bautagebuch = (DigiWebApp.SettingsController.featureAvailable('412'));
    		if (Bautagebuch) {
        		DigiWebApp.NavigationController.startBautagebuch();    			
    		} else {
	    		//var o = DigiWebApp.ApplicationController.useSplashJustForFade;
	    		DigiWebApp.ApplicationController.useSplashJustForFade = YES;
	    		DigiWebApp.NavigationController.toSplashViewPage();
	    		DigiWebApp.ApplicationController.useSplashJustForFade = 0;
	    		//DigiWebApp.NavigationController.backToDashboardPagePOP();
    		}	
    	} else {
    		try {
    			if (DigiWebApp.SettingsController.featureAvailable('416')) {
    				DigiWebApp.NavigationController.switchToPage('bookingPageWithIconsScholpp', M.TRANSITION.POP, YES);
    			} else {
    				DigiWebApp.NavigationController.switchToPage('bookingPage', M.TRANSITION.POP, YES);
    			}
    		} catch(e2) { trackError(e2); }
    	}
    }

    , toBookTimePage: function() {
    	var that = this;
    	if (!DigiWebApp.SettingsController.HasCredentials()) {
    		return that.toSettingsPage();
    	}
    	DigiWebApp.TabBar.setActiveTab(DigiWebApp.TabBar.tabItem1);
    	var ChefToolOnly = (DigiWebApp.SettingsController.featureAvailable('409'));
    	if (ChefToolOnly) {
        	var Bautagebuch = (DigiWebApp.SettingsController.featureAvailable('412'));
    		if (Bautagebuch) {
        		DigiWebApp.NavigationController.startBautagebuch();    			
    		} else {
	    		//var o = DigiWebApp.ApplicationController.useSplashJustForFade;
	    		DigiWebApp.ApplicationController.useSplashJustForFade = YES;
	    		DigiWebApp.NavigationController.toSplashViewPage();
	    		DigiWebApp.ApplicationController.useSplashJustForFade = 0;
	    		//DigiWebApp.NavigationController.toDashboardPage();
    		}
    	} else {
    		//try {
    			if (DigiWebApp.SettingsController.featureAvailable('416')) {
    				DigiWebApp.NavigationController.switchToPage('bookingPageWithIconsScholpp', M.TRANSITION.NONE, NO);
    			} else {
    				DigiWebApp.NavigationController.switchToPage('bookingPage', M.TRANSITION.NONE, NO);
    			}
    		//} catch(e) { trackError(e); }
    	}
    }

    , toBookTimePageTransition: function() {
    	var that = this;
    	if (!DigiWebApp.SettingsController.HasCredentials()) {
    		return that.toSettingsPage();
    	}
    	DigiWebApp.TabBar.setActiveTab(DigiWebApp.TabBar.tabItem1);
    	var ChefToolOnly = (DigiWebApp.SettingsController.featureAvailable('409'));
    	if (ChefToolOnly) {
        	var Bautagebuch = (DigiWebApp.SettingsController.featureAvailable('412'));
    		if (Bautagebuch) {
        		DigiWebApp.NavigationController.startBautagebuch();    			
    		} else {
	    		//var o = DigiWebApp.ApplicationController.useSplashJustForFade;
	    		DigiWebApp.ApplicationController.useSplashJustForFade = YES;
	    		DigiWebApp.NavigationController.toSplashViewPage();
	    		DigiWebApp.ApplicationController.useSplashJustForFade = 0;
	    		//DigiWebApp.NavigationController.toDashboardPageTransition();
    		}
    	} else {
    		try {
    			if (DigiWebApp.SettingsController.featureAvailable('416')) {
    				DigiWebApp.NavigationController.switchToPage('bookingPageWithIconsScholpp', M.TRANSITION.SLIDEUP, NO);
    			} else {
    				DigiWebApp.NavigationController.switchToPage('bookingPage', M.TRANSITION.SLIDEUP, NO);
    			}
    		} catch(e3) { trackError(e3); }
    	}
    }

    , toBookTimePageFlipTransition: function() {
    	var that = this;
    	if (!DigiWebApp.SettingsController.HasCredentials()) {
    		return that.toSettingsPage();
    	}
    	DigiWebApp.TabBar.setActiveTab(DigiWebApp.TabBar.tabItem1);
    	var ChefToolOnly = (DigiWebApp.SettingsController.featureAvailable('409'));
    	if (ChefToolOnly) {
        	var Bautagebuch = (DigiWebApp.SettingsController.featureAvailable('412'));
    		if (Bautagebuch) {
        		DigiWebApp.NavigationController.startBautagebuch();    			
    		} else {
	    		//var o = DigiWebApp.ApplicationController.useSplashJustForFade;
	    		DigiWebApp.ApplicationController.useSplashJustForFade = YES;
	    		DigiWebApp.NavigationController.toSplashViewPage();
	    		DigiWebApp.ApplicationController.useSplashJustForFade = 0;
	    		//DigiWebApp.NavigationController.toDashboardPageFlipTransition();
    		}
    	} else {
    		try {
    			if (DigiWebApp.SettingsController.featureAvailable('416')) {
    				DigiWebApp.NavigationController.switchToPage('bookingPageWithIconsScholpp', M.TRANSITION.FLIP, YES);
    			} else {
    				DigiWebApp.NavigationController.switchToPage('bookingPage', M.TRANSITION.FLIP, YES);
    			}
    		} catch(e4) { trackError(e4); }
    	}
    }

    , backToBookTimePageFlipTransition: function() {
    	var that = this;
    	if (!DigiWebApp.SettingsController.HasCredentials()) {
    		return that.toSettingsPage();
    	}
    	DigiWebApp.TabBar.setActiveTab(DigiWebApp.TabBar.tabItem1);
    	var ChefToolOnly = (DigiWebApp.SettingsController.featureAvailable('409'));
    	if (ChefToolOnly) {
        	var Bautagebuch = (DigiWebApp.SettingsController.featureAvailable('412'));
    		if (Bautagebuch) {
        		DigiWebApp.NavigationController.startBautagebuch();    			
    		} else {
	    		//var o = DigiWebApp.ApplicationController.useSplashJustForFade;
	    		DigiWebApp.ApplicationController.useSplashJustForFade = YES;
	    		DigiWebApp.NavigationController.toSplashViewPage();
	    		DigiWebApp.ApplicationController.useSplashJustForFade = 0;
	    		//DigiWebApp.NavigationController.backToDashboardPageFlipTransition();
    		}
    	} else {
    		try {
    			if (DigiWebApp.SettingsController.featureAvailable('416')) {
    				DigiWebApp.NavigationController.switchToPage('bookingPageWithIconsScholpp', M.TRANSITION.FLIP, NO);
    			} else {
    				DigiWebApp.NavigationController.switchToPage('bookingPage', M.TRANSITION.FLIP, NO);
    			}
    		} catch(e5) { trackError(e5); }
    	}
    }

    , toHandOrderPage: function(vaterId, successCallback) {
    	var ChefToolOnly = (DigiWebApp.SettingsController.featureAvailable('409'));
    	var Handpositionen = (DigiWebApp.SettingsController.featureAvailable('430'));
    	if (ChefToolOnly && !Handpositionen) {
			if (DigiWebApp.SettingsController.featureAvailable('404')) {
	            DigiWebApp.NavigationController.toButtonDashboardPage();
			} else {
	            DigiWebApp.NavigationController.toDashboardPage();
			}
    	} else {
    		if (typeof(vaterId) == "undefined") vaterId = null;
    		if (typeof(successCallback) == "undefined") successCallback = null;
    		DigiWebApp.HandOrderController.set('vaterId', vaterId);
    		DigiWebApp.HandOrderController.set('successCallback', successCallback);
    		DigiWebApp.NavigationController.switchToPage('handOrderPage', M.TRANSITION.NONE, NO);
    	}
    }

    , toHandOrderPageTransition: function(vaterId, successCallback) {
    	var ChefToolOnly = (DigiWebApp.SettingsController.featureAvailable('409'));
    	var Handpositionen = (DigiWebApp.SettingsController.featureAvailable('430'));
    	if (ChefToolOnly && !Handpositionen) {
			if (DigiWebApp.SettingsController.featureAvailable('404')) {
	            DigiWebApp.NavigationController.toButtonDashboardPage();
			} else {
	            DigiWebApp.NavigationController.toDashboardPage();
			}
    	} else {
    		if (typeof(vaterId) == "undefined") vaterId = null;
    		if (typeof(successCallback) == "undefined") successCallback = null;
    		DigiWebApp.HandOrderController.set('vaterId', vaterId);
    		DigiWebApp.HandOrderController.set('successCallback', successCallback);
        	DigiWebApp.NavigationController.switchToPage('handOrderPage', M.TRANSITION.SLIDEUP, NO);
    	}
    }

    , backToHandOrderPageTransition: function(vaterId) {
		if (typeof(vaterId) == "undefined") vaterId = null;
		if (typeof(successCallback) == "undefined") successCallback = null;
		DigiWebApp.HandOrderController.set('vaterId', vaterId);
		DigiWebApp.HandOrderController.set('successCallback', successCallback);
        DigiWebApp.NavigationController.switchToPage('handOrderPage', M.TRANSITION.POP, YES);
    }

    , toSettingsPage: function() {
    	DigiWebApp.NavigationController.switchToPage('settingsPage', M.TRANSITION.NONE, NO);
    }

    , backToSettingsPage: function() {
    	DigiWebApp.NavigationController.switchToPage('settingsPage', M.TRANSITION.POP, YES);
    }

//    , toNoSettingsiOSPage: function() {
//    	DigiWebApp.NavigationController.switchToPage('noSettingsiOSPage', M.TRANSITION.POP, NO);
//    }

    , toSettingsPasswordPage: function() {
    	DigiWebApp.NavigationController.switchToPage('settingsPasswordPage', M.TRANSITION.NONE, NO);
    }

    , toSettingsPasswordPageTransition: function() {
    	DigiWebApp.NavigationController.switchToPage('settingsPasswordPage', M.TRANSITION.POP, NO);
    }

    , toTimeDataPage: function() {
    	DigiWebApp.NavigationController.switchToPage('timeDataPage', M.TRANSITION.NONE, NO);
    }

    , toTimeDataPageTransition: function() {
    	DigiWebApp.NavigationController.switchToPage('timeDataPage', M.TRANSITION.SLIDEUP, NO);
    }

    , backToTimeDataPage: function() {
    	DigiWebApp.NavigationController.switchToPage('timeDataPage', M.TRANSITION.SLIDEUP, YES);
    }

    , toEmployeePage: function() {
    	DigiWebApp.NavigationController.switchToPage('employeePage', M.TRANSITION.POP, NO);
    }
    
 // START::normales Menü
    , toDashboardPage: function() {
    	var that = this;
    	if (!DigiWebApp.SettingsController.HasCredentials()) {
    		return that.toSettingsPage();
    	}
    	DigiWebApp.TabBar.setActiveTab(DigiWebApp.TabBar.tabItem2);
    	DigiWebApp.NavigationController.switchToPage('dashboard', M.TRANSITION.NONE, NO);
    }

    , toDashboardPageTransition: function() { // 404 checked
    	var that = this;
    	if (!DigiWebApp.SettingsController.HasCredentials()) {
    		return that.toSettingsPage();
    	}
    	DigiWebApp.TabBar.setActiveTab(DigiWebApp.TabBar.tabItem2);
    	DigiWebApp.NavigationController.switchToPage('dashboard', M.TRANSITION.SLIDEUP, NO);
    }

    , backToDashboardPage: function() { // 404 checked
    	var that = this;
    	if (!DigiWebApp.SettingsController.HasCredentials()) {
    		return that.toSettingsPage();
    	}
    	DigiWebApp.TabBar.setActiveTab(DigiWebApp.TabBar.tabItem2);
    	DigiWebApp.NavigationController.switchToPage('dashboard', M.TRANSITION.SLIDEUP, YES);
    }

    , backToDashboardPagePOP: function() {   // 404 checked
    	var that = this;
    	if (!DigiWebApp.SettingsController.HasCredentials()) {
    		return that.toSettingsPage();
    	}
    	DigiWebApp.TabBar.setActiveTab(DigiWebApp.TabBar.tabItem2);
    	DigiWebApp.NavigationController.switchToPage('dashboard', M.TRANSITION.POP, YES);
    }

    , backToDashboardPageFlipTransition: function() {  // 404 checked
    	var that = this;
    	if (!DigiWebApp.SettingsController.HasCredentials()) {
    		return that.toSettingsPage();
    	}
    	DigiWebApp.TabBar.setActiveTab(DigiWebApp.TabBar.tabItem2);
    	DigiWebApp.NavigationController.switchToPage('dashboard', M.TRANSITION.FLIP, YES);
    }

    , toDashboardPageFlipTransition: function() { // 404 checked
    	var that = this;
    	if (!DigiWebApp.SettingsController.HasCredentials()) {
    		return that.toSettingsPage();
    	}
    	DigiWebApp.NavigationController.switchToPage('dashboard', M.TRANSITION.FLIP, NO);
    }
// ENDE::normales Menü
    
// START:ButtonMenü
    , toButtonDashboardPage: function() {
    	var that = this;
    	if (!DigiWebApp.SettingsController.HasCredentials()) {
    		return that.toSettingsPage();
    	}
    	DigiWebApp.TabBar.setActiveTab(DigiWebApp.TabBar.tabItem2);
    	DigiWebApp.NavigationController.switchToPage('buttonsDashboard', M.TRANSITION.NONE, NO);
    }

    , toButtonDashboardPageTransition: function() {
    	var that = this;
    	if (!DigiWebApp.SettingsController.HasCredentials()) {
    		return that.toSettingsPage();
    	}
    	DigiWebApp.TabBar.setActiveTab(DigiWebApp.TabBar.tabItem2);
    	DigiWebApp.NavigationController.switchToPage('buttonsDashboard', M.TRANSITION.SLIDEUP, NO);
    }

    , backToButtonDashboardPage: function() {
    	var that = this;
    	if (!DigiWebApp.SettingsController.HasCredentials()) {
    		return that.toSettingsPage();
    	}
    	DigiWebApp.TabBar.setActiveTab(DigiWebApp.TabBar.tabItem2);
    	DigiWebApp.NavigationController.switchToPage('buttonsDashboard', M.TRANSITION.SLIDEUP, YES);
    }

    , backToButtonDashboardPagePOP: function() {
    	var that = this;
    	if (!DigiWebApp.SettingsController.HasCredentials()) {
    		return that.toSettingsPage();
    	}
    	DigiWebApp.TabBar.setActiveTab(DigiWebApp.TabBar.tabItem2);
    	DigiWebApp.NavigationController.switchToPage('buttonsDashboard', M.TRANSITION.POP, YES);
    }

    , backToButtonDashboardPageFlipTransition: function() {
    	var that = this;
    	if (!DigiWebApp.SettingsController.HasCredentials()) {
    		return that.toSettingsPage();
    	}
    	DigiWebApp.TabBar.setActiveTab(DigiWebApp.TabBar.tabItem2);
    	DigiWebApp.NavigationController.switchToPage('buttonsDashboard', M.TRANSITION.FLIP, YES);
    }

    , toButtonDashboardPageFlipTransition: function() {
    	var that = this;
    	if (!DigiWebApp.SettingsController.HasCredentials()) {
    		return that.toSettingsPage();
    	}
    	DigiWebApp.TabBar.setActiveTab(DigiWebApp.TabBar.tabItem2);
    	DigiWebApp.NavigationController.switchToPage('buttonsDashboard', M.TRANSITION.FLIP, NO);
    }
// ENDE:ButtonMenü
    
    , toOrderInfoPage: function() {
    	DigiWebApp.NavigationController.switchToPage('orderInfoPage', M.TRANSITION.NONE, NO);
    }

    , toOrderInfoPageTransition: function() {
    	DigiWebApp.NavigationController.switchToPage('orderInfoPage', M.TRANSITION.SLIDEUP, NO);
    }

    , toEditPicturePage: function() {
    	DigiWebApp.NavigationController.switchToPage('editPicturePage', M.TRANSITION.NONE, NO);
    }

    , toEditPicturePageTransition: function() {
    	DigiWebApp.NavigationController.switchToPage('editPicturePage', M.TRANSITION.SLIDEUP, NO);
    }

    , backToEditPicturePage: function() {
    	DigiWebApp.NavigationController.switchToPage('editPicturePage', M.TRANSITION.SLIDEUP, YES);
    }

    , toDemoMediaPage: function() { /* DEMO */
    	DigiWebApp.NavigationController.switchToPage('demomediaPage', M.TRANSITION.NONE, NO);
    }

    , toDemoMediaPageTransition: function() { /* DEMO */
    	DigiWebApp.NavigationController.switchToPage('demomediaPage', M.TRANSITION.SLIDEUP, NO);
    }

    , backToDemoMediaPage: function() { /* DEMO */
    	DigiWebApp.NavigationController.switchToPage('demomediaPage', M.TRANSITION.SLIDEUP, YES);
    }

    , toMediaListPage: function() {
    	DigiWebApp.NavigationController.switchToPage('mediaListPage', M.TRANSITION.NONE, NO);
    }

    , toMediaListPageTransition: function() {
    	DigiWebApp.NavigationController.switchToPage('mediaListPage', M.TRANSITION.SLIDEUP, NO);
    }

    , backToMediaListPage: function() {
    	DigiWebApp.NavigationController.switchToPage('mediaListPage', M.TRANSITION.NONE, YES);
    }

    , backToMediaListPageTransition: function() {
    	DigiWebApp.NavigationController.switchToPage('mediaListPage', M.TRANSITION.SLIDEUP, YES);
    }

    , toAudioPage: function() {
    	DigiWebApp.NavigationController.switchToPage('audioPage', M.TRANSITION.NONE, NO);
    }

    , toAudioPageTransition: function() {
    	DigiWebApp.NavigationController.switchToPage('audioPage', M.TRANSITION.SLIDEUP, NO);
    }

    , toDemoAudioPage: function() { /* DEMO */
    	DigiWebApp.NavigationController.switchToPage('demoaudioPage', M.TRANSITION.NONE, NO);
    }

    , toDemoAudioPageTransition: function() { /* DEMO */
    	DigiWebApp.NavigationController.switchToPage('demoaudioPage', M.TRANSITION.SLIDEUP, NO);
    }

    , toCameraPage: function() {
    	DigiWebApp.NavigationController.switchToPage('cameraPage', M.TRANSITION.NONE, NO);
    }
    
    , toCameraPageTransition: function() {
    	DigiWebApp.NavigationController.switchToPage('cameraPage', M.TRANSITION.SLIDEUP, NO);
    }
    
    , toDemoCameraPage: function() { /* DEMO */
    	DigiWebApp.NavigationController.switchToPage('democameraPage', M.TRANSITION.NONE, NO);
    }
    
    , toDemoCameraPageTransition: function() { /* DEMO */
    	DigiWebApp.NavigationController.switchToPage('democameraPage', M.TRANSITION.SLIDEUP, NO);
    }
    
    , toSpesenPage: function(mycallback) {
    	if (typeof(mycallback) === "function") {
    		DigiWebApp.SpesenPage.myCallback = mycallback;
        	DigiWebApp.NavigationController.switchToPage('spesenPage', M.TRANSITION.POP, NO);
    	}
    }
    
    , toRemarkPage: function(mycallback) {
    	if (typeof(mycallback) === "function") {
    		DigiWebApp.RemarkPage.myCallback = mycallback;
    	} else {
    		//console.log("mycallback is not a function!");
    		// reset to default behaviour
    		DigiWebApp.RemarkPage.myCallback = function() {
    			DigiWebApp.NavigationController.toBookTimePage();
        		DigiWebApp.BookingController.bookWithRemark();
        	};
    	}
    	DigiWebApp.NavigationController.switchToPage('remarkPage', M.TRANSITION.POP, NO);
    }
    
    , toEditTimeDataPage: function(mycallback) {
    	if (typeof(mycallback) === "function") {
    		DigiWebApp.EditTimeDataPage.myCallback = mycallback;
    	} else {
    		//console.log("mycallback is not a function!");
    		// reset to default behaviour
    		DigiWebApp.EditTimeDataPage.myCallback = function() {
    			DigiWebApp.NavigationController.backToTimeDataPage();
        	};
    	}
    	DigiWebApp.NavigationController.switchToPage('editTimeDataPage', M.TRANSITION.SLIDEUP, NO);
    }    

    , toAnwesenheitslistePage: function() { 
		DigiWebApp.AnwesenheitslisteController.set('items', {});
		DigiWebApp.AnwesenheitslisteController.items = null;
    	DigiWebApp.NavigationController.switchToPage('anwesenheitslistePage', M.TRANSITION.NONE, NO);
    }
    
    , toAnwesenheitslistePageTransition: function() { 
		DigiWebApp.AnwesenheitslisteController.set('items', {});
		DigiWebApp.AnwesenheitslisteController.items = null;
    	DigiWebApp.NavigationController.switchToPage('anwesenheitslistePage', M.TRANSITION.SLIDEUP, NO);
    }
    
    , backToAnwesenheitslistePage: function() { 
		DigiWebApp.ZeitbuchungenController.set('items', {});
		DigiWebApp.ZeitbuchungenController.items = null;
    	DigiWebApp.NavigationController.switchToPage('anwesenheitslistePage', M.TRANSITION.NONE, YES);
    }
    
    , backToAnwesenheitslistePageTransition: function() { 
		DigiWebApp.ZeitbuchungenController.set('items', {});
		DigiWebApp.ZeitbuchungenController.items = null;
    	DigiWebApp.NavigationController.switchToPage('anwesenheitslistePage', M.TRANSITION.SLIDEUP, YES);
    }
    
    , toZeitbuchungenPage: function() { 
		DigiWebApp.ZeitbuchungenController.set('items', {});
		DigiWebApp.ZeitbuchungenController.items = null;
    	DigiWebApp.NavigationController.switchToPage('zeitbuchungenPage', M.TRANSITION.NONE, NO);
    }
    
    , toZeitbuchungenPageTransition: function() { 
		DigiWebApp.ZeitbuchungenController.set('items', {});
		DigiWebApp.ZeitbuchungenController.items = null;
    	DigiWebApp.NavigationController.switchToPage('zeitbuchungenPage', M.TRANSITION.SLIDEUP, NO);
    }
    
    , backToZeitbuchungenPage: function() { 
		DigiWebApp.ZeitbuchungenController.set('itemForDetails', {});
		DigiWebApp.ZeitbuchungenController.itemForDetails = null;
    	DigiWebApp.NavigationController.switchToPage('zeitbuchungenPage', M.TRANSITION.NONE, YES);
    }
    
    , backToZeitbuchungenPageTransition: function() { 
		DigiWebApp.ZeitbuchungenController.set('itemForDetails', {});
		DigiWebApp.ZeitbuchungenController.itemForDetails = null;
    	DigiWebApp.NavigationController.switchToPage('zeitbuchungenPage', M.TRANSITION.SLIDEUP, YES);
    }
    
    , toZeitbuchungDetailsPage: function() { 
    	DigiWebApp.NavigationController.switchToPage('zeitbuchungDetailsPage', M.TRANSITION.NONE, NO);
    }
    
    , toZeitbuchungDetailsPageTransition: function() { 
    	DigiWebApp.NavigationController.switchToPage('zeitbuchungDetailsPage', M.TRANSITION.SLIDEUP, NO);
    }
    
    , backToZeitbuchungDetailsPage: function() { 
		DigiWebApp.OrderDetailsController.set('positionForDetails', {});
		DigiWebApp.OrderDetailsController.positionForDetails = null;
    	DigiWebApp.NavigationController.switchToPage('zeitbuchungDetailsPage', M.TRANSITION.NONE, YES);
    }
    
    , backToZeitbuchungDetailsPageTransition: function() { 
		DigiWebApp.OrderDetailsController.set('positionForDetails', {});
		DigiWebApp.OrderDetailsController.positionForDetails = null;
    	DigiWebApp.NavigationController.switchToPage('zeitbuchungDetailsPage', M.TRANSITION.SLIDEUP, YES);
    }
    
    , toOrderDetailsPage: function() { 
    	DigiWebApp.NavigationController.switchToPage('orderDetailsPage', M.TRANSITION.NONE, NO);
    }
    
    , toOrderDetailsPageTransition: function() { 
    	DigiWebApp.NavigationController.switchToPage('orderDetailsPage', M.TRANSITION.SLIDEUP, NO);
    }
    
    , toTimeDataArchivePage: function() { 
    	DigiWebApp.NavigationController.switchToPage('timeDataArchivePage', M.TRANSITION.NONE, NO);
    }
    
    , toTimeDataArchivePageTransition: function() { 
    	DigiWebApp.NavigationController.switchToPage('timeDataArchivePage', M.TRANSITION.SLIDEUP, NO);
    }
    
    // Start::Bautagebuch
    
    , toBautagebuchBautagesberichteListePageTransition: function() {
    	DigiWebApp.NavigationController.switchToPage('bautagebuchBautagesberichteListePage', M.TRANSITION.SLIDEUP, NO);
    }
    , backToBautagebuchBautagesberichteListePageTransition: function() {
    	DigiWebApp.NavigationController.switchToPage('bautagebuchBautagesberichteListePage', M.TRANSITION.SLIDEUP, YES);
    }

    , toBautagebuchBautagesberichtDetailsPageTransition: function() {
    	DigiWebApp.NavigationController.switchToPage('bautagebuchBautagesberichtDetailsPage', M.TRANSITION.SLIDEUP, NO);
    }
    , backToBautagebuchBautagesberichtDetailsPageTransition: function() {
    	DigiWebApp.NavigationController.switchToPage('bautagebuchBautagesberichtDetailsPage', M.TRANSITION.SLIDEUP, YES);
    }

    , toBautagebuchMaterialienListePageTransition: function() {
    	DigiWebApp.NavigationController.switchToPage('bautagebuchMaterialienListePage', M.TRANSITION.SLIDEUP, NO);
    }
    , backToBautagebuchMaterialienListePageTransition: function() {
    	DigiWebApp.NavigationController.switchToPage('bautagebuchMaterialienListePage', M.TRANSITION.SLIDEUP, YES);
    }

    , toBautagebuchMaterialienDetailsPageTransition: function() {
    	DigiWebApp.NavigationController.switchToPage('bautagebuchMaterialienDetailsPage', M.TRANSITION.SLIDEUP, NO);
    }
    , backToBautagebuchMaterialienDetailsPageTransition: function() {
    	DigiWebApp.NavigationController.switchToPage('bautagebuchMaterialienDetailsPage', M.TRANSITION.SLIDEUP, YES);
    }

    , toBautagebuchZeitenListePageTransition: function() {
    	DigiWebApp.NavigationController.switchToPage('bautagebuchZeitenListePage', M.TRANSITION.SLIDEUP, NO);
    }
    , backToBautagebuchZeitenListePageTransition: function() {
    	DigiWebApp.NavigationController.switchToPage('bautagebuchZeitenListePage', M.TRANSITION.SLIDEUP, YES);
    }

    , toBautagebuchZeitenDetailsPageTransition: function() {
    	DigiWebApp.NavigationController.switchToPage('bautagebuchZeitenDetailsPage', M.TRANSITION.SLIDEUP, NO);
    }
    , backToBautagebuchZeitenDetailsPageTransition: function() {
    	DigiWebApp.NavigationController.switchToPage('bautagebuchZeitenDetailsPage', M.TRANSITION.SLIDEUP, YES);
    }

    , toBautagebuchNotizenListePageTransition: function() {
    	DigiWebApp.NavigationController.switchToPage('bautagebuchNotizenListePage', M.TRANSITION.SLIDEUP, NO);
    }
    , backToBautagebuchNotizenListePageTransition: function() {
    	DigiWebApp.NavigationController.switchToPage('bautagebuchNotizenListePage', M.TRANSITION.SLIDEUP, YES);
    }

    , toBautagebuchNotizenDetailsPageTransition: function() {
    	DigiWebApp.NavigationController.switchToPage('bautagebuchNotizenDetailsPage', M.TRANSITION.SLIDEUP, NO);
    }
    , backToBautagebuchNotizenDetailsPageTransition: function() {
    	DigiWebApp.NavigationController.switchToPage('bautagebuchNotizenDetailsPage', M.TRANSITION.SLIDEUP, YES);
    }

    , toBautagebuchMedienListePageTransition: function() {
    	DigiWebApp.NavigationController.switchToPage('bautagebuchMedienListePage', M.TRANSITION.SLIDEUP, NO);
    }
    , backToBautagebuchMedienListePageTransition: function() {
    	DigiWebApp.NavigationController.switchToPage('bautagebuchMedienListePage', M.TRANSITION.SLIDEUP, YES);
    }
    , toBautagebuchMedienDetailsPageTransition: function() {
    	DigiWebApp.NavigationController.switchToPage('bautagebuchMedienDetailsPage', M.TRANSITION.SLIDEUP, NO);
    }
    , backToBautagebuchMedienDetailsPageTransition: function() {
    	DigiWebApp.NavigationController.switchToPage('bautagebuchMedienDetailsPage', M.TRANSITION.SLIDEUP, YES);
    }

    , toBautagebuchEinstellungenPageTransition: function() {
    	DigiWebApp.NavigationController.switchToPage('bautagebuchEinstellungenPage', M.TRANSITION.SLIDEUP, NO);
    }
    , backToBautagebuchEinstellungenPageTransition: function() {
    	DigiWebApp.NavigationController.switchToPage('bautagebuchEinstellungenPage', M.TRANSITION.SLIDEUP, YES);
    }

    , toBautagebuchWetterPageTransition: function() {
    	DigiWebApp.NavigationController.switchToPage('bautagebuchWetterPage', M.TRANSITION.SLIDEUP, NO);
    }
    , backToBautagebuchWetterPageTransition: function() {
    	DigiWebApp.NavigationController.switchToPage('bautagebuchWetterPage', M.TRANSITION.SLIDEUP, YES);
    }
    
    , toBautagebuchZusammenfassungPageTransition: function() {
    	DigiWebApp.NavigationController.switchToPage('bautagebuchZusammenfassungPage', M.TRANSITION.SLIDEUP, NO);
    }
    , backToBautagebuchZusammenfassungPageTransition: function() {
    	DigiWebApp.NavigationController.switchToPage('bautagebuchZusammenfassungPage', M.TRANSITION.SLIDEUP, YES);
    }

    , toBautagebuchMitarbeiterAuswahlPage: function() {
    	DigiWebApp.NavigationController.switchToPage('bautagebuchMitarbeiterAuswahlPage', M.TRANSITION.SLIDEUP, NO);
    }

    // Ende::Bautagebuch

    , toFileChooserPageTransition: function() {
    	DigiWebApp.NavigationController.switchToPage('fileChooserPage', M.TRANSITION.POP, NO);
    }

    // Start::ButtonsDashboardPage   
    , toButtonsDashboardPage: function() {
    	DigiWebApp.TabBar.setActiveTab(DigiWebApp.TabBar.tabItem2);
    	DigiWebApp.NavigationController.switchToPage('buttonsDashboard', M.TRANSITION.NONE, NO);
    }

    , toButtonsDashboardPageTransition: function() {
    	DigiWebApp.TabBar.setActiveTab(DigiWebApp.TabBar.tabItem2);
    	DigiWebApp.NavigationController.switchToPage('buttonsDashboard', M.TRANSITION.SLIDEUP, NO);
    }

    , backToButtonsDashboardPage: function() {
    	DigiWebApp.TabBar.setActiveTab(DigiWebApp.TabBar.tabItem2);
    	DigiWebApp.NavigationController.switchToPage('buttonsDashboard', M.TRANSITION.SLIDEUP, YES);
    }

    , backToButtonsDashboardPagePOP: function() {
    	DigiWebApp.TabBar.setActiveTab(DigiWebApp.TabBar.tabItem2);
    	DigiWebApp.NavigationController.switchToPage('buttonsDashboard', M.TRANSITION.POP, YES);
    }

    , backToButtonsDashboardPageFlipTransition: function() {
    	DigiWebApp.TabBar.setActiveTab(DigiWebApp.TabBar.tabItem2);
    	DigiWebApp.NavigationController.switchToPage('buttonsDashboard', M.TRANSITION.FLIP, YES);
    }

    , toButtonsDashboardPageFlipTransition: function() {
    	DigiWebApp.TabBar.setActiveTab(DigiWebApp.TabBar.tabItem2);
    	DigiWebApp.NavigationController.switchToPage('buttonsDashboard', M.TRANSITION.FLIP, NO);
    }
    // Ende::ButtonsDashboardPage   

    , toStudieChecklistePage: function() {
    	DigiWebApp.NavigationController.switchToPage('studieChecklistePage', M.TRANSITION.NONE, NO);
    }

    , toTerminlistePage: function() {
    	DigiWebApp.NavigationController.switchToPage('terminlistePage', M.TRANSITION.SLIDEUP, NO);
    }

    , backToTerminlistePage: function() {
    	DigiWebApp.NavigationController.switchToPage('terminlistePage', M.TRANSITION.SLIDEUP, YES);
    }

    , toFestePauseStornierenPage: function() {
    	DigiWebApp.NavigationController.switchToPage('festePauseStornierenPage', M.TRANSITION.SLIDEUP, NO);
    }

    , backToFestePauseStornierenPage: function() {
    	DigiWebApp.NavigationController.switchToPage('festePauseStornierenPage', M.TRANSITION.SLIDEUP, YES);
    }

    , startBautagebuch: function() {
    	//DigiWebApp.NavigationController.toBautagebuchBautagesberichteListePageTransition();    	
		//var bautagesberichte = DigiWebApp.BautagebuchBautagesbericht.find({query:{identifier: 'bautagesberichtTyp', operator: '!=', value: "" + "<materialerfassung_only>"}});
		var bautagesberichte = DigiWebApp.BautagebuchBautagesbericht.find();
		bautagesberichte = _.filter(bautagesberichte, function(n) {return (n.get('bautagesberichtTyp') == "<standard>")}); // <materialerfassung_only> und <notizen_only> rausfiltern
		if (bautagesberichte.length > 0) {
			var einOffenerBautagesbericht = NO;
			var offenerBautagesbericht = null;
			_.each(bautagesberichte, function(bautagesbericht){
				if (!bautagesbericht.get("abgeschlossen")) {
					if (!einOffenerBautagesbericht && !offenerBautagesbericht) {
						einOffenerBautagesbericht = YES;
						offenerBautagesbericht = bautagesbericht;
					} else {
						einOffenerBautagesbericht = NO;
					}
				}
			});
			if (einOffenerBautagesbericht) {
				// es gibt nur einen offenen Bautagesbericht
				DigiWebApp.BautagebuchBautagesberichteListeController.init();
				DigiWebApp.BautagebuchBautagesberichtDetailsController.load(offenerBautagesbericht);
				DigiWebApp.NavigationController.toBautagebuchBautagesberichtDetailsPageTransition();
			} else if (offenerBautagesbericht) {
				// es gibt mehr als einen offenen Bautagesbericht
				DigiWebApp.NavigationController.toBautagebuchBautagesberichteListePageTransition();
			} else {
				// es gibt keinen offenen Bautagesbericht
				DigiWebApp.BautagebuchBautagesberichteListeController.init();
				DigiWebApp.BautagebuchBautagesberichteListeController.neu();
			}
		} else {
			DigiWebApp.BautagebuchBautagesberichteListeController.init();
			DigiWebApp.BautagebuchBautagesberichteListeController.neu();
		}
    }
    
    , toActivityListPage: function() {
    	DigiWebApp.NavigationController.switchToPage('activityListPage', M.TRANSITION.POP, NO);
    }
    
    , toOrderListPage: function() {
    	DigiWebApp.NavigationController.switchToPage('orderListPage', M.TRANSITION.POP, NO);
    }
    
});
