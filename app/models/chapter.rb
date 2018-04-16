class Chapter < ApplicationRecord
  after_create :aft_create_chapter
  after_destroy :aft_destroy_chapter

  belongs_to :post
  validates :title, presence: true, uniqueness: true

  def self.add_chapter(params, post)
    _chapter = Chapter.where( title: params[:title], post: post )
                      .first_or_create( title: params[:title], post: post )
    if _chapter.present?
      _chapter.origin_link    = params[:origin_link]
      _chapter.translator     = params[:translator] if params[:translator]
      _chapter.origin_content = params[:origin_content]
      _chapter.save
    end
  end

  private
    def aft_create_chapter
      Post.chapter_count(self.post, 1)
    end
    def aft_destroy_chapter
      Post.chapter_count(self.post, -1)
    end
end
