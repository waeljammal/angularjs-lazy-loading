/**
 * Created by Wael Jammal on 08/10/2014.
 */
define([
    'angular',
    'users/module',
    'angular-resource'
], function(angular) {

    'use strict';

    var users = angular.module('users');

    users.factory( 'User', [ '$resource', function( $resource ) {
        console.log("Loaded Service - users ");

        var users = $resource('http://localhost:8080/users/:id',
            {Id: "@Id" },
            {
                'query': {method: 'GET', isArray: true},
                'update': {method: 'PUT'},
                'queryByRole': {method: 'GET', url: 'http://localhost:8080/users/role/:role', isArray: true}
            }
        );

        return users;
    }]);

    users.factory( 'Role', [ '$resource', function( $resource ) {
        console.log("Loaded Service - user roles ");

        var roles = $resource('http://localhost:8080/roles/:id',
            {Id: "@Id" },
            {
                'query': {method: 'GET', isArray: true},
                'update': {method: 'PUT'}
            }
        );

        return roles;
    }]);
});