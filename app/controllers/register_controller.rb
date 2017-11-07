class RegisterController < ApplicationController  
  add_flash_types :error, :username, :password, :password_confirm
  
  def add_error(e)
    if flash[:error].length > 0 then
      flash[:error] += "<br>"
    end
    flash[:error] += e
  end
  
  def do_error
    flash[:username] = @username
    flash[:password] = @password
    flash[:password_confirm] = @password_confirm
    redirect_to :controller => "register", :action => "index"
  end
  
  def create
    flash[:error] = ""
    @username = params[:username]
    @password = params[:password]
    @password_confirm = params[:password_confirm]
    if !@username.match(/[a-zA-Z0-9\-]{3,20}/) then
      add_error "Invalid username"
    end
    if !@password.match(/[a-zA-Z0-9]{6,20}/) then
      add_error "Passwords contains illegal characters or has illegal length"
    end
    if @password != @password_confirm then
      add_error "Passwords do not match"
    end
    user = User.find_by(username: @username)
    if !user.nil? then
      add_error "Username is taken"
    end
    if flash[:error].length > 0 then
      do_error
    else
      user = User.create(username: @username, password: @password, password_confirmation: @password)
      session[:user_id] ||= user.id
      remember user #uses application controller
      redirect_if_logged_in
    end
  end
  
  def index
    redirect_if_logged_in
  end
end
