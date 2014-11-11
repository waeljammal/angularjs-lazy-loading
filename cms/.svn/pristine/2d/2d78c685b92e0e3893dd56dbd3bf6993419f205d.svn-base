/**
 * Created by waeljammal on 24/09/2014.
 */
define([
    'angular',
    'users/module',
    'toaster',
    'gravatar',
    'md5'
], function(angular) {

    'use strict';

    angular.module('users').controller('UserController',
        function($scope, $filter, Role, User, toaster) {
            console.log("Loaded Controller - users ");

            // Load roles
            Role.query(function (data) {
                $scope.roles = data;
                $scope.role = $filter('orderBy')($scope.roles, 'first')[0];
                $scope.role.selected = true;

                $scope.loadUsersByRole($scope.role.id);

            }, function(failedResponse) {
                if(failedResponse.status == 0)
                    $scope.pop("error", "Loading Roles Failed", "Could not connect to server.");
                else
                    $scope.pop("error", "Loading Roles Failed", failedResponse.statusText);
            });

            $scope.pop = function(type, title, message){
                toaster.pop(type, title, message);
            };

            $scope.loadUsersByRole = function(id) {
                User.queryByRole({role: $scope.role.id},
                    function(data) {
                        $scope.pop("success", "Loaded Users", "Loaded " + data.length + " Users.");
                        $scope.users = data;
                    }
                );
            };

            $scope.loadAllUsers = function() {
                User.query(
                    function(data) {
                        $scope.pop("success", "Loaded Users", "Loaded " + data.length + " Users.");
                        $scope.users = data;
                    }
                );
            };

            $scope.selectRole = function (data) {
                angular.forEach($scope.roles, function(item) {
                    item.selected = false;
                    item.editing = false;
                });
                $scope.role = data;
                $scope.role.selected = true;
                $scope.filter = data.role;

                if(data.role == "")
                    $scope.loadAllUsers();
                else
                    $scope.loadUsersByRole($scope.role.id);
            }

            $scope.selectUser = function(data) {
                angular.forEach($scope.users, function(item) {
                    item.selected = false;
                    item.editing = false;
                });
                $scope.user = data;
                $scope.user.selected = true;
            }

            $scope.editUser = function (item) {
                if(item && item.selected){
                    item.editing = true;
                    $scope.editingUser = angular.copy(item);
                }
            }

            $scope.doneEditingUser = function(item) {
                item.editing = false;
            }
        }
    );
});