Chellooo.Models.BoardList = Backbone.Model.extend({
  cards: function() {
    this._cards = this._cards ||
      new Chellooo.Collections.ListCards([], { list: this });
    return this._cards;
  },

  parse: function(payload) {
    if (payload.cards) {
      this.cards().set(payload.cards, { parse: true });
      delete payload.cards;
    }

    return payload;
  }
});
