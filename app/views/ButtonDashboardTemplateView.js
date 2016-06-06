// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: DigiWebApp
// View: ButtonDashboardTemplateView
// ==========================================================================

DigiWebApp.ButtonDashboardTemplateView = M.ListItemView.design({

    isSelectable: NO

    , childViews: 'button icon'

    , events: {
        tap: {
            target: DigiWebApp.DashboardController,
            action: 'itemSelected'
        }
    }

	, button: M.ButtonView.design({
		cssClass: 'scholppButton'
      , computedValue: {
	        valuePattern: '<%= label %>'
	        , operation: function(v) {
				if (v === null || typeof(v) === "undefined") {
					return null;
				} else {
					return v;
				}
	        }
	  }
	    , events: {
	        tap: {
	            target: DigiWebApp.DashboardController,
	            action: 'itemSelected'
	        }
	    }
	})
	
    , icon: M.ImageView.design({
		  cssClass: 'scholppButtonMenuIcon'
        , computedValue: {
	          valuePattern: '<%= icon %>'
	        , operation: function(v) {
				if (v === null || typeof(v) === "undefined") {
					return null;
				} else {
					return 'theme/images/' + v;
				}
	        }
	  }
    })

});
