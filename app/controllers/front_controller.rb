
class FrontController < ApplicationController
  def index
    redirect_if_logged_in
  end
end
