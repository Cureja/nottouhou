Rails.application.routes.draw do
<<<<<<< HEAD
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
=======
  get '/login' => 'login#index'
  post '/login' => 'login#create'

  get '/register' => 'register#index'
  post '/register' => 'register#create'

  get '/profile' => 'profile#index'

  get '/logout' => 'logout#index'

  get '/game' => 'game#index'

  root 'front#index'

  #match ':controller(/:action(/:id))', :via => :get
  #match ':controller(/:action(/:id))', :via => :post
>>>>>>> frontpage
end
