HamsterTracker.Routers.Router = Backbone.Router.extend({
  initialize: function(options){
    this.$rootEl = options.$rootEl;
    this.$sidebar = options.$sidebar;
    this.collection = HamsterTracker.subjects;
  },

  routes: {
    '': 'renderIndexSubject',
    'tracking_subjects/new': 'renderNewSubject',
    'tracking_subjects/:id/tracking_attributes/new':  'renderNewAttribute',
    'tracking_subjects/:id/tracking_attributes/:atrbId/edit':  'renderEditAttribute',
    'tracking_subjects/:id/edit': 'renderEditSubject',
    'tracking_subjects/:id': 'renderShowSubject'
  },

// --------------------------------------- Subjects ------------------------------


  renderIndexSubject: function(){
    this.collection.fetch();
    var view = new HamsterTracker.Views.SubjectsIndex({collection: this.collection});
    this.$sidebar.html(view.render().$el);
  },

  renderShowSubject: function(id){
    var model = this.collection.getOrFetch(id);
    var view = new HamsterTracker.Views.SubjectShow({model: model});
    this._swapView(view)
  },

  renderNewSubject: function(){
    this.collection.fetch();
    var model = new HamsterTracker.Models.Subject();
    var view = new HamsterTracker.Views.SubjectForm({
      model: model, 
      collection: this.collection});
    this._swapView(view);
  },

  renderEditSubject: function(id){
    var model = this.collection.getOrFetch(id);
    var view = new HamsterTracker.Views.SubjectForm({
      model: model, 
      collection: this.collection});
    this._swapView(view);
  },

// --------------------------------------- Attributes ------------------------------

  renderNewAttribute: function(id){
    var collection = new HamsterTracker.Collections.Attributes({trackingSubjectId: id});
    var model = new HamsterTracker.Models.Attribute({trackingSubjectId: id});
    var view = new HamsterTracker.Views.AttributeForm({
      model: model, 
      collection: this.collection});
    this._swapView(view);
  },

  renderEditAttribute: function(id, atrbId){
    var collection = new HamsterTracker.Collections.Attributes({trackingSubjectId: id});
    var model = collection.getOrFetch(atrbId);
    var view = new HamsterTracker.Views.AttributeForm({
      model: model, 
      collection: collection});
    this._swapView(view);
  },


// --------------------------------------- Swap View ------------------------------

  _swapView: function(view){
    this._view && this._view.remove();
    this._view = view;
    this.$rootEl.html(view.render().$el);
  }
});