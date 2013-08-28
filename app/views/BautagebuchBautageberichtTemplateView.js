// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: DigiWebApp
// View: BautagebuchBautageberichtTemplateView
// ==========================================================================

DigiWebApp.BautagebuchBautageberichtTemplateView = M.ListItemView.design({

      isSelectable: YES

    , childViews: 'abgeschlossen datum startUhrzeit orderName'

    , events: {
        tap: {
			action: function(id, m_id) {
			    var view = M.ViewManager.getViewById(id);
			    var view_modelId = view.modelId;
			    _.each(DigiWebApp.BautagebuchBautageberichteListeController.items, function(selectedItem) {
					if (selectedItem.m_id === view_modelId) {
						DigiWebApp.BautagebuchBautageberichtDetailsController.load(selectedItem);
						if (selectedItem.get("abgeschlossen") === YES) {
							DigiWebApp.BautagebuchZusammenfassungController.load(selectedItem);
							DigiWebApp.NavigationController.toBautagebuchZusammenfassungPageTransition();
						} else {
							DigiWebApp.NavigationController.toBautagebuchBautageberichtDetailsPageTransition();
						}
					}
				});
			}
        }
    }

	, spacer: M.LabelView.design({
	      cssClass: 'unselectable marginBottom12'
	    , value: ' '
	})
	
	, abgeschlossen: M.LabelView.design({
	    cssClass: 'bigLabel unselectable'
	  , isInline: NO
	  , computedValue: {
	        valuePattern: '<%= abgeschlossen %>'
	      , operation: function(v) {
					if (parseBool(v)) {
						return M.I18N.l('BautagebuchAbgeschlossen');
					} else {
						return "";
					}
	          }
	  }
	})
	
	, datum: M.LabelView.design({
	    cssClass: 'normal unselectable'
	  , isInline: YES
	  , computedValue: {
	        valuePattern: '<%= datum %>'
	      , operation: function(v) {
					if (v !== "") {
						return v;
					} else {
						return "";
					}
	          }
	  }
	})
	
	, startUhrzeit: M.LabelView.design({
	    cssClass: 'normal unselectable'
	  , isInline: YES
	  , computedValue: {
	        valuePattern: '<%= startUhrzeit %>'
	      , operation: function(v) {
					if (v !== "") {
						return ", " + M.I18N.l('BautagebuchStartingFrom') + " " + v;
					} else {
						return "";
					}
	          }
	  }
	})

	, orderName: M.LabelView.design({
	    cssClass: 'normal unselectable'
	  , computedValue: {
	        valuePattern: '<%= orderName %>'
	      , operation: function(v) {
				if (v !== "") {
					return v;
				} else {
					return "";
				}
	          }
	  }
	})

    
});


