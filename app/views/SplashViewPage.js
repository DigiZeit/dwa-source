// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: DigiWebApp
// View: SplashViewPage
// ==========================================================================

/** Der SplashView wird bei Ausführung im Browser im Eventhandler für window.onload in main.js aktiviert.
 *  Außerdem wird der SplashView für Screen-Übergange (Transistions) verwendet, siehe z.B.
 *  NavigationController.backToBookTimePage()
 */
DigiWebApp.SplashViewPage = M.PageView.design({

      events: {
		  pagebeforeshow: {
            action: function() {
            	writeToLog("in SplashViewPage.pagebeforeshow");
				if (!(window.newAppVersionAvailable || DigiWebApp.ApplicationController.useSplashJustForFade)) {
					if (navigator.platform === "BlackBerry" && restartOnBlackBerry) {
					    DigiWebApp.ApplicationController.blackBerryRestart_var = setTimeout(
                            "DigiWebApp.ApplicationController.blackBerryRestart()", 3000);
					} else {
						DigiWebApp.ApplicationController.regSecEv(YES);	
					}
				}
			}
        }
		, pageshow: {
            action: function() {
            	writeToLog("in SplashViewPage.pageshow");
				if (!(window.newAppVersionAvailable || DigiWebApp.ApplicationController.useSplashJustForFade)) {
						DigiWebApp.ApplicationController.DigiLoaderView.show(M.I18N.l('waitingForDevice'));
				}
			}
        }
    }

    , childViews: 'content'

    , cssClass: 'splashViewPage'

    , logo: M.ImageView.design({
          value:'theme/images/logo.png'
        , cssClass: 'logoSplashPage'
    })

    , content: M.ScrollView.design({

          cssClass: 'infoBox'

        , childViews: 'title info'

        , title: M.LabelView.design({
            //  value: 'DIGI-WebApp'
              value: ''
            , cssClass: 'appTitle'
        })

        , info: M.LabelView.design({
              value: ''
            , cssClass: 'infoMsg'
            , contentBinding: {
                  target: DigiWebApp.ApplicationController
                , property: 'infoMsg'
            }
        })
    })
});

