class HighscoresController< ApplicationController
  skip_before_action :verify_authenticity_token

  def index
    @user = current_user
    if @user.nil? then
      redirect_to :controller => "login", :action => "index"
    end
  end
end
