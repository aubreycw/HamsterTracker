HamsterTracker.Views.DataPointsIndex = Backbone.CompositeView.extend({
  initialize: function(){
  var that = this;
  this.collection.fetch({
    success: function(){
      that.collection.each(function (dataPoint) {
        that.addDataPointSubview(dataPoint);
      });
    }
  });

  this.listenTo(this.collection, 'add', this.addDataPointSubview);
  this.listenTo(this.collection, 'remove', this.removeSubviewAndRender);
  this.listenTo(this.collection, "sync add change", this.render);
  },

  template: JST['data_points_index'],

  removeSubviewAndRender: function (model) {
    var that = this;
    this.eachSubview(function (subview){
      if (subview & subview.model === model){
        that.removeSubview("ul.data-points-index", subview);
        that.render();
      }
    });
  },

  addDataPointSubview: function (dataPoint) {
    var dataPointListItem = new HamsterTracker.Views.DataPointsIndexItem({
      model: dataPoint
    });
    this.addSubview("ul.data-points-index", dataPointListItem);
  },

  render: function(){
    var dataPoints = this.collection;
    this.$el.html(this.template());
    
    this.attachSubviews();
    var that = this;

    dataPoints.each(function(dataPoint){
      var dataPointItem = new HamsterTracker.Views.DataPointsIndexItem({model: dataPoint});
      that.$el.find(".data_point_list").append(dataPointItem.render().$el);
    });
    return this;
  }

})