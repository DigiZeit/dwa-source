// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: DigiWebApp
// View: BautagebuchMaterialienTemplateView
// ==========================================================================

DigiWebApp.BautagebuchMaterialienTemplateView = M.ListItemView.design({

      isSelectable: YES

    , childViews: 'orderName positionName handOrderName activityName spacer menge einheit artikel'

    , events: {
        tap: {
			action: function(id, m_id) {
			    var view = M.ViewManager.getViewById(id);
			    var view_modelId = view.modelId;
			    _.each(DigiWebApp.BautagebuchMaterialienListeController.items, function(selectedItem) {
					if (selectedItem.m_id === view_modelId) {
						DigiWebApp.BautagebuchMaterialienDetailsController.load(selectedItem);
					}
				});
			    DigiWebApp.NavigationController.toBautagebuchMaterialienDetailsPageTransition();
			}
        }
    }
	
	, spacer: M.LabelView.design({
	      value: ''
	})

	, orderName: M.LabelView.design({
	    cssClass: 'normal unselectable'
  	  , isInline: YES
	  , computedValue: {
	        valuePattern: '<%= orderName %>'
	      , operation: function(v) {
					if (v !== "" && v !== null && DigiWebApp.BautagebuchBautagesberichtDetailsController.bautagesberichtTyp != "<standard>") {
						return v;
					} else {
						return "";
					}
	          }
	  }
	})
	
	, positionName: M.LabelView.design({
	    cssClass: 'normal unselectable'
  	  , isInline: YES
	  , computedValue: {
	        valuePattern: '<%= positionName %>'
	      , operation: function(v) {
					if (v !== "" && v !== null) {
						if (DigiWebApp.BautagebuchBautagesberichtDetailsController.bautagesberichtTyp == "<standard>") {
							return v;
						} else {
							return ", " + v;
						}
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
	
	, menge: M.LabelView.design({
	    cssClass: 'normal unselectable'
  	  , isInline: YES
	  , computedValue: {
	        valuePattern: '<%= menge %>'
	      , operation: function(v) {
					if (v !== "" && v !== null) {
						return v;
					} else {
						return "";
					}
	          }
	  }
	})
	
	, einheit: M.LabelView.design({
	    cssClass: 'normal unselectable'
	  , isInline: YES
	  , computedValue: {
	        valuePattern: '<%= einheit %>'
	      , operation: function(v) {
					if (v !== "" && v !== null) {
						return " " + v;
					} else {
						return "";
					}
	          }
	  }
	})

	, artikel: M.LabelView.design({
	    cssClass: 'normal unselectable'
	  , isInline: YES
	  , computedValue: {
	        valuePattern: '<%= artikel %>'
	      , operation: function(v) {
					if (v !== "" && v !== null) {
						return " \"" + v + "\"";
					} else {
						return "";
					}
	          }
	  }
	})
    
});


