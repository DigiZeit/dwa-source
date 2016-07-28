// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: DigiWebApp
// Model: Features
// ==========================================================================

DigiWebApp.Features = M.Model.create({

    /* Define the name of your model. Do not delete this property! */
    __name__: 'Features'

    , id: M.Model.attr('String', {
        isRequired: NO
    })

    , name: M.Model.attr('String', {
        isRequired: NO
    })
    
    , isAvailable: M.Model.attr('Boolean', {
        isRequired: NO
    })
    
    , deleteAll: function() {
        _.each(this.find(), function(el) {
            el.del();
        });
    }

}, M.DataProviderLocalStorage);
