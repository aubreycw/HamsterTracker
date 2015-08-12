HamsterTracker.Views.AttributesIndexItem = Backbone.CompositeView.extend({
  initialize: function(){
    this.listenTo(this.model, 'sync destroy', this.render);
    var dataPoints = new HamsterTracker.Collections.DataPoints({
      trackingSubjectId: this.model.get("tracking_subject_id"), 
      trackingAttributeId: this.model.get("id")
    });

    var that = this;
    dataPoints.fetch({
      success: function(){
        var dataPointsList = new HamsterTracker.Views.DataPointsIndex({
          collection: dataPoints,
          trackingSubjectId: that.model.get("tracking_subject_id"), 
          trackingAttributeId: that.model.get("id")
        });
        that.addSubview("div.data-points-list", dataPointsList);
        }
    });
  },

  events: {
    "click .delete": "destroySubject"
  },

  template: JST['tracking_attributes_index_item'],

  tagName: "li",

  render: function(){
    var content = this.template({attribute: this.model});
    this.$el.html(content);;
    this.attachSubviews();
    return this;
  },

  destroySubject: function(event){
    this.model.destroy();
    this.remove();
  }
})