// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: DigiWebApp
// Controller: ChronologischeAuftragslisteController
// ==========================================================================

DigiWebApp.ChronologischeAuftragslisteController = M.Controller.extend({

	  items: null
		
	, init: function(isFirstLoad) {
		var that = DigiWebApp.ChronologischeAuftragslisteController;
		if (isFirst) {
			// do something only for the first load
		}
		var itemsToShow = [];
		_.each(DigiWebApp.Position.find(), function(pos) {
			// TODO: Termin am heitigen Tag?
		});
		that.set("items", itemsToShow);
	}

});
