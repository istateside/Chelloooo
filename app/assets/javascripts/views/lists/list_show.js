Chellooo.Views.ListShow = Backbone.CompositeView.extend({
  orderOptions: {
    modelElement: 'div.list-card',
    modelName: "card",
    subviewContainer: ".card-list"
  },

  tagName: 'div',

  className: 'list-div board-list',

  template: JST['lists/show'],

  attributes: function() {
    return { 'data-list-id': this.model.id }
  },

  events: {
    "click a#new-card": "showForm",
    "sortreceive": "receiveCard",
    "sortstop": "saveCards",
    "sortremove": "removeCard"
  },

  initialize: function() {
    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.collection, "add", this.addCard);
    this.listenTo(this.collection, "remove", this.render);
  },

  addCard: function(card) {
    var view = new Chellooo.Views.CardsShow({ model: card });
    this.addSubview('.card-list', view)
  },

  deleteList: function() {
    event.preventDefault();
    this.model.destroy();
  },

  leave: function() {
    this.subViews.forEach(function(subView) {
      subView.leave();
    });

    this.remove();
  },

  render: function() {
    var that = this;
    var content = this.template({ list: this.model });
    this.$el.html(content);
    this.$el.data('list-id', this.model.id);

    this.renderCards();
    this.renderNewCard();
    return this;
  },

  renderCards: function()  {
    this.model.cards().each(this.addCard.bind(this));
    this.$('.card-list').sortable({items: '> .list-card', connectWith: '.card-list'});
  },

  renderNewCard: function() {
    var newView = new Chellooo.Views.CardsNew({ collection: this.collection });
    this.addSubview('.new-list-space', newView);
  },

  receiveCard: function(event, ui) {
    var $cardList = ui.item,
        cardId = $cardList.data('id'),
        newOrd = $cardList.index();

    var card = new Chellooo.Models.Card(
      {
        id: cardId,
        list_id: this.model.id,
        ord: newOrd
      }
    );
    card.save();
    this.collection.add(card, {silent: true});
    this.saveCards(event);
  },

  removeCard: function(event, ui) {
    var $cardDiv = ui.item,
      cardId = $cardDisplay.data('card-id'),
      cards = this.model.cards(),
      cardToRemove = cards.get(cardId),
      cardSubviews = this.subviews('.card-list');
    cards.remove(cardToRemove);

    var subviewToRemove = _.findWhere(cardSubviews, {model: cardToRemove});
    cardSubviews.splice(cardSubviews.indexOf(subviewToRemove), 1);
  },

  saveCards: function(event) {
    event.stopPropagation();
    this.saveOrds();
  },

  showForm: function(event) {
    event.preventDefault();
    this.$('div.new-card').slideToggle(200);
  }
});

_.extend(Chellooo.Views.ListShow.prototype, Chellooo.Utils.OrderedView);
