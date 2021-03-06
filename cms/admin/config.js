/**
 * Created by waeljammal on 24/09/2014.
 */
require.config({
    waitSeconds: 4,

    paths: {
        'angular': '../bower_components/angular/angular',
        'angular-resource': '../bower_components/angular-resource/angular-resource',
        'angular-sanitize': '../bower_components/angular-sanitize/angular-sanitize.min',
        'angular-ui-router': '../bower_components/angular-ui-router/release/angular-ui-router',
        'd3': '../bower_components/d3/d3',
        'jQuery': '../bower_components/jquery/dist/jquery.min',
        'jQueryUI': '../bower_components/jquery-ui/jquery-ui.min',
        'underscore': '../bower_components/underscore/underscore-min',
        'ui-router-extras': '../bower_components/ui-router-extras/release/ct-ui-router-extras',
        'ui-router-extras-statevis': '../vendor/statevis',
        'lodash': '../bower_components/lodash/dist/lodash',
        'angular.bootstrap': '../bower_components/angular-bootstrap/ui-bootstrap-tpls.min',
        'definitions-loader': '../content/js/definitionsLoader',
        'angularAMD': '../bower_components/angularAMD/angularAMD',
        'ngload': '../vendor/ngload',
        'angular-animate': '../vendor/angular-animate',
        'toaster': '../bower_components/toaster/toaster',
        'gravatar': '../vendor/angular-gravatar',
        'md5': '../vendor/md5'

    },

    shim: {
        'angular': { exports: 'angular', deps: ['jQuery'] },
        'angular-resource': { deps: ['angular'] },
        'angular-sanitize': { deps: ['angular'] },
        'angular-ui-router': ['angular'],
        'd3': {deps: []},
        'jQuery': {exports: 'JQuery'},
        'lodash': { exports: '_' },
        'ui-router-extras': ['angular-ui-router'],
        'ui-router-extras-statevis': ['ui-router-extras'],
        'definitions-loader': {deps: ['jQuery']},
        'angular.bootstrap': {deps: ['angular']},
        "angularAMD": ["angular"],
        "toaster": ["angular"],
        "gravatar": ["angular"],
        "md5": ["angular"],
        'angular-animate': ['angular'],
        'ngload': ['angularAMD']
    },

    deps: ['app']
});