Rails.application.routes.draw do

  root to: "static_pages#index"

  resource :session
  resources :users

  namespace :api do
    resources :tracking_subjects, only: [:index, :create, :destroy, :update, :show] do 
      resources :tracking_attributes, only: [:index, :create, :destroy, :update, :show] do
        resources :data_points, only: [:index, :create, :destroy, :update]
      end
    end
  end
end
