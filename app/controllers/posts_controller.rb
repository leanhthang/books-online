class PostsController < ApplicationController
  before_action :get_chapters, only: [:chapter]
  def show
    # params[:id] = Utility.dcb64(params[:id]).to_i
    @post = Post.find(params[:id])
    @chapters = @post.chapters.select(:id, :title, :public)
                     .order(:order)
                     .paginate(:page => params[:page], :per_page => 25)
  end

  def chapter

  end

  def get_menu_chapters
    @post = Post.find(params[:id])
    render json: @post.chapters.select(:title, :id).order(:order)
  end

  private
    def get_chapters
      params[:id] = Utility.dcb64(params[:id]).to_i
      @chapter ||= Chapter.find(params[:id])
      @post ||= @chapter.post
    end
end
