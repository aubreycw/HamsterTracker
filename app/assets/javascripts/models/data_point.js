HamsterTracker.Models.DataPoint = Backbone.Model.extend({
  initialize: function(options){
    this.urlRoot = 'api/tracking_subjects/'+options.trackingSubjectId+"/tracking_attributes/"+options.trackingAttributeId
  },
  
  collection: HamsterTracker.Collections.DataPoints
});