// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: DigiWebApp
// View: BautagebuchBautagesberichtTemplateView
// ==========================================================================

DigiWebApp.BautagebuchBautagesberichtTemplateView = M.ListItemView.design({

      isSelectable: YES

    , childViews: 'abgeschlossen datum startUhrzeit orderName'

    , events: {
        tap: {
			action: function(id, m_id) {
				//console.log("tap");
			    var view = M.ViewManager.getViewById(id);
			    var view_modelId = view.modelId;
			    _.each(DigiWebApp.BautagebuchBautagesberichteListeController.items, function(selectedItem) {
					if (selectedItem.m_id === view_modelId) {
						if (selectedItem.get("bautagesberichtTyp") == "<standard>") {
							DigiWebApp.BautagebuchBautagesberichtDetailsController.load(selectedItem);
							if (selectedItem.get("abgeschlossen") === YES) {
								DigiWebApp.BautagebuchZusammenfassungController.load(selectedItem);
								DigiWebApp.NavigationController.toBautagebuchZusammenfassungPageTransition();
							} else {
								DigiWebApp.NavigationController.toBautagebuchBautagesberichtDetailsPageTransition();
							}
						} else {
							if (selectedItem.get("bautagesberichtTyp") == "<materialerfassung_only>") {
					            DigiWebApp.ApplicationController.nativeAlertDialogView({
					                title: M.I18N.l('materialPickUp')
					              , message: M.I18N.l('nurMaterialErfassung')
					            });
							} else if (selectedItem.get("bautagesberichtTyp") == "<notizen_only>") {
					            DigiWebApp.ApplicationController.nativeAlertDialogView({
					                title: M.I18N.l('BautagebuchNotizen')
					              , message: M.I18N.l('nurNotizenErfassung')
					            });
							} 
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
					if (v && v !== "") {
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
					if (v && v !== "") {
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
				if (v && v !== "") {
					return v;
				} else {
					return "";
				}
	          }
	  }
	})

    
});


