HamsterTracker.Views.DataPointsIndexItem = Backbone.CompositeView.extend({
  initialize: function(options){
    this.trackingAttributeId = options.trackingAttributeId;
    this.trackingSubjectId = options.trackingSubjectId;
    this.listenTo(this.model, 'sync destroy', this.render);
  },

  events: {
    "click .delete": "destroySubject"
  },

  template: JST['data_points_index_item'],

  tagName: "li",

  render: function(){
    var content = this.template({
      dataPoint: this.model,
      dptsId: this.trackingSubjectId,
      dptaId: this.trackingAttributeId
    });
    this.$el.html(content);;
    return this;
  },

  destroySubject: function(event){
    if (window.confirm("Are you sure you want to delete this data point?")){
      this.model.destroy();
      this.remove();
    }
  }
})