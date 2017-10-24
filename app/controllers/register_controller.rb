
class RegisterController < ApplicationController
  skip_before_action :verify_authenticity_token
  
  def create
    username = params[:username]
    if !username.match(/[a-zA-Z0-9\-]{3,20}/) then
      render plain: "0 Invalid username"
      return
    end
    password = params[:password]
    if !username.match(/[a-zA-Z0-9]{6,20}/) then
      render plain: "0 Invalid password"
      return
    end
    user = User.find_by(username: username)
    if !user.nil? then
      # user already exists
      render plain: "0 Username taken"
      return
    end
    user = User.create(username: username, password: password, password_confirmation: password)
    # should be good
    render plain: "1"
  end
end
