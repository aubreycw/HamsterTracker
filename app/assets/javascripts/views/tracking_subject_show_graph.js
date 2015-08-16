HamsterTracker.Views.SubjectShowGraph = Backbone.CompositeView.extend({
  initialize: function(){
    this.listenTo(this.model, 'sync destroy', this.render);

    var dataPointsList = [];
    var that = this;
    this.model.fetch({
      success: function(){
        that.is_public = that.model.get("public");
      }
    });
    var attributes = new HamsterTracker.Collections.Attributes({trackingSubjectId: this.model.get("id")});
    attributes.fetch({
      success: function(){
        attributes.each(function(attribute){
          var dataPoints = new HamsterTracker.Collections.DataPoints({
            trackingSubjectId: attribute.get("tracking_subject_id"), 
            trackingAttributeId: attribute.get("id")
          });
        dataPointsList.push(dataPoints);
      });
      var graph = new HamsterTracker.Views.MainGraph({
        collection: attributes,
        dataPointsList: dataPointsList,
      });

      that.addSubview("div.graph", graph);
      }
    });
  },

  template: JST['tracking_subject_show'],

  events: {
    "click .toggle_public": "togglePublic",
    'dblclick .editable': 'editField',
    'blur .edit-input': 'saveField',
    "click .delete": "destroySubject"
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
    debugger;
    var that = this;
    var content = that.template({subject: that.model});
    that.$el.html(content);;
    that.attachSubviews();
    return this;
  },

  destroySubject: function(event){
    this.model.destroy();
    this.remove();
    Backbone.history.navigate("#",{ trigger: true });
  },

  togglePublic: function (event) {
    event.preventDefault();
    this.model.get("public");
    debugger;
    this.model.set("public", newVal);
    this.model.save();
    this.render();
  },

})
