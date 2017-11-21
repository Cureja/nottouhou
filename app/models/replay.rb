
require "google/api_client"

class Replay < ApplicationRecord
  "
  Make an replay with `replay = Replay.create(user.id)``
  Then, give it events. `replay.events = someevents`
  Store it in Drive. `replay.store`
  Maybe you want to find it again later.
    Find the one you want in `Replay.find_by(:user_id => user.id)`,
    then call `Replay.retrieve`. Now you can access `replay.events`.
  "

  def initialize
    @events = [];
  end

  def store
    file = drive.
  end

  def retrieve

    file = service.get(:fileId => self.replay_id)
  end

  def delete

  end
end
