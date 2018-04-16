class Author < ApplicationRecord
  include Utility
  has_many :posts, dependent: :delete_all
  def self.add_author(params)
    where(name: params[:author])
      .first_or_create(
          name: params[:author],
          name_vn: Utility.utf8_to_ascii(params[:author])
        )
  end
end
