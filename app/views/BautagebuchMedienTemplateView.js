// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: DigiWebApp
// View: BautagebuchMedienTemplateView
// ==========================================================================

DigiWebApp.BautagebuchMedienTemplateView = M.ListItemView.design({

      isSelectable: YES

    , childViews: 'positionName activityName spacer remark'

    , events: {
        tap: {
			action: function(id, m_id) {
				    var view = M.ViewManager.getViewById(id);
				    var view_modelId = view.modelId;
				    _.each(DigiWebApp.BautagebuchMedienListeController.items, function(selectedItem) {
						if (selectedItem.m_id === view_modelId) {
							DigiWebApp.BautagebuchMedienDetailsController.load(selectedItem);
						}
					});
				    DigiWebApp.NavigationController.toBautagebuchMedienDetailsPageTransition();
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

	, remark: M.LabelView.design({
	      cssClass: 'small unselectable'
		, computedValue: {
		      valuePattern: '<%= remark %>'
		    , operation: function(v) {
						if (v !== "" && v !== null) {
							var outputLength = 50;
							if (v.length > outputLength) { 
								return v.substring(0,outputLength) + "..."; 
							} else { 
								return v.substring(0,outputLength);
							}
						} else {
							return "";
						}
		        }
		}
	})
    
});


