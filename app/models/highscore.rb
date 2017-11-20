class Highscore < ApplicationRecord
  def score
    self[:score]
  end
end
