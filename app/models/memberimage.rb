class Memberimage < ActiveRecord::Base
mount_uploader :image, ImageUploader
  attr_accessible :image, :member_id
  validates :member_id, :uniqueness => true
  validates :image, :presence => true
  belongs_to :member
end
