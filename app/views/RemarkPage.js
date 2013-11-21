// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: DigiWebApp
// View: RemarkPage
// ==========================================================================

m_require('app/views/TimeDataForEditTemplateView');

DigiWebApp.RemarkPage = M.PageView.design({

    /* Use the 'events' property to bind events like 'pageshow' */
      events: {
		pagebeforeshow: {
            //target: DigiWebApp.MyController,
            //action: 'init'
			action: function() {

				// load data
				DigiWebApp.BookingController.setTimeDataForRemark();
				//DigiWebApp.BookingController.setNotBookedBookings();
								
				// gefahreneKilometer ausblenden falls Freischaltung dazu fehlt
				if (DigiWebApp.SettingsController.featureAvailable('422')) {
					$('#' + DigiWebApp.RemarkPage.content.gefahreneKilometerInput.id).show();
					$('label[for="' + DigiWebApp.RemarkPage.content.gefahreneKilometerInput.id + '"]').show();
				} else {
					$('#' + DigiWebApp.RemarkPage.content.gefahreneKilometerInput.id).hide();
					$('label[for="' + DigiWebApp.RemarkPage.content.gefahreneKilometerInput.id + '"]').hide();
				}
				
				// Bemerkung ausblenden, wenn Freischaltung dafür fehlt
				if (DigiWebApp.SettingsController.featureAvailable('403')) {
					$('#' + DigiWebApp.RemarkPage.content.remarkInput.id).show();
					$('label[for="' + DigiWebApp.RemarkPage.content.remarkInput.id + '"]').show();
				} else {
					$('#' + DigiWebApp.RemarkPage.content.remarkInput.id).hide();
					$('label[for="' + DigiWebApp.RemarkPage.content.remarkInput.id + '"]').hide();
				}
				
				// load remark
				if (typeof(DigiWebApp.BookingController.currentBooking) !== "undefined" && DigiWebApp.BookingController.currentBooking !== null) {
					if (typeof(DigiWebApp.BookingController.currentBooking.get('remark')) !== "undefined" && DigiWebApp.BookingController.currentBooking.get('remark') !== null) {
						//M.ViewManager.getView('remarkPage', 'remarkInput').setValue(DigiWebApp.BookingController.currentBooking.get('remark'));
						$('#' + DigiWebApp.RemarkPage.content.remarkInput.id).val(DigiWebApp.BookingController.currentBooking.get('remark'));
						M.ViewManager.getView('remarkPage', 'remarkInput').value = DigiWebApp.BookingController.currentBooking.get('remark');
					} else {
						//M.ViewManager.getView('remarkPage', 'remarkInput').setValue(null);
						$('#' + DigiWebApp.RemarkPage.content.remarkInput.id).val("");
						M.ViewManager.getView('remarkPage', 'remarkInput').value = "";
					}
				} else {
					//M.ViewManager.getView('remarkPage', 'remarkInput').setValue(null);
					$('#' + DigiWebApp.RemarkPage.content.remarkInput.id).val("");
					M.ViewManager.getView('remarkPage', 'remarkInput').value = "";
				}
				$('#' + DigiWebApp.RemarkPage.content.remarkInput.id)[0].focus();
				$('#' + DigiWebApp.RemarkPage.content.remarkInput.id)[0].blur();

				// load gefahreneKilometer
				if (typeof(DigiWebApp.BookingController.currentBooking) !== "undefined" && DigiWebApp.BookingController.currentBooking !== null) {
					if (typeof(DigiWebApp.BookingController.currentBooking.get('gefahreneKilometer')) !== "undefined" && DigiWebApp.BookingController.currentBooking.get('gefahreneKilometer') !== null) {
						//M.ViewManager.getView('remarkPage', 'gefahreneKilometerInput').setValue(DigiWebApp.BookingController.currentBooking.get('gefahreneKilometer'));
						$('#' + DigiWebApp.RemarkPage.content.gefahreneKilometerInput.id).val(DigiWebApp.BookingController.currentBooking.get('gefahreneKilometer'));
						M.ViewManager.getView('remarkPage', 'gefahreneKilometerInput').value = DigiWebApp.BookingController.currentBooking.get('gefahreneKilometer');
					} else {
						//M.ViewManager.getView('remarkPage', 'gefahreneKilometerInput').setValue(null);
						$('#' + DigiWebApp.RemarkPage.content.gefahreneKilometerInput.id).val("0");
						M.ViewManager.getView('remarkPage', 'gefahreneKilometerInput').value = "0";
					}
				} else {
					//M.ViewManager.getView('remarkPage', 'gefahreneKilometerInput').setValue(null);
					$('#' + DigiWebApp.RemarkPage.content.gefahreneKilometerInput.id).val("0");
					M.ViewManager.getView('remarkPage', 'gefahreneKilometerInput').value = "0";
				}
			}
        }
    }

    , myCallback: function() {

    }
    
    , tab_action_timeoutvar: null    
    
    , tab_action: function() {
    	clearTimeout(DigiWebApp.RemarkPage.tab_action_timeoutvar);
    	
		if (M.ViewManager.getView('remarkPage', 'remarkInput').value.length > 255) {
	        DigiWebApp.ApplicationController.DigiLoaderView.hide();
    		DigiWebApp.ApplicationController.nativeAlertDialogView({
    			  title: M.I18N.l('remarkTooLong')
    			, message: M.I18N.l('remarkTooLongMessage')
    		});
		} else {
			
			if ( (DigiWebApp.SettingsController.getSetting('remarkIsMandatory')) && (M.ViewManager.getView('remarkPage', 'remarkInput').value === '') ) {
		        DigiWebApp.ApplicationController.DigiLoaderView.hide();
	    		DigiWebApp.ApplicationController.nativeAlertDialogView({
	    			  title: M.I18N.l('remarkIsMandatory')
	    			, message: M.I18N.l('remarkIsMandatoryMessage')
	    		});
			} else {
	            //if (/[[^a-zA-Z0-9_-äöüÄÖÜ,. !?;:/\\@€=]]+/.test(M.ViewManager.getView('remarkPage', 'remarkInput').value)) {
	            if (DigiWebApp.ApplicationController.sonderzeichenCheck(M.ViewManager.getView('remarkPage', 'remarkInput').value)) {
	    	        DigiWebApp.ApplicationController.DigiLoaderView.hide();
	                DigiWebApp.ApplicationController.nativeAlertDialogView({
	                      title: M.I18N.l('specialCharProblem')
	                    , message: M.I18N.l('specialCharProblemMsg')
	                });
	            } else {
	            	
	    			// save booking
	    			DigiWebApp.BookingController.currentBooking.set('remark', M.ViewManager.getView('remarkPage', 'remarkInput').value);
	    			DigiWebApp.BookingController.currentBooking.set('gefahreneKilometer', parseInt(M.ViewManager.getView('remarkPage', 'gefahreneKilometerInput').value));
	    			DigiWebApp.BookingController.currentBooking.save();
	    			
	    			DigiWebApp.RemarkPage.myCallback();
	            }
			}
		}
    }
    
    , childViews: 'header content'

    , cssClass: 'remarkPage'

    , header: M.ToolbarView.design({
          childViews: 'backButton title'
        , cssClass: 'header'
        , isFixed: YES
        , backButton: M.ButtonView.design({
              value: M.I18N.l('back')
            , icon: 'arrow-l'
            , anchorLocation: M.LEFT
            , events: {
                tap: {
                      target: DigiWebApp.NavigationController
                    , action: function() {try{DigiWebApp.ApplicationController.vibrate();}catch(e2){} this.backToBookTimePagePOP();}
                }
            }
        })
        , title: M.LabelView.design({
              value: M.I18N.l('remark')
            , anchorLocation: M.CENTER
        })
        , anchorLocation: M.TOP
    })

    , content: M.ScrollView.design({
          childViews: 'orderbox remarkInput gefahreneKilometerInput grid'
        
        , orderbox: M.ListView.design({
        	
              contentBinding: {
            	  target: DigiWebApp.BookingController
            	, property: 'timeDataForEdit'
        	}

        	, listItemTemplateView: DigiWebApp.TimeDataForEditTemplateView
        	
        })

        , remarkInput: M.TextFieldView.design({
                  label: M.I18N.l('remark')
                , cssClass: 'remarkInput'
                , hasMultipleLines: YES
                , initialText: "max. 255 " + M.I18N.l('characters')
                , numberOfChars: 255
        })
            
        , gefahreneKilometerInput: M.TextFieldView.design({
                  label: M.I18N.l('gefahreneKilometer')
                , cssClass: 'remarkInput'
                , hasMultipleLines: NO
        	    , inputType: M.INPUT_NUMBER
        })
            
        , grid: M.GridView.design({
        	
              childViews: 'button icon'
            , layout: {
                  cssClass: 'digiButton marginTop25'
                , columns: {
                      0: 'button'
                    , 1: 'icon'
                }
            }
            
            , button: M.ButtonView.design({
                  value: M.I18N.l('closeBooking')
                , cssClass: 'digiButton'
                , anchorLocation: M.RIGHT
                , events: {
                    tap: {
                        //  target: DigiWebApp.NavigationController
                        //, action: 'toSettingsPage'
            			action: function() {
        					DigiWebApp.ApplicationController.DigiLoaderView.show(M.I18N.l('Save'));
        					DigiWebApp.RemarkPage.tab_action_timeoutvar = setTimeout("DigiWebApp.RemarkPage.tab_action();", 50);
            			}
                    }
                }
            })
            
            , icon: M.ImageView.design({
                value: 'theme/images/icon_bookTime.png'
            })
            
        })
    })
});

