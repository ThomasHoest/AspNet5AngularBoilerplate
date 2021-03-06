(function () {
  'use strict';

  var serviceId = 'datacontext';
  angular.module('app').factory(serviceId,
      ['common', 'entityManagerFactory', 'model', 'repositories', datacontext]);

  function datacontext(common, emFactory, model, repositories) {
    var entityNames = model.entityNames;
    var getLogFn = common.logger.getLogFn;
    var log = getLogFn(serviceId);
    var logError = getLogFn(serviceId, 'error');
    var logSuccess = getLogFn(serviceId, 'success');
    var manager = emFactory.newManager();
    var primePromise;
    var repoNames = ['content', 'status', 'ripe', 'company'];
    var $q = common.$q;

    var service = {
      prime: prime
    };

    init();

    return service;

    function init() {
      repositories.init(manager);
      defineLazyLoadedRepos();
    }

    // Add ES5 property to datacontext for each named repo
    function defineLazyLoadedRepos() {
      repoNames.forEach(function (name) {
        Object.defineProperty(service, name, {
          configurable: true, // will redefine this property once
          get: function () {
            // The 1st time the repo is request via this property, 
            // we ask the repositories for it (which will inject it).
            var repo = repositories.getRepo(name);
            // Rewrite this property to always return this repo;
            // no longer redefinable
            Object.defineProperty(service, name, {
              value: repo,
              configurable: false,
              enumerable: true
            });
            return repo;
          }
        });
      });
    }

    function prime() {
      if (primePromise) return primePromise;

    }
  }
})();