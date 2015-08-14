class AddTrackingSubjectIdToDataPoints < ActiveRecord::Migration
  def change
    add_column :data_points, :tracking_subject_id, :integer
  end
end
