
class GameController < ApplicationController
  def index
    user = current_user
    @user = current_user
    if @user.nil? then
      redirect_to :controller => "login", :action => "index"
    end
    @replay = params[:replay]
    @stage = params[:stage]
    @spectate = params[:spectate]
    if @spectate  then
      @spectate = nil
    end

    if @stage.nil? then
      @stage = 1;
    end
    
  end
end
