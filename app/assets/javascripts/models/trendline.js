HamsterTracker.Models.Trendline = Backbone.Model.extend({
  urlRoot: function(){
    return 'api/tracking_subjects/' + this.trackingSubjectId + "trendlines"
  },
  
  initialize: function(options){
    this.trackingSubjectId = options.trackingSubjectId;
  },

  collection: HamsterTracker.Collections.Trendlines
});