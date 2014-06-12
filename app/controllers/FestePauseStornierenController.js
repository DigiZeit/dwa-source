// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: DigiWebApp
// Controller: FestePauseStornierenController
// ==========================================================================

DigiWebApp.FestePauseStornierenController = M.Controller.extend({

	  items: null
	  
	, init: function(isFirstLoad) {
		var that = this;
		if (isFirstLoad) {

		}
		that.initBalken();
		that.initPausenLists();
	}

	, gesternBalken: null
    , heuteBalken: null
    , morgenBalken: null    	
    , initBalken: function() {
		var that = this;
		that.set('gesternBalken', [{
			  "label": D8.create().yesterday().format("dd.mm.yyyy")
			, "items": []
		}]); 
		that.set('heuteBalken', [{
			  "label": D8.create().format("dd.mm.yyyy")
			, "items": []
		}]); 
		that.set('morgenBalken', [{
			  "label": D8.create().tomorrow().format("dd.mm.yyyy")
			, "items": []
		}]); 
	}
	
	, gesternPausenList: null
	, heutePausenList: null
	, morgenPausenList: null
	, initPausenLists: function() {
		var that = this;
		
	}
});
