Chellooo::Application.routes.draw do
  root to: 'static_pages#root'

  resources :users
  resource :session

  namespace :api, defaults: { format: :json } do
    resources :boards, only: [:create, :update, :destroy, :show, :index]
    resources :lists, only: [:create, :update, :destroy]
    resources :cards, only: [:create, :update, :destroy, :show]
    resources :items, only: [:create, :update, :destroy]
    resources :board_memberships, only: [:index, :create]
    get 'users', to: 'users#search'
  end
end
