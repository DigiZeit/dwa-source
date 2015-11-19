// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: DigiWebApp
// View: OrderListTemplateView
// ==========================================================================

DigiWebApp.OrderListTemplateView = M.ListItemView.design({

      isSelectable: NO

    , childViews: 'label'
    	
    , cssClass: 'orderListEntry'

    , events: {
        tap: {
            target: DigiWebApp.OrderListController,
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
