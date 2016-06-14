(function() {
'use strict';

    angular
        .module('app')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['Workspace'];
    function HomeController(Workspace) {
        var vm = this;
        Workspace.setTitlePage("Home")

        activate();

        ////////////////

        function activate() { }
    }
})();