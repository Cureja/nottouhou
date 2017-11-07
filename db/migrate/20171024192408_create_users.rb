
class CreateUsers < ActiveRecord::Migration[5.1]
  def change
    create_table :users do |t|
      t.string :username
      t.string :password_digest
      t.integer :level
      t.integer :exp
      t.integer :campaign_progress
      t.string :drive_cred

      t.timestamps
    end
  end
end
