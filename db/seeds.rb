# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

users = User.create!([
  {username: "human", password: "password", email: "human@email.com"},
  {username: "human2", password: "password", email: "human2@email.com"}
  ])

tracking_subjects = TrackingSubject.create!([
  {user_id: 1, name: "Hamster Health"},
  {user_id: 1, name: "Aquarium Levels"},
  {user_id: 2, name: "Caffeine Intake and Response"}
  ])

tracking_attributes = TrackingAttribute.create!([
  {tracking_subject_id: 1, name: "Weight", units: "grams", notes: "Measured once a day", min_val: 0},
  {tracking_subject_id: 1, name: "Food given", units: "grams", notes: "Grams of dry mix placed in tank (ignore treats)", min_val: 0},
  {tracking_subject_id: 1, name: "Coat condition", units: "shine", notes: "0 -> very dirty and smells bad \n 1 -> some patches of dirt \n 2-> neutral \n 3 -> shiny and very soft", min_val: 0, max_val: 5, is_float: false}
  ])

hamsterWeight = TrackingAttribute.find_by({"name" => "Weight"})
hamsterFood = TrackingAttribute.find_by({"name" => "Food given"})
hamsterCoat = TrackingAttribute.find_by({"name" => "Coat condition"})


data_points = DataPoint.create!([
  {tracking_attribute_id: hamsterWeight.id, tracking_subject_id: hamsterWeight.tracking_subject_id, value: 110, notes: "Measured in the evening", time:"2015-08-16T20:00:00.000"},
  {tracking_attribute_id: hamsterWeight.id, tracking_subject_id: hamsterWeight.tracking_subject_id, value: 111, notes: "Not actually measured yet", time:"2015-08-17T20:00:00.000"},
  {tracking_attribute_id: hamsterFood.id, tracking_subject_id: hamsterFood.tracking_subject_id, value: 100, notes: "Not actually measured yet", time:"2015-08-17T20:00:00.000"},
  {tracking_attribute_id: hamsterCoat.id, tracking_subject_id: hamsterCoat.tracking_subject_id, value: 2, notes: "Not actually measured yet", time:"2015-08-17T20:00:00.000"},
  {tracking_attribute_id: hamsterWeight.id, tracking_subject_id: hamsterWeight.tracking_subject_id, value: 112, notes: "Not actually measured yet", time:"2015-08-18T20:00:00.000"},
  {tracking_attribute_id: hamsterFood.id, tracking_subject_id: hamsterFood.tracking_subject_id, value: 90, notes: "Not actually measured yet", time:"2015-08-18T20:00:00.000"},
  {tracking_attribute_id: hamsterCoat.id, tracking_subject_id: hamsterCoat.tracking_subject_id, value: 3, notes: "Not actually measured yet", time:"2015-08-18T20:00:00.000"}
  ])
  
