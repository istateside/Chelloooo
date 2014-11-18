module Api
  class ItemsController < ApiController
    def create
      @card = Card.find(item_params[:card_id])
      @item = @card.items.new(item_params)
      if @item.save
        render json: @item
      else
        render json: @item.errors.full_messages, status: :unprocessable_entity
      end
    end

    def update
      @item = Item.find(params[:id])
      if @item.update(item_params)
        render json: @item
      else
        render json: @item.errors.full_messages, status: :unprocessable_entity
      end
    end

    def destroy
    end

    private
    def item_params
      params.require(:item).permit(:title, :card_id, :done)
    end
  end
end
