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
  {user_id: 1, name: "Running"},
  {user_id: 2, name: "Caffeine Intake and Response"}
  ])

tracking_attributes = TrackingAttribute.create!([
  {tracking_subject_id: 1, 
    name: "Weight", 
    units: "grams", 
    notes: "Measured once a day", min_val: 0},
  {tracking_subject_id: 1, 
    name: "Food given", 
    units: "grams", 
    notes: "Grams of dry mix placed in tank (ignore treats)", 
    min_val: 0},
  {tracking_subject_id: 1, 
    name: "Coat condition", 
    units: "shine", 
    notes: "0 -> very dirty and smells bad \n 1 -> some patches of dirt \n 2-> neutral \n 3 -> shiny and very soft", min_val: 0, max_val: 5, 
    is_float: false},
  {tracking_subject_id: 1, 
    name: "Treats given", 
    units: "number of treats", 
    notes: "examples: 1 walnut, a few sunflower seeds, a piece of spinach", 
    min_val: 0, 
    is_float: false},
  ])



hamsterSubjectId = TrackingSubject.find_by({"name" => "Hamster Health"}).id
hamsterWeightId = TrackingAttribute.find_by({"name" => "Weight"}).id
hamsterFoodId = TrackingAttribute.find_by({"name" => "Food given"}).id
hamsterCoatId = TrackingAttribute.find_by({"name" => "Coat condition"}).id
hamsterTreatsId = TrackingAttribute.find_by({"name" => "Treats given"}).id


data_points = DataPoint.create!([
  {tracking_attribute_id: hamsterWeightId, 
    tracking_subject_id: hamsterSubjectId, 
    value: 111, 
    time:"2015-08-17T20:00:00.000"},
  {tracking_attribute_id: hamsterFoodId, 
    tracking_subject_id: hamsterSubjectId, 
    value: 50, 
    time:"2015-08-17T20:00:00.000"},
  {tracking_attribute_id: hamsterCoatId, 
    tracking_subject_id: hamsterSubjectId, 
    value: 2, 
    time:"2015-08-17T20:00:00.000"},
  {tracking_attribute_id: hamsterTreatsId, 
    tracking_subject_id: hamsterSubjectId, 
    value: 0, 
    time:"2015-08-17T20:00:00.000"},

  {tracking_attribute_id: hamsterWeightId, 
    tracking_subject_id: hamsterSubjectId, 
    value: 112, 
    time:"2015-08-18T20:00:00.000"},
  {tracking_attribute_id: hamsterFoodId, 
    tracking_subject_id: hamsterSubjectId, 
    value: 40, 
    time:"2015-08-18T20:00:00.000"},
  {tracking_attribute_id: hamsterCoatId, 
    tracking_subject_id: hamsterSubjectId, 
    value: 1, 
    time:"2015-08-18T20:00:00.000"},
  {tracking_attribute_id: hamsterTreatsId, 
    tracking_subject_id: hamsterSubjectId, 
    value: 1, 
    time:"2015-08-18T20:00:00.000"},

  {tracking_attribute_id: hamsterWeightId, 
    tracking_subject_id: hamsterSubjectId, 
    value: 113, 
    time:"2015-08-19T20:00:00.000"},
  {tracking_attribute_id: hamsterFoodId, 
    tracking_subject_id: hamsterSubjectId, 
    value: 30, 
    time:"2015-08-19T20:00:00.000"},
  {tracking_attribute_id: hamsterCoatId, 
    tracking_subject_id: hamsterSubjectId, 
    value: 2, 
    time:"2015-08-19T20:00:00.000"},
  {tracking_attribute_id: hamsterTreatsId, 
    tracking_subject_id: hamsterSubjectId, 
    value: 2, 
    time:"2015-08-19T20:00:00.000"},


  {tracking_attribute_id: hamsterWeightId, 
    tracking_subject_id: hamsterSubjectId, 
    value: 111, 
    time:"2015-08-20T20:00:00.000"},
  {tracking_attribute_id: hamsterFoodId, 
    tracking_subject_id: hamsterSubjectId, 
    value: 50, 
    time:"2015-08-20T20:00:00.000"},
  {tracking_attribute_id: hamsterCoatId, 
    tracking_subject_id: hamsterSubjectId, 
    value: 3, 
    time:"2015-08-20T20:00:00.000"},
  {tracking_attribute_id: hamsterTreatsId, 
    tracking_subject_id: hamsterSubjectId, 
    value: 0, 
    time:"2015-08-20T20:00:00.000"},

  {tracking_attribute_id: hamsterWeightId, 
    tracking_subject_id: hamsterSubjectId, 
    value: 110, 
    time:"2015-08-21T20:00:00.000"},
  {tracking_attribute_id: hamsterFoodId, 
    tracking_subject_id: hamsterSubjectId, 
    value: 50, 
    time:"2015-08-21T20:00:00.000"},
  {tracking_attribute_id: hamsterCoatId, 
    tracking_subject_id: hamsterSubjectId, 
    value: 3, 
    time:"2015-08-21T20:00:00.000"},
  {tracking_attribute_id: hamsterTreatsId, 
    tracking_subject_id: hamsterSubjectId, 
    value: 1, 
    time:"2015-08-21T20:00:00.000"},
  ])

