class HighscoresController< ApplicationController
  skip_before_action :verify_authenticity_token

  def index
    @user = current_user
    if @user.nil? then
      redirect_to :controller => "login", :action => "index"
    end
  end

  def create
    @score = params[:score]
    highscore = Highscore.create(username: current_user.username, score: @score)
  end

end
