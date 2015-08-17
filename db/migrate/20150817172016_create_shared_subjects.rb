class CreateSharedSubjects < ActiveRecord::Migration
  def change
    create_table :shared_subjects do |t|
      t.integer :user_id, null: false
      t.integer :tracking_subject_id, null: false  
      t.boolean :write_access, default: true
      t.timestamps null: false
    end
  end
end
