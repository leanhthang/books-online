class AddIndexToTable < ActiveRecord::Migration[5.1]
  def change
    add_index :posts, :title
    add_index :posts, :title_vn
    add_index :posts, :author_name_vn
    add_index :authors, :name
    add_index :authors, :name_vn
  end
end
