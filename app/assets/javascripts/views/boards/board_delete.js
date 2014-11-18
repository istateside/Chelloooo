Chellooo.Views.BoardDelete = Backbone.View.extend({
  template: JST['boards/delete_modal'],

  initialize: function () {
    this.model.fetch();
    this.listenTo(this.model, 'sync', this.render);
  },

  events: {
    'click .deny': 'dismiss',
    'click .board-modal-backdrop': 'dismiss',
    'click .confirm': 'delete'
  },

  delete: function(event) {
    event.preventDefault();

    this.model.destroy();
    this.remove();
  },

  dismiss: function(event) {
    event.preventDefault();
    this.remove();
  },

  render: function() {
    var content = this.template({ board: this.model });
    this.$el.html(content);
    return this;
  }
})
