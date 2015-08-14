HamsterTracker.Views.MainGraph = Backbone.CompositeView.extend({

  initialize: function(options){
    this.dataPointsList = options.dataPointsList;
    var that = this;
    this.width = 600;
    this.height = 400;
  },

  template: JST['main_graph'],

  // tagName:"div",
  tagName:"svg",

  attributes: {
    width: 600,
    height: 400,
  },

  className:"main-graph",

  nameSpace: "http://www.w3.org/2000/svg",

// ---------------------------------- Setup ------------------------

  // Takes data point collection and returns a list a data points for it
  convertDataPointsColl: function(dataPoints){
    var dataList = [];
    var that = this;
    dataPoints.fetch({
      success: function(){
        dataPoints.each(function(dataPoint){
          var time = dataPoint.time();
          ids = [dataPoint.get("tracking_attribute_id"), dataPoint.get("id")]
          dataList.push([time, dataPoint.get("value") ,ids , dataPoint.attrName()])

          if (!that.minD || that.minD < time){
            that.minD = time
          }

          if (!that.maxD || that.maxD > time){
            that.maxD = time
          }
        });
        that.toDo -= 1;
        that.dataListList.push(dataList);
        that.renderGraphHandler();
      }
    })
  },

// ---------------------------------- Render -----------------------
  render: function(){
    var that = this;
    this.dataListList = [];
    this.toDo = this.dataPointsList.length;
    this.numAxis = this.toDo;
    this.dataPointsList.forEach(function(dataPoints){
      that.convertDataPointsColl(dataPoints);
    });
  },

  renderGraphHandler: function(){
    if (this.toDo > 0){
      return null;
    }
    this.axisPadding = 40;
    var that = this;
    this.dataListList.forEach(function(dataList){
      that.renderGraph(dataList);
    });
  },


  randomColor: function () {
    var color = "#";
    for (var i = 0; i < 6; i++) {
      color += "0123456789ABCDEF"[Math.floor((Math.random() * 16))];
    }
    return color;
  },

  renderGraph: function(dataList){
    var svg = d3.select(this.el);
    var dataset = dataList;
    var attrName = dataList[0][3];
    var xpadding = 30;
    var ypadding = this.numAxis*40;

    var minD = this.minD;
    var maxD = this.maxD;

    var xscale =  d3.time.scale()
    .domain([minD, maxD])
    .range([this.width-ypadding, ypadding]); 
    var yscale = d3.scale.linear()
    .domain([d3.min(dataset, function(d) { return d[1]; })-1, d3.max(dataset, function(d) { return d[1]; })+1])
    .range([this.height - xpadding, xpadding]);

    var xAxis = d3.svg.axis()
    .scale(xscale)
    .orient("bottom")
    .ticks(5);

    var yAxis = d3.svg.axis()
    .scale(yscale)
    .orient("left");

    var col = this.randomColor();

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
      .attr("r", 5)      
      .attr("data-taId",function(d) {
        return d[2][0];
      })
      .attr("data-dpId",function(d) {
        return d[2][1];
      })
      .attr("fill",col);


    svg.append("text")
      .attr("class", "x label")
      .attr("x", this.width*0.5)
      .attr("y", this.height - xpadding)
      .text("Time");

    svg.append("text")
      .attr("class", "y label")
      .attr("x", -(this.width - ypadding)*0.45)
      .attr("y", this.axisPadding + 10)
      .attr("transform", "rotate(-90)")
      .text("" + attrName);



    svg.append("g")
      .attr("class", "axis")
      .attr("transform", "translate(" + this.axisPadding + ",0)")
      .call(yAxis); 

    svg.append("g")
      .attr("transform", "translate(0,"+(this.height-xpadding)+")")
      .attr("class", "axis")
      .call(xAxis);

    this.axisPadding += 40;
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

