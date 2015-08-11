class Api::TrackingSubjectsController < ApplicationController
  respond_to :json

  def create
    params = tracking_subject_params
    params["user_id"] = current_user.id
    @tracking_subject = TrackingSubject.new(params)
    if @tracking_subject.save
      render :json => @tracking_subject
    else
      render :json => @tracking_subject.errors.full_messages, status: :unprocessable_entity
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
    puts("----------------------------")
    puts("----------------------------")
    puts("----------------------------")
    puts(@tracking_subjects)
    puts("----------------------------")
    puts("----------------------------")
    puts("----------------------------")
    render :json => @tracking_subjects
  end

  def update
    @tracking_subject = TrackingSubject.find(params[:id])
    if @tracking_subject.update(tracking_subject_params)
      render :json => @tracking_subject
    else
      render :json => @tracking_subject.errors.full_messages, status: :unprocessable_entity
    end
  end

  private
  def tracking_subject_params
    params.require(:tracking_subject).permit(:name)
  end
end
