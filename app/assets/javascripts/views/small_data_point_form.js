HamsterTracker.Views.SmallDataPointForm = Backbone.View.extend({
  events: {
    "submitForm": 'submit'
  },

  template: JST['dataPoint/form_small'],

  initialize: function(options) {
    this.attributeName = options.attributeName;
    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this, 'submitForm', this.submit);
  },

  submitForm: function (){
    this.trigger("submitForm");
  },

  render: function () {
    var content = this.template({dataPoint: this.model, attributeName: this.attributeName});
    this.$el.html(content);
    return this;
  },

  setTimeDate: function (value){
    this.timeDate = value;
  },

  submit: function () {
    var attrs = this.$el.find("form").serializeJSON();
    attrs["data_point"]["time"] = this.timeDate;

    var that = this;
    this.model.set(attrs);
    var sbjId = this.model.trackingSubjectId;
    this.model.save({}, {
      success: function () {
        that.collection.add(that.model);
      },

      error: function (model, response) {
        console.log("Errors!");
        $('.errors').empty();
        var $li = $('<li>' + response.responseText + '</li>');
        $('.errors').append($li);
      }
    });
  }
});