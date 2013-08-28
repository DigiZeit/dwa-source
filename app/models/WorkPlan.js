// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: DigiWebApp
// Model: WorkPlan
// ==========================================================================

DigiWebApp.WorkPlan = M.Model.create({

    __name__: 'WorkPlan'

    , id: M.Model.attr('String', {
        isRequired: NO
    })

    , workplanType: M.Model.attr('String', {
        isRequired: NO          // 0: alle, 1: normal (gefiltert)
    })

    , activityIds: M.Model.attr('String', {
        isRequired: NO          // saved as string comma-separated
    })

    , activityPositions: M.Model.attr('String', {
        isRequired: NO          // saved as string comma-separated
    })

    , deleteAll: function() {
        _.each(this.find(), function(el) {
            el.del();
        });
    }

}, M.DataProviderLocalStorage);
