// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: DigiWebApp
// Controller: ActivityListController
// ==========================================================================

DigiWebApp.ActivityListController = M.Controller.extend({

	  items: null
	  
	, comboBoxToUpdate: null
	
	, latestId: null
	
	, init: function(isFirstLoad) {
	}

	, itemSelected: function(id, m_id) {
		try{DigiWebApp.ApplicationController.vibrate();}catch(e2){}
		var that = this;
	    if (this.latestId) {
	        $('#' + this.latestId).removeClass('selected');
	    }
	    $('#' + id).addClass('selected');
	    
	    this.latestId = id;
	
	    this.comboBoxToUpdate.setSelection(id);
	    history.back();
	}

});
