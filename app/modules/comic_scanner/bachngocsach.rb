module ComicScanner
  class Bachngocsach < ComicScanner::Scanner
    # @master_path_scanner: "https://bachngocsach.com/reader/taxonomy/term/1/hoan-thanh?page="
    def initialize(pages = 1, start = 0)
      super
      @post_params = {
          item_scan: ".view-content ul li.book-row",
          title: ".book-truyen a",
          #
          description: "#gioithieu",
          origin_img: "#anhbia img",
          author: "#tacgia a",
          categories: '#theloai a',
          types: "#flag .flag-term"
        }
      @chapter_params = {
        list_chaps_of_page: "#mucluc-list ul li.mucluc-row",
        link_scan: ".mucluc-chuong a",

        title: ".mucluc-chuong a",
        translator: ".mucluc-poster",
        origin_content: "#noidung"
      }
      @base_path = "https://bachngocsach.com/"
    end

    # include ComicScanner::Scanner
    def scan_detail_of_posts
      super
      @cat_obj
    end

    def chapters(_post)
      @order_c = _post.chapters.count
      skip_has_download = @order_c
      link = "#{_post.origin_link}/muc-luc?page=all"
      page_doc = Nokogiri::HTML(skip_ddos_uri(link))
      puts link
      store_chapters_of_page(_post, page_doc, skip_has_download)
    end


  end
end
