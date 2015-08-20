# == Schema Information
#
# Table name: shared_subjects
#
#  id                  :integer          not null, primary key
#  user_id             :integer          not null
#  tracking_subject_id :integer          not null
#  write_access        :boolean          default(TRUE)
#  created_at          :datetime         not null
#  updated_at          :datetime         not null
#

class SharedSubject < ActiveRecord::Base
  validates :user, :tracking_subject, presence: true
  
  belongs_to :user

  belongs_to :tracking_subject

  def has_write_access?
    return !!@write_access
  end

end
