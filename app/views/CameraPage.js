// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: DigiWebApp
// View: CameraPage
// ==========================================================================

DigiWebApp.CameraPage = M.PageView.design({

    /* Use the 'events' property to bind events like 'pageshow' */
      events: {
		pagebeforeshow: {
            target: DigiWebApp.CameraController,
            action: 'init'
        }
    }

    , cssClass: 'cameraPage'

    , childViews: 'header content'

    , savePicture: function() {
    	
    	var myRemark = '';
    	if ((M.ViewManager.getView('cameraPage', 'remarkInput').value !== null) 
	        && (typeof(M.ViewManager.getView('cameraPage', 'remarkInput').value) !== "undefined"))
	    {
    		myRemark = M.ViewManager.getView('cameraPage', 'remarkInput').value;
    	}
    			
		if (myRemark.length > 255) {
	        DigiWebApp.ApplicationController.DigiLoaderView.hide();
    		DigiWebApp.ApplicationController.nativeAlertDialogView({
    			  title: M.I18N.l('remarkTooLong')
    			, message: M.I18N.l('remarkTooLongMessage')
    		});
		} else {
			
            //if (/[[^a-zA-Z0-9_-äöüÄÖÜ,. !?;:/\\@€=]]+/.test(M.ViewManager.getView('cameraPage', 'remarkInput').value)) {
            if (DigiWebApp.ApplicationController.sonderzeichenCheck(myRemark)) {
    	        DigiWebApp.ApplicationController.DigiLoaderView.hide();
                DigiWebApp.ApplicationController.nativeAlertDialogView({
                      title: M.I18N.l('specialCharProblem')
                    , message: M.I18N.l('specialCharProblemMsg')
                });
            } else {
                var selectedOrder = DigiWebApp.CameraPage.content.order.getSelection();
                if (hasValue(selectedOrder) && selectedOrder !== "0") {
                    DigiWebApp.CameraController.savePicture();
                } else {
                    DigiWebApp.ApplicationController.DigiLoaderView.hide();
                    DigiWebApp.ApplicationController.nativeAlertDialogView({
                        title: M.I18N.l('noOrderSelected')
                        , message: M.I18N.l('noOrderSelectedMsg')
                    });
                }
            }
		}
    }

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
                    , action: 'backToMediaListPageTransition'
                }
            }
        })
        , title: M.LabelView.design({
              value: M.I18N.l('takePicture')
            , anchorLocation: M.CENTER
        })
        , anchorLocation: M.TOP
    })

    , content: M.ScrollView.design({
    	
          childViews: 'image spacer order position activity remarkInput savePictureGrid'

        , image: M.ImageView.design({
        		  value: ''
        		, cssClass: 'photo'
        })
        
        , spacer: M.LabelView.design({
        		value: ' '
        })

        , order: M.SelectionListView.design({
              selectionMode: M.SINGLE_SELECTION_DIALOG
            , initialText: M.I18N.l('noData')
            , label: M.I18N.l('order')
            //, cssClass: 'unselectable'
            , applyTheme: NO
            , contentBinding: {
                  target: DigiWebApp.CameraController
                , property: 'orders'
            }
            , events: {
                change: {
                      target: DigiWebApp.CameraController
                    , action: function() {
                        this.setPositions();
                    }
                }
            }
        })
        
	    , position: M.SelectionListView.design({
	          selectionMode: M.SINGLE_SELECTION_DIALOG
	        , label: M.I18N.l('position')
	        , initialText: M.I18N.l('noData')
	        //, cssClass: 'unselectable'
	        , applyTheme: NO
	        , contentBinding: {
	              target: DigiWebApp.CameraController
	            , property: 'positions'
	        }
	        , events: {
	            change: {
	                  target: DigiWebApp.CameraController
	                , action: function() {
	                    this.setActivities(YES);
	                }
	            }
	        }
	    })
	
	    , activity: M.SelectionListView.design({
	          selectionMode: M.SINGLE_SELECTION_DIALOG
	        , label: M.I18N.l('activity')
	        , initialText: M.I18N.l('noData')
	        //, cssClass: 'unselectable'
	        , applyTheme: NO
	        , contentBinding: {
	              target: DigiWebApp.CameraController
	            , property: 'activities'
	        }
	        , events: {
	            change: {
	                  target: DigiWebApp.CameraController
	                , action: function() {
	                    //this.saveSelection();
	                }
	            }
	        }
	    })
        	        
        , remarkInput: M.TextFieldView.design({
              label: M.I18N.l('remark')
            , cssClass: 'remarkInput'
            , hasMultipleLines: YES
            , numberOfChars: 255
        })

//        , imageContainer: M.ContainerView.design({
//        	    childViews: 'imageCanvas'
//            , cssClass: 'imageContainer marginTop20 marginBottom20'
//
//        	, imageCanvas: M.CanvasView.design({
//                  cssClass: 'imageCanvas'
//                , canvasWidth: 300
//                , canvasHeight: 450
//                , render: function() {
//						this.html += '<canvas id="' + this.id + '" width="' + this.canvasWidth + 'px" height="' + this.canvasHeight + 'px" class="' + this.cssClass + '"></canvas>';
//	            		return this.html;
//        		}
//	        })
//	        
//        })

        , savePictureGrid: M.GridView.design({

        	  childViews: 'button icon'

        	, layout: {
            	  cssClass: 'marginTop40 digiButton'
            	, columns: {
                	  0: 'button'
                	, 1: 'icon'
            	}
        	}
        
        	, button: M.ButtonView.design({
        		  value: M.I18N.l('assume')
        		, cssClass: 'digiButton'
        		, anchorLocation: M.RIGHT
        		, events: {
                	tap: {
        				//  target: DigiWebApp.CameraPage
        				//, action: 'savePicture'
        				action: function() {
        					DigiWebApp.CameraPage.savePicture();
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

