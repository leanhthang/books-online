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
end
