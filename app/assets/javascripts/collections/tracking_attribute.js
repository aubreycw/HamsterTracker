HamsterTracker.Collections.Attributes = Backbone.Collection.extend({
  

  model: HamsterTracker.Models.Attribute,

  initialize: function(options){
    this.url = "/api/tracking_subjects/" + options.trackingSubjectId
  },

  getOrFetch: function(id){
    var model = this.get(id);
    if (!model){
      model = new HamsterTracker.Models.Attribute({id: id});
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