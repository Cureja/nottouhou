
class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  def redirect_if_not_logged_in
    user = current_user
    if user.nil? then
      redirect_to :controller => "login", :action => "index"
      return true
    end
    return false
  end

  def redirect_if_logged_in
    user = current_user
    if !user.nil? then
      redirect_to :controller => "profile", :action => "index"
      return true
    end
    return false
  end

  def remember(user)
    user.remember
    cookies.permanent.signed[:user_id] = user.id
    cookies.permanent[:remember_token] = user.remember_token
  end

  def current_user
    if (user_id = session[:user_id])
      @current_user ||= User.find_by(id: user_id)
    elsif (user_id = cookies.signed[:user_id])
      user = User.find_by(id: user_id)
    elsif user && user.authenticated?(cookies[:remember_token])
      session[:user_id] = user.id
      @current_user = user
    end
  end
end
