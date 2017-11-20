
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
    p "to auth"
    auth_client = $client_secrets.to_authorization
    p "update"
    auth_client.update!(
      :scope => "https://www.googleapis.com/auth/drive.file",
      :redirect_uri => get_redirect_uri,
      :additional_parameters => {
        "access_type" => "offline",
        "include_granted_scopes" => "true"
      }
    )
    p "fetch"
    result = auth_client.fetch_access_token!
    p result
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
