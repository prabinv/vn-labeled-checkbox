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

  it('generates a vn-labeled-radio block', function() {
    var $component = compile();
    expect($component).to.have.class('vn-labeled-radio');
    expect($component).to.have('.vn-labeled-radio__input');
    expect($component).to.have('.vn-labeled-radio__label');
  });

  it('generates a label', function() {
    var $component = compile({
      extend: function($elem) {
        return $elem.attr('data-label', 'foo');
      }
    });
    expect($component.find('.vn-labeled-radio__label')).to.have.text('foo');
  });

  it('generates an image', function() {
    var $component = compile();
    expect($component.find('.vn-labeled-radio__image')).to.not.exist;

    $component = compile({
      extend: function($elem) {
        return $elem.attr('data-image', 'data:image/png;base64,foo');
      }
    });
    expect($component.find('.vn-labeled-radio__image')).to.have.attr('src', 'data:image/png;base64,foo');
  });

  it('passes "name" through to the inner radio input', function() {
    var $component = compile({
      extend: function($elem) {
        return $elem.attr('data-name', 'foo');
      }
    });
    expect($component.find('.vn-labeled-radio__input')).to.have.attr('name', 'foo');
  });

  it('passes "value" through to the inner radio input', function() {
    var $component = compile({
      extend: function($elem) {
        return $elem.attr('value', 'foo');
      }
    });
    expect($component.find('.vn-labeled-radio__input')).to.have.value('foo');
  });

  it('passes "ng-value" through to the inner radio input', function() {
    var $component = compile({
      extend: function($elem) {
        return $elem.attr('data-ng-value', 'foo');
      }
    });
    var $radio = $component.find('.vn-labeled-radio__input');
    expect($radio).to.have.value('bar');
  });

  it('passes "ng-checked" through to the inner radio input', function() {
    var $component = compile({
      extend: function($elem) {
        return $elem.attr('data-ng-checked', 'isChecked');
      }
    });
    var $radio = $component.find('.vn-labeled-radio__input');
    expect($radio).to.be.checked;
  });

  it('passes "style" through to the label', function() {
    var $component = compile({
      extend: function($elem) {
        return $elem.attr('style', 'color:#f00;');
      }
    });
    expect($component).to.have.css('color', 'rgb(255, 0, 0)');
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
    var radio = $component.find('.vn-labeled-radio__input').get(0);
    radio.click();
    expect($scope.change).to.have.been.calledOnce;
  });

  it('binds to a model', function() {
    var $scope = createScope();
    var $component = compile({
      scope: $scope,
      extend: function($elem) {
        return $elem.attr('value', 'foo');
      }
    });
    var $radio = $component.find('.vn-labeled-radio__input');
    expect($radio).not.to.be.checked;
    expect($scope.selectedValue.value).not.to.eq('foo');
    $radio.get(0).click();
    expect($radio).to.be.checked;
    expect($scope.selectedValue.value).to.eq('foo');
  });

  function createScope(props) {
    var $scope = $rootScope.$new();
    return angular.extend($scope, props || {});
  }

  function compile(options) {
    options = options || {};
    var extend = options.extend || function(elem) { return elem; };
    var $input = extend(angular.element('<input data-vn-labeled-radio/>')
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
      isChecked: true,
      selectedValue: {
        value: null
      }
    });
  }

});
