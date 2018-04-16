class Category < ApplicationRecord
  has_many :post_categories, dependent: :delete_all
  has_many :posts, through: :post_categories

  validates :name, presence: true, uniqueness: true

  def self.add_cat(categories, post)
    @cat_obj ||= {}
    categories.each do |cat_name|
      if @cat_obj[cat_name].present?
        _cat = @cat_obj[cat_name]
      else
        _cat = where(name: cat_name).first_or_create(name: cat_name)
        @cat_obj[cat_name] = _cat
      end
      _cat.post_count += 1
      _cat.save
      PostCategory.where(post: post, category: _cat)
                    .first_or_create(post: post, category: _cat)
    end
  end

end
