Chellooo.Collections.ListCards = Backbone.Collection.extend({
  initialize: function(models, options) {
    this.list = options.list;
  },

  comparator: 'ord',

  model: Chellooo.Models.ListCard,

  url: 'api/cards',
});