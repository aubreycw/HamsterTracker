HamsterTracker.Views.MainGraph = Backbone.CompositeView.extend({

  initialize: function(options){
    this.dataPointsList = options.dataPointsList;
    var that = this;
  },

  template: JST['main_graph'],

  // tagName:"div",
  tagName:"svg",

  attributes: {
    width: 600,
    height: 400
  },

  className:"main-graph",

  nameSpace: "http://www.w3.org/2000/svg",

// ---------------------------------- Setup ------------------------

  // Converts from a list of data point collections (this.dataPointsList) 
  // to a list of lists of data points (ready for render)
  getData: function(){
    console.log("in get");
    var dataListList = [];
    var that = this;
    var dataList = this.convertDataPointsList(this.dataPointsList[0]);
    dataListList.push(dataList);
    // this.dataPointsList.forEach(function(dataPoints){
    //   var dataList = that.convertDataPointsList(dataPoints);
    //   dataListList.push(dataList);
    // });
    return dataListList;
  },

  // Takes data point collection and returns a list a data points for it
  convertDataPointsList: function(dataPoints){
    var dataList = [];
    dataPoints.fetch({
      success: function(){
        dataPoints.each(function(dataPoint){
          dataList.push([1,2])
        });
      }
    })
    return dataList;
  },

// ---------------------------------- Render -----------------------
  render: function(){
    console.log("in render");
    var svg = d3.select(this.el);
    var dataset = this.getData();
    debugger;
    // var dataset = [
    //               [ 5,     20 ],
    //               [ 480,   90 ],
    //               [ 250,   50 ],
    //               [ 100,   33 ],
    //               [ 330,   95 ],
    //               [ 410,   12 ],
    //               [ 475,   44 ],
    //               [ 25,    67 ],
    //               [ 85,    21 ],
    //               [ 220,   88 ]
    //           ];

    var padding = 30

    var xscale = d3.scale.linear()
    .domain([0,500])
    .range([padding,600-padding]);

    var yscale = d3.scale.linear()
    .domain([0,100])
    .range([400 - padding, padding]);

    var xAxis = d3.svg.axis()
    .scale(xscale)
    .orient("bottom");

    var yAxis = d3.svg.axis()
    .scale(yscale)
    .orient("left");

    svg.selectAll("circle")
      .data(dataset)
      .enter()
      .append("circle")
      .attr("cx", function(d) {
        return xscale(d[0]);
      })
      .attr("cy", function(d) {
        return yscale(d[1]);
      })
      .attr("r", function(d){
        return d[1]*0.5;
      });

    svg.append("g")
      .attr("transform", "translate(0,"+(400-padding)+")")
      .attr("class", "axis")
      .call(xAxis)
    ;

    svg.append("g")
      .attr("class", "axis")
      .attr("transform", "translate(" + padding + ",0)")
      .call(yAxis);
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

