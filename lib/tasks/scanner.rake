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
end

