class Api::TrackingSubjectsController < ApplicationController
  respond_to :json

  before_filter :require_has_read_access!, only: [:show]
  before_filter :require_has_write_access!, only: [:destroy, :update]

  def show
    @tracking_subject = TrackingSubject.find(params[:id])
    render :json => @tracking_subject
  end

  def create
    params = tracking_subject_params
    params["user_id"] = current_user.id
    @tracking_subject = TrackingSubject.new(params)
    if @tracking_subject.save
      render :json => @tracking_subject
    else
      render :json => @tracking_subject.errors.full_messages, status: :unauthorized
    end
  end

  def destroy
    @tracking_subject = TrackingSubject.find(params[:id])
    @tracking_subject.destroy
    render :json => nil
  end

  def index
    user = current_user
    @tracking_subjects = user.tracking_subjects
    @accessible_subjects = user.accessible_subjects
    puts "IN TRACKING SUBJECTS INDEX"
    puts @tracking_subjects
    puts @accessible_subjects
    puts "---------------------------"
    render :json => (@tracking_subjects + @accessible_subjects).uniq
  end

  def update
    @tracking_subject = TrackingSubject.find(params[:id])
    if @tracking_subject.update(tracking_subject_params)
      render :json => @tracking_subject
    else
      render :json => @tracking_subject.errors.full_messages, status: :unauthorized
    end
  end

  def require_has_read_access!
    @tracking_subject = TrackingSubject.find(params[:id])
    return true if @tracking_subject.is_public?

    @shared_subject = SharedSubject.find_by({tracking_subject_id: params[:id], user_id: current_user.id})

    return true if !!@shared_subject

    unless current_user && current_user.id == @tracking_subject.user_id
      puts "NOT GIVING ACCESS"
      render :json => "User does not have permission to access this", status: :unauthorized
    end
  end

  def require_has_write_access!
    @shared_subject = SharedSubject.find_by({tracking_subject_id: params[:id], user_id: current_user.id})

    return true if !!@shared_subject and @shared_subject.has_write_access?

    @tracking_subject = TrackingSubject.find(params[:id])
    unless current_user && current_user.id == @tracking_subject.user_id
      render :json => "User does not have permission to access this", status: :unauthorized
    end
  end


  private
  def tracking_subject_params
    params.require(:tracking_subject).permit(:name, :public)
  end
end
