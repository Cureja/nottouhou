require 'test_helper'

class RegisterControllerTest < ActionDispatch::IntegrationTest
  def setup
	@user = User.create(username: 'Tester', password: 'password', password_confirmation: "password")
  end

  test "login with invalid information" do
    get login_path
    lost login_path, params: { username: 'NotUser', password: 'password' }
    follow_redirect!
    assert_select "p", "Invalid username or password"
    post login_path, params: { username: 'Tester', password: 'fail' }
    follow_redirect!
    assert_select "p", "Invalid username or password"
  end

  test "register new user" do
    get register_path
    testname = "RegisterTester"
    testpass = "password"
    post register_path, params: {username: testname, password: testpass, password_confirm: testpass}
    assert_redirected_to '/profile'
    follow_redirect!
    assert_select "p", testname
    #Log out
    get logout_path
    follow_redirect!
    #Log back in
    get login_path
    post login_path, params: {username: testname, password: testpass, password_confirmation: testpass}
    follow_redirect!
    assert_select "p", testname
  end

  test "register user with errors" do
    get register_path
    post register_path, params: {username: @user.username, password: 'password1', password_confirm: 'password1'}
    follow_redirect!
    assert_select "p", "Username is taken"
    post register_path, params: {username: 'newUser', password: 'testing', password_confirm: 'failing'}
    follow_redirect!
    assert_select "p", "Passwords do not match"
    post register_path, params: {username: 'newUser', password: '!@#$%^&*', password_confirm: '!@#$%^&*'}
    follow_redirect!
    assert_select "p", "Passwords contains illegal characters or has illegal length"
    post register_path, params: {username: 'newUser', password: 'sh', password_confirm: 'sh'}
    follow_redirect!
    assert_select "p", "Passwords contains illegal characters or has illegal length"
    post register_path, params: {username: '!@#$%^&', password: 'password', password_confirm: 'password'}
    follow_redirect!
    assert_select "p", "Invalid username"
    post register_path, params: {username: 'sh', password: 'password', password_confirm: 'password'}
    follow_redirect!
    assert_select "p", "Invalid username"
  end
end