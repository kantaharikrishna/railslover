class CreateContacts < ActiveRecord::Migration
  def up
create_table :contacts do |t|


t.string :mobile
t.string :address

end

end

def down
drop_table :contacts

end
end
