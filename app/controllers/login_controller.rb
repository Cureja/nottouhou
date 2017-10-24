
class LoginController < ApplicationController
  def index
    render plain: 'bar'
  end
  
  def create
    render plain: 'foo'
  end
end
