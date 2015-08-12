class Api::DataPointsController < ApplicationController
  respond_to :json

  def create
    dpparams = data_point_params
    taparams["tracking_attribute_id"] = params[:tracking_attribute_id]
    @data_point = DataPoint.new(dpparams)
    if @data_point.save
      render :json => @data_point
    else
      render :json => @data_point.errors.full_messages, status: :unprocessable_entity
    end
  end

  def destroy
    @data_point = DataPoint.find(params[:id])
    @data_point.destroy
    render :json => nil
  end

  def index
    @tracking_attribute = TrackingAttribute.find(params[:tracking_attribute_id])
    @data_points = @tracking_attributes.data_points
    render :json => @data_points
  end

  def update
    @data_point = DataPoint.find(params[:id])
    if @data_point.update(data_point_params)
      render :json => @data_point
    else
      render :json => @data_point.errors.full_messages, status: :unprocessable_entity
    end
  end

  private
  def data_point_params
    params.require(:data_point).permit(:name, :notes, :is_float, :min_val, :max_val, :units)
  end
end