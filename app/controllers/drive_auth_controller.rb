
require "google/apis/drive_v2"
require "google/api_client/client_secrets"

class DriveAuthController < ApplicationController
  def index
    redirect_if_not_logged_in
  end

  def create
    redirect_if_not_logged_in
    user = current_user
    authcode = params[:authcode]
    auth_client = $client_secrets.to_authorization
    auth_client.update!(
      :scope => "https://www.googleapis.com/auth/drive.file",
      :redirect_uri => get_redirect_uri,
      :additional_parameters => {
        "access_type" => "offline",
        "include_granted_scopes" => "true"
      }
    )
    auth_uri = auth_client.authorization.to_s
    p auth_uri
  end

  private
    def get_redirect_uri
      domain = request.domain
      if domain == "localhost" then
        domain += ":5000"
      end
      return "http://" + domain + "/authredirect"
    end
end
