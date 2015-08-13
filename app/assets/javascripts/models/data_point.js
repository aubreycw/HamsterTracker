HamsterTracker.Models.DataPoint = Backbone.Model.extend({
  urlRoot: function(){
    return 'api/tracking_subjects/' + this.trackingSubjectId + "/tracking_attributes/" + this.trackingAttributeId + "/data_points";
  },
  
  initialize: function(options){
    this.trackingSubjectId = options.trackingSubjectId;
    this.trackingAttributeId = options.trackingAttributeId;
    // this.urlRoot = 'api/tracking_subjects/'+options.trackingSubjectId+"/tracking_attributes/"+options.trackingAttributeId+"/data_points"
  },
  
  // collection: HamsterTracker.Collections.DataPoints
});