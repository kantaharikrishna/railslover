class Idea < ActiveRecord::Base
  attr_accessible :description, :name, :picture
  mount_uploader :picture, PictureUploader
  has_many :comments, dependent: :destroy
  
end
