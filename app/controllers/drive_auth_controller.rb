
require "googleauth"

class DriveAuthController < ApplicationController
  def index
    redirect_if_not_logged_in
  end

  def create
    redirect_if_not_logged_in
    user = current_user
    if !user.refresh_token.nil? then
      redirect_if_logged_in
    end

    drivestate = Replay::DriveState.new(user)
    drivestate.create_new(params[:authcode])

    replay = Replay.new
    replay.service = drivestate.service
    replay.events = [1,2,3]
    replay.store

    render :json => {
      :success => true
    }
  end

  private
    def get_redirect_uri
      domain = request.domain
      if domain == "localhost" then
        domain = "127.0.0.1:5000"
      end
      return "http://" + domain + "/authredirect"
    end
end
