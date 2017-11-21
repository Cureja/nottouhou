
class AuthRedirectController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
    p "redirect get"
    puts params.inspect
  end

  def create
    p "redirect post"
    puts params.inspect
  end
end
