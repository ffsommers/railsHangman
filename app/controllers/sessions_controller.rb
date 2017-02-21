class SessionsController < ApplicationController
  def new
      if current_user
        redirect_to games_path
      else
        render :new
      end
    end

    def create
      @user = User.find_by_email(params[:session][:email])
      if @user && @user.authenticate(params[:session][:password])
        session[:user_id] = @user.id
        redirect_to games_path
      else
        redirect_to login_path
      end
    end

    def destroy
      session[:user_id] = nil
      redirect_to root_path
    end
end
