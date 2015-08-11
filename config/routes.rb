Rails.application.routes.draw do

  resource :session
  resources :users

  namespace :api do
    resources :tracking_subjects, only: [:index, :new, :destroy, :update] 
  end

  root "welcome#index"
end
