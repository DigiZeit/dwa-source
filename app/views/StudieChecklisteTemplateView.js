// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: DigiWebApp
// View: StudieChecklisteTemplateView
// ==========================================================================

DigiWebApp.StudieChecklisteTemplateView = M.ListItemView.design({

      isSelectable: NO

    , childViews: 'label comboBox comboBoxView'

    , events: {
        tap: {
			action: function(id, m_id) {

			}
        }
    }

	, label: M.LabelView.design({
          cssClass: 'unselectable'
        , computedValue: {
              valuePattern: '<%= label %>'
            //  value: '01.01.2011, 08:00 - 08:20 Uhr, 0:20 h'
            , operation: function(v) {
				return v;
            }
        }
    })

	, comboBox: M.LabelView.design({
          cssClass: 'unselectable'
        , computedValue: {
              valuePattern: '<%= comboBox %>'
            //  value: [{label: "eintrag 1", value: 1},{label: "eintrag 2", value: 2}]
            , operation: function(v) {
				if (v && typeof(v) === "object" && v.length > 0) {
					// comboBoxView befüllen und anzeigen
					DigiWebApp.StudieChecklisteController.set("t1", $(this));
					DigiWebApp.StudieChecklisteController.set("t2", this);
				} else {
					// comboBoxView verstecken
					console.log(this);
				}
				return '';
            }
        }
    })

    , comboBoxView: M.DigiSelectionListView.design({
              selectionMode: M.SINGLE_SELECTION_DIALOG
            , initialText: M.I18N.l('noData')
            , applyTheme: NO
            , computedValue: {
		        valuePattern: '<%= comboBox %>'
		      //  value: [{label: "eintrag 1", value: 1},{label: "eintrag 2", value: 2}]
		      , operation: function(v) {
//					if (v && typeof(v) === "object" && v.length > 0) {
//						// comboBoxView befüllen und anzeigen
//						DigiWebApp.StudieChecklisteController.set("t1", $(this));
//						DigiWebApp.StudieChecklisteController.set("t2", this);
//					} else {
//						// comboBoxView verstecken
//						console.log(this);
//					}
    				console.log(v);
					return v;
		      }
		  }

//            , contentBinding: {
//			        target: DigiWebApp.StudieChecklisteController
//			      , property: 'listData'
//			  }
//			  , events: {
//			      change: {
//			            target: DigiWebApp.StudieChecklisteController
//			          , action: function() {
//			              //this.setPositions();
//			          }
//			      }
//			      , tap: {
//						action: function() {
//			      		try{navigator.notification.vibrate(DigiWebApp.ApplicationController.CONSTVibrateDuration);}catch(e){}
//						}
//			      }
//			  }
    })

});


