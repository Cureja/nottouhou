
class LoginController < ApplicationController
  skip_before_action :verify_authenticity_token
  
  def create
    username = params[:username]
    password = params[:password]
    user = User.find_by(username: username)
    if user.nil? || !user.authenticate(password) then
      render :json => {
        :error => "Invalid username or password"
      }
      return
    end
    session[:user_id] ||= user.id
    
    render :json => {
      :redirect => "../profile/",
      :authtoken => ""
    }
  end
  
  def index
    redirect_if_logged_in
  end
end
