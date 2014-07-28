// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: DigiWebApp
// Controller: BautagebuchMedienListeController
// ==========================================================================
// manuell var-checked
DigiWebApp.BautagebuchMedienListeController = M.Controller.extend({

	  items: null
	 
	, letzteFotoQuelle: null
	
	, init: function(isFirstLoad) {
		var that = this;
		
		that.set("items", DigiWebApp.BautagebuchMediaFile.findSorted(DigiWebApp.BautagebuchBautageberichtDetailsController.item.m_id));
		
	}

	, neu: function(useLetzteFotoQuelle) {
		var that = DigiWebApp.BautagebuchMedienListeController;
//    	M.DialogView.actionSheet({
//	          title: M.I18N.l('newMedia')
//	        , cancelButtonValue: M.I18N.l('cancel')
//	        //, otherButtonValues: [M.I18N.l('audio'),M.I18N.l('photo'),M.I18N.l('video'),M.I18N.l('other')]
//	        //, otherButtonTags: ["audio", "photo", "video", "other"]
//	        , otherButtonValues: [M.I18N.l('photo')]
//	        , otherButtonTags: ["photo"]
//	        , callbacks: {
//  				  other: {action: function(buttonTag) {
//	  			    switch(buttonTag) {
//		    		        case 'audio':
//		    		            DigiWebApp.ApplicationController.nativeAlertDialogView({
//		    		                title: M.I18N.l('notImplemented')
//		    		              , message: M.I18N.l('notImplementedMsg')
//		    		            });
//		    		            break;
//		    		        case 'photo':
		    		    		DigiWebApp.BautagebuchMedienDetailsController.set("item", DigiWebApp.BautagebuchMediaFile.createRecord({
			    		  			    bautagesberichtId: DigiWebApp.BautagebuchBautageberichtDetailsController.item.get('id')
			    		  			  , fileType: DigiWebApp.ApplicationController.CONSTImageFiletype
			    		  		}));
		    		    		DigiWebApp.BautagebuchMedienDetailsController.set("positionId", null);
		    		    		DigiWebApp.BautagebuchMedienDetailsController.set("positionName", null);
		    		    		DigiWebApp.BautagebuchMedienDetailsController.set("activityId", null);
		    		    		DigiWebApp.BautagebuchMedienDetailsController.set("activityName", null);
		    		    		DigiWebApp.BautagebuchMedienDetailsController.set("data", null);
		    		    		DigiWebApp.BautagebuchMedienDetailsController.set("remark", null);
		    		    		DigiWebApp.BautagebuchMedienDetailsController.set("fileType", DigiWebApp.ApplicationController.CONSTImageFiletype);
		    		    		
		    		    		libraryFunc = function() {
	  		    		        	// unterscheiden: auf Gerät oder im Browser?
	  		    		        	if ( typeof navigator.camera !== 'undefined' 
	  		    	        		  && typeof navigator.camera.getPicture !== 'undefined') {
	  		    		        		
	  		    		        		// auf Geraet:
	  		    		        		navigator.camera.getPicture(
	  	    		        				  function(imgData) {
	  	    		        				      var that = DigiWebApp.BautagebuchMedienDetailsController;
	  	    		        				      var image = document.getElementById(DigiWebApp.BautagebuchMedienDetailsPage.content.image.id);
	  	    		        					  if (imgData.indexOf("data:") === 0) {
		  	    		        				        image.src = imgData;
	  	    		        					  } else {
		  	    		        				        image.src = 'data:' + DigiWebApp.ApplicationController.CONSTImageFiletype + ',' + imgData;
	  	    		        					  }
	  	    		        					  that.set("data", image.src);
	  	    		        					  that.set("fileType", DigiWebApp.ApplicationController.CONSTImageFiletype);
	  	    		        					  DigiWebApp.NavigationController.toBautagebuchMedienDetailsPageTransition();
	  	    		        				}
	  	    		        				, function(err) {
	  				    		        		DigiWebApp.BautagebuchMedienDetailsController.set("data", null);
	  				    		        		DigiWebApp.BautagebuchMedienDetailsController.set("fileType", null);
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
	  			    		        		var that = DigiWebApp.BautagebuchMedienDetailsController;
	  				    		        	if (imgData !== null) {
  	    		        				          var image = document.getElementById(DigiWebApp.BautagebuchMedienDetailsPage.content.image.id);
  					    		        		  that.set("loadedFileName", fileName);
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
  					    		        		  		that.set("loadedPicture", null);
  					    		        		  		that.set("fileType", null);
  								    		            DigiWebApp.ApplicationController.nativeAlertDialogView({
  								    		                title: M.I18N.l('error')
  								    		              , message: M.I18N.l('noPicLoaded')
  								    		            });
  					    		        		  		break;
  					    		        		  	default:
		  					    		        		  that.set("fileType", myFileType);
    		  	    		        					  if (imgData.indexOf("data:") === 0) {
	    		  	    		        				    	image.src = imgData;
    		  	    		        					  } else {
	    		  	    		        				        image.src = 'data:' + myFileType + ',' + imgData;
    		  	    		        					  }
    		  	    		        					  that.set("data", image.src);
    		  	    		        					  DigiWebApp.NavigationController.toBautagebuchMedienDetailsPageTransition();
  				    		        					break;
  					    		        		  }
	  				    		        	} else {
	  				    		        		that.set("data", null);
  					    		        		that.set("loadedFileName", null);
  					    		        		that.set("fileType", null);
	  					    		            DigiWebApp.ApplicationController.nativeAlertDialogView({
	  					    		                title: M.I18N.l('error')
	  					    		              , message: M.I18N.l('noPicLoaded')
	  					    		            });
	  				    		        	}
	  			    		        	});
	  			    		        	DigiWebApp.NavigationController.toFileChooserPageTransition();
	  		    		        	}
		    		    		}
		    		    		
		    		    		cameraFunc = function() {
	  		    		        	// unterscheiden: auf Gerät oder im Browser?
	  		    		        	if ( typeof navigator.camera !== 'undefined' 
	  		    	        		  && typeof navigator.camera.getPicture !== 'undefined') {
	  		    		        		DigiWebApp.BautagebuchMedienDetailsController.takePicture();
	  		    		        	} else {
	  		    		        		// Browser hat keine Kamera
				    		            DigiWebApp.ApplicationController.nativeAlertDialogView({
				    		                title: M.I18N.l('error')
				    		              , message: M.I18N.l('noCamera')
				    		            });
	  		    		        	}
		    		    		}
		    		    		
		    		    		if (useLetzteFotoQuelle) {
    		        				switch(DigiWebApp.BautagebuchMedienListeController.letzteFotoQuelle) {
			  		    		        case 'library':
			  		    		        	libraryFunc();
			  		    		            break;
			  		    		        case 'camera':
			  		    		        	cameraFunc();
			  		    		            break;
			  		    		        default:
			  		    		            console.log("unknown ButtonTag");
			  		    		            break;
				  	  			    }
		    		    		} else {
			    		        	M.DialogView.actionSheet({
				    		  	          title: M.I18N.l('takePicture')
				    		  	        , cancelButtonValue: M.I18N.l('cancel')
				    		  	        , otherButtonValues: [M.I18N.l('library'), M.I18N.l('camera'), M.I18N.l('uebersicht')]
				    		  	        , otherButtonTags: ["library", "camera", "uebersicht"]
				    		  	        , callbacks: {
				    		  				  other: {action: function(buttonTag2) {
			    		        				DigiWebApp.BautagebuchMedienListeController.letzteFotoQuelle = buttonTag2;
			    		        				switch(buttonTag2) {
				    		  		    		        case 'library':
				    		  		    		        	libraryFunc();
				    		  		    		            break;
				    		  		    		        case 'camera':
				    		  		    		        	cameraFunc();
				    		  		    		            break;
				    		  		    		        case 'uebersicht':
				    		  		    		        	DigiWebApp.BautagebuchBautageberichtDetailsController.save(DigiWebApp.NavigationController.toBautagebuchMedienListePageTransition);
				    		  		    		            break;
				    		  		    		        default:
				    		  		    		            console.log("unknown ButtonTag");
				    		  		    		            break;
				    		  	  			    }
				    		  	  			}}
				    		  			, cancel: {action: function() {
				    		  				//console.log(M.I18N.l('cancel'));
				    		  			}}
				    		  		}
				    		  	    });
		    		    		}
//		    		            break;
//		    		        case 'video':
//		    		            DigiWebApp.ApplicationController.nativeAlertDialogView({
//		    		                title: M.I18N.l('notImplemented')
//		    		              , message: M.I18N.l('notImplementedMsg')
//		    		            });
//		    		            break;
//		    		        case 'other':
//		    		            DigiWebApp.ApplicationController.nativeAlertDialogView({
//		    		                title: M.I18N.l('notImplemented')
//		    		              , message: M.I18N.l('notImplementedMsg')
//		    		            });
//		    		            break;
//		    		        default:
//		    		            console.log("unknonw ButtonTag");
//		    		            break;
//	  			    }
//	  			}}
//  			, cancel: {action: function() {
//  				//console.log(M.I18N.l('cancel'));
//  			}}
//  		}
//	    });
	
	}
	
});
