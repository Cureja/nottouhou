class HighscoresController< ApplicationController
  skip_before_action :verify_authenticity_token
  helper_method :put_entry

  def index
    @user = current_user
    @count = Highscore.count
    @score = Highscore.order(score: :desc).find([2])
    if @user.nil? then
      redirect_to :controller => "login", :action => "index"
    end
  end

  def create
    @score = params[:score]
    highscore = Highscore.create(username: current_user.username, score: @score)
  end

  def put_entry(value)
      Highscore.order('score DESC, created_at').first(value).last(1)
  end

end
