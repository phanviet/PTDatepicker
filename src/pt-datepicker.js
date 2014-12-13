(function() {

  'use strict';

  if (typeof PTDatepicker !== 'function') {

    /////////////////////////////////////////////////////
    // Define some utilities function

    // Set attributes for element
    var setAttributes = function (el, attributes) {
      if (typeof attributes === 'object') {
        for (var key in attributes) {
          el.setAttribute(key, attributes[key]);
        }
      }
    }

    // Create a new element
    var createEl = function (tagName, attributes) {
      if (!tagName) return;

      var node = document.createElement(tagName);

      // Set attributes for node
      setAttributes(node, attributes);

      // Set content for node
      var child;
      for (var i = 2, len = arguments.length; i < len; i++) {
        child = arguments[i];
        if (typeof child === 'string') {
          child = document.createTextNode(child);
        }

        node.appendChild(child);
      }

      return node;
    }

    /////////////////////////////////////////////////////
    // Define PTDatepicker constructor
    var PTDatepicker = (function() {

      // PTDatepicker constructor
      function PTDatepicker(el, options) {
        this.el = el;
        this.options = options;
      }

      PTDatepicker.prototype.render = function() {

      };

      return PTDatepicker;

    })();

    window.PTDatepicker = PTDatepicker;

    ////////////////////////////////////////////////////
    // For testing. It should be removed after testing
    window.utils = {
      setAttributes: setAttributes,
      createEl: createEl
    };
  }

})();