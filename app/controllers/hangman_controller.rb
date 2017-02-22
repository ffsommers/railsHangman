class HangmanController < ApplicationController
  # include OxfordApiHelper

  def index
    @user = User.find(current_user.id)
    @past_top_score = @user.top_score
    # puts avatar('ssommers21@gmail.com')
    if @user.avatar = ""
      @user.avatar = avatar(@user.email)
      @user.save
    end
    if request.xhr?
      puts  @definition = definition(dictionary_params[:word])
      render json: @definition
    end

  end

  def scores
    @user = User.find(current_user.id)
    @past_top_score = @user.top_score

    if post_params[:top_score ].to_i > @past_top_score
      @user.top_score = post_params[:top_score].to_i
      @user.save
    end

  end



  private
    def post_params
      params.permit(:top_score, :games_played)
    end

    def dictionary_params
      params.permit(:word)
    end
end
