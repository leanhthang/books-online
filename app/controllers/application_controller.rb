class ApplicationController < ActionController::Base
  layout "layouts/application"
  protect_from_forgery with: :exception

  before_action :authenticate_user!
  before_action :configure_permitted_parameters, if: :devise_controller?

  protected
    def after_sign_in_path_for(resource)
      if resource.role.in?(["admin","staff"])
        admin_path
      else
        root_path
      end
    end

    def configure_permitted_parameters
      added_attrs = [:phone, :email, :password, :password_confirmation, :remember_me]
      devise_parameter_sanitizer.permit :sign_up, keys: added_attrs
      devise_parameter_sanitizer.permit :account_update, keys: added_attrs
    end
end
