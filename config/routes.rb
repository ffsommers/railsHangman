Rails.application.routes.draw do
  get 'hangman/index'

  root 'hangman#index'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
