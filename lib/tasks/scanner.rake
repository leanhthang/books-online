require 'rake'
namespace :scanner do
  desc "Bachngocsach scan post"
  task :bachngocsach_add_post, [:pages, :start] => :environment do |t, params|
    # 93
    cm = ComicScanner::Bachngocsach.new(
        params[:pages].to_i, params[:start].to_i
      )
    cm.scan_detail_of_posts
  end
  desc "Tangthuvien scan post"
  task :tangthuvien_add_post, [:pages, :start] => :environment do |t, params|
    # 673
    cm = ComicScanner::Tangthuvien.new(
        params[:pages].to_i, params[:start].to_i
      )
    cm.scan_detail_of_posts
  end
  desc "Truyenfull scan post"
  task :truyenfull_add_post, [:pages, :start] => :environment do |t, params|
    # 673
    cm = ComicScanner::Truyenfull.new(
        params[:pages].to_i, params[:start].to_i
      )
    cm.scan_detail_of_posts
  end

  desc "ComicScanner::Truyenfull/Bachngocsach scan post"
  task :get_all_chapters , [:origin_rs] => :environment do |t, params|
    # 673
    posts = Post.where(origin_rs: params[:origin_rs])
    posts.each do |post|
      _module = post.origin_rs.constantize
      _module.new.chapters(post)
      return 0
    end
  end
end

