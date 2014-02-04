// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: DigiWebApp
// View: AudioPage
// ==========================================================================

DigiWebApp.DemoAudioPage = M.PageView.design({

    /* Use the 'events' property to bind events like 'pageshow' */
      events: {
		pagebeforeshow: {
            target: DigiWebApp.DemoAudioController,
            action: 'init'
        }
    }

    , childViews: 'header content'

    , cssClass: 'demoAudioPage'

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
                    , action: 'backToDemoMediaPage'
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
        //childViews: 'audioIcon recordIcon stopRecordIcon playIcon stopIcon grid',
          childViews: 'audioIcon grid'
        
        , audioIcon: M.ImageView.design({
    		  value: 'theme/images/icon_record.png'
    		, cssClass: 'audioIcon'
        	, events: {
        		tap: {
        			  target: DigiWebApp.DemoAudioController
					, action: 'recordAudio'
        		}
    		}
        })

        , recordIcon: M.ImageView.design({
    		  value: 'theme/images/icon_record.png'
    		, cssClass: 'mediaIcon'
        	, events: {
        		tap: {
        			action: DigiWebApp.DemoAudioController.recordAudio
        		}
    		}
        })

        , stopRecordIcon: M.ImageView.design({
    		  value: 'theme/images/icon_stop.png'
    		, cssClass: 'mediaIcon'
        	, events: {
        		tap: {
					action: DigiWebApp.DemoAudioController.stopRecord
        		}
    		}
        })

        , playIcon: M.ImageView.design({
    		  value: 'theme/images/icon_playbackAudio.png'
    		, cssClass: 'mediaIcon'
        	, events: {
        		tap: {
					action: DigiWebApp.DemoAudioController.playbackAudio
        		}
    		}
        })

        , stopIcon: M.ImageView.design({
    		  value: 'theme/images/icon_stop.png'
    		, cssClass: 'mediaIcon'
        	, events: {
        		tap: {
					action: DigiWebApp.DemoAudioController.stopPlayback
        		}
    		}
        })

        , grid: M.GridView.design({
        	  childViews: 'button icon'
        	, layout: {
            	  cssClass: 'marginTop40 digiButton'
            	, columns: {
                	  0: 'button'
                	, 1: 'icon'
            	}
        	}
        
        	, button: M.ButtonView.design({
        		  value: M.I18N.l('recordAudio')
        		, cssClass: 'digiButton'
        		, anchorLocation: M.RIGHT
        		, events: {
                	tap: {
        				  target: DigiWebApp.DemoAudioController
        				, action: 'recordAudio'
                	}
            	}
        	})
        
        	, icon: M.ImageView.design({
        		value: 'theme/images/icon_bookTime.png'
        	})
        })
    })


});

