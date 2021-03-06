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
            action: function(m_id, event) {
				// lade eine evtl. zuvor gespeicherte Wetterauswahl aus dem Bautagesbericht
				DigiWebApp.BautagebuchBautagesberichtDetailsController.set('wetterBackup', JSON.parse(JSON.stringify(DigiWebApp.BautagebuchBautagesberichtDetailsController.get('wetter'))));
			}
        }
        , pagehide: {
            action: function(m_id, event) {
        		clearAllIntervals();
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
                    , action: function(m_id, event) {try{DigiWebApp.ApplicationController.vibrate();}catch(e2){}
                    	clearAllIntervals();
                    	DigiWebApp.BautagebuchBautagesberichtDetailsController.set('wetter', JSON.parse(JSON.stringify(DigiWebApp.BautagebuchBautagesberichtDetailsController.wetterBackup)));
                    	this.backToBautagebuchBautagesberichtDetailsPageTransition();
                    }
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

    	  childViews: 'temperaturView luftfeuchteView bewoelkungView niederschlagView windView wechselhaftCheckbox speichernButton'
        	  
        , cssClass: 'content'
        	
        , spacer1: M.LabelView.design({
        	value: '&nbsp;'
        })
    	
        , wechselhaftCheckbox: M.SelectionListView.design({
	          selectionMode: M.MULTIPLE_SELECTION
            , contentBinding: {
                  target: DigiWebApp.BautagebuchBautagesberichtDetailsController
                , property: 'wetter.wechselhaftItem'
            }
		    , events: {
		    		change: {
        				  target: DigiWebApp.BautagebuchBautagesberichtDetailsController
						, action: function(itemValues, items) {
				  			this.wetter.wechselhaft = (itemValues.length === 1);
				  			this.wetter.wechselhaftItem.isSelected = (itemValues.length === 1);
						}
		    		}
			}
      	})
          
		, temperaturView: M.ContainerView.design({
			  childViews: 'myLabel myGrid'
	    	, cssClass: 'temperaturView'
		    , myLabel: M.LabelView.design({
		    	  cssClass: 'whiteText marginBottom5px'
	        	, value: M.I18N.l('BautagebuchTemperatur')
	        })
			, myGrid: M.GridView.design({
				  childViews: 'minusButton plusButton TextValue'
			    , layout: M.THREE_COLUMNS
			    , minusButton: M.ButtonView.design({
  		                value: "-"
		              , events: {
		                  tap: {
				    			action: function(m_id, event) {try{DigiWebApp.ApplicationController.vibrate();}catch(e2){}
//				    				var myWetter = DigiWebApp.BautagebuchBautagesberichtDetailsController.wetter;
//				    				if (myWetter.temperatur === -50) {
//				    					return;
//				    				}
//				    				myWetter.temperatur = myWetter.temperatur - 1;
//				    				DigiWebApp.BautagebuchBautagesberichtDetailsController.set("wetter", myWetter);
				    			}
		                  }
			              , mousedown: {
					    			action: function(m_id, event) {
			            	  			if (typeof(device) != "undefined" || onMobile) return;
			            	  			var addFunc = function() {
						    				var myWetter = DigiWebApp.BautagebuchBautagesberichtDetailsController.wetter;
						    				if (myWetter.temperatur === -50) {
						    					return;
						    				}
						    				myWetter.temperatur = myWetter.temperatur - 1;
						    				DigiWebApp.BautagebuchBautagesberichtDetailsController.set("wetter", myWetter);
			            	  			}
			            	  			clearAllIntervals();
			            	  			DigiWebApp.BautagebuchMainController.buttonPressInterval_Var = setInterval(addFunc, DigiWebApp.BautagebuchMainController.buttonPressInterval);
			            	  			addFunc(); event.stopPropagation(); event.preventDefault();
					    			}
			              }
			              , mouseup: {
					    			action: function(m_id, event) {
			            	  			clearAllIntervals();
			              			}  
			              }
			              , touchstart: {
					    			action: function(m_id, event) {
			            	  			var addFunc = function() {
						    				var myWetter = DigiWebApp.BautagebuchBautagesberichtDetailsController.wetter;
						    				if (myWetter.temperatur === -50) {
						    					return;
						    				}
						    				myWetter.temperatur = myWetter.temperatur - 1;
						    				DigiWebApp.BautagebuchBautagesberichtDetailsController.set("wetter", myWetter);
			            	  			}
			            	  			clearAllIntervals();
			            	  			DigiWebApp.BautagebuchMainController.buttonPressInterval_Var = setInterval(addFunc, DigiWebApp.BautagebuchMainController.buttonPressInterval);
			            	  			addFunc(); event.stopPropagation(); event.preventDefault();
					    			}
			                }
			              , touchend: {
					    			action: function(m_id, event) {
			            	  			clearAllIntervals();
			              			}  
			              }
		              }
			    })
			    , plusButton: M.ButtonView.design({
		                value: "+"
		              , events: {
		                  tap: {
				    			action: function(m_id, event) {try{DigiWebApp.ApplicationController.vibrate();}catch(e2){} 
//				    				var myWetter = DigiWebApp.BautagebuchBautagesberichtDetailsController.wetter;
//				    				if (myWetter.temperatur === 50) {
//				    					return;
//				    				}
//				    				myWetter.temperatur = myWetter.temperatur + 1;
//				    				DigiWebApp.BautagebuchBautagesberichtDetailsController.set("wetter", myWetter);
				    			}
		                  }
			              , mousedown: {
					    			action: function(m_id, event) {
			            	  			if (typeof(device) != "undefined" || onMobile) return;
			            	  			var addFunc = function() {
						    				var myWetter = DigiWebApp.BautagebuchBautagesberichtDetailsController.wetter;
						    				if (myWetter.temperatur === 50) {
						    					return;
						    				}
						    				myWetter.temperatur = myWetter.temperatur + 1;
						    				DigiWebApp.BautagebuchBautagesberichtDetailsController.set("wetter", myWetter);
			            	  			}
			            	  			clearAllIntervals();

			            	  			DigiWebApp.BautagebuchMainController.buttonPressInterval_Var = setInterval(addFunc, DigiWebApp.BautagebuchMainController.buttonPressInterval);
			            	  			addFunc(); event.stopPropagation(); event.preventDefault();
					    			}
			                }
			              , mouseup: {
					    			action: function(m_id, event) {
			            	  			clearAllIntervals();

			              			}  
			              }
			              , touchstart: {
					    			action: function(m_id, event) {

			            	  			var addFunc = function() {
						    				var myWetter = DigiWebApp.BautagebuchBautagesberichtDetailsController.wetter;
						    				if (myWetter.temperatur === 50) {
						    					return;
						    				}
						    				myWetter.temperatur = myWetter.temperatur + 1;
						    				DigiWebApp.BautagebuchBautagesberichtDetailsController.set("wetter", myWetter);
			            	  			}
			            	  			clearAllIntervals();

			            	  			DigiWebApp.BautagebuchMainController.buttonPressInterval_Var = setInterval(addFunc, DigiWebApp.BautagebuchMainController.buttonPressInterval);
			            	  			addFunc(); event.stopPropagation(); event.preventDefault();
					    			}
			                }
			              , touchend: {
					    			action: function(m_id, event) {
			            	  			clearAllIntervals();

			              			}  
			              }
		              }
			    })
			    , TextValue: M.LabelView.design({
			    	  cssClass: 'whiteText centerText bold'
			    	, computedValue: {
				          contentBinding: {
				              target: DigiWebApp.BautagebuchBautagesberichtDetailsController
				            , property: 'wetter.temperatur'
				        }
				        , contentBindingReverse: {
				              target: DigiWebApp.BautagebuchBautagesberichtDetailsController
				            , property: 'wetter.temperatur'
					    }
			    		, value: 10
				        , operation: function(v) {
			    			return v + "°C";
				        }
				    }
			    })
			})
		})

		, luftfeuchteView: M.ContainerView.design({
			  childViews: 'myLabel myGrid'
	    	, cssClass: 'luftfeuchteView'
		    , myLabel: M.LabelView.design({
		    	  cssClass: 'whiteText marginBottom5px'
	        	, value: M.I18N.l('BautagebuchLuftfeuchtigkeit')
	        })
			, myGrid: M.GridView.design({
				  childViews: 'minusButton plusButton TextValue'
			    , layout: M.THREE_COLUMNS
			    , minusButton: M.ButtonView.design({
  		                value: "-"
		              , events: {
		                  tap: {
				    			action: function(m_id, event) {try{DigiWebApp.ApplicationController.vibrate();}catch(e2){}
//				    				var myWetter = DigiWebApp.BautagebuchBautagesberichtDetailsController.wetter;
//				    				if (myWetter.luftfeuchtigkeit === 0) {
//				    					return;
//				    				}
//				    				myWetter.luftfeuchtigkeit = myWetter.luftfeuchtigkeit - 10;
//				    				DigiWebApp.BautagebuchBautagesberichtDetailsController.set("wetter", myWetter);
				    			}
		                  }
			              , mousedown: {
					    			action: function(m_id, event) {
			            	  			if (typeof(device) != "undefined" || onMobile) return;
			            	  			var addFunc = function() {
						    				var myWetter = DigiWebApp.BautagebuchBautagesberichtDetailsController.wetter;
						    				if (myWetter.luftfeuchtigkeit === 0) {
						    					return;
						    				}
						    				myWetter.luftfeuchtigkeit = myWetter.luftfeuchtigkeit - 1;
						    				DigiWebApp.BautagebuchBautagesberichtDetailsController.set("wetter", myWetter);
			            	  			}
			            	  			clearAllIntervals();

			            	  			DigiWebApp.BautagebuchMainController.buttonPressInterval_Var = setInterval(addFunc, DigiWebApp.BautagebuchMainController.buttonPressInterval);
			            	  			addFunc(); event.stopPropagation(); event.preventDefault();
					    			}
			                }
			              , mouseup: {
					    			action: function(m_id, event) {
			            	  			clearAllIntervals();

			              			}  
			              }
			              , touchstart: {
					    			action: function(m_id, event) {

			            	  			var addFunc = function() {
						    				var myWetter = DigiWebApp.BautagebuchBautagesberichtDetailsController.wetter;
						    				if (myWetter.luftfeuchtigkeit === 0) {
						    					return;
						    				}
						    				myWetter.luftfeuchtigkeit = myWetter.luftfeuchtigkeit - 1;
						    				DigiWebApp.BautagebuchBautagesberichtDetailsController.set("wetter", myWetter);
			            	  			}
			            	  			clearAllIntervals();

			            	  			DigiWebApp.BautagebuchMainController.buttonPressInterval_Var = setInterval(addFunc, DigiWebApp.BautagebuchMainController.buttonPressInterval);
			            	  			addFunc(); event.stopPropagation(); event.preventDefault();
					    			}
			                }
			              , touchend: {
					    			action: function(m_id, event) {
			            	  			clearAllIntervals();

			              			}  
			              }

		              }
			    })
			    , plusButton: M.ButtonView.design({
		                value: "+"
		              , events: {
		                  tap: {
				    			action: function(m_id, event) {try{DigiWebApp.ApplicationController.vibrate();}catch(e2){} 
//				    				var myWetter = DigiWebApp.BautagebuchBautagesberichtDetailsController.wetter;
//				    				if (myWetter.luftfeuchtigkeit === 100) {
//				    					return;
//				    				}
//				    				myWetter.luftfeuchtigkeit = myWetter.luftfeuchtigkeit + 10;
//				    				DigiWebApp.BautagebuchBautagesberichtDetailsController.set("wetter", myWetter);
				    			}
		                  }
			              , mousedown: {
					    			action: function(m_id, event) {
			            	  			if (typeof(device) != "undefined" || onMobile) return;
			            	  			var addFunc = function() {
						    				var myWetter = DigiWebApp.BautagebuchBautagesberichtDetailsController.wetter;
						    				if (myWetter.luftfeuchtigkeit === 100) {
						    					return;
						    				}
						    				myWetter.luftfeuchtigkeit = myWetter.luftfeuchtigkeit + 1;
						    				DigiWebApp.BautagebuchBautagesberichtDetailsController.set("wetter", myWetter);
			            	  			}
			            	  			clearAllIntervals();

			            	  			DigiWebApp.BautagebuchMainController.buttonPressInterval_Var = setInterval(addFunc, DigiWebApp.BautagebuchMainController.buttonPressInterval);
			            	  			addFunc(); event.stopPropagation(); event.preventDefault();
					    			}
			                }
			              , mouseup: {
					    			action: function(m_id, event) {
			            	  			clearAllIntervals();

			              			}  
			              }
			              , touchstart: {
					    			action: function(m_id, event) {

			            	  			var addFunc = function() {
						    				var myWetter = DigiWebApp.BautagebuchBautagesberichtDetailsController.wetter;
						    				if (myWetter.luftfeuchtigkeit === 100) {
						    					return;
						    				}
						    				myWetter.luftfeuchtigkeit = myWetter.luftfeuchtigkeit + 1;
						    				DigiWebApp.BautagebuchBautagesberichtDetailsController.set("wetter", myWetter);
			            	  			}
			            	  			clearAllIntervals();

			            	  			DigiWebApp.BautagebuchMainController.buttonPressInterval_Var = setInterval(addFunc, DigiWebApp.BautagebuchMainController.buttonPressInterval);
			            	  			addFunc(); event.stopPropagation(); event.preventDefault();
					    			}
			                }
			              , touchend: {
					    			action: function(m_id, event) {
			            	  			clearAllIntervals();

			              			}  
			              }
		              }
			    })
			    , TextValue: M.LabelView.design({
			    	  cssClass: 'whiteText centerText bold'
			    	, computedValue: {
				          contentBinding: {
				              target: DigiWebApp.BautagebuchBautagesberichtDetailsController
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
			  childViews: 'myLabel myGrid'
	    	, cssClass: 'bewoelkungView'
		    , myLabel: M.LabelView.design({
		    	  cssClass: 'whiteText marginBottom5px'
	        	, value: M.I18N.l('BautagebuchBewoelkung')
	        })
			, myGrid: M.GridView.design({
				  childViews: 'minusButton plusButton TextValue'
			    , layout: M.THREE_COLUMNS
			    , minusButton: M.ButtonView.design({
  		                value: "-"
		              , events: {
		                  tap: {
				    			action: function(m_id, event) {try{DigiWebApp.ApplicationController.vibrate();}catch(e2){}
//				    				var myWetter = DigiWebApp.BautagebuchBautagesberichtDetailsController.wetter;
//				    				if (myWetter.bewoelkung === 0) {
//				    					return;
//				    				}
//				    				myWetter.bewoelkung = myWetter.bewoelkung - 1;
//				    				DigiWebApp.BautagebuchBautagesberichtDetailsController.set("wetter", myWetter);
				    			}
		                  }
			              , mousedown: {
					    			action: function(m_id, event) {
			            	  			if (typeof(device) != "undefined" || onMobile) return;
			            	  			var addFunc = function() {
						    				var myWetter = DigiWebApp.BautagebuchBautagesberichtDetailsController.wetter;
						    				if (myWetter.bewoelkung === 0) {
						    					return;
						    				}
						    				myWetter.bewoelkung = myWetter.bewoelkung - 1;
						    				DigiWebApp.BautagebuchBautagesberichtDetailsController.set("wetter", myWetter);
			            	  			}
			            	  			clearAllIntervals();

			            	  			DigiWebApp.BautagebuchMainController.buttonPressInterval_Var = setInterval(addFunc, DigiWebApp.BautagebuchMainController.buttonPressInterval);
			            	  			addFunc(); event.stopPropagation(); event.preventDefault();
					    			}
			                }
			              , mouseup: {
					    			action: function(m_id, event) {
			            	  			clearAllIntervals();

			              			}  
			              }
			              , touchstart: {
					    			action: function(m_id, event) {

			            	  			var addFunc = function() {
						    				var myWetter = DigiWebApp.BautagebuchBautagesberichtDetailsController.wetter;
						    				if (myWetter.bewoelkung === 0) {
						    					return;
						    				}
						    				myWetter.bewoelkung = myWetter.bewoelkung - 1;
						    				DigiWebApp.BautagebuchBautagesberichtDetailsController.set("wetter", myWetter);
			            	  			}
			            	  			clearAllIntervals();

			            	  			DigiWebApp.BautagebuchMainController.buttonPressInterval_Var = setInterval(addFunc, DigiWebApp.BautagebuchMainController.buttonPressInterval);
			            	  			addFunc(); event.stopPropagation(); event.preventDefault();
					    			}
			                }
			              , touchend: {
					    			action: function(m_id, event) {
			            	  			clearAllIntervals();

			              			}  
			              }
		              }
			    })
			    , plusButton: M.ButtonView.design({
		                value: "+"
		              , events: {
		                  tap: {
				    			action: function(m_id, event) {try{DigiWebApp.ApplicationController.vibrate();}catch(e2){} 
//				    				var myWetter = DigiWebApp.BautagebuchBautagesberichtDetailsController.wetter;
//				    				if (myWetter.bewoelkung === 3) {
//				    					return;
//				    				}
//				    				myWetter.bewoelkung = myWetter.bewoelkung + 1;
//				    				DigiWebApp.BautagebuchBautagesberichtDetailsController.set("wetter", myWetter);
				    			}
		                  }
			              , mousedown: {
					    			action: function(m_id, event) {
			            	  			if (typeof(device) != "undefined" || onMobile) return;
			            	  			var addFunc = function() {
						    				var myWetter = DigiWebApp.BautagebuchBautagesberichtDetailsController.wetter;
						    				if (myWetter.bewoelkung === 3) {
						    					return;
						    				}
						    				myWetter.bewoelkung = myWetter.bewoelkung + 1;
						    				DigiWebApp.BautagebuchBautagesberichtDetailsController.set("wetter", myWetter);
			            	  			}
			            	  			clearAllIntervals();

			            	  			DigiWebApp.BautagebuchMainController.buttonPressInterval_Var = setInterval(addFunc, DigiWebApp.BautagebuchMainController.buttonPressInterval);
			            	  			addFunc(); event.stopPropagation(); event.preventDefault();
					    			}
			                }
			              , mouseup: {
					    			action: function(m_id, event) {
			            	  			clearAllIntervals();

			              			}  
			              }
			              , touchstart: {
					    			action: function(m_id, event) {

			            	  			var addFunc = function() {
						    				var myWetter = DigiWebApp.BautagebuchBautagesberichtDetailsController.wetter;
						    				if (myWetter.bewoelkung === 3) {
						    					return;
						    				}
						    				myWetter.bewoelkung = myWetter.bewoelkung + 1;
						    				DigiWebApp.BautagebuchBautagesberichtDetailsController.set("wetter", myWetter);
			            	  			}
			            	  			clearAllIntervals();

			            	  			DigiWebApp.BautagebuchMainController.buttonPressInterval_Var = setInterval(addFunc, DigiWebApp.BautagebuchMainController.buttonPressInterval);
			            	  			addFunc(); event.stopPropagation(); event.preventDefault();
					    			}
			                }
			              , touchend: {
					    			action: function(m_id, event) {
			            	  			clearAllIntervals();

			              			}  
			              }
		              }
			    })
			    , TextValue: M.LabelView.design({
			    	  cssClass: 'whiteText centerText bold'
			    	, computedValue: {
				          contentBinding: {
				              target: DigiWebApp.BautagebuchBautagesberichtDetailsController
				            , property: 'wetter.bewoelkung'
				        }
			    		, value: 0
				        , operation: function(v) {
				    		switch(v) {
				    			case 0:
				    				return M.I18N.l('BautagebuchBewoelkungKlar');
					    		case 1:
				    				return M.I18N.l('BautagebuchBewoelkungMaessig');
					    		case 2:
				    				return M.I18N.l('BautagebuchBewoelkungBedeckt');
					    		case 3:
				    				return M.I18N.l('BautagebuchBewoelkungNeblig');
					    		default:
					    			return "";
				    		}
				        }
				    }
			    })
			})
		})

		, niederschlagView: M.ContainerView.design({
			  childViews: 'myLabel myGrid'
	    	, cssClass: 'niederschlagView'
		    , myLabel: M.LabelView.design({
		    	  cssClass: 'whiteText marginBottom5px'
	        	, value: M.I18N.l('BautagebuchNiederschlag')
	        })
			, myGrid: M.GridView.design({
				  childViews: 'minusButton plusButton TextValue'
			    , layout: M.THREE_COLUMNS
			    , minusButton: M.ButtonView.design({
  		                value: "-"
		              , events: {
		                  tap: {
				    			action: function(m_id, event) {try{DigiWebApp.ApplicationController.vibrate();}catch(e2){}
//				    				var myWetter = DigiWebApp.BautagebuchBautagesberichtDetailsController.wetter;
//				    				if (myWetter.niederschlag === 0) {
//				    					return;
//				    				}
//				    				myWetter.niederschlag = myWetter.niederschlag - 1;
//				    				DigiWebApp.BautagebuchBautagesberichtDetailsController.set("wetter", myWetter);
				    			}
		                  }
			              , mousedown: {
					    			action: function(m_id, event) {
			            	  			if (typeof(device) != "undefined" || onMobile) return;
			            	  			var addFunc = function() {
						    				var myWetter = DigiWebApp.BautagebuchBautagesberichtDetailsController.wetter;
						    				if (myWetter.niederschlag === 0) {
						    					return;
						    				}
						    				myWetter.niederschlag = myWetter.niederschlag - 1;
						    				DigiWebApp.BautagebuchBautagesberichtDetailsController.set("wetter", myWetter);
			            	  			}
			            	  			clearAllIntervals();

			            	  			DigiWebApp.BautagebuchMainController.buttonPressInterval_Var = setInterval(addFunc, DigiWebApp.BautagebuchMainController.buttonPressInterval);
			            	  			addFunc(); event.stopPropagation(); event.preventDefault();
					    			}
			                }
			              , mouseup: {
					    			action: function(m_id, event) {
			            	  			clearAllIntervals();

			              			}  
			              }
			              , touchstart: {
					    			action: function(m_id, event) {

			            	  			var addFunc = function() {
						    				var myWetter = DigiWebApp.BautagebuchBautagesberichtDetailsController.wetter;
						    				if (myWetter.niederschlag === 0) {
						    					return;
						    				}
						    				myWetter.niederschlag = myWetter.niederschlag - 1;
						    				DigiWebApp.BautagebuchBautagesberichtDetailsController.set("wetter", myWetter);
			            	  			}
			            	  			clearAllIntervals();

			            	  			DigiWebApp.BautagebuchMainController.buttonPressInterval_Var = setInterval(addFunc, DigiWebApp.BautagebuchMainController.buttonPressInterval);
			            	  			addFunc(); event.stopPropagation(); event.preventDefault();
					    			}
			                }
			              , touchend: {
					    			action: function(m_id, event) {
			            	  			clearAllIntervals();

			              			}  
			              }
		              }
			    })
			    , plusButton: M.ButtonView.design({
		                value: "+"
		              , events: {
		                  tap: {
				    			action: function(m_id, event) {try{DigiWebApp.ApplicationController.vibrate();}catch(e2){} 
//				    				var myWetter = DigiWebApp.BautagebuchBautagesberichtDetailsController.wetter;
//				    				if (myWetter.niederschlag === 5) {
//				    					return;
//				    				}
//				    				myWetter.niederschlag = myWetter.niederschlag + 1;
//				    				DigiWebApp.BautagebuchBautagesberichtDetailsController.set("wetter", myWetter);
				    			}
		                  }
			              , mousedown: {
					    			action: function(m_id, event) {
	            	  					if (typeof(device) != "undefined" || onMobile) return;
			            	  			var addFunc = function() {
						    				var myWetter = DigiWebApp.BautagebuchBautagesberichtDetailsController.wetter;
						    				if (myWetter.niederschlag === 5) {
						    					return;
						    				}
						    				myWetter.niederschlag = myWetter.niederschlag + 1;
						    				DigiWebApp.BautagebuchBautagesberichtDetailsController.set("wetter", myWetter);
			            	  			}
			            	  			clearAllIntervals();

			            	  			DigiWebApp.BautagebuchMainController.buttonPressInterval_Var = setInterval(addFunc, DigiWebApp.BautagebuchMainController.buttonPressInterval);
			            	  			addFunc(); event.stopPropagation(); event.preventDefault();
					    			}
			                }
			              , mouseup: {
					    			action: function(m_id, event) {
			            	  			clearAllIntervals();

			              			}  
			              }
			              , touchstart: {
					    			action: function(m_id, event) {
			            	  			if (DigiWebApp.BautagebuchWetterPage.eventLoopInAction && DigiWebApp.BautagebuchWetterPage.eventLoopInAction && DigiWebApp.BautagebuchWetterPage.eventLoopInAction != event.type) return;
			            	  			var addFunc = function() {
						    				var myWetter = DigiWebApp.BautagebuchBautagesberichtDetailsController.wetter;
						    				if (myWetter.niederschlag === 5) {
						    					return;
						    				}
						    				myWetter.niederschlag = myWetter.niederschlag + 1;
						    				DigiWebApp.BautagebuchBautagesberichtDetailsController.set("wetter", myWetter);
			            	  			}
			            	  			clearAllIntervals();

			            	  			DigiWebApp.BautagebuchMainController.buttonPressInterval_Var = setInterval(addFunc, DigiWebApp.BautagebuchMainController.buttonPressInterval);
			            	  			addFunc(); event.stopPropagation(); event.preventDefault();
					    			}
			                }
			              , touchend: {
					    			action: function(m_id, event) {
			            	  			clearAllIntervals();

			              			}  
			              }
		              }
			    })
			    , TextValue: M.LabelView.design({
			    	  cssClass: 'whiteText centerText bold'
			    	, computedValue: {
				          contentBinding: {
				              target: DigiWebApp.BautagebuchBautagesberichtDetailsController
				            , property: 'wetter.niederschlag'
				        }
			    		, value: 0
				        , operation: function(v) {
				    		switch(v) {
				    			case 0:
				    				return M.I18N.l('BautagebuchNiederschlagKein');
					    		case 1:
				    				return M.I18N.l('BautagebuchNiederschlagNiesel');
					    		case 2:
				    				return M.I18N.l('BautagebuchNiederschlagRegen');
					    		case 3:
				    				return M.I18N.l('BautagebuchNiederschlagGraupel');
					    		case 4:
				    				return M.I18N.l('BautagebuchNiederschlagSchnee');
					    		case 5:
				    				return M.I18N.l('BautagebuchNiederschlagHagel');
					    		default:
					    		    return "";
				    		}
				        }
				    }
			    })
			})
		})

		, windView: M.ContainerView.design({
			  childViews: 'myLabel myGrid'
	    	, cssClass: 'windView'
		    , myLabel: M.LabelView.design({
		    	  cssClass: 'whiteText marginBottom5px'
	        	, value: M.I18N.l('BautagebuchWind')
	        })
			, myGrid: M.GridView.design({
				  childViews: 'minusButton plusButton TextValue'
			    , layout: M.THREE_COLUMNS
			    , minusButton: M.ButtonView.design({
  		                value: "-"
		              , events: {
		                  tap: {
				    			action: function(m_id, event) {try{DigiWebApp.ApplicationController.vibrate();}catch(e2){}
//				    				var myWetter = DigiWebApp.BautagebuchBautagesberichtDetailsController.wetter;
//				    				if (myWetter.wind === 0) {
//				    					return;
//				    				}
//				    				myWetter.wind = myWetter.wind - 1;
//				    				DigiWebApp.BautagebuchBautagesberichtDetailsController.set("wetter", myWetter);
				    			}
		                  }
			              , mousedown: {
					    			action: function(m_id, event) {
	            	  					if (typeof(device) != "undefined" || onMobile) return;
			            	  			var addFunc = function() {
						    				var myWetter = DigiWebApp.BautagebuchBautagesberichtDetailsController.wetter;
						    				if (myWetter.wind === 0) {
						    					return;
						    				}
						    				myWetter.wind = myWetter.wind - 1;
						    				DigiWebApp.BautagebuchBautagesberichtDetailsController.set("wetter", myWetter);
			            	  			}
			            	  			clearAllIntervals();

			            	  			DigiWebApp.BautagebuchMainController.buttonPressInterval_Var = setInterval(addFunc, DigiWebApp.BautagebuchMainController.buttonPressInterval);
			            	  			addFunc(); event.stopPropagation(); event.preventDefault();
					    			}
			                }
			              , mouseup: {
					    			action: function(m_id, event) {
			            	  			clearAllIntervals();

			              			}  
			              }
			              , touchstart: {
					    			action: function(m_id, event) {

			            	  			var addFunc = function() {
						    				var myWetter = DigiWebApp.BautagebuchBautagesberichtDetailsController.wetter;
						    				if (myWetter.wind === 0) {
						    					return;
						    				}
						    				myWetter.wind = myWetter.wind - 1;
						    				DigiWebApp.BautagebuchBautagesberichtDetailsController.set("wetter", myWetter);
			            	  			}
			            	  			clearAllIntervals();

			            	  			DigiWebApp.BautagebuchMainController.buttonPressInterval_Var = setInterval(addFunc, DigiWebApp.BautagebuchMainController.buttonPressInterval);
			            	  			addFunc(); event.stopPropagation(); event.preventDefault();
					    			}
			                }
			              , touchend: {
					    			action: function(m_id, event) {
			            	  			clearAllIntervals();

			              			}  
			              }
		              }
			    })
			    , plusButton: M.ButtonView.design({
		                value: "+"
		              , events: {
		                  tap: {
				    			action: function(m_id, event) {try{DigiWebApp.ApplicationController.vibrate();}catch(e2){} 
//				    				var myWetter = DigiWebApp.BautagebuchBautagesberichtDetailsController.wetter;
//				    				if (myWetter.wind === 3) {
//				    					return;
//				    				}
//				    				myWetter.wind = myWetter.wind + 1;
//				    				DigiWebApp.BautagebuchBautagesberichtDetailsController.set("wetter", myWetter);
				    			}
		                  }
			              , mousedown: {
					    			action: function(m_id, event) {
	            	  					if (typeof(device) != "undefined" || onMobile) return;
			            	  			var addFunc = function() {
						    				var myWetter = DigiWebApp.BautagebuchBautagesberichtDetailsController.wetter;
						    				if (myWetter.wind === 4) {
						    					return;
						    				}
						    				myWetter.wind = myWetter.wind + 1;
						    				DigiWebApp.BautagebuchBautagesberichtDetailsController.set("wetter", myWetter);
			            	  			}
			            	  			clearAllIntervals();

			            	  			DigiWebApp.BautagebuchMainController.buttonPressInterval_Var = setInterval(addFunc, DigiWebApp.BautagebuchMainController.buttonPressInterval);
			            	  			addFunc(); event.stopPropagation(); event.preventDefault();
					    			}
			                }
			              , mouseup: {
					    			action: function(m_id, event) {
			            	  			clearAllIntervals();

			              			}  
			              }
			              , touchstart: {
					    			action: function(m_id, event) {

			            	  			var addFunc = function() {
						    				var myWetter = DigiWebApp.BautagebuchBautagesberichtDetailsController.wetter;
						    				if (myWetter.wind === 4) {
						    					return;
						    				}
						    				myWetter.wind = myWetter.wind + 1;
						    				DigiWebApp.BautagebuchBautagesberichtDetailsController.set("wetter", myWetter);
			            	  			}
			            	  			clearAllIntervals();

			            	  			DigiWebApp.BautagebuchMainController.buttonPressInterval_Var = setInterval(addFunc, DigiWebApp.BautagebuchMainController.buttonPressInterval);
			            	  			addFunc(); event.stopPropagation(); event.preventDefault();
					    			}
			                }
			              , touchend: {
					    			action: function(m_id, event) {
			            	  			clearAllIntervals();

			              			}  
			              }
		              }
			    })
			    , TextValue: M.LabelView.design({
			    	  cssClass: 'whiteText centerText bold'
			    	, computedValue: {
				          contentBinding: {
				              target: DigiWebApp.BautagebuchBautagesberichtDetailsController
				            , property: 'wetter.wind'
				        }
			    		, value: 0
				        , operation: function(v) {
				    		switch(v) {
				    			case 0:
				    				return M.I18N.l('BautagebuchWindStill');
					    		case 1:
				    				return M.I18N.l('BautagebuchWindMaessig');
					    		case 2:
				    				return M.I18N.l('BautagebuchWindBoeig');
					    		case 3:
				    				return M.I18N.l('BautagebuchWindStuermisch');
					    		case 4:
				    				return M.I18N.l('BautagebuchWindOrkan');
					    		default:
					    		    return "";
				    		}
				        }
				    }
			    })
			})
		})

        , speichernButton: M.GridView.design({
              childViews: 'button icon'
            , layout: {
                  cssClass: 'digiButton'
                , columns: {
                      0: 'button'
                    , 1: 'icon'
                }
            }
            , button: M.ButtonView.design({
                  value: M.I18N.l('save')
                , cssClass: 'digiButton green_background'
                , anchorLocation: M.RIGHT
                , events: {
                    tap: {
						action: function(m_id, event) {
								clearAllTimeouts();
								DigiWebApp.BautagebuchBautagesberichtDetailsController.save(DigiWebApp.NavigationController.backToBautagebuchBautagesberichtDetailsPageTransition);
						}
                    }
                }
            })
            , icon: M.ImageView.design({
                value: 'theme/images/icon_bookTime.png'
            })
        })
        
//		, speichernButton: M.ButtonView.design({
//	          value: M.I18N.l('save')
//	        , cssClass: 'marginTop25'
//	        //, anchorLocation: M.CENTER
//	        , events: {
//		            tap: {
//		                //  target: DigiWebApp.NavigationController
//		                //, action: 'backToBautagebuchBautagesberichtDetailsPageTransition'
//						action: function(m_id, event) {
//								clearAllTimeouts();
//								DigiWebApp.NavigationController.backToBautagebuchBautagesberichtDetailsPageTransition();
//						}
//		            }
//	          }
//	    })
	    
    })

});

