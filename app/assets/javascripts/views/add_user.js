HamsterTracker.Views.AddUser = Backbone.View.extend({
  template: JST['add_user'],

  events: {
    "submit form": "submitUser"
  },

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

  submitUser: function (event){
    event.preventDefault();
    var model = new HamsterTracker.Models.SharedSubject({
        trackingSubjectId: this.tracking_subject_id
      });
    var attrs = this.$el.find("form").serializeJSON();
    attrs["shared_subject"]["tracking_subject_id"] = this.tracking_subject_id;
    var that = this;
    model.save(attrs, {
      success: function(){
        Backbone.history.navigate('#/tracking_subjects/'+that.tracking_subject_id, { trigger: true });
      },
      error: function(model, response){
         $('.errors').empty();
        var $li = $('<li>' + response.responseText + '</li>');
        $('.errors').append($li);
      }
    })
  }


});