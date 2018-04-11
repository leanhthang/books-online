module ComicScanner
  class Bachngocsach < ComicScanner::Scanner
    def initialize(path, pages = 1)
      super
      @post_params = {
          name: ".term-truyen-a",
          description: "#gioithieu",
          images: ".term-anhbia-a img.imgsty",
          author: ".term-tacgia-a",
          categories: '.term-theloai'
        }
      @chapter_params = {
        css_selector_last_of_page: "",
      }
      @base_path = "https://bachngocsach.com"
    end
    # include ComicScanner::Scanner
    # @path: https://bachngocsach.com/reader/taxonomy/term/1/hoan-thanh?page=
    def scan_detail_of_posts
      super
    end
    # @func_params: {
    #   name: "term-truyen-a",
    #   description: "",
    #   images: ".term-anhbia-a",
    #   author: ".term-tacgia-a",
    #   categories: '.term-theloai'
    # }

    def get_links_of_chapter
      _posts = scan_detail_of_posts
      _posts.each do |_post|
        link_all_chapter = "#{_post[:origin_link]}/muc-luc?page=all"
        doc = Nokogiri::HTML(open(link_all_chapter))
        doc.css("#mucluc-list ul li").each do |item|
          _post[:chapters] << {
            name: item.at(".mucluc-chuong a").text,
            link: item.at(".mucluc-chuong a")["href"],
            content: "",
            translator: item.at(".mucluc-poster").text
          }
        end
      end
      _posts
    end
  end
end


