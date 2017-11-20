class Highscore < ApplicationRecord
  def score
    self[:price]
  end
end
