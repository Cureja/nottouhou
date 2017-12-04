
require "google_drive"

class DriveState
  attr_accessor :service

  def initialize(user)
    @user = user
  end

  def create_new(authcode)
    credentials = Google::Auth::UserRefreshCredentials.new(
      client_id: "520788856982-o79jg4d27s9ogvs358unqnntiv7k52ah.apps.googleusercontent.com",
      client_secret: "L5lNtMEmS6tGXXpMAdFkxrRd",
      scope: ["https://www.googleapis.com/auth/drive.file"],
      redirect_uri: "postmessage",
      additional_parameters: {
        "access_type" => "offline"
      }
    )
    credentials.code = authcode
    credentials.fetch_access_token!
    credentials.client_secret = nil
    if credentials.refresh_token.nil? then
      p "tried to create new credentials for user {@user.id}, but no refresh token was received. the user needs to manually revoke access first"
      return false
    end
    @user.drive_refresh_token = credentials.refresh_token
    @user.drive_access_token = credentials.access_token
    @user.save
    @service = GoogleDrive::Session.from_credentials(credentials)
    return true
  end

  def recreate()
    credentials = Google::Auth::UserRefreshCredentials.new(
      client_id: "520788856982-o79jg4d27s9ogvs358unqnntiv7k52ah.apps.googleusercontent.com",
      client_secret: "L5lNtMEmS6tGXXpMAdFkxrRd",
      scope: ["https://www.googleapis.com/auth/drive.file"],
      redirect_uri: "postmessage",
      additional_parameters: {
        "access_type" => "offline"
      },
      access_token: @user.drive_access_token,
      refresh_token: @user.drive_refresh_token
    )
    credentials.fetch_access_token!
    @service = GoogleDrive::Session.from_credentials(credentials)
  end
end
