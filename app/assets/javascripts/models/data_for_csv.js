HamsterTracker.Models.DataForCSV= Backbone.Model.extend({
  urlRoot: function(){
    return 'api/tracking_subjects/' + this.trackingSubjectId + "/data_for_csv"
  },
  
  initialize: function(options){
    this.trackingSubjectId = options.trackingSubjectId;
  },

  collection: HamsterTracker.Collections.DataForCSV
});