class ReplaysController < ApplicationController
  skip_before_action :verify_authenticity_token
  helper_method :get_replay
  def index
    @user = current_user
    @drivestate = DriveState.new(@user)
    # if drivestate -- Check if has drivestate
    @drivestate.recreate
    if @user.nil? then
      redirect_to :controller => "login", :action => "index"
    end
  end

  def get_replay
  	replay = ReplayWrap.new(user: @user)
    replay.service = @drivestate.service
    id = Replay.find_by(:user_id => @user.id).replay_id
    if !id.nil? 
      replay.replay.replay_id = id
      replay = replay.retrieve
    end
  end
  
end
