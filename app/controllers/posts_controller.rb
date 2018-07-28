class PostsController < ActionController::Base
  before_action :get_chapters, only: [:chapter]
  layout "layouts/application"
  def show
    @post = Post.find(params[:id])
    @chapters = @post.chapters.select(:id, :title, :public)
                     .order(:order_c)
                     .paginate(:page => params[:page], :per_page => 10)
  end

  def chapter
    if params[:json]
      render json: @chapter
    end
  end

  def get_next_chapter
    current_chapter_order = Chapter.find(params[:id]).order_c
    @chapter = Chapter.select(:id, :origin_content, :title, :order_c)
                      .where("post_id = ? and order_c > ?", params[:post_id], current_chapter_order)
                      .limit(1)[0]
    render json: @chapter
  end

  def get_prev_chapter
    current_chapter_order = Chapter.find(params[:id]).order_c
    @chapter = Chapter.select(:id, :origin_content, :title, :order_c)
                      .where("post_id = ? and order_c < ?", params[:post_id], current_chapter_order)
                      .order(order_c: :desc)
                      .limit(1)[0]
    render json: @chapter
  end

  def get_menu_items
    @post = Post.find(params[:id])
    render json: @post.chapters.select(:title, :id).order(order_c: :desc)
  end

  private
    def get_chapters
      @chapter ||= Chapter.find(params[:id])
      @post ||= @chapter.post
    end



    def detect_post

    end
end
