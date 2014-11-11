/**
 * Created by waeljammal on 24/09/2014.
 */
define([
    'angular',
    'users/module',
    'toaster'
], function(angular) {

    'use strict';

    angular.module('users').controller('UserRoleController',
        function($scope, $filter, Role, User, toaster) {
            console.log("Loaded Controller - users ");

            // Load roles
            Role.query(function (data) {
                $scope.roles = data;
                $scope.role = $filter('orderBy')($scope.roles, 'first')[0];
                $scope.role.selected = true;

                User.queryByRole({role: $scope.role.id}, function(data) {

                });

            }, function(failedResponse) {
                if(failedResponse.status == 0)
                    $scope.pop("error", "Loading Roles Failed", "Could not connect to server.");
                else
                    $scope.pop("error", "Loading Roles Failed", failedResponse.statusText);
            });

            $scope.toaster = {
                type: 'success',
                title: 'Title',
                text: 'Message'
            };

            $scope.pop = function(type, title, message){
                toaster.pop(type, title, message);
            };

            $scope.checkItem = function(obj, arr, key){
                var i=0;
                angular.forEach(arr, function(item) {
                    if(item[key].indexOf( obj[key] ) == 0){
                        var j = item[key].replace(obj[key], '').trim();
                        if(j){
                            i = Math.max(i, parseInt(j)+1);
                        }else{
                            i = 1;
                        }
                    }
                });
                return obj[key] + (i ? ' '+i : '');
            };

            $scope.selectRole = function (data) {
                angular.forEach($scope.roles, function(item) {
                    item.selected = false;
                    item.editing = false;
                });
                $scope.role = data;
                $scope.role.selected = true;
                $scope.filter = data.role;
            }

            $scope.editRole = function(item) {
                if(item && item.selected){
                    item.editing = true;
                    $scope.editingRole = angular.copy(item);
                }
            }
            
            $scope.doneEditingRole = function (item) {
                if($scope.editingRole.role == item.role)
                    return;

                var role = new Role({id: item.id, role: item.role});

                $scope.pop("info", "Updating " + item.role, "Please Wait");
                role.$save().then(function(data) {
                    $scope.pop("success", "Updated Role", data.role);
                });

                item.editing = false;
            }

            // Create a new role
            $scope.createRole = function() {
                $scope.pop("info", "Creating Role", "Please Wait");

                var role = new Role({role: "New Role"});
                role.role = $scope.checkItem(role, $scope.roles, 'role');

                role.$save().then(function(data) {
                    $scope.pop("success", "Created Role", data.role);
                    $scope.roles.push(data);
                    $scope.selectRole(data);
                })
            }

            $scope.deleteRole = function(item) {
                var role = new Role({id: item.id});
                Role.delete({'id': item.id}).$promise.then(function() {
                    $scope.pop("success", "Deleted Role", item.role);
                    var index = $scope.roles.indexOf(item);
                    $scope.roles.pop(item);

                    if(index - 1 > 0)
                        $scope.selectRole($scope.roles[index-1]);
                })
            }
        }
    );
});