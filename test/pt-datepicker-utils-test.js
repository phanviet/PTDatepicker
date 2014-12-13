(function(should) {

  'use strict';

  var utils = window.utils;

  describe('Utils', function() {
    describe('#setAttributes', function() {
      var node;

      beforeEach(function() {
        node = document.createElement('a');
      });

      it ('should return a node has attributes', function() {
        utils.setAttributes(node, {href: 'javascript:void(0)', 'class': 'test'});

        node.getAttribute('href').should.to.equal('javascript:void(0)');
        node.getAttribute('class').should.to.equal('test');
      });

      it ('should return a node has not new attributes', function() {
        utils.setAttributes(node, undefined);
        utils.setAttributes(node, null);
        utils.setAttributes(node, 'any string');
        utils.setAttributes(node, 'any number');
        utils.setAttributes(node, 'any boolean');

        node.outerHTML.should.to.equal('<a></a>');
      });
    });

    describe('#createEl', function() {

      it ('should return a new node without attributes', function() {
        var node = utils.createEl('a', null, 'hello');

        node.outerHTML.should.to.equal('<a>hello</a>');
      });

      it ('should return a new node with attributes', function() {
        var node = utils.createEl('a', {href: '#'});

        node.getAttribute('href').should.to.equal('#');
        node.outerHTML.should.to.equal('<a href="#"></a>');
      });

      it ('should return a new node with nested elements', function() {
        var node = utils.createEl('div', {'class': 'test'},
                      utils.createEl('h1', null,
                          'hello'),
                      utils.createEl('p', {'id': 'p-test'}));

        node.getAttribute('class').should.to.equal('test');
        node.innerHTML.should.to.equal('<h1>hello</h1><p id="p-test"></p>');
      });
    });

    describe('#hasClass', function() {
      var node;

      beforeEach(function() {
        node = utils.createEl('a', {'class': 'test'});
      });

      it('should return true when having class', function() {
        var result = utils.hasClass(node, 'test');

        result.should.to.be.true;
      });

      it('should return false when not having class', function() {
        var result = utils.hasClass(node, 'test1');
        var result1 = utils.hasClass(node, '');
        var result2 = utils.hasClass(undefined, '');

        result.should.to.be.false;
        result1.should.to.be.false;
        result2.should.to.be.false;
      });
    });

    describe('#addClass', function() {
      var node;

      beforeEach(function() {
        node = utils.createEl('a', {'class': 'test'});
      });

      it('Element should have a new class', function() {
        utils.addClass(node, 'test1');

        utils.hasClass(node, 'test1').should.to.be.true;

        utils.addClass(node, ['test2', 'test3']);

        utils.hasClass(node, 'test2').should.to.be.true;
        utils.hasClass(node, 'test3').should.to.be.true;
      });

      it('Element should not have a new class', function() {
        utils.addClass(node, '');
        utils.addClass(node, null);
        utils.addClass(node, undefined);

        node.outerHTML.should.to.be.equal('<a class="test"></a>');
      });
    });
  });

})(chai.should());