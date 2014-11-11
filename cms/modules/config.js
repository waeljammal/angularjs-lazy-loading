/**
 * Created by waeljammal on 24/09/2014.
 */
require.config({
    waitSeconds: 100,

    paths: {
        'jquery': '../bower_components/jquery/dist/jquery.min',
        'angularAMD': '../bower_components/angularAMD/angularAMD',
        'angular': '../bower_components/angular/angular',
        'angular-route': '../bower_components/angular-route/angular-route',
        'ocLazyLoad': '../bower_components/oclazyload/dist/ocLazyLoad',
        'ngload': '../vendor/ngload',
        'angular-ui-router': '../bower_components/angular-ui-router/release/angular-ui-router',
        'ui-router-extras': '../bower_components/ui-router-extras/release/ct-ui-router-extras',
        'ui-router-extras-statevis': '../vendor/statevis',
        'angular-animate': '../vendor/angular-animate',
        'ui-load': '../vendor/ui-load',
        'lodash': '../bower_components/lodash/dist/lodash',
        'd3': '../bower_components/d3/d3'
    },

    shim: {
        'angular': { deps: ['jquery'], exports: 'angular' },
        'ngload': ['angularAMD'],
        'angular-ui-router': ['angular'],
        'ui-router-extras': ['angular-ui-router'],
        'ui-router-extras-statevis': ['ui-router-extras'],
        'angular-animate': ['angular'],
        'ocLazyLoad': ['angular'],
        'ui-load': ['angular'],
        'd3': {deps: []},
        'jquery': { exports: '$' },
        'lodash': { exports: '_' },
        'angular-route': ['angular']
    },

    deps: ['app']
});