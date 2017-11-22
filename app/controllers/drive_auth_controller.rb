
require "googleauth"
require "drive_state"
require "replay_wrap"

class DriveAuthController < ApplicationController
  def index
    redirect_if_not_logged_in
  end

  def create
    user = current_user
    if user.nil? then
      p "authcode was posted to /driveauth but no user is in session"
      return
    end

    drivestate = DriveState.new(user)
    if user.drive_refresh_token.nil? then
      drivestate.create_new(params[:authcode])
    else
      drivestate.recreate
    end

    replay = ReplayWrap.new(user: user)
    replay.service = drivestate.service
    replay.events = [1,2,3]
    replay.store
    replay.retrieve

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
