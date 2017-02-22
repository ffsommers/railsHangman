class LeaderboardController < ApplicationController

  def leader
    @user = User.find(current_user.id)
    puts @user.avatar
    puts "in the leader board route"
    @leaders = User.order(top_score: :desc)

  end
end
