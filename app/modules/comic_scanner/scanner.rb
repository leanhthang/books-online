require 'nokogiri'
require 'open-uri'
module ComicScanner
  class Scanner
    SELF_CLASS = {
      "ComicScanner::Bachngocsach" => "https://bachngocsach.com/reader/truyen?page=",
      "ComicScanner::Tangthuvien" => "https://truyen.tangthuvien.vn/bang-xep-hang?selOrder=view_&category=0&selComplete=1&selTime=all&page=",
      "ComicScanner::Truyenfull" => "http://truyenfull.vn/danh-sach/truyen-moi/trang-",
    }

    def initialize(pages = 1, start = 0)
      @path_scanner = SELF_CLASS[self.class.name]
      @pages = pages
      @count = 0
      @start = start
    end

    def scan_detail_of_posts
      @pages.times do |page|
        next if @start > page
        link = ("#{@path_scanner}#{page}").gsub(/\"/,"\"")
        puts link
        scan_detail_of_post(link)
      end
    end


    def store_chapters_of_page(_post, page_doc, skip_has_download)
      page_doc.css(@chapter_params[:list_chaps_of_page]).each_with_index do |chapter_doc, idx|
        if  idx >= skip_has_download
          url_chapter = chapter_doc.at(@chapter_params[:link_scan])['href']
          _chap_params = handle_chap_params(chapter_doc, url_chapter)
          if _chap_params.present?
            _chap_params[:order_c] = (@order_c += 1)
            Chapter.add_chapter(_chap_params, _post)
          end
        end
      end
    end

    def skip_ddos_uri(link)
        return open(link,
            "Pragma" => "no-cache",
            "User-Agent" => "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36",
            "X-Requested-With" => "XMLHttpRequest"
          )
    end
    private
      def get_others_of_post(origin_link)
        doc = Nokogiri::HTML(skip_ddos_uri(origin_link), nil, Encoding::UTF_8.to_s)
        @count += 1
        begin
          return_data = {
            types: doc.css(@post_params[:types]).map{|x| x.text.strip },
            categories: doc.at(@post_params[:categories]).children.map{|x| x.text.strip },
            author: doc.at(@post_params[:author]).text,
            origin_img: doc.at(@post_params[:origin_img])["src"]
          }
          return_data[:description] = doc.at(@post_params[:description]).inner_html if doc.at(@post_params[:description]).present?
          return_data
        rescue Exception => e
          puts "#{origin_link} => errors  => #{e}"
          { description: "", types: [] }
        end
      end

      def scan_detail_of_post(link_post)
        uri = open(link_post, "Origin" => "http://truyenfull.vn", "Pragma" => "no-cache","User-Agent" => "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36",
"X-Requested-With" => "XMLHttpRequest")
        docs = Nokogiri::HTML(uri, nil, Encoding::UTF_8.to_s)
        docs.search(@post_params[:item_scan]).each do |doc_post|
          begin
            _post = handle_post_params(doc_post)
            p _post[:origin_link]
            Post.add_post(_post)
          rescue Exception => e
            puts e
          end
        end
      end

      def handle_post_params(doc_post)
        origin_link = ("#{@base_path}#{doc_post.at(@post_params[:title])['href']}").gsub(/\"/,"\"")
        others = get_others_of_post(origin_link)
        {
          title: doc_post.at(@post_params[:title]).text,
          origin_link: origin_link,
          origin_img: others[:origin_img],
          description: others[:description],
          types: others[:types],
          author: others[:author],
          categories: others[:categories],
          origin_rs: self.class.to_s,
        }
      end

      def handle_chap_params(chapter_doc, url_chapter)
          begin
            chapter_container = Nokogiri::HTML(skip_ddos_uri("#{@base_path}#{url_chapter}"), nil, Encoding::UTF_8.to_s)
            return_data = {
              title: chapter_doc.at(@chapter_params[:title]).text,
              origin_link: url_chapter,
              origin_content: chapter_container.at(@chapter_params[:origin_content]).inner_html
            }
            return_data[:translator] = chapter_doc.at(@chapter_params[:translator]).text if @chapter_params[:translator].present?
            return_data
          rescue Exception => e
            puts "#{url_chapter} => errors (#{e})"
            return {}
          end
      end
  end
end
