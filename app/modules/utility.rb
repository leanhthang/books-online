module Utility
  def self.utf8_to_ascii(string = "")
    utf8_mapping = {
      "a"=>"áàảãạăắặằẳẵâấầẩẫậ",
      "d"=>"đ",
      "e"=>"éèẻẽẹêếềểễệ",
      "i"=>"íìỉĩịÍÌỈĨỊ",
      "o"=>"óòỏõọôốồổỗộơớờởỡợ",
      "u"=>"úùủũụưứừửữự",
      "y"=>"ýỳỷỹỵ"
    }
    return_str = string.downcase.split(" ").map do |str|
      unless str.ascii_only?
        utf8_mapping.each do |k, v|
          str.gsub!(/[#{v}]/i, k)
        end
      end
      str
    end
    return_str.join(" ")
  end

  def self.float?(string)
    true if Float(string) rescue false
  end

  def self.ecb64(str)
    return Base64.encode64(str.to_s) rescue ""
  end

  def self.dcb64(str)
    return Base64.decode64(str) rescue ""
  end
end
