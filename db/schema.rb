# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20150814183819) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "data_points", force: :cascade do |t|
    t.integer  "tracking_attribute_id", null: false
    t.float    "value",                 null: false
    t.datetime "time",                  null: false
    t.datetime "created_at",            null: false
    t.datetime "updated_at",            null: false
    t.text     "notes"
    t.integer  "tracking_subject_id"
  end

  create_table "tracking_attributes", force: :cascade do |t|
    t.string   "name",                               null: false
    t.integer  "tracking_subject_id",                null: false
    t.text     "notes"
    t.boolean  "is_float",            default: true
    t.float    "min_val"
    t.float    "max_val"
    t.string   "units"
    t.datetime "created_at",                         null: false
    t.datetime "updated_at",                         null: false
  end

  create_table "tracking_subjects", force: :cascade do |t|
    t.integer  "user_id",                   null: false
    t.string   "name",                      null: false
    t.boolean  "public",     default: true, null: false
    t.datetime "created_at",                null: false
    t.datetime "updated_at",                null: false
  end

  create_table "users", force: :cascade do |t|
    t.string   "username",        null: false
    t.string   "email",           null: false
    t.string   "password_digest", null: false
    t.string   "session_token",   null: false
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
  end

end
