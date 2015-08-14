HamsterTracker.Models.DataPoint = Backbone.Model.extend({
  urlRoot: function(){
    return 'api/tracking_subjects/' + this.trackingSubjectId + "/tracking_attributes/" + this.trackingAttributeId + "/data_points";
  },
  
  initialize: function(options){
    this.trackingSubjectId = options.trackingSubjectId;
    this.trackingAttributeId = options.trackingAttributeId;
    this.trackingAttributeName = options.trackingAttributeName;
  },

  time: function() {
    return new Date(this.get("time"));
  },

  attrName: function(){
    return this.get("trackingAttributeName");
  },

  collection: HamsterTracker.Collections.DataPoints
});