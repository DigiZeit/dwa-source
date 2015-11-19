// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: DigiWebApp
// Controller: OrderListController
// ==========================================================================

DigiWebApp.OrderListController = M.Controller.extend({

	  items: null
	
	, buttonToUpdate: null
	
	, latestId: null
	
	, backToPage: null
	
	, init: function(withPositions) {
		var that = this;
		that.backToPage = null;
		var items = [];
		_.each(DigiWebApp.HandOrder.getByVaterId(that.latestId), function(o) {
			items.push({
				  icon: '48x48_plain_folder_closed.png'
				, label: o.name
			});
		});
		_.each(DigiWebApp.Order.getByVaterId(that.latestId), function(o) {
			items.push({
				  icon: '48x48_plain_handauftrag.png'
				, label: o.name
			});
		});
		_.each(DigiWebApp.Position.getByVaterId(that.latestId), function(o) {
			items.push({
				  icon: '48x48_plain_document.png'
				, label: o.name
			});
		});
		that.set('items', items);
	}

	, itemSelected: function(id, m_id) {

		try{DigiWebApp.ApplicationController.vibrate();}catch(e2){}
		var that = this;
	    if (this.latestId) {
	        $('#' + this.latestId).removeClass('selected');
	    }
	    $('#' + id).addClass('selected');
	    
	    this.latestId = id;
	
	    var selectedItem = that.items[m_id];
	    that.buttonToUpdate.setValue(selectedItem.value);
	    
	    // TODO: reload OrderListPage with new folder
	}
	
	, back: function() {
		var that = this;
		if (that.backToPage == null) {
			DigiWebApp.NavigationController.backToBookTimePagePOP();
		} else {
			DigiWebApp.NavigationController.switchToPage(that.backToPage, M.TRANSITION.POP, YES);
		}
	}

});
