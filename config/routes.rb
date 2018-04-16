Rails.application.routes.draw do
  mount Ckeditor::Engine => '/ckeditor'
  get 'chapters', to: "chapters#index"
  get 'chapters/:id/show', to: "chapters#show", as: :chapter_show
  get 'chapters/edit'
  get 'chapters/approve_by'
  get 'chapters/assign_to'

  get "categories", to: "categories#index"
  get 'categories/new'
  get 'categories/create'
  get 'categories/update'
  get 'categories/destroy'
  get 'categories/:id/show', to: "categories#show", as: :category_show
  get 'categories/edit'

  resources :tests

  get "posts", to: "posts#index"
  get 'posts/:id/show', to: "posts#show", as: :post_show
  get 'posts/:id/edit', to: "posts#edit", as: :post_edit
  post 'posts/:id/update', to: "posts#update", as: :post_update
  match 'posts/:id/destroy', to: "posts#destroy", via: [:put, :delete]
  get 'posts/:id/sync_post', to: "posts#sync_post", as: :sync_post
  get 'posts/search', to: "posts#search", as: :post_search
  namespace :posts do
    get 'new'
    get 'create'
  end



  root to: "home#index"

  devise_for :users, path: '/', :controllers => {
    :sessions => 'users/sessions',
    :registrations => 'users/registrations',
    :passwords => 'users/passwords',
  }
end
