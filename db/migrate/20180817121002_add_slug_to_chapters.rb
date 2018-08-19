class AddSlugToChapters < ActiveRecord::Migration[5.2]
  def change
    add_column :chapters, :slug, :string
  end
end
