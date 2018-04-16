class CreateCategories < ActiveRecord::Migration[5.1]
  def change
    create_table :categories do |t|
      t.string  :name
      t.string  :description
      t.boolean :public, default: false
      t.integer :like, default: 0
      t.integer :rating, default: 0
      t.integer :visited, default: 0
      t.integer :post_count, default: 0

      t.timestamps
    end
  end
end
