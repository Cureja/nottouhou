class SpectateController < ApplicationController
  skip_before_action :verify_authenticity_token
  if !defined? @@games
    @@games = {}
  end

  def index
    @user = current_user
    if @user.nil? then
      redirect_to :controller => "login", :action => "index"
    end
  end

  def create 
    @@games[@user.id] = JSON.stringify(params[:replay])
  end

  def delete 
    @@games[@user.id] = nil;
end
