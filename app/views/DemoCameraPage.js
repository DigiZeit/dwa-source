//// ==========================================================================
//// The M-Project - Mobile HTML5 Application Framework
//// Generated with: Espresso 
////
//// Project: DigiWebApp
//// View: DemoCameraPage
//// ==========================================================================
//
//DigiWebApp.DemoCameraPage = M.PageView.design({
//
//    /* Use the 'events' property to bind events like 'pageshow' */
//      events: {
//		pagebeforeshow: {
//              target: DigiWebApp.DemoCameraController
//            , action: 'init'
//        }
//    }
//
//    , cssClass: 'demoCameraPage'
//
//    , childViews: 'header content'
//
//    , header: M.ToolbarView.design({
//          childViews: 'backButton title'
//        , cssClass: 'header'
//        , isFixed: YES
//        , backButton: M.ButtonView.design({
//              value: M.I18N.l('back')
//            , icon: 'arrow-l'
//            anchorLocation: M.LEFT
//            , events: {
//                tap: {
//                      target: DigiWebApp.NavigationController
//                    , action: 'backToDemoMediaPage'
//                }
//            }
//        })
//        , title: M.LabelView.design({
//              value: M.I18N.l('takePictureDemo')
//            , anchorLocation: M.CENTER
//        })
//        , anchorLocation: M.TOP
//    })
//
//    , content: M.ScrollView.design({
//          childViews: 'image takePictureGrid'
//
//        , image: M.ImageView.design({
//        		  value: ''
//        		, cssClass: 'demophoto'
//        })
//
//        , takePictureGrid: M.GridView.design({
//        	  childViews: 'button icon'
//        	, layout: {
//            	  cssClass: 'marginTop40 digiButton'
//            	, columns: {
//                	  0: 'button'
//                	, 1: 'icon'
//            	}
//        	}
//        
//        	, button: M.ButtonView.design({
//        		  value: M.I18N.l('takePicture')
//        		, cssClass: 'digiButton'
//        		, anchorLocation: M.RIGHT
//        		, events: {
//                	tap: {
//        				  target: DigiWebApp.DemoCameraController
//        				, action: 'takePicture'
//                	}
//            	}
//        	})
//        
//        	, icon: M.ImageView.design({
//        		value: 'theme/images/icon_bookTime.png'
//        	})
//
//        })
//    })
//});
//
