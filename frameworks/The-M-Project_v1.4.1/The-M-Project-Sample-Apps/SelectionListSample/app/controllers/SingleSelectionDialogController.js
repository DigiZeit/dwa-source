// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 0.0.6
//
// Project: SelectionListSample
// Controller: SingleSelectionDialogController
// ==========================================================================

SelectionListSample.SingleSelectionDialogController = M.Controller.extend({

    items: null,

    init: function(isFirstLoad) {
        if(isFirstLoad) {
            this.set('items', [
                {
                    value: 'germany',
                    label: 'Germany (germany)'
                },
                {
                    value: 'italy',
                    label: 'Italy (italy)'
                },
                {
                    value: 'us',
                    label: 'United States (us)'
                },
                {
                    value: 'spain',
                    label: 'Spain (spain)'
                }
            ]);
        }
    },

    setSelection: function() {

        var selectionList = M.ViewManager.getView('singleSelectionDialog', 'selectionList');
        var textField = M.ViewManager.getView('singleSelectionDialog', 'textField');

        if(!textField.value || textField.value === '') {

            M.DialogView.alert({

                title: 'Error',

                message: 'You have to enter a value in the text field in order to set the selection list\'s selection.'

            });

        } else {

            selectionList.setSelection(textField.value);
            
            textField.setValue('');

            textField.lostFocus();

        }

    },

    getSelection: function() {

        var selectionList = M.ViewManager.getView('singleSelectionDialog', 'selectionList');

        M.DialogView.alert({

            title: 'Selected Item',

            message: selectionList.getSelection(YES) ? selectionList.getSelection(YES).label : 'Nothing selected...'

        });

    }

})