class ApplicationController < ActionController::Base
  helper_method :current_user
  helper_method :dictionary
  helper_method :avatar
  helper_method :cloudinary_auth
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
    begin
     FullContact.person(email: email).photos[0].url
    rescue
      puts "no social media found for email"
      return "http://s3.amazonaws.com/nvest/Blank_Club_Website_Avatar_Gray.jpg"
    else
      return FullContact.person(email: email).photos[0].url
    end
  end

  def cloudinary_auth(img)
    auth = {
    cloud_name: "dfj5reiis",
    api_key:    "876464412757527",
    api_secret: "MmL-MIUrtuJ3h51fjRcgHZyM0lI"
    }
    Cloudinary::Uploader.upload(img, auth)
  end

  protect_from_forgery with: :exception
end
