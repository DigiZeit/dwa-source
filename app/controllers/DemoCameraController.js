//// ==========================================================================
//// The M-Project - Mobile HTML5 Application Framework
//// Generated with: Espresso 
////
//// Project: DigiWebApp
//// Controller: CameraController
//// ==========================================================================
//
//DigiWebApp.DemoCameraController = M.Controller.extend({
//
//    , init: function(isFirstLoad) {
//		
//        if(isFirstLoad) {
//            /* do something here, when page is loaded the first time. */
//        }
//        /* do something, for any other load. */
//        if (       typeof navigator.device !== 'undefined' 
//        		&& typeof navigator.device.capture !== 'undefined' 
//        		&& typeof navigator.device.capture.captureImage !== 'undefined'
//        	) {
//        	// camera probably available
//        	$('#' + DigiWebApp.DemoCameraPage.content.takePictureGrid.id).show();
//        } else {
//        	$('#' + DigiWebApp.DemoCameraPage.content.takePictureGrid.id).hide();
//        }
//    }
//      
//    , takePicture: function() {
//    		navigator.camera.getPicture(
//    			  DigiWebApp.DemoCameraController.cameraSuccessBase64
//    			, DigiWebApp.DemoCameraController.cameraError
//    			, { 
//    				  quality: 40
//    			//	, allowEdit: true
//    				, destinationType: navigator.camera.DestinationType.DATA_URL
//    			//	, destinationType: navigator.camera.DestinationType.FILE_URI
//    			//	, sourceType: navigator.camera.PictureSourceType.CAMERA 
//    			  }
//    		);    	
//    }
//        	
//    , myImageData: null
//    , myImageObj: null
//    , cameraSuccessBase64: function(imageData) {
//        //alert("success");
//    	//DigiWebApp.DemoCameraController.myImageData = imageData;
//        var image = document.getElementById(DigiWebApp.DemoCameraPage.content.image.id);
//        image.src = 'data:' + DigiWebApp.ApplicationController.CONSTImageFiletype + ',' + imageData;
//
//        //DigiWebApp.DemoCameraController.myImageObj = new Image();
//        //DigiWebApp.DemoCameraController.myImageObj.src = 'data:' + DigiWebApp.ApplicationController.CONSTImageFiletype + ',' + imageData;
//    }
//
//    , myImageURI: null
//    , cameraSuccessURI: function(imageURI) {
//        //alert("success");
//    	//DigiWebApp.DemoCameraController.myImageURI = imageURI;
//        var image = document.getElementById(DigiWebApp.DemoCameraPage.content.image.id);
//        image.src = imageURI;
//    }
//    
//    , cameraError: function(mymessage) {
//        DigiWebApp.ApplicationController.nativeAlertDialogView({
//            title: 'ERROR',
//            message: mymessage
//        });
//    }
//    
//});
