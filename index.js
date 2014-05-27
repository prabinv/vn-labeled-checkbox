/* global angular: true */
'use strict';

var angular = require('angular');

module.exports = angular.module('vn.labeledCheckbox', [
    require('./src/bower_components/vn-bem').name
  ])
  .run(function($templateCache) {
    $templateCache.put('labeled-checkbox.html', require('./src/labeled-checkbox.html'));
  })
  .directive('vnLabeledCheckbox', require('./src/labeled-checkbox.directive'));
