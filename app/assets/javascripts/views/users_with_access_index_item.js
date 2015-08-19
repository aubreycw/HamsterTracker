HamsterTracker.Views.UsersWithAccessIndexItem = Backbone.CompositeView.extend({
  initialize: function(){
  },

  template: JST['users_with_access_index_item'],

  render: function(){
    var content = this.template({
      user: this.model
    });
    this.$el.html(content);
    return this;
  }

})