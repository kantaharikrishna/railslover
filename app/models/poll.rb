class Poll < ActiveRecord::Base
  attr_accessible :member_id, :ram, :ramesh
  belongs_to :member
  #scope :for_ram, lambda{|current_member_id| new(ram: 1, ramesh: 0, member_id: current_member_id)}
  
  #scope :for_ramesh, lambda{|current_member_id| new(ram: 0, ramesh: 1, member_id: current_member_id)}
  
  def self.for_ram(current_member_id)
  new(ram: 1, ramesh: 0, member_id: current_member_id)
  
  end
  
  def self.for_ramesh(current_member_id)
  
  new(ram: 0, ramesh: 1, member_id: current_member_id)
  end
  
end
