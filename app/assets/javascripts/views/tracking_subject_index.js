HamsterTracker.Views.SubjectsIndex = Backbone.CompositeView.extend({
  initialize: function(){
  this.listenTo(this.collection, 'add', this.addSubjectSubview);
  this.listenTo(this.collection, "add remove reset change", this.render);

  this.collection.each(function (subject) {
      this.addSubjectSubview(subject);
    }.bind(this));
  },

  template: JST['tracking_subjects_index'],

  addSubjectSubview: function (subject) {
    console.log("adding subject");
    var subjectListItem = new HamsterTracker.Views.SubjectsIndexItem({
      model: subject
    });
    this.addSubview("ul.subjects-index", subjectListItem);
  },

  render: function(){
    console.log("rendering")

    var subjects = this.collection;
    this.$el.html(this.template());
    
    this.attachSubviews();
    var that = this;
    subjects.each(function(subject){
      var subjectItem = new HamsterTracker.Views.SubjectsIndexItem({model: subject});
      that.$el.find(".subject_list").append(subjectItem.render().$el);
    });
    return this;
  }

})
