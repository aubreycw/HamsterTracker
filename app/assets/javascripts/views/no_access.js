HamsterTracker.Views.NoAccess = Backbone.View.extend({

  template: JST['no_access'],

  initialize: function(options) {
  },
  render: function () {
    var content = this.template({dataPoint: this.model});
    this.$el.html(content);
    return this;
  }
});