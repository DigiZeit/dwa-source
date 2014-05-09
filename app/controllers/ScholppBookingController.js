// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: DigiWebApp
// Controller: ScholppBookingController
// ==========================================================================
// manuell var-checked
DigiWebApp.ScholppBookingController = M.Controller.extend({

	  resetButtons: function() {
		var fahrzeitButton = $('#' + DigiWebApp.BookingPageWithIconsScholpp.content.fahrzeit_arbeitszeit_spezial_ButtonGrid.fahrzeitButtonGrid.button.id)[0];
		var arbeitszeitButton = $('#' + DigiWebApp.BookingPageWithIconsScholpp.content.fahrzeit_arbeitszeit_spezial_ButtonGrid.arbeitszeitButtonGrid.button.id)[0];
		var spezialButton = $('#' + DigiWebApp.BookingPageWithIconsScholpp.content.fahrzeit_arbeitszeit_spezial_ButtonGrid.spezialButtonGrid.button.id)[0];
		var unterbrechungButton = $('#' + DigiWebApp.BookingPageWithIconsScholpp.content.unterbrechung_pause_arbeitsende_ButtonGrid.unterbrechungButtonGrid.button.id)[0];
		var pauseButton = $('#' + DigiWebApp.BookingPageWithIconsScholpp.content.unterbrechung_pause_arbeitsende_ButtonGrid.pauseButtonGrid.button.id)[0];
		var arbeitsendeButton = $('#' + DigiWebApp.BookingPageWithIconsScholpp.content.unterbrechung_pause_arbeitsende_ButtonGrid.arbeitsendeButtonGrid.button.id)[0];
		fahrzeitButton.classList.remove("buttonSelected");
		arbeitszeitButton.classList.remove("buttonSelected");
		spezialButton.classList.remove("buttonSelected");
		unterbrechungButton.classList.remove("buttonSelected");
		pauseButton.classList.remove("buttonSelected");
		arbeitsendeButton.classList.remove("buttonSelected");
	}

	, sleepFor: 500

	, bucheFahrzeitTimeoutvar: null
	, bucheFahrzeit: function() {
		var activities = DigiWebApp.SelectionController.getActivities();
		var activityArray = _.map(activities, function(act) {
		        	if ( typeof(act) === "undefined" ) {
		        		console.log("UNDEFINED ACTIVITY");
		        		return null;
		        	} else {
		        		var obj = null;
		        		if(act.get('name').indexOf("Reisezeit") >= 0 || act.get('name').indexOf("Fahrzeit") >= 0) {
		        			obj = { label: act.get('name'), value: act.get('id'), isSelected: YES };
		        			//itemSelected = YES;
		        		} else {
		        			obj = { label: act.get('name'), value: act.get('id') };
		        		}
		        		return obj;
		        	}
		        });
		DigiWebApp.SelectionController.set('activities', activityArray);
		if (DigiWebApp.BookingController.checkBooking()) { // was YES
			DigiWebApp.ScholppBookingController.selectFahrzeit();
			DigiWebApp.ScholppBookingController.bucheFahrzeitTimeoutvar = setTimeout("DigiWebApp.ScholppBookingController.doBucheFahrzeit()",this.sleepFor);
		}
	}
	, doBucheFahrzeit: function() {
		if (DigiWebApp.ScholppBookingController.bucheFahrzeitTimeoutvar !== null) clearTimeout(DigiWebApp.ScholppBookingController.bucheFahrzeitTimeoutvar);
		DigiWebApp.BookingController.book();
		DigiWebApp.SelectionController.saveSelection();
	}
	
	, bucheArbeitszeitTimeoutvar: null
	, bucheArbeitszeit: function() {
		var activities = DigiWebApp.SelectionController.getActivities();
		var activityArray = _.map(activities, function(act) {
		        	if ( typeof(act) === "undefined" ) {
		        		console.log("UNDEFINED ACTIVITY");
		        		return null;
		        	} else {
		        		var obj = null;
		        		if(act.get('name').indexOf("Arbeitszeit") >= 0) {
		        			obj = { label: act.get('name'), value: act.get('id'), isSelected: YES };
		        			//itemSelected = YES;
		        		} else {
		        			obj = { label: act.get('name'), value: act.get('id') };
		        		}
		        		return obj;
		        	}
		        });
		DigiWebApp.SelectionController.set('activities', activityArray);
		if (DigiWebApp.BookingController.checkBooking()) { // was YES
			DigiWebApp.ScholppBookingController.selectArbeitszeit();
			DigiWebApp.ScholppBookingController.bucheArbeitszeitTimeoutvar = setTimeout("DigiWebApp.ScholppBookingController.doBucheArbeitszeit()",this.sleepFor);
		}
	}
	, doBucheArbeitszeit: function() {
		if (DigiWebApp.ScholppBookingController.bucheArbeitszeitTimeoutvar !== null) clearTimeout(DigiWebApp.ScholppBookingController.bucheArbeitszeitTimeoutvar);
		DigiWebApp.BookingController.book();
		DigiWebApp.SelectionController.saveSelection();
	}

	, bucheUnterbrechungTimeoutvar: null
	, bucheUnterbrechung: function() {
		var activities = DigiWebApp.SelectionController.getActivities();
		var activityArray = _.map(activities, function(act) {
		        	if ( typeof(act) === "undefined" ) {
		        		console.log("UNDEFINED ACTIVITY");
		        		return null;
		        	} else {
		        		var obj = null;
		        		if(act.get('name').indexOf("Unterbrechung") >= 0) {
		        			obj = { label: act.get('name'), value: act.get('id'), isSelected: YES };
		        			//itemSelected = YES;
		        		} else {
		        			obj = { label: act.get('name'), value: act.get('id') };
		        		}
		        		return obj;
		        	}
		        });
		DigiWebApp.SelectionController.set('activities', activityArray);
		if (DigiWebApp.BookingController.checkBooking()) { // was YES
			DigiWebApp.ScholppBookingController.selectUnterbrechung();
			DigiWebApp.ScholppBookingController.bucheUnterbrechungTimeoutvar = setTimeout("DigiWebApp.ScholppBookingController.doBucheUnterbrechung()",this.sleepFor);
		}
	}
	, doBucheUnterbrechung: function() {
		if (DigiWebApp.ScholppBookingController.bucheUnterbrechungTimeoutvar !== null) clearTimeout(DigiWebApp.ScholppBookingController.bucheUnterbrechungTimeoutvar);
		DigiWebApp.BookingController.book();
		DigiWebApp.SelectionController.saveSelection();
	}
	
	, buchePauseTimeoutvar: null
	, buchePause: function() {
		var activities = DigiWebApp.SelectionController.getActivities();
		var activityArray = _.map(activities, function(act) {
		        	if ( typeof(act) === "undefined" ) {
		        		console.log("UNDEFINED ACTIVITY");
		        		return null;
		        	} else {
		        		var obj = null;
		        		if(act.get('name').indexOf("Pause") >= 0) {
		        			obj = { label: act.get('name'), value: act.get('id'), isSelected: YES };
		        			//itemSelected = YES;
		        		} else {
		        			obj = { label: act.get('name'), value: act.get('id') };
		        		}
		        		return obj;
		        	}
		        });
		DigiWebApp.SelectionController.set('activities', activityArray);
		if (DigiWebApp.BookingController.checkBooking()) { // was YES
			DigiWebApp.ScholppBookingController.selectPause();
			DigiWebApp.ScholppBookingController.buchePauseTimeoutvar = setTimeout("DigiWebApp.ScholppBookingController.doBuchePause()",this.sleepFor);
		}
	}
	, doBuchePause: function() {
		if (DigiWebApp.ScholppBookingController.buchePauseTimeoutvar !== null) clearTimeout(DigiWebApp.ScholppBookingController.buchePauseTimeoutvar);
		DigiWebApp.BookingController.book();
		DigiWebApp.SelectionController.saveSelection();
	}

	, bucheArbeitsendeTimeoutvar: null
	, bucheArbeitsende: function() {
		DigiWebApp.ScholppBookingController.selectArbeitsende();
		DigiWebApp.ScholppBookingController.bucheArbeitsendeTimeoutvar = setTimeout("DigiWebApp.ScholppBookingController.doBucheArbeitsende()",this.sleepFor);
	}
	, doBucheArbeitsende: function() {
		if (DigiWebApp.ScholppBookingController.bucheArbeitsendeTimeoutvar !== null) clearTimeout(DigiWebApp.ScholppBookingController.bucheArbeitsendeTimeoutvar);
		DigiWebApp.BookingController.closeDay();
		DigiWebApp.SelectionController.resetSelection();
	}
	
	, selectFahrzeit: function() {
		DigiWebApp.ScholppBookingController.resetButtons();
		var fahrzeitButton = $('#' + DigiWebApp.BookingPageWithIconsScholpp.content.fahrzeit_arbeitszeit_spezial_ButtonGrid.fahrzeitButtonGrid.button.id)[0];
		fahrzeitButton.classList.add("buttonSelected");
	}
	
	, selectArbeitszeit: function() {
		DigiWebApp.ScholppBookingController.resetButtons();
		var arbeitszeitButton = $('#' + DigiWebApp.BookingPageWithIconsScholpp.content.fahrzeit_arbeitszeit_spezial_ButtonGrid.arbeitszeitButtonGrid.button.id)[0];
		arbeitszeitButton.classList.add("buttonSelected");
	}

	, selectUnterbrechung: function() {
		DigiWebApp.ScholppBookingController.resetButtons();
		var unterbrechungButton = $('#' + DigiWebApp.BookingPageWithIconsScholpp.content.unterbrechung_pause_arbeitsende_ButtonGrid.unterbrechungButtonGrid.button.id)[0];
		unterbrechungButton.classList.add("buttonSelected");
	}
	
	, selectPause: function() {
		DigiWebApp.ScholppBookingController.resetButtons();
		var pauseButton = $('#' + DigiWebApp.BookingPageWithIconsScholpp.content.unterbrechung_pause_arbeitsende_ButtonGrid.pauseButtonGrid.button.id)[0];
		pauseButton.classList.add("buttonSelected");
	}

	, selectArbeitsende: function() {
		DigiWebApp.ScholppBookingController.resetButtons();
		var arbeitsendeButton = $('#' + DigiWebApp.BookingPageWithIconsScholpp.content.unterbrechung_pause_arbeitsende_ButtonGrid.arbeitsendeButtonGrid.button.id)[0];
		arbeitsendeButton.classList.add("buttonSelected");
	}
});
