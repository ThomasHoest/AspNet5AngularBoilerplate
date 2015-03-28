(function () {
  'use strict';
  var controllerId = 'dashboard';
  angular.module('app').controller(controllerId, ['common', 'datacontext', dashboard]);

  function dashboard(common, datacontext) {
    var getLogFn = common.logger.getLogFn;
    var log = getLogFn(controllerId);

    var vm = this;
    vm.title = 'Dashboard';
    vm.status;

    activate();

    function activate() {
      var promises = [getStatus()];
      common.activateController(promises, controllerId)
          .then(function () { log('Activated Dashboard View'); });
    }

    function getStatus() {
      return datacontext.status.getStatus().then(function (data) {
        return vm.status = data[0];
      });
    }
  }
})();