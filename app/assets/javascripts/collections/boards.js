Chellooo.Collections.Boards = Backbone.Collection.extend({
  model: Chellooo.Models.Board,
  url: 'api/boards',

  getOrFetch: function(id) {
    var board = this.get(id);
    if (!board) {
      board = this.sharedBoards().get(id);
    }
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
  },

  sharedBoards: function() {
    this._sharedBoards = this._sharedBoards ||
      new Chellooo.Collections.Boards();
    return this._sharedBoards;
  },

  parse: function(payload) {
    if (payload.shared_boards) {
      this.sharedBoards().set(payload.shared_boards);
      delete payload.shared_boards;
    }
    return payload.boards;
  }
});
