// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: DigiWebApp
// Controller: OrderInfoController
// ==========================================================================
// manuell var-checked
DigiWebApp.OrderInfoController = M.Controller.extend({

	// arrays for selection lists
      orders: null
    , positions: null
    
    , activeOrder: null
    , activePosition: null
    , items: []
    //, debugitems: []

    /*
    * Sample function
    * To handle the first load of a page.
    */
    , init: function(isFirstLoad) {
        if (isFirstLoad) {
            /* do something here, when page is loaded the first time. */
        }

		DigiWebApp.OrderInfoController.set('activeOrder', null);
		DigiWebApp.OrderInfoController.set('activePosition', null);
		DigiWebApp.OrderInfoController.set('items', []);

		var orders = DigiWebApp.HandOrder.findSorted().concat(DigiWebApp.Order.findSorted()); // we need to check handOrders also
        var positions = DigiWebApp.Position.findSorted();
        
        var itemSelected = NO;
        var orderArray;
        var positionArray;
        if (!DigiWebApp.SettingsController.getSetting("auftragsDetailsKoppeln")) {
	        orderArray = _.map(orders, function(order) {
	        	if (!(order)) return;
	            var obj =  { label: order.get('name'), value: order.get('id') };
	            if ( DigiWebApp.BookingController.currentBooking !== null ) {
	            	if (    (obj.value === DigiWebApp.BookingController.currentBooking.get('orderId'))
	            		 || (obj.value === DigiWebApp.BookingController.currentBooking.get('handOrderId'))
	            	   )
	            	{
	            		obj.isSelected = YES;
	            		itemSelected = YES;
	            		DigiWebApp.OrderInfoController.set('activeOrder', [order]);
	            	}
	            }
	            return obj;
	        });
	        orderArray = _.compact(orderArray);
	        // push "Bitte wählen Option"
	        if (itemSelected === NO) orderArray.push({label: M.I18N.l('selectSomething'), value: '0', isSelected:!itemSelected});
	        
	        itemSelected = NO;
	        positionArray = _.map(positions, function(pos) {
	        	if (!(pos)) return;
	        	if (DigiWebApp.OrderInfoController.activeOrder !== null) {
	        		if (pos.get('orderId') !== DigiWebApp.OrderInfoController.activeOrder[0].get('id')) {
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
	            		DigiWebApp.OrderInfoController.set('activePosition', [pos]);
	            	}
	            }
	        	return obj;
	        });
	        positionArray = _.compact(positionArray);
	        // push "Bitte wählen Option"
	        if (itemSelected === NO) positionArray.push({label: M.I18N.l('selectSomething'), value: '0', isSelected:!itemSelected});
        } else {
	        orderArray = _.map(orders, function(order) {
	        	if (!(order)) return;
	            var obj =  { label: order.get('name'), value: order.get('id') };
            	if (obj.value === M.ViewManager.getView('bookingPage', 'order').getSelection()) {
            		obj.isSelected = YES;
            		itemSelected = YES;
            		DigiWebApp.OrderInfoController.set('activeOrder', [order]);
            	}
	            return obj;
	        });
	        orderArray = _.compact(orderArray);
	        // push "Bitte wählen Option"
	        if (itemSelected === NO) orderArray.push({label: M.I18N.l('selectSomething'), value: '0', isSelected:!itemSelected});
	        
	        itemSelected = NO;
	        positionArray = _.map(positions, function(pos) {
	        	if (!(pos)) return;
	        	if (DigiWebApp.OrderInfoController.activeOrder !== null) {
	        		if (pos.get('orderId') !== DigiWebApp.OrderInfoController.activeOrder[0].get('id')) {
	        			return null;
	        		}
	        	} else {
	        		return null;
	        	}
	            var obj = { label: pos.get('name'), value: pos.get('id') };
            	if (obj.value === M.ViewManager.getView('bookingPage', 'position').getSelection()) {
            		obj.isSelected = YES;
            		itemSelected = YES;
            		DigiWebApp.OrderInfoController.set('activePosition', [pos]);
            	}
	        	return obj;
	        });
	        positionArray = _.compact(positionArray);
	        // push "Bitte wählen Option"
	        if (itemSelected === NO) positionArray.push({label: M.I18N.l('selectSomething'), value: '0', isSelected:!itemSelected});
        }

        // set selection arrays to start content binding process
        this.set('orders', orderArray);
        this.set('positions', positionArray);
        
        this.setItem();
        // Bugfix 2108: Rename in order to be consistent with DSO
        if (DigiWebApp.SettingsController.getSetting('DTC6aktiv')) {
  		  DigiWebApp.ApplicationController.dtc6AktivRenameHelper(DigiWebApp.OrderInfoPage.selectionContent.order.id, M.I18N.l('dtc6Ordner'));
  		  DigiWebApp.ApplicationController.dtc6AktivRenameHelper(DigiWebApp.OrderInfoPage.selectionContent.position.id, M.I18N.l('dtc6Auftrag'));
        }
    }

    , setItem: function() {
        var item_empty = { 
        		  orderName: ''
        		, positionName: ''
            	, positionStrasse: ''
            	, positionHausnummer: ''
            	, positionPLZ: ''
            	, positionOrt: ''
                , positionLand: ''
            	, positionStrasseUndHausnummer: '' 
            	, positionPLZundOrt: ''
        		, positionCountryCode: ''
        		, positionTelefon: ''
        		, positionFax: ''
        		, positionEmail: ''
        		, positionAnsprechpartner: ''
        		, positionKundenname: ''
        		, positionLongitude: ''
        		, positionLatitude: ''
        		, positionBeschreibung: ''
        		, arbeitsbeginn: ''
        		, arbeitsende: ''
        	};
        var item = item_empty;
		if (DigiWebApp.OrderInfoController.activeOrder !== null) item.orderName = DigiWebApp.OrderInfoController.activeOrder[0].get('name');
		if (DigiWebApp.OrderInfoController.activePosition !== null) {
			item.positionName = DigiWebApp.OrderInfoController.activePosition[0].get('name');
			item.positionStrasse = DigiWebApp.OrderInfoController.activePosition[0].get('strasse');
			item.positionHausnummer = DigiWebApp.OrderInfoController.activePosition[0].get('hausnummer');
			item.positionPLZ = DigiWebApp.OrderInfoController.activePosition[0].get('plz');
			item.positionOrt = DigiWebApp.OrderInfoController.activePosition[0].get('ort');
			item.positionLand = DigiWebApp.OrderInfoController.activePosition[0].get('land');
			item.positionTelefon = DigiWebApp.OrderInfoController.activePosition[0].get('telefon');
			item.positionFax = DigiWebApp.OrderInfoController.activePosition[0].get('fax');
			item.positionEmail = DigiWebApp.OrderInfoController.activePosition[0].get('email');
			item.positionAnsprechpartner = DigiWebApp.OrderInfoController.activePosition[0].get('ansprechpartner');
			item.positionKundenname = DigiWebApp.OrderInfoController.activePosition[0].get('kundenname');
			item.positionLongitude = DigiWebApp.OrderInfoController.activePosition[0].get('longitude');
			item.positionLatitude = DigiWebApp.OrderInfoController.activePosition[0].get('latitude');
			item.positionBeschreibung = DigiWebApp.OrderInfoController.activePosition[0].get('description');
			item.positionCountryCode = DigiWebApp.OrderInfoController.activePosition[0].get('countrycode');
			item.positionPLZundOrt = item.positionPLZ + " " + item.positionOrt;
			item.positionStrasseUndHausnummer = item.positionStrasse + " " + item.positionHausnummer;
			item.arbeitsbeginn = DigiWebApp.OrderInfoController.activePosition[0].get('arbeitsbeginn');
			item.arbeitsende = DigiWebApp.OrderInfoController.activePosition[0].get('arbeitsende');
		}

		if (item.orderName === '' && item.positionName === '') {
			DigiWebApp.OrderInfoController.set('items', []);
		} else {
			DigiWebApp.OrderInfoController.set('items', [item]);
		}
    }
    
    , setPositions: function() {
        var orderId = M.ViewManager.getView('orderInfoPage', 'order').getSelection(YES).value;
        if(!orderId) {
            return;
        }
        var positions = DigiWebApp.Position.findSorted();

        var i = 0;
        positions = _.map(positions, function(pos) {
        	if (!(pos)) return;
            if (parseIntRadixTen(pos.get('orderId')) === parseIntRadixTen(orderId)) {
                var obj = { label: pos.get('name'), value: pos.get('id') };
                if(i === 0) {
                    obj.isSelected = YES;
            		DigiWebApp.OrderInfoController.set('activePosition', [pos]);
                }
                i += 1;
                return obj;
            }
            return null;
        });
        positions = _.compact(positions);/* remove falsy values from positions with _.compact() */

        if (positions.length < 1) {
            positions.push({label: M.I18N.l('noData'), value: '0'});
            DigiWebApp.OrderInfoController.set('activePosition', null);
        }

        M.ViewManager.getView('orderInfoPage', 'position').resetSelection();
        this.set('positions', positions);
        this.setItem();
    }

    , saveAsContact: function() {
    	// are we on a mobile device with navigator.contacts?
    	if (typeof(navigator.contacts) === "undefined") {
    		DigiWebApp.ApplicationController.nativeAlertDialogView({
    			  title: M.I18N.l('saveAsContact')
    			, message: M.I18N.l('noContactsAvailable')
    		});
    		return;
    	}
    	var item = DigiWebApp.OrderInfoController.items[0];
    	//if (DigiWebApp.SettingsController.globalDebugMode) console.log("searching contact for orderName=" + item.orderName + ", positionName=" + item.positionName);
    	// try to load the contact to prevent duplicates
    	var options = new ContactFindOptions();
    	options.filter = item.orderName + ", " + item.positionName; 
    	var fields = ["displayName", "name", "givenName", "familyName"];
		DigiWebApp.ApplicationController.DigiLoaderView.show(M.I18N.l('saveAsContact'));
		navigator.contacts.find(
            fields,
            DigiWebApp.OrderInfoController.saveAsContactFound,
            DigiWebApp.OrderInfoController.saveAsContactFoundError,
            options);
    	return;
    }

    , saveAsContactFound: function(contacts) {
    	var item = DigiWebApp.OrderInfoController.items[0];
    	DigiWebApp.ApplicationController.DigiLoaderView.hide();
    	if (typeof(contacts) === "undefined") {
        	// create new contact
        	if (inDebug()) {
        	    writeToLog("Creating new contact for orderName=" + item.orderName
                    + ", positionName=" + item.positionName);
	        }
        	var myContact = navigator.contacts.create({
        		//displayName: The name of this Contact, suitable for display to end-users. (DOMString)
        		"displayName": M.I18N.l('orderInfo') + " " + item.orderName
        	});
    		return DigiWebApp.OrderInfoController.saveAsContactSave(myContact);
    		
    	} else {

    		if (contacts.length === 0) {
            	// create new contact
            	if (inDebug()) {
            	    writeToLog("Creating new contact for orderName=" + item.orderName
                        + ", positionName=" + item.positionName);
	            }
            	var myContact = navigator.contacts.create({
            		//displayName: The name of this Contact, suitable for display to end-users. (DOMString)
            		"displayName": M.I18N.l('orderInfo') + " " + item.orderName + ", " + item.positionName
            	});
        		return DigiWebApp.OrderInfoController.saveAsContactSave(myContact);
    		} else if (contacts.length > 1) {
				DigiWebApp.ApplicationController.nativeAlertDialogView({
					title: M.I18N.l('saveAsContact'),
					message: M.I18N.l('contactExistsMultiple')
				});
				return;
	    	} else {
	    		var changeMsg = M.I18N.l('saveAsContactChangeQuestionMsg');
	    		DigiWebApp.ApplicationController.nativeConfirmDialogView({
	            	  title: M.I18N.l('saveAsContactChangeQuestionTitle')
    		        , message: changeMsg
		            , confirmButtonValue: M.I18N.l('yes')
            		, cancelButtonValue: M.I18N.l('no')
            		, callbacks: {
                		  confirm: {
                    		  target: this
                    		, action: function() {
					    	    //console.log(contacts[0]);
					    	    if (inDebug()) {
					    	        writeToLog("Using contact[0] for orderName=" + item.orderName
                                        + ", positionName=" + item.positionName);
						        }
					    	    //return DigiWebApp.OrderInfoController.saveAsContactSave(contacts[0]);
	    						var myContactFound = contacts[0];
	    						myContactFound.remove(
                                    DigiWebApp.OrderInfoController.contactRemoveSuccess,
                                    DigiWebApp.OrderInfoController.contactRemoveError);
	    					}
                		}
                		, cancel: {
                    		  target: this
                    		, action: function() {
                        		return;
                    		}
                		}
            		}
        		});
	    	}
    	}
    }
    
    , contactRemoveSuccess: function() {
    	var item = DigiWebApp.OrderInfoController.items[0];
		// create new contact
    	if (inDebug()) {
    	    writeToLog("Contact successfully removed, creating new contact for orderName="
                + item.orderName + ", positionName=" + item.positionName);
	    }
    	var myContact = navigator.contacts.create({
    		//displayName: The name of this Contact, suitable for display to end-users. (DOMString)
    		"displayName": M.I18N.l('orderInfo') + " " + item.orderName
    	});
		return DigiWebApp.OrderInfoController.saveAsContactSave(myContact);
    }
    
    , contactRemoveError: function() {
		DigiWebApp.ApplicationController.nativeAlertDialogView({
			  title: M.I18N.l('saveAsContact')
			, message: M.I18N.l('saveAsContactChangeErrorMsg')
		});
    }
    
    , saveAsContactFoundError: function() {
		DigiWebApp.ApplicationController.nativeAlertDialogView({
			  title: M.I18N.l('saveAsContact')
			, message: M.I18N.l('error')
		});
		return;
    }
    
    , saveAsContactSave: function(myContact) {
        if (inDebug()) {
            writeToLog('OrderInfoController.saveAsContactSave()');
            writeToLog(myContact);
        }
    	var item = DigiWebApp.OrderInfoController.items[0];
        
		//id: A globally unique identifier. (DOMString)
        //myContact.id = "DIGI-WebApp_" + order.get('id');
        
		//name: An object containing all components of a persons name. (ContactName)
    	var myContactName = new ContactName();
	    //formatted: The complete name of the contact. (DOMString)
	    //familyName: The contacts family name. (DOMString)
	    //givenName: The contacts given name. (DOMString)
	    //middleName: The contacts middle name. (DOMString)
	    //honorificPrefix: The contacts prefix (example Mr. or Dr.) (DOMString)
	    //honorificSuffix: The contacts suffix (example Esq.). (DOMString)
		myContactName.givenName = JSON.parse(JSON.stringify(M.I18N.l('orderInfo')));
		myContactName.familyName = item.orderName + ", " + item.positionName;
		myContactName.honorificPrefix = 'DIGI-WebApp';
	   	myContact.name = myContactName;
    	
    	//nickname: A casual name to address the contact by. (DOMString)
		//phoneNumbers: An array of all the contact's phone numbers. (ContactField[])
	   	var phoneNumbers = [];
	   	var myTel = '';
	   	var myFax = '';
	   	try { myTel = item.positionTelefon; } catch(e1) { trackError(e1); }
	   	try { myFax = item.positionFax; } catch(e2) { trackError(e2); }
	   	phoneNumbers[0] = new ContactField('work', myTel, true);
	   	phoneNumbers[1] = new ContactField('fax', myFax, false);
	   	myContact.phoneNumbers = phoneNumbers;
	   	
		//emails: An array of all the contact's email addresses. (ContactField[])
	   	var eMail = [];
	   	var myemail = '';
	   	try { myemail = item.positionEmail; } catch(e3) { trackError(e3); }
	   	eMail[0] = new ContactField('work', myemail, true);
	   	myContact.emails = eMail;

        if (inDebug()) {
            writeToLog('OrderInfoController.saveAsContactSave() myContact erweitert');
        }

        //addresses: An array of all the contact's addresses. (ContactAddresses[])
        var myContactAdress = new ContactAddress();
		//pref: Set to true if this ContactAddress contains the user's preferred value. (boolean)
    	//myContactAdress.pref = true; //mostly unsupported
		//type: A string that tells you what type of field this is (example: 'home'). _(DOMString)
        myContactAdress.type = "Work";
		//formatted: The full address formatted for display. (DOMString)
		//streetAddress: The full street address. (DOMString)
        myContactAdress.streetAddress = item.positionStrasseUndHausnummer;
		//locality: The city or locality. (DOMString)
        myContactAdress.locality = item.positionOrt;
		//region: The state or region. (DOMString)
		//postalCode: The zip code or postal code. (DOMString)
        myContactAdress.postalCode = item.positionPLZ;
		//country: The country name. (DOMString)
        myContactAdress.country = item.positionLand;

        if (myContact.addresses === null)	{
           	var addresses = [myContactAdress];
            myContact.addresses = addresses;
        } else {
           	myContact.addresses[0] = myContactAdress;
        }
        	
        //ims: An array of all the contact's IM addresses. (ContactField[])
		//organizations: An array of all the contact's organizations. (ContactOrganization[])
		//birthday: The birthday of the contact. (Date)
		//note: A note about the contact. (DOMString)
        var dateNow = new Date();
        myContact.note = item.positionBeschreibung + " (" + M.I18N.l('contactLastChange') + ": "
            + dateNow.toString() + ")";
        //photos: An array of the contact's photos. (ContactField[])
		//categories: An array of all the contacts user defined categories. (ContactField[])
        //urls: An array of web pages associated to the contact. (ContactField[])

        var saveContact = JSON.parse(JSON.stringify(myContact));
        
		DigiWebApp.ApplicationController.DigiLoaderView.show(M.I18N.l('saveAsContact'));
		saveContact.save(
            DigiWebApp.OrderInfoController.saveAsContactSuccess,
            DigiWebApp.OrderInfoController.saveAsContactError);
    }
        
    , saveAsContactSuccess: function() {
    	DigiWebApp.ApplicationController.DigiLoaderView.hide();
		//DigiWebApp.ApplicationController.nativeAlertDialogView({
		//	  title: M.I18N.l('saveAsContact')
		//	, message: M.I18N.l('saveAsContactSuccess')
		//});
    }

    , saveAsContactError: function(error) {
    	//console.log('savingContactError');
    	//console.log(error);
    	DigiWebApp.ApplicationController.DigiLoaderView.hide();
		//DigiWebApp.ApplicationController.nativeAlertDialogView({
		//	  title: M.I18N.l('saveAsContact')
		//	, message: M.I18N.l('saveAsContactError')
		//});
    }
});
