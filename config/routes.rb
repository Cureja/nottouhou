Rails.application.routes.draw do
  get '/login' => 'login#index'
  post '/login' => 'login#create'

  get '/register' => 'register#index'
  post '/register' => 'register#create'

  get '/profile' => 'profile#index'

  get '/logout' => 'logout#index'

  get '/game' => 'game#index'

  get '/highscores' => 'highscores#index'
  post '/highscores' => 'highscores#create'

    get '/replays' => 'replays#index'


  root 'front#index'

  #match ':controller(/:action(/:id))', :via => :get
  #match ':controller(/:action(/:id))', :via => :post
end
