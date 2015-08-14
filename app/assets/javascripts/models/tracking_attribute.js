HamsterTracker.Models.Attribute = Backbone.Model.extend({
  initialize: function(options){
    this.urlRoot = 'api/tracking_subjects/'+options.trackingSubjectId + "/tracking_attributes"
  },

  collection: HamsterTracker.Collections.Attributes
});