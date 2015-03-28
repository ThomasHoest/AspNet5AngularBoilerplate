(function () {
  'use strict';

  var serviceId = 'entityManagerFactory';
  angular.module('app').factory(serviceId, ['config', 'model', emFactory]);

  function emFactory(config, model) {
    breeze.config.initializeAdapterInstance('modelLibrary', 'backingStore', true);
    breeze.NamingConvention.camelCase.setAsDefault();

    var serviceName = config.remoteServiceName;
    var service = createService();
    var metadataStore = createMetadataStore();

    var provider = {
      metadataStore: metadataStore,
      newManager: newManager
    };

    return provider;

    function createService() {
      return new breeze.DataService({
        serviceName: serviceName,
        hasServerMetadata: false
      });
    }

    function createMetadataStore() {
      var metadataStore = new breeze.MetadataStore();
      metadataStore.addDataService(service);
      window.fillMetadataStore(metadataStore);
      return metadataStore;
    }

    function newManager() {
      var mgr = new breeze.EntityManager({
        serviceName: serviceName,
        metadataStore: metadataStore
      });
      return mgr;
    }
  }
})();