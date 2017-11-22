
class Replay < ApplicationRecord
  "
  Make a replay with:
    replay = ReplayWrap.new
  See replay_wrap.rb for specifics on arguments to the constructor.
  Give it events:
    replay.events = arrayofevents
  Store it in drive:
    replay.store
  Maybe you want to find replays by user:
    Replay.find_by(:user_id => user.id)
  When you have a replay you want to get the contents of:
    replay.retrieve
  "
end
