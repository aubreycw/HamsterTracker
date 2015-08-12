class CreateTrackingAttributes < ActiveRecord::Migration
  def change
    create_table :tracking_attributes do |t|
      t.string :name, null: false
      t.integer :tracking_subject_id, null: false
      t.text :notes
      t.boolean :is_float, default: true
      t.float :min_val
      t.float :max_val
      t.timestamps null: false
    end
  end
end
