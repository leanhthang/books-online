module ComicScanner
  class Truyenfull < ComicScanner::Scanner
    def initialize(pages = 1, start = 0)
      super
      @post_params = {
          item_scan: "#list-page .col-truyen-main .list-truyen .row",
          title: ".truyen-title a",
          #
          description:  ".desc-text",
          origin_img:   ".book img",
          author:       ".info div a[itemprop='author']",
          categories:   '.info div:nth-child(2) a',
          types:        ".info div:last-child span"
        }
      @chapter_params = {
        list_chaps_of_page: "#list-chapter ul.list-chapter li",
        link_scan: "a",
        title: "a",
        origin_content: ".chapter-c"
      }
      @base_path = ""
    end

    # include ComicScanner::Scanner
    def scan_detail_of_posts
      super
      @cat_obj
    end

    def chapters(_post)
      @order_c = _post.chapters.count
      skip_has_download = @order_c
      page_links = get_all_pages_links_of_post(_post)
      page_links.each do |page_link|
        page_doc = Nokogiri::HTML(skip_ddos_uri(page_link), nil, Encoding::UTF_8.to_s)
        store_chapters_of_page(_post, page_doc, skip_has_download)
      end
    end

    private
      # detect page total of comic => max_page = doc.at(.pagination li a:last-child)['onclick'].scan(/\d+/).first
      # id of post: post_id = doc.at("input[name='story_id']")['value']
      # link of pages: https://truyen.tangthuvien.vn/doc-truyen/page/#{post_id}?page=#{page_num}
      def get_all_pages_links_of_post(_post)
        link = "#{_post.origin_link}"
        doc = Nokogiri::HTML(skip_ddos_uri(link))
        max_page = doc.at("input#total-page")['value'].to_i
        page_links = []
        max_page.times do |t|
          t += 1
          page_links << "#{link}trang-#{t}/"
        end
        page_links
      end
  end
end
