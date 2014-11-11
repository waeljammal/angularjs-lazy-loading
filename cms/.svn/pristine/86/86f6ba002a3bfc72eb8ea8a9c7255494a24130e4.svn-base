/**
 * Created by waeljammal on 24/09/2014.
 */
define([

    'angularAMD'

], function () {
    var dashboard = angular.module("dashboard", ['ui.router']);

    var mainState = {
        name: 'admin.dashboard',
        url: '/admin/dashboard',
        templateUrl: 'modules/admin/tpl/manage.html'
    };

    var statsState = {
        name: 'admin.dashboard.stats',
        url: '/admin/dashboard/stats',
        templateUrl: 'modules/admin/tpl/manage.html'
    };

    var realTimeState = {
        name: 'admin.dashboard.realtime',
        url: '/admin/dashboard/realtime',
        templateUrl: 'modules/admin/tpl/manage.html'
    };

    dashboard.config(function ($stateProvider) {
        // Register the main state
        $stateProvider.state(mainState);
        $stateProvider.state(statsState);
        $stateProvider.state(realTimeState);
    });

    dashboard.run(function($location) {
        // redirect to the dashboard by default
//        if($location.$$path == '/admin' || $location.$$path == '/admin/')
//            $location.path("admin/dashboard");
    });

    return {  mainState: mainState, module: dashboard };
});