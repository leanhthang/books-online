Rails.application.routes.draw do
  namespace :admin do
    get 'dashboard/index'
  end

  get 'home/index'

  root to: "home#index"

  devise_for :users, path: '/', :controllers => {
    :sessions => 'users/sessions',
    :registrations => 'users/registrations',
    :passwords => 'users/passwords',
  }

  namespace :admin do |admin|
    devise_for :admins, class_name: "User", path: '/', controllers: {
      :sessions => "admin/users/sessions",
      :registrations => 'admin/users/registrations',
      :passwords => 'users/passwords',
    }

    get 'dashboards', to: 'dashboards#index'
  end
end
