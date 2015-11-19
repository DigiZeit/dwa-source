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
	
	, selectedObjId: null
	
	, backToPage: null
	
	, onlyFolders: NO
	
	, parentStack: null
	
	, reloadItems: function() {
		var that = this;
		if (that.parentStack == null) that.init(NO);
		var items = [];
		// parent-folders from stack
		_.each(DigiWebApp.Order.getByVaterId(that.selectedObjId), function(o) {
			items.push({
				  icon: '48x48_plain_folder_closed.png'
				, label: o.get('name')
				, obj: o
			});
		});
		if (!that.onlyFolders) {
			_.each(DigiWebApp.HandOrder.getByVaterId(that.selectedObjId), function(o) {
				items.push({
					  icon: '48x48_plain_handauftrag.png'
					, label: o.get('name')
					, obj: o
				});
			});
			_.each(DigiWebApp.Position.getByVaterId(that.selectedObjId), function(o) {
				items.push({
					  icon: '48x48_plain_document.png'
					, label: o.get('name')
					, obj: o
				});
			});
		}
		that.set('items', items);
	}
	
	, init: function(onlyFolders) {
		var that = this;
		that.backToPage = null;
		that.selectedObjId = null;
		that.parentStack = [];
		that.onlyFolders = onlyFolders;
		that.reloadItems();
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
	    that.selectedObjId = selecteditem.obj.get("id");
	    that.buttonToUpdate.setValue(selectedItem.value);
	    
	    // put this folder on the stack
	    
	    // reload items from next folder
		that.reloadItems();
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
