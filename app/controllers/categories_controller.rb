class CategoriesController < ApplicationController
  before_action :set_cat, only: [:show, :edit, :update, :destroy]
  def index
    @cats = Category.order("post_count DESC")
                    .paginate(:page => params[:page], :per_page => 30)
  end
  def new
  end

  def create
  end

  def update
  end

  def destroy
  end

  def show
    @posts = Category.includes(:posts).find_by_id(params[:id])
                     .posts.order(:title)
                     .paginate(:page => params[:page], :per_page => 30)
  end

  def edit
  end

  private
    def set_cat
      @cat = Category.find(params[:id])
    end
end
