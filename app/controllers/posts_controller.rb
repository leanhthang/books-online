class PostsController < ApplicationController
  before_action :decode_params_id, only: [:get_next_chapter, :get_prev_chapter]
  before_action :get_chapters, only: [:chapter]
  def show
    @post = Post.find(params[:id])
    @chapters = @post.chapters.select(:id, :title, :public)
                     .order(:order)
                     .paginate(:page => params[:page], :per_page => 25)
  end

  def chapter

  end

  def get_next_chapter
    current_chapter_order = Chapter.find(params[:id]).order
    @chapter = Chapter.select(:id, :origin_content, :title, :order)
                      .where("post_id = ? and chapters.order > ?", params[:post_id], current_chapter_order)
                      .limit(1).first
    render json: @chapter
  end

  def get_prev_chapter
    current_chapter_order = Chapter.find(params[:id]).order
    @chapter = Chapter.select(:id, :origin_content, :title, :order)
                      .where("post_id = ? and chapters.order < ?", params[:post_id], current_chapter_order)
                      .order(order: :desc)
                      .limit(1).first
    render json: @chapter
  end

  def get_menu_items
    @post = Post.find(params[:id])
    render json: @post.chapters.select(:title, :id).order(:order)
  end

  private
    def get_chapters
      decode_params_id
      @chapter ||= Chapter.find(params[:id])
      @post ||= @chapter.post
    end

    def decode_params_id
      params[:id] = Utility.dcb64(params[:id]).to_i
    end
end
