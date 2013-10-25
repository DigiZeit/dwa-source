// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: DigiWebApp
// Controller: AudioController
// ==========================================================================
// manuell var-checked
DigiWebApp.DemoAudioController = M.Controller.extend({

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
    	if (DigiWebApp.SettingsController.globalDebugMode) console.log('init');
    	if (DigiWebApp.SettingsController.globalDebugMode) console.log('this.myState = ' + this.myState);
		if (isFirstLoad) {
            /* do something here, when page is loaded the first time. */
        }
        /* do something, for any other load. */

		// rewire audioIcon for record
    	DigiWebApp.DemoAudioPage.content.grid.button.events = { tap: { action: DigiWebApp.DemoAudioController.recordAudio } };
    	DigiWebApp.DemoAudioPage.content.grid.button.registerEvents();
    	DigiWebApp.DemoAudioPage.content.audioIcon.events = { tap: { action: DigiWebApp.DemoAudioController.recordAudio } };
		//DigiWebApp.DemoAudioPage.content.audioIcon.events = { tap: { target: DigiWebApp.DemoAudioController, action: 'recordAudio' } };
    	DigiWebApp.DemoAudioPage.content.audioIcon.registerEvents();
    	//DigiWebApp.DemoAudioPage.content.audioIcon.value = 'file:///android_asset/www/theme/images/icon_record.png';
    	//DigiWebApp.DemoAudioPage.content.audioIcon.renderUpdate();
    	document.getElementById(DigiWebApp.DemoAudioPage.content.audioIcon.id).src = 'theme/images/icon_record.png';

    	
        this.myTimeStamp = M.Date.create(new Date()).format('yymmddHHMMss');
        this.myFilename = 'DIGI-WebApp-recording-' + this.myTimeStamp + '.wav';
        this.myState = null;
    	
        DigiWebApp.DemoAudioController.myAudioObject = new Media(this.myFilename, this.onSuccess, this.onError, this.mediaStatus, this.mediaPosition);
        if (DigiWebApp.SettingsController.globalDebugMode) console.log(this.myFilename);
        if (DigiWebApp.SettingsController.globalDebugMode) console.log(DigiWebApp.DemoAudioController.myAudioObject);
    	
    }

    , mediaStatus: function(status) {
    	if (DigiWebApp.SettingsController.globalDebugMode) console.log('mediaStatus: ' + status);
    }
    
    , mediaPosition: function(position) {
    	if (DigiWebApp.SettingsController.globalDebugMode) console.log('mediaPosition: ' + position);
    }
    
    , onSuccess: function() {
    	if (DigiWebApp.SettingsController.globalDebugMode) console.log('onSuccess');
    	if (DigiWebApp.SettingsController.globalDebugMode) console.log('this.myState = ' + this.myState);
		switch (this.myState) {
			case 'play':
				
				// rewire audioIcon for stopPlayback
				DigiWebApp.DemoAudioPage.content.audioIcon.events = { tap: { action: DigiWebApp.DemoAudioController.stopPlayback } };
				DigiWebApp.DemoAudioPage.content.audioIcon.registerEvents();
				document.getElementById(DigiWebApp.DemoAudioPage.content.audioIcon.id).src = 'theme/images/icon_stop.png';
				
				break;
				
			case 'record':
				
				// rewire audioIcon for stopRecord
		    	DigiWebApp.DemoAudioPage.content.audioIcon.events = { tap: { action: DigiWebApp.DemoAudioController.stopRecord } };
		    	DigiWebApp.DemoAudioPage.content.audioIcon.registerEvents();
		    	document.getElementById(DigiWebApp.DemoAudioPage.content.audioIcon.id).src = 'theme/images/icon_stop.png';

		    	// rewire digi-button to setup a new recording
		    	DigiWebApp.DemoAudioPage.content.grid.button.events = { tap: { action: DigiWebApp.DemoAudioController.init } };
		    	DigiWebApp.DemoAudioPage.content.grid.button.registerEvents();

		    	break;
		    	
			case 'stop':
				
				// rewire audioIcon for playbackAudio
				DigiWebApp.DemoAudioPage.content.audioIcon.events = { tap: { action: DigiWebApp.DemoAudioController.playbackAudio } };
				DigiWebApp.DemoAudioPage.content.audioIcon.registerEvents();
				document.getElementById(DigiWebApp.DemoAudioPage.content.audioIcon.id).src = 'theme/images/icon_playbackAudio.png';
				
				break;
				
			default:

				// rewire audioIcon for playbackAudio
				DigiWebApp.DemoAudioPage.content.audioIcon.events = { tap: { action: DigiWebApp.DemoAudioController.playbackAudio } };
				DigiWebApp.DemoAudioPage.content.audioIcon.registerEvents();
				document.getElementById(DigiWebApp.DemoAudioPage.content.audioIcon.id).src = 'theme/images/icon_playbackAudio.png';

				break;
		}
    }
    
    , onError: function(error) {
    	if (DigiWebApp.SettingsController.globalDebugMode) console.log('onError');
    	console.log('code: '    + error.code    + '\n' + 'message: ' + error.message + '\n');
    	console.log('Filename: ' + this.myFilename);
    	
    	// rewire audioIcon for playbackAudio
    	DigiWebApp.DemoAudioPage.content.audioIcon.events = { tap: { action: DigiWebApp.DemoAudioController.playbackAudio } };
    	DigiWebApp.DemoAudioPage.content.audioIcon.registerEvents();
    	document.getElementById(DigiWebApp.DemoAudioPage.content.audioIcon.id).src = 'theme/images/icon_playbackAudio.png';

    	// rewire digi-button to setup a new recording
    	DigiWebApp.DemoAudioPage.content.grid.button.events = { tap: { action: DigiWebApp.DemoAudioController.init } };
    	DigiWebApp.DemoAudioPage.content.grid.button.registerEvents();
    }
    
    , recordAudio: function() {
    	this.myState = 'record';
    	DigiWebApp.DemoAudioController.myAudioObject.startRecord();

		// rewire audioIcon for stopRecord
    	DigiWebApp.DemoAudioPage.content.audioIcon.events = { tap: { action: DigiWebApp.DemoAudioController.stopRecord } };
    	DigiWebApp.DemoAudioPage.content.audioIcon.registerEvents();
    	document.getElementById(DigiWebApp.DemoAudioPage.content.audioIcon.id).src = 'theme/images/icon_stop.png';

    	// rewire digi-button to setup a new recording
    	DigiWebApp.DemoAudioPage.content.grid.button.events = { tap: { action: DigiWebApp.DemoAudioController.init } };
    	DigiWebApp.DemoAudioPage.content.grid.button.registerEvents();

		if (DigiWebApp.SettingsController.globalDebugMode) console.log('recordAudio');
    	if (DigiWebApp.SettingsController.globalDebugMode) console.log('this.myState = ' + this.myState);
    }
   
    , stopRecord: function() {
    	this.myState = 'stop';
    	DigiWebApp.DemoAudioController.myAudioObject.stopRecord();

    	// rewire audioIcon for playbackAudio
    	DigiWebApp.DemoAudioPage.content.audioIcon.events = { tap: { action: DigiWebApp.DemoAudioController.playbackAudio } };
    	DigiWebApp.DemoAudioPage.content.audioIcon.registerEvents();
    	document.getElementById(DigiWebApp.DemoAudioPage.content.audioIcon.id).src = 'theme/images/icon_playbackAudio.png';

    	if (DigiWebApp.SettingsController.globalDebugMode) console.log('stopRecord');
    	if (DigiWebApp.SettingsController.globalDebugMode) console.log('this.myState = ' + this.myState);
    }
        
    , playbackAudio: function() {
    	this.myState = 'play';
    	DigiWebApp.DemoAudioController.myAudioObject.play();

		// rewire audioIcon for stopPlayback
		DigiWebApp.DemoAudioPage.content.audioIcon.events = { tap: { action: DigiWebApp.DemoAudioController.stopPlayback } };
		DigiWebApp.DemoAudioPage.content.audioIcon.registerEvents();
		document.getElementById(DigiWebApp.DemoAudioPage.content.audioIcon.id).src = 'theme/images/icon_stop.png';

		if (DigiWebApp.SettingsController.globalDebugMode) console.log('playbackAudio');
    	if (DigiWebApp.SettingsController.globalDebugMode) console.log('this.myState = ' + this.myState);
    }
    
    , stopPlayback: function() {
    	this.myState = 'stop';
    	DigiWebApp.DemoAudioController.myAudioObject.stop();
    	
		// rewire audioIcon for playbackAudio
    	DigiWebApp.DemoAudioPage.content.audioIcon.events = { tap: { action: DigiWebApp.DemoAudioController.playbackAudio } };
    	DigiWebApp.DemoAudioPage.content.audioIcon.registerEvents();
    	document.getElementById(DigiWebApp.DemoAudioPage.content.audioIcon.id).src = 'theme/images/icon_playbackAudio.png';

    	if (DigiWebApp.SettingsController.globalDebugMode) console.log('stopPlayback');
    	if (DigiWebApp.SettingsController.globalDebugMode) console.log('this.myState = ' + this.myState);
    }
    
});
