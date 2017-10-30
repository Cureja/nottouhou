
class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  
  def redirect_if_logged_in
    user = User.find_by(id: session[:user_id])
    if !user.nil? then
      redirect_to :controller => "profile", :action => "index"
    end
  end
end
