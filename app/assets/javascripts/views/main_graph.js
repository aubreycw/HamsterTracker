HamsterTracker.Views.MainGraph = Backbone.CompositeView.extend({

  initialize: function(options){
    this.colorLoc = -1;
    this.dataPointsList = options.dataPointsList;
    this.atrbColors = [];
    this.shakeOn = true;
    var that = this;
    this.width = 800;
    this.height = 500;
    this.legendWidth = 100;
    this.tsId = null;
    HamsterTracker.unshownAttributes = HamsterTracker.unshownAttributes || [];
  },

  events: {
    "click circle": "openCircle",
    "mouseenter circle": "highlightCircle",
    "mouseleave circle": "unHighlightCircle",
    "click .legend": "toggleAttribute",
    "click .shake-toggle": "toggleShake"
  },

  template: JST['main_graph'],

  tagName:"svg",

  attributes: {
    width: 900,
    height: 500
  },

  className:"main-graph",

  nameSpace: "http://www.w3.org/2000/svg",

// ---------------------------------- Events ------------------------

  openCircle: function(event){
    Backbone.history.navigate(
      "#/tracking_subjects/" + 
      event.currentTarget.dataset.tsId + 
      "/tracking_attributes/" + 
      event.currentTarget.dataset.taId + 
      "/data_points/" +
      event.currentTarget.dataset.dpId +
      "/edit", 
      { trigger: true }
      );
  },

  highlightCircle: function(event){
    var circle = $(event.currentTarget);
    this.circleColor = circle.attr("fill")
    circle.attr("fill", "black");
  },

  unHighlightCircle: function(event){
    $(event.currentTarget).attr("fill", this.circleColor);
  },

  toggleAttribute: function(event){
    var taId = parseInt(event.currentTarget.dataset.taId);
    var index = HamsterTracker.unshownAttributes.indexOf(taId)
    if ( index < 0){
      HamsterTracker.unshownAttributes.push(taId);
    } else {
      HamsterTracker.unshownAttributes.splice(index, 1)
    }
    this.$el.empty();
    this.render();
  },

  toggleShake: function(event){
    this.shakeOn = !this.shakeOn;
    this.$el.empty();
    this.render();
  },

// ---------------------------------- Setup ------------------------

  // Takes data point collection and returns a list a data points for it
  convertDataPointsColl: function(dataPoints){
    var dataList = [];
    var that = this;
    dataPoints.fetch({
      success: function(){
        dataPoints.each(function(dataPoint){
          var atrbId = dataPoint.get("tracking_attribute_id");
          that.atrbColors[atrbId] = that.atrbColors[atrbId] || that.nextColor();
          var time = dataPoint.time();
          var notes = "No notes"
          var dpNotes = dataPoint.get("notes")
          if (dpNotes){
            notes = dpNotes;
          }
          dataList.push([
            dataPoint.get("id"), 
            dataPoint.get("tracking_attribute_id"), 
            time, 
            dataPoint.get("value"),
            dataPoint.get("tracking_subject_id"),
            notes
            ])

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
        that.tsId = coll.trackingSubjectId;
        var atrb = new HamsterTracker.Models.Attribute({
          trackingSubjectId: coll.trackingSubjectId,
          id: coll.trackingAttributeId
        });
        atrb.fetch({
          success: function(atrbX){
            var atrbId = atrbX.get("id");
            that.atrbColors[atrbId] = that.atrbColors[atrbId] || that.nextColor();
            that.atrbNamesList.push([atrbX.get("name"), atrbId, atrbX.get("units")]);
            that.toDoNames -= 1;
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
    this.atrbOrder = []
    this.toDo = this.dataPointsList.length;
    this.toDoNames = this.toDo;
    this.numAxis = this.toDo - HamsterTracker.unshownAttributes.length;
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
    this.legendPadding = 40;
    var that = this;
    this.dataListList.sort();
    this.dataListList.forEach(function(dataList){
      if (!(dataList[0] === undefined)){
        that.atrbOrder.push(dataList[0][1]);
        that.renderGraph(dataList);
      }
    });
  },

  renderNamesHandler: function(){
    if (this.toDoNames > 0){
      return null;
    }
    this.axisPadding = 40;
    var that = this;
    this.atrbOrder.forEach(function (atrbId){
      that.atrbNamesList.forEach(function(atrbName){
        if (atrbName[1] === atrbId){
          that.renderNames(atrbName);
        }
      });
    });
    var svg = d3.select(this.el);
    svg.append("text")
      .attr("class", "shake-toggle")
      .attr("font-size", "15px")
      .attr("x", this.width - 90)
      .attr("y", this.height - 25)
      .text("Toggle shake")
      .attr("fill", "black");

  },

  COLORS: ["#B9EC47", "#3EC0B7", "#F7B15E", "#FF82C3", "#3EC0B7", "#907A9D"],

  nextColor: function() {
    this.colorLoc += 1;
    return this.COLORS[(this.colorLoc%(this.COLORS.length))]
  },

  randomColor: function () {
    var color = "#";
    for (var i = 0; i < 6; i++) {
      color += "0123456789ABCDEF"[Math.floor((Math.random() * 16))];
    }
    return color;
  },

  shake: function(x){
    if (this.shakeOn){
      return x*(1+(Math.random()*2-1)*0.005);
    }
    return x;
  },

  renderGraph: function(dataset){

    if (!dataset[0][0]){
      return this;
    }

    if (HamsterTracker.unshownAttributes.indexOf(dataset[0][1]) > -1){
      return this;
    }
            //0 id, 
            //1 tracking_attribute_id, 
            //2 time, 
            //3 value,
            //4 tracking_subject_id
            //5 notes
    var svg = d3.select(this.el);
    var xpadding = 30;
    var ypadding = this.numAxis*40;

    var minD = this.minD
    var maxD = this.maxD;

    var xscale =  d3.time.scale()
      .domain([minD, maxD])
      .range([this.width - this.legendWidth, ypadding]); 

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

    var col = this.atrbColors[dataset[0][1]];

    var that = this;
    svg.selectAll("circle")
      .data(dataset, function(d) { return d[0]; })
      .enter()
      .append("circle")
      .attr("cx", function(d) {
        return that.shake(xscale(d[2]));
      })
      .attr("cy", function(d) {
        return that.shake(yscale(d[3]));
      })
      .attr("r", 5)      
      .attr("data-taId",function(d) {
        return d[1];
      })
      .attr("data-dpId",function(d) {
        return d[0];
      })
      .attr("data-tsId",function(d) {
        return d[4];
      })
      .attr("fill",col)
      // .attr("opacity",0.5)
      .append("svg:title")
      .text(function(d) { return d[5]; });

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
    var fontWeight = "bold";
    if (HamsterTracker.unshownAttributes.indexOf(atrbName[1]) > -1){
      fontWeight = "lighter";
    }

    svg.append("text")
      .attr("class", "legend")
      .attr("font-size", "20px")
      .attr("font-weight", fontWeight)
      .attr("data-taId", atrbName[1])
      .attr("x", this.width*0.9)
      .attr("y", this.legendPadding + 10)
      .text(atrbName[0])
      .attr("fill", this.atrbColors[atrbName[1]]);

    this.legendPadding += 40;

    if (HamsterTracker.unshownAttributes.indexOf(atrbName[1]) > -1){
      return this;
    }

    svg.append("text")
      .attr("class", "x label")
      .attr("x", this.width*0.5)
      .attr("y", this.height - xpadding)
      .text("Time")
      .attr("font-size", "11px")
      .attr("font-family", "sans-serif");

    svg.append("text")
      .attr("class", "y label")
      .attr("x", -(this.width - ypadding)*0.4)
      .attr("y", this.axisPadding + 10)
      .attr("transform", "rotate(-90)")
      .text(atrbName[0] + " (" + atrbName[2] + ")")
      .attr("fill", this.atrbColors[atrbName[1]]);



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

