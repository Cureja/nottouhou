
class ProfileController < ApplicationController
  skip_before_action :verify_authenticity_token
  
  def index
    @user = User.find_by(id: session[:user_id])
    if @user.nil? then
      redirect_to :controller => "login", :action => "index"
    end
  end
end
