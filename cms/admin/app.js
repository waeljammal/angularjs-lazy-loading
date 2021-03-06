/**
 * Created by waeljammal on 24/09/2014.
 */
define(['angularAMD',
        '../content/js/definitionsLoader',
        'angular-ui-router',
        'ui-router-extras',
        'ui-router-extras-statevis',
        'angular.bootstrap',
        'core/directives',
        'gravatar',
        'md5'],

    function(angularAMD, definitionsLoader) {
        var application;

        require(definitionsLoader.scriptsToLoad,function() {
            initializeApp();
        });

        function initializeApp() {
            var app = angular.module('app', [
                'ct.ui.router.extras',
                'ct.ui.router.extras.examples.statevis',
                'app.directives',
                'ui.gravatar'
            ]);

            application = app;

            app.config(function($stateProvider) {
                // Cache the state provider
                app.stateProvider = $stateProvider;

                // Root of main app
                $stateProvider.state({
                    name: 'top',
                    urlPrefix: '/',
                    abstract: true,
                    templateUrl: "admin/core/tpl/app.html",
                    controller: "AdminController"
                });

                // Lazy load modules and states as needed
                for (var i = 0; i < definitionsLoader.modules.length; i++) {
                    var module = definitionsLoader.modules[i];

                    var m = {
                        "label": module.label,
                        "name": module.name,
                        "abstract": module.abstract,
                        "url": module.url,
                        "templateUrl": module.templateUrl,
                        "files": module.files,
                        "module": module.module,
                        "resolve": {
                            load: ['$q', '$rootScope', function ($q, $rootScope) {
                                var deferred = $q.defer();
                                var toLoad = ["ngload!" + this.self.module];
                                var load = toLoad.concat(this.self.files);

                                $rootScope.currentModule = this.self.name;

                                require(load, function () {
                                    $rootScope.$apply(function () {
                                        deferred.resolve();
                                    });
                                });
                                return deferred.promise;
                            }]
                        }
                    }

                    $stateProvider.state(m);

                    for(var m = 0; m < module.moduleStates.length; m++) {
                        var state = module.moduleStates[m];

                        var s = {
                            "label": state.label,
                            "name": state.name,
                            "abstract": state.abstract,
                            "url": state.url,
                            "templateUrl": state.templateUrl,
                            "files": state.files,
                            "resolve": {
                                load: ['$q', '$rootScope', function ($q, $rootScope) {
                                    var deferred = $q.defer();

                                    $rootScope.currentState = this.self.name;

                                    require(this.self.files, function () {
                                        $rootScope.$apply(function () {
                                            deferred.resolve();
                                        });
                                    });
                                    return deferred.promise;
                                }]
                            }
                        }

                        $stateProvider.state(s);
                    }
                }
            });

            app.controller('AdminController', ['$scope', function($scope) {
                console.log("Loaded Controller - admin ");
                $scope.modules = definitionsLoader.modules;
                applyConfiguration($scope);
            }]);

            app.run(['$rootScope', function ($rootScope) {

            }]);

            app.constant('JQ_CONFIG', {
                    slimScroll:     ['vendor/jquery/slimscroll/jquery.slimscroll.min.js'],
                    sortable:       ['vendor/jquery/sortable/jquery.sortable.js'],
                    nestable:       ['vendor/jquery/nestable/jquery.nestable.js',
                                     'vendor/jquery/nestable/nestable.css'],
                    filestyle:      ['vendor/jquery/file/bootstrap-filestyle.min.js'],
                    slider:         ['vendor/jquery/slider/bootstrap-slider.js',
                                     'vendor/jquery/slider/slider.css'],
                    chosen:         ['vendor/jquery/chosen/chosen.jquery.min.js',
                                     'vendor/jquery/chosen/chosen.css'],
                    TouchSpin:      ['vendor/jquery/spinner/jquery.bootstrap-touchspin.min.js',
                                     'vendor/jquery/spinner/jquery.bootstrap-touchspin.css'],
                    wysiwyg:        ['vendor/jquery/wysiwyg/bootstrap-wysiwyg.js',
                                     'vendor/jquery/wysiwyg/jquery.hotkeys.js'],
                    dataTable:      ['vendor/jquery/datatables/jquery.dataTables.min.js',
                                     'vendor/jquery/datatables/dataTables.bootstrap.js',
                                     'vendor/jquery/datatables/dataTables.bootstrap.css'],
                    vectorMap:      ['vendor/jquery/jvectormap/jquery-jvectormap.min.js',
                                     'vendor/jquery/jvectormap/jquery-jvectormap-world-mill-en.js',
                                     'vendor/jquery/jvectormap/jquery-jvectormap-us-aea-en.js',
                                     'vendor/jquery/jvectormap/jquery-jvectormap.css'],
                    footable:       ['vendor/jquery/footable/footable.all.min.js',
                                     'vendor/jquery/footable/footable.core.css']
                }
            )

            // Bootstrap using AMD so we can lazy load
            angularAMD.bootstrap(app);
        }

        function applyConfiguration($scope) {
            // Config
            $scope.app = {
                name: 'Bojinx CMS',
                version: '1.3.0',
                // Char Colors
                color: {
                    primary: '#7266ba',
                    info:    '#23b7e5',
                    success: '#27c24c',
                    warning: '#fad733',
                    danger:  '#f05050',
                    light:   '#e8eff0',
                    dark:    '#3a3f51',
                    black:   '#1c2b36'
                },
                settings: {
                    themeID: 1,
                    navbarHeaderColor: 'bg-black',
                    navbarCollapseColor: 'bg-white-only',
                    asideColor: 'bg-black',
                    headerFixed: false,
                    asideFixed: false,
                    asideFolded: false,
                    asideDock: false,
                    container: false
                }
            };
        }
    }
);