HamsterTracker.Collections.Subjects = Backbone.Collection.extend({
  url: "/api/tracking_subjects",

  model: HamsterTracker.Models.Subject,

  initialize: function(){
  },

  getOrFetch: function(id){
    var model = this.get(id);
    if (!model){
      model = new HamsterTracker.Models.Subject({id: id});
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