module Api
  class BoardMembershipsController < ApiController
    def index
      @board = Board.find(params[:board_id])
      if @board
        render json: @board.board_memberships
      else
        render json: {}, status: :unprocessable_entity
      end
    end

    def create
      @board = Board.find(params[:board_id])
      @membership = @board.board_memberships.new({ user_id: params[:user_id] })

      if @membership.save
        render json: @membership
      else
        render json: @membership.errors.full_messages, status: :unprocessable_entity
      end
    end
  end
end
