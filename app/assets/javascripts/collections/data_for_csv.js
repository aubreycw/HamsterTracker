HamsterTracker.Collections.DataForCSV = Backbone.Collection.extend({
  

  model: HamsterTracker.Models.DataForCSV,
  
  url: function(){
    return "/api/tracking_subjects/" + this.trackingSubjectId + "/data_for_csv"
  },

  initialize: function(options){
    this.trackingSubjectId = options.trackingSubjectId;
  }

})