// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: DigiWebApp
// View: DummyTemplateView
// ==========================================================================

DigiWebApp.DummyTemplateView = M.ListItemView.design({

      isSelectable: YES

    , childViews: 'name prop'

	, name: M.LabelView.design({
	    cssClass: 'bold unselectable'
	  , computedValue: {
	        valuePattern: '<%= name %>'
	      , operation: function(v) {
					return v;
				}
	      }
	  }
	})
	
	, prop: M.LabelView.design({
	    cssClass: 'bold unselectable'
	  , computedValue: {
	        valuePattern: '<%= prop %>'
	      , operation: function(v) {
					return v;
				}
	      }
	  }
	})

});


