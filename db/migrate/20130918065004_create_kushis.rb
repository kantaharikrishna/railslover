class CreateKushis < ActiveRecord::Migration
  def change
    create_table :kushis do |t|

      t.timestamps
    end
  end
end
