class CreatePolls < ActiveRecord::Migration
  def change
    create_table :polls do |t|
      t.integer :ram
      t.integer :ramesh
      t.integer :member_id

      t.timestamps
    end
  end
end
