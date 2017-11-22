
require "drive_state"
require "replay_wrap"

# post to here with { events: JSON.stringify(events) }

class PostReplayController < ApplicationController
  def create
    user = current_user
    if user.nil? then
      return
    end

    drivestate = DriveState.new(user)
    drivestate.recreate

    replay = ReplayWrap.new(user: user)
    replay.service = drivestate.service
    replay.events = JSON.parse(params[:events])
    replay.store

    render :json => {
      :success => true
    }
  end
end
