window.HamsterTracker = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    HamsterTracker.subjects = new HamsterTracker.Collections.Subjects();
    new HamsterTracker.Routers.Router({$el: $("#content")});
    Backbone.history.stop();
    Backbone.history.start();
  }
};

$(document).ready(function(){
  HamsterTracker.initialize();
});