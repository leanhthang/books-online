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
        css_selector_last_of_page: "",
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
      # begin
        puts link
        doc.css("#mucluc-list ul li.mucluc-row").each do |chapter_doc|
          url_chapter = chapter_doc.at(".mucluc-chuong a")['href']
          chapter_params = chapter(chapter_doc, url_chapter)
          if chapter_params.present?
            Chapter.add_chapter(chapter_params, post)
          end
        end
      # rescue Exception => e
      #   puts "#{e} => #{link}"
      # end
    end

    def chapter(chapter_doc, url_chapter)
        begin
          chapter_container = Nokogiri::HTML(open("#{@base_path}/#{url_chapter}"))
          return {
            title: chapter_doc.at(".mucluc-chuong a").text,
            origin_link: url_chapter,
            translator: chapter_doc.at(".mucluc-poster").text,
            origin_content: chapter_container.at("#noidung").inner_html
          }
        rescue Exception => e
          puts "#{url_chapter} => errors (#{e})"
          return {}
        end
    end
    # def get_links_of_chapter
    #   _posts = scan_detail_of_posts
    #   _posts.each do |_post|
    #     link_all_chapter = "#{_post[:origin_link]}/muc-luc?page=all"
    #     doc = Nokogiri::HTML(open(link_all_chapter))
    #     doc.css("#mucluc-list ul li").each do |item|
    #       _chapter = {
    #         title: item.at(".mucluc-chuong a").text,
    #         origin_link: item.at(".mucluc-chuong a")["href"],
    #         origin_content: "",
    #         translator: item.at(".mucluc-poster").text
    #       }
    #       Chapter.add_chapter(chapter, _post[:post_obj])
    #     end
    #   end
    # end
  end
end


