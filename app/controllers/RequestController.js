// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso
//
// Project: DigiWebApp
// Controller: RequestController
// ==========================================================================
// manuell var-checked
DigiWebApp.RequestController = M.Controller.extend({

      softwareVersion: 11018

    , getDatabaseServer: function(myFunc, obj) {
        return DigiWebApp.JSONDatenuebertragungController.empfangeUrl(function(){
            myFunc(obj);
        });
    }
});