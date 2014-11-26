Chellooo.Views.BoardsIndex = Backbone.View.extend({
  initialize: function() {
    this.listenTo(this.collection, 'remove sync', this.render);
  },

  template: JST['boards/index'],

  className: 'boards-index',

  events: {
    "click button.delete-btn": "delModal"
  },

  render: function() {
    var content = this.template({
      boards: this.collection,
      shared_boards: this.collection.sharedBoards()
    });

    this.$el.html(content);
    return this;
  },

  delModal: function(event) {
    event.preventDefault();
    var id = $(event.target).data('id');

    var view = new Chellooo.Views.BoardDelete({
      model: this.collection.get(id)
    })
    $('body').prepend(view.render().$el);
    view.delegateEvents();
  }
})
