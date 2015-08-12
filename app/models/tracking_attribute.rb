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
#  units               :string
#  created_at          :datetime         not null
#  updated_at          :datetime         not null
#

class TrackingAttribute < ActiveRecord::Base
  validate :min_and_max_valid
  validates :name, :tracking_subject, presence: true

  belongs_to :tracking_subject
  has_many :data_points

  def min_and_max_valid
    return true if !self.min_val || !self.max_val
    if !(self.min_val < self.max_val)
      errors[:min_val] << " must be less than maximum value"
    end
  end

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
