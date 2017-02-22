Rails.application.routes.draw do
  # get 'hangman/index'
  get 'signup' => 'users#new'
  resources :users
  get 'games' => 'hangman#index'
  resources :hangman
  get 'login' => 'sessions#new'
  resources :sessions

  post 'scores' => 'hangman#scores'

  post 'login' => 'sessions#create'

  delete 'logout' => 'sessions#destroy'

  root 'sessions#new'

  get 'leaders' => 'leaderboard#leader'
  post 'dictionary' => 'hangman#index'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
