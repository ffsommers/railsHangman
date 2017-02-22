class CreateUsers < ActiveRecord::Migration[5.0]
  def change
    create_table :users do |t|
      t.string  :username
      t.string :email
      t.string :avatar, :default => ""
      t.integer :top_score, :default => 0
      t.integer :games_played , :default => 0
      t.integer :rank, :default => 0
      t.string :password_digest
      t.timestamps
    end
  end
end
