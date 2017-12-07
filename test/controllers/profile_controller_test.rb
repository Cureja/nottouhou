require 'test_helper'

class ProfileControllerTest < ActionDispatch::IntegrationTest
  def setup
  	@user = User.create(username: "Tester", password: "password", password_confirmation: "password")
    post login_path, params: { username: 'Tester', password: 'password' }
    follow_redirect!
  end

#  test "links to highscores" do
#  	assert_select li, highscores_path
#  end

  test "links to drive authenticate" do
  	assert_select "a[href=?]", driveauth_path
  end

  test "links to logout" do
  	assert_select "a[href=?]", logout_path
  end
  
  test "links to tutorial stage" do
    assert_select "th", "Tutorial"  
  end

  test "links to stage 1" do
    assert_select "th", "Stage 1"
  end

  test "links to stage 2" do
    assert_select "th", "Stage 2"
  end
end
