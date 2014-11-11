/**
 * Created by waeljammal on 24/09/2014.
 */
define([
    'angularAMD'
], function () {
    var dashboard = angular.module("dashboard", ['ui.router']);

    dashboard.config(function ($stateProvider) {
        console.log("Loaded Module - dashboard ");
    });

    dashboard.run(function() {

    });

    return { module: dashboard };
});