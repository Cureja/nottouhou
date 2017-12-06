class UpdateReplays < ActiveRecord::Migration[5.1]
  def change
  	drop_table :replays
  	create_table :replays do |t|
      t.integer :user_id
      t.string :replay_id
      t.integer :stage
      t.timestamps
    end
  end
end
