// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: DigiWebApp
// View: EmployeePage
// ==========================================================================

DigiWebApp.EmployeePage = M.PageView.design({

      childViews: 'header content'

    , events: {
		pagebeforeshow: {
              target: DigiWebApp.EmployeeController
            , action: 'init'
        }
    }

    , cssClass: 'employeePage'

    , header: M.ToolbarView.design({
          cssClass: 'header'
        , isFixed: YES
        , value: M.I18N.l('selectEmployee')
        , anchorLocation: M.TOP
    })

    , content: M.ScrollView.design({
    	
          childViews: 'employeeSelection buttonGrid'

        , employeeSelection: M.SelectionListView.design({
              selectionMode: M.MULTIPLE_SELECTION
            , label: M.I18N.l('employees')
            , cssClass: 'infoLabel'
            , contentBinding: {
                  target: DigiWebApp.EmployeeController
                , property: 'employees'
            }
        })

        , buttonGrid: M.GridView.design({
              childViews: 'button icon'
            , layout: {
                  cssClass: 'digiButton'
                , columns: {
                      0: 'button'
                    , 1: 'icon'
                }
            }
            , button: M.ButtonView.design({
                  value: M.I18N.l('apply')
                , cssClass: 'digiButton'
                , anchorLocation: M.RIGHT
                , events: {
                    tap: {
                          target: DigiWebApp.EmployeeController
                        , action: function() {try{navigator.notification.vibrate(DigiWebApp.ApplicationController.CONSTVibrateDuration);}catch(e){} this.saveEmployeeSelection();}
                    }
                }
            })
            , icon: M.ImageView.design({
                value: 'theme/images/icon_bookTime.png'
            })
        })
    })

});

