HamsterTracker.Views.MoreInfo = Backbone.CompositeView.extend({
  initialize: function(options){
    this.users = options.users;
    this.canWrite = options.canWrite;
  },

  events: {
    "click button.more-info": "renderInfo",
    "click button.less-info": "removeInfo"
  },

  template: JST['more_info'],

  render: function(event){
    var content = this.template();
    this.$el.html(content)
    return this;
  },

  removeInfo: function(event){
    var that = this;
    this.eachSubview(function(subview, selector){
      that.removeSubview (selector, subview);
    })
    this.render();
  },

  renderInfo: function(event){
    var content = JST['expand_info']();
    this.$el.html(content)
    var attributeListView = new HamsterTracker.Views.AttributesIndex({
      collection: this.collection,
      canWrite: this.canWrite
    });
    this.addSubview("div.attributes-list", attributeListView)

    var userListView = new HamsterTracker.Views.UsersWithAccessIndex({
      collection: this.users,
      canWrite: this.canWrite
    });
    this.addSubview("div.users-list", userListView)

    this.attachSubviews();
  }
})