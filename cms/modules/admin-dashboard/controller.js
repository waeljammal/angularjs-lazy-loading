/**
 * Created by waeljammal on 24/09/2014.
 */
define([

    'admin-dashboard/module'

], function(dashboardModule) {

    'use strict';

    var controller = function($rootScope, $scope, $timeout) {
        $scope.message = 'I am dashboard controller';
    };

    dashboardModule.controller('Dashboard.BaseCtrl', ['$rootScope', '$scope', '$timeout', controller]);
});