
class GameController < ApplicationController
  def index
    user = current_user
    if user.nil? then
      redirect_to :controller => "login", :action => "index"
    end
    @stage = params[:stage]
    if @stage.nil? then
      # handle errors
    end
    # also need to check that the user has access to this stage
  end
end
