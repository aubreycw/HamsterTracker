HamsterTracker.Views.SubjectsIndex = Backbone.CompositeView.extend({
  initialize: function(){
  this.collection.each(function (subject) {
      this.addSubjectSubview(subject);
    }.bind(this));

  this.listenTo(this.collection, 'add', this.addSubjectSubview);
  this.listenTo(this.collection, 'remove', this.removeSubviewAndRender);
  this.listenTo(this.collection, "sync add change", this.render);


  },

  template: JST['tracking_subjects_index'],

  removeSubviewAndRender: function (model) {
    var that = this;
    this.eachSubview(function (subview){
      if (subview & subview.model === model){
        that.removeSubview("ul.subjects-index", subview);
        that.render();
      }
    });
  },

  addSubjectSubview: function (subject) {
    var subjectListItem = new HamsterTracker.Views.SubjectsIndexItem({
      model: subject
    });
    this.addSubview("ul.subjects-index", subjectListItem);
  },

  render: function(){
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
