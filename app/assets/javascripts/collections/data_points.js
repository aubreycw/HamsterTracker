HamsterTracker.Collections.DataPoints = Backbone.Collection.extend({
  

  model: HamsterTracker.Models.DataPoint,

  initialize: function(options){
    this.url = "/api/tracking_subjects/" + options.trackingSubjectId + "/tracking_attributes/" + options.trackingAttributeId 
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
  }
})