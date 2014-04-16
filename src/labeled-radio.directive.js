'use strict';

module.exports = [
  function() {
    return {
      require: ['ngModel', 'value'],
      restrict: 'A',
      replace: true,
      templateUrl: 'labeled-radio.html',
      scope: {
        ngModel: '=',
        label: '@',
        name: '@',
        value: '@',
        change: '&ngChange'
      }
    };
  }
];
