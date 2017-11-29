class HighscoresController< ApplicationController
  skip_before_action :verify_authenticity_token
  helper_method :put_entry

  def index
    @user = current_user
    @count = Highscore.count
    if @user.nil? then
      redirect_to :controller => "login", :action => "index"
    end
  end

  def create
    @score = params[:score]
    highscore = Highscore.create(username: current_user.username, score: @score)
    Highscore.order('score DESC, created_at')
  end

  def put_entry(value)
    highscore = Highscore.offset(value).first
    if !highscore.nil?
      return highscore.username + " | Kills: #{highscore.score}"
    end
  end

end
