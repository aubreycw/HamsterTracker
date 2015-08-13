HamsterTracker.Views.MainGraph = Backbone.CompositeView.extend({

  template: JST['main_graph'],

  tagName:"div",
  // tagName:"svg",

  className:"main-graph",

  nameSpace: "http://www.w3.org/2000/svg",

  render: function(){
    var svg = d3.select("div")
            .append("svg")
            .attr("width", 600)
            .attr("height", 400);

    // this.$el.attr("id","main-graph");
    // this.$el.attr("width","600");
    // this.$el.attr("height","400");
    var content = this.template();
    svg.html(content);
    // this.$el.html(content);;
    return this;
  },

  // Originally from http://nocircleno.com/blog/svg-with-backbone-js/
  _ensureElement: function() {
     if (!this.el) {
        var attrs = _.extend({}, _.result(this, 'attributes'));
        if (this.id) attrs.id = _.result(this, 'id');
        if (this.className) attrs['class'] = _.result(this, 'className');
        var $el = $(window.document.createElementNS(_.result(this, 'nameSpace'), _.result(this, 'tagName'))).attr(attrs);
        this.setElement($el, false);
     } else {
        this.setElement(_.result(this, 'el'), false);
     }
  }
})

