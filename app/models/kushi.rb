class Kushi < ActiveRecord::Base
  attr_accessible :kushi_image
   mount_uploader :kushi_image, KushiImageUploader
end
