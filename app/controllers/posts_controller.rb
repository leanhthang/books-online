class PostsController < ApplicationController

  def show
    @post = Post.find(params[:id])
    @chapters = @post.chapters.select(:id, :title, :public)
                     .order(:order)
                     .paginate(:page => params[:page], :per_page => 25)
  end

  def chapter
    @chapter = Chapter.find(params[:id])
  end
end
