class Chapter < ApplicationRecord
  after_create :aft_create_chapter
  after_destroy :aft_destroy_chapter

  belongs_to :post
  validates :title, presence: true

  def self.add_chapter(params, post)
    _chapter = Chapter.where( title: params[:title], post: post )
                      .first_or_create( title: params[:title], post: post )
    if _chapter.present?
      _chapter.origin_link    = params[:origin_link]
      _chapter.translator     = params[:translator] if params[:translator]
      _chapter.origin_content = params[:origin_content]
      _chapter.order_c        = params[:order_c]
      _chapter.save
    end
  end

  # before_or_after: before = -1/ after = 0
  def self.insert_order_to_new_position(chapter_id, insert_chapter_at)
    _insert_pos = Chapter.find(insert_chapter_at)
    _chapter    = Chapter.find(chapter_id)
    if Utility.float?(_insert_pos.order_c)
      _chapter.order_c = "#{_insert_pos.order_c.to_s}1".to_f
    else
      _chapter.order_c = "#{_insert_pos.order_c.to_s}.1".to_f
    end
    _chapter.save
  end

  private
    def aft_create_chapter
      Post.chapter_count(self.post, 1)
    end
    def aft_destroy_chapter
      Post.chapter_count(self.post, -1)
    end
end
