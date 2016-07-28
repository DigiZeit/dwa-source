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
		
		that.set("items", DigiWebApp.BautagebuchMediaFile.findSorted(
            DigiWebApp.BautagebuchBautagesberichtDetailsController.item.get('id')));
	}

	, neu: function(useLetzteFotoQuelle) {
	    var that = DigiWebApp.BautagebuchMedienListeController;

	    var filetypeString = "image/" + DigiWebApp.SettingsController.getSetting(
            'pictureEncodingType').toLowerCase() + ";base64"
	    DigiWebApp.BautagebuchMedienDetailsController.set("item",
            DigiWebApp.BautagebuchMediaFile.createRecord({
			    bautagesberichtId: DigiWebApp.BautagebuchBautagesberichtDetailsController.item.get('id')
			    , fileType: DigiWebApp.ApplicationController.getImageFiletype()
		}));
		if (DigiWebApp.BautagebuchBautagesberichtDetailsController.item.get('orderId')) {
		    DigiWebApp.BautagebuchMedienDetailsController.set("auftragId",
                DigiWebApp.BautagebuchBautagesberichtDetailsController.item.get('orderId'));
		    DigiWebApp.BautagebuchMedienDetailsController.set("auftragName",
                DigiWebApp.BautagebuchBautagesberichtDetailsController.item.get('orderName'));
		} else {
		    DigiWebApp.BautagebuchMedienDetailsController.set("auftragId", null);
		    DigiWebApp.BautagebuchMedienDetailsController.set("auftragName", null);
		}
		if (DigiWebApp.BautagebuchBautagesberichtDetailsController.item.get('handOrderId')) {
		    DigiWebApp.BautagebuchMedienDetailsController.set("handOrderId",
                DigiWebApp.BautagebuchBautagesberichtDetailsController.item.get('handOrderId'));
		    DigiWebApp.BautagebuchMedienDetailsController.set("handOrderVaterId",
                DigiWebApp.BautagebuchBautagesberichtDetailsController.item.get('handOrderVaterId'));
		    DigiWebApp.BautagebuchMedienDetailsController.set("handOrderName",
                DigiWebApp.BautagebuchBautagesberichtDetailsController.item.get('handOrderName'));
		} else {
		    DigiWebApp.BautagebuchMedienDetailsController.set("handOrderId", null);
		    DigiWebApp.BautagebuchMedienDetailsController.set("handOrderVaterId", null);
		    DigiWebApp.BautagebuchMedienDetailsController.set("handOrderName", null);
		}
		if (DigiWebApp.BautagebuchBautagesberichtDetailsController.item.get('positionId')) {
		    DigiWebApp.BautagebuchMedienDetailsController.set("positionId",
                DigiWebApp.BautagebuchBautagesberichtDetailsController.item.get('positionId'));
		    DigiWebApp.BautagebuchMedienDetailsController.set("positionName",
                DigiWebApp.BautagebuchBautagesberichtDetailsController.item.get('positionName'));
		}
		DigiWebApp.BautagebuchMedienDetailsController.set("mitarbeiterId",
            DigiWebApp.BautagebuchBautagesberichtDetailsController.item.get('projektleiterId'));
		DigiWebApp.BautagebuchMedienDetailsController.set("activityId", null);
		DigiWebApp.BautagebuchMedienDetailsController.set("activityName", null);
		DigiWebApp.BautagebuchMedienDetailsController.set("data", null);
		DigiWebApp.BautagebuchMedienDetailsController.set("remark", null);
		DigiWebApp.BautagebuchMedienDetailsController.set("fileType",
            DigiWebApp.ApplicationController.getImageFiletype());
		    		    		
		var libraryFunc = function() {
	  		// unterscheiden: auf Gerät oder im Browser?
	  		if (typeof navigator.camera !== 'undefined' 
	  		    && typeof navigator.camera.getPicture !== 'undefined') {
	  		    		        		
	  		    // auf Geraet:
	  		    navigator.camera.getPicture(
	  	    		    function(imgData) {
	  	    		        var that = DigiWebApp.BautagebuchMedienDetailsController;
	  	    		        var image = document.getElementById(
                                DigiWebApp.BautagebuchMedienDetailsPage.content.image.id);
	  	    		        if (imgData.indexOf("data:") === 0) {
		  	    		        image.src = imgData;
	  	    		        } else {
	  	    		            image.src = 'data:'
                                    + DigiWebApp.ApplicationController.getImageFiletype()
                                    + ','
                                    + imgData;
	  	    		        }
	  	    		        that.set("data", image.src);
	  	    		        that.set("fileType", DigiWebApp.ApplicationController.getImageFiletype());
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
	  				    var image = document.getElementById(
                            DigiWebApp.BautagebuchMedienDetailsPage.content.image.id);
  					    	that.set("loadedFileName", fileName);
  					    	var myFileType = ""; //DigiWebApp.ApplicationController.getImageFiletype();
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
	  		} // if/else Geraet/Browser
		} // libraryFunc
		    		    		
		var cameraFunc = function() {
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
				    		  	    DigiWebApp.BautagebuchBautagesberichtDetailsController.save(
                                        DigiWebApp.NavigationController.toBautagebuchMedienListePageTransition);
				    		  		break;
				    		  	default:
				    		  		console.log("unknown ButtonTag");
				    		  		break;
				    	}
				    }}
				, cancel: {action: function() {
				}}
			}
			});
		} // if/else (useLetzteFotoQuelle)
	}
});
