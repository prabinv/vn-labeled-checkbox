'use strict';

module.exports = [
  function() {
    return {
      require: 'ngModel',
      restrict: 'A',
      replace: true,
      transclude: true,
      templateUrl: 'labeled-checkbox.html',
      scope: {
        ngModel: '=',
        name: '@',
        value: '@',
        ngValue: '=',
        ngChecked: '=',
        ngDisabled: '@',
        change: '&ngChange'
      },
      compile: function(tElement, tAttrs) {
        var $checkbox = tElement.find('input');

        var value = tAttrs.value;
        var ngValue = tAttrs.ngValue;
        if (typeof value !== 'undefined' && typeof ngValue === 'undefined') {
          $checkbox.removeAttr('data-ng-value');
        }
      }
    };
  }
];
