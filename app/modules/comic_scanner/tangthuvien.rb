module ComicScanner
  class Tangthuvien < ComicScanner::Scanner
    def initialize(pages = 1, start = 0)
      super
      @post_params = {
          item_scan: ".content .list-page .row",
          title: ".truyen-title a",
          #
          description:  ".desc .desc-text",
          origin_img:   ".info-holder .books img",
          author:       ".info-holder .info div:first-child a",
          categories:   '.info-holder .info div:nth-child(2) a',
          types:        ".info-holder div .text-primary"
        }
      @chapter_params = {
        css_selector_last_of_page: "",
      }
      @base_path = ""
    end

    # include ComicScanner::Scanner
    def scan_detail_of_posts
      super
      @cat_obj
    end

    # @func_params: {
    #   title: "term-truyen-a",
    #   description: "",
    #   origin_img: ".term-anhbia-a",
    #   author: ".term-tacgia-a",
    #   categories: '.term-theloai'
    # }
    def get_links_of_chapter
      _posts = scan_detail_of_posts
      _posts.each do |_post|
        link_all_chapter = "#{_post[:origin_link]}/muc-luc?page=all"
        doc = Nokogiri::HTML(open(link_all_chapter))
        doc.css("#mucluc-list ul li").each do |item|
          _chapter = {
            title: item.at(".mucluc-chuong a").text,
            origin_link: item.at(".mucluc-chuong a")["href"],
            origin_content: "",
            translator: item.at(".mucluc-poster").text
          }
          Chapter.add_chapter(chapter, _post[:post_obj])
        end
      end
    end
  end
end


