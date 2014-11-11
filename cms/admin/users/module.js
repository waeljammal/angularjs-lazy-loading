/**
 * Created by waeljammal on 24/09/2014.
 */
define([
    'angularAMD',
    'gravatar',
    'md5'
], function () {
    var users = angular.module("users", ['ui.router', 'ui.gravatar']);

    users.config(function ($stateProvider) {
        console.log("Loaded Module - users");
    });

    users.run(function() {

    });

    return { module: users };
});