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
	
	, useFolderIcon: '48x48_plain_folder_ok.png'
	, openFolderIcon: '48x48_plain_folder.png'
	, closedFolderIcon: '48x48_plain_folder_closed.png'
	, orderIcon: '48x48_plain_document.png'
	, handOrderIcon: '48x48_plain_handauftrag.png'

	, getTitle: function() {
		var that = this;
		if (that.parentStack.length > 0) {
			return that.parentStack[that.parentStack.length - 1].label;
		}
		if (that.onlyFolders) {
			return M.I18N.l('ordnerAuswaehlen');
		}
		return M.I18N.l('auftragAuswaehlen');
	}

	, reloadItems: function() {
		var that = this;
		if (that.parentStack == null) that.init(NO);
		var items = [];
		// parent-folders from stack
		if (that.parentStack.length > 0) {
			var o = that.parentStack[that.parentStack.length - 1];
			items.push({
				  icon: that.openFolderIcon
				, label: '..'
				, obj: o.obj
			});
		}
		_.each(DigiWebApp.Order.getByVaterId(that.selectedObjId), function(o) {
			if (that.onlyFolders || o.hasElements()) {
				items.push({
					  icon: that.closedFolderIcon
					, label: o.get('name')
					, obj: o
				});
			}
		});
		if (!that.onlyFolders) {
			_.each(DigiWebApp.HandOrder.getByVaterId(that.selectedObjId), function(o) {
				items.push({
					  icon: that.handOrderIcon
					, label: o.get('name')
					, obj: o
				});
			});
			_.each(DigiWebApp.Position.getByVaterId(that.selectedObjId), function(o) {
				items.push({
					  icon: that.orderIcon
					, label: o.get('name')
					, obj: o
				});
			});
		} else {
			var o = null;
			if (that.parentStack.length > 0) that.parentStack[that.parentStack.length - 1];
			items.push({
				  icon: that.useFolderIcon
				, label: M.I18N.l('diesenOrdnerVerwenden')
				, obj: o
			});
		}
		DigiWebApp.OrderListPage.header.title.setValue(that.getTitle());
		that.set('items', items);
	}
	
	, init: function(onlyFolders, buttonToUpdate, backToPage) {
		var that = this;
		that.onlyFolders = onlyFolders;
		that.buttonToUpdate = null;
		if (buttonToUpdate) that.buttonToUpdate = buttonToUpdate;
		that.backToPage = null;
		if (backToPage) that.backToPage = backToPage;
		that.selectedObjId = null;
		that.parentStack = [];
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
	    var done = false;
	    if (selectedItem.icon == that.openFolderIcon) {
	    	// remove this folder from stack
	    	that.parentStack.pop();
	    	if (that.parentStack.length > 0) {
	    		selectedItem = that.parentStack[that.parentStack.length - 1];
	    	} else {
	    	    return that.init(that.onlyFolders, that.buttonToUpdate, that.backToPage);
	    	}
	    } else if (selectedItem.icon == that.closedFolderIcon) {
		    // put this folder on the stack
		    that.parentStack.push(selectedItem);	    	
	    } else {
	    	done = true;
	    }
	    that.selectedObjId = selectedItem.obj.get("id");
	    
	    if (selectedItem.icon == that.orderIcon
	     || selectedItem.icon == that.handOrderIcon
	     || (that.onlyFolders && selectedItem.icon == that.useFolderIcon)
	    ) {
	    	that.buttonToUpdate.setValue(selectedItem.label);
	    }
	    	    
	    if (done) {
	    	that.back();
	    } else {
		    // reload items from next folder
			that.reloadItems();
	    }
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
