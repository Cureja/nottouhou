require 'test_helper'

class HighscoresControllerTest < ActionDispatch::IntegrationTest
#  def setup
#  	@user = User.create(username: "Tester", password: "password", password_confirmation: "password")
#    @highscore = Highscore.create(username: "Random", score: 10)
#    post login_path, params: { username: 'Tester', password: 'password' }
#    follow_redirect!
#  end

#  test "score are successfully submitted" do
#  	get highscores_path
#  	post highscores_path, params: { score: 100 }
#  	assert Highscore.exists?(username: 'Tester', score: 100)
#  end

#  test "score are ordered in score DESC" do
#    get highscores_path
#    post highscores_path, params: { score: 100 }
#    assert_equal 'Tester', Highscore.order('score DESC, created_at').first.username 
#  end

#  test "score are ordered in score DESC, and then create time" do
#    get highscores_path
#    post highscores_path, params: { score: 10 }
#    assert_equal 'Random', Highscore.order('score DESC, created_at').first.username 
#  end
#end
