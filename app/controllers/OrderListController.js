// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: DigiWebApp
// Controller: OrderListController
// ==========================================================================

DigiWebApp.OrderListController = M.Controller.extend({

	  items: null
	
	, itemsToUse: null
	  
	, buttonToUpdate: null
	
	, latestId: null
	
	, backToPage: null
	
	, init: function(withPositions) {
		var that = this;
		that.backToPage = null;
		var itemsToUse = [];
		_.each(DigiWebApp.HandOrder.getByVaterId(that.latestId), function(o) {
			itemsToUse.push({
				  icon: '48x48_plain_folder_closed.png'
				, label: o.name
			});
		});
		_.each(DigiWebApp.Order.getByVaterId(that.latestId), function(o) {
			itemsToUse.push({
				  icon: '48x48_plain_handauftrag.png'
				, label: o.name
			});
		});
		_.each(DigiWebApp.Position.getByVaterId(that.latestId), function(o) {
			itemsToUse.push({
				  icon: '48x48_plain_document.png'
				, label: o.name
			});
		});
		that.set('itemsToUse', );
		that.items = [];
		_.each(that.itemsToUse, function(el){
			if (el.label != M.I18N.l('selectSomething')) {
				that.items.push(el);
			}
		});
		that.set('items', that.items);
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
