class CreatePosts < ActiveRecord::Migration[5.1]
  def change
    create_table :posts do |t|
      t.string :name
      t.string :origin_rs
      t.string :author
      t.string :description
      t.boolean :public
      t.string :images
      t.string :amount_chapter
      t.string :status
      t.string :categories
      t.integer :like
      t.integer :rating
      t.integer :visited
      t.references :chapter, foreign_key: true

      t.timestamps
    end
  end
end
