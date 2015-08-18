HamsterTracker.Views.CorrelationsTable = Backbone.CompositeView.extend({
  initialize: function(){
    // this.collection is correlations collection - fetch in previous view
  },

  template: JST['correlations_table'],

  render: function(){
    var that = this;
    this.collection.fetch({
      success: function(){
        that.$el.html(that.template({
          correlations: that.collection
        }));
      }
    })
    return this;
  }

})