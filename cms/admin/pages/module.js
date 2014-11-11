/**
 * Created by waeljammal on 24/09/2014.
 */
define([
    'angularAMD'
], function () {
    var pages = angular.module("pages", ['ui.router']);

    pages.config(function ($stateProvider) {
        console.log("Loaded Module - pages");
    });

    pages.run(function() {

    });

    return { module: pages };
});