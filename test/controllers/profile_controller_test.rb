require 'test_helper'

class ProfileControllerTest < ActionDispatch::IntegrationTest
  def setup
  	@user = User.create(username: "Tester", password: "password", password_confirmation: "password")
    post login_path, params: { username: 'Tester', password: 'password' }
    follow_redirect!
  end

  test "links to replays" do
  	assert_select "a[href=?]", replays_path
  end

  test "links to highscores" do
  	assert_select "a[href=?]", highscores_path
  end

  test "links to drive authenticate" do
  	assert_select "a[href=?]", driveauth_path
  end

  test "links to logout" do
  	assert_select "a[href=?]", logout_path
  end
end
