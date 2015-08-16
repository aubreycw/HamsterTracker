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
  attr_reader :public

  belongs_to :user

  has_many :tracking_attributes

  def getting_info
    puts "____________"
    puts "User:"
    puts self.user_id
    puts self.user
    puts ""
    puts self.name
    puts "____________"
  end

  def is_public?
    @public
  end
end
