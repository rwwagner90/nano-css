'use strict';

module.exports = function (renderer, prototype, styles, block) {
    var render_ = prototype.render;
    var className = '';

    prototype.render = function () {
        var element = render_.call(this);

        if (element) {
            if (!className) {
                className = renderer.rule(styles, block);
            }

            element.props = element.props || {};
            
            if (process.env.NODE_ENV === 'production') {
                element.props.className = (element.props.className || '') + className;
            } else {
                element = require('preact').cloneElement(element, {
                    className: (element.props.className || '') + className,
                });
            }
        }

        return element;
    };
};
