class SpectateController < ApplicationController
  skip_before_action :verify_authenticity_token
  
  @@games = {}

  #@@magic = nil
  

  def index
    @user = current_user
    if @user.nil? then
      redirect_to :controller => "login", :action => "index"
    end
  end

  def create 
    @user = current_user
    @@games[@user.id] = params[:replay]
    print "create @@games[#{@user.id}].nil? = #{@@games[@user.id].nil?}"
    #print "create #{@@games[4].nil?}"
    render :json => {}
  end

  def show
    print "show @@games[#{params[:user_id]}].nil? = #{@@games[params[:user_id].to_i].nil?}"
    #print "show #{@@games[4].nil?}"
    @read = @@games[params[:user_id].to_i]
    render :json => {
      :events => @read
    }
  end

  def delete
    # @user = current_user
    # @@games[@user.id] = nil
  end
end
