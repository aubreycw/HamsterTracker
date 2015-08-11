Rails.application.routes.draw do

  root to: "static_pages#index"

  resource :session
  resources :users

  namespace :api do
    resources :tracking_subjects, only: [:index, :create, :destroy, :update, :show] 
  end

end
