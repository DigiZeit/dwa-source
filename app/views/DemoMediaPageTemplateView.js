// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: DigiWebApp
// View: DemoMediaPageTemplateView
// ==========================================================================

DigiWebApp.DemoMediaPageTemplateView = M.ListItemView.design({

      isSelectable: NO

    , childViews: 'icon label'

    , events: {
        tap: {
              target: DigiWebApp.DemoMediaPageController
            , action: 'itemSelected'
        }
    }

    , icon: M.ImageView.design({
        computedValue: {
              valuePattern: '<%= icon %>'
            , operation: function(v) {
                return 'theme/images/' + v;
            }
        }
    })

    , label: M.LabelView.design({
        valuePattern: '<%= label %>'
    })

});
