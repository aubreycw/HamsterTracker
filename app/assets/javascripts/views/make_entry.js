HamsterTracker.Views.MakeEntry = Backbone.CompositeView.extend({
  events: {
    'click .submitButton': 'submit',
    'trySubmitNow': 'trySubmit'
  },

  template: JST['make_entry'],

  initialize: function(options) {
    this.on( "trySubmitNow", this.trySubmit.bind(this));
    // this.listenTo(this, "trySubmitNow", this.trySubmit)
    this.formsToSubmit = 0
    HamsterTracker.formsToSubmit = 0;
    this.trackingSubjectId = options.trackingSubjectId
    this.trackingSubjectName = options.trackingSubjectName
    var that = this;
    this.collection.fetch({
      success: function(){
        that.collection.each(function (attribute) {
          that.addFormSubview(attribute);
        });
      }
    });
    this.listenTo(this.model, 'sync', this.render);
  },

  addFormSubview: function (attribute) {
    HamsterTracker.formsToSubmit += 1;
    this.formsToSubmit += 1;
    var collection = new HamsterTracker.Collections.DataPoints({
      trackingSubjectId: attribute.get("tracking_subject_id"), 
      trackingAttributeId: attribute.get("id")
    });

    var model = new HamsterTracker.Models.DataPoint({
      trackingSubjectId: attribute.get("tracking_subject_id"), 
      trackingAttributeId: attribute.get("id")
    });

    var attributeForm = new HamsterTracker.Views.SmallDataPointForm({
      model: model, 
      collection: collection,
      attributeName: attribute.escape("name"),
      attributeNotes: attribute.escape("notes"),
      makeEntry: this
    });
    this.addSubview("div.formsList", attributeForm);
  },

  render: function () {
    var content = this.template({
      trackingSubjectName: this.trackingSubjectName,
      trackingSubjectId: this.trackingSubjectId
    });
    this.$el.html(content);
    this.attachSubviews();
    return this;
  },

  trySubmit: function(){
    if (HamsterTracker.makeEntryErrors.length === 0){
      Backbone.history.navigate('#/tracking_subjects/'+this.trackingSubjectId, { trigger: true });
      return this;
    }
    HamsterTracker.formsToSubmit = this.formsToSubmit; 
    HamsterTracker.makeEntryErrors = [];
    return this;
  },

  submit: function (event) {
    event.preventDefault();
    timeDate = this.$el.find(".timeInput")[0].value

    var that = this;
    this.eachSubview(function (formView){
      formView.setTimeDate(timeDate);
      formView.submitForm();
    });
    return this;
  }

});