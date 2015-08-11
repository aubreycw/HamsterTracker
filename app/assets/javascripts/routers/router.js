HamsterTracker.Routers.Router = Backbone.Router.extend({
  initialize: function(options){
    this.$rootEl = options.$rootEl;
    this.$sidebar = options.$sidebar;
    this.collection = HamsterTracker.subjects;
  },

  routes: {
    '': 'renderIndex',
    'tracking_subjects/new': 'renderNew',
    'tracking_subjects/:id/edit': 'renderEdit',
    'tracking_subjects/:id': 'renderShow'
  },

  renderIndex: function(){
    console.log("in render index")
    this.collection.fetch();
    var view = new HamsterTracker.Views.SubjectsIndex({collection: this.collection});
    this.$sidebar.html(view.render().$el);
  },

  renderShow: function(id){
    console.log("in render show")
    var model = this.collection.getOrFetch(id);
    var view = new HamsterTracker.Views.SubjectShow({model: model});
    this._swapView(view)
  },

  renderNew: function(){
    this.collection.fetch();
    var model = new HamsterTracker.Models.Subject();
    var view = new HamsterTracker.Views.SubjectForm({
      model: model, 
      collection: this.collection});
    this._swapView(view);
  },

  renderEdit: function(id){
    var model = this.collection.getOrFetch(id);
    var view = new HamsterTracker.Views.SubjectForm({
      model: model, 
      collection: this.collection});
    this._swapView(view);
  },

  _swapView: function(view){
    this._view && this._view.remove();
    this._view = view;
    this.$rootEl.html(view.render().$el);
  }
});