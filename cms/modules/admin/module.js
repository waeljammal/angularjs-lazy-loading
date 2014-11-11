/**
 * Created by waeljammal on 24/09/2014.
 */
define([

    'angularAMD'

], function () {
    var admin = angular.module("admin", ['ui.router']);

    var mainState = {
        name: 'admin',
        url: '/admin',
        templateUrl: 'modules/admin/tpl/manage.html'
    };

    admin.config(function ($stateProvider, $routeProvider, $futureStateProvider) {

        // Register the main state
        $stateProvider.state(mainState);

    });

    admin.run(function($location, $http) {
        // redirect to the dashboard by default
//        if($location.$$path == '/admin' || $location.$$path == '/admin/')
//            $location.path("admin/dashboard");

    });

    return { module: admin };
});