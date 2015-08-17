HamsterTracker.Models.SharedSubject = Backbone.Model.extend({
  urlRoot: function(){
    return 'api/tracking_subjects/' + this.trackingSubjectId + "/shared_subjects";
  },
  
  initialize: function(options){
    this.trackingSubjectId = options.trackingSubjectId
  }
});