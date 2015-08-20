class Api::CorrelationsController < ApplicationController

  before_filter :require_has_read_access!, only: [:index]


  def index
    id = params[:tracking_subject_id]
    tracking_subject = TrackingSubject.find(id)
    tracking_attributes = tracking_subject.tracking_attributes
    tracking_attribute_pairs = tracking_attributes.combination(2).to_a

    correlations_list = []
    tracking_attribute_pairs.each do |pair|
      correlation = get_correlation(pair[0], pair[1])
      if !!correlation
        correlation.set_subject_id(id)
        correlations_list << correlation
      end
    end
    render :json => correlations_list
  end

  def get_correlation(atrb_x, atrb_y)
    related_pairs = get_related_pairs(atrb_x, atrb_y)
    return nil if related_pairs.length < 2

    means = get_averages(related_pairs)
    mean_x = means[0]
    mean_y = means[1]

    x_sd_times_y_sd = product_sd(related_pairs, mean_x, mean_y)
    return nil if x_sd_times_y_sd == 0
    value = covariance(related_pairs, mean_x, mean_y)/x_sd_times_y_sd
    value = value.round(2)
    Correlation.new(value, atrb_x.id, atrb_y.id, atrb_x.name, atrb_y.name)
  end

  def get_related_pairs(atrb_x, atrb_y)
    x_hash = {}
    atrb_x.data_points.each do |data_point|
      x_hash[data_point.time] = data_point
    end

    pairs_list = []
    atrb_y.data_points.each do |data_point|
      if !!x_hash[data_point.time]
        pairs_list << [x_hash[data_point.time], data_point]
      end
    end
    pairs_list
  end

  def get_averages(related_pairs)
    sum_x = 0
    sum_y = 0
    n = related_pairs.length
    related_pairs.each do |pair|
      sum_x += pair[0].value
      sum_y += pair[1].value
    end
    [sum_x/n, sum_y/n]
  end

  def covariance(related_pairs, mean_x, mean_y)
    sum_cov = 0
    related_pairs.each do |pair|
      sum_cov += (pair[0].value-mean_x)*(pair[1].value-mean_y)
    end

    sum_cov/related_pairs.length
  end

  def product_sd(related_pairs, mean_x, mean_y)
    n = related_pairs.length
    sum_x_minus_mu_squared = 0
    sum_y_minus_mu_squared = 0
    related_pairs.each do |pair|
      sum_x_minus_mu_squared += (mean_x - pair[0].value)**2
      sum_y_minus_mu_squared += (mean_y - pair[1].value)**2
    end

    sd_x = Math.sqrt(sum_x_minus_mu_squared/n)
    sd_y = Math.sqrt(sum_y_minus_mu_squared/n)
    sd_x*sd_y
  end


  def require_has_read_access!
    @tracking_subject = TrackingSubject.find(params[:tracking_subject_id])
    return true if @tracking_subject.is_public?

    @shared_subject = SharedSubject.find_by({tracking_subject_id: params[:tracking_subject_id], user_id: current_user.id})

    return true if !!@shared_subject

    unless current_user && current_user.id == @tracking_subject.user_id
      puts "NOT GIVING ACCESS"
      render :json => "User does not have permission to access this", status: :unprocessable_entity
    end
  end


end

class Correlation
  attr_reader :value, :atrb_y_id, :atrb_x_id, :atrb_x_name, :atrb_y_name

  def initialize(value, atrb_x_id, atrb_y_id, atrb_x_name, atrb_y_name)
    @value = value
    @atrb_x_id = atrb_x_id
    @atrb_y_id = atrb_y_id
    @atrb_x_name = atrb_x_name
    @atrb_y_name = atrb_y_name
  end

  def set_subject_id(id)
    @subject_id = id
  end
end
