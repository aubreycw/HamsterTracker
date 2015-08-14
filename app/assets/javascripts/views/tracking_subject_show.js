HamsterTracker.Views.SubjectShow = Backbone.CompositeView.extend({
  initialize: function(){
    this.listenTo(this.model, 'sync destroy', this.render);

    var that = this;
    var attributes = new HamsterTracker.Collections.Attributes({trackingSubjectId: this.model.get("id")});
    attributes.fetch({
      success: function(){
        var attributesList = new HamsterTracker.Views.AttributesIndex({
          collection: attributes
        });
        that.addSubview("div.graph", attributesList);
        }
    });
  },

  template: JST['tracking_subject_show'],

  events: {
    "click .edit": "editSubject",
    'dblclick .editable': 'editField',
    'blur .edit-input': 'saveField',
  },

  editField: function (event) {
    event.preventDefault();
    var $currentTarget = $(event.currentTarget);
    var $input = $("<input class='edit-input'>");
    $input.val(this.model.escape("name"));
    $currentTarget.removeClass('editable');
    $currentTarget.html($input);
    $input.focus();
  },

  saveField: function (event) {
    event.preventDefault();
    var newVal = $(event.currentTarget).val();
    this.model.set("name", newVal);
    this.model.save();
    this.render();
  },
  
  render: function(){
    var content = this.template({subject: this.model});
    this.$el.html(content);;
    this.attachSubviews();
    return this;
  },

})


