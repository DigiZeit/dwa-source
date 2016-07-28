// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: DigiWebApp
// View: ActivityListTemplateView
// ==========================================================================

DigiWebApp.ActivityListTemplateView = M.ListItemView.design({

      isSelectable: NO

    , childViews: 'label'
    	
    , cssClass: 'activityListEntry'

    , events: {
        tap: {
            target: DigiWebApp.ActivityListController,
            action: 'itemSelected'
        }
    }

    , icon: M.ImageView.design({
    	cssClass: 'unselectable'
        , computedValue: {
            valuePattern: '<%= icon %>'
            , operation: function(v) {
                return 'theme/images/' + v;
            }
        }
    })

    , label: M.LabelView.design({
    	cssClass: 'unselectable'
        , valuePattern: '<%= label %>'
    })

});
