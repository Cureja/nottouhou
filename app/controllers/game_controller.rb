
class GameController < ApplicationController
  def index
    user = current_user
    if user.nil? then
      redirect_to :controller => "login", :action => "index"
    end
  end
end
