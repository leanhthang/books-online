class PostsController < ApplicationController
  before_action :get_chapters, only: [:chapter, :get_menu_chapters]
  def show
    @post = Post.find(params[:id])
    @chapters = @post.chapters.select(:id, :title, :public)
                     .order(:order)
                     .paginate(:page => params[:page], :per_page => 25)
  end

  def chapter

  end

  def get_menu_chapters
    @chapters ||= @post.chapters.select(:title, :id).order(:order)
    render layout: false
  end

  private
    def get_chapters
      @chapter ||= Chapter.find(params[:id])
      @post ||= @chapter.post
    end
end
