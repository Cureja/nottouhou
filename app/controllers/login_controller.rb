
class LoginController < ApplicationController
  skip_before_action :verify_authenticity_token
  
  def create
    username = params[:username]
    password = params[:password]
    user = User.find_by(username: username)
    if user.nil? || !user.authenticate(password) then
      render plain: "0 Invalid username or password"
      return
    end
    # should be good
    render plain: "1"
  end
end
