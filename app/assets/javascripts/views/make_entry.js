HamsterTracker.Views.MakeEntry = Backbone.CompositeView.extend({
  events: {
    'click .submitButton': 'submit'
  },

  template: JST['make_entry'],

  initialize: function(options) {
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
      attributeNotes: attribute.escape("notes")
    });
    this.addSubview("div.formsList", attributeForm);
  },

  render: function () {
    var content = this.template({
      trackingSubjectName: this.trackingSubjectName
    });
    this.$el.html(content);
    this.attachSubviews();
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

    Backbone.history.navigate('#/tracking_subjects/'+this.trackingSubjectId, { trigger: true });
  }

});