
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
    @user.drive_refresh_token = credentials.refresh_token
    @user.drive_access_token = credentials.access_token
    @user.save
    @service = GoogleDrive::Session.from_credentials(credentials)
  end

  def recreate
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

class Replay < ApplicationRecord
  "
  Make an replay with `replay = Replay.create(user.id)``
  Then, give it events. `replay.events = someevents`
  Store it in Drive. `replay.store`
  Maybe you want to find it again later.
    Find the one you want in `Replay.find_by(:user_id => user.id)`,
    then call `Replay.retrieve`. Now you can access `replay.events`.
  "

  attr_accessor :events
  attr_accessor :service

  def initialize
    @events = []
    @service = nil
  end

  def store
    serialized = Marshal.dump(@events)
    file = @service.upload_from_string(serialized)
    @replay_id = file.id
    save
  end

  def retrieve
    # TODO
    # Marshal.load
    # @service.file_by_id
  end

  def delete

  end
end
