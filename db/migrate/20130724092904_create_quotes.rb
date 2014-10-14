class CreateQuotes < ActiveRecord::Migration
  def change
    create_table :quotes do |t|
      t.string :quote
      t.date :quotedate

      t.timestamps
    end
  end
end
