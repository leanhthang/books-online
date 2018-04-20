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
        scan_selector: "#mucluc-list ul li.mucluc-row",
        link_scan: ".mucluc-chuong a",

        title: ".mucluc-chuong a",
        translator: ".mucluc-poster",
        origin_content: "#noidung"
      }
      @base_path = "https://bachngocsach.com"
    end

    # include ComicScanner::Scanner
    def scan_detail_of_posts
      super
      @cat_obj
    end

    def chapters(post)
      link = "#{post.origin_link}/muc-luc?page=all"
      doc = Nokogiri::HTML(open(link))
      puts link
      @index = 0
      skip_has_download = post.chapter_count - 1
      doc.css(@chapter_params[:scan_selector]).each_with_index do |chapter_doc, idx|
        return false if skip_has_download > idx
        url_chapter = chapter_doc.at(@chapter_params[:link_scan])['href']
        chapter_params = chapter(chapter_doc, url_chapter)
        if chapter_params.present?
          chapter_params[:order] = (@index += 1)
          Chapter.add_chapter(chapter_params, post)
        end
      end
    end

  end
end


