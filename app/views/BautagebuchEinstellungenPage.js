// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: DigiWebApp
// View: BautagebuchEinstellungenPage
// ==========================================================================

DigiWebApp.BautagebuchEinstellungenPage = M.PageView.design({

      events: {
		  pagebeforeshow: {
            action: function() {
				DigiWebApp.BautagebuchEinstellungenController.load();
				DigiWebApp.BautagebuchEinstellungenPage.content.startUhrzeit.startUhrzeitInput.setValue(DigiWebApp.BautagebuchEinstellungenController.settings.startUhrzeit);
			}
        }
        , pagebeforehide: {
            action: function() {
				DigiWebApp.BautagebuchEinstellungenController.save();
        	}
        }
    }

	, controller: DigiWebApp.BautagebuchEinstellungenController
	, navigationController: DigiWebApp.NavigationController

    , cssClass: 'settingsPage'

    , childViews: 'header content'

    , header: M.ToolbarView.design({
          childViews: 'backButton title'
        , cssClass: 'header unselectable'
        , isFixed: YES
        , backButton: M.ButtonView.design({
              value: M.I18N.l('back')
            , icon: 'arrow-l'
            , anchorLocation: M.LEFT
            , events: {
                tap: {
                      target: DigiWebApp.NavigationController
                    , action: function() {try{navigator.notification.vibrate(200);}catch(e){} this.backToBautagebuchBautageberichteListePageTransition();}
                }
            }
        })
        , title: M.LabelView.design({
              value: M.I18N.l('BautagebuchBautagebericht')
            , anchorLocation: M.CENTER
        })
        , anchorLocation: M.TOP
    })

    , content: M.ScrollView.design({

	        childViews: 'startUhrzeit inStundenBuchenCheckbox falscheZeitenIgnorierenCheckbox'

  	      , startUhrzeit: M.GridView.design({
	            childViews: 'startUhrzeitLabel startUhrzeitInput'
	          , layout: M.TWO_COLUMNS
	          , startUhrzeitLabel: M.LabelView.design({
	              value: M.I18N.l('BautagebuchTaeglicheStartUhrzeit')
	          })
	          , startUhrzeitInput: M.TextFieldView.design({
	        	    contentBindingReverse: {
	                    target: DigiWebApp.BautagebuchEinstellungenController
	                  , property: 'settings.startUhrzeit'
	              }
	              , contentBinding: {
	                    target: DigiWebApp.BautagebuchEinstellungenController
	                  , property: 'settings.startUhrzeit'
	              }
	          	  , events: {
	          		  tap: {
		          		  	action: function(id, event) {
	          		  				$(DigiWebApp.BautagebuchEinstellungenPage.content.startUhrzeit.startUhrzeitInput).blur();
					          		M.DatePickerView.show({
					          		      source: M.ViewManager.getView('bautagebuchEinstellungenPage', 'startUhrzeitInput')
					          		    , initialDate: D8.create("01.01.1993 " + DigiWebApp.BautagebuchEinstellungenController.settings.startUhrzeit)
					          		    , showTimePicker: YES
					          		    , showDatePicker: NO
					          		    , showAmPm: NO
						    		    , dateOrder: 'ddmmyy'
					          		    , dateFormat: "dd.mm.yy"
					          		    , timeFormat: "HH:ii"
					          		    , minutesLabel: M.I18N.l('minute')
					          		    , hoursLabel: M.I18N.l('hour')
					          		    , dayLabel: M.I18N.l('day')
					          		    , monthLabel: M.I18N.l('month')
					          		    , yearLabel: M.I18N.l('year')
					          		    , dayNamesShort: DigiWebApp.ApplicationController.dayNamesShort
					          		    , dayNames: DigiWebApp.ApplicationController.dayNames
					          		    , monthNamesShort: DigiWebApp.ApplicationController.monthNamesShort
					          		    , monthNames: DigiWebApp.ApplicationController.monthNames
					          		    , callbacks: {
					      				confirm: {
					      					  target: this
					      					, action: function(value, date) {
					      						DigiWebApp.BautagebuchEinstellungenController.set("settings.startUhrzeit", value);
					      					}
					      				}
					      				, before: {
					      					action: function(value, date) {
					      					
					      					}
					      				}
					      				, cancel: {
					      					action: function() {
					      					
					      					}
					      				}
					      			}
					          		});
	          		  		}
	          	  	  }
	          	  }
	          })
	      })
	        	          
	      , inStundenBuchenCheckbox: M.SelectionListView.design({
		          selectionMode: M.MULTIPLE_SELECTION
	            , contentBinding: {
	                  target: DigiWebApp.BautagebuchEinstellungenController
	                , property: 'settings.inStundenBuchenItem'
	            }
			    , events: {
		    		change: {
			    		  target: DigiWebApp.BautagebuchEinstellungenController
		    			, action: function(itemValues, items) {
			    			this.settings.inStundenBuchen = (itemValues.length === 1);
			    			this.settings.inStundenBuchenItem.isSelected = (itemValues.length === 1);
						}
		    		}
				}
	      })
    
	      , falscheZeitenIgnorierenCheckbox: M.SelectionListView.design({
		          selectionMode: M.MULTIPLE_SELECTION
	            , contentBinding: {
	                  target: DigiWebApp.BautagebuchEinstellungenController
	                , property: 'settings.falscheZeitenIgnorierenItem'
	            }
			    , events: {
		    		change: {
			    		  target: DigiWebApp.BautagebuchEinstellungenController
		    			, action: function(itemValues, items) {
			    			this.settings.falscheZeitenIgnorieren = (itemValues.length === 1);
			    			this.settings.falscheZeitenIgnorierenItem.isSelected = (itemValues.length === 1);
						}
		    		}
				}
	      })

//	      , sliderContainer: M.ContainerView.design({
//	    	  		  childViews: 'daysToHoldBookingsOnDeviceSlider'
//			        , slider: M.SliderView.design({
//			        	  label: M.I18N.l('daysToHoldBookingsOnDeviceLabel')
//			        	, min: 1
//			        	, max: 40
//			        	, highlightLeftPart: YES
//			        	, cssClass: 'daysToHoldBookingsOnDeviceSlider'
//			            , contentBinding: {
//			                  target: DigiWebApp.SettingsController
//			                , property: 'settings.daysToHoldBookingsOnDevice'
//			            }
//			        })
//	      })
//	      
//	      , companyGrid: M.GridView.design({
//	            childViews: 'companyLabel companyInput'
//	          , layout: M.TWO_COLUMNS
//	          , companyLabel: M.LabelView.design({
//	              value: M.I18N.l('company')
//	          })
//	          , companyInput: M.TextFieldView.design({
//	              contentBinding: {
//	                    target: DigiWebApp.SettingsController
//	                  , property: 'settings.company'
//	              }
//	          })
//	      })
//	      
//	      , passwordGrid: M.GridView.design({
//	            childViews: 'passwordLabel passwordInput'
//	          , layout: M.TWO_COLUMNS
//	          , passwordLabel: M.LabelView.design({
//	              value: M.I18N.l('password')
//	          })
//	          , passwordInput: M.TextFieldView.design({
//	                inputType: M.INPUT_PASSWORD
//	              , contentBinding: {
//	                    target: DigiWebApp.SettingsController
//	                  , property: 'settings.password'
//	              }
//	          })
//	      })
//	      
//	      , checkbox: M.SelectionListView.design({
//	            selectionMode: M.MULTIPLE_SELECTION
//	          , contentBinding: {
//	                target: DigiWebApp.SettingsController
//	              , property: 'settings.autoSyncAfterBookTime'
//	          }
//	      })
//	      
//	      , digibuttongrid: M.GridView.design({
//	            childViews: 'button icon'
//	          , layout: {
//	                cssClass: 'digiButton'
//	              , columns: {
//	                    0: 'button'
//	                  , 1: 'icon'
//	              }
//	          }
//	          , button: M.ButtonView.design({
//	                value: M.I18N.l('assume')
//	              , cssClass: 'digiButton'
//	              , anchorLocation: M.RIGHT
//	              , events: {
//	                  tap: {
//	                        target: DigiWebApp.SettingsController
//	                      , action: 'save'
//	                  }
//	              }
//	          })
//	          , icon: M.ImageView.design({
//	              value: 'theme/images/icon_bookTime.png'
//	          })
//	      })
//	    })
	    
    })

});

