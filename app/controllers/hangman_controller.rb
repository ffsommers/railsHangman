class HangmanController < ApplicationController
  def index
    @user = User.find(current_user.id)
    @past_top_score = @user.top_score
    # if request.xhr?
    #   if post_params.top_score > @past_top_score
    #     new_top_score = @user.top_score
    # end

  end



  def scores
    @user = User.find(current_user.id)
    @past_top_score = @user.top_score
    p post_params[:top_score]
    if post_params[:top_score ].to_i > @past_top_score
      @user.top_score = post_params[:top_score].to_i
      @user.save
    else
      p "not good enough"
      p "*" * 1000
    end
    # redirect_to games_path
    # p post_params.top_score
    # # @top_scores = User.find(:all, :order => "id desc", :limit => 5)
    # @top_scores = User.by_score.limit(3)
  end



  private
  def post_params
    params.permit(:top_score, :games_played)
  end
end
