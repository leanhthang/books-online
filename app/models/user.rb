class User < ApplicationRecord
  attr_accessor :login
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable,
         :authentication_keys => [:login]

  has_one :user_report, dependent: :delete

  validates :phone, presence: :true, uniqueness: { case_sensitive: false }

  def is_admin?
    role == "admin" ? true : false
  end

  def login=(login)
    @login = login
  end

  def login
    @login || self.phone || self.email
  end

  def self.find_for_database_authentication(warden_conditions)
    conditions = warden_conditions.dup
    if login = conditions.delete(:login)
      where(conditions.to_h).where(["lower(phone) = :value OR lower(email) = :value", { :value => login.downcase }]).first
    elsif conditions.has_key?(:phone) || conditions.has_key?(:email)
      where(conditions.to_h).first
    end
  end
end
