Chellooo.Views.ItemsShow = Backbone.View.extend({
  template: JST['items/show'],
  tagName: 'li',

  initialize: function() {
    this.render();
    var that = this;
  },

  events: {
    "click": "toggleDone"
  },

  toggleDone: function () {
    var done = this.model.get('done');
    var $el = this.$el;
    this.model.save("done", !done);
    $el.toggleClass("done");
  },

  render: function () {
    var content = this.template({ item: this.model });
    if (this.model.get('done')) {
      this.$el.addClass('done');
    }
    this.$el.html(content);
    return this;
  }
});
