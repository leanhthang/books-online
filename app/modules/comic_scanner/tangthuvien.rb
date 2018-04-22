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
        list_chaps_of_page: "div ul li:not(.divider-chap)",
        link_scan: "a",
        title: "a span",
        origin_content: ".box-chap"
      }
      @base_path = ""
    end

    # include ComicScanner::Scanner
    def scan_detail_of_posts
      super
      @cat_obj
    end

    def chapters(_post)
      @order_c = 0
      skip_has_download = _post.chapter_count
      page_links = get_all_pages_links_of_post(_post)
      page_links.each do |page_link|
        page_doc = Nokogiri::HTML(open(page_link), nil, Encoding::UTF_8.to_s)
        store_chapters_of_page(_post, page_doc, skip_has_download)
      end
    end

    private
      # detect page total of comic => max_page = doc.at(.pagination li a:last-child)['onclick'].scan(/\d+/).first
      # id of post: post_id = doc.at("input[name='story_id']")['value']
      # link of pages: https://truyen.tangthuvien.vn/doc-truyen/page/#{post_id}?page=#{page_num}
      def get_all_pages_links_of_post(_post)
        link = "#{_post.origin_link}"
        doc = Nokogiri::HTML(open(link))
        max_page = doc.css(".pagination li a[onclick]").last.attributes['onclick'].value.scan(/\d+/).first.to_i
        post_id = doc.at("input[name='story_id']")['value']
        page_links = []
        max_page.times do |t|
          page_links << "https://truyen.tangthuvien.vn/doc-truyen/page/#{post_id}?page=#{t}"
        end
        page_links
      end
  end
end


