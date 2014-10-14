class CreateMemberimages < ActiveRecord::Migration
  def change
    create_table :memberimages do |t|
      t.string :image
      t.integer :member_id

      t.timestamps
    end
  end
end
