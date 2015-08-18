HamsterTracker.Collections.Correlations = Backbone.Collection.extend({
  

  model: HamsterTracker.Models.Correlation,
  
  url: function(){
    return "/api/tracking_subjects/" + this.trackingSubjectId + "/correlations"; 
  },

  initialize: function(options){
    this.trackingSubjectId = options.trackingSubjectId;
  },

  getOrFetch: function(id){
    var model = this.get(id);
    if (!model){
      model = new HamsterTracker.Models.Correlation({id: id});
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