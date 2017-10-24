
# https://www.railstutorial.org/book/modeling_users

class User < ApplicationRecord
  validates :username,
    presence: true,
    length: { minimum: 3, maximum: 20 },
    format: { with: /[a-zA-Z0-9\-]/i },
    uniqueness: { case_sensitive: false }
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
end
