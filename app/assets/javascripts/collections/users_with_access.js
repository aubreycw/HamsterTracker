HamsterTracker.Collections.UsersWithAccess = Backbone.Collection.extend({
  

  model: HamsterTracker.Models.UserWithAccess,
  
  url: function(){
    return "/api/tracking_subjects/" + this.trackingSubjectId + "/users_with_access"; 
  },

  initialize: function(options){
    this.trackingSubjectId = options.trackingSubjectId;
  },

  getOrFetch: function(id){
    var model = this.get(id);
    if (!model){
      model = new HamsterTracker.Models.UserWithAccess({id: id});
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