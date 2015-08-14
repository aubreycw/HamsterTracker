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

require 'test_helper'

class DataPointTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
