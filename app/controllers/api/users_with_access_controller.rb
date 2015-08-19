class Api::UsersWithAccessController < ApplicationController

  def show
    @user = User.find(params[:id])
    render :json => @user
  end

  def index
    @tracking_subject = TrackingSubject.find(params[:tracking_subject_id])
    owner = @tracking_subject.user
    @owner = UserWithAccess.new(owner.id, owner.username, true, true)

    shared_subjects = @tracking_subject.shared_subjects

    @users_with_access = []
    shared_subjects.each do |shared_subject|
      user = shared_subject.user
      can_write = shared_subject.has_write_access?
      @users_with_access << UserWithAccess.new(user.id, user.username, can_write ,false)
    end

    all_users_with_access = ([@owner] + @users_with_access).uniq
    render :json => all_users_with_access.select {|user| user.id != current_user.id}
  end

  def destroy
    @shared_subject = SharedSubject.find_by({user_id: params[:id], tracking_subject_id: params[:tracking_subject_id]})
    puts @shared_subject
    @shared_subject.destroy
    render :json => nil
  end

end

class UserWithAccess
  attr_reader :id, :username, :can_write, :is_owner

  def initialize(id, username, can_write, is_owner)
    @id = id
    @username = username
    @can_write = can_write
    @is_owner = is_owner
  end
end
