'use strict';

// ReSharper disable WrongExpressionStatement
describe('Directive: vnDemo', function() {

  // load the directive's module
  beforeEach(module('vn-demo'));

  var $component;

  beforeEach(inject(function($rootScope, $compile) {
    var $scope = $rootScope.$new();
    var html = '<div data-vn-demo></div>';
    $component = $($compile(angular.element(html))($scope));
    $rootScope.$digest();
  }));

  it('contains demo text', function() {
    expect($component.html()).to.eq('<p>This is the demo view.</p>');
  });
});
