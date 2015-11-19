// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: DigiWebApp
// View: OrderListTemplateView
// ==========================================================================

DigiWebApp.OrderListTemplateView = M.ListItemView.design({

      isSelectable: NO

    , childViews: 'icon label'
    	
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
        , computedValue: {
	          valuePattern: '<%= label %>'
	        , operation: function(v) {
    			if (v == M.I18N.l('diesenOrdnerVerwenden')) {
    				cosnole.log(this);
    			}
	            return v;
	        }
	    }
    })

});
