
require "drive_state"
require "replay_wrap"

class ReplaysController < ApplicationController
  skip_before_action :verify_authenticity_token
  helper_method :get_replay
  helper_method :get_stage
  helper_method :get_time
  helper_method :get_page

  def index
    @count = Replay.count
    @pages = (@count/20.to_f).ceil
    @intpages = @pages.to_i
    @user = current_user
    if @user.nil? then
      redirect_to :controller => "login", :action => "index"
    end
  end

  def get_replay(value=0)
    if not current_user.drive_refresh_token.nil?
      drivestate = DriveState.new(@user)
      drivestate.recreate
    	replay = ReplayWrap.new(user: @user)
      replay.service = drivestate.service
      id = Replay.order('created_at').offset(value).first.replay_id
      if !id.nil?
        replay.replay.replay_id = id
        replay = replay.retrieve
      end
    end
  end

  def get_time(value=0)
    time = Replay.order('created_at').offset(value).first
    if !time.nil?
      return time.created_at
    end
   end

  def get_stage(value=0)
    stage = Replay.order('created_at').offset(value).first
    if !stage.nil?
      return stage.stage
    end
  end

  def get_page
    @page = CGI.parse((URI.parse(request.original_url)).query)['page'].first
    @intpage = @page.to_i
  end

end
