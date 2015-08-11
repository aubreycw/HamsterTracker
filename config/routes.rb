Rails.application.routes.draw do

  resource :session
  resources :users

  namespace :api do
    resources :tracking_subjects, only: [:index, :new, :destroy, :update] 
  end

  root to: "static_pages#index"
end
