HamsterTracker.Views.UsersWithAccessIndexItem = Backbone.CompositeView.extend({
  initialize: function(options){
    this.trackingSubjectId = options.trackingSubjectId
  },

  events: {
    "click .remove-access": "removeAccess"
  },

  template: JST['users_with_access_index_item'],

  render: function(){
    var content = this.template({
      user: this.model
    });
    this.$el.html(content);
    return this;
  },

  removeAccess: function(event){
    this.model.destroy();
    this.remove();
  },

})