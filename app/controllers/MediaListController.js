// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: DigiWebApp
// Controller: MediaListController
// ==========================================================================
// manuell var-checked
DigiWebApp.MediaListController = M.Controller.extend({

    /* mediafiles */
      items: null

    /* Aktionen um neue MediaFiles zu erzeugen */
    , actions: null

    , latestId: null
    
    , lastTimestampDatatransfer: null

    /*
    * Which files do we have to display?
    */
    , init: function(isFirstLoad) {
		var that = DigiWebApp.MediaListController;
		var items = [];
        if (isFirstLoad) {
            /* do something here, when page is loaded the first time. */
        }
        /* do something, for any other load. */
        items = _.sortBy(DigiWebApp.MediaFile.find(), function(mediafile) {
            return parseInt(mediafile.get('timeStamp'));
        });
        that.set('items', items.reverse());

        if (DigiWebApp.MediaListPage.needsUpdate) {
            var actions = [];
                        
//            // Start::TakePicture (400)
//            if (DigiWebApp.SettingsController.featureAvailable('400')) {
//            	//if (DigiWebApp.SettingsController.globalDebugMode) console.log("enabling Feature 400 (TakePicture)");
//            	actions.push({
//                      label: M.I18N.l('takePicture')
//                    , icon: 'icon_takePicture.png'
//                    , id: 'foto'
//                });
//            }
//            // End::TakePicture
//
//            // Start::RecordAudio (401)
//            if (DigiWebApp.SettingsController.featureAvailable('401')) {
//            	//if (DigiWebApp.SettingsController.globalDebugMode) console.log("enabling Feature 401 (RecordAudio)");
//            	actions.push({
//                      label: M.I18N.l('recordAudio')
//                    , icon: 'icon_recordAudio.png'
//                    , id: 'audio'
//                });
//            }
//            // End::RecordAudio

        	actions.push({
                  label: M.I18N.l('uploadMediaFiles')
                , icon: 'icon_dataTransfer.png'
                , id: 'uploadMediaFiles'
            });

        	that.set('actions', actions);
            DigiWebApp.MediaListPage.needsUpdate = false;
        }

        var list;

        try {
	        list = M.ViewManager.getView('mediaListPage', 'mediafileslist');
	        if (list) {
	            $('#' + list.id).find('li').each(function() {
	                $(this).removeClass('selected');
	            });
	        }
		} catch(e2) { console.error(e2); }

        
        try {
	        list = M.ViewManager.getView('mediaListPage', 'actionslist');
	        if (list) {
	            $('#' + list.id).find('li').each(function() {
	                $(this).removeClass('selected');
	            });
	        }
        } catch(e2) { console.error(e2); }

	}

	, itemSelected: function(id, m_id) {
		try{DigiWebApp.ApplicationController.vibrate();}catch(e2s){} 
        if (this.latestId) {
            $('#' + this.latestId).removeClass('selected');
        }
        $('#' + id).addClass('selected');

        this.latestId = id;

        if (m_id && typeof(this[m_id]) === 'function') {
            this[m_id]();
        }
    }

	, neu: function() {
		var that = DigiWebApp.MediaListController;
    	M.DialogView.actionSheet({
	          title: M.I18N.l('newMedia')
	        , cancelButtonValue: M.I18N.l('cancel')
	        //, otherButtonValues: [M.I18N.l('audio'),M.I18N.l('photo'),M.I18N.l('video'),M.I18N.l('other')]
	        //, otherButtonTags: ["audio", "photo", "video", "other"]
	        , otherButtonValues: [M.I18N.l('photo')]
	        , otherButtonTags: ["photo"]
	        , callbacks: {
  				  other: {action: function(buttonTag) {
	  			    switch(buttonTag) {
		    		        case 'audio':
		    		            DigiWebApp.ApplicationController.nativeAlertDialogView({
		    		                title: M.I18N.l('notImplemented')
		    		              , message: M.I18N.l('notImplementedMsg')
		    		            });
		    		        	/*if (DigiWebApp.SettingsController.featureAvailable('401')) {
		    		        		that.audio();
		    		        	} else {
		    		        		DigiWebApp.ApplicationController.nativeAlertDialogView({
			    		                title: M.I18N.l('notActivated')
			    		              , message: M.I18N.l('notActivatedMsg')
			    		            });
		    		        	}*/
		    		            break;
		    		        case 'photo':
		    		        	if (DigiWebApp.SettingsController.featureAvailable('400')) {
		    		        		that.foto();
		    		        	} else {
		    		        		DigiWebApp.ApplicationController.nativeAlertDialogView({
			    		                title: M.I18N.l('notActivated')
			    		              , message: M.I18N.l('notActivatedMsg')
			    		            });
		    		        	}
		    		            break;
		    		        case 'video':
		    		            DigiWebApp.ApplicationController.nativeAlertDialogView({
		    		                title: M.I18N.l('notImplemented')
		    		              , message: M.I18N.l('notImplementedMsg')
		    		            });
		    		            break;
		    		        case 'other':
		    		            DigiWebApp.ApplicationController.nativeAlertDialogView({
		    		                title: M.I18N.l('notImplemented')
		    		              , message: M.I18N.l('notImplementedMsg')
		    		            });
		    		            break;
		    		        default:
		    		            console.log("unknonw ButtonTag");
		    		            break;
	  			    }
	  			}}
  			, cancel: {action: function() {
  				//console.log(M.I18N.l('cancel'));
  			}}
  		}
	    });
	
	}

    , foto: function() {
		//var that = this;
    	M.DialogView.actionSheet({
	          title: M.I18N.l('takePicture')
	        , cancelButtonValue: M.I18N.l('cancel')
	        , otherButtonValues: [M.I18N.l('library'),M.I18N.l('camera')]
	        , otherButtonTags: ["library", "camera"]
	        , callbacks: {
				  other: {action: function(buttonTag) {
	  			    switch(buttonTag) {
		    		        case 'library':
		    		        	
		    		        	// unterscheiden: auf Gerät oder im Browser?
		    		        	if ( typeof navigator.camera !== 'undefined' 
		    	        		  && typeof navigator.camera.getPicture !== 'undefined') {
		    		        		
		    		        		// auf Geraet:
		    		        		navigator.camera.getPicture(
	    		        				  function(imgData) {
	    		        				    	//alert("success");
	    		        					  if (imgData.indexOf("data:") === 0) {
					    		        		DigiWebApp.CameraController.set("loadedPicture", imgData);
	    		        					  } else {
					    		        		DigiWebApp.CameraController.set("loadedPicture", 'data:' + DigiWebApp.ApplicationController.CONSTImageFiletype + ',' + imgData);
	    		        					  }
	    		        					  DigiWebApp.CameraController.set("fileType", DigiWebApp.ApplicationController.CONSTImageFiletype);
	    		        					  DigiWebApp.NavigationController.toCameraPageTransition();
	    		        				}
	    		        				, function(err) {
				    		        		DigiWebApp.CameraController.set("loadedPicture", null);
				    		        		DigiWebApp.CameraController.set("fileType", null);
					    		            DigiWebApp.ApplicationController.nativeAlertDialogView({
					    		                title: M.I18N.l('error')
					    		              , message: M.I18N.l('noPicLoaded') + ": " + err
					    		            });	    		        					
	    		        				}
	    		        				, {
	    		        					  quality: 40
	    		     	    				, allowEdit: true
	    		     	    				, destinationType : navigator.camera.DestinationType.DATA_URL
	    		     	    				//, destinationType: navigator.camera.DestinationType.FILE_URI
	    		     	    				, encodingType: navigator.camera.EncodingType.JPEG
	    		     	    				, sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY 
	    		     	    				, mediaType: navigator.camera.MediaType.PICTURE
	    		     	    				, saveToPhotoAlbum: false
	    		        				}
		    		        		);
		    		        		
		    		        	} else {
		    		        	
			    		        	// im Browser:
			    		        	DigiWebApp.FileChooserPage.set("successCallback", function(imgData, fileName) {
				    		        	if (imgData !== null) {
				    		        		  DigiWebApp.CameraController.set("loadedFileName", fileName);
				    		        		  var myFileType = ""; //DigiWebApp.ApplicationController.CONSTImageFiletype;
				    		        		  var tmp = fileName;
				    		        		  var i = 0;
				    		        		  while (i !== -1) {
				    		        			  tmp = tmp.substr(i + 1);
				    		        			  i = tmp.indexOf(".");
				    		        		  }
				    		        		  tmp = tmp.toLowerCase();
				    		        		  switch (tmp) {
				    		        		  	case "jpg":
						    		        		  // filetype zum MIME-Type vervollständigen
						    		        		  myFileType = "image/jpeg";
				    		        		  		break;
				    		        		  	case "jpeg":
						    		        		  // filetype zum MIME-Type vervollständigen
						    		        		  myFileType = "image/" + tmp;
				    		        		  		break;
				    		        		  	case "png":
						    		        		  // filetype zum MIME-Type vervollständigen
						    		        		  myFileType = "image/" + tmp;
				    		        		  		break;
				    		        		  	case "bmp":
						    		        		  // filetype zum MIME-Type vervollständigen
						    		        		  myFileType = "image/" + tmp;
				    		        		  		break;
				    		        		  	default:
				    		        		  		break;
				    		        		  }
				    		        		  switch (myFileType) {
				    		        		  	case "":
						    		        		DigiWebApp.CameraController.set("loadedPicture", null);
						    		        		DigiWebApp.CameraController.set("fileType", null);
							    		            DigiWebApp.ApplicationController.nativeAlertDialogView({
							    		                title: M.I18N.l('error')
							    		              , message: M.I18N.l('noPicLoaded')
							    		            });
				    		        		  		break;
				    		        		  	default:
				    		        		  		DigiWebApp.CameraController.set("fileType", myFileType);
			    		        					if (imgData.indexOf("data:") === 0) {
			    		        						DigiWebApp.CameraController.set("loadedPicture", imgData);
			    		        					} else {
							    		        		DigiWebApp.CameraController.set("loadedPicture", 'data:' + myFileType + ',' + imgData);
			    		        					}
			    		        					DigiWebApp.NavigationController.toCameraPageTransition();
			    		        					break;
				    		        		  }
				    		        	} else {
				    		        		DigiWebApp.CameraController.set("loadedPicture", null);
				    		        		DigiWebApp.CameraController.set("fileType", null);
					    		            DigiWebApp.ApplicationController.nativeAlertDialogView({
					    		                title: M.I18N.l('error')
					    		              , message: M.I18N.l('noPicLoaded')
					    		            });
				    		        	}
			    		        	});
			    		        	DigiWebApp.NavigationController.toFileChooserPageTransition();
		    		        	}
		    		        	
		    		            break;
		    		        case 'camera':
		    		        	if (       typeof navigator.camera !== 'undefined' 
				    	        		&& typeof navigator.camera.getPicture !== 'undefined'
		    		            	) {
		    		        			DigiWebApp.CameraController.set("loadedPicture", null);
		    		        			DigiWebApp.NavigationController.toCameraPageTransition();
		    		        	} else {
			    		            DigiWebApp.ApplicationController.nativeAlertDialogView({
			    		                title: M.I18N.l('error')
			    		              , message: M.I18N.l('noCamera')
			    		            });
		    		        	}
		    		            break;
		    		        default:
		    		            console.log("unknonw ButtonTag");
		    		            break;
	  			    }
	  			}}
			, cancel: {action: function() {
				//console.log(M.I18N.l('cancel'));
			}}
		}
	    });

    }

    , audio: function() {
        DigiWebApp.NavigationController.toAudioPageTransition();
    }
    
    , uploadMediaFiles: function() {
    	var that = DigiWebApp.MediaListController;
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
    		that.doUploadMediaFiles();
    	}
    }
    
    , doUploadMediaFiles: function() {

		var that = DigiWebApp.MediaListController;
		that.set("lastTimestampDatatransfer", D8.now().getTimestamp());
		
		DigiWebApp.ApplicationController.DigiLoaderView.show(M.I18N.l('loadMediaFiles'));

		var successCallback = function() {
			DigiWebApp.MediaFile.deleteAll(DigiWebApp.MediaListController.init);
		};
		
		var errorCallback = function(err) {
			console.error(err);
			DigiWebApp.MediaListController.init();
		};
		
		var proceed = function(mediaFiles) {
			
			if (mediaFiles.length !== 0) {
				
				var mediaFilesLength = mediaFiles.length;
		    	var mediaFilesIndex = 0;
		    	var done = false;

		    	_.each(mediaFiles, function(el) {
		    		
	    			console.log('sending mediaFile for mediaFilesIndex ' + mediaFilesIndex);
						var sendObj = {
							  data: el.record
							, webservice: "medien"
							, loaderText: M.I18N.l('sendeMedien')
							, successCallback: function(data2, msg, request) {
						    	_.each(mediaFiles, function(mf) {
						            if (mf.m_id === el.m_id) {
							    		mediaFilesIndex = mediaFilesIndex + 1;
						            }
						        });
								if ( mediaFilesIndex === mediaFilesLength && done === false) {
									// last mediaFile sent
						    		console.log('sending last mediaFile done (with file)');
				    				DigiWebApp.ApplicationController.DigiLoaderView.hide();
				    				done = true;
				    				successCallback();
								}
							}
							, errorCallback: function() {
								if ( mediaFilesIndex === mediaFilesLength && done === false) {
									// last mediaFile sent (failed)
						    		console.log('last mediaFile done (sending last file failed)');
				    				DigiWebApp.ApplicationController.DigiLoaderView.hide();
				    				done = true;
				    				successCallback();
								}
							}
							//, additionalQueryParameter:
							, timeout: 60000
						};
						DigiWebApp.JSONDatenuebertragungController.sendData(sendObj);
							
		        });

// Alte Variante: alles auf einmal senden
//				var items = [];
//				
//				_.each(mediaFiles, function(mf){
//					var rec = JSON.parse(JSON.stringify(mf)); // clone to new Object
//					if (rec.record.handOrderId !== null && rec.record.handOrderId !== "0") {
//						rec.record.orderId = null;
//					}
//					items.push(rec.record);
//				});
//				
//				var data = {"medien": items};
//				
//				var internalSuccessCallback = function(data2, msg, request) {
//					// verarbeite empfangene Daten
//					console.log("sendeMedien Status: " + request.status);
//					// weiter in der Verarbeitungskette
//					successCallback();
//								
//				};
//				var sendObj = {
//						  data: data
//						, webservice: "medien"
//						, loaderText: M.I18N.l('sendeMedien')
//						, successCallback: internalSuccessCallback
//						, errorCallback: errorCallback
//						//, additionalQueryParameter:
//						, timeout: 60000
//				};
//				DigiWebApp.JSONDatenuebertragungController.sendData(sendObj);
		    	
			} else {
				// no files to send

				// weiter in der Verarbeitungskette
				successCallback();
			}
    	};

		var mediaFiles = DigiWebApp.MediaFile.find();
		var mediaFilesLength = mediaFiles.length;
    	var mediaFilesIndex = 0;
    	var done = false;
    	
    	if (mediaFilesLength !== 0) { 
	    	_.each(mediaFiles, function(el) {
	    			    		
    			console.log('loading mediaFile for mediaFilesIndex ' + mediaFilesIndex);
    			if (el.hasFileName()) {
	    			console.log("fileName: " + el.get('fileName'));
					// load signature into el
					el.readFromFile(function(fileContent) {
						//console.log("fileContent: " + fileContent);
						if (fileContent && (fileContent !== "")) {
					    	_.each(mediaFiles, function(mf) {
					            if (mf.m_id === el.m_id) {
					            	mf.set("data", fileContent);
						    		mediaFilesIndex = mediaFilesIndex + 1;
					            }
					        });
						}
						if ( mediaFilesIndex === mediaFilesLength && done === false) {
							// last mediaFile loaded
				    		console.log('last mediaFile done (with file)');
		    				DigiWebApp.ApplicationController.DigiLoaderView.hide();
		    				done = true;
		    				proceed(mediaFiles);
						}
					}, function() {
						if ( mediaFilesIndex === mediaFilesLength && done === false) {
							// last mediaFile loaded
				    		console.log('last mediaFile done (last file load failed)');
		    				DigiWebApp.ApplicationController.DigiLoaderView.hide();
		    				done = true;
		    				proceed(mediaFiles);
						}
					});
    			} else {
	    			// this mediaFile has no file
					if ( mediaFilesIndex === mediaFilesLength && done === false) {
						// last mediaFile loaded
			    		console.log('last mediaFile done (no file)');
	    				DigiWebApp.ApplicationController.DigiLoaderView.hide();
	    				done = true;
	    				proceed(mediaFiles);
					}
	    		}
	        });
    	} else {
    		//console.log('no mediafiles');
			DigiWebApp.ApplicationController.DigiLoaderView.hide();
			proceed(mediaFiles);
    	}
    }

});
