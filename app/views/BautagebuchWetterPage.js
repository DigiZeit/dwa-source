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
				DigiWebApp.BautagebuchBautageberichtDetailsController.set('wetterBackup', JSON.parse(JSON.stringify(DigiWebApp.BautagebuchBautageberichtDetailsController.get('wetter'))));
			}
        }
        , pagehide: {
            action: function() {
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
                    , action: function() {try{DigiWebApp.ApplicationController.vibrate();}catch(e2){}
                    	clearAllIntervals();
                    	DigiWebApp.BautagebuchBautageberichtDetailsController.set('wetter', JSON.parse(JSON.stringify(DigiWebApp.BautagebuchBautageberichtDetailsController.wetterBackup)));
                    	this.backToBautagebuchBautageberichtDetailsPageTransition();
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
				    			action: function() {try{DigiWebApp.ApplicationController.vibrate();}catch(e2){}
//				    				var myWetter = DigiWebApp.BautagebuchBautageberichtDetailsController.wetter;
//				    				if (myWetter.temperatur === -50) {
//				    					return;
//				    				}
//				    				myWetter.temperatur = myWetter.temperatur - 1;
//				    				DigiWebApp.BautagebuchBautageberichtDetailsController.set("wetter", myWetter);
				    			}
		                  }
			              , mousedown: {
					    			action: function(m_id, event) {
			            	  			var addFunc = function(m_id, event) {
						    				var myWetter = DigiWebApp.BautagebuchBautageberichtDetailsController.wetter;
						    				if (myWetter.temperatur === -50) {
						    					return;
						    				}
						    				myWetter.temperatur = myWetter.temperatur - 1;
						    				DigiWebApp.BautagebuchBautageberichtDetailsController.set("wetter", myWetter);
			            	  			}
			            	  			clearAllIntervals();
			            	  			DigiWebApp.BautagebuchMainController.buttonPressInterval_Var = setInterval(addFunc, DigiWebApp.BautagebuchMainController.buttonPressInterval);
			            	  			addFunc(); event.preventDefault();
					    			}
			              }
			              , mouseup: {
					    			action: function() {
			            	  			clearAllIntervals();
			              			}  
			              }
			              , touchstart: {
					    			action: function(m_id, event) {
			            	  			var addFunc = function(m_id, event) {
						    				var myWetter = DigiWebApp.BautagebuchBautageberichtDetailsController.wetter;
						    				if (myWetter.temperatur === -50) {
						    					return;
						    				}
						    				myWetter.temperatur = myWetter.temperatur - 1;
						    				DigiWebApp.BautagebuchBautageberichtDetailsController.set("wetter", myWetter);
			            	  			}
			            	  			clearAllIntervals();
			            	  			DigiWebApp.BautagebuchMainController.buttonPressInterval_Var = setInterval(addFunc, DigiWebApp.BautagebuchMainController.buttonPressInterval);
			            	  			addFunc(); event.preventDefault();
					    			}
			                }
			              , touchend: {
					    			action: function() {
			            	  			clearAllIntervals();
			              			}  
			              }
		              }
			    })
			    , plusButton: M.ButtonView.design({
		                value: "+"
		              , events: {
		                  tap: {
				    			action: function() {try{DigiWebApp.ApplicationController.vibrate();}catch(e2){} 
//				    				var myWetter = DigiWebApp.BautagebuchBautageberichtDetailsController.wetter;
//				    				if (myWetter.temperatur === 50) {
//				    					return;
//				    				}
//				    				myWetter.temperatur = myWetter.temperatur + 1;
//				    				DigiWebApp.BautagebuchBautageberichtDetailsController.set("wetter", myWetter);
				    			}
		                  }
			              , mousedown: {
					    			action: function() {
			            	  			var addFunc = function(m_id, event) {
						    				var myWetter = DigiWebApp.BautagebuchBautageberichtDetailsController.wetter;
						    				if (myWetter.temperatur === 50) {
						    					return;
						    				}
						    				myWetter.temperatur = myWetter.temperatur + 1;
						    				DigiWebApp.BautagebuchBautageberichtDetailsController.set("wetter", myWetter);
			            	  			}
			            	  			clearAllIntervals();
			            	  			DigiWebApp.BautagebuchMainController.buttonPressInterval_Var = setInterval(addFunc, DigiWebApp.BautagebuchMainController.buttonPressInterval);
			            	  			addFunc(); event.preventDefault();
					    			}
			                }
			              , mouseup: {
					    			action: function() {
			            	  			clearAllIntervals();
			              			}  
			              }
			              , touchstart: {
					    			action: function() {
			            	  			var addFunc = function(m_id, event) {
						    				var myWetter = DigiWebApp.BautagebuchBautageberichtDetailsController.wetter;
						    				if (myWetter.temperatur === 50) {
						    					return;
						    				}
						    				myWetter.temperatur = myWetter.temperatur + 1;
						    				DigiWebApp.BautagebuchBautageberichtDetailsController.set("wetter", myWetter);
			            	  			}
			            	  			clearAllIntervals();
			            	  			DigiWebApp.BautagebuchMainController.buttonPressInterval_Var = setInterval(addFunc, DigiWebApp.BautagebuchMainController.buttonPressInterval);
			            	  			addFunc(); event.preventDefault();
					    			}
			                }
			              , touchend: {
					    			action: function() {
			            	  			clearAllIntervals();
			              			}  
			              }
		              }
			    })
			    , TextValue: M.LabelView.design({
			    	  cssClass: 'whiteText centerText bold'
			    	, computedValue: {
				          contentBinding: {
				              target: DigiWebApp.BautagebuchBautageberichtDetailsController
				            , property: 'wetter.temperatur'
				        }
				        , contentBindingReverse: {
				              target: DigiWebApp.BautagebuchBautageberichtDetailsController
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
				    			action: function() {try{DigiWebApp.ApplicationController.vibrate();}catch(e2){}
//				    				var myWetter = DigiWebApp.BautagebuchBautageberichtDetailsController.wetter;
//				    				if (myWetter.luftfeuchtigkeit === 0) {
//				    					return;
//				    				}
//				    				myWetter.luftfeuchtigkeit = myWetter.luftfeuchtigkeit - 10;
//				    				DigiWebApp.BautagebuchBautageberichtDetailsController.set("wetter", myWetter);
				    			}
		                  }
			              , mousedown: {
					    			action: function(m_id, event) {
			            	  			var addFunc = function(m_id, event) {
						    				var myWetter = DigiWebApp.BautagebuchBautageberichtDetailsController.wetter;
						    				if (myWetter.luftfeuchtigkeit === 0) {
						    					return;
						    				}
						    				myWetter.luftfeuchtigkeit = myWetter.luftfeuchtigkeit - 1;
						    				DigiWebApp.BautagebuchBautageberichtDetailsController.set("wetter", myWetter);
			            	  			}
			            	  			clearAllIntervals();
			            	  			DigiWebApp.BautagebuchMainController.buttonPressInterval_Var = setInterval(addFunc, DigiWebApp.BautagebuchMainController.buttonPressInterval);
			            	  			addFunc(); event.preventDefault();
					    			}
			                }
			              , mouseup: {
					    			action: function() {
			            	  			clearAllIntervals();
			              			}  
			              }
			              , touchstart: {
					    			action: function(m_id, event) {
			            	  			var addFunc = function(m_id, event) {
						    				var myWetter = DigiWebApp.BautagebuchBautageberichtDetailsController.wetter;
						    				if (myWetter.luftfeuchtigkeit === 0) {
						    					return;
						    				}
						    				myWetter.luftfeuchtigkeit = myWetter.luftfeuchtigkeit - 1;
						    				DigiWebApp.BautagebuchBautageberichtDetailsController.set("wetter", myWetter);
			            	  			}
			            	  			clearAllIntervals();
			            	  			DigiWebApp.BautagebuchMainController.buttonPressInterval_Var = setInterval(addFunc, DigiWebApp.BautagebuchMainController.buttonPressInterval);
			            	  			addFunc(); event.preventDefault();
					    			}
			                }
			              , touchend: {
					    			action: function() {
			            	  			clearAllIntervals();
			              			}  
			              }

		              }
			    })
			    , plusButton: M.ButtonView.design({
		                value: "+"
		              , events: {
		                  tap: {
				    			action: function() {try{DigiWebApp.ApplicationController.vibrate();}catch(e2){} 
//				    				var myWetter = DigiWebApp.BautagebuchBautageberichtDetailsController.wetter;
//				    				if (myWetter.luftfeuchtigkeit === 100) {
//				    					return;
//				    				}
//				    				myWetter.luftfeuchtigkeit = myWetter.luftfeuchtigkeit + 10;
//				    				DigiWebApp.BautagebuchBautageberichtDetailsController.set("wetter", myWetter);
				    			}
		                  }
			              , mousedown: {
					    			action: function() {
			            	  			var addFunc = function(m_id, event) {
						    				var myWetter = DigiWebApp.BautagebuchBautageberichtDetailsController.wetter;
						    				if (myWetter.luftfeuchtigkeit === 100) {
						    					return;
						    				}
						    				myWetter.luftfeuchtigkeit = myWetter.luftfeuchtigkeit + 1;
						    				DigiWebApp.BautagebuchBautageberichtDetailsController.set("wetter", myWetter);
			            	  			}
			            	  			clearAllIntervals();
			            	  			DigiWebApp.BautagebuchMainController.buttonPressInterval_Var = setInterval(addFunc, DigiWebApp.BautagebuchMainController.buttonPressInterval);
			            	  			addFunc(); event.preventDefault();
					    			}
			                }
			              , mouseup: {
					    			action: function() {
			            	  			clearAllIntervals();
			              			}  
			              }
			              , touchstart: {
					    			action: function() {
			            	  			var addFunc = function(m_id, event) {
						    				var myWetter = DigiWebApp.BautagebuchBautageberichtDetailsController.wetter;
						    				if (myWetter.luftfeuchtigkeit === 100) {
						    					return;
						    				}
						    				myWetter.luftfeuchtigkeit = myWetter.luftfeuchtigkeit + 1;
						    				DigiWebApp.BautagebuchBautageberichtDetailsController.set("wetter", myWetter);
			            	  			}
			            	  			clearAllIntervals();
			            	  			DigiWebApp.BautagebuchMainController.buttonPressInterval_Var = setInterval(addFunc, DigiWebApp.BautagebuchMainController.buttonPressInterval);
			            	  			addFunc(); event.preventDefault();
					    			}
			                }
			              , touchend: {
					    			action: function() {
			            	  			clearAllIntervals();
			              			}  
			              }
		              }
			    })
			    , TextValue: M.LabelView.design({
			    	  cssClass: 'whiteText centerText bold'
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
				    			action: function() {try{DigiWebApp.ApplicationController.vibrate();}catch(e2){}
//				    				var myWetter = DigiWebApp.BautagebuchBautageberichtDetailsController.wetter;
//				    				if (myWetter.bewoelkung === 0) {
//				    					return;
//				    				}
//				    				myWetter.bewoelkung = myWetter.bewoelkung - 1;
//				    				DigiWebApp.BautagebuchBautageberichtDetailsController.set("wetter", myWetter);
				    			}
		                  }
			              , mousedown: {
					    			action: function(m_id, event) {
			            	  			var addFunc = function(m_id, event) {
						    				var myWetter = DigiWebApp.BautagebuchBautageberichtDetailsController.wetter;
						    				if (myWetter.bewoelkung === 0) {
						    					return;
						    				}
						    				myWetter.bewoelkung = myWetter.bewoelkung - 1;
						    				DigiWebApp.BautagebuchBautageberichtDetailsController.set("wetter", myWetter);
			            	  			}
			            	  			clearAllIntervals();
			            	  			DigiWebApp.BautagebuchMainController.buttonPressInterval_Var = setInterval(addFunc, DigiWebApp.BautagebuchMainController.buttonPressInterval);
			            	  			addFunc(); event.preventDefault();
					    			}
			                }
			              , mouseup: {
					    			action: function() {
			            	  			clearAllIntervals();
			              			}  
			              }
			              , touchstart: {
					    			action: function(m_id, event) {
			            	  			var addFunc = function(m_id, event) {
						    				var myWetter = DigiWebApp.BautagebuchBautageberichtDetailsController.wetter;
						    				if (myWetter.bewoelkung === 0) {
						    					return;
						    				}
						    				myWetter.bewoelkung = myWetter.bewoelkung - 1;
						    				DigiWebApp.BautagebuchBautageberichtDetailsController.set("wetter", myWetter);
			            	  			}
			            	  			clearAllIntervals();
			            	  			DigiWebApp.BautagebuchMainController.buttonPressInterval_Var = setInterval(addFunc, DigiWebApp.BautagebuchMainController.buttonPressInterval);
			            	  			addFunc(); event.preventDefault();
					    			}
			                }
			              , touchend: {
					    			action: function() {
			            	  			clearAllIntervals();
			              			}  
			              }
		              }
			    })
			    , plusButton: M.ButtonView.design({
		                value: "+"
		              , events: {
		                  tap: {
				    			action: function() {try{DigiWebApp.ApplicationController.vibrate();}catch(e2){} 
//				    				var myWetter = DigiWebApp.BautagebuchBautageberichtDetailsController.wetter;
//				    				if (myWetter.bewoelkung === 3) {
//				    					return;
//				    				}
//				    				myWetter.bewoelkung = myWetter.bewoelkung + 1;
//				    				DigiWebApp.BautagebuchBautageberichtDetailsController.set("wetter", myWetter);
				    			}
		                  }
			              , mousedown: {
					    			action: function() {
			            	  			var addFunc = function(m_id, event) {
						    				var myWetter = DigiWebApp.BautagebuchBautageberichtDetailsController.wetter;
						    				if (myWetter.bewoelkung === 3) {
						    					return;
						    				}
						    				myWetter.bewoelkung = myWetter.bewoelkung + 1;
						    				DigiWebApp.BautagebuchBautageberichtDetailsController.set("wetter", myWetter);
			            	  			}
			            	  			clearAllIntervals();
			            	  			DigiWebApp.BautagebuchMainController.buttonPressInterval_Var = setInterval(addFunc, DigiWebApp.BautagebuchMainController.buttonPressInterval);
			            	  			addFunc(); event.preventDefault();
					    			}
			                }
			              , mouseup: {
					    			action: function() {
			            	  			clearAllIntervals();
			              			}  
			              }
			              , touchstart: {
					    			action: function() {
			            	  			var addFunc = function(m_id, event) {
						    				var myWetter = DigiWebApp.BautagebuchBautageberichtDetailsController.wetter;
						    				if (myWetter.bewoelkung === 3) {
						    					return;
						    				}
						    				myWetter.bewoelkung = myWetter.bewoelkung + 1;
						    				DigiWebApp.BautagebuchBautageberichtDetailsController.set("wetter", myWetter);
			            	  			}
			            	  			clearAllIntervals();
			            	  			DigiWebApp.BautagebuchMainController.buttonPressInterval_Var = setInterval(addFunc, DigiWebApp.BautagebuchMainController.buttonPressInterval);
			            	  			addFunc(); event.preventDefault();
					    			}
			                }
			              , touchend: {
					    			action: function() {
			            	  			clearAllIntervals();
			              			}  
			              }
		              }
			    })
			    , TextValue: M.LabelView.design({
			    	  cssClass: 'whiteText centerText bold'
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
				    			action: function() {try{DigiWebApp.ApplicationController.vibrate();}catch(e2){}
//				    				var myWetter = DigiWebApp.BautagebuchBautageberichtDetailsController.wetter;
//				    				if (myWetter.niederschlag === 0) {
//				    					return;
//				    				}
//				    				myWetter.niederschlag = myWetter.niederschlag - 1;
//				    				DigiWebApp.BautagebuchBautageberichtDetailsController.set("wetter", myWetter);
				    			}
		                  }
			              , mousedown: {
					    			action: function() {
			            	  			var addFunc = function(m_id, event) {
						    				var myWetter = DigiWebApp.BautagebuchBautageberichtDetailsController.wetter;
						    				if (myWetter.niederschlag === 0) {
						    					return;
						    				}
						    				myWetter.niederschlag = myWetter.niederschlag - 1;
						    				DigiWebApp.BautagebuchBautageberichtDetailsController.set("wetter", myWetter);
			            	  			}
			            	  			clearAllIntervals();
			            	  			DigiWebApp.BautagebuchMainController.buttonPressInterval_Var = setInterval(addFunc, DigiWebApp.BautagebuchMainController.buttonPressInterval);
			            	  			addFunc(); event.preventDefault();
					    			}
			                }
			              , mouseup: {
					    			action: function() {
			            	  			clearAllIntervals();
			              			}  
			              }
			              , touchstart: {
					    			action: function() {
			            	  			var addFunc = function(m_id, event) {
						    				var myWetter = DigiWebApp.BautagebuchBautageberichtDetailsController.wetter;
						    				if (myWetter.niederschlag === 0) {
						    					return;
						    				}
						    				myWetter.niederschlag = myWetter.niederschlag - 1;
						    				DigiWebApp.BautagebuchBautageberichtDetailsController.set("wetter", myWetter);
			            	  			}
			            	  			clearAllIntervals();
			            	  			DigiWebApp.BautagebuchMainController.buttonPressInterval_Var = setInterval(addFunc, DigiWebApp.BautagebuchMainController.buttonPressInterval);
			            	  			addFunc(); event.preventDefault();
					    			}
			                }
			              , touchend: {
					    			action: function() {
			            	  			clearAllIntervals();
			              			}  
			              }
		              }
			    })
			    , plusButton: M.ButtonView.design({
		                value: "+"
		              , events: {
		                  tap: {
				    			action: function() {try{DigiWebApp.ApplicationController.vibrate();}catch(e2){} 
//				    				var myWetter = DigiWebApp.BautagebuchBautageberichtDetailsController.wetter;
//				    				if (myWetter.niederschlag === 5) {
//				    					return;
//				    				}
//				    				myWetter.niederschlag = myWetter.niederschlag + 1;
//				    				DigiWebApp.BautagebuchBautageberichtDetailsController.set("wetter", myWetter);
				    			}
		                  }
			              , mousedown: {
					    			action: function() {
			            	  			var addFunc = function(m_id, event) {
						    				var myWetter = DigiWebApp.BautagebuchBautageberichtDetailsController.wetter;
						    				if (myWetter.niederschlag === 5) {
						    					return;
						    				}
						    				myWetter.niederschlag = myWetter.niederschlag + 1;
						    				DigiWebApp.BautagebuchBautageberichtDetailsController.set("wetter", myWetter);
			            	  			}
			            	  			clearAllIntervals();
			            	  			DigiWebApp.BautagebuchMainController.buttonPressInterval_Var = setInterval(addFunc, DigiWebApp.BautagebuchMainController.buttonPressInterval);
			            	  			addFunc(); event.preventDefault();
					    			}
			                }
			              , mouseup: {
					    			action: function() {
			            	  			clearAllIntervals();
			              			}  
			              }
			              , touchstart: {
					    			action: function() {
			            	  			var addFunc = function(m_id, event) {
						    				var myWetter = DigiWebApp.BautagebuchBautageberichtDetailsController.wetter;
						    				if (myWetter.niederschlag === 5) {
						    					return;
						    				}
						    				myWetter.niederschlag = myWetter.niederschlag + 1;
						    				DigiWebApp.BautagebuchBautageberichtDetailsController.set("wetter", myWetter);
			            	  			}
			            	  			clearAllIntervals();
			            	  			DigiWebApp.BautagebuchMainController.buttonPressInterval_Var = setInterval(addFunc, DigiWebApp.BautagebuchMainController.buttonPressInterval);
			            	  			addFunc(); event.preventDefault();
					    			}
			                }
			              , touchend: {
					    			action: function() {
			            	  			clearAllIntervals();
			              			}  
			              }
		              }
			    })
			    , TextValue: M.LabelView.design({
			    	  cssClass: 'whiteText centerText bold'
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
				    			action: function() {try{DigiWebApp.ApplicationController.vibrate();}catch(e2){}
//				    				var myWetter = DigiWebApp.BautagebuchBautageberichtDetailsController.wetter;
//				    				if (myWetter.wind === 0) {
//				    					return;
//				    				}
//				    				myWetter.wind = myWetter.wind - 1;
//				    				DigiWebApp.BautagebuchBautageberichtDetailsController.set("wetter", myWetter);
				    			}
		                  }
			              , mousedown: {
					    			action: function() {
			            	  			var addFunc = function(m_id, event) {
						    				var myWetter = DigiWebApp.BautagebuchBautageberichtDetailsController.wetter;
						    				if (myWetter.wind === 0) {
						    					return;
						    				}
						    				myWetter.wind = myWetter.wind - 1;
						    				DigiWebApp.BautagebuchBautageberichtDetailsController.set("wetter", myWetter);
			            	  			}
			            	  			clearAllIntervals();
			            	  			DigiWebApp.BautagebuchMainController.buttonPressInterval_Var = setInterval(addFunc, DigiWebApp.BautagebuchMainController.buttonPressInterval);
			            	  			addFunc(); event.preventDefault();
					    			}
			                }
			              , mouseup: {
					    			action: function() {
			            	  			clearAllIntervals();
			              			}  
			              }
			              , touchstart: {
					    			action: function() {
			            	  			var addFunc = function(m_id, event) {
						    				var myWetter = DigiWebApp.BautagebuchBautageberichtDetailsController.wetter;
						    				if (myWetter.wind === 0) {
						    					return;
						    				}
						    				myWetter.wind = myWetter.wind - 1;
						    				DigiWebApp.BautagebuchBautageberichtDetailsController.set("wetter", myWetter);
			            	  			}
			            	  			clearAllIntervals();
			            	  			DigiWebApp.BautagebuchMainController.buttonPressInterval_Var = setInterval(addFunc, DigiWebApp.BautagebuchMainController.buttonPressInterval);
			            	  			addFunc(); event.preventDefault();
					    			}
			                }
			              , touchend: {
					    			action: function() {
			            	  			clearAllIntervals();
			              			}  
			              }
		              }
			    })
			    , plusButton: M.ButtonView.design({
		                value: "+"
		              , events: {
		                  tap: {
				    			action: function() {try{DigiWebApp.ApplicationController.vibrate();}catch(e2){} 
//				    				var myWetter = DigiWebApp.BautagebuchBautageberichtDetailsController.wetter;
//				    				if (myWetter.wind === 3) {
//				    					return;
//				    				}
//				    				myWetter.wind = myWetter.wind + 1;
//				    				DigiWebApp.BautagebuchBautageberichtDetailsController.set("wetter", myWetter);
				    			}
		                  }
			              , mousedown: {
					    			action: function() {
			            	  			var addFunc = function(m_id, event) {
						    				var myWetter = DigiWebApp.BautagebuchBautageberichtDetailsController.wetter;
						    				if (myWetter.wind === 3) {
						    					return;
						    				}
						    				myWetter.wind = myWetter.wind + 1;
						    				DigiWebApp.BautagebuchBautageberichtDetailsController.set("wetter", myWetter);
			            	  			}
			            	  			clearAllIntervals();
			            	  			DigiWebApp.BautagebuchMainController.buttonPressInterval_Var = setInterval(addFunc, DigiWebApp.BautagebuchMainController.buttonPressInterval);
			            	  			addFunc(); event.preventDefault();
					    			}
			                }
			              , mouseup: {
					    			action: function() {
			            	  			clearAllIntervals();
			              			}  
			              }
			              , touchstart: {
					    			action: function() {
			            	  			var addFunc = function(m_id, event) {
						    				var myWetter = DigiWebApp.BautagebuchBautageberichtDetailsController.wetter;
						    				if (myWetter.wind === 3) {
						    					return;
						    				}
						    				myWetter.wind = myWetter.wind + 1;
						    				DigiWebApp.BautagebuchBautageberichtDetailsController.set("wetter", myWetter);
			            	  			}
			            	  			clearAllIntervals();
			            	  			DigiWebApp.BautagebuchMainController.buttonPressInterval_Var = setInterval(addFunc, DigiWebApp.BautagebuchMainController.buttonPressInterval);
			            	  			addFunc(); event.preventDefault();
					    			}
			                }
			              , touchend: {
					    			action: function() {
			            	  			clearAllIntervals();
			              			}  
			              }
		              }
			    })
			    , TextValue: M.LabelView.design({
			    	  cssClass: 'whiteText centerText bold'
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
					    		case 1:
				    				return M.I18N.l('BautagebuchWindMaessig');
					    		case 2:
				    				return M.I18N.l('BautagebuchWindBoeig');
					    		case 3:
				    				return M.I18N.l('BautagebuchWindStuermisch');
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
						action: function() {
								clearAllTimeouts();
								DigiWebApp.NavigationController.backToBautagebuchBautageberichtDetailsPageTransition();
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
//		                //, action: 'backToBautagebuchBautageberichtDetailsPageTransition'
//						action: function() {
//								clearAllTimeouts();
//								DigiWebApp.NavigationController.backToBautagebuchBautageberichtDetailsPageTransition();
//						}
//		            }
//	          }
//	    })
	    
    })

});

