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
          dataList.push([
            dataPoint.get("id"), 
            dataPoint.get("tracking_attribute_id"), 
            time, 
            dataPoint.get("value")])

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

  getAtrbName: function(dataPoints){
    var that = this;
    dataPoints.fetch({
      success: function(coll){
        var atrb = new HamsterTracker.Models.Attribute({
          trackingSubjectId: coll.trackingSubjectId,
          id: coll.trackingAttributeId
        });
        atrb.fetch({
          success: function(atrbX){
            that.toDoNames -= 1;
            that.atrbNamesList.push(atrbX.get("name"));
            that.renderNamesHandler();
          }
        });
      }
    });
  },

// ---------------------------------- Render -----------------------
  render: function(){
    var that = this;
    this.dataListList = [];
    this.atrbNamesList = [];
    this.toDo = this.dataPointsList.length;
    this.toDoNames = this.toDo;
    this.numAxis = this.toDo;
    this.dataPointsList.forEach(function(dataPoints){
      that.convertDataPointsColl(dataPoints);
      that.getAtrbName(dataPoints);
    });
    return this;
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

  renderNamesHandler: function(){
    if (this.toDoNames > 0){
      return null;
    }
    this.axisPadding = 40;
    var that = this;
    this.atrbNamesList.forEach(function(atrbName){
      that.renderNames(atrbName);
    });
  },



  randomColor: function () {
    var color = "#";
    for (var i = 0; i < 6; i++) {
      color += "0123456789ABCDEF"[Math.floor((Math.random() * 16))];
    }
    return color;
  },

  renderGraph: function(dataset){

            //0 id, 
            //1 tracking_attribute_id, 
            //2 time, 
            //3 value

    var svg = d3.select(this.el);
    var xpadding = 30;
    var ypadding = this.numAxis*40;

    var minD = this.minD;
    var maxD = this.maxD;

    var xscale =  d3.time.scale()
    .domain([minD, maxD])
    .range([this.width-ypadding, ypadding]); 
    var yscale = d3.scale.linear()
    .domain([d3.min(dataset, function(d) { return d[3]; })-1, d3.max(dataset, function(d) { return d[3]; })+1])
    .range([this.height - xpadding, xpadding]);

    var xAxis = d3.svg.axis()
    .scale(xscale)
    .orient("bottom")
    .ticks(5);

    var yAxis = d3.svg.axis()
    .scale(yscale)
    .orient("left");

    var col = this.randomColor();

    debugger;
    svg.selectAll("circle")
      .data(dataset, function(d) { return d[0]; })
      .enter()
      .append("circle")
      .attr("cx", function(d) {
        debugger;
        return xscale(d[2]);
      })
      .attr("cy", function(d) {
        return yscale(d[3]);
      })
      .attr("r", 5)      
      .attr("data-taId",function(d) {
        return d[1];
      })
      .attr("data-dpId",function(d) {
        return d[0];
      })
      .attr("fill",col);

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

  renderNames: function(atrbName){
    var svg = d3.select(this.el);
    var xpadding = 30;
    var ypadding = this.numAxis*40;

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
      .text("" + atrbName);

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

