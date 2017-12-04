
class Replay < ApplicationRecord
  "
  To store/retrieve replays, you need a DriveState.
    drivestate = DriveState.new(user)
    # assuming the user has already linked drive
    drivestate.recreate

  Make a replay with:
    replay = ReplayWrap.new
  See replay_wrap.rb for specifics on arguments to the constructor.
  Give it events and stage number:
    replay.events = arrayofevents
    replay.stage = integer
  Give it a DriveState service so it can connect to drive:
    replay.service = drivestate.service
  Store it in drive:
    replay.store
  Maybe you want to find replays by user:
    Replay.find_by(:user_id => user.id)
  When you have a replay you want to get the contents of:
    replay.retrieve
  "
end