# ---------------------------------------- Running ------------------------------


tracking_attributes = TrackingAttribute.create!([
  {tracking_subject_id: 2, 
    name: "Distance", 
    units: "Kilometers", 
    notes: "To nearest .1 kilmeters", 
    min_val: 0},
  {tracking_subject_id: 2, 
    name: "Time", 
    units: "minutes", 
    notes: "to nearest minute", 
    min_val: 0, 
    is_float: false},
  {tracking_subject_id: 2, 
    name: "Sleep last night", 
    units: "hours", 
    notes: "Hours of sleep the previous night", 
    min_val: 0},
  ])
  

runningId= TrackingSubject.find_by({"name" => "Running"}).id
distanceId= TrackingAttribute.find_by({"name" => "Distance"}).id
timeId = TrackingAttribute.find_by({"name" => "Time"}).id
sleepId = TrackingAttribute.find_by({"name" => "Sleep last night"}).id

data_points = DataPoint.create!([
  {tracking_attribute_id: distanceId, 
    tracking_subject_id: runningId, 
    value: 4, 
    time:"2015-08-17T08:15:00.000"},
  {tracking_attribute_id: timeId, 
    tracking_subject_id: runningId, 
    value: 30, 
    time:"2015-08-17T08:15:00.000"},
  {tracking_attribute_id: sleepId, 
    tracking_subject_id: runningId, 
    value: 7.5, 
    time:"2015-08-17T08:15:00.000"},


  {tracking_attribute_id: distanceId, 
    tracking_subject_id: runningId, 
    value: 5.3, 
    time:"2015-08-18T07:50:00.000"},
  {tracking_attribute_id: timeId, 
    tracking_subject_id: runningId, 
    value: 40, 
    time:"2015-08-18T07:50:00.000"},
  {tracking_attribute_id: sleepId, 
    tracking_subject_id: runningId, 
    value: 8, 
    time:"2015-08-18T07:50:00.000"},


  {tracking_attribute_id: distanceId, 
    tracking_subject_id: runningId, 
    value: 6, 
    time:"2015-08-19T08:05:00.000"},
  {tracking_attribute_id: timeId, 
    tracking_subject_id: runningId, 
    value: 45, 
    time:"2015-08-19T08:05:00.000"},
  {tracking_attribute_id: sleepId, 
    tracking_subject_id: runningId, 
    value: 7.5, 
    time:"2015-08-19T08:05:00.000"},


  {tracking_attribute_id: distanceId, 
    tracking_subject_id: runningId, 
    value: 5.3, 
    time:"2015-08-20T08:00:00.000"},
  {tracking_attribute_id: timeId, 
    tracking_subject_id: runningId, 
    value: 40, 
    time:"2015-08-20T08:00:00.000"},
  {tracking_attribute_id: sleepId, 
    tracking_subject_id: runningId, 
    value: 6.5, 
    time:"2015-08-20T08:00:00.000"},


  {tracking_attribute_id: distanceId, 
    tracking_subject_id: runningId, 
    value: 6.4, 
    time:"2015-08-21T07:55:00.000"},
  {tracking_attribute_id: timeId, 
    tracking_subject_id: runningId, 
    value: 45, 
    time:"2015-08-21T07:55:00.000"},
  {tracking_attribute_id: sleepId, 
    tracking_subject_id: runningId, 
    value: 8.5, 
    time:"2015-08-21T07:55:00.000"},


  {tracking_attribute_id: distanceId, 
    tracking_subject_id: runningId, 
    value: 6.7, 
    time:"2015-08-22T08:00:00.000"},
  {tracking_attribute_id: timeId, 
    tracking_subject_id: runningId, 
    value: 45, 
    time:"2015-08-22T08:00:00.000"},
  {tracking_attribute_id: sleepId, 
    tracking_subject_id: runningId, 
    value: 7.5, 
    time:"2015-08-22T08:00:00.000"}

    ])
