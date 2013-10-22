// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: DigiWebApp
// Controller: MediaPageController
// ==========================================================================

DigiWebApp.DemoMediaPageController = M.Controller.extend({

      events: {
		pagebeforeshow: {
    		  target: this
    		, action: 'init'
		}
	}

    , items: null

    , latestId: null

    , init: function(isFirstLoad) {
        if(DigiWebApp.DemoMediaPage.needsUpdate) {
            var items = [];
                        
//            // Start::TakePicture (400)
//            if (DigiWebApp.SettingsController.featureAvailable('400')) {
//            	if (DigiWebApp.SettingsController.globalDebugMode) console.log("enabling Feature 400 (TakePicture)");
//                items.push({
//                    label: M.I18N.l('takePicture'),
//                    icon: 'icon_takePicture.png',
//                    id: 'camera'
//                });
//            }
//            // End::TakePicture

            // Start::RecordAudio (401)
            if (DigiWebApp.SettingsController.featureAvailable('401')) {
            	if (DigiWebApp.SettingsController.globalDebugMode) console.log("enabling Feature 401 (RecordAudio)");
                items.push({
                    label: M.I18N.l('recordAudio'),
                    icon: 'icon_recordAudio.png',
                    id: 'audio'
                });
            }
            // End::RecordAudio

            this.set('items', items);
            DigiWebApp.DemoMediaPage.needsUpdate = false;
        }

        var list = M.ViewManager.getView('mediaPage', 'list');
        if(list) {
            $('#' + list.id).find('li').each(function() {
                $(this).removeClass('selected');
            });
        }
    }

    , itemSelected: function(id, m_id) {
        if(this.latestId) {
            $('#' + this.latestId).removeClass('selected');
        }
        $('#' + id).addClass('selected');

        this.latestId = id;

        if(m_id && typeof(this[m_id]) === 'function') {
            this[m_id]();
        }
    }

    , camera: function() {
        DigiWebApp.NavigationController.toDemoCameraPageTransition();
    }

    , audio: function() {
        DigiWebApp.NavigationController.toDemoAudioPageTransition();
    }
    
});
