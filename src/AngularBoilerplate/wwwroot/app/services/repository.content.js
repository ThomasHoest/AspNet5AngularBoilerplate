(function () {
  'use strict';

  var serviceId = 'repository.content';
  angular.module('app').factory(serviceId,
      ['model', 'repository.abstract', RepositoryContent]);

  function RepositoryContent(model, AbstractRepository) {
    var entityName = model.entityNames.content;
    var EntityQuery = breeze.EntityQuery;
    var orderBy = 'Name';

    function Ctor(mgr) {
      this.serviceId = serviceId;
      this.entityName = entityName;
      this.manager = mgr;
      // Exposed data access functions
      this.getContent = getContent;
    }

    AbstractRepository.extend(Ctor);

    return Ctor;

    // Formerly known as datacontext.getSessionCount() {
    function getContent() {
      var self = this;
      var content;
      //if (self._areItemsLoaded()) {
      //  return self.$q.when(self._getLocalEntityCount(entityName));
      //}
      // Sessions aren't loaded; ask the server for a count.
      return EntityQuery.from('Contents')
          .using(this.manager).execute()
          .to$q(querySucceeded, self._queryFailed);

      function querySucceeded(data) {
        content = data.results;
        self._areItemsLoaded(true);
        self.log('Retrieved [Content] from remote data source', content.length, true);
        return content;
      }
    }
  }
})();