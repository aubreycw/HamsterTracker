HamsterTracker.Models.UserWithAccess = Backbone.Model.extend({
  urlRoot: function(){
    return "/api/tracking_subjects/" + this.trackingSubjectId + "/users_with_access";
  },
  
  initialize: function(options){
    this.trackingSubjectId = options.trackingSubjectId;
  },

  collection: HamsterTracker.Collections.UsersWithAccess
});