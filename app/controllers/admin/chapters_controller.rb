class Admin::ChaptersController < AdminController
  before_action :set_chapter, only: [:show, :edit]
  def index
  end

  def edit
  end

  def show
  end

  def approve_by
  end

  def assign_to
  end

  private
    def set_chapter
      @chapter = Chapter.find(params[:id])
    end
end
