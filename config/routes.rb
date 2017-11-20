
Rails.application.routes.draw do
  get '/login' => 'login#index'
  post '/login' => 'login#create'

  get '/register' => 'register#index'
  post '/register' => 'register#create'

  get '/profile' => 'profile#index'

  get '/logout' => 'logout#index'

  get '/game' => 'game#index'

  get '/driveauth' => 'drive_auth#index'
  post '/driveauth' => 'drive_auth#create'

  get '/authredirect' => 'auth_redirect#index'
  post '/authredirect' => 'auth_redirect#create'

  get '/highscores' => 'highscores#index'
  post '/highscores' => 'highscores#create'

    get '/replays' => 'replays#index'


  root 'front#index'

  #match ':controller(/:action(/:id))', :via => :get
  #match ':controller(/:action(/:id))', :via => :post
end
