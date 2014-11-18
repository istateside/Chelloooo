Chellooo.Views.ListsNew = Backbone.View.extend({
  initialize: function(options) {
    this.subViews = [];
    this.collection = options.collection;
    this.board = options.board;
  },

  events: {
    "submit form#new-list-form": "submit"
  },

  tagName: 'div',

  className: 'new-list',

  template: JST['lists/new'],

  render: function() {
    var content = this.template();

    this.$el.html(content);
    return this;
  },

  leave: function() {
    this.subViews.forEach(function(subView) {
      subView.leave();
    });
    this.remove();
  },

  submit: function (event) {
    event.preventDefault();

    var list_params = { list: $(event.target).serializeJSON() }
    list_params.list.board_id = this.board.id;
    var newList = this.collection.create(list_params);
  }
});
