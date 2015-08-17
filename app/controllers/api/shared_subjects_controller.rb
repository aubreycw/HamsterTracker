class Api::SharedSubjectsController < ApplicationController

  respond_to :json

  def create
    ssparams_raw = shared_subject_params
    @user = User.find_by({name: ssparams_raw[:name]})
    unless @user
      render :json => "No user with that name", status: :unprocessable_entity
    end

    ssparams = {}
    ssparams["tracking_subject_id"] = ssparams_raw[:subject_id]
    ssparams["write_access"] = ssparams_raw[:has_write_access]
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

  private

  def shared_subject_params
    params.require(:shared_subject).permit(:name, :has_write_access, :subject_id)
  end
end
