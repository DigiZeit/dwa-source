// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: DigiWebApp
// Controller: StudieChecklisteController
// ==========================================================================
// manuell var-checked
DigiWebApp.StudieChecklisteController = M.Controller.extend({
	
	  listData: null

	, t1: null
	, t2: null

	, comboBoxData: null
			
	, init: function(isFirstLoad) {
        if (isFirstLoad) {
            /* do something here, when page is loaded the first time. */
        }
        
        this.set("listData", [
                              {label: "Test 1", comboBox: [{label: "eintrag 1", value: "1"},{label: "eintrag 2", value: "2"}]}
                              , {label: "Test 2", comboBox: [{label: "eintrag 3", value: "3"},{label: "eintrag 4", value: "4"}]}
                              , {label: "Test 3", comboBox: [{label: "eintrag 5", value: "5"},{label: "eintrag 6", value: "6"}]}
                     	]);	

    }

});
