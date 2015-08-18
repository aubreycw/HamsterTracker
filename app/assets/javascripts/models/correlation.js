HamsterTracker.Models.Correlation = Backbone.Model.extend({
  urlRoot: function(){
    return 'api/tracking_subjects/' + this.trackingSubjectId
  },
  
  initialize: function(options){
    this.trackingSubjectId = options.trackingSubjectId;
  },

  collection: HamsterTracker.Collections.Correlations
});