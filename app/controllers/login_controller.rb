
class LoginController < ApplicationController
  add_flash_types :error, :username, :password
  
  def add_error(e)
    if flash[:error].length > 0 then
      flash[:error] += "<br>"
    end
    flash[:error] += e
  end
  
  def do_error
    flash[:username] = @username
    flash[:password] = @password
    redirect_to :controller => "login", :action => "index"
  end
  
  def create
    flash[:error] = ""
    @username = params[:username]
    @password = params[:password]
    user = User.find_by(username: @username)
    if user.nil? || !user.authenticate(@password) then
      add_error "Invalid username or password"
    end
    if flash[:error].length > 0 then
      do_error
    else
      session[:user_id] ||= user.id
      cookies.permanent.signed[:user_id] = user.id
      redirect_if_logged_in
    end
  end
  
  def index
    redirect_if_logged_in
  end
end
