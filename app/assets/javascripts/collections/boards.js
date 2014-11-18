Chellooo.Collections.Boards = Backbone.Collection.extend({
  model: Chellooo.Models.Board,
  url: 'api/boards',

  getOrFetch: function(id) {
    var board = this.get(id);

    if (!board) {
      board = new Chellooo.Models.Board({ id: id });
      board.fetch({
        success: function () {
          this.add(board);
        }.bind(this)
      });
    } else {
      board.fetch();
    }

    return board
  }
});

Chellooo.Collections.boards = new Chellooo.Collections.Boards
