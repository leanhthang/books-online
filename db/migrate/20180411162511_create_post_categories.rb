class CreatePostCategories < ActiveRecord::Migration[5.1]
  def change
    create_table :post_categories do |t|
      t.uuid :post_id
      t.uuid :category_id
      t.timestamps
    end
  end
end
