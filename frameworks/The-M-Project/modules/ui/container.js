// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
//            (c) 2011 panacoda GmbH. All rights reserved.
// Creator:   Dominik
// Date:      01.12.2010
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

/**
 * @class
 *
 * A container view renders a simple div container that can be used to display
 * any html valid content, e.g. by third party frameworks.
 *
 * @extends M.View
 */
M.ContainerView = M.View.extend(
/** @scope M.ContainerView.prototype */ {

    /**
     * The type of this object.
     *
     * @type String
     */
    type: 'M.ContainerView',

    /**
     * The name of the container. During the rendering, this property gets assigned to the name
     * property of the container's html representation. This can be used to manually access the
     * text field's DOM representation later on.
     *
     * @type String
     */
     name: null,

     /**
     * The label proeprty defines a text that is shown above or next to the container as a 'title'
     * for the textfield. e.g. "Name:". If no label is specified, no label will be displayed.
     *
     * @type String
     */
    label: null,

    /**
     * Define whether putting an asterisk to the right of the label for this textfield.
     *
     * @type Boolean
     */
    hasAsteriskOnLabel: NO,

    /**
     * This property can be used to assign a css class to the asterisk on the right of the label.
     *
     * @type String
     */
    cssClassForAsterisk: null,

    /**
     * Renders a simple div container and applies css classes if specified.
     *
     * @private
     * @returns {String} The container view's html representation.
     */
    render: function() {
		this.html = '';
	    if(this.label) {
	        this.html += '<label for="' + (this.name ? this.name : this.id) + '">' + this.label;
	        if(this.hasAsteriskOnLabel) {
	            if(this.cssClassForAsterisk) {
	                this.html += '<span class="' + this.cssClassForAsterisk + '">*</span></label>';
	            } else {
	                this.html += '<span>*</span></label>';
	            }
	        } else {
	            this.html += '</label>';
	        }
	    }
        this.html += '<div id="' + this.id + '"' + this.style() + '>';

        this.renderChildViews();

        this.html += '</div>';

        return this.html;
    },

    /**
     * Applies some style-attributes to the container view.
     *
     * @private
     * @returns {String} The container's styling as html representation.
     */
    style: function() {
        var html = '';
        if(this.cssClass) {
            html += ' class="' + this.cssClass + '"';
        }
        return html;
    }

});