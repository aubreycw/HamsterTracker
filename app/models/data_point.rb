# == Schema Information
#
# Table name: data_points
#
#  id                    :integer          not null, primary key
#  tracking_attribute_id :integer          not null
#  value                 :float            not null
#  time                  :datetime         not null
#  created_at            :datetime         not null
#  updated_at            :datetime         not null
#  notes                 :text
#  tracking_subject_id   :integer
#

class DataPoint < ActiveRecord::Base
  validates :tracking_attribute, :tracking_subject, :value, :time, presence: true
  validate :value_is_valid

  belongs_to :tracking_attribute

  belongs_to :tracking_subject


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
