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
    'tracking_subjects/:sbjId/tracking_attributes/:atrbId/data_points/:dtpId/edit' : 'startEditDataPoint',
    'tracking_subjects/:id/tracking_attributes/new':  'renderNewAttribute',
    'tracking_subjects/:id/tracking_attributes/:atrbId/edit':  'startEditAttribute',
    'tracking_subjects/:id/edit': 'startEditSubject',
    'tracking_subjects/:id/make_entry': 'startMakeEntry',
    'tracking_subjects/:id/add_user': 'startAddUser',
    'tracking_subjects/:id': 'startShowSubjectGraph',
    'graphTest': 'renderGraph'
  },

// --------------------------------------- AddUser ------------------------------
  startAddUser: function(id){
    var that = this;
    this.collection.fetch({
      success: function(){
        that.renderAddUser.bind(that, id)();
      }
    })
  },

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

  renderNewSubject: function(){
    this.collection.fetch();
    var model = new HamsterTracker.Models.Subject();
    var view = new HamsterTracker.Views.SubjectForm({
      model: model, 
      collection: this.collection});
    this._swapView(view);
  },

  startEditSubject: function(id){
    var that = this;
    this.collection.fetch({
      success: function(){
        that.renderEditSubject.bind(that, id)();
      }
    })
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

  startEditAttribute: function(id, atrbId){
    var collection = new HamsterTracker.Collections.Attributes({
      trackingSubjectId: id
    });
    var that = this
    collection.fetch({
      success: function(){
        that.renderEditAttribute.bind(that, atrbId, collection)();
      }
    })
  },

  renderEditAttribute: function(atrbId, collection){
    var model = collection.getOrFetch(atrbId);
    var view = new HamsterTracker.Views.AttributeForm({
      model: model, 
      collection: collection});
    this._swapView(view);
  },

  startMakeEntry: function(id){
    var that = this;
    this.collection.fetch({
      success: function(){
        that.renderMakeEntry.bind(that, id)();
      }
    })
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

  startEditDataPoint: function(sbjId, atrbId, dptId){
    var collection = new HamsterTracker.Collections.DataPoints({
      trackingSubjectId: sbjId, 
      trackingAttributeId: atrbId
    });
    var that = this
    collection.fetch({
      success: function(){
        that.renderEditDataPoint.bind(that, sbjId, atrbId, dptId, collection)();
      }
    })
  },

  renderEditDataPoint: function (sbjId, atrbId, dptId, collection){
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

  startShowSubjectGraph: function(id){
    var that = this;
    this.collection.fetch({
      success: function(){
        that.renderShowSubjectGraph.bind(that, id)();
      }
    })
  },

  renderShowSubjectGraph: function(id){
    var model = this.collection.get(id);
    if (model){
      var view = new HamsterTracker.Views.SubjectShowGraph({model: model});
    } else {
      var view = new HamsterTracker.Views.NoAccess();
    }
    this._swapView(view);
  },




// --------------------------------------- Swap View ------------------------------

  _swapView: function(view){
    this._view && this._view.remove();
    this._view = view;
    this.$rootEl.html(view.$el);
    view.render();
  }
});