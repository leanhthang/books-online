require 'nokogiri'
require 'open-uri'
module ComicScanner
  class Scanner
    SELF_CLASS = {
      "ComicScanner::Bachngocsach" => "https://bachngocsach.com/reader/truyen/toan-bo?page=",
      "ComicScanner::Tangthuvien" => "https://truyen.tangthuvien.vn/bang-xep-hang?selOrder=view_&category=0&selComplete=1&selTime=all&page=",
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
        begin
          puts link
          doc = Nokogiri::HTML(open(link))
          scan_detail_of_post(doc)
        rescue
          puts "#{link} => errors"
        end
      end
    end

    def scan_detail_of_post(post)
      post.search(@post_params[:item_scan]).each do |doc_post|
        begin
          _post = post(@post_params, doc_post)
          Post.add_post(_post)
        rescue Exception => e
          puts e
        end
      end
    end

    def post(post_params = {}, doc_post)
      origin_link = ("#{@base_path}#{doc_post.at(@post_params[:title])['href']}").gsub(/\"/,"\"")
      others = get_others_of_post(origin_link)

      @post_data = {
        title: doc_post.at(post_params[:title]).text,
        origin_link: origin_link,
        origin_img: others[:origin_img],
        description: others[:description],
        types: others[:types],
        author: others[:author],
        categories: others[:categories],
        origin_rs: self.class.to_s,
      }
    end

    private
      def get_others_of_post(origin_link)
        doc = Nokogiri::HTML(open(origin_link))
        @count += 1
        begin
          puts "#{origin_link} => #{@count}"
          {
            description: doc.at(@post_params[:description]).inner_html,
            types: doc.css(@post_params[:types]).map{|x| x.text.strip },
            categories: doc.at(@post_params[:categories]).children.map{|x| x.text.strip },
            author: doc.at(@post_params[:author]).text,
            origin_img: doc.at(@post_params[:origin_img])["src"]
          }
        rescue
          puts "#{origin_link} => errors  => #{@count}"
          { description: "", types: [] }
        end
      end

  end
end
