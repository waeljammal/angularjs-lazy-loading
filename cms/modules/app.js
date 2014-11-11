/**
 * Created by waeljammal on 24/09/2014.
 */
define(['angularAMD',
        'angular-ui-router',
        'ui-router-extras',
        'angular-animate',
        'ocLazyLoad',
        'ui-load',
        'angular-route',
        'ui-router-extras-statevis'],

    function(angularAMD) {
        var app = angular.module('app', [
            'ui.router',
            'ngAnimate',
            'ct.ui.router.extras',
            'oc.lazyLoad',
            'ct.ui.router.extras.examples.statevis',
            'ui.load',
            'ngRoute'
        ]);

        app.config(function ($routeProvider,
                             $stateProvider,
                             $controllerProvider,
                             $compileProvider,
                             $filterProvider,
                             $provide,
                             $futureStateProvider) {
            // Cache providers
            app.futureStateProvider = $futureStateProvider;
            app.stateProvider = $stateProvider;
            app.controller = $controllerProvider.register;
            app.directive = $compileProvider.directive;
            app.filter = $filterProvider.register;
            app.factory = $provide.factory;
            app.service = $provide.service;
            app.requireCtrlStateFactory = requireCtrlStateFactory;

            var loadAndRegisterFutureStates = function ($http) {
                return $http.get("content/config/futureStates.json").then(function(resp) {
                   angular.forEach(resp.data, function(fState) {
                      $futureStateProvider.futureState(fState);
                   });
                });
            };

            // Register resolvers
            $futureStateProvider.addResolve(loadAndRegisterFutureStates);

            // Factories
            $futureStateProvider.stateFactory('requireCtrl', requireCtrlStateFactory);
            $futureStateProvider.stateFactory('module', ngloadStateFactory);
        });

        return angularAMD.bootstrap(app);

        // Handles loading a partial view and lazy loading
        // its controller and optional files (css/js/etc)
        function requireCtrlStateFactory($q, futureState, $http) {
            var d = $q.defer();
            var p = [];

            function finalTask() {
                // Tell RequireJS to load lazyController
                // (leave off the .js)
                require([futureState.src], function (lazyController) {
                    // Define the full UI-Router state using the
                    // lazyController and the injected futureState
                    var fullState = {
                        controller: lazyController,
                        name: futureState.stateName,
                        url: futureState.urlPrefix,
                        templateUrl: futureState.templateUrl,
                        resolve: {
                            deps: ['uiLoad', function( uiLoad ) {
                                return uiLoad.load(futureState.files);
                            }]
                        }
                    };

                    // Resolve the promise with the full UI-Router state.
                    d.resolve(fullState);
                });
            }

            $q.all(p).then(finalTask);

            // The state factory returns the promise
            return d.promise;
        }

        function ngloadStateFactory($q, futureState, $http) {
            var ngloadDeferred = $q.defer();

            require([ "ngload!" + futureState.src , 'ngload', 'angularAMD'],
                function ngloadCallback(result, ngload, angularAMD) {
                    var mainState;

                    console.log("Loading future state for " + futureState.stateName)

                    // Now that the module is loaded we should also load in the future
                    // states for that module and append them to the stateProvider.
                    $http.get(futureState.states).then(function(resp) {
                        angular.forEach(resp.data, function(fState) {
                            var fullState = {
                                name: fState.stateName,
                                url: fState.urlPrefix,
                                templateUrl: fState.templateUrl
//                                resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
//                                    loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
//                                        // you can lazy load files for an existing module
//                                        return $ocLazyLoad.load({
//                                            name: 'app',
//                                            files: [fState.controller]
//                                        });
//                                    }]
//                                }
                            };

                            app.futureStateProvider.futureState(fState);
                            app.stateProvider.state(fullState);

                            if(fState.hasOwnProperty("mainState") && fState.mainState)
                                mainState = fullState;
                        });

                        // Once the new future states have been appended
                        // we can proceed to process the queue and resolve this
                        // promise. This should resolve deep linking correctly.
                        angularAMD.processQueue();
                        ngloadDeferred.resolve(mainState);
                    });

//                    angularAMD.processQueue();
//                    ngloadDeferred.resolve(result.entryState);
                }
            );

            return ngloadDeferred.promise;
        }
    }
);