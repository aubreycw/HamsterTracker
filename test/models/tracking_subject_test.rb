# == Schema Information
#
# Table name: tracking_subjects
#
#  id         :integer          not null, primary key
#  user_id    :integer          not null
#  name       :string           not null
#  public     :boolean          default(TRUE), not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

require 'test_helper'

class TrackingSubjectTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
