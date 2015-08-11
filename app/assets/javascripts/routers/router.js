HamsterTracker.Routers.Router = Backbone.Router.extend({
  initialize: function(options){
    this.$el = options.$el;
    this.collection = HamsterTracker.subjects;
  },

  routes: {
    '': 'renderIndex',
    'tracking_subjects/new': 'renderNew',
    'tracking_subjects/:id/edit': 'renderEdit',
    'tracking_subjects/:id': 'renderShow'
  },

  renderIndex: function(){
    this.collection.fetch();
    var view = new HamsterTracker.Views.SubjectsIndex({collection: this.collection});
    this._swapView(view);
  },

  renderNew: function(){
    console.log("in render new");
    this.collection.fetch();
    var model = new HamsterTracker.Models.Subject();
    var view = new HamsterTracker.Views.SubjectForm({
      model: model, 
      collection: this.collection});
    this._swapView(view);
  },

  _swapView: function(view){
    this._view && this._view.remove();
    this._view = view;
    this.$el.html(view.render().$el);
  }
});