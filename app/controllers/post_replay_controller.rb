
class PostReplayController < ApplicationController
  # post to here with { events: JSON.stringify(events) }

  def create
    user = current_user
    if user.nil? then
      return
    end

    p params[:events]

    drivestate = Replay::DriveState.new(user)
    drivestate.recreate

    replay = Replay.new
    replay.service = drivestate.service
    replay.events = JSON.parse(params[:events])
    replay.store

    render :json => {
      :success => true
    }
  end
end
