class AddMemberIdToContact < ActiveRecord::Migration
  def change
    add_column :contacts, :member_id, :integer
  end
end
