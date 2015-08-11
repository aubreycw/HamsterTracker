Rails.application.routes.draw do

  root to: "welcome#index"

  resource :session
  resources :users

  namespace :api do
    resources :tracking_subjects, only: [:index, :new, :destroy, :update] 
  end

end
