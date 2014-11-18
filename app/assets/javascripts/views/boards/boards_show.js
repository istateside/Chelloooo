Chellooo.Views.BoardsShow = Backbone.CompositeView.extend({

  template: JST['boards/show'],

  tagName: 'div',

  className: 'board-div group',

  events: {
    'sortstop': 'saveOrds',
    "click a#new-list": "showForm"
  },

  orderOptions: {
    modelElement: 'div.list-div',
    modelName: "list",
    subviewContainer: ".list-list"
  },

  initialize: function() {
    this.collection = this.model.lists();
    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.collection, "add remove", this.render);
  },

  addList: function(list) {
    var view = new Chellooo.Views.ListShow({
      model: list,
      collection: list.cards()
    });
    this.addSubview('div.list-list', view);
  },

  leave: function() {
    this.subViews.forEach(function(subView) {
      subView.leave();
    });
    this.remove();
  },

  render: function() {
    var content = this.template({
      board: this.model
    });
    this.$el.html(content);
    this.renderLists();
    this.renderNewList();

    return this;
  },

  renderLists: function() {
    this.model.lists().each(this.addList.bind(this));
    this.$('.list-list').sortable({items: '> .board-list'});
  },

  renderNewList: function() {
    var view = new Chellooo.Views.ListsNew({
      collection: this.collection,
      board: this.model
    });
    this.addSubview('div.list-list', view);
  },

  showForm: function () {
    this.$('div.new-list').fadeToggle();
  }
});
_.extend(Chellooo.Views.BoardsShow.prototype, Chellooo.Utils.OrderedView);
