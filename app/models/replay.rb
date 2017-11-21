
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
