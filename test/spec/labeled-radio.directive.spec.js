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

  it('assigns a name to the inner radio input', function() {
    var $component = compile('data-name="foo"');
    expect($component.find('.labeled-radio__input')).to.have.attr('name', 'foo');
  });

  it('assigns a value to the inner radio input', function() {
    var $component = compile('data-value="foo"');
    expect($component.find('.labeled-radio__input')).to.have.attr('value', 'foo');
  });

  it('generates a label', function() {
    var $component = compile('data-label="foo"');
    expect($component.find('.labeled-radio__label')).to.have.text('foo');
  });

  it('binds to a model', function() {
    var $scope = $rootScope.$new();
    $scope.selectedValue = { value: null };
    var $component = compile('data-ng-model="selectedValue.value" data-value="foo"', $scope);
    var $radio = $component.find('.labeled-radio__input');
    expect($radio).not.to.be.checked;
    expect($scope.selectedValue.value).not.to.eq('foo');
    $radio.get(0).click();
    expect($radio).to.be.checked;
    expect($scope.selectedValue.value).to.eq('foo');
  });

  it('responds to a change event', function() {
    var $scope = $rootScope.$new();
    $scope.selectedValue = { value: null };
    $scope.change = sinon.spy();
    var $component = compile('data-ng-model="selectedValue.value" data-ng-change="change()"', $scope);
    var radio = $component.find('.labeled-radio__input').get(0);
    radio.click();
    expect($scope.change).to.have.been.calledOnce;
  });

  function compile(html, $scope) {
    var template = $compile(angular.element(
      '<div data-vn-labeled-radio ' + (html || '') + '></div>'));
    var $component = template($scope || $rootScope.$new());
    $rootScope.$digest();
    return $component;
  }

});
