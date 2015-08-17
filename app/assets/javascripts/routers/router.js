HamsterTracker.Routers.Router = Backbone.Router.extend({
  initialize: function(options){
    this.$rootEl = options.$rootEl;
    this.$sidebar = options.$sidebar;
    this.collection = HamsterTracker.subjects;
  },

  routes: {
    '': 'renderIndexSubject',
    'tracking_subjects/new': 'renderNewSubject',
    'tracking_subjects/:sbjId/tracking_attributes/:atrbId/data_points/new' : 'renderNewDataPoint',
    'tracking_subjects/:sbjId/tracking_attributes/:atrbId/data_points/:dtpId/edit' : 'renderEditDataPoint',
    'tracking_subjects/:id/tracking_attributes/new':  'renderNewAttribute',
    'tracking_subjects/:id/tracking_attributes/:atrbId/edit':  'renderEditAttribute',
    'tracking_subjects/:id/edit': 'renderEditSubject',
    'tracking_subjects/:id/make_entry': 'renderMakeEntry',
    'tracking_subjects/:id/add_user': 'renderAddUser',
    'tracking_subjects/:id': 'renderShowSubjectGraph',
    // 'tracking_subjects/:id': 'renderShowSubject',
    'graphTest': 'renderGraph'
  },

// --------------------------------------- AddUser ------------------------------

  renderAddUser: function(id){
    var subject = this.collection.getOrFetch(id);
    var view = new HamsterTracker.Views.AddUser({
      tracking_subject_name: subject.escape("name"),
      tracking_subject_id: id
    });
    this._swapView(view);
  },

// --------------------------------------- Subjects ------------------------------

  renderIndexSubject: function(){
    this.collection.fetch();
    var view = new HamsterTracker.Views.SubjectsIndex({collection: this.collection});
    this.$sidebar.html(view.render().$el);
  },

  renderShowSubject: function(id){
    this.collection.fetch();
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
      collection: collection});
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

  renderMakeEntry: function (id){    
    var trackingSubject = this.collection.getOrFetch(id);
    var collection = new HamsterTracker.Collections.Attributes({
      trackingSubjectId: id
    });
    var view = new HamsterTracker.Views.MakeEntry({
      collection: collection,
      trackingSubjectId: id,
      trackingSubjectName: trackingSubject.escape("name")
    });
    this._swapView(view);
  },


// --------------------------------------- Data Points ------------------------------

  renderNewDataPoint: function (SbjId, atrbId){
    var collection = new HamsterTracker.Collections.DataPoints({
      trackingSubjectId: SbjId, 
      trackingAttributeId: atrbId});
    var model = new HamsterTracker.Models.DataPoint({
      trackingSubjectId: SbjId, 
      trackingAttributeId: atrbId});
    var view = new HamsterTracker.Views.DataPointForm({
      model: model, 
      collection: collection});
    this._swapView(view);
  },

  renderEditDataPoint: function (sbjId, atrbId, dptId){
    var collection = new HamsterTracker.Collections.DataPoints({trackingSubjectId: sbjId, trackingAttributeId: atrbId});
    var model = collection.getOrFetch(dptId);
    model.trackingSubjectId = sbjId;
    model.trackingAttributeId = atrbId;
    var view = new HamsterTracker.Views.DataPointForm({
      model: model, 
      collection: collection});
    this._swapView(view);
  },


// --------------------------------------- Graph ------------------------------

  renderGraph: function (){
    var view = new HamsterTracker.Views.MainGraph({});
    this._swapView(view);
  },

  renderShowSubjectGraph: function(id){
    var model = this.collection.getOrFetch(id);
    var view = new HamsterTracker.Views.SubjectShowGraph({model: model});
    this._swapView(view)
  },




// --------------------------------------- Swap View ------------------------------

  _swapView: function(view){
    this._view && this._view.remove();
    this._view = view;
    this.$rootEl.html(view.$el);
    view.render();
  }
});