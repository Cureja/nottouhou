
require "google/apis/drive_v2"
require "google/api_client/client_secrets"

class DriveAuthController < ApplicationController
  def index
    redirect_if_not_logged_in
  end

  def create
    redirect_if_not_logged_in
    user = current_user
    auth_client = $client_secrets.to_authorization
    auth_client.update!(
      :scope => "https://www.googleapis.com/auth/drive.file",
      :redirect_uri => "postmessage",
    )
    auth_client.code = params[:authcode]
    auth_client.fetch_access_token!
    auth_client.client_secret = nil
    user.drive_cred = auth_client.to_json
    user.save
    p "successfully got drive cred for user #{user.id}"
    DriveState.init_for_session(session)
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
