HamsterTracker.Views.AddUser = Backbone.View.extend({
  template: JST['add_user'],

  initialize: function(options) {
    this.tracking_subject_name = options.tracking_subject_name
    this.tracking_subject_id = options.tracking_subject_id
  },

  render: function () {
    var content = this.template({
      name: this.tracking_subject_name
    });
    this.$el.html(content);
    return this;
  },

  // in submit, manually add subject id


});