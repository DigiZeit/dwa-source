// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: DigiWebApp
// View: DashboardTemplateView
// ==========================================================================

DigiWebApp.DashboardTemplateView = M.ListItemView.design({

    isSelectable: NO

    , childViews: 'icon label'

    , events: {
        tap: {
            target: DigiWebApp.DashboardController,
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
