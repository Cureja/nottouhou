
class LogoutController < ApplicationController
  def index
    cookies.delete(:user_id)
    cookies.delete(:remember_token)
    session.delete(:user_id)
    @current_user = nil
    redirect_to :controller => "login", :action => "index"
  end
end
