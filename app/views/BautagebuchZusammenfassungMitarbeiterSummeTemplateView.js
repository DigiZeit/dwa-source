// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: DigiWebApp
// View: BautagebuchZusammenfassungMitarbeiterSummeTemplateView
// ==========================================================================

DigiWebApp.BautagebuchZusammenfassungMitarbeiterSummeTemplateView = M.ListItemView.design({

    isSelectable: NO

	, childViews: 'positionName handOrderName vonbisdauer endOfLine activity mitarbeiterId'

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
			    
			    if (M.ViewManager.getCurrentPage() === DigiWebApp.BautagebuchZeitenListePage) {
			    	// ZeitenListePage
				    var view_modelId = view.value.modelId;
				    _.each(DigiWebApp.BautagebuchZeitenListeController.items, function(selectedItem) {
						if (selectedItem.m_id === view_modelId) {
							DigiWebApp.BautagebuchZeitenDetailsController.load(selectedItem);
						}
					});
				    DigiWebApp.NavigationController.toBautagebuchZeitenDetailsPageTransition();
			    } else {
			    	// Zusammenfassung
				    DigiWebApp.BautagebuchZeitenListeController.neu(view_mitarbeiterId);			    	
			    }
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

	, endOfLine: M.LabelView.design({
		value: ''
	})

	, positionName: M.LabelView.design({
	    cssClass: 'normal unselectable'
  	  , isInline: YES
	  , computedValue: {
	        valuePattern: '<%= positionName %>'
	      , operation: function(v) {
					if (v !== "" && v !== null) {
						return v;
					} else {
						return "";
					}
	          }
	  }
	})
	
	, handOrderName: M.LabelView.design({
	    cssClass: 'normal unselectable'
  	  , isInline: YES
	  , computedValue: {
	        valuePattern: '<%= handOrderName %>'
	      , operation: function(v) {
					if (v !== "" && v !== null) {
						return v;
					} else {
						return "";
					}
	          }
	  }
	})
	
	, activity: M.LabelView.design({
		    cssClass: 'normal unselectable normalLabel'
	  	  , isInline: YES
		  , computedValue: {
		        valuePattern: '<%= activityName %>'
		      , operation: function(v) {
					return v;
		      }
		  }
	})
	
	, remark: M.LabelView.design({
	    cssClass: 'normal unselectable normalLabel'
	  	  , isInline: YES
		  , computedValue: {
		      valuePattern: '<%= remark %>'
		      , operation: function (v) {
		          return v;
		      }
		  }
	})

	, vonbisdauer: M.LabelView.design({
	    cssClass: 'normal unselectable normalLabel right'
	  , isInline: YES
	  , computedValue: {
	        valuePattern: '<%= vonbisdauer %>'
	      , operation: function(v) {
				return ": " + v;
	      }
	  }
	})
});


