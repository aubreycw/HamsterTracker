window.HamsterTracker = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    HamsterTracker.subjects = new HamsterTracker.Collections.Subjects();
    HamsterTracker.subjects.fetch()
    // { reset: true }
    var indexView = new HamsterTracker.Views.SubjectsIndex({
      collection: HamsterTracker.subjects
    });
    $('#sidebar').html(indexView.render().$el);


    new HamsterTracker.Routers.Router({
      $rootEl: $("#content"),
      $sidebar: $('#sidebar')
    });


    Backbone.history.stop();
    Backbone.history.start();
  }
};

$(document).ready(function(){
  HamsterTracker.initialize();
});