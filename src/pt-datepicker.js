(function() {

  'use strict';

  // Ensure PTDatepicker function has not been defined
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
        if (typeof child === 'string' || typeof child === 'number' ||
            typeof child === 'boolean') {
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

    /**
     * Remove class from element
     * @param  {Element} el           - Element
     * @param  {string | Array} klass - The class name need to be removed from
     *                                  element
     */
    var removeClass = function(el, klass) {
      if (!el || klass === '') return;

      // Remove a class
      if (typeof klass === 'string') {
        el.classList.remove(klass);
      }

      // Remove a list of classes
      if (Array.isArray(klass)) {
        for (var key in klass) {
          el.classList.remove(klass[key]);
        }
      }
    };

    /**
     * Extend object
     * @param  {Object} dest - Destination object
     * @param  {Object} src  - Source object
     * @return {Object}
     */
    var extend = function(dest, src) {
      var srcValue;

      for (var key in src) {
        srcValue = src[key];

        if (srcValue && srcValue.constructor &&
         srcValue.constructor === Object) {
          dest[key] = dest[key] || {};
          extend(dest[key], srcValue);
        } else {
          dest[key] = srcValue;
        }
      }
      return dest;
    };

    /////////////////////////////////////////////////////
    // Define PTDatepicker

    // Default PTDatepicker config
    var POSITION = {
      INNER : 1,
      BEFORE: 2,
      AFTER : 3
    };

    var config = {
      position: POSITION.INNER
    };

    var PTDatepicker = (function() {

      var WEEKDAY = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

      var containerEl = createEl('div', {'class': 'pt-dp-container'},
                          createEl('div', {'class': 'pt-dp-header'},
                            createEl('button', {'class': 'pt-dp-nav pre'}, '<'),
                            createEl('div', {'class': 'pt-dp-title'},
                              createEl('span', {'class': 'pt-dp-title-month'}),
                              createEl('span', {'class': 'pt-dp-title-year'})
                            ),
                            createEl('button', {'class': 'pt-dp-nav next'}, '>')
                          ),

                          createEl('div', {'class': 'pt-dp-calendar'},
                            createEl('table', null,
                              createEl('thead', null,
                                createEl('tr')
                              ),
                              createEl('tbody')
                            )
                          )
                        );

      /**
       * PTDatepicker constructor
       * @constructor
       * @param {Element} el      - Datepicker wil render before, after or inner
       *                            this element
       * @param {Object}  options - Datepicker options
       */
      function PTDatepicker(el, options) {

        var now = new Date(),
            month,
            year;

        this.el = el;
        this.options = extend(config, options);

        if (this.activeDate) {
          month = this.activeDate.getMonth();
          year = this.activeDate.getYear();
        } else {
          month = now.getMonth();
          year = now.getFullYear();
        }

        this.render(month, year);
      }

      PTDatepicker.prototype.render = function(month, year) {
        var monthTitleEl   = containerEl.querySelector('.pt-dp-title-month'),
            yearTitleEl    = containerEl.querySelector('.pt-dp-title-year'),
            weekdayRowEl   = containerEl.querySelector('.pt-dp-calendar thead tr'),
            calendarEl     = containerEl.querySelector('.pt-dp-calendar tbody'),
            day            = 1,
            dayRowEl,
            dayEl,
            hasPutFirstDay = false;

        monthTitleEl.innerHTML = (month + 1) + ' ';
        yearTitleEl.innerHTML  = year;

        weekdayRowEl.innerHTML = '';
        for (var i = 0; i < 7; i++) {
          weekdayRowEl.appendChild(
            createEl('td', null, WEEKDAY[i])
          );
        }

        var firstDay      = new Date(year, month, 1),
            wkFirstDay    = firstDay.getDay();

        calendarEl.innerHTML = '';
        for (var i = 0; i < 6; i++) {
          dayRowEl = createEl('tr', null);

          for (var j = 0; j < 7; j++) {

            if (day > 31) break;

            dayEl = createEl('td', null);

            if (wkFirstDay === j) {
              hasPutFirstDay = true;
            }

            if (hasPutFirstDay) {
              dayEl.innerHTML = day++;
            }

            dayRowEl.appendChild(dayEl);
          }

          calendarEl.appendChild(dayRowEl);
        }

        if (this.options.position === POSITION.INNER) {

          this.el.appendChild(containerEl);
        }
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
      addClass: addClass,
      removeClass:removeClass,
      extend: extend
    };
  }

})();