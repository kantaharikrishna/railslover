class Contact < ActiveRecord::Base
   attr_accessible :mobile, :address
  belongs_to :member
  validates :address, :presence => true
end
