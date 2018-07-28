class Post < ApplicationRecord
  include PgSearch
  include Utility
  pg_search_scope :search, against: [:title_vn, :title], using: {
    tsearch:{ any_word: true }
  }

  has_many :type_posts, dependent: :delete_all
  has_many :types, through: :type_posts

  has_many :post_categories, dependent: :delete_all
  has_many :categories, through: :post_categories

  has_many :chapters, dependent: :delete_all

  has_many :activities, as: :model_name

  belongs_to :author

  belongs_to :assign_user, -> { where role: 'agent' }, class_name: "User", optional: true

  scope :posts_assigned, -> (user_id){ where(assign_by: user_id) }
  scope :posts_public, -> (public_state){ where(public: public_state) }

  # validate
  validates :title, presence: true, uniqueness: true


  def self.add_post(params)
    post = Post.find_by_title(params[:title])
    if post.blank?
      author = Author.add_author(params)
      title_vn = Utility.utf8_to_ascii(params[:title])
      post = Post.create(
          title: params[:title],
          title_vn: title_vn,
          author_name_vn: Utility.utf8_to_ascii(params[:author]),
          origin_img: params[:origin_img],
          origin_link: params[:origin_link],
          description: params[:description],
          origin_rs:   params[:origin_rs],
          url_alias: gen_url_alias(title_vn),
          author: author # author_id
        )
      Category.add_cat(params[:categories], post)
      Type.add_type(params[:types], post)
    end
  end

  def self.chapter_count(post, increment_num)
    post.chapter_count += increment_num
    post.save
  end


  private
    def gen_url_alias(title_vn)
      title_vn.map{|x| x[0]}.join() + "-#{title_vn.split(' ').join('-')}"
    end

end

