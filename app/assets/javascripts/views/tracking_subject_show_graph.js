HamsterTracker.Views.SubjectShowGraph = Backbone.CompositeView.extend({
  initialize: function(){
    this.listenTo(this.model, 'sync destroy', this.render);

    var dataPointsList = [];
    var that = this;
    this.model.fetch();
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
    var that = this;
    var is_public = this.model.get("public")
    if (is_public === null){
      is_public = true;
    }
    // debugger;
    var content = that.template({
      subject: that.model,
      is_public: is_public
    });
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
    var is_public = this.model.get("public")
    if (is_public || is_public === null || is_public === "true" ){
      is_public = true;
    } else {
      is_public = false;
    }
    // var new_public = "true";
    // if (is_public){
    //   new_public = "false";
    // }

    // debugger;
    // this.model.set("public", !is_public);
    var that = this;
    this.is_public = is_public
    // debugger;
    this.model.save({"public": !that.is_public}, {
      success: function(){
        console.log("saving done");
        // debugger;
        that.render();
      },
      error: function(){
        console.log("there was an error");
        // debugger;
      }
      });
  },

})
