/* global angular: true */
'use strict';

var angular = require('angular');

module.exports = angular.module('vn-demo', [])
  .run(function($templateCache) {
    $templateCache.put('demo.html', require('./src/demo.html'));
  })
  .directive('vnDemo', require('./src/demo.directive'))
  .controller('DemoCtrl', require('./src/demo.controller'));
