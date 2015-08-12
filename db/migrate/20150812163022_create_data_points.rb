class CreateDataPoints < ActiveRecord::Migration
  def change
    create_table :data_points do |t|
      t.integer :tracking_attribute_id, null: false
      t.float :value, null: false
      t.datetime :time, null: false
      t.timestamps null: false
      t.text :notes
    end
  end
end
