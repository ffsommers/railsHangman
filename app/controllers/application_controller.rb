class ApplicationController < ActionController::Base
  helper_method :current_user
  helper_method :dictionary
  helper_method :avatar
  def current_user
    @current_user ||= User.find(session[:user_id]) if session[:user_id]
  end

  def require_user
    redirect_to login_path unless current_user
  end

  def definition(word)
    client = OxfordDictionary::Client.new(app_id: 'a0e32f9a', app_key: '8c26fe757416a3a6a49b077f32f15652')
    client = OxfordDictionary.new(app_id: 'a0e32f9a', app_key: '8c26fe757416a3a6a49b077f32f15652')
    return client.entry_definitions(word)
  end

  def avatar(email)
    FullContact.configure do |config|
    config.api_key = 'ade1d8a08a069aa9'
    end
    return FullContact.person(email: email).photos[0].url
  end

  protect_from_forgery with: :exception
end
