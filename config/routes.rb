
Rails.application.routes.draw do
  get '/login' => 'login#index'
  post '/login' => 'login#create'
  
  get '/register' => 'register#index'
  post '/register' => 'register#create'
  
  get '/profile' => 'profile#index'

  root 'front#index'
  
  #match ':controller(/:action(/:id))', :via => :get
  #match ':controller(/:action(/:id))', :via => :post
end
