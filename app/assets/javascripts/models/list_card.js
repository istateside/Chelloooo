Chellooo.Models.ListCard = Backbone.Model.extend({
  urlRoot: 'api/cards',
  items: function() {
    this._items = this._items ||
      new Chellooo.Collections.CardItems([], { card: this });
    return this._items;
  },

  parse: function(payload) {
    if (payload.items) {
      this.items().set(payload.items, { parse: true });
      delete payload.items;
    }

    return payload;
  }
});
