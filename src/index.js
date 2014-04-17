/* global angular: true */
'use strict';

var angular = require('angular');

module.exports = angular.module('vn.labeledRadio', [])
  .run(function($templateCache) {
    $templateCache.put('labeled-radio.html', require('./labeled-radio.html'));
  })
  .directive('vnLabeledRadio', require('./labeled-radio.directive.js'));
