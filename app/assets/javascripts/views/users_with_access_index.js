HamsterTracker.Views.UsersWithAccessIndex = Backbone.CompositeView.extend({
  initialize: function(options){
    this.collection.each(function (user) {
      this.addUserSubview(user);
    }.bind(this));

    this.listenTo(this.collection, 'remove', this.removeSubviewAndRender);
    this.listenTo(this.collection, "sync add change", this.render);
  },

  template: JST['users_with_access_index'],

  render: function(){
    var content = this.template({
      users: this.collection
    });
    this.$el.html(content);
    this.attachSubviews();
    return this;
  },

  removeSubviewAndRender: function (model) {
    var that = this;
    this.eachSubview(function (subview){
      if (subview & subview.model === model){
        that.removeSubview("ul.users-list", subview);
        that.render();
      }
    });
  },

  addUserSubview: function (user) {
    var userListItem = new HamsterTracker.Views.UsersWithAccessIndexItem({
      model: user
    });
    this.addSubview("ul.users-list", userListItem);
  },



})