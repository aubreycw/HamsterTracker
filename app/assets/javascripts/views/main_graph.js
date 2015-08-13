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
    var dataset = [
                  [ 5,     20 ],
                  [ 480,   90 ],
                  [ 250,   50 ],
                  [ 100,   33 ],
                  [ 330,   95 ],
                  [ 410,   12 ],
                  [ 475,   44 ],
                  [ 25,    67 ],
                  [ 85,    21 ],
                  [ 220,   88 ]
              ];

    svg.selectAll("circle")
      .data(dataset)
      .enter()
      .append("circle")
      .attr("cx", function(d) {
        return d[0];
      })
      .attr("cy", function(d) {
        return d[1];
      })
      .attr("r", function(d){
        return d[1]*d[0]*0.001;
      });

    return this;
    // var content = this.template();
    // svg.html(content);
    // 
    // this.$el.attr("id","main-graph");
    // this.$el.attr("width","600");
    // this.$el.attr("height","400");
    // this.$el.html(content);
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

