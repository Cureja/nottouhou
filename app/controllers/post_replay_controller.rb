

require "drive_state"
require "replay_wrap"
# post to here with { events: JSON.stringify(events) }

class PostReplayController < ApplicationController
  skip_before_action :verify_authenticity_token

  def create
    # Highscore.create(username: "hi", score: 5000000)
    # replay = Replay.create(user_id: 5,replay_id: "5")
    # Highscore.create(username: "hi", score: 5000000)
    @events = params[:events]
    user = current_user
    if user.nil? then
      return
    end
    drivestate = DriveState.new(user)
    drivestate.recreate()
    replay = ReplayWrap.new(user: user)
    replay.service = drivestate.service
    replay.events = @events
    replay.replay.stage = params[:stage]
    replay.store
    render :json => {
      :success => true
    }

  end
end
