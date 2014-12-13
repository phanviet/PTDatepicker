(function() {

  'use strict';

  if (typeof PTDatepicker !== 'function') {

    /////////////////////////////////////////////////////
    // Define some utilities function

    /**
     * Set attributes for element
     * @param  {Element} el         - Element
     * @param  {Object}  attributes - All attributes need to add to the element
     */
    var setAttributes = function(el, attributes) {
      if (typeof attributes === 'object') {
        for (var key in attributes) {
          el.setAttribute(key, attributes[key]);
        }
      }
    };

    /**
     * Create a new element
     * @param  {string} tagName    - The element tag name
     * @param  {Object} attributes - The element attributes
     * @return {Element | undefined}
     */
    var createEl = function(tagName, attributes) {
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
    };

    /**
     * Check the element has class or not
     * @param  {Element} el    - Element
     * @param  {string}  klass - The class name need to be checked in the
     *                           element
     * @return {Boolean}
     */
    var hasClass = function(el, klass) {
      if (!el || klass === '') return false;
      return el.classList.contains(klass);
    };

    /**
     * Add class to element
     * @param {Element}        el    - Element
     * @param {string | Array} klass - The class name need to be added to
     *                                 element
     */
    var addClass = function(el, klass) {
      if (!el || klass === '') return;

      // Add a class name
      if (typeof klass === 'string') {
        el.classList.add(klass);
      }

      // Add a list of classes
      if (Array.isArray(klass)) {
        for (var key in klass) {
          el.classList.add(klass[key]);
        }
      }
    };

    /////////////////////////////////////////////////////
    // Define PTDatepicker constructor
    var PTDatepicker = (function() {

      /**
       * PTDatepicker constructor
       * @constructor
       * @param {Element} el      - Datepicker wil render before, after or inner
       *                            this element
       * @param {Object}  options - Datepicker config
       */
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
      createEl: createEl,
      hasClass: hasClass,
      addClass: addClass
    };
  }

})();