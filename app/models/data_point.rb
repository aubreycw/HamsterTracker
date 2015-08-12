# == Schema Information
#
# Table name: data_points
#
#  id         :integer          not null, primary key
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class DataPoint < ActiveRecord::Base
  validate :value_is_valid
  validates :tracking_attribute, :value, :time, presence: true

  belongs_to :tracking_attribute

  def value_is_valid
    unless self.tracking_attribute.is_valid?(:value)
      errors[:value] << "value is invalid"
    end
  end
end
