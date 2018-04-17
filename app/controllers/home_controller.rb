class HomeController < ApplicationController
  def index
    if params[:key_word]
      @posts = Post.search(params[:key_word])
                 .paginate(:page => params[:page], :per_page => 20)
    else
      @posts = Post.paginate(:page => params[:page], :per_page => 20)
   end
  end
end
