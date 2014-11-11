/**
 * Created by waeljammal on 24/09/2014.
 */
define([
    'angular',
    'pages/module'
], function(angular) {

    'use strict';

    angular.module('pages').controller('PagesController', ['$scope', function($scope) {
        console.log("Loaded Controller - pages ");
        $scope.message = 'I am pages controller';
    }]);
});