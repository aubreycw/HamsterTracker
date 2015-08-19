HamsterTracker.Views.SubjectShowGraph = Backbone.CompositeView.extend({
  initialize: function(options){
    this.users = options.users
    this.listenTo(this.model, 'sync destroy', this.render);
    var dataPointsList = [];
    var that = this;
    var attributes = new HamsterTracker.Collections.Attributes({
      trackingSubjectId: this.model.get("id")
    });
    attributes.fetch({
      success: function(){
        attributes.each(function(attribute){
          that.addDataPoints(dataPointsList, attribute);
      });
      that.addGraph(attributes, dataPointsList);
      that.addCorrelations();
      that.addMoreInfo(attributes);
      }
    });
  },

  template: JST['tracking_subject_show'],

  events: {
    "click .toggle_public": "togglePublic",
    'dblclick .editable': 'editField',
    'blur .edit-input': 'saveField',
    "click .delete": "destroySubject",
    "click .download": "startDownloadCSV",
    "click .download-with-notes": "startDownloadCSVnotes"
  },

  addDataPoints: function(dataPointsList, attribute){
    var dataPoints = new HamsterTracker.Collections.DataPoints({
      trackingSubjectId: attribute.get("tracking_subject_id"), 
      trackingAttributeId: attribute.get("id")
    });
    dataPointsList.push(dataPoints);
  },

  addGraph: function(attributes, dataPointsList){
    var graph = new HamsterTracker.Views.MainGraph({
      collection: attributes,
      dataPointsList: dataPointsList,
    });

    this.addSubview("div.graph", graph);
  },

  addMoreInfo: function(attributes){
    var moreInfo = new HamsterTracker.Views.MoreInfo({
      collection: attributes,
      users: this.users
    });
    this.addSubview("div.more-info", moreInfo);
  },

  addCorrelations: function(){
    var that = this;
    var correlations = new HamsterTracker.Collections.Correlations({
      trackingSubjectId: this.model.get("id")
    });
    correlations.fetch({
      success: function(){
        var correlations_table = new HamsterTracker.Views.CorrelationsTable({
          collection: correlations
        });
        that.addSubview("div.correlations-table", correlations_table);
      }
    })
  },

  editField: function (event) {
    event.preventDefault();
    var $currentTarget = $(event.currentTarget);
    var $input = $("<input class='edit-input'>");
    $input.val(this.model.escape("name"));
    $currentTarget.removeClass('editable');
    $currentTarget.html($input);
    $input.focus();
  },

  saveField: function (event) {
    event.preventDefault();
    var newVal = $(event.currentTarget).val();
    this.model.set("name", newVal);
    this.model.save();
    this.render();
  },
  
  render: function(){
    var that = this;
    var is_public = this.model.get("public")
    if (is_public === null){
      is_public = true;
    }
    var content = that.template({
      subject: that.model,
      is_public: is_public
    });
    that.$el.html(content);
    that.attachSubviews();
    return this;
  },

  destroySubject: function(event){
    this.model.destroy();
    this.remove();
    Backbone.history.navigate("#",{ trigger: true });
  },

  togglePublic: function (event) {
    event.preventDefault();
    var is_public = this.model.get("public")
    if (is_public || is_public === null || is_public === "true" ){
      is_public = true;
    } else {
      is_public = false;
    }
    var that = this;
    this.is_public = is_public
    this.model.save({"public": !that.is_public}, {
      success: function(){
        that.render();
      },
      error: function(){
        console.log("there was an error");
      }
      });
  },

  startDownloadCSV: function(event, notes){
    var data = new HamsterTracker.Collections.DataForCSV({
      trackingSubjectId: this.model.get("id")
    })
    var that = this;
    data.fetch({
      success: function(){
        if (!!notes){
          that.downloadCSV(data, true);
        } else {
          that.downloadCSV(data, false);
        } 
      }
    })
  },

  startDownloadCSVnotes: function(event){
    this.startDownloadCSV(event, true);
  },

  downloadCSV: function(data, notes){
    var file = encodeURI(this.buildCSV(data, notes));
    window.open(file);
  },

  buildCSV: function(data_in_collection, notes){
    var csvString = "data:text/csv;charset=utf-8,";
    var name = "no_notes";
    if (notes){
      name = "with_notes";
    }
    data_in_collection.each(function(data){
      n = data.get(name).length
      data.get(name).forEach(function(row, index){
        csvString += row.join(",") ;
        if (index < n){
          csvString += "\n";
        }
      }); 
    });
    return csvString;
  }

})
