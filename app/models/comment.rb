class Comment < ActiveRecord::Base
  attr_accessible :body, :idea_id, :user_name
  validates :body, :presence => true
  belongs_to :idea
end
