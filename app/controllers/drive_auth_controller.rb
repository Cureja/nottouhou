
require "googleauth"
require "drive_state"
require "replay_wrap"

class DriveAuthController < ApplicationController
  def index
    redirect_if_not_logged_in
    @user = current_user
  end

  def create
    @user = current_user
    if @user.nil? then
      p "authcode was posted to /driveauth but no user is in session"
      return
    end

    drivestate = DriveState.new(@user)
    if @user.drive_refresh_token.nil? then
      if !drivestate.create_new(params[:authcode]) then
        render :json => {
          :success => false,
          :error => "It appears our app already has access to your Google Drive, but we don't appear to have a record of that. Please revoke access <a href=\"https://myaccount.google.com/security#connectedapps\" target=\"_blank\">here</a> and try again."
        }
        return
      end
    else
      drivestate.recreate
    end

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
