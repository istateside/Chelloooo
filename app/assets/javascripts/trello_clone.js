window.Chellooo = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  Utils: {},
  initialize: function() {
    window.Chellooo.boards = new Chellooo.Collections.Boards();
    Chellooo.boards.fetch();

    Chellooo.router = new Chellooo.Routers.Router({
      "$el": $('div.content')
    });

    Backbone.history.start();
  }
};

$(document).ready(function(){
  Chellooo.initialize();
});
