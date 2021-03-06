// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: DigiWebApp
// View: BautagebuchZusammenfassungMitarbeiterSummeTemplateView
// ==========================================================================

DigiWebApp.BautagebuchZusammenfassungMitarbeiterSummeTemplateView = M.ListItemView.design({

    isSelectable: NO

	, childViews: 'positionName handOrderName vonbisdauer endOfLine activity endOfLine2 remark mitarbeiterId'

    , events: {
        tap: {
			action: function(id, m_id) {
				var view = M.ViewManager.getViewById(id);
			    var view_mitarbeiterId = view.mitarbeiterId.value;
			    
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
	
	, vonbisdauer: M.LabelView.design({
	    cssClass: 'normal unselectable normalLabel right'
	  , isInline: YES
	  , computedValue: {
	      valuePattern: '<%= vonbisdauer %>'
	      , operation: function (v) {
	          return ": " + v;
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
	
	, endOfLine2: M.LabelView.design({
	    value: ''
	})

	, remark: M.LabelView.design({
	    cssClass: 'normal unselectable normalLabel'
		, computedValue: {
		    valuePattern: '<%= remark %>'
		    , operation: function (v) {
		        return v;
		    }
		}
	})
});


