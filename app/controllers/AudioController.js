// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: DigiWebApp
// Controller: AudioController
// ==========================================================================
// manuell var-checked
DigiWebApp.AudioController = M.Controller.extend({

	/*
	 * http://docs.phonegap.com/en/1.0.0/phonegap_media_media.md.html
	 */
	
      myAudioObject: {}
    , myTimeStamp: null
    , myFilename: null
    , myState: null

    /*
    * Sample function
    * To handle the first load of a page.
    */
    , init: function(isFirstLoad) {
    	//if (DigiWebApp.SettingsController.globalDebugMode) console.log('init');
    	//if (DigiWebApp.SettingsController.globalDebugMode) console.log('this.myState = ' + this.myState);
		if (isFirstLoad) {
            /* do something here, when page is loaded the first time. */
        }
        /* do something, for any other load. */

		// rewire audioIcon for record
    	DigiWebApp.AudioPage.content.grid.button.events = { tap: { action: DigiWebApp.AudioController.recordAudio } };
    	DigiWebApp.AudioPage.content.grid.button.registerEvents();
    	DigiWebApp.AudioPage.content.audioIcon.events = { tap: { action: DigiWebApp.AudioController.recordAudio } };
		//DigiWebApp.AudioPage.content.audioIcon.events = { tap: { target: DigiWebApp.AudioController, action: 'recordAudio' } };
    	DigiWebApp.AudioPage.content.audioIcon.registerEvents();
    	//DigiWebApp.AudioPage.content.audioIcon.value = 'file:///android_asset/www/theme/images/icon_record.png';
    	//DigiWebApp.AudioPage.content.audioIcon.renderUpdate();
    	document.getElementById(DigiWebApp.AudioPage.content.audioIcon.id).src = 'theme/images/icon_record.png';

    	
        this.myTimeStamp = M.Date.create(new Date()).format('yymmddHHMMss');
        this.myFilename = 'DIGI-WebApp-recording-' + this.myTimeStamp + '.wav';
        this.myState = null;
    	
        DigiWebApp.AudioController.myAudioObject = new Media(this.myFilename, this.onSuccess, this.onError, this.mediaStatus, this.mediaPosition);
        //if (DigiWebApp.SettingsController.globalDebugMode) console.log(this.myFilename);
        //if (DigiWebApp.SettingsController.globalDebugMode) console.log(DigiWebApp.AudioController.myAudioObject);
    	
    }

    , mediaStatus: function(status) {
    	//if (DigiWebApp.SettingsController.globalDebugMode) console.log('mediaStatus: ' + status);
    }
    
    , mediaPosition: function(position) {
    	//if (DigiWebApp.SettingsController.globalDebugMode) console.log('mediaPosition: ' + position);
    }
    
    , onSuccess: function() {
    	//if (DigiWebApp.SettingsController.globalDebugMode) console.log('onSuccess');
    	//if (DigiWebApp.SettingsController.globalDebugMode) console.log('this.myState = ' + this.myState);
		switch(this.myState) {
			case 'play':
				
				// rewire audioIcon for stopPlayback
				DigiWebApp.AudioPage.content.audioIcon.events = { tap: { action: DigiWebApp.AudioController.stopPlayback } };
				DigiWebApp.AudioPage.content.audioIcon.registerEvents();
				document.getElementById(DigiWebApp.AudioPage.content.audioIcon.id).src = 'theme/images/icon_stop.png';
				
				break;
				
			case 'record':
				
				// rewire audioIcon for stopRecord
		    	DigiWebApp.AudioPage.content.audioIcon.events = { tap: { action: DigiWebApp.AudioController.stopRecord } };
		    	DigiWebApp.AudioPage.content.audioIcon.registerEvents();
		    	document.getElementById(DigiWebApp.AudioPage.content.audioIcon.id).src = 'theme/images/icon_stop.png';

		    	// rewire digi-button to setup a new recording
		    	DigiWebApp.AudioPage.content.grid.button.events = { tap: { action: DigiWebApp.AudioController.init } };
		    	DigiWebApp.AudioPage.content.grid.button.registerEvents();

		    	break;
		    	
			case 'stop':
				
				// rewire audioIcon for playbackAudio
				DigiWebApp.AudioPage.content.audioIcon.events = { tap: { action: DigiWebApp.AudioController.playbackAudio } };
				DigiWebApp.AudioPage.content.audioIcon.registerEvents();
				document.getElementById(DigiWebApp.AudioPage.content.audioIcon.id).src = 'theme/images/icon_playbackAudio.png';
				
				break;
				
			default:

				// rewire audioIcon for playbackAudio
				DigiWebApp.AudioPage.content.audioIcon.events = { tap: { action: DigiWebApp.AudioController.playbackAudio } };
				DigiWebApp.AudioPage.content.audioIcon.registerEvents();
				document.getElementById(DigiWebApp.AudioPage.content.audioIcon.id).src = 'theme/images/icon_playbackAudio.png';

				break;
		}
    }
    
    , onError: function(error) {
    	//if (DigiWebApp.SettingsController.globalDebugMode) console.log('onError');
    	console.log('code: '    + error.code    + '\n' + 'message: ' + error.message + '\n');
    	console.log('Filename: ' + this.myFilename);
    	
    	// rewire audioIcon for playbackAudio
    	DigiWebApp.AudioPage.content.audioIcon.events = { tap: { action: DigiWebApp.AudioController.playbackAudio } };
    	DigiWebApp.AudioPage.content.audioIcon.registerEvents();
    	document.getElementById(DigiWebApp.AudioPage.content.audioIcon.id).src = 'theme/images/icon_playbackAudio.png';

    	// rewire digi-button to setup a new recording
    	DigiWebApp.AudioPage.content.grid.button.events = { tap: { action: DigiWebApp.AudioController.init } };
    	DigiWebApp.AudioPage.content.grid.button.registerEvents();
    }
    
    , recordAudio: function() {
    	this.myState = 'record';
    	DigiWebApp.AudioController.myAudioObject.startRecord();

		// rewire audioIcon for stopRecord
    	DigiWebApp.AudioPage.content.audioIcon.events = { tap: { action: DigiWebApp.AudioController.stopRecord } };
    	DigiWebApp.AudioPage.content.audioIcon.registerEvents();
    	document.getElementById(DigiWebApp.AudioPage.content.audioIcon.id).src = 'theme/images/icon_stop.png';

    	// rewire digi-button to setup a new recording
    	DigiWebApp.AudioPage.content.grid.button.events = { tap: { action: DigiWebApp.AudioController.init } };
    	DigiWebApp.AudioPage.content.grid.button.registerEvents();

		//if (DigiWebApp.SettingsController.globalDebugMode) console.log('recordAudio');
    	//if (DigiWebApp.SettingsController.globalDebugMode) console.log('this.myState = ' + this.myState);
    }
   
    , stopRecord: function() {
    	this.myState = 'stop';
    	DigiWebApp.AudioController.myAudioObject.stopRecord();

    	// rewire audioIcon for playbackAudio
    	DigiWebApp.AudioPage.content.audioIcon.events = { tap: { action: DigiWebApp.AudioController.playbackAudio } };
    	DigiWebApp.AudioPage.content.audioIcon.registerEvents();
    	document.getElementById(DigiWebApp.AudioPage.content.audioIcon.id).src = 'theme/images/icon_playbackAudio.png';

    	//if (DigiWebApp.SettingsController.globalDebugMode) console.log('stopRecord');
    	//if (DigiWebApp.SettingsController.globalDebugMode) console.log('this.myState = ' + this.myState);
    }
        
    , playbackAudio: function() {
    	this.myState = 'play';
    	DigiWebApp.AudioController.myAudioObject.play();

		// rewire audioIcon for stopPlayback
		DigiWebApp.AudioPage.content.audioIcon.events = { tap: { action: DigiWebApp.AudioController.stopPlayback } };
		DigiWebApp.AudioPage.content.audioIcon.registerEvents();
		document.getElementById(DigiWebApp.AudioPage.content.audioIcon.id).src = 'theme/images/icon_stop.png';

		//if (DigiWebApp.SettingsController.globalDebugMode) console.log('playbackAudio');
    	//if (DigiWebApp.SettingsController.globalDebugMode) console.log('this.myState = ' + this.myState);
    }
    
    , stopPlayback: function() {
    	this.myState = 'stop';
    	DigiWebApp.AudioController.myAudioObject.stop();
    	
		// rewire audioIcon for playbackAudio
    	DigiWebApp.AudioPage.content.audioIcon.events = { tap: { action: DigiWebApp.AudioController.playbackAudio } };
    	DigiWebApp.AudioPage.content.audioIcon.registerEvents();
    	document.getElementById(DigiWebApp.AudioPage.content.audioIcon.id).src = 'theme/images/icon_playbackAudio.png';

    	//if (DigiWebApp.SettingsController.globalDebugMode) console.log('stopPlayback');
    	//if (DigiWebApp.SettingsController.globalDebugMode) console.log('this.myState = ' + this.myState);
    }
    
});
