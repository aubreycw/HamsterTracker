HamsterTracker.Views.CorrelationsTable = Backbone.CompositeView.extend({
  initialize: function(){
    // this.collection is correlations collection - fetch in previous view
  },

  template: JST['correlations_table'],

  // render: function(){
  //   var that = this;
  //   this.collection.fetch({
  //     success: function(){
  //       that.$el.html(that.template({
  //         correlations: that.collection
  //       }));
  //     }
  //   })
  //   return this;
  // }

  attributes: {
    width: 200,
    height: 200
  },

  make_columns: function(){
    var hash = {};
    var that = this;
    this.collection.each(function(correlation){
      name = correlation.escape("atrb_x_name");
      if (hash[name] === undefined){
        thing = [correlation.escape("atrb_y_name"), 
          correlation.escape("atrb_y_id"), 
          correlation.escape("value")];
        hash[name] = [name, correlation.escape("atrb_x_id"), thing];
      } else {
        thing = [correlation.escape("atrb_y_name"), 
          correlation.escape("atrb_y_id"), 
          correlation.escape("value")];
        hash[name].push(thing);
      }
    })

    var columns = [];
    Object.keys(hash).forEach(function(key){
      columns.push(hash[key]);
    })
    return columns;
  },

  make_table: function(columns){
    var len = columns[0].length - 2
    var table = []
    var title = []
    columns[0].slice(2).forEach(function(atrb){
      title.unshift(atrb[0]);
    });
    title.unshift("Correlations");
    table.push(title);

    columns.forEach(function(col){
      var row = [];
      var n = 0;
      col.slice(2).forEach(function(atrb){
        row.unshift(atrb[2]);
      });
      row.unshift(col[0]);
      table.push(row);
    });
    return table;
  },

  render: function(){
    d3.select(this.el).append("table")
    .style("border-collapse", "collapse")
    .style("border", "2px black solid")

    var columns = this.make_columns();
    var that = this;
    var table = this.make_table(columns);
    that.renderTable(table)
  },

  renderTable: function(dataset){
    
    var svg = d3.select(this.el);

    svg.selectAll("tr")
    .data(dataset)
    .enter().append("tr")
    
    .selectAll("td")
    .data(function(d){return d;})
    .enter().append("td")
    .style("border", "1px black solid")
    .style("padding", "10px")
    .text(function(d){return d;})
    .style("font-size", "12px");
  }

})