/**
 * Created by waeljammal on 28/09/2014.
 */
(function(){
    'use strict';
    var components;
    angular.module('LazyLoad', [])
        .config(['$controllerProvider', '$provide', function ($controllerProvider, $provide){
            components = {
                controller: $controllerProvider.register
                ,service: $provide.service
            };
        }])
        .factory('lazy', function (){
            var $injector = angular.injector(['ng'])
                ,$rootScope = $injector.get('$rootScope')
                ,$q = $injector.get('$q');

            return function(moduleName){
                var mod = angular.module(moduleName);
                mod.components = mod.components || components;
                return {
                    load: function (arr){
                        arr = arr || [];
                        var deferred = $q.defer();
                        require(arr, function () {
                            $rootScope.$apply(function (){deferred.resolve();});
                        });
                        return deferred.promise;
                    }
                };
            }
        });
})();