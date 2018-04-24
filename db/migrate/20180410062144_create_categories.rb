class CreateCategories < ActiveRecord::Migration[5.1]
  def change
    enable_extension 'uuid-ossp'
    enable_extension 'pgcrypto'
    create_table :categories, id: :uuid do |t|
      t.string  :name
      t.string  :description
      t.boolean :public, default: false
      t.integer :like_c, default: 0
      t.integer :rating, default: 0
      t.integer :visited, default: 0
      t.integer :post_count, default: 0

      t.timestamps
    end
  end
end
