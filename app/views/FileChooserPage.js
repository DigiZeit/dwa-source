// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: DigiWebApp
// View: FileChooserPage
// ==========================================================================

DigiWebApp.FileChooserPage = M.PageView.design({

	  childViews: 'header content'
	
	, cssClass: 'fileChooserPage'
		
	, successCallback: function() {}
	
	, events: {
		pagebeforeshow: {
	        //  target: DigiWebApp.EditPicturePageController
	        //, action: 'init'
			action: function() {
				$("#" + DigiWebApp.FileChooserPage.content.inputfile.id).val("");
				$("#" + DigiWebApp.FileChooserPage.content.inputfile.id).unbind("change");
				$("#" + DigiWebApp.FileChooserPage.content.inputfile.id).bind("change", function(evt) { 
					var files = evt.target.files;
					var file = files[0];
					//console.log(file);
					var reader = new FileReader();
					reader.onload = function() {
						//console.log(this);
						DigiWebApp.FileChooserPage.successCallback(this.result, file.name);
					};
					reader.onerror = function() {
						DigiWebApp.FileChooserPage.successCallback(null);
					};
					reader.readAsDataURL(file);
				});
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
	              	//  target: DigiWebApp.NavigationController
	              	//, action: DigiWebApp.FileChooserPage.NavigationControllerMethodToReturnTo
	    			action: function() {
	    				try{DigiWebApp.ApplicationController.vibrate();}catch(e2){} 
	    				history.back();
	    			}
	          	}
	      	  }
	    })

	  , title: M.LabelView.design({
	            value: M.I18N.l('editPicture')
	          , anchorLocation: M.CENTER
	        })
	      , anchorLocation: M.TOP
	  })
	
	  , content: M.ScrollView.design({
	  	
	        	childViews: 'inputfile'
	        
	          , cssClass: 'inputfile'
	
              , inputfile: M.FormView.design({
	                	
	              	    childViews: ''
	              		                  	
	                  , render: function() {
	              		this.html += '<form method="post" action="" class="">';
	                  	//this.renderChildViews();
	              		this.html += '<input type="file" id="' + this.id + '" enctype="multipart/form-data" />';
	      				this.html += '</form>';
	                  	return this.html;
	              	}
	              })
			  
		      
	  })
	  
});

