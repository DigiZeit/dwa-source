// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: DigiWebApp
// Controller: EmployeeController
// ==========================================================================
// manuell var-checked
DigiWebApp.EmployeeController = M.Controller.extend({

    /**
     * Employee Selection Keys for storage.
     *
     * the tmp key is for still having the selection after closing day for sending the data even though another selection is possible then
     */
      empSelectionKey: M.LOCAL_STORAGE_PREFIX + M.Application.name + M.LOCAL_STORAGE_SUFFIX + 'employeeSelection'
    , empSelectionKeyTmp: M.LOCAL_STORAGE_PREFIX + M.Application.name + M.LOCAL_STORAGE_SUFFIX + 'employeeSelectionTmp'

    /**
     * Value determing the state of the employee selection.
     * Only used in normal booking process, not while changing the Kolonne.
     *
     * 0: no kolonne
     * 1: kolonne, but employees not selected yet
     * 2: employees selected
     */
    , employeeState: 0

    /**
     * Array containing objects with the particular id and name as properties representing the employees.
     *
     * employeeSelection on EmployeePage has contentBinding on it to fill the list.
     */
    , employees: null

    /**
     * Passes to setEmployeesForList.
     *
     * Is called when the page show event for EmployeePage is triggered.
     */
    , init: function() {
        this.setEmployeesForList();
    }

    /**
     * Prepares the selection list on the EmployeePage with the id and values of the employees returned by the server.
     *
     * Triggers content binding for employeeSelection by using set on employees.
     */
    , setEmployeesForList: function() {
        var employees = DigiWebApp.Employee.findSorted();
        if (employees.length > 0) {
            var selEmployees = DigiWebApp.EmployeeController.getSelectedEmployees();
            employees = _.map(employees, function(em) {
                if (em) {
                    var obj = { label: em.get('name'), value: em.get('id') };
                    _.each(selEmployees, function(selEmp) {
    					if (selEmp.get('id') === obj.value) {
    						obj.isSelected = true;
    					}
    				});
                    return obj;
                }
            });
            this.set('employees', employees);
        }
    }

    /**
     * Saves the employee selection by setting the isSelected property of the selected employee records to YES.
     *
     * Triggered by the tap event on the button on EmployeePage.
     */
    , saveEmployeeSelection: function() {
        // first clear old selection in records in local storage
        var employees = DigiWebApp.Employee.find();
        _.each(employees, function(em) {
            em.set('isSelected', NO);
            em.save();
        });

        var selection = M.ViewManager.getView('employeePage', 'employeeSelection').getSelection();
        if (selection.length > 0) {
            _.each(selection, function(sel) { // sel is employee id
                var employee = _.select(DigiWebApp.Employee.find(), function(e) {
                    if (e) {
                        return e.get('id') == sel;
                    }
                });
                employee = _.isArray(employee) ? employee[0] : employee;
                if (employee) {
                    employee.set('isSelected', YES);
                    employee.save();
                }
            });

            this.callbackEmployeesSave();

        } else {
            // no employee selected
            DigiWebApp.ApplicationController.nativeAlertDialogView({
                  title: M.I18N.l('employeeSelection')
                , message: M.I18N.l('employeeSelectionMsg')
            });
        }
    }

    /**
     * Saves the selection of the employees in localStorage and, if booking normally,
     * moves back to the booking screen and calls BookingController.book()
     * or, when changing the Kolonne, calls BookingController.bucheKolonnenaenderung() .
     *
     * Called via callback of the employee selection success alert (to avoid rendering bugs with the alert)
     */
    , callbackEmployeesSave: function() {
    
        var that = DigiWebApp.EmployeeController;

        // Save selection in local storage to have it accessible after application restart
        localStorage.setItem(DigiWebApp.EmployeeController.empSelectionKey, that.getSelectedEmployeesAsString());

        if (DigiWebApp.BookingController.istKolonnenaenderung === true) {
            DigiWebApp.BookingController.bucheKolonnenaenderung();
			if (DigiWebApp.SettingsController.featureAvailable('404')) {
	            DigiWebApp.NavigationController.backToButtonDashboardPage();
			} else {
				DigiWebApp.NavigationController.backToDashboardPage();
			}
        } else {
            DigiWebApp.BookingController.set('isBackFromEmployeePage', YES);
            DigiWebApp.NavigationController.backToBookTimePagePOP();

            that.setEmployeeState(2);
            DigiWebApp.BookingController.book();
        }
      }

    /**
     * Returns an array of all employee records that are selected.
     */
    , getSelectedEmployees: function() {
    	//alert("in getSelectedEmployees");
        var employees = DigiWebApp.Employee.find();
        if (employees.length > 0) {
            var selectedEmployees = _.select(employees, function(e) {
                if (e) {
                    return e.get('isSelected') === true;
                }
            });
            return selectedEmployees;
        }
        return [];
    }

    /**
     * Returns the selected employee ids as a string:
     *
     * Format: "<id1>,<id2>,...,<idN>"
     */
    , getSelectedEmployeesAsString: function() {
        if (this.getEmployeeState() === 0) {
            return '0';
        }

        if (this.getEmployeeState() === 1) {
            return '';
        }

        var empIds = [];
        var employees = this.getSelectedEmployees();
        _.each(employees, function(emp) {
            empIds.push(emp.get('id'));
        });

        return empIds.join(',');
    }

    /**
     * Sets the employee state in controller and localStorage.
     * 
     * @param state
     */
    , setEmployeeState: function(state) {
        if (state == 0) {
            this.saveUniversalEmployeeToLocalStorage();
        }
        this.set('employeeState', state);
        localStorage.setItem(M.LOCAL_STORAGE_PREFIX + M.Application.name
            + M.LOCAL_STORAGE_SUFFIX + 'employeeState', this.employeeState);
    }

    /**
     * Saves the universal employee (ID=0) in localStorage
     */
    , saveUniversalEmployeeToLocalStorage: function() {
        localStorage.setItem(this.empSelectionKey, '0');
    }

    /**
     * If the employee state from localStorage is set, this method writes it to the 
     * controller property employeeState and returns it.
     * Otherwise, it returns the value of the property.
     */
    , getEmployeeState: function () {
        var state = localStorage.getItem(M.LOCAL_STORAGE_PREFIX + M.Application.name 
            + M.LOCAL_STORAGE_SUFFIX + 'employeeState');
        if (hasValue(state)) {
            this.set('employeeState', state);
        }
        return this.employeeState;
    }
});
