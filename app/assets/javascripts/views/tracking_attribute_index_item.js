HamsterTracker.Views.AttributesIndexItem = Backbone.CompositeView.extend({
  initialize: function(){
    this.listenTo(this.model, 'sync destroy', this.render);
  },

  events: {
    "click .delete": "destroySubject"
  },

  template: JST['tracking_attributes_index_item'],

  tagName: "li",

  render: function(){
    var content = this.template({attribute: this.model});
    this.$el.html(content);;
    return this;
  },

  destroySubject: function(event){
    this.model.destroy();
    this.remove();
  }
})