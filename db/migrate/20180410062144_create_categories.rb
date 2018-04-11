class CreateCategories < ActiveRecord::Migration[5.1]
  def change
    create_table :categories do |t|
      t.string  :name
      t.string  :description
      t.boolean :public
      t.string  :like
      t.string  :rating
      t.string  :visited

      t.timestamps
    end
  end
end
