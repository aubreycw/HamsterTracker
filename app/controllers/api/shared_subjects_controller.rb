class Api::SharedSubjectsController < ApplicationController

  respond_to :json

  def create
    ssparams_raw = shared_subject_params
    @user = User.find_by({username: ssparams_raw[:name]})
    unless @user
      render :json => "No user with that name", status: :unprocessable_entity
      return true;
    end

    ssparams = {}
    ssparams["tracking_subject_id"] = ssparams_raw[:tracking_subject_id]
    ssparams["write_access"] = !!ssparams_raw[:has_write_access]
    ssparams["user_id"] = @user.id

    @shared_subject = SharedSubject.new(ssparams)
    if @shared_subject.save
      render :json => @shared_subject
    else
      render :json => @shared_subect.errors.full_messages, status: :unprocessable_entity
    end
  end

  def destroy
    @shared_subject = SharedSubject.find(params[:id])
    @shared_subject.destroy
    render :json => nil
  end

  def index
    @tracking_subject = TrackingSubject.find(params[:tracking_subject_id])
    @shared_subjects = @tracking_subject.shared_subjects
    render :json => @shared_subjects
  end


  private

  def shared_subject_params
    params.require(:shared_subject).permit(:name, :has_write_access, :tracking_subject_id)
  end
end
