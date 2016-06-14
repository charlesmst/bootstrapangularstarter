(function() {
'use strict';

    angular
        .module('FOGAP.Inscricao')
        .controller('AppController', AppController);

    AppController.$inject = ['$http'];
    function AppController($http) {
        var vm = this;
        
        activate();

        ////////////////

        function activate() { }
    }
})();