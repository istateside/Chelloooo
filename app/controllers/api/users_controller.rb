module Api
  class UsersController < ApiController
    def search
      @user = User.find_by_email(params[:query])
      if @user
        render json: @user
      else
        render json: {}, status: :unprocessable_entity
      end
    end
  end
end
