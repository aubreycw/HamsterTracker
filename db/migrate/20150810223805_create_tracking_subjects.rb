class CreateTrackingSubjects < ActiveRecord::Migration
  def change
    create_table :tracking_subjects do |t|
      t.integer :user_id, null: false
      t.string :name, null: false
      t.boolean :public, default: true, null: false
      t.timestamps null: false
    end
  end
end
