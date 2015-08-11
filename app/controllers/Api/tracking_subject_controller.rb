class Api::TrackingSubjectController < ApplicationController
  respond_to :json

  def new
    @tracking_subject = tracking_subject.new(tracking_subject_params)
    if @tracking_subject.save
      render :json => @tracking_subject
    else
      render :json => @tracking_subject.errors.full_messages, status: :unprocessable_entity
    end
  end

  def destroy
    @tracking_subject = tracking_subject.find(params[:id])
    @tracking_subject.destroy
    render :json => nil
  end

  def index
    @tracking_subjects = tracking_subject.all
    render :json => @tracking_subjects
  end

  def update
    @tracking_subject = tracking_subject.find(params[:id])
    if @tracking_subject.update(tracking_subject_params)
      render :json => @tracking_subject
    else
      render :json => @tracking_subject.errors.full_messages, status: :unprocessable_entity
    end
  end

  private
  def tracking_subject_params
    params.require(:tracking_subject).permit(:title, :body)
  end
end
