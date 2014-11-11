/**
 * Created by waeljammal on 24/09/2014.
 */
define([
    'angular',
    'dashboard/module'
], function(angular) {

    'use strict';

    angular.module('dashboard').controller('DashboardStatsController', ['$scope', function($scope) {
        console.log("Loaded Controller - dashboard stats");
        $scope.message = 'I am dashboard stats controller';
    }]);
});