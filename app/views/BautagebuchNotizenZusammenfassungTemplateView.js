// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: DigiWebApp
// View: BautagebuchNotizenZusammenfassungTemplateView
// ==========================================================================

DigiWebApp.BautagebuchNotizenZusammenfassungTemplateView = M.ListItemView.design({

      isSelectable: YES

    , childViews: 'positionName handOrderName activityName spacer data'

    , events: {
        tap: {
			action: function(id, m_id) {
			    var view = M.ViewManager.getViewById(id);
			    var view_modelId = view.modelId;
			    _.each(DigiWebApp.BautagebuchNotizenListeController.items, function(selectedItem) {
					if (selectedItem.m_id === view_modelId) {
						DigiWebApp.BautagebuchNotizenDetailsController.load(selectedItem);
					}
				});
			    DigiWebApp.NavigationController.toBautagebuchNotizenDetailsPageTransition();
			}
        }
    }

	, spacer: M.LabelView.design({
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

	, activityName: M.LabelView.design({
	      cssClass: 'normal unselectable'
	    , isInline: YES
		, computedValue: {
		      valuePattern: '<%= activityName %>'
		    , operation: function(v) {
						if (v !== "" && v !== null) {
							return ", " + v + ":";
						} else {
							return ":";
						}
		        }
		}
	})

	, data: M.LabelView.design({
	      cssClass: 'small unselectable marginRight40'
		, computedValue: {
		      valuePattern: '<%= data %>'
		    , operation: function(v) {
						if (v !== "" && v !== null) {
//							var outputLength = 50;
//							if (v.length > outputLength) { 
//								return v.substring(0,outputLength) + "..."; 
//							} else { 
//								return v.substring(0,outputLength);
//							}
							return v;
						} else {
							return "";
						}
		        }
		}
	})
    
});


