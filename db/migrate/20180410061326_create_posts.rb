class CreatePosts < ActiveRecord::Migration[5.1]
  def change
    enable_extension 'citext'
    create_table :posts do |t|
      t.citext  :title, null: false
      t.citext  :title_vn, null: false
      t.string  :origin_link, null: false
      t.string  :origin_rs, null: false
      t.integer :author_id
      t.citext  :author_name_vn
      t.citext  :description
      t.boolean :public, default: false
      t.string  :origin_img
      t.string  :images
      t.integer  :chapter_count, default: 0
      # finished/ updating
      t.string :status
      # The currently, who is responsibility for this post
      t.string :assign_to, default: false
      t.integer :like, default: 0
      t.integer :rating, default: 0
      t.integer :visited, default: 0
      t.timestamps
    end
  end
end
