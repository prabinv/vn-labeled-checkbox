'use strict';

// ReSharper disable WrongExpressionStatement
describe('Directive: vnLabeledRadio', function() {

  // load the directive's module
  beforeEach(module('vn.labeledRadio'));

  var $rootScope;
  var $compile;

  // ReSharper disable InconsistentNaming
  beforeEach(inject(function(_$rootScope_, _$compile_) {
    // ReSharper restore InconsistentNaming
    $rootScope = _$rootScope_;
    $compile = _$compile_;
  }));

  it('generates a labeled-radio block', function() {
    var $component = compile();
    expect($component).to.have.class('labeled-radio');
    expect($component).to.have('.labeled-radio__input');
    expect($component).to.have('.labeled-radio__label');
  });

  it('generates a label', function() {
    var $component = compile('data-label="foo"');
    expect($component.find('.labeled-radio__label')).to.have.text('foo');
  });

  it('passes "name" through to the inner radio input', function() {
    var $component = compile('data-name="foo"');
    expect($component.find('.labeled-radio__input')).to.have.attr('name', 'foo');
  });

  it('passes "value" through to the inner radio input', function() {
    var $component = compile('value="foo"');
    expect($component.find('.labeled-radio__input')).to.have.value('foo');
  });

  it('passes "ng-value" through to the inner radio input', function() {
    var $component = compile('data-ng-value="foo"');
    var $radio = $component.find('.labeled-radio__input');
    expect($radio).to.have.value('bar');
  });

  it('passes "ng-checked" through to the inner radio input', function() {
    var $component = compile('data-ng-checked="isChecked"');
    var $radio = $component.find('.labeled-radio__input');
    expect($radio).to.be.checked;
  });

  it('responds to a change event', function() {
    var $scope = $rootScope.$new();
    $scope.change = sinon.spy();
    var $component = compile('data-ng-change="change()"', $scope);
    var radio = $component.find('.labeled-radio__input').get(0);
    radio.click();
    expect($scope.change).to.have.been.calledOnce;
  });

  it('binds to a model', function() {
    var $scope = $rootScope.$new();
    var $component = compile('value="foo"', $scope);
    var $radio = $component.find('.labeled-radio__input');
    expect($radio).not.to.be.checked;
    expect($scope.selectedValue.value).not.to.eq('foo');
    $radio.get(0).click();
    expect($radio).to.be.checked;
    expect($scope.selectedValue.value).to.eq('foo');
  });

  function compile(attrs, $scope) {
    $scope = $scope || $rootScope.$new();
    var template = $compile(angular.element(
      '<input data-vn-labeled-radio data-ng-model="selectedValue.value" ' + (attrs || '') + '>'));
    var $component = template(addFixtureData($scope));
    $rootScope.$digest();
    return $component;
  }

  function addFixtureData($scope) {
    $scope.foo = 'bar';
    $scope.isChecked = true;
    $scope.selectedValue = { value: null };
    return $scope;
  }

});
