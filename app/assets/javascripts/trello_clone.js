window.Chellooo = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  Utils: {},
  initialize: function() {
    Chellooo.Collections.boards = new Chellooo.Collections.Boards()
    Chellooo.router = new Chellooo.Routers.Router({
      "$el": $('div.content')
    });
    Backbone.history.start();
  }
};

$(document).ready(function(){
  Chellooo.initialize();
});
