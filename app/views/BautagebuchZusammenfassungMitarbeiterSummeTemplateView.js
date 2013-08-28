// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: DigiWebApp
// View: BautagebuchZusammenfassungMitarbeiterSummeTemplateView
// ==========================================================================

DigiWebApp.BautagebuchZusammenfassungMitarbeiterSummeTemplateView = M.ListItemView.design({

      isSelectable: NO

    //, childViews: 'grid'
	, childViews: 'position activity vonbisdauer mitarbeiterId'

    , events: {
        tap: {
			action: function(id, m_id) {
				var view = M.ViewManager.getViewById(id);
			    //console.log(view);
			    var view_mitarbeiterId = view.mitarbeiterId.value;
			    //console.log(view_mitarbeiterId);
//			    _.each(DigiWebApp.BautagebuchZusammenfassungController.ZeitbuchungenPerMitarbeiterList, function(maItem) {
//			        _.each(maItem.items, function(selectedItem) {
//						if (selectedItem.mitarbeiterId === view_mitarbeiterId ) {
//							//DigiWebApp.BautagebuchMaterialienDetailsController.load(selectedItem);
//							console.log(selectedItem.mitarbeiterId);
//						}
//					});
//				});
			    //DigiWebApp.NavigationController.toBautagebuchMaterialienDetailsPageTransition();
			    DigiWebApp.BautagebuchZeitenListeController.neu(view_mitarbeiterId);
			}
        }
    }

	, mitarbeiterId: M.LabelView.design({
	    cssClass: 'hiddenLabel'
	  , isInline: YES
	  , computedValue: {
	        valuePattern: '<%= mitarbeiterId %>'
	      , operation: function(v) {
				return v;
	      }
	  }
	})

	, position: M.LabelView.design({
	    	cssClass: 'normal unselectable normalLabel'
		  , isInline: YES
		  , computedValue: {
		        valuePattern: '<%= positionName %>'
		      , operation: function(v) {
					return v;
	      	  }
	  	  }
	})
	
	, activity: M.LabelView.design({
		    cssClass: 'normal unselectable normalLabel'
	  	  , isInline: YES
		  , computedValue: {
		        valuePattern: '<%= activityName %>'
		      , operation: function(v) {
					return ", " + v;
		      }
		  }
	})
		

	, vonbisdauer: M.LabelView.design({
	    cssClass: 'normal unselectable normalLabel right'
	  , isInline: YES
	  , computedValue: {
	        valuePattern: '<%= vonbisdauer %>'
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


