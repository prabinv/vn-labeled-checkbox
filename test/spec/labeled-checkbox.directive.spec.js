'use strict';

// ReSharper disable WrongExpressionStatement
describe('Directive: vnLabeledCheckbox', function() {

  // load the directive's module
  beforeEach(module('vn.labeledCheckbox'));

  var $rootScope;
  var $compile;

  // ReSharper disable InconsistentNaming
  beforeEach(inject(function(_$rootScope_, _$compile_) {
    // ReSharper restore InconsistentNaming
    $rootScope = _$rootScope_;
    $compile = _$compile_;
  }));

  it('generates a vn-labeled-checkbox block', function() {
    var $component = compile();
    expect($component).to.have.class('vn-labeled-checkbox');
    expect($component).to.have('.vn-labeled-checkbox__input');
    expect($component).to.have('.vn-labeled-checkbox__content');
  });

  it('transcludes content', function() {
    var $component = compile({
      extend: function($elem) {
        return $elem.append('foo');
      }
    });
    expect($component.find('.vn-labeled-checkbox__content')).to.have.text('foo');
  });

  it('passes "name" through to the inner checkbox input', function() {
    expect(createLabeledCheckbox({ 'data-name': 'foo' }).input).to.have.attr('name', 'foo');
  });

  it('passes "value" through to the inner checkbox input', function() {
    expect(createLabeledCheckbox({ value: 'foo' }).input).to.have.value('foo');
  });

  it('passes "ng-value" through to the inner checkbox input', function() {
    expect(createLabeledCheckbox({ 'data-ng-value': 'foo' }).input).to.have.value('bar');
  });

  it('passes "ng-checked" through to the inner checkbox input', function() {
    expect(createLabeledCheckbox({ 'data-ng-checked': 'isTrue' }).input).to.be.checked;
    expect(createLabeledCheckbox({ 'data-ng-checked': 'isFalse' }).input).not.to.be.checked;
  });

  it('passes "ng-disabled" through to the inner checkbox input', function() {
    expect(createLabeledCheckbox({ 'data-ng-disabled': '{{isTrue}}' }).input).to.be.disabled;
    expect(createLabeledCheckbox({ 'data-ng-disabled': '{{isFalse}}' }).input).not.to.be.disabled;
  });

  it('responds to a change event', function() {
    var $scope = createScope({
      change: sinon.spy()
    });
    var $component = compile({
      scope: $scope,
      extend: function($elem) {
        return $elem.attr('data-ng-change', 'change()');
      }
    });
    var checkbox = $component.find('.vn-labeled-checkbox__input').get(0);
    checkbox.click();
    expect($scope.change).to.have.been.calledOnce;
  });

  it('binds to a model', function() {
    var $scope = createScope();
    var $component = compile({
      scope: $scope,
      extend: function($elem) {
        return $elem.attr('data-ng-value', 'foo');
      }
    });
    var $checkbox = $component.find('.vn-labeled-checkbox__input');
    expect($checkbox).not.to.be.checked;
    expect($scope.selectedValue.value).not.to.eq('bar');
    $checkbox.get(0).click();
    expect($checkbox).to.be.checked;
    expect($scope.selectedValue.value).to.eq('bar');
  });

  function createScope(props) {
    var $scope = $rootScope.$new();
    return angular.extend($scope, props || {});
  }

  function compile(options) {
    options = options || {};
    var extend = options.extend || function(elem) { return elem; };
    var $input = extend(angular.element('<input data-vn-labeled-checkbox/>')
      .attr('data-ng-model', 'selectedValue.value'));
    var template = $compile($input);
    var $scope = options.scope || $rootScope.$new();
    var $component = template(addFixtureData($scope));
    $rootScope.$digest();
    return $component;
  }

  function addFixtureData($scope) {
    return angular.extend($scope, {
      foo: 'bar',
      isTrue: true,
      isFalse: false,
      selectedValue: {
        value: null
      }
    });
  }

  function createLabeledCheckbox(attrs) {
    var $component = compile({
      extend: function($elem) {
        return $elem.attr(attrs);
      }
    });
    return {
      input: $component.find('.vn-labeled-checkbox__input')
    };
  }

});
