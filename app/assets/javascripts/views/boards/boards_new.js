Chellooo.Views.BoardsNew = Backbone.View.extend({
  template: JST["boards/new"],

  events: {
    "submit form": "submit"
  },

  render: function() {
    var content = this.template();
    this.$el.html(content);
    return this;
  },

  submit: function (event) {
    event.preventDefault();

    var params = $(event.currentTarget).serializeJSON();
    var newBoard = new Chellooo.Models.Board(params["board"]);

    newBoard.save()
    Chellooo.boards.add(newBoard);
    Backbone.history.navigate('', { trigger: true });
  }
});
