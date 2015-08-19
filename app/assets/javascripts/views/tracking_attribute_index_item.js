HamsterTracker.Views.AttributesIndexItem = Backbone.CompositeView.extend({
  initialize: function(){
    // this.listenTo(this.model, 'sync destroy', this.render);
  },

  events: {
    "click .delete": "destroyAttribute",
    "click .edit": "editAttribute"
  },

  template: JST['tracking_attributes_index_item'],

  tagName: "li",

  render: function(){
    var content = this.template({attribute: this.model});
    this.$el.html(content);
    return this;
  },

  destroyAttribute: function(event){
    this.model.destroy();
    this.remove();
  },

  editAttribute: function(event){
    var url = "#/tracking_subjects/" +
      this.model.escape("tracking_subject_id") +
      "/tracking_attributes/" +
      this.model.escape("id") + 
      "/edit";
    Backbone.history.navigate(url, {trigger: true});
  }
})