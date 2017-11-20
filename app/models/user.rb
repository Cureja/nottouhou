
# https://www.railstutorial.org/book/modeling_users

class User < ApplicationRecord
  validates :username,
    presence: true,
    length: { minimum: 3, maximum: 20 },
    format: { with: /[a-zA-Z0-9\-]/i },
    uniqueness: { case_sensitive: false }
  attr_accessor :remember_token
  #validates :password,
  #  presence: true,
  #  length: { minimum: 6, maximum: 20 },
  #  format: { with: /[a-zA-Z0-9]/ }
  before_save :default_values
  has_secure_password

  private
    def default_values
      self.level = 1 if self.level.nil?
      self.exp = 0 if self.exp.nil?
      self.campaign_progress = 0 if self.campaign_progress.nil?
    end

    def User.new_token
      SecureRandom.urlsafe_base64
    end

    def authenticated?(remember_token)
      BCrypt::Password.new(remember_digest).is_password?(remember_token)
    end

  public
    def User.digest(string)
      cost = ActiveModel::SecurePassword.min_cost ? BCrypt::Engine::MIN_COST : BCrypt::Engine.cost
      BCrypt::Password.create(string, cost: cost)
    end

    def remember
      self.remember_token = User.new_token
      update_attribute(:remember_digest, User.digest(remember_token))
    end

    def get_replays
      Replay.where('user_id = ?', [self.id])
    end
end
