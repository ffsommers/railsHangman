class HangmanController < ApplicationController
  def index
    @user = User.find(current_user.id)
  end

  def show
    
  end

end
