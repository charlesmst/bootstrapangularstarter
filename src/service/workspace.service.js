(function () {
    'use strict';

    angular
        .module('app.service')
        .service('Workspace', Workspace);

    Workspace.$inject = [];
    function Workspace() {
        var vm = this;
        vm.setTitlePage = setTitlePage;
        vm.titlePage = "";


        function setTitlePage(title) {
            vm.titlePage = title
        }
    }
})();