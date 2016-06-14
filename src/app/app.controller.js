(function() {
'use strict';

    angular
        .module('app')
        .controller('AppController', AppController);

    AppController.$inject = ['$http','Workspace'];
    function AppController($http,Workspace) {
        var vm = this; 
        vm.workspace = Workspace;
        activate();

        function activate() { }
    }
})();