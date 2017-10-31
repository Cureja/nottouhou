
class RegisterController < ApplicationController
  skip_before_action :verify_authenticity_token
  
  def create
    username = params[:username]
    if !username.match(/[a-zA-Z0-9\-]{3,20}/) then
      render plain: "0 Invalid username"
      return
    end
    password = params[:password]
    password2 = params[:password_confirm]
    if password != password2 then
      render :json => {
        :error => "Passwords do not match"
      }
      return
    end
    if !password.match(/[a-zA-Z0-9]{6,20}/) then
      render :json => {
        :error => "Passwords contains illegal characters or has illegal length"
      }
      return
    end
    user = User.find_by(username: username)
    if !user.nil? then
      render :json => {
        :error => "Username is taken"
      }
      return
    end
    user = User.create(username: username, password: password, password_confirmation: password)
    session[:user_id] ||= user.id
    
    # TODO use flash object for error messages
    
    redirect_if_logged_in
    
    # render :json => {
    #   :redirect => "../profile/",
    #   :authtoken => ""
    # }
  end
  
  def index
    redirect_if_logged_in
  end
end
