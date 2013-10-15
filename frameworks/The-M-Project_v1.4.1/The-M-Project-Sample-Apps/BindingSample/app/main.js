// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 0.0.6
//
// Project: BindingSample 
// ==========================================================================

var BindingSample  = BindingSample || {};

BindingSample.app = M.Application.design({

	entryPage: 'page',

    page: M.PageView.design({

        childViews: 'header content',

        header: M.ToolbarView.design({
            value: 'Binding Sample',
            anchorLocation : M.TOP
        }),

        content: M.ScrollView.design({

            childViews: 'label1 label2 spacer label3 label4 button1 spacer',

            label1: M.LabelView.design({
                value: 'Number of clicks: ',
                isInline: YES
            }),

            label2: M.LabelView.design({
                contentBinding: {
                    target: BindingSample.CountController,
                    property: 'numberOfClicks'
                },
                value: '0',
                isInline: YES
            }),

            spacer: M.LabelView.design({
                value: ' ',
                isInline: NO
            }),

            label3: M.LabelView.design({
                value: 'Number of clicks (squared): ',
                isInline: YES
            }),

            label4: M.LabelView.design({
                computedValue: {
                    contentBinding: {
                        target: BindingSample.CountController,
                        property: 'numberOfClicks'
                    },
                    value: 0,
                    operation: function(v, label) {
                        return M.Math.pow(v, 2);
                    }
                },
                isInline: YES
            }),

            button1: M.ButtonView.design({
                value: 'Click Me',
                events: {
                    tap: {
                        target: BindingSample.CountController,
                        action: 'addClick'
                    }
                }
            }),

            spacer: M.LabelView.design({

                value: '&#160;'

            })
        })
    })

});