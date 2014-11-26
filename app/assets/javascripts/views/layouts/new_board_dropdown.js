Chellooo.Views.Dropdown = Backbone.View.extend({
  attributes: {
    role: 'menu',
    class: 'dropdown-menu add-menu'
  },

  events: {
    'click .new-board': 'showNewForm',
    'click .invite-user': 'showInviteForm',
    'click .cancel': 'hideForm',
    'submit #new-board-form': 'createBoard',
    'submit #invite-user-form': 'inviteUser'
  },

  template: JST['layout/dropdown'],
  newFormTemplate: JST['layout/_new_form'],
  inviteUserTemplate: JST['layout/_invite_form'],

  createBoard: function(event) {
    var view = this;
    var $form = $(event.target);
    var boardTitle = $form.find('input').val() ||
          'Untitled Board';
    Chellooo.Collections.boards.create({ title: boardTitle }, {
      success: function(board) {
        var id = board.id;
        Backbone.history.navigate('/boards/' + id, { trigger: true });
        view.reset();
      }
    });
    return false;
  },

  inviteUser: function(event) {
    event.preventDefault();
    var view = this;
    var $form = $(event.target);
    var $emailInput = $form.find('input');
    var query = $emailInput.val();
    $.ajax({
      type: "GET",
      url: "api/users/",
      data: { query: query },
      success: function(resp) {
        view.createMembership(resp, $form);
      },
      error: function(resp) {
        $($emailInput.parent()).addClass('has-error');
        $form.find('#email-label').html("<b>Email:</b> User not found!")
      }
    })
  },

  createMembership: function(resp, $form) {
    var membership = new Chellooo.Models.BoardMembership()
    membership.save({
        user_id: resp.id,
        board_id: $( "select.board-select option:selected" ).data('id')
      },
      {
        success: function(resp2) {
          $('.notify').html("Added " + resp.email + "!");
          $form.find('input').val("");
        },
        error: function(resp2) {
          $('.notify').html("Couldn't add " + resp.email + "!");
        }
      }
    );
  },

  render: function() {
    var renderedContent = this.template();
    this.$el.html(renderedContent);
    return this;
  },

  reset: function() {
    this.render();
    this.$el.parent().removeClass('open');
  },

  showNewForm: function() {
    this.$el.html(this.newFormTemplate());
    return false;
  },

  showInviteForm: function() {
    this.$el.html(this.inviteUserTemplate());
    return false;
  },

  hideForm: function(event) {
    this.$el.html(this.template());
    return false;
  },

  tagName: 'ul'
});
