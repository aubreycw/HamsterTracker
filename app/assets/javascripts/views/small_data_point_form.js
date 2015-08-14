HamsterTracker.Views.SmallDataPointForm = Backbone.View.extend({
  events: {
    "submitForm": 'submit'
  },

  template: JST['dataPoint/form_small'],

  initialize: function(options) {
    this.listenTo
    this.makeEntry = options.makeEntry;
    this.attributeName = options.attributeName;
    this.attributeNotes = options.attributeNotes;
    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this, 'submitForm', this.submit);
  },

  submitForm: function (){
    console.log("in submit form");
    this.trigger("submitForm");
  },

  render: function () {
    var content = this.template({dataPoint: this.model, 
      attributeName: this.attributeName,
      notes: this.attributeNotes});
    this.$el.html(content);
    return this;
  },

  setTimeDate: function (value){
    console.log("Setting time date")
    this.timeDate = value;
  },

  submit: function () {
    console.log("Submitting")
    var attrs = this.$el.find("form").serializeJSON();
    attrs["data_point"]["time"] = this.timeDate;

    var that = this;
    this.model.set(attrs);
    var sbjId = this.model.trackingSubjectId;
    this.model.save({}, {
      success: function () {
        that.collection.add(that.model);
        HamsterTracker.formsToSubmit -= 1;
        if (HamsterTracker.formsToSubmit === 0){
          that.makeEntry.trigger("trySubmitNow");
        }
      },

      error: function (model, response) {
        HamsterTracker.formsToSubmit -= 1;
        console.log("Errors!");
        HamsterTracker.makeEntryErrors.push(response.responseText);
        $('.errors').empty();
        var $li = $('<li>' + response.responseText + '</li>');
        $('.errors').append($li);
        if (HamsterTracker.formsToSubmit === 0){
          that.makeEntry.trigger("trySubmitNow");
        }
      }
    });
  }
});