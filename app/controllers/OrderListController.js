// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: DigiWebApp
// Controller: OrderListController
// ==========================================================================

DigiWebApp.OrderListController = M.Controller.extend({

	  items: null
	
	, successHandler: function() {
		var that = this;
		// falls kein successHandler übergeben wurde im Zweifel errorHandler aufrufen 
		that.errorHandler();
	}

	, errorHandler: function() {
		var that = this;
		// falls kein errorHandler übergeben wurde im Zweifel zurück zur BookingPage 
		DigiWebApp.NavigationController.backToBookTimePagePOP();
	}
	
	, latestId: null
		
	, onlyFolders: NO
	
	, parentStack: null
	
	, useFolderIcon: '48x48_plain_folder_ok.png'
	, folderUpIcon: '48x48_plain_folder_up.png'
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

	, reloadItems: function(selectedObjId) {
		var that = this;
		if (that.parentStack == null) that.init(that.onlyFolders, that.successHandler, that.errorHandler);
		var items = [];
		// parent-folders from stack
		if (that.parentStack.length > 0) {
			var o = that.parentStack[that.parentStack.length - 1];
			items.push({
				  icon: that.folderUpIcon
				, label: M.I18N.l('eineEbeneHoeher')
				, obj: o.obj
			});
		}
		var vaterId = null;
		var order = DigiWebApp.Order.getById(selectedObjId);
		if (typeof(order) != "undefined" && order != null) {
			vaterId = order.get("id");
		}
		_.each(DigiWebApp.Order.getByVaterId(vaterId), function(o) {
			if (that.onlyFolders || o.hasPositions()) {
				items.push({
					  icon: that.closedFolderIcon
					, label: o.get('name')
					, obj: o
				});
			}
		});
		if (!that.onlyFolders) {
			_.each(DigiWebApp.HandOrder.getByVaterId(vaterId), function(o) {
				items.push({
					  icon: that.handOrderIcon
					, label: o.get('name')
					, obj: o
				});
			});
			_.each(DigiWebApp.Position.getByVaterId(vaterId), function(o) {
				items.push({
					  icon: that.orderIcon
					, label: o.get('name')
					, obj: o
				});
			});
		} else {
			var o = null;
			if (that.parentStack.length > 0) o = that.parentStack[that.parentStack.length - 1].obj;
			items.push({
				  icon: that.useFolderIcon
				, label: M.I18N.l('diesenOrdnerVerwenden')
				, obj: o
			});
		}
		DigiWebApp.OrderListPage.header.title.setValue(that.getTitle());
		that.set('items', items);
	}
	
	, init: function(onlyFolders, successHandler, errorHandler, startInFolderId) {
		var that = this;
		that.parentStack = [];
		if (typeof(onlyFolders) != "undefined") that.onlyFolders = parseBool(onlyFolders);
		if (typeof(successHandler) != "undefined") that.successHandler = successHandler;
		if (typeof(errorHandler) != "undefined") that.errorHandler = errorHandler;
		if (startInFolderId) {
			var allOrders = DigiWebApp.Order.find();
			// rebuild parentStack
			var done = false;
			var parentStack = [];
			var folderId = startInFolderId;
			var arr = _.filter(allOrders, function(o){ 
				return parseIntRadixTen(o.get("id")) == parseIntRadixTen(folderId);
			});
			if (arr && arr.length > 0) {
				parentStack.push({
					  	  icon: that.closedFolderIcon
							, label: arr[0].get('name')
							, obj: arr[0]
						});
			}
			while (!done) {
				var arr = _.filter(allOrders, function(o){ 
					return parseIntRadixTen(o.get("id")) == parseIntRadixTen(folderId);
				});
				if (arr && arr.length > 0) {
					var parentArr = _.filter(allOrders, function(o){ 
						return parseIntRadixTen(o.get("id")) == parseIntRadixTen(arr[0].get("vaterId"));
					});
					if (parentArr && parentArr.length > 0) {
						var parentItem = {
								  	  icon: that.closedFolderIcon
									, label: parentArr[0].get('name')
									, obj: parentArr[0]
								};
						parentStack.push(parentItem);
						folderId = parentArr[0].get("id");
						//var vaterId = parentArr[0].get("vaterId");
						//if (!vaterId || vaterId <= 0) done = true;
					} else {
						done = true;
					}
				} else {
					done = true;
				}
				if (done) that.set('parentStack', parentStack.reverse());
			}
			that.reloadItems(startInFolderId);
		} else {
			that.reloadItems(null);
		}
	}

	, itemSelected: function(id, m_id) {
		var that = this;		

		try{DigiWebApp.ApplicationController.vibrate();}catch(e2){}		

		if (this.latestId) $('#' + this.latestId).removeClass('selected');
	    $('#' + id).addClass('selected');
	    this.latestId = id;
	
	    var selectedItem = that.items[m_id];
	    if (selectedItem.icon == that.folderUpIcon) {
	    	// remove this folder from stack
	    	that.parentStack.pop();
	    	if (that.parentStack.length > 0) {
	    		selectedItem = that.parentStack[that.parentStack.length - 1];
	    	} else {
	    		// restart with root-folder
	    	    return that.init(that.onlyFolders, that.successHandler, that.errorHandler);
	    	}
	    } else if (selectedItem.icon == that.closedFolderIcon) {
		    // put this folder on the stack
		    that.parentStack.push(selectedItem);	    	
	    }
	    
	    if (selectedItem.icon == that.orderIcon
	     || selectedItem.icon == that.handOrderIcon
	     || (that.onlyFolders && selectedItem.icon == that.useFolderIcon)
	    ) {
	    	//that.buttonToUpdate.setValue(selectedItem.label);
	    	return that.successHandler(selectedItem.obj);
	    }
	    	    
	    // reload items from next folder
		that.reloadItems(selectedItem.obj.get("id"));
		
	}
	
});
