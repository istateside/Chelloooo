Chellooo.Collections.BoardLists = Backbone.Collection.extend({
  comparator: 'ord',

  model: Chellooo.Models.BoardList,

  url: 'api/lists',

  initialize: function(models, options) {
    this.board = options.board;
  },
});
