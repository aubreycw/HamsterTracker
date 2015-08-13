HamsterTracker.Views.MainGraph = Backbone.CompositeView.extend({

  template: JST['main_graph'],

  // tagName:"div",
  tagName:"svg",

  attributes: {
    width: 600,
    height: 400
  },

  className:"main-graph",

  nameSpace: "http://www.w3.org/2000/svg",

  render: function(){
    var svg = d3.select(this.el);
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

    // var xscale = d3.scale.linear();
    // .domain([0,500])
    // .range([0,400]);

    // var xscale = d3.scale.linear();
    // .domain([0,500])
    // .range([0,400]);

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

