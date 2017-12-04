class HighscoresController< ApplicationController
  skip_before_action :verify_authenticity_token
  helper_method :put_user
  helper_method :put_score
  helper_method :get_page

  def index
    @user = current_user
    @count = Highscore.count
    @pages = (@count/20.to_f).ceil
    @intpages = @pages.to_i
    if @user.nil? then
      redirect_to :controller => "login", :action => "index"
    end
  end

  def create
    @score = params[:score]
    highscore = Highscore.create(username: current_user.username, score: @score)
    Highscore.order('score DESC, created_at')
  end

  def put_user(value)
    highscore = Highscore.order('score DESC, created_at').offset(value).first
    if !highscore.nil?
      return highscore.username
    end
  end

  def put_score(value)
    highscore = Highscore.order('score DESC, created_at').offset(value).first
    if !highscore.nil?
      return highscore.score
    end
  end

  def get_page
    @page = CGI.parse((URI.parse(request.original_url)).query)['page'].first
    @intpage = @page.to_i
  end
end
