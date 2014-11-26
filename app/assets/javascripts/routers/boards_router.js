Chellooo.Routers.Router = Backbone.Router.extend({
  initialize: function (options) {
    this.$el = options.$el;
    this._currentView = null;

    var dropDownView = new Chellooo.Views.Dropdown({
      collection: Chellooo.Collections.boards
    })
    $('#add-dropdown').append(dropDownView.render().$el)
  },

  routes: {
    '': 'index',
    'board/new': 'newBoard',
    'board/:id': 'showBoard'
  },

  index: function() {
    var router = this;
    if (Chellooo.loggedIn) {
      Chellooo.Collections.boards.fetch({
        success: function() {
          var view = new Chellooo.Views.BoardsIndex({
            collection: Chellooo.Collections.boards
          })
          router._swapView(view);

        }
      });
    } else {
      return
    }

  },

  newBoard: function() {
    var that = this;
    Chellooo.boards.fetch({ success: function() {
      var newView = new Chellooo.Views.BoardsNew({
        collection: Chellooo.boards
      });

      that._swapView(newView);
    }});
  },

  showBoard: function(id) {
    var board = Chellooo.Collections.boards.getOrFetch(id);

    var boardView = new Chellooo.Views.BoardsShow({
      model: board
    });

    this._swapView(boardView);
  },

  _swapView: function(view) {
    var that = this;
    $('div.content').fadeOut(200, function() {
      that._currentView && that._currentView.remove();
      that._currentView = view;
      that.$el.html(view.render().$el);
      $('div.content').fadeIn(200);
    });
  }
});
