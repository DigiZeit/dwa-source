// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: DigiWebApp
// View: BautagebuchWetterPage
// ==========================================================================

DigiWebApp.BautagebuchWetterPage = M.PageView.design({

      events: {
		  pagebeforeshow: {
            action: function() {
				// lade eine evtl. zuvor gespeicherte Wetterauswahl aus dem Bautagesbericht
			}
        }
        , pagehide: {
            action: function() {

        	}
        }
    }
	
    , cssClass: 'bautagebuchWetterPage'

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
                    , action: function() {try{navigator.notification.vibrate(200);}catch(e){} this.backToBautagebuchBautageberichtDetailsPageTransition();}
                }
            }
        })
        , title: M.LabelView.design({
              value: M.I18N.l('BautagebuchWetter')
            , anchorLocation: M.CENTER
        })
        , delButton: M.ButtonView.design({
              value: M.I18N.l('BautagebuchDelete')
            , icon: 'delete'
            , anchorLocation: M.RIGHT
            , events: {
                tap: {
                    //  target: Controller
                    //, action: 'deleteItem'
                }
            }
        })
        , anchorLocation: M.TOP
    })

    , content: M.ScrollView.design({

    	  childViews: 'temperaturView luftfeuchteView bewoelkungView niederschlagView windView wechselhaftCheckbox'
        	  
        , cssClass: 'content'
        	
        , spacer1: M.LabelView.design({
        	value: '&nbsp;'
        })
    	
        , wechselhaftCheckbox: M.SelectionListView.design({
	          selectionMode: M.MULTIPLE_SELECTION
            , contentBinding: {
                  target: DigiWebApp.BautagebuchBautageberichtDetailsController
                , property: 'wetter.wechselhaftItem'
            }
		    , events: {
		    		change: {
        				  target: DigiWebApp.BautagebuchBautageberichtDetailsController
						, action: function(itemValues, items) {
				  			this.wetter.wechselhaft = (itemValues.length === 1);
				  			this.wetter.wechselhaftItem.isSelected = (itemValues.length === 1);
						}
		    		}
			}
      	})
          
		, temperaturView: M.ContainerView.design({
			  childViews: 'myLabel mySliderGrid'
	    	, cssClass: 'temperaturView'
		    , myLabel: M.LabelView.design({
		    	  cssClass: 'whiteText marginBottom5px'
	        	, value: M.I18N.l('BautagebuchTemperatur')
	        })
			, mySliderGrid: M.GridView.design({
				  childViews: 'mySlider TextValue'
			    , layout: M.TWO_COLUMNS
			    , mySlider: M.SliderView.design({
			    	  min: -50
			    	, max: 50
			    	, isSliderOnly: YES
			    	, highlightLeftPart: NO
			        , contentBinding: {
			              target: DigiWebApp.BautagebuchBautageberichtDetailsController
			            , property: 'wetter.temperatur'
				    }
				    , events: {
			    		change: {
			    			action: function(myValue, m_id) {
				    			var mySliderContainer = DigiWebApp.BautagebuchWetterPage.content.temperaturView.mySliderGrid;
				    			if (mySliderContainer.mySlider.id !== m_id) {
				    				return true;
				    			} else { 
				    				mySliderContainer.TextValue.computedValue.value = parseInt(myValue);
				    				mySliderContainer.TextValue.computeValue();
				    				mySliderContainer.TextValue.renderUpdate();
				    				DigiWebApp.BautagebuchBautageberichtDetailsController.wetter.temperatur = parseInt(myValue);
			    				}
			    			}
			    		}
					}
			    })
			    , TextValue: M.LabelView.design({
			    	  cssClass: 'whiteText centerText'
			    	, computedValue: {
				          contentBinding: {
				              target: DigiWebApp.BautagebuchBautageberichtDetailsController
				            , property: 'wetter.temperatur'
				        }
			    		, value: 0
				        , operation: function(v) {
			    			return v + "°C";
				        }
				    }
			    })
			})
		})

		, luftfeuchteView: M.ContainerView.design({
			  childViews: 'myLabel mySliderGrid'
	    	, cssClass: 'luftfeuchteView'
		    , myLabel: M.LabelView.design({
		    	  cssClass: 'whiteText marginBottom5px'
	        	, value: M.I18N.l('BautagebuchLuftfeuchtigkeit')
	        })
			, mySliderGrid: M.GridView.design({
				  childViews: 'mySlider TextValue'
			    , layout: M.TWO_COLUMNS
			    , mySlider: M.SliderView.design({
			    	  min: 0
			    	, max: 100
			    	, isSliderOnly: YES
			    	, highlightLeftPart: NO
			        , contentBinding: {
			              target: DigiWebApp.BautagebuchBautageberichtDetailsController
			            , property: 'wetter.luftfeuchtigkeit'
				    }
				    , events: {
			    		change: {
			    			action: function(myValue, m_id) {
				    			var mySliderContainer = DigiWebApp.BautagebuchWetterPage.content.luftfeuchteView.mySliderGrid;
				    			if (mySliderContainer.mySlider.id !== m_id) {
				    				return true;
				    			} else { 
				    				mySliderContainer.TextValue.computedValue.value = parseInt(myValue);
				    				mySliderContainer.TextValue.computeValue();
				    				mySliderContainer.TextValue.renderUpdate();
				    				DigiWebApp.BautagebuchBautageberichtDetailsController.wetter.luftfeuchtigkeit = parseInt(myValue);
			    				}
			    			}
			    		}
					}
			    })
			    , TextValue: M.LabelView.design({
			    	  cssClass: 'whiteText centerText'
			    	, computedValue: {
				          contentBinding: {
				              target: DigiWebApp.BautagebuchBautageberichtDetailsController
				            , property: 'wetter.luftfeuchtigkeit'
				        }
			    		, value: 0
				        , operation: function(v) {
			    			return v + "%";
				        }
				    }
			    })
			})
		})

		, bewoelkungView: M.ContainerView.design({
			  childViews: 'myLabel mySliderGrid'
	    	, cssClass: 'bewoelkungView'
		    , myLabel: M.LabelView.design({
		    	  cssClass: 'whiteText marginBottom5px'
	        	, value: M.I18N.l('BautagebuchBewoelkung')
	        })
			, mySliderGrid: M.GridView.design({
				  childViews: 'mySlider TextValue'
			    , layout: M.TWO_COLUMNS
			    , mySlider: M.SliderView.design({
			    	  min: 0
			    	, max: 3
			    	, isSliderOnly: YES
			    	, highlightLeftPart: NO
			        , contentBinding: {
			              target: DigiWebApp.BautagebuchBautageberichtDetailsController
			            , property: 'wetter.bewoelkung'
				    }
				    , events: {
			    		change: {
			    			action: function(myValue, m_id) {
				    			var mySliderContainer = DigiWebApp.BautagebuchWetterPage.content.bewoelkungView.mySliderGrid;
				    			if (mySliderContainer.mySlider.id !== m_id) {
				    				return true;
				    			} else { 
				    				mySliderContainer.TextValue.computedValue.value = parseInt(myValue);
				    				mySliderContainer.TextValue.computeValue();
				    				mySliderContainer.TextValue.renderUpdate();
				    				DigiWebApp.BautagebuchBautageberichtDetailsController.wetter.bewoelkung = parseInt(myValue);
			    				}
			    			}
			    		}
					}
			    })
			    , TextValue: M.LabelView.design({
			    	  cssClass: 'whiteText centerText'
			    	, computedValue: {
				          contentBinding: {
				              target: DigiWebApp.BautagebuchBautageberichtDetailsController
				            , property: 'wetter.bewoelkung'
				        }
			    		, value: 0
				        , operation: function(v) {
				    		switch(v) {
				    			case 0:
				    				return M.I18N.l('BautagebuchBewoelkungKlar');
				    				break;
					    		case 1:
				    				return M.I18N.l('BautagebuchBewoelkungMaessig');
					    			break;
					    		case 2:
				    				return M.I18N.l('BautagebuchBewoelkungBedeckt');
						    		break;
					    		case 3:
				    				return M.I18N.l('BautagebuchBewoelkungNeblig');
					    			break;
					    		default:
					    		  return "";
				    		}
				        }
				    }
			    })
			})
		})

		, niederschlagView: M.ContainerView.design({
			  childViews: 'myLabel mySliderGrid'
	    	, cssClass: 'niederschlagView'
		    , myLabel: M.LabelView.design({
		    	  cssClass: 'whiteText marginBottom5px'
	        	, value: M.I18N.l('BautagebuchNiederschlag')
	        })
			, mySliderGrid: M.GridView.design({
				  childViews: 'mySlider TextValue'
			    , layout: M.TWO_COLUMNS
			    , mySlider: M.SliderView.design({
			    	  min: 0
			    	, max: 5
			    	, isSliderOnly: YES
			    	, highlightLeftPart: NO
			        , contentBinding: {
			              target: DigiWebApp.BautagebuchBautageberichtDetailsController
			            , property: 'wetter.niederschlag'
				    }
				    , events: {
			    		change: {
			    			action: function(myValue, m_id) {
				    			var mySliderContainer = DigiWebApp.BautagebuchWetterPage.content.niederschlagView.mySliderGrid;
				    			if (mySliderContainer.mySlider.id !== m_id) {
				    				return true;
				    			} else { 
				    				mySliderContainer.TextValue.computedValue.value = parseInt(myValue);
				    				mySliderContainer.TextValue.computeValue();
				    				mySliderContainer.TextValue.renderUpdate();
				    				DigiWebApp.BautagebuchBautageberichtDetailsController.wetter.niederschlag = parseInt(myValue);
			    				}
			    			}
			    		}
					}
			    })
			    , TextValue: M.LabelView.design({
			    	  cssClass: 'whiteText centerText'
			    	, computedValue: {
				          contentBinding: {
				              target: DigiWebApp.BautagebuchBautageberichtDetailsController
				            , property: 'wetter.niederschlag'
				        }
			    		, value: 0
				        , operation: function(v) {
				    		switch(v) {
				    			case 0:
				    				return M.I18N.l('BautagebuchNiederschlagKein');
				    				break;
					    		case 1:
				    				return M.I18N.l('BautagebuchNiederschlagNiesel');
					    			break;
					    		case 2:
				    				return M.I18N.l('BautagebuchNiederschlagRegen');
						    		break;
					    		case 3:
				    				return M.I18N.l('BautagebuchNiederschlagGraupel');
					    			break;
					    		case 4:
				    				return M.I18N.l('BautagebuchNiederschlagSchnee');
					    			break;
					    		case 5:
				    				return M.I18N.l('BautagebuchNiederschlagHagel');
					    			break;
					    		default:
					    		    return "";
				    		}
				        }
				    }
			    })
			})
		})

		, windView: M.ContainerView.design({
			  childViews: 'myLabel mySliderGrid'
	    	, cssClass: 'windView'
		    , myLabel: M.LabelView.design({
		    	  cssClass: 'whiteText marginBottom5px'
	        	, value: M.I18N.l('BautagebuchWind')
	        })
			, mySliderGrid: M.GridView.design({
				  childViews: 'mySlider TextValue'
			    , layout: M.TWO_COLUMNS
			    , mySlider: M.SliderView.design({
			    	  min: 0
			    	, max: 3
			    	, isSliderOnly: YES
			    	, highlightLeftPart: NO
			        , contentBinding: {
			              target: DigiWebApp.BautagebuchBautageberichtDetailsController
			            , property: 'wetter.wind'
				    }
				    , events: {
			    		change: {
			    			action: function(myValue, m_id) {
				    			var mySliderContainer = DigiWebApp.BautagebuchWetterPage.content.windView.mySliderGrid;
				    			if (mySliderContainer.mySlider.id !== m_id) {
				    				return true;
				    			} else { 
				    				mySliderContainer.TextValue.computedValue.value = parseInt(myValue);
				    				mySliderContainer.TextValue.computeValue();
				    				mySliderContainer.TextValue.renderUpdate();
				    				DigiWebApp.BautagebuchBautageberichtDetailsController.wetter.wind = parseInt(myValue);
			    				}
			    			}
			    		}
					}
			    })
			    , TextValue: M.LabelView.design({
			    	  cssClass: 'whiteText centerText'
			    	, computedValue: {
				          contentBinding: {
				              target: DigiWebApp.BautagebuchBautageberichtDetailsController
				            , property: 'wetter.wind'
				        }
			    		, value: 0
				        , operation: function(v) {
				    		switch(v) {
				    			case 0:
				    				return M.I18N.l('BautagebuchWindStill');
				    				break;
					    		case 1:
				    				return M.I18N.l('BautagebuchWindMaessig');
					    			break;
					    		case 2:
				    				return M.I18N.l('BautagebuchWindBoeig');
						    		break;
					    		case 3:
				    				return M.I18N.l('BautagebuchWindStuermisch');
					    			break;
					    		default:
					    		    return "";
				    		}
				        }
				    }
			    })
			})
		})

		, speichernButton: M.ButtonView.design({
	          value: M.I18N.l('save')
	        //, cssClass: 'speichernButton'
	        //, anchorLocation: M.CENTER
	        , events: {
		            tap: {
		                target: DigiWebApp.NavigationController
		                , action: 'backToBautagebuchMaterialienDetailsPageTransition'
//						action: function() {
//							
//						}
		            }
	          }
	    })

    })

});

