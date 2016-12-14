// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: DigiWebApp
// Controller: RoteAmpelController
// ==========================================================================
// manuell var-checked

DigiWebApp.RoteAmpelController = M.Controller.extend({

	// arrays for selection lists
      orders: null
    , positions: null
    
    , activeOrder: null
    , activePosition: null

    , data: null

	, init: function() {
		DigiWebApp.RoteAmpelController.set('activeOrder', null);
		DigiWebApp.RoteAmpelController.set('activePosition', null);

        // we need to check handOrders also
		var orders = DigiWebApp.HandOrder.findSorted().concat(DigiWebApp.Order.findSorted());
        var positions = DigiWebApp.Position.findSorted();
        
        var itemSelected = NO;
        var orderArray;
        var positionArray;
        if (!DigiWebApp.SettingsController.getSetting("auftragsDetailsKoppeln")) {
	        orderArray = _.map(orders, function(order) {
	        	if (!(order)) {
		            return null;
		        }
	            var obj =  { label: order.get('name'), value: order.get('id') };
	            if ( DigiWebApp.BookingController.currentBooking !== null ) {
	            	if (    (obj.value === DigiWebApp.BookingController.currentBooking.get('orderId'))
	            		 || (obj.value === DigiWebApp.BookingController.currentBooking.get('handOrderId'))
	            	   )
	            	{
	            		obj.isSelected = YES;
	            		itemSelected = YES;
	            		DigiWebApp.RoteAmpelController.set('activeOrder', [order]);
	            	}
	            }
	            return obj;
	        });
	        orderArray = _.compact(orderArray);
	        // "Bitte wählen" zur Auswahlliste hinzufügen
	        if (itemSelected === NO) {
	            orderArray.push({label: M.I18N.l('selectSomething'), value: '0', isSelected:!itemSelected});
	        }
	        
	        itemSelected = NO;
	        positionArray = _.map(positions, function(pos) {
	        	if (!(pos)) {
		            return null;
		        }
	        	if (DigiWebApp.RoteAmpelController.activeOrder !== null) {
	        		if (pos.get('orderId') !== DigiWebApp.RoteAmpelController.activeOrder[0].get('id')) {
	        			return null;
	        		}
	        	} else {
	        		return null;
	        	}
	            var obj = { label: pos.get('name'), value: pos.get('id') };
	           	if ( DigiWebApp.BookingController.currentBooking !== null ) {
	            	if (obj.value === DigiWebApp.BookingController.currentBooking.get('positionId')) {
	            		obj.isSelected = YES;
	            		itemSelected = YES;
	            		DigiWebApp.RoteAmpelController.set('activePosition', [pos]);
	            	}
	            }
	        	return obj;
	        });
	        positionArray = _.compact(positionArray);
	        // "Bitte wählen" zur Auswahlliste hinzufügen
	        if (itemSelected === NO) {
	            positionArray.push({label: M.I18N.l('selectSomething'), value: '0', isSelected:!itemSelected});
	        }
        } else {
	        orderArray = _.map(orders, function(order) {
	        	if (!(order)) {
		            return null;
		        }
	            var obj =  { label: order.get('name'), value: order.get('id') };
            	if (obj.value === M.ViewManager.getView('bookingPage', 'order').getSelection()) {
            		obj.isSelected = YES;
            		itemSelected = YES;
            		DigiWebApp.RoteAmpelController.set('activeOrder', [order]);
            	}
	            return obj;
	        });
	        orderArray = _.compact(orderArray);
	        // "Bitte wählen" zur Auswahlliste hinzufügen
	        if (itemSelected === NO) {
	            orderArray.push({label: M.I18N.l('selectSomething'), value: '0', isSelected:!itemSelected});
	        }
	        
	        itemSelected = NO;
	        positionArray = _.map(positions, function(pos) {
	        	if (!(pos)) {
		            return null;
		        }
	        	if (DigiWebApp.RoteAmpelController.activeOrder !== null) {
	        		if (pos.get('orderId') !== DigiWebApp.RoteAmpelController.activeOrder[0].get('id')) {
	        			return null;
	        		}
	        	} else {
	        		return null;
	        	}
	            var obj = { label: pos.get('name'), value: pos.get('id') };
            	if (obj.value === M.ViewManager.getView('bookingPage', 'position').getSelection()) {
            		obj.isSelected = YES;
            		itemSelected = YES;
            		DigiWebApp.RoteAmpelController.set('activePosition', [pos]);
            	}
	        	return obj;
	        });
	        positionArray = _.compact(positionArray);
	        // push "Bitte wählen Option"
	        if (itemSelected === NO) {
	            positionArray.push({label: M.I18N.l('selectSomething'), value: '0', isSelected:!itemSelected});
	        }
        }

        // set selection arrays to start content binding process
        this.set('orders', orderArray);
        this.set('positions', positionArray);
        
        // Bugfix 2108: Rename in order to be consistent with DSO
        if (DigiWebApp.SettingsController.getSetting('DTC6aktiv')) {
  		  DigiWebApp.ApplicationController.dtc6AktivRenameHelper(
              DigiWebApp.RoteAmpelPage.content.order.id, M.I18N.l('dtc6Ordner'));
  		  DigiWebApp.ApplicationController.dtc6AktivRenameHelper(
              DigiWebApp.RoteAmpelPage.content.position.id, M.I18N.l('dtc6Auftrag'));
        }

        // Specific height of input field
   		M.ViewManager.getView('roteAmpelPage', 'dataInput').setCssProperty("height", "100px");
	}

    , setPositions: function() {
        var orderId = M.ViewManager.getView('roteAmpelPage', 'order').getSelection(YES).value;
        if (!orderId) {
            return;
        }
        var positions = DigiWebApp.Position.findSorted();

        var i = 0;
        positions = _.map(positions, function(pos) {
        	if (!(pos)) {
	            return null;
	        }
            if (parseIntRadixTen(pos.get('orderId')) === parseIntRadixTen(orderId)) {
                var obj = { label: pos.get('name'), value: pos.get('id') };
                if (i === 0) {
                    obj.isSelected = YES;
            		DigiWebApp.RoteAmpelController.set('activePosition', [pos]);
                }
                i += 1;
                return obj;
            }
            return null;
        });
        positions = _.compact(positions);/* remove falsy values from positions with _.compact() */

        if (positions.length < 1) {
            positions.push({label: M.I18N.l('noData'), value: '0'});
            DigiWebApp.RoteAmpelController.set('activePosition', null);
        }

        M.ViewManager.getView('roteAmpelPage', 'position').resetSelection();
        this.set('positions', positions);
    }
});
