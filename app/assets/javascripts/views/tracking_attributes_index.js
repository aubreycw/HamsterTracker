HamsterTracker.Views.AttributesIndex = Backbone.CompositeView.extend({
  initialize: function(options){
  this.canWrite = options.canWrite;
  var that = this;
  this.collection.fetch({
    success: function(){
      that.collection.each(function (attribute) {
        that.addAttributeSubview(attribute);
      });
    }
  });

  this.listenTo(this.collection, 'add', this.addAttributeSubview);
  this.listenTo(this.collection, 'remove', this.removeSubviewAndRender);
  this.listenTo(this.collection, "sync add change", this.render);
  },

  template: JST['tracking_attributes_index'],

  removeSubviewAndRender: function (model) {
    var that = this;
    this.eachSubview(function (subview){
      if (subview & subview.model === model){
        that.removeSubview("ul.attributes-index", subview);
        that.render();
      }
    });
  },

  addAttributeSubview: function (attribute) {
    var attributesListItem = new HamsterTracker.Views.AttributesIndexItem({
      model: attribute,
      canWrite: this.canWrite
    });
    this.addSubview("ul.attributes-index", attributesListItem);
  },

  render: function(){
    var attributes = this.collection;
    this.$el.html(this.template());
    
    this.attachSubviews();
    return this;
  }

})