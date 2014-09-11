// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: DigiWebApp
// Controller: ActivityListController
// ==========================================================================

DigiWebApp.ActivityListController = M.Controller.extend({

	  items: null
	
	, itemsToUse: null
	  
	, comboBoxToUpdate: null
	
	, latestId: null
	
	, init: function(isFirstLoad) {
		var that = this;
		//that.set('items', that.itemsToUse);
		that.items = [];
		_.each(that.itemsToUse, function(el){
			if (el.label != M.I18N.l('selectSomething')) {
				that.items.push(el);
			}
		});
		that.set('items', that.items);
	}

	, itemSelected: function(id, m_id) {
		console.log(id, m_id);
		try{DigiWebApp.ApplicationController.vibrate();}catch(e2){}
		var that = this;
	    if (this.latestId) {
	        $('#' + this.latestId).removeClass('selected');
	    }
	    $('#' + id).addClass('selected');
	    
	    this.latestId = id;
	
	    this.comboBoxToUpdate.setSelection(m_id);
	    history.back();
	}

});
