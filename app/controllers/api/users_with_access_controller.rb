class Api::UsersWithAccessController < ApplicationController

  def show
    @user = User.find(params[:id])
    render :json => @user
  end

  def index
    @tracking_subject = TrackingSubject.find(params[:tracking_subject_id])
    @owner = @tracking_subject.user
    @users_with_access = @tracking_subject.allowed_users
    all_users_with_access = ([@owner] + @users_with_access).uniq
    render :json => all_users_with_access.select {|user| user != current_user}
  end
end
