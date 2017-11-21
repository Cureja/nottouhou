
require "google_drive"

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

  def init_service(authcode, user)
    @user = user
    credentials = Google::Auth::UserRefreshCredentials.new(
      client_id: "520788856982-o79jg4d27s9ogvs358unqnntiv7k52ah.apps.googleusercontent.com",
      client_secret: "L5lNtMEmS6tGXXpMAdFkxrRd",
      scope: ["https://www.googleapis.com/auth/drive.file"],
      redirect_uri: "postmessage"
    )
    credentials.code = authcode
    credentials.fetch_access_token!
    
  end



  def init_service(user)
    #@service ||= GoogleDrive::Session.from_access_token(user.drive_cred)
    @service = GoogleDrive::Session.login_with_oauth(user.drive_cred)
  end

  def store
    serialized = Marshal.dump(@events)
    file = @service.upload_from_string(serialized)
    self.replay_id = file.id
  end

  def retrieve
    # Marshal.load
    # @service.file_by_id
  end

  def delete

  end
end
