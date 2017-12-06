require 'test_helper'

class ReplaysControllerTest < ActionDispatch::IntegrationTest
  # test "the truth" do
  #   assert true
  # end
  test "go to connect drive" do

  end

  test "go to highscores" do
    get highscores_path!
    follow_redirect!
    assert_select "center", "HIGHSCORES"
  end 

  test "go to the campaign page and check if stage exists" do
    get profile_path!
    follow_redirect!
    assert_select "a", "Tutorial"
  end

  test "logging out of the replays page" do
    get logout_path
    follow_redirect!
    assert_select "form[action=?]", login_path
    assert_select "a[href=?]", logout_path, count: 0
  end

end
