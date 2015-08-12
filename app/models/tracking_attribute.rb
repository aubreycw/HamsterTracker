# == Schema Information
#
# Table name: tracking_attributes
#
#  id                  :integer          not null, primary key
#  name                :string           not null
#  tracking_subject_id :integer          not null
#  notes               :text
#  is_float            :boolean          default(TRUE)
#  min_val             :float
#  max_val             :float
#  created_at          :datetime         not null
#  updated_at          :datetime         not null
#

class TrackingAttribute < ActiveRecord::Base
  validates :name, :tracking_subject, presence: true

  belongs_to :tracking_subject

  def is_valid?(entry)
    is_correct_type(entry) && is_in_range(entry)
  end

  def is_correct_type(entry)
    return true if is_float
    entry % entry.round == 0
  end

  def is_in_range(entry)
    return false if (min_val && entry < min_val)
    return false if (max_val && entry > max_val)
    true
  end
end
