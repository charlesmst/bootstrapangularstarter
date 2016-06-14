(function () {
    'use strict';

    angular
        .module('app')
        .config(config);
    config.$inject = ['$stateProvider', '$urlRouterProvider'];

    function config($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise("/home");
        //
        // Now set up the states
        $stateProvider
            .state('home', {
                url: "/home",
                templateUrl: "src/app/home.tmpl.html",
                controller:"HomeController",
                controllerAs:"homeVm"
            })
    
    }
})();