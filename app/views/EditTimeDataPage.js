// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: DigiWebApp
// View: EditTimeDataPage
// ==========================================================================

m_require('app/views/TimeDataForEditTemplateView');

DigiWebApp.EditTimeDataPage = M.PageView.design({

    bookingToEdit: null
    
    , signaturePadAPI: null
	
	/* Use the 'events' property to bind events like 'pageshow' */
    , events: {
		pagebeforeshow: {
			action: function() {
	
				// load data
				DigiWebApp.BookingController.setTimeDataForEdit();
				//DigiWebApp.BookingController.setNotBookedBookings();
				
        		// Freischaltung 405: Unterschrift
        		if ((DigiWebApp.SettingsController.featureAvailable('405')) && (typeof window.requestFileSystem !== "undefined")) {
        			$('#' + DigiWebApp.EditTimeDataPage.content.signature.id).show();
					// init canvas
					var sigPadOptions = {
							    bgColour : '#fff'
							  , lineTop: 130
							  , drawOnly : true
							};
					if (DigiWebApp.EditTimeDataPage.signaturePadAPI === null) {
						DigiWebApp.EditTimeDataPage.signaturePadAPI = $('.sigPad').signaturePad(sigPadOptions);
					}
        		} else {
        			$('#' + DigiWebApp.EditTimeDataPage.content.signature.id).hide();
        		}
						
        		// load remark
        		if (typeof(DigiWebApp.EditTimeDataPage.bookingToEdit) !== "undefined" && DigiWebApp.EditTimeDataPage.bookingToEdit !== null) {
					if (typeof(DigiWebApp.EditTimeDataPage.bookingToEdit.get('remark')) !== "undefined" && DigiWebApp.EditTimeDataPage.bookingToEdit.get('remark') !== null) {
						$('#' + DigiWebApp.EditTimeDataPage.content.remarkInput.id).val(DigiWebApp.EditTimeDataPage.bookingToEdit.get('remark'));
						M.ViewManager.getView('editTimeDataPage', 'remarkInput').value = DigiWebApp.EditTimeDataPage.bookingToEdit.get('remark');
					} else {
						$('#' + DigiWebApp.EditTimeDataPage.content.remarkInput.id).val("");
						M.ViewManager.getView('editTimeDataPage', 'remarkInput').value = "";
					}
				} else {
					$('#' + DigiWebApp.EditTimeDataPage.content.remarkInput.id).val("");
					M.ViewManager.getView('editTimeDataPage', 'remarkInput').value = "";
				}
        		
				// load gefahreneKilometer
        		if (typeof(DigiWebApp.EditTimeDataPage.bookingToEdit) !== "undefined" && DigiWebApp.EditTimeDataPage.bookingToEdit !== null) {
					if (typeof(DigiWebApp.EditTimeDataPage.bookingToEdit.get('gefahreneKilometer')) !== "undefined" && DigiWebApp.EditTimeDataPage.bookingToEdit.get('gefahreneKilometer') !== null) {
						$('#' + DigiWebApp.EditTimeDataPage.content.gefahreneKilometerInput.id).val(DigiWebApp.EditTimeDataPage.bookingToEdit.get('gefahreneKilometer'));
						M.ViewManager.getView('editTimeDataPage', 'gefahreneKilometerInput').value = DigiWebApp.EditTimeDataPage.bookingToEdit.get('gefahreneKilometer');
					} else {
						$('#' + DigiWebApp.EditTimeDataPage.content.gefahreneKilometerInput.id).val("0");
						M.ViewManager.getView('editTimeDataPage', 'gefahreneKilometerInput').value = "0";
					}
				} else {
					$('#' + DigiWebApp.EditTimeDataPage.content.gefahreneKilometerInput.id).val("0");
					M.ViewManager.getView('editTimeDataPage', 'gefahreneKilometerInput').value = "0";
				}

			    // Freischaltung 403: Bemerkungsfeld
        		if (DigiWebApp.SettingsController.featureAvailable('403')) {
	        		// show label
					$('[for=' + DigiWebApp.EditTimeDataPage.content.remarkInput.id  + ']').each(function() {
	    					$(this).show();
	    			});
					// show textarea
	        		$('[id=' + DigiWebApp.EditTimeDataPage.content.remarkInput.id  + ']').each(function() {
	    					$(this).show();
	    			});
				} else {
					// hide label
	        		$('[for=' + DigiWebApp.EditTimeDataPage.content.remarkInput.id  + ']').each(function() {
	    					$(this).hide();
	    			});
					// hide textarea
					$('[id=' + DigiWebApp.EditTimeDataPage.content.remarkInput.id  + ']').each(function() {
	    					$(this).hide();
	    			});
				}
        		
			    // Freischaltung 422: Eingabe von gefahrenen Kilometern (aktuell nur KTG)
        		if (DigiWebApp.SettingsController.featureAvailable('422')) {
        			if (typeof(DigiWebApp.BookingController.currentBooking) !== "undefined" && DigiWebApp.BookingController.currentBooking !== null) {
	        			var currentActivity = null;
	        			_.each(DigiWebApp.Activity.find(), function(el) {if (el.get("id") === parseIntRadixTen(DigiWebApp.BookingController.currentBooking.get("activityId"))) currentActivity = el;});
	        			if (currentActivity !== null && currentActivity.get("istFahrzeitRelevant")) {
			        		// show label
							$('[for=' + DigiWebApp.EditTimeDataPage.content.gefahreneKilometerInput.id  + ']').each(function() {
			    					$(this).show();
			    			});
							// show textarea
			        		$('[id=' + DigiWebApp.EditTimeDataPage.content.gefahreneKilometerInput.id  + ']').each(function() {
			    					$(this).show();
			    			});
	        			} else {
	    					// hide label
	    	        		$('[for=' + DigiWebApp.EditTimeDataPage.content.gefahreneKilometerInput.id  + ']').each(function() {
	    	    					$(this).hide();
	    	    			});
	    					// hide textarea
	    					$('[id=' + DigiWebApp.EditTimeDataPage.content.gefahreneKilometerInput.id  + ']').each(function() {
	    	    					$(this).hide();
	    	    			});
	        			}
        			} else {
    					// hide label
    	        		$('[for=' + DigiWebApp.EditTimeDataPage.content.gefahreneKilometerInput.id  + ']').each(function() {
    	    					$(this).hide();
    	    			});
    					// hide textarea
    					$('[id=' + DigiWebApp.EditTimeDataPage.content.gefahreneKilometerInput.id  + ']').each(function() {
    	    					$(this).hide();
    	    			});
        			}
				} else {
					// hide label
	        		$('[for=' + DigiWebApp.EditTimeDataPage.content.gefahreneKilometerInput.id  + ']').each(function() {
	    					$(this).hide();
	    			});
					// hide textarea
					$('[id=' + DigiWebApp.EditTimeDataPage.content.gefahreneKilometerInput.id  + ']').each(function() {
	    					$(this).hide();
	    			});
				}

        		// Freischaltung 405: Unterschrift
        		if ((DigiWebApp.SettingsController.featureAvailable('405')) && (typeof window.requestFileSystem !== "undefined")) {
        			// load signature
        			DigiWebApp.EditTimeDataPage.bookingToEdit.readFromFile(function(fileContent){
        				if (fileContent && (fileContent !== "")) {
       						DigiWebApp.EditTimeDataPage.signaturePadAPI.regenerate(fileContent);
        				} else {
        					DigiWebApp.EditTimeDataPage.signaturePadAPI.clearCanvas();
        				}
        			}, function() {
        				DigiWebApp.EditTimeDataPage.signaturePadAPI.clearCanvas();
        			});
        		}
				
			}
        }
    }

    , myCallback: function() {
    }
    
    , tab_action_timeoutvar: null    
    
    , tab_action: function() {
    	clearTimeout(DigiWebApp.EditTimeDataPage.tab_action_timeoutvar);
    	
    	var unterschriftString = "";
    	// Freischaltung 405: Unterschrift
		if ((DigiWebApp.SettingsController.featureAvailable('405')) && (typeof window.requestFileSystem !== "undefined") && DigiWebApp.EditTimeDataPage.signaturePadAPI) {
			//unterschriftImageString = DigiWebApp.EditTimeDataPage.signaturePadAPI.getSignatureImage();
    		unterschriftString = DigiWebApp.EditTimeDataPage.signaturePadAPI.getSignatureString();
			//var unterschriftRawValue = $('#' + DigiWebApp.EditTimeDataPage.content.signature.signatureform.signaturecanvas.id).val();
    	
			//console.log(DigiWebApp.EditTimeDataPage.signaturePadAPI);
			//console.log(unterschriftImageString);
		}
    	
    	if (M.ViewManager.getView('editTimeDataPage', 'remarkInput').value.length > 255) {
	        DigiWebApp.ApplicationController.DigiLoaderView.hide();
    		DigiWebApp.ApplicationController.nativeAlertDialogView({
    			  title: M.I18N.l('remarkTooLong')
    			, message: M.I18N.l('remarkTooLongMessage')
    		});
		} else {
			
			if ( (DigiWebApp.SettingsController.getSetting('remarkIsMandatory')) && (M.ViewManager.getView('editTimeDataPage', 'remarkInput').value === '') ) {
		        DigiWebApp.ApplicationController.DigiLoaderView.hide();
	    		DigiWebApp.ApplicationController.nativeAlertDialogView({
	    			  title: M.I18N.l('remarkIsMandatory')
	    			, message: M.I18N.l('remarkIsMandatoryMessage')
	    		});
			} else {
	            //if (/[[^a-zA-Z0-9_-äöüÄÖÜ,. !?;:/\\@€=]]+/.test(M.ViewManager.getView('editTimeDataPage', 'remarkInput').value)) {
	            if (DigiWebApp.ApplicationController.sonderzeichenCheck(M.ViewManager.getView('editTimeDataPage', 'remarkInput').value)) {
	    	        DigiWebApp.ApplicationController.DigiLoaderView.hide();
	                DigiWebApp.ApplicationController.nativeAlertDialogView({
	                      title: M.I18N.l('specialCharProblem')
	                    , message: M.I18N.l('specialCharProblemMsg')
	                });
	            } else {
    				// save remark und gefahreneKilometer in bookingToEdit
    				DigiWebApp.EditTimeDataPage.bookingToEdit.set('remark', M.ViewManager.getView('editTimeDataPage', 'remarkInput').value);
    				DigiWebApp.EditTimeDataPage.bookingToEdit.set('gefahreneKilometer', M.ViewManager.getView('editTimeDataPage', 'gefahreneKilometerInput').value);
    				DigiWebApp.EditTimeDataPage.bookingToEdit.save();

    				if (unterschriftString !== "") {
    					// save signature
    					DigiWebApp.EditTimeDataPage.bookingToEdit.set('fileType', DigiWebApp.ApplicationController.CONSTTextFiletype);
    					DigiWebApp.EditTimeDataPage.bookingToEdit.set("unterschrift_breite", DigiWebApp.EditTimeDataPage.content.signature.signatureform.signaturecanvas.canvasWidth);
    					DigiWebApp.EditTimeDataPage.bookingToEdit.set("unterschrift_hoehe", DigiWebApp.EditTimeDataPage.content.signature.signatureform.signaturecanvas.canvasHeight);
    					DigiWebApp.EditTimeDataPage.bookingToEdit.save();
    					DigiWebApp.EditTimeDataPage.bookingToEdit.saveToFile(unterschriftString, DigiWebApp.EditTimeDataPage.myCallback);
    				} else {
    					DigiWebApp.EditTimeDataPage.myCallback();
    				}
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
                    , action: function() {try{DigiWebApp.ApplicationController.vibrate();}catch(e2){} this.backToTimeDataPage();}
                }
            }
        })
        , title: M.LabelView.design({
              value: M.I18N.l('EditTimeDataPageTitle')
            , anchorLocation: M.CENTER
        })
        , anchorLocation: M.TOP
    })

    , content: M.ScrollView.design({
          childViews: 'orderbox remarkInput gefahreneKilometerInput signature saveGrid'
        
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
                , initialText: "Max. 255 " + M.I18N.l('characters')
                , numberOfChars: 255
        })
            
        , gefahreneKilometerInput: M.TextFieldView.design({
                  label: M.I18N.l('gefahreneKilometer')
                , cssClass: 'remarkInput'
                , hasMultipleLines: NO
        	    , inputType: M.INPUT_NUMBER
        })
            
        , signature: M.ContainerView.design({
        	
        	  childViews: 'signatureform'
        		  
            , cssClass: 'signaturecanvas marginTop20 marginBottom20'

        	, signatureform: M.FormView.design({
            	
            	  childViews: 'signaturecanvas'
            	
            	, signaturecanvas: M.CanvasView.design({

            		  label: M.I18N.l('signature')

            		, canvasWidth: 300
                    , canvasHeight: 150
                	
                    , render: function() {
                    	if (this.label) {
                    		this.html += '<label for="' + this.id + '" class="signaturecanvaslabel">' + this.label + '</label>';
                    	}
    					this.html += '  <div id="' + this.id + '_container" class="sig sigWrapper">';
        				this.html += '    <canvas id="' + this.id + '_canvas" class="pad" width="' + this.canvasWidth + 'px" height="' + this.canvasHeight + 'px"></canvas>';
        				this.html += '    <input id="' + this.id + '" type="hidden" name="output" class="output">';
        				this.html += '  </div>';
                    	return this.html;
                	}
    	        })
                	
                , render: function() {
            		this.html += '<form method="post" action="" class="sigPad">';
                	this.renderChildViews();
    				this.html += '</form>';
                	return this.html;
            	}
            })
        })
        	        
        , saveGrid: M.GridView.design({
              childViews: 'saveButton icon'
            , layout: {
                  cssClass: 'digiButton marginTop25'
                , columns: {
                      0: 'saveRemarkButton'
                    , 1: 'icon'
                }
            }
            
            , saveButton: M.ButtonView.design({
                  value: M.I18N.l('assume')
                , cssClass: 'digiButton'
                , anchorLocation: M.RIGHT
                , events: {
                    tap: {
            			action: function() {
            				try{DigiWebApp.ApplicationController.vibrate();}catch(e3){} 
            				DigiWebApp.ApplicationController.DigiLoaderView.show(M.I18N.l('Save'));
            				DigiWebApp.EditTimeDataPage.tab_action_timeoutvar = setTimeout("DigiWebApp.EditTimeDataPage.tab_action();", 50);
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

