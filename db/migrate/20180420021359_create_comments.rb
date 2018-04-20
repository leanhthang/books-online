class CreateComments < ActiveRecord::Migration[5.1]
  def change
    create_table :comments do |t|
      t.integer :post_id, limit: 2
      t.integer :chapter_id, limit: 2
      t.integer :user_id
      t.text :content
      t.integer :parent_id

      t.timestamps
    end
  end
end