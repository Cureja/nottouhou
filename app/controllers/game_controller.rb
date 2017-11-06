
class GameController < ApplicationController
  def index
    user = session[:user_id]
    if user.nil? then
      redirect_to :controller => "login", :action => "index"
    end
  end
end
