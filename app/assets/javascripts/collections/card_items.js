Chellooo.Collections.CardItems = Backbone.Collection.extend({
  initialize: function(models, options) {
    this.card = options.card;
  },

  model: Chellooo.Models.CardItem,

  url: 'api/cards',
});