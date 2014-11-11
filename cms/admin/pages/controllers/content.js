/**
 * Created by waeljammal on 24/09/2014.
 */
define([
    'angular',
    'pages/module'
], function(angular) {

    'use strict';

    angular.module('pages').controller('PagesContentController', ['$scope', function($scope) {
        console.log("Loaded Controller - content ");
        $scope.message = 'I am content controller';
    }]);
});