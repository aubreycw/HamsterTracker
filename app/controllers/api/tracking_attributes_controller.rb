class Api::TrackingAttributesController < ApplicationController
  respond_to :json

  def show
    @tracking_attribute = TrackingAttribute.find(params[:id])
    render :json => @tracking_attribute
  end

  def create
    taparams = tracking_attribute_params
    taparams["tracking_subject_id"] = params[:tracking_subject_id]
    @tracking_attribute = TrackingAttribute.new(taparams)
    if @tracking_attribute.save
      render :json => @tracking_attribute
    else
      render :json => @tracking_attribute.errors.full_messages, status: :unprocessable_entity
    end
  end

  def destroy
    @tracking_attribute = TrackingAttribute.find(params[:id])
    @tracking_attribute.destroy
    render :json => nil
  end

  def index
    @tracking_subject = TrackingSubject.find(params[:tracking_subject_id])
    @tracking_attributes = @tracking_subject.tracking_attributes
    render :json => @tracking_attributes
  end

  def update
    @tracking_attribute = TrackingAttribute.find(params[:id])
    if @tracking_attribute.update(tracking_attribute_params)
      render :json => @tracking_attribute
    else
      render :json => @tracking_attribute.errors.full_messages, status: :unprocessable_entity
    end
  end

  private
  def tracking_attribute_params
    params.require(:tracking_attribute).permit(:name, :notes, :is_float, :min_val, :max_val, :units)
  end
end
