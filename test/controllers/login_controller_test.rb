require 'test_helper'

class LoginControllerTest < ActionDispatch::IntegrationTest
  def setup
    @user = User.create(username: "Tester", password: "password", password_confirmation: "password")
  end

  test "login with valid information and then log out" do
    get login_path
    post login_path, params: { username: @user.username, password: @user.password }
    assert_redirected_to '/profile'
    follow_redirect!
    assert_select "a[href=?]", login_path, count: 0
    assert_select "p", @user.username
    assert_select "a[href=?]", logout_path
    #Log out
    get logout_path
    follow_redirect!
    assert_select "form[action=?]", login_path
    assert_select "a[href=?]", logout_path, count: 0
  end
end
