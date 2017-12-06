
class GameController < ApplicationController
  def index
    user = current_user
    @user = current_user
    if @user.nil? then
      redirect_to :controller => "login", :action => "index"
    end
    @replay = params[:replay];
    @stage = params[:stage]
    @spectate = params[:spectate]
    @follow = params[:follow]
    if @replay.nil? then
      @replay = false;
    end

    if @spectate.nil? then
      @spectate = false;
    end
    if @follow.nil? then
      @follow = false;
    end

    if @stage.nil? then
      @stage = 0;
    end

  end
end
