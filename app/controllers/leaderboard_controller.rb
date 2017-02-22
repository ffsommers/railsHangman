class LeaderboardController < ApplicationController
  include OxfordApiHelper
  def leader
    puts "in the leader board route"
    @leaders = User.order(top_score: :desc)
  
  end
end
