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
                    , action: function() {try{DigiWebApp.ApplicationController.vibrate();}catch(e2){} this.backToBautagebuchBautageberichteListePageTransition();}
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

	        childViews: 'startUhrzeit inStundenBuchenCheckbox falscheZeitenIgnorierenCheckbox positionVorselektierenCheckbox in15MinutenSchrittenCheckbox'

  	      , startUhrzeit: M.GridView.design({
	            childViews: 'startUhrzeitLabel startUhrzeitInput'
	          , layout: M.TWO_COLUMNS
	          , startUhrzeitLabel: M.LabelView.design({
	              value: M.I18N.l('BautagebuchTaeglicheStartUhrzeit')
	          })
	          , startUhrzeitInput: M.TextFieldView.design({
	        	    inputType: M.INPUT_TIME
	        	  , contentBindingReverse: {
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

	      , in15MinutenSchrittenCheckbox: M.SelectionListView.design({
		          selectionMode: M.MULTIPLE_SELECTION
	            , contentBinding: {
	                  target: DigiWebApp.BautagebuchEinstellungenController
	                , property: 'settings.in15MinutenSchrittenItem'
	            }
			    , events: {
		    		change: {
			    		  target: DigiWebApp.BautagebuchEinstellungenController
		    			, action: function(itemValues, items) {
			    			this.settings.in15MinutenSchritten = (itemValues.length === 1);
			    			this.settings.in15MinutenSchrittenItem.isSelected = (itemValues.length === 1);
						}
		    		}
				}
	      })

	      , positionVorselektierenCheckbox: M.SelectionListView.design({
		          selectionMode: M.MULTIPLE_SELECTION
	            , contentBinding: {
	                  target: DigiWebApp.BautagebuchEinstellungenController
	                , property: 'settings.positionVorselektierenItem'
	            }
			    , events: {
		    		change: {
			    		  target: DigiWebApp.BautagebuchEinstellungenController
		    			, action: function(itemValues, items) {
			    			this.settings.positionVorselektieren = (itemValues.length === 1);
			    			this.settings.positionVorselektierenItem.isSelected = (itemValues.length === 1);
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
	    
    })

});

