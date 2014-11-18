Chellooo.Views.CardsShow = Backbone.CompositeView.extend({
  initialize: function() {
    this.listenTo(this.model, "sync change", this.render);
    this.listenTo(this.model.items(), 'add', this.newItem);
  },

  events: {
    "click": "showModal",
    "click .delete-btn.card": "deleteCard"
  },

  tagName: 'div',
  className: 'card-div list-card panel panel-default',

  attributes: function() {
    return {
      'data-card-id': this.model.id
      }
  },

  template: JST['cards/show'],

  render: function() {
    var content = this.template({ card: this.model });
    this.$el.html(content);
    return this;
  },
  leave: function() {
    this.subViews.forEach(function(subView) {
      subView.leave();
    });
    this.remove();
  },

  deleteCard: function(event) {
    event.preventDefault();
    event.stopPropagation();
    this.model.destroy();
  },

  showModal: function(event) {
    event.preventDefault();
    var view = new Chellooo.Views.CardModal({
      model: this.model
    })
    $('body').prepend(view.render().$el);
    view.delegateEvents();
  }
});
