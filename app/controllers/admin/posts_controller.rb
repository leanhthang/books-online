class Admin::PostsController < AdminController
  before_action :set_post, only: [:show, :edit, :destroy, :update, :sync_post, :update_public_chapters]
  PAGINATE = 20
  def index
    if params[:key_word]
      @posts = search(params[:key_word])
    else
      @posts = Post.includes(:author)
                   .paginate(:page => params[:page], :per_page => PAGINATE)
   end

  end

  def show
    @chapters = @post.chapters.select(:id, :title, :public)
                     .order(:order_c)
                     .paginate(:page => params[:page], :per_page => PAGINATE)
  end

  def edit
  end

  def update
    respond_to do |f|
      if @post.update(post_params)
        f.html { redirect_to admin_post_show_path(@post), notice: 'Post was successfully updated.' }
      else
        f.html { render :edit }
      end
    end
  end

  def destroy
  end

  def sync_post
    Thread.new do
      _module = @post.origin_rs.constantize
      _module.new.chapters(@post)
    end
    redirect_to admin_post_show_path
  end

  def update_public_chapters
    if params[:ids].present?
      @post.chapters.where(id: params[:ids]).update_public
    else
      @post.chapters.update_public
    end
  end

  def new
  end

  def search
    @posts = search(params[:key_word])
  end

  private
    def set_post
      @post = Post.find(params[:id])
    end

    def post_params
      params.require(:post).permit(:title, :description, :public)
    end

    def search(key_word)
      Post.includes(:author)
                 .search(key_word)
                 .paginate(:page => params[:page], :per_page => PAGINATE)
    end
end
