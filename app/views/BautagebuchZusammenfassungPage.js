// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: DigiWebApp
// View: BautagebuchZusammenfassungPage
// ==========================================================================

m_require('app/views/BautagebuchZusammenfassungMitarbeiterSummeTemplateView');
m_require('app/views/BautagebuchMaterialienTemplateView');
m_require('app/views/BautagebuchNotizenZusammenfassungTemplateView');
m_require('app/views/BautagebuchMedienTemplateView');

DigiWebApp.BautagebuchZusammenfassungPage = M.PageView.design({

    events: {
		pagebeforeshow: {
            //  target: DigiWebApp.BautagebuchZusammenfassungController
            //, action: 'init'
			action: function() {
				DigiWebApp.BautagebuchZusammenfassungController.init(YES);
				$("#" + DigiWebApp.BautagebuchZusammenfassungPage.content.container.detailsGrid.id).addClass("marginBottom20");
				$("#" + DigiWebApp.BautagebuchZusammenfassungPage.content.container.detailsGrid.id).addClass("detailsGrid");
				DigiWebApp.BautagebuchMaterialienListeController.init(YES);
				DigiWebApp.BautagebuchNotizenListeController.init(YES);
				DigiWebApp.BautagebuchMedienListeController.init(YES);
				if (parseBool(DigiWebApp.BautagebuchZusammenfassungController.item.get("abgeschlossen"))) {
					$("#" + DigiWebApp.BautagebuchZusammenfassungPage.content.grid.id).hide();
					$('#' + DigiWebApp.BautagebuchZusammenfassungPage.header.delButton.id).show();
					$("#" + DigiWebApp.BautagebuchZusammenfassungPage.content.transferGrid.id).show();
					$('#' + DigiWebApp.BautagebuchZusammenfassungPage.content.container.leistungsnachweisList.zeitenAendernButton.id).hide();
				} else {
					$("#" + DigiWebApp.BautagebuchZusammenfassungPage.content.grid.id).show();
					$('#' + DigiWebApp.BautagebuchZusammenfassungPage.header.delButton.id).show();
					$("#" + DigiWebApp.BautagebuchZusammenfassungPage.content.transferGrid.id).hide();
					$('#' + DigiWebApp.BautagebuchZusammenfassungPage.content.container.leistungsnachweisList.zeitenAendernButton.id).show();
				}
				$('#' + DigiWebApp.BautagebuchZusammenfassungPage.content.container.leistungsnachweisList.zeitenAendernButton.id).addClass("zeitenAendernButton");
        		// Feature 405 (Unterschrift)
        		if ((DigiWebApp.SettingsController.featureAvailable('405')) && (typeof window.requestFileSystem !== "undefined")) {
        			$('#' + DigiWebApp.BautagebuchZusammenfassungPage.content.container.signature.id).show();
					// init canvas
					var sigPadOptions = {
							    bgColour : '#aaa'
							  , lineTop: 300
							  , drawOnly : true
							};
					if (DigiWebApp.BautagebuchZusammenfassungPage.signaturePadAPI === null) {
						DigiWebApp.BautagebuchZusammenfassungPage.signaturePadAPI = $('.sigPad2').signaturePad(sigPadOptions);
					}
        		} else {
        			$('#' + DigiWebApp.BautagebuchZusammenfassungPage.content.container.signature.id).hide();
        		}
        		// Feature 405 (Unterschrift)
        		if ((DigiWebApp.SettingsController.featureAvailable('405')) && (typeof window.requestFileSystem !== "undefined")) {
        			// load signature
        			if (DigiWebApp.BautagebuchZusammenfassungController.item.hasFileName() === YES) {
	        			DigiWebApp.BautagebuchZusammenfassungController.item.readFromFile(function(fileContent){
	        				if (fileContent && (fileContent !== "")) {
	       						DigiWebApp.BautagebuchZusammenfassungPage.signaturePadAPI.regenerate(fileContent);
	        				}
	        			}, function() {
	        				DigiWebApp.BautagebuchZusammenfassungPage.signaturePadAPI.clearCanvas();
	        			});
        			} else {
        				DigiWebApp.BautagebuchZusammenfassungPage.signaturePadAPI.clearCanvas();
        			}
        		}


			}
        }
    }

	, signaturePadAPI: null

    , childViews: 'header content'

    , cssClass: 'bautagebuchListePage unselectable'

    , header: M.ToolbarView.design({
        childViews: 'backButton title delButton'
        , cssClass: 'header unselectable'
        , isFixed: YES
        , backButton: M.ButtonView.design({
              value: M.I18N.l('back')
            , icon: 'arrow-l'
            , anchorLocation: M.LEFT
            , events: {
                tap: {
                    //  target: DigiWebApp.NavigationController
                    //, action: 'backToBautagebuchBautageberichtDetailsPageTransition'
        			action: function() {try{DigiWebApp.ApplicationController.vibrate();}catch(e2){} history.back();}
                }
            }
        })
        , title: M.LabelView.design({
              value: M.I18N.l('BautagebuchZusammenfassung')
            , anchorLocation: M.CENTER
        })
        , delButton: M.ButtonView.design({
              value: M.I18N.l('BautagebuchDelete')
            , icon: 'delete'
            , anchorLocation: M.RIGHT
            , events: {
                tap: {
                      //target: DigiWebApp.BautagebuchBautageberichtDetailsController
                    //, action: 'delete'
        			action: function() {
        				try{DigiWebApp.ApplicationController.vibrate();}catch(e3){} 
        				DigiWebApp.BautagebuchBautageberichtDetailsController.deleteBautagesbericht(DigiWebApp.NavigationController.backToBautagebuchBautageberichteListePageTransition);
        			}
                }
            }
        })
        , anchorLocation: M.TOP
    })

    , content: M.ScrollView.design({
          childViews: 'container grid transferGrid'
        	  
	    , container: M.ContainerView.design({
    	    	childViews: 'detailsGrid leistungsnachweisList materialienList notizenList medienList signature spacer'
    	      , cssClass: 'bautagebuchZusammenfassungScrollView'
    	    	  
    	      , spacer: M.LabelView.design({
    	    	  value: '&nbsp;'
    	      })
    	      
    	      , detailsGrid: M.GridView.design({
        		  childViews: 'details wetter'
        		, cssClass: 'marginBottom20 detailsGrid'
        		, layout: M.TWO_COLUMNS
        		, details: M.ContainerView.design({
        				  childViews: 'auftrag datum spacer1 projektleiter spacer2 startUhrzeit'
          				, spacer1: M.LabelView.design({
        					value: "&nbsp;"
        				})
        				, spacer2: M.LabelView.design({
        					value: "&nbsp;"
        				})
  		    			, auftrag: M.LabelView.design({
  						      value: ''
  						    , cssClass: 'bigLabel bold underline'
  						    , isInline: YES
  						    , computedValue: {
  						          contentBinding: {
  						              target: DigiWebApp.BautagebuchZusammenfassungController
  						            , property: 'auftragsName'
  						        }
  						        , value: ''
  						        , operation: function(v) {
  						            return v + ": ";
  						        }
  						    }
  		    			})
              			, datum: M.LabelView.design({
        				      value: ''
        				    , cssClass: 'bigLabel bold underline'
  						    , isInline: YES
        				    , contentBinding: {
        				          target: DigiWebApp.BautagebuchZusammenfassungController
        				        , property: 'datum'
        				    }
              			})
	        			, projektleiter: M.LabelView.design({
	    				      value: ''
	    				    , cssClass: 'bigLabel'
						    , computedValue: {
						          contentBinding: {
						              target: DigiWebApp.BautagebuchZusammenfassungController
						            , property: 'projektleiterId'
						        }
						        , value: ''
						        , operation: function(v) {
						        	// projekleiterName nachladen
					        		var myProjektleiter = DigiWebApp.BautagebuchProjektleiter.find({query:{identifier: 'id', operator: '=', value: v}})[0];
					        		if (typeof myProjektleiter !== "undefined") {
					        			return M.I18N.l('BautagebuchProjektleiter') + ": " + myProjektleiter.vollername();
						        	} else {
						        		return "";
						        	}
						        }
						    }
	        			})
						, startUhrzeit: M.LabelView.design({
						      value: ''
						    , cssClass: 'bigLabel'
						    , computedValue: {
						          contentBinding: {
						              target: DigiWebApp.BautagebuchZusammenfassungController
						            , property: 'startUhrzeit'
						        }
						        , value: ''
						        , operation: function(v) {
						            return M.I18N.l('BautagebuchStartingFrom') + " " + v + " " + M.I18N.l('oclock');
						        }
						    }
						})
        	    })
        	    , wetter: M.ContainerView.design({
        				  childViews: 'temperatur luftfeuchte bewoelkung niederschlag wind wechselhaft'
        				, cssClass: 'wetterBlock'
              			, temperatur: M.GridView.design({
              				  layout: M.TWO_COLUMNS
              				, childViews: 'myLabel myValue'
              				, myLabel: M.LabelView.design({
              					value: M.I18N.l('BautagebuchTemperatur')
              				})
                  			, myValue: M.LabelView.design({
	          				      value: ''
	          				    , cssClass: 'right'
							    , computedValue: {
							          contentBinding: {
							              target: DigiWebApp.BautagebuchZusammenfassungController
							            , property: 'wetter.temperatur'
							        }
							        , value: ''
							        , operation: function(v) {
							            return v + "°C";
							        }
							    }

                			})
              			})
              			, luftfeuchte: M.GridView.design({
              				  layout: M.TWO_COLUMNS
              				, childViews: 'myLabel myValue'
              				, myLabel: M.LabelView.design({
              					value: M.I18N.l('BautagebuchLuftfeuchtigkeit')
              				})
                  			, myValue: M.LabelView.design({
	          				      value: ''
	          				    , cssClass: 'right'
							    , computedValue: {
							          contentBinding: {
							              target: DigiWebApp.BautagebuchZusammenfassungController
							            , property: 'wetter.luftfeuchtigkeit'
							        }
							        , value: ''
							        , operation: function(v) {
							            return v + "%";
							        }
							    }

                			})
              			})
              			, bewoelkung: M.GridView.design({
              				  layout: M.TWO_COLUMNS
              				, childViews: 'myLabel myValue'
              				, myLabel: M.LabelView.design({
              					value: M.I18N.l('BautagebuchBewoelkung')
              				})
                  			, myValue: M.LabelView.design({
	          				      value: ''
	          				    , cssClass: 'right'
							    , computedValue: {
							          contentBinding: {
							              target: DigiWebApp.BautagebuchZusammenfassungController
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
              			, niederschlag: M.GridView.design({
              				  layout: M.TWO_COLUMNS
              				, childViews: 'myLabel myValue'
              				, myLabel: M.LabelView.design({
              					value: M.I18N.l('BautagebuchNiederschlag')
              				})
                  			, myValue: M.LabelView.design({
	          				      value: ''
	          				    , cssClass: 'right'
							    , computedValue: {
							          contentBinding: {
							              target: DigiWebApp.BautagebuchZusammenfassungController
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
              			, wind: M.GridView.design({
              				  layout: M.TWO_COLUMNS
              				, childViews: 'myLabel myValue'
              				, myLabel: M.LabelView.design({
              					value: M.I18N.l('BautagebuchWind')
              				})
                  			, myValue: M.LabelView.design({
	          				      value: ''
	          				    , cssClass: 'right'
							    , computedValue: {
							          contentBinding: {
							              target: DigiWebApp.BautagebuchZusammenfassungController
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
              			, wechselhaft: M.GridView.design({
              				  layout: M.TWO_COLUMNS
              				, childViews: 'myLabel myValue'
              				, myLabel: M.LabelView.design({
              					value: M.I18N.l('BautagebuchWechselhaft')
              				})
                  			, myValue: M.LabelView.design({
	          				      value: ''
	          				    , cssClass: 'right'
							    , computedValue: {
							          contentBinding: {
							              target: DigiWebApp.BautagebuchZusammenfassungController
							            , property: 'wetter.wechselhaft'
							        }
		    			    		, value: 0
		    				        , operation: function(v) {
		    				    		switch(v) {
		    				    			case false:
		    				    				return M.I18N.l('no');
		    					    		case true:
		    				    				return M.I18N.l('yes');
		    					    		default:
		    					    		    return "";
		    				    		}
		    				        }
							    }

                			})
              			})

        	    	})
    	      })
    	      
    	      , leistungsnachweisList: M.ContainerView.design({
      	    	  	  childViews: 'myLabel zeitenAendernButton list'
      	    	  	, cssClass: 'marginBottom20 leistungsnachweisList'
      	    	  	, doNotOverlapAtTop: YES
      	    	  	, doNotOverlapAtBottom: YES
      	    	  	, myLabel: M.LabelView.design({
    	    	  		  cssClass: 'bigLabel bold'
    	    	  		, isInline: YES
    	    	  		, value: M.I18N.l('BautagebuchLeistungsnachweis') + ":"
    	    	  	})
      	    	  	, zeitenAendernButton: M.ButtonView.design({
	      	              value: M.I18N.l('BautagebuchZeitenAendern')
	      	            , anchorLocation: M.RIGHT
    	    	  		, isInline: YES
    	    	  		//, cssClass: 'zeitenAendernButton'
	      	            , events: {
	      	                tap: {
	      	                      target: DigiWebApp.NavigationController
	      	                    , action: 'backToBautagebuchZeitenListePageTransition'
	      	                }
	      	            }
	      	        })
	    	        , list: M.ListView.design({
	    	        	  cssClass: 'marginTop25important'
	    	        	, isDividedList: YES
	    	            , contentBinding: {
	    	                  target: DigiWebApp.BautagebuchZusammenfassungController
	    	                , property: 'ZeitbuchungenPerMitarbeiterList'
	    	            }
	    	            , listItemTemplateView: DigiWebApp.BautagebuchZusammenfassungMitarbeiterSummeTemplateView
	    	        })
    	      })

    	      , materialienList: M.ContainerView.design({
	  	    	  	  childViews: 'myLabel list'
	  	    	  	, cssClass: 'marginBottom20 materialienList'
	  	    	  	, doNotOverlapAtTop: YES
	  	    	  	, doNotOverlapAtBottom: YES
	  	    	  	, myLabel: M.LabelView.design({
	  	    	  		  cssClass: 'bigLabel bold'
	  	    	  		, value: M.I18N.l('BautagebuchMaterialien') + ":"
	  	    	  	})
	    	        , list: M.ListView.design({
	    	        	  cssClass: 'marginTop20'
	    	            , contentBinding: {
	    	                  target: DigiWebApp.BautagebuchMaterialienListeController
	    	                , property: 'items'
	    	            }
	    	            , listItemTemplateView: DigiWebApp.BautagebuchMaterialienTemplateView
	    	        })
    	      })

    	      , notizenList: M.ContainerView.design({
	  	    	  	  childViews: 'myLabel list'
	  	    	  	, cssClass: 'marginBottom20 notizenList'
	  	    	  	, doNotOverlapAtTop: YES
	  	    	  	, doNotOverlapAtBottom: YES
	  	    	  	, myLabel: M.LabelView.design({
	  	    	  		  cssClass: 'bigLabel bold'
	  	    	  		, value: M.I18N.l('BautagebuchNotizen') + ":"
	  	    	  	})
	    	        , list: M.ListView.design({
	    	        	  cssClass: 'marginTop20'
	    	            , contentBinding: {
	    	                  target: DigiWebApp.BautagebuchNotizenListeController
	    	                , property: 'items'
	    	            }
	    	            , listItemTemplateView: DigiWebApp.BautagebuchNotizenZusammenfassungTemplateView
	    	        })
		      })
		      
    	      , medienList: M.ContainerView.design({
	  	    	  	  childViews: 'myLabel list'
	  	    	  	, cssClass: 'marginBottom20 medienList borderBottom'
	  	    	  	, doNotOverlapAtTop: YES
	  	    	  	, doNotOverlapAtBottom: YES
	  	    	  	, myLabel: M.LabelView.design({
	  	    	  		  cssClass: 'bigLabel bold'
	  	    	  		, value: M.I18N.l('BautagebuchMedien') + ":"
	  	    	  	})
	    	        , list: M.ListView.design({
	    	        	  cssClass: 'marginTop20'
	    	            , contentBinding: {
	    	                  target: DigiWebApp.BautagebuchMedienListeController
	    	                , property: 'items'
	    	            }
	    	            , listItemTemplateView: DigiWebApp.BautagebuchMedienTemplateView
	    	        })
		      })
		      
	          , signature: M.ContainerView.design({
		        	
		        	  childViews: 'signatureform'
		        		  
		            , cssClass: 'signaturecanvas2 marginTop20 marginBottom20'

		        	, signatureform: M.FormView.design({
		            	
		            	  childViews: 'signaturecanvas'
		            	
		            	, signaturecanvas: M.CanvasView.design({

		            		  label: M.I18N.l('signature') + ":"

		            		, canvasWidth: 550
		                    , canvasHeight: 320
		                	
		                    , render: function() {
		                    	if (this.label) {
		                    		this.html += '<label for="' + this.id + '" class="signaturecanvaslabel">' + this.label + '</label>';
		                    	}
		    					this.html += '  <div id="' + this.id + '_container" class="sig sigWrapper2">';
		        				this.html += '    <canvas id="' + this.id + '_canvas" class="pad" width="' + this.canvasWidth + 'px" height="' + this.canvasHeight + 'px" style="border-color: #000; border: 1px solid #ccc;"></canvas>';
		        				this.html += '    <input id="' + this.id + '" type="hidden" name="output" class="output">';
		        				this.html += '  </div>';
		                    	return this.html;
		                	}
		    	        })
		                	
		                , render: function() {
		            		this.html += '<form method="post" action="" class="sigPad2">';
		                	this.renderChildViews();
		    				this.html += '</form>';
		                	return this.html;
		            	}
		            })
		      })


	    })
	
	    , grid: M.GridView.design({
		        childViews: 'button icon'
		      , layout: {
		            cssClass: 'digiButton marginTop20'
		          , columns: {
		                0: 'button'
		              , 1: 'icon'
		          }
		      }
		      , button: M.ButtonView.design({
		            value: M.I18N.l('BautagebuchBautageberichtAbschliessen')
		          , cssClass: 'digiButton'
		          , anchorLocation: M.RIGHT
		          , events: {
		              tap: {
			                //  target: DigiWebApp.BautagebuchZusammenfassungController
			                //, action: 'finish'
			    			action: function() {
			    				//var that = this;
			    				DigiWebApp.BautagebuchZusammenfassungController.finish(DigiWebApp.NavigationController.backToBautagebuchBautageberichteListePageTransition);
			    				DigiWebApp.BautagebuchZusammenfassungController.load(DigiWebApp.BautagebuchZusammenfassungController.item);
								DigiWebApp.NavigationController.toBautagebuchZusammenfassungPageTransition();
				    		}
		              }
		          }
		      })
		      , icon: M.ImageView.design({
		          value: 'theme/images/icon_bookTime.png'
		      })
		})
		  
	    , transferGrid: M.GridView.design({
	        childViews: 'button icon'
	      , layout: {
	            cssClass: 'digiButton marginTop20'
	          , columns: {
	                0: 'button'
	              , 1: 'icon'
	          }
	      }
	      , button: M.ButtonView.design({
	            value: M.I18N.l('BautagebuchUebertragen')
	          , cssClass: 'digiButton'
	          , anchorLocation: M.RIGHT
	          , events: {
	              tap: {
		                //  target: DigiWebApp.BautagebuchZusammenfassungController
		                //, action: 'finish'
		    			action: function() {
		    		    	var that = DigiWebApp.BautagebuchZusammenfassungController;
		    		    	var startTransfer = NO;
		    		    	if (that.lastTimestampDatatransfer !== null) {
		    		    		var timestampNow = D8.now().getTimestamp();
		    		    		if (timestampNow - that.lastTimestampDatatransfer > parseInt(DigiWebApp.SettingsController.getSetting('datatransfer_min_delay'))) {
		    		    			startTransfer = YES;
		    		    		} else {
		    		    			// evtl. Fehlermeldung, dass noch eine Datenübertragung läuft bzw. nur alle 30 Sekunden eine Datenübertragung gestartet werden darf
		    		    		}
		    		    	}
		    		    	if (startTransfer === YES || that.lastTimestampDatatransfer === null) {
		    		    		that.set("lastTimestampDatatransfer", D8.now().getTimestamp());
			    				DigiWebApp.BautagebuchDatenuebertragungController.senden(
			    						DigiWebApp.BautagebuchZusammenfassungController.item
			    					    , function(msg) {
			    							//console.log("successHandler");
			    							DigiWebApp.BautagebuchZusammenfassungController.set("item", null);
			    							DigiWebApp.NavigationController.backToBautagebuchBautageberichteListePageTransition();
			    						}
			    						, function(xhr,err) {
			    							//console.log("errorHandler");
			    							console.error(xhr,err);
			    				            DigiWebApp.ApplicationController.nativeAlertDialogView({
			    				                title: M.I18N.l('BautagebuchUebertragungsfehler')
			    				              , message: M.I18N.l('BautagebuchUebertragungsfehlerMsg')
			    				            });
			    						}
			    				);
		    		    	}
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
