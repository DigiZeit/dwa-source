// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: DigiWebApp
// View: BautagebuchZusammenfassungMitarbeiterZeitenTemplateView
// ==========================================================================

DigiWebApp.BautagebuchZusammenfassungMitarbeiterZeitenTemplateView = M.ListItemView.design({

      isSelectable: NO

    //, childViews: 'grid'
	, childViews: 'name summe'

    , events: {
        tap: {
			action: function(id, m_id) {
//			    var view = M.ViewManager.getViewById(id);
//			    var view_modelId = view.modelId;
//			    _.each(DigiWebApp.BautagebuchMaterialienListeController.items, function(selectedItem) {
//					if (selectedItem.m_id === view_modelId) {
//						DigiWebApp.BautagebuchMaterialienDetailsController.load(selectedItem);
//					}
//				});
//			    DigiWebApp.NavigationController.toBautagebuchMaterialienDetailsPageTransition();
			}
        }
    }
	
	, name: M.LabelView.design({
	    cssClass: 'normal unselectable bigLabel'
	  , isInline: YES
	  , computedValue: {
	        valuePattern: '<%= id %>'
	      , operation: function(v) {
			    		var myMitarbeiter = DigiWebApp.BautagebuchMitarbeiter.find({query:{identifier: 'id', operator: '=', value: v}})[0];
			    		if (typeof myMitarbeiter !== "undefined") {
			    			return myMitarbeiter.vollername();
			        	} else {
			        		return v;
			        	}
	      }
	  }
	})
	
	, summe: M.LabelView.design({
	    cssClass: 'normal unselectable bigLabel right'
  	  , isInline: YES
	  , computedValue: {
	        valuePattern: '<%= id %>'
	      , operation: function(v) {
						return v;
	      }
	  }
	})
	
//	, grid: M.GridView.design({
//		
//		  layout: M.TWO_COLUMNS
//		, childViews: 'name summe'
//			
//		, name: M.LabelView.design({
//		    cssClass: 'normal unselectable bigLabel'
//		  , computedValue: {
//		        valuePattern: '<%= id %>'
//		      , operation: function(v) {
//				    		var myMitarbeiter = DigiWebApp.BautagebuchMitarbeiter.find({query:{identifier: 'id', operator: '=', value: v}})[0];
//				    		if (typeof myMitarbeiter !== "undefined") {
//				    			return myMitarbeiter.vollername();
//				        	} else {
//				        		return v;
//				        	}
//	          }
//		  }
//		})
//		
//		, summe: M.LabelView.design({
//		    cssClass: 'normal unselectable bigLabel'
//		  , computedValue: {
//		        valuePattern: '<%= id %>'
//		      , operation: function(v) {
//							return v;
//	          }
//		  }
//		})
//	})
});


