// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: DigiWebApp
// View: AudioPage
// ==========================================================================

DigiWebApp.AudioPage = M.PageView.design({

    /* Use the 'events' property to bind events like 'pageshow' */
    events: {
		pagebeforeshow: {
              target: DigiWebApp.AudioController
            , action: 'init'
        }
    }

    , childViews: 'header content'

    , cssClass: 'audioPage'

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
                    , action: 'backToMediaListPageTransition'
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

          childViews: 'audioIcon grid'
        
        , audioIcon: M.ImageView.design({
    		  value: 'theme/images/icon_record.png'
    		, cssClass: 'audioIcon'
        	, events: {
        		tap: {
        			  target: DigiWebApp.AudioController
					, action: 'recordAudio'
        		}
    		}
        })

        , recordIcon: M.ImageView.design({
    		  value: 'theme/images/icon_record.png'
    		, cssClass: 'mediaIcon'
        	, events: {
        		tap: {
        			action: DigiWebApp.AudioController.recordAudio
        		}
    		}
        })

        , stopRecordIcon: M.ImageView.design({
    		  value: 'theme/images/icon_stop.png'
    		, cssClass: 'mediaIcon'
        	, events: {
        		tap: {
					action: DigiWebApp.AudioController.stopRecord
        		}
    		}
        })

        , playIcon: M.ImageView.design({
    		  value: 'theme/images/icon_playbackAudio.png'
    		, cssClass: 'mediaIcon'
        	, events: {
        		tap: {
					action: DigiWebApp.AudioController.playbackAudio
        		}
    		}
        })

        , stopIcon: M.ImageView.design({
    		  value: 'theme/images/icon_stop.png'
    		, cssClass: 'mediaIcon'
        	, events: {
        		tap: {
					action: DigiWebApp.AudioController.stopPlayback
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
        				  target: DigiWebApp.AudioController
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

