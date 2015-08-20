class Api::TrendlinesController < ApplicationController
  def index
    id = params[:tracking_subject_id]
    tracking_subject = TrackingSubject.find(id)
    tracking_attributes = tracking_subject.tracking_attributes

    trendlines = []
    tracking_attributes.each do |atrb|
      trendlines << data_to_trendline(atrb.data_points, atrb.name, atrb.id)
    end
    render :json => trendlines
  end

  #convert dates to percentage (then scale percentage in d3)
  def data_to_trendline(data_points, name, id)
    data, mean_x, mean_y, min_y, max_y = make_pairs(data_points)
    covariance = covariance(data, mean_x, mean_y)
    variance = variance(data, mean_x)

    slope = covariance/variance
    intercept = mean_y - slope*mean_x

    first = [0, intercept]
    last = [100, slope*100 + intercept]

    return Trendline.new(name, id, first, last, min_y, max_y)
  end

  def covariance(pairs, mean_x, mean_y)
    sum_cov = 0
    pairs.each do |dp|
      sum_cov += (dp[0]-mean_x)*(dp[1]-mean_y)
    end
    sum_cov/pairs.length
  end

  def variance(pairs, mean_x)
    sum_x_square = 0
    pairs.each do |pair|
      sum_x_square += pair[0]-mean_x
    end
    return sum_x_square/pairs.length - mean_x**2
  end

  def make_pairs(data_points)
    n = data_points.length
    sum_x = 0
    sum_y = 0
    min = 1.0/0;
    max = 0;
    data = []
    data = date_to_percentage(data_points)
    data.each do |dp|
      sum_x += dp[0];
      sum_y += dp[1];

      y = dp[1]
      if y > max
        max = y
      end
      if y < min
        min = y
      end

    end
    return [data, sum_x/n, sum_y/n, min, max]
  end

  def date_to_percentage(data)
    min = 1.0/0;
    max = 0;
    data.each do |dp|
      x = dp.time.to_i
      if x > max
        max = x
      end
      if x < min
        min = x
      end
    end

    result = []
    data.each do |dp|
      result << [((dp.time.to_i - min)*100)/(max-min), dp.value]
    end
    return result
  end

end

class Trendline
  def initialize(name, atrb_id, first, last, min_y, max_y)
    @atrb_id = atrb_id
    @name = name
    @first = first
    @last = last
    @min_y = min_y
    @max_y = max_y
  end
end