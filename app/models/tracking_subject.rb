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

class TrackingSubject < ActiveRecord::Base
  validates :user, :name, presence: true

  belongs_to :user

  has_many :tracking_attributes

  has_many :shared_subjects

  has_many :allowed_users, :through => :shared_subjects, :source => :user

  def is_public?
    @public
  end
end
