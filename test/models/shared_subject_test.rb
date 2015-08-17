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

require 'test_helper'

class SharedSubjectTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
