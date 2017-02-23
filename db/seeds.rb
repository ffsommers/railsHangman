# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
    User.create(username: 'Blake', email: 'blakes@uber.com', password:"blake", top_score: 10);
    User.create(username: 'Skip', email: 'ssommers21@gmail.com', password:"skip", top_score: 20);
    User.create(username: 'Mom', email: 'adrienne@a3nstrategies.com ', password:"mom", top_score: 16);
    User.create(username: 'Nick', email: 'nicholasreis@gmail.com', password:"nick", top_score: 7);
    User.create(username: 'Kachi', email: 'kachi@dronedeploy.com ', password:"kachi", top_score: 4);
