module ApplicationHelper
  def add_3_dot(string, limit)
    if string.size < limit
      return string
    else
      return "#{string[0..limit]}..."
    end
  end

  def ecb64(str)
    return Base64.encode64(str.to_s) rescue ""
  end
end
