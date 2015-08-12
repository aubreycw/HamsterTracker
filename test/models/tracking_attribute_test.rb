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

require 'test_helper'

class TrackingAttributeTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
