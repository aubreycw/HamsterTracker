HamsterTracker.Models.Attribute = Backbone.Model.extend({
  initialize: function(options){
    this.urlRoot = 'api/tracking_subjects/'+options.trackingSubjectId
  },
  
  collection: HamsterTracker.Collections.Attributes
});