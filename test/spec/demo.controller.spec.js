'use strict';

// ReSharper disable WrongExpressionStatement
describe('Controller: DemoCtrl', function() {

  beforeEach(module('vn-demo'));

  var controller;
  var scope;

  beforeEach(inject(function($controller, $rootScope) {
    scope = $rootScope.$new();
    controller = $controller('DemoCtrl', {
      $scope: scope
    });
  }));

  it('attaches foo to the scope', function() {
    expect(scope.foo).to.eq('bar');
  });

});
