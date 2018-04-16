module ApplicationHelper
  def add_3_dot(string, limit)
    if string.size < limit
      return string
    else
      return "#{string[0..limit]}..."
    end
  end

  def convert_string_vn_to_unmarked(string)

  end
end
