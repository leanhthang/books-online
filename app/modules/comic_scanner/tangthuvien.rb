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
        scan_selector: "#mucluc-list ul li.mucluc-row",
        link_scan: ".mucluc-chuong a",

        title: ".mucluc-chuong a",
        translator: ".mucluc-poster",
        origin_content: "#noidung"
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
    def chapters(post)
      link = post.origin_link
      doc = Nokogiri::HTML(open(link))
    end
  end
end


