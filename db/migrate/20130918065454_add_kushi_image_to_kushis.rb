class AddKushiImageToKushis < ActiveRecord::Migration
  def change
    add_column :kushis, :kushi_image, :string
  end
end
