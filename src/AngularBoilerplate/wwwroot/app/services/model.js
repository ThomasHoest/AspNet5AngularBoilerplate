(function () {
  'use strict';

  // Factory name is handy for logging
  var serviceId = 'model';

  // Define the factory on the module.
  // Inject the dependencies. 
  // Point to the factory definition function.
  angular.module('app').factory(serviceId, model);

  function model() {
    // Define the functions and properties to reveal.
    var entityNames = {
      content: 'Content',
      status: 'Status',
      ripe: 'Ripe',
      company: 'Company',
    };

    var service = {
      configureMetadataStore: configureMetadataStore,
      entityNames: entityNames
    };

    return service;

    function configureMetadataStore(metadataStore) {
      
    }

    //#region Internal Methods        
    //#endregion
  }
})();