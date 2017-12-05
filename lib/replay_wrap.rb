
class ReplayWrap
  attr_accessor :events
  attr_accessor :service
  attr_accessor :replay

  "
  Options:
    replay: optional. usually for when you want to retrieve one
    user: required if replay is specified and its user_id is nil,
          or if replay is unspecified
  "
  def initialize(options = {})
    @replay = options[:replay]
    if @replay.nil? then
      @replay = Replay.new
    end
    if @replay.user_id.nil? then
      @replay.user_id = options[:user].id
    end
    @events = []
    @service = nil
  end

  def store
    serialized = Marshal.dump(@events)
    file = @service.upload_from_string(serialized)
    @replay.replay_id = file.id
    @replay.save
  end

  def retrieve
    contents = @service.drive.get_file(@replay.replay_id, download_dest: StringIO.new)
    @events = Marshal.load(contents.string)
    #@events = contents.string
  end

  def delete
    # TODO
  end
end
