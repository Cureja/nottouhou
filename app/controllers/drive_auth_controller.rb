
require "googleauth"

class DriveAuthController < ApplicationController
  def index
    redirect_if_not_logged_in
  end

  def create
    redirect_if_not_logged_in
    user = current_user
    credentials = Google::Auth::UserRefreshCredentials.new(
      client_id: "520788856982-o79jg4d27s9ogvs358unqnntiv7k52ah.apps.googleusercontent.com",
      client_secret: "L5lNtMEmS6tGXXpMAdFkxrRd",
      scope: ["https://www.googleapis.com/auth/drive.file"],
      redirect_uri: "postmessage"
    )
    credentials.code = params[:authcode]
    credentials.fetch_access_token!
    p "successfully got drive cred for user #{user.id}"
    credentials.client_secret = nil
    user.drive_cred = credentials.to_json
    user.save
    p "putting a file"
    replay = Replay.new
    replay.init_service(user)
    #replay.service = GoogleDrive::Session.from_credentials(credentials)
    replay.events = [1,2,3]
    replay.store
    p "success"
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
