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
    exponential = get_exponential_points(data)

    slope = covariance/variance
    intercept = mean_y - slope*mean_x

    first = [0, intercept]
    last = [100, slope*100 + intercept]

    r = r_value(data, mean_x, mean_y)
    return Trendline.new(name, id, [first, last], exponential, min_y, max_y, r)
  end

  def get_exponential_points(data)
    data_log = data.map{|dp| [dp[0], Math.log10(dp[1])]}

    sum_x = 0
    sum_y = 0
    data_log.each do |dp|
      sum_x += dp[0]
      sum_y += dp[1]
    end
    mean_x = sum_x/data.length
    mean_y = sum_y/data.length

    covariance = covariance(data_log, mean_x, mean_y)
    variance = variance(data_log, mean_x)

    slope = covariance/variance
    b = 10**slope
    a = 10**(mean_y - slope*mean_x)

    make_exponential_points(a, b, 0, 100)
  end

  def make_exponential_points(a, b, min_x, max_x)
    delta = (max_x - min_x)/100
    x = min_x
    points = []
    while x < max_x
      y = a * b**x
      points << [x,y]
      x += delta
    end
    return points
  end

  def covariance(pairs, mean_x, mean_y)
    sum_cov = 0
    pairs.each do |dp|
      sum_cov += (dp[0]-mean_x)*(dp[1]-mean_y)
    end
    sum_cov/pairs.length
  end

  def product_sd(related_pairs, mean_x, mean_y)
    n = related_pairs.length
    sum_x_minus_mu_squared = 0
    sum_y_minus_mu_squared = 0
    related_pairs.each do |pair|
      sum_x_minus_mu_squared += (mean_x - pair[0])**2
      sum_y_minus_mu_squared += (mean_y - pair[1])**2
    end
    sd_x = Math.sqrt(sum_x_minus_mu_squared/n)
    sd_y = Math.sqrt(sum_y_minus_mu_squared/n)
    sd_x*sd_y
  end

  def r_value(pairs, mean_x, mean_y)
    (covariance(pairs, mean_x, mean_y)/product_sd(pairs, mean_x, mean_y)).round(2)
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
  def initialize(name, atrb_id, linear, exponential, min_y, max_y, r)
    @atrb_id = atrb_id
    @name = name
    @linear = linear
    @exponential = exponential
    @min_y = min_y
    @max_y = max_y
    @r = r
  end
end