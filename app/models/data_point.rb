# == Schema Information
#
# Table name: data_points
#
#  id         :integer          not null, primary key
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class DataPoint < ActiveRecord::Base
  validates :tracking_attribute, :value, :time, presence: true
  validate :value_is_valid

  belongs_to :tracking_attribute

  def value_is_valid
    value = self.value
    puts("-------------------")
    puts(value)
    puts(value.to_f)
    puts(value.to_f == value)
    puts("-------------------")
    unless value.to_f == value
      errors[:value] << "is not a number"
      return true
    end
    unless self.tracking_attribute.is_valid?(value)
      errors[:value] << "is not between min and max value, or is a float but should be an integer)"
    end
  end
end
