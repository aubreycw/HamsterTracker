class Api::DataForCsvController < ApplicationController

  def index
    id = params[:tracking_subject_id]
    tracking_subject = TrackingSubject.find(id)
    tracking_attributes = tracking_subject.tracking_attributes
    data_titles = []
    data_titles_with_notes = []
    tracking_attributes.map{|atrb| atrb.name}.each do |name|
      data_titles_with_notes += [name, name + " notes"]
      data_titles += [name]
    end

    data_titles.sort!
    data_titles_with_notes.sort!
    data_hash = sort_into_entries(tracking_attributes, false);
    data_hash_with_notes = sort_into_entries(tracking_attributes, true);
    
    no_notes = get_array_from_hash(data_hash, data_titles)
    with_notes = get_array_from_hash(data_hash_with_notes, data_titles_with_notes)

    data_for_csv = DataForCsv.new(with_notes, no_notes);
    render :json => [data_for_csv]
  end

  def sort_into_entries(tracking_attributes, with_notes)
    data_hash = {}
    tracking_attributes.each do |atrb|
      atrb.data_points.each do |dp|
        
        if !!data_hash[dp.time]
          data_hash[dp.time] << [atrb.name, dp.value]
        else
          data_hash[dp.time] = [[atrb.name, dp.value]]
        end 

        if with_notes
            data_hash[dp.time] << [atrb.name + " notes", dp.notes]
        end

      end
    end
    data_hash
  end

  def get_array_from_hash(data_hash,data_titles)
    data_hash_dates = data_hash.keys.sort
    data = [["datetime"] + data_titles]
    data_hash_dates.each do |date|
      data << [date] + to_row(data_hash[date], data_titles)
    end
    data
  end

  def to_row(entries, titles)
    row = []
    titles.each do |name|
      row << find_entry_by_name(name, entries)
    end
    row
  end

  def find_entry_by_name(name, entries)
    result = "NA"
    entries.each do |entry|
      if entry[0] == name
        result = entry[1]
      end
    end
    result
  end
end


class DataForCsv
  attr_reader :value

  def initialize(with_notes, no_notes)
    @with_notes = with_notes
    @no_notes = no_notes
  end
end