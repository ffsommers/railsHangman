# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
    User.create(username: 'A-ROD', email: 'a@a.com', password:"test");
# t.string  :username
# t.string :email
# t.string :avatar, :default => ""
# t.integer :top_score, :default => 0
# t.integer :games_played , :default => 0
# t.integer :rank, :default => 0
# t.string :password_digest
