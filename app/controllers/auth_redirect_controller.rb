
class AuthRedirectController < ApplicationController
  def create
    p "posting"
  end

  def index
    p "indexing"
    p params
  end
end
