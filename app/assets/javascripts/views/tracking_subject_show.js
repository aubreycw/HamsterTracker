HamsterTracker.Views.SubjectShow = Backbone.CompositeView.extend({
  initialize: function(){
    this.listenTo(this.model, 'sync destroy', this.render);
  },

  events: {
    "click .edit": "editSubject"
  },

  template: JST['tracking_subject_show'],

  render: function(){
    console.log("rendering show");
    var content = this.template({subject: this.model});
    this.$el.html(content);;
    return this;
  },

})