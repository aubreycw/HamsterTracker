HamsterTracker.Collections.Trendlines = Backbone.Collection.extend({


  model: HamsterTracker.Models.Trendline,
  
  url: function(){
    return "/api/tracking_subjects/" + this.trackingSubjectId + "/trendlines" 
  },

  initialize: function(options){
    this.trackingSubjectId = options.trackingSubjectId;
  }

})