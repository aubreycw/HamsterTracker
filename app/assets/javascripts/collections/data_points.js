HamsterTracker.Collections.DataPoints = Backbone.Collection.extend({
  

  model: HamsterTracker.Models.DataPoint,
  
  url: function(){
    return "/api/tracking_subjects/" + this.trackingSubjectId + "/tracking_attributes/" + this.trackingAttributeId + "/data_points"; 
  },

  initialize: function(options){
    this.trackingSubjectId = options.trackingSubjectId;
    this.trackingAttributeId = options.trackingAttributeId;
    // this.url = "/api/tracking_subjects/" + options.trackingSubjectId + "/tracking_attributes/" + options.trackingAttributeId + "/data_points" 
  },

  getOrFetch: function(id){
    var model = this.get(id);
    if (!model){
      model = new HamsterTracker.Models.DataPoint({id: id});
      var that = this;
      model.fetch({
        success: function(){
          that.add(model);
        },
        error: function(){
        }
      });
    }
    return model;
  },

})