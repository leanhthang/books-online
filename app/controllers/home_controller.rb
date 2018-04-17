class HomeController < ApplicationController
  def index
    if params[:key_word]
      @posts = search(params[:key_word])
    else
      @posts = Post.includes(:author)
                   .paginate(:page => params[:page], :per_page => 20)
   end
  end
end
