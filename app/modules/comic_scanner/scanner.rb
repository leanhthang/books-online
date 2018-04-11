require 'nokogiri'
require 'open-uri'
module ComicScanner
  class Scanner
    def initialize(master_path_scanner, pages = 1)
      @master_path_scanner = master_path_scanner
      @pages = pages
      @docs = []

      @pages.times do |page|
        link = "#{@master_path_scanner}#{page}"
        @docs << Nokogiri::HTML(open(link))
      end
    end

    def scan_detail_of_posts
      posts = []
      @docs.each do |doc|
        doc.search('.view-content ul li.term-row').each do |doc_post|
          posts << post(doc_post, @post_params)
        end
      end
      posts
    end

    private
      def get_description_of_post(origin_link)
        doc = Nokogiri::HTML(open(origin_link))
        return doc.at(@post_params[:description]).content
      end
      # @post_params: {
      #   name: "",
      #   description: "",
      #   images: "",
      #   author: "",
      #   categories: []
      # }
      def post(doc_post, post_params = {})
        origin_link = "#{@base_path}/#{doc_post.at(post_params[:name])['href']}"
        {
          name: doc_post.at(post_params[:name]).text,
          images: doc_post.at(post_params[:images])["src"],
          origin_link: origin_link,
          description: get_description_of_post(origin_link),
          author: doc_post.at(post_params[:author]).text,
          categories: doc_post.at(post_params[:categories]).text,
          chapters: []
        }
      end

  end
end
