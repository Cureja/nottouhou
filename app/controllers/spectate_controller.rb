
class SpectateController < ApplicationController
  skip_before_action :verify_authenticity_token

  @@games = {}

  def index
    @user = current_user
    if @user.nil? then
      redirect_to :controller => "login", :action => "index"
    end
  end

  def create
    @user = current_user
    @@games[@user.id] = params[:replay]
  end

  def show
    # print "huh #{@@games[params[:user_id].to_i]}"
    @read = @@games[params[:user_id].to_i]
    render :json => {
      :events => @read
    }
  end

  def delete
    @user = current_user
    @@games[@user.id] = nil;
  end
end
