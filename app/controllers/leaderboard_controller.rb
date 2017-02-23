class LeaderboardController < ApplicationController

  def leader
    @user = User.find(current_user.id)
    @leaders = User.order(top_score: :desc)

  end
end
