class Type < ApplicationRecord
  has_many :type_posts, dependent: :delete_all
  has_many :posts, through: :type_posts

  validates :name, presence: true, uniqueness: true

  def self.add_type(types, post)
    @type_obj ||= {}
    types.map(&:strip).each do |type_name|
      if @type_obj[type_name].present?
        _type = @type_obj[type_name]
      else
        _type = where(name: type_name).first_or_create(name: type_name)
        @type_obj[type_name] = _type
      end
      TypePost.where(post: post, type: _type)
               .first_or_create(post: post, type: _type)
    end
  end
end
